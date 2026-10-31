# Mini Game Arcade

Free, fast browser games. No backend, no database, no API key. Plain HTML, CSS and JavaScript, deployable as a static site on Vercel.

## Games

- **Fruit Slice** (`fruit-slice.html`): slice flying fruit with mouse or touch, build combos, avoid bombs. 60 seconds, 3 lives, start / pause / restart, game-over, sound on/off (Web Audio, only after you interact).

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
