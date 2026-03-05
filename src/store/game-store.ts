import { create } from "zustand";
import { User, Battle, Question } from "@/types";
import { SAMPLE_QUESTIONS } from "@/lib/problems";

interface AnswerResult {
  questionId: string;
  selectedAnswer: number;
  correctAnswer: number;
  isCorrect: boolean;
  timeTaken: number;
}

interface GameState {
  currentUser: User;

  // Battle state
  currentBattle: Battle | null;
  battleTimer: number;
  isBattleActive: boolean;
  currentQuestionIndex: number;
  selectedAnswer: number | null;
  answerResults: AnswerResult[];
  showExplanation: boolean;
  isAnswerLocked: boolean;
  questionTimer: number;
  opponentProgress: number;

  // Matchmaking
  isSearching: boolean;
  searchTime: number;
  selectedMode: string;
  selectedDifficulty: string;

  // Actions
  selectAnswer: (index: number) => void;
  submitAnswer: () => void;
  nextQuestion: () => void;
  startSearching: (mode: string, difficulty: string) => void;
  stopSearching: () => void;
  startBattle: (battle: Battle) => void;
  endBattle: (winnerId: string) => void;
  tickTimer: () => void;
  updateSearchTime: () => void;
}

const MOCK_USER: User = {
  id: "user_1",
  username: "CodeWarrior",
  displayName: "Code Warrior",
  avatarUrl: undefined,
  elo: 1547,
  rank: "Gold",
  wins: 89,
  losses: 34,
  draws: 5,
  totalBattles: 128,
  winStreak: 7,
  bestStreak: 12,
  questionsAnswered: 156,
};

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function pickQuestions(difficulty: string, count: number): Question[] {
  let pool = SAMPLE_QUESTIONS;
  if (difficulty !== "ALL") {
    pool = SAMPLE_QUESTIONS.filter((q) => q.difficulty === difficulty);
  }
  if (pool.length === 0) pool = SAMPLE_QUESTIONS;
  const shuffled = shuffleArray(pool);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

export const useGameStore = create<GameState>((set, get) => ({
  currentUser: MOCK_USER,
  currentBattle: null,
  battleTimer: 0,
  isBattleActive: false,
  currentQuestionIndex: 0,
  selectedAnswer: null,
  answerResults: [],
  showExplanation: false,
  isAnswerLocked: false,
  questionTimer: 0,
  opponentProgress: 0,
  isSearching: false,
  searchTime: 0,
  selectedMode: "RANKED",
  selectedDifficulty: "MEDIUM",

  selectAnswer: (index) => {
    if (get().isAnswerLocked) return;
    set({ selectedAnswer: index });
  },

  submitAnswer: () => {
    const { currentBattle, currentQuestionIndex, selectedAnswer, questionTimer, answerResults } = get();
    if (!currentBattle || selectedAnswer === null || get().isAnswerLocked) return;

    const question = currentBattle.questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === question.correctAnswer;

    const result: AnswerResult = {
      questionId: question.id,
      selectedAnswer,
      correctAnswer: question.correctAnswer,
      isCorrect,
      timeTaken: questionTimer,
    };

    const newResults = [...answerResults, result];
    const score = newResults.filter((r) => r.isCorrect).length;

    // Simulate opponent answering
    const oppScore = currentBattle.player2Score + (Math.random() > 0.45 ? 1 : 0);

    set({
      isAnswerLocked: true,
      showExplanation: true,
      answerResults: newResults,
      currentBattle: {
        ...currentBattle,
        player1Score: score,
        player2Score: Math.min(oppScore, currentQuestionIndex + 1),
      },
    });

    // Check if battle is over
    if (currentQuestionIndex >= currentBattle.questions.length - 1) {
      setTimeout(() => {
        const finalScore = newResults.filter((r) => r.isCorrect).length;
        const finalOppScore = get().currentBattle?.player2Score || 0;
        let winnerId = "";
        if (finalScore > finalOppScore) winnerId = get().currentUser.id;
        else if (finalOppScore > finalScore) winnerId = "user_opp";
        get().endBattle(winnerId);
      }, 2500);
    }
  },

  nextQuestion: () => {
    const { currentQuestionIndex, currentBattle } = get();
    if (!currentBattle) return;
    if (currentQuestionIndex >= currentBattle.questions.length - 1) return;

    set({
      currentQuestionIndex: currentQuestionIndex + 1,
      selectedAnswer: null,
      showExplanation: false,
      isAnswerLocked: false,
      questionTimer: 0,
    });
  },

  startSearching: (mode, difficulty) =>
    set({ isSearching: true, searchTime: 0, selectedMode: mode, selectedDifficulty: difficulty }),
  stopSearching: () => set({ isSearching: false, searchTime: 0 }),

  updateSearchTime: () => {
    const { isSearching, searchTime } = get();
    if (!isSearching) return;

    set({ searchTime: searchTime + 1 });

    if (searchTime >= 3 + Math.floor(Math.random() * 5)) {
      const questions = pickQuestions(get().selectedDifficulty, 5);
      const opponent: User = {
        id: "user_opp",
        username: "ShadowCoder",
        displayName: "Shadow Coder",
        elo: 1400 + Math.floor(Math.random() * 300),
        rank: "Gold",
        wins: 50 + Math.floor(Math.random() * 50),
        losses: 20 + Math.floor(Math.random() * 30),
        draws: Math.floor(Math.random() * 10),
        totalBattles: 80 + Math.floor(Math.random() * 40),
        winStreak: Math.floor(Math.random() * 5),
        bestStreak: 5 + Math.floor(Math.random() * 10),
        questionsAnswered: 80 + Math.floor(Math.random() * 100),
      };

      const battle: Battle = {
        id: "battle_" + Date.now(),
        status: "STARTING",
        mode: get().selectedMode as Battle["mode"],
        difficulty: questions[0]?.difficulty || "MEDIUM",
        timeLimit: 300,
        questions,
        player1: get().currentUser,
        player2: opponent,
        player1Score: 0,
        player2Score: 0,
        eloChange: 0,
      };

      set({
        isSearching: false,
        searchTime: 0,
        currentBattle: battle,
        battleTimer: 300,
        isBattleActive: true,
        currentQuestionIndex: 0,
        selectedAnswer: null,
        answerResults: [],
        showExplanation: false,
        isAnswerLocked: false,
        questionTimer: 0,
        opponentProgress: 0,
      });
    }
  },

  startBattle: (battle) =>
    set({
      currentBattle: { ...battle, status: "IN_PROGRESS" },
      battleTimer: battle.timeLimit,
      isBattleActive: true,
      currentQuestionIndex: 0,
      selectedAnswer: null,
      answerResults: [],
      showExplanation: false,
      isAnswerLocked: false,
      questionTimer: 0,
      opponentProgress: 0,
    }),

  endBattle: (winnerId) => {
    const battle = get().currentBattle;
    if (!battle) return;
    set({
      currentBattle: {
        ...battle,
        status: "COMPLETED",
        winnerId,
        eloChange: winnerId === get().currentUser.id ? 25 : winnerId === "" ? 0 : -18,
      },
      isBattleActive: false,
    });
  },

  tickTimer: () => {
    const { battleTimer, isBattleActive, questionTimer } = get();
    if (!isBattleActive || battleTimer <= 0) {
      if (battleTimer <= 0 && isBattleActive) {
        get().endBattle("");
      }
      return;
    }
    set({
      battleTimer: battleTimer - 1,
      questionTimer: questionTimer + 1,
      opponentProgress: Math.min(
        get().currentQuestionIndex + (Math.random() > 0.7 ? 1 : 0),
        (get().currentBattle?.questions.length || 5) - 1
      ),
    });
  },
}));
