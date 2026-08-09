import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
    const supabase = await createClient()

    const body = await req.json();

    const { error } = await supabase.from('transactions').insert({
        orderId: body.orderId,
        paymentId: body.paymentId,
        ammount: body.ammount,
        userId: body.userId,
    })

    if (error)
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        )

    const { data: user, error: userError } = await supabase.from("users").select("coins").eq("id", body.userId).single();

    if (userError) {
        console.log(userError.message);
        return NextResponse.json(
            { error: userError.message },
            { status: 500 }
        );
    }


    const { error: updateError } = await supabase.from("users").update({ "coins": (user.coins + body.ammount) }).eq("id", body.userId);

    if (updateError) {
        console.log(updateError.message);
        return NextResponse.json(
            { error: updateError.message },
            { status: 500 }
        );
    }

    return NextResponse.json({ success: true });
}