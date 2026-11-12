# Jak edytować RemiCharity v2

Aktualny sposób edycji opisuje [instrukcja Pages CMS](README.md#edycja-w-pages-cms). Poniższa instrukcja dotyczy wersji archiwalnej.

**Najwygodniej:** GitHub połączony z Netlify — zmieniasz pojedynczy plik i klikasz Commit. Szczegóły w `GITHUB_NETLIFY_INSTRUKCJA.md`.

## Najczęściej edytowany plik — `assets/content.js`

- `fundraiserUrl` — prawdziwy link do zbiórki.
- `contactEmail` — e-mail organizatora.
- `operatorName` i `allocationText` — formalny organizator i zasady podziału środków.
- `partners` — partnerzy po wyrażeniu zgody.
- `places` — nazwy, opisy i zdjęcia trzech placówek.
- `needs` — potrzeby przypisane do placówek.
- `amountRaised` / `targetAmount` — rzeczywiste kwoty; `null` oznacza brak statystyki.

### Jak dodać kolejne zdjęcia placówki

W tablicy `photos` konkretnej placówki dopisz nowe elementy. Zdjęcie pierwsze (`photos[0]`) jest zdjęciem głównym, kolejne (maksymalnie trzy widoczne) tworzą galerię poniżej.

```js
photos: [
  { src: 'assets/zdjecia/bzpow-glowne.webp', alt: 'Budynek placówki', caption: 'Wejście główne' },
  { src: 'assets/zdjecia/bzpow-pokoj.webp', alt: 'Pokój wychowanków', caption: 'Pokój placówki' },
],
```

Pamiętaj o umieszczeniu zdjęć w `assets/zdjecia` i odpowiednich zgodach.

### Jak dodać potrzebę

```js
{ id: 'b7', place: 'bzpow', group: 'Codzienność', title: 'Przykładowa potrzeba', description: 'Opis po potwierdzeniu z placówką.', icon: 'gift', priority: false, amount: null, status: 'potrzebne' },
```

Klucze `place`: `bzpow`, `szpital`, `hospicjum`.

Statusy: `potrzebne`, `do-uzgodnienia`, `zarezerwowane`, `zrealizowane`. Dla pozycji zrealizowanej przycisk zgłoszenia się nie wyświetla.

Przy szpitalu `group` to np. `Chirurgia`, `Kardiologia` lub `Endokrynologia` — grupy wyświetlają się oddzielnie.

### Jak podmienić logotyp partnera

Wgraj plik do `assets/`, dopisz obiekt do `partners`. Nie publikuj logo bez zgody.

### Jak edytować inne elementy

- Nagłówki i ogólne treści: `index.html`.
- Wygląd strony: `assets/style.css`.
- Działanie interaktywne: `assets/app.js`.
- Polityka prywatności: `polityka-prywatnosci.html` (szablon do uzupełnienia).

Nie wrzucaj prywatnych danych podopiecznych do publicznego repozytorium i nie publikuj zdjęć osób bez właściwych zgód.
