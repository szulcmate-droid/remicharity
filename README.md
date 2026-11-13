# Bydgoski Biznes Pomaga

## Edycja w Pages CMS

Zaloguj się do [Pages CMS](https://app.pagescms.org/), udziel aplikacji GitHub dostępu do repozytorium `szulcmate-droid/remicharity` i wybierz gałąź zawierającą `.pages.yml`. Zapis w CMS tworzy commit na wybranej gałęzi.

- Wybierz **BZPOW**, **Szpital Dziecięcy** lub **Hospicjum Pallmed Dom Sue Ryder**, aby edytować opis i kolejność zdjęć oraz filmów w galerii.
- W **Listach potrzeb** zmienisz opisy, statusy i przypisanie do placówki lub oddziału.
- W **Kampania** wklej **Adres wspólnej zbiórki**. Wszystkie przyciski wpłat prowadzą pod ten adres. Przy pustym polu strona pokazuje „Zbiórka wkrótce”.
- W **Partnerzy** dodasz, zmienisz lub usuniesz firmę. Podaj nazwę, prześlij logo i wpisz pełny adres strony. Krótki opis jest opcjonalny. Zapisz zmiany, żeby zaktualizować listę firm.
- RemiVision pojawia się jako pierwszy partner niezależnie od kolejności w CMS. Dla pozostałych partnerów kolejność odpowiada liście w CMS.
- Na liście potrzeb pole **Priorytet** wpływa na pierwsze trzy pozycje widoczne bez rozwijania.

## Przed publicznym startem

Administrator akcji uzupełnia w **Kampania** adres wspólnej zbiórki, potwierdzoną nazwę operatora oraz zasady podziału i rozliczania środków. Kwotę zebraną i cel można wyświetlić po potwierdzeniu danych. W polu **Publiczny adres witryny (HTTPS)** wpisz docelowy adres, żeby grafika udostępniania dostała pełny URL. W pliku `polityka-prywatnosci.html` trzeba uzupełnić szablon informacji o przetwarzaniu danych, w tym dane administratora, podstawy i cele przetwarzania, odbiorców, okres przechowywania oraz kontakt w sprawach danych. Przed publikacją sprawdź również uprawnienia do wszystkich materiałów.

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
