'use client'

import { House, Paintbrush, Podium, ShieldCheck, ShieldCog, Trophy, Users, Wallet } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface Props {
    isAdmin: boolean
}

export default function BottomNavbar({ isAdmin }: Props) {
    const router = useRouter();
    const pathname = usePathname();

    const pages = [
        { name: "Home", href: "/home", icon: House },
        { name: "Tournaments", href: "/tournaments", icon: Trophy },
        { name: "Teams", href: "/teams", icon: Users },
        { name: "Wallet", href: "/wallet", icon: Wallet },
    ];

    const adminPages = [
        { name: "Admin", href: "/admin", icon: ShieldCheck },
    ];

    return (
        <nav className="fixed inset-x-0 bottom-0 z-50 flex items-stretch border-t border-[#2A2B2D] bg-[#080909] pb-[env(safe-area-inset-bottom)] md:hidden">
            <div className="flex w-full items-center overflow-x-auto scrollbar-none">
                {pages.map(({ name, href, icon: Icon }) => {
                    const active = pathname === href;
                    return (
                        <button key={href} onClick={() => router.push(href)} className="flex flex-1 shrink-0 basis-0 cursor-pointer flex-col items-center justify-center gap-1 py-2.5" >
                            <div className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors duration-150 ${active ? "bg-[#6B58D6] text-white" : "text-[#7E8190]"}`} > <Icon size={22} /> </div>
                            <span className={`text-[10px] font-medium leading-none ${active ? "text-white" : "text-[#7E8190]"}`} > {active ? name : ''} </span>
                        </button>
                    );
                })}
                {isAdmin && (adminPages.map(({ name, href, icon: Icon }) => {
                    const active = pathname === href;
                    return (
                        <button key={href} onClick={() => router.push(href)} className="flex flex-1 shrink-0 basis-0 cursor-pointer flex-col items-center justify-center gap-1 py-2.5" >
                            <div className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors duration-150 ${active ? "bg-[#6B58D6] text-white" : "text-[#7E8190]"}`} > <Icon size={22} /> </div>
                            <span className={`text-[10px] font-medium leading-none ${active ? "text-white" : "text-[#7E8190]"}`} > {active ? name : ''} </span>
                        </button>
                    );
                }))}

                <button onClick={() => router.push('/profile')} className="flex flex-1 shrink-0 basis-0 cursor-pointer flex-col items-center justify-center gap-1 py-2.5">
                    <div className={`flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border-2 transition-colors duration-150 ${pathname === '/profile' ? "border-[#6B58D6]" : "border-[#3F3E41]"}`} >
                        <img src="/profile.jpg" alt="Profile" className="h-full w-full object-cover" />
                    </div>
                    <span className={`text-[10px] font-medium leading-none ${pathname === '/profile' ? "text-white" : "text-[#7E8190]"}`} > {pathname === '/profile' ? "Profile" : ""} </span>
                </button>
            </div>
        </nav>
    )
}