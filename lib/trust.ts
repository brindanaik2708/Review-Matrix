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
