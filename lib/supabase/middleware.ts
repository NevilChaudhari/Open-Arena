import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

export async function updateSession(req: NextRequest) {
    let response = NextResponse.next({
        request: req,
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return req.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) => {
                        req.cookies.set(name, value);
                    });

                    cookiesToSet.forEach(({ name, value, options }) => {
                        response.cookies.set(name, value, options);
                    });
                },
            },
        }
    );

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const pathname = req.nextUrl.pathname;

    const isAuthPage =
        pathname === "/" ||
        pathname.startsWith("/signin") ||
        pathname.startsWith("/signup");

    if (!user) {
        if (isAuthPage) {
            return response;
        }

        return NextResponse.redirect(new URL("/", req.url));
    }

    if (isAuthPage) {
        return NextResponse.redirect(new URL("/home", req.url));
    }

    return response;
}