/* ============================================================
   AUREUM CONSTRUCTIONS – MAIN.JS
   Core: Loading screen, navbar, dark mode, scroll, floats
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Loading Screen ──────────────────────────────────────
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        loadingScreen.classList.add('hidden');
        document.body.classList.remove('loading');
      }, 2000);
    });
    // Fallback
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
      document.body.classList.remove('loading');
    }, 3500);
  }

  // ── Navbar scroll behaviour ─────────────────────────────
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const scrollHandler = () => {
      if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', scrollHandler, { passive: true });
    scrollHandler();
  }

  // ── Mobile hamburger ─────────────────────────────────────
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ── Dark Mode Toggle ─────────────────────────────────────
  const darkToggle = document.getElementById('dark-toggle');
  const htmlEl = document.documentElement;

  const savedTheme = localStorage.getItem('aureum-theme') || 'light';
  if (savedTheme === 'dark') {
    htmlEl.setAttribute('data-theme', 'dark');
  }

  if (darkToggle) {
    darkToggle.addEventListener('click', () => {
      const isDark = htmlEl.getAttribute('data-theme') === 'dark';
      htmlEl.setAttribute('data-theme', isDark ? 'light' : 'dark');
      localStorage.setItem('aureum-theme', isDark ? 'light' : 'dark');
    });
  }

  // ── Back To Top ──────────────────────────────────────────
  const backTop = document.querySelector('.back-to-top');
  if (backTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backTop.classList.add('visible');
      } else {
        backTop.classList.remove('visible');
      }
    }, { passive: true });
    backTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ── Button Ripple Effect ─────────────────────────────────
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${e.clientX - rect.left - size/2}px;
        top: ${e.clientY - rect.top - size/2}px;
      `;
      this.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });

  // ── Active Nav Link ──────────────────────────────────────
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ── Page Transition ──────────────────────────────────────
  const pageLinks = document.querySelectorAll('a[href$=".html"]:not([target])');
  const pageTransition = document.querySelector('.page-transition');
  if (pageTransition) {
    pageLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && !href.startsWith('#') && !href.startsWith('http')) {
          e.preventDefault();
          pageTransition.classList.add('entering');
          setTimeout(() => {
            window.location.href = href;
          }, 500);
        }
      });
    });
    window.addEventListener('pageshow', () => {
      pageTransition.classList.remove('entering');
    });
  }

  // ── Sticky CTA on mobile ─────────────────────────────────
  const stickyCTA = document.querySelector('.sticky-cta');
  if (stickyCTA) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 600) {
        stickyCTA.style.transform = 'translateY(0)';
        stickyCTA.style.opacity = '1';
      } else {
        stickyCTA.style.transform = 'translateY(100%)';
        stickyCTA.style.opacity = '0';
      }
    }, { passive: true });
  }

  // ── FAQ Accordion ────────────────────────────────────────
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
      const item = question.closest('.faq-item');
      const wasOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      // Open clicked (toggle)
      if (!wasOpen) item.classList.add('open');
    });
  });

  // ── Smooth anchor scroll ─────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── Lazy Loading images ──────────────────────────────────
  const lazyImages = document.querySelectorAll('img[data-src]');
  if ('IntersectionObserver' in window) {
    const imgObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          obs.unobserve(img);
        }
      });
    }, { rootMargin: '200px' });
    lazyImages.forEach(img => imgObserver.observe(img));
  } else {
    lazyImages.forEach(img => { img.src = img.dataset.src; });
  }

  // ── Download Brochure ────────────────────────────────────
  const brochureBtn = document.getElementById('download-brochure');
  if (brochureBtn) {
    brochureBtn.addEventListener('click', (e) => {
      e.preventDefault();
      // Show a toast notification
      showToast('📄 Brochure download started!', 'success');
    });
  }

  // ── Contact Form Submit ──────────────────────────────────
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('cf-name') ? document.getElementById('cf-name').value : '';
      const phone = document.getElementById('cf-phone') ? document.getElementById('cf-phone').value : '';
      const email = document.getElementById('cf-email') ? document.getElementById('cf-email').value : '';
      const service = document.getElementById('cf-service') ? document.getElementById('cf-service').value : '';
      const location = document.getElementById('cf-location') ? document.getElementById('cf-location').value : '';
      const activeChip = document.querySelector('.budget-chip.active');
      const budget = activeChip ? activeChip.textContent : 'Not specified';
      const msgElement = document.getElementById('cf-message');
      const msg = msgElement ? msgElement.value : '';
      
      const text = `Hi Studio Bind Architects! I'd like to make an enquiry.%0A%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Email:* ${email}%0A*Service:* ${service}%0A*Location:* ${location}%0A*Budget:* ${budget}%0A*Message:* ${msg}`;
      const whatsappUrl = `https://wa.me/918072701454?text=${text}`;
      
      window.open(whatsappUrl, '_blank');
      
      const btn = contactForm.querySelector('button[type="submit"]');
      if (btn) {
          const originalText = btn.innerHTML;
          btn.textContent = 'Redirecting to WhatsApp...';
          setTimeout(() => {
            btn.innerHTML = originalText;
            contactForm.reset();
          }, 2000);
      }
    });
  }

  // ── Entry Enquiry Modal Form Submit ──────────────────────
  const entryForm = document.getElementById('entry-enquiry-form');
  if (entryForm) {
    entryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const inputs = entryForm.querySelectorAll('input, select');
      const name = inputs[0] ? inputs[0].value : '';
      const phone = inputs[1] ? inputs[1].value : '';
      const email = inputs[2] ? inputs[2].value : '';
      const city = inputs[3] ? inputs[3].value : '';
      
      const text = `Hi Studio Bind Architects! I'd like to get a free quote.%0A%0A*Name:* ${name}%0A*Mobile:* ${phone}%0A*Email:* ${email}%0A*City:* ${city}`;
      const whatsappUrl = `https://wa.me/918072701454?text=${text}`;
      
      window.open(whatsappUrl, '_blank');
      
      const btn = entryForm.querySelector('button[type="submit"]');
      if(btn) {
          const originalText = btn.innerHTML;
          btn.textContent = 'Redirecting...';
          setTimeout(() => {
            btn.innerHTML = originalText;
            entryForm.reset();
            
            // Also close the modal if possible
            const modal = document.getElementById('entry-modal');
            if (modal) {
              modal.classList.remove('active');
              modal.style.opacity = '0';
              modal.style.visibility = 'hidden';
              document.body.classList.remove('modal-open');
            }
          }, 2000);
      }
    });
  }


  // ── Toast Notification ───────────────────────────────────
  window.showToast = function(message, type = 'info') {
    const toast = document.createElement('div');
    toast.style.cssText = `
      position: fixed;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%) translateY(20px);
      background: ${type === 'success' ? '#0D1B2A' : '#1A1A1A'};
      color: white;
      padding: 1rem 1.75rem;
      border-radius: 50px;
      font-size: 0.9rem;
      font-family: var(--f-body, Inter, sans-serif);
      font-weight: 500;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      z-index: 9999;
      border-left: 3px solid #C9A84C;
      transition: all 0.4s cubic-bezier(0.4,0,0.2,1);
      opacity: 0;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    });
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(20px)';
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  };

});


// Spec Accordion
document.querySelectorAll('.spec-accordion-header').forEach(header => {
  header.addEventListener('click', () => {
    const item = header.parentElement;
    item.classList.toggle('active');
  });
});

// Sticky Nav Highlighter
const packageNav = document.getElementById('package-nav');
if (packageNav) {
  const links = packageNav.querySelectorAll('a[href^="#pkg-"]');
  window.addEventListener('scroll', () => {
    let scrollPos = window.scrollY + 200;
    links.forEach(link => {
      const section = document.querySelector(link.getAttribute('href'));
      if (section && section.offsetTop <= scrollPos && section.offsetTop + section.offsetHeight > scrollPos) {
        links.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  });
}
