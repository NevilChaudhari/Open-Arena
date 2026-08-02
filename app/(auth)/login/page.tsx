"use client";

import Image from "next/image";
import {
    Trophy,
    ShieldCheck,
    RotateCw,
    User,
    Mail,
    Lock,
    Gamepad2,
    Eye,
    EyeOff,
} from "lucide-react";
import { useState } from "react";

export default function Login() {
    const [checked, setChecked] = useState(false);
    const [checkTerms, setCheckTerms] = useState(false);

    return (
        <main className="h-screen overflow-hidden bg-[#09090B] bg-[url('/bg-login.png')] bg-cover text-white">
            <div className="mx-auto flex h-full max-w-[1550px] items-center justify-between px-10 py-6">

                {/* LEFT */}

                <section className="flex h-full w-1/2 flex-col justify-between py-2">

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

                    {/* Bottom */}

                    <div className="grid grid-cols-1 gap-5">
                        <Feature
                            icon={<Trophy size={20} />}
                            title="Easy Tournament Hosting"
                            subtitle="Create and manage tournaments in minutes."
                        />

                        <Feature
                            icon={<Gamepad2 size={20} />}
                            title="Real-time Matchmaking"
                            subtitle="find the perfect match for fair play"
                        />

                        <Feature
                            icon={<ShieldCheck size={20} />}
                            title="Secure & Reliable"
                            subtitle="Built for gamers. Trusted by thousands."
                        />

                    </div>

                </section>

                {/* RIGHT */}

                <section className="flex w-1/2 justify-center">

                    <div className="w-full max-w-[520px] rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl">

                        <div className="mb-6 text-center">

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
                            <Input
                                icon={<User size={18} />}
                                placeholder="Enter your email or username"
                            />
                            <label htmlFor="email" className="text-sm font-medium text-[#B6B8C0]">Password</label>
                            <Input
                                icon={<Mail size={18} />}
                                placeholder="Enter your password"
                                type="password"
                            />

                        </div>

                        <div className="flex justify-between">
                            <div className="">
                                <div
                                    className="mt-4 flex cursor-pointer items-center gap-3"
                                    onClick={() => setChecked(!checked)}
                                >
                                    <div
                                        className={`flex h-5 w-5 items-center justify-center rounded border ${checked
                                            ? "border-violet-500 bg-violet-600"
                                            : "border-gray-500"
                                            }`}
                                    >
                                        {checked && "✓"}
                                    </div>

                                    <p className="text-sm text-gray-400">
                                        Remember me
                                    </p>
                                </div>

                            </div>
                            <div className="">
                                <p className="mt-4 ml-auto cursor-pointer text-sm text-violet-400">
                                    Forgot password?
                                </p>
                            </div>
                        </div>
                        <div
                            className="mt-4 flex items-center gap-3"
                        >
                            <div
                                onClick={() => setCheckTerms(!checkTerms)}
                                className={`flex h-5 w-5 cursor-pointer items-center justify-center rounded border ${checkTerms
                                    ? "border-violet-500 bg-violet-600"
                                    : "border-gray-500"
                                    }`}
                            >
                                {checkTerms && "✓"}
                            </div>

                            <p className=" text-center text-xs text-gray-400">By continuing. you agree to our <span className="cursor-pointer text-violet-400">
                                Terms of Service
                            </span> & <span className=" cursor-pointer text-violet-400">
                                    Privacy Policy
                                </span></p>
                        </div>

                        <button className="mt-5 h-12 w-full rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 font-semibold transition hover:opacity-90">
                            Sign in
                        </button>

                        <p className="mt-5 text-center text-sm text-gray-400">
                            Don&apos;t have an account?
                            <span className="ml-2 cursor-pointer text-violet-400">
                                Sign Up
                            </span>
                        </p>

                    </div>

                </section>

            </div>
        </main>
    );
}

function Feature({
    icon,
    title,
    subtitle,
}: {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
}) {
    return (
        <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
                {icon}
            </div>

            <div>
                <p className="font-semibold">{title}</p>
                <p className="text-sm text-gray-500">{subtitle}</p>
            </div>
        </div>
    );
}

function Input({
    icon,
    placeholder,
    type = "text",
}: {
    icon: React.ReactNode;
    placeholder: string;
    type?: string;
}) {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";

    return (
        <div className="mt-1 flex h-11 items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4">
            <div className="text-gray-500">
                {icon}
            </div>

            <input
                type={
                    isPassword
                        ? showPassword
                            ? "text"
                            : "password"
                        : type
                }
                placeholder={placeholder}
                className="w-full bg-transparent outline-none placeholder:text-gray-500"
            />

            {isPassword && (
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-500 hover:text-white"
                >
                    {showPassword ? (
                        <EyeOff size={18} />
                    ) : (
                        <Eye size={18} />
                    )}
                </button>
            )}
        </div>
    );
}