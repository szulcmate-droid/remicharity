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
function setPurpose(value){const e=$('#purpose');if(e)e.value=value;}
function setNeedSelection(place,title){
 setPurpose(place);
 const note=$('#note');
 if(note)note.value=`Chcemy wesprzeć: ${title}.`;
}
function createPhoto(photo, place, isMain=false){
 const frame=el('figure',isMain?'recipient-main-photo':'recipient-gallery-photo');
 const img=el('img');
 img.loading=isMain?'lazy':'lazy';
 img.decoding='async';
 img.alt=photo.alt||`Zdjęcie placówki: ${place.full}`;
 img.src=photo.src;
 img.addEventListener('error',()=>{
   img.remove();frame.classList.add('photo-unavailable');
   frame.appendChild(icon(place.icon||'home'));
   frame.appendChild(el('span','','Zdjęcie będzie dostępne po dodaniu materiałów'));
 },{once:true});
 frame.appendChild(img);
 if(photo.caption){const cap=el('figcaption','recipient-photo-caption',photo.caption);frame.appendChild(cap);}
 return frame;
}
// Karuzela zdjęć w głównym oknie każdej placówki.
function buildPhotoCarousel(place, photos){
 const slider=el('div','recipient-slideshow');
 slider.setAttribute('role','region');
 slider.setAttribute('aria-label','Galeria zdjęć: '+place.short);
 const slides=photos.map((photo,i)=>{
  const slide=createPhoto(photo,place,true);
  slide.classList.add('recipient-slide');
  if(i===0)slide.classList.add('is-active');
  slide.setAttribute('aria-hidden',String(i!==0));
  slider.appendChild(slide);
  return slide;
 });
 if(photos.length===1)return slider;
 slider.classList.add('has-multiple');
 slider.tabIndex=0;
 let current=0;
 const dots=el('div','recipient-slide-dots');
 dots.setAttribute('aria-label','Wybierz zdjęcie');
 const dotButtons=photos.map((photo,i)=>{
  const dot=el('button','recipient-slide-dot'+(i===0?' is-active':''));
  dot.type='button';
  dot.setAttribute('aria-label','Pokaż zdjęcie '+(i+1)+' z '+photos.length);
  dot.setAttribute('aria-pressed',String(i===0));
  dot.addEventListener('click',()=>show(i));
  dots.appendChild(dot);
  return dot;
 });
 const counter=el('span','recipient-slide-counter','1 / '+photos.length);
 counter.setAttribute('aria-hidden','true');
 function show(index){
  current=(index+photos.length)%photos.length;
  slides.forEach((slide,i)=>{
   slide.classList.toggle('is-active',i===current);
   slide.setAttribute('aria-hidden',String(i!==current));
  });
  dotButtons.forEach((dot,i)=>{
   dot.classList.toggle('is-active',i===current);
   dot.setAttribute('aria-pressed',String(i===current));
  });
  counter.textContent=(current+1)+' / '+photos.length;
 }
 const previous=el('button','recipient-slide-arrow recipient-slide-prev','‹');
 previous.type='button';
 previous.setAttribute('aria-label','Poprzednie zdjęcie');
 previous.addEventListener('click',()=>show(current-1));
 const next=el('button','recipient-slide-arrow recipient-slide-next','›');
 next.type='button';
 next.setAttribute('aria-label','Następne zdjęcie');
 next.addEventListener('click',()=>show(current+1));
 slider.addEventListener('keydown',e=>{
  if(e.key==='ArrowLeft'||e.key==='ArrowRight'){
   e.preventDefault();show(current+(e.key==='ArrowRight'?1:-1));
  }
 });
 let swipeStart=null;
 slider.addEventListener('touchstart',e=>{if(e.touches.length===1)swipeStart=e.touches[0].clientX;},{passive:true});
 slider.addEventListener('touchend',e=>{
  if(swipeStart===null||!e.changedTouches.length)return;
  const distance=e.changedTouches[0].clientX-swipeStart;
  if(Math.abs(distance)>45)show(current+(distance<0?1:-1));
  swipeStart=null;
 },{passive:true});
 slider.appendChild(previous);
 slider.appendChild(next);
 slider.appendChild(dots);
 slider.appendChild(counter);
 return slider;
}
// Filmy przypisane do konkretnej placówki: lokalne MP4 albo osadzenie YouTube.
function buildVideos(place){
 const videos=Array.isArray(place.videos)?place.videos.filter(v=>v&&(v.src||v.youtubeId)):[];
 if(!videos.length)return null;
 const section=el('section','recipient-videos');
 const top=el('div','recipient-videos-header');
 top.appendChild(el('h3','','Poznaj tę placówkę bliżej'));
 top.appendChild(el('p','','Filmy udostępnione na potrzeby akcji charytatywnej.'));
 section.appendChild(top);
 const grid=el('div','recipient-videos-grid');
 videos.forEach((item,i)=>{
  const figure=el('figure','recipient-video-card');
  const player=el('div','recipient-video-player');
  if(item.youtubeId && /^[a-zA-Z0-9_-]{11}$/.test(item.youtubeId)){
   const iframe=el('iframe');
   iframe.src='https://www.youtube-nocookie.com/embed/'+item.youtubeId;
   iframe.title=item.caption||'Film o placówce '+place.short;
   iframe.setAttribute('loading','lazy');
   iframe.setAttribute('allow','accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
   iframe.setAttribute('allowfullscreen','');
   iframe.setAttribute('referrerpolicy','strict-origin-when-cross-origin');
   player.appendChild(iframe);
  }else if(item.src){
   const video=el('video');
   video.controls=true;
   video.preload='none';
   video.playsInline=true;
   video.setAttribute('aria-label',item.caption||'Film o placówce '+place.short);
   if(item.poster)video.poster=item.poster;
   const source=el('source');
   source.src=item.src;
   source.type=item.type||'video/mp4';
   video.appendChild(source);
   video.appendChild(document.createTextNode('Przeglądarka nie obsługuje odtwarzania tego filmu.'));
   player.appendChild(video);
  }else{return;}
  figure.appendChild(player);
  if(item.caption)figure.appendChild(el('figcaption','recipient-video-caption',item.caption));
  grid.appendChild(figure);
 });
 section.appendChild(grid);
 return section;
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
 if(item.status!=='zrealizowane'){
   const link=el('a','','Chcę pomóc');link.href='#partner';link.appendChild(icon('arrow'));
   link.addEventListener('click',()=>setNeedSelection(item.place,item.title));
   bot.appendChild(link);
 }
 card.appendChild(bot);return card;
}
function buildRecipientSection(place,index){
 const panel=el('article','recipient-panel recipient-'+place.id);
 panel.id='placowka-'+place.id;
 const hero=el('div','recipient-hero');
 const media=el('div','recipient-media');
 const photos=Array.isArray(place.photos)?place.photos.filter(x=>x&&x.src):[];
 if(photos.length){
  media.appendChild(buildPhotoCarousel(place,photos));
  const credits=el('div','recipient-credits');
  credits.appendChild(el('span','',place.photoCreditUrl?'Zdjęcie budynku · archiwalne':'Zdjęcia udostępnione do kampanii'));
  if(place.photoCreditUrl){const link=el('a','','Źródło zdjęcia');link.href=place.photoCreditUrl;link.target='_blank';link.rel='noopener noreferrer';credits.appendChild(link);}
  media.appendChild(credits);
 }else{
   const blank=el('div','recipient-empty-photo');blank.appendChild(icon(place.icon||'home'));
   blank.appendChild(el('span','','Tutaj dodamy zdjęcia placówki'));media.appendChild(blank);
 }
 hero.appendChild(media);
 const body=el('div','recipient-details');
 const top=el('div','recipient-overline');top.appendChild(el('span','recipient-index',String(index+1).padStart(2,'0')+' / 03'));top.appendChild(el('span','recipient-tag',place.eyebrow));body.appendChild(top);
 body.appendChild(el('h3','',place.full));body.appendChild(el('p','recipient-detail',place.detail));body.appendChild(el('p','recipient-description',place.description));
 const stats=el('div','recipient-meta');
 const items=D.needs.filter(n=>n.place===place.id);
 stats.appendChild(icon('gift'));
 stats.appendChild(el('span','',items.length?`${items.length} opisanych potrzeb / pakietów`:'Lista potrzeb w przygotowaniu'));
 body.appendChild(stats);
 const cta=el('a','btn btn-primary','Chcę pomóc tej placówce');cta.href='#partner';cta.appendChild(icon('arrow'));
 cta.addEventListener('click',()=>setPurpose(place.id));body.appendChild(cta);hero.appendChild(body);
 panel.appendChild(hero);
 const videoSection=buildVideos(place);
 if(videoSection)panel.appendChild(videoSection);
 const list=el('div','recipient-needs');
 const heading=el('div','recipient-needs-heading');heading.appendChild(el('h3','','Lista potrzeb'));
 heading.appendChild(el('p','',place.confirmed?'Potrzeby zgłoszone przez placówkę; aktualną dostępność potwierdzimy przy zgłoszeniu.':'Szczegóły uzupełnimy po uzgodnieniu z placówką.'));
 list.appendChild(heading);
 if(items.length){
  // Oddziały Szpitala prezentujemy w osobnych grupach, aby lista była czytelna.
  const groups=place.id==='szpital'?[...new Set(items.map(x=>x.group))]:['Wszystkie'];
  groups.forEach(group=>{
   const selected=place.id==='szpital'?items.filter(i=>i.group===group):items;
   if(place.id==='szpital')list.appendChild(el('h4','recipient-subheading',group));
   const grid=el('div','recipient-needs-grid');selected.forEach(item=>grid.appendChild(createNeedCard(item)));list.appendChild(grid);
  });
 }else{
  const empty=el('div','recipient-pending');
  empty.appendChild(icon('heart'));
  empty.appendChild(el('h4','','Ustalamy dokładne potrzeby hospicjum'));
  empty.appendChild(el('p','','Nie chcemy publikować domysłów. Lista pojawi się tutaj po potwierdzeniu przez placówkę. Już teraz możesz zgłosić chęć pomocy.'));
  list.appendChild(empty);
 }
 panel.appendChild(list);
 return panel;
}
D.places.forEach((p,i)=>{
 const card=el('a','place-card place-jump');card.href='#placowka-'+p.id;
 const photo=Array.isArray(p.photos)&&p.photos.length?p.photos[0]:null;
 if(photo){const img=el('img','place-jump-image');img.src=photo.src;img.alt='';img.loading='lazy';img.addEventListener('error',()=>img.remove(),{once:true});card.appendChild(img);}
 const info=el('div','place-jump-content');const pi=el('div','place-icon');pi.appendChild(icon(p.icon));info.appendChild(pi);
 info.appendChild(el('span','place-label',p.eyebrow));info.appendChild(el('h3','',p.short));info.appendChild(el('p','',p.description));
 const bottom=el('span','place-jump-action','Zobacz zdjęcia i potrzeby');bottom.appendChild(icon('arrow'));info.appendChild(bottom);
 card.appendChild(info);placesGrid.appendChild(card);
 recipientSections.appendChild(buildRecipientSection(p,i));
});
const partners=$('#partners-grid');
if (!D.partners.length){const wrap=el('div','empty-partners');wrap.appendChild(icon('users'));wrap.appendChild(el('h3','','Pierwsi partnerzy? To może być Wasza firma.'));wrap.appendChild(el('p','','Zapraszamy przedsiębiorców do wspólnego działania. Logotypy i podziękowania pojawią się tutaj po potwierdzeniu współpracy oraz uzyskaniu zgody.'));const a=el('a','btn btn-primary','Porozmawiajmy o współpracy');a.href='#partner';wrap.appendChild(a);partners.appendChild(wrap);}else{
 const list=el('div','partner-list');D.partners.forEach(p=>{const a=el(p.website?'a':'div','partner-card');if(p.website){const u=safeUrl(p.website);if(u){a.href=u;a.target='_blank';a.rel='noopener noreferrer';}}
 if(p.logo&&p.logo.startsWith('assets/')){const img=el('img');img.src=p.logo;img.alt='Logo '+p.name;a.appendChild(img);}
 a.appendChild(el('strong','',p.name));if(p.description)a.appendChild(el('small','',p.description));list.appendChild(a);});partners.appendChild(list);
}
function safeUrl(url){try{const u=new URL(url);return ['https:','http:'].includes(u.protocol)?u.href:null;}catch{return null;}}
const donateUrl=safeUrl(D.fundraiserUrl||'');
$$('[data-donate]').forEach(a=>{if(donateUrl){a.href=donateUrl;a.target='_blank';a.rel='noopener noreferrer';}else{a.href='#';a.addEventListener('click',e=>{e.preventDefault();openDialog();});}});
if(donateUrl){const hint=$('#donation-hint');if(hint)hint.textContent='Wpłata odbywa się na oficjalnej, zewnętrznej stronie zbiórki.';}
const widget=$('#fundraise-widget');
if(Number.isFinite(D.amountRaised)&&D.amountRaised>=0&&Number.isFinite(D.targetAmount)&&D.targetAmount>0){widget.hidden=false;$('#amount-raised').textContent=D.amountRaised.toLocaleString('pl-PL')+' zł';$('#target-amount').textContent='Cel: '+D.targetAmount.toLocaleString('pl-PL')+' zł';$('#fundraise-bar').style.width=Math.min(100,100*D.amountRaised/D.targetAmount)+'%';}
const dialog=$('#link-dialog');let lastFocus=null;
function openDialog(){lastFocus=document.activeElement;dialog.hidden=false;$('.dialog-close',dialog).focus();document.body.style.overflow='hidden';}
function closeDialog(){dialog.hidden=true;document.body.style.overflow='';if(lastFocus&&lastFocus.focus)lastFocus.focus();}
$('.dialog-close',dialog)?.addEventListener('click',closeDialog);dialog.addEventListener('click',e=>{if(e.target===dialog)closeDialog();});$('.dialog-action',dialog)?.addEventListener('click',closeDialog);document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!dialog.hidden)closeDialog();});
const allocation=$('#allocation-faq');if(D.allocationText&&D.operatorName)allocation.textContent=`Zbiórkę formalnie prowadzi ${D.operatorName}. ${D.allocationText}`;
const contact=$('#contact-email-wrap');const email=(D.contactEmail||'').trim();if(email&&/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){contact.hidden=false;const a=$('#contact-email');a.textContent=email;a.href='mailto:'+email;}
const source=$('#lead-source');if(source){const utm=new URLSearchParams(location.search).get('utm_source')||'';source.value=utm.slice(0,80).replace(/[^a-zA-Z0-9_.-]/g,'');}
const year=$('#year');if(year)year.textContent=new Date().getFullYear();
const navToggle=$('.nav-toggle'),nav=$('#main-nav');navToggle?.addEventListener('click',()=>{const open=nav.classList.toggle('is-open');navToggle.setAttribute('aria-expanded',String(open));navToggle.setAttribute('aria-label',open?'Zamknij menu':'Otwórz menu');});$$('a',nav).forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('is-open');navToggle.setAttribute('aria-expanded','false');}));
})();
