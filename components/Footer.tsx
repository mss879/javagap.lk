import React from 'react';
import { Instagram, Facebook, Youtube, Linkedin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
    const links = [
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about' },
        { label: 'Services', href: '/services' },
        { label: 'How We Work', href: '/how-it-works' },
        { label: 'Contact', href: '/contact' },
    ];

    return (
        <footer className="relative m-4 rounded-[2rem] overflow-hidden min-h-[400px] flex flex-col justify-between">
            {/* Video Background */}
            <video
                className="absolute top-0 left-0 w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                aria-hidden="true"
            >
                <source src="/footer.mp4" type="video/mp4" />
            </video>

            {/* Dark Overlay - Darkened as requested */}
            <div className="absolute inset-0 bg-black/80 pointer-events-none" />

            {/* Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-12 flex flex-col justify-between h-full gap-12 flex-grow">

                {/* Top Section: Logo/Desc, Contact & Links */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 pt-8">
                    {/* 1. Logo & Description */}
                    <div className="space-y-6 lg:col-span-1">
                        <Link href="/" className="bg-white p-2 rounded-xl w-fit block hover:opacity-90 transition-opacity relative z-[20]">
                            <Image
                                src="/new-logo.png"
                                alt="Java GAP™"
                                width={120}
                                height={40}
                                className="h-10 w-auto object-contain cursor-pointer"
                            />
                        </Link>
                        <p className="text-white text-base sm:text-lg leading-relaxed text-justify sm:text-left tracking-tighter sm:tracking-normal">
                            Global Delivery for Tech & Professional Services. Structured professional services and managed operational support for overseas clients.
                        </p>
                        <div className="text-white/60 text-sm space-y-4">
                            <h4 className="text-white font-semibold text-base mb-2">Corporate Registration Information</h4>
                            
                            <div>
                                <p className="text-white/80 font-medium">United Arab Emirates (Ras Al Khaimah Free Zone)</p>
                                <ul className="list-disc list-inside ml-1 space-y-0.5">
                                    <li>Registration No.: 0000004082362</li>
                                    <li>Trade License Nos.: 47029062, 46001825</li>
                                </ul>
                            </div>

                            <div>
                                <p className="text-white/80 font-medium">Colombo Port City, Sri Lanka</p>
                                <ul className="list-disc list-inside ml-1">
                                    <li>Registration No.: PCC 00361397</li>
                                </ul>
                            </div>

                            <div>
                                <p className="text-white/80 font-medium">Sri Lanka</p>
                                <ul className="list-disc list-inside ml-1">
                                    <li>Department of Registrar of Companies Registration No.: PV 00351228</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* 2. Contact Details (Takes 2 Columns on large screens) */}
                    <div className="space-y-4">
                        <h3 className="text-white font-semibold text-lg mb-2">Our Office</h3>
                        <address className="text-white not-italic space-y-2">
                            <p>Java Global Access Platform FZ-LLC,</p>
                            <p>FDBC4722, Compass Building, Al Shohada Road,</p>
                            <p>AL Hamra Industrial Zone-FZ,</p>
                            <p>Ras Al Khaimah,</p>
                            <p>United Arab Emirates.</p>
                            <div className="pt-4 space-y-1">
                                <p>Tel : +971568226844</p>
                                <p>Fax : +971565439655</p>
                                <p>Email : info@javagap.ae</p>
                            </div>
                        </address>
                    </div>

                    {/* 3. Navigation Links */}
                    <nav className="flex flex-col gap-4 lg:ml-32">
                        <h3 className="text-white font-semibold text-lg mb-2">Pages</h3>
                        {links.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="text-white hover:text-white/80 transition-colors duration-200"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Bottom Section: Socials & Credits */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 border-t border-white/20 pt-8 mt-auto">

                    {/* Social Icons */}
                    <div className="flex gap-4">
                        <Link href="https://www.instagram.com/javagap.ae/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-all duration-300 group">
                            <Instagram className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                        </Link>
                        <Link href="https://www.facebook.com/share/1DJprGDKoM/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-all duration-300 group">
                            <Facebook className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                        </Link>
                        <Link href="https://youtube.com/@javaglobalaccessplatformfz-llc" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-all duration-300 group">
                            <Youtube className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                        </Link>
                        <Link href="https://www.linkedin.com/in/java-global-access-platform-fz-llc-bb392a3b1/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-all duration-300 group">
                            <Linkedin className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                        </Link>
                    </div>

                    {/* Credits */}
                    <div className="flex flex-col md:flex-row items-center gap-4 text-white text-sm font-light">
                        <Link
                            href="https://www.arcai.agency"
                            target="_blank"
                            rel="noopener"
                            title="ARC AI - Web Design & Digital Solutions"
                            className="flex items-center gap-1"
                        >
                            <span>Designed &amp; Developed by</span>
                            <span className="relative w-28 h-10 translate-y-1 block">
                                <Image
                                    src="/arc-logo.png"
                                    alt="ARC AI - Web Design & Digital Solutions"
                                    fill
                                    className="object-contain hover:opacity-80 transition-opacity"
                                />
                            </span>
                        </Link>
                        <span className="hidden md:block text-white">|</span>
                        <span>Powered by Next.js</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
