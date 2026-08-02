"use client";

import Image from "next/image";
import {
    Eye,
    EyeOff,
    Trophy,
    ShieldCheck,
    RotateCw,
    User,
    Mail,
    Lock,
    Gamepad2,
} from "lucide-react";
import { useState } from "react";

export default function Login() {
    const [checked, setChecked] = useState(false);

    return (
        <main className="h-screen overflow-hidden bg-[#09090B] bg-[url('/signup.png')] bg-cover text-white">
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

                    {/* Bottom */}

                    <div className="grid grid-cols-1 gap-5">

                        <h1 className="text-5xl font-extrabold leading-[1.1]">
                            Your arena.
                            <br />
                            Your rules.
                            <br />
                            <span className="text-violet-500">
                                Your legacy.
                            </span>
                        </h1>

                        <p className="mt-0 max-w-md text-l text-gray-400">
                            Create your account and start
                            <br />
                            building your esports legacy.
                        </p>

                        <Feature
                            icon={<Trophy size={20} />}
                            title="10K+"
                            subtitle="Tournaments Hosted"
                        />

                        <Feature
                            icon={<Gamepad2 size={20} />}
                            title="500K+"
                            subtitle="Players"
                        />

                        <Feature
                            icon={<ShieldCheck size={20} />}
                            title="50+"
                            subtitle="Games Supported"
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
                                Create your account
                            </h2>

                            <p className="mt-1 text-gray-400">
                                Join Open Arena today
                            </p>

                        </div>

                        {/* OAuth */}

                        <div className="grid grid-cols-2 gap-3">

                            <button className="flex h-11 items-center justify-center gap-2 rounded-xl border border-white/10 hover:bg-white/5">

                                <Image
                                    src="/google.png"
                                    alt=""
                                    width={18}
                                    height={18}
                                />

                                Continue with Google

                            </button>

                            <button className="flex h-11 items-center justify-center gap-2 rounded-xl border border-white/10 hover:bg-white/5">

                                <Image
                                    src="/discord.png"
                                    alt=""
                                    width={18}
                                    height={18}
                                />

                                Continue with Discord

                            </button>

                        </div>

                        <div className="my-2 flex items-center gap-2">
                            <div className="h-px flex-1 bg-white/10" />
                            <span className="text-sm text-gray-500">or</span>
                            <div className="h-px flex-1 bg-white/10" />
                        </div>

                        <div className="space-y-3">
                            <label htmlFor="email" className="text-sm font-medium text-[#B6B8C0]">Username</label>
                            <Input
                                icon={<User size={18} />}
                                placeholder="Username"
                            />
                            <label htmlFor="email" className="text-sm font-medium text-[#B6B8C0]">Email</label>
                            <Input
                                icon={<Mail size={18} />}
                                placeholder="Email"
                            />
                            <label htmlFor="email" className="text-sm font-medium text-[#B6B8C0]">Password</label>
                            <Input
                                icon={<Lock size={18} />}
                                placeholder="Password"
                                type="password"
                            />
                            <label htmlFor="email" className="text-sm font-medium text-[#B6B8C0]">Confirm Password</label>
                            <Input
                                icon={<Lock size={18} />}
                                placeholder="Confirm Password"
                                type="password"
                            />

                        </div>

                        <div
                            className="mt-4 flex items-center gap-3"
                        >
                            <div
                                onClick={() => setChecked(!checked)}
                                className={`flex h-5 w-5 cursor-pointer items-center justify-center rounded border ${checked
                                    ? "border-violet-500 bg-violet-600"
                                    : "border-gray-500"
                                    }`}
                            >
                                {checked && "✓"}
                            </div>

                            <p className="text-sm text-gray-400">
                                I agree to the <span className="cursor-pointer text-violet-400">
                                    Terms of Service
                                </span> & <span className=" cursor-pointer text-violet-400">
                                    Privacy Policy
                                </span>
                            </p>
                        </div>

                        <button className="mt-5 h-12 w-full rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 font-semibold transition hover:opacity-90">
                            Create Account
                        </button>

                        <p className="mt-5 text-center text-sm text-gray-400">
                            Already have an account?
                            <span className="ml-2 cursor-pointer text-violet-400">
                                Sign In
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