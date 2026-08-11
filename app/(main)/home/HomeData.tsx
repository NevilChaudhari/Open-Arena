import { createClient } from "@/lib/supabase/server";
import HomeUI from "./HomeUI";

export default async function HomeData() {
    const supabase = await createClient();

    const { data: tournaments, error } = await supabase.from('tournaments').select('*')
    if (error) console.log(`HomePage fetch tournament error: ${error}`);

    return (
        <HomeUI tournaments={tournaments!} />
    );
}