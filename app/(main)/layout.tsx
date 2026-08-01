export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div className="min-h-screen min-w-screen flex bg-[#080909] text-white">
            <div className="border-r border-white min-w-[20%] min-h-full">Navbar</div>
            {children}
        </div>
    );
}
