"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Swords, Brain, Trophy, Zap, ChevronRight, Activity } from "lucide-react";
import { useEffect, useState } from "react";

const ACTIVITIES = [
  "⚔️ NightCoder defeated ByteKing in a Hard battle",
  "🏆 PixelDev reached Diamond rank!",
  "🔥 SyntaxNinja is on a 7-win streak",
  "⚡ CodePhoenix solved 5 questions in 45s",
  "🎯 BinaryWolf just aced a Medium battle",
  "💀 ReactMaster crushed AlgoQueen 5-2",
  "🚀 DevStorm climbed to #3 on the leaderboard",
];

const FEATURES = [
  {
    icon: Swords,
    title: "Battle Mode",
    desc: "1v1 real-time quiz battles",
    color: "from-purple-500 to-pink-500",
    glow: "rgba(168,85,247,0.15)",
    href: "/arena",
  },
  {
    icon: Brain,
    title: "Practice",
    desc: "85+ curated coding questions",
    color: "from-blue-500 to-cyan-400",
    glow: "rgba(59,130,246,0.15)",
    href: "/problems",
  },
  {
    icon: Trophy,
    title: "Leaderboard",
    desc: "Climb ranks & earn ELO",
    color: "from-amber-400 to-orange-500",
    glow: "rgba(245,158,11,0.15)",
    href: "/leaderboard",
  },
];

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target]);
  return <span>{count.toLocaleString()}{suffix}</span>;
}

export default function HomePage() {
  const [activityIdx, setActivityIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActivityIdx((i) => (i + 1) % ACTIVITIES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* ── Animated Background ── */}
      <div className="fixed inset-0 grid-bg pointer-events-none" />

      {/* Floating orbs */}
      <div className="fixed top-[15%] left-[20%] w-[300px] h-[300px] bg-purple-600/20 rounded-full blur-[120px] animate-breathe pointer-events-none" />
      <div className="fixed top-[60%] right-[15%] w-[250px] h-[250px] bg-pink-500/15 rounded-full blur-[100px] animate-breathe pointer-events-none" style={{ animationDelay: "2s" }} />
      <div className="fixed top-[40%] left-[60%] w-[200px] h-[200px] bg-blue-500/10 rounded-full blur-[100px] animate-breathe pointer-events-none" style={{ animationDelay: "4s" }} />

      {/* Orbiting dots */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="animate-orbit">
          <div className="w-1.5 h-1.5 bg-purple-400/40 rounded-full" />
        </div>
      </div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ animationDelay: "7s" }}>
        <div className="animate-orbit" style={{ animationDuration: "25s", animationDelay: "5s" }}>
          <div className="w-1 h-1 bg-pink-400/30 rounded-full" />
        </div>
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-20">

        {/* Live activity ticker */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] text-xs text-gray-400">
            <Activity className="w-3 h-3 text-green-400 animate-pulse" />
            <motion.span
              key={activityIdx}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              {ACTIVITIES[activityIdx]}
            </motion.span>
          </div>
        </motion.div>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12"
        >
          {/* Animated icon */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-20 h-20 mx-auto mb-8"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl rotate-6 opacity-80 blur-sm" />
            <div className="relative w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-[0_0_60px_rgba(168,85,247,0.35)]">
              <Zap className="w-10 h-10 text-white drop-shadow-lg" />
            </div>
          </motion.div>

          <h1 className="text-6xl sm:text-8xl font-black text-white mb-4 tracking-tighter leading-none">
            Code
            <span className="relative">
              <span className="text-glow">Arena</span>
              <motion.span
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
              />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-500 text-base sm:text-lg max-w-md mx-auto leading-relaxed"
          >
            Battle developers in real-time coding quizzes.
            <br className="hidden sm:block" />
            Pick your difficulty. Win ELO. Climb the ranks.
          </motion.p>
        </motion.div>

        {/* Feature cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 w-full max-w-2xl mb-12"
        >
          {FEATURES.map((feat, i) => (
            <motion.div
              key={feat.title}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Link
                href={feat.href}
                className="glow-card group block p-5 sm:p-6 transition-all duration-300 hover:shadow-xl"
                style={{ boxShadow: `0 0 0px ${feat.glow}` }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 40px ${feat.glow}`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0px ${feat.glow}`;
                }}
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${feat.color} flex items-center justify-center mb-3 shadow-lg`}>
                  <feat.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-white font-bold text-sm mb-1">{feat.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{feat.desc}</p>
                <div className="mt-3 flex items-center gap-1 text-[11px] text-gray-600 group-hover:text-purple-400 transition-colors">
                  Enter <ChevronRight className="w-3 h-3" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Animated stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex items-center gap-8 sm:gap-12"
        >
          {[
            { label: "Questions", value: 85, suffix: "+" },
            { label: "Players", value: 10000, suffix: "+" },
            { label: "Battles Today", value: 847, suffix: "" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-xl sm:text-2xl font-black text-white font-mono">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-[10px] sm:text-xs text-gray-600 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-10"
        >
          <Link
            href="/arena"
            className="game-btn-primary inline-flex items-center gap-2 text-base px-8 py-4 group"
          >
            <Swords className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            Start Battle
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
