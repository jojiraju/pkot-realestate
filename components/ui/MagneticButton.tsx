"use client";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  strength?: number;
  as?: "button" | "a";
  href?: string;
  target?: string;
}

export default function MagneticButton({
  children,
  className = "",
  onClick,
  strength = 30,
  as: Tag = "button",
  href,
  target,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distX = (e.clientX - centerX) / (rect.width / 2);
    const distY = (e.clientY - centerY) / (rect.height / 2);
    setPosition({ x: distX * strength, y: distY * strength });
  };

  const handleMouseLeave = () => setPosition({ x: 0, y: 0 });

  const commonProps = {
    ref: ref as React.RefObject<HTMLButtonElement>,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onClick,
    className: cn("magnetic-btn", className),
  };

  return (
    <motion.button
      {...commonProps}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      {children}
    </motion.button>
  );
}
