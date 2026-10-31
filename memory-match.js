// Memory Match — 8 pairs, plain JS, no backend.
(function () {
  var SYMBOLS = ['🍎', '🍊', '🍋', '🍇', '🍓', '🥝', '🍑', '🍉'];
  var grid = document.getElementById('grid');
  var movesEl = document.getElementById('moves');
  var pairsEl = document.getElementById('pairs');
  var timeEl = document.getElementById('time');
  var bestEl = document.getElementById('best');
  var msgEl = document.getElementById('message');
  var restartBtn = document.getElementById('restartBtn');

  var cards = [], first = null, lock = false, moves = 0, pairs = 0, seconds = 0, timer = null, started = false;
  var best = null;
  try { best = localStorage.getItem('memoryMatchBest'); } catch (e) { best = null; }
  if (best) bestEl.textContent = best + 's';

  function shuffle(a) {
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function startTimer() {
    if (started) return;
    started = true;
    timer = setInterval(function () { seconds += 1; timeEl.textContent = seconds; }, 1000);
  }

  function build() {
    var deck = shuffle(SYMBOLS.concat(SYMBOLS));
    grid.innerHTML = '';
    cards = []; first = null; lock = false; moves = 0; pairs = 0; seconds = 0; started = false;
    if (timer) clearInterval(timer);
    movesEl.textContent = '0'; pairsEl.textContent = '0 / 8'; timeEl.textContent = '0';
    msgEl.textContent = '';
    deck.forEach(function (sym, idx) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'card-btn';
      btn.textContent = '❓';
      btn.setAttribute('aria-label', 'Card ' + (idx + 1));
      btn.addEventListener('click', function () { flip(btn); });
      var card = { el: btn, sym: sym, matched: false };
      btn._card = card;
      cards.push(card);
      grid.appendChild(btn);
    });
  }

  function flip(btn) {
    var card = btn._card;
    if (lock || card.matched || card === first) return;
    startTimer();
    btn.textContent = card.sym;
    btn.classList.add('flipped');
    if (!first) { first = card; return; }
    moves += 1;
    movesEl.textContent = moves;
    if (first.sym === card.sym) {
      first.matched = true; card.matched = true;
      first.el.classList.add('matched'); card.el.classList.add('matched');
      first.el.disabled = true; card.el.disabled = true;
      first = null; pairs += 1;
      pairsEl.textContent = pairs + ' / 8';
      if (pairs === 8) win();
    } else {
      lock = true;
      var a = first, b = card;
      first = null;
      setTimeout(function () {
        a.el.textContent = '❓'; b.el.textContent = '❓';
        a.el.classList.remove('flipped'); b.el.classList.remove('flipped');
        lock = false;
      }, 800);
    }
  }

  function win() {
    if (timer) clearInterval(timer);
    msgEl.textContent = 'You win! All 8 pairs in ' + moves + ' moves and ' + seconds + ' seconds.';
    if (!best || seconds < parseInt(best, 10)) {
      best = String(seconds);
      try { localStorage.setItem('memoryMatchBest', best); } catch (e) {}
      bestEl.textContent = best + 's';
      msgEl.textContent += ' New best time!';
    }
  }

  restartBtn.addEventListener('click', build);
  build();
})();
