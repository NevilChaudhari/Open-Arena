type ColorCategory = Record<string, string>;

const colors: Record<string, ColorCategory> = {
    Background: {
        "--bg-primary": "#080909",
        "--bg-secondary": "#101112",
        "--bg-card": "#171819",
        "--bg-card-hover": "#1D1E20",
    },

    Borders: {
        "--border-primary": "#2A2B2D",
        "--border-secondary": "#343539",
    },

    "Purple Accent": {
        "--primary": "#5B4BFF",
        "--primary-hover": "#6D5FFF",
        "--primary-dark": "#3D2CC7",
    },

    Text: {
        "--text-primary": "#FFFFFF",
        "--text-secondary": "#B6B8C0",
        "--text-muted": "#7E8190",
    },

    Input: {
        "--input-bg": "#202124",
        "--input-border": "#44454A",
    },

    Status: {
        "--success": "#22C55E",
        "--warning": "#EAB308",
        "--danger": "#EF4444",
    },

    Progress: {
        "--progress-bg": "#303136",
        "--progress-fill": "#5B4BFF",
    },
};

function ColorCard({
    name,
    value,
}: {
    name: string;
    value: string;
}) {
    return (
        <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 transition hover:-translate-y-1 hover:border-zinc-700">
            <div
                className="h-28 w-full"
                style={{ backgroundColor: value }}
            />

            <div className="space-y-1 p-4">
                <p className="font-medium text-white">{name}</p>
                <p className="font-mono text-sm text-zinc-400">{value}</p>
            </div>
        </div>
    );
}

export default function ColorCode() {
    return (
        <main className="min-h-screen bg-[#080909] p-10 text-white">
            <div className="mx-auto max-w-7xl">
                <h1 className="text-4xl font-bold">Design Colors</h1>
                <p className="mt-2 text-zinc-400">
                    Color tokens grouped by category.
                </p>

                <div className="mt-10 space-y-12">
                    {Object.entries(colors).map(([category, palette]) => (
                        <section key={category}>
                            <h2 className="mb-5 border-b border-zinc-800 pb-2 text-2xl font-semibold">
                                {category}
                            </h2>

                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {Object.entries(palette).map(([name, value]) => (
                                    <ColorCard
                                        key={name}
                                        name={name}
                                        value={value}
                                    />
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            </div>
        </main>
    );
}