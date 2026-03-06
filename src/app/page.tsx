"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Swords, Brain, ChevronRight } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* Background effects */}
      <div className="fixed inset-0 bg-hero-pattern" />
      <div className="fixed top-1/3 left-1/3 w-[500px] h-[500px] bg-violet-600/8 rounded-full blur-[150px]" />
      <div className="fixed bottom-1/4 right-1/3 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px]" />

      <div className="relative max-w-2xl mx-auto px-4 text-center -mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-6 leading-[0.9]">
            <span className="text-white">Code.</span>{" "}
            <span className="text-gradient">Battle.</span>{" "}
            <span className="text-white">Win.</span>
          </h1>

          <p className="text-base text-gray-500 max-w-md mx-auto mb-10 leading-relaxed">
            Real-time quiz battles against developers worldwide. Pick a difficulty. Find an opponent. Prove your knowledge.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/arena" className="group btn-primary flex items-center gap-2 px-8 py-4 text-base">
              <Swords className="w-5 h-5" />
              Enter Arena
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link href="/problems" className="btn-ghost flex items-center gap-2 px-8 py-4">
              <Brain className="w-5 h-5" />
              Practice
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
