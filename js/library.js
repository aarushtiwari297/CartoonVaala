/* ==========================================================================
   Cartoon Vaala — Nostalgic Library Engine
   Category Filtering, 1:1 Memory Card Rendering, Discovery Loop & Modal Viewer
   ========================================================================== */

(function () {
  'use strict';

  // State Management
  const state = {
    memories: typeof nostalgicMemories !== 'undefined' ? [...nostalgicMemories] : [],
    activeCategory: 'all',
    currentModalIndex: 0,
    lastFocusedElement: null
  };

  // Cached DOM Elements
  const dom = {
    grid: document.getElementById('library-grid'),
    filterTabs: document.querySelectorAll('.library-filter-tab'),
    randomBtn: document.getElementById('btn-random-memory'),
    modal: document.getElementById('memory-modal'),
    modalVisual: document.getElementById('modal-visual'),
    modalCategory: document.getElementById('modal-category'),
    modalEra: document.getElementById('modal-era'),
    modalTitle: document.getElementById('modal-title'),
    modalQuote: document.getElementById('modal-quote'),
    modalLore: document.getElementById('modal-lore'),
    modalPrevBtn: document.getElementById('modal-prev-btn'),
    modalNextBtn: document.getElementById('modal-next-btn'),
    modalCloseBtn: document.getElementById('modal-close-btn'),
    modalRandomBtn: document.getElementById('modal-random-btn'),
    modalBackdrop: document.getElementById('modal-backdrop')
  };

  // ==========================================================================
  // 1. Render Memory Cards (1:1 Square Visuals + Short Human Captions)
  // ==========================================================================
  function renderGrid() {
    if (!dom.grid) return;

    const filtered = state.activeCategory === 'all'
      ? state.memories
      : state.memories.filter((m) => m.category === state.activeCategory);

    dom.grid.innerHTML = '';

    if (filtered.length === 0) {
      dom.grid.innerHTML = `
        <div class="library-empty-state">
          <p>No memories found in this category.</p>
        </div>
      `;
      return;
    }

    const fragment = document.createDocumentFragment();

    filtered.forEach((item, idx) => {
      const card = document.createElement('article');
      card.className = 'memory-card reveal-on-scroll is-revealed';
      card.setAttribute('data-memory-id', item.id);
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `${item.title}: ${item.subtitle}`);

      // Slight controlled organic rotation (-1deg, 0deg, 1deg) for scrapbook feeling
      const tiltAngle = (idx % 3 === 0) ? -0.8 : (idx % 3 === 1 ? 0.8 : 0);
      card.style.setProperty('--card-tilt', `${tiltAngle}deg`);

      const visualHTML = typeof getMemoryVisualHTML === 'function'
        ? getMemoryVisualHTML(item, false)
        : (typeof getMemoryVisualSVG === 'function' ? getMemoryVisualSVG(item) : `<span>${item.icon}</span>`);

      card.innerHTML = `
        <div class="memory-card-visual-frame">
          <div class="memory-card-visual-inner">
            ${visualHTML}
          </div>
          <span class="memory-stamp-pill" style="border-color:${item.accentColor}; color:${item.accentColor};">${item.categoryLabel}</span>
        </div>
        <div class="memory-card-body">
          <h3 class="memory-card-title">${item.title}</h3>
          <p class="memory-card-quote">"${item.quote}"</p>
        </div>
      `;

      // Event Listeners for Card Click & Keyboard Enter
      card.addEventListener('click', () => {
        const globalIdx = state.memories.findIndex((m) => m.id === item.id);
        if (globalIdx !== -1) {
          state.lastFocusedElement = card;
          openModal(globalIdx);
        }
      });

      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const globalIdx = state.memories.findIndex((m) => m.id === item.id);
          if (globalIdx !== -1) {
            state.lastFocusedElement = card;
            openModal(globalIdx);
          }
        }
      });

      fragment.appendChild(card);
    });

    dom.grid.appendChild(fragment);
  }

  // ==========================================================================
  // 2. Category Filter Switcher
  // ==========================================================================
  function setCategory(category) {
    state.activeCategory = category;

    if (dom.filterTabs) {
      dom.filterTabs.forEach((tab) => {
        const cat = tab.getAttribute('data-category');
        if (cat === category) {
          tab.classList.add('active');
          tab.setAttribute('aria-selected', 'true');
        } else {
          tab.classList.remove('active');
          tab.setAttribute('aria-selected', 'false');
        }
      });
    }

    renderGrid();
  }

  // ==========================================================================
  // 3. Accessible Memory Detail Modal
  // ==========================================================================
  function openModal(index) {
    if (index < 0 || index >= state.memories.length || !dom.modal) return;

    state.currentModalIndex = index;
    const item = state.memories[index];

    // Populate Modal Content
    if (dom.modalCategory) dom.modalCategory.textContent = item.categoryLabel.toUpperCase();
    if (dom.modalEra) dom.modalEra.textContent = item.era;
    if (dom.modalTitle) dom.modalTitle.textContent = item.title;
    if (dom.modalQuote) dom.modalQuote.textContent = `"${item.quote}"`;
    if (dom.modalLore) dom.modalLore.textContent = item.lore;

    if (dom.modalVisual) {
      dom.modalVisual.innerHTML = typeof getMemoryVisualHTML === 'function'
        ? getMemoryVisualHTML(item, true)
        : (typeof getMemoryVisualSVG === 'function' ? getMemoryVisualSVG(item) : `<span>${item.icon}</span>`);
    }

    // Show Modal
    dom.modal.classList.add('active');
    dom.modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus close button for accessibility
    if (dom.modalCloseBtn) {
      dom.modalCloseBtn.focus();
    }
  }

  function closeModal() {
    if (!dom.modal) return;
    dom.modal.classList.remove('active');
    dom.modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    if (state.lastFocusedElement) {
      state.lastFocusedElement.focus();
    }
  }

  function modalNext() {
    const nextIdx = (state.currentModalIndex + 1) % state.memories.length;
    openModal(nextIdx);
  }

  function modalPrev() {
    const prevIdx = (state.currentModalIndex - 1 + state.memories.length) % state.memories.length;
    openModal(prevIdx);
  }

  function modalRandom() {
    let randIdx;
    do {
      randIdx = Math.floor(Math.random() * state.memories.length);
    } while (randIdx === state.currentModalIndex && state.memories.length > 1);
    openModal(randIdx);
  }

  // ==========================================================================
  // 4. Random Memory Discovery Button ("Show me another memory")
  // ==========================================================================
  function pickRandomMemory() {
    if (state.memories.length === 0) return;
    const randIdx = Math.floor(Math.random() * state.memories.length);
    openModal(randIdx);
  }

  // ==========================================================================
  // 5. Initialize Event Handlers
  // ==========================================================================
  function init() {
    // Filter Tabs
    if (dom.filterTabs) {
      dom.filterTabs.forEach((tab) => {
        tab.addEventListener('click', () => {
          const cat = tab.getAttribute('data-category');
          if (cat) setCategory(cat);
        });
      });
    }

    // Random Discovery Button
    if (dom.randomBtn) {
      dom.randomBtn.addEventListener('click', pickRandomMemory);
    }

    // Modal Nav Controls
    if (dom.modalCloseBtn) dom.modalCloseBtn.addEventListener('click', closeModal);
    if (dom.modalBackdrop) dom.modalBackdrop.addEventListener('click', closeModal);
    if (dom.modalNextBtn) dom.modalNextBtn.addEventListener('click', modalNext);
    if (dom.modalPrevBtn) dom.modalPrevBtn.addEventListener('click', modalPrev);
    if (dom.modalRandomBtn) dom.modalRandomBtn.addEventListener('click', modalRandom);

    // Global Modal Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
      if (!dom.modal || !dom.modal.classList.contains('active')) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        closeModal();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        modalNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        modalPrev();
      }
    });

    // Initial Render
    renderGrid();
  }

  // Public API
  window.NostalgicLibrary = {
    render: renderGrid,
    setCategory: setCategory,
    open: openModal,
    close: closeModal,
    random: pickRandomMemory
  };

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
