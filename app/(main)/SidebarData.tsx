import Sidebar from "@/Components/sidebar";
import SidebarSkeleton from "@/Components/SidebarSkeleton";
import { createClient } from "@/lib/supabase/server";
import { Suspense } from "react";

export default async function SidebarData() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const { data: userData, error } = await supabase.from('users').select('*').eq('id', user?.id).single()
    if (error) { console.log(`ProfilePage fetch user error: ${JSON.stringify(user?.id)}`); return; }
    const { data: admin } = await supabase.from("admins").select("id").eq("id", userData.id).maybeSingle();

    const isAdmin = !!admin;

    return (
        <Suspense fallback={<SidebarSkeleton />}>
            <Sidebar user={userData} isAdmin={isAdmin} />
        </Suspense>
    );
}