(() => {
'use strict';
const D = window.REMI_DATA;
if (!D) return;
const $ = (s,root=document) => root.querySelector(s);
const $$ = (s,root=document) => [...root.querySelectorAll(s)];
const el = (tag,klass,content) => { const n=document.createElement(tag); if(klass)n.className=klass; if(content!==undefined)n.textContent=content;return n;};
const icon = (name) => { const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.classList.add('icon');svg.setAttribute('aria-hidden','true');const use=document.createElementNS('http://www.w3.org/2000/svg','use');use.setAttribute('href','#i-'+name);svg.appendChild(use);return svg;};
// Każda placówka ma swoją osobną sekcję, galerię oraz listę potrzeb.
const placesGrid=$('#places-grid');
const recipientSections=$('#recipient-sections');
function buildGallery(place) {
  const items = place.gallery;
  const slider = el('div', 'recipient-slideshow');
  slider.setAttribute('role', 'region');
  slider.setAttribute('aria-label', 'Galeria: ' + place.full);
  const frame = el('figure', 'recipient-main-photo recipient-slide is-active');
  const credits = el('div', 'recipient-credits');
  const gallery = el('div', 'recipient-gallery-wrap');
  const counter = el('span', 'recipient-slide-counter');
  counter.setAttribute('aria-live', 'polite');
  slider.appendChild(frame);
  gallery.append(slider, credits);
  let current = 0;
  const dots = [];

  function show(index) {
    current = (index + items.length) % items.length;
    const item = items[current];
    frame.querySelector('video')?.pause();
    frame.replaceChildren();
    const isVideo = item.kind === 'video';
    frame.classList.toggle('recipient-slide-video', isVideo);
    frame.classList.remove('photo-unavailable');

    function unavailable(media) {
      if (media.parentNode !== frame) return;
      media.remove();
      frame.classList.add('photo-unavailable');
      frame.prepend(icon(place.icon), el('span', '', 'Ten materiał jest chwilowo niedostępny.'));
    }
    if (item.youtubeId) {
      const load = el('button', 'btn btn-outline recipient-play', 'Odtwórz film w YouTube');
      load.type = 'button';
      load.addEventListener('click', () => {
        const player = el('iframe', 'recipient-embedded-video');
        player.src = 'https://www.youtube-nocookie.com/embed/' + item.youtubeId;
        player.title = item.alt;
        player.allow = 'encrypted-media; picture-in-picture; fullscreen';
        player.allowFullscreen = true;
        player.referrerPolicy = 'strict-origin-when-cross-origin';
        load.replaceWith(player);
        player.focus();
      });
      frame.appendChild(load);
    } else if (isVideo) {
      const video = el('video', 'recipient-video');
      video.controls = true;
      video.preload = item.poster ? 'none' : 'metadata';
      video.playsInline = true;
      video.setAttribute('aria-label', item.alt);
      if (item.poster) video.poster = item.poster;
      video.addEventListener('error', () => unavailable(video), { once: true });
      video.src = item.src;
      frame.appendChild(video);
    } else {
      const image = el('img');
      image.loading = 'lazy';
      image.decoding = 'async';
      image.alt = item.alt;
      image.addEventListener('error', () => unavailable(image), { once: true });
      image.src = item.src;
      frame.appendChild(image);
    }

    if (item.caption) frame.appendChild(el('figcaption', 'recipient-photo-caption', item.caption));
    credits.replaceChildren();
    if (item.creditUrl) {
      const link = el('a', '', 'Źródło materiału');
      link.href = item.creditUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      credits.appendChild(link);
    }
    credits.hidden = !item.creditUrl;
    dots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === current);
      dot.setAttribute('aria-pressed', String(i === current));
    });
    counter.textContent = (current + 1) + ' / ' + items.length;
  }

  if (items.length > 1) {
    slider.classList.add('has-multiple');
    slider.tabIndex = 0;
    function arrow(className, symbol, label, offset) {
      const button = el('button', 'recipient-slide-arrow ' + className, symbol);
      button.type = 'button';
      button.setAttribute('aria-label', label);
      button.addEventListener('click', () => show(current + offset));
      return button;
    }
    const previous = arrow('recipient-slide-prev', '‹', 'Poprzedni materiał', -1);
    const next = arrow('recipient-slide-next', '›', 'Następny materiał', 1);
    const controls = el('div', 'recipient-slide-dots');
    items.forEach((item, i) => {
      const dot = el('button', 'recipient-slide-dot');
      dot.type = 'button';
      dot.setAttribute('aria-label', 'Pokaż materiał ' + (i + 1) + ': ' + item.alt);
      dot.addEventListener('click', () => show(i));
      controls.appendChild(dot);
      dots.push(dot);
    });
    slider.append(previous, next, controls, counter);
    slider.addEventListener('keydown', event => {
      if (!event.target.matches('video, iframe') &&
          (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
        event.preventDefault();
        show(current + (event.key === 'ArrowRight' ? 1 : -1));
      }
    });

    let start;
    slider.addEventListener('touchstart', event => {
      start = undefined;
      if (event.touches.length !== 1 || event.target.closest('button')) return;
      const touch = event.touches[0];
      if (event.target.matches('video') &&
          event.target.getBoundingClientRect().bottom - touch.clientY < 48) return;
      start = touch;
    }, { passive: true });
    slider.addEventListener('touchcancel', () => { start = undefined; }, { passive: true });
    slider.addEventListener('touchend', event => {
      if (!start) return;
      const touch = [...event.changedTouches].find(touch => touch.identifier === start.identifier);
      if (touch) {
        const horizontal = touch.clientX - start.clientX;
        const vertical = touch.clientY - start.clientY;
        if (Math.abs(horizontal) > 45 && Math.abs(horizontal) > 1.3 * Math.abs(vertical)) {
          show(current + (horizontal < 0 ? 1 : -1));
        }
      }
      start = undefined;
    }, { passive: true });
  }

  show(0);
  return gallery;
}
function createNeedCard(item){
 const card=el('article','need-card');
 const head=el('div','need-top'),ic=el('span','need-icon');
 ic.appendChild(icon(item.icon||'gift'));head.appendChild(ic);
 head.appendChild(el('span','need-tag',item.group));card.appendChild(head);
 card.appendChild(el('h4','',item.title));card.appendChild(el('p','',item.description));
 const bot=el('div','need-bottom');
 const statusLabel=item.status==='do-uzgodnienia'?'Do uzgodnienia':item.status==='zrealizowane'?'Zrealizowane':item.status==='zarezerwowane'?'Zadeklarowane':'Zgłoszona potrzeba';
 bot.appendChild(el('span','',statusLabel));
 card.appendChild(bot);return card;
}
const donateUrl = safeUrl(D.fundraiserUrl);
function createDonationAction(variant, label = 'Wesprzyj zbiórkę') {
  if (!donateUrl) return el('span', 'donation-status', 'Zbiórka wkrótce');
  const link = el('a', variant, label);
  link.href = donateUrl;
  link.appendChild(icon('arrow'));
  return link;
}
$$('[data-donation-action]').forEach(slot => {
  if (donateUrl) slot.replaceWith(createDonationAction(slot.dataset.donationAction, slot.dataset.donationLabel));
});
$('#hero-fundraiser-status').hidden = Boolean(donateUrl);

