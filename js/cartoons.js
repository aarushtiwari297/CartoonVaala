/* ==========================================================================
   Cartoon Vaala — Master Cartoon Archive Engine
   Network Filtering, Instant Real-Time Search, Multi-Track Audio Jukebox,
   Deep-Dive Modal Chronicles & Analog Tuner Synchronization
   ========================================================================== */

(function () {
  'use strict';

  // State
  const state = {
    cartoons: typeof masterCartoonsData !== 'undefined' ? [...masterCartoonsData] : [],
    activeNetwork: 'all',
    searchQuery: '',
    currentModalIndex: 0,
    lastFocusedElement: null
  };

  // DOM references
  const dom = {
    grid: document.getElementById('cartoons-showcase-container'),
    filterTabs: document.querySelectorAll('.cartoon-filter-tab'),
    searchInput: document.getElementById('cartoon-search-input'),
    searchClear: document.getElementById('cartoon-search-clear'),
    randomBtn: document.getElementById('btn-random-cartoon'),
    countBadge: document.getElementById('cartoons-count-badge'),
    // Modal Elements
    modal: document.getElementById('cartoon-modal'),
    modalBackdrop: document.getElementById('cartoon-modal-backdrop'),
    modalCloseBtn: document.getElementById('cartoon-modal-close'),
    modalChannelBadge: document.getElementById('modal-cartoon-channel'),
    modalSlot: document.getElementById('modal-cartoon-slot'),
    modalFrequency: document.getElementById('modal-cartoon-freq'),
    modalTitle: document.getElementById('modal-cartoon-title'),
    modalHindiTitle: document.getElementById('modal-cartoon-hindi-title'),
    modalTagline: document.getElementById('modal-cartoon-tagline'),
    modalQuote: document.getElementById('modal-cartoon-quote'),
    modalSynopsis: document.getElementById('modal-cartoon-synopsis'),
    modalDubLore: document.getElementById('modal-cartoon-dub-lore'),
    modalPlayground: document.getElementById('modal-cartoon-playground'),
    modalCharactersList: document.getElementById('modal-cartoon-characters'),
    modalGadgetsList: document.getElementById('modal-cartoon-gadgets'),
    modalCatchphrasesList: document.getElementById('modal-cartoon-catchphrases'),
    modalTracksList: document.getElementById('modal-cartoon-tracks'),
    modalVisual: document.getElementById('modal-cartoon-visual'),
    modalPrevBtn: document.getElementById('modal-cartoon-prev'),
    modalNextBtn: document.getElementById('modal-cartoon-next')
  };

  // ==========================================================================
  // 1. Filtering & Live Search Logic
  // ==========================================================================
  function applyFilters() {
    const query = state.searchQuery.trim().toLowerCase();
    const network = state.activeNetwork;
    const cards = document.querySelectorAll('.cartoon-archive-card');
    let visibleCount = 0;

    cards.forEach((card) => {
      const cardNetwork = card.getAttribute('data-network') || '';
      const cardText = card.getAttribute('data-search-text') || '';

      const matchesNetwork = network === 'all' || cardNetwork === network;
      const matchesSearch = !query || cardText.toLowerCase().includes(query);

      if (matchesNetwork && matchesSearch) {
        card.style.display = '';
        card.classList.add('is-revealed');
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    // Update count badge
    if (dom.countBadge) {
      dom.countBadge.textContent = `${visibleCount} ${visibleCount === 1 ? 'Show' : 'Shows'} Preserved`;
    }

    // Toggle empty state
    const emptyState = document.getElementById('cartoons-empty-state');
    if (emptyState) {
      emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  function setNetworkFilter(networkKey) {
    state.activeNetwork = networkKey;
    dom.filterTabs.forEach((tab) => {
      const tabKey = tab.getAttribute('data-filter');
      const isActive = tabKey === networkKey;
      tab.classList.toggle('active', isActive);
      tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
    applyFilters();
  }

  // ==========================================================================
  // 2. Multi-Track Jukebox Integration & Active State Tracking
  // ==========================================================================
  function syncActiveTrackPills() {
    // Check which track is playing in window.CartoonPlayer
    const allTrackButtons = document.querySelectorAll('.track-pill-btn');
    const audioPlaying = window.CartoonPlayer && typeof window.CartoonPlayer.isPlaying === 'function'
      ? window.CartoonPlayer.isPlaying()
      : false;

    // Find current track id if available
    let currentTrackId = null;
    const pillMeta = document.getElementById('pill-track-title');
    const ambientTitle = document.getElementById('ambient-track-title');

    allTrackButtons.forEach((btn) => {
      const trackId = btn.getAttribute('data-track-id');
      const card = btn.closest('.cartoon-archive-card');

      // Check if button or card has active class
      if (btn.classList.contains('active-track')) {
        const eq = btn.querySelector('.track-pill-eq');
        if (eq) {
          eq.classList.toggle('active', audioPlaying);
        }
      }
    });
  }

  // Handle direct track click
  document.addEventListener('click', (e) => {
    const trackBtn = e.target.closest('.track-pill-btn');
    if (trackBtn) {
      e.preventDefault();
      const trackId = trackBtn.getAttribute('data-track-id');
      if (trackId && window.CartoonPlayer) {
        window.CartoonPlayer.playTrackById(trackId);

        // Highlight this specific button
        document.querySelectorAll('.track-pill-btn').forEach((b) => {
          b.classList.remove('active-track');
          const eq = b.querySelector('.track-pill-eq');
          if (eq) eq.classList.remove('active');
        });
        trackBtn.classList.add('active-track');
        const eq = trackBtn.querySelector('.track-pill-eq');
        if (eq) eq.classList.add('active');
      }
    }
  });

  // ==========================================================================
  // 3. Deep-Dive Modal Logic
  // ==========================================================================
  function openCartoonModal(index) {
    if (index < 0 || index >= state.cartoons.length) return;
    state.currentModalIndex = index;
    const data = state.cartoons[index];
    if (!data || !dom.modal) return;

    state.lastFocusedElement = document.activeElement;

    // Populate Modal Content
    if (dom.modalChannelBadge) {
      dom.modalChannelBadge.textContent = `${data.channel} • ${data.channelCode}`;
      dom.modalChannelBadge.className = `channel-pill ${data.networkKey}`;
    }
    if (dom.modalSlot) dom.modalSlot.textContent = data.slot;
    if (dom.modalFrequency) dom.modalFrequency.textContent = data.frequency;
    if (dom.modalTitle) dom.modalTitle.textContent = data.name;
    if (dom.modalHindiTitle) dom.modalHindiTitle.textContent = data.hindiTitle || '';
    if (dom.modalTagline) dom.modalTagline.textContent = `"${data.tagline}"`;
    if (dom.modalQuote) dom.modalQuote.textContent = data.quote;
    if (dom.modalSynopsis) dom.modalSynopsis.textContent = data.synopsis;
    if (dom.modalDubLore) dom.modalDubLore.textContent = data.hindiDubFolklore;
    if (dom.modalPlayground) dom.modalPlayground.textContent = data.playgroundImprint;

    // Visual image
    if (dom.modalVisual) {
      dom.modalVisual.innerHTML = `
        <div class="modal-cartoon-img-wrap">
          <img src="${data.image}" alt="${data.name} Broadcast Visual" class="modal-cartoon-img">
          <div class="modal-cartoon-img-overlay">
            <span class="channel-pill ${data.networkKey}">${data.channel}</span>
            <span class="text-mono" style="font-size:0.75rem; color:#fff; background:rgba(0,0,0,0.6); padding:2px 8px; border-radius:4px;">${data.era}</span>
          </div>
        </div>
      `;
    }

    // Characters List
    if (dom.modalCharactersList) {
      dom.modalCharactersList.innerHTML = data.characters.map((c) => `
        <li class="modal-lore-item">
          <strong style="color:var(--color-text-heading);">${c.name}</strong>
          <span style="color:var(--color-text-subtle);"> — ${c.role}</span>
        </li>
      `).join('');
    }

    // Gadgets / Artefacts
    if (dom.modalGadgetsList) {
      dom.modalGadgetsList.innerHTML = data.gadgets.map((g) => `
        <span class="modal-pill-tag">${g}</span>
      `).join('');
    }

    // Catchphrases
    if (dom.modalCatchphrasesList) {
      dom.modalCatchphrasesList.innerHTML = data.catchphrases.map((cp) => `
        <li class="modal-quote-item">"${cp}"</li>
      `).join('');
    }

    // Audio tracks inside modal
    if (dom.modalTracksList) {
      dom.modalTracksList.innerHTML = data.tracks.map((t, idx) => `
        <div class="modal-track-card">
          <div class="modal-track-info">
            <div class="modal-track-title">${t.title}</div>
            <div class="modal-track-sub">${t.subtitle}</div>
          </div>
          <button class="track-pill-btn" data-track-id="${t.id}" aria-label="Play ${t.title}">
            <span class="track-pill-icon">▶</span>
            <span>Audition Track</span>
            <div class="track-pill-eq" aria-hidden="true">
              <span></span><span></span><span></span>
            </div>
          </button>
        </div>
      `).join('');
    }

    // Open Modal
    dom.modal.classList.add('active');
    dom.modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus close button
    if (dom.modalCloseBtn) {
      dom.modalCloseBtn.focus();
    }
  }

  function closeCartoonModal() {
    if (!dom.modal) return;
    dom.modal.classList.remove('active');
    dom.modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    if (state.lastFocusedElement) {
      state.lastFocusedElement.focus();
    }
  }

  function modalNext() {
    const nextIdx = (state.currentModalIndex + 1) % state.cartoons.length;
    openCartoonModal(nextIdx);
  }

  function modalPrev() {
    const prevIdx = (state.currentModalIndex - 1 + state.cartoons.length) % state.cartoons.length;
    openCartoonModal(prevIdx);
  }

  // ==========================================================================
  // 4. Random Discovery
  // ==========================================================================
  function triggerRandomCartoon() {
    if (state.cartoons.length === 0) return;
    const randIndex = Math.floor(Math.random() * state.cartoons.length);
    const cartoon = state.cartoons[randIndex];

    // Play first track of this cartoon
    if (cartoon.tracks && cartoon.tracks[0] && window.CartoonPlayer) {
      window.CartoonPlayer.playTrackById(cartoon.tracks[0].id);
    }

    // Scroll to cartoon card
    const targetCard = document.querySelector(`.cartoon-archive-card[data-cartoon-id="${cartoon.id}"]`);
    if (targetCard) {
      targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      targetCard.classList.add('highlight-pulse');
      setTimeout(() => targetCard.classList.remove('highlight-pulse'), 1500);
    }
  }

  // ==========================================================================
  // 5. Initialize Events & Delegation
  // ==========================================================================
  function initEvents() {
    // Network Filter Tabs
    dom.filterTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const filter = tab.getAttribute('data-filter');
        if (filter) setNetworkFilter(filter);
      });
    });

    // Search Input
    if (dom.searchInput) {
      dom.searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
        if (dom.searchClear) {
          dom.searchClear.style.display = state.searchQuery ? 'block' : 'none';
        }
        applyFilters();
      });
    }

    if (dom.searchClear) {
      dom.searchClear.addEventListener('click', () => {
        if (dom.searchInput) {
          dom.searchInput.value = '';
          state.searchQuery = '';
          dom.searchClear.style.display = 'none';
          dom.searchInput.focus();
          applyFilters();
        }
      });
    }

    // Random Discovery Button
    if (dom.randomBtn) {
      dom.randomBtn.addEventListener('click', triggerRandomCartoon);
    }

    // Modal Triggers Delegation (Clicking "Deep Dive & Lore" or Card Title)
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('.btn-deep-dive, .cartoon-modal-trigger');
      if (trigger) {
        const cartoonId = trigger.getAttribute('data-cartoon-id');
        const idx = state.cartoons.findIndex((c) => c.id === cartoonId);
        if (idx !== -1) {
          openCartoonModal(idx);
        }
      }
    });

    // Modal Nav Controls
    if (dom.modalCloseBtn) dom.modalCloseBtn.addEventListener('click', closeCartoonModal);
    if (dom.modalBackdrop) dom.modalBackdrop.addEventListener('click', closeCartoonModal);
    if (dom.modalNextBtn) dom.modalNextBtn.addEventListener('click', modalNext);
    if (dom.modalPrevBtn) dom.modalPrevBtn.addEventListener('click', modalPrev);

    // Keyboard bindings
    document.addEventListener('keydown', (e) => {
      if (dom.modal && dom.modal.classList.contains('active')) {
        if (e.key === 'Escape') {
          closeCartoonModal();
        } else if (e.key === 'ArrowRight') {
          modalNext();
        } else if (e.key === 'ArrowLeft') {
          modalPrev();
        }
      }
    });
  }

  // Init on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEvents);
  } else {
    initEvents();
  }
})();
