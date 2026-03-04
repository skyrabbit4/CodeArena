"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { useGameStore } from "@/store/game-store";
import { cn } from "@/lib/utils";
import { formatTime } from "@/lib/utils";
import { getRankColor, getDifficultyColor } from "@/types";
import {
  Play,
  Send,
  Clock,
  ChevronDown,
  CheckCircle2,
  XCircle,
  Terminal,
  Trophy,
  ArrowLeft,
  RotateCcw,
} from "lucide-react";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-arena-card flex items-center justify-center">
      <div className="text-gray-500">Loading editor...</div>
    </div>
  ),
});

export default function BattlePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const {
    currentBattle,
    currentUser,
    battleTimer,
    isBattleActive,
    code,
    language,
    output,
    isSubmitting,
    testResults,
    setCode,
    setLanguage,
    submitCode,
    runTests,
    tickTimer,
  } = useGameStore();

  const [activeTab, setActiveTab] = useState<"description" | "submissions">("description");
  const [showOutput, setShowOutput] = useState(false);

  useEffect(() => {
    if (!currentBattle) {
      router.push("/arena");
      return;
    }
    const interval = setInterval(tickTimer, 1000);
    return () => clearInterval(interval);
  }, [currentBattle, tickTimer, router]);

  if (!currentBattle) return null;

  const { problem, player1, player2 } = currentBattle;
  const isCompleted = currentBattle.status === "COMPLETED";
  const isWinner = currentBattle.winnerId === currentUser.id;
  const timerDanger = battleTimer < 60;
  const timerWarning = battleTimer < 180;

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      {/* Battle Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-arena-card/80 border-b border-arena-border/50">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/arena")}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* Player 1 */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-xs font-bold text-white">
              {player1.username[0]}
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{player1.username}</p>
              <p className="text-xs" style={{ color: getRankColor(player1.rank) }}>
                {player1.elo} ELO
              </p>
            </div>
          </div>

          <span className="text-arena-neon-pink font-bold text-sm px-3">VS</span>

          {/* Player 2 */}
          {player2 && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-xs font-bold text-white">
                {player2.username[0]}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{player2.username}</p>
                <p className="text-xs" style={{ color: getRankColor(player2.rank) }}>
                  {player2.elo} ELO
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Timer */}
        <div className={cn(
          "flex items-center gap-2 px-4 py-1.5 rounded-xl font-mono text-lg font-bold",
          timerDanger ? "bg-red-500/20 text-red-400 animate-pulse" :
          timerWarning ? "bg-arena-neon-yellow/10 text-arena-neon-yellow" :
          "bg-white/5 text-white"
        )}>
          <Clock className="w-4 h-4" />
          {formatTime(battleTimer)}
        </div>

        {/* Difficulty Badge */}
        <div
          className="px-3 py-1 rounded-lg text-xs font-bold"
          style={{
            backgroundColor: getDifficultyColor(problem.difficulty) + "20",
            color: getDifficultyColor(problem.difficulty),
          }}
        >
          {problem.difficulty}
        </div>
      </div>

      {/* Battle Complete Overlay */}
      <AnimatePresence>
        {isCompleted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", damping: 15 }}
              className="glass-card p-10 text-center max-w-md mx-4"
            >
              {isWinner ? (
                <>
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-arena-neon-yellow to-orange-500 flex items-center justify-center">
                    <Trophy className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-3xl font-black text-white mb-2">Victory! 🎉</h2>
                  <p className="text-arena-success text-lg font-bold mb-1">
                    +{currentBattle.eloChange} ELO
                  </p>
                </>
              ) : currentBattle.winnerId === "" ? (
                <>
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-gray-500 to-gray-600 flex items-center justify-center">
                    <Clock className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-3xl font-black text-white mb-2">Time{"'"}s Up!</h2>
                  <p className="text-gray-400 text-lg mb-1">Draw</p>
                </>
              ) : (
                <>
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                    <XCircle className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-3xl font-black text-white mb-2">Defeat</h2>
                  <p className="text-arena-danger text-lg font-bold mb-1">
                    {currentBattle.eloChange} ELO
                  </p>
                </>
              )}
              <p className="text-gray-400 text-sm mb-6">{problem.title}</p>
              <div className="flex gap-3">
                <button
                  onClick={() => router.push("/arena")}
                  className="flex-1 py-3 bg-gradient-to-r from-arena-accent to-purple-500 rounded-xl font-bold text-white"
                >
                  Play Again
                </button>
                <button
                  onClick={() => router.push("/")}
                  className="flex-1 py-3 bg-white/5 rounded-xl font-semibold text-gray-300"
                >
                  Home
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Battle Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Problem Panel */}
        <div className="w-[40%] border-r border-arena-border/50 overflow-y-auto p-6">
          <h2 className="text-xl font-bold text-white mb-1">{problem.title}</h2>
          <div className="flex items-center gap-2 mb-6">
            <span
              className="px-2 py-0.5 rounded text-xs font-bold"
              style={{
                backgroundColor: getDifficultyColor(problem.difficulty) + "20",
                color: getDifficultyColor(problem.difficulty),
              }}
            >
              {problem.difficulty}
            </span>
            <span className="text-xs text-gray-500">{problem.category}</span>
          </div>

          <div className="prose prose-invert prose-sm max-w-none">
            <div className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
              {problem.description}
            </div>
          </div>

          {/* Examples */}
          <div className="mt-6 space-y-4">
            {problem.examples.map((example, i) => (
              <div key={i} className="rounded-xl bg-white/[0.03] border border-arena-border/30 p-4">
                <p className="text-xs font-semibold text-gray-400 mb-2">Example {i + 1}</p>
                <div className="space-y-1.5 font-mono text-sm">
                  <p><span className="text-gray-500">Input: </span><span className="text-arena-neon">{example.input}</span></p>
                  <p><span className="text-gray-500">Output: </span><span className="text-arena-neon-yellow">{example.output}</span></p>
                  {example.explanation && (
                    <p className="text-gray-400 text-xs mt-2">{example.explanation}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Constraints */}
          <div className="mt-6">
            <h4 className="text-sm font-semibold text-gray-400 mb-2">Constraints</h4>
            <ul className="space-y-1">
              {problem.constraints.map((c, i) => (
                <li key={i} className="text-xs text-gray-500 font-mono">• {c}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Code Editor Panel */}
        <div className="flex-1 flex flex-col">
          {/* Editor Header */}
          <div className="flex items-center justify-between px-4 py-2 bg-arena-card/50 border-b border-arena-border/50">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-white/5 text-sm text-gray-300 rounded-lg px-3 py-1.5 border border-arena-border/50 focus:outline-none focus:border-arena-accent/50"
            >
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
              <option value="python">Python</option>
            </select>

            <div className="flex items-center gap-2">
              <button
                onClick={runTests}
                disabled={isSubmitting}
                className="flex items-center gap-1.5 px-4 py-1.5 bg-white/5 rounded-lg text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5" />
                Run
              </button>
              <button
                onClick={submitCode}
                disabled={isSubmitting || isCompleted}
                className="flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-arena-success to-emerald-500 rounded-lg text-sm font-bold text-white hover:shadow-[0_0_15px_rgba(0,184,148,0.3)] transition-all disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>

          {/* Monaco Editor */}
          <div className="flex-1">
            <MonacoEditor
              height="100%"
              language={language === "python" ? "python" : language}
              value={code}
              onChange={(value) => setCode(value || "")}
              theme="vs-dark"
              options={{
                fontSize: 14,
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                minimap: { enabled: false },
                padding: { top: 16 },
                lineNumbers: "on",
                roundedSelection: true,
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: 2,
                wordWrap: "on",
                suggestOnTriggerCharacters: true,
              }}
            />
          </div>

          {/* Output Panel */}
          <div className="border-t border-arena-border/50">
            <button
              onClick={() => setShowOutput(!showOutput)}
              className="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <span className="flex items-center gap-2">
                <Terminal className="w-4 h-4" />
                Output
              </span>
              <ChevronDown className={cn("w-4 h-4 transition-transform", showOutput && "rotate-180")} />
            </button>
            <AnimatePresence>
              {showOutput && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 200 }}
                  exit={{ height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="h-[200px] p-4 bg-arena-bg overflow-y-auto">
                    <pre className="text-sm font-mono text-gray-300 whitespace-pre-wrap">
                      {output || "Run your code to see output here..."}
                    </pre>
                    {testResults.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {testResults.map((result, i) => (
                          <div
                            key={i}
                            className={cn(
                              "flex items-center gap-2 text-sm",
                              result.passed ? "text-arena-success" : "text-arena-danger"
                            )}
                          >
                            {result.passed ? (
                              <CheckCircle2 className="w-4 h-4" />
                            ) : (
                              <XCircle className="w-4 h-4" />
                            )}
                            {result.input}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
