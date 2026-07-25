'use client';

import React from 'react';
import StaggeredMenu from '@/components/StaggeredMenu';
import Image from 'next/image';
import Link from 'next/link';


const menuItems = [
    { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
    { label: 'About', ariaLabel: 'Learn about us', link: '/about' },
    { label: 'Services', ariaLabel: 'View our services', link: '/services' },
    { label: 'How We Work', ariaLabel: 'Our process', link: '/how-it-works' },
    { label: 'Contact', ariaLabel: 'Get in touch', link: '/contact' },
];

const socialItems = [
    { label: 'Instagram', link: 'https://www.instagram.com/javagap.ae/' },
    { label: 'Facebook', link: 'https://www.facebook.com/share/1DJprGDKoM/?mibextid=wwXIfr' },
    { label: 'Youtube', link: 'https://youtube.com/@javaglobalaccessplatformfz-llc' },
    { label: 'Linkedin', link: 'https://www.linkedin.com/in/java-global-access-platform-fz-llc-bb392a3b1/' }
];

export default function HowItWorksHero() {
    return (
        <section className="h-[70vh] sm:h-[85vh] w-full px-[4px] pt-[4px] pb-[10px] sm:p-[10px] relative z-[100]">
            {/* Staggered Menu - Moved outside to prevent clipping */}
            <div className="absolute inset-x-[4px] top-[4px] bottom-[10px] sm:inset-[10px] z-50 pointer-events-none">
                <div className="w-full h-full">
                    <StaggeredMenu
                        position="right"
                        items={menuItems}
                        socialItems={socialItems}
                        displaySocials
                        displayItemNumbering={false}
                        menuButtonColor="#000000"
                        openMenuButtonColor="#000"
                        changeMenuColorOnOpen={true}
                        colors={['#005495', '#00AEEF']}
                        logoUrl="/java-global-access-logo.png"
                        accentColor="#00AEEF"
                        onMenuOpen={() => console.log('Menu opened')}
                        onMenuClose={() => console.log('Menu closed')}
                        displayLogo={true}
                    />
                </div>
            </div>

            <div className="h-full w-full rounded-[2rem] bg-black overflow-hidden relative">

                {/* Logo Container */}
                <div className="absolute left-8 sm:left-12 top-[38px] lg:top-8 bg-white rounded-xl lg:rounded-2xl p-2 z-[60] hidden lg:block">
                    <Link href="/" className="relative h-10 lg:h-16 w-auto block">
                        <Image
                            src="/java-global-access-logo.png"
                            alt="Java GAP™ Logo"
                            className="object-contain"
                            width={0}
                            height={0}
                            sizes="(max-width: 768px) 100vw, 33vw"
                            style={{ width: 'auto', height: '100%' }}
                            priority
                        />
                    </Link>
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-end h-full px-8 pb-16 sm:px-12 sm:pb-20 max-w-7xl mx-auto w-full">
                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-8 font-['Neospeed'] leading-[1.1]">
                        How cross-border<br />delivery is structured.
                    </h1>

                    <div className="flex flex-col lg:flex-row gap-12 lg:items-end justify-between">
                        <p className="text-base sm:text-xl text-slate-300 max-w-2xl leading-relaxed text-justify sm:text-left">
                            Java Global Access Platform FZ-LLC delivers professional and technology-enabled services exclusively to overseas clients through a defined engagement lifecycle. Delivery is managed using standardized workflows, structured supervision, and consistent reporting to support continuity and measurable outcomes.
                        </p>


                    </div>
                </div>

                {/* Background Overlay for better test readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none z-0" />
            </div>
        </section>
    );
}
