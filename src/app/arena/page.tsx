"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/store/game-store";
import { cn } from "@/lib/utils";
import { formatTime } from "@/lib/utils";
import { getRankColor, getDifficultyColor } from "@/types";
import {
  Swords,
  Zap,
  Shield,
  Trophy,
  Target,
  Clock,
  Search,
  X,
  Loader2,
  Sparkles,
} from "lucide-react";

const MODES = [
  {
    id: "RANKED",
    name: "Ranked",
    desc: "Compete for ELO points",
    icon: TrophyIcon,
    color: "from-arena-accent to-purple-500",
    borderColor: "border-arena-accent/30",
  },
  {
    id: "CASUAL",
    name: "Casual",
    desc: "Practice without pressure",
    icon: ShieldIcon,
    color: "from-arena-neon to-teal-500",
    borderColor: "border-arena-neon/30",
  },
  {
    id: "PRACTICE",
    name: "Solo",
    desc: "Solve at your own pace",
    icon: TargetIcon,
    color: "from-arena-neon-yellow to-orange-500",
    borderColor: "border-arena-neon-yellow/30",
  },
];

const DIFFICULTIES = [
  { id: "EASY", label: "Easy", color: "#00b894" },
  { id: "MEDIUM", label: "Medium", color: "#fdcb6e" },
  { id: "HARD", label: "Hard", color: "#e17055" },
  { id: "EXPERT", label: "Expert", color: "#f72585" },
];

function TrophyIcon(props: any) { return <Trophy {...props} />; }
function ShieldIcon(props: any) { return <Shield {...props} />; }
function TargetIcon(props: any) { return <Target {...props} />; }

export default function ArenaPage() {
  const router = useRouter();
  const {
    currentUser,
    isSearching,
    searchTime,
    startSearching,
    stopSearching,
    updateSearchTime,
    currentBattle,
    selectedMode,
    selectedDifficulty,
  } = useGameStore();

  const [mode, setMode] = useState("RANKED");
  const [difficulty, setDifficulty] = useState("MEDIUM");

  useEffect(() => {
    if (!isSearching) return;
    const interval = setInterval(() => {
      updateSearchTime();
    }, 1000);
    return () => clearInterval(interval);
  }, [isSearching, updateSearchTime]);

  useEffect(() => {
    if (currentBattle) {
      router.push(`/battle/${currentBattle.id}`);
    }
  }, [currentBattle, router]);

  const handleFindMatch = () => {
    startSearching(mode, difficulty);
  };

  return (
    <div className="min-h-screen grid-bg py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-black text-white mb-3">
            <span className="text-gradient">Battle Arena</span>
          </h1>
          <p className="text-gray-400">Choose your mode and find an opponent</p>
        </motion.div>

        {/* Mode Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {MODES.map((m, i) => {
            const Icon = m.icon;
            return (
              <motion.button
                key={m.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setMode(m.id)}
                className={cn(
                  "glass-card p-6 text-left transition-all hover:scale-[1.02]",
                  mode === m.id
                    ? `${m.borderColor} neon-glow`
                    : "border-arena-border/30 hover:border-arena-border"
                )}
              >
                <div className={cn(
                  "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center mb-4",
                  m.color
                )}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white">{m.name}</h3>
                <p className="text-sm text-gray-400 mt-1">{m.desc}</p>
              </motion.button>
            );
          })}
        </div>

        {/* Difficulty */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-6 mb-8"
        >
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Difficulty
          </h3>
          <div className="flex flex-wrap gap-3">
            {DIFFICULTIES.map((d) => (
              <button
                key={d.id}
                onClick={() => setDifficulty(d.id)}
                className={cn(
                  "px-5 py-2.5 rounded-xl text-sm font-bold transition-all",
                  difficulty === d.id
                    ? "text-white scale-105"
                    : "bg-white/5 text-gray-400 hover:bg-white/10"
                )}
                style={
                  difficulty === d.id
                    ? { backgroundColor: d.color + "30", color: d.color, boxShadow: `0 0 20px ${d.color}30` }
                    : {}
                }
              >
                {d.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Find Match Button */}
        <AnimatePresence mode="wait">
          {!isSearching ? (
            <motion.button
              key="find"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={handleFindMatch}
              className="w-full py-5 bg-gradient-to-r from-arena-accent to-purple-500 rounded-2xl font-black text-xl text-white flex items-center justify-center gap-3 hover:shadow-[0_0_40px_rgba(108,92,231,0.4)] transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Swords className="w-6 h-6" />
              {mode === "PRACTICE" ? "Start Practice" : "Find Opponent"}
            </motion.button>
          ) : (
            <motion.div
              key="searching"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-card p-8 text-center animate-battle-pulse"
            >
              <div className="flex items-center justify-center mb-4">
                <div className="relative">
                  <Loader2 className="w-16 h-16 text-arena-accent animate-spin" />
                  <Sparkles className="w-6 h-6 text-arena-neon absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Searching for opponent...
              </h3>
              <p className="text-gray-400 mb-1">
                {mode} • {difficulty} • {formatTime(searchTime)}
              </p>
              <p className="text-xs text-gray-500 mb-6">
                ELO Range: {currentUser.elo - 200} - {currentUser.elo + 200}
              </p>
              <button
                onClick={stopSearching}
                className="px-6 py-2.5 bg-white/5 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-2 mx-auto"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 grid grid-cols-3 gap-4"
        >
          <div className="glass-card p-4 text-center">
            <p className="text-2xl font-bold text-white">847</p>
            <p className="text-xs text-gray-500">Players Online</p>
          </div>
          <div className="glass-card p-4 text-center">
            <p className="text-2xl font-bold text-arena-neon">~12s</p>
            <p className="text-xs text-gray-500">Avg. Queue Time</p>
          </div>
          <div className="glass-card p-4 text-center">
            <p className="text-2xl font-bold text-arena-neon-yellow">234</p>
            <p className="text-xs text-gray-500">Active Battles</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
