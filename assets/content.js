/*
  REMICHARITY — JEDYNY PLIK DO REGULARNEJ EDYCJI
  1. Wklej adres zbiórki w fundraiserUrl, gdy będzie aktywna.
  2. Wpisz e-mail kontaktowy do Remivision (contactEmail).
  3. Dodawaj partnerów dopiero po zgodzie: name, website (opcjonalnie), logo (opcjonalnie).
  4. Wpisuj kwoty wyłącznie na podstawie realnych danych.
  5. Po połączeniu GitHub z Netlify wystarczy zapisać zmieniony plik w GitHub (commit).
*/
window.REMI_DATA = {
  campaignName: 'Razem dla Bydgoszczy',
  brandName: 'RemiCharity',
  organizer: 'Remivision',
  fundraiserUrl: '', // np. 'https://zrzutka.pl/TWOJ-LINK' — zostaw puste, dopóki zbiórka nie działa
  contactEmail: '', // służbowy e-mail do kontaktu, np. charity@twojadomena.pl
  campaignDeadline: '', // opcjonalnie, np. '2026-12-05'; nie pokazujemy bez daty
  amountRaised: null, // np. 24500 (PLN); null = nie podawaj statystyki
  targetAmount: null, // np. 50000 (PLN); null = nie podawaj statystyki
  allocationText: '', // ZASADY PODZIAŁU: uzupełnij dopiero po formalnych uzgodnieniach
  operatorName: '', // podmiot formalnie przyjmujący i rozliczający darowizny
  partners: [
    // { name: 'Nazwa firmy', website: 'https://firma.pl', logo: 'assets/logo-firmy.png', description: 'Wsparcie rzeczowe' },
  ],
  places: [
    {
      id: 'bzpow',
      short: 'BZPOW',
      full: 'Bydgoski Zespół Placówek Opiekuńczo-Wychowawczych',
      detail: 'Traugutta 5 · Bydgoszcz',
      eyebrow: 'Dom, codzienność, możliwości',
      description: 'Pomagamy odpowiadać na konkretne potrzeby wychowanków: od tekstyliów i wyposażenia po czas na wspólne przeżycia.',
      icon: 'home',
      
photos: [
  {
    src: 'https://github.com/szulcmate-droid/remicharity/blob/main/assets/zdjecia/DOm%20dziecka/Zrzut%20ekranu%202026-11-12%20131337.png?raw=true,
    alt: 'Przestrzeń wspólna'
  }
],
photoCreditUrl: '',

      photoCreditUrl: 'https://commons.wikimedia.org/wiki/File:Bdg_sierociniecD_5_10-2013.jpg',
      confirmed: true
    },
    {
      id: 'szpital',
      short: 'Szpital Dziecięcy',
      full: 'Wojewódzki Szpital Dziecięcy im. J. Brudzińskiego w Bydgoszczy',
      detail: 'Chirurgia · Kardiologia · Endokrynologia',
      eyebrow: 'Więcej uśmiechu podczas leczenia',
      description: 'Wspieramy kąciki zabaw i zajęcia dla małych pacjentów na trzech oddziałach, w oparciu o otrzymane listy potrzeb.',
      icon: 'sparkles',
      videos: [
  {
    src: 'assets/zdjecia/Szpital/9b84f8ec-8ceb-459c-b1de-0fd2e17e6be4.mp4',
    poster: 'assets/zdjecia/bzpow-swietlica.webp',
    caption: 'Poznaj BZPOW i potrzeby podopiecznych'
  }
],
    },
    {
      id: 'hospicjum',
      short: 'Hospicjum',
      full: 'Hospicjum Pallmed Dom Sue Ryder',
      detail: 'Bydgoszcz',
      eyebrow: 'Troska i obecność',
      description: 'Hospicjum jest trzecią placówką objętą inicjatywą. Konkretne potrzeby zostaną opublikowane po potwierdzeniu z placówką.',
      icon: 'heart',
      photos: [
        { src: 'https://upload.wikimedia.org/wikipedia/commons/3/38/Bdg_DomSueRyder_1_5-2015.jpg', alt: 'Budynek Domu Sue Ryder w Bydgoszczy', caption: 'Dom Sue Ryder, zdjęcie archiwalne (2015)' },
      ],
      photoCreditUrl: 'https://commons.wikimedia.org/wiki/File:Bdg_DomSueRyder_1_5-2015.jpg',
      confirmed: false
    }
  ],
  needs: [
    { id: 'b1', place: 'bzpow', group: 'Codzienność', title: 'Pościel do siedmiu pokoi', description: '14 kompletów pościeli, po 2 jednakowe wzory do każdego pokoju (7 pokoi, po 2 łóżka); wskazany rozmiar 160 × 200 cm.', icon: 'bed', priority: true, amount: null, status: 'potrzebne' },
    { id: 'b2', place: 'bzpow', group: 'Codzienność', title: 'Ręczniki i bielizna', description: 'Ręczniki kąpielowe i do rąk, a także skarpetki i bielizna dla wychowanków w wieku 5–18 lat.', icon: 'package', priority: false, amount: null, status: 'potrzebne' },
    { id: 'b3', place: 'bzpow', group: 'Rozwój', title: 'Dwie świetlice pełne możliwości', description: '2 stanowiska komputerowe i 2 stanowiska do grania z telewizorami — do dwóch świetlic.', icon: 'monitor', priority: true, amount: null, status: 'potrzebne' },
    { id: 'b4', place: 'bzpow', group: 'Przeżycia', title: 'Kultura i atrakcje na cały rok', description: 'Vouchery do kina, teatru, muzeów, sali zabaw, na koncerty i inne atrakcje z długim terminem wykorzystania.', icon: 'ticket', priority: false, amount: null, status: 'potrzebne' },
    { id: 'b5', place: 'bzpow', group: 'Wydarzenie', title: 'Mikołajki dla 30 dzieci', description: 'Animatorki, poczęstunek, paczuszki słodyczy oraz zabawki sensoryczne dla każdego dziecka.', icon: 'gift', priority: true, amount: null, status: 'potrzebne' },
    { id: 'b6', place: 'bzpow', group: 'Do rozważenia', title: 'Dodatkowa odzież i karnawał', description: 'Ubrania dla dzieci lub wydarzenie karnawałowe z animacjami, muzyką i poczęstunkiem — po dalszym ustaleniu.', icon: 'star', priority: false, amount: null, status: 'do-uzgodnienia' },
    { id: 's1', place: 'szpital', group: 'Chirurgia', title: 'Kącik zabaw w gotowanie', description: 'Drewniana kuchnia, zestawy kuchenne, zabawkowe owoce i warzywa oraz akcesoria do zabawy w sklep.', icon: 'utensils', priority: true, amount: null, status: 'potrzebne' },
    { id: 's2', place: 'szpital', group: 'Chirurgia', title: 'Lalka, kasa i zabawy tematyczne', description: 'Lalka interaktywna, kasa fiskalna z akcesoriami i zestawy jedzenia do zabawy.', icon: 'smile', priority: false, amount: null, status: 'potrzebne' },
    { id: 's3', place: 'szpital', group: 'Chirurgia', title: 'Kreatywna świetlica', description: 'Maszyna do przypinek, koraliki do prasowania, mulina, zestawy twórcze oraz gry logiczne i planszowe.', icon: 'palette', priority: false, amount: null, status: 'potrzebne' },
    { id: 's4', place: 'szpital', group: 'Kardiologia', title: 'Gry i przypinki', description: 'Maszyna do przypinek 59 mm z komponentami oraz gry: Koty, Sen, Wsiąść do pociągu. Europa, Everdell.', icon: 'puzzle', priority: true, amount: null, status: 'potrzebne' },
    { id: 's5', place: 'szpital', group: 'Kardiologia', title: 'Materiały plastyczne', description: 'Podobrazia, kleje, farby akrylowe oraz koraliki do bransoletek — zgodnie z listą oddziału.', icon: 'brush', priority: false, amount: null, status: 'potrzebne' },
    { id: 's6', place: 'szpital', group: 'Endokrynologia', title: 'Zabawki do odgrywania ról', description: 'Lalka interaktywna, drewniane łóżeczko dla lalki, naczynia, zabawkowe warzywa i owoce oraz kasa fiskalna.', icon: 'heart', priority: true, amount: null, status: 'potrzebne' },
    { id: 's7', place: 'szpital', group: 'Do rozważenia', title: 'Dodatkowe wyposażenie chirurgii', description: 'Pojemniki na zabawki, konsola do gier lub fotel rozkładany — po ponownym potwierdzeniu potrzeb i parametrów.', icon: 'monitor', priority: false, amount: null, status: 'do-uzgodnienia' }
  ]
};
