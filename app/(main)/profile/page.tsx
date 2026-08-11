import { Suspense } from "react";
import ProfileData from "./ProfileData";
import ProfileSkeleton from "./ProfileSkeleton";

export default async function Profile() {
    return (
        <Suspense fallback={<ProfileSkeleton />}>
            <ProfileData />
        </Suspense>
    )
}