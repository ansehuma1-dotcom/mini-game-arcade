// Mini Game Arcade — shared game controls: visible Back, Sound on/off, Fullscreen.
// Loaded on every game page. Inserts a controls bar above the HUD and wires it up.
// Sound preference persists across games in localStorage (default off, like Fruit Slice).
(function () {
  var soundKey = 'mga_sound';
  var audioCtx = null;

  function soundOn() {
    try { return localStorage.getItem(soundKey) === 'on'; } catch (e) { return false; }
  }
  function beep(freq, dur) {
    if (!soundOn()) return;
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
  window.mgaSoundOn = soundOn;
  window.mgaBeep = beep;

  function buildBar() {
    if (document.getElementById('mgaControls')) return;
    var hud = document.querySelector('.hud');
    if (!hud || !hud.parentNode) return;
    var bar = document.createElement('div');
    bar.className = 'game-controls';
    bar.id = 'mgaControls';

    var back = document.createElement('a');
    back.className = 'btn small';
    back.href = 'index.html';
    back.textContent = '← Back';
    bar.appendChild(back);

    var soundBtn = document.createElement('button');
    soundBtn.className = 'btn small secondary';
    soundBtn.type = 'button';
    soundBtn.id = 'mgaSoundBtn';
    function refreshSound() {
      soundBtn.textContent = soundOn() ? '🔊 Sound: On' : '🔇 Sound: Off';
    }
    soundBtn.addEventListener('click', function () {
      try { localStorage.setItem(soundKey, soundOn() ? 'off' : 'on'); } catch (e) {}
      refreshSound();
      beep(440, 0.1);
    });
    refreshSound();
    bar.appendChild(soundBtn);

    var fsBtn = document.createElement('button');
    fsBtn.className = 'btn small secondary';
    fsBtn.type = 'button';
    fsBtn.id = 'mgaFsBtn';
    function refreshFs() {
      var fs = document.fullscreenElement || document.webkitFullscreenElement;
      fsBtn.textContent = fs ? '⛶ Exit Fullscreen' : '⛶ Fullscreen';
    }
    fsBtn.addEventListener('click', function () {
      try {
        if (document.fullscreenElement || document.webkitFullscreenElement) {
          if (document.exitFullscreen) document.exitFullscreen();
          else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
        } else if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen();
        }
      } catch (e) { /* fullscreen is optional on this device */ }
    });
    document.addEventListener('fullscreenchange', refreshFs);
    document.addEventListener('webkitfullscreenchange', refreshFs);
    refreshFs();
    bar.appendChild(fsBtn);

    hud.parentNode.insertBefore(bar, hud);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', buildBar);
  else buildBar();
})();
