"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/store/game-store";
import { cn } from "@/lib/utils";
import { formatTime } from "@/lib/utils";
import { Swords, X, Loader2 } from "lucide-react";

const DIFF = [
  { id: "EASY", label: "🟢 Easy", color: "#22c55e" },
  { id: "MEDIUM", label: "🟡 Medium", color: "#eab308" },
  { id: "HARD", label: "🔴 Hard", color: "#ef4444" },
];

export default function ArenaPage() {
  const router = useRouter();
  const {
    isSearching, searchTime, startSearching, stopSearching,
    updateSearchTime, currentBattle,
  } = useGameStore();

  const [diff, setDiff] = useState("MEDIUM");

  useEffect(() => {
    if (!isSearching) return;
    const interval = setInterval(() => updateSearchTime(), 1000);
    return () => clearInterval(interval);
  }, [isSearching, updateSearchTime]);

  useEffect(() => {
    if (currentBattle) router.push(`/battle/${currentBattle.id}`);
  }, [currentBattle, router]);

  return (
    <div className="min-h-screen dot-bg flex items-center justify-center px-4">
      <div className="max-w-xs w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-purple-500/10 flex items-center justify-center">
            <Swords className="w-7 h-7 text-purple-400" />
          </div>
          <h1 className="text-2xl font-black text-white">Find a Match</h1>
        </motion.div>

        {/* Difficulty selector */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-2 mb-8"
        >
          {DIFF.map((d) => (
            <button
              key={d.id}
              onClick={() => setDiff(d.id)}
              className={cn(
                "w-full py-3.5 px-4 rounded-2xl text-sm font-bold transition-all duration-200 text-left",
                diff === d.id
                  ? "bg-white/[0.08] text-white ring-2 ring-purple-500/40"
                  : "bg-white/[0.02] text-gray-500 hover:bg-white/[0.05]"
              )}
            >
              {d.label}
            </button>
          ))}
        </motion.div>

        {/* Action */}
        <AnimatePresence mode="wait">
          {!isSearching ? (
            <motion.button
              key="go"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => startSearching("RANKED", diff)}
              className="w-full game-btn-primary py-4 text-base flex items-center justify-center gap-2"
            >
              <Swords className="w-5 h-5" />
              Battle!
            </motion.button>
          ) : (
            <motion.div
              key="searching"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="game-card p-8 text-center animate-neon"
            >
              <Loader2 className="w-10 h-10 text-purple-400 animate-spin mx-auto mb-3" />
              <p className="text-white font-bold mb-1">Finding opponent...</p>
              <p className="text-sm text-gray-500 font-mono mb-4">{formatTime(searchTime)}</p>
              <button
                onClick={stopSearching}
                className="text-xs text-gray-600 hover:text-white flex items-center gap-1 mx-auto transition-colors"
              >
                <X className="w-3 h-3" /> Cancel
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
