'use client'

import { BadgeCheck, Check, ChevronRight, CircleQuestionMark, CircleStar, Gift, House, Paintbrush, Podium, Trophy, Users, Wallet } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

type Pages = 'home' | 'tournaments' | 'teams' | 'leaderboard' | 'wallet' | 'Support' | 'Rewards'

export default function Sidebar() {
    const router = useRouter();
    const pathname = usePathname();

    const menu = [
        { name: "Home", href: "/home", icon: House },
        { name: "Tournaments", href: "/tournaments", icon: Trophy },
        { name: "Teams", href: "/teams", icon: Users },
        { name: "Leaderboard", href: "/leaderboard", icon: Podium },
        { name: "Wallet", href: "/wallet", icon: Wallet },
        { name: "Color Codes", href: "/colorcodes", icon: Paintbrush },
    ];

    return (
        <div className="border-r-2 p-5 border-[#2A2B2D] min-w-[15%] flex flex-col place-content-between">
            <div className="flex flex-col">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <Image
                        src="/logo.png"
                        width={46}
                        height={46}
                        alt=""
                    />

                    <div>
                        <h2 className="font-bold tracking-wide">
                            OPEN ARENA
                        </h2>

                        <p className="text-xs tracking-[0.35em] text-violet-500">
                            TOURNAMENTS
                        </p>
                    </div>
                </div>

                <div className="border-b border-[#2A2B2D] my-5" />

                {/* Menu */}
                <div className="flex flex-col gap-3">
                    {menu.map(({ name, href, icon: Icon }) => (
                        <div key={href} onClick={() => router.push(href)} className={`flex cursor-pointer h-12 items-center rounded-md px-3 gap-3 font-semibold hover:bg-[#5B4BFF] hover:text-white ${pathname === href ? "bg-[#5B4BFF] text-white" : "text-[#7E8190]"}`}><Icon />{name}</div>
                    ))}
                </div>
            </div>

            <div onClick={() => router.push('/profile')} className="flex flex-col cursor-pointer hover:bg-[#1C1D23] gap-5 bg-[#16161C]/70 w-full h-auto rounded-md border border-[#3F3E41] p-3">
                {/* Profile */}
                <div className="items-center gap-3 flex">
                    {/* Profile Image */}
                    <div className="flex items-center justify-center w-13 h-13 rounded-full overflow-hidden">
                        <img src="/profile.jpg" alt="Profile" className="object-cover w-full h-full" />
                    </div>

                    {/* Username */}
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <span className="text-xl font-semibold">Username</span>
                            <div className="flex items-center justify-center text-[#A79FFF]"><BadgeCheck size={20} /></div>
                        </div>
                        <span className="text-sm text-[#9A9AA3]">Team Name</span>
                    </div>

                    <div className="flex"><ChevronRight /></div>
                </div>

                {/* Balance */}
                <div className="flex flex-col rounded-md p-3 border border-[#3F3E41]">
                    <span className="text-xs text-[#7E8190]">Total Balance</span>
                    <span className="text-xl font-semibold">₹99,999.99</span>
                </div>
            </div>
        </div>
    )
}