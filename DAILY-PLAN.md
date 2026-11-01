# Mini Game Arcade — Daily Game Plan (no per-game approval)

Standing approval (user, 2026-10-31): daily game design + illustrated thumbnail + publish to
https://mini-game-arcade-tau.vercel.app WITHOUT a fresh approval tap for each game.
Scope: this site only. Original code/art/names only — never copy another game's art, code,
assets, or trademarked name, even when the mechanic is a popular genre. CONFIRMED
2026-10-31: do NOT grab games from github.com/topics/html5-games or any other repo,
even if licensed — original-only stands. No AdSense code,
no traffic posts, no header/menu redesign, no game removals — those still need the user.
Quality gate (every game, no exceptions): finished and playable, mobile + desktop,
thumbnail + name card with info popup, category + audience tags, translated nav/HUD keys
in all 11 languages, SEO/canonical/OG, sitemap entry, signed-out live check on the
production domain only. If a game fails the gate or the upload route fails, DO NOT publish
a broken/placeholder game — report the blocker plainly instead.
Report after each run in this side chat: game name, live link, category, audience,
thumbnail description, test result. User can stop this at any time by saying stop.

## Queue — 35 games, at least 5 per day (7 days), trending genres, original versions
Status key: ☐ not done, ✅ live, ⚠ blocked (reason in report).
Trending basis (Oct 2026 browser lists): reflex/endless runners, idle clickers,
physics driving, merge/tower defence, match/number puzzles, card games, platformers,
stickman action — adapted here as family-friendly, 1-tap, no-download originals.

| Day | Game (original name) | Category | Audience | Thumbnail idea | Status |
|-----|----------------------|----------|----------|----------------|--------|
| 1 | Bubble Pop | Arcade | All Ages | Colourful bubbles bursting, wand | ✅ |
| 2 | Snake Rush | Arcade | All Ages | Neon snake eating dots on a grid | ✅ |
| 3 | Number Merge | Puzzle | All Ages | Sliding number tiles merging | ✅ |
| 4 | Tap Bakery | Idle (new) | All Ages | Bakery counter, cookies, tap hand | ✅ |
| 5 | Neon Tunnel Dash | Runner (new) | All Ages | Glowing tunnel, dodging blocks | ✅ |
| 6 | Star Catcher | Arcade | Kids | Basket catching falling stars | ☐ |
| 7 | Word Scramble | Words (new) | All Ages | Jumbled letter tiles forming a word | ☐ |
| 8 | Tile Match | Puzzle | All Ages | 3-in-a-row colourful tiles | ☐ |
| 9 | Traffic Dodge | Racing (new) | All Ages | Top-down car dodging traffic | ☐ |
| 10 | Balloon Pop | Arcade | Kids | Balloons rising, dart popping one | ☐ |
| 11 | Mini Sudoku | Puzzle | Adults | 4x4 number grid, highlighted row | ☐ |
| 12 | Stack Tower | Arcade | All Ages | Tower of swinging blocks stacking | ☐ |
| 13 | Maze Coins | Arcade | All Ages | Maze path with coins and a hero | ☐ |
| 14 | Reaction Tap | Arcade | All Ages | Big target button, stopwatch | ☐ |
| 15 | Math Sprint | Puzzle | Kids | Numbers and a lightning bolt | ☐ |
| 16 | Sky Flapper | Runner | All Ages | Original bird flapping between pipes | ☐ |
| 17 | Solitaire Sprint | Cards (new) | Adults | Card fan, ace on top | ☐ |
| 18 | Merge Defenders | Strategy (new) | All Ages | Towers merging on a path, enemies | ☐ |
| 19 | Colour Memory | Puzzle | Kids | Colour pads lighting in sequence | ☐ |
| 20 | Jungle Jump | Runner | Kids | Character jumping over vines/logs | ☐ |
| 21 | Gem Drop | Puzzle | All Ages | Falling gems lining up in a well | ☐ |
| 22 | Tap Tiles | Arcade | All Ages | Music tiles lighting, tap in rhythm | ☐ |
| 23 | Mole Tap | Arcade | Kids | Moles popping up, tap fast | ☐ |
| 24 | Sliding Puzzle | Puzzle | All Ages | Sliding number tiles into order | ☐ |
| 25 | Connect Dots | Puzzle | Kids | Dots connected in number order | ☐ |
| 26 | Drift Turn | Racing | All Ages | Car drifting around corners | ☐ |
| 27 | Bow Aim | Arcade | All Ages | Bow aiming at round targets | ☐ |
| 28 | Star Blaster | Arcade | All Ages | Ship dodging and blasting asteroids | ☐ |
| 29 | Harvest Tap | Idle | All Ages | Farm crops growing, tap to harvest | ☐ |
| 30 | Quiz Quest | Words | All Ages | Question card with 4 answers | ☐ |
| 31 | Parking Puzzle | Puzzle | Adults | Cars sliding out of a jammed lot | ☐ |
| 32 | Block Drop | Puzzle | All Ages | Blocks dropping and clearing lines | ☐ |
| 33 | Bubble Match | Puzzle | All Ages | Matching coloured bubbles in a row | ☐ |
| 34 | Dino Dash | Runner | Kids | Original dino jumping over rocks | ☐ |
| 35 | Coin Pusher | Arcade | All Ages | Coins dropping and pushing others off | ☐ |

New categories to create only when their game ships (standing rule): Idle, Runner,
Words, Racing, Cards, Strategy. Existing categories stay: Arcade, Puzzle, Kids, Adults,
All Ages. Do not create a category for a game that has not shipped.

## Daily run checklist
1. Take the next FIVE (minimum) ☐ games in order; skip none, do not repeat a shipped game. If one fails its gate, publish the next game in the queue the same day to still reach 5 live games that day if possible; otherwise report the shortfall plainly.
2. Build EACH game as a single original HTML+JS page (same standard header: ☰ left, logo,
   header links, language right, favicon, menu.js, lang.js) + its own original SVG
   thumbnail file. Add the card (thumbnail + name only, info in .card-info popup,
   plus a visible coloured top strip cycling pink/teal/yellow),
   filter data, menu entry if it is a new category, SEO + sitemap entry with that
   day's <lastmod> (and homepage <lastmod> updated the same day).
3. Test: play through, restart, mobile width, keyboard where applicable, language
   switch, filter from menu, hover/tap popup.
4. Upload via the GitHub connector push_files (verified working 2026-10-31 after
   the Muse GitHub App was installed and mini-game-arcade selected; signed-in web
   UI is only a fallback), let Vercel redeploy, verify signed-out on the production
   domain only, never a hashed deployment URL.
5. Mark EACH shipped row ✅ in this file, report all live links. If the upload route is
   blocked in a background run, leave the game ready locally, mark ⚠, report the
   blocker once, and do not keep retrying a broken publish in later runs until the
   user fixes the route — keep preparing the next game's local build only if the
   user says so after the blocker report.
6. When the 35-game queue is finished (7 days at 5/day), report that it is done and propose the next queue — do not invent a new queue and keep publishing without the user.
