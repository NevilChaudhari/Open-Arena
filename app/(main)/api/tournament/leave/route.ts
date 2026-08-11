import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
    const supabase = await createClient();

    const { tournamentId, playerId, coins } = await req.json();

    const { error: leaveError } = await supabase.from("tournamentPlayers").delete().eq("tournamentId", tournamentId).eq("playerId", playerId);

    if (leaveError) {
        return NextResponse.json(
            { error: leaveError.message },
            { status: 500 }
        );
    }

    const { error: refundError } = await supabase.from('users').update({
        coins: coins
    }).eq('id', playerId);

    if (refundError) {
        return NextResponse.json(
            { error: refundError.message },
            { status: 500 }
        );
    }

    return NextResponse.json({ success: true });
}