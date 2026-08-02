import type { RiskAssessment } from "./types";

export function requestChangesGuide(assessment: RiskAssessment) {
  const severity = assessment.score >= 65 ? "High" : assessment.score >= 40 ? "Medium" : "Low";
  return {
    severity,
    reviewerComment: `${severity} risk: ${assessment.reason} Please address this before merge.`,
    suggestedFix: assessment.score >= 65 ? "Add a bounded guard, test the failure path, and request another review." : "Add a focused test and document the intended behavior before merge."
  };
}
