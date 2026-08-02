import Image from "next/image";
import { Radio } from "lucide-react";

export default function TournamentCard({ image, perKill, currentPlayers, totalPlayers }: { image: string, perKill:number, currentPlayers: number, totalPlayers: number }) {
    return (
        <div className="flex flex-col min-w-70 rounded-md border-2 border-[#2A2B2D] bg-[#101112] hover:bg-[#1D1E20] overflow-hidden group">
            <div className="flex w-70 h-40 overflow-hidden">
                <img src={image} alt="BGMI" className="w-full h-full object-cover transition-transform duration-100 ease-in-out group-hover:scale-120" />
            </div>
            <div className="flex flex-col p-4 gap-3">
                <span className="font-semibold">Tournament Name</span>

                <div className="flex place-content-between">
                    <div className="flex flex-col">
                        <span className="text-[#7E8190] text-xs">Per Kill</span>
                        <span className="">₹{perKill}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[#7E8190] text-xs">Players</span>
                        <div className="flex">
                            <span className="text-[#22C55E]">{currentPlayers}</span>
                            <span className="">/{totalPlayers}</span>
                        </div>
                    </div>
                </div>

                <div className="flex h-1 rounded-full bg-[#303136]">
                    <div className="flex h-full rounded-full bg-[#5B4BFF]" style={{ width: `${(currentPlayers / totalPlayers) * 100}%` }} />
                </div>

                <div className="flex gap-2 mt-5 items-center justify-center border border-[#2A2B2D] rounded-md text-white cursor-pointer text-sm font-semibold hover:bg-[#343539] py-3">
                    <Radio />
                    Watch Live
                </div>
            </div>
        </div>
    )
}