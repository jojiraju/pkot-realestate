"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "gsap";
import { onIntroComplete } from "@/lib/motion";

// ─── Shared animation state (driven by GSAP, read inside useFrame) ──────────
type SceneAnim = { intro: number; build: number };

// Scratch objects reused every frame (module-level to avoid per-frame allocation)
const _dummy = new THREE.Object3D();
const _camPos = new THREE.Vector3();
const _look = new THREE.Vector3();

// ─── Deterministic random so the skyline is identical on every visit ───────
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Canvas texture of a facade grid with a scattering of warm, lit windows. */
function createWindowTexture(seed: number) {
  const rand = mulberry32(seed);
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const cols = 16;
  const rows = 32;
  const cw = canvas.width / cols;
  const ch = canvas.height / rows;
  for (let y = 0; y < rows; y++) {
    // Whole floors tend to be lit together, like real offices / homes
    const floorBias = rand() < 0.15 ? 0.45 : 0;
    for (let x = 0; x < cols; x++) {
      const r = rand();
      if (r < 0.2 + floorBias) {
        const l = 50 + rand() * 25;
        ctx.fillStyle = `hsl(${38 + rand() * 8}, 75%, ${l}%)`;
      } else if (r < 0.26 + floorBias) {
        ctx.fillStyle = "#9fc4b6";
      } else {
        ctx.fillStyle = "#050d09";
      }
      ctx.fillRect(x * cw + 3, y * ch + 3, cw - 6, ch - 6);
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

// ─── Surrounding skyline ───────────────────────────────────────────────────
const HEIGHT_BUCKETS = [1.2, 2, 3, 4.2, 5.6, 7];

function Skyline() {
  const { buckets, towers } = useMemo(() => {
    const base = createWindowTexture(7);
    const top = new THREE.MeshStandardMaterial({ color: "#0a1c13", roughness: 0.9 });
    const buckets = HEIGHT_BUCKETS.map((h, i) => {
      const geo = new THREE.BoxGeometry(1, h, 1);
      geo.translate(0, h / 2, 0);
      const map = base.clone();
      map.repeat.set(0.45, (h * 3) / 32);
      map.offset.set((i * 0.37) % 1, (i * 0.61) % 1);
      const side = new THREE.MeshStandardMaterial({
        color: "#0a1c13",
        metalness: 0.85,
        roughness: 0.2,
        emissive: "#ffffff",
        emissiveMap: map,
        emissiveIntensity: 1.8,
      });
      // Box faces: +x, -x, +y (roof), -y, +z, -z
      return { geo, materials: [side, side, top, top, side, side] };
    });

    const rand = mulberry32(42);
    const towers: { pos: [number, number, number]; scale: [number, number, number]; bucket: number }[] = [];
    for (let gx = -8; gx <= 8; gx++) {
      for (let gz = -9; gz <= 4; gz++) {
        const x = gx * 2.3 + (rand() - 0.5) * 0.6;
        const z = gz * 2.3 + (rand() - 0.5) * 0.6;
        const dist = Math.hypot(x, z);
        if (dist < 4 || rand() < 0.3) continue;
        // Taller buildings toward the back, low-rise in front of the camera
        const depthFactor = THREE.MathUtils.clamp((-z + 6) / 26, 0, 1);
        const pick = Math.floor(rand() * 2.2 + depthFactor * 4.2);
        const bucket = THREE.MathUtils.clamp(pick, 0, HEIGHT_BUCKETS.length - 1);
        const w = 0.9 + rand() * 0.8;
        towers.push({ pos: [x, 0, z], scale: [w, 1, 0.9 + rand() * 0.8], bucket });
      }
    }
    return { buckets, towers };
  }, []);

  useEffect(
    () => () => {
      buckets.forEach((b) => {
        b.geo.dispose();
        new Set(b.materials).forEach((m) => {
          m.emissiveMap?.dispose();
          m.dispose();
        });
      });
    },
    [buckets]
  );

  return (
    <group>
      {towers.map((t, i) => (
        <mesh
          key={i}
          position={t.pos}
          scale={t.scale}
          geometry={buckets[t.bucket].geo}
          material={buckets[t.bucket].materials}
        />
      ))}
    </group>
  );
}

// ─── Signature landmark: a twisting tower that builds itself floor by floor ─
const FLOORS = 44;
const FLOOR_GAP = 0.22;
const TWIST = Math.PI * 0.55;

function LandmarkTower({ anim }: { anim: React.RefObject<SceneAnim> }) {
  const groupRef = useRef<THREE.Group>(null);
  const slabsRef = useRef<THREE.InstancedMesh>(null);
  const edgesRef = useRef<THREE.InstancedMesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const crownRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const lastBuild = useRef(-1);

  useFrame((state, dt) => {
    const build = anim.current?.build ?? 0;
    const t = state.clock.elapsedTime;
    if (groupRef.current) groupRef.current.rotation.y += dt * 0.06;

    // Ground ring pulse
    if (ringRef.current) {
      const m = ringRef.current.material as THREE.MeshBasicMaterial;
      m.opacity = (0.25 + Math.sin(t * 1.5) * 0.12) * build;
      const s = 1 + ((t * 0.25) % 1) * 0.35;
      ringRef.current.scale.set(s, s, s);
    }

    if (Math.abs(build - lastBuild.current) < 0.0005) return;
    lastBuild.current = build;

    for (let i = 0; i < FLOORS; i++) {
      // Each floor has its own window of the overall build progress
      const local = THREE.MathUtils.clamp(build * (FLOORS + 10) - i, 0, 10) / 10;
      const e = 1 - Math.pow(1 - local, 3);
      const taper = 1 - (i / FLOORS) * 0.3;
      const y = i * FLOOR_GAP + (1 - e) * 1.8;
      const s = Math.max(e, 0.0001) * taper;
      _dummy.position.set(0, y, 0);
      _dummy.rotation.set(0, (i / FLOORS) * TWIST, 0);
      _dummy.scale.set(s, Math.max(e, 0.0001), s);
      _dummy.updateMatrix();
      slabsRef.current?.setMatrixAt(i, _dummy.matrix);
      _dummy.position.y = y + 0.085;
      _dummy.updateMatrix();
      edgesRef.current?.setMatrixAt(i, _dummy.matrix);
    }
    if (slabsRef.current) slabsRef.current.instanceMatrix.needsUpdate = true;
    if (edgesRef.current) edgesRef.current.instanceMatrix.needsUpdate = true;

    const height = FLOORS * FLOOR_GAP;
    if (coreRef.current) {
      coreRef.current.scale.y = Math.max(build, 0.0001);
      coreRef.current.position.y = (height * build) / 2;
    }
    if (crownRef.current) {
      const c = THREE.MathUtils.clamp((build - 0.85) / 0.15, 0, 1);
      crownRef.current.scale.setScalar(Math.max(c, 0.0001));
      crownRef.current.rotation.y = TWIST;
    }
  });

  const height = FLOORS * FLOOR_GAP;

  return (
    <group ref={groupRef}>
      {/* Glass floor plates */}
      <instancedMesh ref={slabsRef} args={[undefined, undefined, FLOORS]}>
        <boxGeometry args={[2, 0.15, 2]} />
        <meshStandardMaterial color="#1c4a36" metalness={0.9} roughness={0.12} transparent opacity={0.88} />
      </instancedMesh>

      {/* Gold floor edges */}
      <instancedMesh ref={edgesRef} args={[undefined, undefined, FLOORS]}>
        <boxGeometry args={[2.08, 0.025, 2.08]} />
        <meshStandardMaterial color="#c9a84c" metalness={1} roughness={0.25} emissive="#c9a84c" emissiveIntensity={0.45} />
      </instancedMesh>

      {/* Warm glowing core visible between floors */}
      <mesh ref={coreRef}>
        <cylinderGeometry args={[0.55, 0.55, height, 24]} />
        <meshStandardMaterial color="#f3d9a0" emissive="#f0c96a" emissiveIntensity={1.4} />
      </mesh>

      {/* Crown + spire */}
      <group ref={crownRef} position={[0, height, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.75, 0.03, 12, 64]} />
          <meshStandardMaterial color="#e8d5a3" emissive="#c9a84c" emissiveIntensity={1.2} metalness={1} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.9, 0]}>
          <cylinderGeometry args={[0.012, 0.05, 1.8, 8]} />
          <meshStandardMaterial color="#e8d5a3" emissive="#c9a84c" emissiveIntensity={2.5} />
        </mesh>
        <pointLight position={[0, 0.6, 0]} color="#e8d5a3" intensity={15} distance={15} decay={1.5} />
      </group>

      {/* Plaza ring */}
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[2.2, 2.26, 96]} />
        <meshBasicMaterial color="#c9a84c" transparent opacity={0} />
      </mesh>
    </group>
  );
}

