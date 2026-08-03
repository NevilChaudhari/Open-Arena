import { createClient } from "@/lib/supabase/server";
import ProfileUI from "./ProfileUI";

interface User {
    id: string,
    username: string,
    coins: number
}

export default async function Profile() {
    const supabase = await createClient();

    const { data: user, error } = await supabase.from('users').select('*').single()
    if (error) console.log(`ProfilePage fetch user error: ${error}`);


    return (
        <ProfileUI user={user} />
    )
}