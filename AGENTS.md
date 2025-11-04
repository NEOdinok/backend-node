# Repository Guidelines

## Project Structure & Module Organization
- Root: topic guides (`1_start_here.md`, `3_databases.md`, etc.).
- `js_ts_tasks/`: standalone JS/TS exercises; each file is self-contained and runnable.
- `backend_tasks/`: backend practice notes (e.g., `analytics.md`).
- `interviews/`: company-specific notes and assets.
- No build system or package.json; avoid adding dependencies unless justified.  
his repository is for learning notes only.

## Code in this repo.
- This repo has notes about backend development and some tasks i was givem on the interview.
- Indent 2 spaces; keep lines under ~100 chars.
- Use semicolons; prefer clear, descriptive variable names.
- Filenames: snake_case (matches existing files, e.g., `longest_substring.js`).
- JS/TS are both welcome; keep each exercise self-contained without external libs.
- If using tooling, prefer Prettier defaults; do not add repo-wide configs without discussion.

## Commit & Pull Request Guidelines
- Commits: concise, imperative mood (e.g., "add note on sharding"). Scopes optional (e.g., `js_ts_tasks:`).

## Security & Configuration Tips
- Do not commit credentials or `.env` files. This repo should remain dependency-free unless required for a specific task.
- Keep examples network-safe; avoid hard-coding external endpoints.

## Rules of adding notes.
- Keep in mind that i'm keeping this notes in a begginer-friendly vibe. I explain transactions and blocks 
using "multiple people working with same google doc" example. 
- **Do not repeat yourself**. Please check surrounding context before adding more points or more text.
- `KISS` Keep it super simple. Avoid complex words - prever "hey database, give me this", or 
"RabbitMQ knows it should do this".

## Formatting .md format
- Single-hash header '#' is only one for the one file. Indicates a theme of this single file
- Double-hash header '##' is for creating a new theme.
- Every sub-division and sub-theme is '###' or simply **Bold header**
- Try to add meaningful emojis but do not overuse them. Please keep the context of a file in mind.
- Do not overuse formatting. Only use it if appropriate and to highlight important stuff
- Side notes like "> ..." are considered hits and should be started by either 💡, 📌 emojis or some other like red cross
  if you find it appropriate for this side note.

