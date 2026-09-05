import { sections as esSections } from '../content/es.js';

const root = document.documentElement;
const body = document.body;
const stripesEl = document.getElementById('stripes');
const panel = document.getElementById('panel');
const panelInner = document.getElementById('panelInner');
const panelText = panel.querySelector('.panel-text');
const panelTitle = panel.querySelector('.panel-title');
const panelIndex = panel.querySelector('.panel-index');
const closePanelButton = document.getElementById('closePanel');
const scrollTopButton = document.getElementById('scrollTopBtn');
const langButton = document.getElementById('langToggle');
const profileOverlay = document.getElementById('profileOverlay');
const profileOverlayTitle = document.getElementById('profileOverlayTitle');
const profileImage = profileOverlay.querySelector('img');
const pressLightbox = document.getElementById('pressLightbox');
const pressImage = document.getElementById('pressLightboxImage');
const pressDownload = document.getElementById('pressDownload');
const pressCounter = document.getElementById('pressLightboxCounter');
const pressClose = document.getElementById('pressClose');
const pressPrevious = document.getElementById('pressPrev');
const pressNext = document.getElementById('pressNext');

const cardOrderEs = [
  'Obra artística', 'Pianista', 'Compositor', 'Discografía', 'Escritor',
  'Publicaciones', 'Contrataciones', 'Prensa & Redes', 'Audiovisual',
  'Productor & DJ', 'Glowing Piano', 'Ver la Música'
];
const cardOrderEn = [
  'Artistic work', 'Pianist', 'Composer', 'Discography', 'Writer',
  'Publications', 'Booking', 'Press Photography & Networks', 'Audiovisual',
  'Producer & DJ', 'Glowing Piano', 'See the Music'
];
const pressImageCount = 12;
// langToggle instead of the whole .topbar so profileTrigger (mid pointer-capture) never becomes inert
const backgroundElements = [langButton, document.getElementById('stage'), panel, pressLightbox];

let sections = [...esSections].sort((a, b) => cardOrderEs.indexOf(a.title) - cardOrderEs.indexOf(b.title));
let currentLanguage = 'es';
let openIndex = -1;
let panelHistoryState = false;
let lastPanelTrigger = null;
let lastPressTrigger = null;
let pressIndex = 0;
let touchPointerId = null;
let touchStripe = null;
let englishModulePromise;

function normalizeContent(html) {
  return html
    .replaceAll('src="kofi/', 'src="assets/kofi/')
    .replaceAll('src="fotosprensa/', 'src="assets/fotosprensa/')
    .replaceAll('href="https://ko-fi.com/s/', 'href="https://ko-fi.com/s/');
}

function renderStripes() {
  stripesEl.replaceChildren();
  const fragment = document.createDocumentFragment();

  // Brand Card (no number)
  const brandButton = document.createElement('button');
  brandButton.className = 'stripe stripe-brand';
  brandButton.id = 'profileTrigger';
  brandButton.style.setProperty('--h', '270');
  brandButton.style.setProperty('--s', '65%');
  brandButton.style.setProperty('--l', '18%');

  const brandAriaLabel = currentLanguage === 'en'
    ? 'Ramiro Schiavoni | Artistic Hub - Show profile photo'
    : 'Ramiro Schiavoni | Hub Artístico - Mostrar foto de perfil';
  brandButton.setAttribute('aria-label', brandAriaLabel);

  const brandLabel = document.createElement('span');
  brandLabel.className = 'stripe-label brand-stripe-label';
  brandLabel.innerHTML = currentLanguage === 'en'
    ? '<span class="brand-name-part">RAMIRO SCHIAVONI</span><span class="brand-sep"> | </span><span class="brand-hub-part">ARTISTIC HUB</span>'
    : '<span class="brand-name-part">RAMIRO SCHIAVONI</span><span class="brand-sep"> | </span><span class="brand-hub-part">HUB ARTÍSTICO</span>';

  brandButton.append(brandLabel);

  brandButton.addEventListener('pointerdown', (event) => {
    event.preventDefault();
    brandButton.setPointerCapture(event.pointerId);
    showProfile();
  });
  brandButton.addEventListener('keydown', (event) => {
    if (event.key === ' ' || event.key === 'Enter') { event.preventDefault(); showProfile(); }
  });
  brandButton.addEventListener('keyup', (event) => {
    if (event.key === ' ' || event.key === 'Enter') hideProfile();
  });
  ['pointerup', 'pointercancel', 'lostpointercapture'].forEach((name) => brandButton.addEventListener(name, hideProfile));
  brandButton.addEventListener('contextmenu', (event) => event.preventDefault());

  fragment.appendChild(brandButton);

  // Content section cards (01 to 12)
  sections.forEach((section, index) => {
    const button = document.createElement('button');
    button.className = 'stripe';
    button.dataset.index = index;
    button.style.setProperty('--h', section.h);
    button.style.setProperty('--s', section.s);
    button.style.setProperty('--l', section.l);
    button.setAttribute('aria-label', section.title);

    const number = document.createElement('span');
    number.className = 'stripe-num';
    number.textContent = String(index + 1).padStart(2, '0');
    const label = document.createElement('span');
    label.className = 'stripe-label';
    label.textContent = section.title;
    button.append(number, label);
    button.addEventListener('click', () => {
      lastPanelTrigger = button;
      openPanel(index);
    });
    fragment.appendChild(button);
  });
  stripesEl.appendChild(fragment);
}

