/* ============================================================
   AUREUM CONSTRUCTIONS – GALLERY.JS
   Masonry filter, project filter, lightbox
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Gallery / Project Filter ──────────────────────────────
  document.querySelectorAll('.filter-tabs').forEach(tabContainer => {
    const tabs  = tabContainer.querySelectorAll('.filter-tab');
    const grid  = tabContainer.nextElementSibling || document.querySelector('.filter-grid');
    if (!grid) return;

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const filter = tab.dataset.filter;
        const items  = grid.querySelectorAll('[data-category]');

        items.forEach((item, i) => {
          const match = filter === 'all' || item.dataset.category === filter;
          item.style.transition = `opacity 0.4s ease ${i * 0.05}s, transform 0.4s ease ${i * 0.05}s`;
          if (match) {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.92)';
            setTimeout(() => {
              item.style.display = '';
              requestAnimationFrame(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
              });
            }, 50);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.92)';
            setTimeout(() => { item.style.display = 'none'; }, 400);
          }
        });
      });
    });
  });

  // ── Lightbox ─────────────────────────────────────────────
  const lightbox    = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');

  if (lightbox && lightboxImg) {
    document.querySelectorAll('[data-lightbox]').forEach(trigger => {
      trigger.addEventListener('click', () => {
        const src = trigger.dataset.lightbox || trigger.src || trigger.querySelector('img')?.src;
        const alt = trigger.dataset.alt || trigger.querySelector('img')?.alt || '';
        if (src) {
          lightboxImg.src = src;
          lightboxImg.alt = alt;
          lightbox.classList.add('open');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    function closeLightbox() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
      setTimeout(() => { lightboxImg.src = ''; }, 300);
    }

    lightboxClose?.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeLightbox();
    });
  }

  // ── Auto-detect gallery images and add lightbox triggers ──
  document.querySelectorAll('.masonry-item img, .gallery-img').forEach(img => {
    if (!img.closest('[data-lightbox]') && !img.dataset.lightbox) {
      const parent = img.closest('.masonry-item') || img.parentElement;
      if (parent && !parent.dataset.lightbox) {
        parent.dataset.lightbox = img.src;
        parent.dataset.alt = img.alt;
        parent.style.cursor = 'zoom-in';
      }
    }
  });

  // ── Scroll masonry effect ─────────────────────────────────
  const masonryItems = document.querySelectorAll('.masonry-item');
  if (masonryItems.length) {
    const mObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '0';
          entry.target.style.transform = 'translateY(30px)';
          setTimeout(() => {
            entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, i * 60);
          mObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '-30px' });
    masonryItems.forEach(item => mObserver.observe(item));
  }

});
