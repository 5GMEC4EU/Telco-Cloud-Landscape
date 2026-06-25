// build.mjs - runs in CI and locally. No dependencies (plain Node 18+).
// 1) reads cluster/layer metadata from seed.mjs
// 2) reads every /partners/*.json (the contributable source of truth)
// 3) validates each entry
// 4) writes data/players.json
// 5) injects an offline fallback bootstrap into index.html (from index.template.html)
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { CLUSTERS, LAYERS } from "./seed.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const clusterKeys = Object.keys(CLUSTERS);
const errors = [];

function validate(p, file) {
  const str = (k) => {
    if (p[k] === undefined || p[k] === null) errors.push(`${file}: field "${k}" is missing`);
    else if (typeof p[k] !== "string") errors.push(`${file}: "${k}" must be a string`);
  };
  str("slug"); str("name"); str("tag"); str("lede"); str("country");
  if (!clusterKeys.includes(p.cluster))
    errors.push(`${file}: "cluster" must be one of [${clusterKeys.join(", ")}] (got: ${p.cluster})`);
  if (!Number.isInteger(p.layer) || p.layer < 1 || p.layer > 4)
    errors.push(`${file}: "layer" must be an integer 1-4 (got: ${p.layer})`);
  if (!Array.isArray(p.facts) || p.facts.length < 1)
    errors.push(`${file}: "facts" must have at least one entry`);
  if (p.slug && !/^[a-z0-9-]+$/.test(p.slug))
    errors.push(`${file}: "slug" may only contain a-z, 0-9 and hyphens`);
}

const dir = join(ROOT, "partners");
const files = readdirSync(dir).filter(f => f.endsWith(".json") && !f.startsWith("_"));
const seen = new Set();
const players = [];

for (const f of files) {
  let p;
  try { p = JSON.parse(readFileSync(join(dir, f), "utf8")); }
  catch (e) { errors.push(`${f}: invalid JSON - ${e.message}`); continue; }
  validate(p, f);
  if (seen.has(p.slug)) errors.push(`${f}: duplicate slug "${p.slug}"`);
  seen.add(p.slug);
  players.push(p);
}

if (errors.length) {
  console.error("\nValidation failed:\n" + errors.map(e => "  - " + e).join("\n") + "\n");
  process.exit(1);
}

players.sort((a, b) =>
  clusterKeys.indexOf(a.cluster) - clusterKeys.indexOf(b.cluster) ||
  a.name.localeCompare(b.name, "en")
);

writeFileSync(join(ROOT, "data", "players.json"), JSON.stringify(players, null, 2) + "\n");

const bootstrap = { clusters: CLUSTERS, layers: LAYERS, players };
const tpl = readFileSync(join(ROOT, "index.template.html"), "utf8");
writeFileSync(join(ROOT, "index.html"), tpl.replace("/*__BOOTSTRAP__*/null", JSON.stringify(bootstrap)));

console.log(`OK - validated ${players.length} players -> data/players.json + index.html`);
