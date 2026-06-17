'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { featuresData } from './FeaturesData';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
}

gsap.config({ force3D: true });

const ErakitFeatures = () => {
    const data = featuresData;

    const containerRef = useRef(null);
    const imageWrapRef = useRef(null);
    const overlayRef = useRef(null);
    const mainTextRef = useRef(null);
    const introTextRef = useRef(null);
    const lineRef = useRef(null);
    const featuresRef = useRef([]);

    const addToRefs = (el) => {
        if (el && !featuresRef.current.includes(el)) {
            featuresRef.current.push(el);
        }
    };

    useGSAP(() => {
        gsap.to(containerRef.current, { autoAlpha: 1, duration: 0.2 });

        let splits = [];
        let mm = gsap.matchMedia();

        mm.add({
            isDesktop: "(min-width: 1024px)",
            isMobile: "(max-width: 1023px)",
            reduceMotion: "(prefers-reduced-motion: reduce)"
        }, (context) => {
            let { isDesktop, isMobile, reduceMotion } = context.conditions;

            if (reduceMotion) {
                gsap.set(imageWrapRef.current, { width: '100vw', height: '100vh', top: '50%' });
                gsap.set(overlayRef.current, { opacity: 0.85 });
                gsap.set(featuresRef.current, { autoAlpha: 1 });
                return;
            }

            // --- DESKTOP ANIMATION ---
            if (isDesktop) {
                // Image starts at top: 45%
                gsap.set(imageWrapRef.current, { left: '50%', top: '45%', xPercent: -50, yPercent: -50, width: '40vw', height: '40vh' });
                gsap.set(introTextRef.current, { left: '50%', top: '15%', xPercent: -50, yPercent: -50, autoAlpha: 1 });
                gsap.set(mainTextRef.current, { left: '50%', top: '80%', xPercent: -50, yPercent: -50, color: '#111827', rotation: 0, scale: 1 });
                gsap.set(lineRef.current, { left: '30%', top: '25%', height: '0vh', width: '1px', autoAlpha: 0, xPercent: -50 });
                gsap.set(featuresRef.current, { autoAlpha: 0, x: 50, y: 0 });

                const tl = gsap.timeline({
                    scrollTrigger: { trigger: containerRef.current, start: "top top", end: "+=7000", scrub: 1, pin: true, anticipatePin: 1 }
                });


                tl.to(imageWrapRef.current, { width: '100vw', height: '100vh', top: '50%', duration: 4, ease: "power2.inOut" }, 0)
                    .to(overlayRef.current, { opacity: 0.85, duration: 3, ease: "power2.inOut" }, 1)
                    .to(introTextRef.current, { autoAlpha: 0, y: -20, duration: 2 }, 0)
                    .to(mainTextRef.current, { left: '10%', top: '50%', rotation: -90, color: '#ffffff', scale: 0.7, duration: 4, ease: "power2.inOut" }, 0);

                tl.to(lineRef.current, { height: '50vh', autoAlpha: 1, duration: 1.5, ease: "power2.out" }, "-=0.5");

                featuresRef.current.forEach((feature, i) => {
                    const num = feature.querySelector('.feature-num');
                    const title = feature.querySelector('.feature-title');
                    const divider = feature.querySelector('.feature-divider');
                    const desc = feature.querySelector('.feature-desc');

                    const splitTitle = new SplitText(title, { type: "words,chars" });
                    splits.push(splitTitle);

                    const label = `feature-${i}`;
                    tl.addLabel(label);

                    tl.to(feature, { autoAlpha: 1, x: 0, duration: 0.1 }, label)
                        .fromTo(num, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 1, ease: "power3.out" }, label)
                        .fromTo(splitTitle.chars, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, stagger: 0.05, duration: 1.5, ease: "power3.out" }, `${label}+=0.2`)
                        .fromTo(divider, { scaleX: 0, transformOrigin: "left center" }, { scaleX: 1, duration: 1, ease: "power3.out" }, `${label}+=0.5`)
                        .fromTo(desc, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 1, ease: "power3.out" }, `${label}+=0.6`)
                        .to({}, { duration: 2.5 });

                    if (i !== data.list.length - 1) {
                        tl.to([num, splitTitle.chars, divider, desc], { autoAlpha: 0, y: -40, stagger: 0.02, duration: 1.5, ease: "power3.in" });
                    }
                });
            }

            // --- MOBILE / TABLET ANIMATION ---
            if (isMobile) {

                gsap.set(imageWrapRef.current, { left: '50%', top: '40%', xPercent: -50, yPercent: -50, width: '85vw', height: '35vh' });
                gsap.set(introTextRef.current, { left: '50%', top: '15%', xPercent: -50, yPercent: -50, autoAlpha: 1, textAlign: 'center', width: '90vw' });
                gsap.set(mainTextRef.current, { left: '50%', top: '70%', xPercent: -50, yPercent: -50, rotation: 0, scale: 0.6 });
                gsap.set(lineRef.current, { left: '10%', top: '35%', width: '0vw', height: '1px', autoAlpha: 0 });
                gsap.set(featuresRef.current, { autoAlpha: 0, x: 0, y: 50 });

                const tl = gsap.timeline({
                    scrollTrigger: { trigger: containerRef.current, start: "top top", end: "+=6000", scrub: 1.5, pin: true, anticipatePin: 1 }
                });


                tl.to(imageWrapRef.current, { width: '100vw', height: '100vh', top: '50%', duration: 4, ease: "power2.inOut" }, 0)
                    .to(overlayRef.current, { opacity: 0.85, duration: 3, ease: "power2.inOut" }, 1)
                    .to(introTextRef.current, { autoAlpha: 0, y: -20, duration: 2 }, 0)
                    .to(mainTextRef.current, { top: '15%', color: '#ffffff', scale: 0.5, duration: 4, ease: "power2.inOut" }, 0);

                tl.to(lineRef.current, { width: '80vw', autoAlpha: 1, duration: 1.5, ease: "power2.out" }, "-=0.5");

                featuresRef.current.forEach((feature, i) => {
                    const num = feature.querySelector('.feature-num');
                    const title = feature.querySelector('.feature-title');
                    const divider = feature.querySelector('.feature-divider');
                    const desc = feature.querySelector('.feature-desc');

                    const splitTitle = new SplitText(title, { type: "words,chars" });
                    splits.push(splitTitle);

                    const label = `feature-${i}`;
                    tl.addLabel(label);

                    tl.to(feature, { autoAlpha: 1, y: 0, duration: 0.1 }, label)
                        .fromTo(num, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 1, ease: "power3.out" }, label)
                        .fromTo(splitTitle.chars, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, stagger: 0.05, duration: 1.5, ease: "power3.out" }, `${label}+=0.2`)
                        .fromTo(divider, { scaleX: 0, transformOrigin: "left center" }, { scaleX: 1, duration: 1, ease: "power3.out" }, `${label}+=0.5`)
                        .fromTo(desc, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 1, ease: "power3.out" }, `${label}+=0.6`)
                        .to({}, { duration: 2 });

                    if (i !== data.list.length - 1) {
                        tl.to([num, splitTitle.chars, divider, desc], { autoAlpha: 0, y: -20, stagger: 0.02, duration: 1.5, ease: "power3.in" });
                    }
                });
            }
        });

        return () => {
            splits.forEach(split => split.revert());
            featuresRef.current = [];
        };
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="invisible relative w-full h-screen bg-[#f4f4f4] overflow-hidden font-sans">

            <div ref={imageWrapRef} className="absolute z-10 overflow-hidden will-change-transform shadow-2xl">
                <Image src={data.hero.image.src} alt="Features background" fill priority sizes="100vw" className="object-cover" />
                <div ref={overlayRef} className="absolute inset-0 bg-gray-950 opacity-0 z-10" />
            </div>

            <div className="absolute inset-0 z-20 pointer-events-none">

                <div ref={introTextRef} className="absolute flex flex-col items-center gap-2 will-change-transform w-full px-4">
                    <p className="text-xl md:text-3xl font-light text-gray-900 tracking-tight text-center">{data.hero.headline}</p>
                    <p className="text-xs md:text-sm text-gray-500 uppercase tracking-widest max-w-sm text-center">{data.hero.subtitle}</p>
                </div>

                <h2 ref={mainTextRef} className="absolute text-5xl md:text-[6rem] lg:text-[5rem] font-light tracking-[0.3em] will-change-transform m-0 leading-none whitespace-nowrap">
                    {data.hero.title}
                </h2>

                <div ref={lineRef} className="absolute bg-white/30 will-change-transform" />

                <div className="absolute right-0 bottom-0 w-full lg:w-[70vw] h-[60vh] lg:h-full flex items-center justify-center px-6 md:px-12 lg:px-24">
                    <div className="relative w-full h-full flex items-center lg:items-center items-start pt-8 lg:pt-0">
                        {data.list.map((feature) => (
                            <div key={feature.id} ref={addToRefs} className="absolute left-0 w-full max-w-2xl flex flex-col gap-2 will-change-transform">

                                <span className="feature-num text-5xl md:text-6xl lg:text-8xl font-serif italic tracking-tighter" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)', color: 'transparent' }}>
                                    {feature.id}.
                                </span>

                                <div className="flex flex-col gap-4 lg:gap-6 mt-2 pl-2 lg:pl-4">
                                    <h3 className="feature-title text-2xl md:text-4xl lg:text-5xl text-white font-light tracking-tight leading-tight">
                                        {feature.title}
                                    </h3>
                                    <div className="feature-divider w-12 lg:w-16 h-[1px] bg-white/40" />
                                    <p className="feature-desc text-sm md:text-base lg:text-lg text-white/60 font-light leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default ErakitFeatures;