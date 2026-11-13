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
      video.preload = 'metadata';
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
 if (donateUrl && item.status !== 'zrealizowane') bot.appendChild(createDonationAction());
 card.appendChild(bot);return card;
}
const donateUrl = safeUrl(D.fundraiserUrl);
function createDonationAction(variant) {
  if (!donateUrl) return el('span', 'donation-status', 'Zbiórka wkrótce');
  const link = el('a', variant, 'Wpłać na zbiórkę');
  link.href = donateUrl;
  link.appendChild(icon('arrow'));
  return link;
}
$$('[data-donation-action]').forEach(slot => {
  if (donateUrl) slot.replaceWith(createDonationAction(slot.dataset.donationAction));
});

function buildRecipientSection(place){
 const panel=el('article','recipient-panel recipient-'+place.id);
 panel.id='placowka-'+place.id;
 const hero=el('div','recipient-hero');
 const media=el('div','recipient-media');
 if(place.gallery.length){
   media.appendChild(buildGallery(place));
 }else{
   const blank=el('div','recipient-empty-photo');
   blank.appendChild(icon(place.icon||'home'),el('span','','Galeria wkrótce'));
   media.appendChild(blank);
 }
 hero.appendChild(media);
 const body=el('div','recipient-details');
 body.appendChild(el('h3','',place.full));body.appendChild(el('p','recipient-detail',place.detail));body.appendChild(el('p','recipient-description',place.description));
 const items=D.needs.filter(n=>n.place===place.id);
 const actions = el('div', 'recipient-actions');
 actions.appendChild(createDonationAction('btn btn-primary'));
 body.appendChild(actions);hero.appendChild(body);
 panel.appendChild(hero);
 const list=el('div','recipient-needs');
 const heading=el('div','recipient-needs-heading');heading.appendChild(el('h3','','Lista potrzeb'));
 if (items.length && !place.confirmed) heading.appendChild(el('p', '', 'Do potwierdzenia z placówką.'));
 list.appendChild(heading);
 if(items.length){
  const grid = el('div', 'recipient-needs-grid');
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
 const photo=p.gallery.find(item=>item.kind==='image');
 if(photo){const img=el('img','place-jump-image');img.src=photo.src;img.alt='';img.loading='lazy';img.addEventListener('error',()=>img.remove(),{once:true});card.appendChild(img);}
 const info=el('div','place-jump-content');
 info.appendChild(el('h3','',p.short));
 const bottom=el('span','place-jump-action','Zobacz galerię i potrzeby');bottom.appendChild(icon('arrow'));info.appendChild(bottom);
 card.appendChild(info);placesGrid.appendChild(card);
 recipientSections.appendChild(buildRecipientSection(p));
});
const partners = $('#partners-grid');
if (D.partners.length) {
  const list = el('ul', 'partner-list');
  list.setAttribute('role', 'list');
  D.partners.forEach(partner => {
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
  });
  partners.replaceChildren(list);
}
function safeUrl(url){try{const u=new URL(url);return ['https:','http:'].includes(u.protocol)?u.href:null;}catch{return null;}}
const widget=$('#fundraise-widget');
if(Number.isFinite(D.amountRaised)&&D.amountRaised>=0&&Number.isFinite(D.targetAmount)&&D.targetAmount>0){widget.hidden=false;$('#amount-raised').textContent=D.amountRaised.toLocaleString('pl-PL')+' zł';$('#target-amount').textContent='Cel: '+D.targetAmount.toLocaleString('pl-PL')+' zł';$('#fundraise-bar').style.width=Math.min(100,100*D.amountRaised/D.targetAmount)+'%';}
const allocation=$('#allocation-faq');if(D.allocationText&&D.operatorName)allocation.textContent=`Zbiórkę formalnie prowadzi ${D.operatorName}. ${D.allocationText}`;
const year=$('#year');if(year)year.textContent=new Date().getFullYear();
const navToggle=$('.nav-toggle'),nav=$('#main-nav');navToggle?.addEventListener('click',()=>{const open=nav.classList.toggle('is-open');navToggle.setAttribute('aria-expanded',String(open));navToggle.setAttribute('aria-label',open?'Zamknij menu':'Otwórz menu');});$$('a',nav).forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('is-open');navToggle.setAttribute('aria-expanded','false');}));
})();
