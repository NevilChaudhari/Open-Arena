'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Trophy,
  Users,
  Zap,
  ShieldCheck,
  Wallet,
  Crosshair,
  Swords,
  Timer,
  ArrowRight,
} from "lucide-react";

export default function Home() {

  const router = useRouter();

  const GAMES = [
    { name: "BGMI", tag: "BATTLEGROUNDS MOBILE INDIA" },
    { name: "FREE FIRE", tag: "GARENA FREE FIRE MAX" },
    { name: "VALORANT", tag: "RIOT VALORANT" },
    { name: "COD MOBILE", tag: "CALL OF DUTY MOBILE" },
  ];

  const STEPS = [
    {
      n: "REGISTER",
      icon: Users,
      title: "Squad up & register",
      desc: "Pick a tournament, lock your slot with your team ID, and confirm your roster in under a minute.",
    },
    {
      n: "DROP IN",
      icon: Crosshair,
      title: "Get the room details",
      desc: "Room ID and password land in your dashboard 10 minutes before start. No Discord digging required.",
    },
    {
      n: "GET PAID",
      icon: Wallet,
      title: "Cash out instantly",
      desc: "Per-kill and rank prizes hit your Open Arena wallet the moment results are verified. Withdraw anytime.",
    },
  ];

  const STATS = [
    { value: "₹42L+", label: "Prize money paid out" },
    { value: "18,600+", label: "Players competing" },
    { value: "3.2k", label: "Tournaments hosted" },
    { value: "<10 min", label: "Avg. payout time" },
  ];

  const CX = {
    btnPrimary:
      "bg-[#6B58D6] hover:bg-[#7A68E8] active:bg-[#452FBC] text-white rounded-[10px] shadow-[0_8px_20px_rgba(0,0,0,0.45)] transition-colors duration-150 focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(107,88,214,0.35)]",
    btnGhost:
      "bg-transparent border border-[#3F3E41] text-[#C8C8D0] rounded-[10px] hover:border-[#6B58D6] hover:text-white hover:bg-[#6B58D6]/[0.08] transition-colors duration-150 focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(107,88,214,0.35)]",
    card:
      "bg-[#16161C] border border-[#2C292A] rounded-[16px] hover:border-[#3F3E41] hover:shadow-[0_16px_40px_rgba(0,0,0,0.6)] hover:-translate-y-[3px] transition-all duration-[250ms]",
    glass: "bg-[#16161C]/[0.75] border border-white/[0.06] backdrop-blur-[14px]",
    gridFade:
      "bg-[image:linear-gradient(rgba(107,88,214,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(107,88,214,0.10)_1px,transparent_1px)] bg-[length:44px_44px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black_40%,transparent_90%)]",
  };

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#040507] font-['Inter'] text-white antialiased">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* ---------------- NAV ---------------- */}
      <header className={`sticky top-0 z-50 border-b border-[#202126] ${CX.glass}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" width={40} height={40} alt="Logo" />

            <div>
              <h2 className="font-bold text-sm tracking-wide"> OPEN ARENA </h2>
              <p className="text-xs tracking-[0.35em] text-violet-500"> TOURNAMENTS </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => { router.push('/signin') }}
              className="cursor-pointer text-xs font-medium text-[#C8C8D0] transition-colors duration-150 hover:text-white focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(107,88,214,0.35)] sm:text-sm"
            >
              Sign in
            </button>
          </div>
        </div>
      </header>

      {/* ---------------- HERO ---------------- */}
      <section className="relative overflow-hidden">
        <div className={`pointer-events-none absolute inset-0 h-100 sm:h-130 lg:h-160 ${CX.gridFade}`} />
        <div className="pointer-events-none absolute left-1/2 -top-32 h-70 w-70 -translate-x-1/2 rounded-full bg-[#6B58D6]/25 blur-[90px] sm:-top-45 sm:h-120 sm:w-195 sm:blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-4 pb-8 pt-10 sm:px-6 sm:pb-10 sm:pt-16 lg:pt-24">
          <div
            className={`mx-auto flex max-w-3xl flex-col items-center text-center transition-all duration-700 ${mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
          >

            <h1 className="font-['Rajdhani'] text-[32px] font-bold leading-[1.1] tracking-tight sm:text-[44px] sm:leading-[1.05] lg:text-[64px]">
              Every kill counts.
              <br />
              <span className="text-[#A79FFF]">Every win pays out.</span>
            </h1>

            <p className="mt-4 max-w-xl px-2 text-sm leading-relaxed text-[#9A9AA3] sm:mt-5 sm:px-0 sm:text-[16px]">
              Open Arena hosts verified BGMI and Free Fire tournaments with real prize pools,
              instant room codes, and payouts that land before your next match starts.
            </p>

            <div className="mt-6 flex w-full flex-col gap-3 sm:mt-8 sm:w-auto sm:flex-row">
              <button
                onClick={() => router.push('/signin')}
                className={`${CX.btnPrimary} flex w-full cursor-pointer items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold sm:w-auto`}
              >
                <Trophy className="h-4 w-4" />
                Browse tournaments
              </button>
            </div>
          </div>

          {/* Stats strip */}
          <div className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-xl bg-[#202126] sm:mt-16 sm:grid-cols-4 sm:rounded-2xl">
            {STATS.map((s) => (
              <div key={s.label} className="bg-[#0A0C0F] px-3 py-4 text-center sm:px-5 sm:py-5">
                <p className="font-['Rajdhani'] text-xl font-bold sm:text-2xl lg:text-3xl">{s.value}</p>
                <p className="mt-1 text-[10px] uppercase leading-tight tracking-wide text-[#6C6D73] sm:text-[11px]">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- GAMES ---------------- */}
      <section id="games" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="mb-6 flex items-end justify-between sm:mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A79FFF]">Supported titles</p>
            <h2 className="mt-2 font-['Rajdhani'] text-2xl font-bold sm:text-3xl">Compete in the games you play</h2>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {GAMES.map((g) => (
            <div key={g.name} className={`${CX.card} group relative overflow-hidden p-4 sm:p-5`}>
              <p className="text-[9px] tracking-[0.12em] text-[#6C6D73] sm:text-[10px] sm:tracking-[0.15em]">{g.tag}</p>
              <p className="mt-2 font-['Rajdhani'] text-lg font-bold sm:text-xl">{g.name}</p>
              <div className="mt-3 flex items-center gap-1 text-xs font-medium text-[#9A9AA3] transition-colors duration-150 group-hover:text-white sm:mt-4">
                View tournaments <ArrowRight className="h-3 w-3" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- HOW IT WORKS ---------------- */}
      <section id="how-it-works" className="border-y border-[#202126] bg-[#0A0C0F]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="mb-10 text-center sm:mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A79FFF]">The loop</p>
            <h2 className="mt-2 font-['Rajdhani'] text-2xl font-bold sm:text-3xl lg:text-4xl">From lobby to payout</h2>
            <p className="mx-auto mt-3 max-w-md px-2 text-sm text-[#9A9AA3] sm:px-0">
              Three steps stand between you and a wallet top-up. No middlemen, no waiting on admins.
            </p>
          </div>

          <div className="relative grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="pointer-events-none absolute left-0 right-0 top-8 hidden h-px bg-[#202126] md:block" />
            {STEPS.map((s, i) => (
              <div key={s.n} className="relative">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px] border border-[#6B58D6]/30 bg-[#6B58D6]/10 sm:h-14 sm:w-14">
                    <s.icon className="h-5 w-5 text-[#A79FFF] sm:h-6 sm:w-6" strokeWidth={2} />
                  </div>
                  <p className="font-['Rajdhani'] text-xs font-bold tracking-[0.2em] text-[#6C6D73] sm:tracking-[0.25em]">
                    STEP 0{i + 1} · {s.n}
                  </p>
                </div>
                <h3 className="mt-4 font-['Rajdhani'] text-lg font-bold sm:text-xl">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#9A9AA3]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- TRUST / LEADERBOARD TEASER ---------------- */}
      <section id="leaderboard" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A79FFF]">Fair play, always</p>
          <h2 className="mt-2 font-['Rajdhani'] text-2xl font-bold sm:text-3xl lg:text-4xl">
            Every match is verified.
            <br /> Every payout is guaranteed.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#9A9AA3]">
            Results are cross-checked against in-game screenshots before a rupee moves. Flag a
            dispute and our team resolves it within the hour — not the next business day.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {[
              { icon: ShieldCheck, title: "Anti-cheat checks", desc: "Every top finisher, screened" },
              { icon: Timer, title: "10-min payouts", desc: "From results to wallet" },
              { icon: Zap, title: "Zero entry lag", desc: "Slots confirm instantly" },
              { icon: Users, title: "18,600+ players", desc: "Active this season" },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-[#22C55E]" />
                <div>
                  <p className="text-sm font-semibold">{item.title}</p>
                  <p className="text-xs text-[#6C6D73]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- FINAL CTA ---------------- */}
      <section className="relative mx-4 mb-4 overflow-hidden rounded-2xl border border-[#6B58D6]/25 bg-[linear-gradient(135deg,#1C1D23,#0A0C0F)] px-5 py-10 text-center sm:mx-6 sm:mb-6 sm:rounded-3xl sm:px-8 sm:py-16 lg:mx-auto lg:max-w-7xl">
        <div className={`pointer-events-none absolute inset-0 ${CX.gridFade}`} />
        <div className="relative">
          <h2 className="font-['Rajdhani'] text-2xl font-bold sm:text-3xl lg:text-4xl">Your next W is one lobby away</h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-[#9A9AA3]">
            Create your squad, pick a bracket, and drop in. Registration takes less time than a loading screen.
          </p>
          <button
            onClick={() => router.push('/signin')}
            className={`${CX.btnPrimary} mx-auto mt-6 flex w-full cursor-pointer items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold sm:mt-7 sm:w-fit`}
          >
            <Trophy className="h-4 w-4" />
            Join your first tournament
          </button>
        </div>
      </section>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="border-t border-[#202126]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-center sm:flex-row sm:gap-4 sm:px-6 sm:py-8 sm:text-left">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#6B58D6]">
              <Swords className="h-3.5 w-3.5" strokeWidth={2.5} />
            </div>
            <p className="font-['Rajdhani'] text-sm font-bold">OPEN ARENA</p>
          </div>
          <p className="text-xs text-[#6C6D73]">© 2026 Open Arena Tournaments. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}