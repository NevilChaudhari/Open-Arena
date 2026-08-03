import { ArrowDownToLine, ArrowUpFromLine, ArrowUpToLine, BadgeCheck, BanknoteArrowDown, BanknoteArrowUp, Calendar, CreditCard, Dot, EllipsisVertical, Landmark, MapPin, Minus, MoveDown, PenLine, Plus, WalletMinimal } from "lucide-react";

interface User {
    id: string,
    username: string,
    coins: number
}

interface Props{
    user: User
}

export default function WalletUI({user}: Props) {
    return (
        <div className="flex flex-col p-5 gap-10 w-full h-full">
            {/* Header */}
            < div className="flex flex-col" >
                <span className="text-4xl font-semibold">Wallet</span>
                <span className="text-md text-[#7E8190]">Manage your balance, transactions, and payouts</span>
            </div >
            <div className="flex w-full h-full gap-3">

                {/* Left Part */}
                <div className="flex flex-col w-full min-h-max gap-5 ">

                    {/* Profile Card */}
                    <div className="flex gap-10 place-content-between items-end p-10 w-full h-auto bg-[#16161C]/70 rounded-md border border-[#2C292A]">
                        <div className="flex gap-50">
                            {/* Balance */}
                            <div className="flex flex-col gap-5">
                                <span className="text-md text-[#7E8190]">Total Balance</span>
                                <span className="text-5xl font-semibold flex gap-2 items-center">₹{user.coins}</span>
                            </div>

                            <div className="flex flex-col gap-3">
                                <div className="flex w-50 h-15 items-center justify-center gap-3 rounded-md border border-[#2C292A] cursor-pointer hover:bg-[#5b4bff]"><Plus />Add Coins</div>
                                <div className="flex w-50 h-15 items-center justify-center gap-3 rounded-md border border-[#2C292A] cursor-pointer hover:bg-[#5b4bff]"><ArrowUpFromLine />Withdraw</div>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-10">
                        {/* Card 1 */}
                        <div className="flex gap-10 items-center p-5 w-auto h-auto bg-[#16161C]/70 rounded-md border border-[#2C292A]">
                            <div className="flex gap-5">
                                <div className="flex items-center justify-center w-13 h-13 rounded-md bg-[#6B58D6]/50 text-[#A79FFF]">
                                    <BanknoteArrowUp size={30} />
                                </div>
                                <div className="flex-col flex">
                                    <span className="text-md text-[#7E8190]">Total Deposits</span>
                                    <span className="text-xl">₹99,999.99</span>
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
                                    <span className="text-xl">₹99,999.99</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Part */}
                <div className="min-w-[30%] max-h-full overflow-y-auto overflow-hidden place-content-between gap-4 flex flex-col">
                    <div className="flex flex-col gap-5 w-full flex-1 rounded-md bg-[#16161C]/70 border border-[#2C292A] p-3">
                        {/* Header */}
                        <div className="flex items-center place-content-between w-full h-10">
                            <span className="text-md">Recent Transactions</span>
                            <span className="text-[#A79FFF] text-sm hover:underline cursor-pointer">View All</span>
                        </div>

                        {/* Transaction Card */}
                        <div className="flex items-center place-content-between border-b border-[#202126] pb-5">
                            <div className="flex gap-2 items-center">
                                <div className="flex w-13 h-13 rounded-full bg-[#22C55E]/30 items-center justify-center text-[#22C55E]"><ArrowDownToLine /></div>
                                <div className="flex flex-col">
                                    <span>Deposit via UPI</span>
                                    <span className="text-[#9A9AA3] text-xs">May 24, 2026</span>
                                </div>
                            </div>

                            <div className="flex gap-1 text-[#22C55E] text-md items-center"><Plus size={15} />₹99,999.99</div>
                        </div>

                        {/* Transaction Card */}
                        <div className="flex items-center place-content-between border-b border-[#202126] pb-5">
                            <div className="flex gap-2 items-center">
                                <div className="flex w-13 h-13 rounded-full bg-[#EF4444]/30 items-center justify-center text-[#EF4444]"><ArrowUpToLine /></div>
                                <div className="flex flex-col">
                                    <span>Withdraw to Bank</span>
                                    <span className="text-[#9A9AA3] text-xs">May 24, 2026</span>
                                </div>
                            </div>

                            <div className="flex gap-1 text-[#EF4444] text-md items-center"><Minus size={15} />₹99,999.99</div>
                        </div>

                    </div>

                    <div className="flex flex-col gap-3 w-full min-h-max rounded-md bg-[#16161C]/70 border border-[#2C292A] p-3">
                        {/* Header */}
                        <div className="flex items-center place-content-between w-full h-10">
                            <span className="text-md">Payment Methods</span>
                            <span className="text-[#A79FFF] text-sm hover:underline cursor-pointer">Manage</span>
                        </div>

                        {/* Transaction Card */}
                        <div className="flex items-center place-content-between border-b border-[#202126] pb-3">
                            <div className="flex gap-2 items-center">
                                <div className="flex w-13 h-13 rounded-md bg-[#1C1D23] items-center justify-center"><CreditCard /></div>
                                <div className="flex flex-col">
                                    <span>UPI</span>
                                    <span className="text-[#9A9AA3] text-xs">username@upi</span>
                                </div>
                            </div>

                            <div className="flex gap-1 text-xl items-center justify-center cursor-pointer rounded-full hover:bg-[#1C1D23] w-10 h-10"><EllipsisVertical /></div>
                        </div>
                        
                        {/* Transaction Bank */}
                        <div className="flex items-center place-content-between border-b border-[#202126] pb-3">
                            <div className="flex gap-2 items-center">
                                <div className="flex w-13 h-13 rounded-md bg-[#1C1D23] items-center justify-center"><Landmark /></div>
                                <div className="flex flex-col">
                                    <span>Bank Name</span>
                                    <span className="text-[#9A9AA3] text-xs flex">xxxx xxxx 9999</span>
                                </div>
                            </div>

                            <div className="flex gap-1 text-xl items-center justify-center cursor-pointer rounded-full hover:bg-[#1C1D23] w-10 h-10"><EllipsisVertical /></div>
                        </div>
                        {/* Transaction Card */}
                        <div className="flex items-center place-content-between border-b border-[#202126] pb-3">
                            <div className="flex gap-2 items-center">
                                <div className="flex w-13 h-13 rounded-md bg-[#1C1D23] items-center justify-center"><CreditCard /></div>
                                <div className="flex flex-col">
                                    <span>Card Name</span>
                                    <span className="text-[#9A9AA3] text-xs flex">xxxx xxxx xxxx 9999</span>
                                </div>
                            </div>

                            <div className="flex gap-1 text-xl items-center justify-center cursor-pointer rounded-full hover:bg-[#1C1D23] w-10 h-10"><EllipsisVertical /></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}