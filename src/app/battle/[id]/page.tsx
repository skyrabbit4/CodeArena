"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/store/game-store";
import { cn } from "@/lib/utils";
import { formatTime } from "@/lib/utils";
import {
  Clock,
  CheckCircle2,
  XCircle,
  Trophy,
  ArrowRight,
  Zap,
  Lightbulb,
  Send,
} from "lucide-react";

const LABELS = ["A", "B", "C", "D"];

export default function BattlePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const {
    currentBattle, currentUser, battleTimer, currentQuestionIndex,
    selectedAnswer, answerResults, showExplanation, isAnswerLocked,
    opponentProgress, selectAnswer, submitAnswer, nextQuestion,
    tickTimer, endBattle,
  } = useGameStore();

  useEffect(() => {
    if (!currentBattle) { router.push("/arena"); return; }
    const interval = setInterval(tickTimer, 1000);
    return () => clearInterval(interval);
  }, [currentBattle, tickTimer, router]);

  if (!currentBattle) return null;

  const { questions, player1, player2 } = currentBattle;
  const q = questions[currentQuestionIndex];
  const done = currentBattle.status === "COMPLETED";
  const won = currentBattle.winnerId === currentUser.id;
  const draw = currentBattle.winnerId === "";
  const total = questions.length;
  const correct = answerResults.filter((r) => r.isCorrect).length;
  const isLast = currentQuestionIndex >= total - 1;
  const timerDanger = battleTimer < 30;

  return (
    <div className="min-h-screen flex flex-col bg-bg">
      {/* Top bar — compact game HUD */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-card border-b border-white/[0.04]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-[10px] font-bold text-purple-300">
              {player1.username[0]}
            </div>
            <span className="text-xs font-bold text-white">{currentBattle.player1Score}</span>
          </div>
          <span className="text-[10px] text-gray-600 font-bold">VS</span>
          {player2 && (
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-white">{currentBattle.player2Score}</span>
              <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center text-[10px] font-bold text-red-300">
                {player2.username[0]}
              </div>
            </div>
          )}
        </div>

        <div className={cn(
          "flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono font-bold",
          timerDanger ? "bg-red-500/15 text-red-400 animate-pulse" : "bg-white/[0.04] text-gray-400"
        )}>
          <Clock className="w-3 h-3" />
          {formatTime(battleTimer)}
        </div>

        <span className="text-xs text-gray-500">
          <span className="text-white font-bold">{currentQuestionIndex + 1}</span>/{total}
        </span>
      </div>

      {/* Progress dots */}
      <div className="flex gap-1 px-4 py-2">
        {questions.map((_, i) => {
          const r = answerResults[i];
          return (
            <div
              key={i}
              className={cn(
                "flex-1 h-1.5 rounded-full transition-all",
                i === currentQuestionIndex ? "bg-purple-500" :
                r ? (r.isCorrect ? "bg-green-500" : "bg-red-500") : "bg-white/[0.06]"
              )}
            />
          );
        })}
      </div>

      {/* Battle complete overlay */}
      <AnimatePresence>
        {done && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center px-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", damping: 20 }}
              className="game-card p-8 text-center max-w-sm w-full"
            >
              <div className="text-5xl mb-3">
                {won ? "🏆" : draw ? "🤝" : "💀"}
              </div>
              <h2 className="text-2xl font-black text-white mb-1">
                {won ? "Victory!" : draw ? "Draw" : "Defeated"}
              </h2>
              <p className={cn(
                "text-lg font-bold mb-4",
                won ? "text-green-400" : draw ? "text-gray-400" : "text-red-400"
              )}>
                {won ? `+${currentBattle.eloChange}` : draw ? "0" : currentBattle.eloChange} ELO
              </p>

              <div className="flex justify-center gap-8 mb-6 py-3 border-y border-white/[0.06]">
                <div className="text-center">
                  <p className="text-xl font-bold text-white">{currentBattle.player1Score}</p>
                  <p className="text-[10px] text-gray-500">You</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-white">{currentBattle.player2Score}</p>
                  <p className="text-[10px] text-gray-500">{player2?.username}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => router.push("/arena")}
                  className="flex-1 game-btn-primary py-3"
                >
                  Play Again
                </button>
                <button
                  onClick={() => router.push("/")}
                  className="flex-1 game-btn-ghost py-3"
                >
                  Home
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Question + Answers — single column, scrollable */}
      <div className="flex-1 overflow-y-auto px-4 py-6 max-w-2xl mx-auto w-full">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Question */}
          <h2 className="text-lg font-bold text-white mb-2">{q.title}</h2>
          <p className="text-sm text-gray-400 leading-relaxed mb-4 whitespace-pre-wrap">{q.question}</p>

          {q.codeSnippet && (
            <div className="rounded-2xl bg-[#0d0d15] border border-white/[0.06] p-4 mb-6 font-mono text-sm overflow-x-auto">
              <pre className="text-gray-300"><code>{q.codeSnippet}</code></pre>
            </div>
          )}

          {/* Options */}
          <div className="space-y-2.5 mb-6">
            {q.options.map((opt, i) => {
              const sel = selectedAnswer === i;
              const isCorrect = i === q.correctAnswer;
              const showGreen = isAnswerLocked && isCorrect;
              const showRed = isAnswerLocked && sel && !isCorrect;

              return (
                <motion.button
                  key={i}
                  whileTap={!isAnswerLocked ? { scale: 0.98 } : {}}
                  onClick={() => selectAnswer(i)}
                  disabled={isAnswerLocked}
                  className={cn(
                    "w-full flex items-center gap-3 p-4 rounded-2xl border-2 text-left transition-all",
                    !isAnswerLocked && sel ? "border-purple-500 bg-purple-500/10" :
                    !isAnswerLocked && !sel ? "border-white/[0.04] bg-white/[0.02] hover:border-purple-500/30" :
                    showGreen ? "border-green-500 bg-green-500/10" :
                    showRed ? "border-red-500 bg-red-500/10" :
                    "border-white/[0.02] bg-white/[0.01] opacity-40"
                  )}
                >
                  <div className={cn(
                    "w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shrink-0",
                    !isAnswerLocked && sel ? "bg-purple-500 text-white" :
                    !isAnswerLocked ? "bg-white/[0.04] text-gray-500" :
                    showGreen ? "bg-green-500 text-white" :
                    showRed ? "bg-red-500 text-white" :
                    "bg-white/[0.03] text-gray-700"
                  )}>
                    {isAnswerLocked && showGreen ? <CheckCircle2 className="w-4 h-4" /> :
                     isAnswerLocked && showRed ? <XCircle className="w-4 h-4" /> :
                     LABELS[i]}
                  </div>
                  <span className={cn(
                    "text-sm",
                    showGreen ? "text-green-400 font-medium" :
                    showRed ? "text-red-400 font-medium" :
                    sel && !isAnswerLocked ? "text-white font-medium" :
                    "text-gray-400"
                  )}>
                    {opt}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Explanation */}
          <AnimatePresence>
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="rounded-2xl bg-purple-500/5 border border-purple-500/10 p-4 mb-6"
              >
                <div className="flex items-center gap-1.5 mb-2">
                  <Lightbulb className="w-3.5 h-3.5 text-yellow-500" />
                  <span className="text-xs font-bold text-yellow-500">Explanation</span>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">{q.explanation}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Bottom action bar */}
      <div className="px-4 py-3 border-t border-white/[0.04] bg-card flex items-center justify-between max-w-2xl mx-auto w-full">
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
            <span className="text-green-400 font-bold">{correct}</span> correct
          </span>
          <span className="flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-yellow-500" />
            Opponent Q{opponentProgress + 1}
          </span>
        </div>

        {!isAnswerLocked ? (
          <button
            onClick={submitAnswer}
            disabled={selectedAnswer === null}
            className="game-btn-primary py-2.5 px-5 text-sm flex items-center gap-1.5 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
          >
            <Send className="w-3.5 h-3.5" />
            Lock In
          </button>
        ) : !isLast ? (
          <button
            onClick={nextQuestion}
            className="game-btn py-2.5 px-5 text-sm bg-green-600 shadow-[0_0_20px_rgba(34,197,94,0.2)] hover:shadow-[0_0_30px_rgba(34,197,94,0.35)] flex items-center gap-1.5"
          >
            Next
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <span className="text-xs text-gray-500 animate-pulse">Finishing...</span>
        )}
      </div>
    </div>
  );
}
