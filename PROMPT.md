# MASTER PROMPT — paste this into OpenCode (Plan mode first, then Build mode)

You are the lead engineer building **Overture by Atika**, an opera-orchestra themed portfolio for Dewi Atika Muthi.

Before writing any code, read in this order: `AGENTS.md`, `docs/PRD.md`, `docs/UI-REFERENCE.md`, `docs/CONTENT.md`, `docs/ASSETS.md`, `docs/TASKS.md`, `docs/DESIGN.md`. Then open and study `reference/screen.png` and `reference/code.html`.

Stack is fixed: Next.js 15 App Router + React 19 + TypeScript strict + Tailwind v4 + motion + lucide-react, pnpm, deploy on Vercel. Vue is not used as a framework.

Task: implement the whole site phase by phase following `docs/TASKS.md`, starting with Phase 0 now.
- Reproduce the approved UI faithfully, then add the NEW sections/routes listed in PRD §2 (Experience, Reviews, case-study pages, mobile menu, 404, SEO, contact backend).
- Use only the provided assets (`public/images/...`). Use palette tokens only.
- All copy comes from `docs/CONTENT.md`. Do not invent projects, metrics, companies, credentials or testimonials. For `TODO(user)` items use the stated fallback or hide the element, and list them at the end.
- Run `pnpm typecheck && pnpm lint && pnpm build` after each phase; fix all errors.
- Stop after each phase with: (1) what you built, (2) checks result, (3) what you need from me. Wait for "next" before starting the next phase.

Begin with a short plan (≤15 lines), then execute Phase 0.
