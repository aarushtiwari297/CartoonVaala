/* ==========================================================================
   Cartoon Vaala — Dedicated Doraemon Nostalgic Melody Ambient Player
   Lightweight, single-track ambient audio controller for remember.html
   Plays only the iconic Doraemon title track on continuous loop.
   ========================================================================== */

(function () {
  'use strict';

  // Dedicated single audio source (Doraemon Nostalgic Melody 3)
  const DORAEMON_TRACK = {
    title: "Doraemon Nostalgic Theme",
    subtitle: "Doremon 3 • Nostalgic Childhood Melody",
    channel: "Hungama TV • 1998–2008",
    audio: "Audio/Doremon/Doremon3.mp3"
  };

  const audio = new Audio();
  audio.src = DORAEMON_TRACK.audio;
  audio.preload = 'auto';
  audio.loop = true; // Loop exclusively this single melody
  audio.volume = 0.75;

  let isPlaying = false;

  // Cached DOM elements on remember.html
  const dom = {
    ambientSoundbar: document.getElementById('ambient-soundbar'),
    ambientStatusText: document.getElementById('ambient-status-text'),
    ambientTrackTitle: document.getElementById('ambient-track-title'),
    ambientAudioToggle: document.getElementById('ambient-audio-toggle'),
    ambientToggleIcon: document.getElementById('ambient-toggle-icon'),
    ambientToggleLabel: document.getElementById('ambient-toggle-label'),
    ambientEqWrap: document.querySelector('.ambient-eq-wrap'),
    bgmButtons: document.querySelectorAll('.bgm-toggle'),
    pillTrackTitle: document.getElementById('pill-track-title'),
    pillChannelTag: document.getElementById('pill-channel-tag'),
    pillStatusText: document.getElementById('pill-status-text'),
    pillPlayPauseBtn: document.getElementById('pill-play-pause-btn')
  };

  // Synchronize UI across ambient soundbar, header, and floating mini-player
  function updateUI() {
    isPlaying = !audio.paused;

    // 1. Ambient Soundbar
    if (dom.ambientStatusText) {
      dom.ambientStatusText.textContent = isPlaying
        ? 'SOOTHING DORAEMON MELODY • PLAYING'
        : 'SOOTHING DORAEMON MELODY • PAUSED';
    }
    if (dom.ambientTrackTitle) {
      dom.ambientTrackTitle.textContent = `${DORAEMON_TRACK.title} • ${DORAEMON_TRACK.subtitle}`;
    }
    if (dom.ambientAudioToggle) {
      if (isPlaying) {
        dom.ambientAudioToggle.classList.add('playing');
        dom.ambientAudioToggle.setAttribute('aria-pressed', 'true');
        if (dom.ambientToggleIcon) dom.ambientToggleIcon.textContent = '⏸';
        if (dom.ambientToggleLabel) dom.ambientToggleLabel.textContent = 'Pause Music';
      } else {
        dom.ambientAudioToggle.classList.remove('playing');
        dom.ambientAudioToggle.setAttribute('aria-pressed', 'false');
        if (dom.ambientToggleIcon) dom.ambientToggleIcon.textContent = '▶';
        if (dom.ambientToggleLabel) dom.ambientToggleLabel.textContent = 'Play Doraemon Song';
      }
    }
    if (dom.ambientEqWrap) {
      if (isPlaying) {
        dom.ambientEqWrap.classList.add('active');
      } else {
        dom.ambientEqWrap.classList.remove('active');
      }
    }

    // 2. Header BGM Button
    if (dom.bgmButtons) {
      dom.bgmButtons.forEach((btn) => {
        const label = btn.querySelector('.bgm-label');
        if (isPlaying) {
          btn.classList.add('playing');
          btn.setAttribute('aria-pressed', 'true');
          if (label) label.textContent = 'Playing';
        } else {
          btn.classList.remove('playing');
          btn.setAttribute('aria-pressed', 'false');
          if (label) label.textContent = 'Play Songs';
        }
      });
    }

    // 3. Floating Bottom Mini-Player Pill
    if (dom.pillTrackTitle) dom.pillTrackTitle.textContent = DORAEMON_TRACK.title;
    if (dom.pillChannelTag) dom.pillChannelTag.textContent = DORAEMON_TRACK.channel;
    if (dom.pillStatusText) dom.pillStatusText.textContent = isPlaying ? 'ON AIR' : 'PAUSED';
    if (dom.pillPlayPauseBtn) {
      dom.pillPlayPauseBtn.textContent = isPlaying ? '⏸' : '▶';
      dom.pillPlayPauseBtn.setAttribute('aria-label', isPlaying ? 'Pause Melody' : 'Play Melody');
    }
  }

  function playAudio() {
    audio.play().then(updateUI).catch((err) => {
      console.warn('[RememberAudio] Playback waiting for user interaction:', err);
      updateUI();
    });
  }

  function pauseAudio() {
    audio.pause();
    updateUI();
  }

  function toggleAudio() {
    if (audio.paused) {
      playAudio();
    } else {
      pauseAudio();
    }
  }

  // Bind UI Events
  if (dom.ambientAudioToggle) {
    dom.ambientAudioToggle.addEventListener('click', toggleAudio);
  }

  if (dom.pillPlayPauseBtn) {
    dom.pillPlayPauseBtn.addEventListener('click', toggleAudio);
  }

  // Sync with audio element state changes
  audio.addEventListener('play', updateUI);
  audio.addEventListener('pause', updateUI);
  audio.addEventListener('ended', () => {
    // Continuous loop
    audio.currentTime = 0;
    playAudio();
  });

  // Global Keyboard Shortcuts (Spacebar = toggle, M = mute/unmute)
  document.addEventListener('keydown', (e) => {
    const tag = e.target.tagName ? e.target.tagName.toLowerCase() : '';
    if (tag === 'input' || tag === 'textarea') return;

    if (e.code === 'Space') {
      e.preventDefault();
      toggleAudio();
    } else if (e.key === 'm' || e.key === 'M') {
      audio.muted = !audio.muted;
      updateUI();
    }
  });

  // Expose minimal API for main.js header toggle
  window.CartoonPlayer = {
    play: playAudio,
    pause: pauseAudio,
    toggle: toggleAudio
  };

  // Initial State Setup & Autoplay Initiation
  updateUI();

  // Attempt automatic start when entering remember.html
  const playPromise = audio.play();
  if (playPromise !== undefined) {
    playPromise.then(updateUI).catch(() => {
      // If browser blocks unmuted audio before user interaction, start on first click/tap/keypress
      const triggerOnGesture = () => {
        if (audio.paused) {
          playAudio();
        }
      };
      ['click', 'touchstart', 'keydown'].forEach((evt) => {
        document.addEventListener(evt, triggerOnGesture, { once: true, passive: true });
      });
      updateUI();
    });
  }
})();
