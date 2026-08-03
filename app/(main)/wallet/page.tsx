import { createClient } from "@/lib/supabase/server";
import WalletUI from "./WalletUI";

interface User {
    id: string,
    username: string,
    coins: number
}

export default async function Home() {
    const supabase = await createClient();

    const {data: user, error} = await supabase.from('users').select('*').single()

    return (
        <WalletUI user={user}/>
    );
}