function startFundraiserCountdown(value) {
  const date = value?.trim();
  if (!date || !/(Z|[+-]\d{2}:\d{2})$/.test(date)) return;
  const deadline = Date.parse(date);
  if (!Number.isFinite(deadline)) return;

  const timeZone = 'Europe/Warsaw';
  const dayLabel = new Intl.DateTimeFormat('pl-PL', { timeZone, day: 'numeric', month: 'long', year: 'numeric' }).format(deadline);
  const clockLabel = new Intl.DateTimeFormat('pl-PL', { timeZone, hour: '2-digit', minute: '2-digit' }).format(deadline);
  const deadlineField = $('[data-fundraiser-deadline]');
  deadlineField.dateTime = date;
  deadlineField.textContent = `${dayLabel}, godz. ${clockLabel}`;

  const section = $('#fundraiser-countdown');
  const time = $('#fundraiser-time', section);
  const active = $('#fundraiser-countdown-active', section);
  const fields = $$('[data-countdown-unit]', section);

  function update() {
    const seconds = Math.ceil((deadline - Date.now()) / 1000);
    if (seconds <= 0) {
      active.hidden = true;
      $('#hero-deadline').hidden = true;
      $('#fundraiser-countdown-title', section).textContent =
        'Zbiórka dobiegła końca. Dziękujemy za wspólną pomoc!';
      return false;
    }
    const values = [
      Math.floor(seconds / 86400),
      Math.floor(seconds / 3600) % 24,
      Math.floor(seconds / 60) % 60,
      seconds % 60,
    ];
    fields.forEach((field, index) => {
      const text = String(values[index]).padStart(2, '0');
      if (field.textContent !== text) field.textContent = text;
    });
    return true;
  }

  const isActive = update();
  $('#hero-deadline').hidden = !isActive;
  time.hidden = false;
  if (isActive) {
    const interval = setInterval(() => {
      if (!update()) clearInterval(interval);
    }, 1000);
  }
}
startFundraiserCountdown(D.campaignDeadline);

