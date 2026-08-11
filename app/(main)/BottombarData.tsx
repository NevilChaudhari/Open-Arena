import BottomNavbar from "@/Components/BottomNavbar";
import BottomNavbarSkeleton from "@/Components/bottomNavbarSkeleton";
import { createClient } from "@/lib/supabase/server";
import { Suspense } from "react";

export default async function BottomNavbarData() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const { data: userData, error } = await supabase.from('users').select('*').eq('id', user?.id).single()
    if (error) { console.log(`ProfilePage fetch user error: ${JSON.stringify(user?.id)}`); return; }
    const { data: admin } = await supabase.from("admins").select("id").eq("id", userData.id).maybeSingle();

    const isAdmin = !!admin;

    return (
        <Suspense fallback={<BottomNavbarSkeleton />}>
            <BottomNavbar isAdmin={isAdmin} />
        </Suspense>
    );
}