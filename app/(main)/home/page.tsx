import { Suspense } from "react";
import HomeData from "./HomeData";
import HomeSkeleton from "./HomeSkeleton";

export default function Home() {
    return (
        <Suspense fallback={<HomeSkeleton />}>
            <HomeData />
        </Suspense>
    )
}
