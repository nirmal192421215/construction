/* ============================================================
   AUREUM CONSTRUCTIONS – ANIMATIONS.JS
   Intersection Observer, animated counters, parallax
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Intersection Observer for scroll reveals ─────────────
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '-50px 0px',
    threshold: 0.1
  });

  document.querySelectorAll(
    '.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children, .timeline-item'
  ).forEach(el => revealObserver.observe(el));

  // ── Animated Number Counters ─────────────────────────────
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-count]').forEach(el => {
    counterObserver.observe(el);
  });

  function animateCounter(el) {
    const target    = parseInt(el.dataset.count);
    const suffix    = el.dataset.suffix || '';
    const prefix    = el.dataset.prefix || '';
    const duration  = parseInt(el.dataset.duration) || 2000;
    const start     = performance.now();

    function update(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      el.textContent = prefix + current.toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  // ── Hero Parallax ────────────────────────────────────────
  const heroBg = document.querySelector('.hero-bg img');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight) {
        heroBg.style.transform = `scale(1.08) translateY(${scrollY * 0.3}px)`;
      }
    }, { passive: true });
  }

  // ── Section background parallax ──────────────────────────
  const parallaxSections = document.querySelectorAll('[data-parallax]');
  if (parallaxSections.length) {
    window.addEventListener('scroll', () => {
      parallaxSections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const speed = parseFloat(section.dataset.parallax) || 0.3;
          const offset = (rect.top / window.innerHeight) * speed * 100;
          section.style.backgroundPositionY = `calc(50% + ${offset}px)`;
        }
      });
    }, { passive: true });
  }

  // ── Stagger delay for grid children ──────────────────────
  document.querySelectorAll('.stagger-children').forEach(parent => {
    Array.from(parent.children).forEach((child, i) => {
      child.style.transitionDelay = `${i * 0.1}s`;
    });
  });

  // ── Progress bars ────────────────────────────────────────
  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.dataset.width || '0%';
        setTimeout(() => { bar.style.width = width; }, 200);
        progressObserver.unobserve(bar);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.progress-fill').forEach(bar => {
    bar.style.width = '0%';
    bar.style.transition = 'width 1.5s cubic-bezier(0.4,0,0.2,1)';
    progressObserver.observe(bar);
  });

  // ── Tilt effect on featured cards ────────────────────────
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `
        perspective(1000px)
        rotateX(${-y * 8}deg)
        rotateY(${x * 8}deg)
        translateZ(8px)
      `;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ── Active section highlight in nav ─────────────────────
  const sections = document.querySelectorAll('section[id]');
  if (sections.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }, { threshold: 0.4 });
    sections.forEach(s => sectionObserver.observe(s));
  }

});