function setTouchStripe(stripe) {
  if (touchStripe === stripe) return;
  touchStripe?.classList.remove('is-touch-active');
  touchStripe = stripe;
  touchStripe?.classList.add('is-touch-active');
}

function updateFocusTrap(dialog, event) {
  if (event.key !== 'Tab') return;
  const focusable = [...dialog.querySelectorAll('button, a[href], [tabindex]:not([tabindex="-1"])')]
    .filter((item) => !item.disabled && item.offsetParent !== null);
  if (!focusable.length) {
    event.preventDefault();
    dialog.focus();
    return;
  }
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function showProfile() {
  profileOverlay.classList.add('is-visible');
  profileOverlay.setAttribute('aria-hidden', 'false');
  backgroundElements.forEach((element) => element?.setAttribute('inert', ''));
}

function hideProfile() {
  if (!profileOverlay.classList.contains('is-visible')) return;
  profileOverlay.classList.remove('is-visible');
  profileOverlay.setAttribute('aria-hidden', 'true');
  backgroundElements.forEach((element) => element?.removeAttribute('inert'));
  document.getElementById('profileTrigger')?.focus({ preventScroll: true });
}

function openPanel(index, updateHistory = true) {
  openIndex = index;
  const section = sections[index];
  if (updateHistory && !body.classList.contains('panel-open')) {
    history.pushState({ panel: index }, '', `${location.pathname}${location.search}#section-${index}`);
    panelHistoryState = true;
  }
  root.style.setProperty('--active-h', section.h);
  root.style.setProperty('--active-s', section.s);
  root.style.setProperty('--active-l', section.l);
  panelIndex.textContent = `${String(index + 1).padStart(2, '0')} / ${sections.length}`;
  panelTitle.textContent = section.title;
  panelText.innerHTML = normalizeContent(section.text);
  panel.setAttribute('aria-hidden', 'false');
  body.classList.add('panel-open');
  panelInner.scrollTop = 0;
  scrollTopButton.classList.remove('visible');
  updateCarouselAccessibility();
  closePanelButton.focus({ preventScroll: true });
}

function closePanel(fromHistory = true) {
  if (!body.classList.contains('panel-open')) return;
  body.classList.remove('panel-open');
  panel.setAttribute('aria-hidden', 'true');
  lastPanelTrigger?.focus({ preventScroll: true });
  if (fromHistory && panelHistoryState) {
    panelHistoryState = false;
    history.back();
  } else if (location.hash.match(/^#section-\d+$/)) {
    history.replaceState(null, '', `${location.pathname}${location.search}`);
  }
}

function pressPath(index) {
  return `assets/fotosprensa/${index + 1}.jpg`;
}

function updatePressCarousel(carousel, index) {
  pressIndex = (index + pressImageCount) % pressImageCount;
  const image = carousel.querySelector('.press-image-button img');
  const button = carousel.querySelector('.press-image-button');
  image.src = pressPath(pressIndex);
  image.alt = currentLanguage === 'en' ? `Press photograph ${pressIndex + 1}` : `Fotografía de prensa ${pressIndex + 1}`;
  button.dataset.pressIndex = pressIndex;
  carousel.querySelector('.publication-carousel-head span:first-child').textContent = `${pressIndex + 1} / ${pressImageCount}`;
  carousel.classList.remove('is-single');
}

function openPressLightbox(index) {
  pressIndex = (index + pressImageCount) % pressImageCount;
  pressImage.src = pressPath(pressIndex);
  pressImage.alt = currentLanguage === 'en' ? `Press photograph ${pressIndex + 1}` : `Fotografía de prensa ${pressIndex + 1}`;
  pressDownload.href = pressPath(pressIndex);
  pressDownload.download = `${currentLanguage === 'en' ? 'press-photograph' : 'fotografia-prensa'}-${pressIndex + 1}.jpg`;
  pressCounter.textContent = `${pressIndex + 1} / ${pressImageCount}`;
  pressLightbox.classList.add('is-visible');
  pressLightbox.setAttribute('aria-hidden', 'false');
  backgroundElements.filter((element) => element && element !== pressLightbox).forEach((element) => element.setAttribute('inert', ''));
  pressClose.focus({ preventScroll: true });
}

function closePressLightbox() {
  if (!pressLightbox.classList.contains('is-visible')) return;
  pressLightbox.classList.remove('is-visible');
  pressLightbox.setAttribute('aria-hidden', 'true');
  backgroundElements.forEach((element) => element?.removeAttribute('inert'));
  lastPressTrigger?.focus({ preventScroll: true });
}

function movePressLightbox(step) {
  openPressLightbox(pressIndex + step);
  const carousel = panelText.querySelector('[data-press-carousel]');
  if (carousel) updatePressCarousel(carousel, pressIndex);
}

function updateCarouselAccessibility() {
  panelText.querySelectorAll('[data-carousel]').forEach((carousel) => {
    const slides = [...carousel.querySelectorAll('.publication-slide, .audiovisual-slide')];
    const activeIndex = slides.findIndex((slide) => slide.classList.contains('is-active'));
    carousel.classList.toggle('is-single', slides.length <= 1);
    slides.forEach((slide, index) => {
      const active = index === activeIndex;
      slide.setAttribute('aria-hidden', String(!active));
      slide.querySelectorAll('a, button, iframe').forEach((control) => { control.tabIndex = active ? 0 : -1; });
    });
  });
  panelText.querySelectorAll('[data-press-carousel]').forEach((carousel) => carousel.classList.remove('is-single'));
}

function updateInterfaceLabels() {
  const labels = currentLanguage === 'en' ? {
    language: 'Change language',
    close: 'Close',
    scrollTop: 'Back to top',
    previousPhoto: 'Previous photo',
    nextPhoto: 'Next photo',
    download: 'Download',
    profileTitle: 'Profile photo of Ramiro Schiavoni'
  } : {
    language: 'Cambiar idioma',
    close: 'Cerrar',
    scrollTop: 'Volver arriba',
    previousPhoto: 'Foto anterior',
    nextPhoto: 'Foto siguiente',
    download: 'Descargar',
    profileTitle: 'Foto de perfil de Ramiro Schiavoni'
  };
  const pTrigger = document.getElementById('profileTrigger');
  if (pTrigger) {
    pTrigger.setAttribute('aria-label', currentLanguage === 'en'
      ? 'Ramiro Schiavoni | Artistic Hub - Show profile photo'
      : 'Ramiro Schiavoni | Hub Artístico - Mostrar foto de perfil');
  }
  langButton.setAttribute('aria-label', labels.language);
  closePanelButton.setAttribute('aria-label', labels.close);
  scrollTopButton.setAttribute('aria-label', labels.scrollTop);
  pressClose.setAttribute('aria-label', labels.close);
  pressPrevious.setAttribute('aria-label', labels.previousPhoto);
  pressNext.setAttribute('aria-label', labels.nextPhoto);
  pressDownload.setAttribute('aria-label', labels.download);
  profileOverlayTitle.textContent = labels.profileTitle;
  profileImage.alt = labels.profileTitle;
}

async function switchLanguage() {
  currentLanguage = currentLanguage === 'es' ? 'en' : 'es';
  if (currentLanguage === 'en') {
    englishModulePromise ??= import('../content/en.js');
    sections = (await englishModulePromise).sections.sort((a, b) => cardOrderEn.indexOf(a.title) - cardOrderEn.indexOf(b.title));
  } else {
    sections = [...esSections].sort((a, b) => cardOrderEs.indexOf(a.title) - cardOrderEs.indexOf(b.title));
  }
  body.dataset.lang = currentLanguage;
  document.documentElement.lang = currentLanguage;
  const panelWasOpen = openIndex >= 0 && body.classList.contains('panel-open');
  renderStripes();
  if (panelWasOpen) {
    lastPanelTrigger = stripesEl.querySelector(`.stripe[data-index="${openIndex}"]`);
    openPanel(openIndex, false);
  }
  updateInterfaceLabels();
}

renderStripes();
updateInterfaceLabels();
if (location.hash.match(/^#section-\d+$/)) {
  history.replaceState(null, '', `${location.pathname}${location.search}`);
}

langButton.addEventListener('click', switchLanguage);
profileOverlay.addEventListener('click', (event) => { if (event.target === profileOverlay || event.target.tagName === 'IMG') hideProfile(); });

stripesEl.addEventListener('pointerdown', (event) => {
  if (event.pointerType !== 'touch') return;
  const stripe = event.target.closest('.stripe');
  if (!stripe) return;
  touchPointerId = event.pointerId;
  setTouchStripe(stripe);
});
window.addEventListener('pointermove', (event) => {
  if (touchPointerId !== event.pointerId) return;
  setTouchStripe(document.elementFromPoint(event.clientX, event.clientY)?.closest('.stripe') || null);
});
window.addEventListener('pointerup', (event) => { if (touchPointerId === event.pointerId) { touchPointerId = null; setTouchStripe(null); } });
window.addEventListener('pointercancel', (event) => { if (touchPointerId === event.pointerId) { touchPointerId = null; setTouchStripe(null); } });

closePanelButton.addEventListener('click', closePanel);
scrollTopButton.addEventListener('click', () => panelInner.scrollTo({ top: 0, behavior: 'smooth' }));
panelInner.addEventListener('scroll', () => scrollTopButton.classList.toggle('visible', panelInner.scrollTop > 400));

panelText.addEventListener('click', (event) => {
  const embed = event.target.closest('.yt-embed');
  if (embed && !embed.classList.contains('is-active')) {
    embed.classList.add('is-active');
    embed.innerHTML = `<iframe src="${embed.dataset.src}" title="YouTube video" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen loading="lazy"></iframe>`;
    return;
  }
  const pressImageButton = event.target.closest('.press-image-button');
  if (pressImageButton) { lastPressTrigger = pressImageButton; openPressLightbox(Number(pressImageButton.dataset.pressIndex)); return; }
  const pressArrow = event.target.closest('.press-prev, .press-next');
  if (pressArrow) { updatePressCarousel(pressArrow.closest('[data-press-carousel]'), pressIndex + (pressArrow.classList.contains('press-next') ? 1 : -1)); return; }
  const arrow = event.target.closest('.publication-arrow');
  if (!arrow) return;
  const carousel = arrow.closest('[data-carousel]');
  const slides = [...carousel.querySelectorAll('.publication-slide, .audiovisual-slide')];
  const current = slides.findIndex((slide) => slide.classList.contains('is-active'));
  const next = (current + (arrow.classList.contains('publication-next') ? 1 : -1) + slides.length) % slides.length;
  slides[current].classList.remove('is-active');
  slides[next].classList.add('is-active');
  carousel.querySelector('.publication-counter').textContent = `${next + 1} / ${slides.length}`;
  const title = slides[next].dataset.title;
  if (title) carousel.querySelector('.publication-carousel-head > span:first-child').textContent = title;
  updateCarouselAccessibility();
});

pressClose.addEventListener('click', closePressLightbox);
pressPrevious.addEventListener('click', () => movePressLightbox(-1));
pressNext.addEventListener('click', () => movePressLightbox(1));
pressLightbox.addEventListener('click', (event) => { if (event.target === pressLightbox) closePressLightbox(); });
langButton.addEventListener('click', switchLanguage);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    if (pressLightbox.classList.contains('is-visible')) closePressLightbox();
    else if (profileOverlay.classList.contains('is-visible')) hideProfile();
    else closePanel();
  }
  if (pressLightbox.classList.contains('is-visible') && event.key === 'ArrowLeft') movePressLightbox(-1);
  if (pressLightbox.classList.contains('is-visible') && event.key === 'ArrowRight') movePressLightbox(1);
  const dialog = pressLightbox.classList.contains('is-visible') ? pressLightbox : body.classList.contains('panel-open') ? panel : profileOverlay.classList.contains('is-visible') ? profileOverlay : null;
  if (dialog) updateFocusTrap(dialog, event);
  if (body.classList.contains('panel-open') && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
    const carousel = document.activeElement.closest?.('[data-carousel]');
    if (carousel) carousel.querySelector(event.key === 'ArrowRight' ? '.publication-next' : '.publication-prev')?.click();
  }
});

window.addEventListener('popstate', (event) => {
  if (event.state && Number.isInteger(event.state.panel)) openPanel(event.state.panel, false);
  else closePanel(false);
});
