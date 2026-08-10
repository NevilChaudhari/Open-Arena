import { createClient } from "@/lib/supabase/server";
import AdminUI from "./AdminUI";
import { redirect } from "next/navigation";

export default async function addGames() {
    const supabase = await createClient();

    const { data: games, error: gamesError } = await supabase.from('games').select('*');
    console.log(`games: ${JSON.stringify(games)}`);

    const { data: { user } } = await supabase.auth.getUser();

    const { data: userData, error } = await supabase.from('users').select('*').eq('id', user?.id).single()
    if (error) console.log(`ProfilePage fetch user error: ${error}`);
    const { data: admin } = await supabase.from("admins").select("id").eq("id", userData.id).maybeSingle();

    const isAdmin = !!admin;

    if (!isAdmin) redirect("/");

    if (!games || gamesError) console.log(`Add Tournament getGames error: ${gamesError}`)

    return (<AdminUI />)
}