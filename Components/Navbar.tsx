'use client'

import { Bell, House, Mail, Paintbrush, Podium, ShieldCog, Trophy, Users, Wallet } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
    return (
        <div className="fixed flex md:hidden w-full place-content-between items-center py-2 border-b border-[#2A2B2D]">
            <div className="flex items-center gap-3">
                <Image src="/logo.png" width={40} height={40} alt="Logo" />

                <div>
                    <h2 className="font-bold text-sm tracking-wide"> OPEN ARENA </h2>
                    <p className="text-xs tracking-[0.35em] text-violet-500"> TOURNAMENTS </p>
                </div>
            </div>
            {/* icons */}
            <div className="flex gap-5">
                <div className="flex hover:bg-[#1D1E20] hover:text-white w-12 h-12 items-center justify-center rounded-full cursor-pointer text-[#7E8190]"><Bell /></div>
                <div className="flex hover:bg-[#1D1E20] hover:text-white w-12 h-12 items-center justify-center rounded-full cursor-pointer text-[#7E8190]"><Mail /></div>
            </div>
        </div>
    )
}