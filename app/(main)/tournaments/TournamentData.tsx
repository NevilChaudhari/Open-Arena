import { createClient } from "@/lib/supabase/server";
import TournamentUI from "./TournamentUI";

export default async function TournamentData() {
    const supabase = await createClient();

    const { data: tournaments } = await supabase
        .from("tournaments")
        .select("*");

    const { data: tournamentPlayers } = await supabase
        .from("tournamentPlayers")
        .select("*");

    return (
        <TournamentUI
            tournaments={tournaments ?? []}
            tournamentPlayers={tournamentPlayers ?? []}
        />
    );
}