import { createClient } from "@/lib/supabase/server";
import WalletUI from "./WalletUI";

interface User {
    id: string,
    username: string,
    coins: number
}

export default async function Home() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    const { data: userData, error } = await supabase.from('users').select('*').eq('id', user?.id).single()

    return (
        <WalletUI user={userData} />
    );
}