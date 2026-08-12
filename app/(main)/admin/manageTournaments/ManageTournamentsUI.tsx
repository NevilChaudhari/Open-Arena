'use client'

import { ChevronDown, ChevronRight, ChevronUp, Gamepad2, ListFilterPlus, PenLine, Plus, Trash2, X, Users, UserMinus } from "lucide-react";
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
    roomId?: string,
    roomPassword?: string,
}

interface PlayerUser {
    id: string,
    username: string,
    coins: number,
}

interface TournamentPlayers {
    id: number,
    tournamentId: number,
    playerId: string,
    inGameName?: string,
    inGameId?: string,
    users: PlayerUser,
}

interface Props {
    tournaments: Tournaments[]
    tournamentPlayers: TournamentPlayers[]
}

type CategoryFilter = 'All' | 'Upcoming' | 'Live Now' | 'Completed'

const gameModes = [{ name: 'Battle Royale' }, { name: 'Clash Squad' }, { name: 'Lone Wolf' },]
const gameMaps = [{ name: 'Bermuda' }, { name: 'Kalahari' }, { name: 'Purgatory' }, { name: 'Solara' }, { name: 'NeXterra' }, { name: 'Alpine' }, { name: 'Bermuda Remastered' },]

interface EditForm {
    name: string,
    registrationEnds: string,
    mode: string,
    map: string,
    maxPlayers: string,
    entryFee: string,
    prizePool: string,
    perKill: string,
    roomId: string,
    roomPassword: string,
}

const emptyEditForm: EditForm = {
    name: '',
    registrationEnds: '',
    mode: '',
    map: '',
    maxPlayers: '',
    entryFee: '',
    prizePool: '',
    perKill: '',
    roomId: '',
    roomPassword: '',
};

