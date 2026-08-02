import { describe, expect, it } from "vitest";
import ledger from "@/data/trust-ledger.json";
import { ledgerAccuracy, predictionAgrees } from "@/lib/trust";
import type { LedgerRun } from "@/lib/types";
describe("trust ledger", () => { it("defines agreement consistently", () => { expect(predictionAgrees({ hunkId: "a", predictedRisk: "low", outcome: "clean" })).toBe(true); expect(predictionAgrees({ hunkId: "b", predictedRisk: "high", outcome: "clean" })).toBe(false); }); it("computes bundled accuracy rather than a hard-coded value", () => { expect(ledgerAccuracy(ledger as LedgerRun[])).toEqual({ correct: 5, total: 6, percentage: 83 }); }); });
