"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { type User } from "@/types";
import { Trophy } from "lucide-react";

const PLAYERS: (User & { change: number })[] = [
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

const MEDALS = ["🥇", "🥈", "🥉"];

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen dot-bg py-8 sm:py-12">
      <div className="max-w-md mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 mb-6"
        >
          <Trophy className="w-5 h-5 text-yellow-500" />
          <h1 className="text-2xl font-black text-white">Rankings</h1>
        </motion.div>

        <div className="space-y-1">
          {PLAYERS.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: Math.min(i * 0.04, 0.3) }}
              className={cn(
                "flex items-center gap-3 px-3 py-3 rounded-xl transition-colors",
                i < 3 ? "bg-white/[0.03]" : "hover:bg-white/[0.02]"
              )}
            >
              {/* Rank */}
              <span className="w-7 text-center text-sm shrink-0">
                {i < 3 ? MEDALS[i] : <span className="text-gray-600 text-xs font-bold">{i + 1}</span>}
              </span>

              {/* Avatar */}
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0",
                i === 0 ? "bg-yellow-500/20 text-yellow-400" :
                i === 1 ? "bg-gray-400/20 text-gray-300" :
                i === 2 ? "bg-orange-500/20 text-orange-400" :
                "bg-purple-500/10 text-purple-300"
              )}>
                {p.username[0]}
              </div>

              {/* Name */}
              <span className="flex-1 text-sm font-medium text-gray-300 truncate">
                {p.username}
              </span>

              {/* ELO */}
              <span className="text-sm font-bold font-mono text-white">{p.elo}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
