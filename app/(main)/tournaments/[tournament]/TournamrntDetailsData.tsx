import { createClient } from "@/lib/supabase/server";
import TournamentDetailsUI from "./TournamentDetailsUI";

export default async function TournamentDetailsData({ params }: { params: Promise<{ tournament: string }>; }) {
    const supabase = await createClient();
    const { tournament } = await params;
    const { data: { user } } = await supabase.auth.getUser();

    const { data: userData, error: userError } = await supabase.from('users').select('*').eq('id', user?.id).single()
    if (userError) {
        console.log(
            `TournamentsPage fetch user error: ${JSON.stringify(userError)}`
        );
    }

    const { data: tournamentDetails, error: tournamentDetailsError } = await supabase.from("tournaments").select("*").eq("id", tournament).single();
    if (tournamentDetailsError) {
        console.log(
            `TournamentsPage fetch tournament error: ${JSON.stringify(tournamentDetailsError)}`
        );
    }

    const { data: tournamentPlayers, error: tournamentPlayersError } = await supabase.from("tournamentPlayers").select("*, users(*)").eq("tournamentId", tournament);
    if (tournamentPlayersError) {
        console.log(
            `TournamentsPage fetch tournamentPlayers error: ${JSON.stringify(tournamentPlayersError)}`
        );
    }

    return <TournamentDetailsUI tournamentDetails={tournamentDetails} user={userData} tournamentPlayers={tournamentPlayers ? tournamentPlayers : []} />;
}