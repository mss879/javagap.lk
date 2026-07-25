'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TrendingUp, Clock } from 'lucide-react';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const ThreeDCubeCard = () => {
    const cubeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // 3D Cube Rotation Animation
        if (cubeRef.current) {
            gsap.to(cubeRef.current, {
                rotationY: 360,
                rotationX: 360,
                duration: 20,
                repeat: -1,
                ease: "none"
            });
        }
    }, []);

    return (
        <div className="relative w-full h-full rounded-3xl overflow-hidden bg-black text-white group">
            <style jsx>{`
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .cube-face {
            position: absolute;
            width: 200px;
            height: 200px;
            border: 1px solid rgba(255,255,255,0.2);
            background: rgba(255,255,255,0.1);
            display: flex;
            align-items: center;
            justify-content: center;
        }
        /* Cube mapping assuming 200px size for simplicity, or we make it responsive */
        .front  { transform: translateZ(100px); }
        .back   { transform: rotateY(180deg) translateZ(100px); }
        .right  { transform: rotateY(90deg) translateZ(100px); }
        .left   { transform: rotateY(-90deg) translateZ(100px); }
        .top    { transform: rotateX(90deg) translateZ(100px); }
        .bottom { transform: rotateX(-90deg) translateZ(100px); }

        .roll-wrapper {
            display: flex;
            flex-direction: column;
            /* transitions handled by GSAP */
        }
      `}</style>

            {/* Background Video */}
            <div className="absolute inset-0 z-0">
                <video
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    aria-hidden="true"
                >
                    <source src="https://cdn.prod.website-files.com/68ee74b7102caefef6ce7890%2F68f23d0b14d2158ab1fa8dea_14471915_3840_2160_30fps%20%281%29-transcode.mp4" type="video/mp4" />
                    <source src="https://cdn.prod.website-files.com/68ee74b7102caefef6ce7890%2F68f23d0b14d2158ab1fa8dea_14471915_3840_2160_30fps%20%281%29-transcode.webm" type="video/webm" />
                </video>
                <div className="absolute inset-0 bg-black/40"></div>
            </div>

            <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                {/* Top Content: Logo and Year */}
                {/* Top Content: Logo */}
                <div className="flex justify-between items-start">
                    <div className="relative h-12 w-auto">
                        <Image
                            src="/java-global-access-logo.png"
                            alt="Java Global Access™ Logo"
                            className="object-contain rounded-lg"
                            height={48}
                            width={100}
                        />
                    </div>
                </div>

                {/* Middle: 3D Cube */}
                <div className="flex justify-center items-center py-10 perspective-[1000px]">
                    <div className="w-[200px] h-[200px] relative preserve-3d" ref={cubeRef}>
                        {/* We need images for faces as per HTML. Using placeholders or the provided mapped images if accessible. 
                    The HTML provided `srcset` images. I'll use the `src` from the HTML. 
                */}
                        <div className="cube-face front">
                            <Image src="/cubes_blue_theme.png" className="w-full h-full object-cover" alt="Front" fill />
                        </div>
                        <div className="cube-face back">
                            <Image src="/cubes_blue_theme.png" className="w-full h-full object-cover" alt="Back" fill />
                        </div>
                        <div className="cube-face right">
                            <Image src="/cubes_blue_theme.png" className="w-full h-full object-cover" alt="Right" fill />
                        </div>
                        <div className="cube-face left">
                            <Image src="/cubes_blue_theme.png" className="w-full h-full object-cover" alt="Left" fill />
                        </div>
                        <div className="cube-face top">
                            <Image src="/cubes_blue_theme.png" className="w-full h-full object-cover" alt="Top" fill />
                        </div>
                        <div className="cube-face bottom">
                            <Image src="/cubes_blue_theme.png" className="w-full h-full object-cover" alt="Bottom" fill />
                        </div>
                    </div>
                </div>

                {/* Bottom: Stats */}
                {/* Item 1: Scalable Execution */}
                <div className="relative group/item">
                    <div className="flex items-start gap-4 mb-3">
                        <div className="p-3 bg-blue-500/10 rounded-xl group-hover/item:bg-blue-500/20 transition-colors duration-300">
                            {/* Custom Abstract 'Growth' Icon */}
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                                <path d="M21 7L13 15L9 11L3 17" stroke="url(#blue-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M21 7H15" stroke="url(#blue-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M21 7V13" stroke="url(#blue-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <circle cx="21" cy="7" r="3" fill="url(#blue-gradient)" fillOpacity="0.2" />
                                <circle cx="3" cy="17" r="2" fill="url(#blue-gradient)" fillOpacity="0.2" />
                                <defs>
                                    <linearGradient id="blue-gradient" x1="3" y1="17" x2="21" y2="7" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#60A5FA" />
                                        <stop offset="1" stopColor="#3B82F6" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white mb-2">Scalable Execution</h3>
                            <p className="text-sm text-slate-300 leading-relaxed max-w-[80%]">
                                Through structured manpower planning aligned to demand.
                            </p>
                        </div>
                    </div>
                    <div className="w-full h-px bg-white/10 mt-4 group-hover/item:bg-blue-500/50 transition-colors duration-300"></div>
                </div>

                {/* Item 2: Future-Proof Design */}
                <div className="relative group/item">
                    <div className="flex items-start gap-4 mb-3">
                        <div className="p-3 bg-cyan-500/10 rounded-xl group-hover/item:bg-cyan-500/20 transition-colors duration-300">
                            {/* Custom Abstract 'Infinity/Cycle' Icon */}
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                                <path d="M12 8V4H8" stroke="url(#cyan-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M20.9 13.9C20.6 15.6 19.8 17.1 18.5 18.2C15.8 20.7 11.5 20.2 9.5 17.5L5 12L7.3 8.7" stroke="url(#cyan-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M3.1 10.1C3.4 8.4 4.2 6.9 5.5 5.8C8.2 3.3 12.5 3.8 14.5 6.5L19 12L16.7 15.3" stroke="url(#cyan-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <defs>
                                    <linearGradient id="cyan-gradient" x1="4" y1="4" x2="20" y2="20" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#22d3ee" />
                                        <stop offset="1" stopColor="#06b6d4" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white mb-2">Future-Proof Design</h3>
                            <p className="text-sm text-slate-300 leading-relaxed max-w-[80%]">
                                Built to adapt and evolve with changing market needs.
                            </p>
                        </div>
                    </div>
                    <div className="w-full h-px bg-white/10 mt-4 group-hover/item:bg-cyan-500/50 transition-colors duration-300"></div>
                </div>

            </div>
        </div>
    );
};

export default ThreeDCubeCard;
