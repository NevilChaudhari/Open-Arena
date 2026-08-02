import Sidebar from "@/Components/sidebar";
import { Bell, Mail, Search } from "lucide-react";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="h-screen w-screen flex overflow-hidden bg-[#080909] text-white">
            <Sidebar />

            <main className="flex-1 overflow-hidden">
                {children}
            </main>
        </div>
    );
}