'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(useGSAP, SplitText);
gsap.config({ force3D: true });

const IntroOverlay = ({ shouldPlay, onComplete }) => {
    const overlayRef = useRef(null);
    const textRef = useRef(null);
    const hasCompletedRef = useRef(false);

    useGSAP(() => {
        if (!shouldPlay || !overlayRef.current || !textRef.current) {
            return;
        }

        let split = null;
        let timeline = null;
        let isActive = true;

        const finishIntro = () => {
            if (hasCompletedRef.current) return;
            hasCompletedRef.current = true;
            sessionStorage.setItem('portfolio-intro-played', 'true');
            onComplete();
        };

        document.fonts.ready.then(() => {
            if (!isActive || !overlayRef.current || !textRef.current) return;

            split = new SplitText(textRef.current, { type: 'chars, words, lines', mask: 'lines' });

            gsap.set(split.chars, {
                y: 40,
                autoAlpha: 0,
                rotationX: -40,
                transformOrigin: "0% 50% -50"
            });

            gsap.set(textRef.current, { autoAlpha: 1 });

            timeline = gsap.timeline({
                onComplete: finishIntro,
            });

            timeline

                .to(split.chars, {
                    y: 0,
                    autoAlpha: 1,
                    rotationX: 0,
                    duration: 0.5,
                    stagger: 0.015,
                    ease: 'power4.out'
                })


                .to(textRef.current, {
                    scale: 1.05,
                    duration: 1,
                    ease: 'none'
                }, "-=0.3")


                .to(textRef.current, {
                    autoAlpha: 0,
                    y: -20,
                    duration: 0.3,
                    ease: 'power2.out'
                }, "-=0.2")


                .to(overlayRef.current, {
                    yPercent: -100,
                    duration: 0.6,
                    ease: 'expo.inOut',
                }, "-=0.2");
        });

        return () => {
            isActive = false;
            timeline?.kill();
            split?.revert();
        };
    }, { scope: overlayRef, dependencies: [shouldPlay, onComplete] });

    if (!shouldPlay) return null;

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-white px-6 will-change-transform [perspective:1000px]"
            aria-label="Intro animation"
        >
            <div className="overflow-hidden p-4">
                <h1
                    ref={textRef}
                    className="m-0 invisible opacity-0 text-3xl md:text-5xl lg:text-7xl font-light tracking-tighter text-gray-950 text-center"
                >
                    30 seconds is <span className="font-serif italic text-gray-500">all I need.</span>
                </h1>
            </div>
        </div>
    );
};

export default IntroOverlay;