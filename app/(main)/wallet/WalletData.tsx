import { createClient } from "@/lib/supabase/server";
import WalletUI from "./WalletUI";

interface User {
    id: string,
    username: string,
    coins: number
}

export default async function WalletData() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    const { data: userData, error } = await supabase.from('users').select('*').eq('id', user?.id).single()
    const { data: transactionData, error: transactionDataError } = await supabase.from('transactions').select('*').eq('userId', userData.id)
    if (transactionDataError) console.log(`transaction data fetching error: ${JSON.stringify(transactionDataError)}`);

    return (
        <WalletUI user={userData} TransactionData={transactionData ? transactionData : []} />
    );
}