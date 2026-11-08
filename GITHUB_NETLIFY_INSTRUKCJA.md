# RemiCharity v2 — aktualizacje pojedynczych plików przez GitHub

## Dlaczego GitHub zamiast przeciągania folderu?

Netlify Drop pozwala aktualizować stronę przez ponowne przeciągnięcie całego folderu do **tego samego projektu**. To działa, ale przy częstych poprawkach jest uciążliwe.

Po połączeniu Netlify z GitHub **edytujesz tylko plik, który chcesz zmienić**. Każdy zapis (commit) w gałęzi `main` automatycznie uruchamia wdrożenie w Netlify. Netlify publikuje spójny nowy snapshot strony; nie trzeba ręcznie wrzucać całego folderu. Zmiany są wersjonowane i można wrócić do poprzedniego commita/deploya.

## Pierwsze skonfigurowanie — gdy masz już stronę na Netlify

1. Zaloguj się na https://github.com i wybierz `New repository`.
2. Nazwa: np. `remicharity`; widoczność repozytorium może być prywatna. **Nie wstawiaj do repozytorium haseł, tokenów ani danych osobowych darczyńców.**
3. Utwórz repozytorium bez plików startowych (bez README / .gitignore) albo użyj GitHub Desktop, jeśli wolisz pracę z folderem.
4. Na stronie nowego repozytorium wybierz `uploading an existing file` / `Add file → Upload files` i przeciągnij **zawartość folderu `remicharity-netlify`**, tak aby `index.html` i `netlify.toml` leżały w głównym katalogu repozytorium, a `assets` był podfolderem. Zapisz (`Commit changes`). Jeśli przeglądarka nie zachowa podfolderów przy przeciąganiu, skorzystaj z GitHub Desktop (https://desktop.github.com/) i opublikuj lokalny folder jako repozytorium.
5. W Netlify otwórz **istniejący projekt** (nie twórz nowego, jeśli masz już działającą domenę).
6. Otwórz `Project configuration → Developer settings → Continuous deployment → Repository → Link repository`.
7. Wybierz GitHub i repozytorium `remicharity` (potwierdź autoryzację).
8. Dla naszej statycznej strony ustaw gałąź produkcyjną `main`, build command pozostaw pusty, a publish directory ustaw na `.`. Plik `netlify.toml` także wskazuje `publish = "."`.
9. Sprawdź status w `Deploys`, otwórz stronę i przetestuj formularz. Adres strony i własna domena pozostają powiązane z dotychczasowym projektem Netlify.

Oficjalna instrukcja: https://docs.netlify.com/build/git-workflows/repo-permissions-linking/

## Każda kolejna poprawka — tylko jeden plik

**Przykład — zmiana listy potrzeb:**

1. Otwórz GitHub → repozytorium `remicharity`.
2. Otwórz `assets/content.js`.
3. Kliknij ołówek / `Edit this file`.
4. Popraw listę potrzeb, nazwę firmy, zdjęcia lub link zbiórki.
5. Kliknij `Commit changes` i zapisz w `main`.
6. Netlify automatycznie opublikuje zmianę — sprawdzisz ją na **tym samym** adresie strony. Nie wgrywasz ZIP-a.

**Przykład — wymiana zdjęcia:**

1. Wejdź na GitHub do folderu `assets/zdjecia`.
2. `Add file → Upload files`, wgraj zdjęcie `.jpg` lub `.webp` (najlepiej poniżej 400 kB).
3. W `assets/content.js` znajdź właściwą placówkę i w `photos` wpisz np. `src: 'assets/zdjecia/bzpow-pokoj.webp'`.
4. Zatwierdź zmianę. Gotowe.

**Przykład — zmiana wyglądu:** edytuj `assets/style.css`. **Zmiana funkcjonalności:** `assets/app.js`. **Teksty niepochodzące z danych:** `index.html`.

## Jeśli nie chcesz GitHub

W Netlify otwórz projekt → `Deploys` / `Production deploys`, przeciągnij cały zaktualizowany folder strony do pola ręcznej publikacji. Uważaj, aby nie tworzyć nowego projektu — wrzucaj do już istniejącego. Na każde takie ręczne wdrożenie przesyłasz całość folderu. Netlify prześle na serwer tylko potrzebne zmiany, ale Ty dostarczasz folder jako komplet strony.

## Zdjęcia beneficjentów i placówek

W wersji v2 znajdują się **trzy rzeczywiste zdjęcia zewnętrzne budynków** znalezione na Wikimedia Commons na licencji CC0. Są archiwalne (2013–2015) — nie pokazują wychowanków ani pacjentów. Linki źródłowe znajdują się w `assets/content.js` i `ZDJECIA_ZRODLA.md`. Zdjęcia z wnętrz i zdjęcia dzieci / pacjentów dodawaj tylko po uzyskaniu odpowiednich zgód, z poszanowaniem prywatności; najbezpieczniejszą alternatywą są zdjęcia wnętrz bez osób.

## Ważne przed uruchomieniem zbiórki

Zanim zaczniesz pozyskiwać kontakty i zbierać dane przez formularz, uzupełnij `polityka-prywatnosci.html`, dane administratora, odbiorcę wpłat, zasady podziału środków oraz link do zweryfikowanej zbiórki. Formularz Netlify wymaga włączenia Form detection i testu na publicznym adresie.