// ─── Camera: fly-in on intro, mouse parallax, rises as the user scrolls ─────
function CameraRig({ anim }: { anim: React.RefObject<SceneAnim> }) {
  const size = useThree((s) => s.size);
  const pointer = useRef({ x: 0, y: 0 });
  const current = useRef(new THREE.Vector3(0, 6, 0));

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state, dt) => {
    const { camera } = state;
    const intro = anim.current?.intro ?? 0;
    const scroll = THREE.MathUtils.clamp(window.scrollY / window.innerHeight, 0, 1.2);
    const portrait = size.width < size.height * 0.9;
    const t = state.clock.elapsedTime;

    const radius = (portrait ? 24 : 16.5) - scroll * 5;
    const angle = 0.6 + Math.sin(t * 0.07) * 0.18 + pointer.current.x * 0.1;
    const finalY = (portrait ? 6 : 4.2) - pointer.current.y * 0.9 + scroll * 7;

    // Start high above the city, sweep down into the final framing
    const e = intro;
    const startAngle = angle - 1.1;
    const a = THREE.MathUtils.lerp(startAngle, angle, e);
    const r = THREE.MathUtils.lerp(30, radius, e);
    _camPos.set(Math.sin(a) * r, THREE.MathUtils.lerp(26, finalY, e), Math.cos(a) * r);

    camera.position.x = THREE.MathUtils.damp(camera.position.x, _camPos.x, 4, dt);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, _camPos.y, 4, dt);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, _camPos.z, 4, dt);

    // Offset the look target sideways so the tower sits right of the headline
    const side = portrait ? 0 : 4.6;
    const rightX = Math.cos(a);
    const rightZ = -Math.sin(a);
    _look.set(-rightX * side, (portrait ? 5.5 : 4) + scroll * 4, -rightZ * side);
    current.current.lerp(_look, 1 - Math.exp(-4 * dt));
    camera.lookAt(current.current);
  });

  return null;
}

