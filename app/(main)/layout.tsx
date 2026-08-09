import Sidebar from "@/Components/sidebar";
import { createClient } from "@/lib/supabase/server";

interface User {
    id: string,
    username: string,
    coins: number
}

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
            <Sidebar user={userData} isAdmin={isAdmin} />

            <main className="flex-1 p-5 overflow-hidden">
                {children}
            </main>
        </div>
    );
}