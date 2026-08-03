import { createClient } from "@/lib/supabase/server";
import HomeUI from "./HomeUI";

interface User {
    id: string,
    username: string,
    coins: number
}

export default async function Home() {
    const supabase = await createClient();

    return (
        <HomeUI />
    );
}
