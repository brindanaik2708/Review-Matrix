import type { Category, RiskAssessment } from "./types";

export interface FixSuggestion {
  problem: string;
  whyRisky: string;
  suggestedFix: string;
  exampleCode?: string;
}

const suggestions: Record<Category, FixSuggestion> = {
  auth: { problem: "Authorization boundary change", whyRisky: "A missing or weakened authorization check can expose protected actions or data.", suggestedFix: "Enforce authorization on the server before performing the action.", exampleCode: "if (!session.user.isAdmin) throw new Error(\"Forbidden\");" },
  db: { problem: "Database operation", whyRisky: "Unvalidated database access can expose data or modify more records than intended.", suggestedFix: "Use parameterized queries and scope the operation to explicit records.", exampleCode: "await db.query(\n  \"SELECT * FROM users WHERE id = ?\",\n  [id]\n);" },
  secrets: { problem: "Hardcoded secret", whyRisky: "Secrets committed to source control can be copied, leaked, and remain valid after removal.", suggestedFix: "Move the secret to environment variables and rotate any exposed value.", exampleCode: "process.env.JWT_SECRET" },
  deps: { problem: "Dependency change", whyRisky: "Unbounded or unreviewed dependency versions can introduce incompatible or vulnerable code.", suggestedFix: "Pin a reviewed version and verify its release notes and security posture.", exampleCode: "\"example-package\": \"1.2.3\"" },
  logic: { problem: "Business logic change", whyRisky: "A reversed condition or overly broad return value can bypass expected behavior.", suggestedFix: "Make the condition explicit and add tests for both success and failure paths.", exampleCode: "if (!isEligible) return false;" },
  performance: { problem: "Performance concern", whyRisky: "Repeated work or unbounded queries can slow requests and increase infrastructure load.", suggestedFix: "Memoize expensive calculations or avoid repeated database queries.", exampleCode: "const value = useMemo(() => calculate(items), [items]);" },
  migration: { problem: "Schema migration", whyRisky: "Destructive schema changes can cause data loss or break running application versions.", suggestedFix: "Use a backward-compatible rollout and back up affected data before destructive steps.", exampleCode: "ALTER TABLE users ADD COLUMN new_status text;" },
  pii: { problem: "Personally identifiable information exposure", whyRisky: "Logging or returning sensitive user data can create privacy and compliance incidents.", suggestedFix: "Mask sensitive user information before logging.", exampleCode: "logger.info({ email: maskEmail(user.email) });" }
};

export function fixSuggestion(category: Category, assessment: RiskAssessment): FixSuggestion {
  const suggestion = suggestions[category];
  return { ...suggestion, whyRisky: `${suggestion.whyRisky} ${assessment.reason}` };
}
