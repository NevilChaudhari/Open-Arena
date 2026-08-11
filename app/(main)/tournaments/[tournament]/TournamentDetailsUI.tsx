"use client";

import { useState } from "react";
import { Gamepad2, ShieldCheck, Crosshair, Copy, X, Check, LogOut, } from "lucide-react";
import { useRouter } from "next/navigation";

interface TournamentDetails {
    id: string;
    game: string;
    name: string;
    type: string;
    map: string;
    mode: string;
    registrationEnds: number;
    entryFee: number;
    perKill: number;
    prizePool: number;
    maxPlayers: number;
    roomId?: string,
    roomPassword?: string,
}

interface User {
    id: string;
    username: string
    coins: number
}

interface TournamentPlayers {
    id: string;
    playerId: string;
    tournamentId: string;
    users: User
}

interface Props {
    tournamentDetails: TournamentDetails
    user: User
    tournamentPlayers: TournamentPlayers[]
}

const RULES = [
    "Squad must consist of exactly 4 players. No substitutes after check-in closes.",
    "Teaming with rival squads results in immediate disqualification, no refund.",
    "Emulator / bluestacks players are not allowed in mobile-only brackets.",
    "Room ID and password are shared 10 minutes before match start — be online.",
    "Screenshot of the final results screen is mandatory for prize verification.",
    "Open Arena's decision on disputes is final.",
];

type Tab = "Overview" | "Rules" | "Squads"

