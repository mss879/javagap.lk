'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Scale } from 'lucide-react';

const registrations = [
    {
        jurisdiction: 'United Arab Emirates',
        subtitle: 'Ras Al Khaimah Free Zone',
        image: '/new-section/United Arab Emirates (Ras Al Khaimah Free Zone).png',
        details: [
            { label: 'Registration No.', value: '0000004082362' },
            { label: 'Trade License No.', value: '47029062' },
            { label: 'Trade License No.', value: '46001825' },
        ],
    },
    {
        jurisdiction: 'Sri Lanka',
        subtitle: 'Colombo Port City',
        image: '/new-section/Colombo Port City, Sri Lanka.png',
        details: [
            { label: 'Registration No.', value: 'PCC 00361397' },
        ],
    },
    {
        jurisdiction: 'Sri Lanka',
        subtitle: 'Department of Register of Companies',
        image: '/new-section/Sri Lanka gvernment.png',
        details: [
            { label: 'Registration No.', value: 'PV 00351228' },
        ],
    },
    {
        jurisdiction: 'Sri Lanka',
        subtitle: 'Inland Revenue Department',
        image: '/new-section/Sri Lanka gvernment.png',
        details: [
            { label: 'Taxpayer Identification No. (TIN)', value: '242557670' },
        ],
        legislation: 'This Taxpayer Identification Number is issued as per section 102 (4) of the Inland Revenue Act, No. 24 of 2017.',
    },
];

export default function CorporateRegistration() {
    const containerRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            // Header animation
            gsap.fromTo(headerRef.current,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 80%',
                    },
                }
            );

            // List items stagger animation
            itemsRef.current.forEach((item, index) => {
                if (!item) return;
                gsap.fromTo(item,
                    { y: 40, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        delay: index * 0.15,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: item,
                            start: 'top 85%',
                        },
                    }
                );
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="py-24 sm:py-32 bg-white border-y border-zinc-100"
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                
                {/* Editorial Header */}
                <div ref={headerRef} className="max-w-3xl mb-20">
                    <div className="inline-flex items-center gap-2 mb-6 text-zinc-500">
                        <Scale size={18} className="text-zinc-400" />
                        <span className="uppercase tracking-widest text-xs font-semibold">Global Regulatory Presence</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-zinc-900 leading-tight">
                        Corporate <br className="hidden sm:block"/> Registration Info.
                    </h2>
                    <p className="mt-6 text-lg text-zinc-500 leading-relaxed max-w-xl">
                        Operating with full compliance and structural transparency across established international trade jurisdictions.
                    </p>
                </div>

                {/* Staggered Vertical List */}
                <div className="space-y-6 sm:space-y-8">
                    {registrations.map((reg, index) => (
                        <div
                            key={index}
                            ref={(el) => { itemsRef.current[index] = el; }}
                            className="group flex flex-col md:flex-row items-start md:items-stretch gap-6 sm:gap-10 p-6 sm:p-10 bg-zinc-50/50 hover:bg-white border border-zinc-200 hover:border-zinc-300 rounded-[2rem] transition-all duration-300 shadow-sm hover:shadow-md"
                        >
                            {/* Emblem Container */}
                            <div className="shrink-0 relative w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-2xl sm:rounded-[1.5rem] border border-zinc-100 shadow-sm p-4 flex items-center justify-center group-hover:shadow-lg group-hover:-translate-y-1 transition-all duration-300">
                                <Image
                                    src={reg.image}
                                    alt={`${reg.jurisdiction} emblem`}
                                    fill
                                    className="object-contain p-3 sm:p-4"
                                    sizes="(max-width: 640px) 96px, 128px"
                                />
                            </div>

                            {/* Details Container */}
                            <div className="flex-1 flex flex-col justify-center min-w-0">
                                <div className="mb-4">
                                    <h3 className="text-2xl sm:text-3xl font-semibold text-zinc-900 tracking-tight truncate">
                                        {reg.jurisdiction}
                                    </h3>
                                    <p className="text-sm sm:text-base text-zinc-500 font-medium mt-1">
                                        {reg.subtitle}
                                    </p>
                                </div>

                                {/* Registration Numbers Grid */}
                                <div className="flex flex-wrap gap-4 sm:gap-6">
                                    {reg.details.map((detail, i) => (
                                        <div key={i} className="flex flex-col gap-1.5">
                                            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-zinc-400">
                                                {detail.label}
                                            </span>
                                            <span className="text-sm sm:text-base font-mono font-medium text-zinc-800 bg-white border border-zinc-200 rounded-lg px-3 py-1.5 shadow-sm inline-flex w-fit">
                                                {detail.value}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {'legislation' in reg && reg.legislation && (
                                    <p className="text-[11px] sm:text-xs text-zinc-400 mt-5 leading-relaxed max-w-2xl border-t border-zinc-100 pt-4">
                                        {reg.legislation}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
