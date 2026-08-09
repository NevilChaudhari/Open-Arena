import { createClient } from "@/lib/supabase/server";
import ProfileUI from "./ProfileUI";

interface User {
    id: string,
    username: string,
    coins: number
}

export default async function Profile() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    const { data: userData, error: userError } = await supabase.from('users').select('*').eq('id', user?.id).single()
    if (userError) console.log(`ProfilePage fetch user error: ${userError}`);

    return (
        <ProfileUI user={userData} />
    )
}