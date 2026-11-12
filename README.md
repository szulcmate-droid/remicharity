# RemiCharity

## Edycja w Pages CMS

Zaloguj się do [Pages CMS](https://app.pagescms.org/), udziel aplikacji GitHub dostępu do repozytorium `szulcmate-droid/remicharity` i wybierz gałąź zawierającą `.pages.yml`. Na czas przeglądu wybierz `codex/galerie-pages-cms`. Zapis w CMS tworzy commit na wybranej gałęzi.

- Wybierz **BZPOW**, **Szpital Dziecięcy** lub **Hospicjum Pallmed Dom Sue Ryder**, aby edytować opis i kolejność zdjęć oraz filmów w galerii.
- W **Listach potrzeb** zmienisz opisy, statusy i przypisanie do placówki lub oddziału.
- W **Kampania, partnerzy i formularz** zmienisz adres zbiórki, kwoty, kontakt, listę partnerów i adres formularza.

Dodając materiał do galerii, wybierz rodzaj, podaj opis alternatywny zdjęcia lub tytuł filmu i wskaż jedno źródło. Możesz użyć pliku z biblioteki CMS, bezpośredniego adresu HTTPS albo identyfikatora filmu YouTube. Dla filmów z biblioteki używaj MP4 lub WebM. Podpis, miniatura filmu i link do strony źródłowej są opcjonalne.

Repozytorium jest publiczne. Przed wgraniem lub podlinkowaniem materiału z dziećmi albo pacjentami potwierdź zgody na publikację. Pole **Dopuszczony do publikacji** decyduje o obecności materiału na stronie. Plik zapisany przez CMS w repozytorium jest dostępny na GitHubie od chwili zapisu. Starsze pliki z `assets/zdjecia/` pomija pakiet wdrożeniowy.

## Cloudflare Pages

Połącz repozytorium z projektem Pages i ustaw poniższe parametry.

| Ustawienie | Wartość |
| --- | --- |
| Framework preset | None |
| Root directory | katalog główny repozytorium |
| Build command | `node scripts/build.mjs` |
| Build output directory | `dist` |
| Production branch | `main` |

Lokalnie uruchom `node scripts/build.mjs`, a następnie `python -m http.server 8000 --directory dist`. Stronę otworzysz pod adresem `http://localhost:8000`. Serwuj wyłącznie katalog `dist`. Limit pojedynczego pliku na Cloudflare Pages wynosi 25 MiB. Większe filmy możesz podać przez bezpośredni adres HTTPS lub osadzić z YouTube. [Dokumentacja Cloudflare Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-anything/) · [Limity](https://developers.cloudflare.com/pages/platform/limits/#file-size)

## Formularz zgłoszeń

Utwórz formularz w koncie Formspree organizatora, ustaw odbiorcę i skopiuj pełny adres `https://formspree.io/f/…` z zakładki **Integration**. Wklej go w Pages CMS w polu **Adres formularza Formspree**. Puste pole pozostawia wysyłkę nieaktywną. Po udanym zgłoszeniu strona otwiera `dziekujemy.html`. Przed uruchomieniem dla odwiedzających uzupełnij istniejący szablon informacji o przetwarzaniu danych i sprawdź odbiór zgłoszenia testowego. [Instrukcja Formspree](https://help.formspree.io/articles/building-your-form/building-an-html-form)
