import Navbar from "@/Components/Navbar";
import { createClient } from "@/lib/supabase/server";
import SidebarData from "./SidebarData";
import BottomNavbarData from "./BottombarData";

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const { data: userData, error } = await supabase.from('users').select('*').eq('id', user?.id).single()
    if (error) { console.log(`ProfilePage fetch user error: ${JSON.stringify(user?.id)}`); return; }
    const { data: admin } = await supabase.from("admins").select("id").eq("id", userData.id).maybeSingle();

    const isAdmin = !!admin;

    return (
        <div className="h-screen w-screen flex overflow-hidden bg-[#080909] text-white">
            <link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
            <SidebarData />
            <BottomNavbarData />
            <Navbar />

            <main className="flex-1 md:p-5 p-1 overflow-hidden my-17 md:my-0">
                {children}
            </main>
        </div>
    );
}