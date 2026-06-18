import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import AnimatedButton from './AnimatedButton';

gsap.registerPlugin(useGSAP);
gsap.config({
    force3D: true
})

export default function EditorialHero({ playAnimations }) {
    const containerRef = useRef(null);

    useGSAP(() => {
        if (!playAnimations) return;

        const tl = gsap.timeline({ delay: 0.2 });

        // Logo & Brand Name
        tl.fromTo('.logo-anim',
            { autoAlpha: 0, y: -20 },
            { autoAlpha: 1, y: 0, duration: 1.2, ease: 'power3.out' }
        )
            // Video container
            .fromTo('.video-container',
                { clipPath: 'inset(20% 20% 20% 20%)', autoAlpha: 0 },
                { clipPath: 'inset(0% 0% 0% 0%)', autoAlpha: 1, duration: 1.5, ease: 'power4.inOut' },
                "-=0.8"
            )
            // Slogan
            .fromTo('.slogan-line',
                { y: 20, autoAlpha: 0 },
                { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out' },
                "-=0.8"
            )
            // Nav Links
            .fromTo('.nav-link',
                { x: -10, autoAlpha: 0 },
                { x: 0, autoAlpha: 1, duration: 0.6, stagger: 0.2, ease: 'power2.out' },
                "-=1"
            )
            // Pricing Info
            .fromTo('.pricing-item',
                { autoAlpha: 0, x: 10 },
                { autoAlpha: 1, x: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out' },
                "-=0.6"
            )
            // Hero Buttons (Moved under video)
            .fromTo('.hero-btn',
                { y: 15, autoAlpha: 0 },
                { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.15, ease: 'power2.out' },
                "-=0.4"
            )
            // Footer text
            .fromTo('.footer-text',
                { autoAlpha: 0 },
                { autoAlpha: 1, duration: 1 },
                "-=0.5"
            );

    }, { scope: containerRef, dependencies: [playAnimations] });

    return (
        <div
            ref={containerRef}
            className="relative min-h-[100dvh] bg-white text-gray-950 flex flex-col lg:flex-row items-center p-6 pb-24 lg:p-12 lg:pb-12 overflow-hidden font-sans"
        >
            {/* LOGO & BRAND NAME */}
            <div className="logo-anim invisible opacity-0 absolute top-6 left-6 lg:top-12 lg:left-12 flex items-center gap-3 z-50 will-change-transform">
                <div className="relative w-10 h-10 md:w-12 md:h-12">
                    <Image
                        src="https://erakit.us/logo.png"
                        alt="EraKit Logo"
                        fill
                        priority
                        sizes="(max-width: 768px) 40px, 48px"
                        className="object-contain"
                    />
                </div>
                <span className="text-xl md:text-2xl font-semibold tracking-tight text-gray-900">
                    EraKit
                </span>
            </div>

            {/* LEFT SECTION (Slogan only) */}
            <div className="order-1 lg:order-none w-full lg:w-1/4 flex flex-col justify-center z-10 mb-8 mt-16 lg:mt-0 lg:mb-0">
                <h1 className="text-3xl lg:text-4xl xl:text-5xl font-light tracking-tight leading-snug">
                    <span className="slogan-line block invisible opacity-0">Lean,</span>
                    <span className="slogan-line block invisible opacity-0">Mean,</span>
                    <span className="slogan-line block text-gray-400 invisible opacity-0">Working</span>
                    <span className="slogan-line block font-normal invisible opacity-0">Machine.</span>
                </h1>
            </div>

            {/* CENTER (Video + Buttons) */}
            <div className="order-2 lg:order-none w-full lg:w-4/6 flex flex-col justify-center items-center relative z-0 mt-4 lg:mt-0">

                {/* Video */}
                <div className="video-container invisible opacity-0 w-full aspect-video lg:aspect-[16/9] lg:scale-110 bg-gray-950 relative shadow-2xl">
                    <video
                        className="w-full h-full object-cover opacity-80"
                        autoPlay
                        loop
                        muted
                        playsInline
                    >
                        <source src="https://assets.mixkit.co/videos/4075/4075-720.mp4" type="video/mp4" />
                    </video>
                </div>

                {/* CTA Buttons (Positioned under video) */}
                <div className="flex flex-col sm:flex-row gap-4 mt-8 lg:mt-16 z-10 w-full sm:w-auto px-4 sm:px-0">
                    <div className="hero-btn invisible opacity-0 w-full sm:w-auto">
                        <AnimatedButton
                            text="Start Today"
                            variant="primary"
                            className="w-full sm:w-auto"
                        />
                    </div>
                    <div className="hero-btn invisible opacity-0 w-full sm:w-auto">
                        <AnimatedButton
                            text="Request for Demo"
                            variant="secondary"
                            className="w-full sm:w-auto"
                        />
                    </div>
                </div>

            </div>

            {/* RIGHT (Nav & Pricing) */}
            <div className="order-3 lg:order-none w-full lg:w-1/4 flex flex-col items-start lg:items-end justify-center z-10 mt-12 lg:mt-0 gap-8">
                <div className="flex flex-col items-start lg:items-end gap-5">
                    <DirectionalHoverLink href="/about" text="About" />
                    <DirectionalHoverLink href="/features" text="Features" />
                </div>

                <div className="flex flex-col items-start lg:items-end gap-4 mt-2 w-full">
                    <div className="pricing-item invisible opacity-0 flex flex-col items-start lg:items-end border-l-2 text-end lg:border-l-0 lg:border-r-2 wrap-break-word border-green-900/30 pl-4 lg:pl-0 lg:pr-4 will-change-transform max-w-none xl:max-w-none lg:max-w-[200px]">
                        <span className="text-[10px] md:text-xs  uppercase tracking-[0.15em] text-gray-400 font-medium mb-1">
                            Contractor Onboarding
                        </span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl md:text-3xl font-light text-gray-900">$100</span>
                            <span className="text-sm text-gray-400 italic font-serif">/ one-time</span>
                        </div>
                    </div>

                    <div className="pricing-item invisible max-w-none lg:max-w-[120px] xl:max-w-none opacity-0 flex flex-col items-start lg:items-end border-l-2 lg:border-l-0 lg:border-r-2 border-green-900/30 pl-4 lg:pl-0 lg:pr-4 will-change-transform text-end wrap-break-word">
                        <span className="text-[10px] md:text-xs uppercase tracking-[0.15em] text-gray-400 font-medium mb-1 wrap-break-word">
                            Estimate Generation
                        </span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl md:text-3xl font-light text-gray-900">$10</span>
                            <span className="text-sm text-gray-400 italic font-serif">/ per estimate</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* FOOTER */}
            <div className="footer-text invisible opacity-0 absolute bottom-4 left-6 lg:left-12 z-20 pointer-events-none">
                <p className="text-[10px] md:text-xs font-medium tracking-[0.1em] text-gray-400 uppercase">
                    &copy; 2026 A DBA of Next Era Solutions Group LLC.
                </p>
            </div>
        </div>
    );
}

const DirectionalHoverLink = ({ href, text }) => {
    return (
        <div className="nav-link invisible opacity-0">
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-block text-sm lg:text-base tracking-widest uppercase text-gray-400 hover:text-green-900 transition-colors duration-300 pb-1"
            >
                {text}
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-green-900 origin-right scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100 group-hover:origin-left"></span>
            </a>
        </div>
    );
};