import { create } from "zustand";
import { User, Battle, Problem, BattleStatus } from "@/types";
import { SAMPLE_PROBLEMS } from "@/lib/problems";

interface GameState {
  // Current user
  currentUser: User;

  // Battle state
  currentBattle: Battle | null;
  battleTimer: number;
  isBattleActive: boolean;
  code: string;
  language: string;
  output: string;
  isSubmitting: boolean;
  testResults: { passed: boolean; input: string; expected: string; actual: string }[];

  // Matchmaking
  isSearching: boolean;
  searchTime: number;
  selectedMode: string;
  selectedDifficulty: string;

  // Actions
  setCode: (code: string) => void;
  setLanguage: (language: string) => void;
  startSearching: (mode: string, difficulty: string) => void;
  stopSearching: () => void;
  startBattle: (battle: Battle) => void;
  endBattle: (winnerId: string) => void;
  submitCode: () => void;
  runTests: () => void;
  tickTimer: () => void;
  setOutput: (output: string) => void;
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
  problemsSolved: 156,
};

export const useGameStore = create<GameState>((set, get) => ({
  currentUser: MOCK_USER,
  currentBattle: null,
  battleTimer: 0,
  isBattleActive: false,
  code: "",
  language: "javascript",
  output: "",
  isSubmitting: false,
  testResults: [],
  isSearching: false,
  searchTime: 0,
  selectedMode: "RANKED",
  selectedDifficulty: "MEDIUM",

  setCode: (code) => set({ code }),
  setLanguage: (language) => {
    const battle = get().currentBattle;
    if (battle?.problem?.starterCode) {
      set({
        language,
        code: battle.problem.starterCode[language] || "",
      });
    } else {
      set({ language });
    }
  },

  startSearching: (mode, difficulty) =>
    set({ isSearching: true, searchTime: 0, selectedMode: mode, selectedDifficulty: difficulty }),
  stopSearching: () => set({ isSearching: false, searchTime: 0 }),

  updateSearchTime: () => {
    const { isSearching, searchTime } = get();
    if (!isSearching) return;

    set({ searchTime: searchTime + 1 });

    // Simulate finding a match after 3-8 seconds
    if (searchTime >= 3 + Math.floor(Math.random() * 5)) {
      const problem = SAMPLE_PROBLEMS[Math.floor(Math.random() * SAMPLE_PROBLEMS.length)];
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
        problemsSolved: 80 + Math.floor(Math.random() * 100),
      };

      const battle: Battle = {
        id: `battle_${Date.now()}`,
        status: "STARTING",
        mode: get().selectedMode as Battle["mode"],
        difficulty: problem.difficulty,
        timeLimit: 900,
        problem,
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
        code: problem.starterCode[get().language] || problem.starterCode.javascript,
        battleTimer: 900,
        isBattleActive: true,
        output: "",
        testResults: [],
      });
    }
  },

  startBattle: (battle) =>
    set({
      currentBattle: { ...battle, status: "IN_PROGRESS" },
      battleTimer: battle.timeLimit,
      isBattleActive: true,
      code: battle.problem.starterCode[get().language] || battle.problem.starterCode.javascript,
      output: "",
      testResults: [],
    }),

  endBattle: (winnerId) => {
    const battle = get().currentBattle;
    if (!battle) return;
    set({
      currentBattle: {
        ...battle,
        status: "COMPLETED",
        winnerId,
        eloChange: winnerId === get().currentUser.id ? 25 : -18,
      },
      isBattleActive: false,
    });
  },

  submitCode: () => {
    set({ isSubmitting: true });
    // Simulate submission
    setTimeout(() => {
      const testCount = get().currentBattle?.problem.testCases.length || 5;
      const passed = Math.floor(Math.random() * testCount) + 1;
      const allPassed = passed === testCount;

      set({
        isSubmitting: false,
        output: allPassed
          ? `✅ All ${testCount} test cases passed! Runtime: ${Math.floor(Math.random() * 100) + 10}ms`
          : `❌ ${passed}/${testCount} test cases passed.`,
        testResults: Array.from({ length: testCount }, (_, i) => ({
          passed: i < passed,
          input: `Test case ${i + 1}`,
          expected: "Expected output",
          actual: i < passed ? "Expected output" : "Wrong output",
        })),
      });

      if (allPassed) {
        get().endBattle(get().currentUser.id);
      }
    }, 1500);
  },

  runTests: () => {
    set({ isSubmitting: true, output: "Running tests..." });
    setTimeout(() => {
      const examples = get().currentBattle?.problem.examples || [];
      set({
        isSubmitting: false,
        output: examples
          .map(
            (ex, i) => `Test ${i + 1}: Input: ${ex.input}\nExpected: ${ex.output}\nResult: ✅ Passed\n`
          )
          .join("\n"),
      });
    }, 1000);
  },

  tickTimer: () => {
    const { battleTimer, isBattleActive, currentBattle, currentUser } = get();
    if (!isBattleActive || battleTimer <= 0) {
      if (battleTimer <= 0 && isBattleActive) {
        get().endBattle(""); // Time's up, no winner
      }
      return;
    }
    set({ battleTimer: battleTimer - 1 });
  },

  setOutput: (output) => set({ output }),
}));
