import { copyFile, lstat, mkdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { dirname, extname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = resolve(root, 'dist');
const placeIds = ['bzpow', 'szpital', 'hospicjum'];
const files = new Set([
  'index.html', '404.html', 'dziekujemy.html', 'polityka-prywatnosci.html', '_headers',
  'assets/app.js', 'assets/style.css', 'assets/favicon.svg', 'assets/og-image.png',
]);
const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.avif'];
const videoExtensions = ['.mp4', '.webm'];
const maxAssetSize = 25 * 1024 * 1024;

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
    creditUrl: httpsUrl(creditUrl),
    src: file ? mediaPath(file, isVideo ? videoExtensions : imageExtensions) : httpsUrl(externalUrl),
    youtubeId,
    poster: isVideo && poster ? mediaPath(poster, imageExtensions) : undefined,
  };
}

const settings = await readContent('settings');
const needs = await readContent('needs');
const places = await Promise.all(placeIds.map(async id => {
  const { gallery, ...place } = await readContent(id);
  return { ...place, id, gallery: (gallery ?? []).filter(item => item.approved === true).map(publishSlide) };
}));
const partners = (settings.partners ?? []).map(partner => ({
  ...partner,
  logo: partner.logo ? mediaPath(partner.logo, imageExtensions) : '',
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
  await copyFile(resolve(root, path), destination);
}
const data = { ...settings, places, needs, partners };
await writeFile(resolve(output, 'assets/content.js'), 'window.REMI_DATA = ' + JSON.stringify(data) + ';\n');
console.log('Gotowy katalog publikacji: dist/');
