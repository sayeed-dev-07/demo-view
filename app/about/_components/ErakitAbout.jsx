'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import TextAnimation from './TextAnimation';
import ImgAnimation from './ImgAnimation';
import { aboutErakitData } from './ErakitData';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { ScrollSmoother } from 'gsap/ScrollSmoother'; // Uncomment if you are using Smoother wrapper

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ErakitAbout = () => {
    const data = aboutErakitData;
    const mainRef = useRef(null);

    useGSAP(() => {
        gsap.to(mainRef.current, {
            autoAlpha: 1,
            duration: 0.5,
            ease: 'power2.out'
        });
    }, { scope: mainRef });

    return (
        <div>
            <div ref={mainRef} className='invisible bg-[#f4f4f4] text-gray-900 min-h-screen selection:bg-black selection:text-white overflow-hidden font-sans'>

                {/* --- HERO SECTION --- */}
                <div className='h-screen w-full flex flex-col lg:flex-row'>
                    {/* Left side */}
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

                    {/* Right side */}
                    <div className='w-full lg:w-1/2 h-[70vh]  lg:h-full relative mt-8 lg:mt-0 p-4 lg:p-12 flex items-center justify-center'>
                        <div className="w-full h-fit relative overflow-hidden ">
                            <ImgAnimation
                                scroll={false}
                                src={data.hero.image.src}
                                alt={data.hero.image.alt}
                                priority={true}
                                className='w-full h-full object-cover object-top'
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
                                {/* Image Box */}
                                <div className='w-full lg:w-7/12 aspect-[16/10] relative '>
                                    <ImgAnimation
                                        src={section.image.src}
                                        alt={section.image.alt}
                                        className='w-full h-full object-cover object-top'
                                    />
                                </div>

                                {/* Text Box */}
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
                    <div className='w-full lg:w-10/12 aspect-[16/9] relative mb-16 lg:mb-24'>
                        <ImgAnimation
                            src={data.pluginSection.image.src}
                            alt={data.pluginSection.image.alt}
                            className='w-full h-full object-cover object-top'
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
        </div>
    );
};

export default ErakitAbout;