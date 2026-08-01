import Sidebar from "@/Components/sidebar";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div className="min-h-screen min-w-screen flex bg-[#080909] text-white">
            <Sidebar />
            {children}
        </div>
    );
}
