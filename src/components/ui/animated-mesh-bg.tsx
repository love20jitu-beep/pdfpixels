'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

/**
 * AnimatedMeshBg
 * An ultra-premium, fluid CSS gradient mesh. Uses multiple moving radial gradients
 * to simulate an organic liquid or silk effect, often seen in top-tier SaaS hero areas.
 */
export function AnimatedMeshBg() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Optional: Add tiny parallax or mouse movement tracking here for even more depth
    useEffect(() => {
        const handleMouse = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const x = (e.clientX / window.innerWidth - 0.5) * 20; // max 20px shift
            const y = (e.clientY / window.innerHeight - 0.5) * 20;

            containerRef.current.style.transform = `translate(${x}px, ${y}px)`;
        };

        window.addEventListener('mousemove', handleMouse);
        return () => window.removeEventListener('mousemove', handleMouse);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {/* Base container that shifts slightly with mouse */}
            <div
                ref={containerRef}
                className="absolute -inset-[20%] w-[140%] h-[140%] opacity-[0.85] dark:opacity-60 transition-transform duration-100 ease-out"
                style={{ willChange: 'transform' }}
            >
                {/* Organic, rotating gradient blobs */}
                <motion.div
                    animate={{
                        scale: [1, 1.1, 0.9, 1],
                        x: ['0%', '5%', '-5%', '0%'],
                        y: ['0%', '-5%', '5%', '0%'],
                        rotate: [0, 90, 180, 360],
                    }}
                    transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                    className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-[100%] mix-blend-multiply dark:mix-blend-screen filter blur-[80px] md:blur-[120px] bg-indigo-400/40 dark:bg-indigo-600/30"
                />

                <motion.div
                    animate={{
                        scale: [1, 0.9, 1.1, 1],
                        x: ['0%', '-5%', '5%', '0%'],
                        y: ['0%', '10%', '-10%', '0%'],
                        rotate: [360, 180, 90, 0],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                    className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] rounded-[100%] mix-blend-multiply dark:mix-blend-screen filter blur-[80px] md:blur-[120px] bg-fuchsia-400/30 dark:bg-fuchsia-600/20"
                />

                <motion.div
                    animate={{
                        scale: [0.9, 1.1, 1, 0.9],
                        x: ['0%', '10%', '-5%', '0%'],
                        y: ['0%', '-5%', '10%', '0%'],
                        rotate: [0, -90, -180, -360],
                    }}
                    transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
                    className="absolute bottom-[-10%] left-[20%] w-[70%] h-[70%] rounded-[100%] mix-blend-multiply dark:mix-blend-screen filter blur-[80px] md:blur-[120px] bg-cyan-400/30 dark:bg-cyan-600/20"
                />
            </div>

            {/* SVG Noise overlay for texture */}
            <div className="absolute inset-0 z-10 opacity-[0.035] dark:opacity-[0.05] pointer-events-none mix-blend-overlay">
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                    <filter id="mesh-noise">
                        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#mesh-noise)" />
                </svg>
            </div>

            {/* Fade out edges to blend into page perfectly */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/10 to-background z-20" />
        </div>
    );
}
