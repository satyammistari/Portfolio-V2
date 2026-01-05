"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useSpring, useMotionValue, useVelocity, useTransform } from "framer-motion";
import Image from "next/image";

type PetState = "idle" | "running" | "sitting";

export function DogPet() {
  const [mounted, setMounted] = useState(false);
  const [petState, setPetState] = useState<PetState>("idle");
  const [facingRight, setFacingRight] = useState(true);
  const [isPerched, setIsPerched] = useState(false);

  const petRef = useRef<HTMLDivElement>(null);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const inactivityTimer = useRef<NodeJS.Timeout>();
  const lastMovementTime = useRef<number>(Date.now());
  const lastPetPos = useRef({ x: 0, y: 0 });
  
  // Mouse position tracking with MotionValues
  const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
  const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0);

  // Spring physics with momentum (mass creates the "glide" effect)
  const springConfig = { stiffness: 100, damping: 25, mass: 0.8 };
  const petX = useSpring(mouseX, springConfig);
  const petY = useSpring(mouseY, springConfig);

  // Calculate velocity for rotation effect
  const petVelocityX = useVelocity(petX);
  const petVelocityY = useVelocity(petY);
  
  // Rotation based on velocity (leaning forward when running)
  const petRotation = useTransform(
    [petVelocityX, petVelocityY],
    ([vx, vy]) => {
      const velocity = Math.sqrt(vx * vx + vy * vy);
      const maxRotation = 8;
      const rotation = Math.min((velocity / 100) * maxRotation, maxRotation);
      return vy > 0 ? rotation : -rotation * 0.3; // Lean forward when moving down
    }
  );

  // Calculate distance for state changes
  const calculateDistance = useCallback((x1: number, y1: number, x2: number, y2: number) => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }, []);

  // Update pet state based on distance (runs in animation frame for smoothness)
  useEffect(() => {
    if (!mounted) return;

    let rafId: number;
    
    const updatePetState = () => {
      const petCurrentX = petX.get();
      const petCurrentY = petY.get();
      const targetX = mouseX.get();
      const targetY = mouseY.get();
      
      const distance = calculateDistance(petCurrentX, petCurrentY, targetX, targetY);
      
      // Update facing direction based on pet's position relative to target
      const deltaX = targetX - petCurrentX;
      if (Math.abs(deltaX) > 5) {
        setFacingRight(deltaX > 0);
      }

      // State transitions based on distance
      if (!isPerched) {
        if (distance > 100) {
          setPetState("running");
        } else if (distance > 10) {
          setPetState("idle");
        }
      }

      lastPetPos.current = { x: petCurrentX, y: petCurrentY };
      rafId = requestAnimationFrame(updatePetState);
    };

    rafId = requestAnimationFrame(updatePetState);

    return () => cancelAnimationFrame(rafId);
  }, [mounted, petX, petY, mouseX, mouseY, calculateDistance, isPerched]);

  // Handle mouse movement - only updates target position
  useEffect(() => {
    if (!mounted) return;

    const handleMouseMove = (e: MouseEvent) => {
      const currentTime = Date.now();
      lastMovementTime.current = currentTime;

      // Exit perched mode if mouse moves and we're not hovering a card
      if (isPerched && petState === "sitting") {
        const hoveredCard = document.elementFromPoint(e.clientX, e.clientY)?.closest('.perch-target');
        if (!hoveredCard) {
          setIsPerched(false);
          setPetState("running");
        }
      }

      // Update target position (spring will interpolate)
      if (!isPerched) {
        mouseX.set(e.clientX - 24);
        mouseY.set(e.clientY - 24);
      }

      lastMousePos.current = { x: e.clientX, y: e.clientY };

      // Reset inactivity timer for sitting
      clearTimeout(inactivityTimer.current);
      inactivityTimer.current = setTimeout(() => {
        const timeSinceMove = Date.now() - lastMovementTime.current;
        if (timeSinceMove >= 2000 && !isPerched) {
          setPetState("sitting");
        }
      }, 2000);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(inactivityTimer.current);
    };
  }, [mounted, petState, isPerched, mouseX, mouseY]);

  // Perching logic - treat card tops as physical platforms
  useEffect(() => {
    if (!mounted) return;

    const updatePerchTargets = () => {
      const perchTargets = document.querySelectorAll(
        '[class*="card"], [class*="Card"], .bg-\\[\\#0c0c0c\\], .bg-white'
      );

      // Add perch-target class for easier detection
      perchTargets.forEach(el => el.classList.add('perch-target'));

      const handleElementHover = (e: Event) => {
        const element = e.currentTarget as HTMLElement;
        const rect = element.getBoundingClientRect();
        
        // Snap to top center of element
        const perchX = rect.left + rect.width / 2 - 24;
        const perchY = rect.top - 50;

        setIsPerched(true);
        setPetState("running");
        
        // Snap target position (spring will create smooth glide)
        mouseX.set(perchX);
        mouseY.set(perchY);

        // Transition to sitting after arrival
        setTimeout(() => {
          if (isPerched) {
            setPetState("sitting");
          }
        }, 600);
      };

      const handleElementLeave = (e: Event) => {
        // Only unperch if mouse actually left the card
        const element = e.currentTarget as HTMLElement;
        const relatedTarget = (e as MouseEvent).relatedTarget as HTMLElement;
        
        if (!element.contains(relatedTarget)) {
          setIsPerched(false);
          setPetState("running");
        }
      };

      perchTargets.forEach((target) => {
        target.addEventListener("mouseenter", handleElementHover);
        target.addEventListener("mouseleave", handleElementLeave);
      });

      return () => {
        perchTargets.forEach((target) => {
          target.removeEventListener("mouseenter", handleElementHover);
          target.removeEventListener("mouseleave", handleElementLeave);
          target.classList.remove('perch-target');
        });
      };
    };

    const cleanup = updatePerchTargets();

    return cleanup;
  }, [mounted, mouseX, mouseY, isPerched]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      ref={petRef}
      style={{
        x: petX,
        y: petY,
        rotate: petRotation,
        scaleX: facingRight ? 1 : -1,
        position: "fixed",
        top: 0,
        left: 0,
      }}
      className="pointer-events-none z-[9998] will-change-transform select-none"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: 1,
        scale: petState === "sitting" ? 0.9 : 1,
      }}
      transition={{ 
        opacity: { duration: 0.6, ease: "easeOut" },
        scale: { type: "spring", stiffness: 200, damping: 15 }
      }}
    >
      <motion.div 
        className="relative w-20 h-20"
        style={{
          filter: "drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3))",
        }}
        animate={{
          // Breathing animation for idle
          scale: petState === "idle" ? [1, 1.03, 1] : 1,
          // Slight bounce for running
          y: petState === "running" ? [0, -2, 0] : 0,
        }}
        transition={{
          scale: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          },
          y: {
            duration: 0.3,
            repeat: petState === "running" ? Infinity : 0,
            ease: "easeInOut"
          }
        }}
      >
        <Image
          src="/dog.gif"
          alt="Pixel Pet"
          width={80}
          height={80}
          className="object-contain"
          style={{
            imageRendering: "pixelated",
            // Remove white background
            mixBlendMode: "screen",
            opacity: petState === "running" ? 1 : 0.95,
          }}
          unoptimized
          priority
        />

      </motion.div>
    </motion.div>
  );
}
