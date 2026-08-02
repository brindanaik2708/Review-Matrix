export type Category = "auth" | "db" | "secrets" | "deps" | "logic" | "performance" | "migration" | "pii";
export type RiskLevel = "low" | "medium" | "high" | "critical";
export type Decision = "approved" | "rejected" | "commented" | "request_changes" | "pending";
export interface Hunk { id: string; category: Category; diff: string; riskReason: string }
export interface PrFile { path: string; hunks: Hunk[] }
export interface SamplePr { files: PrFile[] }
export interface RiskAssessment { score: number; level: RiskLevel; reason: string }
export interface Prediction { hunkId: string; predictedRisk: RiskLevel; outcome: "clean" | "reverted" | "incident" }
export interface LedgerRun { runId: string; completedAt?: string; predictions: Prediction[] }
