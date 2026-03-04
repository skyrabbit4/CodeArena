"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useGameStore } from "@/store/game-store";
import { getRankColor, getDifficultyColor } from "@/types";
import { getWinRate, formatNumber } from "@/lib/utils";
import {
  Swords,
  Trophy,
  Code2,
  BarChart3,
  Zap,
  TrendingUp,
  Target,
  Flame,
  ChevronRight,
  Play,
  Users,
  Clock,
  Star,
} from "lucide-react";

const LIVE_BATTLES = [
  { id: 1, p1: "NinjaCode", p2: "ByteKing", p1Elo: 1820, p2Elo: 1756, problem: "LRU Cache", difficulty: "HARD" as const, time: "8:34" },
  { id: 2, p1: "AlgoQueen", p2: "StackMaster", p1Elo: 2105, p2Elo: 1980, problem: "Merge Intervals", difficulty: "MEDIUM" as const, time: "12:01" },
  { id: 3, p1: "RustLord", p2: "PyWizard", p1Elo: 1445, p2Elo: 1510, problem: "Two Sum", difficulty: "EASY" as const, time: "3:22" },
];

const STATS = [
  { label: "Active Players", value: "12.4K", icon: Users, color: "text-arena-neon" },
  { label: "Live Battles", value: "847", icon: Swords, color: "text-arena-neon-pink" },
  { label: "Problems Solved Today", value: "23.1K", icon: Code2, color: "text-arena-accent-light" },
  { label: "Tournaments This Week", value: "12", icon: Trophy, color: "text-arena-neon-yellow" },
];

export default function HomePage() {
  const { currentUser } = useGameStore();

  return (
    <div className="min-h-screen grid-bg">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-arena-accent/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-arena-neon/5 rounded-full blur-[120px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-arena-accent/10 border border-arena-accent/20 text-arena-accent-light text-sm font-medium mb-6">
              <Flame className="w-4 h-4 text-arena-neon-pink" />
              Season 3 is Live — New Tournament Starting Soon
            </div>

            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
              <span className="text-white">Code.</span>{" "}
              <span className="text-gradient">Battle.</span>{" "}
              <span className="text-white">Conquer.</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
              Real-time competitive coding battles against developers worldwide.
              Climb the ranks, join tournaments, and prove you{"'"}re the best.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/arena"
                className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-arena-accent to-purple-500 rounded-xl font-bold text-white hover:shadow-[0_0_30px_rgba(108,92,231,0.4)] transition-all hover:scale-105"
              >
                <Swords className="w-5 h-5" />
                Enter the Arena
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/problems"
                className="flex items-center gap-2 px-8 py-4 glass-card font-semibold text-gray-300 hover:text-white hover:border-arena-accent/50 transition-all"
              >
                <Code2 className="w-5 h-5" />
                Practice Problems
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Live Stats Bar */}
      <section className="border-y border-arena-border/50 bg-arena-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Player Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card p-6 neon-border"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-arena-accent to-arena-neon-pink flex items-center justify-center text-2xl font-bold text-white">
                {currentUser.username[0]}
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{currentUser.displayName}</h3>
                <p className="text-sm font-mono font-bold" style={{ color: getRankColor(currentUser.rank) }}>
                  {currentUser.rank} • {currentUser.elo} ELO
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-3 rounded-xl bg-white/5">
                <p className="text-lg font-bold text-arena-success">{currentUser.wins}</p>
                <p className="text-xs text-gray-500">Wins</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-white/5">
                <p className="text-lg font-bold text-arena-danger">{currentUser.losses}</p>
                <p className="text-xs text-gray-500">Losses</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-white/5">
                <p className="text-lg font-bold text-arena-neon-yellow">
                  {getWinRate(currentUser.wins, currentUser.totalBattles)}%
                </p>
                <p className="text-xs text-gray-500">Win Rate</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400 flex items-center gap-2">
                  <Flame className="w-4 h-4 text-orange-400" /> Win Streak
                </span>
                <span className="font-bold text-white">{currentUser.winStreak} 🔥</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400 flex items-center gap-2">
                  <Star className="w-4 h-4 text-arena-neon-yellow" /> Best Streak
                </span>
                <span className="font-bold text-white">{currentUser.bestStreak}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400 flex items-center gap-2">
                  <Target className="w-4 h-4 text-arena-neon" /> Problems Solved
                </span>
                <span className="font-bold text-white">{currentUser.problemsSolved}</span>
              </div>
            </div>

            <Link
              href="/arena"
              className="mt-6 w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-arena-accent to-purple-500 rounded-xl font-bold text-white hover:shadow-[0_0_20px_rgba(108,92,231,0.3)] transition-all"
            >
              <Play className="w-4 h-4" />
              Quick Match
            </Link>
          </motion.div>

          {/* Live Battles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-2 glass-card p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                Live Battles
              </h2>
              <Link
                href="/arena"
                className="text-sm text-arena-accent-light hover:text-arena-accent flex items-center gap-1"
              >
                View All <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="space-y-4">
              {LIVE_BATTLES.map((battle, i) => (
                <motion.div
                  key={battle.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                  className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-arena-border/30 hover:border-arena-accent/30 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center text-sm font-bold text-blue-400">
                        {battle.p1[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-white text-sm">{battle.p1}</p>
                        <p className="text-xs text-gray-500">{battle.p1Elo} ELO</p>
                      </div>
                    </div>

                    <div className="flex flex-col items-center px-4">
                      <span className="text-xs font-bold text-arena-neon-pink">VS</span>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {battle.time}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 flex-1 justify-end">
                      <div className="text-right">
                        <p className="font-semibold text-white text-sm">{battle.p2}</p>
                        <p className="text-xs text-gray-500">{battle.p2Elo} ELO</p>
                      </div>
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500/20 to-red-600/20 flex items-center justify-center text-sm font-bold text-red-400">
                        {battle.p2[0]}
                      </div>
                    </div>
                  </div>

                  <div className="ml-4 pl-4 border-l border-arena-border/30">
                    <p className="text-xs text-gray-400">{battle.problem}</p>
                    <p
                      className="text-xs font-bold"
                      style={{ color: getDifficultyColor(battle.difficulty) }}
                    >
                      {battle.difficulty}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-3xl font-bold text-center text-white mb-12"
        >
          Why <span className="text-gradient">CodeArena</span>?
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Swords,
              title: "Real-Time Battles",
              desc: "Go head-to-head with opponents in live coding duels. Same problem, same time limit — may the best coder win.",
              color: "from-arena-accent/20 to-purple-500/20",
            },
            {
              icon: TrendingUp,
              title: "ELO Rankings",
              desc: "Competitive rating system inspired by chess. Climb from Bronze to Grandmaster and earn your place among the elite.",
              color: "from-arena-neon/20 to-teal-500/20",
            },
            {
              icon: Trophy,
              title: "Tournaments & Leagues",
              desc: "Join weekly tournaments, form teams, and compete in seasonal leagues with prizes and glory.",
              color: "from-arena-neon-yellow/20 to-orange-500/20",
            },
          ].map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
              className="glass-card p-8 hover:border-arena-accent/30 transition-all group"
            >
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}
              >
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
