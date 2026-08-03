import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
    const supabase = await createClient();

    const {name, game, type, registrationEnds, mode, map, maxPlayers, entryFee, pricePool, perKill} = await req.json()

    const { error } = await supabase.from('tournaments').insert({
        name: name,
        game: game,
        type: type,
        registrationEnds: registrationEnds,
        mode: mode,
        map: map,
        maxPlayers: maxPlayers,
        entryFee: entryFee,
        pricePool: pricePool,
        perKill: perKill,
    });

    if (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }

    return NextResponse.json({ success: true });
}