import Razorpay from "razorpay";
import { NextResponse } from "next/server";

const razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
    key_secret: process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET!,
});

export async function POST() {
    try {
        const order = await razorpay.orders.create({
            amount: 50000,
            currency: "INR",
            receipt: "receipt_001",
        });

        return NextResponse.json(order);
    } catch (error: unknown) {
        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : "Something went wrong",
            },
            { status: 500 }
        );
    }
}