export default function ManageTournamentUI({ tournaments, tournamentPlayers }: Props) {
    const router = useRouter();
    const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('All')
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const [editingTournament, setEditingTournament] = useState<Tournaments | null>(null);
    const [editForm, setEditForm] = useState<EditForm>(emptyEditForm);
    const [openEditModeDropdown, setOpenEditModeDropdown] = useState(false);
    const [openEditMapDropdown, setOpenEditMapDropdown] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // New: player management modal
    const [playersTournament, setPlayersTournament] = useState<Tournaments | null>(null);
    const [removingPlayerId, setRemovingPlayerId] = useState<number | null>(null);
    const [playersError, setPlayersError] = useState("");

    const isRegistrationOpen = (tournament: Tournaments) => new Date(tournament.registrationEnds) > new Date();

    const openEditModal = (tournament: Tournaments) => {
        setEditingTournament(tournament);
        setEditForm({
            name: tournament.name,
            registrationEnds: new Date(tournament.registrationEnds).toISOString().slice(0, 10),
            mode: tournament.mode,
            map: tournament.map,
            maxPlayers: tournament.maxPlayers,
            entryFee: tournament.entryFee,
            prizePool: tournament.prizePool,
            perKill: tournament.perKill,
            roomId: tournament.roomId ?? '',
            roomPassword: tournament.roomPassword ?? '',
        });
    };

    const closeEditModal = () => {
        setEditingTournament(null);
        setEditForm(emptyEditForm);
        setOpenEditModeDropdown(false);
        setOpenEditMapDropdown(false);
    };

    const saveEdit = async () => {
        if (!editingTournament) return;

        setIsSaving(true);
        const timestamp = new Date(editForm.registrationEnds).toISOString();

        const res = await fetch('/api/tournament/update', {
            method: "POST",
            body: JSON.stringify({
                id: editingTournament.id,
                name: editForm.name,
                registrationEnds: timestamp,
                mode: editForm.mode,
                map: editForm.map,
                maxPlayers: editForm.maxPlayers,
                entryFee: editForm.entryFee,
                prizePool: editForm.prizePool,
                perKill: editForm.perKill,
                roomId: editForm.roomId,
                roomPassword: editForm.roomPassword,
            }),
        });

        const data = await res.json();
        if (data.error) console.log(`tournament update error: ${data.error}`);

        setIsSaving(false);
        closeEditModal();
        router.refresh();
    };

    const deleteTournament = async (id: number) => {
        if (!confirm('Delete this tournament? This cannot be undone.')) return;

        setDeletingId(id);
        const res = await fetch('/api/tournament/delete', {
            method: "POST",
            body: JSON.stringify({ id }),
        });
        const data = await res.json();
        if (data.error) console.log(`tournament delete error: ${data.error}`);
        setDeletingId(null);
        router.refresh();
    };

    // New: player management
    const openPlayersModal = (tournament: Tournaments) => {
        setPlayersError("");
        setPlayersTournament(tournament);
    };

    const closePlayersModal = () => {
        setPlayersTournament(null);
        setPlayersError("");
    };

    const removePlayer = async (player: TournamentPlayers, entryFee: string) => {
        if (!confirm(`Remove ${player.users.username} from this tournament? Their entry fee will be refunded.`)) return;

        setRemovingPlayerId(player.id);
        setPlayersError("");

        try {
            const res = await fetch('/api/tournament/leave', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    tournamentId: player.tournamentId,
                    playerId: player.playerId,
                    coins: (player.users.coins + Number(entryFee || 0)),
                }),
            });

            const data = await res.json();
            if (data.error) {
                console.log(`remove player error: ${data.error}`);
                setPlayersError(data.error);
                return;
            }

            router.refresh();
        } catch (err) {
            console.log(`remove player error: ${err}`);
            setPlayersError("Something went wrong removing this player.");
        } finally {
            setRemovingPlayerId(null);
        }
    };

    const playersFor = (tournamentId: number) => tournamentPlayers.filter((p) => p.tournamentId === tournamentId);

    return (
        <div className="flex flex-col w-full h-full gap-5 overflow-hidden">

            {/* Edit Tournament Popup */}
            {editingTournament && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl border border-[#2C292A] bg-[#0A0C0F] p-6 shadow-xl">

                        {/* Header */}
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-2xl font-bold">Edit Tournament</h2>
                            <div onClick={closeEditModal} className="cursor-pointer flex h-8 w-8 items-center justify-center rounded-md text-[#7E8190] hover:bg-[#1A1C20] hover:text-white">
                                <X size={18} />
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            {/* Name */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-[#9A9AA3]">Tournament Name</label>
                                <input value={editForm.name} onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))} type="text" className="w-full rounded-md border border-[#2C292A] bg-[#111217] px-4 h-11 outline-none focus:border-[#6B58D6]" />
                            </div>

                            {/* Registration End Date */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-[#9A9AA3]">Registration End Date</label>
                                <input value={editForm.registrationEnds} onChange={(e) => setEditForm((f) => ({ ...f, registrationEnds: e.target.value }))} type="date" className="w-full rounded-md border border-[#2C292A] bg-[#111217] px-4 h-11 outline-none focus:border-[#6B58D6] [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:invert" />
                            </div>

                            {/* Mode / Map */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-[#9A9AA3]">Mode</label>
                                    <div className="relative">
                                        <div onClick={() => setOpenEditModeDropdown(!openEditModeDropdown)} className="flex w-full items-center justify-between rounded-md border border-[#2C292A] bg-[#111217] px-3 h-11 cursor-pointer">
                                            <span className="text-white font-medium">{editForm.mode || 'Select Mode'}</span>
                                            {openEditModeDropdown ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                                        </div>
                                        {openEditModeDropdown && (
                                            <div className="absolute z-10 mt-2 w-full overflow-hidden rounded-md border border-[#2C292A] bg-[#111217] shadow-xl">
                                                {gameModes.map((g) => (
                                                    <div key={g.name} onClick={() => { setEditForm((f) => ({ ...f, mode: g.name })); setOpenEditModeDropdown(false); }} className="cursor-pointer px-3 py-2 text-white hover:bg-[#16161C]">{g.name}</div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-[#9A9AA3]">Map</label>
                                    <div className="relative">
                                        <div onClick={() => setOpenEditMapDropdown(!openEditMapDropdown)} className="flex w-full items-center justify-between rounded-md border border-[#2C292A] bg-[#111217] px-3 h-11 cursor-pointer">
                                            <span className="text-white font-medium">{editForm.map || 'Select Map'}</span>
                                            {openEditMapDropdown ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                                        </div>
                                        {openEditMapDropdown && (
                                            <div className="absolute z-10 mt-2 max-h-48 w-full overflow-y-auto overflow-x-hidden rounded-md border border-[#2C292A] bg-[#111217] shadow-xl">
                                                {gameMaps.map((g) => (
                                                    <div key={g.name} onClick={() => { setEditForm((f) => ({ ...f, map: g.name })); setOpenEditMapDropdown(false); }} className="cursor-pointer px-3 py-2 text-white hover:bg-[#16161C]">{g.name}</div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Numeric fields */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-[#9A9AA3]">Max Players</label>
                                    <input value={editForm.maxPlayers} onChange={(e) => setEditForm((f) => ({ ...f, maxPlayers: e.target.value }))} type="number" className="no-spinner w-full rounded-md border border-[#2C292A] bg-[#111217] px-4 h-11 outline-none focus:border-[#6B58D6]" />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-[#9A9AA3]">Entry Fee</label>
                                    <input value={editForm.entryFee} onChange={(e) => setEditForm((f) => ({ ...f, entryFee: e.target.value }))} type="number" className="no-spinner w-full rounded-md border border-[#2C292A] bg-[#111217] px-4 h-11 outline-none focus:border-[#6B58D6]" />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-[#9A9AA3]">Prize Pool</label>
                                    <input value={editForm.prizePool} onChange={(e) => setEditForm((f) => ({ ...f, prizePool: e.target.value }))} type="number" className="no-spinner w-full rounded-md border border-[#2C292A] bg-[#111217] px-4 h-11 outline-none focus:border-[#6B58D6]" />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-[#9A9AA3]">Per Kill</label>
                                    <input value={editForm.perKill} onChange={(e) => setEditForm((f) => ({ ...f, perKill: e.target.value }))} type="number" className="no-spinner w-full rounded-md border border-[#2C292A] bg-[#111217] px-4 h-11 outline-none focus:border-[#6B58D6]" />
                                </div>
                            </div>

                            {/* Room Details */}
                            <div className="border-t border-[#2A2B2D] pt-4">
                                <div className="mb-1 flex items-center gap-2">
                                    <p className="text-sm font-semibold text-white">Room Details</p>
                                    {!isRegistrationOpen(editingTournament) ? (
                                        <span className="rounded-full bg-[#22C55E]/20 px-2 py-0.5 text-[10px] font-semibold text-[#22C55E]">Ready to share</span>
                                    ) : (
                                        <span className="rounded-full bg-[#F59E0B]/20 px-2 py-0.5 text-[10px] font-semibold text-[#F59E0B]">Locked until start</span>
                                    )}
                                </div>
                                <p className="mb-3 text-xs text-[#6C6D73]">
                                    {isRegistrationOpen(editingTournament)
                                        ? "Available once registration closes and the tournament starts."
                                        : "Share these with registered players — they'll see them on their dashboard."}
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-[#9A9AA3]">Room ID</label>
                                        <input
                                            disabled={isRegistrationOpen(editingTournament)}
                                            value={editForm.roomId}
                                            onChange={(e) => setEditForm((f) => ({ ...f, roomId: e.target.value }))}
                                            type="text"
                                            placeholder="e.g. 123456789"
                                            className="w-full rounded-md border border-[#2C292A] bg-[#111217] px-4 h-11 outline-none focus:border-[#6B58D6] disabled:cursor-not-allowed disabled:opacity-40"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-[#9A9AA3]">Room Password</label>
                                        <input
                                            disabled={isRegistrationOpen(editingTournament)}
                                            value={editForm.roomPassword}
                                            onChange={(e) => setEditForm((f) => ({ ...f, roomPassword: e.target.value }))}
                                            type="text"
                                            placeholder="e.g. arena123"
                                            className="w-full rounded-md border border-[#2C292A] bg-[#111217] px-4 h-11 outline-none focus:border-[#6B58D6] disabled:cursor-not-allowed disabled:opacity-40"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="mt-6 flex justify-end gap-3">
                            <div onClick={closeEditModal} className="cursor-pointer rounded-md border border-[#3F3E41] px-5 py-2 hover:bg-[#1A1C20]">Cancel</div>
                            <div onClick={saveEdit} className={`cursor-pointer rounded-md bg-[#6B58D6] px-5 py-2 font-medium hover:bg-[#6B58D6]/70 ${isSaving ? "pointer-events-none opacity-50" : ""}`}>{isSaving ? "Saving..." : "Save Changes"}</div>
                        </div>
                    </div>
                </div>
            )}

            {/* Manage Players Popup */}
            {playersTournament && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col rounded-xl border border-[#2C292A] bg-[#0A0C0F] p-6 shadow-xl">

                        {/* Header */}
                        <div className="mb-1 flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold">Registered Players</h2>
                                <p className="text-sm text-[#9A9AA3]">{playersTournament.name}</p>
                            </div>
                            <div onClick={closePlayersModal} className="cursor-pointer flex h-8 w-8 items-center justify-center rounded-md text-[#7E8190] hover:bg-[#1A1C20] hover:text-white">
                                <X size={18} />
                            </div>
                        </div>

                        <div className="mt-3 flex items-center justify-between text-sm text-[#9A9AA3]">
                            <span><span className="text-[#22C55E]">{playersFor(playersTournament.id).length}</span> / {playersTournament.maxPlayers} joined</span>
                            {playersError && <span className="text-[#EF4444]">{playersError}</span>}
                        </div>

                        <div className="mt-4 flex-1 overflow-y-auto pr-1">
                            {playersFor(playersTournament.id).length === 0 ? (
                                <div className="flex h-32 items-center justify-center text-sm text-[#6C6D73]">
                                    No players have joined yet.
                                </div>
                            ) : (
                                <div className="flex flex-col gap-2">
                                    {playersFor(playersTournament.id).map((player, i) => (
                                        <div key={player.id} className="flex items-center gap-3 rounded-lg border border-[#2C292A] bg-[#111217] px-3.5 py-3">
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#6B58D6]/15 font-['Rajdhani'] text-xs font-bold text-[#A79FFF]">
                                                {player.users.username.slice(0, 2).toUpperCase()}
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-sm font-medium text-white">{player.users.username}</p>
                                                <p className="truncate text-xs text-[#6C6D73]">
                                                    {player.inGameName ? `IGN: ${player.inGameName}` : "IGN not set"}
                                                    {player.inGameId ? ` · ID: ${player.inGameId}` : ""}
                                                </p>
                                            </div>

                                            <span className="hidden shrink-0 font-['Rajdhani'] text-xs text-[#6C6D73] sm:block">#{String(i + 1).padStart(2, "0")}</span>

                                            <div
                                                onClick={() => removePlayer(player, playersTournament.entryFee)}
                                                className={`flex shrink-0 items-center gap-1.5 cursor-pointer rounded-lg border border-[#3F3E41] px-3 py-1.5 text-xs font-medium text-[#9A9AA3] hover:bg-[#EF4444]/20 hover:text-[#EF4444] hover:border-[#EF4444] ${removingPlayerId === player.id ? "opacity-50 pointer-events-none" : ""}`}
                                            >
                                                <UserMinus size={14} />
                                                {removingPlayerId === player.id ? "Removing..." : "Remove"}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <div className="flex w-full h-screen flex-col gap-6 md:gap-10 overflow-y-auto scrollbar-none">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:place-content-between gap-4">
                    <div className="flex flex-col">
                        <span className="text-2xl md:text-4xl font-semibold">Manage Tournaments</span>
                        <span className="text-sm md:text-md text-[#A79FFF]">Edit, close registration, or remove tournaments</span>
                    </div>
                    <div onClick={() => router.push('/admin/addTournaments')} className="flex w-full md:w-auto justify-center items-center gap-2 cursor-pointer bg-[#6B58D6] hover:bg-[#6B58D6]/70 px-5 h-12 rounded-md font-semibold text-white">
                        <Plus size={20} />Add Tournament
                    </div>
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

                {/* Desktop / tablet: table */}
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
                                <th className="px-3 py-3 lg:px-5 lg:py-4 text-right">Actions</th>
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
                                            <div
                                                onClick={() => openPlayersModal(tournament)}
                                                className="inline-flex cursor-pointer items-center gap-1.5 rounded-md hover:bg-[#6B58D6]/10 px-2 py-1 -mx-2"
                                                title="Manage players"
                                            >
                                                <span className="text-[#22C55E]">{playersFor(tournament.id).length}</span> / {tournament.maxPlayers}
                                                <Users size={14} className="text-[#7E8190]" />
                                            </div>
                                        </td>

                                        {/* Entry Fee */}
                                        <td className="px-3 py-3 lg:px-5 lg:py-4 text-white"> ₹{tournament.entryFee} </td>

                                        {/* Status */}
                                        <td className="px-3 py-3 lg:px-5 lg:py-4">
                                            <span className={`rounded-md px-3 py-2 text-sm font-medium whitespace-nowrap ${open ? "bg-[#22C55E]/20 text-[#22C55E]" : "bg-[#EF4444]/20 text-[#EF4444]"}`}>
                                                {open ? "Registration Open" : "Registration Closed"}
                                            </span>
                                        </td>

                                        {/* Actions */}
                                        <td className="px-3 py-3 lg:px-5 lg:py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <div onClick={() => openPlayersModal(tournament)} className="cursor-pointer flex h-9 w-9 items-center justify-center rounded-lg border border-[#3F3E41] text-[#9A9AA3] hover:bg-[#6B58D6]/20 hover:text-[#A79FFF] hover:border-[#6B58D6]" title="Players">
                                                    <Users size={16} />
                                                </div>
                                                <div onClick={() => router.push(`/tournaments/${tournament.id}`)} className="cursor-pointer flex h-9 w-9 items-center justify-center rounded-lg border border-[#3F3E41] text-[#9A9AA3] hover:bg-[#1C1D23] hover:text-white" title="View">
                                                    <ChevronRight size={18} />
                                                </div>
                                                <div onClick={() => openEditModal(tournament)} className="cursor-pointer flex h-9 w-9 items-center justify-center rounded-lg border border-[#3F3E41] text-[#9A9AA3] hover:bg-[#6B58D6]/20 hover:text-[#A79FFF] hover:border-[#6B58D6]" title="Edit">
                                                    <PenLine size={16} />
                                                </div>
                                                <div onClick={() => deleteTournament(tournament.id)} className={`cursor-pointer flex h-9 w-9 items-center justify-center rounded-lg border border-[#3F3E41] text-[#9A9AA3] hover:bg-[#EF4444]/20 hover:text-[#EF4444] hover:border-[#EF4444] ${deletingId === tournament.id ? "opacity-50 pointer-events-none" : ""}`} title="Delete">
                                                    <Trash2 size={16} />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Mobile: stacked cards */}
                <div className="flex md:hidden flex-col gap-3">
                    {tournaments.map((tournament) => {
                        const d = intervalToDuration({
                            start: new Date(),
                            end: new Date(tournament.registrationEnds),
                        });
                        const open = isRegistrationOpen(tournament);
                        return (
                            <div key={tournament.id} className="flex flex-col gap-3 rounded-xl border border-[#343539] bg-[#171819] p-4">
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

                                <div
                                    onClick={() => openPlayersModal(tournament)}
                                    className="flex items-center justify-center gap-2 h-10 rounded-md border border-[#2C292A] bg-[#0A0C0F] cursor-pointer text-sm text-[#9A9AA3]"
                                >
                                    <Users size={14} />
                                    <span className="text-[#22C55E]">{playersFor(tournament.id).length}</span> / {tournament.maxPlayers} players
                                </div>

                                {/* Admin actions */}
                                <div className="flex items-center gap-2">
                                    <div onClick={() => router.push(`/tournaments/${tournament.id}`)} className="flex flex-1 items-center justify-center gap-2 h-11 rounded-md border border-[#3F3E41] text-[#9A9AA3] cursor-pointer hover:bg-[#1C1D23] hover:text-white">
                                        <ChevronRight size={16} />View
                                    </div>
                                    <div onClick={() => openEditModal(tournament)} className="flex flex-1 items-center justify-center gap-2 h-11 rounded-md border border-[#3F3E41] text-[#A79FFF] cursor-pointer hover:bg-[#6B58D6]/20 hover:border-[#6B58D6]">
                                        <PenLine size={16} />Edit
                                    </div>
                                    <div onClick={() => deleteTournament(tournament.id)} className={`flex flex-1 items-center justify-center gap-2 h-11 rounded-md border border-[#3F3E41] text-[#EF4444] cursor-pointer hover:bg-[#EF4444]/20 hover:border-[#EF4444] ${deletingId === tournament.id ? "opacity-50 pointer-events-none" : ""}`}>
                                        <Trash2 size={16} />Delete
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