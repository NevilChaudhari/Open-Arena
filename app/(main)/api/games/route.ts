import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
    const supabase = await createClient();

    const formData = await req.formData();

    const name = formData.get("name") as string;
    const image = formData.get("image") as File;

    if (!name || !image) {
        return NextResponse.json(
            { error: "Missing name or image" },
            { status: 400 }
        );
    }

    const buffer = Buffer.from(await image.arrayBuffer());
    const base64 = buffer.toString("base64");

    const uploadForm = new URLSearchParams();
    uploadForm.append("key", process.env.IMGBB_API_KEY!);
    uploadForm.append("image", base64);

    const res = await fetch("https://api.imgbb.com/1/upload", {
        method: "POST",
        body: uploadForm,
    });

    const data = await res.json();

    if (!data.success) {
        return NextResponse.json(
            { error: data.error?.message ?? "Upload failed" },
            { status: 500 }
        );
    }

    const imageUrl = data.data.url;

    const { error } = await supabase.from("games").insert({
        name,
        icon: imageUrl,
    });

    if (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }

    return NextResponse.json({ success: true });
}