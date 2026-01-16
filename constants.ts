import { EmotionCard } from './types';

export const CARD_BACK_URL = ""; 

const RAW_EMOTIONS = [
  { id: 'e1', name: 'Bezsilność', description: 'Osoba próbująca przepchnąć ogromny, nieruchomy głaz w gęstej, szarej mgle. Styl akwarelowy.', question: 'W jakich sytuacjach czujesz, że tracisz wpływ na bieg zdarzeń?' },
  { id: 'e2', name: 'Ból', description: 'Roztrzaskane szklane serce, czerwone i czarne ostre odłamki na ciemnym tle. Styl akwarelowy.', question: 'Gdzie w swoim ciele czujesz ten ból i jaki ma on kształt?' },
  { id: 'e3', name: 'Chęć odwetu', description: 'Bumerang lecący w środku burzy, błyskawice, krwawe niebo. Styl akwarelowy.', question: 'Co tak naprawdę chciałabyś/chciałbyś odzyskać, myśląc o odwecie?' },
  { id: 'e4', name: 'Ciekawość', description: 'Dziecko zaglądające przez dziurkę od klucza do świecącego, magicznego ogrodu. Styl akwarelowy.', question: 'Co nowego chciałabyś/chciałbyś odkryć w sobie lub w otaczającym świecie?' },
  { id: 'e5', name: 'Duma', description: 'Lew stojący na szczycie góry, patrzący na zachód słońca. Styl akwarelowy.', question: 'Z czego jesteś najbardziej dumna/dumny w swoim życiu?' },
  { id: 'e6', name: 'Ekstaza', description: 'Eksplozja złotego światła i gwiazd, sylwetka tańcząca w blasku. Styl akwarelowy.', question: 'Kiedy ostatnio czułaś/czułeś, że czas przestaje istnieć ze szczęścia?' },
  { id: 'e7', name: 'Gniew', description: 'Wybuchający wulkan, płynąca lawa, ciemny dym, czerwona poświata. Styl akwarelowy.', question: 'Jakie granice zostały naruszone, że czujesz ten gniew?' },
  { id: 'e8', name: 'Lekceważenie', description: 'Osoba odchodząca, odwrócona plecami do kogoś wyciągającego rękę. Styl akwarelowy.', question: 'Co czujesz, gdy Twoje potrzeby nie są zauważane?' },
  { id: 'e9', name: 'Miłość', description: 'Dwa drzewa ze splątanymi korzeniami, świecące ciepłym światłem. Styl akwarelowy.', question: 'W jaki sposób okazujesz miłość sobie?' },
  { id: 'e10', name: 'Nadzieja', description: 'Pojedynczy zielony pęd przebijający się przez popękany beton, promień słońca. Styl akwarelowy.', question: 'Co jest dziś tym promykiem światła w Twojej sytuacji?' },
  { id: 'e11', name: 'Napięcie', description: 'Linioskoczek balansujący nad przepaścią, mocno napięta lina. Styl akwarelowy.', question: 'W jakich sytuacjach Twoje napięcie najbardziej się nasila?' },
  { id: 'e12', name: 'Niechęć', description: 'Osoba odpychająca talerz z jedzeniem, odwracająca głowę. Styl akwarelowy.', question: 'Od czego próbujesz się odsunąć lub uciec?' },
  { id: 'e13', name: 'Nienawiść', description: 'Czarny ogień trawiący las, mroczne czerwone oczy w mroku. Styl akwarelowy.', question: 'Co próbujesz ochronić, gdy pojawia się ta nienawiść?' },
  { id: 'e14', name: 'Niepewność', description: 'Osoba stojąca na rozdrożu w gęstej mgle. Styl akwarelowy.', question: 'Czego potrzebujesz, aby postawić pierwszy krok w nieznanym?' },
  { id: 'e15', name: 'Niezadowolenie', description: 'Szare chmury nad piknikiem, skrzyżowane ramiona. Styl akwarelowy.', question: 'Co musiałoby się zmienić, abyś poczuła/poczuł większą satysfakcję?' },
  { id: 'e16', name: 'Nuda', description: 'Zegary topniejące jak u Dalego, szary pokój, puste krzesło. Styl akwarelowy.', question: 'O czym informuje Cię brak zaangażowania w tę chwilę?' },
  { id: 'e17', name: 'Obawa', description: 'Cień majaczący nad małym domem, ciemnoniebieskie tony. Styl akwarelowy.', question: 'Jaki najgorszy scenariusz tworzy dziś Twoja wyobraźnia?' },
  { id: 'e18', name: 'Obojętność', description: 'Twarz wykonana z kamienia, powierzchnia zamarzniętego jeziora. Styl akwarelowy.', question: 'Przed czym zamykasz się, żeby nie czuć zbyt wiele?' },
  { id: 'e19', name: 'Oczekiwanie', description: 'Osoba siedząca na ławce patrząca na zegarek, pusta droga. Styl akwarelowy.', question: 'Na co tak naprawdę czekasz w swoim życiu?' },
  { id: 'e20', name: 'Osamotnienie', description: 'Pojedyncza latarnia morska na ogromnym, ciemnym oceanie. Styl akwarelowy.', question: 'Jak możesz być dla siebie najlepszym towarzyszem?' },
  { id: 'e21', name: 'Poczucie akceptacji', description: 'Otwarte dłonie trzymające wodę, ciepła miękka poświata. Styl akwarelowy.', question: 'Co w sobie najtrudniej Ci zaakceptować?' },
  { id: 'e22', name: 'Poczucie bliskości', description: 'Dwa czoła stykające się, zamknięte oczy, miękkie światło. Styl akwarelowy.', question: 'Z kim czujesz się naprawdę bezpiecznie i dlaczego?' },
  { id: 'e23', name: 'Podniecenie', description: 'Lecące iskry, elektryczność, żywe fiolety i róże. Styl akwarelowy.', question: 'Co budzi w Tobie największą pasję i energię?' },
  { id: 'e24', name: 'Podziw', description: 'Osoba patrząca w górę na gigantyczne rozgwieżdżone niebo. Styl akwarelowy.', question: 'Kogo podziwiasz i jaką cechę chciałabyś/chciałbyś w sobie rozwinąć?' },
  { id: 'e25', name: 'Pogarda', description: 'Patrzenie w dół z wysokiego tronu, zimne lodowate spojrzenie. Styl akwarelowy.', question: 'Kogo lub co stawiasz dziś niżej od siebie — i dlaczego?' },
  { id: 'e26', name: 'Pożądanie', description: 'Czerwone jabłko, ogień, sięgająca dłoń, intensywne kolory. Styl akwarelowy.', question: 'Czego pragniesz tak mocno, że trudno Ci o tym myśleć spokojnie?' },
  { id: 'e27', name: 'Przerażenie', description: 'Szeroko otwarte oczy w ciemności, sylwetka krzyczącej twarzy. Styl akwarelowy.', question: 'Czego unikasz, bo czujesz, że mogłoby zmienić zbyt wiele?' },
  { id: 'e28', name: 'Przygnębienie', description: 'Ciężka deszczowa chmura nad głową, niesienie ciężkiego worka. Styl akwarelowy.', question: 'Co sprawia, że czujesz dziś taki ciężar na barkach?' },
  { id: 'e29', name: 'Radość', description: 'Kolorowe balony lecące w błękitne niebo, jasne słońce. Styl akwarelowy.', question: 'Co w ostatnim czasie przywróciło Ci choć odrobinę lekkości?' },
  { id: 'e30', name: 'Rezygnacja', description: 'Upuszczenie miecza, siadanie na ziemi, zmierzch. Styl akwarelowy.', question: 'Z czego zrezygnowałaś/-eś — i czy ta decyzja nadal jest aktualna?' },
  { id: 'e31', name: 'Rozczarowanie', description: 'Puste pudełko po prezencie, pęknięty balon, szare kolory. Styl akwarelowy.', question: 'Jakie oczekiwania nie zostały spełnione?' },
  { id: 'e32', name: 'Rozkosz', description: 'Smakowanie miodu, miękki jedwab, zamknięte oczy. Styl akwarelowy.', question: 'Kiedy ostatnio pozwoliłaś/-eś sobie na czystą przyjemność?' },
  { id: 'e33', name: 'Rozpacz', description: 'Osoba na kolanach płacząca w dłonie, ciemna pustka. Styl akwarelowy.', question: 'Jaką stratę wciąż w sobie nosisz i jak wpływa ona na Twoje dziś?' },
  { id: 'e34', name: 'Satysfakcja', description: 'Wkładanie ostatniego elementu układanki, zachód słońca ze szczytu. Styl akwarelowy.', question: 'Co domknęło się w Twoim życiu i dało Ci poczucie satysfakcji?' },
  { id: 'e35', name: 'Skrucha', description: 'Skłoniona głowa, ofiarowanie kwiatu, miękkie światło. Styl akwarelowy.', question: 'Za co chciałabyś/chciałbyś przeprosić siebie lub innych?' },
  { id: 'e36', name: 'Smutek', description: 'Niebieski deszcz za oknem, spadająca łza. Styl akwarelowy.', question: 'O czym opowiada Twój smutek?' },
  { id: 'e37', name: 'Spokój', description: 'Nieruchome jezioro odbijające góry, medytująca postać. Styl akwarelowy.', question: 'Gdzie jest Twoje miejsce, w którym czujesz spokój?' },
  { id: 'e38', name: 'Strach', description: 'Chowanie się pod kocem, cień potwora na ścianie. Styl akwarelowy.', question: 'Przed czym uciekasz w codziennym życiu?' },
  { id: 'e39', name: 'Szczęście', description: 'Pole słoneczników, jasne żółte słońce, uśmiechnięta twarz. Styl akwarelowy.', question: 'Czego dziś najbardziej potrzebuje Twoje poczucie szczęścia?' },
  { id: 'e40', name: 'Tęsknota', description: 'Patrzenie na stare zdjęcie, puste krzesło, horyzont. Styl akwarelowy.', question: 'Za kim lub za czym tęskni dziś Twoje serce?' },
  { id: 'e41', name: 'Triumf', description: 'Trzymanie pucharu wysoko, sylwetki wiwatującego tłumu. Styl akwarelowy.', question: 'Jakie zwycięstwo nad sobą masz za sobą?' },
  { id: 'e42', name: 'Ulga', description: 'Zrzucenie ciężkiego plecaka, branie głębokiego oddechu. Styl akwarelowy.', question: 'Co dziś obciąża Cię bardziej, niż naprawdę powinno?' },
  { id: 'e43', name: 'Wdzięczność', description: 'Dłonie trzymające świecące serce, kosz obfitości. Styl akwarelowy.', question: 'Za co jesteś wdzięczna/wdzięczny, mimo trudności?' },
  { id: 'e44', name: 'Współczucie', description: 'Osoba okrywająca drugą kocem, ciepła poświata. Styl akwarelowy.', question: 'Dla kogo masz dziś w sobie najwięcej czułości?' },
  { id: 'e45', name: 'Wstręt', description: 'Zielony szlam, osoba zasłaniająca nos, gnijący owoc. Styl akwarelowy.', question: 'Co w Twoim życiu jest dla Ciebie dziś ‘niestrawne’?' },
  { id: 'e46', name: 'Wstyd', description: 'Twarz chowana za maską, reflektor na małą postać. Styl akwarelowy.', question: 'Jaką część siebie próbujesz ukryć przed światem?' },
  { id: 'e47', name: 'Wściekłość', description: 'Czerwone błyskawice, tłuczone szkło, szarżujący byk. Styl akwarelowy.', question: 'Co sprawia, że tracisz panowanie nad sobą?' },
  { id: 'e48', name: 'Zachwyt', description: 'Tęcza nad wodospadem, szeroko otwarte oczy. Styl akwarelowy.', question: 'Co ostatnio poruszyło Cię swoim pięknem?' },
  { id: 'e49', name: 'Zaufanie', description: 'Padanie do tyłu w ramiona, opaska na oczach, most. Styl akwarelowy.', question: 'Komu lub czemu dziś najłatwiej jest Ci zaufać?' },
  { id: 'e50', name: 'Zawiść', description: 'Wąż z zielonymi oczami patrzący na złoto. Styl akwarelowy.', question: 'Czego zazdrościsz innym — a czego sobie nie dajesz?' },
  { id: 'e51', name: 'Zazdrość', description: 'Dwie osoby trzymające się za ręce, trzecia patrząca z cienia. Styl akwarelowy.', question: 'W jakiej relacji pojawia się lęk przed utratą lub zastąpieniem?' },
  { id: 'e52', name: 'Zażenowanie', description: 'Policzki robiące się czerwone, upuszczone dokumenty. Styl akwarelowy.', question: 'W jakich sytuacjach czujesz się najbardziej nieswojo?' },
  { id: 'e53', name: 'Zgoda', description: 'Uścisk dłoni, biała flaga, wschód słońca. Styl akwarelowy.', question: 'Na co wreszcie się zgodziłaś/-eś, kończąc wewnętrzną walkę?' },
  { id: 'e54', name: 'Złość', description: 'Zaciśnięta pięść, czerwona aura, para. Styl akwarelowy.', question: 'Co w zachowaniu innych ludzi najbardziej Cię złości?' },
  { id: 'e55', name: 'Żal', description: 'Zwiędły kwiat, szary deszcz, załzawione oko. Styl akwarelowy.', question: 'Czego nie zrobiłaś/-eś, a dziś czujesz z tego powodu żal?' },
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