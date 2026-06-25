// gen-partners.mjs — one-time helper that writes the initial /partners/*.json
// files from seed.mjs. After this, /partners is the source of truth and new
// organisations add their own file (see CONTRIBUTING.md).
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { PLAYERS } from "./seed.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const order = ["slug","name","cluster","layer","country","tag","lede","facts","link"];

for (const p of PLAYERS) {
  const ordered = {};
  for (const k of order) if (p[k] !== undefined) ordered[k] = p[k];
  writeFileSync(join(ROOT, "partners", `${p.slug}.json`), JSON.stringify(ordered, null, 2) + "\n");
}
console.log(`OK - wrote ${PLAYERS.length} partner files to /partners`);
