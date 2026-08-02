import type { Category, RiskAssessment, RiskLevel } from "./types";

const base: Record<Category, number> = { auth: 68, db: 61, secrets: 82, deps: 45, logic: 42, performance: 52, migration: 72, pii: 76 };
const signals: Array<[RegExp, number, string]> = [
  [/deleteMany|drop table|truncate/i, 28, "broad destructive database operation"],
  [/sk_live|api[_-]?key|secret/i, 18, "secret-like value in the patch"],
  [/isAdmin|unauthorized|bypass|session/i, 16, "authorization boundary change"],
  [/latest|\^\d|\*/i, 10, "unbounded dependency version"],
  [/\+ pct|\* 0|return true|=== false/i, 12, "potentially inverted business logic"],
  [/forEach\(async|select \*|n\+1|while \(true\)|\.map\(async/i, 16, "potentially expensive execution pattern"],
  [/alter table|drop column|rename column|migration/i, 17, "schema migration with rollout risk"],
  [/email|phone|ssn|dateOfBirth|address/i, 16, "personally identifiable information exposure"]
];

export function riskLevel(score: number): RiskLevel {
  if (score >= 85) return "critical";
  if (score >= 65) return "high";
  if (score >= 40) return "medium";
  return "low";
}

export function scoreHunk(path: string, diff: string, category: Category, suppliedReason: string): RiskAssessment {
  let score = base[category];
  const findings: string[] = [];
  for (const [pattern, weight, label] of signals) if (pattern.test(`${path}\n${diff}`)) { score += weight; findings.push(label); }
  if (/\.env|credential|token/i.test(path)) { score += 12; findings.push("sensitive file path"); }
  score = Math.min(100, score);
  const detail = findings.length ? `Detected ${findings.join(" and ")}.` : suppliedReason;
  return { score, level: riskLevel(score), reason: detail };
}
