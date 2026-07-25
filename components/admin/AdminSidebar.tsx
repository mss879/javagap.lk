'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, MessageSquare, Trello, Users, LogOut, Settings, PieChart, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function AdminSidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/login');
    };

    const navItems = [
        { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/admin/inquiries', label: 'Inquiries', icon: MessageSquare },
        { href: '/admin/crm', label: 'CRM', icon: Trello },
        { href: '/admin/contacts', label: 'Contacts', icon: Users },
    ];

    return (
        <aside className="hidden md:flex flex-col w-64 h-full glass-panel m-4 rounded-3xl overflow-hidden shadow-xl sticky top-4">
            <div className="p-8 pb-4 flex flex-col items-center gap-4">
                <div className="relative w-48 h-48">
                    <Image
                        src="/new-logo.png"
                        alt="Java Global Access™ Logo"
                        fill
                        className="object-contain"
                    />
                </div>
                <h1 className="text-xl font-bold text-gray-800 dark:text-white tracking-wide text-center">
                    Admin Panel
                </h1>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-2">
                <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Menu</p>
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={`flex items-center gap-4 px-4 py-3 text-sm font-medium rounded-2xl transition-all duration-200 ${isActive
                                ? 'bg-blue-600/90 text-white shadow-lg shadow-blue-500/30'
                                : 'text-gray-500 hover:bg-white/50 hover:text-blue-600 dark:text-gray-400 dark:hover:bg-white/10'
                                }`}
                        >
                            <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-current'}`} />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 mt-auto">
                <Button
                    variant="ghost"
                    className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50/50 rounded-2xl gap-3 pl-4"
                    onClick={handleLogout}
                >
                    <LogOut className="w-5 h-5" />
                    Logout
                </Button>
            </div>
        </aside>
    );
}
