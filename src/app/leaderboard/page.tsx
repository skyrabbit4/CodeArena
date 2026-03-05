"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { getRankColor, type User } from "@/types";
import { getWinRate } from "@/lib/utils";
import { Trophy, TrendingUp, TrendingDown, Minus, Crown, Medal } from "lucide-react";

const LEADERBOARD: (User & { change: number })[] = [
  { id: "1", username: "AlgoGod", displayName: "Algo God", elo: 2456, rank: "Grandmaster", wins: 342, losses: 45, draws: 12, totalBattles: 399, winStreak: 18, bestStreak: 25, questionsAnswered: 512, change: 15 },
  { id: "2", username: "ByteQueen", displayName: "Byte Queen", elo: 2312, rank: "Grandmaster", wins: 298, losses: 67, draws: 8, totalBattles: 373, winStreak: 5, bestStreak: 20, questionsAnswered: 445, change: 22 },
  { id: "3", username: "NeuralNinja", displayName: "Neural Ninja", elo: 2198, rank: "Master", wins: 256, losses: 89, draws: 15, totalBattles: 360, winStreak: 12, bestStreak: 16, questionsAnswered: 389, change: -8 },
  { id: "4", username: "StackSurfer", displayName: "Stack Surfer", elo: 2089, rank: "Master", wins: 234, losses: 98, draws: 10, totalBattles: 342, winStreak: 3, bestStreak: 14, questionsAnswered: 367, change: 5 },
  { id: "5", username: "RecursionKing", displayName: "Recursion King", elo: 1987, rank: "Diamond", wins: 198, losses: 112, draws: 7, totalBattles: 317, winStreak: 8, bestStreak: 13, questionsAnswered: 312, change: 0 },
  { id: "6", username: "HashMapHero", displayName: "HashMap Hero", elo: 1876, rank: "Diamond", wins: 178, losses: 95, draws: 14, totalBattles: 287, winStreak: 2, bestStreak: 11, questionsAnswered: 289, change: -12 },
  { id: "7", username: "TreeTraverser", displayName: "Tree Traverser", elo: 1756, rank: "Platinum", wins: 156, losses: 104, draws: 9, totalBattles: 269, winStreak: 6, bestStreak: 10, questionsAnswered: 256, change: 18 },
  { id: "8", username: "DPMaster", displayName: "DP Master", elo: 1689, rank: "Platinum", wins: 145, losses: 110, draws: 11, totalBattles: 266, winStreak: 4, bestStreak: 9, questionsAnswered: 234, change: 7 },
  { id: "9", username: "GraphWizard", displayName: "Graph Wizard", elo: 1623, rank: "Platinum", wins: 134, losses: 98, draws: 6, totalBattles: 238, winStreak: 1, bestStreak: 8, questionsAnswered: 210, change: -5 },
  { id: "10", username: "BinaryBeast", displayName: "Binary Beast", elo: 1567, rank: "Gold", wins: 123, losses: 89, draws: 13, totalBattles: 225, winStreak: 9, bestStreak: 15, questionsAnswered: 198, change: 10 },
];

function getPositionIcon(pos: number) {
  if (pos === 1) return <Crown className="w-5 h-5 text-arena-neon-yellow" />;
  if (pos === 2) return <Medal className="w-5 h-5 text-arena-silver" />;
  if (pos === 3) return <Medal className="w-5 h-5 text-arena-bronze" />;
  return <span className="text-sm font-bold text-gray-500">#{pos}</span>;
}

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen grid-bg py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-black text-white mb-3">
            <span className="text-gradient">Leaderboard</span>
          </h1>
          <p className="text-gray-400">Top players ranked by ELO rating</p>
        </motion.div>

        {/* Top 3 Podium */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-end justify-center gap-4 mb-12"
        >
          {[LEADERBOARD[1], LEADERBOARD[0], LEADERBOARD[2]].map((player, i) => {
            const pos = [2, 1, 3][i];
            const heights = ["h-28", "h-36", "h-24"];
            const colors = [
              "from-arena-silver/20 to-gray-500/20",
              "from-arena-neon-yellow/20 to-orange-500/20",
              "from-arena-bronze/20 to-amber-700/20",
            ];
            return (
              <div key={player.id} className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-arena-accent to-arena-neon-pink flex items-center justify-center text-lg font-bold text-white mb-2">
                  {player.username[0]}
                </div>
                <p className="text-sm font-bold text-white">{player.username}</p>
                <p className="text-xs font-mono mb-2" style={{ color: getRankColor(player.rank) }}>
                  {player.elo} ELO
                </p>
                <div className={cn(
                  "w-24 rounded-t-xl bg-gradient-to-b flex items-start justify-center pt-3",
                  heights[i],
                  colors[i]
                )}>
                  <span className="text-2xl font-black text-white">#{pos}</span>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Full Rankings Table */}
        <div className="glass-card overflow-hidden">
          <div className="grid grid-cols-[60px_1fr_100px_100px_80px_80px] gap-4 px-6 py-3 border-b border-arena-border/50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <span>Rank</span>
            <span>Player</span>
            <span className="text-center">ELO</span>
            <span className="text-center">Win Rate</span>
            <span className="text-center">Battles</span>
            <span className="text-center">Change</span>
          </div>
          {LEADERBOARD.map((player, i) => (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.05 }}
              className={cn(
                "grid grid-cols-[60px_1fr_100px_100px_80px_80px] gap-4 px-6 py-4 items-center hover:bg-white/[0.02] transition-colors",
                i < LEADERBOARD.length - 1 && "border-b border-arena-border/20"
              )}
            >
              <div className="flex items-center justify-center">
                {getPositionIcon(i + 1)}
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-arena-accent/20 to-arena-neon-pink/20 flex items-center justify-center text-sm font-bold text-white">
                  {player.username[0]}
                </div>
                <div>
                  <p className="font-semibold text-white">{player.username}</p>
                  <p className="text-xs font-mono" style={{ color: getRankColor(player.rank) }}>
                    {player.rank}
                  </p>
                </div>
              </div>
              <p className="text-center font-bold font-mono text-white">{player.elo}</p>
              <p className="text-center font-bold text-arena-success">
                {getWinRate(player.wins, player.totalBattles)}%
              </p>
              <p className="text-center text-sm text-gray-400">{player.totalBattles}</p>
              <div className="flex items-center justify-center gap-1">
                {player.change > 0 ? (
                  <span className="text-arena-success text-sm font-bold flex items-center gap-0.5">
                    <TrendingUp className="w-3 h-3" /> +{player.change}
                  </span>
                ) : player.change < 0 ? (
                  <span className="text-arena-danger text-sm font-bold flex items-center gap-0.5">
                    <TrendingDown className="w-3 h-3" /> {player.change}
                  </span>
                ) : (
                  <span className="text-gray-500 text-sm flex items-center gap-0.5">
                    <Minus className="w-3 h-3" /> 0
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
