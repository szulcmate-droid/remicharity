import { copyFile, lstat, mkdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { dirname, extname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = resolve(root, 'dist');
const placeIds = ['bzpow', 'szpital', 'hospicjum'];
const files = new Set([
  'index.html', '404.html', 'dziekujemy.html', 'regulamin.html', 'polityka-prywatnosci.html', '_headers',
  'assets/app.js', 'assets/style.css', 'assets/favicon-akcji.ico',
  'assets/logo-akcji.webp', 'assets/bydgoski-biznes-pomaga-og.jpg',
]);
const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.avif'];
const videoExtensions = ['.mp4', '.webm'];
const maxAssetSize = 25 * 1024 * 1024;

function escapeHtml(text) {
  return text.replace(/[&<>]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[character]);
}

async function readContent(name) {
  return JSON.parse(await readFile(resolve(root, 'content', name + '.json'), 'utf8'));
}

function mediaPath(value, extensions) {
  const path = value?.replace(/^\//, '');
  const folder = 'assets/media/';
  const filename = path?.slice(folder.length);
  if (!path?.startsWith(folder) || !filename || /[/\\]/.test(filename) ||
      !extensions.includes(extname(filename).toLowerCase())) {
    throw new Error('Wybierz plik z biblioteki mediów Pages CMS: ' + value);
  }
  files.add(path);
  return folder + encodeURIComponent(filename);
}

function httpsUrl(value) {
  if (!value) return '';
  const url = new URL(value);
  if (url.protocol !== 'https:' || url.username || url.password) {
    throw new Error('Wymagany jest publiczny adres HTTPS: ' + value);
  }
  return url.href;
}

function publishSlide(item) {
  const { kind, image, video, externalUrl, youtubeId, poster, alt, caption, creditUrl } = item;
  const isVideo = kind === 'video';
  if ((!isVideo && kind !== 'image') || !alt?.trim()) {
    throw new Error('Materiał w galerii wymaga typu i opisu dostępności.');
  }
  const file = isVideo ? video : image;
  if ([file, externalUrl, youtubeId].filter(Boolean).length !== 1 ||
      (youtubeId && (!isVideo || !/^[\w-]{11}$/.test(youtubeId)))) {
    throw new Error('Wybierz jedno prawidłowe źródło materiału: ' + alt);
  }
  return {
    kind,
    alt,
    caption,
    cardCover: !isVideo && item.cardCover === true ? true : undefined,
    creditUrl: httpsUrl(creditUrl),
    src: file ? mediaPath(file, isVideo ? videoExtensions : imageExtensions) : httpsUrl(externalUrl),
    youtubeId,
    poster: isVideo && poster ? mediaPath(poster, imageExtensions) : undefined,
  };
}

const { companyContactName, companyContactRole, ...settings } = await readContent('settings');
const configuredEmail = settings.contactEmail?.trim() ?? '';
const contactEmail = /^[\w.!+%-]+@[\w.-]+\.[a-z]{2,}$/i.test(configuredEmail)
  ? configuredEmail
  : 'dokumenty.remivision@gmail.com';
const contactEmailHref = 'mailto:' + encodeURIComponent(contactEmail).replace('%40', '@');
const fundraiserOrganizer = settings.operatorName?.trim();
const organizerNotice = [
  fundraiserOrganizer && `Zbiórka prowadzona na platformie zrzutka.pl jest zarejestrowana na dane ${fundraiserOrganizer}.`,
  'Akcja Bydgoski Biznes Pomaga realizowana jest we współpracy z Remivision, które koordynuje organizację pomocy, zakupy oraz przekazanie darów wspieranym placówkom.',
].filter(Boolean).join(' ');
const contactName = companyContactName?.trim();
const contactRole = companyContactRole?.trim();
const companyContact = contactName ? [
  '<section id="kontakt-z-firmami" aria-labelledby="kontakt-z-firmami-title">',
  '  <h2 id="kontakt-z-firmami-title">Kontakt z firmami</h2>',
  `  <p><strong>${escapeHtml(contactName)}</strong>${contactRole ? `<br />${escapeHtml(contactRole)}` : ''}</p>`,
  '</section>',
].join('\n    ') : '';
const needs = await readContent('needs');
const places = await Promise.all(placeIds.map(async id => {
  const { gallery, ...place } = await readContent(id);
  return { ...place, id, gallery: (gallery ?? []).filter(item => item.approved === true).map(publishSlide) };
}));
const partners = (await readContent('partners')).map(partner => ({
  ...partner,
  logo: partner.logo
    ? mediaPath(partner.logo, partner.logo === '/assets/media/remivision-logo.svg' ? ['.svg'] : imageExtensions)
    : '',
}));

for (const path of files) {
  const file = await stat(resolve(root, path));
  if (!file.isFile() || file.size > maxAssetSize) {
    throw new Error('Plik statyczny musi mieścić się w limicie 25 MiB: ' + path);
  }
}

const previousOutput = await lstat(output).catch(error => {
  if (error.code !== 'ENOENT') throw error;
});
if (previousOutput) {
  if (!previousOutput.isDirectory() || previousOutput.isSymbolicLink()) {
    throw new Error('Katalog dist musi być zwykłym katalogiem.');
  }
  await rm(output, { recursive: true });
}
for (const path of files) {
  const destination = resolve(output, path);
  await mkdir(dirname(destination), { recursive: true });
  if (path === 'index.html' || path === 'regulamin.html' || path === 'polityka-prywatnosci.html') {
    const template = await readFile(resolve(root, path), 'utf8');
    await writeFile(destination, template
      .replace('<!-- fundraiser-organizer-notice -->', () => escapeHtml(organizerNotice))
      .replace('<!-- company-contact -->', () => companyContact)
      .replaceAll('{{contactEmail}}', () => escapeHtml(contactEmail))
      .replaceAll('{{contactEmailHref}}', () => contactEmailHref));
  } else {
    await copyFile(resolve(root, path), destination);
  }
}
const homepagePath = resolve(output, 'index.html');
let homepage = await readFile(homepagePath, 'utf8');
const bzpowGallery = places.find(place => place.id === 'bzpow').gallery;
const heroPhoto = bzpowGallery.find(
  item => item.kind === 'image' && item.src === 'assets/media/bzpow-wydarzenie-przed-budynkiem.webp',
);
homepage = homepage.replace(
  '<!-- hero-photo -->',
  heroPhoto
    ? '<img class="hero-photo" src="' + heroPhoto.src + '" width="908" height="1175" alt="Wydarzenie przed udekorowanym budynkiem BZPOW" fetchpriority="high" />'
    : '<img class="hero-mark" src="assets/logo-akcji.webp?v=serce" width="256" height="256" alt="" />',
);
const partnerPhoto = bzpowGallery.find(
  item => item.kind === 'image' && item.src === 'assets/media/bzpow-wizyta-w-wolierze.webp',
);
if (partnerPhoto) {
  homepage = homepage.replace(
    '<!-- partner-photo -->',
    '<img class="partner-photo" src="' + partnerPhoto.src + '" width="1125" height="1500" alt="" loading="lazy" decoding="async" />',
  );
}
if (settings.siteUrl?.trim()) {
  const siteUrl = httpsUrl(settings.siteUrl.trim());
  const socialImageUrl = new URL('/assets/bydgoski-biznes-pomaga-og.jpg?v=serce', siteUrl).href;
  homepage = homepage.replace('content="/assets/bydgoski-biznes-pomaga-og.jpg?v=serce"', () =>
    'content="' + socialImageUrl + '"');
}
await writeFile(homepagePath, homepage);
const data = { ...settings, contactEmail, places, needs, partners };
await writeFile(resolve(output, 'assets/content.js'), 'window.REMI_DATA = ' + JSON.stringify(data) + ';\n');
console.log('Gotowy katalog publikacji: dist/');
