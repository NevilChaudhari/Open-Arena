'use client'

import TournamentCard from "@/Components/tournamentCard";
import { Bell, ChevronDown, ChevronRight, Gamepad2, ListFilterPlus, Mail, Search } from "lucide-react";
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
    tournamentId : number,
}

interface Props {
    tournaments: Tournaments[]
    tournamentPlayers: TournamentPlayers[]
}

type CategoryFilter = 'All' | 'Upcoming' | 'Live Now' | 'Completed'

export default function TournamentUI({ tournaments, tournamentPlayers }: Props) {
    const router = useRouter();
    const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('All')
    return (
        <div className="flex w-full">
            <div className="flex w-full h-screen flex-col gap-10 overflow-y-auto scrollbar-none">

                {/* Header */}
                <div className="flex flex-col">
                    <span className="text-4xl font-semibold">Tournaments</span>
                    <span className="text-md text-[#7E8190]">Compete in the best tournaments and prove your skills</span>
                </div>

                {/* Filters */}
                <div className="flex w-full h-15 bg-[#101112] border border-[#2A2B2D] p-2 rounded-sm place-content-between">
                    <div className="flex h-full gap-1">
                        <div onClick={() => setCategoryFilter('All')} className={`flex items-center justify-center cursor-pointer ${categoryFilter === 'All' ? 'bg-[#2b1c7a]' : 'text-[#7E8190]'} hover:text-white hover:bg-[#2b1c7a] px-7 h-full rounded-sm`}>All</div>
                        <div onClick={() => setCategoryFilter('Upcoming')} className={`flex items-center justify-center cursor-pointer ${categoryFilter === 'Upcoming' ? 'bg-[#2b1c7a]' : 'text-[#7E8190]'} hover:text-white hover:bg-[#2b1c7a] px-7 h-full rounded-sm`}>Upcoming</div>
                        <div onClick={() => setCategoryFilter('Live Now')} className={`flex items-center justify-center cursor-pointer ${categoryFilter === 'Live Now' ? 'bg-[#2b1c7a]' : 'text-[#7E8190]'} hover:text-white hover:bg-[#2b1c7a] px-7 h-full rounded-sm`}>Live Now</div>
                        <div onClick={() => setCategoryFilter('Completed')} className={`flex items-center justify-center cursor-pointer ${categoryFilter === 'Completed' ? 'bg-[#2b1c7a]' : 'text-[#7E8190]'} hover:text-white hover:bg-[#2b1c7a] px-7 h-full rounded-sm`}>Completed</div>
                    </div>
                    <div className="flex h-full gap-1">
                        <div className="flex gap-2 items-center justify-center border border-[#2A2B2D] hover:bg-[#242527] cursor-pointer px-7 h-full rounded-sm"><Gamepad2 />All Games<ChevronDown /></div>
                        <div className="flex gap-2 items-center justify-center border border-[#2A2B2D] hover:bg-[#242527] cursor-pointer px-7 h-full rounded-sm"><ListFilterPlus />Filters</div>
                    </div>
                </div>

                <div className="overflow-hidden overflow-y-auto rounded-xl border border-[#343539] bg-[#171819]">
                    <table className="w-full">
                        <thead className="border-b border-[#343539] text-xs uppercase tracking-wider text-[#7E8190]">
                            <tr>
                                <th className="px-5 py-4 text-left">Tournament</th>
                                <th className="px-5 py-4 text-left">Game</th>
                                <th className="px-5 py-4 text-left">Per Kill</th>
                                <th className="px-5 py-4 text-left">Prize Pool</th>
                                <th className="px-5 py-4 text-left">Starts In</th>
                                <th className="px-5 py-4 text-left">Registration</th>
                                <th className="px-5 py-4 text-left">Entry Fee</th>
                                <th className="px-5 py-4 text-left">Status</th>
                                <th className="w-16"></th>
                            </tr>
                        </thead>

                        <tbody>
                            {tournaments.map((tournament) => {
                                return (
                                    <tr key={tournament.id} className="border-b border-zinc-800 hover:bg-white/5">
                                        {/* Tournament */}
                                        <td className="px-5 py-4">
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
                                        <td className="px-5 py-4 font-semibold tracking-wide text-white"> {tournament.game} </td>

                                        {/* Per Kill */}
                                        <td className="px-5 py-4 font-medium text-white"> ₹{tournament.perKill} </td>

                                        {/* Prize Pool */}
                                        <td className="px-5 py-4 font-medium text-white"> ₹{tournament.prizePool} </td>

                                        {/* Starts */}
                                        <td className="px-5 py-4 text-[#9A9AA3]"> {(() => {
                                            const d = intervalToDuration({
                                                start: new Date(),
                                                end: new Date(tournament.registrationEnds),
                                            });
                                            return `${d.days ?? 0}d ${d.hours ?? 0}h ${d.minutes ?? 0}m`;
                                        })()} </td>

                                        {/* Registration */}
                                        <td className="px-5 py-4 text-[#9A9AA3]">
                                            <span className="text-[#22C55E]">{tournamentPlayers.filter((t) => t.tournamentId  === tournament.id).length}</span> / {tournament.maxPlayers}
                                        </td>

                                        {/* Entry Fee */}
                                        <td className="px-5 py-4 text-white"> ₹{tournament.entryFee} </td>

                                        {/* Status */}
                                        <td className="px-5 py-4">
                                            <span className="rounded-md bg-[#22C55E]/20 px-3 py-2 text-sm font-medium text-[#22C55E]">
                                                Registration Open
                                            </span>
                                        </td>

                                        {/* Action */}
                                        <td onClick={() => router.push(`/tournaments/${tournament.id}`)} className="px-5 py-4">
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
            </div>
        </div>
    );
}
