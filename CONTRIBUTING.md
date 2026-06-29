# Contributing: put your organisation on the map

Thanks for helping make the European edge & MEC ecosystem more visible. An entry is
**one JSON file** under `partners/`. No code required.

## In 4 steps

1. **Fork** and create a branch.
2. Copy `partners/_TEMPLATE.json` to `partners/<slug>.json`
   (`<slug>` = lowercase letters, digits, hyphens — e.g. `my-company`).
3. Fill in the fields (see below).
4. Open a **pull request**. The "Validate (PR)" action checks your entry.
   After merge, your organisation appears on the map automatically.

## Fields

| Field | Required | Description |
|-------|:-------:|-------------|
| `slug` | yes | Unique; equals the file name without `.json`. Only `a-z 0-9 -`. |
| `name` | yes | Display name. |
| `cluster` | yes | Role — one of the values below. |
| `layer` | yes | Continuum position, integer **1-4**. |
| `country` | yes | Country/region, e.g. `DE`, `FR`, `EU`, `INT`. |
| `tag` | yes | Short label, ~22 chars max, e.g. `CNCF` or `DE - Open source`. |
| `lede` | yes | **One** sentence (tooltip + intro). |
| `facts` | yes | 2-4 concise bullets, in your own words. |
| `link` | no | Official URL. |
| `logo` | no | Logo path `logos/<slug>.svg`. Or just drop a file in `logos/` named after your slug. |

### `cluster` (role)

| Value | Meaning |
|-------|---------|
| `telco` | MEC & Telco Edge |
| `platform` | Edge Software Platforms |
| `orch` | Cloud-Native & Orchestration |
| `hardware` | Edge Hardware & Silicon |
| `infra` | Cloud & Sovereign Infra |
| `std` | Standards & Initiatives |

### `layer` (continuum position)

`1` Regional/Sovereign Cloud · `2` Edge Cloud (Aggregation) · `3` Access/Network Edge (MEC) · `4` Device/Far Edge.
Pick the **centre of gravity** even if your solution spans several tiers.

## Example

```json
{
  "$schema": "../schema/partner.schema.json",
  "slug": "example-edge",
  "name": "Example Edge",
  "cluster": "platform",
  "layer": 3,
  "country": "DE",
  "tag": "CNCF",
  "lede": "Open-source platform that extends Kubernetes to constrained network-edge sites.",
  "facts": [
    "Keeps the control plane central while edge nodes run autonomously.",
    "Optimised for intermittent connectivity.",
    "CNCF project."
  ],
  "link": "https://www.example-edge.eu"
}
```

## Style

- **Your own words**, no marketing speak. Concrete, verifiable statements.
- `lede` is exactly one sentence. `facts` are short.
- Check locally before the PR: `node scripts/build.mjs` (fails with the file name and
  the problem if something is off).

## Logo (optional)

Add a square-ish logo as `logos/<your-slug>.svg` (or `.png`/`.webp`). The build
picks it up automatically. No logo? A coloured monogram is shown instead. See
`logos/README.md` for guidelines.

## What does NOT belong in a PR

`data/players.json` and `index.html` are **generated automatically** — do not edit them
by hand. Just your file in `partners/` is enough.
