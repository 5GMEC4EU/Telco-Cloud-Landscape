# Edge & MEC Ecosystem Map — Europe

An interactive dashboard of the key actors in the **European edge & MEC continuum** —
from the regional/sovereign cloud down to the device/far edge, with Multi-access Edge
Computing (MEC) at its heart. Built to embed (e.g. in WordPress via iframe) and designed
so that **partners add themselves via pull request**.

Colours follow the [5GMEC4EU](https://5gmec4.eu/) brand (cyan `#1BB0CE`).

## The continuum (four tiers)

| # | Tier | What it covers |
|---|------|----------------|
| 01 | Regional / Sovereign Cloud | Aggregation DCs and EU-controlled cloud regions; the anchor for heavy workloads and central orchestration. |
| 02 | Edge Cloud (Aggregation) | Federated regional/metro edge nodes pooling compute closer to users. |
| 03 | Access / Network Edge (MEC) | Multi-access Edge Computing in the operator network at the RAN; single-digit-ms latency. |
| 04 | Device / Far Edge | Gateways, vehicles, machines and sensors; autonomy without constant connectivity. |

This map sits in the context of the EU's [Communication on European Tech Sovereignty
and the EU Open Source Strategy](https://digital-strategy.ec.europa.eu/en/library/communication-european-tech-sovereignty-accompanied-eu-open-source-strategy)
(European Commission, June 2026).

**Standards & Initiatives** are not placed on a single tier: they render as a **cross-cutting band** beneath the grid, because frameworks, standards and EU initiatives (ETSI MEC, Gaia-X, 8ra/IPCEI-CIS, Simpl, EUCloudEdgeIoT, SNS JU, Sylva, EUCS) span the whole continuum rather than one layer.

## Roles (clusters)

`telco` MEC & Telco Edge · `platform` Edge Software Platforms · `orch` Cloud-Native &
Orchestration · `hardware` Edge Hardware & Silicon · `infra` Cloud & Sovereign Infra ·
`std` Standards & Initiatives.

## Contribute

Add or correct an organisation with a single JSON file — see
**[CONTRIBUTING.md](CONTRIBUTING.md)**. In short:

1. Fork the repo.
2. Copy `partners/_TEMPLATE.json` to `partners/<your-slug>.json` and fill it in.
3. Open a pull request. A GitHub Action validates the entry automatically.
4. After merge, the site rebuilds and your entry appears on the map.

## Project structure

```
partners/            # source of truth: one JSON file per organisation
  _TEMPLATE.json     #   template for contributions
schema/              # JSON schema for entries (editor autocompletion)
logos/               # one logo file per org, named <slug>.svg (optional)
scripts/
  seed.mjs           #   cluster/tier metadata + initial dataset
  build.mjs          #   validates partners/ -> data/players.json + index.html
  gen-partners.mjs   #   one-time generator of the initial partner files
data/players.json    # generated (do not edit by hand)
index.html           # generated from index.template.html (do not edit by hand)
index.template.html  # dashboard template (layout/design)
.github/workflows/   # CI: validate (PR) + build & deploy (Pages)
```

## Build & preview locally

```bash
node scripts/build.mjs          # validates + generates data/players.json & index.html
python3 -m http.server 8000     # then open http://localhost:8000
```

> Opening `index.html` directly (`file://`) also works — the embedded offline fallback
> kicks in. Served over HTTP, the dashboard loads the fresh `data/players.json`.

## Embed in WordPress

Enable GitHub Pages (Settings → Pages → Source: GitHub Actions). Then add a
*Custom HTML* block to your post:

```html
<iframe src="https://5gmec4eu.github.io/Telco-Cloud-Landscape/"
        style="width:100%;border:0;height:1500px" loading="lazy"
        title="Edge & MEC Ecosystem Map"></iframe>
```

Fixed height is required because iframes do not auto-grow (~1100px desktop, ~1500px mobile).

## Configuration

In `index.template.html` set `const REPO_URL = …` to your repo URL so the
"Add yours" links point to the right place, then run `node scripts/build.mjs`.

## License

Code: MIT. Data (`partners/`): CC BY 4.0. See [LICENSE](LICENSE). Initial data as of June 2026.
