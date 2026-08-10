'use client'

import TournamentCard from "@/Components/tournamentCard";
import { Bell, ChevronRight, Mail, Menu, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import WIP from "@/Components/WIP";
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

interface Props {
    tournaments: Tournaments[]
}
export default function HomeUI({ tournaments }: Props) {
    const router = useRouter();

    return (
        <div className="flex flex-col w-full h-full gap-5 overflow-hidden">
            <div className="flex flex-col gap-10 w-full overflow-y-auto scrollbar-none overflow-x-hidden">
                {/* Navbar */}
                <div className="flex w-full place-content-end items-center">
                    {/* icons */}
                    <div className="md:flex hidden gap-5">
                        <div className="flex hover:bg-[#1D1E20] hover:text-white w-12 h-12 items-center justify-center rounded-full cursor-pointer text-[#7E8190]"><Bell /></div>
                        <div className="flex hover:bg-[#1D1E20] hover:text-white w-12 h-12 items-center justify-center rounded-full cursor-pointer text-[#7E8190]"><Mail /></div>
                    </div>
                </div>

                {/* Slider */}
                <div className="flex border-2 border-[#2A2B2D] min-h-80 rounded-md items-center justify-center" ><WIP /></div>

                {/* Live Tournaments */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-center place-content-between">
                        <span className="font-semibold text-xl">Live Now</span>
                        <span onClick={() => router.push('/tournaments')} className="text-[#A79FFF] text-sm hover:underline cursor-pointer">View All</span>
                    </div>
                    <div className="flex gap-5 overflow-x-auto pb-2">
                        {/* Card */}
                        <TournamentCard image="/BGMI.jpg" perKill={9} currentPlayers={10} totalPlayers={99} />
                        <TournamentCard image="/FF.jpg" perKill={10} currentPlayers={30} totalPlayers={99} />
                        <TournamentCard image="/Valorant.jpg" perKill={10} currentPlayers={8} totalPlayers={10} />
                        <TournamentCard image="/FF2.jpg" perKill={10} currentPlayers={22} totalPlayers={50} />
                    </div>
                </div>

                {/* Upcoming Tournaments */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-center place-content-between">
                        <span className="font-semibold text-xl">Upcoming Tournaments</span>
                        <span onClick={() => router.push('/tournaments')} className="text-[#A79FFF] text-sm hover:underline cursor-pointer">View All</span>
                    </div>

                    <div className="rounded-xl md:flex flex-col hidden border border-[#343539] bg-[#171819] min-h-max max-h-100 overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="border-b border-[#343539] text-xs uppercase tracking-wider text-[#7E8190]">
                                <tr>
                                    <th className="px-5 py-4 min-w-60 text-left">Tournament</th>
                                    <th className="px-5 py-4 min-w-15 text-left">Game</th>
                                    <th className="px-5 py-4 min-w-10 text-left">Per Kill</th>
                                    <th className="px-5 py-4 min-w-10 text-left">Prize Pool</th>
                                    <th className="px-5 py-4 min-w-10 text-left">Starts In</th>
                                    <th className="px-5 py-4 min-w-10 text-left">Entry Fee</th>
                                    <th className="w-16"></th>
                                </tr>
                            </thead>

                            <tbody>
                                {tournaments.map((tournament, i) => {
                                    const d = intervalToDuration({
                                        start: new Date(),
                                        end: new Date(tournament.registrationEnds),
                                    });
                                    return (
                                        i < 2 && (<tr key={tournament.id} className="border-b border-zinc-800 hover:bg-white/5">
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
                                                            <span className="font-medium text-white"> {tournament.name} </span>
                                                        </div>

                                                        <span className="text-sm text-zinc-400"> Open to All </span>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Game */}
                                            <td className="px-5 py-4 font-semibold tracking-wide text-white">{tournament.game}</td>

                                            {/* Per Kill */}
                                            <td className="px-5 py-4 font-medium text-white">₹{tournament.perKill}</td>

                                            {/* Prize Pool */}
                                            <td className="px-5 py-4 font-medium text-white">₹{tournament.prizePool}</td>

                                            {/* Starts */}
                                            <td className="px-5 py-4 text-[#9A9AA3]"> {`${d.days ?? 0}d ${d.hours ?? 0}h ${d.minutes ?? 0}m`} </td>

                                            {/* Entry Fee */}
                                            <td className="px-5 py-4 text-white">₹{tournament.entryFee}</td>

                                            {/* Action */}
                                            <td onClick={() => router.push('/tournaments/tournamentName')} className="px-5 py-4">
                                                <div className="cursor-pointer flex h-9 w-9 items-center justify-center rounded-lg border border-[#3F3E41] text-[#9A9AA3] hover:bg-[#1C1D23] hover:text-white">
                                                    <ChevronRight size={18} />
                                                </div>
                                            </td>
                                        </tr>)
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex md:hidden flex-col gap-3">
                        {tournaments.map((tournament, i) => {
                            const d = intervalToDuration({
                                start: new Date(),
                                end: new Date(tournament.registrationEnds),
                            });
                            return (
                                i < 2 && (<div key={tournament.id} onClick={() => router.push(`/tournaments/${tournament.id}`)} className="flex cursor-pointer flex-col gap-3 rounded-xl border border-[#343539] bg-[#171819] p-4 active:bg-white/5" >
                                    <Image src="/Valorant.jpg" alt="Valorant" width={500} height={500} className="shrink-0 rounded-lg object-cover" />
                                    <div className="flex items-center gap-3">
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-xl font-medium text-white">{tournament.name}</p>
                                            <p className="text-sm text-zinc-400">Open to All · {tournament.game}</p>
                                        </div>
                                        <ChevronRight size={25} className="shrink-0 text-[#9A9AA3]" />
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
                                </div>)
                            )
                        })}
                    </div>
                </div>
            </div>

        </div>
    );
}
