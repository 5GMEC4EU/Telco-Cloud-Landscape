// standalone.mjs - builds a single self-contained standalone.html:
// inlines fonts (base64) and any logos, so the file has ZERO external requests.
// Run AFTER build.mjs (it reads the freshly built index.html).
import { readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const fontsCss = readFileSync(join(ROOT, "fonts", "fonts.css"), "utf8");

// turn each url('x.woff2') in fonts.css into a base64 data URI
const css = fontsCss.replace(/url\('([^']+\.woff2)'\)/g, (_, f) => {
  const b64 = readFileSync(join(ROOT, "fonts", f)).toString("base64");
  return `url(data:font/woff2;base64,${b64}) format('woff2')`;
}).replace(/format\('woff2'\) format\('woff2'\)/g, "format('woff2')");

let html = readFileSync(join(ROOT, "index.html"), "utf8");
html = html.replace('<link rel="stylesheet" href="fonts/fonts.css">', `<style>\n${css}\n</style>`);

// inline logos
const MIME = { svg:"image/svg+xml", png:"image/png", webp:"image/webp", jpg:"image/jpeg", jpeg:"image/jpeg" };
const logoDir = join(ROOT, "logos");
let inlined = 0;
if (existsSync(logoDir)) {
  for (const f of readdirSync(logoDir)) {
    const ext = (f.split(".").pop() || "").toLowerCase();
    if (!MIME[ext]) continue;
    const b64 = readFileSync(join(logoDir, f)).toString("base64");
    const before = html;
    html = html.split(`logos/${f}`).join(`data:${MIME[ext]};base64,${b64}`);
    if (html !== before) inlined++;
  }
}
writeFileSync(join(ROOT, "standalone.html"), html);
console.log(`OK - standalone.html (${(html.length/1024).toFixed(0)}KB), logos inlined: ${inlined}`);
