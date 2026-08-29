/* ==========================================================================
   Cartoon Vaala — Main Interactive Orchestrator
   Navigation, Mobile Menu Drawer, Header Scroll States, BGM Sync,
   Crisp Scroll Reveals & Persistent Broadcast State Monitor
   ========================================================================== */

(function () {
  'use strict';

  // ==========================================================================
  // 1. Navigation & Header Scroll State
  // ==========================================================================
  const header = document.getElementById('header');
  const menuToggle = document.getElementById('menu-toggle');
  const mainNav = document.getElementById('main-nav');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (!header) return;
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  function closeMobileNav() {
    if (mainNav && menuToggle) {
      mainNav.classList.remove('open');
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  }

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      menuToggle.classList.toggle('active', isOpen);
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', closeMobileNav);
    });

    // Close mobile menu on resize to desktop width
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768) {
        closeMobileNav();
      }
    }, { passive: true });
  }

  // Header BGM Toggle Buttons
  const bgmButtons = document.querySelectorAll('.bgm-toggle');
  bgmButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (window.CartoonPlayer) {
        window.CartoonPlayer.toggle();
      }
    });
  });

  // ==========================================================================
  // 2. Persistent Floating Broadcast Status Observer
  // ==========================================================================
  const broadcastPill = document.getElementById('broadcast-pill');
  const heroPlayer = document.getElementById('nostalgic-player');

  if (broadcastPill && heroPlayer && 'IntersectionObserver' in window) {
    const playerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // If the hero TV deck is visible in viewport, hide floating pill;
          // When user scrolls past it, show floating pill.
          if (entry.isIntersecting) {
            broadcastPill.classList.remove('visible');
          } else {
            broadcastPill.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    playerObserver.observe(heroPlayer);
  }

  // ==========================================================================
  // 3. Crisp Landmark Scroll Reveals
  // ==========================================================================
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -30px 0px', threshold: 0.05 }
    );

    revealElements.forEach((el) => observer.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('is-revealed'));
  }
})();
