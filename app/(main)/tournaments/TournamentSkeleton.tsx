'use client'

import { Skeleton } from "@/Components/ui/skeleton";
import { Gamepad2, ChevronDown, ListFilterPlus, ChevronRight } from "lucide-react";
import { useState } from "react";

type CategoryFilter = 'All' | 'Upcoming' | 'Live Now' | 'Completed'

export default function TournamentSkeleton() {
    const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('All')
    return (
        <div className="flex flex-col w-full h-full gap-5 overflow-hidden">
            <div className="flex w-full h-screen flex-col gap-6 md:gap-10 overflow-y-auto scrollbar-none">

                {/* Header */}
                <div className="md:flex hidden flex-col">
                    <span className="text-2xl md:text-4xl font-semibold">Tournaments</span>
                    <span className="text-sm md:text-md text-[#A79FFF]">Compete in the best tournaments and prove your skills</span>
                </div>

                {/* Filters */}
                <div className="flex w-full md:h-15 min-h-12 bg-[#101112] border border-[#2A2B2D] p-1 md:p-2 rounded-sm place-content-between overflow-x-auto scrollbar-none gap-2">
                    <div className="flex h-full gap-1 shrink-0 m-x-auto">
                        <div onClick={() => setCategoryFilter('All')} className={`flex items-center justify-center cursor-pointer whitespace-nowrap shrink-0 ${categoryFilter === 'All' ? 'bg-[#2b1c7a]' : 'text-[#7E8190]'} hover:text-white hover:bg-[#2b1c7a] px-4 md:px-7 h-full rounded-sm`}>All</div>
                        <div onClick={() => setCategoryFilter('Upcoming')} className={`flex items-center justify-center cursor-pointer whitespace-nowrap shrink-0 ${categoryFilter === 'Upcoming' ? 'bg-[#2b1c7a]' : 'text-[#7E8190]'} hover:text-white hover:bg-[#2b1c7a] px-4 md:px-7 h-full rounded-sm`}>Upcoming</div>
                        <div onClick={() => setCategoryFilter('Live Now')} className={`flex items-center justify-center cursor-pointer whitespace-nowrap shrink-0 ${categoryFilter === 'Live Now' ? 'bg-[#2b1c7a]' : 'text-[#7E8190]'} hover:text-white hover:bg-[#2b1c7a] px-4 md:px-7 h-full rounded-sm`}>Live Now</div>
                        <div onClick={() => setCategoryFilter('Completed')} className={`flex items-center justify-center cursor-pointer whitespace-nowrap shrink-0 ${categoryFilter === 'Completed' ? 'bg-[#2b1c7a]' : 'text-[#7E8190]'} hover:text-white hover:bg-[#2b1c7a] px-4 md:px-7 h-full rounded-sm`}>Completed</div>
                    </div>
                    <div className="hidden md:flex h-full gap-1 shrink-0">
                        <div className="flex gap-2 items-center justify-center border border-[#2A2B2D] hover:bg-[#242527] cursor-pointer whitespace-nowrap shrink-0 px-4 md:px-7 h-full rounded-sm"><Gamepad2 />All Games<ChevronDown /></div>
                        <div className="flex gap-2 items-center justify-center border border-[#2A2B2D] hover:bg-[#242527] cursor-pointer whitespace-nowrap shrink-0 px-4 md:px-7 h-full rounded-sm"><ListFilterPlus />Filters</div>
                    </div>
                </div>
                <div className="md:hidden flex h-12 gap-1 shrink-0">
                    <div className="flex gap-2 items-center justify-center border border-[#2A2B2D] hover:bg-[#242527] cursor-pointer whitespace-nowrap shrink-0 px-4 md:px-7 h-full rounded-sm"><Gamepad2 />All Games<ChevronDown /></div>
                    <div className="flex gap-2 items-center justify-center border border-[#2A2B2D] hover:bg-[#242527] cursor-pointer whitespace-nowrap shrink-0 px-4 md:px-7 h-full rounded-sm"><ListFilterPlus />Filters</div>
                </div>

                <div className="hidden md:flex flex-col overflow-x-auto overflow-y-auto rounded-xl border border-[#343539] bg-[#171819]">
                    <table className="w-full md:min-w-220">
                        <thead className="border-b border-[#343539] text-xs uppercase tracking-wider text-[#7E8190]">
                            <tr>
                                <th className="px-3 py-3 lg:px-5 lg:py-4 text-left">Tournament</th>
                                <th className="px-3 py-3 lg:px-5 lg:py-4 text-left">Game</th>
                                <th className="px-3 py-3 lg:px-5 lg:py-4 text-left">Per Kill</th>
                                <th className="px-3 py-3 lg:px-5 lg:py-4 text-left">Prize Pool</th>
                                <th className="px-3 py-3 lg:px-5 lg:py-4 text-left">Starts In</th>
                                <th className="px-3 py-3 lg:px-5 lg:py-4 text-left">Registration</th>
                                <th className="px-3 py-3 lg:px-5 lg:py-4 text-left">Entry Fee</th>
                                <th className="px-3 py-3 lg:px-5 lg:py-4 text-left">Status</th>
                                <th className="w-16"></th>
                            </tr>
                        </thead>

                        <tbody>
                            {Array.from({ length: 3 }).map((_, i) => {
                                return (
                                    <tr key={i} className="border-b border-zinc-800 hover:bg-white/5">
                                        {/* Tournament */}
                                        <td className="px-3 py-3 lg:px-5 lg:py-4">
                                            <div className="flex items-center gap-3">
                                                {<Skeleton className="w-full h-10 bg-zinc-800 animate-pulse"/>}

                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-medium text-white">{<Skeleton className="w-full h-10 bg-zinc-800 animate-pulse"/>}</span>
                                                    </div>

                                                    <span className="text-sm text-zinc-400"> <Skeleton className="w-full h-10 bg-zinc-800 animate-pulse"/> </span>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Game */}
                                        <td className="px-3 py-3 lg:px-5 lg:py-4 font-semibold tracking-wide text-white"> {<Skeleton className="w-full h-10 bg-zinc-800 animate-pulse"/>} </td>

                                        {/* Per Kill */}
                                        <td className="px-3 py-3 lg:px-5 lg:py-4 font-medium text-white"> {<Skeleton className="w-full h-10 bg-zinc-800 animate-pulse"/>} </td>

                                        {/* Prize Pool */}
                                        <td className="px-3 py-3 lg:px-5 lg:py-4 font-medium text-white"> {<Skeleton className="w-full h-10 bg-zinc-800 animate-pulse"/>} </td>

                                        {/* Starts */}
                                        <td className="px-3 py-3 lg:px-5 lg:py-4 text-[#9A9AA3]"> {<Skeleton className="w-full h-10 bg-zinc-800 animate-pulse"/>} </td>

                                        {/* Registration */}
                                        <td className="px-3 py-3 lg:px-5 lg:py-4 text-[#9A9AA3]"> {<Skeleton className="w-full h-10 bg-zinc-800 animate-pulse"/>} </td>

                                        {/* Entry Fee */}
                                        <td className="px-3 py-3 lg:px-5 lg:py-4 text-white"> {<Skeleton className="w-full h-10 bg-zinc-800 animate-pulse"/>} </td>

                                        {/* Status */}
                                        <td className="px-3 py-3 lg:px-5 lg:py-4">
                                            <span className="rounded-md px-3 py-2 text-sm font-medium whitespace-nowrap">
                                                <Skeleton className="w-full h-10 bg-zinc-800 animate-pulse"/>
                                            </span>
                                        </td>

                                        {/* Action */}
                                        <td className="px-3 py-3 lg:px-5 lg:py-4">
                                            <div className="flex h-9 w-9 items-center justify-center rounded-lg text-[#9A9AA3] hover:bg-[#1C1D23] hover:text-white">
                                                <Skeleton className="w-full h-10 bg-zinc-800 animate-pulse"/>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

                <div className="flex md:hidden flex-col gap-3">
                    {Array.from({ length: 3 }).map((_, i) => {
                        return (
                            <Skeleton key={i} className="w-full h-50 bg-zinc-800 animate-pulse"/>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}