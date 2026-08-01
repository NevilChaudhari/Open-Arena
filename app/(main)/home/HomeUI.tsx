import TournamentCard from "@/Components/tournamentCard";
import { Bell, Mail, Search } from "lucide-react";

export default function HomeUI() {
    return (
        <div className="flex w-full">
            {/* Left Part */}
            <div className="flex w-full h-screen flex-col p-5 gap-10">
                {/* Navbar */}
                <div className="flex w-full place-content-between items-center">
                    {/* Searchbox */}
                    <div className="flex bg-[#202124] border border-[#44454A] h-10 w-100 gap-2 items-center rounded-md px-2">
                        <Search />
                        <input type="text" placeholder="Search" className="w-full h-full focus:outline-0" />
                    </div>

                    {/* icons */}
                    <div className="flex gap-5">
                        <div className="flex hover:bg-[#1D1E20] hover:text-white w-12 h-12 items-center justify-center rounded-full cursor-pointer text-[#7E8190]"><Bell /></div>
                        <div className="flex hover:bg-[#1D1E20] hover:text-white w-12 h-12 items-center justify-center rounded-full cursor-pointer text-[#7E8190]"><Mail /></div>
                    </div>
                </div>

                {/* Slider */}
                <div className="flex border-2 border-[#2A2B2D] h-80 rounded-md items-center justify-center" >Slider</div>

                {/* Live Tournaments */}

                <div className="flex flex-col gap-2">
                    <div className="flex items-center place-content-between">
                        <span className="font-semibold text-xl">Live Now</span>
                        <span className="text-[#5B4BFF] text-sm hover:underline cursor-pointer">View All</span>
                    </div>
                    <div className="flex gap-5">
                        {/* Card */}
                        <TournamentCard image="/BGMI.jpg" perKill={9} currentPlayers={10} totalPlayers={99} />
                        <TournamentCard image="/FF.jpg" perKill={10} currentPlayers={30} totalPlayers={99} />
                    </div>
                </div>
            </div>

            {/* Right Part */}

            <div className="flex flex-col min-w-[30%] border-l border-[#2A2B2D]"></div>
        </div>
    );
}
