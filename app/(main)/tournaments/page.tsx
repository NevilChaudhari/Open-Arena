import { Suspense } from "react";
import TournamentData from "./TournamentData";
import TournamentSkeleton from "./TournamentSkeleton";

export default function Home() {
    return (
        <Suspense fallback={<TournamentSkeleton />}>
            <TournamentData />
        </Suspense>
    );
}