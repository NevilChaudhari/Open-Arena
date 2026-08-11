'use client'

import { Skeleton } from "@/Components/ui/skeleton";
import { Gamepad2, ShieldCheck } from "lucide-react";
import { useState } from "react";

type Tab = "Overview" | "Rules" | "Squads"

const RULES = [
    "Squad must consist of exactly 4 players. No substitutes after check-in closes.",
    "Teaming with rival squads results in immediate disqualification, no refund.",
    "Emulator / bluestacks players are not allowed in mobile-only brackets.",
    "Room ID and password are shared 10 minutes before match start — be online.",
    "Screenshot of the final results screen is mandatory for prize verification.",
    "Open Arena's decision on disputes is final.",
];

export default function TournamentDetailsSkeleton() {
    const [tab, setTab] = useState<Tab>("Overview");

    return (
        <div className="flex h-full w-full flex-col gap-5 font-['Inter'] text-white">
            {/* Banner */}
            <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-4 rounded-2xl border border-[#2C292A] bg-[#16161C] px-4 py-5 md:px-6 md:py-6">

                <div className="flex flex-col gap-5 justify-center w-full">
                    <div className="flex items-start justify-between gap-3">
                        <h1 className="mt-3 flex-1 min-w-0 wrap-break-word text-2xl font-bold leading-tight md:text-4xl"><Skeleton className="min-w-50 h-10 bg-zinc-800 animate-pulse" /></h1>
                        <div className={`md:hidden shrink-0 rounded-[10px] text-base font-semibold text-white px-4 py-3 text-center`} >
                            <Skeleton className="min-w-30 h-10 bg-zinc-800 animate-pulse" />
                        </div>
                    </div>
                    <div className="gap-3 md:gap-5 md:flex grid grid-cols-2">
                        <div className="flex items-center justify-start gap-3 md:gap-5">
                            <div className="flex w-10 h-10 shrink-0 bg-[#6B58D6] items-center justify-center rounded-md">
                                <Gamepad2 />
                            </div>
                            <div className="flex flex-col min-w-0 text-sm md:text-base">
                                <span className="text-sm text-[#9A9AA3]">Game Name</span>
                                <Skeleton className="min-w-30 h-5 bg-zinc-800 animate-pulse" />
                            </div>
                        </div>
                        <div className="flex items-center justify-start gap-3 md:gap-5">
                            <div className="flex w-10 h-10 shrink-0 bg-[#6B58D6] items-center justify-center rounded-md">
                                <Gamepad2 />
                            </div>
                            <div className="flex flex-col min-w-0 text-sm md:text-base">
                                <span className="text-sm text-[#9A9AA3]">Game Map</span>
                                <Skeleton className="min-w-30 h-5 bg-zinc-800 animate-pulse" />
                            </div>
                        </div>
                        <div className="flex items-center justify-start gap-3 md:gap-5">
                            <div className="flex w-10 h-10 shrink-0 bg-[#6B58D6] items-center justify-center rounded-md">
                                <Gamepad2 />
                            </div>
                            <div className="flex flex-col min-w-0 text-sm md:text-base">
                                <span className="text-sm text-[#9A9AA3]">Game Mode</span>
                                <Skeleton className="min-w-30 h-5 bg-zinc-800 animate-pulse" />
                            </div>
                        </div>
                        <div className="flex items-center justify-start gap-3 md:gap-5">
                            <div className="flex w-10 h-10 shrink-0 bg-[#6B58D6] items-center justify-center rounded-md">
                                <Gamepad2 />
                            </div>
                            <div className="flex flex-col min-w-0 text-sm md:text-base">
                                <span className="text-sm text-[#9A9AA3]">Game Type</span>
                                <Skeleton className="min-w-30 h-5 bg-zinc-800 animate-pulse" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`md:flex hidden rounded-[10px] text-xl font-semibold bg-[#6B58D6] border border-[#2C292A] text-white px-4 py-3 text-center`} >
                    Join
                </div>
            </div>

            {/* Tabs */}
            <div className="flex shrink-0 items-center gap-1 border-b border-[#202126]">
                <div onClick={() => setTab('Overview')} className={`cursor-pointer border-b-2 hover:border-[#6B58D6] px-4 py-2.5 text-sm font-medium ${tab === 'Overview' ? "text-white border-[#6B58D6]" : "text-[#9A9AA3] hover:text-[#C8C8D0] border-transparent"}`} >Overview</div>
                <div onClick={() => setTab('Rules')} className={`cursor-pointer border-b-2 hover:border-[#6B58D6] px-4 py-2.5 text-sm font-medium ${tab === 'Rules' ? "text-white border-[#6B58D6]" : "text-[#9A9AA3] hover:text-[#C8C8D0] border-transparent"}`} >Rules</div>
                <div onClick={() => setTab('Squads')} className={`cursor-pointer border-b-2 hover:border-[#6B58D6] px-4 py-2.5 text-sm font-medium ${tab === 'Squads' ? "text-white border-[#6B58D6]" : "text-[#9A9AA3] hover:text-[#C8C8D0] border-transparent"}`} >Players</div>
            </div>

            <div className="flex-1 overflow-y-auto pb-2 pr-1">
                {tab === "Overview" && (
                    <div className="flex flex-col gap-5">
                        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-[#202126] md:grid-cols-4">
                            <div className="flex flex-col items-center gap-0 bg-[#0A0C0F] px-4 py-6 md:py-10 text-center">
                                <p className="text-[10px] md:text-xs uppercase tracking-wide text-[#6C6D73]">Entry Fee</p>
                                <div className="text-2xl font-semibold"><Skeleton className="min-w-10 h-10 bg-zinc-800 animate-pulse" /></div>
                            </div>
                            <div className="flex flex-col items-center gap-0 bg-[#0A0C0F] px-4 py-6 md:py-10 text-center">
                                <p className="text-[10px] md:text-xs uppercase tracking-wide text-[#6C6D73]">Per Kill</p>
                                <div className="text-2xl font-semibold"><Skeleton className="min-w-10 h-10 bg-zinc-800 animate-pulse" /></div>
                            </div>
                            <div className="flex flex-col items-center gap-0 bg-[#0A0C0F] px-4 py-6 md:py-10 text-center">
                                <p className="text-[10px] md:text-xs uppercase tracking-wide text-[#6C6D73]">Prize Pool</p>
                                <div className="text-2xl font-semibold"><Skeleton className="min-w-10 h-10 bg-zinc-800 animate-pulse" /></div>
                            </div>
                            <div className="flex flex-col items-center gap-0 bg-[#0A0C0F] px-4 py-6 md:py-10 text-center">
                                <p className="text-[10px] md:text-xs uppercase tracking-wide text-[#6C6D73]">Slots Filled</p>
                                <div className="text-2xl font-semibold"><Skeleton className="min-w-10 h-10 bg-zinc-800 animate-pulse" /></div>
                            </div>
                        </div>

                        <div className={`bg-[#16161C] border border-[#2C292A] rounded-2xl p-4 md:p-5`}>
                            <div className="flex items-center justify-between text-sm">
                                <span className="font-semibold text-white">Slots Filling Fast</span>
                                <span><Skeleton className="min-w-50 h-10 bg-zinc-800 animate-pulse" /></span>
                            </div>
                            <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#202126]">
                                <div className="h-full rounded-full bg-[#6B58D6]" style={{ width: `0%` }} />
                            </div>
                            <span className="mt-2 text-xs flex text-[#6C6D73] items-center gap-2"><Skeleton className="min-w-10 h-10 bg-zinc-800 animate-pulse" /> slots remaining · closes automatically when full</span>
                        </div>

                        <div className="flex items-start gap-3 rounded-2xl border border-[#F59E0B]/30 bg-[#F59E0B]/8 p-4">
                            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#F59E0B]" />
                            <span className="text-sm text-[#C8C8D0]">
                                Room ID and password unlock on your dashboard automatically 10 minutes before
                                start — no need to message admins.
                            </span>
                        </div>
                    </div>
                )}

                {tab === "Rules" && (
                    <div className={`bg-[#16161C] border border-[#2C292A] rounded-2xl p-4 md:p-5`}>
                        <p className="font-['Rajdhani'] text-lg font-bold">Rules & fair play</p>
                        <div className="mt-4 flex flex-col gap-3">
                            {RULES.map((rule, i) => (
                                <div key={i} className="flex items-start gap-3 text-sm text-[#9A9AA3]">
                                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#A79FFF]" />
                                    <span>{rule}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {tab === "Squads" && (
                    <div className={`bg-[#16161C] border border-[#2C292A] rounded-md md:rounded-2xl px-2 py-3 md:p-5`}>
                        <p className="font-['Rajdhani'] text-lg font-bold"><Skeleton className="min-w-50 h-10 bg-zinc-800 animate-pulse" /></p>
                        <div className="mt-4 grid grid-cols-1 gap-2 md:grid-cols-4">
                            {Array.from({ length: 3 }).map((_, i) => {
                                return (
                                    <Skeleton key={i} className="min-w-50 h-10 bg-zinc-800 animate-pulse" />
                                )
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}