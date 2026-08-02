# Review Matrix

Review Matrix is a mobile-first, per-hunk review matrix for AI-authored pull requests. It turns an opaque agent diff into small, accountable decisions: approve, redirect, or leave a review note. The demo is fully local and deterministic.

## Prerequisites

- Node.js 20.9 or newer and npm.
- **Demo mode:** no login and no API key required.
- **Live mode (optional):** `OPENAI_API_KEY` only. Turning on **Sharpen with AI** can rewrite an explanation, but it can never change the deterministic risk score. `OPENAI_MODEL` is optional.

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

`data/sample-pr.json` is the review input. `lib/risk.ts` applies documented category, file-path, and diff-keyword heuristics and clamps the result to 100. `data/trust-ledger.json` contains historical predictions. In `lib/trust.ts`, an agreement means low-risk predicts a clean outcome, while medium/high/critical predicts a reverted or incident outcome. The displayed percentage is calculated from those records (currently 5/6 = 83%), never hard-coded.

The optional `/api/explain` endpoint is intentionally score-blind: it only returns alternate reason wording after a key is configured. Keys stay server-side and `.env*` is ignored; copy `.env.example` locally when needed.

## Assumptions

- “Reject” is product language rendered as **Redirect**, signaling a request for the agent to revise rather than merely a negative vote.
- The supplied sample `riskReason` is a human-friendly fallback; deterministic findings replace it when a strong heuristic matches.
- Ledger outcomes are simplified: `clean` validates low risk, while `reverted` and `incident` validate elevated risk.
- The optional AI route is a safe demo seam. Swap its implementation for an approved server-side OpenAI SDK call if live production wording is required; scores must remain unchanged.

## How Codex built this

Codex scaffolded a Next.js App Router + TypeScript + Tailwind project, added deterministic domain logic and bundled datasets, then built the responsive review flow around them. It added Vitest coverage for scoring and ledger agreement, plus a Playwright smoke test for the main approval interaction. The acceptance commands are tracked in [PLANS.md](PLANS.md).

## License

[MIT](LICENSE)
