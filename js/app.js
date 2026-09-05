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
const pressLightbox = document.getElementById('pressLightbox');
const pressImage = document.getElementById('pressLightboxImage');
const pressDownload = document.getElementById('pressDownload');
const pressCounter = document.getElementById('pressLightboxCounter');
const pressClose = document.getElementById('pressClose');
const pressPrevious = document.getElementById('pressPrev');
const pressNext = document.getElementById('pressNext');

const cardOrderEs = [
  'Obra artística', 'Pianista', 'Compositor', 'Discografía', 'Escritor',
  'Publicaciones', 'Contrataciones', 'Prensa', 'Audiovisual',
  'Productor & DJ', 'Glowing Piano', 'Ver la Música'
];
const cardOrderEn = [
  'Artistic work', 'Pianist', 'Composer', 'Discography', 'Writer',
  'Publications', 'Booking', 'Press', 'Audiovisual',
  'Producer & DJ', 'Glowing Piano', 'See the Music'
];
const pressImageCount = 12;
const backgroundElements = [langButton, document.getElementById('stage'), panel, pressLightbox];

const socialOrbitHtml = `
<div class="social-orbit">
  <a class="orbit-center" href="https://ko-fi.com/ramiroschiavoni" target="_blank" rel="noopener" aria-label="Ko-fi">
    <svg viewBox="0 0 48 48" role="img" aria-hidden="true">
      <circle cx="24" cy="24" r="22" fill="#ffd9bd"/>
      <path d="M10 13h25v15a7 7 0 0 1-7 7H17a7 7 0 0 1-7-7V13Z" fill="none" stroke="#252525" stroke-width="3" stroke-linejoin="round"/>
      <path d="M35 16h2a7 7 0 0 1 0 14h-2" fill="none" stroke="#252525" stroke-width="3" stroke-linecap="round"/>
      <path d="M16 21c0-3.2 4.2-4.2 6.5-1.5C24.8 16.8 29 17.8 29 21c0 4.2-6.5 8-6.5 8S16 25.2 16 21Z" fill="#f04444"/>
    </svg>
  </a>
  <div class="orbit-item">
    <a class="orbit-link" href="https://www.youtube.com/ramiroschiavoni" target="_blank" rel="noopener" aria-label="YouTube">
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23 12s0-3.6-.5-5.3c-.3-1-.9-1.7-1.9-2C18.9 4 12 4 12 4s-6.9 0-8.6.7c-1 .3-1.6 1-1.9 2C1 8.4 1 12 1 12s0 3.6.5 5.3c.3 1 .9 1.7 1.9 2C5.1 20 12 20 12 20s6.9 0 8.6-.7c1-.3 1.6-1 1.9-2 .5-1.7.5-5.3.5-5.3ZM9.8 15.5V8.5l6 3.5-6 3.5Z"/></svg>
    </a>
  </div>
  <div class="orbit-item">
    <a class="orbit-link" href="https://www.instagram.com/ramiro.schiavoni/" target="_blank" rel="noopener" aria-label="Instagram">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none"/></svg>
    </a>
  </div>
  <div class="orbit-item">
    <a class="orbit-link" href="https://www.tiktok.com/@ramiroschiavoni" target="_blank" rel="noopener" aria-label="TikTok">
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 3h3c.2 1.8 1.3 3.3 3 4v3c-1.5 0-2.9-.4-4-1.2v6.7A5.5 5.5 0 1 1 10.5 10a5.6 5.6 0 0 1 1 .1v3.2a2.4 2.4 0 1 0 1.7 2.3V3Z"/></svg>
    </a>
  </div>
  <div class="orbit-item">
    <a class="orbit-link" href="https://open.spotify.com/artist/6RZfrnfdtygvgrRtaeGblY" target="_blank" rel="noopener" aria-label="Spotify">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9.2"/><path d="M7 9.8c3.3-1 7-.7 10 1"/><path d="M7.3 12.8c2.7-.8 5.8-.6 8.4.8"/><path d="M7.6 15.6c2.2-.6 4.6-.4 6.6.7"/></svg>
    </a>
  </div>
  <div class="orbit-item">
    <a class="orbit-link" href="https://www.facebook.com/ramiroschiavoni" target="_blank" rel="noopener" aria-label="Facebook">
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 1 0 1.6 19.9v-7h-1.9v-2.7h1.9V10c0-1.9 1.1-3 3-3 .8 0 1.7.1 1.7.1v2h-1c-.9 0-1.2.6-1.2 1.2v1.7h2.1l-.3 2.7h-1.8v7A10 10 0 0 0 12 2Z"/></svg>
    </a>
  </div>
  <div class="orbit-item">
    <a class="orbit-link" href="mailto:ramiroschiavoni@gmail.com" aria-label="Correo">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m4 7 8 6 8-6"/></svg>
    </a>
  </div>
</div>`;

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

  brandButton.addEventListener('click', () => {
    lastPanelTrigger = brandButton;
    openBrandPanel();
  });

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

