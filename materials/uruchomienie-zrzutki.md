# Uruchomienie firmowej zbiórki Remivision

Zmiany przygotowano do przeglądu 19 listopada 2026 r. Wersja produkcyjna wymaga osobnej akceptacji.

## Stan integracji

Na prośbę administratora w podglądzie włączono oficjalny widget obecnej zbiórki. Dotychczasowy alias `https://zrzutka.pl/z/BydgoskiBiznesPomaga` prowadzi do `https://zrzutka.pl/thac88`. W konfiguracji zapisano ten kanoniczny adres tej samej zbiórki.

Publiczna zbiórka „BYDGOSKI BIZNES POMAGA” pod adresem https://zrzutka.pl/thac88 wskazuje Mateusza Szulca jako organizatora. Administrator potwierdził wykorzystanie jej widgetu w podglądzie. Przed publikacją należy sprawdzić spójność danych organizatora zbiórki z regulaminem akcji, który wskazuje firmę.

Kwota i pasek postępu mogą pochodzić z oficjalnego widgetu Zrzutka.pl. Bez widgetu strona odsyła do aktualnego wyniku na platformie. Wcześniejsze ręczne pola kwoty i celu pozostają w danych, ale nie wyświetlają się jako aktualny wynik.

## Czynności na koncie firmowym

1. Osoba uprawniona do reprezentowania firmy zakłada konto dla firmy, najlepiej na służbowym adresie e-mail, i wybiera właściwy rodzaj podmiotu w sekcji „Weryfikacja konta”.
2. Uzupełnia formularz identyfikacyjny zgodnie z aktualnym KRS i danymi osoby zarządzającej kontem.
3. Wykonuje wymagany przelew weryfikacyjny z rachunku należącego do firmy zgodnie z instrukcją platformy. Rachunek służy później do wypłat.
4. Przesyła dokument tożsamości osoby zarządzającej oraz dokumenty wymagane przez platformę dla właściwej formy prawnej. Dla spółki komandytowej wykaz obejmuje KRS, CRBR i w razie potrzeby dokument umocowania. Aktualną listę należy sprawdzić w panelu i oficjalnym FAQ.
5. Tworzy nową zbiórkę na zweryfikowanym koncie firmowym, jeśli dotychczasowa jest prywatna. Według FAQ Zrzutka.pl organizatora nie można zmienić na inną osobę lub organizację.
6. Uzupełnia cel, opis, termin 4 grudnia 2026 r. o 23:59 czasu polskiego oraz grafikę z tego katalogu. Cel finansowy wpisuje wyłącznie wtedy, gdy został rzeczywiście ustalony.
7. Sprawdza publiczną nazwę i status organizatora. Nie zakładać, że zmiana nazwy marketingowej konta zmienia podmiot prowadzący zbiórkę.
8. Jeżeli planowane są zbiórki zespołowe, sprawdza, czy włączono Skarbonki. Wpłaty do Skarbonki zasilają saldo zbiórki głównej.
9. Po potwierdzeniu danych przekazuje właściwy adres i kod widgetu do konfiguracji strony. Ewentualne środki z dotychczasowej prywatnej zbiórki wymagają ustalenia sposobu obsługi z Zrzutka.pl.

## Konfiguracja w Pages CMS

W zakładce „Kampania”:

1. W polu „Adres wspólnej zbiórki” wpisz kanoniczny adres firmowej zbiórki z jej ID, np. adres widoczny po otwarciu zbiórki bez własnego aliasu. Wszystkie przyciski wpłat korzystają z tego jednego pola.
2. Na stronie tej samej zbiórki wybierz „…Więcej” → „Stwórz widget”. Wybierz wariant pokazujący zebraną kwotę i postęp do celu, jeśli cel określono.
3. Skopiuj kod do pola „Kod oficjalnego widgetu Zrzutka.pl”. Obsługiwany jest iframe z adresem HTTPS w domenie `zrzutka.pl` i ścieżką `/ID/widget/NUMER` lub `/ID/widget/card/view`. ID musi odpowiadać adresowi wspólnej zbiórki. Kod zawierający sam skrypt wymaga wybrania wariantu iframe.
4. Zaznacz „Włącz oficjalny widget bieżącej zbiórki” po sprawdzeniu zgodności obu adresów. To ustawienie włącza widget i nie zmienia danych organizatora w Zrzutka.pl.
5. Sprawdź podgląd na telefonie i komputerze. Jeśli widget nie wyświetli się, odnośnik do wyniku pozostaje dostępny. Strona nie oblicza kwoty z niedostępnych danych.

Kwotę i pasek postępu renderuje platforma w swoim widżecie. Strona akcji nie odpytuje nieoficjalnych API i nie odczytuje danych przez scraping. Kod bieżącej zbiórki pobrano z jej oficjalnego kreatora. Przy przejściu na konto firmowe trzeba wymienić adres i widget oraz sprawdzić je ponownie.

## Nazwa prawna i rozliczenie

Aktualny odpis KRS 0000566867 sprawdzony w publicznym API Ministerstwa Sprawiedliwości wskazuje nazwę „REMI VISION SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ EMIL BEŁKA RAFAŁ BEŁKA SPÓŁKA KOMANDYTOWA” i NIP 5542930413. Zachowano tę nazwę w dokumentach formalnych, w zwyczajowym zapisie wielkości liter. Marketingowa nazwa na stronie to „Remivision”.

Przed publikacją trzeba porównać podmiot w regulaminie, dane organizatora na Zrzutka.pl i dokumenty rozliczeniowe. Sam kod strony nie zmienia organizatora zewnętrznej zbiórki ani sposobu księgowania.

## Grafika do ręcznego wgrania

Plik `bydgoski-biznes-pomaga-zrzutka.jpg` ma format JPG, 1600 × 900 px i waży około 120 KB. Zawiera oryginalny znak akcji, hasło, informację o bydgoskich przedsiębiorcach i nazwę organizatora. Treści mają szerokie marginesy do kadrowania.

Oficjalny poradnik Zrzutka.pl zaleca poziomy prostokąt i opisuje kadrowanie w panelu. Nie podaje obowiązkowego wymiaru w pikselach. Przyjęto 1600 × 900 px jako poziomy format do podglądu zbiórki. Ostateczny kadr należy sprawdzić w panelu po przesłaniu pliku.

## Źródła

- [Weryfikacja konta firmowego i wymagane dokumenty](https://zrzutka.pl/faq/verification)
- [Zmiana organizatora zbiórki](https://zrzutka.pl/faq/user-account/how-to-change-the-whip-round-organizer)
- [Skarbonki i tworzenie widgetu](https://zrzutka.pl/faq/fundraisers/how-monybox-work)
- [Oficjalny przykład osadzenia iframe](https://zrzutka.pl/blog/305/dolacz-do-walki-z-wykluczeniem-cyfrowym-pomoz-dzieciom-uczyc-sie-i-bawic)
- [Poradnik dotyczący zdjęć i kadrowania](https://zrzutka.pl/blog/277/jak-zrobic-zdjecie-ktore-przykuje-uwage-poradnik-fotograficzny)
- [Aktualny odpis KRS w API Ministerstwa Sprawiedliwości](https://api-krs.ms.gov.pl/api/krs/OdpisAktualny/0000566867?rejestr=P&format=json)
