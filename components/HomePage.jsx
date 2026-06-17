import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);
gsap.config({
    force3D: true
})

export default function EditorialHero({ playAnimations }) {
    const containerRef = useRef(null);

    useGSAP(() => {
        if (!playAnimations) return;

        const tl = gsap.timeline();


        tl.fromTo('.video-container',
            { clipPath: 'inset(20% 20% 20% 20%)', autoAlpha: 0 },
            { clipPath: 'inset(0% 0% 0% 0%)', autoAlpha: 1, duration: 1.5, ease: 'power4.inOut' }
        )
            .fromTo('.slogan-line',
                { y: 20, autoAlpha: 0 },
                { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out' },
                "-=0.8"
            )
            .fromTo('.vertical-text',
                { autoAlpha: 0, letterSpacing: '0.5em' },
                { autoAlpha: 1, letterSpacing: '1em', duration: 1.5, ease: 'power3.out' },
                "-=1"
            )
            .fromTo('.nav-link',
                { x: -10, autoAlpha: 0 },
                { x: 0, autoAlpha: 1, duration: 0.6, stagger: 0.2, ease: 'power2.out' },
                "-=1"
            )
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
            {/* LEFT  */}
            <div className="order-1 lg:order-none w-full lg:w-1/4 flex flex-col justify-center z-10 mb-8 lg:mb-0">
                <h1 className="text-3xl lg:text-4xl xl:text-5xl font-light tracking-tight leading-snug">

                    <span className="slogan-line block invisible opacity-0">Lean,</span>
                    <span className="slogan-line block invisible opacity-0">Mean,</span>
                    <span className="slogan-line block text-gray-400 invisible opacity-0">Working</span>
                    <span className="slogan-line block font-normal invisible opacity-0">Machine.</span>
                </h1>
            </div>

            {/* CENTER */}
            <div className="order-2 lg:order-none w-full lg:w-4/6 flex justify-center items-center relative z-0">
                {/* Added invisible opacity-0 */}
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
            </div>

            {/* RIGHT */}
            <div className="order-3 lg:order-none w-full lg:w-1/4 flex flex-col items-start lg:items-end justify-center z-10 mt-12 lg:mt-0 gap-5 lg:gap-8">
                <DirectionalHoverLink href="/about" text="About" />
                <DirectionalHoverLink href="/features" text="Features" />
                <DirectionalHoverLink href="/pricing" text="Pricing" />
            </div>

            {/* Footer */}

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