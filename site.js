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
