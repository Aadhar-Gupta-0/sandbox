# sandbox — BlockNote Editor Lab

A lightweight Next.js + BlockNote rich-text playground. This maintained edition adds:

- A responsive editor workspace with clear instructions.
- Downloadable JSON snapshot of the current block document.
- A local-only export path, size guard and edit counter.
- Explicit indicators that the draft is not autosaved.

## Run
The source uses a legacy Next.js / BlockNote dependency set.
\`\`\`bash
yarn install
yarn dev
\`\`\`
Open http://localhost:4300.

## Safety and compatibility
- Documents remain in browser memory until exported; **no server storage is configured**.
- The legacy dependencies may need maintenance before a public deployment.
- The original open-source packages retain their respective licenses.
- The repository originally contained a large \`yarn-error.log\` that is excluded from this edition.

Based on [ethglobal/blocknote-sandbox](https://github.com/ethglobal/blocknote-sandbox); expanded and independently maintained as \`Aadhar-Gupta-0/sandbox\`.