function openBrandPanel(updateHistory = true) {
  openIndex = -2;
  if (updateHistory && !body.classList.contains('panel-open')) {
    history.pushState({ panel: 'brand' }, '', `${location.pathname}${location.search}#bio`);
    panelHistoryState = true;
  }
  root.style.setProperty('--active-h', '270');
  root.style.setProperty('--active-s', '65%');
  root.style.setProperty('--active-l', '18%');

  panelIndex.textContent = '';
  panelTitle.textContent = currentLanguage === 'en'
    ? 'Ramiro Schiavoni | Artistic Hub'
    : 'Ramiro Schiavoni | Hub Artístico';

  const introText = currentLanguage === 'en'
    ? '<p>Welcome to my creative universe.<br>Thank you for supporting my art, watching my videos on YouTube, listening to my music on Spotify, and purchasing my books on Ko-Fi.</p>'
    : '<p>Bienvenid@ a mi universo creativo.<br>Gracias por apoyar mi arte, ver mis videos en YouTube, escuchar mi música en Spotify y comprar mis libros en Ko-Fi.</p>';

  const photoAlt = currentLanguage === 'en'
    ? 'Profile photo of Ramiro Schiavoni'
    : 'Foto de perfil de Ramiro Schiavoni';

  panelText.innerHTML = `${introText}<img class="brand-profile-img" src="assets/perfil.jpg" alt="${photoAlt}">${socialOrbitHtml}`;

  panel.setAttribute('aria-hidden', 'false');
  body.classList.add('panel-open');
  panelInner.scrollTop = 0;
  scrollTopButton.classList.remove('visible');
  closePanelButton.focus({ preventScroll: true });
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
    download: 'Download'
  } : {
    language: 'Cambiar idioma',
    close: 'Cerrar',
    scrollTop: 'Volver arriba',
    previousPhoto: 'Foto anterior',
    nextPhoto: 'Foto siguiente',
    download: 'Descargar'
  };
  const pTrigger = document.getElementById('profileTrigger');
  if (pTrigger) {
    pTrigger.setAttribute('aria-label', currentLanguage === 'en'
      ? 'Ramiro Schiavoni | Artistic Hub'
      : 'Ramiro Schiavoni | Hub Artístico');
  }
  langButton.setAttribute('aria-label', labels.language);
  closePanelButton.setAttribute('aria-label', labels.close);
  scrollTopButton.setAttribute('aria-label', labels.scrollTop);
  pressClose.setAttribute('aria-label', labels.close);
  pressPrevious.setAttribute('aria-label', labels.previousPhoto);
  pressNext.setAttribute('aria-label', labels.nextPhoto);
  pressDownload.setAttribute('aria-label', labels.download);
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
  const isBrandOpen = openIndex === -2 && body.classList.contains('panel-open');
  const panelWasOpen = openIndex >= 0 && body.classList.contains('panel-open');
  renderStripes();
  if (isBrandOpen) {
    openBrandPanel(false);
  } else if (panelWasOpen) {
    lastPanelTrigger = stripesEl.querySelector(`.stripe[data-index="${openIndex}"]`);
    openPanel(openIndex, false);
  }
  updateInterfaceLabels();
}

renderStripes();
updateInterfaceLabels();
if (location.hash === '#bio') {
  openBrandPanel(false);
} else if (location.hash.match(/^#section-\d+$/)) {
  history.replaceState(null, '', `${location.pathname}${location.search}`);
}

langButton.addEventListener('click', switchLanguage);

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
    else closePanel();
  }
  if (pressLightbox.classList.contains('is-visible') && event.key === 'ArrowLeft') movePressLightbox(-1);
  if (pressLightbox.classList.contains('is-visible') && event.key === 'ArrowRight') movePressLightbox(1);
  const dialog = pressLightbox.classList.contains('is-visible') ? pressLightbox : body.classList.contains('panel-open') ? panel : null;
  if (dialog) updateFocusTrap(dialog, event);
  if (body.classList.contains('panel-open') && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
    const carousel = document.activeElement.closest?.('[data-carousel]');
    if (carousel) carousel.querySelector(event.key === 'ArrowRight' ? '.publication-next' : '.publication-prev')?.click();
  }
});

window.addEventListener('popstate', (event) => {
  if (event.state && event.state.panel === 'brand') openBrandPanel(false);
  else if (event.state && Number.isInteger(event.state.panel)) openPanel(event.state.panel, false);
  else closePanel(false);
});
