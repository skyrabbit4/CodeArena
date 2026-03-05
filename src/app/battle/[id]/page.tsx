"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/store/game-store";
import { cn } from "@/lib/utils";
import { formatTime } from "@/lib/utils";
import { getRankColor, getDifficultyColor } from "@/types";
import {
  Clock,
  CheckCircle2,
  XCircle,
  Trophy,
  ArrowLeft,
  ArrowRight,
  Zap,
  Lightbulb,
  BarChart3,
  Send,
} from "lucide-react";

const OPTION_LABELS = ["A", "B", "C", "D"];

export default function BattlePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const {
    currentBattle,
    currentUser,
    battleTimer,
    isBattleActive,
    currentQuestionIndex,
    selectedAnswer,
    answerResults,
    showExplanation,
    isAnswerLocked,
    opponentProgress,
    selectAnswer,
    submitAnswer,
    nextQuestion,
    tickTimer,
    endBattle,
  } = useGameStore();

  useEffect(() => {
    if (!currentBattle) {
      router.push("/arena");
      return;
    }
    const interval = setInterval(tickTimer, 1000);
    return () => clearInterval(interval);
  }, [currentBattle, tickTimer, router]);

  if (!currentBattle) return null;

  const { questions, player1, player2 } = currentBattle;
  const currentQuestion = questions[currentQuestionIndex];
  const isCompleted = currentBattle.status === "COMPLETED";
  const isWinner = currentBattle.winnerId === currentUser.id;
  const isDraw = currentBattle.winnerId === "";
  const timerDanger = battleTimer < 30;
  const timerWarning = battleTimer < 60;
  const totalQuestions = questions.length;
  const correctCount = answerResults.filter((r) => r.isCorrect).length;
  const isLastQuestion = currentQuestionIndex >= totalQuestions - 1;

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
                {currentBattle.player1Score}/{totalQuestions}
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
                  {currentBattle.player2Score}/{totalQuestions}
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

        {/* Progress */}
        <div className="flex items-center gap-3">
          <div className="text-sm text-gray-400">
            Q <span className="text-white font-bold">{currentQuestionIndex + 1}</span>/{totalQuestions}
          </div>
          <div
            className="px-3 py-1 rounded-lg text-xs font-bold"
            style={{
              backgroundColor: getDifficultyColor(currentQuestion.difficulty) + "20",
              color: getDifficultyColor(currentQuestion.difficulty),
            }}
          >
            {currentQuestion.difficulty}
          </div>
        </div>
      </div>

      {/* Question Progress Bar */}
      <div className="flex gap-1.5 px-4 py-2 bg-arena-card/40">
        {questions.map((_, i) => {
          const result = answerResults[i];
          return (
            <div
              key={i}
              className={cn(
                "flex-1 h-2 rounded-full transition-all",
                i === currentQuestionIndex
                  ? "bg-arena-accent animate-pulse"
                  : result
                  ? result.isCorrect
                    ? "bg-arena-success"
                    : "bg-arena-danger"
                  : "bg-white/10"
              )}
            />
          );
        })}
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
              ) : isDraw ? (
                <>
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-gray-500 to-gray-600 flex items-center justify-center">
                    <BarChart3 className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-3xl font-black text-white mb-2">Draw!</h2>
                  <p className="text-gray-400 text-lg mb-1">0 ELO</p>
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

              {/* Score Summary */}
              <div className="flex justify-center gap-6 my-4 py-3 border-y border-arena-border/30">
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">{currentBattle.player1Score}</p>
                  <p className="text-xs text-gray-400">You</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">{currentBattle.player2Score}</p>
                  <p className="text-xs text-gray-400">{player2?.username}</p>
                </div>
              </div>

              <p className="text-gray-400 text-sm mb-6">
                {correctCount}/{totalQuestions} correct answers
              </p>
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
        {/* Question Panel */}
        <div className="w-[45%] border-r border-arena-border/50 overflow-y-auto p-8">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span
                className="px-2 py-0.5 rounded text-xs font-bold"
                style={{
                  backgroundColor: getDifficultyColor(currentQuestion.difficulty) + "20",
                  color: getDifficultyColor(currentQuestion.difficulty),
                }}
              >
                {currentQuestion.difficulty}
              </span>
              <span className="text-xs text-gray-500">{currentQuestion.category}</span>
            </div>

            <h2 className="text-xl font-bold text-white mb-4">{currentQuestion.title}</h2>

            <div className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap mb-6">
              {currentQuestion.question}
            </div>

            {/* Code Snippet */}
            {currentQuestion.codeSnippet && (
              <div className="rounded-xl bg-[#1e1e2e] border border-arena-border/30 p-4 mb-6 font-mono text-sm">
                <pre className="text-gray-300 overflow-x-auto">
                  <code>{currentQuestion.codeSnippet}</code>
                </pre>
              </div>
            )}

            {/* Explanation (shown after answering) */}
            <AnimatePresence>
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="rounded-xl bg-arena-accent/5 border border-arena-accent/20 p-4 mt-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="w-4 h-4 text-arena-neon-yellow" />
                    <span className="text-sm font-bold text-arena-neon-yellow">Explanation</span>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {currentQuestion.explanation}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Answer Panel */}
        <div className="flex-1 flex flex-col p-8">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="flex-1"
          >
            <h3 className="text-sm font-bold text-gray-400 mb-6 uppercase tracking-wider">
              Choose your answer
            </h3>

            {/* Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, i) => {
                const isSelected = selectedAnswer === i;
                const isCorrect = i === currentQuestion.correctAnswer;
                const wasSelected = isAnswerLocked && selectedAnswer === i;
                const showCorrect = isAnswerLocked && isCorrect;
                const showWrong = isAnswerLocked && wasSelected && !isCorrect;

                return (
                  <motion.button
                    key={i}
                    whileHover={!isAnswerLocked ? { scale: 1.01 } : {}}
                    whileTap={!isAnswerLocked ? { scale: 0.99 } : {}}
                    onClick={() => selectAnswer(i)}
                    disabled={isAnswerLocked}
                    className={cn(
                      "w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all",
                      !isAnswerLocked && isSelected
                        ? "border-arena-accent bg-arena-accent/10"
                        : !isAnswerLocked && !isSelected
                        ? "border-arena-border/30 bg-white/[0.02] hover:border-arena-accent/40 hover:bg-white/[0.04]"
                        : showCorrect
                        ? "border-arena-success bg-arena-success/10"
                        : showWrong
                        ? "border-arena-danger bg-arena-danger/10"
                        : "border-arena-border/20 bg-white/[0.01] opacity-50"
                    )}
                  >
                    <div
                      className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm shrink-0",
                        !isAnswerLocked && isSelected
                          ? "bg-arena-accent text-white"
                          : !isAnswerLocked
                          ? "bg-white/5 text-gray-400"
                          : showCorrect
                          ? "bg-arena-success text-white"
                          : showWrong
                          ? "bg-arena-danger text-white"
                          : "bg-white/5 text-gray-600"
                      )}
                    >
                      {isAnswerLocked && showCorrect ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : isAnswerLocked && showWrong ? (
                        <XCircle className="w-5 h-5" />
                      ) : (
                        OPTION_LABELS[i]
                      )}
                    </div>
                    <span
                      className={cn(
                        "text-sm font-medium",
                        showCorrect
                          ? "text-arena-success"
                          : showWrong
                          ? "text-arena-danger"
                          : isSelected && !isAnswerLocked
                          ? "text-white"
                          : "text-gray-300"
                      )}
                    >
                      {option}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-arena-border/30">
            {/* Score */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-sm">
                <CheckCircle2 className="w-4 h-4 text-arena-success" />
                <span className="text-arena-success font-bold">{correctCount}</span>
                <span className="text-gray-500">correct</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm">
                <Zap className="w-4 h-4 text-arena-neon-yellow" />
                <span className="text-gray-400">Opponent at Q{opponentProgress + 1}</span>
              </div>
            </div>

            {/* Submit / Next */}
            {!isAnswerLocked ? (
              <button
                onClick={submitAnswer}
                disabled={selectedAnswer === null}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-arena-accent to-purple-500 rounded-xl font-bold text-white hover:shadow-[0_0_20px_rgba(108,92,231,0.3)] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
                Lock Answer
              </button>
            ) : !isLastQuestion ? (
              <button
                onClick={nextQuestion}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-arena-neon to-teal-500 rounded-xl font-bold text-white hover:shadow-[0_0_20px_rgba(0,245,212,0.3)] transition-all"
              >
                Next Question
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="text-sm text-gray-400 animate-pulse">
                Calculating results...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
