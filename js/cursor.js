/* ============================================================
   AUREUM CONSTRUCTIONS – CURSOR.JS
   Premium custom cursor with hover states
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Only on non-touch devices
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  let dotX = 0, dotY = 0;
  let ringX = 0, ringY = 0;
  let mouseX = 0, mouseY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Smooth cursor follow
  function animate() {
    // Dot follows instantly
    dotX = mouseX;
    dotY = mouseY;
    dot.style.left  = dotX + 'px';
    dot.style.top   = dotY + 'px';

    // Ring follows with lag
    ringX += (mouseX - ringX) * 0.14;
    ringY += (mouseY - ringY) * 0.14;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';

    requestAnimationFrame(animate);
  }
  animate();

  // Hover effects
  const hoverSelectors = [
    'a', 'button', '.btn', '.card', '.service-card', '.package-card',
    '.blog-card', '.project-card', '.filter-tab', '.faq-question',
    '.nav-link', '.footer-link', '.testimonial-slide',
    '.masonry-item', '.before-after-container', '.team-card',
    '.dark-toggle', '.hamburger', '.floating-whatsapp', '.floating-call',
    '.back-to-top', '.calc-pkg-btn', '.calc-floor-btn',
    'input[type="range"]', 'select', 'textarea', 'input'
  ].join(', ');

  document.querySelectorAll(hoverSelectors).forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
  });

  // Hide cursor when it leaves the window
  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity = '1';
    ring.style.opacity = '1';
  });

  // Click effect
  document.addEventListener('mousedown', () => {
    dot.style.transform = 'translate(-50%, -50%) scale(0.6)';
    ring.style.transform = 'translate(-50%, -50%) scale(0.85)';
  });
  document.addEventListener('mouseup', () => {
    dot.style.transform = 'translate(-50%, -50%) scale(1)';
    ring.style.transform = 'translate(-50%, -50%) scale(1)';
  });
});
