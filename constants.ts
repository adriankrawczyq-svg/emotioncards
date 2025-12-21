import { Deck, EmotionCard } from './types';

const generateUrl = (prompt: string, seed: number) => 
  `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=400&height=600&nologo=true&seed=${seed}&model=flux`;

const getPrompt = (emotion: string, description: string) => 
  `A deeply emotional and metaphorical watercolor painting representing '${emotion}'. Visual context: ${description}. Ethereal style, soft bleeding colors, expressive brushstrokes, dreamlike atmosphere, psychological depth, masterpiece, artistic, wet-on-wet technique, high quality art.`;

// Generates a card back matching the user's reference: Red heart/clover pattern on dark green
export const CARD_BACK_URL = generateUrl(
  "symmetrical ornamental pattern of red heart-shaped clover leaves with intertwining vines on a dark green grunge texture background, vintage playing card back design, highly detailed, masterpiece, 2d vector art, art nouveau style", 
  555
);

const RAW_EMOTIONS = [
  { id: 'e1', name: 'Bezsilność', description: 'Small person pushing a giant immovable boulder, grey fog', question: 'W jakich sytuacjach czujesz, że tracisz wpływ na bieg zdarzeń?' },
  { id: 'e2', name: 'Ból', description: 'Shattered glass heart, red and black sharp shards', question: 'Gdzie w swoim ciele czujesz ten ból i jaki ma on kształt?' },
  { id: 'e3', name: 'Chęć odwetu', description: 'Boomerang flying in a storm, lightning, red sky', question: 'Co tak naprawdę chciałbyś odzyskać, myśląc o odwecie?' },
  { id: 'e4', name: 'Ciekawość', description: 'Child looking through a keyhole into a glowing magical garden', question: 'Co nowego chciałbyś odkryć w sobie lub w otaczającym świecie?' },
  { id: 'e5', name: 'Duma', description: 'Lion standing on a mountain peak looking at sunset', question: 'Z czego jesteś najbardziej dumny w swoim życiu?' },
  { id: 'e6', name: 'Ekstaza', description: 'Explosion of golden light and stars, silhouette dancing', question: 'Kiedy ostatnio czułeś, że czas przestaje istnieć ze szczęścia?' },
  { id: 'e7', name: 'Gniew', description: 'Volcano erupting, lava flowing, dark smoke', question: 'Jakie granice zostały naruszone, że czujesz ten gniew?' },
  { id: 'e8', name: 'Lekceważenie', description: 'Person walking away turning back on someone reaching out', question: 'Co czujesz, gdy Twoje potrzeby nie są zauważane?' },
  { id: 'e9', name: 'Miłość', description: 'Two trees with roots intertwined glowing warm light', question: 'W jaki sposób okazujesz miłość sobie samemu?' },
  { id: 'e10', name: 'Nadzieja', description: 'Single green sprout growing through cracked concrete, ray of light', question: 'Co jest tym promykiem światła w Twojej obecnej sytuacji?' },
  { id: 'e11', name: 'Napięcie', description: 'Tightrope walker balancing over a canyon, stretched rope', question: 'Co sprawia, że czujesz się jak naciągnięta struna?' },
  { id: 'e12', name: 'Niechęć', description: 'Person pushing away a plate of food, turning head away', question: 'Od czego próbujesz się odsunąć lub uciec?' },
  { id: 'e13', name: 'Nienawiść', description: 'Black fire consuming a forest, dark red eyes', question: 'Co ta nienawiść próbuje ochronić w Tobie?' },
  { id: 'e14', name: 'Niepewność', description: 'Person standing at a crossroads in thick fog', question: 'Czego potrzebujesz, aby postawić pierwszy krok w mgle?' },
  { id: 'e15', name: 'Niezadowolenie', description: 'Grey clouds over a picnic, crossed arms', question: 'Co musiałoby się zmienić, abyś poczuł satysfakcję?' },
  { id: 'e16', name: 'Nuda', description: 'Clock melting like Dali, grey room, empty chair', question: 'O czym informuje Cię brak zaangażowania w tę chwilę?' },
  { id: 'e17', name: 'Obawa', description: 'Shadow looming over a small house, dark blue tones', question: 'Jaki najgorszy scenariusz tworzy Twoja wyobraźnia?' },
  { id: 'e18', name: 'Obojętność', description: 'Face made of stone, frozen lake surface', question: 'Na co zamknąłeś się, aby nie czuć bólu?' },
  { id: 'e19', name: 'Oczekiwanie', description: 'Person sitting on a bench looking at a watch, empty road', question: 'Na co tak naprawdę czekasz w swoim życiu?' },
  { id: 'e20', name: 'Osamotnienie', description: 'Single lighthouse in a dark vast ocean', question: 'Jak możesz być dla siebie najlepszym towarzyszem?' },
  { id: 'e21', name: 'Poczucie akceptacji', description: 'Open hands holding water, warm soft glow', question: 'Co w sobie najtrudniej Ci zaakceptować?' },
  { id: 'e22', name: 'Poczucie bliskości', description: 'Two foreheads touching, closing eyes, soft light', question: 'Z kim czujesz się w pełni bezpiecznie i dlaczego?' },
  { id: 'e23', name: 'Podniecenie', description: 'Sparks flying, electricity, vibrant purple and pink', question: 'Co budzi w Tobie największą pasję i energię?' },
  { id: 'e24', name: 'Podziw', description: 'Person looking up at a giant starry sky or cathedral', question: 'Kogo podziwiasz i jaką cechę chciałbyś od niego przejąć?' },
  { id: 'e25', name: 'Pogarda', description: 'Looking down from a high throne, cold icy stare', question: 'Kogo lub co stawiasz niżej od siebie i dlaczego?' },
  { id: 'e26', name: 'Pożądanie', description: 'Red apple, fire, reaching hand, intense colors', question: 'Czego pragniesz tak mocno, że trudno Ci o tym myśleć spokojnie?' },
  { id: 'e27', name: 'Przerażenie', description: 'Wide eyes in darkness, screaming face silhouette', question: 'Czego boisz się tak bardzo, że paraliżuje to Twoje działanie?' },
  { id: 'e28', name: 'Przygnębienie', description: 'Heavy rain cloud over a head, carrying a heavy sack', question: 'Co sprawia, że czujesz taki ciężar na barkach?' },
  { id: 'e29', name: 'Radość', description: 'Colorful balloons flying into blue sky, sun', question: 'Jaka mała rzecz sprawiła Ci dzisiaj radość?' },
  { id: 'e30', name: 'Rezygnacja', description: 'Dropping a sword, sitting down on the ground, dusk', question: 'Z czego zrezygnowałeś, choć było to dla Ciebie ważne?' },
  { id: 'e31', name: 'Rozczarowanie', description: 'Empty gift box, deflated balloon, grey colors', question: 'Jakie oczekiwania nie zostały spełnione?' },
  { id: 'e32', name: 'Rozkosz', description: 'Tasting honey, soft silk, closing eyes, warm colors', question: 'Kiedy ostatnio pozwoliłeś sobie na czystą przyjemność?' },
  { id: 'e33', name: 'Rozpacz', description: 'Person on knees crying into hands, dark void', question: 'Co straciłeś bezpowrotnie i jak przeżywasz tę stratę?' },
  { id: 'e34', name: 'Satysfakcja', description: 'Putting the last piece of a puzzle, sunset view from summit', question: 'Co udało Ci się ostatnio zakończyć z sukcesem?' },
  { id: 'e35', name: 'Skrucha', description: 'Bowing head, offering a flower, soft light', question: 'Za co chciałbyś przeprosić siebie lub innych?' },
  { id: 'e36', name: 'Smutek', description: 'Blue rain against a window, tear drop', question: 'O czym opowiada Twój smutek?' },
  { id: 'e37', name: 'Spokój', description: 'Still lake reflecting mountains, meditating figure', question: 'Gdzie jest Twoje bezpieczne miejsce, w którym znajdujesz spokój?' },
  { id: 'e38', name: 'Strach', description: 'Hiding under a blanket, monster shadow on wall', question: 'Przed czym uciekasz w codziennym życiu?' },
  { id: 'e39', name: 'Szczęście', description: 'Field of sunflowers, bright yellow sun, smiling face', question: 'Jak definiujesz szczęście w tym momencie swojego życia?' },
  { id: 'e40', name: 'Tęsknota', description: 'Looking at old photo, empty chair, horizon', question: 'Za kim lub za czym tęskni Twoje serce?' },
  { id: 'e41', name: 'Triumf', description: 'Holding a trophy cup high, cheering crowd silhouette', question: 'Jakie zwycięstwo nad samym sobą odniosłeś?' },
  { id: 'e42', name: 'Ulga', description: 'Dropping a heavy backpack, taking a deep breath', question: 'Co musiałoby się stać, abyś poczuł ulgę?' },
  { id: 'e43', name: 'Wdzięczność', description: 'Hands holding a glowing heart, harvest basket', question: 'Za co jesteś wdzięczny, mimo trudności?' },
  { id: 'e44', name: 'Współczucie', description: 'Person covering another with a blanket, warm glow', question: 'Dla kogo w swoim otoczeniu masz najwięcej serca?' },
  { id: 'e45', name: 'Wstręt', description: 'Green slime, person covering nose, rotting fruit', question: 'Co w Twoim życiu jest dla Ciebie "niestrawne"?' },
  { id: 'e46', name: 'Wstyd', description: 'Face hiding behind a mask, spotlight on small figure', question: 'Jaką część siebie próbujesz ukryć przed światem?' },
  { id: 'e47', name: 'Wściekłość', description: 'Red lightning, smashing glass, bull charging', question: 'Co sprawia, że tracisz panowanie nad sobą?' },
  { id: 'e48', name: 'Zachwyt', description: 'Rainbow over waterfall, wide open eyes', question: 'Co ostatnio wprawiło Cię w osłupienie swoim pięknem?' },
  { id: 'e49', name: 'Zaufanie', description: 'Falling backwards into arms, blindfold, bridge', question: 'Komu ufasz bezgranicznie?' },
  { id: 'e50', name: 'Zawiść', description: 'Snake with green eyes looking at gold', question: 'Czego zazdrościsz innym, a czego sam sobie nie dajesz?' },
  { id: 'e51', name: 'Zazdrość', description: 'Two people holding hands, third person watching from shadows', question: 'O kogo lub o co boisz się utracić wyłączność?' },
  { id: 'e52', name: 'Zażenowanie', description: 'Cheeks turning red, dropping papers, looking down', question: 'W jakich sytuacjach czujesz się nieswojo?' },
  { id: 'e53', name: 'Zgoda', description: 'Shaking hands, white flag, sunrise', question: 'Na co wreszcie się zgodziłeś, kończąc walkę?' },
  { id: 'e54', name: 'Złość', description: 'Clenched fist, red aura, steam', question: 'Co Cię złości w zachowaniu innych ludzi?' },
  { id: 'e55', name: 'Żal', description: 'Wilted flower, grey rain, tearful eye', question: 'Czego nie zrobiłeś, a teraz tego żałujesz?' },
];

const ALL_EMOTIONS: EmotionCard[] = RAW_EMOTIONS.map((e, idx) => ({
  ...e,
  imageUrl: generateUrl(getPrompt(e.name, e.description), 101 + idx)
}));

export const PREDEFINED_DECKS: Deck[] = [
  {
    id: 'deck-full',
    name: 'Pełna Talia Emocji',
    description: 'Kompletny zestaw 55 kart emocji z pytaniami do pracy terapeutycznej.',
    cards: ALL_EMOTIONS,
    isCustom: false,
  }
];

export const EMOTION_DECK = ALL_EMOTIONS;