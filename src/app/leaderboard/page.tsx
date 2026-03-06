"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { getRankColor, type User } from "@/types";
import { getWinRate } from "@/lib/utils";

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

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen grid-bg py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-black text-gradient mb-1">Leaderboard</h1>
          <p className="text-gray-600 text-sm">Top players by ELO</p>
        </motion.div>

        {/* Clean List */}
        <div className="space-y-1">
          {LEADERBOARD.map((player, i) => (
            <motion.div
              key={player.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: Math.min(i * 0.03, 0.3) }}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/[0.03] transition-colors duration-200"
            >
              <span className={cn(
                "w-6 text-center text-xs font-bold shrink-0",
                i < 3 ? "text-violet-400" : "text-gray-600"
              )}>
                {i + 1}
              </span>

              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500/20 to-emerald-500/20 flex items-center justify-center text-xs font-bold text-white shrink-0">
                {player.username[0]}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-300 truncate">{player.username}</p>
              </div>

              <span className="text-[10px] font-mono" style={{ color: getRankColor(player.rank) }}>
                {player.rank}
              </span>

              <span className="text-sm font-bold font-mono text-white w-12 text-right">
                {player.elo}
              </span>

              <span className={cn(
                "text-[10px] font-bold w-8 text-right",
                player.change > 0 ? "text-emerald-400" : player.change < 0 ? "text-red-400" : "text-gray-600"
              )}>
                {player.change > 0 ? `+${player.change}` : player.change}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
