/**
 * ELO Rating System for CodeArena
 * Based on the standard chess ELO algorithm with modifications for coding battles.
 */

const K_FACTOR_NEW = 40;      // New players (< 30 games)
const K_FACTOR_NORMAL = 20;   // Normal players
const K_FACTOR_HIGH = 10;     // High-rated players (> 2000)

function getKFactor(elo: number, totalGames: number): number {
  if (totalGames < 30) return K_FACTOR_NEW;
  if (elo > 2000) return K_FACTOR_HIGH;
  return K_FACTOR_NORMAL;
}

function expectedScore(ratingA: number, ratingB: number): number {
  return 1 / (1 + Math.pow(10, (ratingB - ratingA) / 400));
}

export interface EloResult {
  newRatingA: number;
  newRatingB: number;
  changeA: number;
  changeB: number;
}

/**
 * Calculate new ELO ratings after a battle.
 * @param ratingA - Player A's current rating
 * @param ratingB - Player B's current rating
 * @param scoreA - Player A's score (1 = win, 0.5 = draw, 0 = loss)
 * @param gamesA - Player A's total games played
 * @param gamesB - Player B's total games played
 * @param timeBonusA - Time bonus for Player A (0-0.1, faster = higher)
 * @param timeBonusB - Time bonus for Player B (0-0.1, faster = higher)
 */
export function calculateElo(
  ratingA: number,
  ratingB: number,
  scoreA: number,
  gamesA: number = 30,
  gamesB: number = 30,
  timeBonusA: number = 0,
  timeBonusB: number = 0
): EloResult {
  const expectedA = expectedScore(ratingA, ratingB);
  const expectedB = expectedScore(ratingB, ratingA);

  const kA = getKFactor(ratingA, gamesA);
  const kB = getKFactor(ratingB, gamesB);

  const scoreB = 1 - scoreA;

  // Apply time bonus (small extra ELO for solving faster)
  const adjustedScoreA = Math.min(1, scoreA + timeBonusA);
  const adjustedScoreB = Math.min(1, scoreB + timeBonusB);

  const changeA = Math.round(kA * (adjustedScoreA - expectedA));
  const changeB = Math.round(kB * (adjustedScoreB - expectedB));

  return {
    newRatingA: Math.max(0, ratingA + changeA),
    newRatingB: Math.max(0, ratingB + changeB),
    changeA,
    changeB,
  };
}

/**
 * Calculate time bonus based on solve time relative to time limit.
 * Faster solutions get a small ELO bonus.
 */
export function calculateTimeBonus(solveTime: number, timeLimit: number): number {
  const ratio = solveTime / timeLimit;
  if (ratio <= 0.25) return 0.1;  // Solved in first quarter
  if (ratio <= 0.5) return 0.05;  // Solved in first half
  if (ratio <= 0.75) return 0.02; // Solved in third quarter
  return 0;
}

/**
 * Get the rank name from an ELO rating.
 */
export function getRankFromElo(elo: number): string {
  if (elo >= 2200) return "Grandmaster";
  if (elo >= 2000) return "Master";
  if (elo >= 1800) return "Diamond";
  if (elo >= 1600) return "Platinum";
  if (elo >= 1400) return "Gold";
  if (elo >= 1200) return "Silver";
  return "Bronze";
}
