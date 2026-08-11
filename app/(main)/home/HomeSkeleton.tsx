import { Skeleton } from "@/Components/ui/skeleton";
import { Bell, Mail, ChevronRight } from "lucide-react";

export default function HomeSkeleton() {
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
                <div className="flex min-h-80 rounded-md items-center justify-center" ><Skeleton className="w-full h-full bg-zinc-800 animate-pulse" /></div>

                {/* Live Tournaments */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-center place-content-between">
                        <span className="font-semibold text-xl">Live Now</span>
                        <span className="text-[#A79FFF] text-sm hover:underline cursor-pointer">View All</span>
                    </div>
                    <div className="flex gap-5 overflow-x-auto pb-2">
                        {/* Card */}
                        <Skeleton className="min-w-80 h-80 bg-zinc-800 animate-pulse" />
                        <Skeleton className="min-w-80 h-80 bg-zinc-800 animate-pulse" />
                    </div>
                </div>

                {/* Upcoming Tournaments */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-center place-content-between">
                        <span className="font-semibold text-xl">Upcoming Tournaments</span>
                        <span className="text-[#A79FFF] text-sm hover:underline cursor-pointer">View All</span>
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
                                {Array.from({ length: 3 }).map((_, i) => {
                                    return (<tr key={i} className="border-b border-zinc-800 hover:bg-white/5">
                                        {/* Tournament */}
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <Skeleton className="w-full h-10 bg-zinc-800 animate-pulse" />
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-medium text-white"> <Skeleton className="w-full h-10 bg-zinc-800 animate-pulse" /> </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Game */}
                                        <td className="px-5 py-4 font-semibold tracking-wide text-white"><Skeleton className="w-full h-10 bg-zinc-800 animate-pulse" /></td>

                                        {/* Per Kill */}
                                        <td className="px-5 py-4 font-medium text-white"><Skeleton className="w-full h-10 bg-zinc-800 animate-pulse" /></td>

                                        {/* Prize Pool */}
                                        <td className="px-5 py-4 font-medium text-white"><Skeleton className="w-full h-10 bg-zinc-800 animate-pulse" /></td>

                                        {/* Starts */}
                                        <td className="px-5 py-4 text-[#9A9AA3]"> <Skeleton className="w-full h-10 bg-zinc-800 animate-pulse" /> </td>

                                        {/* Entry Fee */}
                                        <td className="px-5 py-4 text-white"><Skeleton className="w-full h-10 bg-zinc-800 animate-pulse" /></td>

                                        {/* Action */}
                                        <td className="px-5 py-4">
                                            <div className="cursor-pointer flex h-9 w-9 items-center justify-center rounded-lg text-[#9A9AA3] hover:bg-[#1C1D23] hover:text-white">
                                                <Skeleton className="w-full h-10 bg-zinc-800 animate-pulse" />
                                            </div>
                                        </td>
                                    </tr>)
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex md:hidden flex-col gap-3">
                        {Array.from({ length: 3 }).map((_, i) => {
                            return (<Skeleton key={i} className="w-full h-80 bg-zinc-800 animate-pulse" />)
                        })}
                    </div>
                </div>
            </div>

        </div>
    );
}