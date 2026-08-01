'use client'

import { Check, CircleQuestionMark, CircleStar, Gift, House, Paintbrush, Podium, Trophy, Users, Wallet } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
        <div className="border-r-2 p-5 border-[#2A2B2D] min-w-[15%] flex flex-col">
            {/* Logo */}
            <div className="flex items-center gap-2">
                <div className="flex w-15 h-auto">
                    <img src="/logo.png" alt="logo" />
                </div>
                <div className="flex">
                    <span className="text-2xl font-semibold">Open</span>
                    <span className="text-2xl font-semibold text-[#5B4BFF]">Arena</span>
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
    )
}