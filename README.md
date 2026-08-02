# Review Matrix

Review Matrix is **AI-Powered Pull Request Risk Intelligence**: a mobile-first, per-hunk review matrix for AI-authored pull requests. It turns an opaque agent diff into small, accountable decisions: approve, redirect, request changes, or leave a review note. The demo is fully local and deterministic.

## Prerequisites

- Node.js 20.9 or newer and npm.
- **Demo mode:** no login and no API key required.
- **Live mode (optional):** `OPENAI_API_KEY` can sharpen explanation wording and `GITHUB_TOKEN` can load a GitHub PR. Neither changes deterministic risk scores. `OPENAI_MODEL` is optional.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The bundled PR includes auth, database, secrets, dependency, and logic hunks. It works with no environment variables.

Quality checks:

```bash
npm test
npm run typecheck
npm run build
npm run test:e2e
```

## Deploy to Vercel in five minutes

1. Push this directory to a Git repository.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Vercel detects Next.js; leave the build settings at their defaults.
4. Optionally add `OPENAI_API_KEY` and `OPENAI_MODEL` in Project Settings → Environment Variables.
5. Click **Deploy**. No environment variable is needed for the demo.

## How it works

`data/sample-pr.json` is the review input, spanning auth, database, secrets, dependencies, logic, performance, migrations, and PII. `lib/risk.ts` applies documented category, file-path, and diff-keyword heuristics and clamps the result to 100. `data/trust-ledger.json` contains historical predictions. In `lib/trust.ts`, an agreement means low-risk predicts a clean outcome, while medium/high/critical predicts a reverted or incident outcome. Trust is weighted deterministically: last 24 hours ×1.0, last week ×0.8, last month ×0.4, and older ×0.2.

Paste a GitHub PR URL to load its files when `GITHUB_TOKEN` is set. Without a token—or if GitHub rejects the request—the dashboard explicitly falls back to the bundled sample. Imported diffs are still scored only by local deterministic rules.

## 5-line demo walkthrough

1. “Review Matrix turns an AI-authored pull request into a clear, risk-ranked review queue.”
2. “I can filter across security, performance, migration, and PII signals without losing the original diff context.”
3. “For this migration, I choose Request changes and get a severity, reviewer comment, and suggested fix instantly.”
4. “The weighted Trust Ledger gives recent agent outcomes more influence than stale history.”
5. “I can load a GitHub PR when a server token exists, or safely demo the same deterministic engine with bundled data.”

The optional `/api/explain` endpoint is intentionally score-blind: it only returns alternate reason wording after a key is configured. Keys stay server-side and `.env*` is ignored; copy `.env.example` locally when needed.

## Assumptions

- “Reject” is product language rendered as **Redirect**, signaling a request for the agent to revise rather than merely a negative vote.
- The supplied sample `riskReason` is a human-friendly fallback; deterministic findings replace it when a strong heuristic matches.
- Ledger outcomes are simplified: `clean` validates low risk, while `reverted` and `incident` validate elevated risk.
- The optional AI route is a safe demo seam. Swap its implementation for an approved server-side OpenAI SDK call if live production wording is required; scores must remain unchanged.

## How Codex built this

Codex built a Next.js App Router + TypeScript + Tailwind project, added deterministic domain logic and bundled datasets, then evolved it into a dark, responsive review dashboard. It added category coverage for performance, migration, and PII, weighted trust calculations, structured request-change guidance, and guarded GitHub PR loading. Vitest covers scoring and ledger agreement, with a Playwright smoke test for the main approval interaction. The acceptance commands are tracked in [PLANS.md](PLANS.md).

## License

[MIT](LICENSE)