function Ground() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[220, 220]} />
        <meshStandardMaterial color="#071710" roughness={0.95} metalness={0.1} />
      </mesh>
      <gridHelper args={[120, 60, "#c9a84c", "#c9a84c"]} position={[0, 0.005, 0]}>
        <lineBasicMaterial attach="material" color="#c9a84c" transparent opacity={0.07} />
      </gridHelper>
    </group>
  );
}

function Scene({ anim }: { anim: React.RefObject<SceneAnim> }) {
  return (
    <>
      <color attach="background" args={["#081711"]} />
      <fog attach="fog" args={["#081711", 12, 48]} />
      <hemisphereLight args={["#2d6a4f", "#040907", 1.2]} />
      <directionalLight position={[-12, 20, -8]} intensity={1.5} color="#9fc4b6" />
      <directionalLight position={[10, 8, 12]} intensity={2.5} color="#e8c77a" />
      <pointLight position={[0, 2, 0]} intensity={12} distance={18} color="#c9a84c" decay={1.5} />
      <pointLight position={[-5, 5, -5]} intensity={5} distance={15} color="#2d6a4f" decay={2} />
      <Ground />
      <Skyline />
      <LandmarkTower anim={anim} />
      {/* Increased sparkles for a premium magical dust effect */}
      <Sparkles count={250} scale={[35, 20, 35]} position={[0, 8, 0]} size={2.5} speed={0.2} opacity={0.8} color="#f3e3b5" noise={0.8} />
      <Sparkles count={100} scale={[20, 10, 20]} position={[0, 4, 0]} size={4} speed={0.4} opacity={0.6} color="#c9a84c" />
      <CameraRig anim={anim} />
    </>
  );
}

export default function HeroScene() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const anim = useRef<SceneAnim>({ intro: 0, build: 0 });
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(true);

  // Fly-in + construction once the preloader lifts
  useEffect(() => {
    let tl: gsap.core.Timeline | undefined;
    const off = onIntroComplete(() => {
      tl = gsap
        .timeline()
        .to(anim.current, { intro: 1, duration: 3.2, ease: "expo.inOut" }, 0)
        .to(anim.current, { build: 1, duration: 3.6, ease: "power2.inOut" }, 0.5);
    });
    return () => {
      off();
      tl?.kill();
    };
  }, []);

  // Stop rendering when the hero is off-screen to save battery / GPU
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={wrapRef}
      className="absolute inset-0 transition-opacity duration-[1500ms]"
      style={{ opacity: ready ? 1 : 0 }}
      aria-hidden="true"
    >
      <Canvas
        frameloop={active ? "always" : "never"}
        camera={{ position: [0, 26, 30], fov: 42, near: 0.1, far: 120 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        dpr={[1, 1.75]}
        onCreated={() => setReady(true)}
      >
        <Scene anim={anim} />
      </Canvas>
    </div>
  );
}
