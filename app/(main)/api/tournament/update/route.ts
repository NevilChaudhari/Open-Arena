import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
    const supabase = await createClient();

    const { id, name, game, type, registrationEnds, mode, map, maxPlayers, entryFee, prizePool, perKill, roomId, roomPassword } = await req.json()

    const { error } = await supabase.from('tournaments').update({
        game: game,
        name: name,
        type: type,
        registrationEnds: registrationEnds,
        mode: mode,
        map: map,
        maxPlayers: maxPlayers,
        entryFee: entryFee,
        perKill: perKill,
        prizePool: prizePool,
        roomId: roomId,
        roomPassword: roomPassword,
    }).eq('id', id);

    if (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }

    return NextResponse.json({ success: true });
}