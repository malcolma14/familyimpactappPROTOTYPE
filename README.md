# Alignment Studio

Part of the **Strategic Generosity Blueprint™** from Adam Malcolm, CFP®, MFA-P™ · IG Wealth Management.

A single-client decision instrument. It helps a philanthropic family make three decisions with their advisor: where to serve (nonprofit board seats), where to give (their family foundation), and when to act. It replaces a static due diligence report with a working decision tool the client and advisor use together in meetings.

## Running it

This is a dependency-free static site — no build step, no install.

- Open `index.html` directly in a browser, or
- Serve the folder: `python3 -m http.server 8000` and visit `http://localhost:8000`.

To personalize the byline, pass a client name in the URL: `index.html?client=the%20Nguyen%20family` (defaults to "the Caldwell family").

## What's inside

Four acts in a fixed left rail (desktop) or bottom nav (mobile), plus a welcome page:

1. **You** — the mirror. Values, expertise, causes, and capacity as chips; hovering a chip shows where it shaped the scoring.
2. **Where you'll serve** — four boards ranked by weighted fit. Five sliders re-rank the shortlist live, with a caption narrating each change and a "where we disagree" reveal. Each card expands to a full evidence dossier (verified leadership, five years of T3010 revenue, risk, and what would change the rating). Pin any two organizations to compare side by side.
3. **Where you'll give** — the 75-year foundation lifecycle chart with a generations overlay, granting philosophy, and a deliberately generic note on aligning invested capital.
4. **Decide** — the recommendation in one sentence, the client's instincts laid beside the evidence, and three dated next steps.

Plus **meeting mode** (type scales up, rail collapses to a stepper, presenter footer shows progress) and a print stylesheet.

The gut-check journal (reactions and notes) persists to `localStorage` only — nothing leaves the browser.

## Structure

```
index.html          Page shell
css/styles.css      All styles: brand tokens, components, responsive, print
js/app.js           Data, state, scoring, charts (inline SVG), rendering
assets/             IG logo and self-hosted Nunito Sans variable fonts
```

## Notes

- All organization figures are placeholder client data from the design specification (CRA T3010-sourced in the real engagement). Illustrative only; prepared for discussion.
- Brand: Nunito Sans only; palette limited to IG mid blue `#0072CE`, dark blue `#001E60`, light blue `#8DD0EF`, blue grey `#7A99AC`, plum `#66435A`, and neutrals. Fit states never use green/amber/red.
- No backend, no authentication, no analytics. Access control is handled outside the app.
