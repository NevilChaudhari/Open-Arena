'use client'

import { createClient } from "@/lib/supabase/client";
import { BadgeCheck, Calendar, MapPin, PenLine, SquareArrowRightExit } from "lucide-react";
import { useRouter } from "next/navigation";

interface User {
    id: string,
    username: string,
    coins: number
}
interface Props {
    user: User | null
}


export default function ProfileUI({ user }: Props) {
    const supabase = createClient()
    const router = useRouter()

    const signOut = () => {
        supabase.auth.signOut();

        router.refresh()
    }

    return (
        <div className="flex w-full h-full">
            <div className="flex flex-col p-4 md:p-5 w-full h-full gap-6 md:gap-10">
                {/* Header */}
                <span className="text-2xl md:text-4xl font-semibold">My Profile</span>

                {/* Profile Card */}
                <div className="flex flex-col md:flex-row gap-6 md:gap-10 place-content-between md:items-end p-5 md:p-10 w-full h-auto bg-[#16161C] rounded-md border border-[#2C292A]">
                    <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center md:items-start text-center md:text-left">
                        {/* Profile Pic */}
                        <div className="flex w-32 h-32 md:w-50 md:h-50 rounded-full overflow-hidden shrink-0">
                            <img src="/profile.jpg" alt="Profile" />
                        </div>

                        <div className="flex flex-col gap-4 md:gap-5 items-center md:items-start">
                            {/* Username */}
                            <div className="flex gap-2 items-center justify-center md:justify-start">
                                <span className="text-3xl md:text-5xl font-semibold">{user?.username}</span>
                                <div className="flex items-center justify-center text-[#A79FFF]"><BadgeCheck size={50} /></div>
                            </div>

                            {/* Perks */}
                            <div className="flex gap-2 flex-wrap justify-center md:justify-start">
                                <div className="flex items-center justify-center bg-[#1C1D23] border border-[#3F3E41] px-5 py-2 rounded-md">Level 20</div>
                                <div className="flex items-center justify-center bg-[#1C1D23] border border-[#3F3E41] px-5 py-2 rounded-md">Gold 1</div>
                            </div>

                            {/* Description */}
                            <span>Compete Connect Conquer</span>

                            {/* Location/ Joining Date */}
                            <div className="flex gap-2 flex-wrap justify-center md:justify-start">
                                <span className="flex gap-2 text-[#9A9AA3]"><MapPin color="#6B58D6" />India</span>
                                <div className="border border-r border-[#202126]" />
                                <span className="flex gap-2 text-[#9A9AA3]"><Calendar />Joined Jan 2024</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 w-full md:w-auto">
                        <div className="flex gap-5 items-center justify-center bg-[#1C1D23] border border-[#452FBC] cursor-pointer hover:bg-[#452FBC]/30 px-5 py-2 rounded-md text-[#452FBC] w-full md:w-auto"><PenLine size={20} />Edit Profile</div>
                        <div onClick={signOut} className="flex gap-5 items-center justify-center bg-[#1C1D23] border border-[#EF4444] cursor-pointer hover:bg-[#EF4444]/30 px-5 py-2 rounded-md text-[#EF4444] w-full md:w-auto"><SquareArrowRightExit size={20} />Log Out</div>
                    </div>
                </div>
            </div>

            <div className="hidden lg:block lg:min-w-[30%] border-l border-[#2C292A]"></div>
        </div>
    )
}