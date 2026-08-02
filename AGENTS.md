# Agent guidance

- Keep Review Matrix risk scores deterministic and explainable. AI may rewrite a reason but must never alter a score.
- Do not add credentials to source control; environment files are ignored except `.env.example`.
- Preserve accessibility: native controls, labels, keyboard focus, and live status updates.
- Before completion, run tests, typecheck, build, and review the diff.
