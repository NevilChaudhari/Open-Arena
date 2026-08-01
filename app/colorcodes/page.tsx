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

const colors: Record<string, ColorCategory> = {
    Background: {
        "--bg-primary": "#080909",
        "--bg-secondary": "#101112",
        "--bg-tertiary": "#151617",
        "--bg-card": "#171819",
        "--bg-card-hover": "#1D1E20",
        "--bg-overlay": "rgba(8, 9, 9, 0.8)",
        "--bg-elevated": "#242527",
    },

    Borders: {
        "--border-primary": "#2A2B2D",
        "--border-secondary": "#343539",
        "--border-hover": "#4A4C50",
        "--border-focus": "#5B4BFF",
        "--border-disabled": "#242527",
    },

    "Purple Accent": {
        "--primary": "#5B4BFF",
        "--primary-light": "#7D70FF",
        "--primary-lighter": "#A79FFF",
        "--primary-hover": "#6D5FFF",
        "--primary-active": "#5141F2",
        "--primary-dark": "#3D2CC7",
        "--primary-disabled": "#5B4BFF66",
    },

    Text: {
        "--text-primary": "#FFFFFF",
        "--text-secondary": "#B6B8C0",
        "--text-muted": "#7E8190",
        "--text-disabled": "#5E6067",
        "--text-inverse": "#080909",
        "--text-link": "#7D70FF",
        "--text-link-hover": "#A79FFF",
    },

    Input: {
        "--input-bg": "#202124",
        "--input-bg-hover": "#26272B",
        "--input-border": "#44454A",
        "--input-border-focus": "#5B4BFF",
        "--input-border-error": "#EF4444",
        "--input-placeholder": "#7E8190",
        "--input-disabled": "#18191B",
    },

    Buttons: {
        "--button-primary": "#5B4BFF",
        "--button-primary-hover": "#6D5FFF",
        "--button-primary-active": "#5141F2",
        "--button-secondary": "#2A2B2D",
        "--button-secondary-hover": "#343539",
        "--button-danger": "#EF4444",
        "--button-danger-hover": "#DC2626",
    },

    Status: {
        "--success": "#22C55E",
        "--success-bg": "#163A26",

        "--warning": "#EAB308",
        "--warning-bg": "#3B320A",

        "--danger": "#EF4444",
        "--danger-bg": "#431A1A",

        "--info": "#3B82F6",
        "--info-bg": "#172A45",
    },

    Progress: {
        "--progress-bg": "#303136",
        "--progress-fill": "#5B4BFF",
        "--progress-success": "#22C55E",
        "--progress-warning": "#EAB308",
        "--progress-danger": "#EF4444",
    },

    Icons: {
        "--icon-primary": "#FFFFFF",
        "--icon-secondary": "#B6B8C0",
        "--icon-muted": "#7E8190",
        "--icon-accent": "#5B4BFF",
    },

    Shadows: {
        "--shadow-sm": "0 1px 2px rgba(0,0,0,0.25)",
        "--shadow-md": "0 4px 12px rgba(0,0,0,0.35)",
        "--shadow-lg": "0 8px 24px rgba(0,0,0,0.45)",
        "--shadow-glow": "0 0 24px rgba(91,75,255,0.35)",
    },

    Charts: {
        "--chart-1": "#5B4BFF",
        "--chart-2": "#22C55E",
        "--chart-3": "#EAB308",
        "--chart-4": "#EF4444",
        "--chart-5": "#3B82F6",
        "--chart-6": "#EC4899",
    },

    Selection: {
        "--selection-bg": "#5B4BFF33",
        "--selection-border": "#5B4BFF",
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
                        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search colors..." className="w-full focus:outline-0"/>
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