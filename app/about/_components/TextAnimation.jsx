'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import React, { useRef } from 'react';

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);
gsap.config({ force3D: true });

const TextAnimation = ({ text, style, Scroll = true, delay = 0 }) => {
    const containerRef = useRef(null);
    const textRef = useRef(null);

    useGSAP(() => {
        let splitLines;

        document.fonts.ready.then(() => {
            if (!textRef.current) return;

            // Initialize SplitText once
            splitLines = new SplitText(textRef.current, {
                type: 'lines',
                mask: 'lines'
            });

            let mm = gsap.matchMedia();


            mm.add({
                isDesktop: "(min-width: 768px)",
                reduceMotion: "(prefers-reduced-motion: reduce)"
            }, (context) => {
                let { isDesktop, reduceMotion } = context.conditions;


                if (reduceMotion || !isDesktop) {
                    gsap.set(splitLines.lines, { yPercent: 0, autoAlpha: 1 });
                    return;
                }


                const animationConfig = {
                    delay: delay,
                    yPercent: 105,
                    stagger: 0.1,
                    duration: 1,
                    ease: 'power3.out'
                };

                if (Scroll) {
                    gsap.from(splitLines.lines, {
                        ...animationConfig,
                        scrollTrigger: {
                            trigger: textRef.current,
                            start: 'top 85%',
                        }
                    });
                } else {
                    gsap.from(splitLines.lines, animationConfig);
                }
            });
        });

        return () => {
            if (splitLines) splitLines.revert();
        };
    }, { scope: containerRef });

    return (
        <div ref={containerRef}>
            <p ref={textRef} className={`${style} will-change-transform`}>
                {text}
            </p>
        </div>
    );
};

export default TextAnimation;