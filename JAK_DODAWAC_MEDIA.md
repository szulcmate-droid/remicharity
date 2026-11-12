# RemiCharity — dodawanie zdjęć i filmów na GitHub

Aktualny sposób dodawania mediów opisuje [instrukcja Pages CMS](README.md#edycja-w-pages-cms). Poniższa instrukcja dotyczy wersji archiwalnej.

## Ważne
Ta wersja v3 uzupełnia galerię każdego z trzech beneficjentów o filmy MP4 i YouTube. Nie pokazuje pustych odtwarzaczy — film pojawi się dopiero po wpisaniu danych do `assets/content.js`.

## 1. Wgraj zdjęcie
1. Otwórz repozytorium GitHub, katalog `assets/zdjecia`.
2. `Add file → Upload files`, wybierz np. `bzpow-swietlica.webp`, zatwierdź `Commit changes` na gałęzi `main`.
3. Otwórz `assets/content.js`, znajdź `id: 'bzpow'` i tablicę `photos`:

```js
photos: [
  { src: 'assets/zdjecia/bzpow-swietlica.webp', alt: 'Świetlica BZPOW', caption: 'Świetlica, którą chcemy doposażyć' },
  { src: 'assets/zdjecia/bzpow-pokoj.webp', alt: 'Pokój wychowanków BZPOW', caption: 'Pokój w placówce' },
],
photoCreditUrl: '',
```

Pierwsze zdjęcie to duże zdjęcie główne; kolejne wyświetlą się w przewijanej galerii. Analogicznie postępuj dla `id: 'szpital'` oraz `id: 'hospicjum'`.

## 2. Wgraj lokalny film MP4
1. Otwórz `assets/filmy` i prześlij np. `bzpow-prezentacja.mp4` (przez stronę GitHub do 25 MiB na plik).
2. W `assets/content.js` w tej samej placówce dodaj pole `videos`:

```js
videos: [
  { src: 'assets/filmy/bzpow-prezentacja.mp4', poster: 'assets/zdjecia/bzpow-okladka.webp', caption: 'Zobacz świetlicę BZPOW' },
],
```

`poster` to opcjonalne zdjęcie okładkowe filmu. Jeśli nie masz okładki, usuń pole `poster`.

## 3. Dłuższy film przez YouTube
Jeśli nagranie ma kilkadziesiąt megabajtów lub więcej, lepiej osadzić film z YouTube zamiast trzymać go w repozytorium. Skopiuj **ID filmu** z adresu YouTube `https://www.youtube.com/watch?v=ABCDEFGHIJK` — czyli `ABCDEFGHIJK`.

```js
videos: [
  { youtubeId: 'ABCDEFGHIJK', caption: 'Poznaj naszą placówkę' },
],
```

Film niepubliczny („unlisted”) nie jest prywatny — każda osoba z linkiem lub dostępem do witryny może go obejrzeć. Na publicznej stronie pokazuj tylko nagrania, do których masz wszystkie wymagane zgody.

## 4. Dlaczego film nie pojawia się automatycznie po wgraniu?
Plik trafił na serwer, ale strona musi znać jego dokładną ścieżkę. Aktualizujesz `assets/content.js`, klikasz `Commit changes`, a Netlify automatycznie publikuje nową wersję.

## 5. Jak wdrożyć obsługę filmów do istniejącej strony?
- Jeśli witryna jest nadal zgodna z wcześniejszym projektem v2 i nie zmieniałeś plików `assets/app.js` oraz `assets/style.css`, użyj osobnej paczki `RemiCharity_v3_TYLKO_OBSLUGA_FILMOW.zip` (2 pliki).
- Podmień tylko te dwa pliki w `assets/`. Najłatwiej zrobić to przez **GitHub Desktop**: pobierz repozytorium na komputer, skopiuj pliki z paczki do lokalnego folderu `assets`, zatwierdź commit i `Push origin`. Alternatywnie otwórz każdy plik na GitHub, kliknij ołówek i wklej zawartość pliku z paczki, a następnie `Commit changes`. Samo `Upload files` w przeglądarce może nie pozwolić zastąpić istniejącego pliku o tej samej nazwie. `assets/content.js` zostaje bez zmian — dopisujesz do niego `videos` zgodnie z powyższym przykładem.
- Jeżeli masz zmieniony JavaScript lub style, **nie nadpisuj ich bez porównania**; wyślij aktualne pliki do połączenia zmian.
- W razie problemu pełna paczka `RemiCharity_v3_PELNY_PROJEKT.zip` zawiera wszystkie pliki do wdrożenia od nowa, ale jej zastosowanie może nadpisać inne poprawki.

## 6. Rozmiary i prywatność
Zdjęcia: JPG lub WebP, najlepiej 1600–2000 px szerokości i po kompresji około 150–500 KB. Filmy: MP4 (H.264/AAC), 720p lub 1080p. Długie filmy najlepiej hostować na usłudze wideo. Nie publikuj zdjęć ani nagrań pozwalających rozpoznać dzieci, pacjentów lub ujawniających informacje medyczne bez ważnych zgód i odpowiednich uprawnień.
