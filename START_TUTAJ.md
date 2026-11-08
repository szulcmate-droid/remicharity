# RemiCharity v2 — rozpocznij tutaj

Gotowa statyczna strona dla akcji Remivision „Razem dla Bydgoszczy”.

## Co jest w tej wersji?

- **Trzy oddzielne sekcje**: BZPOW Traugutta 5, Wojewódzki Szpital Dziecięcy, Hospicjum Pallmed Dom Sue Ryder.
- W każdej sekcji własny opis placówki, **realne archiwalne zdjęcie budynku** i indywidualna lista potrzeb.
- Potrzeby szpitala podzielone na oddziały: chirurgia, kardiologia i endokrynologia.
- Przycisk „Chcę pomóc tej placówce” uzupełnia właściwe pole w formularzu.
- W dalszym ciągu działa sekcja firm partnerskich, zbiórki i korzyści dla przedsiębiorców.
- Miejsce na dodanie kolejnych zdjęć każdej placówki.
- **Nowość:** można przejść na aktualizacje pojedynczych plików przez GitHub + Netlify.

## Jak przetestować i opublikować?

1. Rozpakuj ZIP.
2. Otwórz `index.html` na swoim komputerze, by obejrzeć stronę. Zdjęcia Wikimedia wymagają dostępu do internetu.
3. Jeśli nie masz jeszcze Netlify, załóż konto pod adresem https://app.netlify.com/drop i przeciągnij folder `remicharity-netlify`.
4. Jeśli masz już tę stronę w Netlify, podmień wersję przez pole w `Deploys / Production deploys`, **w istniejącym projekcie**, aby zachować adres.
5. Jeśli przewidujesz dużo poprawek, skonfiguruj GitHub według `GITHUB_NETLIFY_INSTRUKCJA.md`. Wtedy w kolejnych iteracjach nie trzeba już przesyłać folderu.

## Co uzupełnić przed publicznym startem?

- Zgody placówek na udział w akcji i wykorzystanie nazw i materiałów.
- Formalną nazwę operatora zbiórki, zasady podziału środków oraz oficjalny link wpłat.
- Dane Remivision i informację o przetwarzaniu danych (RODO).
- Konkretne potrzeby hospicjum (jeszcze nie są podane).
- Ewentualne zdjęcia podopiecznych/pacjentów wyłącznie przy odpowiednich zgodach.
- W Netlify włączyć Forms, ponownie wdrożyć stronę i wysłać testowe zgłoszenie.

## Gdzie zmieniać treści?

Przede wszystkim w `assets/content.js`. Szczegóły w `INSTRUKCJA_EDYCJI.md`.

## Źródła zdjęć

W pliku `ZDJECIA_ZRODLA.md`. Wszystkie 3 zdjęcia budynków użyte w tej wersji są dostępne na licencji CC0. Są archiwalne i pochodzą z Wikimedia Commons.
