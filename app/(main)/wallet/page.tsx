import { Suspense } from "react";
import WalletData from "./WalletData";
import WalletSkeleton from "./WalletSkeleton";

export default async function Wallet() {
    return (
        <Suspense fallback={<WalletSkeleton />}>
            <WalletData />
        </Suspense>
    );
}