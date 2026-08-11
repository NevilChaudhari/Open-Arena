import { Skeleton } from "@/Components/ui/skeleton"
import { Plus, ArrowUpFromLine, BanknoteArrowUp, BanknoteArrowDown, ArrowDownToLine, ArrowUpToLine, Minus } from "lucide-react"

export default function WalletSkeleton() {
    return (
        <div className="flex flex-col w-full h-full gap-5 overflow-hidden overflow-y-auto">
            {/* Header */}
            < div className="flex flex-col" >
                <span className="text-2xl md:text-4xl font-semibold">Wallet</span>
                <span className="text-sm md:text-md text-[#A79FFF]">Manage your balance, transactions, and payouts</span>
            </div >
            <div className="flex md:flex-row flex-col w-full h-full gap-3">

                {/* Left Part */}
                <div className="flex flex-col w-full min-h-max gap-5 ">

                    {/* Profile Card */}
                    <div className="flex gap-10 place-content-between items-end p-10 w-full h-auto bg-[#16161C]/70 rounded-md border border-[#2C292A]">
                        <div className="flex md:flex-row flex-col gap-10 items-center justify-center md:place-content-between w-full">
                            {/* Balance */}
                            <div className="flex flex-col gap-5">
                                <span className="text-md text-[#7E8190]">Total Balance</span>
                                <span className="text-5xl font-semibold flex gap-2 items-center"><Skeleton className="min-w-50 md:h-10 h-20 bg-zinc-800 animate-pulse" /></span>
                            </div>

                            <div className="flex md:flex-col gap-3">
                                <div className="flex md:w-50 w-40 h-15 items-center justify-center gap-3 rounded-md border border-[#2C292A] cursor-pointer hover:bg-[#5b4bff]"><Plus />Add Coins</div>
                                <div className="flex md:w-50 w-40 h-15 items-center justify-center gap-3 rounded-md border border-[#2C292A] cursor-pointer hover:bg-[#5b4bff]"><ArrowUpFromLine />Withdraw</div>
                            </div>
                        </div>
                    </div>

                    <div className="flex md:flex-row flex-col gap-2 md:gap-10">
                        {/* Card 1 */}
                        <div className="flex gap-10 items-center p-5 w-auto h-auto bg-[#16161C]/70 rounded-md border border-[#2C292A]">
                            <div className="flex gap-5">
                                <div className="flex items-center justify-center w-13 h-13 rounded-md bg-[#6B58D6]/50 text-[#A79FFF]">
                                    <BanknoteArrowUp size={30} />
                                </div>
                                <div className="flex-col flex">
                                    <span className="text-md text-[#7E8190]">Total Deposits</span>
                                    <span className="text-xl"><Skeleton className="min-w-50 h-10 bg-zinc-800 animate-pulse" /></span>
                                </div>
                            </div>
                        </div>
                        {/* Card 2 */}
                        <div className="flex gap-10 items-center p-5 w-auto h-auto bg-[#16161C]/70 rounded-md border border-[#2C292A]">
                            <div className="flex gap-5">
                                <div className="flex items-center justify-center w-13 h-13 rounded-md bg-[#3B82F6]/50 text-[#3B82F6]">
                                    <BanknoteArrowDown size={30} />
                                </div>
                                <div className="flex-col flex">
                                    <span className="text-md text-[#7E8190]">Total Withdrawn</span>
                                    <span className="text-xl"><Skeleton className="min-w-50 h-10 bg-zinc-800 animate-pulse" /></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Part */}
                <div className="min-w-[30%] md:max-h-min md:min-h-max min-h-max overflow-y-auto overflow-hidden place-content-between flex flex-col gap-5 w-full flex-1 rounded-md bg-[#16161C]/70 border border-[#2C292A] p-3">
                    {/* Header */}
                    <div className="flex items-center place-content-between w-full h-10">
                        <span className="text-md">Recent Transactions</span>
                        <span className="text-[#A79FFF] text-sm hover:underline cursor-pointer">View All</span>
                    </div>

                    {/* Transaction Card */}
                    {Array.from({ length: 3 }).map((_, i) => {
                        return (
                            <div key={i} className="flex items-center place-content-between border-b border-[#202126] pb-5">
                                <Skeleton className="min-w-full h-10 bg-zinc-800 animate-pulse" />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>

    )
}