function showFundraiserSummary() {
  $('#fundraiser-countdown').hidden = false;
  const sourceLink = $('[data-fundraiser-source]');
  const fallback = $('#fundraiser-total-fallback');
  if (!donateUrl) {
    fallback.textContent = 'Zbiórka wkrótce';
    return;
  }
  sourceLink.href = donateUrl;
  sourceLink.hidden = false;
  if (D.fundraiserWidgetEnabled !== true || !D.fundraiserWidgetCode?.trim()) return;

  const document = new DOMParser().parseFromString(D.fundraiserWidgetCode, 'text/html');
  const embed = document.querySelector('iframe');
  if (!embed) return;
  const address = safeUrl(embed.getAttribute('src'));
  if (!address) return;
  const url = new URL(address);
  const fundraiser = new URL(donateUrl);
  const fundraiserId = fundraiser.pathname.split('/').filter(Boolean).pop();
  const widgetPath = url.pathname.match(/^\/([^/]+)\/widget\/(?:\d+|card\/view)\/?$/);
  if (url.origin !== 'https://zrzutka.pl' || url.username || url.password ||
      fundraiser.origin !== url.origin || !widgetPath ||
      widgetPath[1] !== fundraiserId) return;

  const frame = el('iframe', 'official-fundraiser-frame');
  frame.title = 'Aktualna kwota i postęp zbiórki na Zrzutka.pl';
  frame.loading = 'lazy';
  frame.referrerPolicy = 'strict-origin-when-cross-origin';
  frame.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-forms allow-top-navigation-by-user-activation');
  const heightValue = [embed.getAttribute('height'), embed.style.height, embed.parentElement.style.height]
    .find(value => /^\d+(?:px)?$/.test(value || ''));
  const height = Number.parseInt(heightValue, 10);
  frame.style.height = Math.min(700, Math.max(220, height || 400)) + 'px';
  frame.src = url.href;
  frame.addEventListener('error', () => {
    $('#official-fundraiser-widget').hidden = true;
    fallback.hidden = false;
  }, { once: true });
  const container = $('#official-fundraiser-widget');
  container.appendChild(frame);
  container.hidden = false;
  fallback.hidden = true;
}
showFundraiserSummary();

for (const [selector, value] of [
  ['#campaign-tagline', D.tagline],
  ['#campaign-intro', D.intro],
  ['#campaign-contact-intro', D.contactIntro],
  ['#support-time-title', D.supportTimeTitle],
  ['#support-time-intro', D.supportTimeIntro],
  ['#moneybox-intro', D.moneyboxIntro],
  ['#in-kind-support-title', D.inKindSupportTitle],
  ['#in-kind-support-intro', D.inKindSupportIntro],
  ['#leader-benefit-title', D.leaderBenefitTitle],
  ['#leader-benefit-intro', D.leaderBenefitIntro],
]) {
  if (value?.trim()) $(selector).textContent = value.trim();
}

