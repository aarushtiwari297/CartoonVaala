/* ==========================================================================
   Cartoon Vaala — HTML5 Audio Engine & Master CRT TV Sync
   Tactile Transport Controls, EPG Station Tuning, Non-Repeating Shuffle
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
    history: []
  };

  const audio = new Audio();
  audio.preload = 'auto';
  audio.volume = state.volume;

  // Cached DOM References
  const dom = {
    chassis: document.getElementById('nostalgic-player'),
    cartoonName: document.getElementById('player-cartoon-name'),
    trackTitle: document.getElementById('player-track-title'),
    channelBadge: document.getElementById('player-channel-badge'),
    cartoonImage: document.getElementById('player-cartoon-image'),
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
    playlistList: document.getElementById('player-playlist-list'),
    trackCount: document.getElementById('player-track-count'),
    crtToggleBtn: document.getElementById('crt-toggle-btn'),
    crtOverlay: document.querySelector('.crt-overlay')
  };

  // ==========================================================================
  // 1. Time Formatting Helper
  // ==========================================================================
  function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  // ==========================================================================
  // 2. Render Master Playlist Drawer
  // ==========================================================================
  function renderPlaylist() {
    if (!dom.playlistList) return;
    dom.playlistList.innerHTML = '';

    state.playlist.forEach((track, idx) => {
      const li = document.createElement('li');
      li.className = `playlist-track-item ${idx === state.currentIndex ? 'active' : ''}`;
      li.setAttribute('data-index', idx);
      li.setAttribute('role', 'button');
      li.setAttribute('tabindex', '0');

      li.innerHTML = `
        <span class="playlist-item-num">${(idx + 1).toString().padStart(2, '0')}</span>
        <div class="playlist-item-meta">
          <div class="playlist-item-title">${track.title}</div>
          <div class="playlist-item-channel">${track.channel || 'Classic'}</div>
        </div>
      `;

      li.addEventListener('click', () => {
        loadAndPlayTrack(idx, true);
      });

      dom.playlistList.appendChild(li);
    });

    if (dom.trackCount) {
      dom.trackCount.textContent = `${state.playlist.length} Master Tapes`;
    }
  }

  // ==========================================================================
  // 3. Update Visual Player Console State
  // ==========================================================================
  function updatePlayerUI() {
    const track = state.playlist[state.currentIndex];
    if (!track) return;

    // 1. Update Text Metadata
    if (dom.cartoonName) dom.cartoonName.textContent = track.cartoon;
    if (dom.trackTitle) dom.trackTitle.textContent = track.title;
    if (dom.channelBadge) dom.channelBadge.textContent = track.channel || 'TV Broadcast';

    // 2. Smoothly Transition CRT Still Image
    if (dom.cartoonImage && track.image) {
      if (dom.cartoonImage.getAttribute('src') !== track.image) {
        dom.cartoonImage.classList.add('image-transitioning');
        setTimeout(() => {
          dom.cartoonImage.src = track.image;
          dom.cartoonImage.alt = `${track.cartoon} TV Broadcast Still`;
          dom.cartoonImage.classList.remove('image-transitioning');
        }, 150);
      }
    }

    // 3. Sync Play/Pause Button State
    const isPlaying = !audio.paused;
    state.isPlaying = isPlaying;

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
        if (label) label.textContent = 'Audio Active';
      } else {
        btn.classList.remove('playing');
        btn.setAttribute('aria-pressed', 'false');
        if (label) label.textContent = 'Play Songs';
      }
    });

    // 5. Sync Active Playlist Item
    if (dom.playlistList) {
      const items = dom.playlistList.querySelectorAll('.playlist-track-item');
      items.forEach((item, idx) => {
        if (idx === state.currentIndex) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    }

    // 6. Sync Active Transmission Dial Node
    const dialNodes = document.querySelectorAll('.dial-slot-node');
    dialNodes.forEach((node) => {
      const cartoonTarget = node.getAttribute('data-cartoon');
      const trackIdTarget = node.getAttribute('data-track-id');
      if (trackIdTarget === track.id || (cartoonTarget && cartoonTarget.toLowerCase() === track.cartoon.toLowerCase())) {
        node.classList.add('active');
      } else {
        node.classList.remove('active');
      }
    });
  }

  // ==========================================================================
  // 4. Track Playback Controls
  // ==========================================================================
  function loadAndPlayTrack(index, autoPlay = true) {
    if (index < 0 || index >= state.playlist.length) return;

    if (state.currentIndex !== index) {
      state.history.push(state.currentIndex);
      if (state.history.length > 20) state.history.shift();
    }

    state.currentIndex = index;
    const track = state.playlist[state.currentIndex];

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
  }

  function playNextTrack() {
    if (state.isShuffle && state.playlist.length > 1) {
      let nextIndex;
      do {
        nextIndex = Math.floor(Math.random() * state.playlist.length);
      } while (nextIndex === state.currentIndex);
      loadAndPlayTrack(nextIndex, true);
    } else {
      const nextIndex = (state.currentIndex + 1) % state.playlist.length;
      loadAndPlayTrack(nextIndex, true);
    }
  }

  function playPrevTrack() {
    if (audio.currentTime > 3) {
      audio.currentTime = 0;
      return;
    }

    if (state.history.length > 0) {
      const prevIndex = state.history.pop();
      loadAndPlayTrack(prevIndex, true);
    } else {
      const prevIndex = (state.currentIndex - 1 + state.playlist.length) % state.playlist.length;
      loadAndPlayTrack(prevIndex, true);
    }
  }

  function togglePlayPause() {
    if (audio.paused) {
      audio.play().then(updatePlayerUI).catch(console.warn);
    } else {
      audio.pause();
      updatePlayerUI();
    }
  }

  // ==========================================================================
  // 5. Timeline Scrubber Logic
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
  // 6. Audio Element Event Listeners
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
  // 7. Physical Hardware Control Bindings
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

    // Global Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
      const tag = e.target.tagName.toLowerCase();
      if (tag === 'input' || tag === 'textarea') return;

      if (e.code === 'Space') {
        e.preventDefault();
        togglePlayPause();
      } else if (e.key === 'm' || e.key === 'M') {
        if (dom.volumeBtn) dom.volumeBtn.click();
      } else if (e.key === 'ArrowRight' && e.altKey) {
        playNextTrack();
      } else if (e.key === 'ArrowLeft' && e.altKey) {
        playPrevTrack();
      }
    });

    // Broadcast Schedule & Transmission Dial Node Delegation
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
  // 8. Public API
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
    playTrackById: (trackId) => {
      const idx = state.playlist.findIndex((t) => t.id === trackId);
      if (idx !== -1) {
        loadAndPlayTrack(idx, true);
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
        loadAndPlayTrack(idx, true);
        const playerSec = document.getElementById('nostalgic-player');
        if (playerSec) {
          playerSec.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    }
  };

  // Initial Load
  renderPlaylist();
  initEvents();
  loadAndPlayTrack(0, false);
})();
