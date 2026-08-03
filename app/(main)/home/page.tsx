import { createClient } from "@/lib/supabase/server";
import HomeUI from "./HomeUI";

interface User {
    id: string,
    username: string,
    coins: number
}

export default async function Home() {
    const supabase = await createClient();

    const { data: tournaments, error } = await supabase.from('tournaments').select('*')
    if (error) console.log(`HomePage fetch tournament error: ${error}`);

    return (
        <HomeUI tournaments={tournaments!}/>
    );
}
