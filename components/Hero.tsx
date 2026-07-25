'use client';

import React, { useState, useEffect } from 'react';
import StaggeredMenu from '@/components/StaggeredMenu';
import Image from 'next/image';
import Link from 'next/link';
import Preloader from './Preloader';

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

export default function Hero() {
    const [videoReady, setVideoReady] = useState(false);
    const [animationComplete, setAnimationComplete] = useState(false);
    const [showPreloader, setShowPreloader] = useState(true);

    const handlePreloaderComplete = () => {
        setAnimationComplete(true);
    };

    useEffect(() => {
        if (videoReady && animationComplete) {
            setShowPreloader(false);
        }
    }, [videoReady, animationComplete]);

    // Fallback timeout in case video takes too long (e.g., 5 seconds)
    useEffect(() => {
        const timeout = setTimeout(() => {
            setVideoReady(true);
        }, 5000);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <section className="h-screen w-full px-[4px] pt-[4px] pb-[10px] sm:p-[10px] relative z-[100]">
            {showPreloader && (
                <Preloader
                    onComplete={handlePreloaderComplete}
                    videoReady={videoReady}
                />
            )}

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

            <div className="h-full w-full rounded-[2rem] bg-white overflow-hidden relative">
                <video
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    autoPlay
                    muted
                    playsInline
                    onCanPlayThrough={() => setVideoReady(true)}
                    onEnded={(e) => {
                        e.currentTarget.currentTime = 0;
                    }}
                    aria-hidden="true"
                >
                    <source src="/heo.mp4?v=2" type="video/mp4" />
                </video>
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/70 sm:bg-black/60 pointer-events-none" />

                {/* Logo Container */}
                <div className="absolute left-8 sm:left-12 top-8 lg:top-8 h-14 lg:h-auto bg-white rounded-xl lg:rounded-2xl p-2 z-[60] hidden lg:flex items-center">
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

                <div className="relative z-10 flex flex-col justify-end h-full px-8 pb-36 sm:px-12 sm:pb-52 max-w-7xl">
                    <h1 className="text-[2.6rem] sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 sm:mb-10 font-['Neospeed'] leading-tight text-center sm:text-left">
                        Your Global <br /> <span className="whitespace-nowrap">Delivery Partner</span>
                    </h1>
                    <p className="text-base sm:text-lg text-slate-200 max-w-2xl text-justify sm:text-left">
                        We help overseas clients scale their tech and professional services <br className="hidden sm:inline" /> operations with the right people, processes, and support.
                    </p>

                    {/* Service Cards */}
                    <div className="grid grid-cols-2 gap-1 mt-16 z-20 lg:absolute lg:right-4 xl:-right-36 lg:bottom-32 xl:bottom-24 lg:flex lg:flex-col lg:items-end lg:space-y-3 xl:space-y-4 lg:mt-0 lg:gap-0">

                        {/* Card 1: Business Operations */}
                        <div className="relative group w-full lg:w-[270px] xl:w-[320px] lg:mr-12 xl:mr-24 transform hover:-translate-x-2 transition-transform duration-300">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/40 to-cyan-400/40 rounded-[2rem] blur-md opacity-70 group-hover:opacity-100 transition-opacity"></div>
                            <div className="relative bg-white/10 backdrop-blur-xl border border-white/40 p-3 sm:p-5 lg:p-4 xl:p-5 rounded-[2rem] flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4 sm:gap-6 lg:gap-4 xl:gap-6 shadow-sm hover:shadow-md transition-all h-full sm:h-auto px-6 lg:px-4 xl:px-6">
                                <span className="text-white font-medium text-sm sm:text-lg lg:text-base xl:text-lg text-center sm:text-left order-2 sm:order-1 whitespace-nowrap">Business Ops</span>
                                <div className="w-8 h-8 sm:w-12 sm:h-12 lg:w-10 lg:h-10 xl:w-12 xl:h-12 flex items-center justify-center text-white order-1 sm:order-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-settings"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.47a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>
                                </div>
                            </div>
                        </div>

                        {/* Card 2: IT Systems */}
                        <div className="relative group w-full lg:w-[290px] xl:w-[340px] lg:mr-4 xl:mr-8 transform hover:-translate-x-2 transition-transform duration-300">
                            <div className="absolute inset-0 bg-gradient-to-r from-sky-500/40 to-blue-600/40 rounded-[2rem] blur-md opacity-70 group-hover:opacity-100 transition-opacity"></div>
                            <div className="relative bg-white/10 backdrop-blur-xl border border-white/40 p-3 sm:p-5 lg:p-4 xl:p-5 rounded-[2rem] flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4 sm:gap-6 lg:gap-4 xl:gap-6 shadow-sm hover:shadow-md transition-all h-full sm:h-auto px-6 lg:px-4 xl:px-6">
                                <span className="text-white font-medium text-sm sm:text-lg lg:text-base xl:text-lg text-center sm:text-left order-2 sm:order-1 whitespace-nowrap">IT Systems</span>
                                <div className="w-8 h-8 sm:w-12 sm:h-12 lg:w-10 lg:h-10 xl:w-12 xl:h-12 flex items-center justify-center text-white order-1 sm:order-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-server"><rect width="20" height="8" x="2" y="2" rx="2" ry="2" /><rect width="20" height="8" x="2" y="14" rx="2" ry="2" /><line x1="6" x2="6.01" y1="6" y2="6" /><line x1="6" x2="6.01" y1="18" y2="18" /></svg>
                                </div>
                            </div>
                        </div>

                        {/* Card 3: Tech Consulting */}
                        <div className="relative group w-full lg:w-[310px] xl:w-[360px] lg:mr-0 transform hover:-translate-x-2 transition-transform duration-300">
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/40 to-teal-500/40 rounded-[2rem] blur-md opacity-70 group-hover:opacity-100 transition-opacity"></div>
                            <div className="relative bg-white/10 backdrop-blur-xl border border-white/40 p-3 sm:p-5 lg:p-4 xl:p-5 rounded-[2rem] flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4 sm:gap-6 lg:gap-4 xl:gap-6 shadow-sm hover:shadow-md transition-all h-full sm:h-auto px-6 lg:px-4 xl:px-6">
                                <span className="text-white font-medium text-sm sm:text-lg lg:text-base xl:text-lg text-center sm:text-left order-2 sm:order-1 whitespace-nowrap">Tech Consulting</span>
                                <div className="w-8 h-8 sm:w-12 sm:h-12 lg:w-10 lg:h-10 xl:w-12 xl:h-12 flex items-center justify-center text-white order-1 sm:order-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><line x1="16" x2="8" y1="13" y2="13" /><line x1="16" x2="8" y1="17" y2="17" /><line x1="10" x2="8" y1="9" y2="9" /></svg>
                                </div>
                            </div>
                        </div>

                        {/* Card 4: App Development */}
                        <div className="relative group w-full lg:w-[290px] xl:w-[340px] lg:mr-6 xl:mr-10 transform hover:-translate-x-2 transition-transform duration-300">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/40 to-indigo-500/40 rounded-[2rem] blur-md opacity-70 group-hover:opacity-100 transition-opacity"></div>
                            <div className="relative bg-white/10 backdrop-blur-xl border border-white/40 p-3 sm:p-5 lg:p-4 xl:p-5 rounded-[2rem] flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4 sm:gap-6 lg:gap-4 xl:gap-6 shadow-sm hover:shadow-md transition-all h-full sm:h-auto px-6 lg:px-4 xl:px-6">
                                <span className="text-white font-medium text-sm sm:text-lg lg:text-base xl:text-lg text-center sm:text-left order-2 sm:order-1 whitespace-nowrap">App Development</span>
                                <div className="w-8 h-8 sm:w-12 sm:h-12 lg:w-10 lg:h-10 xl:w-12 xl:h-12 flex items-center justify-center text-white order-1 sm:order-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-smartphone"><rect width="14" height="20" x="5" y="2" rx="2" ry="2" /><path d="M12 18h.01" /></svg>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
