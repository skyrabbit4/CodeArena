"use client";

import { motion } from "framer-motion";
import { useGameStore } from "@/store/game-store";
import { getRankColor, RANK_THRESHOLDS } from "@/types";
import { getWinRate } from "@/lib/utils";
import {
  Trophy,
  Swords,
  Target,
  Flame,
  Star,
  TrendingUp,
  Brain,
  Calendar,
  Award,
  Shield,
  Zap,
} from "lucide-react";

const RECENT_MATCHES = [
  { opponent: "ShadowCoder", result: "WIN", eloChange: +22, problem: "Two Sum", time: "4:32" },
  { opponent: "ByteKing", result: "WIN", eloChange: +18, problem: "Valid Parentheses", time: "6:15" },
  { opponent: "AlgoQueen", result: "LOSS", eloChange: -12, problem: "LRU Cache", time: "15:00" },
  { opponent: "RustLord", result: "WIN", eloChange: +25, problem: "Merge Intervals", time: "8:44" },
  { opponent: "PyWizard", result: "WIN", eloChange: +15, problem: "Longest Substring", time: "5:20" },
];

const ACHIEVEMENTS = [
  { name: "First Blood", desc: "Win your first battle", icon: Swords, unlocked: true },
  { name: "On Fire", desc: "5 win streak", icon: Flame, unlocked: true },
  { name: "Quiz Master", desc: "Answer 100 questions", icon: Brain, unlocked: true },
  { name: "Speed Demon", desc: "Solve under 2 minutes", icon: Zap, unlocked: true },
  { name: "Unstoppable", desc: "10 win streak", icon: Star, unlocked: true },
  { name: "Diamond Hands", desc: "Reach Diamond rank", icon: Shield, unlocked: false },
  { name: "Grandmaster", desc: "Reach Grandmaster", icon: Award, unlocked: false },
  { name: "Tournament Victor", desc: "Win a tournament", icon: Trophy, unlocked: false },
];

export default function ProfilePage() {
  const { currentUser } = useGameStore();
  const nextRankEntry = Object.entries(RANK_THRESHOLDS).find(
    ([, { min }]) => min > currentUser.elo
  );
  const nextRank = nextRankEntry ? nextRankEntry[0] : "Grandmaster";
  const nextElo = nextRankEntry ? nextRankEntry[1].min : currentUser.elo;
  const currentRankMin = RANK_THRESHOLDS[currentUser.rank]?.min || 0;
  const progress = ((currentUser.elo - currentRankMin) / (nextElo - currentRankMin)) * 100;

  return (
    <div className="min-h-screen grid-bg py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 mb-8 neon-border"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-arena-accent to-arena-neon-pink flex items-center justify-center text-4xl font-black text-white">
              {currentUser.username[0]}
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-black text-white">{currentUser.displayName}</h1>
              <p className="text-gray-400">@{currentUser.username}</p>
              <div className="flex items-center gap-4 mt-3 justify-center md:justify-start">
                <span
                  className="px-3 py-1 rounded-lg text-sm font-bold"
                  style={{
                    backgroundColor: getRankColor(currentUser.rank) + "20",
                    color: getRankColor(currentUser.rank),
                  }}
                >
                  {currentUser.rank}
                </span>
                <span className="font-mono font-bold text-white">{currentUser.elo} ELO</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center px-4 py-3 rounded-xl bg-white/5">
                <p className="text-2xl font-bold text-arena-success">{currentUser.wins}</p>
                <p className="text-xs text-gray-500">Wins</p>
              </div>
              <div className="text-center px-4 py-3 rounded-xl bg-white/5">
                <p className="text-2xl font-bold text-arena-danger">{currentUser.losses}</p>
                <p className="text-xs text-gray-500">Losses</p>
              </div>
              <div className="text-center px-4 py-3 rounded-xl bg-white/5">
                <p className="text-2xl font-bold text-arena-neon-yellow">
                  {getWinRate(currentUser.wins, currentUser.totalBattles)}%
                </p>
                <p className="text-xs text-gray-500">Win Rate</p>
              </div>
            </div>
          </div>

          {/* Rank Progress */}
          <div className="mt-6">
            <div className="flex items-center justify-between text-sm mb-2">
              <span style={{ color: getRankColor(currentUser.rank) }} className="font-bold">
                {currentUser.rank}
              </span>
              <span className="text-gray-400">{currentUser.elo} / {nextElo}</span>
              <span style={{ color: getRankColor(nextRank) }} className="font-bold">
                {nextRank}
              </span>
            </div>
            <div className="h-3 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-full bg-gradient-to-r from-arena-accent to-arena-neon rounded-full"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {nextElo - currentUser.elo} ELO until {nextRank}
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6"
          >
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-arena-accent" />
              Statistics
            </h2>
            <div className="space-y-4">
              {[
                { label: "Total Battles", value: currentUser.totalBattles, icon: Swords },
                { label: "Questions Answered", value: currentUser.questionsAnswered, icon: Target },
                { label: "Current Streak", value: `${currentUser.winStreak} 🔥`, icon: Flame },
                { label: "Best Streak", value: currentUser.bestStreak, icon: Star },
                { label: "Draws", value: currentUser.draws, icon: Shield },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center justify-between">
                  <span className="text-sm text-gray-400 flex items-center gap-2">
                    <stat.icon className="w-4 h-4" />
                    {stat.label}
                  </span>
                  <span className="font-bold text-white">{stat.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Matches */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6"
          >
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-arena-neon" />
              Recent Matches
            </h2>
            <div className="space-y-3">
              {RECENT_MATCHES.map((match, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02]"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        match.result === "WIN" ? "bg-arena-success" : "bg-arena-danger"
                      }`}
                    />
                    <div>
                      <p className="text-sm font-semibold text-white">
                        vs {match.opponent}
                      </p>
                      <p className="text-xs text-gray-500">{match.problem}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-sm font-bold ${
                        match.result === "WIN"
                          ? "text-arena-success"
                          : "text-arena-danger"
                      }`}
                    >
                      {match.eloChange > 0 ? "+" : ""}
                      {match.eloChange} ELO
                    </p>
                    <p className="text-xs text-gray-500">{match.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-6 mt-8"
        >
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-arena-neon-yellow" />
            Achievements
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {ACHIEVEMENTS.map((achievement) => {
              const Icon = achievement.icon;
              return (
                <div
                  key={achievement.name}
                  className={`p-4 rounded-xl border text-center transition-all ${
                    achievement.unlocked
                      ? "bg-white/[0.03] border-arena-accent/20"
                      : "bg-white/[0.01] border-arena-border/20 opacity-40"
                  }`}
                >
                  <Icon
                    className={`w-8 h-8 mx-auto mb-2 ${
                      achievement.unlocked ? "text-arena-neon-yellow" : "text-gray-600"
                    }`}
                  />
                  <p className="text-sm font-bold text-white">{achievement.name}</p>
                  <p className="text-xs text-gray-500 mt-1">{achievement.desc}</p>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
