"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SAMPLE_QUESTIONS } from "@/lib/problems";
import { cn } from "@/lib/utils";
import { getDifficultyColor } from "@/types";
import { getSuccessRate } from "@/lib/utils";
import {
  Search,
  HelpCircle,
  CheckCircle2,
  BarChart3,
  Tag,
  Brain,
} from "lucide-react";

const CATEGORIES = ["All", "JavaScript", "Python", "TypeScript", "React", "Web Development", "Data Structures", "Databases", "DevOps", "System Design", "CSS", "Git", "Concurrency"];

export default function ProblemsPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");

  const filtered = SAMPLE_QUESTIONS.filter((q) => {
    const matchesSearch = q.title.toLowerCase().includes(search.toLowerCase()) ||
      q.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "All" || q.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "All" || q.difficulty === selectedDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  return (
    <div className="min-h-screen grid-bg py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-black text-white mb-3">
            <span className="text-gradient">Question Bank</span>
          </h1>
          <p className="text-gray-400">Practice MCQ questions to sharpen your knowledge</p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-4 mb-6"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search questions..."
                className="w-full bg-white/5 border border-arena-border/50 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-arena-accent/50"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {["All", "EASY", "MEDIUM", "HARD", "EXPERT"].map((d) => (
                <button
                  key={d}
                  onClick={() => setSelectedDifficulty(d)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                    selectedDifficulty === d
                      ? "bg-arena-accent/20 text-arena-accent-light"
                      : "bg-white/5 text-gray-400 hover:bg-white/10"
                  )}
                >
                  {d === "All" ? "All" : d.charAt(0) + d.slice(1).toLowerCase()}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-2 mt-3 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-3 py-1 rounded-lg text-xs transition-all flex items-center gap-1",
                  selectedCategory === cat
                    ? "bg-arena-neon/10 text-arena-neon"
                    : "bg-white/5 text-gray-500 hover:bg-white/10"
                )}
              >
                <Tag className="w-3 h-3" />
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Questions List */}
        <div className="space-y-3">
          {filtered.map((question, i) => (
            <motion.div
              key={question.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className="glass-card p-5 hover:border-arena-accent/30 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-sm font-bold text-gray-400 group-hover:text-arena-accent-light transition-colors">
                    <Brain className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white group-hover:text-arena-accent-light transition-colors">
                      {question.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span
                        className="text-xs font-bold"
                        style={{ color: getDifficultyColor(question.difficulty) }}
                      >
                        {question.difficulty}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Tag className="w-3 h-3" /> {question.category}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-sm">
                  <div className="text-center">
                    <p className="font-bold text-white">{question.solveCount.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">Answered</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-arena-neon">
                      {getSuccessRate(question.solveCount, question.attemptCount)}
                    </p>
                    <p className="text-xs text-gray-500">Accuracy</p>
                  </div>
                  <HelpCircle className="w-5 h-5 text-gray-600 group-hover:text-arena-accent transition-colors" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
