import { createClient } from "@/lib/supabase/server";
import AddTournamentUI from "./AddTournament";
import { redirect } from "next/navigation";

export default async function addGames() {
    const supabase = await createClient();

    const { data: games, error: gamesError } = await supabase.from('games').select('*');
    console.log(`games: ${JSON.stringify(games)}`);

    const { data: user, error } = await supabase.from('users').select('*').single()
    if (error) console.log(`ProfilePage fetch user error: ${error}`);
    const { data: admin } = await supabase.from("admins").select("id").eq("id", user.id).maybeSingle();

    const isAdmin = !!admin;

    if (!isAdmin) redirect("/");

    if (!games || gamesError) console.log(`Add Tournament getGames error: ${gamesError}`)

    return (<AddTournamentUI games={games} />)
}