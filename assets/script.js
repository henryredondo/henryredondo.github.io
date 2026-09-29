// Mobile menu
const navToggle = document.querySelector('.nav-toggle');
const navList = document.getElementById('nav-list');

function setMenu(open) {
  navList.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', String(open));
  navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
}

if (navToggle && navList) {
  navToggle.addEventListener('click', () => setMenu(!navList.classList.contains('open')));
  navList.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
}

// Highlight the nav link of the section in view
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('main section[id]');

function setActive(id) {
  navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${id}`));
}

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(section => observer.observe(section));

  // The last section is short, so it may never reach mid-screen: mark it when the page bottom is reached
  window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
      setActive(sections[sections.length - 1].id);
    }
  }, { passive: true });
}

// Current year in footer
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
