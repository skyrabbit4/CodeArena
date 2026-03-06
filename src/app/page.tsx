"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Swords, Brain, Trophy, Zap } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen dot-bg flex items-center justify-center px-4">
      {/* Ambient glow */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative text-center max-w-lg"
      >
        {/* Game icon */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-[0_0_40px_rgba(168,85,247,0.3)]"
        >
          <Zap className="w-8 h-8 text-white" />
        </motion.div>

        <h1 className="text-5xl sm:text-7xl font-black text-white mb-3 tracking-tight">
          Code<span className="text-glow">Arena</span>
        </h1>
        <p className="text-gray-500 text-sm sm:text-base mb-10 max-w-xs mx-auto">
          Battle developers in real-time quiz fights. Pick a difficulty. Win ELO.
        </p>

        {/* Main actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          <Link href="/arena" className="game-btn-primary flex items-center justify-center gap-2 text-base">
            <Swords className="w-5 h-5" />
            Start Battle
          </Link>
          <Link href="/problems" className="game-btn-ghost flex items-center justify-center gap-2 text-base">
            <Brain className="w-5 h-5" />
            Practice
          </Link>
        </div>

        {/* Quick stats — game-like */}
        <div className="flex items-center justify-center gap-6 text-xs text-gray-600">
          <span className="flex items-center gap-1">
            <Trophy className="w-3.5 h-3.5 text-yellow-500" /> 10k+ players
          </span>
          <span className="flex items-center gap-1">
            <Brain className="w-3.5 h-3.5 text-purple-400" /> 85 questions
          </span>
        </div>
      </motion.div>
    </div>
  );
}
