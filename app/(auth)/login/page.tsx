"use client"
import { Checkbox } from "@base-ui/react";
import { Check, Gamepad2, LockKeyhole, RotateCwFadingClock, ShieldCheck, Trophy, User } from "lucide-react";
import { useState } from "react";
export default function Login() {

    const [isChecked, setIsChecked] = useState(false);

    return (
        <div className="min-h-screen bg-[url('/bg-login.png')] bg-cover bg-center bg-no-repeat">
            <div className="mx-auto flex min-h-screen max-w-[1600px] items-center justify-between px-4 py-2">
                {/* Left Side */}
                <div className="flex w-1/2 flex-col justify-between gap-auto">

                {/* Logo */}
                <div className="flex items-center gap-4">
                    <img src="/logo.png" alt="Logo" className="h-12 w-12" />

                    <div>
                    <h1 className="text-xl font-bold tracking-wide">
                        OPEN-ARENA
                    </h1>

                    <p className="text-sm font-semibold tracking-[0.35em] uppercase text-violet-500">
                        TOURNAMENTS
                    </p>
                    </div>
                </div>

                {/* Hero Text */}
                <div className="mt-16">
                    <h1 className="text-5xl font-extrabold leading-[1.1]">
                    Compete.
                    <br />
                    Connect.
                    <br />
                    <span className="text-violet-500">
                        Conquer.
                    </span>
                    </h1>

                    <p className="mt-6 max-w-md text-l text-gray-400">
                    Host and join epic tournaments
                    <br />
                    across your favorite games.
                    </p>
                </div>

                {/* Features */}
                <div className="mt-24 flex flex-col gap-8">

                    <div className="flex items-center gap-5">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#16171D] border border-[#26272E]">
                        <Trophy className="text-violet-500" size={22} />
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold">
                        Easy Tournament Hosting
                        </h3>

                        <p className="mt-1 text-gray-500">
                        Create and manage tournaments in minutes.
                        </p>
                    </div>
                    </div>

                    <div className="flex items-center gap-5">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#16171D] border border-[#26272E]">
                        <RotateCwFadingClock className="text-violet-500" size={22} />
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold">
                        Real-time Matchmaking
                        </h3>

                        <p className="mt-1 text-gray-500">
                        Find the perfect match for fair play.
                        </p>
                    </div>
                    </div>

                    <div className="flex items-center gap-5">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#16171D] border border-[#26272E]">
                        <ShieldCheck className="text-violet-500" size={22} />
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold">
                        Secure & Reliable
                        </h3>

                        <p className="mt-1 text-gray-500">
                        Built for gamers. Trusted by thousands.
                        </p>
                    </div>
                    </div>

                </div>

                </div>
                {/* Right Side */}
                <div className="flex items-center justify-center gap-5">
                    <div className="flex flex-col items-center gap-5 bg-[#171819] rounded-lg border border-[#2A2B2D] p-10 shadow-lg">
                        <Gamepad2 className="text-violet-500" size={35} />
                        <h1 className="text-2xl font-bold">Welcome Back!</h1>
                        <p className="text-center text-gray-500">Sign in to continue to your account</p>
                        <div className="flex flex-row gap-3">
                            <div className="flex items-center gap-3 rounded-lg border border-[#2A2B2D] p-3 shadow-lg hover:cursor-pointer hover:text-white hover:bg-[#5865F2]">
                                <img className="h-5" src="/logo.png" alt="Logo" />
                                <p className="text-m">Continue with Google</p>
                            </div>
                            <div className="flex items-center gap-3 rounded-lg border border-[#2A2B2D] p-3 shadow-lg hover:cursor-pointer hover:text-white hover:bg-[#5865F2]">
                                <img className="h-5" src="/logo.png" alt="Logo" />
                                <p className="text-m">Continue with Discord</p>
                            </div>
                        </div>
                        <div className="flex items-center w-full">
                            <div className="flex-1 h-px bg-gray-700"></div>

                            <span className="mx-2 text-sm font-medium text-gray-400">
                                or
                            </span>

                            <div className="flex-1 h-px bg-gray-700"></div>
                        </div>
                        <form className="flex flex-col gap-3 w-full ">  
                            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email or Username</label>
                            <div className="flex gap-2 border border-[#2A2B2D] p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none rounded-lg">
                                <User color="#252630" />
                                <input type="text" id="email" name="email" className=" w-full h-full focus:outline-0 " />
                            </div>
                            <div className="flex gap-2 border border-[#2A2B2D] p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none rounded-lg">
                                <LockKeyhole color="#252630" />
                                <input type="password" id="password" name="password" className=" w-full h-full focus:outline-0 " />
                            </div>
                            <div className="flex items-center justify-between">
                                {/* Left Side */}
                                <div
                                    onClick={() => setIsChecked(!isChecked)}
                                    className="flex items-center gap-3 cursor-pointer"
                                    >
                                    <div
                                        className={`w-5 h-5 rounded border-2 border-indigo-500 ${
                                        isChecked ? "bg-indigo-500" : "bg-transparent"
                                        }`}
                                        >{ isChecked && <Check size={15} />}
                                    </div>
                                    <span className="text-gray-300">Remember me</span>
                                </div>
                                {/* Right Side */}
                                <button className="text-sm font-medium text-indigo-500 hover:text-indigo-400">
                                    Forgot password?
                                </button>
                            </div>
                            <button type="submit" className="rounded-lg bg-blue-500 p-2 text-white hover:bg-blue-600">Sign In</button>
                        </form>
                        <div className="mt-8 text-center">
                            {/* Sign Up */}
                            <p className="text-gray-300">
                                Don't have an account?{" "}
                                <a
                                href="/signup"
                                className="font-semibold text-indigo-500 hover:text-indigo-400"
                                >
                                Sign up
                                </a>
                            </p>

                            {/* Terms */}
                            <p className="mt-8 text-sm text-gray-500">
                                By continuing, you agree to our{" "}
                                <a
                                href="/terms"
                                className="text-indigo-500 hover:text-indigo-400"
                                >
                                Terms of Service
                                </a>{" "}
                                and{" "}
                                <a
                                href="/privacy"
                                className="text-indigo-500 hover:text-indigo-400"
                                >
                                Privacy Policy
                                </a>
                                .
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}