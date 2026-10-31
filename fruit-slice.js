// Fruit Slice — plain canvas game, no backend, no copied art.
// Fruits are original coloured circles with a leaf. Bombs are black circles with a fuse.
(function () {
  var canvas = document.getElementById('game');
  var ctx = canvas.getContext('2d');
  var scoreEl = document.getElementById('score');
  var comboEl = document.getElementById('combo');
  var timeEl = document.getElementById('time');
  var livesEl = document.getElementById('lives');
  var bestEl = document.getElementById('best');
  var overlay = document.getElementById('overlay');
  var overlayTitle = document.getElementById('overlayTitle');
  var overlayText = document.getElementById('overlayText');
  var startBtn = document.getElementById('startBtn');
  var pauseBtn = document.getElementById('pauseBtn');
  var restartBtn = document.getElementById('restartBtn');
  var soundBtn = document.getElementById('soundBtn');

  var W = 900, H = 520;
  var running = false, paused = false;
  var score = 0, combo = 0, comboTimer = 0, lives = 3, timeLeft = 60;
  var best = 0;
  try { best = parseInt(localStorage.getItem('fruitSliceBest') || '0', 10) || 0; } catch (e) { best = 0; }
  bestEl.textContent = best;

  var items = [], particles = [], trail = [];
  var lastSpawn = 0, lastTick = 0, elapsed = 0;
  var soundOn = false, audioCtx = null;

  var FRUITS = [
    { name: 'Watermelon', color: '#22c55e', inner: '#ef4444' },
    { name: 'Orange', color: '#f97316', inner: '#fb923c' },
    { name: 'Lemon', color: '#eab308', inner: '#fde047' },
    { name: 'Apple', color: '#dc2626', inner: '#f87171' },
    { name: 'Plum', color: '#7c3aed', inner: '#a78bfa' }
  ];

  function beep(freq, dur) {
    if (!soundOn) return;
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === 'suspended') audioCtx.resume();
      var o = audioCtx.createOscillator(), g = audioCtx.createGain();
      o.type = 'sine'; o.frequency.value = freq;
      g.gain.setValueAtTime(0.12, audioCtx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + dur);
      o.connect(g); g.connect(audioCtx.destination);
      o.start(); o.stop(audioCtx.currentTime + dur);
    } catch (e) { /* sound is optional */ }
  }

  function resize() {
    var rect = canvas.getBoundingClientRect();
    // Keep the internal coordinate system stable; CSS scales it.
    canvas.width = W; canvas.height = H;
    return rect;
  }
  resize();
  window.addEventListener('resize', resize);

  function spawn() {
    var isBomb = Math.random() < 0.18;
    var f = isBomb ? FRUITS[0] : FRUITS[Math.floor(Math.random() * FRUITS.length)];
    items.push({
      x: 60 + Math.random() * (W - 120),
      y: H + 40,
      vx: (Math.random() - 0.5) * 120,
      vy: -(520 + Math.random() * 220),
      r: isBomb ? 34 : 36 + Math.random() * 14,
      bomb: isBomb,
      color: isBomb ? '#111827' : f.color,
      inner: f.inner,
      name: isBomb ? 'Bomb' : f.name,
      sliced: false,
      rot: Math.random() * Math.PI * 2
    });
  }

  function burst(x, y, color, n) {
    for (var i = 0; i < n; i++) {
      particles.push({ x: x, y: y, vx: (Math.random() - 0.5) * 320, vy: -Math.random() * 260, life: 0.6 + Math.random() * 0.3, color: color });
    }
  }

  function updateHUD() {
    scoreEl.textContent = score;
    comboEl.textContent = 'x' + Math.max(1, combo);
    timeEl.textContent = Math.max(0, Math.ceil(timeLeft));
    livesEl.textContent = '❤️'.repeat(Math.max(0, lives));
    bestEl.textContent = best;
  }

  function showOverlay(title, text, buttonText) {
    overlayTitle.textContent = title;
    overlayText.textContent = text;
    startBtn.textContent = buttonText || 'Play Again';
    overlay.classList.remove('hidden');
  }
  function hideOverlay() { overlay.classList.add('hidden'); }

  function endGame(reason) {
    running = false;
    if (score > best) {
      best = score;
      try { localStorage.setItem('fruitSliceBest', String(best)); } catch (e) {}
    }
    updateHUD();
    showOverlay('Game Over', reason + ' Final score: ' + score + '. Best: ' + best + '.', 'Play Again');
  }

  function loseLife(reason) {
    lives -= 1; combo = 0; updateHUD();
    beep(140, 0.25);
    if (lives <= 0) endGame(reason);
  }

  function sliceAt(x, y, px, py) {
    for (var i = items.length - 1; i >= 0; i--) {
      var it = items[i];
      if (it.sliced) continue;
      // Distance from segment (px,py)-(x,y) to item centre, simplified to point distance
      // plus a generous slice radius so fast swipes still register.
      var dx = it.x - x, dy = it.y - y;
      if (dx * dx + dy * dy < (it.r + 18) * (it.r + 18)) {
        it.sliced = true;
        burst(it.x, it.y, it.bomb ? '#111827' : it.inner, it.bomb ? 24 : 18);
        if (it.bomb) {
          loseLife('Bomb sliced! ');
        } else {
          combo += 1; comboTimer = 1.5;
          var gained = 10 + Math.max(0, combo - 1) * 2;
          score += gained;
          beep(520 + combo * 40, 0.12);
        }
        items.splice(i, 1);
        updateHUD();
        return;
      }
    }
  }

  function drawItem(it) {
    ctx.save();
    ctx.translate(it.x, it.y);
    ctx.rotate(it.rot);
    ctx.beginPath(); ctx.arc(0, 0, it.r, 0, Math.PI * 2);
    ctx.fillStyle = it.color; ctx.fill();
    ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(0,0,0,0.15)'; ctx.stroke();
    if (it.bomb) {
      ctx.beginPath(); ctx.moveTo(0, -it.r); ctx.lineTo(6, -it.r - 16);
      ctx.strokeStyle = '#92400e'; ctx.lineWidth = 4; ctx.stroke();
      ctx.fillStyle = '#f59e0b'; ctx.font = 'bold 22px system-ui'; ctx.textAlign = 'center'; ctx.fillText('💣', 0, 8);
    } else {
      ctx.beginPath(); ctx.arc(0, 0, it.r * 0.55, 0, Math.PI * 2);
      ctx.fillStyle = it.inner; ctx.fill();
      ctx.fillStyle = '#166534';
      ctx.beginPath(); ctx.ellipse(6, -it.r - 2, 10, 5, -0.5, 0, Math.PI * 2); ctx.fill();
    }
    ctx.restore();
  }

  function loop(ts) {
    if (!running) return;
    if (paused) { lastTick = ts; requestAnimationFrame(loop); return; }
    if (!lastTick) lastTick = ts;
    var dt = Math.min(0.05, (ts - lastTick) / 1000);
    lastTick = ts;
    elapsed += dt;
    timeLeft -= dt;
    if (comboTimer > 0) { comboTimer -= dt; if (comboTimer <= 0) combo = 0; }
    if (timeLeft <= 0) { updateHUD(); endGame('Time up! '); draw(); return; }

    if (elapsed - lastSpawn > 0.75) { spawn(); lastSpawn = elapsed; }

    ctx.clearRect(0, 0, W, H);
    // Trail
    if (trail.length > 1) {
      ctx.strokeStyle = '#fff'; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath();
      ctx.moveTo(trail[0].x, trail[0].y);
      for (var t = 1; t < trail.length; t++) ctx.lineTo(trail[t].x, trail[t].y);
      ctx.stroke();
    }
    for (var i = items.length - 1; i >= 0; i--) {
      var it = items[i];
      it.vy += 620 * dt; it.x += it.vx * dt; it.y += it.vy * dt; it.rot += dt * 1.5;
      if (it.y - it.r > H + 60) {
        var missed = items.splice(i, 1)[0];
        if (!missed.bomb) loseLife('Fruit missed! ');
        if (!running) { draw(); return; }
        continue;
      }
      drawItem(it);
    }
    for (var p = particles.length - 1; p >= 0; p--) {
      var pt = particles[p];
      pt.life -= dt; pt.x += pt.vx * dt; pt.y += pt.vy * dt; pt.vy += 300 * dt;
      if (pt.life <= 0) { particles.splice(p, 1); continue; }
      ctx.fillStyle = pt.color; ctx.beginPath(); ctx.arc(pt.x, pt.y, 5, 0, Math.PI * 2); ctx.fill();
    }
    // Fade old trail points
    while (trail.length && ts - trail[0].t > 180) trail.shift();
    updateHUD();
    requestAnimationFrame(loop);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    items.forEach(drawItem);
  }

  function posFromEvent(e) {
    var rect = canvas.getBoundingClientRect();
    var cx = (e.touches && e.touches[0] ? e.touches[0].clientX : e.clientX);
    var cy = (e.touches && e.touches[0] ? e.touches[0].clientY : e.clientY);
    return { x: (cx - rect.left) * (W / rect.width), y: (cy - rect.top) * (H / rect.height) };
  }

  var dragging = false, lastPos = null;
  function onMove(e) {
    if (!running || paused || !dragging) return;
    e.preventDefault();
    var p = posFromEvent(e);
    trail.push({ x: p.x, y: p.y, t: performance.now() });
    if (lastPos) sliceAt(p.x, p.y, lastPos.x, lastPos.y);
    lastPos = p;
  }
  canvas.addEventListener('pointerdown', function (e) { dragging = true; lastPos = posFromEvent(e); trail = [lastPos]; });
  canvas.addEventListener('pointermove', onMove);
  window.addEventListener('pointerup', function () { dragging = false; lastPos = null; trail = []; });
  canvas.addEventListener('touchmove', onMove, { passive: false });

  function startGame() {
    score = 0; combo = 0; comboTimer = 0; lives = 3; timeLeft = 60;
    items = []; particles = []; trail = []; elapsed = 0; lastSpawn = 0; lastTick = 0;
    running = true; paused = false; pauseBtn.textContent = 'Pause';
    hideOverlay(); updateHUD();
    requestAnimationFrame(loop);
  }

  startBtn.addEventListener('click', startGame);
  restartBtn.addEventListener('click', startGame);
  pauseBtn.addEventListener('click', function () {
    if (!running) return;
    paused = !paused;
    pauseBtn.textContent = paused ? 'Resume' : 'Pause';
    if (!paused) requestAnimationFrame(loop);
  });
  soundBtn.addEventListener('click', function () {
    soundOn = !soundOn;
    soundBtn.textContent = soundOn ? 'Sound: On' : 'Sound: Off';
    if (soundOn) beep(440, 0.1);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 's' || e.key === 'S') startGame();
    if (e.key === 'p' || e.key === 'P') pauseBtn.click();
    if (e.key === 'r' || e.key === 'R') startGame();
  });

  updateHUD();
  draw();
})();
