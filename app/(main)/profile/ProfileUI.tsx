import { BadgeCheck, Calendar, MapPin, PenLine } from "lucide-react";

export default function ProfileUI() {
    return (
        <div className="flex w-full h-full">
            <div className="flex flex-col p-5 w-full h-full gap-10">
                {/* Header */}
                <span className="text-4xl font-semibold">My Profile</span>

                {/* Profile Card */}
                <div className="flex gap-10 place-content-between items-end p-10 w-full h-auto bg-[#16161C] rounded-md border border-[#2C292A]">
                    <div className="flex gap-10">
                        {/* Profile Pic */}
                        <div className="flex w-50 h-50 rounded-full overflow-hidden">
                            <img src="/profile.jpg" alt="Profile" />
                        </div>

                        <div className="flex flex-col gap-5">
                            {/* Username */}
                            <div className="flex gap-2">
                                <span className="text-5xl font-semibold">Username</span>
                                <div className="flex items-center justify-center text-[#A79FFF]"><BadgeCheck size={50} /></div>
                            </div>

                            {/* Perks */}
                            <div className="flex gap-2">
                                <div className="flex items-center justify-center bg-[#1C1D23] border border-[#3F3E41] px-5 py-2 rounded-md">Level 20</div>
                                <div className="flex items-center justify-center bg-[#1C1D23] border border-[#3F3E41] px-5 py-2 rounded-md">Gold 1</div>
                            </div>

                            {/* Description */}
                            <span>Compete Connect Conquer</span>

                            {/* Location/ Joining Date */}
                            <div className="flex gap-2">
                                <span className="flex gap-2 text-[#9A9AA3]"><MapPin color="#6B58D6" />India</span>
                                <div className="border border-r border-[#202126]" />
                                <span className="flex gap-2 text-[#9A9AA3]"><Calendar />Joined Jan 2024</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-5 items-center justify-center bg-[#1C1D23] border border-[#452FBC] cursor-pointer hover:bg-[#452FBC]/30 px-5 py-2 rounded-md text-[#452FBC]"><PenLine size={20}/>Edit Profile</div>
                </div>
            </div>

            <div className="min-w-[30%] border-l border-[#2C292A]"></div>
        </div>
    )
}