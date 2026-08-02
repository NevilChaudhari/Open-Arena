"use client";

import { useMemo, useState } from "react";
import {
    Copy,
    Check,
    Search,
    Palette,
    Layers,
    Type,
    Square,
    AlertCircle,
    StepBack,
} from "lucide-react";
import { useRouter } from "next/navigation";


type ColorCategory = Record<string, string>;

const colors = {
    Background: {
        "--bg": "#040507",
        "--bg-secondary": "#0A0C0F",
        "--bg-card": "#16161C",
        "--bg-elevated": "#1C1D23",
        "--bg-overlay": "rgba(4, 5, 7, 0.8)",
    },

    Border: {
        "--border": "#2C292A",
        "--border-light": "#3F3E41",
        "--border-focus": "#6B58D6",
        "--divider": "#202126",
    },

    Primary: {
        "--primary": "#6B58D6",
        "--primary-hover": "#7A68E8",
        "--primary-active": "#452FBC",
        "--primary-light": "#A79FFF",
    },

    Text: {
        "--text": "#FFFFFF",
        "--text-secondary": "#C8C8D0",
        "--text-muted": "#9A9AA3",
        "--text-disabled": "#6C6D73",
    },

    Input: {
        "--input-bg": "#111217",
        "--input-border": "#2C292A",
        "--input-focus": "#6B58D6",
        "--placeholder": "#9A9AA3",
    },

    Status: {
        "--success": "#22C55E",
        "--warning": "#F59E0B",
        "--danger": "#EF4444",
        "--info": "#3B82F6",
    },

    Progress: {
        "--progress-bg": "#202126",
        "--progress-fill": "#6B58D6",
    },

    Shadow: {
        "--shadow-sm": "0 2px 6px rgba(0,0,0,0.35)",
        "--shadow-md": "0 8px 20px rgba(0,0,0,0.45)",
        "--shadow-lg": "0 16px 40px rgba(0,0,0,0.6)",
    },

    Radius: {
        "--radius-sm": "6px",
        "--radius-md": "10px",
        "--radius-lg": "16px",
        "--radius-xl": "24px",
        "--radius-full": "9999px",
    },

    Spacing: {
        "--space-xs": "4px",
        "--space-sm": "8px",
        "--space-md": "12px",
        "--space-lg": "16px",
        "--space-xl": "24px",
        "--space-2xl": "32px",
    },

    Motion: {
        "--transition-fast": "150ms ease",
        "--transition-normal": "250ms ease",
        "--transition-slow": "350ms ease",
    },

    Effects: {
        "--focus-ring": "0 0 0 3px rgba(107,88,214,0.35)",
        "--glass-bg": "rgba(22,22,28,0.75)",
        "--glass-border": "rgba(255,255,255,0.06)",
    },
};

const icons = {
    Background: Layers,
    Borders: Square,
    "Purple Accent": Palette,
    Text: Type,
    Input: Square,
    Status: AlertCircle,
    Progress: Palette,
};

function hexToRgb(hex: string) {
    const bigint = parseInt(hex.slice(1), 16);

    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return `${r}, ${g}, ${b}`;
}

function ColorCard({
    name,
    value,
}: {
    name: string;
    value: string;
}) {
    const [copied, setCopied] = useState(false);

    const copy = async () => {
        await navigator.clipboard.writeText(value);

        setCopied(true);

        setTimeout(() => setCopied(false), 1200);
    };

    return (
        <div className="group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/70 backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:border-violet-500 hover:shadow-2xl hover:shadow-violet-500/10">

            <div
                style={{ backgroundColor: value }}
                className="relative h-36"
            >
                <button
                    onClick={copy}
                    className="absolute right-3 top-3 rounded-lg bg-black/40 p-2 opacity-0 backdrop-blur transition group-hover:opacity-100"
                >
                    {copied ? (
                        <Check size={16} />
                    ) : (
                        <Copy size={16} />
                    )}
                </button>
            </div>

            <div className="space-y-3 p-5">
                <div>
                    <p className="font-semibold">{name}</p>

                    <p className="mt-1 font-mono text-sm text-zinc-500">
                        {value}
                    </p>
                </div>

                <div className="rounded-lg bg-zinc-800 p-3 text-xs text-zinc-400 space-y-1">
                    <div>RGB: {hexToRgb(value)}</div>
                    <div>CSS: var({name})</div>
                </div>
            </div>
        </div>
    );
}

export default function ColorCode() {
    const [search, setSearch] = useState("");

    const filtered = useMemo(() => {
        return Object.entries(colors).map(([cat, values]) => [
            cat,
            Object.fromEntries(
                Object.entries(values).filter(([k]) =>
                    k.toLowerCase().includes(search.toLowerCase())
                )
            ),
        ]);
    }, [search]);

    const total = Object.values(colors).reduce(
        (a, b) => a + Object.keys(b).length,
        0
    );

    const router = useRouter();

    return (
        <div className="min-h-screen w-full bg-linear-to-br from-[#070707] via-[#0E0E12] to-[#080909] text-white">

            <div onClick={() => router.push('/home')} className="flex absolute w-15 h-15 bg-[#101112] top-10 left-10 rounded-full items-center justify-center text-[#7E8190] hover:text-white cursor-pointer"><StepBack /></div>

            <div className="mx-auto max-w-7xl px-8 py-12">

                <div className="flex flex-wrap items-center justify-between gap-6">

                    <div>
                        <h1 className="text-5xl font-bold tracking-tight">
                            Design System
                        </h1>

                        <p className="mt-3 text-zinc-400">
                            {total} color tokens
                        </p>
                    </div>

                    <div className="flex items-center justify-center w-full max-w-sm rounded-xl border border-zinc-800 bg-zinc-900 py-3 gap-5 px-3">
                        <Search />
                        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search colors..." className="w-full focus:outline-0" />
                    </div>
                </div>

                <div className="mt-12 space-y-14">

                    {filtered.map(([category, palette]) => {
                        const Icon =
                            icons[category as keyof typeof icons] || Palette;

                        const entries = Object.entries(
                            palette as ColorCategory
                        );

                        if (!entries.length) return null;

                        return (
                            <section key={category as string}>
                                <div className="mb-6 flex items-center gap-3">
                                    <Icon size={22} />
                                    <h2 className="text-2xl font-bold">
                                        {category as string}
                                    </h2>
                                </div>

                                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                    {entries.map(([name, value]) => (
                                        <ColorCard
                                            key={name}
                                            name={name}
                                            value={value}
                                        />
                                    ))}
                                </div>
                            </section>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}