'use client'

import TournamentCard from "@/Components/tournamentCard";
import { Bell, ChevronRight, Mail, Search } from "lucide-react";
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
    pricePool: string,
    perKill: string,
}

interface Props {
    tournaments: Tournaments[]
}
export default function HomeUI({ tournaments }: Props) {
    const router = useRouter();

    return (
        <div className="flex flex-col w-full h-full gap-5 overflow-hidden">
            {/* Left Part */}
            <div className="flex flex-col gap-10 w-full overflow-y-auto scrollbar-none overflow-x-hidden">
                {/* Navbar */}
                <div className="flex w-full place-content-between items-center">
                    {/* Searchbox */}
                    <div className="flex bg-[#202124] border border-[#44454A] h-13 w-100 gap-2 items-center rounded-md px-2">
                        <Search className="text-[#7E8190]" size={20} />
                        <input type="text" placeholder="Search" className="w-full h-full focus:outline-0" />
                    </div>

                    {/* icons */}
                    <div className="flex gap-5">
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

                    <div className="rounded-xl border border-[#343539] bg-[#171819] min-h-max max-h-100 overflow-x-auto">
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
                                            <td className="px-5 py-4 font-medium text-white">₹{tournament.pricePool}</td>

                                            {/* Starts */}
                                            <td className="px-5 py-4 text-[#9A9AA3]"> {(() => {
                                                const d = intervalToDuration({
                                                    start: new Date(),
                                                    end: new Date(tournament.registrationEnds),
                                                });
                                                return `${d.days ?? 0}d ${d.hours ?? 0}h ${d.minutes ?? 0}m`;
                                            })()} </td>

                                            {/* Entry Fee */}
                                            <td className="px-5 py-4 text-white">₹{tournament.entryFee}</td>

                                            {/* Action */}
                                            <td onClick={() => router.push('/tournaments/tournamentName')} className="px-5 py-4">
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

        </div>
    );
}
