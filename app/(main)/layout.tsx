import Sidebar from "@/Components/sidebar";
import { createClient } from "@/lib/supabase/server";

interface User {
    id: string,
    username: string,
    coins: number
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const supabase = await createClient();

    const { data: user, error } = await supabase.from('users').select('*').single()
    if (error) console.log(`ProfilePage fetch user error: ${error}`);

    return (
        <div className="h-screen w-screen flex overflow-hidden bg-[#080909] text-white">
            <Sidebar user={user} />

            <main className="flex-1 overflow-hidden">
                {children}
            </main>
        </div>
    );
}