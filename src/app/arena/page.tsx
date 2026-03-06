"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/store/game-store";
import { cn } from "@/lib/utils";
import { formatTime } from "@/lib/utils";
import { Swords, X, Loader2, Sparkles } from "lucide-react";

const DIFFICULTIES = [
  { id: "EASY", label: "Easy", color: "#10b981" },
  { id: "MEDIUM", label: "Medium", color: "#f59e0b" },
  { id: "HARD", label: "Hard", color: "#ef4444" },
];

export default function ArenaPage() {
  const router = useRouter();
  const {
    isSearching,
    searchTime,
    startSearching,
    stopSearching,
    updateSearchTime,
    currentBattle,
  } = useGameStore();

  const [difficulty, setDifficulty] = useState("MEDIUM");

  useEffect(() => {
    if (!isSearching) return;
    const interval = setInterval(() => updateSearchTime(), 1000);
    return () => clearInterval(interval);
  }, [isSearching, updateSearchTime]);

  useEffect(() => {
    if (currentBattle) router.push(`/battle/${currentBattle.id}`);
  }, [currentBattle, router]);

  return (
    <div className="min-h-screen grid-bg flex items-center justify-center">
      <div className="max-w-sm w-full mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-black text-gradient mb-1">Battle Arena</h1>
          <p className="text-gray-600 text-sm">Pick difficulty. Find opponent. Go.</p>
        </motion.div>

        {/* Difficulty */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-2 mb-6"
        >
          {DIFFICULTIES.map((d) => (
            <button
              key={d.id}
              onClick={() => setDifficulty(d.id)}
              className={cn(
                "flex-1 py-3 rounded-xl text-sm font-bold transition-all duration-200",
                difficulty === d.id
                  ? "text-white"
                  : "bg-white/[0.03] text-gray-600 hover:bg-white/[0.06]"
              )}
              style={
                difficulty === d.id
                  ? { backgroundColor: d.color + "25", color: d.color, boxShadow: `0 0 25px ${d.color}15` }
                  : {}
              }
            >
              {d.label}
            </button>
          ))}
        </motion.div>

        {/* Find Match / Searching */}
        <AnimatePresence mode="wait">
          {!isSearching ? (
            <motion.button
              key="find"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={() => startSearching("RANKED", difficulty)}
              className="w-full py-4 bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl font-bold text-white flex items-center justify-center gap-2.5 hover:shadow-[0_0_40px_rgba(124,58,237,0.3)] transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]"
            >
              <Swords className="w-5 h-5" />
              Find Opponent
            </motion.button>
          ) : (
            <motion.div
              key="searching"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-card p-8 text-center animate-battle-pulse"
            >
              <div className="relative w-14 h-14 mx-auto mb-4">
                <Loader2 className="w-14 h-14 text-violet-500 animate-spin" />
                <Sparkles className="w-4 h-4 text-emerald-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
              <h3 className="text-base font-bold text-white mb-1">Searching...</h3>
              <p className="text-sm text-gray-500 font-mono mb-4">{formatTime(searchTime)}</p>
              <button
                onClick={stopSearching}
                className="text-sm text-gray-500 hover:text-white flex items-center gap-1.5 mx-auto transition-colors"
              >
                <X className="w-3.5 h-3.5" /> Cancel
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
