/* ============================================================
   AUREUM CONSTRUCTIONS – SLIDER.JS
   Testimonials carousel + Before/After slider
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Testimonials Carousel ─────────────────────────────────
  const testimonialWrap = document.querySelector('.testimonials-wrapper');
  if (testimonialWrap) {
    const track   = testimonialWrap.querySelector('.testimonials-track');
    const slides  = testimonialWrap.querySelectorAll('.testimonial-slide');
    const dots    = testimonialWrap.querySelectorAll('.testimonial-dot');
    const prevBtn = testimonialWrap.querySelector('.testimonial-prev');
    const nextBtn = testimonialWrap.querySelector('.testimonial-next');

    let current  = 0;
    let total    = slides.length;
    let autoPlay = null;
    let isDragging = false;
    let startX = 0;

    function goTo(index) {
      current = (index + total) % total;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    function startAuto() {
      stopAuto();
      autoPlay = setInterval(() => goTo(current + 1), 2000);
    }
    function stopAuto() {
      if (autoPlay) clearInterval(autoPlay);
    }

    if (nextBtn) nextBtn.addEventListener('click', () => { goTo(current + 1); startAuto(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { goTo(current - 1); startAuto(); });
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => { goTo(i); startAuto(); });
    });

    // Touch support
    track.addEventListener('touchstart', (e) => {
      isDragging = true;
      startX = e.touches[0].clientX;
      stopAuto();
    }, { passive: true });
    track.addEventListener('touchend', (e) => {
      if (!isDragging) return;
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        goTo(diff > 0 ? current + 1 : current - 1);
      }
      isDragging = false;
      startAuto();
    });

    // Pause on hover
    testimonialWrap.addEventListener('mouseenter', stopAuto);
    testimonialWrap.addEventListener('mouseleave', startAuto);

    goTo(0);
    startAuto();
  }

  // ── Before/After Slider ───────────────────────────────────
  const baContainers = document.querySelectorAll('.before-after-container');

  baContainers.forEach(container => {
    const afterImg = container.querySelector('.after-img');
    const handle   = container.querySelector('.slider-handle');
    if (!afterImg || !handle) return;

    let isDragging = false;
    let position   = 50;

    function setPosition(x) {
      const rect  = container.getBoundingClientRect();
      const pct   = Math.max(0, Math.min(100, ((x - rect.left) / rect.width) * 100));
      position = pct;
      afterImg.style.clipPath  = `inset(0 ${100 - pct}% 0 0)`;
      handle.style.left = `${pct}%`;
    }

    // Mouse
    handle.addEventListener('mousedown', (e) => {
      isDragging = true;
      e.preventDefault();
    });
    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      setPosition(e.clientX);
    });
    window.addEventListener('mouseup', () => { isDragging = false; });

    // Touch
    handle.addEventListener('touchstart', (e) => {
      isDragging = true;
      e.preventDefault();
    }, { passive: false });
    window.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      setPosition(e.touches[0].clientX);
    }, { passive: true });
    window.addEventListener('touchend', () => { isDragging = false; });

    // Click anywhere on container
    container.addEventListener('click', (e) => {
      if (e.target === handle || handle.contains(e.target)) return;
      setPosition(e.clientX);
    });

    // Keyboard accessibility
    container.setAttribute('tabindex', '0');
    container.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft')  setPosition(container.getBoundingClientRect().left + container.offsetWidth * ((position - 5) / 100));
      if (e.key === 'ArrowRight') setPosition(container.getBoundingClientRect().left + container.offsetWidth * ((position + 5) / 100));
    });

    setPosition(container.getBoundingClientRect().left + container.offsetWidth * 0.5);
  });

  // ── Project Gallery Carousel (if any) ────────────────────
  const projectCarousel = document.querySelector('.project-carousel');
  if (projectCarousel) {
    const track = projectCarousel.querySelector('.project-track');
    const items = projectCarousel.querySelectorAll('.project-track-item');
    let idx = 0;

    function moveCarousel(dir) {
      idx = (idx + dir + items.length) % items.length;
      track.style.transform = `translateX(-${idx * (100 / items.length)}%)`;
    }

    projectCarousel.querySelector('.proj-prev')?.addEventListener('click', () => moveCarousel(-1));
    projectCarousel.querySelector('.proj-next')?.addEventListener('click', () => moveCarousel(1));
  }

});
