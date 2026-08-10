"use client";

import Image from "next/image";
import {
    Eye,
    User,
    Mail,
    Lock,
    Gamepad2,
    EyeClosed,
    Check,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SignUp() {
    const router = useRouter();
    const supabase = createClient()

    const [TAC, setTAC] = useState<boolean>(false);
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const signUp = async () => {
        if (username === '') {
            setError('* Enter Username *')
            return;
        }
        if (email === '') {
            setError('* Enter Email *')
            return;
        }
        if (password.length < 6) {
            setError('* Password\'s length should be greater than 6 *')
            return;
        }
        if (password !== confirmPassword) {
            setError('* Confirm Password does not match with Password *')
            return;
        };
        if (!TAC) {
            setError('* You didnt\'t accept Terms and Conditions *')
            return;
        }

        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    username: username,
                    coins: 0
                }
            }
        })
        if (error) console.log(`signup error: ${error}`);

        const { error: userError } = await supabase.from('users').insert({
            username: username
        })

        if (userError) console.log(`signup data entry error: ${error}`);

        router.refresh()
    }

    return (
        <main className="min-h-screen w-full overflow-y-auto bg-[#09090B] bg-cover bg-center text-white md:h-screen md:overflow-hidden md:bg-[url('/signup.png')]">
            <div className="flex min-h-screen w-full flex-col items-center justify-center gap-8 px-4 py-8 sm:px-6 md:h-full md:flex-row md:justify-between md:gap-0 md:px-10 md:py-6">

                {/* LEFT */}
                <section className="hidden h-full w-1/2 flex-col justify-between py-2 md:flex">

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

                        <h1 className="text-4xl font-extrabold leading-[1.1] lg:text-5xl">
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

                    </div>

                </section>

                {/* Mobile-only compact logo (shown above the card when the split hero is hidden) */}
                <div className="flex items-center gap-2.5 md:hidden">
                    <Image src="/logo.png" width={36} height={36} alt="" />
                    <div>
                        <h2 className="text-sm font-bold tracking-wide">OPEN ARENA</h2>
                        <p className="text-[9px] tracking-[0.3em] text-violet-500">TOURNAMENTS</p>
                    </div>
                </div>

                {/* RIGHT */}
                <section className="flex w-full justify-center md:w-1/2">
                    <div className="w-full max-w-130 rounded-2xl border border-white/10 bg-white/4 p-5 backdrop-blur-xl sm:p-6 md:rounded-3xl md:p-8">

                        <div className="mb-6 text-center">

                            <Gamepad2
                                className="mx-auto mb-3 text-violet-500"
                                size={30}
                            />

                            <h2 className="text-2xl font-bold sm:text-3xl">
                                Create your account
                            </h2>

                            <p className="mt-1 text-sm text-gray-400 sm:text-base">
                                Join Open Arena today
                            </p>

                        </div>

                        {/* OAuth */}

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                            <button className="flex h-11 items-center justify-center gap-2 rounded-xl border border-white/10 text-sm hover:bg-white/5">

                                <Image
                                    src="/google.png"
                                    alt=""
                                    width={18}
                                    height={18}
                                />

                                Continue with Google

                            </button>

                            <button className="flex h-11 items-center justify-center gap-2 rounded-xl border border-white/10 text-sm hover:bg-white/5">

                                <Image
                                    src="/discord.png"
                                    alt=""
                                    width={18}
                                    height={18}
                                />

                                Continue with Discord

                            </button>

                        </div>

                        <div className="my-4 flex items-center gap-2">
                            <div className="h-px flex-1 bg-white/10" />
                            <span className="text-sm text-gray-500">or</span>
                            <div className="h-px flex-1 bg-white/10" />
                        </div>

                        <div className="space-y-3">
                            <label htmlFor="email" className="text-sm font-medium text-[#B6B8C0]">Username</label>
                            <div className="mt-1 flex h-11 items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4">
                                <div className="shrink-0 text-gray-500"><User size={18} /></div>
                                <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="w-full min-w-0 bg-transparent outline-none placeholder:text-gray-500" />
                            </div>
                            <label htmlFor="email" className="text-sm font-medium text-[#B6B8C0]">Email</label>
                            <div className="mt-1 flex h-11 items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4">
                                <div className="shrink-0 text-gray-500"><Mail size={18} /></div>
                                <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full min-w-0 bg-transparent outline-none placeholder:text-gray-500" />
                            </div>
                            <label htmlFor="email" className="text-sm font-medium text-[#B6B8C0]">Password</label>
                            <div className="mt-1 flex h-11 items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4">
                                <div className="shrink-0 text-gray-500"><Lock size={18} /></div>
                                <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder="Enter your Password" className="w-full min-w-0 bg-transparent outline-none placeholder:text-gray-500" />
                                <div onClick={() => setShowPassword(!showPassword)} className="shrink-0 cursor-pointer text-gray-500">{showPassword ? <Eye size={18} /> : <EyeClosed size={18} />}</div>
                            </div>

                            <label htmlFor="email" className="text-sm font-medium text-[#B6B8C0]">Confirm Password</label>
                            <div className="mt-1 flex h-11 items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4">
                                <div className="shrink-0 text-gray-500"><Lock size={18} /></div>
                                <input type={showPassword ? 'text' : 'password'} value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} placeholder="Confirm your Password" className="w-full min-w-0 bg-transparent outline-none placeholder:text-gray-500" />
                                <div onClick={() => setShowPassword(!showPassword)} className="shrink-0 cursor-pointer text-gray-500">{showPassword ? <Eye size={18} /> : <EyeClosed size={18} />}</div>
                            </div>

                        </div>

                        {error !== '' && (<span className="flex items-center justify-center px-2 pt-5 text-center text-xs leading-relaxed text-red-500">{error}</span>)}

                        <div
                            className="mt-4 flex items-start gap-3"
                        >
                            <div
                                onClick={() => setTAC(!TAC)}
                                className={`mt-0.5 flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded border ${TAC
                                    ? "border-violet-500 bg-violet-600"
                                    : "border-gray-500"
                                    }`}
                            >
                                {TAC && <Check size={14} />}
                            </div>

                            <p className="text-sm text-gray-400">
                                I agree to the <span className="cursor-pointer text-violet-400">
                                    Terms of Service
                                </span> & <span className=" cursor-pointer text-violet-400">
                                    Privacy Policy
                                </span>
                            </p>
                        </div>


                        <div onClick={signUp} className="mt-5 flex h-12 w-full cursor-pointer items-center justify-center rounded-xl bg-linear-to-r from-violet-600 to-indigo-600 text-center font-semibold transition hover:opacity-90">
                            Create Account
                        </div>

                        <p className="mt-5 text-center text-sm text-gray-400">
                            Already have an account?
                            <span onClick={() => router.push('/signin')} className="ml-2 cursor-pointer text-violet-400">
                                Sign In
                            </span>
                        </p>

                    </div>

                </section>

            </div>
        </main>
    );
}