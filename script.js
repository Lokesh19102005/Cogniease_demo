const menuButton = document.querySelector('.menu-toggle');
const navigationLinks = document.querySelectorAll('.primary-nav a');

if (menuButton) {
  menuButton.addEventListener('click', () => {
    const isOpen = document.body.classList.toggle('nav-open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  });

  navigationLinks.forEach((link) => {
    link.addEventListener('click', () => {
      document.body.classList.remove('nav-open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && document.body.classList.contains('nav-open')) {
      document.body.classList.remove('nav-open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
      menuButton.focus();
    }
  });
}

const year = document.querySelector('#year');
if (year) year.textContent = String(new Date().getFullYear());

// The hero is section 1; keep scroll reveals to the other odd-numbered sections.
const revealGroups = [
  ['#research > .container > .section-kicker', 'reveal-label'],
  ['#students .section-heading-row, #explore .explore-heading', 'reveal-title'],
  ['#research .research-intro', 'reveal-left'],
  ['#research .research-note, #psychiatrists .psychiatrist-visual', 'reveal-scale'],
  ['#psychiatrists .psychiatrist-copy', 'reveal-right'],
  ['#research .research-stat', 'reveal-card'],
  ['#students .feature-card', 'reveal-card'],
  ['#explore .portal-card', 'reveal-card'],
  ['#explore .contact-line', 'reveal-slide']
];
const revealTargets = revealGroups.flatMap(([selector, motion]) =>
  Array.from(document.querySelectorAll(selector)).map((element, order) => ({ element, motion, order }))
);

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0, rootMargin: '0px 0px -10% 0px' });

  revealTargets.forEach(({ element, motion, order }) => {
    element.classList.add(motion);
    element.style.setProperty('--reveal-delay', `${Math.min(order, 4) * 70}ms`);
    if (motion === 'reveal-slide') {
      element.style.setProperty('--reveal-offset', order % 2 ? '-28px' : '28px');
    }
    revealObserver.observe(element);
  });
} else {
  revealTargets.forEach(({ element }) => element.classList.add('is-in'));
}
