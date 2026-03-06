"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SAMPLE_QUESTIONS } from "@/lib/problems";
import { cn } from "@/lib/utils";
import { getDifficultyColor } from "@/types";
import { getSuccessRate } from "@/lib/utils";
import { Search, Brain } from "lucide-react";

export default function ProblemsPage() {
  const [search, setSearch] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");

  const filtered = SAMPLE_QUESTIONS.filter((q) => {
    const matchesSearch = q.title.toLowerCase().includes(search.toLowerCase()) ||
      q.category.toLowerCase().includes(search.toLowerCase());
    const matchesDifficulty = selectedDifficulty === "All" || q.difficulty === selectedDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  return (
    <div className="min-h-screen grid-bg py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-black text-gradient mb-1">Questions</h1>
          <p className="text-gray-600 text-sm">{filtered.length} questions</p>
        </motion.div>

        {/* Search + Difficulty */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-2 mb-6"
        >
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-violet-500/30 transition-colors"
            />
          </div>
          <div className="flex gap-1">
            {["All", "EASY", "MEDIUM", "HARD"].map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDifficulty(d)}
                className={cn(
                  "px-3 py-2 rounded-lg text-xs font-bold transition-all duration-200",
                  selectedDifficulty === d
                    ? "bg-violet-500/15 text-violet-300"
                    : "text-gray-600 hover:text-gray-400"
                )}
              >
                {d === "All" ? "All" : d.charAt(0) + d.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Questions */}
        <div className="space-y-1.5">
          {filtered.map((question, i) => (
            <motion.div
              key={question.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: Math.min(i * 0.02, 0.3) }}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/[0.03] transition-colors duration-200 cursor-pointer group"
            >
              <Brain className="w-4 h-4 text-gray-700 group-hover:text-violet-400 transition-colors shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-300 truncate group-hover:text-white transition-colors">
                  {question.title}
                </p>
              </div>
              <span className="text-[10px] text-gray-600">{question.category}</span>
              <span
                className="text-[10px] font-bold shrink-0"
                style={{ color: getDifficultyColor(question.difficulty) }}
              >
                {question.difficulty}
              </span>
              <span className="text-[10px] text-emerald-500 font-mono shrink-0">
                {getSuccessRate(question.solveCount, question.attemptCount)}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
