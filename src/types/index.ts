export type Difficulty = "EASY" | "MEDIUM" | "HARD" | "EXPERT";
export type BattleStatus = "WAITING" | "STARTING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
export type BattleMode = "RANKED" | "CASUAL" | "TOURNAMENT" | "PRACTICE";
export type SubmissionStatus = "PENDING" | "RUNNING" | "ACCEPTED" | "WRONG_ANSWER" | "TIME_LIMIT" | "MEMORY_LIMIT" | "RUNTIME_ERROR" | "COMPILATION_ERROR";

export interface User {
  id: string;
  username: string;
  displayName: string;
  avatarUrl?: string;
  elo: number;
  rank: string;
  wins: number;
  losses: number;
  draws: number;
  totalBattles: number;
  winStreak: number;
  bestStreak: number;
  problemsSolved: number;
}

export interface Problem {
  id: string;
  title: string;
  slug: string;
  description: string;
  difficulty: Difficulty;
  category: string;
  examples: Example[];
  testCases: TestCase[];
  constraints: string[];
  starterCode: Record<string, string>;
  timeLimit: number;
  memoryLimit: number;
  solveCount: number;
  attemptCount: number;
}

export interface Example {
  input: string;
  output: string;
  explanation?: string;
}

export interface TestCase {
  input: string;
  expectedOutput: string;
  isHidden?: boolean;
}

export interface Battle {
  id: string;
  status: BattleStatus;
  mode: BattleMode;
  difficulty: Difficulty;
  timeLimit: number;
  problem: Problem;
  player1: User;
  player2?: User;
  player1Score: number;
  player2Score: number;
  winnerId?: string;
  eloChange: number;
  startedAt?: string;
  endedAt?: string;
}

export interface Submission {
  id: string;
  code: string;
  language: string;
  status: SubmissionStatus;
  runtime?: number;
  memory?: number;
  testsPassed: number;
  testsTotal: number;
  output?: string;
  error?: string;
}

export interface Tournament {
  id: string;
  name: string;
  description?: string;
  type: string;
  status: string;
  maxPlayers: number;
  prizePool?: string;
  startDate: string;
  endDate?: string;
  entryCount: number;
}

export interface LeaderboardEntry {
  position: number;
  user: User;
  change?: number;
}

export const RANK_THRESHOLDS: Record<string, { min: number; max: number; color: string }> = {
  Bronze: { min: 0, max: 1199, color: "#cd7f32" },
  Silver: { min: 1200, max: 1399, color: "#c0c0c0" },
  Gold: { min: 1400, max: 1599, color: "#ffd700" },
  Platinum: { min: 1600, max: 1799, color: "#00f5d4" },
  Diamond: { min: 1800, max: 1999, color: "#a29bfe" },
  Master: { min: 2000, max: 2199, color: "#f72585" },
  Grandmaster: { min: 2200, max: Infinity, color: "#fee440" },
};

export function getRankFromElo(elo: number): string {
  for (const [rank, { min, max }] of Object.entries(RANK_THRESHOLDS)) {
    if (elo >= min && elo <= max) return rank;
  }
  return "Bronze";
}

export function getRankColor(rank: string): string {
  return RANK_THRESHOLDS[rank]?.color || "#c0c0c0";
}

export function getDifficultyColor(difficulty: Difficulty): string {
  const colors: Record<Difficulty, string> = {
    EASY: "#00b894",
    MEDIUM: "#fdcb6e",
    HARD: "#e17055",
    EXPERT: "#f72585",
  };
  return colors[difficulty];
}
