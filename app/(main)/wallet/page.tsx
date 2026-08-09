import { createClient } from "@/lib/supabase/server";
import WalletUI from "./WalletUI";

interface User {
    id: string,
    username: string,
    coins: number
}

export default async function Home() {
    const supabase = await createClient();

    const { data: user, error } = await supabase.from('users').select('*').single()
    const { data: transactionData, error: transactionDataError } = await supabase.from('transactions').select('*').eq('userId', user.id)
    if (transactionDataError) console.log(`transaction data fetching error: ${JSON.stringify(transactionDataError)}`);


    return (
        <WalletUI user={user} TransactionData={transactionData ? transactionData : []} />
    );
}