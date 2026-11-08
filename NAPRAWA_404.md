# Naprawa błędu „Page not found” w Netlify

## Najczęstsza przyczyna
Netlify nie widzi pliku `index.html` w katalogu publikacji. Poprzednie archiwum ZIP miało dodatkowy folder `remicharity-netlify` na najwyższym poziomie. To **może** powodować błąd 404, jeśli do Netlify lub GitHub prześle się folder o jeden poziom za wysoko. Ta paczka ma poprawiony układ: `index.html` znajduje się od razu w katalogu głównym ZIP-a.

## Netlify Drop (bez GitHub)
1. Pobierz `RemiCharity_Netlify_POPRAWIONE.zip`.
2. Rozpakuj archiwum w Windows (prawy przycisk > Wyodrębnij wszystkie).
3. Otwórz rozpakowany folder `RemiCharity_DO_WGRANIA`. Musisz tam od razu widzieć `index.html`, `assets`, `netlify.toml`.
4. Wejdź w Netlify > swój projekt > Deploys i przeciągnij **folder `RemiCharity_DO_WGRANIA`** do obszaru nowego ręcznego wdrożenia. Jeśli jesteś na stronie app.netlify.com/drop i chcesz utworzyć nową witrynę, przeciągnij ten sam folder.
5. Po zakończeniu wdrożenia sprawdź adres główny (`https://nazwa.netlify.app/`).
6. W Deploys > ostatni wdrożony Deploy > Deploy File Explorer sprawdź, że `index.html` jest na najwyższym poziomie.

## GitHub (zalecane do dalszych poprawek)
W nowym repozytorium GitHub prześlij zawartość folderu, NIE folder jako podkatalog. W katalogu głównym repozytorium musi być `index.html`, `assets/`, `netlify.toml`. Podłącz repozytorium do Netlify i ustaw `Publish directory` na `.` (kropka) lub pozostaw konfigurację z `netlify.toml` w głównym folderze. Nie wpisuj `dist`, `public` ani `build`.

## Jeśli dalej widzisz błąd 404
- Netlify > Deploys > ostatnie wdrożenie: czy ma status `Published`?
- W `Deploy File Explorer` sprawdź, gdzie jest `index.html`.
- Jeśli jest w podfolderze, ponów wdrożenie właściwego folderu lub popraw `Publish directory`.
- Sprawdź, czy otwierasz sam adres domeny z ukośnikiem `/`, a nie np. `/remicharity-netlify` albo stary adres.
- Jeśli błąd się utrzymuje, prześlij mi URL `*.netlify.app` lub zrzut z `Deploy File Explorer`.

## Ważne przed uruchomieniem publicznym
Uzupełnij kontakt, link zbiórki, politykę prywatności oraz dane formalnego organizatora. Nie zbieraj zgłoszeń przez formularz bez uzupełnienia obowiązku informacyjnego.
