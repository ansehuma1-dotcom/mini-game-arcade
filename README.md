# Mini Game Arcade

Free, fast browser games. No backend, no database, no API key. Plain HTML, CSS and JavaScript, deployable as a static site on Vercel.

## Games

- **Fruit Slice** (`fruit-slice.html`): slice flying fruit with mouse or touch, build combos, avoid bombs. 60 seconds, 3 lives, start / pause / restart, game-over, sound on/off (Web Audio, only after you interact).
- **Memory Match** (`memory-match.html`): flip cards, find all 8 pairs. Timer, move counter, restart, win screen, best time saved in your browser only. Mouse, touch, and keyboard (Tab + Enter/Space).

Categories: game type — Arcade (Fruit Slice) and Puzzle (Memory Match) — plus a second audience filter — All Ages, Kids, Adults. Both current games are All Ages, so they show under both Kids and Adults; future kids-only or adult-only games will be tagged accordingly. Both filters work together on the homepage.

Languages: header language selector with 11 popular languages — English, Hindi, Spanish, French, German, Portuguese, Arabic, Chinese, Russian, Turkish, Urdu (`lang.js`, choice saved in browser). Homepage, navigation, game headings, instructions and HUD labels translate; About/Contact/Privacy/Terms content stays in English for now (their navigation translates). SEO: keyword-rich titles/descriptions, Open Graph tags, canonical URLs, `sitemap.xml`, `robots.txt`. Design: responsive for mobile and tablet, large touch targets, no heavy images or backend, so pages stay fast.

## Run locally

Open `index.html` in a browser, or from this folder run:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000

## Deploy on Vercel

See `DEPLOYMENT.md`. In short: import this repository in Vercel, use the repository root as the project root, no build command, no framework preset needed for a static site.

## Add a new game

1. Build and test the game fully first.
2. Add its page and link it from `index.html` only once it is playable.
3. Do not add fake cards or play buttons for unfinished games.
