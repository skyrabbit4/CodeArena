"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SAMPLE_QUESTIONS } from "@/lib/problems";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

const DIFF_DOT: Record<string, string> = {
  EASY: "bg-green-500",
  MEDIUM: "bg-yellow-500",
  HARD: "bg-red-500",
  EXPERT: "bg-pink-500",
};

export default function ProblemsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = SAMPLE_QUESTIONS.filter((q) => {
    const s = q.title.toLowerCase().includes(search.toLowerCase()) ||
      q.category.toLowerCase().includes(search.toLowerCase());
    const d = filter === "All" || q.difficulty === filter;
    return s && d;
  });

  return (
    <div className="min-h-screen dot-bg py-8 sm:py-12">
      <div className="max-w-lg mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl font-black text-white mb-5"
        >
          Practice <span className="text-gray-600 text-base font-medium ml-1">({filtered.length})</span>
        </motion.h1>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions..."
            className="w-full bg-white/[0.04] border border-white/[0.06] rounded-2xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/30 transition-colors"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-1.5 mb-5">
          {["All", "EASY", "MEDIUM", "HARD"].map((d) => (
            <button
              key={d}
              onClick={() => setFilter(d)}
              className={cn(
                "px-3 py-1.5 rounded-xl text-xs font-bold transition-all",
                filter === d
                  ? "bg-purple-500/15 text-purple-400"
                  : "text-gray-600 hover:text-gray-400"
              )}
            >
              {d === "All" ? "All" : d.charAt(0) + d.slice(1).toLowerCase()}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="space-y-0.5">
          {filtered.map((q, i) => (
            <motion.div
              key={q.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: Math.min(i * 0.015, 0.2) }}
              className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/[0.03] transition-colors cursor-pointer group"
            >
              <div className={cn("w-2 h-2 rounded-full shrink-0", DIFF_DOT[q.difficulty] || "bg-gray-500")} />
              <span className="text-sm text-gray-400 group-hover:text-white transition-colors truncate flex-1">
                {q.title}
              </span>
              <span className="text-[10px] text-gray-700">{q.category}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
