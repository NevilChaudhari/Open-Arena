import { createClient } from "@/lib/supabase/server";
import AddTournamentUI from "./AddTournament";

export default async function addGames() {
    const supabase = await createClient();

    const { data: games, error: gamesError } = await supabase.from('games').select('*');
    console.log(`games: ${JSON.stringify(games)}`);

    if (!games || gamesError) console.log(`Add Tournament getGames error: ${gamesError}`)

    return (<AddTournamentUI games={games} />)
}