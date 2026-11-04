# Overture by Atika — Starter Kit untuk OpenCode

Kit ini berisi semua file acuan agar AI Agent (OpenCode) bisa membangun portfolio dari nol sampai siap deploy ke Vercel.

## Isi
- `AGENTS.md` — aturan utama, dibaca OpenCode otomatis
- `opencode.json` — memuat docs penting ke konteks agent
- `PROMPT.md` — prompt utama untuk ditempel ke OpenCode
- `docs/` — PRD, UI-REFERENCE, CONTENT, ASSETS, TASKS, DEPLOY, DESIGN (asli dari Stitch)
- `reference/` — `screen.png`, `code.html`, `color_palette.png`, + gambar asli
- `public/images/` — foto (`atika.webp`) dan 4 simbol kartu (`suits/*.webp`) yang sudah dioptimasi
- `.opencode/command/` — custom command: `/phase 0`, `/review`, `/deploy-check`
- `vercel.json`, `.env.example`, `.nvmrc`, `.gitignore`

## Cara pakai
1. Ekstrak folder, buka terminal di dalamnya, jalankan `git init`.
2. Jalankan `opencode`, (tidak perlu `/init`, `AGENTS.md` sudah ada).
3. Tempel isi `PROMPT.md`. Mulai di mode Plan, lalu pindah ke Build.
4. Setelah tiap phase selesai, cek hasilnya (`pnpm dev`), lalu balas "next" atau pakai `/phase 1`, `/phase 2`, dst.
5. Isi semua `TODO(user)` di `docs/CONTENT.md` (statistik, periode kuliah, link proyek, pengalaman, dll.) dan taruh CV di `public/resume/Dewi-Atika-Muthi-CV.pdf`.
6. Deploy: ikuti `docs/DEPLOY.md` (push ke GitHub → Import di Vercel → isi env vars).

## Catatan penting
- Vue.js tidak bisa dipakai sebagai framework bersamaan dengan Next.js/React, jadi Vue hanya tampil sebagai chip skill.
- Konten proyek/sertifikat/pendidikan di `CONTENT.md` diberi tanda VERIFY, mohon dicek ulang. Proyek contoh dari Stitch (Invoice AI, dll.) sengaja tidak dipakai.
