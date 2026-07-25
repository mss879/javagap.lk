'use client';

import React, { useCallback, useLayoutEffect, useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { Instagram, Facebook, Youtube, Linkedin, Twitter, Github } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export interface StaggeredMenuItem {
    label: string;
    ariaLabel: string;
    link: string;
}
export interface StaggeredMenuSocialItem {
    label: string;
    link: string;
}
export interface StaggeredMenuProps {
    position?: 'left' | 'right';
    colors?: string[];
    items?: StaggeredMenuItem[];
    socialItems?: StaggeredMenuSocialItem[];
    displaySocials?: boolean;
    displayItemNumbering?: boolean;
    className?: string;
    logoUrl?: string;
    menuButtonColor?: string;
    openMenuButtonColor?: string;
    accentColor?: string;
    isFixed?: boolean;
    changeMenuColorOnOpen?: boolean;
    closeOnClickAway?: boolean;
    onMenuOpen?: () => void;
    onMenuClose?: () => void;
    displayLogo?: boolean;
}

export const StaggeredMenu: React.FC<StaggeredMenuProps> = ({
    position = 'right',
    colors = ['#B19EEF', '#5227FF'],
    items = [],
    socialItems = [],
    displaySocials = true,
    displayItemNumbering = true,
    className,
    logoUrl = '/new-logo.png',
    menuButtonColor = '#fff',
    openMenuButtonColor = '#fff',
    changeMenuColorOnOpen = true,
    accentColor = '#5227FF',
    isFixed = false,
    closeOnClickAway = true,
    onMenuOpen,
    onMenuClose,
    displayLogo = true
}: StaggeredMenuProps) => {
    const [open, setOpen] = useState(false);
    const openRef = useRef(false);

    const panelRef = useRef<HTMLDivElement | null>(null);
    const preLayersRef = useRef<HTMLDivElement | null>(null);
    const preLayerElsRef = useRef<HTMLElement[]>([]);

    const plusHRef = useRef<HTMLSpanElement | null>(null);
    const burgerTopRef = useRef<HTMLSpanElement | null>(null);
    const burgerBotRef = useRef<HTMLSpanElement | null>(null);
    const iconRef = useRef<HTMLSpanElement | null>(null);

    const openTlRef = useRef<gsap.core.Timeline | null>(null);
    const closeTweenRef = useRef<gsap.core.Tween | null>(null);
    const spinTweenRef = useRef<gsap.core.Timeline | null>(null);

    const textCycleAnimRef = useRef<gsap.core.Tween | null>(null);
    const colorTweenRef = useRef<gsap.core.Tween | null>(null);

    const toggleBtnRef = useRef<HTMLButtonElement | null>(null);
    const timeRef = useRef<HTMLDivElement | null>(null);
    const ctaRef = useRef<HTMLAnchorElement | null>(null);
    const busyRef = useRef(false);

    const [currentTime, setCurrentTime] = useState('');
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            });
            setCurrentTime(timeString);
        };
        updateTime();
        const interval = setInterval(updateTime, 30000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        let rafId = 0;
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                ticking = true;
                rafId = requestAnimationFrame(() => {
                    setScrolled(window.scrollY > 50);
                    ticking = false;
                });
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => {
            window.removeEventListener('scroll', handleScroll);
            cancelAnimationFrame(rafId);
        };
    }, []);

    const itemEntranceTweenRef = useRef<gsap.core.Tween | null>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const panel = panelRef.current;
            const preContainer = preLayersRef.current;

            const icon = iconRef.current;

            if (!panel || !icon) return;

            let preLayers: HTMLElement[] = [];
            if (preContainer) {
                preLayers = Array.from(preContainer.querySelectorAll('.sm-prelayer')) as HTMLElement[];
            }
            preLayerElsRef.current = preLayers;

            const offscreen = position === 'left' ? -100 : 100;
            gsap.set([panel, ...preLayers], { xPercent: offscreen });

            gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' });
            if (burgerTopRef.current) gsap.set(burgerTopRef.current, { y: 0, rotate: 0 });
            if (plusHRef.current) gsap.set(plusHRef.current, { opacity: 1 });
            if (burgerBotRef.current) gsap.set(burgerBotRef.current, { y: 0, rotate: 0 });

            if (toggleBtnRef.current) gsap.set(toggleBtnRef.current, { color: menuButtonColor });
            if (timeRef.current) gsap.set(timeRef.current, { color: menuButtonColor });
            if (ctaRef.current) gsap.set(ctaRef.current, { color: menuButtonColor, borderColor: menuButtonColor });
        });
        return () => ctx.revert();
    }, [menuButtonColor, position]);

    const buildOpenTimeline = useCallback(() => {
        const panel = panelRef.current;
        const layers = preLayerElsRef.current;
        if (!panel) return null;

        openTlRef.current?.kill();
        if (closeTweenRef.current) {
            closeTweenRef.current.kill();
            closeTweenRef.current = null;
        }
        itemEntranceTweenRef.current?.kill();

        const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel')) as HTMLElement[];
        const numberEls = Array.from(
            panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item')
        ) as HTMLElement[];
        const socialTitle = panel.querySelector('.sm-socials-title') as HTMLElement | null;
        const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link')) as HTMLElement[];

        const layerStates = layers.map(el => ({ el, start: Number(gsap.getProperty(el, 'xPercent')) }));
        const panelStart = Number(gsap.getProperty(panel, 'xPercent'));

        if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
        if (numberEls.length) gsap.set(numberEls, { ['--sm-num-opacity' as any]: 0 });
        if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
        if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });

        const tl = gsap.timeline({ paused: true });

        layerStates.forEach((ls, i) => {
            tl.fromTo(ls.el, { xPercent: ls.start }, { xPercent: 0, duration: 0.5, ease: 'power4.out', force3D: true }, i * 0.07);
        });

        const lastTime = layerStates.length ? (layerStates.length - 1) * 0.07 : 0;
        const panelInsertTime = lastTime + (layerStates.length ? 0.08 : 0);
        const panelDuration = 0.65;

        tl.fromTo(
            panel,
            { xPercent: panelStart },
            { xPercent: 0, duration: panelDuration, ease: 'power4.out', force3D: true },
            panelInsertTime
        );

        if (itemEls.length) {
            const itemsStartRatio = 0.15;
            const itemsStart = panelInsertTime + panelDuration * itemsStartRatio;

            tl.to(
                itemEls,
                { yPercent: 0, rotate: 0, duration: 1, ease: 'power4.out', force3D: true, stagger: { each: 0.1, from: 'start' } },
                itemsStart
            );

            if (numberEls.length) {
                tl.to(
                    numberEls,
                    { duration: 0.6, ease: 'power2.out', ['--sm-num-opacity' as any]: 1, stagger: { each: 0.08, from: 'start' } },
                    itemsStart + 0.1
                );
            }
        }

        if (socialTitle || socialLinks.length) {
            const socialsStart = panelInsertTime + panelDuration * 0.4;

            if (socialTitle) tl.to(socialTitle, { opacity: 1, duration: 0.5, ease: 'power2.out' }, socialsStart);
            if (socialLinks.length) {
                tl.to(
                    socialLinks,
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.55,
                        ease: 'power3.out',
                        stagger: { each: 0.08, from: 'start' },
                        onComplete: () => {
                            gsap.set(socialLinks, { clearProps: 'opacity' });
                        }
                    },
                    socialsStart + 0.04
                );
            }
        }

        openTlRef.current = tl;
        return tl;
    }, [position]);

    const playOpen = useCallback(() => {
        if (busyRef.current) return;
        busyRef.current = true;
        const tl = buildOpenTimeline();
        if (tl) {
            tl.eventCallback('onComplete', () => {
                busyRef.current = false;
            });
            tl.play(0);
        } else {
            busyRef.current = false;
        }
    }, [buildOpenTimeline]);

    const playClose = useCallback(() => {
        openTlRef.current?.kill();
        openTlRef.current = null;
        itemEntranceTweenRef.current?.kill();

        const panel = panelRef.current;
        const layers = preLayerElsRef.current;
        if (!panel) return;

        const all: HTMLElement[] = [...layers, panel];
        closeTweenRef.current?.kill();

        const offscreen = position === 'left' ? -100 : 100;

        closeTweenRef.current = gsap.to(all, {
            xPercent: offscreen,
            force3D: true,
            duration: 0.32,
            ease: 'power3.in',
            overwrite: 'auto',
            onComplete: () => {
                const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel')) as HTMLElement[];
                if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });

                const numberEls = Array.from(
                    panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item')
                ) as HTMLElement[];
                if (numberEls.length) gsap.set(numberEls, { ['--sm-num-opacity' as any]: 0 });

                const socialTitle = panel.querySelector('.sm-socials-title') as HTMLElement | null;
                const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link')) as HTMLElement[];
                if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
                if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });

                busyRef.current = false;
            }
        });
    }, [position]);

    const animateIcon = useCallback((opening: boolean) => {
        const icon = iconRef.current;
        const top = burgerTopRef.current;
        const mid = plusHRef.current; // reusing as middle line
        const bot = burgerBotRef.current;

        if (!icon || !top || !mid || !bot) return;

        spinTweenRef.current?.kill();

        if (opening) {
            gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' });
            spinTweenRef.current = gsap.timeline({ defaults: { ease: 'power4.out', duration: 0.5 } })
                .to(top, { y: 6, rotate: 45 }, 0)
                .to(mid, { opacity: 0 }, 0)
                .to(bot, { y: -6, rotate: -45 }, 0);
        } else {
            spinTweenRef.current = gsap.timeline({ defaults: { ease: 'power4.out', duration: 0.5 } })
                .to(top, { y: 0, rotate: 0 }, 0)
                .to(mid, { opacity: 1 }, 0)
                .to(bot, { y: 0, rotate: 0 }, 0);
        }
    }, []);

    const animateColor = useCallback(
        (opening: boolean) => {
            const btn = toggleBtnRef.current;
            const time = timeRef.current;
            const cta = ctaRef.current;

            colorTweenRef.current?.kill();

            const targetColor = opening && changeMenuColorOnOpen ? openMenuButtonColor : menuButtonColor;

            if (btn) gsap.to(btn, { color: targetColor, duration: 0.3, ease: 'power2.out' });
            if (time) gsap.to(time, { color: targetColor, duration: 0.3, ease: 'power2.out' });
            if (cta) gsap.to(cta, { color: targetColor, borderColor: opening && changeMenuColorOnOpen ? 'rgba(0,0,0,0.2)' : '#000', duration: 0.3, ease: 'power2.out' });
        },
        [openMenuButtonColor, menuButtonColor, changeMenuColorOnOpen]
    );

    React.useEffect(() => {
        if (toggleBtnRef.current) {
            if (changeMenuColorOnOpen) {
                const targetColor = openRef.current ? openMenuButtonColor : menuButtonColor;
                gsap.set(toggleBtnRef.current, { color: targetColor });
                if (timeRef.current) gsap.set(timeRef.current, { color: targetColor });
                if (ctaRef.current) gsap.set(ctaRef.current, { color: targetColor, borderColor: openRef.current ? 'rgba(0,0,0,0.2)' : '#000' });
            } else {
                gsap.set(toggleBtnRef.current, { color: menuButtonColor });
                if (timeRef.current) gsap.set(timeRef.current, { color: menuButtonColor });
                if (ctaRef.current) gsap.set(ctaRef.current, { color: menuButtonColor });
            }
        }
    }, [changeMenuColorOnOpen, menuButtonColor, openMenuButtonColor]);



    const toggleMenu = useCallback(() => {
        const target = !openRef.current;
        openRef.current = target;
        setOpen(target);

        if (target) {
            onMenuOpen?.();
            playOpen();
        } else {
            onMenuClose?.();
            playClose();
        }

        animateIcon(target);
        animateColor(target);
    }, [playOpen, playClose, animateIcon, animateColor, onMenuOpen, onMenuClose]);

    const closeMenu = useCallback(() => {
        if (openRef.current) {
            openRef.current = false;
            setOpen(false);
            onMenuClose?.();
            playClose();
            animateIcon(false);
            animateColor(false);
        }
    }, [playClose, animateIcon, animateColor, onMenuClose]);

    React.useEffect(() => {
        if (!closeOnClickAway || !open) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (
                panelRef.current &&
                !panelRef.current.contains(event.target as Node) &&
                toggleBtnRef.current &&
                !toggleBtnRef.current.contains(event.target as Node)
            ) {
                closeMenu();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [closeOnClickAway, open, closeMenu]);

    return (
        <div
            className={`sm-scope z-[100] ${isFixed || open ? 'fixed top-0 left-0 w-screen h-screen overflow-hidden' : 'w-full h-full'}`}
        >
            <div
                className={
                    (className ? className + ' ' : '') + 'staggered-menu-wrapper pointer-events-none relative w-full h-full z-[100]'
                }
                style={accentColor ? ({ ['--sm-accent' as any]: accentColor } as React.CSSProperties) : undefined}
                data-position={position}
                data-open={open || undefined}
            >
                <div
                    ref={preLayersRef}
                    className="sm-prelayers absolute top-0 right-0 bottom-0 pointer-events-none z-[5] will-change-transform"
                    aria-hidden="true"
                >
                    {(() => {
                        const raw = colors && colors.length ? colors.slice(0, 4) : ['#1e1e22', '#35353c'];
                        let arr = [...raw];
                        if (arr.length >= 3) {
                            const mid = Math.floor(arr.length / 2);
                            arr.splice(mid, 1);
                        }
                        return arr.map((c, i) => (
                            <div
                                key={i}
                                className="sm-prelayer absolute top-0 right-0 h-full w-full translate-x-0"
                                style={{ background: c }}
                            />
                        ));
                    })()}
                </div>

                <header
                    className={`staggered-menu-header flex items-center pointer-events-none transition-all duration-500 ease-in-out ${scrolled
                        ? 'fixed top-4 left-0 right-0 w-[92%] max-w-full mx-auto bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] px-4 py-2 lg:px-8 lg:py-3 justify-between z-[9999] lg:top-0 lg:w-full lg:mx-0 lg:bg-transparent lg:shadow-none lg:backdrop-blur-none lg:rounded-none lg:p-[2em]'
                        : 'absolute top-6 left-0 right-0 mx-auto w-[92%] bg-white rounded-2xl shadow-sm px-4 py-2 lg:top-0 lg:w-full lg:mx-0 lg:bg-transparent lg:backdrop-blur-none lg:rounded-none lg:p-[2em] justify-between z-[102]'
                        }`}
                    aria-label="Main navigation header"
                >
                    {/* Logo Slot - always on far left */}
                    <div
                        className={`sm-logo flex items-center select-none pointer-events-auto transition-all duration-500 flex-shrink-0 ${scrolled
                            ? 'opacity-100 max-w-[140px] lg:max-w-[200px] lg:opacity-0'
                            : 'opacity-100 max-w-[200px] lg:opacity-0 lg:max-w-0 lg:pointer-events-none'
                            }`}
                        aria-label="Logo"
                    >
                        <Link href="/" className="relative z-[200] pointer-events-auto inline-block">
                            <Image
                                src={logoUrl || '/new-logo.png'}
                                alt="Java Global Access™"
                                className="sm-logo-img block h-8 w-auto object-contain cursor-pointer"
                                draggable={false}
                                width={110}
                                height={24}
                            />
                        </Link>
                    </div>

                    <div className={`flex items-center pointer-events-auto relative transition-all duration-500 ${scrolled ? 'gap-2 pl-2 pr-1 h-14 lg:gap-6 lg:pl-10 lg:pr-6 lg:h-20' : 'gap-1 px-1 h-14 lg:gap-6 lg:pl-10 lg:pr-6 lg:h-20'
                        }`}>
                        {/* White Background Bar - hidden when scrolled, but visible on Desktop scroll */}
                        <div
                            className={`absolute inset-0 bg-white rounded-xl lg:rounded-2xl -z-10 shadow-sm transition-opacity duration-500 ${scrolled ? 'opacity-0 lg:opacity-100' : 'opacity-0 lg:opacity-100'}`}
                        />

                        <div ref={timeRef} className="text-right hidden sm:block leading-tight transition-colors text-black">
                            <div className={`font-bold transition-all duration-500 ${scrolled ? 'text-base' : 'text-lg'}`}>{currentTime}</div>
                        </div>

                        <Link
                            ref={ctaRef}
                            href="/contact"
                            className="hidden sm:inline-flex items-center justify-center px-8 py-3 border-2 rounded-full text-sm font-bold tracking-wider hover:bg-black/5 transition-all border-black text-black relative group overflow-visible"
                            style={{ transitionProperty: 'background-color, color, border-color' }}
                        >
                            <span className="sm-cta-pulse" style={{ borderColor: 'inherit' }}></span>
                            LET’S TALK
                        </Link>

                        <button
                            ref={toggleBtnRef}
                            className={`sm-toggle relative inline-flex items-center justify-center border rounded-xl lg:rounded-full w-auto px-5 lg:w-14 lg:px-0 h-14 bg-transparent cursor-pointer overflow-visible transition-all border-black/20 hover:bg-black/5 ${open ? 'text-black border-black/20' : 'text-black'}`}
                            aria-label={open ? 'Close menu' : 'Open menu'}
                            aria-expanded={open}
                            aria-controls="staggered-menu-panel"
                            onClick={toggleMenu}
                            type="button"
                        >
                            <style jsx>{`
                                @media (max-width: 1023px) {
                                    .desktop-burger-icon {
                                        display: none !important;
                                    }
                                }
                            `}</style>

                            {/* Mobile Text "Menu +" */}
                            <span className="lg:hidden text-black font-bold text-lg tracking-wide">
                                {open ? 'Close' : 'Menu +'}
                            </span>

                            {/* Desktop Hamburger Icon */}
                            <span
                                ref={iconRef}
                                className="desktop-burger-icon hidden lg:flex relative w-[20px] h-[14px] flex-col justify-between items-center"
                                aria-hidden="true"
                            >
                                <span
                                    ref={burgerTopRef}
                                    className="block w-full h-[2px] bg-current rounded-[2px] transform origin-center"
                                />
                                <span
                                    ref={plusHRef}
                                    className="block w-full h-[2px] bg-current rounded-[2px]"
                                />
                                <span
                                    ref={burgerBotRef}
                                    className="block w-full h-[2px] bg-current rounded-[2px] transform origin-center"
                                />
                            </span>
                        </button>
                    </div>
                </header>

                <aside
                    id="staggered-menu-panel"
                    ref={panelRef}
                    className="staggered-menu-panel absolute top-0 right-0 h-full bg-white flex flex-col p-[6em_2em_2em_2em] overflow-y-auto z-10 backdrop-blur-[12px] pointer-events-auto will-change-transform"
                    style={{ WebkitBackdropFilter: 'blur(12px)' }}
                    aria-hidden={!open}
                >
                    <div className="sm-panel-inner flex-1 flex flex-col gap-5">
                        <ul
                            className="sm-panel-list list-none m-0 p-0 flex flex-col gap-2"
                            role="list"
                            data-numbering={displayItemNumbering || undefined}
                        >
                            {items && items.length ? (
                                items.map((it, idx) => (
                                    <li className="sm-panel-itemWrap relative overflow-hidden leading-none" key={it.label + idx}>
                                        <Link
                                            className="sm-panel-item relative text-black font-semibold text-[2.5rem] cursor-pointer leading-none tracking-[-2px] uppercase transition-[background,color] duration-150 ease-linear inline-block no-underline pr-[1.4em]"
                                            href={it.link}
                                            aria-label={it.ariaLabel}
                                            data-index={idx + 1}
                                        >
                                            <span className="sm-panel-itemLabel inline-block [transform-origin:50%_100%] will-change-transform">
                                                {it.label}
                                            </span>
                                        </Link>
                                    </li>
                                ))
                            ) : (
                                <li className="sm-panel-itemWrap relative overflow-hidden leading-none" aria-hidden="true">
                                    <span className="sm-panel-item relative text-black font-semibold text-[2.5rem] cursor-pointer leading-none tracking-[-2px] uppercase transition-[background,color] duration-150 ease-linear inline-block no-underline pr-[1.4em]">
                                        <span className="sm-panel-itemLabel inline-block [transform-origin:50%_100%] will-change-transform">
                                            No items
                                        </span>
                                    </span>
                                </li>
                            )}
                        </ul>

                        {displaySocials && socialItems && socialItems.length > 0 && (
                            <div className="sm-socials mt-auto pt-8 flex flex-col gap-3" aria-label="Social links">
                                <h3 className="sm-socials-title m-0 text-base font-medium [color:var(--sm-accent,#ff0000)]">Socials</h3>
                                <ul
                                    className="sm-socials-list list-none m-0 p-0 flex flex-row items-center gap-4 flex-wrap"
                                    role="list"
                                >
                                    {socialItems.map((s, i) => {
                                        const Icon = {
                                            'Instagram': Instagram,
                                            'Facebook': Facebook,
                                            'Youtube': Youtube,
                                            'Linkedin': Linkedin,
                                            'Twitter': Twitter,
                                            'GitHub': Github
                                        }[s.label] || null;

                                        return (
                                            <li key={s.label + i} className="sm-socials-item">
                                                <a
                                                    href={s.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="sm-socials-link flex items-center justify-center p-3 bg-black/5 hover:bg-black/10 rounded-full transition-all duration-300 group"
                                                    aria-label={s.label}
                                                >
                                                    {Icon && <Icon className="w-5 h-5 text-black/70 group-hover:text-black group-hover:scale-110 transition-transform" />}
                                                </a>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        )}
                    </div>
                </aside>
            </div>

            <style>{`
.sm-scope .staggered-menu-wrapper { position: relative; width: 100%; height: 100%; z-index: 100; pointer-events: none; }
.sm-scope .staggered-menu-header { display: flex; align-items: center; pointer-events: none; }
.sm-scope .staggered-menu-header > * { pointer-events: auto; }
.sm-scope .sm-logo { display: flex; align-items: center; user-select: none; }
.sm-scope .sm-logo-img { display: block; height: 32px; width: auto; object-fit: contain; }
.sm-scope .sm-toggle { position: relative; display: inline-flex; align-items: center; gap: 0.3rem; background: transparent; border: none; cursor: pointer; color: #e9e9ef; font-weight: 500; line-height: 1; overflow: visible; }
.sm-scope .sm-toggle:focus-visible { outline: 2px solid #ffffffaa; outline-offset: 4px; border-radius: 4px; }
.sm-scope .sm-line:last-of-type { margin-top: 6px; }
.sm-scope .sm-toggle-textWrap { position: relative; margin-right: 0.5em; display: inline-block; height: 1em; overflow: hidden; white-space: nowrap; width: var(--sm-toggle-width, auto); min-width: var(--sm-toggle-width, auto); }
.sm-scope .sm-toggle-textInner { display: flex; flex-direction: column; line-height: 1; }
.sm-scope .sm-toggle-line { display: block; height: 1em; line-height: 1; }
.sm-scope .sm-icon { position: relative; display: inline-flex; will-change: transform; }
.sm-scope .sm-panel-itemWrap { position: relative; overflow: hidden; line-height: 1; }
.sm-scope .sm-icon-line { position: absolute; left: 50%; top: 50%; width: 100%; height: 2px; background: currentColor; border-radius: 2px; transform: translate(-50%, -50%); will-change: transform; }
.sm-scope .sm-line { display: none !important; }
.sm-scope .staggered-menu-panel { position: absolute; top: 0; right: 0; width: clamp(260px, 38vw, 420px); height: 100%; background: white; backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); display: flex; flex-direction: column; padding: 10em 2em 2em 2em; overflow-y: auto; z-index: 101; }
.sm-scope [data-position='left'] .staggered-menu-panel { right: auto; left: 0; }
.sm-scope .sm-prelayers { position: absolute; top: 0; right: 0; bottom: 0; width: clamp(260px, 38vw, 420px); pointer-events: none; z-index: 5; }
.sm-scope [data-position='left'] .sm-prelayers { right: auto; left: 0; }
.sm-scope .sm-prelayer { position: absolute; top: 0; right: 0; height: 100%; width: 100%; transform: translateX(0); }
.sm-scope .sm-panel-inner { flex: 1; display: flex; flex-direction: column; gap: 1.25rem; }
.sm-scope .sm-socials { margin-top: auto; padding-top: 2rem; display: flex; flex-direction: column; gap: 0.75rem; }
.sm-scope .sm-socials-title { margin: 0; font-size: 1rem; font-weight: 500; color: var(--sm-accent, #ff0000); }
.sm-scope .sm-socials-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: row; align-items: center; gap: 1rem; flex-wrap: wrap; }
.sm-scope .sm-socials-list .sm-socials-link { opacity: 1; transition: opacity 0.3s ease; }
.sm-scope .sm-socials-list:hover .sm-socials-link:not(:hover) { opacity: 0.35; }
.sm-scope .sm-socials-list:focus-within .sm-socials-link:not(:focus-visible) { opacity: 0.35; }
.sm-scope .sm-socials-list .sm-socials-link:hover,
.sm-scope .sm-socials-list .sm-socials-link:focus-visible { opacity: 1; }
.sm-scope .sm-socials-link:focus-visible { outline: 2px solid var(--sm-accent, #ff0000); outline-offset: 3px; }
.sm-scope .sm-socials-link { font-size: 1.2rem; font-weight: 500; color: #111; text-decoration: none; position: relative; padding: 2px 0; display: inline-block; transition: color 0.3s ease, opacity 0.3s ease; }
.sm-scope .sm-socials-link:hover { color: var(--sm-accent, #ff0000); }
.sm-scope .sm-panel-title { margin: 0; font-size: 1rem; font-weight: 600; color: #fff; text-transform: uppercase; }
.sm-scope .sm-panel-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 1.5rem; }
.sm-scope .sm-panel-item { position: relative; color: #000; font-weight: 600; font-size: 2.5rem; cursor: pointer; line-height: 1; letter-spacing: -2px; text-transform: uppercase; transition: background 0.25s, color 0.25s; display: inline-block; text-decoration: none; padding-right: 1.4em; }
.sm-scope .sm-panel-itemLabel { display: inline-block; will-change: transform; transform-origin: 50% 100%; }
.sm-scope .sm-panel-item:hover { color: var(--sm-accent, #ff0000); }
.sm-scope .sm-panel-list[data-numbering] { counter-reset: smItem; }
.sm-scope .sm-panel-list[data-numbering] .sm-panel-item::after { counter-increment: smItem; content: counter(smItem, decimal-leading-zero); position: absolute; top: 0.1em; right: 3.2em; font-size: 18px; font-weight: 400; color: var(--sm-accent, #ff0000); letter-spacing: 0; pointer-events: none; user-select: none; opacity: var(--sm-num-opacity, 0); }
@media (max-width: 1024px) { .sm-scope .staggered-menu-panel { width: 100%; left: 0; right: 0; } .sm-scope .staggered-menu-wrapper[data-open] .sm-logo-img { filter: invert(100%); } }
@media (max-width: 640px) { .sm-scope .staggered-menu-panel { width: 100%; left: 0; right: 0; } .sm-scope .staggered-menu-wrapper[data-open] .sm-logo-img { filter: invert(100%); } }
.sm-cta-pulse { position: absolute; inset: 0; border-radius: 9999px; border: 2px solid; border-color: inherit; opacity: 0; z-index: -1; animation: sm-pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite; }
@keyframes sm-pulse-ring { 0% { transform: scale(0.95); opacity: 0.5; } 100% { transform: scale(1.4); opacity: 0; } }

      `}</style>
        </div>
    );
};

export default StaggeredMenu;
