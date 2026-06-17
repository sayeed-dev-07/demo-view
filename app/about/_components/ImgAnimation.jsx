'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

gsap.config({ force3D: true });

const ImgAnimation = ({
    src,
    alt,
    className = "",
    sizes = "(max-width: 768px) 100vw, 50vw",
    priority = false,
    scroll = true
}) => {
    const containerRef = useRef(null);
    const wrapRef = useRef(null);
    const imgRef = useRef(null);

    useGSAP(() => {
        if (!wrapRef.current || !imgRef.current) return;

        let mm = gsap.matchMedia();

        mm.add({
            isDesktop: "(min-width: 768px)",
            isMobile: "(max-width: 767px)",
            reduceMotion: "(prefers-reduced-motion: reduce)"
        }, (context) => {
            let { isDesktop, reduceMotion } = context.conditions;

            // ACCESSIBILITY: Simple fade-in for users with reduced motion
            if (reduceMotion) {
                gsap.set(wrapRef.current, { clipPath: 'inset(0% 0% 0% 0%)' });
                gsap.from(imgRef.current, {
                    autoAlpha: 0,
                    duration: 1.5,
                    scrollTrigger: scroll ? { trigger: containerRef.current, start: "top 85%" } : null
                });
                return;
            }

            // PERFORMANCE: Mobile gets a smaller initial scale (1.05 vs 1.2) to save GPU memory
            const initialScale = isDesktop ? 1.2 : 1.05;
            const animDuration = isDesktop ? 1.5 : 1.2;

            const tl = gsap.timeline({
                scrollTrigger: scroll ? {
                    trigger: containerRef.current,
                    start: "top 85%",
                } : null
            });

            tl.fromTo(wrapRef.current,
                { clipPath: 'inset(100% 0% 0% 0%)' },
                { clipPath: 'inset(0% 0% 0% 0%)', duration: animDuration, ease: 'power4.inOut' },
                0
            )
                .fromTo(imgRef.current,
                    { scale: initialScale },
                    { scale: 1, duration: animDuration, ease: 'power4.inOut' },
                    0
                );
        });

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className={`relative w-full ${className}`}>
            <div ref={wrapRef} className="w-full h-full relative overflow-hidden">
                <Image
                    ref={imgRef}
                    src={src}
                    alt={alt}
                    fill
                    sizes={sizes}
                    priority={priority}
                    className="object-cover will-change-transform"
                />
            </div>
        </div>
    );
};

export default ImgAnimation;