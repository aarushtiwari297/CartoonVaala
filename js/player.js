/* ==========================================================================
   Cartoon Vaala — HTML5 Audio Engine & Master CRT Television Sync
   Tactile Channel Tuning, 350ms Analog Static Transitions, EPG Wave Sync
   Indian 2000s Cable TV Receiver Simulation & Color Bars Easter Egg
   ========================================================================== */

(function () {
  'use strict';

  // Master State Registry
  const state = {
    playlist: typeof cartoonTracks !== 'undefined' ? [...cartoonTracks] : [],
    currentIndex: 0,
    isPlaying: false,
    isMuted: false,
    volume: 0.85,
    isShuffle: true,
    isSeeking: false,
    isTuning: false,
    isTestPattern: false,
    tuningTimeout: null,
    history: []
  };

  const audio = new Audio();
  audio.preload = 'auto';
  audio.volume = state.volume;

  // Cached DOM References
  const dom = {
    chassis: document.getElementById('nostalgic-player'),
    imageFrame: document.getElementById('player-image-frame'),
    cartoonName: document.getElementById('player-cartoon-name'),
    trackTitle: document.getElementById('player-track-title'),
    channelBadge: document.getElementById('player-channel-badge'),
    badgeOverlay: document.getElementById('player-badge-overlay'),
    channelCode: document.getElementById('player-channel-code'),
    receiverStatus: document.getElementById('player-receiver-status'),
    statusDot: document.getElementById('player-status-dot'),
    cartoonImage: document.getElementById('player-cartoon-image'),
    staticLayer: document.getElementById('tv-static-layer'),
    colorbars: document.getElementById('tv-colorbars'),
    colorbarsRestoreBtn: document.getElementById('colorbars-restore-btn'),
    currentTime: document.getElementById('player-current-time'),
    duration: document.getElementById('player-duration'),
    progressBar: document.getElementById('player-progress-bar'),
    progressFill: document.getElementById('player-progress-fill'),
    playPauseBtn: document.getElementById('player-play-pause-btn'),
    prevBtn: document.getElementById('player-prev-btn'),
    nextBtn: document.getElementById('player-next-btn'),
    shuffleBtn: document.getElementById('player-shuffle-btn'),
    volumeSlider: document.getElementById('player-volume-slider'),
    volumeBtn: document.getElementById('player-volume-btn'),
    crtToggleBtn: document.getElementById('crt-toggle-btn'),
    crtOverlay: document.querySelector('.crt-overlay'),
    broadcastPill: document.getElementById('broadcast-pill'),
    pillTrackTitle: document.getElementById('pill-track-title'),
    pillChannelTag: document.getElementById('pill-channel-tag'),
    pillStatusText: document.getElementById('pill-status-text')
  };

  // ==========================================================================
  // 1. Time Formatting & Lightweight Web Audio Click Helper
  // ==========================================================================
  function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  // Subtle analog cathode channel click (Pure Web Audio API, Zero external audio asset)
  let audioCtx = null;
  function playRelayClick() {
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, audioCtx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.04);
    } catch (e) {
      // Gracefully ignore if AudioContext not permitted before user gesture
    }
  }

  // ==========================================================================
  // 2. Update Visual Player Console & Persistent State
  // ==========================================================================
  function updatePlayerUI() {
    const track = state.playlist[state.currentIndex];
    if (!track) return;

    // 1. Update Text Metadata
    if (dom.cartoonName) dom.cartoonName.textContent = track.displayName || track.cartoon;
    if (dom.trackTitle) dom.trackTitle.textContent = track.title;
    if (dom.channelBadge) dom.channelBadge.textContent = track.channel || 'TV Broadcast';
    if (dom.channelCode) dom.channelCode.textContent = track.channelCode || 'CH-04';

    // 2. Sync Receiver Status
    const isPlaying = !audio.paused && !state.isTestPattern;
    state.isPlaying = isPlaying;

    if (!state.isTuning && !state.isTestPattern) {
      if (dom.receiverStatus) dom.receiverStatus.textContent = isPlaying ? 'RECEIVER LOCKED' : 'STANDBY';
      if (dom.statusDot) {
        dom.statusDot.className = isPlaying ? 'live-dot live-on-air-pulse' : 'live-dot';
        dom.statusDot.style.backgroundColor = isPlaying ? 'var(--color-status-on-air)' : 'var(--color-status-standby)';
      }
    }

    // 3. Sync Play/Pause Transport Button State
    if (dom.playPauseBtn) {
      dom.playPauseBtn.setAttribute('aria-label', isPlaying ? 'Pause Broadcast' : 'Play Broadcast');
      dom.playPauseBtn.innerHTML = isPlaying
        ? '<span style="font-size:1.1rem; line-height:1;">⏸</span> <span>Pause</span>'
        : '<span style="font-size:1.1rem; line-height:1;">▶</span> <span>Play Track</span>';
    }

    // 4. Sync Header BGM Button
    const bgmButtons = document.querySelectorAll('.bgm-toggle');
    bgmButtons.forEach((btn) => {
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

    // 5. Sync Active Transmission Dial Slot
    const dialNodes = document.querySelectorAll('.dial-slot-node');
    dialNodes.forEach((node) => {
      const cartoonTarget = node.getAttribute('data-cartoon');
      const trackIdTarget = node.getAttribute('data-track-id');
      if (trackIdTarget === track.id || (cartoonTarget && cartoonTarget.toLowerCase() === track.cartoon.toLowerCase())) {
        node.classList.add('active');
        node.setAttribute('aria-current', 'true');
      } else {
        node.classList.remove('active');
        node.removeAttribute('aria-current');
      }
    });

    // 6. Sync Persistent Broadcast Pill
    if (dom.pillTrackTitle) dom.pillTrackTitle.textContent = track.title;
    if (dom.pillChannelTag) dom.pillChannelTag.textContent = `${track.channelCode || 'CH-04'} • ${track.channel || 'TV'}`;
    if (dom.pillStatusText) dom.pillStatusText.textContent = isPlaying ? 'ON AIR' : 'PAUSED';
  }

  // ==========================================================================
  // 3. CRT Television Channel Tuning Sequence (350ms Analog Static Experience)
  // ==========================================================================
  function tuneChannel(index, autoPlay = true) {
    if (index < 0 || index >= state.playlist.length) return;

    // Dismiss Test Pattern if active
    if (state.isTestPattern) {
      toggleTestPattern(false);
    }

    if (state.currentIndex !== index) {
      state.history.push(state.currentIndex);
      if (state.history.length > 20) state.history.shift();
    }

    state.currentIndex = index;
    const track = state.playlist[state.currentIndex];
    state.isTuning = true;

    // Trigger Physical Relay Click
    playRelayClick();

    // 1. Enter CRT Tuning State: Static Layer & Amber Receiver Pulse
    if (dom.imageFrame) {
      dom.imageFrame.classList.add('tuning');
    }
    if (dom.cartoonImage) {
      dom.cartoonImage.classList.add('image-transitioning');
    }
    if (dom.receiverStatus) {
      dom.receiverStatus.textContent = 'TUNING WAVE...';
    }
    if (dom.statusDot) {
      dom.statusDot.className = 'live-dot receiver-tuning-pulse';
      dom.statusDot.style.backgroundColor = 'var(--color-status-standby)';
    }

    // Clear previous tuning timer if rapid clicking occurs
    if (state.tuningTimeout) {
      clearTimeout(state.tuningTimeout);
    }

    // 2. Lock onto Signal after 300ms Static Burst
    state.tuningTimeout = setTimeout(() => {
      if (dom.cartoonImage && track.image) {
        dom.cartoonImage.src = track.image;
        dom.cartoonImage.alt = `${track.displayName || track.cartoon} Broadcast Still`;
        dom.cartoonImage.classList.remove('image-transitioning');
      }

      if (dom.imageFrame) {
        dom.imageFrame.classList.remove('tuning');
      }

      state.isTuning = false;

      // Update Audio Source & Play
      audio.src = track.audio;
      audio.load();

      updatePlayerUI();

      if (autoPlay) {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              updatePlayerUI();
            })
            .catch((err) => {
              console.warn('[CartoonPlayer] Autoplay prevented by browser:', err);
              updatePlayerUI();
            });
        }
      }
    }, 320);
  }

  // ==========================================================================
  // 4. Track Playback Controls
  // ==========================================================================
  function playNextTrack() {
    if (state.isShuffle && state.playlist.length > 1) {
      let nextIndex;
      do {
        nextIndex = Math.floor(Math.random() * state.playlist.length);
      } while (nextIndex === state.currentIndex);
      tuneChannel(nextIndex, true);
    } else {
      const nextIndex = (state.currentIndex + 1) % state.playlist.length;
      tuneChannel(nextIndex, true);
    }
  }

  function playPrevTrack() {
    if (audio.currentTime > 3) {
      audio.currentTime = 0;
      return;
    }

    if (state.history.length > 0) {
      const prevIndex = state.history.pop();
      tuneChannel(prevIndex, true);
    } else {
      const prevIndex = (state.currentIndex - 1 + state.playlist.length) % state.playlist.length;
      tuneChannel(prevIndex, true);
    }
  }

  function togglePlayPause() {
    if (state.isTestPattern) {
      toggleTestPattern(false);
    }
    if (audio.paused) {
      audio.play().then(updatePlayerUI).catch(console.warn);
    } else {
      audio.pause();
      updatePlayerUI();
    }
  }

  // ==========================================================================
  // 5. Easter Egg: Cable TV SMPTE Color Bars Screen
  // ==========================================================================
  function toggleTestPattern(forcedState) {
    const shouldBeActive = typeof forcedState === 'boolean' ? forcedState : !state.isTestPattern;
    state.isTestPattern = shouldBeActive;

    if (dom.colorbars) {
      dom.colorbars.classList.toggle('active', shouldBeActive);
    }

    if (shouldBeActive) {
      audio.pause();
      if (dom.receiverStatus) dom.receiverStatus.textContent = 'NO SIGNAL • CABLE TEST';
      if (dom.statusDot) {
        dom.statusDot.className = 'live-dot receiver-tuning-pulse';
        dom.statusDot.style.backgroundColor = '#ef4444';
      }
      if (dom.playPauseBtn) {
        dom.playPauseBtn.innerHTML = '<span style="font-size:1.1rem; line-height:1;">▶</span> <span>Resume</span>';
      }
    } else {
      updatePlayerUI();
      audio.play().catch(() => {});
    }
  }

  // ==========================================================================
  // 6. Timeline Scrubber Logic
  // ==========================================================================
  function updateProgress() {
    if (state.isSeeking || isNaN(audio.duration) || audio.duration === 0) return;

    const current = audio.currentTime;
    const total = audio.duration;
    const percentage = (current / total) * 100;

    if (dom.progressFill) dom.progressFill.style.width = `${percentage}%`;
    if (dom.progressBar) dom.progressBar.value = percentage;
    if (dom.currentTime) dom.currentTime.textContent = formatTime(current);
    if (dom.duration) dom.duration.textContent = formatTime(total);
  }

  // ==========================================================================
  // 7. Audio Element Event Listeners
  // ==========================================================================
  audio.addEventListener('timeupdate', updateProgress);
  audio.addEventListener('play', updatePlayerUI);
  audio.addEventListener('pause', updatePlayerUI);
  audio.addEventListener('ended', playNextTrack);
  audio.addEventListener('loadedmetadata', () => {
    if (dom.duration) dom.duration.textContent = formatTime(audio.duration);
    updateProgress();
  });

  // ==========================================================================
  // 8. Physical Hardware Control Bindings & Keyboard Shortcuts
  // ==========================================================================
  function initEvents() {
    if (dom.playPauseBtn) dom.playPauseBtn.addEventListener('click', togglePlayPause);
    if (dom.nextBtn) dom.nextBtn.addEventListener('click', playNextTrack);
    if (dom.prevBtn) dom.prevBtn.addEventListener('click', playPrevTrack);

    if (dom.shuffleBtn) {
      dom.shuffleBtn.addEventListener('click', () => {
        state.isShuffle = !state.isShuffle;
        dom.shuffleBtn.classList.toggle('active', state.isShuffle);
        dom.shuffleBtn.setAttribute('aria-pressed', state.isShuffle ? 'true' : 'false');
      });
    }

    // Scrubber Input Controls
    if (dom.progressBar) {
      dom.progressBar.addEventListener('input', (e) => {
        state.isSeeking = true;
        const seekPct = parseFloat(e.target.value);
        if (dom.progressFill) dom.progressFill.style.width = `${seekPct}%`;
        if (!isNaN(audio.duration)) {
          if (dom.currentTime) dom.currentTime.textContent = formatTime((seekPct / 100) * audio.duration);
        }
      });

      dom.progressBar.addEventListener('change', (e) => {
        const seekPct = parseFloat(e.target.value);
        if (!isNaN(audio.duration)) {
          audio.currentTime = (seekPct / 100) * audio.duration;
        }
        state.isSeeking = false;
      });
    }

    // Volume Controls
    if (dom.volumeSlider) {
      dom.volumeSlider.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        state.volume = val;
        audio.volume = val;
        state.isMuted = val === 0;
        if (dom.volumeBtn) dom.volumeBtn.textContent = val === 0 ? '🔇' : '🔊';
      });
    }

    if (dom.volumeBtn) {
      dom.volumeBtn.addEventListener('click', () => {
        state.isMuted = !state.isMuted;
        audio.muted = state.isMuted;
        dom.volumeBtn.textContent = state.isMuted ? '🔇' : '🔊';
      });
    }

    // CRT Scanlines Toggle
    if (dom.crtToggleBtn && dom.crtOverlay) {
      dom.crtToggleBtn.addEventListener('click', () => {
        const isActive = dom.crtOverlay.classList.toggle('crt-active');
        dom.crtToggleBtn.classList.toggle('active', isActive);
        dom.crtToggleBtn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        dom.crtToggleBtn.textContent = isActive ? 'CRT FILTER: ON' : 'CRT FILTER: OFF';
      });
    }

    // Color Bars Easter Egg Trigger
    if (dom.badgeOverlay) {
      dom.badgeOverlay.addEventListener('dblclick', () => toggleTestPattern());
    }
    if (dom.colorbarsRestoreBtn) {
      dom.colorbarsRestoreBtn.addEventListener('click', () => toggleTestPattern(false));
    }

    // Global Keyboard Shortcuts (Nostalgic Hardware Remote)
    document.addEventListener('keydown', (e) => {
      const tag = e.target.tagName.toLowerCase();
      if (tag === 'input' || tag === 'textarea') return;

      if (e.code === 'Space') {
        e.preventDefault();
        togglePlayPause();
      } else if (e.key === 'm' || e.key === 'M') {
        if (dom.volumeBtn) dom.volumeBtn.click();
      } else if (e.key === 'c' || e.key === 'C') {
        if (dom.crtToggleBtn) dom.crtToggleBtn.click();
      } else if (e.key === 't' || e.key === 'T') {
        toggleTestPattern();
      } else if (e.key === 'ArrowRight' && e.altKey) {
        playNextTrack();
      } else if (e.key === 'ArrowLeft' && e.altKey) {
        playPrevTrack();
      } else if (['1', '2', '3', '4', '5', '6', '7'].includes(e.key)) {
        // Direct Channel Tuning Numbers 1 through 7
        const channelIndex = parseInt(e.key, 10) - 1;
        if (channelIndex < state.playlist.length) {
          tuneChannel(channelIndex, true);
        }
      }
    });

    // Delegation for all Tune Buttons & Dial Slots across the page
    document.addEventListener('click', (e) => {
      const tuneBtn = e.target.closest('.btn-tune, .dial-slot-node');
      if (tuneBtn) {
        const cartoonTarget = tuneBtn.getAttribute('data-cartoon');
        const trackIdTarget = tuneBtn.getAttribute('data-track-id');
        if (trackIdTarget) {
          window.CartoonPlayer.playTrackById(trackIdTarget);
        } else if (cartoonTarget) {
          window.CartoonPlayer.playTrackByCartoon(cartoonTarget);
        }
      }
    });
  }

  // ==========================================================================
  // 9. Public API
  // ==========================================================================
  window.CartoonPlayer = {
    play: () => {
      if (audio.paused) togglePlayPause();
    },
    pause: () => {
      if (!audio.paused) togglePlayPause();
    },
    toggle: togglePlayPause,
    next: playNextTrack,
    prev: playPrevTrack,
    tuneChannel: tuneChannel,
    toggleTestPattern: toggleTestPattern,
    playTrackById: (trackId) => {
      const idx = state.playlist.findIndex((t) => t.id === trackId);
      if (idx !== -1) {
        tuneChannel(idx, true);
        const playerSec = document.getElementById('nostalgic-player');
        if (playerSec) {
          playerSec.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    },
    playTrackByCartoon: (cartoonKey) => {
      const idx = state.playlist.findIndex(
        (t) => t.cartoon.toLowerCase() === cartoonKey.toLowerCase()
      );
      if (idx !== -1) {
        tuneChannel(idx, true);
        const playerSec = document.getElementById('nostalgic-player');
        if (playerSec) {
          playerSec.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    }
  };

  // Initial Load (Cathode Ray Startup)
  initEvents();
  tuneChannel(0, false);
})();
