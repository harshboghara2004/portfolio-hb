"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function AmbientBackground() {
    const containerRef = useRef(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const smoothX = useSpring(mouseX, {
        stiffness: 45,
        damping: 28,
        mass: 0.8,
    });

    const smoothY = useSpring(mouseY, {
        stiffness: 45,
        damping: 28,
        mass: 0.8,
    });

    useEffect(() => {
        const handlePointerMove = (event) => {
            mouseX.set(event.clientX);
            mouseY.set(event.clientY);
        };

        window.addEventListener("pointermove", handlePointerMove, {
            passive: true,
        });

        return () => {
            window.removeEventListener("pointermove", handlePointerMove);
        };
    }, [mouseX, mouseY]);

    return (
        <div
            ref={containerRef}
            className="ambient-background"
            aria-hidden="true"
        >
            <motion.div
                className="ambient-cursor"
                style={{
                    x: smoothX,
                    y: smoothY,
                }}
            />

            <div className="ambient-section ambient-hero" />
            <div className="ambient-section ambient-experience" />
            <div className="ambient-section ambient-projects" />
            <div className="ambient-section ambient-skills" />
            <div className="ambient-section ambient-achievements" />
            <div className="ambient-section ambient-contact" />
        </div>
    );
}
