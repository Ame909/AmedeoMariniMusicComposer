(() => {
  const DISCORD_HANDLE = '@amepulses';

  document.querySelectorAll('[data-copy-discord]').forEach((button) => {
    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(DISCORD_HANDLE);
        button.dataset.originalLabel = button.dataset.originalLabel || button.textContent;
        if (button.classList.contains('contact-option')) {
          button.textContent = 'Copied @amepulses';
          window.setTimeout(() => {
            button.textContent = button.dataset.originalLabel;
          }, 1400);
        } else {
          alert('Discord username copied: @amepulses');
        }
      } catch {
        alert('Discord: @amepulses');
      }
    });
  });

  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      menuToggle.classList.toggle('open', isOpen);
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    mobileMenu.querySelectorAll('a, button').forEach((item) => {
      item.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        menuToggle.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  document.querySelectorAll('[aria-disabled="true"]').forEach((item) => {
    item.addEventListener('click', (event) => event.preventDefault());
  });

  /* -------------------- */
  /* FEATURED VIDEO CAROUSEL */
  /* -------------------- */

  const carousel = document.getElementById('featuredCarousel');

  if (carousel) {
    const slides = Array.from(carousel.querySelectorAll('[data-carousel-slide]'));
    const dots = Array.from(document.querySelectorAll('[data-carousel-dot]'));
    const prevButton = carousel.querySelector('[data-carousel-prev]');
    const nextButton = carousel.querySelector('[data-carousel-next]');
    let activeIndex = 0;
    let touchStartX = 0;
    let wheelLocked = false;

    const wrapIndex = (index) => (index + slides.length) % slides.length;

    function renderCarousel() {
      const previousIndex = wrapIndex(activeIndex - 1);
      const nextIndex = wrapIndex(activeIndex + 1);

      slides.forEach((slide, index) => {
        slide.classList.remove('is-active', 'is-prev', 'is-next');
        slide.setAttribute('aria-hidden', 'true');

        if (index === activeIndex) {
          slide.classList.add('is-active');
          slide.setAttribute('aria-hidden', 'false');
        } else if (index === previousIndex) {
          slide.classList.add('is-prev');
        } else if (index === nextIndex) {
          slide.classList.add('is-next');
        }
      });

      dots.forEach((dot, index) => {
        const isActive = index === activeIndex;
        dot.classList.toggle('is-active', isActive);
        dot.setAttribute('aria-current', isActive ? 'true' : 'false');
      });
    }

    function goTo(index) {
      activeIndex = wrapIndex(index);
      renderCarousel();
    }

    function goPrevious() {
      goTo(activeIndex - 1);
    }

    function goNext() {
      goTo(activeIndex + 1);
    }

    prevButton?.addEventListener('click', goPrevious);
    nextButton?.addEventListener('click', goNext);

    slides.forEach((slide, index) => {
      slide.addEventListener('click', () => {
        if (slide.classList.contains('is-prev')) goPrevious();
        if (slide.classList.contains('is-next')) goNext();
      });
    });

    dots.forEach((dot) => {
      dot.addEventListener('click', () => {
        goTo(Number(dot.dataset.carouselDot));
      });
    });

    carousel.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goPrevious();
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        goNext();
      }
    });

    carousel.addEventListener('touchstart', (event) => {
      touchStartX = event.changedTouches[0].clientX;
    }, { passive: true });

    carousel.addEventListener('touchend', (event) => {
      const touchEndX = event.changedTouches[0].clientX;
      const distance = touchEndX - touchStartX;

      if (Math.abs(distance) < 45) return;
      if (distance > 0) goPrevious();
      else goNext();
    }, { passive: true });

    carousel.addEventListener('wheel', (event) => {
      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY) || Math.abs(event.deltaX) < 12) return;
      event.preventDefault();
      if (wheelLocked) return;

      wheelLocked = true;
      if (event.deltaX > 0) goNext();
      else goPrevious();

      window.setTimeout(() => {
        wheelLocked = false;
      }, 320);
    }, { passive: false });

    renderCarousel();
  }

  /* -------------------- */
  /* CONTACT MODAL */
  /* -------------------- */

  const modal = document.getElementById('contactModal');
  const modalPanel = modal?.querySelector('.contact-modal-panel');
  const closeButton = modal?.querySelector('[data-close-contact]');
  let previousFocus = null;

  function openContactModal() {
    if (!modal) return;
    previousFocus = document.activeElement;
    modal.hidden = false;
    document.body.classList.add('modal-open');
    requestAnimationFrame(() => modal.classList.add('open'));
    closeButton?.focus();
  }

  function closeContactModal() {
    if (!modal) return;
    modal.classList.remove('open');
    document.body.classList.remove('modal-open');
    window.setTimeout(() => {
      modal.hidden = true;
      previousFocus?.focus?.();
    }, 180);
  }

  document.querySelectorAll('.contact-trigger').forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      openContactModal();
    });
  });

  closeButton?.addEventListener('click', closeContactModal);

  modal?.addEventListener('click', (event) => {
    if (event.target === modal) closeContactModal();
  });

  modalPanel?.addEventListener('click', (event) => event.stopPropagation());

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal && !modal.hidden) closeContactModal();
  });
})();
