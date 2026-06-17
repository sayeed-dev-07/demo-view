'use client'
import React, { useRef } from 'react';
import ErakitAbout from './_components/ErakitAbout';
import gsap from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollSmoother, ScrollTrigger, useGSAP)




const Page = () => {

    const containerRef = useRef(null)

    useGSAP(() => {
        // create the scrollSmoother before your scrollTriggers
        ScrollSmoother.create({
            smooth: 1.5, // how long (in seconds) it takes to "catch up" to the native scroll position
            effects: true, // looks for data-speed and data-lag attributes on elements
            smoothTouch: 0.1 // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
        });
    }, { scope: containerRef })

    return (
        <div id="smooth-wrapper" ref={containerRef}>
            <div id="smooth-content">
                <ErakitAbout />
            </div>
        </div>
    );
};

export default Page;