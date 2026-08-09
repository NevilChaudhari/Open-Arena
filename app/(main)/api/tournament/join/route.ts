import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
    const supabase = await createClient();

    const { playerId, tournamentId } = await req.json()

    const { error } = await supabase.from('tournamentPlayers').insert({
        playerId: playerId,
        tournamentId: tournamentId,
    });

    if (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }

    return NextResponse.json({ success: true });
}