export default function TournamentDetailsUI({ tournamentDetails, user, tournamentPlayers }: Props) {
    const router = useRouter()

    const [tab, setTab] = useState<Tab>("Overview");
    const [joinPopUp, setJoinPopUp] = useState(false);

    const hasJoined = tournamentPlayers.some((t) => t.playerId === user.id);
    const hasSpace = tournamentDetails.maxPlayers > tournamentPlayers.length;
    const isRegistrationOpen = new Date(tournamentDetails.registrationEnds) > new Date();
    const canJoin = !hasJoined && hasSpace;

    let [isJoining, setIsJoining] = useState(false);
    const [copied, setCopied] = useState("");

    const joinTournament = async () => {
        if (user.coins < tournamentDetails.entryFee) {
            return;
        }
        setIsJoining(true);
        const res = await fetch('/api/tournament/join', {
            method: "POST",
            body: JSON.stringify({
                playerId: user.id,
                tournamentId: tournamentDetails.id
            })
        })

        const data = await res.json()

        if (data.error) {
            console.log(`tournament joining error: ${data.error}`);
            return;
        }

        const resa = await fetch('/api/transactions/updateData', {
            method: "POST",
            body: JSON.stringify({
                ammount: tournamentDetails.entryFee,
                userId: user.id
            })
        })

        router.refresh()
    }

    const leaveTournament = async () => {
        if (!hasJoined) return;
        const res = await fetch('/api/tournament/leave', {
            method: "POST",
            body: JSON.stringify({
                tournamentId: tournamentDetails.id,
                playerId: user.id,
                coins: (user.coins + tournamentDetails.entryFee)
            }),
        });

        const data = await res.json();
        if (data.error) console.log(`tournament leave error: ${data.error}`);
        router.refresh();
    };

    const handleCopy = (text: string, type: 'roomId' | 'roomPassword') => {
        navigator.clipboard.writeText(text ?? "");
        setCopied(type);

        setTimeout(() => {
            setCopied("");
        }, 2000);
    };

    return (
        <div className="flex h-full w-full flex-col gap-5 font-['Inter'] text-white">
            {/* Banner */}
            <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-4 rounded-2xl border border-[#2C292A] bg-[#16161C] px-4 py-5 md:px-6 md:py-6">

                <div className="flex flex-col gap-5 justify-center w-full">
                    <div className="flex items-start justify-between gap-3">
                        <h1 className="mt-3 flex-1 min-w-0 wrap-break-word text-2xl font-bold leading-tight md:text-4xl">{tournamentDetails.name}</h1>
                        <div onClick={hasJoined ? leaveTournament : canJoin && !isJoining && isRegistrationOpen ? joinTournament : undefined} className={`flex md:hidden items-center justify-center rounded-[10px] text-xl font-semibold w-25 py-2 text-center transition-all duration-200 border group ${hasJoined ? 'cursor-pointer text-white bg-[#EF4444] border-[#EF4444]' : canJoin && !isJoining && isRegistrationOpen ? 'cursor-pointer bg-[#6B58D6] hover:bg-[#6B58D6]/80 border-[#2C292A] text-white' : 'bg-[#EF4444]/10 border-[#EF4444]/30 text-[#EF4444] cursor-not-allowed'}`} >
                            {hasJoined
                                ? <div>
                                    <span className="">Leave</span>
                                </div>
                                : !isRegistrationOpen ? ('Closed') : !hasSpace ? ('Tournament Full') : ('Join')
                            }
                        </div>
                    </div>
                    <div className="gap-3 md:gap-5 md:flex grid grid-cols-2">
                        <div className="flex items-center justify-start gap-3 md:gap-5">
                            <div className="flex w-10 h-10 shrink-0 bg-[#6B58D6] items-center justify-center rounded-md">
                                <Gamepad2 />
                            </div>
                            <div className="flex flex-col min-w-0 text-sm md:text-base">
                                <span className="text-sm text-[#9A9AA3]">Game Name</span>
                                {tournamentDetails.game}
                            </div>
                        </div>
                        <div className="flex items-center justify-start gap-3 md:gap-5">
                            <div className="flex w-10 h-10 shrink-0 bg-[#6B58D6] items-center justify-center rounded-md">
                                <Gamepad2 />
                            </div>
                            <div className="flex flex-col min-w-0 text-sm md:text-base">
                                <span className="text-sm text-[#9A9AA3]">Game Map</span>
                                {tournamentDetails.map}
                            </div>
                        </div>
                        <div className="flex items-center justify-start gap-3 md:gap-5">
                            <div className="flex w-10 h-10 shrink-0 bg-[#6B58D6] items-center justify-center rounded-md">
                                <Gamepad2 />
                            </div>
                            <div className="flex flex-col min-w-0 text-sm md:text-base">
                                <span className="text-sm text-[#9A9AA3]">Game Mode</span>
                                {tournamentDetails.mode}
                            </div>
                        </div>
                        <div className="flex items-center justify-start gap-3 md:gap-5">
                            <div className="flex w-10 h-10 shrink-0 bg-[#6B58D6] items-center justify-center rounded-md">
                                <Gamepad2 />
                            </div>
                            <div className="flex flex-col min-w-0 text-sm md:text-base">
                                <span className="text-sm text-[#9A9AA3]">Game Type</span>
                                {tournamentDetails.type}
                            </div>
                        </div>
                    </div>
                </div>

                <div onClick={hasJoined ? leaveTournament : canJoin && !isJoining && isRegistrationOpen ? joinTournament : undefined} className={`md:flex hidden items-center justify-center rounded-[10px] text-xl font-semibold w-40 py-3 text-center transition-all duration-200 border group ${hasJoined ? 'cursor-pointer bg-green-500/20 border-green-500/30 text-green-400 hover:bg-[#EF4444] hover:border-[#EF4444] hover:text-white' : canJoin && !isJoining && isRegistrationOpen ? 'cursor-pointer bg-[#6B58D6] hover:bg-[#6B58D6]/80 border-[#2C292A] text-white' : 'bg-[#EF4444]/10 border-[#EF4444]/30 text-[#EF4444] cursor-not-allowed'}`} >
                    {hasJoined
                        ? <div>
                            <span className="group-hover:hidden">Joined</span>
                            <span className="hidden group-hover:block">Leave</span>
                        </div>
                        : !isRegistrationOpen ? ('Closed') : !hasSpace ? ('Tournament Full') : ('Join')
                    }
                </div>
            </div>

            {/* Tabs */}
            <div className="flex shrink-0 items-center gap-1 border-b border-[#202126]">
                <div onClick={() => setTab('Overview')} className={`cursor-pointer border-b-2 hover:border-[#6B58D6] px-4 py-2.5 text-sm font-medium ${tab === 'Overview' ? "text-white border-[#6B58D6]" : "text-[#9A9AA3] hover:text-[#C8C8D0] border-transparent"}`} >Overview</div>
                <div onClick={() => setTab('Rules')} className={`cursor-pointer border-b-2 hover:border-[#6B58D6] px-4 py-2.5 text-sm font-medium ${tab === 'Rules' ? "text-white border-[#6B58D6]" : "text-[#9A9AA3] hover:text-[#C8C8D0] border-transparent"}`} >Rules</div>
                <div onClick={() => setTab('Squads')} className={`cursor-pointer border-b-2 hover:border-[#6B58D6] px-4 py-2.5 text-sm font-medium ${tab === 'Squads' ? "text-white border-[#6B58D6]" : "text-[#9A9AA3] hover:text-[#C8C8D0] border-transparent"}`} >{tournamentDetails.type === 'squad' ? 'Squads' : 'Players'}</div>
            </div>

            <div className="flex-1 overflow-y-auto pb-2 pr-1">
                {tab === "Overview" && (
                    <div className="flex flex-col gap-5">
                        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-[#202126] md:grid-cols-4">
                            <div className="flex flex-col items-center gap-0 bg-[#0A0C0F] px-4 py-6 md:py-10 text-center">
                                <p className="text-[10px] md:text-xs uppercase tracking-wide text-[#6C6D73]">Entry Fee</p>
                                <p className="text-2xl font-semibold">₹{tournamentDetails.entryFee}</p>
                            </div>
                            <div className="flex flex-col items-center gap-0 bg-[#0A0C0F] px-4 py-6 md:py-10 text-center">
                                <p className="text-[10px] md:text-xs uppercase tracking-wide text-[#6C6D73]">Per Kill</p>
                                <p className="text-2xl font-semibold">₹{tournamentDetails.entryFee}</p>
                            </div>
                            <div className="flex flex-col items-center gap-0 bg-[#0A0C0F] px-4 py-6 md:py-10 text-center">
                                <p className="text-[10px] md:text-xs uppercase tracking-wide text-[#6C6D73]">Prize Pool</p>
                                <p className="text-2xl font-semibold">₹{tournamentDetails.prizePool}</p>
                            </div>
                            <div className="flex flex-col items-center gap-0 bg-[#0A0C0F] px-4 py-6 md:py-10 text-center">
                                <p className="text-[10px] md:text-xs uppercase tracking-wide text-[#6C6D73]">Slots Filled</p>
                                <p className="text-2xl font-semibold">{tournamentDetails.maxPlayers}</p>
                            </div>
                        </div>

                        <div className={`bg-[#16161C] border border-[#2C292A] rounded-2xl p-4 md:p-5`}>
                            <div className="flex items-center justify-between text-sm">
                                <span className="font-semibold text-white">Slots Filling Fast</span>
                                <span><span className="text-[#22C55E]">{tournamentPlayers.length}</span> / {tournamentDetails.maxPlayers}</span>
                            </div>
                            <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#202126]">
                                <div className="h-full rounded-full bg-[#6B58D6]" style={{ width: `${Math.round((tournamentPlayers.length / tournamentDetails.maxPlayers) * 100)}%` }} />
                            </div>
                            <span className="mt-2 text-xs text-[#6C6D73]">{(tournamentDetails.maxPlayers - tournamentPlayers.length)} slots remaining · closes automatically when full</span>
                        </div>

                        {(!tournamentDetails.roomId || !tournamentDetails.roomPassword || !hasJoined || isRegistrationOpen) && (<div className="flex items-start gap-3 rounded-2xl border border-[#F59E0B]/30 bg-[#F59E0B]/8 p-4">
                            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#F59E0B]" />
                            <span className="text-sm text-[#C8C8D0]">
                                Room ID and password unlock on your dashboard automatically 10 minutes before
                                start — no need to message admins.
                            </span>
                        </div>)}

                        {tournamentDetails.roomId && tournamentDetails.roomPassword && hasJoined && !isRegistrationOpen && (
                            <div className="bg-[#16161C] border border-[#2C292A] rounded-2xl p-4 md:p-5">
                                <h3 className="text-white font-semibold mb-4">Room Details</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Room ID */}
                                    <div className="bg-[#0A0C0F] rounded-xl p-4 border border-[#2C292A]">
                                        <p className="text-xs uppercase tracking-wide text-[#6C6D73]"> Room Id </p>
                                        <div className="mt-2 flex items-center justify-between gap-3">
                                            <p className="text-xl font-semibold text-white"> {tournamentDetails.roomId} </p>
                                            <button onClick={() => handleCopy(tournamentDetails.roomId!, "roomId")} className="rounded-lg text-[#6B58D6] px-3 py-1.5 text-sm cursor-pointer" >{copied === "roomId" ? (<Check className="h-5 w-5 text-green-500" />) : (<Copy className="h-5 w-5" />)}</button>
                                        </div>
                                    </div>

                                    {/* Room Password */}
                                    <div className="bg-[#0A0C0F] rounded-xl p-4 border border-[#2C292A]">
                                        <p className="text-xs uppercase tracking-wide text-[#6C6D73]"> Room Password </p>
                                        <div className="mt-2 flex items-center justify-between gap-3">
                                            <p className="text-xl font-semibold text-white"> {tournamentDetails.roomPassword} </p>
                                            <button onClick={() => handleCopy(tournamentDetails.roomPassword!, "roomPassword")} className="rounded-lg text-[#6B58D6] px-3 py-1.5 text-sm cursor-pointer" >{copied === "roomPassword" ? (<Check className="h-5 w-5 text-green-500" />) : (<Copy className="h-5 w-5" />)}</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
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
                        <p className="font-['Rajdhani'] text-lg font-bold">Registered {tournamentDetails.type === 'squad' ? 'Squads' : 'Players'} ({tournamentPlayers.length})</p>
                        <div className="mt-4 grid grid-cols-1 gap-2 md:grid-cols-4">
                            {tournamentPlayers.map((tournamentPlayer, i) => {
                                return (
                                    <div key={tournamentPlayer.id} className="flex items-center gap-3 rounded-[10px] border border-[#2C292A] bg-[#0A0C0F] px-3.5 py-2.5">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#6B58D6]/15 font-['Rajdhani'] text-xs font-bold text-[#A79FFF]">
                                            {tournamentPlayer.users.username.slice(0, 2).toUpperCase()}
                                        </div>
                                        <span className="text-sm text-[#C8C8D0]">{tournamentPlayer.users.username}</span>
                                        <span className="ml-auto font-['Rajdhani'] text-xs text-[#6C6D73]">#{String(i + 1).padStart(2, "0")}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}