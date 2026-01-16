import { EmotionCard } from './types';

export const CARD_BACK_URL = ""; 

const RAW_EMOTIONS = [
  { id: 'e1', name: 'Bezsilność', description: 'Osoba próbująca przepchnąć ogromny, nieruchomy głaz w gęstej, szarej mgle. Styl akwarelowy.', question: 'Gdzie w swoim życiu próbujesz poruszyć coś, co na ten moment jest nieruchome?' },
  { id: 'e2', name: 'Ból', description: 'Roztrzaskane szklane serce, czerwone i czarne ostre odłamki na ciemnym tle. Styl akwarelowy.', question: 'Gdyby ten ból miał być Twoim przewodnikiem, o jakiej niezagojonej ranie chce Ci opowiedzieć?' },
  { id: 'e3', name: 'Chęć odwetu', description: 'Bumerang lecący w środku burzy, błyskawice, krwawe niebo. Styl akwarelowy.', question: 'Co tak naprawdę próbujesz odzyskać, myśląc o wyrównaniu rachunków?' },
  { id: 'e4', name: 'Ciekawość', description: 'Dziecko zaglądające przez dziurkę od klucza do świecącego, magicznego ogrodu. Styl akwarelowy.', question: 'Gdybyś na chwilę odłożyła/odłożył lęk przed oceną, za czym podążyłoby Twoje serce?' },
  { id: 'e5', name: 'Duma', description: 'Lew stojący na szczycie góry, patrzący na zachód słońca. Styl akwarelowy.', question: 'Która Twoja wartość została właśnie nakarmiona tym sukcesem?' },
  { id: 'e6', name: 'Ekstaza', description: 'Eksplozja złotego światła i gwiazd, sylwetka tańcząca w blasku. Styl akwarelowy.', question: 'Jak możesz zaprosić więcej tej intensywnej obecności do swojej codzienności?' },
  { id: 'e7', name: 'Gniew', description: 'Wybuchający wulkan, płynąca lawa, ciemny dym, czerwona poświata. Styl akwarelowy.', question: 'Jakiej granicy, która jest dla Ciebie święta, nie pozwalasz już nikomu przekraczać?' },
  { id: 'e8', name: 'Lekceważenie', description: 'Osoba odchodząca, odwrócona plecami do kogoś wyciągającego rękę. Styl akwarelowy.', question: 'Czyją ważność próbujesz pomniejszyć, by nie poczuć własnego zranienia?' },
  { id: 'e9', name: 'Miłość', description: 'Dwa drzewa ze splątanymi korzeniami, świecące ciepłym światłem. Styl akwarelowy.', question: 'Co w Tobie jest tak piękne, że zasługuje na całkowitą, bezwarunkową akceptację?' },
  { id: 'e10', name: 'Nadzieja', description: 'Pojedynczy zielony pęd przebijający się przez popękany beton, promień słońca. Styl akwarelowy.', question: 'Co jest tym najmniejszym, ledwo widocznym sygnałem, że zmiana jest możliwa?' },
  { id: 'e11', name: 'Napięcie', description: 'Linioskoczek balansujący nad przepaścią, mocno napięta lina. Styl akwarelowy.', question: 'Pomiędzy jakimi dwiema siłami w sobie jesteś teraz rozpięta/rozpięty?' },
  { id: 'e12', name: 'Niechęć', description: 'Osoba odpychająca talerz z jedzeniem, odwracająca głowę. Styl akwarelowy.', question: 'Co w Twoim życiu stało się dla Ciebie "niestrawne" lub szkodliwe?' },
  { id: 'e13', name: 'Nienawiść', description: 'Czarny ogień trawiący las, mroczne czerwone oczy w mroku. Styl akwarelowy.', question: 'Jaką głęboką miłość do siebie lub swoich wartości chronisz pod tym czarnym pancerzem?' },
  { id: 'e14', name: 'Niepewność', description: 'Osoba stojąca na rozdrożu w gęstej mgle. Styl akwarelowy.', question: 'Czego potrzebujesz od siebie, by zaufać, że każdy krok jest właściwy?' },
  { id: 'e15', name: 'Niezadowolenie', description: 'Szare chmury nad piknikiem, skrzyżowane ramiona. Styl akwarelowy.', question: 'O jakim niespełnionym pragnieniu krzyczy Twój dzisiejszy brak satysfakcji?' },
  { id: 'e16', name: 'Nuda', description: 'Zegary topniejące jak u Dalego, szary pokój, puste krzesło. Styl akwarelowy.', question: 'Przed jakimi ważnymi pytaniami uciekasz w ten stan odrętwienia?' },
  { id: 'e17', name: 'Obawa', description: 'Cień majaczący nad małym domem, ciemnoniebieskie tony. Styl akwarelowy.', question: 'Jaką historię o przyszłości opowiada Ci teraz Twoja wyobraźnia?' },
  { id: 'e18', name: 'Obojętność', description: 'Twarz wykonana z kamienia, powierzchnia zamarzniętego jeziora. Styl akwarelowy.', question: 'Co musiało się wydarzyć, że bezpieczniej jest dla Ciebie nic nie czuć?' },
  { id: 'e19', name: 'Oczekiwanie', description: 'Osoba siedząca na ławce patrząca na zegarek, pusta droga. Styl akwarelowy.', question: 'Gdyby to, na co czekasz, nigdy nie nadeszło – co byś dzisiaj zrobił/a?' },
  { id: 'e20', name: 'Osamotnienie', description: 'Pojedyncza latarnia morska na ogromnym, ciemnym oceanie. Styl akwarelowy.', question: 'Jaką wiadomość do samej/samego siebie słyszysz w tej ciszy?' },
  { id: 'e21', name: 'Poczucie akceptacji', description: 'Otwarte dłonie trzymające wodę, ciepła miękka poświata. Styl akwarelowy.', question: 'Co w sobie przestałaś/przestałeś właśnie oceniać jako "złe"?' },
  { id: 'e22', name: 'Poczucie bliskości', description: 'Dwa czoła stykające się, zamknięte oczy, miękkie światło. Styl akwarelowy.', question: 'Z kim czujesz się tak bezpiecznie, że Twoje ciało może całkowicie odpuścić?' },
  { id: 'e23', name: 'Podniecenie', description: 'Lecące iskry, elektryczność, żywe fiolety i róże. Styl akwarelowy.', question: 'O jakim nowym kierunku w życiu informuje Cię ten przypływ energii?' },
  { id: 'e24', name: 'Podziw', description: 'Osoba patrząca w górę na gigantyczne rozgwieżdżone niebo. Styl akwarelowy.', question: 'Która cecha tej osoby/zjawiska drzemie w Tobie i czeka na przebudzenie?' },
  { id: 'e25', name: 'Pogarda', description: 'Patrzenie w dół z wysokiego tronu, zimne lodowate spojzenie. Styl akwarelowy.', question: 'Jaką własną słabość próbujesz ukryć, patrząc na innych z góry?' },
  { id: 'e26', name: 'Pożądanie', description: 'Czerwone jabłko, ogień, sięgająca dłoń, intensywne kolory. Styl akwarelowy.', question: 'Czego pragniesz tak mocno, że boisz się do tego przyznać nawet sobie?' },
  { id: 'e27', name: 'Przerażenie', description: 'Szeroko otwarte oczy w ciemności, sylwetka krzyczącej twarzy. Styl akwarelowy.', question: 'Która część Twojej tożsamości czuje się teraz śmiertelnie zagrożona?' },
  { id: 'e28', name: 'Przygnębienie', description: 'Ciężka deszczowa chmura nad głową, niesienie ciężkiego worka. Styl akwarelowy.', question: 'Czyje oczekiwania dźwigasz na plecach, myśląc że są Twoje?' },
  { id: 'e29', name: 'Radość', description: 'Kolorowe balony lecące w błękitne niebo, jasne słońce. Styl akwarelowy.', question: 'Co w tej chwili pozwala Ci poczuć, że życie jest po Twojej stronie?' },
  { id: 'e30', name: 'Rezygnacja', description: 'Upuszczenie miecza, siadanie na ziemi, zmierzch. Styl akwarelowy.', question: 'Czy to, co odpuszczasz, faktycznie przestało być dla Ciebie ważne?' },
  { id: 'e31', name: 'Rozczarowanie', description: 'Puste pudełko po prezencie, pęknięty balon, szare kolory. Styl akwarelowy.', question: 'Jaką idealną wizję rzeczywistości musisz pożegnać, by zobaczyć prawdę?' },
  { id: 'e32', name: 'Rozkosz', description: 'Smakowanie miodu, miękki jedwab, zamknięte oczy. Styl akwarelowy.', question: 'Kiedy ostatnio pozwoliłeś/aś swojemu ciału być jedynym przewodnikiem?' },
  { id: 'e33', name: 'Rozpacz', description: 'Osoba na kolanach płacząca w dłonie, ciemna pustka. Styl akwarelowy.', question: 'O jaką utraconą część siebie opłakujesz w tej chwili?' },
  { id: 'e34', name: 'Satysfakcja', description: 'Wkładanie ostatniego elementu układanki, zachód słońca ze szczytu. Styl akwarelowy.', question: 'Który etap Twojej drogi zakończył się właśnie sukcesem w Twoich oczach?' },
  { id: 'e35', name: 'Skrucha', description: 'Skłoniona głowa, ofiarowanie kwiatu, miękkie światło. Styl akwarelowy.', question: 'Której części siebie winna/winien jesteś szczere "przepraszam"?' },
  { id: 'e36', name: 'Smutek', description: 'Niebieski deszcz za oknem, spadająca łza. Styl akwarelowy.', question: 'Co tak cennego straciłaś/straciłeś, że Twój smutek chce to uhonorować?' },
  { id: 'e37', name: 'Spokój', description: 'Nieruchome jezioro odbijające góry, medytująca postać. Styl akwarelowy.', question: 'Gdzie w Twoim ciele mieszka ta cisza, do której zawsze możesz wrócić?' },
  { id: 'e38', name: 'Strach', description: 'Chowanie się pod kocem, cień potwora na ścianie. Styl akwarelowy.', question: 'Gdyby ten strach miał głos, przed czym tak naprawdę chce Cię ostrzec?' },
  { id: 'e39', name: 'Szczęście', description: 'Pole słoneczników, jasne żółte słońce, uśmiechnięta twarz. Styl akwarelowy.', question: 'Jaką małą rzecz możesz zrobić dzisiaj, by przedłużyć ten stan o minutę?' },
  { id: 'e40', name: 'Tęsknota', description: 'Patrzenie na stare zdjęcie, puste krzesło, horyzont. Styl akwarelowy.', question: 'Gdyby ta tęsknota była kompasem, w którą stronę świata by Cię prowadziła?' },
  { id: 'e41', name: 'Triumf', description: 'Trzymanie pucharu wysoko, sylwetki wiwatującego tłumu. Styl akwarelowy.', question: 'Jakie wewnętrzne zwycięstwo nad własnym lękiem właśnie odniosłaś/eś?' },
  { id: 'e42', name: 'Ulga', description: 'Zrzucenie ciężkiego plecaka, branie głębokiego oddechu. Styl akwarelowy.', question: 'Co wreszcie przestało być Twoją odpowiedzialnością?' },
  { id: 'e43', name: 'Wdzięczność', description: 'Dłonie trzymające świecące serce, kosz obfitości. Styl akwarelowy.', question: 'Za co dziękujesz sobie, patrząc na to, co udało Ci się przetrwać?' },
  { id: 'e44', name: 'Współczucie', description: 'Osoba okrywająca drugą kocem, ciepła poświata. Styl akwarelowy.', question: 'Jaką czułą myśl skierowałbyś do siebie, gdybyś był/a własnym dzieckiem?' },
  { id: 'e45', name: 'Wstręt', description: 'Zielony szlam, osoba zasłaniająca nos, gnijący owoc. Styl akwarelowy.', question: 'Jakie zachowanie lub sytuacja zatruwa Twoją autentyczność?' },
  { id: 'e46', name: 'Wstyd', description: 'Twarz chowana za maską, reflektor na małą postać. Styl akwarelowy.', question: 'Co takiego w Tobie uważasz za "niegodne miłości", choć nim nie jest?' },
  { id: 'e47', name: 'Wściekłość', description: 'Czerwone błyskawice, tłuczone szkło, szarżujący byk. Styl akwarelowy.', question: 'Jaką ogromną niesprawiedliwość próbuje wykrzyczeć to Twoje ciało?' },
  { id: 'e48', name: 'Zachwyt', description: 'Tęcza nad wodospadem, szeroko otwarte oczy. Styl akwarelowy.', question: 'Gdzie w tej chwili dostrzegasz piękno, którego wcześniej nie widziałeś/aś?' },
  { id: 'e49', name: 'Zaufanie', description: 'Padanie do tyłu w ramiona, opaska na oczach, most. Styl akwarelowy.', question: 'W czym pokładasz wiarę, gdy tracisz logiczne argumenty?' },
  { id: 'e50', name: 'Zawiść', description: 'Wąż z zielonymi oczami patrzący na złoto. Styl akwarelowy.', question: 'Jaką Twoją nieujawnioną potrzebę pokazuje Ci sukces kogoś innego?' },
  { id: 'e51', name: 'Zazdrość', description: 'Dwie osoby trzymające się za ręce, trzecia patrząca z cienia. Styl akwarelowy.', question: 'Jakiej utraty boisz się tak bardzo, że próbujesz kontrolować innych?' },
  { id: 'e52', name: 'Zażenowanie', description: 'Policzki robiące się czerwone, upuszczone dokumenty. Styl akwarelowy.', question: 'Dlaczego Twoja naturalna niedoskonałość wydaje Ci się dzisiaj błędem?' },
  { id: 'e53', name: 'Zgoda', description: 'Uścisk dłoni, biała flaga, wschód słońca. Styl akwarelowy.', question: 'Jaką walkę z rzeczywistością właśnie zdecydowałaś/eś się zakończyć?' },
  { id: 'e54', name: 'Złość', description: 'Zaciśnięta pięść, czerwona aura, para. Styl akwarelowy.', question: 'Który Twój standard został naruszony i wymaga teraz jasnego głosu?' },
  { id: 'e55', name: 'Żal', description: 'Zwiędły kwiat, szary deszcz, załzawione oko. Styl akwarelowy.', question: 'Gdybyś mógł/mogła wrócić do tamtej chwili, co Twoje dzisiejsze "Ja" powiedziałoby tamtemu "Ja"?' },
];

export const EMOTION_DECK: EmotionCard[] = RAW_EMOTIONS.map((e) => ({
  ...e,
  imageUrl: '' 
}));

export const PREDEFINED_DECKS = [
  {
    id: 'deck-full',
    name: 'Pełna Talia Emocji',
    description: 'Kompletny zestaw 55 kart emocji z pytaniami do pracy terapeutycznej.',
    cards: EMOTION_DECK,
    isCustom: false,
  }
];