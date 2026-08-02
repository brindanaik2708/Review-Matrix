import type { LedgerRun, Prediction } from "./types";

/** A prediction agrees when low risk is clean, or medium/high/critical risk is later reverted or incident. */
export function predictionAgrees({ predictedRisk, outcome }: Prediction): boolean {
  return (predictedRisk === "low") === (outcome === "clean");
}

export function ledgerAccuracy(runs: LedgerRun[]) {
  const predictions = runs.flatMap((run) => run.predictions);
  const correct = predictions.filter(predictionAgrees).length;
  return { correct, total: predictions.length, percentage: predictions.length ? Math.round((correct / predictions.length) * 100) : 0 };
}

export type TrustWindow = "24h" | "week" | "month" | "older";
const weights: Record<TrustWindow, number> = { "24h": 1, week: 0.8, month: 0.4, older: 0.2 };

export function trustWindow(completedAt: string | undefined, asOf = new Date()): TrustWindow {
  if (!completedAt) return "older";
  const age = Math.max(0, asOf.getTime() - new Date(completedAt).getTime()) / 86_400_000;
  if (age <= 1) return "24h";
  if (age <= 7) return "week";
  if (age <= 30) return "month";
  return "older";
}

/** Weighted agreement gives recent agent outcomes more influence, without using any external state. */
export function weightedTrust(runs: LedgerRun[], asOf = new Date()) {
  const breakdown: Record<TrustWindow, { correct: number; total: number; weight: number }> = {
    "24h": { correct: 0, total: 0, weight: 1 }, week: { correct: 0, total: 0, weight: 0.8 }, month: { correct: 0, total: 0, weight: 0.4 }, older: { correct: 0, total: 0, weight: 0.2 }
  };
  let weightedCorrect = 0; let weightedTotal = 0;
  for (const run of runs) for (const prediction of run.predictions) {
    const window = trustWindow(run.completedAt, asOf); const weight = weights[window];
    breakdown[window].total++; if (predictionAgrees(prediction)) { breakdown[window].correct++; weightedCorrect += weight; } weightedTotal += weight;
  }
  const score = weightedTotal ? Math.round((weightedCorrect / weightedTotal) * 100) : 0;
  const recent = breakdown["24h"].total + breakdown.week.total;
  const recentCorrect = breakdown["24h"].correct + breakdown.week.correct;
  const older = breakdown.month.total + breakdown.older.total;
  const olderCorrect = breakdown.month.correct + breakdown.older.correct;
  const trend = recent && older ? (recentCorrect / recent >= olderCorrect / older ? "up" : "down") : "steady";
  return { score, breakdown, trend };
}
