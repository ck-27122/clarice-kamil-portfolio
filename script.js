// ─── MULTIPLE SLIDESHOWS ON OKOLOOM PAGE ─────────────────────────────────────────────────────//

const TOTAL_DOTS = 5;

function initSlideshows() {
  const slideshows = document.querySelectorAll('.slideshow');

  slideshows.forEach((slideshow) => {
    const slides      = slideshow.querySelectorAll('.slide');
    const dotsContainer = slideshow.querySelector('.slide-dots');
    const prevBtn     = slideshow.querySelector('.slide-btn--prev');
    const nextBtn     = slideshow.querySelector('.slide-btn--next');
    let current       = 0;

    if (!slides.length) return;

    // Show only first slide
    slides.forEach((slide, i) => {
      slide.style.display = i === 0 ? 'block' : 'none';
    });

    // Render 5 progress dots
    function renderDots() {
      if (!dotsContainer) return;
      dotsContainer.innerHTML = '';
      const activeDot = current % TOTAL_DOTS;
      for (let i = 0; i < TOTAL_DOTS; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === activeDot) dot.classList.add('active');
        dotsContainer.appendChild(dot);
      }
    }

    function goToSlide(n) {
      slides[current].style.display = 'none';
      current = (n + slides.length) % slides.length;
      slides[current].style.display = 'block';
      renderDots();
    }

    prevBtn.addEventListener('click', () => goToSlide(current - 1));
    nextBtn.addEventListener('click', () => goToSlide(current + 1));

    renderDots();
  });
}

// ─── SCROLL REVEALS ───────────────────────────────────────────────────────────

function setupScrollReveals() {
  const revealTargets = [
    '.about-section-label',
    '.about-copy h2',
    '.projects-section .section-label',
    '.project-card',
    '.project-section-header',
    '.project-grid',
    '.play-intro',
    '.play-piece',
    '.contact-big',
    '.contact-desc',
    '.contact-email',
    'footer'
  ];

  const elements = document.querySelectorAll(revealTargets.join(','));

  elements.forEach((element, index) => {
    element.classList.add('reveal');

    if (element.classList.contains('project-card')) {
      const cardIndex = Array.from(document.querySelectorAll('.project-card')).indexOf(element);
      element.style.setProperty('--reveal-delay', `${cardIndex * 120}ms`);
    } else if (element.classList.contains('play-piece')) {
      const pieceIndex = Array.from(document.querySelectorAll('.play-piece')).indexOf(element);
      element.style.setProperty('--reveal-delay', `${pieceIndex * 90}ms`);
    } else if (element.closest('.about-copy')) {
      element.style.setProperty('--reveal-delay', `${index * 80}ms`);
    }
  });

  if (!('IntersectionObserver' in window)) {
    elements.forEach((element) => element.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.18,
    rootMargin: '0px 0px -8% 0px'
  });

  elements.forEach((element) => observer.observe(element));
}

// ─── INIT ─────────────────────────────────────────────────────────────────────

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initSlideshows();
    setupScrollReveals();
  });
} else {
  initSlideshows();
  setupScrollReveals();
}