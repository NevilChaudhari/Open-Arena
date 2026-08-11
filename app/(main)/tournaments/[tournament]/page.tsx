import { Suspense } from "react";
import TournamentDetailsSkeleton from "./TournamentDetailsSkeleton";
import TournamentDetailsData from "./TournamrntDetailsData";

export default function TournamentPage({
    params,
}: {
    params: Promise<{ tournament: string }>;
}) {
    return (
        <Suspense fallback={<TournamentDetailsSkeleton />}>
            <TournamentDetailsData params={params} />
        </Suspense>
    );
}