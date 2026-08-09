'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Trophy,
  Users,
  Radio,
  Zap,
  ShieldCheck,
  Wallet,
  Crosshair,
  ChevronRight,
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

  const LIVE_MATCHES = [
    { game: "BGMI", name: "Chicken Dinner Cup", perKill: 9, players: 10, cap: 99 },
    { game: "FREE FIRE", name: "Booyah League S4", perKill: 10, players: 30, cap: 99 },
    { game: "BGMI", name: "Erangel Elite Clash", perKill: 10, players: 8, cap: 10 },
    { game: "FREE FIRE", name: "Purgatory Purge", perKill: 10, players: 22, cap: 50 },
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

  function LiveDot() {
    return (
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#EF4444] opacity-75" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#EF4444]" />
      </span>
    );
  }

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <div className="min-h-screen w-full bg-[#040507] font-['Inter'] text-white antialiased">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* ---------------- NAV ---------------- */}
      <header className={`sticky top-0 z-50 border-b border-[#202126] ${CX.glass}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#6B58D6]">
              <Swords className="h-4.5 w-4.5" strokeWidth={2.5} />
            </div>
            <div className="leading-tight">
              <p className="font-['Rajdhani'] text-[17px] font-bold tracking-wide">OPEN ARENA</p>
              <p className="text-[10px] font-semibold tracking-[0.22em] text-[#A79FFF]">TOURNAMENTS</p>
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-sm text-[#9A9AA3] md:flex">
            {["Games", "Live Now", "How it works", "Leaderboard"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s/g, "-")}`}
                className="transition-colors duration-150 hover:text-white"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button onClick={() => { router.push('/signin') }} className="hidden hover:text-white cursor-pointer text-sm font-medium text-[#C8C8D0] focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(107,88,214,0.35)] sm:block">
              Sign in
            </button>
          </div>
        </div>
      </header>

      {/* ---------------- HERO ---------------- */}
      <section className="relative overflow-hidden">
        <div className={`pointer-events-none absolute inset-0 h-160 ${CX.gridFade}`} />
        <div className="pointer-events-none absolute left-1/2 -top-45 h-120 w-195 -translate-x-1/2 rounded-full bg-[#6B58D6]/25 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-6 pb-10 pt-16 sm:pt-24">
          <div
            className={`mx-auto flex max-w-3xl flex-col items-center text-center transition-all duration-700 ${mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
          >

            <h1 className="font-['Rajdhani'] text-[44px] font-bold leading-[1.05] tracking-tight sm:text-[64px]">
              Every kill counts.
              <br />
              <span className="text-[#A79FFF]">Every win pays out.</span>
            </h1>

            <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-[#9A9AA3]">
              Open Arena hosts verified BGMI and Free Fire tournaments with real prize pools,
              instant room codes, and payouts that land before your next match starts.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button onClick={() => router.push('/signin')} className={`${CX.btnPrimary} cursor-pointer flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold`}>
                <Trophy className="h-4 w-4" />
                Browse tournaments
              </button>
            </div>
          </div>

          {/* Stats strip */}
          <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-2xl bg-[#202126] sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="bg-[#0A0C0F] px-5 py-5 text-center">
                <p className="font-['Rajdhani'] text-2xl font-bold sm:text-3xl">{s.value}</p>
                <p className="mt-1 text-[11px] uppercase tracking-wide text-[#6C6D73]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- GAMES ---------------- */}
      <section id="games" className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A79FFF]">Supported titles</p>
            <h2 className="mt-2 font-['Rajdhani'] text-3xl font-bold">Compete in the games you play</h2>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {GAMES.map((g) => (
            <div key={g.name} className={`${CX.card} group relative overflow-hidden p-5`}>
              <p className="text-[10px] tracking-[0.15em] text-[#6C6D73]">{g.tag}</p>
              <p className="mt-2 font-['Rajdhani'] text-xl font-bold">{g.name}</p>
              <div className="mt-4 flex items-center gap-1 text-xs font-medium text-[#9A9AA3] transition-colors duration-150 group-hover:text-white">
                View tournaments <ArrowRight className="h-3 w-3" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- HOW IT WORKS ---------------- */}
      <section id="how-it-works" className="border-y border-[#202126] bg-[#0A0C0F]">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="mb-14 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A79FFF]">The loop</p>
            <h2 className="mt-2 font-['Rajdhani'] text-3xl font-bold sm:text-4xl">From lobby to payout</h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-[#9A9AA3]">
              Three steps stand between you and a wallet top-up. No middlemen, no waiting on admins.
            </p>
          </div>

          <div className="relative grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="pointer-events-none absolute left-0 right-0 top-8 hidden h-px bg-[#202126] md:block" />
            {STEPS.map((s, i) => (
              <div key={s.n} className="relative">
                <div className="flex items-center gap-3">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[10px] border border-[#6B58D6]/30 bg-[#6B58D6]/10">
                    <s.icon className="h-6 w-6 text-[#A79FFF]" strokeWidth={2} />
                  </div>
                  <p className="font-['Rajdhani'] text-xs font-bold tracking-[0.25em] text-[#6C6D73]">
                    STEP 0{i + 1} · {s.n}
                  </p>
                </div>
                <h3 className="mt-4 font-['Rajdhani'] text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#9A9AA3]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- TRUST / LEADERBOARD TEASER ---------------- */}
      <section id="leaderboard" className="mx-auto max-w-7xl px-6 py-20">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A79FFF]">Fair play, always</p>
          <h2 className="mt-2 font-['Rajdhani'] text-3xl font-bold sm:text-4xl">
            Every match is verified.
            <br /> Every payout is guaranteed.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#9A9AA3]">
            Results are cross-checked against in-game screenshots before a rupee moves. Flag a
            dispute and our team resolves it within the hour — not the next business day.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-5">
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
      <section className="relative mx-6 mb-6 overflow-hidden rounded-3xl border border-[#6B58D6]/25 bg-bg-[linear-gradient(135deg,#1C1D23,#0A0C0F)]-8 py-16 text-center sm:mx-auto sm:max-w-7xl">
        <div className={`pointer-events-none absolute inset-0 ${CX.gridFade}`} />
        <div className="relative">
          <h2 className="font-['Rajdhani'] text-3xl font-bold sm:text-4xl">Your next W is one lobby away</h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-[#9A9AA3]">
            Create your squad, pick a bracket, and drop in. Registration takes less time than a loading screen.
          </p>
          <button onClick={() => router.push('/signin')} className={`${CX.btnPrimary} cursor-pointer mx-auto mt-7 flex items-center gap-2 px-8 py-3.5 text-sm font-semibold`}>
            <Trophy className="h-4 w-4" />
            Join your first tournament
          </button>
        </div>
      </section>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="border-t border-[#202126]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
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