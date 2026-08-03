'use client'

import { useState } from "react";
import { ChevronDown, ChevronUp, User, Users, X } from "lucide-react";

interface Game {
    id: number
    name: string
    icon: string | null
}

interface Props {
    games: Game[] | null
}

type teamSize = 'solo' | 'duo' | 'squad'

export default function AddTournamentUI({ games }: Props) {

    const [selectedGame, setSelectedGame] = useState<Game>({ id: 0, name: 'select game', icon: null });
    const [openGamesDropdown, setOpenGamesDropdown] = useState(false);
    const [openAddGame, setOpenAddGame] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const [gameName, setGameName] = useState('');
    const [logo, setLogo] = useState<File | null>(null);
    const [teamSize, setTeamSize] = useState<teamSize>('solo');

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setLogo(file);
        setPreview(URL.createObjectURL(file));
    };

    const addGame = async () => {
        if (!logo) {
            alert("Please select an image");
            return;
        }
        const formData = new FormData();
        formData.append("name", gameName);
        formData.append("image", logo);

        await fetch("/api/games", {
            method: "POST",
            body: formData,
        });
        setOpenAddGame(false);
    }

    return (
        <div className="w-full h-full overflow-y-auto flex flex-col gap-5">

            {/* Pop up */}
            {openAddGame && (<div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="flex bg-[#0A0C0F] w-100 h-100 items-center justify-center border border-[#2C292A] rounded-md">
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                        <div className="w-105 rounded-xl border border-[#2C292A] bg-[#0A0C0F] p-6 shadow-xl">

                            {/* Header */}
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="text-2xl font-bold">Add Game</h2>
                            </div>

                            {/* Logo Preview */}
                            <div className="mb-5 flex justify-center">
                                <div className="flex h-36 w-36 items-center justify-center rounded-lg border-2 border-dashed border-[#3F3E41] bg-[#16161C]">
                                    {preview ? <img src={preview} alt="Game Logo" className="h-full w-full object-contain p-3" /> : <span className="text-sm text-gray-500">Logo Preview</span>}
                                </div>
                            </div>

                            {/* Game Name */}
                            <div className="mb-4">
                                <label className="mb-2 block text-sm font-medium">Game Name</label>
                                <input type="text" value={gameName} onChange={(e) => setGameName(e.target.value)} placeholder="Enter game name" className="w-full rounded-md border border-[#3F3E41] bg-[#16161C] px-4 py-2 outline-none focus:border-[#6B58D6]" />
                            </div>

                            {/* Logo Upload */}
                            <div className="mb-6">
                                <label className="mb-2 block text-sm font-medium">Game Logo</label>
                                <input type="file" accept="image/*" onChange={handleLogoChange} className="block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-[#6B58D6] file:px-4 file:py-2 file:text-white hover:file:bg-[#6B58D6]/70" />
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end gap-3">
                                <div onClick={() => setOpenAddGame(false)} className="cursor-pointer rounded-md border border-[#3F3E41] px-5 py-2 hover:bg-[#1A1C20]" >Cancel</div>
                                <div onClick={addGame} className="cursor-pointer rounded-md bg-[#6B58D6] px-5 py-2 font-medium hover:bg-[#6B58D6]/70" >Upload</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)}

            {/* Header */}
            <div className="flex flex-col">
                <span className="text-4xl font-semibold">Create Tournament</span>
                <span className="text-md text-[#7E8190]">Setup your tournament details</span>
            </div>

            <div className="flex flex-col bg-[#16161C] border border-[#3F3E41] h-auto rounded-md p-5 gap-5">
                {/* Header */}
                <div className="flex items gap-5">
                    <span className="w-10 h-10 bg-[#6B58D6] rounded-full flex items-center justify-center">1</span>
                    <span className="flex items-center justify-center font-semibold text-xl">Basic Information</span>
                </div>
                <div className="flex gap-10">
                    {/* Tournament Name */}
                    <div className="flex flex-col gap-1">
                        <span className="text-[#9A9AA3]">Tournament Name</span>
                        <input type="text" className="border border-[#2C292A] bg-[#111217] px-2 py-3 w-100 rounded-md" placeholder="Enter Tournament Name" />
                    </div>

                    {/* Tournament Game */}
                    <div className="flex flex-col gap-1">
                        <span className="text-[#9A9AA3]">Game</span>
                        <div className="relative w-105">
                            {/* Button */}
                            <div onClick={() => setOpenGamesDropdown(!openGamesDropdown)} className="flex w-full items-center justify-between rounded-lg border border-[#2C292A] bg-[#111217] px-3 py-2" >
                                <div className="flex items-center gap-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#1C1D23]">
                                        <div className="flex w-8 h-8 p-1 items-center justify-center">{selectedGame.icon && (<img src={selectedGame.icon} alt={selectedGame.name} className="w-full h-full object-cover" />)}</div>
                                    </div>
                                    <span className="text-lg text-white font-semibold"> {selectedGame.name} </span>
                                </div>
                                {openGamesDropdown ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
                            </div>

                            {/* Dropdown */}
                            {openGamesDropdown && (
                                <div className="absolute mt-2 flex flex-col gap-1 w-full overflow-hidden rounded-lg border border-[#2C292A] bg-[#111217] shadow-xl">
                                    {games?.map((game) => (
                                        <div key={game.name} onClick={() => { setSelectedGame(game); setOpenGamesDropdown(false); }} className="flex cursor-pointer w-full items-center gap-3 px-3 py-2 hover:bg-[#16161C]" >
                                            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#1C1D23]">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#1C1D23]">
                                                    <div className="flex w-8 h-8 p-1 items-center justify-center">{game.icon && (<img src={game.icon} alt={game.name} className="w-full h-full object-cover" />)}</div>
                                                </div>
                                            </div>
                                            <span className="text-lg text-white font-semibold"> {game.name} </span>
                                        </div>
                                    ))}
                                    <div onClick={() => { setOpenGamesDropdown(false); setOpenAddGame(true) }} className="flex cursor-pointer w-full items-center justify-center border border-dashed border-[#6B58D6] rounded-md px-3 py-2 hover:bg-[#6B58D6]/50" >
                                        <span className="text-lg text-white font-semibold"> Add Game </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {/* Tournament Type */}
                <div className="flex flex-col gap-1">
                    <span className="text-[#9A9AA3]">Tournament Type</span>
                    <div className="w-full flex gap-5 justify-between">
                        <div onClick={() => setTeamSize('solo')} className={`cursor-pointer flex h-10 w-full items-center justify-center gap-2 bg-[#111217] rounded-md border transition-all ${teamSize === 'solo' ? ' border-[#6B58D6] text-white' : 'border-[#2C292A] text-[#9A9AA3]'}`}><p className="flex gap-2 "><User /> Solo</p></div>
                        <div onClick={() => setTeamSize('duo')} className={`cursor-pointer flex h-10 w-full items-center justify-center gap-2 bg-[#111217] rounded-md border transition-all ${teamSize === 'duo' ? ' border-[#6B58D6] text-white' : 'border-[#2C292A] text-[#9A9AA3]'}`}><p className="flex gap-2 "><Users /> Duo</p></div>
                        <div onClick={() => setTeamSize('squad')} className={`cursor-pointer flex h-10 w-full items-center justify-center gap-2 bg-[#111217] rounded-md border transition-all ${teamSize === 'squad' ? ' border-[#6B58D6] text-white' : 'border-[#2C292A] text-[#9A9AA3]'}`}><p className="flex gap-2 "><Users /> Squad</p></div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col bg-[#16161C] border border-[#3F3E41] h-auto rounded-md p-5 gap-5">
                {/* Header */}
                <div className="flex items gap-5">
                    <span className="w-10 h-10 bg-[#6B58D6] rounded-full flex items-center justify-center">2</span>
                    <span className="flex items-center justify-center font-semibold text-xl">Date & Time</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-[#9A9AA3]">Registration End Date</span>
                    <div className="w-full max-w-sm">
                        <div className="flex h-10 items-center justify-between rounded-md border border-white/10 bg-[#111217] px-5 transition-all duration-200 hover:border-white/15 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20">
                            <input
                                type="text"
                                placeholder="Select date"
                                onFocus={(e) => (e.target.type = "date")}
                                onBlur={(e) => {
                                    if (!e.target.value) e.target.type = "text";
                                }}
                                className="w-full bg-transparent text-lg text-white placeholder:text-gray-400 outline-none [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:invert" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col bg-[#16161C] border border-[#3F3E41] h-auto rounded-md p-5 gap-5">
                {/* Header */}
                <div className="mb-6 flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#6B58D6] font-semibold">
                        3
                    </div>

                    <h2 className="text-2xl font-semibold">Tournament Details</h2>
                </div>

                {/* Fields */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

                    {/* Mode */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-[#B3B7C5]">
                            Mode 
                        </label>

                        <select className="h-10 w-full rounded-md border border-[#2C292A] bg-[#111217] px-4 text-white outline-none focus:border-[#6B58D6]">
                            <option>Select mode</option>
                            <option>CS</option>
                            <option>BR</option>
                            <option>LW</option>
                        </select>
                    </div>

                    {/* Map Pool */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-[#B3B7C5]">
                            Map Pool / Format 
                        </label>

                        <select className="h-10 w-full rounded-md border border-[#2C292A] bg-[#111217] px-4 text-white outline-none focus:border-[#6B58D6]">
                            <option>Select map pool or format</option>
                            <option>CS</option>
                            <option>BR</option>
                            <option>LW</option>
                        </select>
                    </div>

                    {/* Max Teams */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-[#B3B7C5]">
                            Max Teams / Players 
                        </label>

                        <input
                            type="number"
                            placeholder="e.g. 16"
                            className="h-10 w-full rounded-md border border-[#2C292A] bg-[#111217] px-4 text-white placeholder:text-[#73788A] outline-none focus:border-[#6B58D6]"
                        />
                    </div>

                    {/* Entry Fee */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-[#B3B7C5]">
                            Entry Fee 
                        </label>

                        <div className="flex h-10 items-center rounded-md border border-[#2C292A] bg-[#111217] px-4">
                            <span className="mr-3 rounded-full text-sm">
                                <img src="/coin.png" alt="Rupee" className="h-9 w-10" />
                            </span>

                            <input
                                type="number"
                                placeholder="0"
                                className="w-full bg-transparent text-white outline-none"
                            />
                        </div>
                    </div>

                    {/* Prize Pool */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-[#B3B7C5]">
                            Prize Pool 
                        </label>

                        <div className="flex h-10 items-center rounded-md border border-[#2C292A] bg-[#111217] px-4">
                            <span className="mr-3 rounded-full text-sm">
                                <img src="/coin.png" alt="Rupee" className="h-9 w-10" />
                            </span>

                            <input
                                type="number"
                                placeholder="0"
                                className="w-full bg-transparent text-white outline-none"
                            />
                        </div>
                    </div>

                    {/* Kill Poll */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-[#B3B7C5]">
                            Kill Reward
                        </label>

                        <div className="flex h-10 items-center rounded-md border border-[#2C292A] bg-[#111217] px-4">
                            <span className="mr-3 rounded-full text-sm">
                                <img src="/coin.png" alt="Rupee" className="h-9 w-10" />
                            </span>

                            <input
                                type="number"
                                placeholder="0"
                                className="w-full bg-transparent text-white outline-none"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}