function buildRecipientSection(place){
 const panel=el('article','recipient-panel recipient-'+place.id);
 panel.id='placowka-'+place.id;

 const hero=el('div','recipient-hero');
 const media=el('div','recipient-media');
 if(place.gallery.length){
   media.appendChild(buildGallery(place));
 }else{
   const blank=el('div','recipient-empty-photo');
   blank.append(icon(place.icon||'home'),el('span','','Galeria wkrótce'));
   media.appendChild(blank);
 }
 hero.appendChild(media);
 const body=el('div','recipient-details');
 body.appendChild(el('h3','',place.full));body.appendChild(el('p','recipient-detail',place.detail));body.appendChild(el('p','recipient-description',place.description));
 const items = D.needs.filter(need => need.place === place.id).sort((a, b) =>
   Number(a.status === 'zrealizowane') - Number(b.status === 'zrealizowane') ||
   Number(Boolean(b.priority)) - Number(Boolean(a.priority))
 );
 const actions = el('div', 'recipient-actions');
 actions.appendChild(createDonationAction('btn btn-primary'));
 body.appendChild(actions);hero.appendChild(body);
 panel.appendChild(hero);
 const list=el('div','recipient-needs');
 const heading=el('div','recipient-needs-heading');heading.appendChild(el('h3','','Lista potrzeb'));
 list.appendChild(heading);
 if(items.length){
  const grid = el('div', 'recipient-needs-grid');
  grid.id = 'potrzeby-' + place.id;
  grid.append(...items.map(createNeedCard));
  list.appendChild(grid);
 }else{
  list.appendChild(el('p', 'recipient-pending', 'Lista w przygotowaniu.'));
 }
 panel.appendChild(list);
 return panel;
}
D.places.forEach(p=>{
 const card=el('a','place-card place-jump');card.href='#placowka-'+p.id;
 const photo=p.gallery.find(item=>item.cardCover) || p.gallery.find(item=>item.kind==='image');
 if(photo){const img=el('img','place-jump-image');img.src=photo.src;img.alt='';img.loading='lazy';img.addEventListener('error',()=>img.remove(),{once:true});card.appendChild(img);}
 const info=el('div','place-jump-content');
 info.append(el('h3','',p.full), el('p','',p.summary || p.description));
 const bottom=el('span','place-jump-action','Zobacz galerię i potrzeby');bottom.appendChild(icon('arrow'));info.appendChild(bottom);
 card.appendChild(info);placesGrid.appendChild(card);
 recipientSections.appendChild(buildRecipientSection(p));
});
const linkedRecipient = document.getElementById(location.hash.slice(1));
if (linkedRecipient && recipientSections.contains(linkedRecipient)) linkedRecipient.scrollIntoView();
const partners = $('#partners-grid');
if (D.partners.length) {
  const list = el('ul', 'partner-list');
  list.setAttribute('role', 'list');
  const isRemiVision = partner => {
    const website = safeUrl(partner.website);
    return partner.name?.replace(/\s+/g, '').toLowerCase() === 'remivision' ||
      (website && new URL(website).hostname.replace(/^www\./, '') === 'remivision.com');
  };
  const orderedPartners = [...D.partners].sort((a, b) => Number(Boolean(isRemiVision(b))) - Number(Boolean(isRemiVision(a))));
  const filmPartners = $('#film-partners');
  orderedPartners.forEach(partner => {
    const website = safeUrl(partner.website);
    const item = el('li');
    const card = el(website ? 'a' : 'div', 'partner-card');
    if (website) {
      card.href = website;
      card.target = '_blank';
      card.rel = 'noopener noreferrer';
    }
    if (partner.logo?.startsWith('assets/media/')) {
      const logo = el('span', 'partner-card-logo');
      const image = el('img');
      image.alt = '';
      image.loading = 'lazy';
      image.decoding = 'async';
      image.addEventListener('error', () => logo.remove(), { once: true });
      image.src = partner.logo;
      logo.appendChild(image);
      card.appendChild(logo);
    }
    card.appendChild(el('strong', '', partner.name));
    if (partner.description) card.appendChild(el('small', '', partner.description));
    item.appendChild(card);
    list.appendChild(item);
    if (filmPartners.children.length < 3) {
      const credit = el('span', 'film-partner', partner.name);
      if (partner.logo?.startsWith('assets/media/')) {
        const mark = el('img');
        mark.alt = partner.name;
        mark.loading = 'lazy';
        mark.addEventListener('load', () => credit.replaceChildren(mark), { once: true });
        mark.src = partner.logo;
      }
      filmPartners.appendChild(credit);
    }
  });
  partners.replaceChildren(list);
}
function safeUrl(url){try{const u=new URL(url);return ['https:','http:'].includes(u.protocol)?u.href:null;}catch{return null;}}
const allocation = $('#allocation-faq');
const allocationText = D.allocationText?.trim();
if (allocationText) {
  allocation.textContent = allocationText;
  allocation.hidden = false;
}
const configuredEmail = D.contactEmail?.trim();
if (configuredEmail && /^[\w.!+%-]+@[\w.-]+\.[a-z]{2,}$/i.test(configuredEmail)) {
  $$('[data-organizer-contact]').forEach(link => {
    const subject = link.dataset.contactSubject || link.closest('details')?.dataset.contactSubject;
    link.href = 'mailto:' + encodeURIComponent(configuredEmail).replace('%40', '@') +
      (subject ? '?subject=' + encodeURIComponent(subject) : '');
  });
}

const year=$('#year');if(year)year.textContent=new Date().getFullYear();
const navToggle = $('.nav-toggle');
const nav = $('#main-nav');
function setMenuOpen(open) {
  nav.classList.toggle('is-open', open);
  navToggle.setAttribute('aria-expanded', String(open));
  navToggle.setAttribute('aria-label', open ? 'Zamknij menu' : 'Otwórz menu');
}
navToggle.addEventListener('click', () => setMenuOpen(!nav.classList.contains('is-open')));
$$('a', nav).forEach(link => link.addEventListener('click', () => setMenuOpen(false)));
$('.site-header').addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav.classList.contains('is-open')) {
    setMenuOpen(false);
    navToggle.focus();
  }
});
})();
