"use client";

import Image from "next/image";
import {
    Trophy,
    ShieldCheck,
    User,
    Mail,
    Gamepad2,
    Eye,
    Lock,
    Check,
    EyeClosed,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
    const router = useRouter();

    const [rememberMe, setRememberMe] = useState(false);
    const [checkTerms, setCheckTerms] = useState(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);

    return (
        <main className="h-screen overflow-hidden bg-[#09090B] bg-[url('/signup.png')] bg-cover text-white">
            <div className="flex h-full items-center justify-between px-10 py-6">

                {/* LEFT */}
                <div className="flex h-full w-1/2 flex-col justify-between py-2">

                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <Image
                            src="/logo.png"
                            width={46}
                            height={46}
                            alt=""
                        />

                        <div>
                            <h2 className="font-bold tracking-wide">
                                OPEN ARENA
                            </h2>

                            <p className="text-xs tracking-[0.35em] text-violet-500">
                                TOURNAMENTS
                            </p>
                        </div>
                    </div>

                    {/* Middle */}
                    <div>
                        <h1 className="text-5xl font-extrabold leading-[1.1]">
                            Compete.
                            <br />
                            Connect.
                            <br />
                            <span className="text-violet-500">
                                Conquer.
                            </span>
                        </h1>

                        <p className="mt-0 max-w-md text-l text-gray-400">
                            Host and join epic tornaments
                            <br />
                            across your favorite games.
                        </p>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="flex w-1/2 justify-center">

                    <div className="w-full max-w-130 rounded-3xl border border-white/10 bg-white/4 p-8 backdrop-blur-xl">

                        <div className="pb-6 text-center">

                            <Gamepad2
                                className="mx-auto mb-3 text-violet-500"
                                size={34}
                            />

                            <h2 className="text-3xl font-bold">
                                Welcome back
                            </h2>

                            <p className="mt-1 text-gray-400">
                                Sign in to continue to your account.
                            </p>

                        </div>

                        {/* OAuth */}

                        <div className="grid grid-cols-2 gap-3">

                            <button className="flex h-11 text-sm items-center justify-center gap-2 rounded-xl border border-white/10 hover:bg-white/5">

                                <Image
                                    className="mr-2"
                                    src="/google.png"
                                    alt=""
                                    width={20}
                                    height={20}
                                />

                                Continue with Google

                            </button>

                            <button className="flex h-11 text-sm items-center justify-center gap-2 rounded-xl border border-white/10 hover:bg-white/5">

                                <Image
                                    className="mr-2"
                                    src="/discord.png"
                                    alt=""
                                    width={20}
                                    height={20}
                                />

                                Continue with Discord

                            </button>

                        </div>

                        <div className="my-2 flex items-center gap-2">
                            <div className="h-px flex-1 bg-white/10" />
                            <span className="text-sm text-gray-500">or</span>
                            <div className="h-px flex-1 bg-white/10" />
                        </div>

                        <div className="space-y-3 ">

                            <label htmlFor="email" className="text-sm font-medium text-[#B6B8C0]">Email or Username</label>
                            <div className="mt-1 flex h-11 items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4">
                                <div className="text-gray-500"><User size={18} /></div>
                                <input type='text' value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder="Enter your email or username" className="w-full bg-transparent outline-none placeholder:text-gray-500" />
                            </div>

                            <label htmlFor="email" className="text-sm font-medium text-[#B6B8C0]">Password</label>
                            <div className="mt-1 flex h-11 items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4">
                                <div className="text-gray-500"><Lock size={18} /></div>
                                <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder="Enter your Password" className="w-full bg-transparent outline-none placeholder:text-gray-500" />
                                <div onClick={() => setShowPassword(!showPassword)} className="text-gray-500 cursor-pointer">{showPassword ? <Eye size={18} /> : <EyeClosed size={18} />}</div>
                            </div>

                        </div>

                        <div className="flex justify-end">
                            <p className="mt-4 ml-auto cursor-pointer text-sm text-violet-400">
                                Forgot password?
                            </p>
                        </div>
                        <div className="mt-4 flex items-center gap-3">
                            <div onClick={() => setCheckTerms(!checkTerms)}
                                className={`flex h-5 w-5 cursor-pointer items-center justify-center rounded border ${checkTerms
                                    ? "border-violet-500 bg-violet-600"
                                    : "border-gray-500"
                                    }`}>
                                {checkTerms && <Check />}
                            </div>

                            <p className=" text-center text-xs text-gray-400">I agree to the <span className="cursor-pointer text-violet-400">
                                Terms and Condition
                            </span> & <span className=" cursor-pointer text-violet-400">
                                    Privacy Policy
                                </span></p>
                        </div>

                        <div className="cursor-pointer flex items-center justify-center mt-5 h-12 w-full rounded-xl bg-linear-to-r from-violet-600 to-indigo-600 font-semibold transition hover:opacity-90">
                            Sign in
                        </div>

                        <p className="mt-5 text-center text-sm text-gray-400">
                            Don&apos;t have an account?
                            <span onClick={() => router.push('/signup')} className="ml-2 cursor-pointer text-violet-400">
                                Sign Up
                            </span>
                        </p>

                    </div>

                </div>

            </div>
        </main>
    );
}