'use client'

import TournamentCard from "@/Components/tournamentCard";
import { ChevronDown, ChevronRight, Gamepad2, ListFilterPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { intervalToDuration } from "date-fns";

interface Tournaments {
    id: number,
    name: string,
    game: string,
    type: string,
    registrationEnds: string,
    mode: string,
    map: string,
    maxPlayers: string,
    entryFee: string,
    prizePool: string,
    perKill: string,
}

interface TournamentPlayers {
    tournamentId: number,
}

interface Props {
    tournaments: Tournaments[]
    tournamentPlayers: TournamentPlayers[]
}

type CategoryFilter = 'All' | 'Upcoming' | 'Live Now' | 'Completed'

export default function TournamentUI({ tournaments, tournamentPlayers }: Props) {
    const router = useRouter();
    const isRegistrationOpen = (tournament: Tournaments) => new Date(tournament.registrationEnds) > new Date();
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
                            {tournaments.map((tournament) => {
                                const open = isRegistrationOpen(tournament);
                                return (
                                    <tr key={tournament.id} className="border-b border-zinc-800 hover:bg-white/5">
                                        {/* Tournament */}
                                        <td className="px-3 py-3 lg:px-5 lg:py-4">
                                            <div className="flex items-center gap-3">
                                                <Image
                                                    src="/Valorant.jpg"
                                                    alt="Valorant"
                                                    width={72}
                                                    height={52}
                                                    className="rounded-lg object-cover"
                                                />

                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-medium text-white">{tournament.name}</span>
                                                    </div>

                                                    <span className="text-sm text-zinc-400"> Open to All </span>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Game */}
                                        <td className="px-3 py-3 lg:px-5 lg:py-4 font-semibold tracking-wide text-white"> {tournament.game} </td>

                                        {/* Per Kill */}
                                        <td className="px-3 py-3 lg:px-5 lg:py-4 font-medium text-white"> ₹{tournament.perKill} </td>

                                        {/* Prize Pool */}
                                        <td className="px-3 py-3 lg:px-5 lg:py-4 font-medium text-white"> ₹{tournament.prizePool} </td>

                                        {/* Starts */}
                                        <td className="px-3 py-3 lg:px-5 lg:py-4 text-[#9A9AA3]"> {(() => {
                                            const d = intervalToDuration({
                                                start: new Date(),
                                                end: new Date(tournament.registrationEnds),
                                            });
                                            return `${d.days ?? 0}d ${d.hours ?? 0}h ${d.minutes ?? 0}m`;
                                        })()} </td>

                                        {/* Registration */}
                                        <td className="px-3 py-3 lg:px-5 lg:py-4 text-[#9A9AA3]">
                                            <span className="text-[#22C55E]">{tournamentPlayers.filter((t) => t.tournamentId === tournament.id).length}</span> / {tournament.maxPlayers}
                                        </td>

                                        {/* Entry Fee */}
                                        <td className="px-3 py-3 lg:px-5 lg:py-4 text-white"> ₹{tournament.entryFee} </td>

                                        {/* Status */}
                                        <td className="px-3 py-3 lg:px-5 lg:py-4">
                                            <span className={`rounded-md px-3 py-2 text-sm font-medium whitespace-nowrap ${open ? "bg-[#22C55E]/20 text-[#22C55E]" : "bg-[#EF4444]/20 text-[#EF4444]"}`}>
                                                {open ? "Registration Open" : "Registration Closed"}
                                            </span>
                                        </td>

                                        {/* Action */}
                                        <td onClick={() => router.push(`/tournaments/${tournament.id}`)} className="px-3 py-3 lg:px-5 lg:py-4">
                                            <div className="cursor-pointer flex h-9 w-9 items-center justify-center rounded-lg border border-[#3F3E41] text-[#9A9AA3] hover:bg-[#1C1D23] hover:text-white">
                                                <ChevronRight size={18} />
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

                <div className="flex md:hidden flex-col gap-3">
                    {tournaments.map((tournament) => {
                        const d = intervalToDuration({
                            start: new Date(),
                            end: new Date(tournament.registrationEnds),
                        });
                        const open = isRegistrationOpen(tournament);
                        return (
                            <div key={tournament.id} onClick={() => router.push(`/tournaments/${tournament.id}`)} className="flex cursor-pointer flex-col gap-3 rounded-xl border border-[#343539] bg-[#171819] p-4 active:bg-white/5" >
                                <Image src="/Valorant.jpg" alt="Valorant" width={500} height={500} className="shrink-0 rounded-lg object-cover" />
                                <div className="flex items-center gap-3">
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-xl font-medium text-white">{tournament.name}</p>
                                        <p className="text-sm text-zinc-400">Open to All · {tournament.game}</p>
                                    </div>
                                    <span className={`rounded-md px-2.5 py-1.5 text-xs font-medium whitespace-nowrap ${open ? "bg-[#22C55E]/20 text-[#22C55E]" : "bg-[#EF4444]/20 text-[#EF4444]"}`}>
                                        {open ? "Open" : "Closed"}
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-px overflow-hidden rounded-md bg-[#202126] md:grid-cols-4">
                                    <div className="flex flex-col items-center gap-0 bg-[#0A0C0F] px-4 py-6 md:py-10 text-center">
                                        <p className="text-[10px] md:text-xs uppercase tracking-wide text-[#6C6D73]">Per Kill</p>
                                        <p className="text-xl font-semibold">₹{tournament.perKill}</p>
                                    </div>
                                    <div className="flex flex-col items-center gap-0 bg-[#0A0C0F] px-4 py-6 md:py-10 text-center">
                                        <p className="text-[10px] md:text-xs uppercase tracking-wide text-[#6C6D73]">Prize Pool</p>
                                        <p className="text-xl font-semibold">₹{tournament.prizePool}</p>
                                    </div>
                                    <div className="flex flex-col items-center gap-0 bg-[#0A0C0F] px-4 py-6 md:py-10 text-center">
                                        <p className="text-[10px] md:text-xs uppercase tracking-wide text-[#6C6D73]">Starts In</p>
                                        <p className="text-xl font-semibold">{`${d.days ?? 0}d ${d.hours ?? 0}h ${d.minutes ?? 0}m`}</p>
                                    </div>
                                    <div className="flex flex-col items-center gap-0 bg-[#0A0C0F] px-4 py-6 md:py-10 text-center">
                                        <p className="text-[10px] md:text-xs uppercase tracking-wide text-[#6C6D73]">Entry Fee</p>
                                        <p className="text-xl font-semibold">₹{tournament.entryFee}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}