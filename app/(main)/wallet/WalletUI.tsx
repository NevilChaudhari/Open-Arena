'use client'
import { ArrowDownToLine, ArrowUpFromLine, ArrowUpToLine, BadgeCheck, BanknoteArrowDown, BanknoteArrowUp, Calendar, CreditCard, Dot, EllipsisVertical, Landmark, MapPin, Minus, MoveDown, PenLine, Plus, WalletMinimal } from "lucide-react";
import Script from "next/script";
import { format, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
    id: string,
    username: string,
    coins: number
}

interface TransactionData {
    orderId: string,
    paymentId: string,
    ammount: number,
    userId: string,
    created_at: string
}

interface Props {
    user: User,
    TransactionData: TransactionData[]
}

export default function WalletUI({ user, TransactionData }: Props) {
    const router = useRouter()

    const payNow = async () => {
        const response = await fetch("/api/transactions/deposit/", {
            method: "POST",
        });

        const order = await response.json();

        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: "OpenArena",
            description: "Add Money",
            order_id: order.id,

            handler: async function (response: any) {
                const verify = await fetch("/api/transactions/verifyPayment/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                    }),
                });

                const data = await verify.json();

                if (!data.success) {
                    alert("Payment Failed");
                    return;
                }

                const addData = await fetch("/api/transactions/addData/", {
                    method: "POST",
                    body: JSON.stringify({
                        orderId: response.razorpay_order_id,
                        paymentId: response.razorpay_payment_id,
                        ammount: 500,
                        userId: user.id,
                    }),
                });

                const updateData = await addData.json()
                if (updateData.error) {
                    alert(`Data update Failed: ${data.error}`);
                    return;
                }
                router.refresh()
            },

            prefill: {
                name: user.username,
                email: "customer@example.com",
                contact: "9999999999",
            },

            modal: {
                ondismiss: () => {
                    console.log("Payment cancelled");
                },
            },

            theme: {
                color: "#3399cc",
            },
        };

        if (!(window as any).Razorpay) {
            alert("Razorpay SDK not loaded");
            return;
        }

        const razor = new (window as any).Razorpay(options);
        razor.open();
    };

    const [totalDeposits, setTotalDeposits] = useState(0)

    useEffect(() => {
        setTotalDeposits(0);
        TransactionData.forEach(transaction => {
            setTotalDeposits(totalDeposits + transaction.ammount)
        });
    }, [TransactionData])

    return (
        <div className="flex flex-col w-full h-full gap-5 overflow-hidden overflow-y-auto">
            <Script
                src="https://checkout.razorpay.com/v1/checkout.js"
                strategy="afterInteractive"
            />
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
                                <span className="text-5xl font-semibold flex gap-2 items-center">₹{user.coins}</span>
                            </div>

                            <div className="flex md:flex-col gap-3">
                                <div onClick={() => payNow()} className="flex md:w-50 w-40 h-15 items-center justify-center gap-3 rounded-md border border-[#2C292A] cursor-pointer hover:bg-[#5b4bff]"><Plus />Add Coins</div>
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
                                    <span className="text-xl">₹{totalDeposits}</span>
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
                <div className="min-w-[30%] md:max-h-min md:min-h-max min-h-max overflow-y-auto overflow-hidden place-content-between flex flex-col gap-5 w-full flex-1 rounded-md bg-[#16161C]/70 border border-[#2C292A] p-3">
                    {/* Header */}
                    <div className="flex items-center place-content-between w-full h-10">
                        <span className="text-md">Recent Transactions</span>
                        <span className="text-[#A79FFF] text-sm hover:underline cursor-pointer">View All</span>
                    </div>

                    {/* Transaction Card */}
                    {TransactionData.map((transaction) => {
                        return (
                            <div key={transaction.orderId} className="flex items-center place-content-between border-b border-[#202126] pb-5">
                                <div className="flex gap-2 items-center">
                                    <div className="flex w-13 h-13 rounded-full bg-[#22C55E]/30 items-center justify-center text-[#22C55E]"><ArrowDownToLine /></div>
                                    <div className="flex flex-col">
                                        <span>{transaction.orderId}</span>
                                        <span className="text-[#9A9AA3] text-xs">{format(transaction.created_at, "MMM dd, yyyy")}</span>
                                    </div>
                                </div>

                                <div className="flex gap-1 text-[#22C55E] text-md items-center"><Plus size={15} />₹{transaction.ammount}</div>
                            </div>
                        )
                    })}

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
            </div>
        </div>

    )
}