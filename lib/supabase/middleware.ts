import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

export async function updateSession(req: NextRequest) {
    let response = NextResponse.next({ request: req })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return req.cookies.getAll()
                },
                setAll(cookesToSet) {
                    cookesToSet.forEach(({ name, value, options }) => req.cookies.set(name, value))

                    let response = NextResponse.next({ request: req })

                    cookesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
                }
            }
        }
    )

    const { data: { user } } = await supabase.auth.getUser();
    const isAuthPage = req.nextUrl.pathname.startsWith("/signin") || req.nextUrl.pathname.startsWith("/signup");

    if (!user) {
        if (isAuthPage) {
            return NextResponse.next();
        }
        return NextResponse.redirect(new URL("/signin", req.url));
    }
    if (isAuthPage) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return response;
}