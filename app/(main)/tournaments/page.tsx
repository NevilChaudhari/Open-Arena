import { createClient } from "@/lib/supabase/server";
import TournamentUI from "./TournamentUI";

export default async function Home() {
    const supabase = await createClient();

    const { data: tournaments, error } = await supabase.from('tournaments').select('*')
    if (error) console.log(`TournamentsPage fetch tournament error: ${error}`);
    return (
        <TournamentUI tournaments={tournaments!}/>
    );
}