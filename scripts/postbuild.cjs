const fs = require('node:fs');
const path = require('node:path');

const from = path.resolve(__dirname, '..', 'build', 'client');
const to = path.resolve(__dirname, '..', 'public', 'build');

if (!fs.existsSync(from)) {
  console.warn(`Remix client build not found at ${from}, skipping static asset copy.`);
  process.exit(0);
}

fs.rmSync(to, { recursive: true, force: true });
fs.cpSync(from, to, { recursive: true });

console.info(`Copied Remix client assets from ${from} to ${to}.`);
