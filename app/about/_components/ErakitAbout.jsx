/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import React, { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom'; // <-- Added React Portal
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import TextAnimation from './TextAnimation';
import ImgAnimation from './ImgAnimation';
import { aboutErakitData } from './ErakitData';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ErakitAbout = () => {
    const data = aboutErakitData;
    const mainRef = useRef(null);

    // --- MODAL STATE & REFS ---
    const [selectedImage, setSelectedImage] = useState(null);
    const [mounted, setMounted] = useState(false); // <-- Needed for Next.js Portals
    const modalRef = useRef(null);
    const modalImgWrapperRef = useRef(null);

    // Ensure we are on the client before attempting to use document.body
    useEffect(() => {
        setMounted(true);
    }, []);

    useGSAP(() => {
        gsap.to(mainRef.current, {
            autoAlpha: 1,
            duration: 0.5,
            ease: 'power2.out'
        });
    }, { scope: mainRef });

    // Modal In-Animation
    useGSAP(() => {
        if (selectedImage && modalRef.current && modalImgWrapperRef.current) {
            gsap.fromTo(modalRef.current,
                { autoAlpha: 0 },
                { autoAlpha: 1, duration: 0.4, ease: 'power3.out' }
            );
            gsap.fromTo(modalImgWrapperRef.current,
                { scale: 0.85, autoAlpha: 0, y: 20 },
                { scale: 1, autoAlpha: 1, y: 0, duration: 0.5, ease: 'back.out(1.2)', delay: 0.1 }
            );
        }
    }, { dependencies: [selectedImage] });

    // Modal Out-Animation
    const handleCloseModal = () => {
        gsap.to(modalImgWrapperRef.current, {
            scale: 0.85, autoAlpha: 0, y: 20, duration: 0.3, ease: 'power2.in'
        });
        gsap.to(modalRef.current, {
            autoAlpha: 0, duration: 0.4, ease: 'power2.in',
            onComplete: () => setSelectedImage(null)
        });
    };

    return (
        <>
            <div ref={mainRef} className='invisible bg-[#f4f4f4] text-gray-900 min-h-screen selection:bg-black selection:text-white overflow-hidden font-sans relative'>

                {/* --- HERO SECTION --- */}
                <div className='h-screen w-full flex flex-col lg:flex-row'>
                    <div className='w-full lg:w-1/2 flex flex-col px-3 lg:px-12 py-6 lg:py-[5%] h-full gap-y-4 justify-end'>
                        <TextAnimation
                            Scroll={false}
                            style='text-5xl md:text-7xl lg:text-8xl font-light tracking-tighter'
                            text={data.hero.title}
                        />
                        <TextAnimation
                            Scroll={false}
                            delay={0.4}
                            style='text-sm md:text-base text-gray-400 uppercase tracking-[0.2em]'
                            text={data.hero.subtitle}
                        />
                    </div>

                    <div className='w-full lg:w-1/2 h-[70vh] lg:h-full relative mt-8 lg:mt-0 p-4 lg:p-12 flex items-center justify-center'>
                        <div
                            className="w-full h-fit relative overflow-hidden cursor-pointer"
                            onClick={() => setSelectedImage(data.hero.image)}
                        >
                            <ImgAnimation
                                scroll={false}
                                src={data.hero.image.src}
                                alt={data.hero.image.alt}
                                priority={true}
                                className='w-full h-full object-cover object-top hover:scale-[1.02] transition-transform duration-500'
                            />
                        </div>
                    </div>
                </div>

                {/* --- ALTERNATING CONTENT SECTIONS --- */}
                <div className='max-w-[1600px] mx-auto px-4 lg:px-12 py-24 lg:py-48 flex flex-col gap-32 lg:gap-48'>
                    {data.sections.map((section, index) => {
                        const isEven = index % 2 === 0;

                        return (
                            <div
                                key={section.id}
                                className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${isEven ? '' : 'lg:flex-row-reverse'}`}
                            >
                                <div
                                    className='w-full lg:w-7/12 aspect-[16/10] relative cursor-pointer'
                                    onClick={() => setSelectedImage(section.image)}
                                >
                                    <ImgAnimation
                                        src={section.image.src}
                                        alt={section.image.alt}
                                        className='w-full h-full object-cover object-top hover:scale-[1.02] transition-transform duration-500'
                                    />
                                </div>

                                <div className='w-full lg:w-5/12 flex flex-col gap-8'>
                                    <div className='flex flex-col gap-2'>
                                        <TextAnimation
                                            style='text-3xl md:text-4xl lg:text-5xl font-light tracking-tight'
                                            text={section.heading}
                                        />
                                        <TextAnimation
                                            delay={0.2}
                                            style='text-lg md:text-xl font-light text-gray-500'
                                            text={section.subheading}
                                        />
                                    </div>

                                    <div className='flex flex-col gap-4'>
                                        {section.paragraphs.map((text, i) => (
                                            <TextAnimation
                                                key={i}
                                                style='text-sm md:text-base lg:text-lg text-gray-800 leading-relaxed font-light'
                                                text={text}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* --- BOTTOM PLUGIN BLOCK --- */}
                <div className='max-w-[1600px] mx-auto px-4 lg:px-12 py-12 lg:py-24 flex flex-col items-center text-center'>
                    <div
                        className='w-full lg:w-10/12 aspect-[16/9] relative mb-16 lg:mb-24 cursor-pointer'
                        onClick={() => setSelectedImage(data.pluginSection.image)}
                    >
                        <ImgAnimation
                            src={data.pluginSection.image.src}
                            alt={data.pluginSection.image.alt}
                            className='w-full h-full object-cover object-top hover:scale-[1.02] transition-transform duration-500'
                        />
                    </div>

                    <div className='max-w-3xl flex flex-col gap-8 items-center'>
                        <TextAnimation
                            style='text-lg md:text-xl lg:text-2xl text-gray-800 font-light leading-relaxed'
                            text={data.pluginSection.paragraphs[0]}
                        />
                        <TextAnimation
                            Scroll={false}
                            style='text-xs md:text-sm tracking-[0.2em] uppercase text-gray-400 mt-4 font-semibold'
                            text={data.pluginSection.badgeLabel}
                        />
                    </div>
                </div>

            </div>

            {/* --- REACT PORTAL IMAGE MODAL --- */}
            {mounted && createPortal(
                <div
                    ref={modalRef}
                    className={`fixed inset-0 z-[9999] w-screen h-[100dvh] overflow-hidden flex items-center justify-center bg-black/90 backdrop-blur-sm ${selectedImage ? 'visible' : 'invisible'}`}
                    onClick={handleCloseModal}
                    style={{ position: 'fixed', top: 0, left: 0 }} // Hardcoded style just to guarantee fixed behavior
                >
                    <button
                        className="absolute top-6 right-6 md:top-10 md:right-10 text-white/50 hover:text-white text-5xl font-light transition-colors z-50 cursor-pointer"
                        onClick={handleCloseModal}
                        aria-label="Close modal"
                    >
                        &times;
                    </button>

                    {selectedImage && (
                        <div
                            ref={modalImgWrapperRef}
                            className="relative w-[95vw] h-[95dvh] md:w-[85vw] md:h-[85dvh]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={selectedImage.src}
                                alt={selectedImage.alt || 'Expanded view'}
                                fill
                                sizes="(max-width: 768px) 95vw, 85vw"
                                priority
                                className="object-contain drop-shadow-2xl rounded-sm"
                            />
                        </div>
                    )}
                </div>,
                document.body
            )}
        </>
    );
};

export default ErakitAbout;