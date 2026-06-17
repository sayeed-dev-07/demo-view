'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import TextAnimation from './TextAnimation';
import { aboutErakitData } from './ErakitData';
import ImgAnimation from './ImgAnimation';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

gsap.registerPlugin(useGSAP)

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

        <div >

            <div ref={mainRef} className='invisible bg-[#f4f4f4] text-gray-900 min-h-screen selection:bg-black selection:text-white overflow-hidden font-sans'>

                {/* --- HERO SECTION --- */}
                <div className='h-screen w-full flex flex-col lg:flex-row'>

                    {/* left side  */}
                    <div className='w-full lg:w-1/2 flex flex-col px-3 lg:px-12 py-6 lg:py-[5%] h-full gap-y-4 justify-end'>
                        <TextAnimation
                            Scroll={false}
                            style={'text-5xl md:text-7xl lg:text-8xl font-light tracking-tighter'}
                            text={data.hero.title}
                        />
                        <TextAnimation
                            Scroll={false}
                            delay={0.4}
                            style={'text-sm md:text-base text-gray-400 uppercase tracking-[0.2em]'}
                            text={data.hero.subtitle}
                        />
                    </div>

                    {/* right side  */}
                    <div data-speed='auto' className='w-full  lg:w-1/2 h-[70vh] lg:h-full relative mt-8 lg:mt-0'>
                        <ImgAnimation
                            scroll={false}
                            src={data.hero.image.src}
                            alt={data.hero.image.alt}
                            priority={true}
                            className='w-full h-full'
                        />
                    </div>
                </div>

                {/* --- SECTION 2: Left Content, Right Staggered Text --- */}
                <div className='max-w-[1600px] mx-auto px-3 lg:px-12 py-32 lg:py-48 grid grid-cols-1 lg:grid-cols-12 gap-y-6 lg:gap-x-8'>

                    {/* Left side: Heading + Image */}
                    <div className='lg:col-span-5 flex flex-col gap-6 lg:gap-12'>
                        <div className='flex flex-col gap-2'>
                            <TextAnimation
                                style='text-3xl md:text-4xl lg:text-5xl font-light tracking-tight'
                                text={data.section2.heading}
                            />
                            <TextAnimation
                                delay={0.2}
                                style='text-xl md:text-2xl font-light text-gray-500'
                                text={data.section2.subheading}
                            />
                        </div>

                        <div className='w-full h-[60vh] lg:h-[70vh] relative'>
                            <ImgAnimation
                                src={data.section2.image.src}
                                alt={data.section2.image.alt}
                                className='w-full h-full'
                            />
                        </div>
                    </div>

                    {/* Right side */}
                    <div className='lg:col-span-5 lg:col-start-8 flex flex-col justify-center gap-4 mt-12 lg:mt-48'>
                        {data.section2.paragraphs.map((text, index) => (
                            <div key={index} className="max-w-sm">
                                <TextAnimation
                                    style='text-sm md:text-lg text-gray-800 leading-loose font-light'
                                    text={text}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- SECTION 3: Left Text, Right Complex Images --- */}
                <div className='max-w-[1600px] mx-auto px-3 lg:px-12 py-32 lg:py-48 grid grid-cols-1 lg:grid-cols-12 gap-y-6 lg:gap-x-8 items-center'>

                    {/* Left side: Staggered text */}
                    <div className='lg:col-span-4 lg:col-start-2 flex flex-col justify-center gap-4 order-2 lg:order-1'>
                        {data.section3.paragraphs.map((text, index) => (
                            <div key={index} className="max-w-[500px]">
                                <TextAnimation
                                    style='text-sm md:text-lg text-gray-800 leading-loose font-light'
                                    text={text}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Right side: Images */}
                    <div className='lg:col-span-6 lg:col-start-7 flex flex-col gap-12 lg:gap-24 order-1 lg:order-2'>
                        {/* Small offset image */}
                        <div className='w-2/3 lg:w-1/2 aspect-[16/9] relative self-end'>
                            <ImgAnimation
                                src={data.section3.imageTopRight.src}
                                alt={data.section3.imageTopRight.alt}
                                className='w-full h-full'
                            />
                        </div>
                        {/* Large bottom image */}
                        <div className='w-full aspect-[4/3] relative'>
                            <ImgAnimation
                                src={data.section3.imageBottomRight.src}
                                alt={data.section3.imageBottomRight.alt}
                                className='w-full h-full'
                            />
                        </div>
                    </div>
                </div>

                {/* --- SECTION 4: Center Plugin Block --- */}
                <div className='max-w-[1600px] mx-auto px-3 lg:px-12 py-12 lg:py-24 flex flex-col items-center text-center'>
                    <div className='w-full lg:w-8/12 aspect-[16/9] relative mb-16 lg:mb-24'>
                        <ImgAnimation
                            src={data.section4.image.src}
                            alt={data.section4.image.alt}
                            className='w-full h-full'
                        />
                    </div>

                    <div className='max-w-2xl flex flex-col gap-8'>
                        <TextAnimation
                            style='text-lg md:text-xl text-gray-800 font-light leading-relaxed'
                            text={data.section4.paragraphs[0]}
                        />
                        <TextAnimation Scroll={false}
                            style='text-sm tracking-[0.2em] uppercase text-gray-400 mt-4'
                            text={data.section4.badgeLabel}
                        />
                    </div>
                </div>

            </div>

        </div>
    );
};

export default ErakitAbout;