# 🚀 Review Matrix
### AI-Powered Pull Request Risk Intelligence

Review Matrix is an AI-assisted Pull Request review platform that helps developers evaluate AI-generated code changes through deterministic risk scoring, explainable recommendations, weighted trust tracking, and structured review workflows.

Built for the **Agentic Applications UX Track**, Review Matrix focuses on making AI-assisted code review transparent, explainable, and trustworthy.

---

## 🌐 Live Demo

**Live Application:** https://review-matrix.vercel.app

**GitHub Repository:** https://github.com/brindanaik2708/Review-Matrix

---

# 📌 Problem Statement

As AI coding assistants become more common, developers receive increasingly large AI-generated Pull Requests.

Reviewing these PRs is difficult because reviewers need to:

- identify risky code quickly
- understand why it is risky
- decide whether AI can be trusted
- maintain consistent review quality

Existing review tools focus primarily on static analysis rather than reviewer decision support.

---

# 💡 Solution

Review Matrix provides an interactive review experience where every code hunk is automatically evaluated using deterministic risk analysis.

Instead of replacing developers, Review Matrix augments reviewers by providing:

- explainable risk scores
- deterministic review logic
- AI fix suggestions
- trust history
- structured reviewer decisions
- portable JSON review reports

---

# ✨ Features

## 🔍 Deterministic Risk Engine

Every code hunk is categorized into risk groups including:

- Authentication
- Database
- Secrets
- Dependencies
- Logic
- Performance
- Migration
- Personally Identifiable Information (PII)

Risk scores remain deterministic for identical inputs.

---

## 🧠 AI Fix Suggestions

Every medium/high risk hunk provides:

- Problem
- Why it matters
- Suggested Fix
- Example implementation

These suggestions are deterministic and require no LLM.

---

## 📊 Risk Distribution Dashboard

Interactive dashboard displaying:

- High Risk
- Medium Risk
- Low Risk

Live updates while reviewing.

---

## 🔎 Search & Filter

Instant filtering by

- filename
- path
- review state
- risk level

No page refresh required.

---

## ✅ Review Workflow

Each hunk supports:

- Approve
- Redirect
- Request Changes

Review summary updates instantly.

---

## 📈 Trust Ledger

Review Matrix computes a weighted trust score using previous AI review history.

More recent reviews receive greater weight, creating a more realistic trust metric.

---

## 📂 Review History

Exported reviews are automatically stored locally.

History includes:

- Trust Score
- Review Date
- Decision Summary
- Reviewed Hunks

---

## 🌗 Theme Support

- Dark Mode
- Light Mode
- System Preference Detection
- Persistent Theme Selection

---

## 📤 JSON Export

Entire review sessions can be exported as structured JSON for auditing and future analysis.

---

# 🏗️ System Architecture

```text
                   ┌──────────────────────────┐
                   │     GitHub Pull Request  │
                   └──────────────┬───────────┘
                                  │
                                  ▼
                  ┌────────────────────────────────┐
                  │        Review Matrix UI         │
                  │                                │
                  │  Dashboard • Search • Filters  │
                  └──────────────┬─────────────────┘
                                 │
          ┌──────────────────────┼──────────────────────┐
          │                      │                      │
          ▼                      ▼                      ▼
 ┌────────────────┐    ┌────────────────┐    ┌────────────────┐
 │ Risk Engine    │    │ Trust Ledger   │    │ Review Engine  │
 │                │    │                │    │                │
 │ Deterministic  │    │ Weighted Trust │    │ Approve        │
 │ Risk Analysis  │    │ Score          │    │ Redirect       │
 │ Category Rules │    │ Accuracy       │    │ Request Change │
 └────────┬───────┘    └────────┬───────┘    └────────┬───────┘
          │                     │                     │
          └──────────────┬──────┴──────────────┬──────┘
                         ▼                     ▼
               ┌────────────────────────────────────┐
               │      Review Summary Dashboard       │
               │                                    │
               │ Risk Chart                         │
               │ Suggested Fixes                    │
               │ JSON Export                        │
               │ Review History                     │
               └────────────────────────────────────┘
```

---

# ⚙️ Technology Stack

| Category | Technology |
|-----------|------------|
| Framework | Next.js 15 |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Charts | Recharts |
| Testing | Vitest |
| E2E | Playwright |
| Deployment | Vercel |

---

# 🚀 Local Setup

Clone the repository

```bash
git clone https://github.com/brindanaik2708/Review-Matrix.git
```

Install dependencies

```bash
npm install
```

Run

```bash
npm run dev
```

Open

```
http://localhost:3000
```

---

# 🧪 Testing

Run unit tests

```bash
npm test
```

Run type checking

```bash
npm run typecheck
```

Build production version

```bash
npm run build
```

---

# 📁 Project Structure

```
app/
components/
data/
lib/
tests/
public/
styles/
```

---

# 🔐 Optional AI Enhancement

Review Matrix works completely offline.

If configured with:

```
OPENAI_API_KEY
```

the application can optionally improve explanation text without changing deterministic risk scores.

---

# 🎯 Why Review Matrix?

Unlike traditional PR review tools, Review Matrix focuses on reviewer confidence rather than only code analysis.

It combines:

✔ Explainable AI

✔ Deterministic Risk Scoring

✔ Weighted Trust Ledger

✔ AI Fix Suggestions

✔ Interactive Review Workflow

✔ Portable JSON Reports

to create a transparent AI-assisted review experience.

---

# 👩‍💻 Developed By

**Brinda Naik**

B.Tech Computer Engineering

Sarvajanik College of Engineering & Technology

---

# 📄 License

MIT License
