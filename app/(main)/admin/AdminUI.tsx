'use client'

import { useRouter } from "next/navigation";
import {
    ShieldCheck,
    Trophy,
    Gamepad2,
    Users,
    Wallet,
    Flag,
    Paintbrush,
    ChevronRight,
    Plus,
} from "lucide-react";

interface AdminAction {
    name: string;
    description: string;
    href: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
    accent: string; // icon/badge tint
    soon?: boolean;
}

const ACTIONS: AdminAction[] = [
    {
        name: "Add Tournament",
        description: "Create a new tournament with rules, prize pool, and slots.",
        href: "admin/addTournaments",
        icon: Plus,
        accent: "#6B58D6",
    },
    {
        name: "Manage Tournaments",
        description: "Edit, close registration, or cancel existing tournaments.",
        href: "/admin/manageTournaments",
        icon: Trophy,
        accent: "#F2A93B",
        soon: false,
    },
    {
        name: "Manage Games",
        description: "Add, edit, or remove supported games and their icons.",
        href: "/admin/games",
        icon: Gamepad2,
        accent: "#3B82F6",
        soon: true,
    },
    {
        name: "Manage Users",
        description: "View player accounts, ban, or grant admin access.",
        href: "/admin/users",
        icon: Users,
        accent: "#22C55E",
        soon: true,
    },
    {
        name: "Wallet & Transactions",
        description: "Review deposits, withdrawals, and pending payouts.",
        href: "/admin/transactions",
        icon: Wallet,
        accent: "#A79FFF",
        soon: true,
    },
    {
        name: "Reports & Disputes",
        description: "Resolve flagged matches and player-reported issues.",
        href: "/admin/reports",
        icon: Flag,
        accent: "#EF4444",
        soon: true,
    },
    {
        name: "Color Codes",
        description: "Manage room color codes shared with players.",
        href: "/colorcodes",
        icon: Paintbrush,
        accent: "#F59E0B",
    },
];

export default function AdminUI() {
    const router = useRouter();

    return (
        <div className="flex flex-col w-full h-full gap-6 sm:gap-10 overflow-y-auto scrollbar-none p-4 sm:p-5">
            {/* Header */}
            <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex flex-col gap-0.5 sm:gap-1 min-w-0">
                    <span className="text-2xl sm:text-4xl font-bold leading-tight">Admin Pannel</span>
                    <span className="text-sm sm:text-md text-[#A79FFF]">Manage tournaments, games, users, and payouts from one place</span>
                </div>
            </div>

            {/* Actions grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {ACTIONS.map(({ name, description, href, icon: Icon, accent, soon }) => (
                    <div key={href} onClick={() => !soon && router.push(href)} className={`group flex flex-col gap-4 rounded-2xl border border-[#2C292A] bg-[#16161C] p-5 transition-colors duration-150 ${soon ? "cursor-not-allowed opacity-60" : "cursor-pointer hover:border-[#3F3E41] hover:bg-[#1C1D23]"}`}>
                        <div className="flex items-start justify-between">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ backgroundColor: `${accent}26`, border: `1px solid ${accent}4D` }} >
                                <Icon size={20} className="shrink-0" />
                            </div>
                            {soon ? (
                                <span className="rounded-full border border-[#3F3E41] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#7E8190]">Soon</span>
                            ) : (
                                <ChevronRight size={18} className="text-[#7E8190] transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-white" />
                            )}
                        </div>

                        <div className="flex flex-col gap-1">
                            <span className="font-semibold text-white">{name}</span>
                            <span className="text-sm text-[#9A9AA3]">{description}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}