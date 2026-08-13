"use strict";
/* LE CONTENU DU COURS — données pures, aucune logique.
   Sorti de index.html le 13/08/2026. Ce fichier ne fait que declarer COURSE ;
   il est charge en premier, avant tout code qui s en sert. */
/* ===============================================================
   1. LE COURS
   Un jour = un objet. Une leçon = une suite d'ETAPES courtes.
   Chaque étape porte une idée, et parfois une mini-question qu'il
   faut résoudre avant de continuer : c'est ce qui empêche de lire
   sans comprendre.
     idea   : l'idée, en une phrase simple
     detail : une ou deux phrases de plus (facultatif)
     gloss  : le mot à mot — de[] et fr[] ont TOUJOURS la même longueur
     table  : deux colonnes (conjugaison, récapitulatif)
     check  : la mini-question (facultatif)
   =============================================================== */
const COURSE = [

/* ------------------------------- ÉTAPE 1 ------------------------------
   Unité 0 du livre (p.3) — l'alphabet et la prononciation.
   Aucune grammaire ici : on apprend à LIRE avant de construire.
   D'où l'absence d'exercices « remettre dans l'ordre » — il n'y a pas
   encore de phrase à ordonner. Les trois autres formes suffisent. */
{
  day: 1, title: "L'alphabet et les sons", de: "Das Alphabet",
  steps: [
    {
      idea: "L'allemand s'écrit avec les mêmes 26 lettres que le français.",
      detail: "Tu sais donc déjà tout lire — ou presque. Il n'y a que <i>quatre signes en plus</i> : <b>ä</b>, <b>ö</b>, <b>ü</b> et <b>ß</b>. On les voit dans les écrans suivants, un par un."
    },
    {
      idea: "Les deux points sur une voyelle changent le son.",
      detail: "Ce chapeau s'appelle un <b>Umlaut</b>. Il ne décore pas : il transforme la voyelle. Compare <b>Bruder</b> (frère) et <b>Brüder</b> (frères) — un seul signe, et le mot devient un pluriel.",
      table: [["a &rarr; ä", "comme le è de « père »"], ["o &rarr; ö", "comme le eu de « peur »"], ["u &rarr; ü", "comme le u de « lune »"]],
      check: { q: "À quoi sert le tréma de <b>ü</b> ?", o: ["il change le son de la voyelle", "il ne se prononce pas", "il marque l'accent tonique"], a: 0, why: "Il change vraiment le son — et parfois le sens du mot, comme dans <b>Bruder</b> / <b>Brüder</b>." }
    },
    {
      idea: "Le ß se lit comme un s dur.",
      detail: "Cette lettre s'appelle <b>Eszett</b>. Elle se prononce comme le <b>ss</b> de « poisson », jamais comme un z. Si ton clavier n'en a pas, écris <b>ss</b> : c'est accepté partout, et c'est même la règle en Suisse.",
      gloss: { de: ["Die", "Straße", "ist", "schön"], fr: ["La", "rue", "est", "belle"] },
      check: { q: "Ton clavier n'a pas de <b>ß</b>. Tu écris <b>Straße</b>…", o: ["Strasse", "Strase", "Stratze"], a: 0, why: "<b>ß</b> se remplace toujours par <b>ss</b>, jamais par un seul s." }
    },
    {
      idea: "Quatre lettres se lisent autrement qu'en français.",
      detail: "Ce sont les seules vraies surprises. Une fois celles-là connues, tu lis presque tout à voix haute.",
      table: [["w", "se lit v &mdash; <b>Wasser</b> = « vasser »"], ["v", "se lit f &mdash; <b>vier</b> = « fiir »"], ["z", "se lit ts &mdash; <b>Zeit</b> = « tsaït »"], ["j", "se lit y &mdash; <b>ja</b> = « ya »"]],
      check: { q: "<b>Wasser</b> (l'eau) commence par le son…", o: ["v", "w à l'anglaise", "ou"], a: 0, why: "Le <b>w</b> allemand est notre <b>v</b>. Et notre v s'écrit, lui, <b>w</b> — d'où la confusion au début." }
    },
    {
      idea: "Deux voyelles collées : c'est la deuxième qui donne le son.",
      detail: "La règle tient en une ligne et vaut pour <b>ei</b> et <b>ie</b>. <b>ei</b> se lit « aï » (on entend le i), <b>ie</b> se lit « ii » long (on entend le e allongé). C'est ce qui distingue <b>Wein</b> (le vin, « vaïn ») de <b>wie</b> (comment, « vii »).",
      check: { q: "<b>vier</b> (quatre) se prononce…", o: ["fiir", "faïer", "vier comme en français"], a: 0, why: "<b>v</b> = f, et <b>ie</b> = i long. Donc « fiir »." }
    }
  ],
  examples: [
    { d: "Das Alphabet hat sechsundzwanzig Buchstaben.", f: "L'alphabet a vingt-six lettres." },
    { d: "Die Straße ist schön.", f: "La rue est belle." },
    { d: "Das Wasser ist kalt.", f: "L'eau est froide." },
    { d: "Der Bär ist groß.", f: "L'ours est grand." },
    { d: "Ja, das ist mein Haus.", f: "Oui, c'est ma maison." },
    { d: "Die Schule ist grün.", f: "L'école est verte." },
    { d: "Wie schreibt man das?", f: "Comment ça s'écrit ?" },
    { d: "Vier und vier ist acht.", f: "Quatre et quatre font huit." },
    { d: "Die Zeit ist schön.", f: "Le temps est beau." },
    { d: "Mein Bruder heißt Max.", f: "Mon frère s'appelle Max." },
    { d: "Das Buch ist groß.", f: "Le livre est grand." },
    { d: "Wo ist die Straße?", f: "Où est la rue ?" }
  ],
  vocab: [
    { d: "das Haus", f: "la maison", p: "das HAOSS" },
    { d: "die Schule", f: "l'école", p: "dii CHOU-le" },
    { d: "die Straße", f: "la rue", p: "dii CHTRAA-se" },
    { d: "das Wasser", f: "l'eau", p: "das VA-seur" },
    { d: "der Bär", f: "l'ours", p: "dèr BÈÈR" },
    { d: "grün", f: "vert", p: "GRUUN" },
    { d: "schön", f: "beau", p: "CHEUN" },
    { d: "vier", f: "quatre", p: "FIIR" },
    { d: "die Zeit", f: "le temps", p: "dii TSAÏT" },
    { d: "ja", f: "oui", p: "YAA" }
  ],
  quiz: [
    { q: "Combien de lettres en plus du français l'allemand a-t-il ?", o: ["quatre : ä, ö, ü, ß", "deux : ä et ß", "aucune", "six"], a: 0, why: "Trois voyelles à tréma — <b>ä ö ü</b> — et le <b>ß</b>." },
    { q: "Le <b>w</b> allemand se prononce…", o: ["comme notre v", "comme notre ou", "comme notre w", "il est muet"], a: 0, why: "<b>Wasser</b> se dit « vasser ». Dans les mots allemands, notre son v s'écrit <b>w</b> — et le <b>v</b> allemand, lui, se dit « f » : <b>Vater</b> se prononce « FA-teur »." },
    { q: "<b>Zeit</b> commence par le son…", o: ["ts", "z", "s", "tch"], a: 0, why: "Le <b>z</b> allemand est un <b>ts</b> — comme dans « tsé-tsé »." },
    { q: "On peut toujours remplacer <b>ß</b> par…", o: ["ss", "s", "z", "sch"], a: 0, why: "<b>ß</b> et <b>ss</b> notent le même son dur. La Suisse n'écrit d'ailleurs que <b>ss</b>." },
    { q: "Quel mot contient le son « aï » ?", o: ["Zeit", "vier", "Schule", "grün"], a: 0, why: "<b>ei</b> se lit « aï ». Attention à ne pas le confondre avec <b>ie</b>, qui fait « ii »." }
  ],
  drills: [
    { t: "gap", f: "Où est la rue ?", s: "Wo ist die ___?", a: "Straße",
      why: "<b>ß</b> après une voyelle longue. <b>Strasse</b> est accepté aussi." },
    { t: "gap", f: "L'eau est froide.", s: "Das ___ ist kalt.", a: "Wasser",
      why: "Le son v s'écrit <b>w</b> en allemand." },
    { t: "gap", f: "L'école est verte.", s: "Die Schule ist ___.", a: "grün",
      why: "Le <b>ü</b> se prononce comme notre u. Sans tréma, <b>grun</b> ne veut rien dire." },
    { t: "gap", f: "La maison est belle.", s: "Das Haus ist ___.", a: "schön",
      why: "<b>ö</b> sonne comme le eu de « peur »." },
    { t: "gap", f: "L'ours est grand.", s: "Der ___ ist groß.", a: "Bär",
      why: "<b>ä</b> sonne comme le è de « père », et le mot prend une majuscule." },
    { t: "gap", f: "Quatre et quatre font huit.", s: "Vier und ___ ist acht.", a: "vier",
      why: "<b>v</b> se lit f et <b>ie</b> donne un i long : « fiir »." },
    { t: "gap", f: "Le temps est beau.", s: "Die ___ ist schön.", a: "Zeit",
      why: "<b>z</b> se lit ts et <b>ei</b> donne « aï » : « tsaït »." },
    { t: "gap", f: "L'école est verte.", s: "Die ___ ist grün.", a: "Schule",
      why: "<b>sch</b> se lit comme notre ch." },
    { t: "gap", f: "Oui, c'est ma maison.", s: "___, das ist mein Haus.", a: "Ja",
      why: "Le <b>j</b> allemand se lit y : « ya »." },
    { t: "gap", f: "C'est ma maison.", s: "Das ist mein ___.", a: "Haus",
      why: "<b>au</b> se lit « ao ». Et tout substantif prend une majuscule." },

    /* Cinq exercices de transcription retirés ici le 01/08/2026, à la demande
       d'Exsangue — « je n'apprends rien de spécial ». Il avait doublement
       raison, et le code le prouve : `normDE` convertit ä→ae et ß→ss AVANT de
       comparer, donc `normDE("grün")` et `normDE("gruen")` sont la même chaîne.
       Un exercice qui demandait d'écrire « gruen » acceptait « grün » : il
       était impossible à rater. Il n'enseignait rien et ne testait rien.

       La connaissance elle-même n'est pas perdue : les notes `why` des
       exercices voisins disent que « Strasse est accepté aussi », et l'étape
       explique les trémas. C'est le DRILL qui était vide, pas le savoir.

       Ne pas les réintroduire : tant que le correcteur tolère l'orthographe de
       dépannage — et il le doit, le ß n'est sur aucun clavier français — un
       exercice de transcription ne peut pas être corrigé. */

    { t: "trad", f: "la maison", a: "das Haus",
      why: "Tout substantif allemand prend une majuscule, même au milieu d'une phrase." },
    { t: "trad", f: "l'école", a: "die Schule",
      why: "<b>sch</b> = notre ch. Et <b>Schule</b> est féminin : <b>die</b>." },
    { t: "trad", f: "la rue", a: "die Straße",
      why: "<b>Strasse</b> est accepté aussi." },
    { t: "trad", f: "l'eau", a: "das Wasser",
      why: "Neutre : <b>das</b>. Et le <b>w</b> se dit v." },
    { t: "trad", f: "l'ours", a: "der Bär",
      why: "Masculin : <b>der</b>. Le tréma est obligatoire." },
    { t: "trad", f: "vert", a: "grün",
      why: "Un adjectif : pas de majuscule." },
    { t: "trad", f: "beau", a: "schön",
      why: "Adjectif également, donc minuscule." },
    { t: "trad", f: "quatre", a: "vier",
      why: "Se prononce « fiir » : <b>v</b> = f." },
    { t: "trad", f: "le temps", a: "die Zeit",
      why: "Féminin. Le <b>z</b> se dit ts." },
    { t: "trad", f: "oui", a: "ja",
      why: "Se prononce « ya »." },
    { t: "trad", f: "Où est la rue ?", a: "Wo ist die Straße?",
      why: "<b>wo</b> = où. Le <b>w</b> se dit v : « vo »." },
    { t: "trad", f: "L'eau est froide.", a: "Das Wasser ist kalt.",
      why: "Sujet, verbe, puis le reste." },
    { t: "trad", f: "L'école est verte.", a: "Die Schule ist grün.",
      why: "Après <b>ist</b>, l'adjectif ne change jamais de forme." }
  ]
},

/* ------------------------------- ÉTAPE 2 ------------------------------
   Unité 1 du livre (p.4) — les langues et les nationalités.
   Les verbes « kommen » et « sprechen » sont donnés ici comme des formules
   toutes faites : leur conjugaison n'arrive qu'aux étapes 11 et 12.
   C'est l'ordre du livre, et il tient : on sait dire d'où l'on vient
   bien avant de savoir pourquoi le verbe prend un -e. */
{
  day: 2, title: "Les langues et les pays", de: "Woher kommst du?",
  steps: [
    {
      idea: "Pour dire d'où tu viens : ich komme aus + le pays.",
      detail: "Une seule formule à retenir, elle marche avec tous les pays et toutes les villes. <b>aus</b> veut dire « de, en provenance de ».",
      gloss: { de: ["Ich", "komme", "aus", "Frankreich"], fr: ["Je", "viens", "de", "France"] }
    },
    {
      idea: "Le pays, l'habitant et la langue sont trois mots de la même famille.",
      detail: "Ils se ressemblent, mais ne se remplacent pas. Le pays répond à « où », l'habitant à « qui », la langue à « quoi ».",
      table: [["Frankreich", "le pays &mdash; la France"], ["Franzose / Französin", "l'habitant &mdash; un Français / une Française"], ["Französisch", "la langue &mdash; le français"]],
      check: { q: "« Je viens de France » se dit…", o: ["Ich komme aus Frankreich", "Ich komme aus Franzose", "Ich komme aus Französisch"], a: 0, why: "Après <b>aus</b>, on met le <b>pays</b> — jamais l'habitant ni la langue." }
    },
    {
      idea: "Presque toutes les langues se terminent par -isch.",
      detail: "C'est le suffixe des langues, comme notre <b>-ais</b> ou <b>-ois</b>. Une fois vu, il se reconnaît partout : <b>Spanisch</b>, <b>Englisch</b>, <b>Russisch</b>, <b>Chinesisch</b>, <b>Japanisch</b>.",
      check: { q: "Comment dit-on « l'espagnol » (la langue) ?", o: ["Spanisch", "Spanien", "Spanier"], a: 0, why: "<b>Spanien</b> est le pays, <b>Spanier</b> l'habitant, <b>Spanisch</b> la langue." }
    },
    {
      idea: "Une seule exception, et c'est la plus utile : l'allemand.",
      detail: "<b>Deutsch</b> ne prend pas de <b>-isch</b>. Le pays est <b>Deutschland</b> — mot à mot « le pays allemand », puisque <b>Land</b> veut dire pays.",
      gloss: { de: ["Ich", "lerne", "Deutsch"], fr: ["J'", "apprends", "l'allemand"] },
      check: { q: "<b>Deutschland</b> est…", o: ["le pays", "la langue", "l'habitant"], a: 0, why: "<b>Deutschland</b> = le pays. La langue est <b>Deutsch</b> tout court." }
    },
    {
      idea: "Pour rester honnête sur ton niveau : ein wenig.",
      detail: "<b>ein wenig</b> veut dire « un peu ». On le glisse avant la langue. C'est la phrase la plus utile du voyage, et la plus rassurante à savoir dire.",
      gloss: { de: ["Ich", "spreche", "ein", "wenig", "Deutsch"], fr: ["Je", "parle", "un", "peu", "allemand"] }
    }
  ],
  examples: [
    { d: "Woher kommst du?", f: "D'où viens-tu ?" },
    { d: "Ich komme aus Frankreich.", f: "Je viens de France." },
    { d: "Ich spreche ein wenig Deutsch.", f: "Je parle un peu allemand." },
    { d: "Wie viele Sprachen sprichst du?", f: "Combien de langues parles-tu ?" },
    { d: "Ich lerne Deutsch und Englisch.", f: "J'apprends l'allemand et l'anglais." },
    { d: "Meine Eltern sind Deutsche.", f: "Mes parents sont allemands." },
    { d: "Sie kommt aus Spanien.", f: "Elle vient d'Espagne." },
    { d: "Er spricht Italienisch und Französisch.", f: "Il parle italien et français." },
    { d: "Deutschland ist ein schönes Land.", f: "L'Allemagne est un beau pays." },
    { d: "Ich möchte auch Japanisch lernen.", f: "Je voudrais aussi apprendre le japonais." },
    { d: "Sprichst du Englisch?", f: "Parles-tu anglais ?" },
    { d: "Das ist sehr interessant!", f: "C'est très intéressant !" }
  ],
  vocab: [
    { d: "das Land", f: "le pays", p: "das LANNT" },
    { d: "Deutschland", f: "l'Allemagne", p: "DOÏTCH-lannt" },
    { d: "Frankreich", f: "la France", p: "FRANNK-raïch" },
    { d: "Deutsch", f: "l'allemand (la langue)", p: "DOÏTCH" },
    { d: "Französisch", f: "le français (la langue)", p: "frann-TSEU-zich" },
    { d: "Englisch", f: "l'anglais (la langue)", p: "ÈNN-glich" },
    { d: "die Sprache", f: "la langue", p: "dii CHPRAA-khe" },
    { d: "ein wenig", f: "un peu", p: "aïn VÉ-nich" },
    { d: "auch", f: "aussi", p: "AOKH" },
    { d: "interessant", f: "intéressant", p: "inn-té-ré-SANNT" }
  ],
  quiz: [
    { q: "Complète : Ich komme ___ Frankreich.", o: ["aus", "in", "von", "auf"], a: 0, why: "<b>aus</b> dit l'origine : « je viens de ». C'est la formule figée à retenir." },
    { q: "Comment dit-on « l'anglais » (la langue) ?", o: ["Englisch", "England", "Engländer"], a: 0, why: "<b>England</b> le pays, <b>Engländer</b> l'habitant, <b>Englisch</b> la langue." },
    { q: "Quelle langue ne finit PAS par -isch ?", o: ["l'allemand", "l'espagnol", "le russe", "le japonais"], a: 0, why: "<b>Deutsch</b> est la seule exception courante. Toutes les autres suivent le moule." },
    { q: "<b>Land</b> veut dire…", o: ["pays", "langue", "ville", "habitant"], a: 0, why: "D'où <b>Deutschland</b>, mot à mot « le pays allemand »." },
    { q: "« Je parle un peu allemand » se dit…", o: ["Ich spreche ein wenig Deutsch", "Ich spreche ein wenig Deutschland", "Ich komme ein wenig Deutsch"], a: 0, why: "<b>ein wenig</b> se place avant la langue — et c'est bien <b>Deutsch</b>, pas le pays." }
  ],
  drills: [
    { t: "order", f: "Je viens de France.", a: "Ich komme aus Frankreich",
      why: "Sujet, verbe, puis l'origine introduite par <b>aus</b>." },
    { t: "order", f: "Je parle un peu allemand.", a: "Ich spreche ein wenig Deutsch",
      why: "<b>ein wenig</b> se glisse juste avant la langue." },
    { t: "order", f: "D'où viens-tu ?", a: "Woher kommst du",
      why: "Le mot interrogatif prend la place 1, le verbe la place 2, le sujet suit." },
    { t: "order", f: "J'apprends l'allemand.", a: "Ich lerne Deutsch",
      why: "Sujet, verbe, complément — l'ordre le plus simple." },
    { t: "order", f: "Elle vient d'Espagne.", a: "Sie kommt aus Spanien",
      why: "Avec <b>sie</b>, le verbe prend un <b>-t</b>." },
    { t: "order", f: "Parles-tu anglais ?", a: "Sprichst du Englisch",
      why: "Sans mot interrogatif, la question se fait en mettant le verbe en tête." },
    { t: "order", f: "L'Allemagne est un beau pays.", a: "Deutschland ist ein schönes Land",
      why: "<b>schön</b> prend un <b>-es</b> devant un nom neutre — on y reviendra." },

    { t: "gap", f: "Je viens de France.", s: "Ich komme ___ Frankreich.", a: "aus",
      why: "<b>aus</b> introduit toujours le pays d'origine." },
    { t: "gap", f: "J'apprends l'allemand.", s: "Ich lerne ___.", a: "Deutsch",
      why: "La langue, pas le pays : <b>Deutsch</b> et non <b>Deutschland</b>." },
    { t: "gap", f: "Je parle un peu allemand.", s: "Ich spreche ___ ___ Deutsch.", a: "ein wenig",
      why: "Deux mots inséparables : <b>ein wenig</b>." },
    { t: "gap", f: "Combien de langues parles-tu ?", s: "Wie viele ___ sprichst du?", a: "Sprachen",
      why: "Le pluriel de <b>die Sprache</b> est <b>die Sprachen</b>." },
    { t: "gap", f: "L'Allemagne est un beau pays.", s: "Deutschland ist ein schönes ___.", a: "Land",
      why: "<b>das Land</b> = le pays. Neutre, d'où <b>ein</b>." },
    { t: "gap", f: "Je voudrais aussi apprendre le japonais.", s: "Ich möchte ___ Japanisch lernen.", a: "auch",
      why: "<b>auch</b> = aussi. Il se place devant ce qu'il ajoute." },
    { t: "gap", f: "Elle vient d'Espagne.", s: "Sie ___ aus Spanien.", a: "kommt",
      why: "Avec <b>sie</b> (elle), le verbe prend <b>-t</b>." },
    { t: "gap", f: "C'est très intéressant !", s: "Das ist sehr ___!", a: "interessant",
      why: "Un adjectif après <b>ist</b> : il ne change pas de forme." },

    { t: "trans", inst: "Remplace le pays par la langue.", from: "Ich komme aus Frankreich.", a: "Ich spreche Französisch.",
      why: "Le pays devient la langue, et <b>komme aus</b> devient <b>spreche</b>." },
    { t: "trans", inst: "Remplace le pays par la langue.", from: "Ich komme aus Spanien.", a: "Ich spreche Spanisch.",
      why: "<b>Spanien</b> le pays, <b>Spanisch</b> la langue." },
    { t: "trans", inst: "Mets à la troisième personne (er).", from: "Ich komme aus Deutschland.", a: "Er kommt aus Deutschland.",
      why: "<b>ich komme</b> devient <b>er kommt</b>." },
    { t: "trans", inst: "Transforme en question.", from: "Du sprichst Englisch.", a: "Sprichst du Englisch?",
      why: "On inverse le verbe et le sujet, sans rien ajouter." },
    { t: "trans", inst: "Ajoute « un peu ».", from: "Ich spreche Deutsch.", a: "Ich spreche ein wenig Deutsch.",
      why: "<b>ein wenig</b> se pose juste avant la langue." },
    { t: "trans", inst: "Mets à la deuxième personne (du).", from: "Ich lerne Deutsch.", a: "Du lernst Deutsch.",
      why: "Avec <b>du</b>, le verbe prend <b>-st</b>." },

    { t: "trad", f: "Je viens de France.", a: "Ich komme aus Frankreich.",
      why: "La formule de base pour dire son origine." },
    { t: "trad", f: "D'où viens-tu ?", a: "Woher kommst du?",
      why: "<b>woher</b> = d'où. Le <b>w</b> se dit v : « voher »." },
    { t: "trad", f: "Je parle un peu allemand.", a: "Ich spreche ein wenig Deutsch.",
      why: "La phrase la plus utile du voyage." },
    { t: "trad", f: "Parles-tu anglais ?", a: "Sprichst du Englisch?",
      why: "Verbe en tête, sujet derrière." },
    { t: "trad", f: "J'apprends l'allemand.", a: "Ich lerne Deutsch.",
      why: "<b>Deutsch</b> prend une majuscule : c'est un nom." },
    { t: "trad", f: "C'est un beau pays.", a: "Das ist ein schönes Land.",
      why: "<b>das ist</b> = c'est, et <b>Land</b> est neutre." },
    { t: "trad", f: "Je voudrais aussi apprendre le japonais.", a: "Ich möchte auch Japanisch lernen.",
      why: "Avec <b>möchte</b>, l'autre verbe part à la fin — on y reviendra à l'étape 25." }
  ]
},

/* ------------------------------- ÉTAPE 3 ------------------------------
   Unité 2 du livre (p.5-6) — se présenter ET présenter quelqu'un.
   Repris de l'ancienne étape 1 (git 8883587), débarrassé de deux choses
   qui appartiennent à d'autres unités du livre : les salutations, qui
   font l'unité 3, et la conjugaison de « sein », qui fait l'unité 8.
   Ici, « ich bin » n'est donné que comme une formule toute faite. */
{
  day: 3, title: "Se présenter", de: "Ich heiße Anna.",
  steps: [
    {
      idea: "Pour donner ton nom, deux formules au choix.",
      detail: "<b>Ich heiße Anna</b> ou <b>Mein Name ist Anna</b> — les deux sont justes, la première est la plus courante à l'oral. Le <b>ß</b> se prononce comme un s dur, et s'écrit <b>ss</b> si ton clavier n'en a pas.",
      gloss: { de: ["Ich", "heiße", "Anna"], fr: ["Je", "m'appelle", "Anna"] }
    },
    {
      idea: "Demander le nom : tout dépend de qui est en face.",
      detail: "L'allemand tranche là où le français hésite. Avec un proche, <b>du</b>. Avec un inconnu ou un supérieur, <b>Sie</b> — et il prend <i>toujours</i> une majuscule. C'est cette majuscule qui le distingue à l'écrit de <b>sie</b>, « elle ».",
      table: [["Wie heißt du?", "à un proche"], ["Wie heißen Sie?", "à un inconnu, poli"]],
      check: { q: "Tu te présentes à ton futur patron. Tu demandes…", o: ["Wie heißen Sie?", "Wie heißt du?", "Wie heißt Sie?"], a: 0, why: "Avec <b>Sie</b>, le verbe garde la forme longue <b>heißen</b> — et la majuscule est obligatoire." }
    },
    {
      idea: "Demander comment ça va : Wie geht's?",
      detail: "C'est la contraction de <b>Wie geht es?</b>. La réponse commence presque toujours par <b>mir geht's</b> — mot à mot « ça me va ».",
      table: [["Mir geht's gut.", "Je vais bien."], ["Es geht.", "Ça va, comme ci comme ça."], ["Nicht so gut.", "Pas très bien."]],
      check: { q: "On te demande <b>Wie geht's?</b>. Tu vas bien. Tu réponds…", o: ["Danke, mir geht's gut.", "Danke, ich heiße gut.", "Danke, es ist gut."], a: 0, why: "La réponse toute faite est <b>mir geht's gut</b>." }
    },
    {
      idea: "Présenter quelqu'un tient en deux mots : das ist.",
      detail: "<b>Das ist Klaus</b> — « voici Klaus ». C'est la formule courante, celle qu'on emploie entre amis. La version soignée existe, mais elle est longue : <b>Ich möchte dir Klaus vorstellen</b>.",
      gloss: { de: ["Das", "ist", "mein", "Freund", "Klaus"], fr: ["C'est", "—", "mon", "ami", "Klaus"] }
    },
    {
      idea: "Quand on te présente quelqu'un, une seule réponse à savoir.",
      detail: "<b>Freut mich!</b> — « enchanté ». La version complète est <b>Freut mich, dich kennenzulernen</b>, mais personne ne t'en voudra de dire seulement les deux premiers mots. Si l'autre l'a dit en premier, tu réponds <b>Ebenfalls!</b> : « de même ».",
      check: { q: "On vient de te dire <b>Freut mich!</b>. Tu réponds…", o: ["Ebenfalls!", "Danke schön!", "Wie geht's?"], a: 0, why: "<b>Ebenfalls</b> renvoie la politesse : « de même »." }
    }
  ],
  examples: [
    { d: "Ich heiße Anna. Und du?", f: "Je m'appelle Anna. Et toi ?" },
    { d: "Mein Name ist Thomas.", f: "Mon nom est Thomas." },
    { d: "Wie heißt du?", f: "Comment t'appelles-tu ?" },
    { d: "Wie heißen Sie?", f: "Comment vous appelez-vous ? (poli)" },
    { d: "Wie geht's? — Danke, mir geht's gut.", f: "Comment ça va ? — Merci, je vais bien." },
    { d: "Nicht so gut, danke.", f: "Pas très bien, merci." },
    { d: "Das ist mein Freund Klaus.", f: "C'est mon ami Klaus." },
    { d: "Freut mich, dich kennenzulernen!", f: "Enchanté de faire ta connaissance !" },
    { d: "Ebenfalls!", f: "De même !" },
    { d: "Ich bin Max, und das ist Sophie.", f: "Je suis Max, et voici Sophie." },
    { d: "Sind Sie Herr Weber?", f: "Êtes-vous Monsieur Weber ?" },
    { d: "Er heißt Max und sie heißt Sophie.", f: "Il s'appelle Max et elle s'appelle Sophie." }
  ],
  vocab: [
    { d: "ich heiße", f: "je m'appelle", p: "ich HAÏ-se" },
    { d: "mein Name ist", f: "mon nom est", p: "maïn NAA-me ist" },
    { d: "ich bin", f: "je suis", p: "ich BINN" },
    { d: "Wie geht's?", f: "comment ça va ?", p: "vii GUÉTSS" },
    { d: "mir geht's gut", f: "je vais bien", p: "mir guétss GOUT" },
    { d: "danke", f: "merci", p: "DANN-ke" },
    { d: "das ist", f: "voici, c'est", p: "das IST" },
    { d: "der Freund", f: "l'ami", p: "dèr FROÏNNT" },
    { d: "freut mich", f: "enchanté", p: "froït MICH" },
    { d: "ebenfalls", f: "de même", p: "É-benn-fals" }
  ],
  quiz: [
    { q: "Comment dit-on « je m'appelle Anna » ?", o: ["Ich heiße Anna", "Ich bin heiße Anna", "Mein heiße Anna", "Ich Name Anna"], a: 0, why: "<b>Ich heiße…</b> est la formule la plus courante. <b>Mein Name ist Anna</b> marche aussi." },
    { q: "Tu parles à un inconnu. Tu demandes son nom avec…", o: ["Wie heißen Sie?", "Wie heißt du?", "Wie heißt Sie?", "Wie heißen du?"], a: 0, why: "<b>Sie</b> est la forme polie, avec sa majuscule, et le verbe reste <b>heißen</b>." },
    { q: "Le <b>Sie</b> de politesse s'écrit…", o: ["toujours avec une majuscule", "en minuscule", "en majuscules entières", "avec un tréma"], a: 0, why: "La majuscule est le seul signe qui le distingue de <b>sie</b> (elle, ils)." },
    { q: "« Ça va, comme ci comme ça » se dit…", o: ["Es geht.", "Mir geht's gut.", "Nicht so gut.", "Freut mich."], a: 0, why: "<b>Es geht</b> est la réponse tiède : ni bien, ni mal." },
    { q: "Pour présenter ton ami, tu dis…", o: ["Das ist mein Freund.", "Ich heiße mein Freund.", "Mir geht's mein Freund.", "Ebenfalls mein Freund."], a: 0, why: "<b>Das ist…</b> — mot à mot « c'est… » — sert à présenter n'importe qui." }
  ],
  drills: [
    { t: "order", f: "Je m'appelle Anna.", a: "Ich heiße Anna",
      why: "Sujet, verbe, nom. La charpente de base." },
    { t: "order", f: "Comment t'appelles-tu ?", a: "Wie heißt du",
      why: "Le mot en W- prend la place 1, le verbe la place 2, le sujet passe derrière." },
    { t: "order", f: "Mon nom est Thomas.", a: "Mein Name ist Thomas",
      why: "<b>Mein Name</b> est le sujet ; le verbe <b>ist</b> reste en deuxième place." },
    { t: "order", f: "C'est mon ami Klaus.", a: "Das ist mein Freund Klaus",
      why: "<b>Das ist</b> ouvre toute présentation." },
    { t: "order", f: "Comment vous appelez-vous ?", a: "Wie heißen Sie",
      why: "Avec <b>Sie</b>, le verbe garde sa forme longue <b>heißen</b>." },
    { t: "order", f: "Je suis Max.", a: "Ich bin Max",
      why: "<b>ich bin</b> — une formule à retenir telle quelle pour l'instant." },
    { t: "order", f: "Enchanté de faire ta connaissance.", a: "Freut mich dich kennenzulernen",
      why: "L'ordre est figé : on l'apprend comme un bloc." },

    { t: "gap", f: "Je m'appelle Thomas.", s: "Ich ___ Thomas.", a: "heiße",
      why: "Avec <b>ich</b>, la terminaison est <b>-e</b>." },
    { t: "gap", f: "Comment t'appelles-tu ?", s: "Wie ___ du?", a: "heißt",
      why: "Avec <b>du</b>, la terminaison est <b>-t</b> — le <b>ß</b> avale le s." },
    { t: "gap", f: "Comment vous appelez-vous ?", s: "Wie ___ Sie?", a: "heißen",
      why: "<b>Sie</b> poli prend la forme longue, identique à l'infinitif." },
    { t: "gap", f: "Mon nom est Anna.", s: "Mein ___ ist Anna.", a: "Name",
      why: "<b>der Name</b> = le nom. Majuscule, comme tout substantif." },
    { t: "gap", f: "Je vais bien.", s: "Mir ___ gut.", a: "geht's",
      why: "Contraction de <b>geht es</b>. La réponse est figée." },
    { t: "gap", f: "C'est mon ami.", s: "___ ist mein Freund.", a: "Das",
      why: "<b>Das ist</b> présente aussi bien un objet qu'une personne." },
    { t: "gap", f: "Enchanté !", s: "___ mich!", a: "Freut",
      why: "Mot à mot « ça me réjouit »." },
    { t: "gap", f: "De même !", s: "___!", a: "Ebenfalls",
      why: "La réponse à <b>Freut mich</b>." },
    { t: "gap", f: "Merci, je vais bien.", s: "___, mir geht's gut.", a: "Danke",
      why: "On remercie avant de répondre — c'est l'usage." },

    { t: "trans", inst: "Passe du tutoiement au vouvoiement.", from: "Wie heißt du?", a: "Wie heißen Sie?",
      why: "<b>du heißt</b> devient <b>Sie heißen</b>, avec la majuscule obligatoire." },
    { t: "trans", inst: "Passe du vouvoiement au tutoiement.", from: "Wie heißen Sie?", a: "Wie heißt du?",
      why: "Le chemin inverse : forme longue vers forme courte." },
    { t: "trans", inst: "Mets à la troisième personne (er).", from: "Ich heiße Anna.", a: "Er heißt Anna.",
      why: "La terminaison passe de <b>-e</b> à <b>-t</b>." },
    { t: "trans", inst: "Dis-le autrement, avec « mein Name ».", from: "Ich heiße Thomas.", a: "Mein Name ist Thomas.",
      why: "Même sens, registre un peu plus soutenu." },
    { t: "trans", inst: "Dis-le autrement, avec « ich heiße ».", from: "Mein Name ist Anna.", a: "Ich heiße Anna.",
      why: "Le chemin inverse, plus courant à l'oral." },
    { t: "trans", inst: "Transforme en question.", from: "Du heißt Anna.", a: "Heißt du Anna?",
      why: "Sans mot interrogatif, on inverse le verbe et le sujet." },

    { t: "trad", f: "Je m'appelle Anna.", a: "Ich heiße Anna.",
      why: "La formule de base." },
    { t: "trad", f: "Comment t'appelles-tu ?", a: "Wie heißt du?",
      why: "Mot en W- en place 1, verbe en place 2." },
    { t: "trad", f: "Comment ça va ?", a: "Wie geht's?",
      why: "Contraction de <b>Wie geht es?</b>." },
    { t: "trad", f: "Merci, je vais bien.", a: "Danke, mir geht's gut.",
      why: "La réponse standard, à retenir comme un bloc." },
    { t: "trad", f: "C'est mon ami Klaus.", a: "Das ist mein Freund Klaus.",
      why: "<b>Das ist</b> présente n'importe qui." },
    { t: "trad", f: "Enchanté !", a: "Freut mich!",
      why: "La version courte suffit dans presque toutes les situations." },
    { t: "trad", f: "De même !", a: "Ebenfalls!",
      why: "La réponse à <b>Freut mich</b>." },
    { t: "trad", f: "Mon nom est Thomas.", a: "Mein Name ist Thomas.",
      why: "<b>Name</b> prend une majuscule." }
  ]
},

/* ------------------------------- ÉTAPE 4 ------------------------------
   Unité 3 du livre (p.7-8) — les salutations.
   Le vocabulaire de base vient de l'ancienne étape 1 (git 8883587), où il
   était mélangé à la présentation. Le livre en fait une unité à part, et
   il a raison : saluer et se présenter sont deux gestes distincts. */
{
  day: 4, title: "Les salutations", de: "Guten Tag!",
  steps: [
    {
      idea: "« Bonjour » change selon l'heure qu'il est.",
      detail: "Là où le français dit « bonjour » du matin au soir, l'allemand découpe la journée. Aucune de ces formules n'est plus polie qu'une autre : elles disent seulement le moment.",
      table: [["Guten Morgen", "le matin"], ["Guten Tag", "la journée"], ["Guten Abend", "le soir"], ["Gute Nacht", "en allant se coucher"]],
      check: { q: "Il est 20 h, tu entres dans un restaurant. Tu dis…", o: ["Guten Abend", "Guten Morgen", "Gute Nacht"], a: 0, why: "<b>Guten Abend</b> le soir. <b>Gute Nacht</b> ne sert qu'à se quitter pour dormir." }
    },
    {
      idea: "Une seule irrégularité : Gute Nacht, sans n.",
      detail: "Les trois premières disent <b>Guten</b>, la quatrième dit <b>Gute</b>. La raison : <b>die Nacht</b> est féminin, alors que <b>Morgen</b>, <b>Tag</b> et <b>Abend</b> sont masculins. C'est le premier signe que les adjectifs changent selon le genre — on y reviendra à l'étape 17.",
      check: { q: "On souhaite une bonne nuit en disant…", o: ["Gute Nacht", "Guten Nacht", "Gutes Nacht"], a: 0, why: "<b>Nacht</b> est féminin, donc <b>Gute</b> sans <b>n</b>." }
    },
    {
      idea: "Entre proches, c'est plus court : Hallo.",
      detail: "<b>Hallo</b> marche à toute heure, avec tous ceux que tu tutoies. Encore plus décontracté : <b>Hi</b>, emprunté à l'anglais et très courant chez les jeunes.",
      gloss: { de: ["Hallo", "Anna", "wie", "geht's"], fr: ["Salut", "Anna", "comment", "ça va"] }
    },
    {
      idea: "Pour se quitter, tout dépend encore de qui est en face.",
      detail: "<b>Auf Wiedersehen</b> est la formule polie — mot à mot « au revoir », littéralement « jusqu'à se revoir ». Entre proches, on dit <b>Tschüss</b>, court et chaleureux.",
      table: [["Auf Wiedersehen", "poli, à un inconnu"], ["Tschüss", "entre proches"]],
      check: { q: "Tu quittes le bureau de ta banquière. Tu dis…", o: ["Auf Wiedersehen", "Tschüss", "Gute Nacht"], a: 0, why: "<b>Auf Wiedersehen</b> avec quelqu'un qu'on vouvoie." }
    },
    {
      idea: "Tu peux dire quand vous vous reverrez : bis + le moment.",
      detail: "<b>bis</b> veut dire « jusqu'à ». Il suffit de coller derrière le moment du revoir. C'est une petite famille de formules qui s'apprennent d'un coup.",
      table: [["bis gleich", "à tout de suite"], ["bis später", "à plus tard"], ["bis bald", "à bientôt"], ["bis morgen", "à demain"]],
      check: { q: "Vous vous revoyez dans une heure. Tu dis…", o: ["bis später", "bis morgen", "bis bald"], a: 0, why: "<b>bis später</b> pour le même jour. <b>bis bald</b> reste vague, <b>bis morgen</b> vise demain." }
    }
  ],
  examples: [
    { d: "Guten Morgen! Wie geht's?", f: "Bonjour ! Comment ça va ?" },
    { d: "Guten Tag, Frau Schmidt.", f: "Bonjour, Madame Schmidt." },
    { d: "Guten Abend! Willkommen!", f: "Bonsoir ! Bienvenue !" },
    { d: "Gute Nacht, bis morgen!", f: "Bonne nuit, à demain !" },
    { d: "Hallo! Ich bin Thomas.", f: "Salut ! Je suis Thomas." },
    { d: "Auf Wiedersehen, Herr Weber.", f: "Au revoir, Monsieur Weber." },
    { d: "Tschüss, bis bald!", f: "Salut, à bientôt !" },
    { d: "Bis gleich!", f: "À tout de suite !" },
    { d: "Bis später, Anna!", f: "À plus tard, Anna !" },
    { d: "Willkommen in Deutschland!", f: "Bienvenue en Allemagne !" },
    { d: "Wie geht es Ihnen?", f: "Comment allez-vous ? (poli)" },
    { d: "Mit freundlichen Grüßen", f: "Cordialement (dans une lettre)" }
  ],
  vocab: [
    { d: "Guten Morgen", f: "bonjour (le matin)", p: "GOU-tenn MOR-guenn" },
    { d: "Guten Tag", f: "bonjour (la journée)", p: "GOU-tenn TAAK" },
    { d: "Guten Abend", f: "bonsoir", p: "GOU-tenn AA-bennt" },
    { d: "Gute Nacht", f: "bonne nuit", p: "GOU-te NAKHT" },
    { d: "Hallo", f: "salut (en arrivant)", p: "HA-lo" },
    { d: "Tschüss", f: "salut (en partant)", p: "TCHUSS" },
    { d: "Auf Wiedersehen", f: "au revoir (poli)", p: "aouf VII-deur-zé-enn" },
    { d: "bis bald", f: "à bientôt", p: "biss BALT" },
    { d: "bis morgen", f: "à demain", p: "biss MOR-guenn" },
    { d: "willkommen", f: "bienvenue", p: "VIL-ko-menn" }
  ],
  quiz: [
    { q: "Il est 8 h du matin. Tu dis…", o: ["Guten Morgen", "Guten Abend", "Gute Nacht", "Auf Wiedersehen"], a: 0, why: "<b>Guten Morgen</b> jusqu'à la mi-journée, puis <b>Guten Tag</b>." },
    { q: "Pourquoi dit-on <b>Gute</b> Nacht et non <b>Guten</b> Nacht ?", o: ["parce que Nacht est féminin", "parce que c'est le soir", "parce que c'est une exception sans raison", "parce que Nacht est au pluriel"], a: 0, why: "L'adjectif suit le genre du nom : masculin <b>Guten</b>, féminin <b>Gute</b>." },
    { q: "Tu quittes ton médecin. Tu dis…", o: ["Auf Wiedersehen", "Tschüss", "Hallo", "Hi"], a: 0, why: "<b>Auf Wiedersehen</b> est la formule polie ; <b>Tschüss</b> se garde pour les proches." },
    { q: "<b>bis</b> veut dire…", o: ["jusqu'à", "bonjour", "merci", "encore"], a: 0, why: "D'où <b>bis morgen</b> = « jusqu'à demain »." },
    { q: "Vous vous revoyez dans cinq minutes. Tu dis…", o: ["Bis gleich!", "Bis morgen!", "Gute Nacht!", "Willkommen!"], a: 0, why: "<b>gleich</b> = tout de suite. C'est le plus proche des quatre." }
  ],
  drills: [
    { t: "order", f: "Bonjour, Madame Schmidt.", a: "Guten Tag Frau Schmidt",
      why: "La salutation d'abord, la personne ensuite." },
    { t: "order", f: "Salut, à bientôt !", a: "Tschüss bis bald",
      why: "Deux formules courtes qui s'enchaînent sans rien entre elles." },
    { t: "order", f: "Bonne nuit, à demain !", a: "Gute Nacht bis morgen",
      why: "<b>Gute</b> sans n devant <b>Nacht</b>, qui est féminin." },
    { t: "order", f: "Bienvenue en Allemagne !", a: "Willkommen in Deutschland",
      why: "<b>in</b> + le pays pour dire où l'on accueille." },
    { t: "order", f: "Au revoir, Monsieur Weber.", a: "Auf Wiedersehen Herr Weber",
      why: "<b>Auf Wiedersehen</b> forme un bloc de deux mots." },
    { t: "order", f: "Bonjour ! Comment ça va ?", a: "Guten Morgen wie geht's",
      why: "On salue, puis on demande des nouvelles." },

    { t: "gap", f: "Bonjour (le matin) !", s: "Guten ___!", a: "Morgen",
      why: "<b>der Morgen</b>, le matin." },
    { t: "gap", f: "Bonsoir !", s: "Guten ___!", a: "Abend",
      why: "<b>der Abend</b>, le soir. Même moule que <b>Guten Tag</b>." },
    { t: "gap", f: "Bonne nuit !", s: "___ Nacht!", a: "Gute",
      why: "<b>Nacht</b> est féminin : l'adjectif perd son <b>n</b>." },
    { t: "gap", f: "Bonjour (la journée) !", s: "Guten ___!", a: "Tag",
      why: "<b>der Tag</b>, le jour. Masculin, donc <b>Guten</b>." },
    { t: "gap", f: "À demain !", s: "___ morgen!", a: "Bis",
      why: "<b>bis</b> = jusqu'à. Attention : <b>morgen</b> en minuscule veut dire « demain »." },
    { t: "gap", f: "À bientôt !", s: "Bis ___!", a: "bald",
      why: "<b>bald</b> = bientôt." },
    { t: "gap", f: "À tout de suite !", s: "Bis ___!", a: "gleich",
      why: "<b>gleich</b> = tout de suite." },
    { t: "gap", f: "À plus tard !", s: "Bis ___!", a: "später",
      why: "<b>später</b> = plus tard. Noter le tréma." },
    { t: "gap", f: "Au revoir (poli).", s: "Auf ___!", a: "Wiedersehen",
      why: "Mot à mot « jusqu'à se revoir »." },
    { t: "gap", f: "Bienvenue !", s: "___!", a: "Willkommen",
      why: "Un seul mot, avec deux <b>l</b>." },

    { t: "trans", inst: "Rends la formule polie.", from: "Tschüss!", a: "Auf Wiedersehen!",
      why: "<b>Tschüss</b> entre proches, <b>Auf Wiedersehen</b> avec ceux qu'on vouvoie." },
    { t: "trans", inst: "Rends la formule familière.", from: "Auf Wiedersehen!", a: "Tschüss!",
      why: "Le chemin inverse." },
    { t: "trans", inst: "Rends la question polie.", from: "Wie geht's?", a: "Wie geht es Ihnen?",
      why: "<b>Ihnen</b> est le pendant poli de <b>dir</b>, et prend une majuscule comme <b>Sie</b>." },
    { t: "trans", inst: "On se revoit demain, pas bientôt. Corrige.", from: "Bis bald!", a: "Bis morgen!",
      why: "<b>bald</b> reste vague, <b>morgen</b> vise le lendemain." },
    { t: "trans", inst: "Passe du matin au soir.", from: "Guten Morgen!", a: "Guten Abend!",
      why: "Seul le moment change ; <b>Guten</b> reste, les deux noms étant masculins." },
    { t: "trans", inst: "Passe de la journée à la nuit.", from: "Guten Tag!", a: "Gute Nacht!",
      why: "Piège : <b>Nacht</b> étant féminin, <b>Guten</b> devient <b>Gute</b>." },

    { t: "trad", f: "Bonjour (le matin) !", a: "Guten Morgen!",
      why: "Jusqu'à la mi-journée environ." },
    { t: "trad", f: "Bonsoir !", a: "Guten Abend!",
      why: "À partir de la fin d'après-midi." },
    { t: "trad", f: "Bonne nuit !", a: "Gute Nacht!",
      why: "Uniquement pour se quitter avant de dormir." },
    { t: "trad", f: "Salut ! (en arrivant)", a: "Hallo!",
      why: "À toute heure, avec ceux qu'on tutoie." },
    { t: "trad", f: "Salut ! (en partant)", a: "Tschüss!",
      why: "Le pendant familier de <b>Auf Wiedersehen</b>." },
    { t: "trad", f: "Au revoir !", a: "Auf Wiedersehen!",
      why: "La formule polie." },
    { t: "trad", f: "À bientôt !", a: "Bis bald!",
      why: "Sans date précise." },
    { t: "trad", f: "À demain !", a: "Bis morgen!",
      why: "<b>morgen</b> en minuscule : demain. Avec majuscule, c'est le matin." },
    { t: "trad", f: "Bienvenue !", a: "Willkommen!",
      why: "S'emploie seul ou suivi du lieu." }
  ]
},

/* ------------------------------- ÉTAPE 5 ------------------------------
   Unité 4 du livre (p.9-10) — les substantifs et leur genre.
   L'ancienne étape 2 (git 8883587) posait der/die/das et s'arrêtait là,
   en concluant que le genre ne se devine pas. Le livre consacre deux
   pages aux terminaisons qui le trahissent : c'est l'apport de l'unité,
   et ça change tout — on passe du par-cœur pur à des repères. */
{
  day: 5, title: "Der, die, das", de: "Die drei Geschlechter",
  steps: [
    {
      idea: "En allemand, tous les noms prennent une majuscule.",
      detail: "Sans exception, et n'importe où dans la phrase. C'est la règle la plus visible de l'allemand écrit — et la plus facile à appliquer.",
      gloss: { de: ["Das", "Haus", "ist", "groß"], fr: ["La", "maison", "est", "grande"] }
    },
    {
      idea: "Chaque nom a un genre, et le français ne sert à rien pour le deviner.",
      detail: "« La table » est masculin en allemand — <b>der Tisch</b>. « La fille » est neutre — <b>das Mädchen</b>. D'où la seule habitude qui compte : n'apprends jamais un nom seul. Apprends <b>der Tisch</b>, pas <b>Tisch</b>. L'article fait partie du mot.",
      table: [["masculin", "der Mann"], ["féminin", "die Frau"], ["neutre", "das Kind"]],
      check: { q: "La bonne façon d'apprendre un nouveau nom :", o: ["avec son article", "tout seul", "avec son pluriel seulement"], a: 0, why: "Sans l'article, il faudra le réapprendre plus tard — et le genre ne se devine pas au son." }
    },
    {
      idea: "Certaines terminaisons trahissent le masculin.",
      detail: "Ce ne sont pas des lois, mais de très bons paris. Le plus rentable : les noms de métier en <b>-er</b>. S'y ajoutent les mois, les jours et les saisons — <b>der Januar</b>, <b>der Montag</b>, <b>der Sommer</b> — ainsi que les marques de voitures.",
      table: [["-er (métier)", "der Lehrer, le professeur"], ["mois, jours, saisons", "der Montag"], ["-or", "der Motor"], ["-ig", "der König, le roi"]],
      check: { q: "<b>Lehrer</b> (professeur) est sans doute…", o: ["masculin", "féminin", "neutre"], a: 0, why: "Les noms de métier en <b>-er</b> sont masculins : <b>der Lehrer</b>." }
    },
    {
      idea: "Quatre terminaisons annoncent le féminin, presque à coup sûr.",
      detail: "<b>-ung</b>, <b>-heit</b>, <b>-keit</b> et <b>-schaft</b> sont les plus fiables de toute la langue : elles ne se trompent quasiment jamais. Ajoute les noms en <b>-e</b>, féminins la plupart du temps, ainsi que les fleurs et les arbres.",
      table: [["-ung", "die Zeitung, le journal"], ["-heit", "die Freiheit, la liberté"], ["-keit", "die Möglichkeit, la possibilité"], ["-e", "die Blume, la fleur"]],
      check: { q: "<b>Wohnung</b> (appartement) est…", o: ["féminin", "masculin", "neutre"], a: 0, why: "Tout nom en <b>-ung</b> est féminin. C'est l'une des règles les plus sûres." }
    },
    {
      idea: "Et deux terminaisons annoncent le neutre — dont une piège les débutants.",
      detail: "<b>-chen</b> et <b>-lein</b> forment les diminutifs, et un diminutif est <i>toujours</i> neutre. C'est pour ça que <b>das Mädchen</b>, la jeune fille, est neutre : c'est le diminutif de <b>die Magd</b>. Le sens ne commande pas le genre — la forme, si.",
      table: [["-chen", "das Mädchen, la jeune fille"], ["-lein", "das Ringlein, le petit anneau"], ["Ge-", "das Gebäude, le bâtiment"], ["-um", "das Museum, le musée"]],
      check: { q: "Pourquoi <b>das Mädchen</b> est-il neutre ?", o: ["parce que -chen est un diminutif", "parce que c'est une exception", "parce que les filles sont neutres en allemand"], a: 0, why: "La terminaison l'emporte sur le sens : tout mot en <b>-chen</b> est neutre." }
    },
    {
      idea: "Enfin : « un » et « une » suivent le même genre.",
      detail: "Et au pluriel, bonne nouvelle : <i>tout</i> devient <b>die</b>, quel que soit le genre de départ. <b>der Mann</b> → <b>die Männer</b>, <b>das Buch</b> → <b>die Bücher</b>. Un souci de moins.",
      table: [["masculin", "ein Mann"], ["féminin", "eine Frau"], ["neutre", "ein Kind"]],
      check: { q: "« une femme » se dit…", o: ["eine Frau", "ein Frau", "einen Frau"], a: 0, why: "Féminin → <b>eine</b>, avec un <b>e</b>. Masculin et neutre partagent <b>ein</b>." }
    }
  ],
  examples: [
    { d: "Das ist ein Buch. Das Buch ist neu.", f: "C'est un livre. Le livre est neuf." },
    { d: "Die Frau heißt Maria.", f: "La femme s'appelle Maria." },
    { d: "Der Tisch ist groß.", f: "La table est grande." },
    { d: "Der Lehrer ist sehr freundlich.", f: "Le professeur est très aimable." },
    { d: "Die Zeitung ist interessant.", f: "Le journal est intéressant." },
    { d: "Das Mädchen heißt Anna.", f: "La jeune fille s'appelle Anna." },
    { d: "Die Blume ist schön.", f: "La fleur est belle." },
    { d: "Das Kind ist hier.", f: "L'enfant est ici." },
    { d: "Ein Mann und eine Frau.", f: "Un homme et une femme." },
    { d: "Die Bücher sind neu.", f: "Les livres sont neufs." },
    { d: "Das Haus ist groß und schön.", f: "La maison est grande et belle." },
    { d: "Die Freiheit ist wichtig.", f: "La liberté est importante." }
  ],
  vocab: [
    { d: "der Mann", f: "l'homme", p: "dèr MANN" },
    { d: "die Frau", f: "la femme", p: "dii FRAOU" },
    { d: "das Kind", f: "l'enfant", p: "das KINNT" },
    { d: "der Lehrer", f: "le professeur", p: "dèr LÉ-reur" },
    { d: "die Zeitung", f: "le journal", p: "dii TSAÏ-toung" },
    { d: "das Mädchen", f: "la jeune fille", p: "das MÈÈT-cheun" },
    { d: "der Tisch", f: "la table", p: "dèr TICH" },
    { d: "die Blume", f: "la fleur", p: "dii BLOU-me" },
    { d: "das Buch", f: "le livre", p: "das BOUKH" },
    { d: "die Freiheit", f: "la liberté", p: "dii FRAÏ-haït" }
  ],
  quiz: [
    { q: "Quel article pour <b>Buch</b> ?", o: ["das", "der", "die", "den"], a: 0, why: "<b>das Buch</b> — neutre. À mémoriser avec le mot." },
    { q: "En allemand, les noms communs s'écrivent…", o: ["avec une majuscule", "en minuscule", "en italique", "sans article"], a: 0, why: "Tous les noms, partout : der Hund, die Stadt, das Brot." },
    { q: "Un nom qui finit par <b>-ung</b> est…", o: ["féminin", "masculin", "neutre", "toujours pluriel"], a: 0, why: "<b>-ung</b>, <b>-heit</b>, <b>-keit</b>, <b>-schaft</b> : quatre terminaisons féminines très fiables." },
    { q: "Un nom qui finit par <b>-chen</b> est…", o: ["neutre", "féminin", "masculin", "cela dépend du sens"], a: 0, why: "C'est un diminutif, et tout diminutif est neutre — d'où <b>das Mädchen</b>." },
    { q: "Au pluriel, l'article défini est…", o: ["die", "der", "das", "dem"], a: 0, why: "Tous les pluriels prennent <b>die</b>, quel que soit le genre au singulier." }
  ],
  drills: [
    { t: "gap", f: "l'homme", s: "___ Mann", a: "der", why: "Masculin." },
    { t: "gap", f: "la femme", s: "___ Frau", a: "die", why: "Féminin." },
    { t: "gap", f: "l'enfant", s: "___ Kind", a: "das", why: "Neutre." },
    { t: "gap", f: "la table", s: "___ Tisch", a: "der", why: "Masculin en allemand, féminin en français : aucune correspondance." },
    { t: "gap", f: "le professeur", s: "___ Lehrer", a: "der", why: "Métier en <b>-er</b> → masculin." },
    { t: "gap", f: "le journal", s: "___ Zeitung", a: "die", why: "<b>-ung</b> → féminin, sans exception utile." },
    { t: "gap", f: "la jeune fille", s: "___ Mädchen", a: "das", why: "<b>-chen</b> est un diminutif → neutre, malgré le sens." },
    { t: "gap", f: "la fleur", s: "___ Blume", a: "die", why: "<b>-e</b> → féminin la plupart du temps ; et les fleurs le sont aussi." },
    { t: "gap", f: "le livre", s: "___ Buch", a: "das", why: "Neutre." },
    { t: "gap", f: "la liberté", s: "___ Freiheit", a: "die", why: "<b>-heit</b> → féminin." },
    { t: "gap", f: "un homme", s: "___ Mann", a: "ein", why: "Masculin → <b>ein</b>." },
    { t: "gap", f: "une femme", s: "___ Frau", a: "eine", why: "Féminin → <b>eine</b>." },
    { t: "gap", f: "un enfant", s: "___ Kind", a: "ein", why: "Neutre → <b>ein</b>, comme le masculin." },

    { t: "order", f: "La table est grande.", a: "Der Tisch ist groß",
      why: "Article, nom, verbe, adjectif." },
    { t: "order", f: "La femme s'appelle Maria.", a: "Die Frau heißt Maria",
      why: "<b>Frau</b> est féminin : <b>die</b>." },
    { t: "order", f: "C'est un livre.", a: "Das ist ein Buch",
      why: "<b>Das ist</b> présente ; <b>ein</b> parce que <b>Buch</b> est neutre." },
    { t: "order", f: "Le professeur est très aimable.", a: "Der Lehrer ist sehr freundlich",
      why: "<b>sehr</b> se place devant l'adjectif." },
    { t: "order", f: "Un homme et une femme.", a: "Ein Mann und eine Frau",
      why: "<b>ein</b> au masculin, <b>eine</b> au féminin." },
    { t: "order", f: "Les livres sont neufs.", a: "Die Bücher sind neu",
      why: "Au pluriel, l'article est <b>die</b> et le verbe <b>sind</b>." },

    { t: "trans", inst: "Mets au pluriel.", from: "Das Buch ist neu.", a: "Die Bücher sind neu.",
      why: "L'article devient <b>die</b>, le verbe <b>sind</b>, et le nom prend un tréma." },
    { t: "trans", inst: "Mets au pluriel.", from: "Der Mann ist hier.", a: "Die Männer sind hier.",
      why: "Tous les pluriels prennent <b>die</b>, quel que soit le genre de départ." },
    { t: "trans", inst: "Remplace « le » par « un ».", from: "Der Tisch ist groß.", a: "Ein Tisch ist groß.",
      why: "Masculin : <b>der</b> devient <b>ein</b>." },
    { t: "trans", inst: "Remplace « la » par « une ».", from: "Die Blume ist schön.", a: "Eine Blume ist schön.",
      why: "Féminin : <b>die</b> devient <b>eine</b>." },
    { t: "trans", inst: "Remplace « un » par « le ».", from: "Ein Kind ist hier.", a: "Das Kind ist hier.",
      why: "Neutre : <b>ein</b> devient <b>das</b>." },

    { t: "trad", f: "La table est grande.", a: "Der Tisch ist groß.",
      why: "Masculin, contre toute intuition française." },
    { t: "trad", f: "Le journal est intéressant.", a: "Die Zeitung ist interessant.",
      why: "<b>-ung</b> → féminin." },
    { t: "trad", f: "La jeune fille s'appelle Anna.", a: "Das Mädchen heißt Anna.",
      why: "Neutre à cause de <b>-chen</b>." },
    { t: "trad", f: "C'est un livre.", a: "Das ist ein Buch.",
      why: "<b>Buch</b> est neutre → <b>ein</b>." },
    { t: "trad", f: "La fleur est belle.", a: "Die Blume ist schön.",
      why: "<b>-e</b> → féminin." },
    { t: "trad", f: "L'enfant est ici.", a: "Das Kind ist hier.",
      why: "Neutre." },
    { t: "trad", f: "Le professeur est aimable.", a: "Der Lehrer ist freundlich.",
      why: "Métier en <b>-er</b> → masculin." }
  ]
},

/* ------------------------------- ÉTAPE 6 ------------------------------
   Unité 5 du livre (p.11-12) — le pluriel des substantifs.
   Contenu entièrement neuf : aucune des douze anciennes étapes ne
   traitait le pluriel, alors que c'est ce qui bloque dès qu'on veut
   parler de plus d'une chose. Le dernier écran n'ouvre la question des
   cas que du bout des lèvres : elle est traitée pour de bon à l'étape 13,
   comme dans le livre. */
{
  day: 6, title: "Le pluriel", de: "Ein Buch, zwei Bücher",
  steps: [
    {
      idea: "Il n'y a pas UNE façon de faire le pluriel : il y en a cinq.",
      detail: "C'est la mauvaise nouvelle, autant la dire tout de suite. Là où le français ajoute un <b>s</b> à presque tout, l'allemand a cinq moules. La bonne nouvelle : le genre du mot dit lequel choisir, la plupart du temps.",
      gloss: { de: ["Ein", "Buch", "zwei", "Bücher"], fr: ["Un", "livre", "deux", "livres"] }
    },
    {
      idea: "Le masculin ajoute le plus souvent -e.",
      detail: "Surtout les mots courts. Et si le mot contient un <b>a</b>, un <b>o</b> ou un <b>u</b>, cette voyelle prend en général un tréma au passage.",
      table: [["der Tisch", "die Tische"], ["der Schuh", "die Schuhe"], ["der Ball", "die Bälle"], ["der Sohn", "die Söhne"]],
      check: { q: "Le pluriel de <b>der Tisch</b> est…", o: ["die Tische", "die Tischer", "die Tischen"], a: 0, why: "Masculin court → <b>-e</b>. Et l'article devient <b>die</b>, comme tous les pluriels." }
    },
    {
      idea: "Le neutre ajoute souvent -er, avec un tréma s'il le peut.",
      detail: "C'est le moule qui s'entend le plus : le mot change vraiment de silhouette. <b>das Haus</b> devient <b>die Häuser</b>.",
      table: [["das Kind", "die Kinder"], ["das Bild", "die Bilder"], ["das Haus", "die Häuser"], ["das Buch", "die Bücher"]],
      check: { q: "Le pluriel de <b>das Haus</b> est…", o: ["die Häuser", "die Hause", "die Hausen"], a: 0, why: "Neutre → <b>-er</b>, et le <b>a</b> prend un tréma : <b>Häuser</b>." }
    },
    {
      /* Corrigé le 02/08/2026, dans la foulée de la question fausse signalée
         par Exsangue. Ce qui était écrit — « le féminin ajoute -n ou -en, et
         jamais de tréma » — portait la MÊME erreur : die Hand → die Hände.
         La règle vraie ne porte pas sur le genre mais sur la TERMINAISON, et
         l'exception vient après la règle, jamais avant. */
      idea: "Le féminin ajoute le plus souvent -n ou -en.",
      detail: "C'est le moule le plus régulier des trois, et donc le plus reposant. Les mots en <b>-e</b> prennent simplement <b>-n</b> ; les autres prennent <b>-en</b>. Et un pluriel en <b>-n</b> ou <b>-en</b> ne prend <u>jamais</u> de tréma — ça, c'est sans exception. Quelques féminins courts font autrement, avec <b>-e</b> et un tréma : <b>die Hand → die Hände</b>, <b>die Nacht → die Nächte</b>, <b>die Stadt → die Städte</b>.",
      table: [["die Blume", "die Blumen"], ["die Lampe", "die Lampen"], ["die Frau", "die Frauen"], ["die Zeitung", "die Zeitungen"]],
      check: { q: "Le pluriel de <b>die Frau</b> est…", o: ["die Frauen", "die Fraue", "die Fräuen"], a: 0, why: "Féminin sans <b>-e</b> final → <b>-en</b>. Et un pluriel en <b>-en</b> ne prend jamais de tréma." }
    },
    {
      idea: "Deux moules à part : ceux qui ne bougent pas, et ceux en -s.",
      detail: "Les mots déjà terminés par <b>-er</b> ou <b>-en</b> ne changent pas : seul l'article trahit le pluriel. Et les mots venus de l'étranger prennent un <b>-s</b>, comme en français.",
      table: [["der Lehrer", "die Lehrer — inchangé"], ["das Messer", "die Messer — inchangé"], ["das Auto", "die Autos"], ["das Foto", "die Fotos"]],
      check: { q: "Comment sait-on que <b>die Lehrer</b> est un pluriel ?", o: ["grâce à l'article die", "grâce au -er", "on ne peut pas le savoir"], a: 0, why: "Le mot ne bouge pas : c'est <b>die</b> qui porte toute l'information." }
    },
    {
      idea: "Un dernier point, juste pour le savoir : l'article change aussi selon le rôle du mot.",
      detail: "<b>Der Hund</b> quand le chien fait l'action, <b>den Hund</b> quand il la subit. L'allemand appelle ça les <b>cas</b>. Ne cherche pas à les retenir maintenant — sache seulement que <b>der</b> n'est pas la seule forme possible. On s'en occupe pour de bon à l'étape 13.",
      gloss: { de: ["Ich", "sehe", "den", "Hund"], fr: ["Je", "vois", "le", "chien"] }
    }
  ],
  examples: [
    { d: "Ein Buch, zwei Bücher.", f: "Un livre, deux livres." },
    { d: "Die Kinder sind hier.", f: "Les enfants sont ici." },
    { d: "Die Häuser sind groß.", f: "Les maisons sont grandes." },
    { d: "Die Frauen heißen Anna und Maria.", f: "Les femmes s'appellent Anna et Maria." },
    { d: "Die Tische sind neu.", f: "Les tables sont neuves." },
    { d: "Die Blumen sind schön.", f: "Les fleurs sont belles." },
    { d: "Die Autos sind sehr groß.", f: "Les voitures sont très grandes." },
    { d: "Die Lehrer sind freundlich.", f: "Les professeurs sont aimables." },
    { d: "Die Männer sind hier.", f: "Les hommes sont ici." },
    { d: "Die Zeitungen sind interessant.", f: "Les journaux sont intéressants." },
    { d: "Ein Kind, viele Kinder.", f: "Un enfant, beaucoup d'enfants." },
    { d: "Die Bücher und die Blumen sind schön.", f: "Les livres et les fleurs sont beaux." }
  ],
  vocab: [
    { d: "die Kinder", f: "les enfants", p: "dii KINN-deur" },
    { d: "die Bücher", f: "les livres", p: "dii BU-kheur" },
    { d: "die Häuser", f: "les maisons", p: "dii HOÏ-zeur" },
    { d: "die Frauen", f: "les femmes", p: "dii FRAOU-eunn" },
    { d: "die Männer", f: "les hommes", p: "dii MÈ-neur" },
    { d: "die Tische", f: "les tables", p: "dii TI-che" },
    { d: "die Blumen", f: "les fleurs", p: "dii BLOU-meunn" },
    { d: "die Autos", f: "les voitures", p: "dii AOU-tos" },
    { d: "die Lehrer", f: "les professeurs", p: "dii LÉ-reur" },
    { d: "viele", f: "beaucoup de", p: "FII-le" }
  ],
  quiz: [
    { q: "Au pluriel, l'article est toujours…", o: ["die", "der", "das", "den"], a: 0, why: "Quel que soit le genre au singulier, le pluriel prend <b>die</b>." },
    { q: "Le pluriel de <b>das Kind</b> est…", o: ["die Kinder", "die Kinde", "die Kinden", "die Kinds"], a: 0, why: "Neutre → <b>-er</b>." },
    { q: "Le pluriel de <b>die Blume</b> est…", o: ["die Blumen", "die Blumer", "die Blume", "die Blumes"], a: 0, why: "Féminin en <b>-e</b> → on ajoute simplement <b>-n</b>." },
    /* Cette question en remplace une FAUSSE, signalée par Exsangue le
       02/08/2026 : « quel genre ne prend jamais de tréma au pluriel ? »,
       dont la réponse attendue était « le féminin ». C'est faux — die Hand →
       die Hände, die Nacht → die Nächte, die Stadt → die Städte. Les trois
       genres prennent le tréma. L'app se contredisait d'ailleurs elle-même :
       l'étape 34 enseigne « Nacht prend un tréma au pluriel ».
       La vraie règle porte sur la TERMINAISON, pas sur le genre — et
       celle-ci, elle, ne souffre pas d'exception. */
    { q: "Quelle terminaison de pluriel ne prend <i>jamais</i> de tréma ?", o: ["-en / -n", "-e", "-er", "aucune : le tréma est libre"], a: 0, why: "Un pluriel en <b>-en</b> ou <b>-n</b> n'a jamais de tréma : <b>die Frau → die Frauen</b>, <b>die Blume → die Blumen</b>. Les pluriels en <b>-e</b> et <b>-er</b>, eux, en prennent souvent — et dans <i>les trois genres</i> : <b>die Nacht → die Nächte</b> est féminin, <b>das Buch → die Bücher</b> est neutre." },
    { q: "Le pluriel de <b>das Auto</b> est…", o: ["die Autos", "die Autoer", "die Auten", "die Auto"], a: 0, why: "Mot venu de l'étranger → <b>-s</b>, comme en français." }
  ],
  drills: [
    { t: "gap", f: "Les livres sont neufs.", s: "Die ___ sind neu.", a: "Bücher", why: "Neutre → <b>-er</b>, avec tréma : <b>Bücher</b>." },
    { t: "gap", f: "Les enfants sont ici.", s: "Die ___ sind hier.", a: "Kinder", why: "Neutre → <b>-er</b>. Pas de tréma possible sur un <b>i</b>." },
    { t: "gap", f: "Les femmes s'appellent Anna et Maria.", s: "Die ___ heißen Anna und Maria.", a: "Frauen", why: "Féminin sans <b>-e</b> final → <b>-en</b>." },
    { t: "gap", f: "Les fleurs sont belles.", s: "Die ___ sind schön.", a: "Blumen", why: "Féminin en <b>-e</b> → simple <b>-n</b>." },
    { t: "gap", f: "Les tables sont grandes.", s: "Die ___ sind groß.", a: "Tische", why: "Masculin court → <b>-e</b>." },
    { t: "gap", f: "Deux voitures sont ici.", s: "Zwei ___ sind hier.", a: "Autos", why: "Mot étranger → <b>-s</b>." },
    { t: "gap", f: "Les journaux sont intéressants.", s: "Die ___ sind interessant.", a: "Zeitungen", why: "Féminin en <b>-ung</b> → <b>-en</b>." },
    { t: "gap", f: "Beaucoup de maisons sont ici.", s: "Viele ___ sind hier.", a: "Häuser", why: "<b>Haus</b> → <b>Häuser</b> : le <b>a</b> prend un tréma." },
    { t: "gap", f: "Les professeurs sont ici.", s: "Die ___ sind hier.", a: "Lehrer", why: "Déjà en <b>-er</b> : le mot ne bouge pas, seul l'article change." },
    { t: "gap", f: "Deux hommes et une femme.", s: "Zwei ___ und eine Frau.", a: "Männer", why: "<b>Mann</b> → <b>Männer</b> : tréma sur le <b>a</b>." },
    { t: "gap", f: "Les enfants sont ici.", s: "Die Kinder ___ hier.", a: "sind", why: "Au pluriel, <b>sein</b> donne <b>sind</b>." },

    { t: "trans", inst: "Mets au pluriel.", from: "Das Buch ist neu.", a: "Die Bücher sind neu.",
      why: "Article, nom et verbe changent tous les trois." },
    { t: "trans", inst: "Mets au pluriel.", from: "Die Frau ist hier.", a: "Die Frauen sind hier.",
      why: "L'article ne bouge pas — il était déjà <b>die</b> — mais le nom et le verbe, si." },
    { t: "trans", inst: "Mets au pluriel.", from: "Der Tisch ist groß.", a: "Die Tische sind groß.",
      why: "<b>der</b> devient <b>die</b>, et le masculin prend <b>-e</b>." },
    { t: "trans", inst: "Mets au pluriel.", from: "Das Kind ist hier.", a: "Die Kinder sind hier.",
      why: "Neutre → <b>-er</b>." },
    { t: "trans", inst: "Mets au pluriel.", from: "Die Blume ist schön.", a: "Die Blumen sind schön.",
      why: "Féminin en <b>-e</b> → <b>-n</b>." },
    { t: "trans", inst: "Mets au pluriel.", from: "Das Auto ist neu.", a: "Die Autos sind neu.",
      why: "Mot étranger → <b>-s</b>." },
    { t: "trans", inst: "Reviens au singulier.", from: "Die Häuser sind groß.", a: "Das Haus ist groß.",
      why: "Le chemin inverse : on retire <b>-er</b> et le tréma, et l'article redevient <b>das</b>." },
    { t: "trans", inst: "Reviens au singulier.", from: "Die Männer sind hier.", a: "Der Mann ist hier.",
      why: "<b>Männer</b> → <b>Mann</b>, et <b>die</b> redevient <b>der</b>." },

    { t: "order", f: "Les enfants sont ici.", a: "Die Kinder sind hier",
      why: "Article, nom, verbe, puis le reste." },
    { t: "order", f: "Les maisons sont grandes.", a: "Die Häuser sind groß",
      why: "Après <b>sind</b>, l'adjectif ne change pas de forme." },
    { t: "order", f: "Un livre, deux livres.", a: "Ein Buch zwei Bücher",
      why: "Le singulier prend <b>ein</b>, le pluriel n'a pas d'article indéfini." },
    { t: "order", f: "Les fleurs sont belles.", a: "Die Blumen sind schön",
      why: "Féminin pluriel en <b>-n</b>." },
    { t: "order", f: "Beaucoup d'enfants sont ici.", a: "Viele Kinder sind hier",
      why: "<b>viele</b> se met directement devant le pluriel, sans article." },

    { t: "trad", f: "Les livres sont neufs.", a: "Die Bücher sind neu.",
      why: "<b>Buch</b> → <b>Bücher</b>." },
    { t: "trad", f: "Les enfants sont ici.", a: "Die Kinder sind hier.",
      why: "Neutre → <b>-er</b>." },
    { t: "trad", f: "Les femmes sont aimables.", a: "Die Frauen sind freundlich.",
      why: "Féminin → <b>-en</b>." },
    { t: "trad", f: "Les tables sont grandes.", a: "Die Tische sind groß.",
      why: "Masculin → <b>-e</b>." },
    { t: "trad", f: "Les voitures sont neuves.", a: "Die Autos sind neu.",
      why: "Mot étranger → <b>-s</b>." },
    { t: "trad", f: "Beaucoup de livres.", a: "Viele Bücher.",
      why: "<b>viele</b> + pluriel, sans article." }
  ]
},

/* ------------------------------- ÉTAPE 7 ------------------------------
   Unité 6 du livre (p.13-14) — les nombres cardinaux ET ordinaux.
   Repris de l'ancienne étape 4 (git 8883587), qui s'arrêtait à 20 et
   parlait de l'âge. Deux corrections : le livre monte jusqu'à 10 000 et
   consacre une page aux ordinaux, absents de l'app ; et l'âge n'est pas
   dans cette unité — il relève de « haben », donc de l'étape 8. */
{
  day: 7, title: "Les nombres", de: "Eins, zwei, drei",
  steps: [
    {
      idea: "De 0 à 12, il n'y a rien à comprendre : ça s'apprend.",
      detail: "null, eins, zwei, drei, vier, fünf, sechs, sieben, acht, neun, zehn, elf, zwölf. Écoute-les plutôt que de les lire — appuie sur le bouton d'écoute."
    },
    {
      idea: "De 13 à 19, c'est l'unité collée à zehn (dix).",
      detail: "<b>drei</b>zehn (13), <b>vier</b>zehn (14), <b>fünf</b>zehn (15). Deux abrègent au passage : <b>sech</b>zehn (16) perd son <b>s</b>, et <b>sieb</b>zehn (17) perd son <b>en</b>.",
      check: { q: "Comment dit-on 14 ?", o: ["vierzehn", "vierzig", "zehnvier"], a: 0, why: "<b>vierzehn</b> = 14. Attention : <b>vierzig</b> = 40. Une syllabe change tout." }
    },
    {
      idea: "Les dizaines se terminent toutes par -zig. Sauf une.",
      detail: "<b>zwanzig</b> (20), <b>vierzig</b> (40), <b>fünfzig</b> (50)… mais <b>dreißig</b> (30) s'écrit avec <b>-ßig</b>. C'est la seule de la série. Note aussi que 60 et 70 abrègent, comme 16 et 17 : <b>sechzig</b>, <b>siebzig</b>.",
      table: [["20 · zwanzig", "40 · vierzig"], ["30 · dreißig", "50 · fünfzig"], ["60 · sechzig", "70 · siebzig"], ["80 · achtzig", "90 · neunzig"]],
      check: { q: "Comment s'écrit 30 ?", o: ["dreißig", "dreizig", "dreizehn"], a: 0, why: "<b>dreißig</b>, avec un <b>ß</b> — la seule dizaine à ne pas prendre <b>-zig</b>." }
    },
    {
      idea: "À partir de 21, les unités passent DEVANT les dizaines.",
      detail: "21 se dit <b>einundzwanzig</b>, mot à mot « un-et-vingt ». C'est déroutant au début, et c'est le piège classique quand un Allemand dicte un numéro de téléphone. Tout s'écrit en un seul mot, sans espace.",
      gloss: { de: ["ein", "und", "zwanzig"], fr: ["un", "et", "vingt"] },
      check: { q: "Un Allemand dit « siebenundsechzig ». Tu écris…", o: ["67", "76", "66"], a: 0, why: "sieben (7) et sechzig (60) : on entend le 7 d'abord, mais on écrit <b>67</b>." }
    },
    {
      idea: "Au-delà, deux mots suffisent : hundert et tausend.",
      detail: "<b>hundert</b> (100), <b>tausend</b> (1000). On les combine comme en français : <b>zweihundert</b> (200), <b>dreitausend</b> (3000), <b>zehntausend</b> (10 000). Et tout reste collé en un seul mot, aussi long soit-il.",
      table: [["100", "hundert"], ["200", "zweihundert"], ["1000", "tausend"], ["10 000", "zehntausend"]],
      check: { q: "Comment dit-on 200 ?", o: ["zweihundert", "hundertzwei", "zweizehnhundert"], a: 0, why: "Le multiplicateur passe devant : <b>zwei</b> + <b>hundert</b>. (<b>hundertzwei</b>, lui, vaut 102.)" }
    },
    {
      idea: "Premier, deuxième, troisième : on ajoute -te, puis -ste.",
      detail: "Jusqu'à 19, on ajoute <b>-te</b> au nombre. À partir de 20, on ajoute <b>-ste</b>. Trois irréguliers à connaître, ce sont les plus fréquents : <b>erste</b> (1er), <b>dritte</b> (3e) et <b>siebte</b> (7e).",
      table: [["1er", "erste — irrégulier"], ["2e", "zweite"], ["3e", "dritte — irrégulier"], ["20e", "zwanzigste"]],
      check: { q: "Comment dit-on « le troisième » ?", o: ["der dritte", "der dreite", "der dreizehnte"], a: 0, why: "<b>drei</b> devient <b>dritte</b> — l'un des trois irréguliers, avec <b>erste</b> et <b>siebte</b>." }
    }
  ],
  examples: [
    { d: "Eins, zwei, drei, vier, fünf.", f: "Un, deux, trois, quatre, cinq." },
    { d: "Ich habe zwei Kinder.", f: "J'ai deux enfants." },
    { d: "Das kostet fünfundzwanzig Euro.", f: "Ça coûte vingt-cinq euros." },
    { d: "Der Bus kommt um sieben.", f: "Le bus arrive à sept heures." },
    { d: "Dreißig und zehn ist vierzig.", f: "Trente et dix font quarante." },
    { d: "Das Buch hat hundert Seiten.", f: "Le livre a cent pages." },
    { d: "Ich habe siebenundsechzig Euro.", f: "J'ai soixante-sept euros." },
    { d: "Heute ist der erste Mai.", f: "Aujourd'hui, c'est le premier mai." },
    { d: "Das ist mein zweites Buch.", f: "C'est mon deuxième livre." },
    { d: "Zweihundert Kinder sind hier.", f: "Deux cents enfants sont ici." },
    { d: "Sechzehn und siebzehn.", f: "Seize et dix-sept." },
    { d: "Tausend Blumen!", f: "Mille fleurs !" }
  ],
  vocab: [
    { d: "null", f: "zéro", p: "NOUL" },
    { d: "fünf", f: "cinq", p: "FUNNF" },
    { d: "zehn", f: "dix", p: "TSÉÉNN" },
    { d: "zwölf", f: "douze", p: "TSVEULF" },
    { d: "zwanzig", f: "vingt", p: "TSVANN-tsich" },
    { d: "dreißig", f: "trente", p: "DRAÏ-sich" },
    { d: "hundert", f: "cent", p: "HOUNN-deurt" },
    { d: "tausend", f: "mille", p: "TAOU-zennt" },
    { d: "der erste", f: "le premier", p: "dèr ÈR-ste" },
    { d: "der zweite", f: "le deuxième", p: "dèr TSVAÏ-te" }
  ],
  quiz: [
    { q: "Comment dit-on 21 ?", o: ["einundzwanzig", "zwanzigundeins", "zwanzigeins", "einzwanzig"], a: 0, why: "L'unité d'abord, puis <b>und</b>, puis la dizaine — le tout en un seul mot." },
    { q: "Quelle dizaine ne se termine PAS par -zig ?", o: ["30 · dreißig", "40 · vierzig", "60 · sechzig", "90 · neunzig"], a: 0, why: "<b>dreißig</b> s'écrit avec <b>-ßig</b>. C'est la seule." },
    { q: "Un Allemand dicte « siebenundsechzig ». C'est…", o: ["67", "76", "66", "77"], a: 0, why: "On entend l'unité en premier, mais on écrit <b>67</b>." },
    { q: "Comment dit-on 200 ?", o: ["zweihundert", "hundertzwei", "zweizehnhundert", "hundertzwanzig"], a: 0, why: "Le multiplicateur passe devant. <b>hundertzwei</b> vaudrait 102." },
    { q: "Pour former un ordinal à partir de 20, on ajoute…", o: ["-ste", "-te", "-zig", "-zehn"], a: 0, why: "<b>-te</b> jusqu'à 19, <b>-ste</b> à partir de 20 : <b>zwanzigste</b>." }
  ],
  drills: [
    { t: "gap", f: "quatorze", s: "14 = ___", a: "vierzehn", why: "Unité + <b>zehn</b>. Ne pas confondre avec <b>vierzig</b> (40)." },
    { t: "gap", f: "seize", s: "16 = ___", a: "sechzehn", why: "<b>sechs</b> perd son <b>s</b> devant <b>zehn</b>." },
    { t: "gap", f: "dix-sept", s: "17 = ___", a: "siebzehn", why: "<b>sieben</b> perd son <b>en</b>." },
    { t: "gap", f: "trente", s: "30 = ___", a: "dreißig", why: "La seule dizaine en <b>-ßig</b> et non <b>-zig</b>." },
    { t: "gap", f: "quarante", s: "40 = ___", a: "vierzig", why: "Les dizaines prennent <b>-zig</b>." },
    { t: "gap", f: "soixante", s: "60 = ___", a: "sechzig", why: "Comme <b>sechzehn</b>, <b>sechs</b> perd son <b>s</b>." },
    { t: "gap", f: "vingt et un", s: "21 = ___", a: "einundzwanzig", why: "L'unité, <b>und</b>, puis la dizaine — en un seul mot." },
    { t: "gap", f: "deux cents", s: "200 = ___", a: "zweihundert", why: "Le multiplicateur passe devant <b>hundert</b>." },
    { t: "gap", f: "dix mille", s: "10 000 = ___", a: "zehntausend", why: "Même logique : <b>zehn</b> + <b>tausend</b>." },
    { t: "gap", f: "le premier", s: "der 1. = der ___", a: "erste", why: "Irrégulier : <b>eins</b> ne donne pas <b>einste</b>." },
    { t: "gap", f: "le troisième", s: "der 3. = der ___", a: "dritte", why: "Irrégulier aussi : <b>drei</b> donne <b>dritte</b>." },
    { t: "gap", f: "le vingtième", s: "der 20. = der ___", a: "zwanzigste", why: "À partir de 20, l'ordinal prend <b>-ste</b>." },
    { t: "gap", f: "le quatrième", s: "der 4. = der ___", a: "vierte", why: "Jusqu'à 19, l'ordinal prend <b>-te</b>." },

    { t: "trans", inst: "Écris le nombre en chiffres.", from: "siebenundsechzig", a: "67",
      why: "sieben (7) + sechzig (60) : l'unité s'entend en premier, mais s'écrit en second." },
    { t: "trans", inst: "Écris le nombre en chiffres.", from: "einundzwanzig", a: "21",
      why: "ein (1) + zwanzig (20)." },
    { t: "trans", inst: "Écris le nombre en chiffres.", from: "dreiundvierzig", a: "43",
      why: "drei (3) + vierzig (40)." },
    { t: "trans", inst: "Écris le nombre en lettres.", from: "35", a: "fünfunddreißig",
      why: "fünf + und + dreißig, collés." },
    { t: "trans", inst: "Écris le nombre en lettres.", from: "52", a: "zweiundfünfzig",
      why: "L'unité passe devant : zwei + und + fünfzig." },
    { t: "trans", inst: "Passe du cardinal à l'ordinal.", from: "zwei", a: "zweite",
      why: "Jusqu'à 19, on ajoute <b>-te</b>." },
    { t: "trans", inst: "Passe du cardinal à l'ordinal.", from: "drei", a: "dritte",
      why: "Irrégulier — à retenir tel quel." },
    { t: "trans", inst: "Passe du cardinal à l'ordinal.", from: "zwanzig", a: "zwanzigste",
      why: "À partir de 20, on ajoute <b>-ste</b>." },

    { t: "order", f: "J'ai deux enfants.", a: "Ich habe zwei Kinder",
      why: "Le nombre se place juste devant le nom." },
    { t: "order", f: "Le livre a cent pages.", a: "Das Buch hat hundert Seiten",
      why: "<b>hundert</b> s'emploie seul, sans <b>ein</b> devant." },
    { t: "order", f: "Aujourd'hui, c'est le premier mai.", a: "Heute ist der erste Mai",
      why: "L'ordinal prend l'article, comme en français." },
    { t: "order", f: "Deux cents enfants sont ici.", a: "Zweihundert Kinder sind hier",
      why: "<b>zweihundert</b> reste un seul mot." },
    { t: "order", f: "Ça coûte vingt-cinq euros.", a: "Das kostet fünfundzwanzig Euro",
      why: "<b>Euro</b> ne prend pas de <b>s</b> après un nombre." },

    { t: "trad", f: "Un, deux, trois.", a: "Eins, zwei, drei.",
      why: "Les trois premiers, à savoir sans réfléchir." },
    { t: "trad", f: "Vingt et un.", a: "Einundzwanzig.",
      why: "L'unité devant, tout collé." },
    { t: "trad", f: "Trente.", a: "Dreißig.",
      why: "Avec un <b>ß</b> — l'exception des dizaines." },
    { t: "trad", f: "Cent.", a: "Hundert.",
      why: "Sans article devant, contrairement au français « une centaine »." },
    { t: "trad", f: "Mille fleurs !", a: "Tausend Blumen!",
      why: "<b>tausend</b> s'emploie seul, et <b>Blume</b> fait <b>Blumen</b> au pluriel." },
    { t: "trad", f: "Le premier.", a: "Der erste.",
      why: "Irrégulier." },
    { t: "trad", f: "Le deuxième.", a: "Der zweite.",
      why: "Régulier : <b>zwei</b> + <b>-te</b>." }
  ]
},

/* ------------------------------- ÉTAPE 8 ------------------------------
   Unité 7 du livre (p.15-16) — à quoi servent « sein » et « haben ».
   L'unité dit à quoi ils SERVENT ; l'unité 8, juste après, donne les
   conjugaisons. On garde ce découpage, qui est bon : on comprend l'usage
   avant d'avaler deux tableaux.

   ⚠️ Le livre se trompe sur un point, et on ne le recopie pas : il range
   l'âge du côté de « haben ». C'est vrai en français (« j'ai 25 ans »),
   en italien et en espagnol — mais faux en allemand, qui dit
   « ich BIN 25 Jahre alt ». L'écran 4 en fait justement un point d'appui. */
{
  day: 8, title: "Être et avoir", de: "Ich bin, ich habe",
  steps: [
    {
      idea: "Deux verbes portent presque toute la langue : sein et haben.",
      detail: "<b>sein</b> = être, <b>haben</b> = avoir. Ce sont les deux verbes les plus fréquents de l'allemand, et ils servent à bien plus que ce que leur traduction laisse croire. Ici on voit à quoi ils servent ; leurs conjugaisons complètes arrivent à l'étape suivante.",
      gloss: { de: ["Ich", "bin", "müde"], fr: ["Je", "suis", "fatigué"] }
    },
    {
      idea: "sein dit ce que quelqu'un EST : son état, son métier.",
      detail: "Comme en français. Et une bonne surprise au passage : devant un métier, l'allemand ne met <b>aucun article</b>. On dit <b>Er ist Arzt</b>, jamais « er ist ein Arzt ».",
      table: [["Ich bin müde.", "Je suis fatigué."], ["Er ist Arzt.", "Il est médecin."], ["Wir sind glücklich.", "Nous sommes heureux."]],
      check: { q: "« Elle est professeure » se dit…", o: ["Sie ist Lehrerin", "Sie ist eine Lehrerin", "Sie hat Lehrerin"], a: 0, why: "Pas d'article devant un métier : <b>Sie ist Lehrerin</b>." }
    },
    {
      idea: "sein sert aussi à situer : où est une chose, comment il fait.",
      detail: "C'est le verbe de la position et de l'existence. <b>Das Buch ist hier</b>. Et pour la météo, l'allemand emploie <b>es ist</b>, comme le français « il fait » : <b>Es ist kalt</b> — il fait froid.",
      gloss: { de: ["Es", "ist", "kalt", "heute"], fr: ["Il", "fait", "froid", "aujourd'hui"] }
    },
    {
      idea: "Attention, piège : l'âge se dit avec sein, pas avec avoir.",
      detail: "Le français dit « j'ai 25 ans ». L'allemand dit <b>ich bin 25 Jahre alt</b> — mot à mot « je suis vieux de 25 ans ». C'est l'une des fautes les plus fréquentes des francophones, justement parce que la traduction mot à mot semble marcher.",
      gloss: { de: ["Ich", "bin", "25", "Jahre", "alt"], fr: ["Je", "suis", "25", "ans", "vieux"] },
      check: { q: "« J'ai trente ans » se dit…", o: ["Ich bin dreißig Jahre alt", "Ich habe dreißig Jahre", "Ich habe dreißig Jahre alt"], a: 0, why: "Avec <b>sein</b>. <b>Ich habe dreißig Jahre</b> est un calque du français, et se remarque tout de suite." }
    },
    {
      idea: "haben dit ce qu'on POSSÈDE.",
      detail: "Là, aucune surprise : <b>Ich habe ein Auto</b>, <b>Er hat einen Hund</b>. C'est l'usage principal du verbe, et il se comporte comme en français.",
      gloss: { de: ["Ich", "habe", "ein", "Auto"], fr: ["J'", "ai", "une", "voiture"] }
    },
    {
      idea: "Et haben sert aux sensations, là où le français dit aussi « avoir ».",
      detail: "<b>Hunger haben</b> (avoir faim), <b>Durst haben</b> (avoir soif), <b>Angst haben</b> (avoir peur). Ici, les deux langues se rejoignent — et le nom s'emploie sans article.",
      table: [["Ich habe Hunger.", "J'ai faim."], ["Ich habe Durst.", "J'ai soif."], ["Ich habe Angst.", "J'ai peur."]],
      check: { q: "« J'ai faim » se dit…", o: ["Ich habe Hunger", "Ich bin Hunger", "Ich habe einen Hunger"], a: 0, why: "Avec <b>haben</b>, et sans article devant <b>Hunger</b>." }
    }
  ],
  examples: [
    { d: "Ich bin müde.", f: "Je suis fatigué." },
    { d: "Er ist Arzt.", f: "Il est médecin." },
    { d: "Wir sind sehr glücklich.", f: "Nous sommes très heureux." },
    { d: "Es ist kalt heute.", f: "Il fait froid aujourd'hui." },
    { d: "Ich bin dreißig Jahre alt.", f: "J'ai trente ans." },
    { d: "Wie alt bist du?", f: "Quel âge as-tu ?" },
    { d: "Ich habe ein Auto.", f: "J'ai une voiture." },
    { d: "Sie hat zwei Kinder.", f: "Elle a deux enfants." },
    { d: "Ich habe Hunger und Durst.", f: "J'ai faim et soif." },
    { d: "Das Buch ist hier.", f: "Le livre est ici." },
    { d: "Meine Arbeit ist interessant.", f: "Mon travail est intéressant." },
    { d: "Hast du Angst?", f: "As-tu peur ?" }
  ],
  vocab: [
    { d: "müde", f: "fatigué", p: "MU-de" },
    { d: "der Arzt", f: "le médecin", p: "dèr AARTST" },
    { d: "alt", f: "vieux, âgé", p: "ALT" },
    { d: "das Jahr", f: "l'année, l'an", p: "das YAAR" },
    { d: "Hunger haben", f: "avoir faim", p: "HOUNN-gueur HAA-benn" },
    { d: "Durst haben", f: "avoir soif", p: "DOURST HAA-benn" },
    { d: "Angst haben", f: "avoir peur", p: "ANGST HAA-benn" },
    { d: "das Auto", f: "la voiture", p: "das AOU-to" },
    { d: "glücklich", f: "heureux", p: "GLUK-lich" },
    { d: "die Arbeit", f: "le travail", p: "dii AR-baït" }
  ],
  quiz: [
    { q: "« J'ai vingt ans » se dit…", o: ["Ich bin zwanzig Jahre alt", "Ich habe zwanzig Jahre", "Ich habe zwanzig Jahre alt", "Ich bin zwanzig Jahre"], a: 0, why: "L'âge se dit avec <b>sein</b> : mot à mot « je suis vieux de vingt ans »." },
    { q: "« Il est médecin » se dit…", o: ["Er ist Arzt", "Er ist ein Arzt", "Er hat Arzt", "Er ist der Arzt"], a: 0, why: "Aucun article devant un métier." },
    { q: "« J'ai faim » se dit…", o: ["Ich habe Hunger", "Ich bin Hunger", "Ich bin hungrig alt", "Ich habe einen Hunger"], a: 0, why: "Avec <b>haben</b>, et sans article." },
    { q: "« Il fait froid » se dit…", o: ["Es ist kalt", "Es hat kalt", "Es macht kalt", "Er ist kalt"], a: 0, why: "L'allemand emploie <b>sein</b> là où le français dit « il fait »." },
    { q: "Lequel de ces usages relève de <b>haben</b> ?", o: ["la possession", "l'âge", "le métier", "la météo"], a: 0, why: "Les trois autres passent tous par <b>sein</b> — c'est le piège de cette étape." }
  ],
  drills: [
    { t: "gap", f: "Je suis fatigué.", s: "Ich ___ müde.", a: "bin", why: "Un état → <b>sein</b>." },
    { t: "gap", f: "J'ai une voiture.", s: "Ich ___ ein Auto.", a: "habe", why: "Une possession → <b>haben</b>." },
    { t: "gap", f: "J'ai trente ans.", s: "Ich ___ dreißig Jahre alt.", a: "bin", why: "L'âge → <b>sein</b>, malgré le français." },
    { t: "gap", f: "Il est médecin.", s: "Er ___ Arzt.", a: "ist", why: "Un métier → <b>sein</b>, et sans article." },
    { t: "gap", f: "J'ai faim.", s: "Ich ___ Hunger.", a: "habe", why: "Une sensation → <b>haben</b>." },
    { t: "gap", f: "Il fait froid.", s: "Es ___ kalt.", a: "ist", why: "La météo → <b>sein</b>." },
    { t: "gap", f: "Elle a deux enfants.", s: "Sie ___ zwei Kinder.", a: "hat", why: "Possession, 3ᵉ personne : <b>hat</b>." },
    { t: "gap", f: "Nous sommes heureux.", s: "Wir ___ glücklich.", a: "sind", why: "Un état, au pluriel : <b>sind</b>." },
    { t: "gap", f: "As-tu peur ?", s: "___ du Angst?", a: "Hast", why: "Sensation → <b>haben</b>, 2ᵉ personne : <b>hast</b>." },
    { t: "gap", f: "Quel âge as-tu ?", s: "Wie alt ___ du?", a: "bist", why: "Encore l'âge, donc <b>sein</b> : <b>bist</b>." },
    { t: "gap", f: "Le livre est ici.", s: "Das Buch ___ hier.", a: "ist", why: "Une position → <b>sein</b>." },
    { t: "gap", f: "J'ai soif.", s: "Ich habe ___.", a: "Durst", why: "Sans article, comme <b>Hunger</b> et <b>Angst</b>." },

    { t: "trans", inst: "Corrige ce calque du français.", from: "Ich habe zwanzig Jahre.", a: "Ich bin zwanzig Jahre alt.",
      why: "L'âge passe par <b>sein</b>, et <b>alt</b> est obligatoire." },
    { t: "trans", inst: "Corrige : un métier ne prend pas d'article.", from: "Er ist ein Arzt.", a: "Er ist Arzt.",
      why: "On retire simplement <b>ein</b>." },
    { t: "trans", inst: "Mets à la troisième personne (er).", from: "Ich habe ein Auto.", a: "Er hat ein Auto.",
      why: "<b>ich habe</b> devient <b>er hat</b>." },
    { t: "trans", inst: "Mets à la troisième personne (sie).", from: "Ich bin müde.", a: "Sie ist müde.",
      why: "<b>ich bin</b> devient <b>sie ist</b>." },
    { t: "trans", inst: "Transforme en question.", from: "Du hast Hunger.", a: "Hast du Hunger?",
      why: "On inverse le verbe et le sujet." },
    { t: "trans", inst: "Mets au pluriel (wir).", from: "Ich bin glücklich.", a: "Wir sind glücklich.",
      why: "<b>bin</b> devient <b>sind</b> ; l'adjectif ne bouge pas." },
    { t: "trans", inst: "Remplace la possession par une sensation.", from: "Ich habe ein Auto.", a: "Ich habe Hunger.",
      why: "Même verbe, mais le nom perd son article." },

    { t: "order", f: "Je suis très fatigué.", a: "Ich bin sehr müde",
      why: "<b>sehr</b> se place devant l'adjectif." },
    { t: "order", f: "J'ai trente ans.", a: "Ich bin dreißig Jahre alt",
      why: "L'ordre est figé : <b>bin</b> + nombre + <b>Jahre alt</b>." },
    { t: "order", f: "Elle a deux enfants.", a: "Sie hat zwei Kinder",
      why: "Sujet, verbe, puis ce qu'on possède." },
    { t: "order", f: "Il fait froid aujourd'hui.", a: "Es ist kalt heute",
      why: "<b>es ist</b> pour la météo." },
    { t: "order", f: "Mon travail est intéressant.", a: "Meine Arbeit ist interessant",
      why: "<b>Arbeit</b> est féminin, d'où <b>meine</b>." },
    { t: "order", f: "As-tu faim ?", a: "Hast du Hunger",
      why: "Verbe en tête pour une question sans mot interrogatif." },

    { t: "trad", f: "Je suis fatigué.", a: "Ich bin müde.",
      why: "Un état → <b>sein</b>." },
    { t: "trad", f: "J'ai une voiture.", a: "Ich habe ein Auto.",
      why: "Une possession → <b>haben</b>." },
    { t: "trad", f: "J'ai vingt ans.", a: "Ich bin zwanzig Jahre alt.",
      why: "Le piège de l'étape : l'âge se dit avec <b>sein</b>." },
    { t: "trad", f: "Il est médecin.", a: "Er ist Arzt.",
      why: "Sans article devant le métier." },
    { t: "trad", f: "J'ai faim.", a: "Ich habe Hunger.",
      why: "Sensation → <b>haben</b>, sans article." },
    { t: "trad", f: "Il fait froid.", a: "Es ist kalt.",
      why: "La météo passe par <b>sein</b>." },
    { t: "trad", f: "Quel âge as-tu ?", a: "Wie alt bist du?",
      why: "Mot à mot « comment vieux es-tu ? »." },
    { t: "trad", f: "Nous sommes heureux.", a: "Wir sind glücklich.",
      why: "<b>wir</b> prend <b>sind</b>." }
  ]
},

/* ------------------------------- ÉTAPE 9 ------------------------------
   Unité 8 du livre (p.17) — sein et haben au présent.
   L'unité la plus courte du niveau : deux tableaux, rien d'autre. Le
   livre a raison de la séparer de l'unité 7 — on a vu à quoi servent ces
   verbes, on peut maintenant avaler les formes sans se demander pourquoi.
   Tables reprises des anciennes étapes 1 et 5 (git 8883587). */
{
  day: 9, title: "Être et avoir au présent", de: "bin, bist, ist…",
  steps: [
    {
      idea: "Voici sein en entier. Six formes, aucune ne se devine.",
      detail: "C'est le verbe le plus irrégulier de la langue — comme « être » en français, qui donne je <b>suis</b>, tu <b>es</b>, nous <b>sommes</b>. Il n'y a rien à comprendre, seulement à répéter jusqu'à ce que ça vienne tout seul.",
      table: [["ich", "bin"], ["du", "bist"], ["er / sie / es", "ist"], ["wir", "sind"], ["ihr", "seid"], ["sie / Sie", "sind"]],
      check: { q: "« Tu es » se dit…", o: ["du bist", "du bin", "du ist"], a: 0, why: "Avec <b>du</b>, la forme est toujours <b>bist</b>." }
    },
    {
      idea: "Un repère pour retenir sein : sind revient deux fois.",
      detail: "<b>wir sind</b> et <b>sie/Sie sind</b> sont identiques. Ça vaut pour presque tous les verbes allemands, et ça réduit le travail : sur six formes, il n'y en a que cinq à retenir. Seul <b>ihr seid</b> est vraiment isolé — et c'est le seul qui s'écrit sans <b>n</b>.",
      check: { q: "Quelle forme partage-t-elle avec <b>wir sind</b> ?", o: ["sie sind", "ihr seid", "du bist"], a: 0, why: "<b>wir</b> et <b>sie/Sie</b> prennent toujours la même forme, quel que soit le verbe." }
    },
    {
      idea: "Voici haben. Plus calme : quatre formes sur six sont régulières.",
      detail: "<b>habe</b>, <b>haben</b>, <b>habt</b>, <b>haben</b> suivent le moule ordinaire des verbes, qu'on verra à l'étape 11. Le radical est <b>hab-</b>, et on lui colle les terminaisons habituelles.",
      table: [["ich", "habe"], ["du", "hast"], ["er / sie / es", "hat"], ["wir", "haben"], ["ihr", "habt"], ["sie / Sie", "haben"]],
      check: { q: "« Nous avons » se dit…", o: ["wir haben", "wir habt", "wir hast"], a: 0, why: "<b>wir</b> prend la forme longue <b>haben</b>, identique à l'infinitif." }
    },
    {
      idea: "Les deux seules surprises de haben : du hast et er hat.",
      detail: "On attendrait <b>du habst</b> et <b>er habt</b>. En réalité le <b>b</b> disparaît : <b>du hast</b>, <b>er hat</b>. Ce sont les deux seules formes à apprendre à part — le reste suit la règle.",
      check: { q: "« Il a » se dit…", o: ["er hat", "er habt", "er habe"], a: 0, why: "Le <b>b</b> tombe : <b>er hat</b>. <b>er habt</b> n'existe pas." }
    },
    {
      idea: "Une habitude à prendre tout de suite : le vouvoiement copie le pluriel.",
      detail: "<b>Sie sind</b>, <b>Sie haben</b> — le <b>Sie</b> poli prend exactement la forme de « ils/elles », avec sa majuscule en plus. Une règle apprise une fois, valable pour tous les verbes de la langue.",
      gloss: { de: ["Sind", "Sie", "Herr", "Weber"], fr: ["Êtes", "vous", "Monsieur", "Weber"] }
    }
  ],
  examples: [
    { d: "Ich bin müde nach dem langen Tag.", f: "Je suis fatigué après la longue journée." },
    { d: "Wir sind heute Abend zu Hause.", f: "Nous sommes à la maison ce soir." },
    { d: "Er hat zwei Geschwister.", f: "Il a deux frères et sœurs." },
    { d: "Die Blumen sind auf dem Tisch.", f: "Les fleurs sont sur la table." },
    { d: "Meine Eltern sind sehr nett.", f: "Mes parents sont très gentils." },
    { d: "Du hast viele Bücher.", f: "Tu as beaucoup de livres." },
    { d: "Die Katze ist schwarz und weiß.", f: "Le chat est noir et blanc." },
    { d: "Ihr seid immer pünktlich.", f: "Vous êtes toujours ponctuels." },
    { d: "Sie haben einen Hund und eine Katze.", f: "Ils ont un chien et un chat." },
    { d: "Der Film ist sehr spannend.", f: "Le film est très passionnant." },
    { d: "Sind Sie Herr Weber?", f: "Êtes-vous Monsieur Weber ?" },
    { d: "Habt ihr Zeit?", f: "Avez-vous le temps ?" }
  ],
  vocab: [
    { d: "der Student", f: "l'étudiant", p: "dèr chtou-DENNT" },
    { d: "die Geschwister", f: "les frères et sœurs", p: "dii gue-CHVIS-teur" },
    { d: "nett", f: "gentil", p: "NÈTT" },
    { d: "pünktlich", f: "ponctuel", p: "PUNKT-lich" },
    { d: "die Katze", f: "le chat", p: "dii KA-tse" },
    { d: "der Hund", f: "le chien", p: "dèr HOUNNT" },
    { d: "spannend", f: "passionnant", p: "CHPA-nennt" },
    { d: "zu Hause", f: "à la maison", p: "tsou HAOU-ze" },
    { d: "die Eltern", f: "les parents", p: "dii ÈL-teurn" },
    { d: "immer", f: "toujours", p: "I-meur" }
  ],
  quiz: [
    { q: "Complète : Du ___ Student.", o: ["bist", "bin", "seid", "ist"], a: 0, why: "Avec <b>du</b>, <b>sein</b> donne toujours <b>bist</b>." },
    { q: "Complète : Er ___ zwei Geschwister.", o: ["hat", "habt", "habe", "hast"], a: 0, why: "3ᵉ personne du singulier : le <b>b</b> tombe → <b>hat</b>." },
    { q: "Quelle forme de <b>sein</b> s'écrit sans <b>n</b> ?", o: ["ihr seid", "wir sind", "sie sind", "er ist"], a: 0, why: "<b>seid</b> est la seule — et c'est aussi la plus oubliée." },
    { q: "« Vous êtes » (poli) se dit…", o: ["Sie sind", "Sie seid", "Sie ist", "Sie bist"], a: 0, why: "Le <b>Sie</b> poli copie toujours le pluriel : <b>sind</b>." },
    { q: "Combien de formes différentes <b>sein</b> a-t-il au présent ?", o: ["cinq", "six", "quatre", "trois"], a: 0, why: "Six cases, mais <b>sind</b> occupe deux d'entre elles : cinq formes à retenir." }
  ],
  drills: [
    { t: "gap", f: "Je suis fatigué.", s: "Ich ___ müde.", a: "bin", why: "<b>ich</b> → <b>bin</b>." },
    { t: "gap", f: "Tu es étudiant.", s: "Du ___ Student.", a: "bist", why: "<b>du</b> → <b>bist</b>." },
    { t: "gap", f: "Il est gentil.", s: "Er ___ nett.", a: "ist", why: "<b>er / sie / es</b> → <b>ist</b>." },
    { t: "gap", f: "Nous sommes à la maison.", s: "Wir ___ zu Hause.", a: "sind", why: "<b>wir</b> → <b>sind</b>." },
    { t: "gap", f: "Vous êtes toujours ponctuels.", s: "Ihr ___ immer pünktlich.", a: "seid", why: "<b>ihr</b> → <b>seid</b>, la seule forme sans <b>n</b>." },
    { t: "gap", f: "Êtes-vous Monsieur Weber ?", s: "___ Sie Herr Weber?", a: "Sind", why: "Le <b>Sie</b> poli prend <b>sind</b>." },
    { t: "gap", f: "J'ai un chien.", s: "Ich ___ einen Hund.", a: "habe", why: "<b>ich</b> → <b>habe</b>." },
    { t: "gap", f: "Tu as beaucoup de livres.", s: "Du ___ viele Bücher.", a: "hast", why: "Le <b>b</b> tombe : <b>hast</b>." },
    { t: "gap", f: "Il a deux frères et sœurs.", s: "Er ___ zwei Geschwister.", a: "hat", why: "Le <b>b</b> tombe aussi : <b>hat</b>." },
    { t: "gap", f: "Nous avons le temps.", s: "Wir ___ Zeit.", a: "haben", why: "<b>wir</b> prend la forme longue." },
    { t: "gap", f: "Avez-vous le temps ?", s: "___ ihr Zeit?", a: "Habt", why: "<b>ihr</b> → <b>habt</b>." },
    { t: "gap", f: "Ils ont un chat.", s: "Sie ___ eine Katze.", a: "haben", why: "Pluriel → forme longue." },
    { t: "gap", f: "Mes parents sont gentils.", s: "Meine Eltern ___ nett.", a: "sind", why: "<b>Eltern</b> est toujours pluriel." },

    { t: "trans", inst: "Mets à la deuxième personne (du).", from: "Ich bin Student.", a: "Du bist Student.",
      why: "<b>bin</b> devient <b>bist</b>." },
    { t: "trans", inst: "Mets à la troisième personne (er).", from: "Ich habe einen Hund.", a: "Er hat einen Hund.",
      why: "<b>habe</b> devient <b>hat</b>." },
    { t: "trans", inst: "Passe au pluriel (wir).", from: "Ich bin müde.", a: "Wir sind müde.",
      why: "<b>bin</b> devient <b>sind</b>." },
    { t: "trans", inst: "Passe au pluriel (wir).", from: "Ich habe Zeit.", a: "Wir haben Zeit.",
      why: "<b>habe</b> devient <b>haben</b>." },
    { t: "trans", inst: "Passe du tutoiement au vouvoiement.", from: "Bist du Herr Weber?", a: "Sind Sie Herr Weber?",
      why: "Le <b>Sie</b> poli prend <b>sind</b>, avec sa majuscule." },
    { t: "trans", inst: "Transforme en question.", from: "Ihr habt Zeit.", a: "Habt ihr Zeit?",
      why: "On inverse le verbe et le sujet." },
    { t: "trans", inst: "Corrige la faute.", from: "Er habt zwei Kinder.", a: "Er hat zwei Kinder.",
      why: "<b>habt</b> est la forme de <b>ihr</b>. Avec <b>er</b>, c'est <b>hat</b>." },
    { t: "trans", inst: "Corrige la faute.", from: "Ihr sind pünktlich.", a: "Ihr seid pünktlich.",
      why: "<b>ihr</b> a sa forme propre : <b>seid</b>." },

    { t: "order", f: "Nous sommes à la maison ce soir.", a: "Wir sind heute Abend zu Hause",
      why: "Le complément de temps avant le complément de lieu." },
    { t: "order", f: "Il a deux frères et sœurs.", a: "Er hat zwei Geschwister",
      why: "Sujet, verbe, complément." },
    { t: "order", f: "Vous êtes toujours ponctuels.", a: "Ihr seid immer pünktlich",
      why: "<b>immer</b> se place entre le verbe et l'adjectif." },
    { t: "order", f: "Le film est très passionnant.", a: "Der Film ist sehr spannend",
      why: "<b>sehr</b> devant l'adjectif." },
    { t: "order", f: "Mes parents sont très gentils.", a: "Meine Eltern sind sehr nett",
      why: "<b>Eltern</b> est pluriel, d'où <b>sind</b>." },

    { t: "trad", f: "Je suis fatigué.", a: "Ich bin müde.",
      why: "<b>ich</b> → <b>bin</b>." },
    { t: "trad", f: "Tu as beaucoup de livres.", a: "Du hast viele Bücher.",
      why: "<b>du</b> → <b>hast</b>, sans <b>b</b>." },
    { t: "trad", f: "Il est gentil.", a: "Er ist nett.",
      why: "<b>er</b> → <b>ist</b>." },
    { t: "trad", f: "Nous avons le temps.", a: "Wir haben Zeit.",
      why: "<b>wir</b> → <b>haben</b>." },
    { t: "trad", f: "Vous êtes toujours ponctuels.", a: "Ihr seid immer pünktlich.",
      why: "<b>ihr</b> → <b>seid</b>." },
    { t: "trad", f: "Êtes-vous Monsieur Weber ?", a: "Sind Sie Herr Weber?",
      why: "Le vouvoiement copie le pluriel." },
    { t: "trad", f: "Le chat est noir.", a: "Die Katze ist schwarz.",
      why: "<b>Katze</b> est féminin." }
  ]
},

/* ------------------------------- ÉTAPE 10 -----------------------------
   Unité 9 du livre (p.18) — les couleurs.
   Une page seulement dans le livre, mais l'occasion de poser une règle
   qui vaut pour TOUS les adjectifs : après « sein », ils ne changent
   jamais. Devant un nom, c'est une autre affaire — et c'est l'étape 17.
   Une partie du contenu vient de l'ancienne étape 8 (git 8883587). */
{
  day: 10, title: "Les couleurs", de: "Welche Farbe?",
  steps: [
    {
      idea: "Une couleur, c'est un adjectif. Et après sein, il ne bouge jamais.",
      detail: "<b>Das Auto ist rot.</b> <b>Die Blume ist rot.</b> <b>Die Autos sind rot.</b> — masculin, féminin, pluriel : <b>rot</b> reste <b>rot</b>. C'est le plus grand repos que l'allemand t'offre, profites-en.",
      gloss: { de: ["Das", "Auto", "ist", "rot"], fr: ["La", "voiture", "est", "rouge"] },
      check: { q: "« Les fleurs sont rouges » se dit…", o: ["Die Blumen sind rot", "Die Blumen sind rote", "Die Blumen sind roten"], a: 0, why: "Après <b>sein</b>, l'adjectif ne prend aucune terminaison, même au pluriel." }
    },
    {
      idea: "Voici les couleurs de base.",
      detail: "Quatre d'entre elles se reconnaissent presque toutes seules : <b>blau</b>, <b>braun</b>, <b>grün</b> et <b>orange</b> ressemblent au français ou à l'anglais.",
      table: [["weiß", "blanc"], ["schwarz", "noir"], ["rot", "rouge"], ["blau", "bleu"], ["grün", "vert"], ["gelb", "jaune"]],
      check: { q: "<b>gelb</b> veut dire…", o: ["jaune", "vert", "gris", "bleu"], a: 0, why: "<b>gelb</b> = jaune. Ne pas le confondre avec <b>grün</b>, vert, ni <b>grau</b>, gris." }
    },
    {
      idea: "Et les autres, plus faciles encore.",
      detail: "<b>grau</b> (gris), <b>braun</b> (marron), <b>rosa</b> (rose), <b>violett</b> (violet), <b>beige</b> (beige), <b>orange</b> (orange). Attention : <b>weiß</b> s'écrit avec un <b>ß</b>, et <b>schwarz</b> se prononce « chvarts ».",
      table: [["grau", "gris"], ["braun", "marron"], ["rosa", "rose"], ["violett", "violet"]]
    },
    {
      idea: "Pour demander une couleur : Welche Farbe hat…?",
      detail: "Mot à mot « quelle couleur a… ? ». L'allemand emploie <b>haben</b> là où le français dirait « de quelle couleur est ». <b>die Farbe</b> = la couleur.",
      gloss: { de: ["Welche", "Farbe", "hat", "dein", "Auto"], fr: ["Quelle", "couleur", "a", "ta", "voiture"] },
      check: { q: "Pour demander la couleur d'une chose, on emploie…", o: ["haben", "sein", "machen"], a: 0, why: "<b>Welche Farbe hat…?</b> — avec <b>haben</b>, contrairement au français." }
    },
    {
      idea: "Ta couleur préférée : Lieblings- collé devant le mot.",
      detail: "<b>Lieblings-</b> se colle à n'importe quel nom pour dire « préféré ». <b>die Lieblingsfarbe</b> (la couleur préférée), <b>das Lieblingsbuch</b> (le livre préféré). Un seul mot, sans trait d'union — c'est très allemand.",
      gloss: { de: ["Meine", "Lieblingsfarbe", "ist", "grün"], fr: ["Ma", "couleur préférée", "est", "vert"] },
      check: { q: "Comment dit-on « mon livre préféré » ?", o: ["mein Lieblingsbuch", "mein Liebling Buch", "mein liebstes Buch"], a: 0, why: "<b>Lieblings-</b> se colle directement : <b>Lieblingsbuch</b>, en un mot." }
    }
  ],
  examples: [
    { d: "Das Auto ist rot.", f: "La voiture est rouge." },
    { d: "Welche Farbe hat dein T-Shirt?", f: "De quelle couleur est ton tee-shirt ?" },
    { d: "Es ist blau.", f: "Il est bleu." },
    { d: "Meine Lieblingsfarbe ist grün.", f: "Ma couleur préférée est le vert." },
    { d: "Die Katze ist schwarz und weiß.", f: "Le chat est noir et blanc." },
    { d: "Die Blumen sind gelb.", f: "Les fleurs sont jaunes." },
    { d: "Der Hund ist braun.", f: "Le chien est marron." },
    { d: "Mein Pullover ist grau.", f: "Mon pull est gris." },
    { d: "Grün ist sehr schön.", f: "Le vert est très beau." },
    { d: "Die Häuser sind weiß.", f: "Les maisons sont blanches." },
    { d: "Ich liebe Blau.", f: "J'aime le bleu." },
    { d: "Das Buch ist rot und das Auto ist blau.", f: "Le livre est rouge et la voiture est bleue." }
  ],
  vocab: [
    { d: "die Farbe", f: "la couleur", p: "dii FAR-be" },
    { d: "weiß", f: "blanc", p: "VAÏSS" },
    { d: "schwarz", f: "noir", p: "CHVARTS" },
    { d: "rot", f: "rouge", p: "ROOT" },
    { d: "blau", f: "bleu", p: "BLAOU" },
    { d: "gelb", f: "jaune", p: "GUÈLP" },
    { d: "grau", f: "gris", p: "GRAOU" },
    { d: "braun", f: "marron", p: "BRAOUN" },
    { d: "der Pullover", f: "le pull", p: "dèr pou-LO-veur" },
    { d: "die Lieblingsfarbe", f: "la couleur préférée", p: "dii LIIP-lings-far-be" }
  ],
  quiz: [
    { q: "« Les fleurs sont rouges » se dit…", o: ["Die Blumen sind rot", "Die Blumen sind rote", "Die Blumen sind roten", "Die Blumen rot sind"], a: 0, why: "Après <b>sein</b>, l'adjectif ne prend jamais de terminaison." },
    { q: "<b>gelb</b> veut dire…", o: ["jaune", "vert", "gris", "bleu"], a: 0, why: "<b>gelb</b> = jaune, <b>grün</b> = vert, <b>grau</b> = gris." },
    { q: "Comment demande-t-on la couleur d'une chose ?", o: ["Welche Farbe hat…?", "Welche Farbe ist…?", "Wie Farbe hat…?", "Was Farbe ist…?"], a: 0, why: "Avec <b>haben</b> : mot à mot « quelle couleur a… ? »." },
    { q: "« Ma couleur préférée » se dit…", o: ["meine Lieblingsfarbe", "meine Liebling Farbe", "mein Lieblingsfarbe", "meine liebste Farbe"], a: 0, why: "<b>Lieblings-</b> se colle au nom, et <b>Farbe</b> est féminin → <b>meine</b>." },
    { q: "Quelle couleur s'écrit avec un <b>ß</b> ?", o: ["weiß", "schwarz", "grau", "gelb"], a: 0, why: "<b>weiß</b> — qu'on peut aussi écrire <b>weiss</b>." }
  ],
  drills: [
    { t: "gap", f: "La voiture est rouge.", s: "Das Auto ist ___.", a: "rot", why: "Après <b>sein</b>, aucune terminaison." },
    { t: "gap", f: "Le chat est noir.", s: "Die Katze ist ___.", a: "schwarz", why: "Se prononce « chvarts »." },
    { t: "gap", f: "Les maisons sont blanches.", s: "Die Häuser sind ___.", a: "weiß", why: "Même au pluriel, l'adjectif ne bouge pas." },
    { t: "gap", f: "Mon pull est gris.", s: "Mein Pullover ist ___.", a: "grau", why: "<b>grau</b> = gris, à ne pas confondre avec <b>grün</b>." },
    { t: "gap", f: "Les fleurs sont jaunes.", s: "Die Blumen sind ___.", a: "gelb", why: "<b>gelb</b> = jaune." },
    { t: "gap", f: "Le chien est marron.", s: "Der Hund ist ___.", a: "braun", why: "Proche de l'anglais <i>brown</i>." },
    { t: "gap", f: "De quelle couleur est ton pull ?", s: "Welche ___ hat dein Pullover?", a: "Farbe", why: "<b>die Farbe</b> = la couleur." },
    { t: "gap", f: "De quelle couleur est ton pull ?", s: "Welche Farbe ___ dein Pullover?", a: "hat", why: "L'allemand emploie <b>haben</b>, pas <b>sein</b>." },
    { t: "gap", f: "Ma couleur préférée est le vert.", s: "Meine ___ ist grün.", a: "Lieblingsfarbe", why: "<b>Lieblings-</b> collé à <b>Farbe</b>, en un seul mot." },
    { t: "gap", f: "Le livre est bleu.", s: "Das Buch ist ___.", a: "blau", why: "Proche de l'anglais <i>blue</i>." },

    { t: "trans", inst: "Mets au pluriel.", from: "Die Blume ist rot.", a: "Die Blumen sind rot.",
      why: "Le nom et le verbe changent — la couleur, non." },
    { t: "trans", inst: "Mets au pluriel.", from: "Das Haus ist weiß.", a: "Die Häuser sind weiß.",
      why: "<b>weiß</b> reste identique au pluriel." },
    { t: "trans", inst: "Change la couleur en bleu.", from: "Das Auto ist rot.", a: "Das Auto ist blau.",
      why: "Seul l'adjectif change de mot, jamais de forme." },
    { t: "trans", inst: "Transforme en question sur la couleur.", from: "Dein Pullover ist grau.", a: "Welche Farbe hat dein Pullover?",
      why: "<b>Welche Farbe hat…?</b> — avec <b>haben</b>." },
    { t: "trans", inst: "Mets à la troisième personne (er).", from: "Ich habe einen roten Pullover.", a: "Er hat einen roten Pullover.",
      why: "<b>habe</b> devient <b>hat</b> ; l'adjectif devant le nom, lui, garde sa terminaison — c'est l'étape 17." },
    { t: "trans", inst: "Dis que c'est ta couleur préférée.", from: "Grün ist schön.", a: "Grün ist meine Lieblingsfarbe.",
      why: "<b>Farbe</b> est féminin → <b>meine</b>." },

    { t: "order", f: "La voiture est rouge.", a: "Das Auto ist rot",
      why: "Article, nom, verbe, adjectif." },
    { t: "order", f: "Ma couleur préférée est le vert.", a: "Meine Lieblingsfarbe ist grün",
      why: "<b>Lieblingsfarbe</b> compte pour un seul mot." },
    { t: "order", f: "De quelle couleur est ton tee-shirt ?", a: "Welche Farbe hat dein T-Shirt",
      why: "Le groupe interrogatif prend la place 1, le verbe la place 2." },
    { t: "order", f: "Le chat est noir et blanc.", a: "Die Katze ist schwarz und weiß",
      why: "<b>und</b> relie deux adjectifs sans rien changer." },
    { t: "order", f: "Les maisons sont blanches.", a: "Die Häuser sind weiß",
      why: "Pluriel : <b>die</b> et <b>sind</b>." },
    { t: "order", f: "Mon pull est gris.", a: "Mein Pullover ist grau",
      why: "<b>Pullover</b> est masculin → <b>mein</b>." },

    { t: "trad", f: "La voiture est rouge.", a: "Das Auto ist rot.",
      why: "<b>Auto</b> est neutre." },
    { t: "trad", f: "Les fleurs sont jaunes.", a: "Die Blumen sind gelb.",
      why: "L'adjectif ne prend pas de marque de pluriel." },
    { t: "trad", f: "Le chat est noir et blanc.", a: "Die Katze ist schwarz und weiß.",
      why: "Deux adjectifs, aucune terminaison." },
    { t: "trad", f: "Ma couleur préférée est le bleu.", a: "Meine Lieblingsfarbe ist blau.",
      why: "<b>Lieblings-</b> collé au nom." },
    { t: "trad", f: "De quelle couleur est ton pull ?", a: "Welche Farbe hat dein Pullover?",
      why: "Avec <b>haben</b>." },
    { t: "trad", f: "Le chien est marron.", a: "Der Hund ist braun.",
      why: "<b>Hund</b> est masculin." },
    { t: "trad", f: "Les maisons sont blanches.", a: "Die Häuser sind weiß.",
      why: "<b>Haus</b> → <b>Häuser</b> au pluriel." }
  ]
},

/* ------------------------------- ÉTAPE 11 -----------------------------
   Unité 10 du livre (p.19-20) — les verbes réguliers.
   Le vrai moteur de la langue : une fois ces six terminaisons sues, on
   conjugue la grande majorité des verbes allemands sans rien réapprendre.
   Le « -e d'appui » n'est pas dans le livre, mais sans lui « du arbeitst »
   est imprononçable — on le donne, c'est du service, pas de l'invention. */
{
  day: 11, title: "Les verbes réguliers", de: "Ich lerne Deutsch.",
  steps: [
    {
      idea: "Un verbe, c'est une racine qui ne bouge pas et une terminaison qui change.",
      detail: "L'infinitif se termine presque toujours par <b>-en</b> : <b>spielen</b> (jouer). Retire ce <b>-en</b> et il reste la racine, <b>spiel-</b>. C'est elle qui porte le sens, et elle ne bougera plus.",
      gloss: { de: ["spiel", "-en"], fr: ["la racine", "la terminaison"] }
    },
    {
      idea: "Six terminaisons, et c'est tout.",
      detail: "Apprends-les une fois, elles resserviront pour des centaines de verbes. Deux se répètent : <b>wir</b> et <b>sie/Sie</b> reprennent l'infinitif, et <b>er</b> et <b>ihr</b> partagent le <b>-t</b>.",
      table: [["ich", "-e"], ["du", "-st"], ["er / sie / es", "-t"], ["wir", "-en"], ["ihr", "-t"], ["sie / Sie", "-en"]],
      check: { q: "Avec <b>du</b>, la terminaison est…", o: ["-st", "-t", "-en"], a: 0, why: "<b>du spielst</b>, <b>du lernst</b>, <b>du kaufst</b> — la marque de <b>du</b>, c'est <b>-st</b>. Un verbe dont la racine finit déjà par un son « s » ne garde que le <b>-t</b> : <b>du heißt</b>." }
    },
    {
      idea: "Voici le moule appliqué à trois verbes.",
      detail: "Regarde bien : la racine ne change jamais. Seule la fin bouge, et exactement de la même façon dans les trois colonnes.",
      table: [["ich", "spiele · lerne · kaufe"], ["du", "spielst · lernst · kaufst"], ["er", "spielt · lernt · kauft"], ["wir", "spielen · lernen · kaufen"], ["ihr", "spielt · lernt · kauft"], ["sie", "spielen · lernen · kaufen"]],
      check: { q: "« Nous achetons » se dit…", o: ["wir kaufen", "wir kauft", "wir kaufst"], a: 0, why: "<b>wir</b> reprend la forme de l'infinitif : <b>kaufen</b>." }
    },
    {
      idea: "Un détail de prononciation : le -e d'appui.",
      detail: "Quand la racine finit déjà par <b>t</b> ou <b>d</b>, on glisse un <b>e</b> avant la terminaison — sinon c'est imprononçable. <b>arbeiten</b> (travailler) donne <b>du arbeit<u>e</u>st</b> et <b>er arbeit<u>e</u>t</b>, jamais « arbeitst ». Essaie de dire les deux à voix haute, tu comprendras pourquoi.",
      check: { q: "« Tu travailles » se dit…", o: ["du arbeitest", "du arbeitst", "du arbeitt"], a: 0, why: "La racine <b>arbeit-</b> finit par un <b>t</b> : il faut le <b>-e</b> d'appui." }
    },
    {
      idea: "Le présent allemand vaut aussi pour le futur proche.",
      detail: "<b>Ich lerne morgen Deutsch</b> veut dire « j'apprendrai l'allemand demain ». Là où le français change le verbe, l'allemand garde le présent et laisse le mot de temps faire le travail. Un temps de moins à apprendre.",
      gloss: { de: ["Ich", "kaufe", "morgen", "ein", "Buch"], fr: ["J'", "achèterai", "demain", "un", "livre"] }
    }
  ],
  examples: [
    { d: "Ich lerne Deutsch.", f: "J'apprends l'allemand." },
    { d: "Du spielst oft im Park.", f: "Tu joues souvent dans le parc." },
    { d: "Er lernt Englisch in der Schule.", f: "Il apprend l'anglais à l'école." },
    { d: "Wir kaufen ein neues Auto.", f: "Nous achetons une nouvelle voiture." },
    { d: "Ihr spielt gerne Fußball.", f: "Vous jouez volontiers au football." },
    { d: "Sie kaufen die Tickets für das Konzert.", f: "Ils achètent les billets pour le concert." },
    { d: "Meine Schwester spielt immer draußen.", f: "Ma sœur joue toujours dehors." },
    { d: "Ich kaufe eine Jacke im Winter.", f: "J'achète une veste en hiver." },
    { d: "Du lernst schnell neue Dinge.", f: "Tu apprends vite de nouvelles choses." },
    { d: "Er lernt jeden Tag neue Vokabeln.", f: "Il apprend chaque jour du vocabulaire." },
    { d: "Wir arbeiten heute zu Hause.", f: "Nous travaillons à la maison aujourd'hui." },
    { d: "Du arbeitest sehr gut.", f: "Tu travailles très bien." }
  ],
  vocab: [
    { d: "spielen", f: "jouer", p: "CHPII-lenn" },
    { d: "lernen", f: "apprendre", p: "LÈR-nenn" },
    { d: "kaufen", f: "acheter", p: "KAOU-fenn" },
    { d: "arbeiten", f: "travailler", p: "AR-baï-tenn" },
    { d: "wohnen", f: "habiter", p: "VOO-nenn" },
    { d: "machen", f: "faire", p: "MA-khenn" },
    { d: "kommen", f: "venir", p: "KO-menn" },
    { d: "die Jacke", f: "la veste", p: "dii YA-ke" },
    { d: "das Konzert", f: "le concert", p: "das konn-TSÈRT" },
    { d: "jeden Tag", f: "chaque jour", p: "YÉ-denn TAAK" }
  ],
  quiz: [
    { q: "Comment trouve-t-on la racine d'un verbe ?", o: ["on retire le -en de l'infinitif", "on retire la première lettre", "on ajoute -e", "on met une majuscule"], a: 0, why: "<b>spielen</b> moins <b>-en</b> donne <b>spiel-</b>. C'est cette racine qui ne bouge plus." },
    { q: "Complète : Du ___ oft im Park. (spielen)", o: ["spielst", "spielt", "spielen", "spiele"], a: 0, why: "Avec <b>du</b>, la marque est <b>-st</b>." },
    { q: "Quelles deux personnes partagent la même forme ?", o: ["wir et sie/Sie", "ich et du", "du et ihr", "er et wir"], a: 0, why: "<b>wir</b> et <b>sie/Sie</b> reprennent l'infinitif. Ça vaut pour presque tous les verbes." },
    { q: "« Tu travailles » se dit…", o: ["du arbeitest", "du arbeitst", "du arbeitet", "du arbeite"], a: 0, why: "La racine finit par <b>t</b> : il faut le <b>-e</b> d'appui, sinon c'est imprononçable." },
    { q: "« Ich kaufe morgen ein Buch » veut dire…", o: ["J'achèterai un livre demain", "J'ai acheté un livre hier", "J'achète des livres le matin", "Je voudrais acheter un livre"], a: 0, why: "Le présent allemand sert aussi au futur proche. <b>morgen</b> suffit à situer." }
  ],
  drills: [
    { t: "gap", f: "Je joue dans le parc.", s: "Ich ___ im Park.", a: "spiele", why: "<b>ich</b> → <b>-e</b>." },
    { t: "gap", f: "Tu apprends l'allemand.", s: "Du ___ Deutsch.", a: "lernst", why: "<b>du</b> → <b>-st</b>." },
    { t: "gap", f: "Il achète un livre.", s: "Er ___ ein Buch.", a: "kauft", why: "<b>er</b> → <b>-t</b>." },
    { t: "gap", f: "Nous jouons au football.", s: "Wir ___ Fußball.", a: "spielen", why: "<b>wir</b> reprend l'infinitif." },
    { t: "gap", f: "Vous apprenez vite.", s: "Ihr ___ schnell.", a: "lernt", why: "<b>ihr</b> → <b>-t</b>, comme <b>er</b>." },
    { t: "gap", f: "Ils achètent une voiture.", s: "Sie ___ ein Auto.", a: "kaufen", why: "Pluriel → forme de l'infinitif." },
    { t: "gap", f: "Tu travailles bien.", s: "Du ___ gut.", a: "arbeitest", why: "Racine en <b>t</b> → <b>-e</b> d'appui." },
    { t: "gap", f: "Il travaille aujourd'hui.", s: "Er ___ heute.", a: "arbeitet", why: "Même raison : <b>arbeit</b> + <b>e</b> + <b>t</b>." },
    { t: "gap", f: "J'habite à Berlin.", s: "Ich ___ in Berlin.", a: "wohne", why: "<b>wohnen</b> est régulier." },
    { t: "gap", f: "Que fais-tu ?", s: "Was ___ du?", a: "machst", why: "<b>machen</b> → <b>du machst</b>." },

    { t: "trans", inst: "Mets à la deuxième personne (du).", from: "Ich spiele Fußball.", a: "Du spielst Fußball.",
      why: "<b>-e</b> devient <b>-st</b>." },
    { t: "trans", inst: "Mets à la troisième personne (er).", from: "Ich lerne Deutsch.", a: "Er lernt Deutsch.",
      why: "<b>-e</b> devient <b>-t</b>." },
    { t: "trans", inst: "Passe au pluriel (wir).", from: "Ich kaufe ein Buch.", a: "Wir kaufen ein Buch.",
      why: "<b>wir</b> reprend l'infinitif." },
    { t: "trans", inst: "Passe à ihr.", from: "Du spielst gern.", a: "Ihr spielt gern.",
      why: "<b>ihr</b> prend <b>-t</b>." },
    { t: "trans", inst: "Mets au vouvoiement.", from: "Du lernst schnell.", a: "Sie lernen schnell.",
      why: "Le <b>Sie</b> poli copie le pluriel." },
    { t: "trans", inst: "Corrige la faute.", from: "Du arbeitst viel.", a: "Du arbeitest viel.",
      why: "Il manque le <b>-e</b> d'appui après la racine en <b>t</b>." },
    { t: "trans", inst: "Transforme en question.", from: "Du kaufst ein Auto.", a: "Kaufst du ein Auto?",
      why: "Verbe en tête, sujet derrière." },

    { t: "order", f: "J'apprends l'allemand.", a: "Ich lerne Deutsch",
      why: "Sujet, verbe, complément." },
    { t: "order", f: "Tu joues souvent dans le parc.", a: "Du spielst oft im Park",
      why: "L'adverbe se glisse après le verbe." },
    { t: "order", f: "Nous achetons une nouvelle voiture.", a: "Wir kaufen ein neues Auto",
      why: "<b>Auto</b> est neutre, d'où <b>ein neues</b>." },
    { t: "order", f: "Il apprend chaque jour du vocabulaire.", a: "Er lernt jeden Tag neue Vokabeln",
      why: "Le complément de temps avant le complément d'objet." },
    { t: "order", f: "Vous jouez volontiers au football.", a: "Ihr spielt gerne Fußball",
      why: "<b>gerne</b> se place juste après le verbe." },
    { t: "order", f: "Tu travailles très bien.", a: "Du arbeitest sehr gut",
      why: "<b>sehr</b> devant l'adverbe." },

    { t: "trad", f: "J'apprends l'allemand.", a: "Ich lerne Deutsch.",
      why: "<b>ich</b> → <b>-e</b>." },
    { t: "trad", f: "Tu joues dans le parc.", a: "Du spielst im Park.",
      why: "<b>du</b> → <b>-st</b>." },
    { t: "trad", f: "Il achète une veste.", a: "Er kauft eine Jacke.",
      why: "<b>Jacke</b> est féminin → <b>eine</b>." },
    { t: "trad", f: "Nous habitons à Berlin.", a: "Wir wohnen in Berlin.",
      why: "<b>wir</b> reprend l'infinitif." },
    { t: "trad", f: "Vous apprenez vite.", a: "Ihr lernt schnell.",
      why: "<b>ihr</b> → <b>-t</b>." },
    { t: "trad", f: "Tu travailles beaucoup.", a: "Du arbeitest viel.",
      why: "Le <b>-e</b> d'appui est obligatoire." },
    { t: "trad", f: "J'achèterai un livre demain.", a: "Ich kaufe morgen ein Buch.",
      why: "Présent + <b>morgen</b> suffit pour le futur proche." }
  ]
},

/* ------------------------------- ÉTAPE 12 -----------------------------
   Unité 11 du livre (p.21-23) — les verbes irréguliers.
   Le livre en aligne vingt-deux ; on ne les récite pas, on donne les
   trois familles de changement de voyelle. Un verbe qui suit une règle
   se retient, une liste de vingt-deux ne se retient pas. */
{
  day: 12, title: "Les verbes qui changent", de: "Du sprichst gut!",
  steps: [
    {
      idea: "Certains verbes changent leur voyelle en cours de route.",
      detail: "Ils sont peu nombreux mais très fréquents — parler, lire, manger, prendre, dormir. La bonne nouvelle : les terminaisons, elles, ne changent pas. C'est le moule de l'étape précédente qui s'applique.",
      gloss: { de: ["Ich", "spreche", "·", "du", "sprichst"], fr: ["Je", "parle", "·", "tu", "parles"] }
    },
    {
      idea: "Le changement ne touche que deux personnes.",
      detail: "<b>du</b> et <b>er / sie / es</b>. Toutes les autres gardent la voyelle de l'infinitif. C'est la seule chose à surveiller, et elle est au même endroit pour tous ces verbes.",
      table: [["ich spreche", "voyelle d'origine"], ["du sprichst", "&#9888; changée"], ["er spricht", "&#9888; changée"], ["wir sprechen", "voyelle d'origine"], ["ihr sprecht", "voyelle d'origine"], ["sie sprechen", "voyelle d'origine"]],
      check: { q: "Où la voyelle change-t-elle ?", o: ["à du et er/sie/es", "à ich et wir", "partout", "à ihr seulement"], a: 0, why: "Seulement à la 2ᵉ et à la 3ᵉ personne du singulier." }
    },
    {
      idea: "Première famille : e devient i.",
      detail: "La plus fournie. <b>sprechen</b> → du sprichst · <b>essen</b> → du isst · <b>geben</b> → du gibst · <b>helfen</b> → du hilfst · <b>treffen</b> → du triffst · <b>vergessen</b> → du vergisst.",
      table: [["sprechen", "du sprichst · er spricht"], ["essen", "du isst · er isst"], ["geben", "du gibst · er gibt"], ["helfen", "du hilfst · er hilft"]],
      check: { q: "« Il mange » se dit…", o: ["er isst", "er esst", "er essen"], a: 0, why: "<b>essen</b> change son <b>e</b> en <b>i</b> : <b>er isst</b>." }
    },
    {
      idea: "Deuxième famille : e devient ie, un i long.",
      detail: "<b>lesen</b> → du liest · <b>sehen</b> → du siehst · <b>empfehlen</b> → du empfiehlst. La différence avec la famille précédente s'entend : le <b>i</b> traîne.",
      table: [["lesen", "du liest · er liest"], ["sehen", "du siehst · er sieht"], ["empfehlen", "du empfiehlst · er empfiehlt"]],
      check: { q: "« Tu lis » se dit…", o: ["du liest", "du list", "du lest"], a: 0, why: "<b>lesen</b> passe à <b>ie</b> : <b>du liest</b>, avec un i long." }
    },
    {
      idea: "Troisième famille : a prend un tréma.",
      detail: "<b>fahren</b> → du fährst · <b>schlafen</b> → du schläfst · <b>tragen</b> → du trägst · <b>laufen</b> → du läufst · <b>fallen</b> → du fällst. Le mot ne change pas de forme, il prend seulement deux points.",
      table: [["fahren", "du fährst · er fährt"], ["schlafen", "du schläfst · er schläft"], ["tragen", "du trägst · er trägt"], ["laufen", "du läufst · er läuft"]],
      check: { q: "« Elle dort » se dit…", o: ["sie schläft", "sie schlaft", "sie schlieft"], a: 0, why: "<b>a</b> prend un tréma : <b>schläft</b>." }
    },
    {
      idea: "Et un cas à part, qu'il vaut mieux apprendre tel quel : nehmen.",
      detail: "<b>nehmen</b> (prendre) change plus que les autres : <b>du nimmst</b>, <b>er nimmt</b>. La voyelle change ET la consonne double. Il n'y a pas de règle à en tirer — c'est un mot à retenir, et il est trop utile pour l'éviter.",
      check: { q: "« Il prend le bus » se dit…", o: ["Er nimmt den Bus", "Er nehmt den Bus", "Er niehmt den Bus"], a: 0, why: "<b>nehmen</b> → <b>er nimmt</b>. À apprendre tel quel." }
    }
  ],
  examples: [
    { d: "Du sprichst sehr gut Deutsch.", f: "Tu parles très bien allemand." },
    { d: "Er spricht Italienisch und Französisch.", f: "Il parle italien et français." },
    { d: "Du liest gerne Bücher.", f: "Tu aimes lire des livres." },
    { d: "Sie isst ein Brötchen.", f: "Elle mange un petit pain." },
    { d: "Er fährt jeden Tag zur Arbeit.", f: "Il va au travail chaque jour." },
    { d: "Das Baby schläft gerade.", f: "Le bébé dort en ce moment." },
    { d: "Er nimmt den Bus.", f: "Il prend le bus." },
    { d: "Ein Adler sieht sehr gut.", f: "Un aigle voit très bien." },
    { d: "Sie hilft ihm.", f: "Elle l'aide." },
    { d: "Er trägt einen Koffer.", f: "Il porte une valise." },
    { d: "Sie läuft jeden Tag acht Kilometer.", f: "Elle court huit kilomètres chaque jour." },
    { d: "Das Kind gibt mir die Hand.", f: "L'enfant me donne la main." }
  ],
  vocab: [
    { d: "sprechen", f: "parler", p: "CHPRÈ-khenn" },
    { d: "lesen", f: "lire", p: "LÉ-zenn" },
    { d: "essen", f: "manger", p: "È-senn" },
    { d: "nehmen", f: "prendre", p: "NÉ-menn" },
    { d: "fahren", f: "aller, conduire", p: "FAA-renn" },
    { d: "schlafen", f: "dormir", p: "CHLAA-fenn" },
    { d: "sehen", f: "voir", p: "ZÉ-enn" },
    { d: "geben", f: "donner", p: "GUÉ-benn" },
    { d: "der Koffer", f: "la valise", p: "dèr KO-feur" },
    { d: "die Hand", f: "la main", p: "dii HANNT" }
  ],
  quiz: [
    { q: "À quelles personnes la voyelle change-t-elle ?", o: ["du et er/sie/es", "ich et wir", "toutes", "ihr et sie"], a: 0, why: "Seulement à la 2ᵉ et 3ᵉ personne du singulier. Ailleurs, rien ne bouge." },
    { q: "Complète : Du ___ sehr gut. (sprechen)", o: ["sprichst", "sprechst", "sprechen", "spricht"], a: 0, why: "<b>e</b> devient <b>i</b>, et la terminaison reste <b>-st</b>." },
    { q: "« Elle dort » se dit…", o: ["sie schläft", "sie schlaft", "sie schlieft", "sie schlafen"], a: 0, why: "<b>a</b> prend un tréma à la 3ᵉ personne." },
    { q: "« Tu lis » se dit…", o: ["du liest", "du lest", "du list", "du liesst"], a: 0, why: "<b>lesen</b> passe à <b>ie</b>, un i long." },
    { q: "Quel verbe change le plus, et s'apprend tel quel ?", o: ["nehmen", "spielen", "lernen", "wohnen"], a: 0, why: "<b>nehmen</b> → <b>du nimmst</b>, <b>er nimmt</b> : voyelle ET consonne changent." }
  ],
  drills: [
    { t: "gap", f: "Tu parles allemand.", s: "Du ___ Deutsch.", a: "sprichst", why: "<b>e</b> → <b>i</b>." },
    { t: "gap", f: "Il parle italien.", s: "Er ___ Italienisch.", a: "spricht", why: "<b>e</b> → <b>i</b>." },
    { t: "gap", f: "Tu lis un livre.", s: "Du ___ ein Buch.", a: "liest", why: "<b>e</b> → <b>ie</b>." },
    { t: "gap", f: "Elle mange un petit pain.", s: "Sie ___ ein Brötchen.", a: "isst", why: "<b>essen</b> → <b>isst</b>." },
    { t: "gap", f: "Il va au travail.", s: "Er ___ zur Arbeit.", a: "fährt", why: "<b>a</b> prend un tréma." },
    { t: "gap", f: "Le bébé dort.", s: "Das Baby ___.", a: "schläft", why: "Tréma sur le <b>a</b>." },
    { t: "gap", f: "Il prend le bus.", s: "Er ___ den Bus.", a: "nimmt", why: "<b>nehmen</b> est le plus irrégulier." },
    { t: "gap", f: "Tu vois bien.", s: "Du ___ gut.", a: "siehst", why: "<b>sehen</b> → <b>ie</b>." },
    { t: "gap", f: "Elle l'aide.", s: "Sie ___ ihm.", a: "hilft", why: "<b>helfen</b> → <b>e</b> devient <b>i</b>." },
    { t: "gap", f: "Il porte une valise.", s: "Er ___ einen Koffer.", a: "trägt", why: "<b>tragen</b> → tréma." },
    { t: "gap", f: "Nous parlons allemand.", s: "Wir ___ Deutsch.", a: "sprechen", why: "Au pluriel, la voyelle ne change pas." },
    { t: "gap", f: "Vous lisez beaucoup.", s: "Ihr ___ viel.", a: "lest", why: "<b>ihr</b> garde la voyelle d'origine." },

    { t: "trans", inst: "Mets à la deuxième personne (du).", from: "Ich spreche Deutsch.", a: "Du sprichst Deutsch.",
      why: "<b>e</b> devient <b>i</b> à la 2ᵉ personne." },
    { t: "trans", inst: "Mets à la troisième personne (er).", from: "Ich lese ein Buch.", a: "Er liest ein Buch.",
      why: "<b>e</b> devient <b>ie</b>." },
    { t: "trans", inst: "Mets à la troisième personne (sie).", from: "Ich fahre nach Berlin.", a: "Sie fährt nach Berlin.",
      why: "<b>a</b> prend un tréma." },
    { t: "trans", inst: "Mets à la troisième personne (er).", from: "Ich nehme den Bus.", a: "Er nimmt den Bus.",
      why: "<b>nehmen</b> → <b>nimmt</b>, à retenir tel quel." },
    { t: "trans", inst: "Passe au pluriel (wir).", from: "Er spricht Deutsch.", a: "Wir sprechen Deutsch.",
      why: "Au pluriel, la voyelle revient à celle de l'infinitif." },
    { t: "trans", inst: "Corrige la faute.", from: "Er schlaft gerade.", a: "Er schläft gerade.",
      why: "Il manque le tréma à la 3ᵉ personne." },
    { t: "trans", inst: "Corrige la faute.", from: "Du sprechst gut.", a: "Du sprichst gut.",
      why: "<b>e</b> doit devenir <b>i</b>." },

    { t: "order", f: "Tu parles très bien allemand.", a: "Du sprichst sehr gut Deutsch",
      why: "<b>sehr gut</b> se place avant le complément." },
    { t: "order", f: "Il va au travail chaque jour.", a: "Er fährt jeden Tag zur Arbeit",
      why: "Le temps avant le lieu." },
    { t: "order", f: "Elle mange un petit pain.", a: "Sie isst ein Brötchen",
      why: "Sujet, verbe, objet." },
    { t: "order", f: "Le bébé dort en ce moment.", a: "Das Baby schläft gerade",
      why: "<b>gerade</b> se met après le verbe." },
    { t: "order", f: "L'enfant me donne la main.", a: "Das Kind gibt mir die Hand",
      why: "Le datif <b>mir</b> avant l'accusatif <b>die Hand</b>." },

    { t: "trad", f: "Tu parles allemand.", a: "Du sprichst Deutsch.",
      why: "<b>e</b> → <b>i</b>." },
    { t: "trad", f: "Il lit un livre.", a: "Er liest ein Buch.",
      why: "<b>e</b> → <b>ie</b>." },
    { t: "trad", f: "Elle dort.", a: "Sie schläft.",
      why: "<b>a</b> → <b>ä</b>." },
    { t: "trad", f: "Il prend le bus.", a: "Er nimmt den Bus.",
      why: "<b>nehmen</b>, le cas à part." },
    { t: "trad", f: "Tu vois très bien.", a: "Du siehst sehr gut.",
      why: "<b>sehen</b> → <b>siehst</b>." },
    { t: "trad", f: "Nous parlons allemand.", a: "Wir sprechen Deutsch.",
      why: "Au pluriel, rien ne change." },
    { t: "trad", f: "Il porte une valise.", a: "Er trägt einen Koffer.",
      why: "<b>Koffer</b> masculin complément → <b>einen</b>." }
  ]
},

/* ------------------------------- ÉTAPE 13 -----------------------------
   Unité 12 du livre (p.24-25) — les déclinaisons et les quatre cas.
   L'étape la plus lourde du niveau, et celle qui fait peur pour rien.
   On mène par la bonne nouvelle : à l'accusatif, SEUL le masculin bouge.
   Trois genres sur quatre formes ne changent pas — dit dans cet ordre,
   le chapitre devient abordable au lieu d'être un mur. */
{
  day: 13, title: "Les quatre cas", de: "Ich sehe den Hund.",
  steps: [
    {
      idea: "En allemand, l'article change selon le rôle du mot dans la phrase.",
      detail: "<b>Der Hund</b> quand le chien fait l'action. <b>Den Hund</b> quand il la subit. Le mot est le même, son rôle a changé — et c'est l'article qui le dit. Le français fait la même chose avec ses pronoms : <b>je</b> le vois, il <b>me</b> voit.",
      gloss: { de: ["Der", "Hund", "sieht", "den", "Mann"], fr: ["Le", "chien", "voit", "l'", "homme"] }
    },
    {
      idea: "Le nominatif, c'est celui qui fait l'action.",
      detail: "C'est la forme du dictionnaire, celle que tu connais déjà : <b>der</b>, <b>die</b>, <b>das</b>. Pour la trouver, demande « qui fait ça ? ». Dans <b>Der Hund läuft</b>, c'est le chien qui court : <b>der</b>.",
      table: [["masculin", "der Mann · ein Mann"], ["féminin", "die Frau · eine Frau"], ["neutre", "das Kind · ein Kind"], ["pluriel", "die Kinder"]],
      check: { q: "Dans « Die Frau liest », <b>die Frau</b> est…", o: ["le sujet, au nominatif", "le complément, à l'accusatif", "au datif"], a: 0, why: "C'est elle qui lit : elle fait l'action, donc nominatif." }
    },
    {
      idea: "L'accusatif, c'est celui qui subit. Et voici la bonne nouvelle.",
      detail: "<i>Seul le masculin change.</i> <b>der</b> devient <b>den</b>, <b>ein</b> devient <b>einen</b>. Le féminin, le neutre et le pluriel ne bougent pas d'un cheveu. Sur les quatre formes, une seule est à retenir.",
      table: [["masculin", "der &rarr; <b>den</b> · ein &rarr; <b>einen</b>"], ["féminin", "die &rarr; die — inchangé"], ["neutre", "das &rarr; das — inchangé"], ["pluriel", "die &rarr; die — inchangé"]],
      check: { q: "« Je vois la femme » se dit…", o: ["Ich sehe die Frau", "Ich sehe den Frau", "Ich sehe der Frau"], a: 0, why: "Le féminin ne change pas à l'accusatif : <b>die Frau</b> reste <b>die Frau</b>." }
    },
    {
      idea: "Le datif, c'est à qui on donne, avec qui on va.",
      detail: "Il répond à « à qui ? ». Là, tout change — mais les formes sont peu nombreuses : <b>dem</b>, <b>der</b>, <b>dem</b>, <b>den</b>. Retiens surtout que le féminin devient <b>der</b>, ce qui surprend parce que ça ressemble au masculin du dictionnaire.",
      table: [["masculin", "dem Mann · einem Mann"], ["féminin", "der Frau · einer Frau"], ["neutre", "dem Kind · einem Kind"], ["pluriel", "den Kindern"]],
      check: { q: "« Je donne le livre à la femme » se dit…", o: ["Ich gebe der Frau das Buch", "Ich gebe die Frau das Buch", "Ich gebe dem Frau das Buch"], a: 0, why: "Au datif, le féminin devient <b>der</b>. C'est le piège de ce cas." }
    },
    {
      idea: "Le génitif dit à qui appartient une chose.",
      detail: "Il répond à « de qui ? ». <b>des</b>, <b>der</b>, <b>des</b>, <b>der</b> — et au masculin comme au neutre, le nom lui-même prend un <b>-s</b> : <b>das Buch des Lehrer<u>s</u></b>. C'est le cas le plus rare à l'oral ; tu le liras plus souvent que tu ne le diras.",
      gloss: { de: ["Das", "Buch", "des", "Lehrers"], fr: ["Le", "livre", "du", "professeur"] }
    },
    {
      idea: "Le tableau en entier — à consulter, pas à avaler.",
      detail: "Ne cherche pas à le retenir d'un bloc. Retiens d'abord <b>den</b> pour le masculin complément : à lui seul, il règle la moitié des phrases que tu diras cette semaine. Le reste viendra à l'usage.",
      table: [["Nominatif", "der · die · das · die"], ["Accusatif", "<b>den</b> · die · das · die"], ["Datif", "dem · der · dem · den"], ["Génitif", "des · der · des · der"]],
      check: { q: "Quelle forme est la plus rentable à retenir en premier ?", o: ["den, le masculin complément", "des, le génitif", "einer, le datif féminin"], a: 0, why: "C'est celle qu'on emploie dès qu'on dit « je vois… », « j'ai… », « je prends… »." }
    }
  ],
  examples: [
    { d: "Der Hund läuft.", f: "Le chien court." },
    { d: "Ich sehe den Hund.", f: "Je vois le chien." },
    { d: "Ich sehe die Frau.", f: "Je vois la femme." },
    { d: "Ich habe einen Bruder.", f: "J'ai un frère." },
    { d: "Er kauft einen Koffer.", f: "Il achète une valise." },
    { d: "Ich gebe dem Kind das Buch.", f: "Je donne le livre à l'enfant." },
    { d: "Das Fahrrad gehört dem Nachbarn.", f: "Le vélo appartient au voisin." },
    { d: "Ich fahre mit dem Bus.", f: "Je vais en bus." },
    { d: "Das ist das Haus des Lehrers.", f: "C'est la maison du professeur." },
    { d: "Der Hund gehört meiner Freundin.", f: "Le chien appartient à mon amie." },
    { d: "Siehst du den Mann?", f: "Vois-tu l'homme ?" },
    { d: "Wir nehmen die U-Bahn.", f: "Nous prenons le métro." }
  ],
  vocab: [
    { d: "der Nachbar", f: "le voisin", p: "dèr NAKH-baar" },
    { d: "das Fahrrad", f: "le vélo", p: "das FAAR-raat" },
    { d: "gehören", f: "appartenir", p: "gue-HEU-renn" },
    { d: "der Bürgermeister", f: "le maire", p: "dèr BUR-gueur-maïs-teur" },
    { d: "die Idee", f: "l'idée", p: "dii i-DÉÉ" },
    { d: "die Maus", f: "la souris", p: "dii MAOUSS" },
    { d: "der Elefant", f: "l'éléphant", p: "dèr é-lé-FANNT" },
    { d: "der Knochen", f: "l'os", p: "dèr KNO-khenn" },
    { d: "das Bett", f: "le lit", p: "das BÈTT" },
    { d: "legen", f: "poser, mettre", p: "LÉ-guenn" }
  ],
  quiz: [
    { q: "Quel genre change à l'accusatif ?", o: ["le masculin seulement", "tous", "le féminin seulement", "aucun"], a: 0, why: "<b>der</b> → <b>den</b>, <b>ein</b> → <b>einen</b>. Féminin, neutre et pluriel ne bougent pas." },
    { q: "Complète : Ich sehe ___ Hund.", o: ["den", "der", "dem", "des"], a: 0, why: "Le chien subit l'action : masculin accusatif → <b>den</b>." },
    { q: "Complète : Ich sehe ___ Frau.", o: ["die", "den", "der", "dem"], a: 0, why: "Le féminin ne change pas à l'accusatif." },
    { q: "Au datif, le féminin devient…", o: ["der", "die", "dem", "den"], a: 0, why: "<b>der Frau</b> — ça ressemble au masculin du dictionnaire, d'où le piège." },
    { q: "À quoi répond le génitif ?", o: ["de qui ?", "qui fait ?", "qui subit ?", "à qui ?"], a: 0, why: "Il dit la possession : <b>das Buch des Lehrers</b>, le livre du professeur." }
  ],
  drills: [
    { t: "gap", f: "Je vois le chien.", s: "Ich sehe ___ Hund.", a: "den", why: "Masculin complément → <b>den</b>." },
    { t: "gap", f: "Le chien court.", s: "___ Hund läuft.", a: "Der", why: "Le chien fait l'action → nominatif." },
    { t: "gap", f: "Je vois la femme.", s: "Ich sehe ___ Frau.", a: "die", why: "Le féminin ne change pas à l'accusatif." },
    { t: "gap", f: "Je vois l'enfant.", s: "Ich sehe ___ Kind.", a: "das", why: "Le neutre non plus." },
    { t: "gap", f: "J'ai un frère.", s: "Ich habe ___ Bruder.", a: "einen", why: "Masculin complément → <b>einen</b>." },
    { t: "gap", f: "J'ai une sœur.", s: "Ich habe ___ Schwester.", a: "eine", why: "Féminin : <b>eine</b> ne bouge pas." },
    { t: "gap", f: "Je donne le livre à l'enfant.", s: "Ich gebe ___ Kind das Buch.", a: "dem", why: "Datif neutre → <b>dem</b>." },
    { t: "gap", f: "Je donne le livre à la femme.", s: "Ich gebe ___ Frau das Buch.", a: "der", why: "Datif féminin → <b>der</b>. Le piège de ce cas." },
    { t: "gap", f: "Je vais en bus.", s: "Ich fahre mit ___ Bus.", a: "dem", why: "<b>mit</b> demande toujours le datif." },
    { t: "gap", f: "C'est la maison du professeur.", s: "Das ist das Haus ___ Lehrers.", a: "des", why: "Génitif masculin → <b>des</b>, et le nom prend un <b>-s</b>." },
    { t: "gap", f: "Le vélo appartient au voisin.", s: "Das Fahrrad gehört ___ Nachbarn.", a: "dem", why: "<b>gehören</b> demande le datif." },

    { t: "trans", inst: "Mets le chien en complément.", from: "Der Hund läuft.", a: "Ich sehe den Hund.",
      why: "De sujet à complément : <b>der</b> devient <b>den</b>." },
    { t: "trans", inst: "Mets la femme en complément.", from: "Die Frau liest.", a: "Ich sehe die Frau.",
      why: "Rien ne change au féminin — c'est là toute la bonne nouvelle." },
    { t: "trans", inst: "Remplace « le » par « un ».", from: "Ich sehe den Mann.", a: "Ich sehe einen Mann.",
      why: "Masculin accusatif : <b>den</b> et <b>einen</b> vont ensemble." },
    { t: "trans", inst: "Passe du complément direct au datif.", from: "Ich sehe das Kind.", a: "Ich gebe dem Kind das Buch.",
      why: "L'enfant reçoit maintenant : <b>das</b> devient <b>dem</b>." },
    { t: "trans", inst: "Corrige la faute.", from: "Ich sehe der Hund.", a: "Ich sehe den Hund.",
      why: "Le chien subit l'action : il faut l'accusatif <b>den</b>." },
    { t: "trans", inst: "Corrige la faute.", from: "Ich gebe die Frau das Buch.", a: "Ich gebe der Frau das Buch.",
      why: "Au datif, le féminin devient <b>der</b>." },

    { t: "order", f: "Je vois le chien.", a: "Ich sehe den Hund",
      why: "Sujet, verbe, complément à l'accusatif." },
    { t: "order", f: "Je donne le livre à l'enfant.", a: "Ich gebe dem Kind das Buch",
      why: "Le datif avant l'accusatif : à qui, puis quoi." },
    { t: "order", f: "Le vélo appartient au voisin.", a: "Das Fahrrad gehört dem Nachbarn",
      why: "<b>gehören</b> demande le datif." },
    { t: "order", f: "C'est la maison du professeur.", a: "Das ist das Haus des Lehrers",
      why: "Le génitif se place après le nom possédé." },
    { t: "order", f: "Il achète une valise.", a: "Er kauft einen Koffer",
      why: "<b>Koffer</b> masculin complément → <b>einen</b>." },
    { t: "order", f: "Vois-tu l'homme ?", a: "Siehst du den Mann",
      why: "Verbe en tête, puis le complément à l'accusatif." },

    { t: "trad", f: "Je vois le chien.", a: "Ich sehe den Hund.",
      why: "La forme la plus rentable du chapitre." },
    { t: "trad", f: "Je vois la femme.", a: "Ich sehe die Frau.",
      why: "Le féminin ne change pas." },
    { t: "trad", f: "J'ai un frère.", a: "Ich habe einen Bruder.",
      why: "<b>einen</b> au masculin complément." },
    { t: "trad", f: "Je donne le livre à l'enfant.", a: "Ich gebe dem Kind das Buch.",
      why: "Datif neutre → <b>dem</b>." },
    { t: "trad", f: "Je vais en bus.", a: "Ich fahre mit dem Bus.",
      why: "<b>mit</b> + datif, toujours." },
    { t: "trad", f: "C'est la maison du professeur.", a: "Das ist das Haus des Lehrers.",
      why: "Génitif : <b>des</b> et un <b>-s</b> au nom." },
    { t: "trad", f: "Nous prenons le métro.", a: "Wir nehmen die U-Bahn.",
      why: "<b>U-Bahn</b> est féminin : rien ne change à l'accusatif." }
  ]
},

/* ------------------------------- ÉTAPE 14 -----------------------------
   Unité 13 du livre (p.26) — les animaux.
   Une unité de vocabulaire, mais qui sert de démonstration : le genre ne
   suit aucune logique de sens. Trois animaux domestiques, trois genres
   différents. C'est le meilleur endroit pour ancrer l'habitude d'apprendre
   l'article avec le mot. */
{
  day: 14, title: "Les animaux", de: "Die Katze und der Hund",
  steps: [
    {
      idea: "Rappel, parce qu'il ne s'use pas : tout nom prend une majuscule.",
      detail: "Cette unité est une longue liste de noms — l'occasion de vérifier que le réflexe est pris. <b>die Katze</b>, <b>der Hund</b>, <b>das Pferd</b>. Où qu'ils soient dans la phrase.",
      gloss: { de: ["Meine", "Katze", "schläft"], fr: ["Mon", "chat", "dort"] }
    },
    {
      idea: "La preuve que le genre ne suit aucune logique.",
      detail: "Trois animaux du quotidien, trois genres différents, sans aucune raison : <b>die</b> Katze, <b>der</b> Hund, <b>das</b> Pferd. Le chat n'est pas plus féminin que le chien n'est masculin. C'est pour ça qu'on apprend l'article avec le mot, jamais après.",
      table: [["die Katze", "le chat — féminin"], ["der Hund", "le chien — masculin"], ["das Pferd", "le cheval — neutre"]],
      check: { q: "Pourquoi <b>die Katze</b> est-il féminin ?", o: ["sans raison — c'est à mémoriser", "parce que les chats sont doux", "parce que le mot finit par -e"], a: 0, why: "La terminaison <b>-e</b> aide souvent, mais ne prouve rien : <b>der Hase</b>, le lapin, finit aussi par <b>-e</b> et reste masculin." }
    },
    {
      idea: "Ceux qu'on croise tous les jours.",
      detail: "Les quatre animaux de compagnie, à savoir avec leur article. Note que <b>der Hase</b> finit par <b>-e</b> et reste pourtant masculin — l'exception qui rappelle que la règle des terminaisons n'est qu'un bon pari.",
      table: [["die Katze", "le chat"], ["der Hund", "le chien"], ["der Hase", "le lapin"], ["der Hamster", "le hamster"]]
    },
    {
      idea: "Ceux de la ferme.",
      detail: "Trois neutres d'affilée — <b>das Schaf</b>, <b>das Schwein</b>, <b>das Huhn</b> — puis deux féminins, <b>die Kuh</b> et <b>die Ziege</b>. Groupés ainsi, ils se retiennent mieux qu'en vrac.",
      table: [["das Pferd", "le cheval"], ["das Schaf", "le mouton"], ["das Schwein", "le cochon"], ["das Huhn", "le poulet"], ["die Kuh", "la vache"], ["die Ziege", "la chèvre"]]
    },
    {
      idea: "Les petites bêtes, et deux mots qui font sourire.",
      detail: "<b>der Schmetterling</b> (le papillon) et <b>der Marienkäfer</b> (la coccinelle, mot à mot « le scarabée de Marie ») sont longs mais très allemands : ils s'assemblent comme des pièces. Une fois découpés, ils ne font plus peur.",
      table: [["die Biene", "l'abeille"], ["die Fliege", "la mouche"], ["der Schmetterling", "le papillon"], ["der Marienkäfer", "la coccinelle"], ["die Schlange", "le serpent"], ["die Eidechse", "le lézard"]],
      check: { q: "<b>der Marienkäfer</b>, c'est…", o: ["la coccinelle", "le papillon", "l'abeille"], a: 0, why: "Mot à mot « le scarabée de Marie ». Les mots composés allemands se lisent en les découpant." }
    }
  ],
  examples: [
    { d: "Meine Katze schläft auf dem Sofa.", f: "Mon chat dort sur le canapé." },
    { d: "Mein Hund läuft gern im Garten.", f: "Mon chien aime courir dans le jardin." },
    { d: "Der Hase isst Karotten.", f: "Le lapin mange des carottes." },
    { d: "Das Pferd ist sehr schnell.", f: "Le cheval est très rapide." },
    { d: "Die Kuh gibt gute Milch.", f: "La vache donne du bon lait." },
    { d: "Das Schaf ist weiß.", f: "Le mouton est blanc." },
    { d: "Ich sehe einen Schmetterling.", f: "Je vois un papillon." },
    { d: "Der Marienkäfer ist rot.", f: "La coccinelle est rouge." },
    { d: "Die Biene fliegt zur Blume.", f: "L'abeille vole vers la fleur." },
    { d: "Der Löwe ist der König der Tiere.", f: "Le lion est le roi des animaux." },
    { d: "Das Krokodil schläft im Wasser.", f: "Le crocodile dort dans l'eau." },
    { d: "Hast du ein Haustier?", f: "As-tu un animal de compagnie ?" }
  ],
  vocab: [
    { d: "die Katze", f: "le chat", p: "dii KA-tse" },
    { d: "der Hase", f: "le lapin", p: "dèr HAA-ze" },
    { d: "das Pferd", f: "le cheval", p: "das PFÈRT" },
    { d: "die Kuh", f: "la vache", p: "dii KOU" },
    { d: "das Schaf", f: "le mouton", p: "das CHAAF" },
    { d: "die Biene", f: "l'abeille", p: "dii BII-ne" },
    { d: "der Schmetterling", f: "le papillon", p: "dèr CHMÈ-teur-linng" },
    { d: "der Löwe", f: "le lion", p: "dèr LEU-ve" },
    { d: "das Haustier", f: "l'animal de compagnie", p: "das HAOUSS-tiir" },
    { d: "der Garten", f: "le jardin", p: "dèr GAR-tenn" }
  ],
  quiz: [
    { q: "Quel article pour <b>Katze</b> ?", o: ["die", "der", "das", "den"], a: 0, why: "<b>die Katze</b> — féminin, sans raison particulière." },
    { q: "Quel article pour <b>Hund</b> ?", o: ["der", "die", "das", "dem"], a: 0, why: "<b>der Hund</b> — masculin." },
    { q: "<b>der Hase</b> finit par <b>-e</b> et reste masculin. Qu'est-ce que ça montre ?", o: ["la règle des terminaisons est un bon pari, pas une loi", "que -e est masculin", "qu'il n'y a aucune règle"], a: 0, why: "<b>-e</b> annonce le féminin la plupart du temps — mais il faut vérifier, pas parier les yeux fermés." },
    { q: "<b>der Marienkäfer</b> veut dire…", o: ["la coccinelle", "le papillon", "le lézard", "l'abeille"], a: 0, why: "Mot à mot « le scarabée de Marie »." },
    { q: "Comment retenir le genre d'un animal ?", o: ["en l'apprenant avec son article", "en regardant l'animal", "il n'y en a pas", "en le mettant au pluriel"], a: 0, why: "Toujours <b>die Katze</b>, jamais <b>Katze</b> seul." }
  ],
  drills: [
    { t: "gap", f: "le chat", s: "___ Katze", a: "die", why: "Féminin." },
    { t: "gap", f: "le chien", s: "___ Hund", a: "der", why: "Masculin." },
    { t: "gap", f: "le cheval", s: "___ Pferd", a: "das", why: "Neutre." },
    { t: "gap", f: "le lapin", s: "___ Hase", a: "der", why: "Masculin malgré le <b>-e</b> final." },
    { t: "gap", f: "la vache", s: "___ Kuh", a: "die", why: "Féminin." },
    { t: "gap", f: "le mouton", s: "___ Schaf", a: "das", why: "Neutre." },
    { t: "gap", f: "l'abeille", s: "___ Biene", a: "die", why: "Féminin, comme la plupart des noms en <b>-e</b>." },
    { t: "gap", f: "le papillon", s: "___ Schmetterling", a: "der", why: "Masculin." },
    { t: "gap", f: "Mon chat dort.", s: "Meine ___ schläft.", a: "Katze", why: "<b>Katze</b> est féminin, d'où <b>meine</b>." },
    { t: "gap", f: "Je vois un papillon.", s: "Ich sehe einen ___.", a: "Schmetterling", why: "Masculin complément → <b>einen</b>." },

    { t: "trans", inst: "Mets au pluriel.", from: "Die Katze schläft.", a: "Die Katzen schlafen.",
      why: "Féminin en <b>-e</b> → <b>-n</b>, et le verbe passe au pluriel." },
    { t: "trans", inst: "Mets au pluriel.", from: "Der Hund läuft.", a: "Die Hunde laufen.",
      why: "Masculin court → <b>-e</b>." },
    { t: "trans", inst: "Mets l'animal en complément.", from: "Der Hund schläft.", a: "Ich sehe den Hund.",
      why: "Masculin complément → <b>den</b>." },
    { t: "trans", inst: "Mets l'animal en complément.", from: "Die Katze schläft.", a: "Ich sehe die Katze.",
      why: "Le féminin ne change pas à l'accusatif." },
    { t: "trans", inst: "Remplace « le » par « un ».", from: "Der Löwe ist groß.", a: "Ein Löwe ist groß.",
      why: "Masculin sujet → <b>ein</b>." },

    { t: "order", f: "Mon chat dort sur le canapé.", a: "Meine Katze schläft auf dem Sofa",
      why: "<b>auf</b> + datif quand on est posé quelque part." },
    { t: "order", f: "Le lapin mange des carottes.", a: "Der Hase isst Karotten",
      why: "Sujet, verbe, complément." },
    { t: "order", f: "Le cheval est très rapide.", a: "Das Pferd ist sehr schnell",
      why: "<b>sehr</b> devant l'adjectif." },
    { t: "order", f: "L'abeille vole vers la fleur.", a: "Die Biene fliegt zur Blume",
      why: "<b>zur</b> est la contraction de <b>zu der</b>." },
    { t: "order", f: "La coccinelle est rouge.", a: "Der Marienkäfer ist rot",
      why: "Après <b>ist</b>, l'adjectif ne change pas." },

    { t: "trad", f: "Le chat dort.", a: "Die Katze schläft.",
      why: "<b>schlafen</b> prend un tréma à la 3ᵉ personne." },
    { t: "trad", f: "Mon chien est marron.", a: "Mein Hund ist braun.",
      why: "<b>Hund</b> masculin → <b>mein</b>." },
    { t: "trad", f: "Je vois un papillon.", a: "Ich sehe einen Schmetterling.",
      why: "Masculin complément → <b>einen</b>." },
    { t: "trad", f: "La vache donne du bon lait.", a: "Die Kuh gibt gute Milch.",
      why: "<b>geben</b> → <b>gibt</b> à la 3ᵉ personne." },
    { t: "trad", f: "Le cheval est rapide.", a: "Das Pferd ist schnell.",
      why: "<b>Pferd</b> est neutre." },
    { t: "trad", f: "As-tu un animal de compagnie ?", a: "Hast du ein Haustier?",
      why: "<b>Haustier</b> neutre : <b>ein</b> ne change pas à l'accusatif." },
    { t: "trad", f: "Le lion est grand.", a: "Der Löwe ist groß.",
      why: "<b>Löwe</b> est masculin malgré son <b>-e</b>." }
  ]
},

/* ------------------------------- ÉTAPE 15 -----------------------------
   Unité 14 du livre (p.27) — es gibt et da ist / da sind.
   Le livre revient dessus à l'unité 28 ; ici on pose la mécanique, et
   surtout le piège que le livre ne signale pas : après « es gibt », le
   nom est à l'ACCUSATIF. C'est pour ça qu'on dit einen Park et non ein
   Park — et c'est le meilleur endroit pour réemployer l'étape 13. */
{
  day: 15, title: "Il y a", de: "Es gibt einen Park.",
  steps: [
    {
      idea: "« Il y a » se dit es gibt, et ne change jamais.",
      detail: "Ni au pluriel, ni ailleurs. <b>Es gibt einen Park</b>, <b>es gibt viele Bücher</b> — la formule reste identique. Mot à mot, elle dit « ça donne », ce qui n'aide pas : mieux vaut la retenir comme un bloc.",
      gloss: { de: ["Es", "gibt", "einen", "Park"], fr: ["Il", "y a", "un", "parc"] }
    },
    {
      idea: "Le piège : ce qui suit es gibt est un complément.",
      detail: "Donc à l'accusatif. Au masculin, <b>ein</b> devient <b>einen</b> : on dit <b>es gibt einen Park</b>, jamais « es gibt ein Park ». Féminin et neutre ne changent pas, comme toujours — c'est l'étape 13 qui resert telle quelle.",
      table: [["masculin", "es gibt <b>einen</b> Park"], ["féminin", "es gibt <b>eine</b> Katze"], ["neutre", "es gibt <b>ein</b> Buch"]],
      check: { q: "« Il y a un chien » se dit…", o: ["Es gibt einen Hund", "Es gibt ein Hund", "Es gibt der Hund"], a: 0, why: "<b>Hund</b> est masculin et complément → <b>einen</b>." }
    },
    {
      idea: "Pour dire qu'il n'y a pas, on emploie kein.",
      detail: "Et <b>kein</b> se décline comme <b>ein</b>. Donc au masculin : <b>es gibt keinen Platz</b>. C'est la même mécanique, avec un <b>k</b> devant.",
      table: [["masculin", "es gibt <b>keinen</b> Platz"], ["féminin", "es gibt <b>keine</b> Zeit"], ["neutre", "es gibt <b>kein</b> Café"]],
      check: { q: "« Il n'y a plus de place » se dit…", o: ["Es gibt keinen Platz mehr", "Es gibt nicht Platz mehr", "Es gibt kein Platz mehr"], a: 0, why: "<b>Platz</b> est masculin : <b>keinen</b>. Et on nie un nom, donc <b>kein-</b> et non <b>nicht</b>." }
    },
    {
      idea: "Pour poser la question, on met gibt devant.",
      detail: "<b>Gibt es ein Restaurant hier?</b> — comme toute question sans mot interrogatif : le verbe passe en tête. C'est la phrase la plus utile en voyage, avec « où est… ».",
      gloss: { de: ["Gibt", "es", "hier", "ein", "Restaurant"], fr: ["Y a-t-il", "—", "ici", "un", "restaurant"] }
    },
    {
      idea: "Et à côté, da ist / da sind : dans un lieu précis.",
      detail: "<b>Es gibt</b> dit qu'une chose existe quelque part, en général. <b>Da ist</b> la montre là, précisément. « Es gibt einen Supermarkt in der Stadt » — il en existe un. « Da sind viele Parkplätze am Eingang » — les voilà, à l'entrée. Et <b>da sind</b> au pluriel, alors que <b>es gibt</b> ne bouge pas.",
      table: [["es gibt", "l'existence, en général — invariable"], ["da ist", "présent ici, singulier"], ["da sind", "présents ici, pluriel"]],
      check: { q: "Quelle formule change au pluriel ?", o: ["da ist → da sind", "es gibt → es geben", "les deux"], a: 0, why: "<b>es gibt</b> ne change jamais. <b>da ist</b> devient <b>da sind</b>." }
    }
  ],
  examples: [
    { d: "Es gibt einen Park in der Stadt.", f: "Il y a un parc dans la ville." },
    { d: "Es gibt eine Katze im Garten.", f: "Il y a un chat dans le jardin." },
    { d: "Es gibt ein Buch auf dem Tisch.", f: "Il y a un livre sur la table." },
    { d: "Es gibt viele Bücher in der Bibliothek.", f: "Il y a beaucoup de livres à la bibliothèque." },
    { d: "Es gibt keinen Platz mehr im Bus.", f: "Il n'y a plus de place dans le bus." },
    { d: "Gibt es ein Restaurant hier?", f: "Y a-t-il un restaurant ici ?" },
    { d: "Gibt es einen Parkplatz?", f: "Y a-t-il un parking ?" },
    { d: "Da ist ein Tisch im Raum.", f: "Il y a une table dans la pièce." },
    { d: "Da sind viele Leute in der Warteschlange.", f: "Il y a beaucoup de gens dans la file d'attente." },
    { d: "Es gibt fünf Äpfel im Korb.", f: "Il y a cinq pommes dans le panier." },
    { d: "Was gibt es heute in der Stadt?", f: "Qu'y a-t-il en ville aujourd'hui ?" },
    { d: "Es gibt Obst und Gemüse auf dem Markt.", f: "Il y a des fruits et des légumes au marché." }
  ],
  vocab: [
    { d: "es gibt", f: "il y a", p: "èss GUIPT" },
    { d: "der Platz", f: "la place", p: "dèr PLATS" },
    { d: "der Raum", f: "la pièce", p: "dèr RAOUM" },
    { d: "die Leute", f: "les gens", p: "dii LOÏ-te" },
    { d: "die Warteschlange", f: "la file d'attente", p: "dii VAR-te-chlann-gue" },
    { d: "der Apfel", f: "la pomme", p: "dèr AP-feul" },
    { d: "der Markt", f: "le marché", p: "dèr MARKT" },
    { d: "die Auswahl", f: "le choix", p: "dii AOUS-vaal" },
    { d: "frisch", f: "frais", p: "FRICH" },
    { d: "der Eingang", f: "l'entrée", p: "dèr AÏN-gang" }
  ],
  quiz: [
    { q: "« Il y a un parc » se dit…", o: ["Es gibt einen Park", "Es gibt ein Park", "Es gibt der Park", "Da ist ein Park"], a: 0, why: "Après <b>es gibt</b>, le nom est complément : masculin → <b>einen</b>." },
    { q: "<b>es gibt</b> au pluriel devient…", o: ["es gibt — il ne change pas", "es geben", "sie geben", "es sind"], a: 0, why: "C'est un bloc figé, singulier comme pluriel." },
    { q: "« Il n'y a pas de café » se dit…", o: ["Es gibt kein Café", "Es gibt nicht Café", "Es gibt keinen Café", "Es ist kein Café"], a: 0, why: "On nie un nom → <b>kein</b>, et <b>Café</b> est neutre." },
    { q: "Quelle différence entre <b>es gibt</b> et <b>da ist</b> ?", o: ["es gibt = en général, da ist = ici précisément", "aucune", "es gibt est poli", "da ist est au passé"], a: 0, why: "<b>Es gibt einen Supermarkt in der Stadt</b> : il en existe un. <b>Da sind viele Parkplätze</b> : les voilà." },
    { q: "Pour demander s'il y a un restaurant, on dit…", o: ["Gibt es ein Restaurant?", "Es gibt ein Restaurant?", "Ist es ein Restaurant?", "Hat es ein Restaurant?"], a: 0, why: "Le verbe passe en tête, comme dans toute question sans mot interrogatif." }
  ],
  drills: [
    { t: "gap", f: "Il y a un parc.", s: "Es gibt ___ Park.", a: "einen", why: "Masculin complément → <b>einen</b>." },
    { t: "gap", f: "Il y a un chat.", s: "Es gibt ___ Katze.", a: "eine", why: "Féminin : <b>eine</b> ne change pas." },
    { t: "gap", f: "Il y a un livre.", s: "Es gibt ___ Buch.", a: "ein", why: "Neutre : <b>ein</b> ne change pas." },
    { t: "gap", f: "Il n'y a plus de place.", s: "Es gibt ___ Platz mehr.", a: "keinen", why: "<b>kein</b> se décline comme <b>ein</b> : masculin → <b>keinen</b>." },
    { t: "gap", f: "Il n'y a pas de café.", s: "Es gibt ___ Café.", a: "kein", why: "<b>Café</b> est neutre." },
    { t: "gap", f: "Y a-t-il un restaurant ici ?", s: "___ es ein Restaurant hier?", a: "Gibt", why: "Le verbe passe en tête pour la question." },
    { t: "gap", f: "Il y a une table dans la pièce.", s: "___ ist ein Tisch im Raum.", a: "Da", why: "Un lieu précis → <b>da ist</b>." },
    { t: "gap", f: "Il y a beaucoup de gens ici.", s: "Da ___ viele Leute.", a: "sind", why: "<b>da ist</b> devient <b>da sind</b> au pluriel." },
    { t: "gap", f: "Il y a cinq pommes dans le panier.", s: "Es gibt fünf ___ im Korb.", a: "Äpfel", why: "<b>Apfel</b> → <b>Äpfel</b> au pluriel." },
    { t: "gap", f: "Qu'y a-t-il en ville ?", s: "Was ___ es in der Stadt?", a: "gibt", why: "Après un mot interrogatif, le verbe reste en place 2." },

    { t: "trans", inst: "Corrige la faute.", from: "Es gibt ein Park.", a: "Es gibt einen Park.",
      why: "Après <b>es gibt</b>, le masculin passe à l'accusatif." },
    { t: "trans", inst: "Mets à la forme négative.", from: "Es gibt einen Platz.", a: "Es gibt keinen Platz.",
      why: "<b>einen</b> devient <b>keinen</b>." },
    { t: "trans", inst: "Mets à la forme négative.", from: "Es gibt ein Café.", a: "Es gibt kein Café.",
      why: "Neutre : <b>ein</b> devient <b>kein</b>." },
    { t: "trans", inst: "Transforme en question.", from: "Es gibt einen Parkplatz.", a: "Gibt es einen Parkplatz?",
      why: "Le verbe passe devant." },
    { t: "trans", inst: "Mets au pluriel.", from: "Da ist ein Tisch.", a: "Da sind viele Tische.",
      why: "<b>da ist</b> devient <b>da sind</b> — contrairement à <b>es gibt</b>." },
    { t: "trans", inst: "Dis-le avec « es gibt » plutôt qu'avec « da ist ».", from: "Da ist ein Supermarkt.", a: "Es gibt einen Supermarkt.",
      why: "On passe du lieu précis à l'existence générale — et <b>ein</b> devient <b>einen</b>." },

    { t: "order", f: "Il y a un parc dans la ville.", a: "Es gibt einen Park in der Stadt",
      why: "La formule, le complément, puis le lieu." },
    { t: "order", f: "Il n'y a plus de place dans le bus.", a: "Es gibt keinen Platz mehr im Bus",
      why: "<b>mehr</b> se place après le nom nié." },
    { t: "order", f: "Y a-t-il un restaurant ici ?", a: "Gibt es ein Restaurant hier",
      why: "Verbe en tête." },
    { t: "order", f: "Il y a beaucoup de gens dans la file d'attente.", a: "Da sind viele Leute in der Warteschlange",
      why: "<b>da sind</b> pour un lieu précis, au pluriel." },
    { t: "order", f: "Il y a des fruits et des légumes au marché.", a: "Es gibt Obst und Gemüse auf dem Markt",
      why: "<b>auf</b> + datif : on est au marché, on n'y va pas." },

    { t: "trad", f: "Il y a un parc.", a: "Es gibt einen Park.",
      why: "Le piège de l'étape : <b>einen</b>, pas <b>ein</b>." },
    { t: "trad", f: "Il y a un chat dans le jardin.", a: "Es gibt eine Katze im Garten.",
      why: "Féminin : rien ne change." },
    { t: "trad", f: "Il n'y a plus de place.", a: "Es gibt keinen Platz mehr.",
      why: "<b>keinen</b> au masculin." },
    { t: "trad", f: "Y a-t-il un parking ?", a: "Gibt es einen Parkplatz?",
      why: "Verbe en tête, et toujours l'accusatif." },
    { t: "trad", f: "Il y a une table dans la pièce.", a: "Da ist ein Tisch im Raum.",
      why: "Lieu précis → <b>da ist</b>." },
    { t: "trad", f: "Il y a cinq pommes dans le panier.", a: "Es gibt fünf Äpfel im Korb.",
      why: "Pas d'article devant un nombre." },
    { t: "trad", f: "Qu'y a-t-il en ville aujourd'hui ?", a: "Was gibt es heute in der Stadt?",
      why: "Mot interrogatif en place 1, verbe en place 2." }
  ]
},

/* ------------------------------- ÉTAPE 16 -----------------------------
   Unité 15 du livre (p.28) — la famille.
   Le livre donne 22 mots de parenté et rien d'autre. On en profite pour
   poser « mein / meine », qui manquait : sans possessif, on ne peut pas
   parler de sa famille, seulement la nommer. */
{
  day: 16, title: "Ma famille", de: "Das ist meine Schwester.",
  steps: [
    {
      idea: "« Mon » et « ma » suivent le genre de ce qu'on possède.",
      detail: "Comme en français. <b>mein Bruder</b> (mon frère), <b>meine Schwester</b> (ma sœur). Ce qui compte, c'est le genre du membre de la famille — pas le tien.",
      table: [["masculin", "mein Bruder"], ["féminin", "meine Schwester"], ["neutre", "mein Kind"], ["pluriel", "meine Eltern"]],
      check: { q: "« Ma mère » se dit…", o: ["meine Mutter", "mein Mutter", "meinen Mutter"], a: 0, why: "<b>Mutter</b> est féminin → <b>meine</b>." }
    },
    {
      idea: "Et « ton » se forme exactement pareil.",
      detail: "<b>dein</b> au masculin et au neutre, <b>deine</b> au féminin et au pluriel. Une lettre change, la règle est la même. Si tu sais dire <b>mein</b>, tu sais dire <b>dein</b>.",
      table: [["mein Vater", "dein Vater"], ["meine Mutter", "deine Mutter"], ["mein Kind", "dein Kind"], ["meine Eltern", "deine Eltern"]],
      check: { q: "« Ta fille » se dit…", o: ["deine Tochter", "dein Tochter", "deinen Tochter"], a: 0, why: "<b>Tochter</b> est féminin → <b>deine</b>." }
    },
    {
      idea: "La famille proche : six mots, trois paires.",
      detail: "Elles vont deux par deux, et se retiennent mieux ainsi. Note que <b>Vater</b> et <b>Mutter</b> ressemblent à l'anglais <i>father</i> et <i>mother</i> — l'allemand et l'anglais sont cousins, ça resservira souvent.",
      table: [["der Vater · die Mutter", "le père · la mère"], ["der Bruder · die Schwester", "le frère · la sœur"], ["der Sohn · die Tochter", "le fils · la fille"]]
    },
    {
      idea: "Les grands-parents : il suffit de coller Groß- devant.",
      detail: "<b>der Großvater</b>, <b>die Großmutter</b>. Et pour les arrière-grands-parents, on ajoute encore <b>Ur-</b> : <b>der Urgroßvater</b>. L'allemand construit ses mots en empilant — une fois le principe vu, la moitié du vocabulaire se devine.",
      table: [["Groß-", "der Großvater, die Großmutter"], ["Ur- + Groß-", "der Urgroßvater, die Urgroßmutter"], ["-in au féminin", "der Enkel &rarr; die Enkelin"]],
      check: { q: "Comment dit-on « arrière-grand-mère » ?", o: ["die Urgroßmutter", "die Großurmutter", "die Mutter groß"], a: 0, why: "On empile : <b>Ur</b> + <b>groß</b> + <b>Mutter</b>." }
    },
    {
      idea: "Un dernier point : quand la personne devient complément.",
      detail: "<b>mein</b> se décline comme <b>ein</b>. Donc au masculin complément : <b>Ich sehe meinen Bruder</b>. Le féminin et le neutre ne changent pas — c'est encore la règle de l'étape 13, appliquée aux possessifs.",
      gloss: { de: ["Ich", "sehe", "meinen", "Bruder"], fr: ["Je", "vois", "mon", "frère"] },
      check: { q: "« Je vois mon frère » se dit…", o: ["Ich sehe meinen Bruder", "Ich sehe mein Bruder", "Ich sehe meine Bruder"], a: 0, why: "Masculin complément : <b>mein</b> devient <b>meinen</b>, comme <b>ein</b> devient <b>einen</b>." }
    }
  ],
  examples: [
    { d: "Das ist meine Schwester.", f: "C'est ma sœur." },
    { d: "Mein Bruder heißt Max.", f: "Mon frère s'appelle Max." },
    { d: "Meine Mutter ist Lehrerin.", f: "Ma mère est professeure." },
    { d: "Mein Vater arbeitet viel.", f: "Mon père travaille beaucoup." },
    { d: "Meine Großmutter ist Deutsche.", f: "Ma grand-mère est allemande." },
    { d: "Ich habe zwei Geschwister.", f: "J'ai deux frères et sœurs." },
    { d: "Ich sehe meinen Bruder.", f: "Je vois mon frère." },
    { d: "Wie heißt deine Schwester?", f: "Comment s'appelle ta sœur ?" },
    { d: "Meine Eltern sind sehr nett.", f: "Mes parents sont très gentils." },
    { d: "Der Hund meines Cousins ist bei mir.", f: "Le chien de mon cousin est chez moi." },
    { d: "Meine Nichte ist klein.", f: "Ma nièce est petite." },
    { d: "Mein Onkel kommt morgen.", f: "Mon oncle vient demain." }
  ],
  vocab: [
    { d: "der Vater", f: "le père", p: "dèr FAA-teur" },
    { d: "die Mutter", f: "la mère", p: "dii MOU-teur" },
    { d: "der Sohn", f: "le fils", p: "dèr ZOON" },
    { d: "die Tochter", f: "la fille", p: "dii TOKH-teur" },
    { d: "der Onkel", f: "l'oncle", p: "dèr ONN-keul" },
    { d: "die Tante", f: "la tante", p: "dii TANN-te" },
    { d: "die Familie", f: "la famille", p: "dii fa-MII-lie" },
    { d: "mein", f: "mon, ma", p: "MAÏN" },
    { d: "dein", f: "ton, ta", p: "DAÏN" },
    { d: "der Verwandte", f: "le parent, le proche", p: "dèr feur-VANN-de" }
  ],
  quiz: [
    { q: "« Ma sœur » se dit…", o: ["meine Schwester", "mein Schwester", "meinen Schwester", "meiner Schwester"], a: 0, why: "<b>Schwester</b> est féminin → <b>meine</b>." },
    { q: "Le possessif suit le genre…", o: ["de ce qu'on possède", "de celui qui possède", "du verbe", "de la phrase"], a: 0, why: "Comme en français : <b>mein Bruder</b>, <b>meine Schwester</b>, quel que soit celui qui parle." },
    { q: "« Arrière-grand-père » se dit…", o: ["der Urgroßvater", "der Großurvater", "der Vater urgroß", "der Ur-Vater"], a: 0, why: "L'allemand empile : <b>Ur</b> + <b>groß</b> + <b>Vater</b>." },
    { q: "« Je vois mon frère » se dit…", o: ["Ich sehe meinen Bruder", "Ich sehe mein Bruder", "Ich sehe meine Bruder", "Ich sehe meiner Bruder"], a: 0, why: "Masculin complément : <b>meinen</b>, comme <b>einen</b>." },
    { q: "Comment forme-t-on le féminin de <b>der Enkel</b> (petit-fils) ?", o: ["die Enkelin", "die Enkele", "die Enkelfrau", "das Enkel"], a: 0, why: "Le suffixe <b>-in</b> forme le féminin des personnes : <b>Lehrer</b> → <b>Lehrerin</b>." }
  ],
  drills: [
    { t: "gap", f: "mon frère", s: "___ Bruder", a: "mein", why: "Masculin → <b>mein</b>." },
    { t: "gap", f: "ma sœur", s: "___ Schwester", a: "meine", why: "Féminin → <b>meine</b>." },
    { t: "gap", f: "mon enfant", s: "___ Kind", a: "mein", why: "Neutre → <b>mein</b>, comme le masculin." },
    { t: "gap", f: "mes parents", s: "___ Eltern", a: "meine", why: "Pluriel → <b>meine</b>." },
    { t: "gap", f: "ton père", s: "___ Vater", a: "dein", why: "Masculin → <b>dein</b>." },
    { t: "gap", f: "ta fille", s: "___ Tochter", a: "deine", why: "Féminin → <b>deine</b>." },
    { t: "gap", f: "Je vois mon frère.", s: "Ich sehe ___ Bruder.", a: "meinen", why: "Masculin complément → <b>meinen</b>." },
    { t: "gap", f: "Je vois ma sœur.", s: "Ich sehe ___ Schwester.", a: "meine", why: "Le féminin ne change pas à l'accusatif." },
    { t: "gap", f: "ma grand-mère", s: "meine ___", a: "Großmutter", why: "<b>Groß</b> collé à <b>Mutter</b>." },
    { t: "gap", f: "Ma mère est professeure.", s: "Meine Mutter ist ___.", a: "Lehrerin", why: "Le suffixe <b>-in</b> forme le féminin du métier." },

    { t: "trans", inst: "Passe de « mon » à « ton ».", from: "Mein Bruder heißt Max.", a: "Dein Bruder heißt Max.",
      why: "Même moule, une lettre change." },
    { t: "trans", inst: "Passe de « ma » à « ta ».", from: "Meine Schwester ist nett.", a: "Deine Schwester ist nett.",
      why: "<b>meine</b> devient <b>deine</b>." },
    { t: "trans", inst: "Mets le frère en complément.", from: "Mein Bruder ist hier.", a: "Ich sehe meinen Bruder.",
      why: "Masculin complément → <b>meinen</b>." },
    { t: "trans", inst: "Mets la sœur en complément.", from: "Meine Schwester ist hier.", a: "Ich sehe meine Schwester.",
      why: "Le féminin ne bouge pas." },
    { t: "trans", inst: "Ajoute une génération.", from: "meine Mutter", a: "meine Großmutter",
      why: "<b>Groß-</b> se colle devant." },
    { t: "trans", inst: "Ajoute encore une génération.", from: "mein Großvater", a: "mein Urgroßvater",
      why: "<b>Ur-</b> vient devant <b>Groß-</b>." },
    { t: "trans", inst: "Corrige la faute.", from: "Ich sehe mein Bruder.", a: "Ich sehe meinen Bruder.",
      why: "Il manque la marque de l'accusatif masculin." },

    { t: "order", f: "C'est ma sœur.", a: "Das ist meine Schwester",
      why: "<b>Das ist</b> présente, et <b>Schwester</b> est féminin." },
    { t: "order", f: "Mon frère s'appelle Max.", a: "Mein Bruder heißt Max",
      why: "Sujet, verbe, nom." },
    { t: "order", f: "Ma grand-mère est allemande.", a: "Meine Großmutter ist Deutsche",
      why: "Pas d'article devant la nationalité employée comme nom." },
    { t: "order", f: "Comment s'appelle ta sœur ?", a: "Wie heißt deine Schwester",
      why: "Mot en W- en place 1, verbe en place 2." },
    { t: "order", f: "Mes parents sont très gentils.", a: "Meine Eltern sind sehr nett",
      why: "<b>Eltern</b> est toujours pluriel, d'où <b>sind</b>." },
    { t: "order", f: "Mon oncle vient demain.", a: "Mein Onkel kommt morgen",
      why: "Le présent suffit pour le futur proche." },

    { t: "trad", f: "C'est ma sœur.", a: "Das ist meine Schwester.",
      why: "Féminin → <b>meine</b>." },
    { t: "trad", f: "Mon père travaille beaucoup.", a: "Mein Vater arbeitet viel.",
      why: "<b>arbeiten</b> prend le <b>-e</b> d'appui." },
    { t: "trad", f: "Ma mère mange du fromage.", a: "Meine Mutter isst Käse.",
      why: "<b>essen</b> → <b>isst</b> à la 3ᵉ personne." },
    { t: "trad", f: "Je vois mon frère.", a: "Ich sehe meinen Bruder.",
      why: "Masculin complément → <b>meinen</b>." },
    { t: "trad", f: "Ma nièce est petite.", a: "Meine Nichte ist klein.",
      why: "Après <b>ist</b>, l'adjectif ne change pas." },
    { t: "trad", f: "Ma grand-mère est allemande.", a: "Meine Großmutter ist Deutsche.",
      why: "<b>Groß-</b> collé à <b>Mutter</b>." },
    { t: "trad", f: "J'ai deux frères et sœurs.", a: "Ich habe zwei Geschwister.",
      why: "<b>Geschwister</b> dit les deux d'un coup, et reste pluriel." }
  ]
},

/* ------------------------------- ÉTAPE 17 -----------------------------
   Unité 16 du livre (p.29-30) — les adjectifs.
   Le vrai mur du niveau A1, et le livre l'expédie en cinq paragraphes.
   On procède dans l'ordre du plus rentable : d'abord la position où
   l'adjectif NE change PAS (après « sein »), ensuite seulement les
   terminaisons. Sinon on décourage pour une règle dont on n'a pas besoin
   dans la moitié des phrases. */
{
  day: 17, title: "Décrire les choses", de: "Das Auto ist rot.",
  steps: [
    {
      idea: "Commençons par la position facile : après le verbe être.",
      detail: "Là, l'adjectif ne change <i>jamais</i>. <b>Das Auto ist rot</b>, <b>die Blume ist rot</b>, <b>die Autos sind rot</b>. Masculin, féminin, pluriel : <b>rot</b> reste <b>rot</b>. Et c'est déjà de quoi décrire presque tout ce que tu veux dire.",
      gloss: { de: ["Der", "Hund", "ist", "groß"], fr: ["Le", "chien", "est", "grand"] },
      check: { q: "« Les fleurs sont belles » se dit…", o: ["Die Blumen sind schön", "Die Blumen sind schöne", "Die Blumen sind schönen"], a: 0, why: "Après <b>sein</b>, aucune terminaison — même au pluriel." }
    },
    {
      idea: "Devant le nom, en revanche, il prend une terminaison.",
      detail: "<b>Das Kind ist klein</b> mais <b>das kleine Kind</b>. C'est la seule différence, et elle se voit : dès que l'adjectif passe devant le nom, il s'accroche une fin. Si tu ne veux pas t'en occuper, tu peux presque toujours reformuler avec <b>ist</b>.",
      table: [["après sein", "Das Kind ist klein."], ["devant le nom", "Das kleine Kind spielt."]],
      check: { q: "Dans quel cas l'adjectif change-t-il ?", o: ["quand il est devant le nom", "quand il est après sein", "toujours", "jamais"], a: 0, why: "Devant le nom, il se décline. Après <b>sein</b>, il reste nu." }
    },
    {
      idea: "Avec der / die / das, c'est simple : -e au singulier.",
      detail: "L'article a déjà dit le genre, l'adjectif n'a plus rien à annoncer — il prend juste un <b>-e</b>. Au pluriel et dans les autres cas, ce sera <b>-en</b>, mais commence par retenir le <b>-e</b>.",
      table: [["der große Hund", "le grand chien"], ["die kleine Katze", "le petit chat"], ["das neue Buch", "le livre neuf"], ["die alten Möbel", "les vieux meubles — pluriel : -en"]],
      check: { q: "« Le grand chien » se dit…", o: ["der große Hund", "der groß Hund", "der großer Hund"], a: 0, why: "Avec l'article défini au singulier : <b>-e</b>." }
    },
    {
      idea: "Avec ein, c'est l'adjectif qui doit annoncer le genre.",
      detail: "Parce que <b>ein</b> ne le dit pas : il vaut pour le masculin comme pour le neutre. L'adjectif prend alors la terminaison que l'article aurait eue — <b>-er</b> au masculin, <b>-es</b> au neutre, <b>-e</b> au féminin.",
      table: [["ein großer Mann", "masculin — -er, comme der"], ["eine große Frau", "féminin — -e, comme die"], ["ein großes Kind", "neutre — -es, comme das"]],
      check: { q: "« Une grande voiture » se dit…", o: ["ein großes Auto", "ein großer Auto", "eine große Auto"], a: 0, why: "<b>Auto</b> est neutre : l'adjectif prend <b>-es</b>, la marque que <b>das</b> aurait portée." }
    },
    {
      idea: "Pour comparer : -er, et als pour « que ».",
      detail: "<b>schnell</b> → <b>schneller</b>. Et on relie avec <b>als</b>, pas avec <b>wie</b> — c'est la faute classique. <b>Sie ist schöner als ich</b>. Les mots courts prennent souvent un tréma au passage : <b>alt</b> → <b>älter</b>, <b>groß</b> → <b>größer</b>.",
      gloss: { de: ["Sie", "ist", "schöner", "als", "ich"], fr: ["Elle", "est", "plus belle", "que", "moi"] },
      check: { q: "« Plus grand que moi » se dit…", o: ["größer als ich", "größer wie ich", "mehr groß als ich"], a: 0, why: "<b>als</b> pour comparer. Et l'allemand n'emploie jamais « plus » devant l'adjectif." }
    },
    {
      idea: "Et pour le superlatif : am … -sten.",
      detail: "<b>Lisa singt am schönsten</b> — Lisa chante le mieux. Quand le superlatif est devant un nom, il prend l'article : <b>die schönste Stadt</b>. Deux formes pour une même idée, selon la place.",
      table: [["schnell", "schneller · am schnellsten"], ["schön", "schöner · am schönsten"], ["gut", "besser · am besten — irrégulier"]],
      check: { q: "« gut » au comparatif donne…", o: ["besser", "guter", "mehr gut"], a: 0, why: "Irrégulier, comme « bon → meilleur » en français. <b>gut · besser · am besten</b>." }
    }
  ],
  examples: [
    { d: "Das Auto ist rot.", f: "La voiture est rouge." },
    { d: "Der große Hund macht mir Angst.", f: "Le grand chien me fait peur." },
    { d: "Das kleine Kind spielt.", f: "Le petit enfant joue." },
    { d: "Ein großes Auto wäre praktisch.", f: "Une grande voiture serait pratique." },
    { d: "Deine neue Tasche ist schön.", f: "Ton nouveau sac est beau." },
    { d: "Frisches Gemüse ist besser.", f: "Les légumes frais sont meilleurs." },
    { d: "Er hat ein interessantes Buch.", f: "Il a un livre intéressant." },
    { d: "Sie ist schöner als ich.", f: "Elle est plus belle que moi." },
    { d: "Meine Stadt ist die schönste.", f: "Ma ville est la plus belle." },
    { d: "Lisa singt am schönsten.", f: "Lisa chante le mieux." },
    { d: "Die Blumen im Garten sind bunt.", f: "Les fleurs du jardin sont colorées." },
    { d: "Dieser Film ist wirklich spannend.", f: "Ce film est vraiment passionnant." }
  ],
  vocab: [
    { d: "groß", f: "grand", p: "GROOSS" },
    { d: "klein", f: "petit", p: "KLAÏN" },
    { d: "alt", f: "vieux", p: "ALT" },
    { d: "neu", f: "neuf, nouveau", p: "NOÏ" },
    { d: "bunt", f: "coloré", p: "BOUNNT" },
    { d: "sportlich", f: "sportif", p: "CHPORT-lich" },
    { d: "die Tasche", f: "le sac", p: "dii TA-che" },
    { d: "die Möbel", f: "les meubles", p: "dii MEU-beul" },
    { d: "besser", f: "meilleur", p: "BÈ-seur" },
    { d: "als", f: "que (comparaison)", p: "ALSS" }
  ],
  quiz: [
    { q: "Après <b>sein</b>, l'adjectif…", o: ["ne change jamais", "prend -e", "prend -en", "prend le genre"], a: 0, why: "<b>Die Blumen sind schön</b> — pas de terminaison, même au pluriel." },
    { q: "« Le grand chien » se dit…", o: ["der große Hund", "der groß Hund", "der großer Hund", "der großen Hund"], a: 0, why: "Avec l'article défini au singulier : <b>-e</b>." },
    { q: "« Une grande voiture » se dit…", o: ["ein großes Auto", "ein großer Auto", "eine große Auto", "ein groß Auto"], a: 0, why: "<b>Auto</b> est neutre : l'adjectif porte le <b>-es</b> que <b>das</b> aurait eu." },
    { q: "Pour comparer, on emploie…", o: ["als", "wie", "mehr", "que"], a: 0, why: "<b>schöner als ich</b>. Employer <b>wie</b> est la faute la plus fréquente." },
    { q: "<b>gut</b> au comparatif donne…", o: ["besser", "guter", "mehr gut", "gutter"], a: 0, why: "Irrégulier, comme « bon → meilleur »." }
  ],
  drills: [
    { t: "gap", f: "La voiture est rouge.", s: "Das Auto ist ___.", a: "rot", why: "Après <b>sein</b>, aucune terminaison." },
    { t: "gap", f: "Les fleurs sont belles.", s: "Die Blumen sind ___.", a: "schön", why: "Même au pluriel, rien ne change." },
    { t: "gap", f: "le grand chien", s: "der ___ Hund", a: "große", why: "Article défini singulier → <b>-e</b>." },
    { t: "gap", f: "le petit enfant", s: "das ___ Kind", a: "kleine", why: "Même règle au neutre." },
    { t: "gap", f: "une grande voiture", s: "ein ___ Auto", a: "großes", why: "<b>ein</b> ne dit pas le genre : l'adjectif prend <b>-es</b>." },
    { t: "gap", f: "un grand homme", s: "ein ___ Mann", a: "großer", why: "Masculin → <b>-er</b>." },
    { t: "gap", f: "une grande femme", s: "eine ___ Frau", a: "große", why: "Féminin → <b>-e</b>." },
    { t: "gap", f: "les vieux meubles", s: "die ___ Möbel", a: "alten", why: "Au pluriel avec article défini → <b>-en</b>." },
    { t: "gap", f: "Elle est plus belle que moi.", s: "Sie ist schöner ___ ich.", a: "als", why: "<b>als</b> pour comparer, jamais <b>wie</b>." },
    { t: "gap", f: "Il a un livre intéressant.", s: "Er hat ein ___ Buch.", a: "interessantes", why: "<b>Buch</b> est neutre → <b>-es</b>." },

    { t: "trans", inst: "Mets l'adjectif devant le nom.", from: "Der Hund ist groß.", a: "Der große Hund.",
      why: "Devant le nom, il prend <b>-e</b> avec l'article défini." },
    { t: "trans", inst: "Mets l'adjectif devant le nom.", from: "Das Kind ist klein.", a: "Das kleine Kind.",
      why: "Même règle au neutre." },
    { t: "trans", inst: "Reformule avec « ist ».", from: "Das neue Buch.", a: "Das Buch ist neu.",
      why: "Après <b>ist</b>, l'adjectif perd sa terminaison." },
    { t: "trans", inst: "Remplace « der » par « ein ».", from: "Der große Mann.", a: "Ein großer Mann.",
      why: "<b>ein</b> ne dit pas le genre : l'adjectif reprend le <b>-er</b> de <b>der</b>." },
    { t: "trans", inst: "Mets au comparatif.", from: "Sie ist schön.", a: "Sie ist schöner.",
      why: "On ajoute <b>-er</b> à l'adjectif." },
    { t: "trans", inst: "Mets au comparatif.", from: "Das Auto ist alt.", a: "Das Auto ist älter.",
      why: "Les mots courts prennent souvent un tréma : <b>alt</b> → <b>älter</b>." },
    { t: "trans", inst: "Corrige la faute.", from: "Sie ist schöner wie ich.", a: "Sie ist schöner als ich.",
      why: "On compare avec <b>als</b>." },

    { t: "order", f: "Le grand chien me fait peur.", a: "Der große Hund macht mir Angst",
      why: "<b>Angst machen</b> se construit avec le datif <b>mir</b>." },
    { t: "order", f: "Une grande voiture serait pratique.", a: "Ein großes Auto wäre praktisch",
      why: "Après <b>wäre</b>, l'adjectif ne change pas." },
    { t: "order", f: "Ton nouveau sac est beau.", a: "Deine neue Tasche ist schön",
      why: "<b>Tasche</b> est féminin → <b>deine neue</b>." },
    { t: "order", f: "Ma ville est la plus belle.", a: "Meine Stadt ist die schönste",
      why: "Le superlatif devant un nom sous-entendu prend l'article." },
    { t: "order", f: "Ce film est vraiment passionnant.", a: "Dieser Film ist wirklich spannend",
      why: "Après <b>ist</b>, <b>spannend</b> reste nu." },

    { t: "trad", f: "La voiture est rouge.", a: "Das Auto ist rot.",
      why: "La position facile." },
    { t: "trad", f: "Le petit enfant joue.", a: "Das kleine Kind spielt.",
      why: "Devant le nom → <b>-e</b>." },
    { t: "trad", f: "Une grande voiture.", a: "Ein großes Auto.",
      why: "Neutre avec <b>ein</b> → <b>-es</b>." },
    { t: "trad", f: "Elle est plus belle que moi.", a: "Sie ist schöner als ich.",
      why: "<b>-er</b> puis <b>als</b>." },
    { t: "trad", f: "Les légumes frais sont meilleurs.", a: "Frisches Gemüse ist besser.",
      why: "Sans article, l'adjectif prend la terminaison de l'article absent." },
    { t: "trad", f: "Mon frère est très sportif.", a: "Mein Bruder ist sehr sportlich.",
      why: "Après <b>ist</b>, aucune terminaison." },
    { t: "trad", f: "Lisa chante le mieux.", a: "Lisa singt am schönsten.",
      why: "Superlatif en fin de phrase → <b>am … -sten</b>." }
  ]
},

/* ------------------------------- ÉTAPE 18 -----------------------------
   Unité 17 du livre (p.31) — la vie quotidienne.
   Le livre y aligne des lieux sans dire comment y aller. Or « ich gehe in
   die Schule » et « ich bin in der Schule » ne prennent pas le même cas :
   c'est ici que ça se joue, et c'est un avant-goût de l'étape 33. */
{
  day: 18, title: "Ma journée", de: "Was machst du heute?",
  steps: [
    {
      idea: "Demander le programme de quelqu'un : Was machst du heute?",
      detail: "Mot à mot « que fais-tu aujourd'hui ? ». <b>machen</b> est un verbe régulier, et l'un des plus employés de la langue. Change <b>heute</b> et tu as toutes les variantes : <b>morgen</b>, <b>am Wochenende</b>.",
      gloss: { de: ["Was", "machst", "du", "heute"], fr: ["Que", "fais", "tu", "aujourd'hui"] }
    },
    {
      idea: "Les moments de la journée servent de repères.",
      detail: "Ils s'emploient tels quels, sans préposition : <b>heute Morgen</b> (ce matin), <b>heute Abend</b> (ce soir). Attention à <b>morgen</b> en minuscule, qui veut dire « demain », contre <b>der Morgen</b> avec majuscule, le matin.",
      table: [["heute Morgen", "ce matin"], ["heute Abend", "ce soir"], ["morgen", "demain — minuscule"], ["gestern", "hier"]],
      check: { q: "<b>morgen früh</b> veut dire…", o: ["demain matin", "ce matin tôt", "hier matin"], a: 0, why: "<b>morgen</b> en minuscule = demain, <b>früh</b> = tôt. Donc demain matin." }
    },
    {
      idea: "Voici le point qui compte : aller quelque part ou y être.",
      detail: "Ce n'est pas la même chose, et l'allemand le marque. Quand tu y <b>vas</b>, le lieu est un complément — accusatif. Quand tu y <b>es</b>, il est un repère — datif. Le même mot, deux formes.",
      table: [["Ich gehe in die Schule.", "Je vais à l'école — accusatif"], ["Ich bin in der Schule.", "Je suis à l'école — datif"]],
      check: { q: "« Je suis à la bibliothèque » se dit…", o: ["Ich bin in der Bibliothek", "Ich bin in die Bibliothek", "Ich gehe in der Bibliothek"], a: 0, why: "On y est, on ne s'y rend pas : datif, donc <b>in der</b>." }
    },
    {
      idea: "Les lieux du quotidien, avec leur article.",
      detail: "Apprends-les avec <b>der / die / das</b>, comme toujours : c'est cet article qui deviendra <b>den</b> ou <b>dem</b> selon que tu y vas ou que tu y es.",
      table: [["die Arbeit", "le travail"], ["die Schule", "l'école"], ["die Bibliothek", "la bibliothèque"], ["der Supermarkt", "le supermarché"], ["der Park", "le parc"], ["das Haus", "la maison"]]
    },
    {
      idea: "Et deux formules figées, qui ne suivent aucune règle.",
      detail: "<b>nach Hause</b> quand on rentre chez soi, <b>zu Hause</b> quand on y est. Elles ne prennent pas d'article et ne s'expliquent pas — ce sont des restes d'un allemand plus ancien. À apprendre telles quelles, elles servent tous les jours.",
      table: [["Ich gehe nach Hause.", "Je rentre à la maison."], ["Ich bin zu Hause.", "Je suis à la maison."]],
      check: { q: "« Je rentre à la maison » se dit…", o: ["Ich gehe nach Hause", "Ich gehe zu Hause", "Ich gehe in das Haus"], a: 0, why: "<b>nach Hause</b> pour le mouvement, <b>zu Hause</b> pour la position." }
    }
  ],
  examples: [
    { d: "Was machst du heute?", f: "Que fais-tu aujourd'hui ?" },
    { d: "Ich gehe heute Morgen zur Arbeit.", f: "Je vais au travail ce matin." },
    { d: "Ich gehe in die Schule.", f: "Je vais à l'école." },
    { d: "Ich bin in der Schule.", f: "Je suis à l'école." },
    { d: "Ich gehe nach Hause.", f: "Je rentre à la maison." },
    { d: "Ich bin heute Abend zu Hause.", f: "Je suis à la maison ce soir." },
    { d: "Meine Mutter geht in den Park.", f: "Ma mère va au parc." },
    { d: "Ich werde in die Bibliothek gehen.", f: "Je vais aller à la bibliothèque." },
    { d: "Ich lerne für meine Prüfungen.", f: "Je révise pour mes examens." },
    { d: "Viel Glück beim Lernen!", f: "Bonne chance pour tes études !" },
    { d: "Mein Freund geht ins Restaurant.", f: "Mon ami va au restaurant." },
    { d: "Morgen früh gehe ich einkaufen.", f: "Demain matin, je vais faire les courses." }
  ],
  vocab: [
    { d: "der Park", f: "le parc", p: "dèr PARK" },
    { d: "der Spaziergang", f: "la promenade", p: "dèr chpa-TSIIR-gang" },
    { d: "einkaufen", f: "faire les courses", p: "AÏN-kaou-fenn" },
    { d: "nach Hause", f: "à la maison (en y allant)", p: "nakh HAOU-ze" },
    { d: "zu Hause", f: "à la maison (en y étant)", p: "tsou HAOU-ze" },
    { d: "heute Abend", f: "ce soir", p: "HOÏ-te AA-bennt" },
    { d: "morgen früh", f: "demain matin", p: "MOR-guenn FRU" },
    { d: "das Restaurant", f: "le restaurant", p: "das rès-to-RANNG" },
    { d: "gehen", f: "aller", p: "GUÉ-enn" },
    { d: "werden", f: "aller (futur)", p: "VÈR-denn" }
  ],
  quiz: [
    { q: "« Je vais à l'école » se dit…", o: ["Ich gehe in die Schule", "Ich gehe in der Schule", "Ich gehe in dem Schule", "Ich gehe zu Schule"], a: 0, why: "On s'y rend → accusatif → <b>in die</b>." },
    { q: "« Je suis à l'école » se dit…", o: ["Ich bin in der Schule", "Ich bin in die Schule", "Ich bin zur Schule", "Ich bin in dem Schule"], a: 0, why: "On y est → datif → <b>in der</b>." },
    { q: "<b>morgen</b> en minuscule veut dire…", o: ["demain", "le matin", "hier", "maintenant"], a: 0, why: "<b>der Morgen</b> avec majuscule, c'est le matin. En minuscule, c'est demain." },
    { q: "« Je rentre à la maison » se dit…", o: ["Ich gehe nach Hause", "Ich gehe zu Hause", "Ich gehe nach Haus", "Ich gehe in Hause"], a: 0, why: "<b>nach Hause</b> pour le mouvement — formule figée." },
    { q: "Quel cas quand on VA quelque part ?", o: ["l'accusatif", "le datif", "le génitif", "le nominatif"], a: 0, why: "Mouvement → accusatif. Position → datif. C'est la règle de l'étape 33 en avant-goût." }
  ],
  drills: [
    { t: "gap", f: "Je vais à l'école.", s: "Ich gehe in ___ Schule.", a: "die", why: "Mouvement → accusatif → <b>die</b>." },
    { t: "gap", f: "Je suis à l'école.", s: "Ich bin in ___ Schule.", a: "der", why: "Position → datif → <b>der</b>." },
    { t: "gap", f: "Ma mère va au parc.", s: "Meine Mutter geht in ___ Park.", a: "den", why: "Mouvement + masculin → <b>den</b>." },
    { t: "gap", f: "Je suis dans le parc.", s: "Ich bin in ___ Park.", a: "dem", why: "Position + masculin → <b>dem</b>." },
    { t: "gap", f: "Je rentre à la maison.", s: "Ich gehe ___ Hause.", a: "nach", why: "Formule figée pour le mouvement." },
    { t: "gap", f: "Je suis à la maison.", s: "Ich bin ___ Hause.", a: "zu", why: "Formule figée pour la position." },
    { t: "gap", f: "Que fais-tu aujourd'hui ?", s: "Was ___ du heute?", a: "machst", why: "<b>machen</b> est régulier : <b>du machst</b>." },
    { t: "gap", f: "Demain matin, je fais les courses.", s: "___ früh gehe ich einkaufen.", a: "Morgen", why: "<b>morgen früh</b> = demain matin." },
    { t: "gap", f: "Je révise pour mes examens.", s: "Ich lerne für meine ___.", a: "Prüfungen", why: "<b>-ung</b> → féminin, pluriel en <b>-en</b>." },
    { t: "gap", f: "Bonne chance !", s: "Viel ___!", a: "Glück", why: "<b>viel Glück</b>, sans article." },

    { t: "trans", inst: "Passe du mouvement à la position.", from: "Ich gehe in die Schule.", a: "Ich bin in der Schule.",
      why: "L'accusatif devient datif : on n'y va plus, on y est." },
    { t: "trans", inst: "Passe de la position au mouvement.", from: "Ich bin im Park.", a: "Ich gehe in den Park.",
      why: "Le datif devient accusatif." },
    { t: "trans", inst: "Passe du mouvement à la position.", from: "Ich gehe nach Hause.", a: "Ich bin zu Hause.",
      why: "Les deux formules figées de la maison." },
    { t: "trans", inst: "Mets à la deuxième personne (du).", from: "Ich gehe in die Bibliothek.", a: "Du gehst in die Bibliothek.",
      why: "<b>gehen</b> est régulier : <b>du gehst</b>." },
    { t: "trans", inst: "Corrige la faute.", from: "Ich bin in die Schule.", a: "Ich bin in der Schule.",
      why: "On y est : il faut le datif." },
    { t: "trans", inst: "Corrige la faute.", from: "Ich gehe zu Hause.", a: "Ich gehe nach Hause.",
      why: "Mouvement → <b>nach Hause</b>." },

    { t: "order", f: "Je vais au travail ce matin.", a: "Ich gehe heute Morgen zur Arbeit",
      why: "Le temps avant le lieu." },
    { t: "order", f: "Que fais-tu aujourd'hui ?", a: "Was machst du heute",
      why: "Mot interrogatif, verbe, sujet." },
    { t: "order", f: "Je suis à la maison ce soir.", a: "Ich bin heute Abend zu Hause",
      why: "<b>zu Hause</b> reste en bloc, en fin de phrase." },
    { t: "order", f: "Ma mère va au parc.", a: "Meine Mutter geht in den Park",
      why: "Mouvement → <b>in den</b>." },
    { t: "order", f: "Je révise pour mes examens.", a: "Ich lerne für meine Prüfungen",
      why: "<b>für</b> demande toujours l'accusatif." },

    { t: "trad", f: "Que fais-tu aujourd'hui ?", a: "Was machst du heute?",
      why: "La question du quotidien." },
    { t: "trad", f: "Je vais à l'école.", a: "Ich gehe in die Schule.",
      why: "Mouvement → accusatif." },
    { t: "trad", f: "Je suis à l'école.", a: "Ich bin in der Schule.",
      why: "Position → datif." },
    { t: "trad", f: "Je rentre à la maison.", a: "Ich gehe nach Hause.",
      why: "Formule figée." },
    { t: "trad", f: "Je suis à la maison.", a: "Ich bin zu Hause.",
      why: "L'autre formule figée." },
    { t: "trad", f: "Mon ami va au restaurant.", a: "Mein Freund geht ins Restaurant.",
      why: "<b>ins</b> est la contraction de <b>in das</b>." },
    { t: "trad", f: "Bonne chance pour tes études !", a: "Viel Glück beim Lernen!",
      why: "<b>beim</b> est la contraction de <b>bei dem</b>." }
  ]
},

/* ------------------------------- ÉTAPE 19 -----------------------------
   Unité 18 du livre (p.32) — l'heure.
   Le livre donne treize façons de dire l'heure sans jamais signaler le
   piège : « halb zwei » vaut 1 h 30, pas 2 h 30. L'allemand compte vers
   l'heure à venir. C'est LA faute qui fait rater un rendez-vous, donc
   elle a son écran à elle. */
{
  day: 19, title: "L'heure", de: "Wie spät ist es?",
  steps: [
    {
      idea: "Demander l'heure : Wie spät ist es?",
      detail: "Mot à mot « comment tard est-il ? ». On entend aussi <b>Wie viel Uhr ist es?</b>, tout aussi correct. Pour répondre, on commence toujours par <b>Es ist…</b>",
      gloss: { de: ["Wie", "spät", "ist", "es"], fr: ["Comment", "tard", "est", "il"] }
    },
    {
      idea: "L'heure pleine est la plus simple : le nombre, puis Uhr.",
      detail: "<b>Es ist drei Uhr</b> — il est trois heures. Quand il donne l'heure, <b>Uhr</b> reste au singulier : on dit <b>zwei Uhr</b>, jamais « zwei Uhren ». Le mot a bien un pluriel — <b>die Uhren</b>, les montres — mais pas dans ce sens-là. Et pour donner un rendez-vous, on met <b>um</b> devant : <b>um acht Uhr</b>.",
      table: [["Es ist drei Uhr.", "Il est trois heures."], ["um acht Uhr", "à huit heures"], ["Mittag", "midi"], ["Mitternacht", "minuit"]],
      check: { q: "« À sept heures » se dit…", o: ["um sieben Uhr", "in sieben Uhr", "an sieben Uhr"], a: 0, why: "<b>um</b> introduit une heure précise." }
    },
    {
      idea: "Pour les minutes : nach quand elles sont passées, vor quand elles manquent.",
      detail: "<b>zehn nach drei</b> — dix après trois, donc 3 h 10. <b>zehn vor drei</b> — dix avant trois, donc 2 h 50. C'est la même logique qu'en français avec « et » et « moins ».",
      table: [["zehn nach drei", "3 h 10"], ["zehn vor drei", "2 h 50"], ["Viertel nach zwei", "2 h 15"], ["Viertel vor zehn", "9 h 45"]],
      check: { q: "<b>Viertel vor zehn</b>, c'est…", o: ["9 h 45", "10 h 15", "10 h 45"], a: 0, why: "Un quart <b>avant</b> dix heures : 9 h 45." }
    },
    {
      idea: "Attention — le piège qui fait rater les rendez-vous : halb.",
      detail: "<b>halb zwei</b> ne veut PAS dire deux heures et demie. Ça veut dire <b>1 h 30</b>. L'allemand compte vers l'heure <u>à venir</u> : « à la moitié du chemin vers deux heures ». Le français, lui, compte depuis l'heure passée. Retiens-le comme ça : <b>halb</b> + le nombre que tu entends, moins une heure.",
      gloss: { de: ["halb", "zwei"], fr: ["1 h", "30"] },
      check: { q: "<b>halb acht</b>, c'est…", o: ["7 h 30", "8 h 30", "8 h 00"], a: 0, why: "À mi-chemin vers huit heures, donc 7 h 30. Une heure de moins que ce qu'on entend." }
    },
    {
      idea: "Et la façon officielle, qui ne piège personne.",
      detail: "Dans les gares, les horaires, les rendez-vous notés, on dit simplement le nombre : <b>acht Uhr vierzig</b> pour 8 h 40. C'est plus long mais toujours juste — si tu hésites, prends celle-là.",
      table: [["8 h 40", "acht Uhr vierzig"], ["9 h 45", "neun Uhr fünfundvierzig"], ["1 h 30", "ein Uhr dreißig"]]
    },
    {
      idea: "Les moments de la journée servent à situer sans donner d'heure.",
      detail: "<b>am Morgen</b>, <b>am Nachmittag</b>, <b>am Abend</b> — avec <b>am</b>. Mais <b>in der Nacht</b> pour la nuit, qui est féminine. Et pour dire quand, sans préposition : <b>heute</b>, <b>morgen</b>, <b>gestern</b>.",
      table: [["am Morgen", "le matin"], ["am Nachmittag", "l'après-midi"], ["am Abend", "le soir"], ["in der Nacht", "la nuit"]],
      check: { q: "« Le soir » se dit…", o: ["am Abend", "in Abend", "im Abend"], a: 0, why: "<b>am</b> pour les moments de la journée — sauf la nuit, qui prend <b>in der</b>." }
    }
  ],
  examples: [
    { d: "Wie spät ist es?", f: "Quelle heure est-il ?" },
    { d: "Es ist drei Uhr.", f: "Il est trois heures." },
    { d: "Es ist halb zwei.", f: "Il est une heure et demie." },
    { d: "Es ist Viertel nach zwei.", f: "Il est deux heures et quart." },
    { d: "Es ist Viertel vor zehn.", f: "Il est dix heures moins le quart." },
    { d: "Wir treffen uns um acht Uhr.", f: "Nous nous retrouvons à huit heures." },
    { d: "Der Zug fährt um halb sieben ab.", f: "Le train part à six heures et demie." },
    { d: "Ich wache um sieben Uhr auf.", f: "Je me réveille à sept heures." },
    { d: "Am Morgen trinke ich Kaffee.", f: "Le matin, je bois du café." },
    { d: "Am Abend lese ich ein Buch.", f: "Le soir, je lis un livre." },
    { d: "Es ist acht Uhr vierzig.", f: "Il est huit heures quarante." },
    { d: "Um wie viel Uhr kommst du?", f: "À quelle heure viens-tu ?" }
  ],
  vocab: [
    { d: "die Uhr", f: "l'heure, la montre", p: "dii OUR" },
    { d: "die Stunde", f: "l'heure (durée)", p: "dii CHTOUNN-de" },
    { d: "die Minute", f: "la minute", p: "dii mi-NOU-te" },
    { d: "halb", f: "et demie (heure à venir)", p: "HALP" },
    { d: "das Viertel", f: "le quart", p: "das FIR-teul" },
    { d: "nach", f: "après (heure)", p: "NAAKH" },
    { d: "vor", f: "avant (heure)", p: "FOOR" },
    { d: "Mittag", f: "midi", p: "MI-taak" },
    { d: "Mitternacht", f: "minuit", p: "MI-teur-nakht" },
    { d: "aufwachen", f: "se réveiller", p: "AOUF-va-khenn" }
  ],
  quiz: [
    { q: "<b>halb zwei</b>, c'est…", o: ["1 h 30", "2 h 30", "2 h 00", "1 h 00"], a: 0, why: "L'allemand compte vers l'heure à venir : à mi-chemin vers deux heures." },
    { q: "<b>Viertel vor zehn</b>, c'est…", o: ["9 h 45", "10 h 15", "10 h 45", "9 h 15"], a: 0, why: "Un quart <b>avant</b> dix heures." },
    { q: "« À huit heures » se dit…", o: ["um acht Uhr", "an acht Uhr", "in acht Uhr", "zu acht Uhr"], a: 0, why: "<b>um</b> introduit toujours une heure précise." },
    { q: "Quelle façon de dire l'heure ne piège jamais ?", o: ["le nombre suivi de Uhr", "halb", "Viertel vor", "nach"], a: 0, why: "<b>acht Uhr vierzig</b> est plus long mais toujours juste." },
    { q: "« La nuit » se dit…", o: ["in der Nacht", "am Nacht", "an der Nacht", "im Nacht"], a: 0, why: "Les moments prennent <b>am</b>, sauf la nuit : <b>in der Nacht</b>." }
  ],
  drills: [
    { t: "gap", f: "Quelle heure est-il ?", s: "Wie ___ ist es?", a: "spät", why: "Mot à mot « comment tard »." },
    { t: "gap", f: "Il est trois heures.", s: "Es ist drei ___.", a: "Uhr", why: "Pour donner l'heure, <b>Uhr</b> reste au singulier." },
    { t: "gap", f: "1 h 30", s: "___ zwei", a: "halb", why: "L'allemand vise l'heure à venir." },
    { t: "gap", f: "2 h 15", s: "Viertel ___ zwei", a: "nach", why: "Le quart est passé." },
    { t: "gap", f: "9 h 45", s: "Viertel ___ zehn", a: "vor", why: "Le quart manque encore." },
    { t: "gap", f: "À huit heures.", s: "___ acht Uhr", a: "um", why: "<b>um</b> pour une heure précise." },
    { t: "gap", f: "Le matin", s: "___ Morgen", a: "am", why: "<b>am</b> pour les moments de la journée." },
    { t: "gap", f: "La nuit", s: "___ der Nacht", a: "in", why: "L'exception : <b>in der Nacht</b>." },
    { t: "gap", f: "Il est midi.", s: "Es ist ___.", a: "Mittag", why: "Sans article ni <b>Uhr</b>." },
    { t: "gap", f: "Je me réveille à sept heures.", s: "Ich wache um sieben Uhr ___.", a: "auf", why: "<b>aufwachen</b> est séparable : la particule part à la fin." },

    { t: "trans", inst: "Écris l'heure en chiffres.", from: "halb zwei", a: "1h30",
      why: "À mi-chemin vers deux heures." },
    { t: "trans", inst: "Écris l'heure en chiffres.", from: "halb acht", a: "7h30",
      why: "Une heure de moins que le nombre entendu." },
    { t: "trans", inst: "Écris l'heure en chiffres.", from: "Viertel vor zehn", a: "9h45",
      why: "Un quart avant dix." },
    { t: "trans", inst: "Écris l'heure en chiffres.", from: "Viertel nach zwei", a: "2h15",
      why: "Un quart après deux." },
    { t: "trans", inst: "Dis-le de la façon officielle.", from: "Viertel vor zehn", a: "neun Uhr fünfundvierzig",
      why: "Le nombre suivi de <b>Uhr</b>, puis les minutes." },
    { t: "trans", inst: "Dis-le de la façon officielle.", from: "halb zwei", a: "ein Uhr dreißig",
      why: "Plus long, mais sans piège." },
    { t: "trans", inst: "Corrige : ce n'est pas 8 h 30.", from: "halb acht heißt 8h30", a: "halb acht heißt 7h30",
      why: "L'allemand compte vers l'heure à venir." },

    { t: "order", f: "Nous nous retrouvons à huit heures.", a: "Wir treffen uns um acht Uhr",
      why: "<b>sich treffen</b> est réfléchi : <b>uns</b> après le verbe." },
    { t: "order", f: "Le matin, je bois du café.", a: "Am Morgen trinke ich Kaffee",
      why: "Le complément en tête pousse le sujet après le verbe." },
    { t: "order", f: "Je me réveille à sept heures.", a: "Ich wache um sieben Uhr auf",
      why: "La particule <b>auf</b> part en fin de phrase." },
    { t: "order", f: "À quelle heure viens-tu ?", a: "Um wie viel Uhr kommst du",
      why: "Le groupe interrogatif en place 1, le verbe en place 2." },
    { t: "order", f: "Le soir, je lis un livre.", a: "Am Abend lese ich ein Buch",
      why: "Même inversion qu'avec <b>am Morgen</b>." },

    { t: "trad", f: "Quelle heure est-il ?", a: "Wie spät ist es?",
      why: "La question de base." },
    { t: "trad", f: "Il est une heure et demie.", a: "Es ist halb zwei.",
      why: "Le piège de l'étape : <b>halb zwei</b> = 1 h 30." },
    { t: "trad", f: "Il est deux heures et quart.", a: "Es ist Viertel nach zwei.",
      why: "Le quart est passé → <b>nach</b>." },
    { t: "trad", f: "À huit heures.", a: "Um acht Uhr.",
      why: "<b>um</b> pour une heure précise." },
    { t: "trad", f: "Il est midi.", a: "Es ist Mittag.",
      why: "Ni article ni <b>Uhr</b>." },
    { t: "trad", f: "Le matin, je bois du café.", a: "Am Morgen trinke ich Kaffee.",
      why: "<b>am</b> + moment, puis inversion." },
    { t: "trad", f: "À quelle heure viens-tu ?", a: "Um wie viel Uhr kommst du?",
      why: "Question ouverte : verbe en place 2." }
  ]
},

/* ------------------------------- ÉTAPE 20 -----------------------------
   Unité 19 du livre (p.33-34) — les adverbes.
   Le livre les range en cinq familles et s'arrête là. On ajoute les deux
   choses qui servent vraiment : un adverbe ne se décline JAMAIS (soulagement
   après l'étape 17), et l'ordre temps-manière-lieu, qui décide de la place
   des mots dès qu'on met deux compléments dans une phrase. */
{
  day: 20, title: "Les adverbes", de: "Er läuft schnell.",
  steps: [
    {
      idea: "Bonne nouvelle après les adjectifs : un adverbe ne change jamais.",
      detail: "Aucune terminaison, jamais, dans aucun cas. <b>Er läuft schnell</b>, <b>sie laufen schnell</b>, <b>wir liefen schnell</b> — <b>schnell</b> reste <b>schnell</b>. Après le chapitre des adjectifs, c'est du repos.",
      gloss: { de: ["Er", "läuft", "schnell"], fr: ["Il", "court", "vite"] }
    },
    {
      idea: "Et mieux : l'adjectif sert d'adverbe tel quel.",
      detail: "Là où le français ajoute <b>-ment</b> — rapide → rapidement — l'allemand ne change rien. <b>schnell</b> veut dire « rapide » et « rapidement » selon la place. Un mot appris, deux emplois.",
      table: [["Das Auto ist schnell.", "La voiture est rapide. — adjectif"], ["Er läuft schnell.", "Il court vite. — adverbe"]],
      check: { q: "Comment dit-on « rapidement » ?", o: ["schnell", "schnellment", "schnellich"], a: 0, why: "Le même mot que « rapide ». L'allemand n'a pas d'équivalent de <b>-ment</b>." }
    },
    {
      idea: "Les cinq familles, pour savoir ce qu'on cherche.",
      detail: "Elles répondent chacune à une question : comment, quand, où, combien, à quelle fréquence. Tu en connais déjà la plupart sans le savoir.",
      table: [["manière", "schnell · leise · gut"], ["temps", "jetzt · gestern · morgen"], ["lieu", "hier · dort · oben"], ["quantité", "sehr · ein bisschen · zu"], ["fréquence", "immer · oft · selten"]],
      check: { q: "<b>selten</b> veut dire…", o: ["rarement", "souvent", "toujours"], a: 0, why: "<b>immer</b> toujours, <b>oft</b> souvent, <b>selten</b> rarement." }
    },
    {
      idea: "Deux mots à ne pas confondre : sehr et viel.",
      detail: "<b>sehr</b> accompagne un adjectif ou un adverbe — <b>sehr gut</b>, <b>sehr schnell</b>. <b>viel</b> accompagne un verbe — <b>ich arbeite viel</b>. On ne dit pas « ich arbeite sehr », ni « sehr viel Bücher ».",
      table: [["sehr + adjectif", "Er ist sehr freundlich."], ["viel + verbe", "Ich arbeite viel."]],
      check: { q: "« Je travaille beaucoup » se dit…", o: ["Ich arbeite viel", "Ich arbeite sehr", "Ich sehr arbeite"], a: 0, why: "<b>viel</b> avec un verbe. <b>sehr</b> ne s'emploie qu'avec un adjectif ou un adverbe." }
    },
    {
      idea: "Quand il y a plusieurs compléments : temps, manière, lieu.",
      detail: "Dans cet ordre. <b>Ich fahre <u>morgen</u> <u>mit dem Bus</u> <u>nach Berlin</u></b> — quand, comment, où. Le français fait souvent l'inverse ; c'est la règle qui rend une phrase longue naturelle plutôt que bancale.",
      gloss: { de: ["Ich", "fahre", "morgen", "mit dem Bus", "nach Berlin"], fr: ["Je", "vais", "demain", "en bus", "à Berlin"] },
      check: { q: "Dans quel ordre place-t-on les compléments ?", o: ["temps, manière, lieu", "lieu, temps, manière", "manière, lieu, temps"], a: 0, why: "Quand, comment, où. Le contraire du réflexe français." }
    }
  ],
  examples: [
    { d: "Er läuft schnell.", f: "Il court vite." },
    { d: "Sie spricht leise.", f: "Elle parle doucement." },
    { d: "Wir arbeiten gut.", f: "Nous travaillons bien." },
    { d: "Ich gehe jetzt zur Schule.", f: "Je vais à l'école maintenant." },
    { d: "Gestern hat es geregnet.", f: "Hier, il a plu." },
    { d: "Die Katze schläft dort.", f: "Le chat dort là-bas." },
    { d: "Er ist sehr freundlich.", f: "Il est très aimable." },
    { d: "Ich verstehe ein bisschen Deutsch.", f: "Je comprends un peu l'allemand." },
    { d: "Wir essen immer um sieben Uhr.", f: "Nous mangeons toujours à sept heures." },
    { d: "Er geht oft ins Kino.", f: "Il va souvent au cinéma." },
    { d: "Sie liest selten Bücher.", f: "Elle lit rarement des livres." },
    { d: "Ich fahre morgen mit dem Bus nach Berlin.", f: "Je vais demain en bus à Berlin." }
  ],
  vocab: [
    { d: "schnell", f: "vite, rapide", p: "CHNÈL" },
    { d: "leise", f: "doucement", p: "LAÏ-ze" },
    { d: "jetzt", f: "maintenant", p: "YÈTST" },
    { d: "dort", f: "là-bas", p: "DORT" },
    { d: "oben", f: "au-dessus", p: "OO-benn" },
    { d: "sehr", f: "très", p: "ZÉÉR" },
    { d: "ein bisschen", f: "un peu", p: "aïn BISS-cheun" },
    { d: "immer", f: "toujours", p: "I-meur" },
    { d: "oft", f: "souvent", p: "OFT" },
    { d: "selten", f: "rarement", p: "ZÈL-tenn" }
  ],
  quiz: [
    { q: "Un adverbe allemand…", o: ["ne change jamais de forme", "prend -e", "s'accorde", "prend -ment"], a: 0, why: "Aucune terminaison, dans aucun cas." },
    { q: "Comment dit-on « rapidement » ?", o: ["schnell", "schnellment", "schnelle", "schnellich"], a: 0, why: "Le même mot que l'adjectif : l'allemand n'a pas de <b>-ment</b>." },
    { q: "« Je travaille beaucoup » se dit…", o: ["Ich arbeite viel", "Ich arbeite sehr", "Ich arbeite gut", "Sehr ich arbeite"], a: 0, why: "<b>viel</b> avec un verbe, <b>sehr</b> avec un adjectif." },
    { q: "<b>selten</b> veut dire…", o: ["rarement", "souvent", "toujours", "parfois"], a: 0, why: "Le contraire de <b>oft</b>." },
    { q: "Dans quel ordre place-t-on les compléments ?", o: ["temps, manière, lieu", "lieu, manière, temps", "manière, temps, lieu", "peu importe"], a: 0, why: "Quand, comment, où — l'inverse du réflexe français." }
  ],
  drills: [
    { t: "gap", f: "Il court vite.", s: "Er läuft ___.", a: "schnell", why: "L'adjectif sert d'adverbe tel quel." },
    { t: "gap", f: "Elle parle doucement.", s: "Sie spricht ___.", a: "leise", why: "Aucune terminaison." },
    { t: "gap", f: "Je vais à l'école maintenant.", s: "Ich gehe ___ zur Schule.", a: "jetzt", why: "Adverbe de temps." },
    { t: "gap", f: "Le chat dort là-bas.", s: "Die Katze schläft ___.", a: "dort", why: "Adverbe de lieu." },
    { t: "gap", f: "Il est très aimable.", s: "Er ist ___ freundlich.", a: "sehr", why: "<b>sehr</b> devant un adjectif." },
    { t: "gap", f: "Je travaille beaucoup.", s: "Ich arbeite ___.", a: "viel", why: "<b>viel</b> dit la <b>quantité</b> d'une action — <b>ich arbeite viel</b>. <b>sehr</b> dit l'<b>intensité</b>, surtout devant un adjectif : <b>sehr gut</b>." },
    { t: "gap", f: "Nous mangeons toujours à sept heures.", s: "Wir essen ___ um sieben Uhr.", a: "immer", why: "Adverbe de fréquence, juste après le verbe." },
    { t: "gap", f: "Elle lit rarement des livres.", s: "Sie liest ___ Bücher.", a: "selten", why: "Le contraire de <b>oft</b>." },
    { t: "gap", f: "Je comprends un peu l'allemand.", s: "Ich verstehe ___ ___ Deutsch.", a: "ein bisschen", why: "Deux mots inséparables." },
    { t: "gap", f: "C'est trop lourd.", s: "Das ist ___ schwer.", a: "zu", why: "<b>zu</b> = trop, devant un adjectif." },

    { t: "trans", inst: "Fais-en un adverbe.", from: "Das Auto ist schnell.", a: "Er fährt schnell.",
      why: "Le mot ne change pas : seule sa place change." },
    { t: "trans", inst: "Corrige la faute.", from: "Ich arbeite sehr.", a: "Ich arbeite viel.",
      why: "<b>sehr</b> ne s'emploie pas seul avec un verbe." },
    { t: "trans", inst: "Corrige la faute.", from: "Er ist viel freundlich.", a: "Er ist sehr freundlich.",
      why: "Devant un adjectif, c'est <b>sehr</b>." },
    { t: "trans", inst: "Remplace par le contraire.", from: "Er geht oft ins Kino.", a: "Er geht selten ins Kino.",
      why: "<b>oft</b> souvent, <b>selten</b> rarement." },
    { t: "trans", inst: "Mets l'adverbe de temps en tête.", from: "Ich gehe jetzt zur Schule.", a: "Jetzt gehe ich zur Schule.",
      why: "Le complément en tête pousse le sujet derrière le verbe." },
    { t: "trans", inst: "Remets les compléments dans le bon ordre.", from: "Ich fahre nach Berlin morgen.", a: "Ich fahre morgen nach Berlin.",
      why: "Temps avant lieu." },

    { t: "order", f: "Il court vite.", a: "Er läuft schnell",
      why: "L'adverbe suit le verbe." },
    { t: "order", f: "Hier, il a plu.", a: "Gestern hat es geregnet",
      why: "L'adverbe en tête, le verbe reste en place 2." },
    { t: "order", f: "Je vais demain en bus à Berlin.", a: "Ich fahre morgen mit dem Bus nach Berlin",
      why: "Temps, manière, lieu — dans cet ordre." },
    { t: "order", f: "Nous mangeons toujours à sept heures.", a: "Wir essen immer um sieben Uhr",
      why: "La fréquence juste après le verbe." },
    { t: "order", f: "Il va souvent au cinéma.", a: "Er geht oft ins Kino",
      why: "Même place pour <b>oft</b>." },
    { t: "order", f: "Je comprends un peu l'allemand.", a: "Ich verstehe ein bisschen Deutsch",
      why: "<b>ein bisschen</b> devant ce qu'il mesure." },

    { t: "trad", f: "Il court vite.", a: "Er läuft schnell.",
      why: "Pas de <b>-ment</b> en allemand." },
    { t: "trad", f: "Elle parle doucement.", a: "Sie spricht leise.",
      why: "Adjectif employé tel quel." },
    { t: "trad", f: "Il est très aimable.", a: "Er ist sehr freundlich.",
      why: "<b>sehr</b> + adjectif." },
    { t: "trad", f: "Je travaille beaucoup.", a: "Ich arbeite viel.",
      why: "<b>viel</b> + verbe." },
    { t: "trad", f: "Elle lit rarement des livres.", a: "Sie liest selten Bücher.",
      why: "<b>lesen</b> → <b>liest</b> à la 3ᵉ personne." },
    { t: "trad", f: "Nous mangeons toujours à sept heures.", a: "Wir essen immer um sieben Uhr.",
      why: "<b>um</b> pour l'heure précise." },
    { t: "trad", f: "Je vais demain en bus à Berlin.", a: "Ich fahre morgen mit dem Bus nach Berlin.",
      why: "Temps, manière, lieu." }
  ]
},

/* ------------------------------- ÉTAPE 21 -----------------------------
   Unité 20 du livre (p.35-36) — les phrases interrogatives.
   Le livre traite bien les deux formes, mais garde pour la fin ce qui
   compte le plus : où part la deuxième partie d'un verbe composé. On le
   remonte, parce que c'est ce qui rend une question naturelle. */
{
  day: 21, title: "Poser des questions", de: "Woher kommst du?",
  steps: [
    {
      idea: "Question à laquelle on répond par oui ou non : le verbe passe en tête.",
      detail: "C'est tout. Pas de mot ajouté, pas d'équivalent de « est-ce que ». <b>Du bist Joseph</b> devient <b>Bist du Joseph?</b> — on échange les deux premiers mots.",
      table: [["Er trinkt gerne Wein.", "Trinkt er gerne Wein ?"], ["Du machst gerne Sport.", "Machst du gerne Sport ?"], ["Anna kommt aus München.", "Kommt Anna aus München ?"]],
      check: { q: "« Aimes-tu le vin ? » se construit en…", o: ["mettant le verbe en premier", "ajoutant « est-ce que »", "changeant le verbe"], a: 0, why: "L'allemand n'a rien qui corresponde à « est-ce que » : il inverse, c'est tout." }
    },
    {
      idea: "Question ouverte : un mot en W- ouvre la marche.",
      detail: "Ils commencent presque tous par <b>w</b> — ce qui les rend faciles à repérer et à retenir en bloc.",
      table: [["wer", "qui"], ["was", "quoi"], ["wo", "où"], ["wann", "quand"], ["warum", "pourquoi"], ["wie", "comment"]],
      check: { q: "<b>wann</b> veut dire…", o: ["quand", "qui", "où", "quoi"], a: 0, why: "<b>wann</b> quand, <b>wo</b> où, <b>wer</b> qui. Ne pas confondre <b>wann</b> et <b>wenn</b>." }
    },
    {
      idea: "Le verbe reste en deuxième position — toujours.",
      detail: "Le mot en W- prend la place 1, le verbe la place 2, le sujet suit. C'est la même règle que dans une phrase affirmative : le verbe ne bouge pas de sa place.",
      gloss: { de: ["Woher", "kommst", "du"], fr: ["D'où", "viens", "tu"] },
      check: { q: "Où se place le verbe dans une question ouverte ?", o: ["en deuxième position", "en première", "à la fin", "n'importe où"], a: 0, why: "Le mot interrogatif prend la place 1, le verbe garde la place 2." }
    },
    {
      idea: "Trois mots pour « qui », selon son rôle.",
      detail: "C'est l'étape 13 qui revient. <b>wer</b> quand il fait l'action, <b>wen</b> quand il la subit, <b>wem</b> quand on lui donne quelque chose. Les mêmes terminaisons que <b>der / den / dem</b>.",
      table: [["wer", "qui — sujet · Wer kommt?"], ["wen", "qui — complément · Wen siehst du?"], ["wem", "à qui · Wem gibst du das Buch?"]],
      check: { q: "« Qui vois-tu ? » se dit…", o: ["Wen siehst du?", "Wer siehst du?", "Wem siehst du?"], a: 0, why: "La personne subit l'action → <b>wen</b>, comme <b>den</b>." }
    },
    {
      idea: "Et le point qui fait toute la différence : les verbes composés.",
      detail: "Quand le verbe est en deux morceaux — particule séparable ou infinitif après un modal — le second morceau part <i>à la fin</i>. <b>Machst du das Fenster <u>auf</u>?</b>, <b>Wann fährt der Zug <u>ab</u>?</b>. C'est ce qui distingue une question naturelle d'une question de débutant.",
      gloss: { de: ["Wann", "fährt", "der Zug", "ab"], fr: ["Quand", "part", "le train", "—"] },
      check: { q: "« Quand part le train ? » se dit…", o: ["Wann fährt der Zug ab?", "Wann abfährt der Zug?", "Wann ab fährt der Zug?"], a: 0, why: "La particule <b>ab</b> se détache et va en fin de phrase." }
    }
  ],
  examples: [
    { d: "Woher kommst du?", f: "D'où viens-tu ?" },
    { d: "Wie heißt du?", f: "Comment t'appelles-tu ?" },
    { d: "Wo wohnst du?", f: "Où habites-tu ?" },
    { d: "Wann fährt der Zug ab?", f: "Quand part le train ?" },
    { d: "Warum lernst du Deutsch?", f: "Pourquoi apprends-tu l'allemand ?" },
    { d: "Was hast du gegessen?", f: "Qu'as-tu mangé ?" },
    { d: "Wen haben sie getroffen?", f: "Qui ont-ils rencontré ?" },
    { d: "Wie viele Geschwister hast du?", f: "Combien de frères et sœurs as-tu ?" },
    { d: "Trinkst du gerne Wein?", f: "Aimes-tu boire du vin ?" },
    { d: "Machst du das Fenster auf?", f: "Ouvres-tu la fenêtre ?" },
    { d: "Kommt Anna aus München?", f: "Anna vient-elle de Munich ?" },
    { d: "Wann kommst du nach Hause?", f: "Quand rentres-tu à la maison ?" }
  ],
  vocab: [
    { d: "wer", f: "qui (sujet)", p: "VÉÉR" },
    { d: "wen", f: "qui (complément)", p: "VÉÉN" },
    { d: "was", f: "quoi", p: "VASS" },
    { d: "wo", f: "où", p: "VOO" },
    { d: "woher", f: "d'où", p: "vo-HÉÉR" },
    { d: "wann", f: "quand", p: "VANN" },
    { d: "warum", f: "pourquoi", p: "va-ROUM" },
    { d: "wie viele", f: "combien de", p: "vii FII-le" },
    { d: "das Fenster", f: "la fenêtre", p: "das FÈNS-teur" },
    { d: "abfahren", f: "partir (train)", p: "AP-faa-renn" }
  ],
  quiz: [
    { q: "Pour poser une question fermée, on…", o: ["met le verbe en premier", "ajoute « est-ce que »", "met le verbe à la fin", "change le verbe"], a: 0, why: "L'allemand n'a pas d'équivalent de « est-ce que »." },
    { q: "Dans une question ouverte, le verbe est…", o: ["en deuxième position", "en première", "à la fin", "après le sujet"], a: 0, why: "Le mot en W- prend la place 1, le verbe garde la place 2." },
    { q: "« Qui vois-tu ? » se dit…", o: ["Wen siehst du?", "Wer siehst du?", "Wem siehst du?", "Was siehst du?"], a: 0, why: "La personne subit l'action → <b>wen</b>." },
    { q: "« Quand part le train ? » se dit…", o: ["Wann fährt der Zug ab?", "Wann abfährt der Zug?", "Wann der Zug abfährt?", "Wann fährt ab der Zug?"], a: 0, why: "La particule séparable part à la fin." },
    { q: "<b>woher</b> veut dire…", o: ["d'où", "où", "vers où", "quand"], a: 0, why: "<b>wo</b> où, <b>woher</b> d'où, <b>wohin</b> vers où." }
  ],
  drills: [
    { t: "gap", f: "D'où viens-tu ?", s: "___ kommst du?", a: "Woher", why: "L'origine → <b>woher</b>." },
    { t: "gap", f: "Où habites-tu ?", s: "___ wohnst du?", a: "Wo", why: "Le lieu où l'on est → <b>wo</b>." },
    { t: "gap", f: "Quand part le train ?", s: "___ fährt der Zug ab?", a: "Wann", why: "Le moment → <b>wann</b>." },
    { t: "gap", f: "Pourquoi apprends-tu l'allemand ?", s: "___ lernst du Deutsch?", a: "Warum", why: "La cause → <b>warum</b>." },
    { t: "gap", f: "Qui vient ?", s: "___ kommt?", a: "Wer", why: "Sujet → <b>wer</b>." },
    { t: "gap", f: "Qui vois-tu ?", s: "___ siehst du?", a: "Wen", why: "Complément → <b>wen</b>." },
    { t: "gap", f: "À qui donnes-tu le livre ?", s: "___ gibst du das Buch?", a: "Wem", why: "Datif → <b>wem</b>." },
    { t: "gap", f: "Quand part le train ?", s: "Wann fährt der Zug ___?", a: "ab", why: "La particule séparable en fin de phrase." },
    { t: "gap", f: "Ouvres-tu la fenêtre ?", s: "Machst du das Fenster ___?", a: "auf", why: "<b>aufmachen</b> se coupe en deux." },
    { t: "gap", f: "Combien de frères et sœurs as-tu ?", s: "___ ___ Geschwister hast du?", a: "Wie viele", why: "Deux mots pour « combien de »." },

    { t: "trans", inst: "Transforme en question fermée.", from: "Du bist Joseph.", a: "Bist du Joseph?",
      why: "On échange les deux premiers mots." },
    { t: "trans", inst: "Transforme en question fermée.", from: "Anna kommt aus München.", a: "Kommt Anna aus München?",
      why: "Le verbe passe devant le sujet." },
    { t: "trans", inst: "Transforme en question fermée.", from: "Er trinkt gerne Wein.", a: "Trinkt er gerne Wein?",
      why: "Rien à ajouter, seulement à inverser." },
    { t: "trans", inst: "Demande le lieu.", from: "Ich wohne in Berlin.", a: "Wo wohnst du?",
      why: "<b>wo</b> en place 1, le verbe en place 2." },
    { t: "trans", inst: "Demande le moment.", from: "Der Zug fährt um acht ab.", a: "Wann fährt der Zug ab?",
      why: "<b>wann</b> devant, et <b>ab</b> reste à la fin." },
    { t: "trans", inst: "Corrige la faute.", from: "Wann abfährt der Zug?", a: "Wann fährt der Zug ab?",
      why: "Le verbe se coupe : <b>fährt</b> en place 2, <b>ab</b> à la fin." },
    { t: "trans", inst: "Corrige la faute.", from: "Wer siehst du?", a: "Wen siehst du?",
      why: "La personne est complément → <b>wen</b>." },

    { t: "order", f: "D'où viens-tu ?", a: "Woher kommst du",
      why: "Mot en W-, verbe, sujet." },
    { t: "order", f: "Quand part le train ?", a: "Wann fährt der Zug ab",
      why: "La particule ferme la phrase." },
    { t: "order", f: "Pourquoi apprends-tu l'allemand ?", a: "Warum lernst du Deutsch",
      why: "Même charpente." },
    { t: "order", f: "Aimes-tu boire du vin ?", a: "Trinkst du gerne Wein",
      why: "Question fermée : verbe en tête." },
    { t: "order", f: "Combien de frères et sœurs as-tu ?", a: "Wie viele Geschwister hast du",
      why: "Le groupe interrogatif compte pour la place 1." },
    { t: "order", f: "Ouvres-tu la fenêtre ?", a: "Machst du das Fenster auf",
      why: "Verbe en tête, particule à la fin." },

    { t: "trad", f: "D'où viens-tu ?", a: "Woher kommst du?",
      why: "<b>woher</b> pour l'origine." },
    { t: "trad", f: "Où habites-tu ?", a: "Wo wohnst du?",
      why: "<b>wo</b> pour le lieu." },
    { t: "trad", f: "Quand part le train ?", a: "Wann fährt der Zug ab?",
      why: "Particule séparable en fin." },
    { t: "trad", f: "Qui vois-tu ?", a: "Wen siehst du?",
      why: "Complément → <b>wen</b>." },
    { t: "trad", f: "Aimes-tu boire du vin ?", a: "Trinkst du gerne Wein?",
      why: "Question fermée, verbe en tête." },
    { t: "trad", f: "Pourquoi apprends-tu l'allemand ?", a: "Warum lernst du Deutsch?",
      why: "<b>warum</b> pour la cause." },
    { t: "trad", f: "Quand rentres-tu à la maison ?", a: "Wann kommst du nach Hause?",
      why: "<b>nach Hause</b> pour le mouvement." }
  ]
},

/* ------------------------------- ÉTAPE 22 -----------------------------
   Unité 21 du livre (p.37-38) — le calendrier.
   Beaucoup de vocabulaire, mais très régulier : tous les jours finissent
   par -tag, tout est masculin, et il n'y a que deux prépositions à retenir
   (am pour les jours, im pour les mois et les saisons). On mène par la
   régularité plutôt que par la liste. */
{
  day: 22, title: "Le calendrier", de: "Welcher Tag ist heute?",
  steps: [
    {
      idea: "Les sept jours finissent tous par -tag. Sauf un.",
      detail: "<b>Mon<u>tag</u></b>, <b>Diens<u>tag</u></b>, <b>Frei<u>tag</u></b>… et <b>Mittwoch</b>, le mercredi, qui veut dire « milieu de semaine ». Il est au milieu, et il est le seul à ne pas suivre le moule — facile à retenir pour cette raison même.",
      table: [["Montag", "lundi"], ["Dienstag", "mardi"], ["Mittwoch", "mercredi — l'exception"], ["Donnerstag", "jeudi"], ["Freitag", "vendredi"], ["Samstag", "samedi"], ["Sonntag", "dimanche"]],
      check: { q: "Quel jour ne finit pas par <b>-tag</b> ?", o: ["Mittwoch", "Freitag", "Sonntag"], a: 0, why: "<b>Mittwoch</b> — le « milieu de semaine ». Tous les autres suivent le moule." }
    },
    {
      idea: "Et ils sont tous masculins : der Montag, der Freitag.",
      detail: "C'est la règle vue à l'étape 5 : jours, mois et saisons sont masculins. Une fois pour toutes, sans exception — pour un domaine entier du vocabulaire, tu n'as plus à te demander le genre.",
      check: { q: "Quel article pour <b>Sonntag</b> ?", o: ["der", "die", "das"], a: 0, why: "Jours, mois et saisons : tous masculins." }
    },
    {
      idea: "Pour dire « le lundi », on emploie am.",
      detail: "<b>am Montag</b> — contraction de <b>an dem</b>. Ça marche pour les sept jours, sans exception. Et <b>am Wochenende</b> pour le week-end.",
      gloss: { de: ["Am", "Montag", "arbeite", "ich"], fr: ["Le", "lundi", "travaille", "je"] },
      check: { q: "« Le vendredi » se dit…", o: ["am Freitag", "im Freitag", "in Freitag"], a: 0, why: "<b>am</b> pour les jours. <b>im</b> sera pour les mois." }
    },
    {
      idea: "Les douze mois, presque tous reconnaissables.",
      detail: "<b>Januar</b>, <b>Februar</b>, <b>März</b>, <b>April</b>… ils ressemblent au français. Trois seulement demandent attention : <b>Juni</b> et <b>Juli</b>, qu'on confond à l'oral, et <b>Oktober</b> avec un <b>k</b>.",
      table: [["Januar · Februar · März", "janvier · février · mars"], ["April · Mai · Juni", "avril · mai · juin"], ["Juli · August · September", "juillet · août · septembre"], ["Oktober · November · Dezember", "octobre · novembre · décembre"]]
    },
    {
      idea: "Pour les mois et les saisons, c'est im.",
      detail: "<b>im Mai</b>, <b>im Winter</b> — contraction de <b>in dem</b>. Retiens la paire : <b>am</b> pour un jour, <b>im</b> pour une période plus longue.",
      table: [["am Montag", "un jour → am"], ["im Mai", "un mois → im"], ["im Sommer", "une saison → im"], ["Frühling · Sommer · Herbst · Winter", "printemps · été · automne · hiver"]],
      check: { q: "« En hiver » se dit…", o: ["im Winter", "am Winter", "in Winter"], a: 0, why: "<b>im</b> pour une période longue — mois ou saison." }
    },
    {
      idea: "Et la date : on emploie l'ordinal.",
      detail: "<b>Heute ist der siebte Mai</b> — aujourd'hui, c'est le septième mai. Ce sont les nombres ordinaux de l'étape 7 qui reviennent : <b>-te</b> jusqu'à 19, <b>-ste</b> à partir de 20.",
      gloss: { de: ["Heute", "ist", "der", "siebte", "Mai"], fr: ["Aujourd'hui", "est", "le", "sept", "mai"] },
      check: { q: "« Le 20 mai » se dit…", o: ["der zwanzigste Mai", "der zwanzigte Mai", "der zwanzig Mai"], a: 0, why: "À partir de 20, l'ordinal prend <b>-ste</b>." }
    }
  ],
  examples: [
    { d: "Welcher Tag ist heute?", f: "Quel jour sommes-nous ?" },
    { d: "Heute ist Mittwoch.", f: "Aujourd'hui, c'est mercredi." },
    { d: "Am Montag arbeite ich.", f: "Le lundi, je travaille." },
    { d: "Der Sonntag ist der Ruhetag.", f: "Le dimanche est le jour de repos." },
    { d: "Im Januar schneit es oft.", f: "En janvier, il neige souvent." },
    { d: "Mein Geburtstag ist im Juli.", f: "Mon anniversaire est en juillet." },
    { d: "Im Winter fahre ich Ski.", f: "En hiver, je fais du ski." },
    { d: "Ich mag die Farben im Herbst.", f: "J'aime les couleurs en automne." },
    { d: "Heute ist der siebte Mai.", f: "Aujourd'hui, c'est le sept mai." },
    { d: "Wir fahren im August in den Urlaub.", f: "Nous partons en vacances en août." },
    { d: "Am Wochenende gehe ich ins Kino.", f: "Le week-end, je vais au cinéma." },
    { d: "Der Mai ist der Monat der Blumen.", f: "Mai est le mois des fleurs." }
  ],
  vocab: [
    { d: "der Montag", f: "lundi", p: "dèr MOON-taak" },
    { d: "der Mittwoch", f: "mercredi", p: "dèr MIT-vokh" },
    { d: "der Sonntag", f: "dimanche", p: "dèr ZONN-taak" },
    { d: "der Monat", f: "le mois", p: "dèr MOO-nat" },
    { d: "das Datum", f: "la date", p: "das DAA-toum" },
    { d: "der Frühling", f: "le printemps", p: "dèr FRU-linng" },
    { d: "der Herbst", f: "l'automne", p: "dèr HÈRPST" },
    { d: "der Winter", f: "l'hiver", p: "dèr VINN-teur" },
    { d: "der Geburtstag", f: "l'anniversaire", p: "dèr gue-BOURTS-taak" },
    { d: "der Urlaub", f: "les vacances", p: "dèr OUR-laoup" }
  ],
  quiz: [
    { q: "Quel jour ne finit pas par <b>-tag</b> ?", o: ["Mittwoch", "Donnerstag", "Samstag", "Freitag"], a: 0, why: "<b>Mittwoch</b>, le « milieu de semaine »." },
    { q: "Quel article pour les jours de la semaine ?", o: ["der", "die", "das", "ça dépend"], a: 0, why: "Jours, mois et saisons sont tous masculins." },
    { q: "« Le vendredi » se dit…", o: ["am Freitag", "im Freitag", "in Freitag", "an Freitag"], a: 0, why: "<b>am</b> pour un jour." },
    { q: "« En hiver » se dit…", o: ["im Winter", "am Winter", "in Winter", "an Winter"], a: 0, why: "<b>im</b> pour un mois ou une saison." },
    { q: "« Le sept mai » se dit…", o: ["der siebte Mai", "der sieben Mai", "der siebste Mai", "die sieben Mai"], a: 0, why: "La date emploie l'ordinal : <b>siebte</b>." }
  ],
  drills: [
    { t: "gap", f: "lundi", s: "der ___", a: "Montag", why: "Tous les jours sont masculins." },
    { t: "gap", f: "mercredi", s: "der ___", a: "Mittwoch", why: "Le seul jour sans <b>-tag</b>." },
    { t: "gap", f: "Le lundi, je travaille.", s: "___ Montag arbeite ich.", a: "Am", why: "<b>am</b> pour un jour." },
    { t: "gap", f: "En janvier, il neige.", s: "___ Januar schneit es.", a: "Im", why: "<b>im</b> pour un mois." },
    { t: "gap", f: "En hiver, je fais du ski.", s: "___ Winter fahre ich Ski.", a: "Im", why: "<b>im</b> pour une saison." },
    { t: "gap", f: "Mon anniversaire est en juillet.", s: "Mein Geburtstag ist im ___.", a: "Juli", why: "Ne pas confondre avec <b>Juni</b>." },
    { t: "gap", f: "Aujourd'hui, c'est le sept mai.", s: "Heute ist der ___ Mai.", a: "siebte", why: "La date prend l'ordinal." },
    { t: "gap", f: "le printemps", s: "der ___", a: "Frühling", why: "Masculin, comme toutes les saisons." },
    { t: "gap", f: "Quel jour sommes-nous ?", s: "___ Tag ist heute?", a: "Welcher", why: "<b>welcher</b> s'accorde au masculin <b>Tag</b>." },
    { t: "gap", f: "Le week-end, je vais au cinéma.", s: "Am ___ gehe ich ins Kino.", a: "Wochenende", why: "<b>am Wochenende</b>, comme pour un jour." },

    { t: "trans", inst: "Mets la préposition qui convient.", from: "___ Montag", a: "am Montag",
      why: "Un jour → <b>am</b>." },
    { t: "trans", inst: "Mets la préposition qui convient.", from: "___ Mai", a: "im Mai",
      why: "Un mois → <b>im</b>." },
    { t: "trans", inst: "Mets la préposition qui convient.", from: "___ Sommer", a: "im Sommer",
      why: "Une saison → <b>im</b>." },
    { t: "trans", inst: "Corrige la faute.", from: "im Freitag", a: "am Freitag",
      why: "Un jour prend <b>am</b>, pas <b>im</b>." },
    { t: "trans", inst: "Passe du cardinal à la date.", from: "sieben Mai", a: "der siebte Mai",
      why: "La date emploie l'ordinal, avec l'article." },
    { t: "trans", inst: "Mets le complément de temps en tête.", from: "Ich arbeite am Montag.", a: "Am Montag arbeite ich.",
      why: "Le complément en place 1 pousse le sujet derrière le verbe." },

    { t: "order", f: "Le lundi, je travaille.", a: "Am Montag arbeite ich",
      why: "Complément, verbe, sujet." },
    { t: "order", f: "En janvier, il neige souvent.", a: "Im Januar schneit es oft",
      why: "Même inversion." },
    { t: "order", f: "Mon anniversaire est en juillet.", a: "Mein Geburtstag ist im Juli",
      why: "Sujet, verbe, complément." },
    { t: "order", f: "Aujourd'hui, c'est le sept mai.", a: "Heute ist der siebte Mai",
      why: "<b>heute</b> en tête, donc inversion." },
    { t: "order", f: "Nous partons en vacances en août.", a: "Wir fahren im August in den Urlaub",
      why: "Temps avant lieu." },
    { t: "order", f: "Le week-end, je vais au cinéma.", a: "Am Wochenende gehe ich ins Kino",
      why: "<b>ins</b> = <b>in das</b>, mouvement." },

    { t: "trad", f: "Aujourd'hui, c'est mercredi.", a: "Heute ist Mittwoch.",
      why: "Pas d'article après <b>ist</b> pour un jour." },
    { t: "trad", f: "Le lundi, je travaille.", a: "Am Montag arbeite ich.",
      why: "<b>am</b> + jour, puis inversion." },
    { t: "trad", f: "En hiver, je fais du ski.", a: "Im Winter fahre ich Ski.",
      why: "<b>im</b> + saison." },
    { t: "trad", f: "Mon anniversaire est en juillet.", a: "Mein Geburtstag ist im Juli.",
      why: "<b>Geburtstag</b> est masculin." },
    { t: "trad", f: "Quel jour sommes-nous ?", a: "Welcher Tag ist heute?",
      why: "<b>welcher</b> au masculin." },
    { t: "trad", f: "Aujourd'hui, c'est le sept mai.", a: "Heute ist der siebte Mai.",
      why: "Ordinal pour la date." },
    { t: "trad", f: "Le dimanche est le jour de repos.", a: "Der Sonntag ist der Ruhetag.",
      why: "Ici le jour prend son article : il est sujet." }
  ]
},

/* ------------------------------- ÉTAPE 23 -----------------------------
   Unité 22 du livre (p.39) — la nourriture.
   Le livre donne trente mots et rien pour s'en servir. On ajoute les deux
   formules qui transforment une liste en conversation : « ich hätte gerne »
   pour commander, et « gern » pour dire ce qu'on aime. */
{
  day: 23, title: "À table", de: "Ich habe Hunger.",
  steps: [
    {
      idea: "Avoir faim et soif se disent avec haben.",
      detail: "<b>Ich habe Hunger</b>, <b>ich habe Durst</b> — comme en français, et sans article. C'est l'étape 8 qui revient : <b>haben</b> sert aux sensations.",
      gloss: { de: ["Ich", "habe", "Hunger"], fr: ["J'", "ai", "faim"] }
    },
    {
      idea: "Les trois repas de la journée.",
      detail: "Ils sont tous neutres et tous construits pareil : un moment + <b>essen</b>. <b>das Frühstück</b> fait exception — mot à mot « le morceau tôt ».",
      table: [["das Frühstück", "le petit-déjeuner"], ["das Mittagessen", "le déjeuner — repas de midi"], ["das Abendessen", "le dîner — repas du soir"]],
      check: { q: "<b>das Abendessen</b>, c'est…", o: ["le dîner", "le déjeuner", "le petit-déjeuner"], a: 0, why: "<b>Abend</b> le soir + <b>Essen</b> le repas." }
    },
    {
      idea: "Deux verbes portent tout le sujet : essen et trinken.",
      detail: "<b>essen</b> est irrégulier — souviens-toi de l'étape 12 : <b>du isst</b>, <b>er isst</b>. <b>trinken</b>, lui, est parfaitement régulier.",
      table: [["ich esse · du isst · er isst", "manger — irrégulier"], ["ich trinke · du trinkst · er trinkt", "boire — régulier"]],
      check: { q: "« Il mange » se dit…", o: ["er isst", "er esst", "er essen"], a: 0, why: "<b>essen</b> change son <b>e</b> en <b>i</b> aux 2ᵉ et 3ᵉ personnes." }
    },
    {
      idea: "Pour commander : Ich hätte gerne…",
      detail: "Mot à mot « j'aurais volontiers ». C'est la formule polie, celle qu'on emploie au restaurant et à la boulangerie. Plus direct mais correct aussi : <b>ich möchte…</b> ou <b>ich nehme…</b>",
      table: [["Ich hätte gerne…", "J'aimerais… — le plus poli"], ["Ich möchte…", "Je voudrais…"], ["Ich nehme…", "Je prends…"]],
      check: { q: "La formule la plus polie pour commander est…", o: ["Ich hätte gerne", "Ich will", "Ich esse"], a: 0, why: "<b>Ich will</b> — je veux — passe pour brutal. On l'évite au comptoir." }
    },
    {
      idea: "Et pour dire ce qu'on aime manger : gern après le verbe.",
      detail: "<b>Ich esse gern Fisch</b> — j'aime manger du poisson. Pas besoin d'un verbe « aimer » : on glisse <b>gern</b> après le verbe, et c'est fait. Pour le contraire : <b>nicht gern</b>.",
      gloss: { de: ["Ich", "esse", "gern", "Fisch"], fr: ["J'", "aime", "manger", "du poisson"] },
      check: { q: "« J'aime manger du pain » se dit…", o: ["Ich esse gern Brot", "Ich liebe essen Brot", "Ich mag essen Brot"], a: 0, why: "<b>gern</b> après le verbe suffit à dire qu'on aime faire quelque chose." }
    }
  ],
  examples: [
    { d: "Ich habe Hunger.", f: "J'ai faim." },
    { d: "Was isst du heute Abend?", f: "Que manges-tu ce soir ?" },
    { d: "Ich esse gern Fisch.", f: "J'aime manger du poisson." },
    { d: "Der Fisch ist gut.", f: "Le poisson est bon." },
    { d: "Das Brot ist auf dem Tisch.", f: "Le pain est sur la table." },
    { d: "Das Hähnchen ist heiß.", f: "Le poulet est chaud." },
    { d: "Ich hätte gerne eine Suppe.", f: "J'aimerais une soupe." },
    { d: "Zum Frühstück trinke ich Kaffee.", f: "Au petit-déjeuner, je bois du café." },
    { d: "Sie isst gern Gemüse.", f: "Elle aime manger des légumes." },
    { d: "Wir essen um sieben Uhr zu Abend.", f: "Nous dînons à sept heures." },
    { d: "Ich möchte einen Salat, bitte.", f: "Je voudrais une salade, s'il vous plaît." },
    { d: "Das Fleisch ist zu salzig.", f: "La viande est trop salée." }
  ],
  vocab: [
    { d: "das Frühstück", f: "le petit-déjeuner", p: "das FRU-chtuk" },
    { d: "das Abendessen", f: "le dîner", p: "das AA-bennt-è-senn" },
    { d: "das Brot", f: "le pain", p: "das BROOT" },
    { d: "der Fisch", f: "le poisson", p: "dèr FICH" },
    { d: "das Fleisch", f: "la viande", p: "das FLAÏCH" },
    { d: "das Gemüse", f: "les légumes", p: "das gue-MU-ze" },
    { d: "das Obst", f: "les fruits", p: "das OOPST" },
    { d: "die Suppe", f: "la soupe", p: "dii ZOU-pe" },
    { d: "das Salz", f: "le sel", p: "das ZALTS" },
    { d: "gern", f: "volontiers, avec plaisir", p: "GUÈRN" }
  ],
  quiz: [
    { q: "« J'ai faim » se dit…", o: ["Ich habe Hunger", "Ich bin Hunger", "Ich habe einen Hunger", "Ich bin hungrig haben"], a: 0, why: "Sensation → <b>haben</b>, et sans article." },
    { q: "« Il mange » se dit…", o: ["er isst", "er esst", "er essen", "er isset"], a: 0, why: "<b>essen</b> est irrégulier : <b>e</b> devient <b>i</b>." },
    { q: "<b>das Abendessen</b>, c'est…", o: ["le dîner", "le déjeuner", "le goûter", "le petit-déjeuner"], a: 0, why: "<b>Abend</b> + <b>Essen</b> : le repas du soir." },
    { q: "La formule la plus polie pour commander…", o: ["Ich hätte gerne", "Ich will", "Ich esse", "Gib mir"], a: 0, why: "<b>Ich will</b> sonne brutal au comptoir." },
    { q: "« J'aime manger du poisson » se dit…", o: ["Ich esse gern Fisch", "Ich liebe Fisch essen", "Ich mag essen Fisch", "Ich esse Fisch gut"], a: 0, why: "<b>gern</b> après le verbe, sans verbe « aimer »." }
  ],
  drills: [
    { t: "gap", f: "J'ai faim.", s: "Ich habe ___.", a: "Hunger", why: "Sans article." },
    { t: "gap", f: "J'ai soif.", s: "Ich habe ___.", a: "Durst", why: "Même construction." },
    { t: "gap", f: "Il mange du pain.", s: "Er ___ Brot.", a: "isst", why: "<b>essen</b> irrégulier." },
    { t: "gap", f: "Tu bois du café.", s: "Du ___ Kaffee.", a: "trinkst", why: "<b>trinken</b> est régulier." },
    { t: "gap", f: "J'aime manger du poisson.", s: "Ich esse ___ Fisch.", a: "gern", why: "<b>gern</b> après le verbe." },
    { t: "gap", f: "J'aimerais une soupe.", s: "Ich ___ gerne eine Suppe.", a: "hätte", why: "La formule polie pour commander." },
    { t: "gap", f: "le petit-déjeuner", s: "das ___", a: "Frühstück", why: "Neutre, comme les trois repas." },
    { t: "gap", f: "Le pain est sur la table.", s: "Das ___ ist auf dem Tisch.", a: "Brot", why: "<b>auf</b> + datif : on y est posé." },
    { t: "gap", f: "La viande est trop salée.", s: "Das Fleisch ist ___ salzig.", a: "zu", why: "<b>zu</b> = trop." },
    { t: "gap", f: "Je voudrais une salade.", s: "Ich ___ einen Salat.", a: "möchte", why: "<b>Salat</b> masculin complément → <b>einen</b>." },

    { t: "trans", inst: "Mets à la troisième personne (er).", from: "Ich esse Brot.", a: "Er isst Brot.",
      why: "<b>essen</b> change de voyelle." },
    { t: "trans", inst: "Dis que tu aimes ça.", from: "Ich esse Fisch.", a: "Ich esse gern Fisch.",
      why: "<b>gern</b> se glisse après le verbe." },
    { t: "trans", inst: "Dis le contraire.", from: "Ich esse gern Fisch.", a: "Ich esse nicht gern Fisch.",
      why: "<b>nicht</b> devant <b>gern</b>." },
    { t: "trans", inst: "Rends la commande plus polie.", from: "Ich will eine Suppe.", a: "Ich hätte gerne eine Suppe.",
      why: "<b>ich will</b> passe pour brutal au comptoir." },
    { t: "trans", inst: "Transforme en question.", from: "Du isst Fisch.", a: "Isst du Fisch?",
      why: "Verbe en tête." },
    { t: "trans", inst: "Mets le complément de temps en tête.", from: "Ich trinke Kaffee zum Frühstück.", a: "Zum Frühstück trinke ich Kaffee.",
      why: "Le sujet passe derrière le verbe." },

    { t: "order", f: "J'aime manger du poisson.", a: "Ich esse gern Fisch",
      why: "<b>gern</b> juste après le verbe." },
    { t: "order", f: "J'aimerais une soupe.", a: "Ich hätte gerne eine Suppe",
      why: "La formule de commande, en bloc." },
    { t: "order", f: "Au petit-déjeuner, je bois du café.", a: "Zum Frühstück trinke ich Kaffee",
      why: "Complément, verbe, sujet." },
    { t: "order", f: "Le pain est sur la table.", a: "Das Brot ist auf dem Tisch",
      why: "<b>auf dem</b> : position, donc datif." },
    { t: "order", f: "Nous dînons à sept heures.", a: "Wir essen um sieben Uhr zu Abend",
      why: "<b>zu Abend essen</b> se coupe : <b>zu Abend</b> part à la fin." },
    { t: "order", f: "Que manges-tu ce soir ?", a: "Was isst du heute Abend",
      why: "Mot interrogatif, verbe, sujet." },

    { t: "trad", f: "J'ai faim.", a: "Ich habe Hunger.",
      why: "<b>haben</b> pour les sensations." },
    { t: "trad", f: "Il mange du pain.", a: "Er isst Brot.",
      why: "<b>essen</b> → <b>isst</b>." },
    { t: "trad", f: "J'aime manger des légumes.", a: "Ich esse gern Gemüse.",
      why: "<b>gern</b> après le verbe." },
    { t: "trad", f: "J'aimerais une soupe.", a: "Ich hätte gerne eine Suppe.",
      why: "La formule polie." },
    { t: "trad", f: "Le poisson est bon.", a: "Der Fisch ist gut.",
      why: "<b>Fisch</b> est masculin." },
    { t: "trad", f: "Le poulet est chaud.", a: "Das Hähnchen ist heiß.",
      why: "<b>-chen</b> → neutre, toujours." },
    { t: "trad", f: "Au petit-déjeuner, je bois du café.", a: "Zum Frühstück trinke ich Kaffee.",
      why: "<b>zum</b> = <b>zu dem</b>." }
  ]
},

/* ------------------------------- ÉTAPE 24 -----------------------------
   Unité 23 du livre (p.40) — la phrase affirmative.
   La règle la plus rentable de tout le niveau, et le livre lui accorde une
   page. On lui donne une étape entière : le verbe en position 2 explique à
   lui seul pourquoi les phrases d'un débutant sonnent faux. */
{
  day: 24, title: "L'ordre des mots", de: "Jetzt trinke ich einen Kaffee.",
  steps: [
    {
      idea: "Une seule règle gouverne la phrase allemande : le verbe est en deuxième position.",
      detail: "Pas deuxième <i>mot</i> — deuxième <b>élément</b>. Ce qui vient avant peut être un mot ou tout un groupe, mais le verbe conjugué occupe la case suivante, toujours. C'est la règle qui explique presque toutes les phrases bancales d'un débutant.",
      gloss: { de: ["Ich", "trinke", "einen", "Kaffee"], fr: ["Je", "bois", "un", "café"] }
    },
    {
      idea: "Si tu mets autre chose en tête, le sujet passe derrière le verbe.",
      detail: "Le verbe ne bouge pas de sa place : c'est le sujet qui s'écarte. <b>Ich trinke jetzt einen Kaffee</b> devient <b>Jetzt trinke ich einen Kaffee</b>. En français on dirait « Maintenant, je bois » — l'allemand, lui, inverse.",
      table: [["Ich trinke jetzt einen Kaffee.", "sujet en tête"], ["Jetzt trinke ich einen Kaffee.", "temps en tête → inversion"], ["Einen Kaffee trinke ich jetzt.", "objet en tête → inversion aussi"]],
      check: { q: "« Demain, je vais à Berlin » se dit…", o: ["Morgen fahre ich nach Berlin", "Morgen ich fahre nach Berlin", "Ich morgen fahre nach Berlin"], a: 0, why: "<b>Morgen</b> occupe la place 1, donc le verbe prend la place 2 et le sujet suit." }
    },
    {
      idea: "Un groupe entier ne compte que pour une place.",
      detail: "<b>Am Montag</b>, <b>heute Abend</b>, <b>mit meinem Bruder</b> — chacun est un seul élément, même s'il fait trois mots. C'est pour ça qu'on ne compte pas les mots mais les blocs.",
      gloss: { de: ["Heute Abend", "gehe", "ich", "ins Kino"], fr: ["Ce soir", "vais", "je", "au cinéma"] },
      check: { q: "Dans « Am Montag arbeite ich », qu'y a-t-il en place 1 ?", o: ["am Montag, en entier", "am seulement", "Montag seulement"], a: 0, why: "Le groupe compte pour un. Le verbe suit immédiatement." }
    },
    {
      idea: "Et la seconde règle : la deuxième partie du verbe part à la fin.",
      detail: "Participe passé, infinitif après un modal, particule séparable — tout ce qui reste du verbe file en bout de phrase. Le verbe encadre alors la phrase : conjugué en place 2, le reste tout au bout. On appelle ça la <i>parenthèse verbale</i>.",
      table: [["Ich rufe dich heute an.", "particule — anrufen"], ["Ich habe ein Brötchen gegessen.", "participe passé"], ["Morgen muss sie arbeiten.", "infinitif après un modal"]],
      check: { q: "Où va l'infinitif après un verbe modal ?", o: ["à la fin de la phrase", "juste après le modal", "en première position"], a: 0, why: "<b>Morgen muss sie mit ihrem Chef sprechen</b> — <b>sprechen</b> ferme la phrase." }
    },
    {
      idea: "La charpente complète, en une ligne.",
      detail: "<b>[quelque chose] — verbe conjugué — sujet — le reste — fin du verbe.</b> Si tu tiens ces deux points fixes — le verbe en 2, sa fin tout au bout — le milieu peut varier sans que la phrase sonne faux.",
      table: [["place 1", "n'importe quel élément"], ["place 2", "le verbe conjugué — jamais ailleurs"], ["milieu", "sujet, temps, manière, lieu"], ["fin", "la seconde partie du verbe"]],
      check: { q: "Quelles sont les deux places fixes ?", o: ["le verbe en 2 et sa fin tout au bout", "le sujet en 1 et le verbe en 2", "le verbe en 1 et le sujet en 2"], a: 0, why: "Ce sont les deux points d'ancrage. Entre les deux, on a de la marge." }
    }
  ],
  examples: [
    { d: "Ich trinke jetzt einen Kaffee.", f: "Je bois un café maintenant." },
    { d: "Jetzt trinke ich einen Kaffee.", f: "Maintenant, je bois un café." },
    { d: "Morgen fahre ich nach Berlin.", f: "Demain, je vais à Berlin." },
    { d: "Heute Abend gehe ich ins Kino.", f: "Ce soir, je vais au cinéma." },
    { d: "Am Montag arbeite ich zu Hause.", f: "Le lundi, je travaille à la maison." },
    { d: "Ich rufe dich heute Nachmittag an.", f: "Je t'appelle cet après-midi." },
    { d: "Morgen muss sie mit ihrem Chef sprechen.", f: "Demain, elle doit parler avec son chef." },
    { d: "Gestern habe ich ein Buch gekauft.", f: "Hier, j'ai acheté un livre." },
    { d: "Im Sommer fahren wir ans Meer.", f: "En été, nous allons à la mer." },
    { d: "Heute ist ein wunderschöner Tag.", f: "Aujourd'hui est une très belle journée." },
    { d: "Der Park ist immer ruhig.", f: "Le parc est toujours calme." },
    { d: "Nach der Arbeit gehe ich einkaufen.", f: "Après le travail, je vais faire les courses." }
  ],
  vocab: [
    { d: "anrufen", f: "appeler (au téléphone)", p: "ANN-rou-fenn" },
    { d: "der Chef", f: "le chef", p: "dèr CHÈF" },
    { d: "das Meer", f: "la mer", p: "das MÉÉR" },
    { d: "wunderschön", f: "magnifique", p: "VOUNN-deur-cheun" },
    { d: "die Sonne", f: "le soleil", p: "dii ZO-ne" },
    { d: "scheinen", f: "briller", p: "CHAÏ-nenn" },
    { d: "der Ausflug", f: "l'excursion", p: "dèr AOUS-flouk" },
    { d: "friedlich", f: "paisible", p: "FRIID-lich" },
    { d: "der Ort", f: "l'endroit", p: "dèr ORT" },
    { d: "nach", f: "après", p: "NAAKH" }
  ],
  quiz: [
    { q: "Où se place le verbe conjugué ?", o: ["en deuxième position", "en première", "à la fin", "après le sujet"], a: 0, why: "Deuxième <b>élément</b>, pas deuxième mot." },
    { q: "« Demain, je vais à Berlin » se dit…", o: ["Morgen fahre ich nach Berlin", "Morgen ich fahre nach Berlin", "Ich morgen fahre nach Berlin", "Morgen nach Berlin ich fahre"], a: 0, why: "Le complément en place 1 pousse le sujet derrière le verbe." },
    { q: "Dans « Am Montag arbeite ich », la place 1 contient…", o: ["am Montag en entier", "am seulement", "Montag seulement", "rien"], a: 0, why: "Un groupe compte pour un élément." },
    { q: "Où va l'infinitif après un verbe modal ?", o: ["à la fin", "juste après le modal", "en place 1", "avant le sujet"], a: 0, why: "Il ferme la phrase : c'est la parenthèse verbale." },
    { q: "« Je t'appelle cet après-midi » se dit…", o: ["Ich rufe dich heute Nachmittag an", "Ich anrufe dich heute Nachmittag", "Ich rufe an dich heute Nachmittag", "Heute Nachmittag ich rufe dich an"], a: 0, why: "<b>anrufen</b> se coupe : <b>rufe</b> en place 2, <b>an</b> à la fin." }
  ],
  drills: [
    { t: "gap", f: "Maintenant, je bois un café.", s: "Jetzt ___ ich einen Kaffee.", a: "trinke", why: "Le verbe garde la place 2." },
    { t: "gap", f: "Demain, je vais à Berlin.", s: "Morgen ___ ich nach Berlin.", a: "fahre", why: "Inversion après un complément en tête." },
    { t: "gap", f: "Le lundi, je travaille.", s: "Am Montag ___ ich.", a: "arbeite", why: "Le groupe <b>am Montag</b> compte pour un." },
    { t: "gap", f: "Je t'appelle cet après-midi.", s: "Ich rufe dich heute Nachmittag ___.", a: "an", why: "La particule ferme la phrase." },
    { t: "gap", f: "Hier, j'ai acheté un livre.", s: "Gestern habe ich ein Buch ___.", a: "gekauft", why: "Le participe passé part à la fin." },
    { t: "gap", f: "Demain, elle doit travailler.", s: "Morgen muss sie ___.", a: "arbeiten", why: "L'infinitif ferme la phrase après un modal." },
    { t: "gap", f: "Ce soir, je vais au cinéma.", s: "Heute Abend ___ ich ins Kino.", a: "gehe", why: "Verbe en place 2, sujet derrière." },
    { t: "gap", f: "En été, nous allons à la mer.", s: "Im Sommer ___ wir ans Meer.", a: "fahren", why: "<b>ans</b> = <b>an das</b>, mouvement." },
    { t: "gap", f: "Après le travail, je fais les courses.", s: "Nach der Arbeit ___ ich einkaufen.", a: "gehe", why: "<b>nach</b> + datif." },
    { t: "gap", f: "Le parc est toujours calme.", s: "Der Park ___ immer ruhig.", a: "ist", why: "Sujet en tête : pas d'inversion." },

    { t: "trans", inst: "Mets le complément de temps en tête.", from: "Ich trinke jetzt einen Kaffee.", a: "Jetzt trinke ich einen Kaffee.",
      why: "Le sujet passe derrière le verbe." },
    { t: "trans", inst: "Mets le complément de temps en tête.", from: "Ich fahre morgen nach Berlin.", a: "Morgen fahre ich nach Berlin.",
      why: "Même inversion." },
    { t: "trans", inst: "Remets le sujet en tête.", from: "Heute Abend gehe ich ins Kino.", a: "Ich gehe heute Abend ins Kino.",
      why: "Sans complément en tête, l'ordre redevient sujet-verbe." },
    { t: "trans", inst: "Corrige la faute.", from: "Morgen ich fahre nach Berlin.", a: "Morgen fahre ich nach Berlin.",
      why: "Le verbe doit occuper la place 2, pas la troisième." },
    { t: "trans", inst: "Corrige la faute.", from: "Ich anrufe dich heute.", a: "Ich rufe dich heute an.",
      why: "<b>anrufen</b> est séparable : la particule part à la fin." },
    { t: "trans", inst: "Corrige la faute.", from: "Morgen muss sprechen sie mit ihrem Chef.", a: "Morgen muss sie mit ihrem Chef sprechen.",
      why: "L'infinitif ferme la phrase." },

    { t: "order", f: "Maintenant, je bois un café.", a: "Jetzt trinke ich einen Kaffee",
      why: "Complément, verbe, sujet, objet." },
    { t: "order", f: "Demain, je vais à Berlin.", a: "Morgen fahre ich nach Berlin",
      why: "Même charpente." },
    { t: "order", f: "Je t'appelle cet après-midi.", a: "Ich rufe dich heute Nachmittag an",
      why: "La particule tout au bout." },
    { t: "order", f: "Hier, j'ai acheté un livre.", a: "Gestern habe ich ein Buch gekauft",
      why: "Auxiliaire en place 2, participe à la fin." },
    { t: "order", f: "Demain, elle doit parler avec son chef.", a: "Morgen muss sie mit ihrem Chef sprechen",
      why: "Modal en place 2, infinitif à la fin." },
    { t: "order", f: "Après le travail, je vais faire les courses.", a: "Nach der Arbeit gehe ich einkaufen",
      why: "<b>einkaufen</b> ferme la phrase." },

    { t: "trad", f: "Maintenant, je bois un café.", a: "Jetzt trinke ich einen Kaffee.",
      why: "Inversion après le complément." },
    { t: "trad", f: "Demain, je vais à Berlin.", a: "Morgen fahre ich nach Berlin.",
      why: "<b>nach</b> + ville." },
    { t: "trad", f: "Ce soir, je vais au cinéma.", a: "Heute Abend gehe ich ins Kino.",
      why: "<b>heute Abend</b> compte pour un élément." },
    { t: "trad", f: "Je t'appelle cet après-midi.", a: "Ich rufe dich heute Nachmittag an.",
      why: "Particule séparable en fin." },
    { t: "trad", f: "Hier, j'ai acheté un livre.", a: "Gestern habe ich ein Buch gekauft.",
      why: "Participe passé en fin." },
    { t: "trad", f: "Le lundi, je travaille à la maison.", a: "Am Montag arbeite ich zu Hause.",
      why: "<b>zu Hause</b> pour la position." },
    { t: "trad", f: "En été, nous allons à la mer.", a: "Im Sommer fahren wir ans Meer.",
      why: "<b>im</b> + saison, <b>ans</b> pour le mouvement." }
  ]
},

/* ------------------------------- ÉTAPE 25 -----------------------------
   Unité 24 du livre (p.41-42) — les verbes modaux.
   Le livre les conjugue et signale au passage que « müssen » est trop fort
   pour une obligation douce. C'est le point le plus utile de l'unité, et
   il est relégué en remarque : on le remonte. Quatre verbes disent
   « devoir » en allemand, selon d'où vient l'obligation. */
{
  day: 25, title: "Pouvoir, vouloir, devoir", de: "Ich kann schwimmen.",
  steps: [
    {
      idea: "Un modal entraîne presque toujours un autre verbe.",
      detail: "Et cet autre verbe reste à l'infinitif, tout au bout de la phrase. C'est la parenthèse verbale de l'étape 24, appliquée aux modaux : <b>Ich kann Deutsch <u>sprechen</u></b>.",
      gloss: { de: ["Ich", "kann", "Deutsch", "sprechen"], fr: ["Je", "sais", "l'allemand", "parler"] },
      check: { q: "Où va le second verbe ?", o: ["à la fin de la phrase", "juste après le modal", "avant le sujet"], a: 0, why: "<b>Ich muss heute viel arbeiten</b> — <b>arbeiten</b> ferme la phrase." }
    },
    {
      idea: "Ils se conjuguent tous sur le même moule bizarre.",
      detail: "Deux choses à voir : la voyelle change au singulier, et surtout <b>ich</b> et <b>er</b> ont la <i>même forme</i>, sans terminaison. C'est unique aux modaux — partout ailleurs <b>er</b> prend un <b>-t</b>.",
      table: [["ich kann · du kannst · er kann", "pouvoir, savoir"], ["ich will · du willst · er will", "vouloir"], ["ich muss · du musst · er muss", "devoir"]],
      check: { q: "« Il peut » se dit…", o: ["er kann", "er kannt", "er könnt"], a: 0, why: "Aux modaux, <b>ich</b> et <b>er</b> partagent la même forme, sans <b>-t</b>." }
    },
    {
      idea: "können dit ce qu'on sait faire, et sert aussi à demander poliment.",
      detail: "<b>Ich kann schwimmen</b> — je sais nager. C'est une compétence, pas une permission. Et <b>Kannst du mir helfen?</b> remplace un ordre par une demande : c'est la formule à avoir sous la main.",
      table: [["Ich kann Deutsch sprechen.", "Je sais parler allemand."], ["Ich kann schwimmen.", "Je sais nager."], ["Kannst du mir helfen?", "Peux-tu m'aider ?"]]
    },
    {
      idea: "wollen est fort — et möchten est sa version polie.",
      detail: "<b>Ich will einen Kaffee</b> passe pour brutal, comme « je veux un café ». Au comptoir, dans un magasin, avec quelqu'un qu'on vouvoie, on dit <b>Ich möchte einen Kaffee</b>. Même sens, ton complètement différent.",
      table: [["Ich will…", "Je veux… — direct, parfois brusque"], ["Ich möchte…", "Je voudrais… — poli, à préférer"]],
      check: { q: "Au restaurant, tu dis…", o: ["Ich möchte einen Kaffee", "Ich will einen Kaffee", "Ich kann einen Kaffee"], a: 0, why: "<b>möchte</b> est la forme polie. <b>will</b> sonne comme un ordre." }
    },
    {
      idea: "Et le point que le livre glisse en remarque : quatre façons de dire « devoir ».",
      detail: "Elles ne disent pas la même chose. <b>müssen</b> = je n'ai pas le choix. <b>sollen</b> = on me l'a demandé. <b>nicht dürfen</b> = c'est interdit. Le livre prévient d'ailleurs que <b>Ich muss heiraten</b> laisserait entendre qu'on te force à te marier.",
      table: [["Ich muss arbeiten.", "nécessité — pas le choix"], ["Ich soll arbeiten.", "on me l'a demandé"], ["Ich darf nicht rauchen.", "c'est interdit"], ["Ich kann nicht kommen.", "je n'en suis pas capable"]],
      check: { q: "« Tu ne dois pas manger le gâteau » — c'est interdit. On dit…", o: ["Du darfst die Torte nicht essen", "Du musst die Torte nicht essen", "Du sollst die Torte nicht essen"], a: 0, why: "L'interdiction passe par <b>nicht dürfen</b>. <b>müssen</b> nié voudrait dire « tu n'es pas obligé »." }
    }
  ],
  examples: [
    { d: "Ich kann schwimmen.", f: "Je sais nager." },
    { d: "Ich kann Deutsch sprechen.", f: "Je sais parler allemand." },
    { d: "Kannst du mir helfen?", f: "Peux-tu m'aider ?" },
    { d: "Ich möchte einen Kaffee.", f: "Je voudrais un café." },
    { d: "Ich will nach Berlin fahren.", f: "Je veux aller à Berlin." },
    { d: "Ich muss für die Prüfung lernen.", f: "Je dois réviser pour l'examen." },
    { d: "Du musst die Rechnung bezahlen.", f: "Tu dois payer la facture." },
    { d: "Wir wollen ins Kino gehen.", f: "Nous voulons aller au cinéma." },
    { d: "Sie kann mehrere Sprachen sprechen.", f: "Elle sait parler plusieurs langues." },
    { d: "Du sollst deine Hausaufgaben machen.", f: "Tu dois faire tes devoirs." },
    { d: "Du darfst die Torte nicht essen.", f: "Tu ne dois pas manger le gâteau." },
    { d: "Ich muss früh aufstehen.", f: "Je dois me lever tôt." }
  ],
  vocab: [
    { d: "können", f: "pouvoir, savoir", p: "KEU-nenn" },
    { d: "wollen", f: "vouloir", p: "VO-lenn" },
    { d: "müssen", f: "devoir", p: "MU-senn" },
    { d: "möchten", f: "voudrais (poli)", p: "MEUCH-tenn" },
    { d: "dürfen", f: "avoir le droit", p: "DUR-fenn" },
    { d: "sollen", f: "devoir (attendu)", p: "ZO-lenn" },
    { d: "schwimmen", f: "nager", p: "CHVI-menn" },
    { d: "aufstehen", f: "se lever", p: "AOUF-chté-enn" },
    { d: "bezahlen", f: "payer", p: "be-TSAA-lenn" },
    { d: "die Hausaufgaben", f: "les devoirs", p: "dii HAOUSS-aouf-gaa-benn" }
  ],
  quiz: [
    { q: "Où va le second verbe après un modal ?", o: ["à la fin de la phrase", "juste après le modal", "avant le sujet", "en première position"], a: 0, why: "Il reste à l'infinitif et ferme la phrase." },
    { q: "« Il peut » se dit…", o: ["er kann", "er kannt", "er könnt", "er kanne"], a: 0, why: "Aux modaux, <b>ich</b> et <b>er</b> ont la même forme, sans <b>-t</b>." },
    { q: "Au restaurant, pour commander, on dit…", o: ["Ich möchte…", "Ich will…", "Ich muss…", "Ich soll…"], a: 0, why: "<b>will</b> sonne comme un ordre ; <b>möchte</b> est la forme polie." },
    { q: "« C'est interdit » se dit avec…", o: ["nicht dürfen", "nicht müssen", "nicht können", "nicht wollen"], a: 0, why: "<b>müssen</b> nié voudrait dire « tu n'es pas obligé », ce qui est le contraire." },
    { q: "<b>Ich soll arbeiten</b> veut dire…", o: ["on me demande de travailler", "je n'ai pas le choix", "je sais travailler", "j'ai le droit de travailler"], a: 0, why: "<b>sollen</b> marque une attente extérieure, pas une nécessité." }
  ],
  drills: [
    { t: "gap", f: "Je sais nager.", s: "Ich ___ schwimmen.", a: "kann", why: "Une compétence → <b>können</b>." },
    { t: "gap", f: "Tu peux m'aider ?", s: "___ du mir helfen?", a: "Kannst", why: "<b>du</b> → <b>kannst</b>." },
    { t: "gap", f: "Il peut venir.", s: "Er ___ kommen.", a: "kann", why: "Même forme que <b>ich</b>, sans <b>-t</b>." },
    { t: "gap", f: "Je voudrais un café.", s: "Ich ___ einen Kaffee.", a: "möchte", why: "La forme polie." },
    { t: "gap", f: "Je dois réviser.", s: "Ich ___ lernen.", a: "muss", why: "Nécessité → <b>müssen</b>." },
    { t: "gap", f: "Tu dois payer la facture.", s: "Du ___ die Rechnung bezahlen.", a: "musst", why: "<b>du</b> → <b>musst</b>." },
    { t: "gap", f: "Nous voulons aller au cinéma.", s: "Wir ___ ins Kino gehen.", a: "wollen", why: "Au pluriel, la forme longue revient." },
    { t: "gap", f: "Tu ne dois pas manger le gâteau.", s: "Du ___ die Torte nicht essen.", a: "darfst", why: "Interdiction → <b>nicht dürfen</b>." },
    { t: "gap", f: "Je dois me lever tôt.", s: "Ich muss früh ___.", a: "aufstehen", why: "L'infinitif ferme la phrase." },
    { t: "gap", f: "Elle sait parler plusieurs langues.", s: "Sie kann mehrere Sprachen ___.", a: "sprechen", why: "Même règle : infinitif en fin." },

    { t: "trans", inst: "Rends la demande polie.", from: "Ich will einen Kaffee.", a: "Ich möchte einen Kaffee.",
      why: "<b>will</b> passe pour brutal au comptoir." },
    { t: "trans", inst: "Transforme l'ordre en demande polie.", from: "Hilf mir!", a: "Kannst du mir helfen?",
      why: "<b>können</b> adoucit un impératif." },
    { t: "trans", inst: "Mets à la troisième personne (er).", from: "Ich kann schwimmen.", a: "Er kann schwimmen.",
      why: "<b>ich</b> et <b>er</b> partagent la forme." },
    { t: "trans", inst: "Mets à la deuxième personne (du).", from: "Ich muss arbeiten.", a: "Du musst arbeiten.",
      why: "<b>du</b> ajoute <b>-st</b>." },
    { t: "trans", inst: "Dis que c'est interdit, pas une nécessité.", from: "Du musst nicht rauchen.", a: "Du darfst nicht rauchen.",
      why: "<b>müssen</b> nié = tu n'es pas obligé. L'interdiction, c'est <b>nicht dürfen</b>." },
    { t: "trans", inst: "Corrige la place du verbe.", from: "Ich kann sprechen Deutsch.", a: "Ich kann Deutsch sprechen.",
      why: "L'infinitif ferme la phrase, après le complément." },

    { t: "order", f: "Je sais parler allemand.", a: "Ich kann Deutsch sprechen",
      why: "Modal en place 2, infinitif à la fin." },
    { t: "order", f: "Je dois réviser pour l'examen.", a: "Ich muss für die Prüfung lernen",
      why: "Le complément au milieu, l'infinitif au bout." },
    { t: "order", f: "Nous voulons aller au cinéma.", a: "Wir wollen ins Kino gehen",
      why: "<b>ins</b> pour le mouvement, <b>gehen</b> en fin." },
    { t: "order", f: "Peux-tu m'aider ?", a: "Kannst du mir helfen",
      why: "Question : modal en tête, infinitif au bout." },
    { t: "order", f: "Je dois me lever tôt.", a: "Ich muss früh aufstehen",
      why: "<b>aufstehen</b> reste entier à l'infinitif." },
    { t: "order", f: "Tu ne dois pas manger le gâteau.", a: "Du darfst die Torte nicht essen",
      why: "<b>nicht</b> juste avant l'infinitif." },

    { t: "trad", f: "Je sais nager.", a: "Ich kann schwimmen.",
      why: "Une compétence → <b>können</b>." },
    { t: "trad", f: "Je voudrais un café.", a: "Ich möchte einen Kaffee.",
      why: "La forme polie, et <b>Kaffee</b> masculin complément." },
    { t: "trad", f: "Je dois réviser pour l'examen.", a: "Ich muss für die Prüfung lernen.",
      why: "<b>für</b> + accusatif." },
    { t: "trad", f: "Peux-tu m'aider ?", a: "Kannst du mir helfen?",
      why: "<b>helfen</b> demande le datif : <b>mir</b>." },
    { t: "trad", f: "Nous voulons aller au cinéma.", a: "Wir wollen ins Kino gehen.",
      why: "Pluriel → forme longue." },
    { t: "trad", f: "Tu dois faire tes devoirs.", a: "Du sollst deine Hausaufgaben machen.",
      why: "<b>sollen</b> : on te le demande." },
    { t: "trad", f: "Je dois me lever tôt.", a: "Ich muss früh aufstehen.",
      why: "Nécessité, et infinitif en fin." }
  ]
},

/* ------------------------------- ÉTAPE 26 -----------------------------
   Unité 25 du livre (p.43) — les boissons.
   Une liste de vingt-quatre mots dans le livre. On y ajoute ce qui manque
   pour s'en servir : commander, et surtout le contenant — « ein Glas
   Wein » et non « ein Wein ». C'est ce qui distingue une commande qui
   passe d'une commande qu'on fait répéter. */
{
  day: 26, title: "Les boissons", de: "Was möchtest du trinken?",
  steps: [
    {
      idea: "Demander ce que quelqu'un veut boire.",
      detail: "<b>Was möchtest du trinken?</b> — la forme polie de l'étape 25 appliquée à la table. <b>trinken</b> est un verbe régulier : rien de nouveau à conjuguer.",
      gloss: { de: ["Was", "möchtest", "du", "trinken"], fr: ["Que", "voudrais", "tu", "boire"] }
    },
    {
      idea: "Pour répondre : Ich nehme… ou Ich hätte gerne…",
      detail: "<b>Ich nehme einen Kaffee</b> — je prends un café. Attention à l'accusatif : <b>Kaffee</b> est masculin, donc <b>einen</b>. C'est la faute la plus visible au comptoir.",
      table: [["Ich nehme einen Kaffee.", "masculin → einen"], ["Ich nehme eine Cola.", "féminin → eine"], ["Ich nehme ein Bier.", "neutre → ein"]],
      check: { q: "« Je prends un jus » se dit…", o: ["Ich nehme einen Saft", "Ich nehme ein Saft", "Ich nehme eine Saft"], a: 0, why: "<b>der Saft</b> est masculin, et c'est un complément → <b>einen</b>." }
    },
    {
      idea: "Les boissons chaudes, presque toutes reconnaissables.",
      detail: "<b>der Kaffee</b>, <b>der Tee</b>, <b>die heiße Schokolade</b>. Le seul à retenir vraiment est <b>der Kräutertee</b> — la tisane, mot à mot « thé aux herbes ».",
      table: [["der Kaffee", "le café"], ["der Tee", "le thé"], ["der Kräutertee", "la tisane"], ["die heiße Schokolade", "le chocolat chaud"]]
    },
    {
      idea: "L'eau se demande en trois versions — et il faut choisir.",
      detail: "En Allemagne, demander « de l'eau » ne suffit pas : on te demandera laquelle. <b>stilles Wasser</b> pour l'eau plate, <b>Sprudelwasser</b> pour la gazeuse, <b>Leitungswasser</b> pour celle du robinet — rarement servie au restaurant, et pas toujours de bon cœur.",
      table: [["stilles Wasser", "eau plate"], ["Sprudelwasser", "eau gazeuse"], ["Leitungswasser", "eau du robinet"]],
      check: { q: "Tu veux de l'eau plate. Tu demandes…", o: ["stilles Wasser", "Sprudelwasser", "Leitungswasser"], a: 0, why: "<b>still</b> veut dire calme, tranquille — d'où l'eau sans bulles." }
    },
    {
      idea: "Et le mot qui change tout : le contenant.",
      detail: "On ne commande pas « un vin » mais <i>un verre de vin</i> : <b>ein Glas Wein</b>. Pas de <b>von</b>, pas d'article entre les deux — les deux mots se suivent. Pareil pour <b>eine Tasse Kaffee</b>, une tasse de café.",
      gloss: { de: ["ein", "Glas", "Wein"], fr: ["un", "verre", "de vin"] },
      check: { q: "« Un verre de vin » se dit…", o: ["ein Glas Wein", "ein Glas von Wein", "ein Glas des Weins"], a: 0, why: "Les deux mots se suivent, sans rien entre eux." }
    }
  ],
  examples: [
    { d: "Was möchtest du trinken?", f: "Que voudrais-tu boire ?" },
    { d: "Ich nehme einen Kaffee, bitte.", f: "Je prends un café, s'il vous plaît." },
    { d: "Ich nehme einen Orangensaft.", f: "Je prends un jus d'orange." },
    { d: "Ich hätte gerne ein Glas Wein.", f: "J'aimerais un verre de vin." },
    { d: "Eine Tasse Kaffee, bitte.", f: "Une tasse de café, s'il vous plaît." },
    { d: "Ich trinke morgens Kaffee.", f: "Le matin, je bois du café." },
    { d: "Möchten Sie stilles Wasser?", f: "Voulez-vous de l'eau plate ?" },
    { d: "Ich habe Durst.", f: "J'ai soif." },
    { d: "Das Bier vom Fass ist gut.", f: "La bière pression est bonne." },
    { d: "Sie trinkt nachmittags lieber Tee.", f: "L'après-midi, elle préfère le thé." },
    { d: "Die Milch ist kalt.", f: "Le lait est froid." },
    { d: "Ein Glas Sprudelwasser, bitte.", f: "Un verre d'eau gazeuse, s'il vous plaît." }
  ],
  vocab: [
    { d: "das Getränk", f: "la boisson", p: "das gue-TRÈNNK" },
    { d: "der Saft", f: "le jus", p: "dèr ZAFT" },
    { d: "der Tee", f: "le thé", p: "dèr TÉÉ" },
    { d: "das Wasser", f: "l'eau", p: "das VA-seur" },
    { d: "das Bier", f: "la bière", p: "das BIIR" },
    { d: "der Wein", f: "le vin", p: "dèr VAÏN" },
    { d: "die Milch", f: "le lait", p: "dii MILCH" },
    { d: "das Glas", f: "le verre", p: "das GLAASS" },
    { d: "die Tasse", f: "la tasse", p: "dii TA-se" },
    { d: "Durst haben", f: "avoir soif", p: "DOURST HAA-benn" }
  ],
  quiz: [
    { q: "« Je prends un café » se dit…", o: ["Ich nehme einen Kaffee", "Ich nehme ein Kaffee", "Ich nehme eine Kaffee", "Ich nehme der Kaffee"], a: 0, why: "<b>Kaffee</b> est masculin et complément → <b>einen</b>." },
    { q: "« Un verre de vin » se dit…", o: ["ein Glas Wein", "ein Glas von Wein", "ein Glas des Weins", "ein Wein Glas"], a: 0, why: "Contenant puis contenu, rien entre les deux." },
    { q: "L'eau plate se demande…", o: ["stilles Wasser", "Sprudelwasser", "Leitungswasser", "kaltes Wasser"], a: 0, why: "<b>still</b> = calme, sans bulles." },
    { q: "<b>der Kräutertee</b>, c'est…", o: ["la tisane", "le thé glacé", "le café", "le cidre"], a: 0, why: "Mot à mot « thé aux herbes »." },
    { q: "« J'ai soif » se dit…", o: ["Ich habe Durst", "Ich bin Durst", "Ich habe einen Durst", "Ich trinke Durst"], a: 0, why: "Sensation → <b>haben</b>, et sans article." }
  ],
  drills: [
    { t: "gap", f: "Je prends un café.", s: "Ich nehme ___ Kaffee.", a: "einen", why: "Masculin complément → <b>einen</b>." },
    { t: "gap", f: "Je prends une bière.", s: "Ich nehme ___ Bier.", a: "ein", why: "<b>Bier</b> est neutre." },
    { t: "gap", f: "Je prends un tasse de café.", s: "Ich nehme ___ Tasse Kaffee.", a: "eine", why: "<b>Tasse</b> est féminin." },
    { t: "gap", f: "un verre de vin", s: "ein ___ Wein", a: "Glas", why: "Le contenant devant, sans rien entre." },
    { t: "gap", f: "de l'eau plate", s: "___ Wasser", a: "stilles", why: "<b>still</b> + <b>-es</b> devant un neutre sans article." },
    { t: "gap", f: "de l'eau gazeuse", s: "___", a: "Sprudelwasser", why: "<b>Sprudel</b> = bulle, jaillissement." },
    { t: "gap", f: "J'ai soif.", s: "Ich habe ___.", a: "Durst", why: "Sans article." },
    { t: "gap", f: "Que voudrais-tu boire ?", s: "Was möchtest du ___?", a: "trinken", why: "L'infinitif ferme la phrase après un modal." },
    { t: "gap", f: "Le lait est froid.", s: "Die ___ ist kalt.", a: "Milch", why: "<b>Milch</b> est féminin." },
    { t: "gap", f: "Elle préfère le thé.", s: "Sie trinkt ___ Tee.", a: "lieber", why: "<b>lieber</b> = de préférence." },

    { t: "trans", inst: "Mets l'article qui convient.", from: "Ich nehme ___ Saft.", a: "Ich nehme einen Saft.",
      why: "<b>Saft</b> masculin complément." },
    { t: "trans", inst: "Mets l'article qui convient.", from: "Ich nehme ___ Cola.", a: "Ich nehme eine Cola.",
      why: "<b>Cola</b> est féminin." },
    { t: "trans", inst: "Ajoute le contenant.", from: "Ich hätte gerne Wein.", a: "Ich hätte gerne ein Glas Wein.",
      why: "On commande un verre, pas « un vin »." },
    { t: "trans", inst: "Ajoute le contenant.", from: "Ich nehme Kaffee.", a: "Ich nehme eine Tasse Kaffee.",
      why: "<b>eine Tasse</b> pour une boisson chaude." },
    { t: "trans", inst: "Rends la commande polie.", from: "Ich will einen Kaffee.", a: "Ich hätte gerne einen Kaffee.",
      why: "<b>will</b> passe pour brutal au comptoir." },
    { t: "trans", inst: "Précise l'eau que tu veux.", from: "Ich möchte Wasser.", a: "Ich möchte stilles Wasser.",
      why: "En Allemagne, on te demandera laquelle." },

    { t: "order", f: "Je prends un café, s'il vous plaît.", a: "Ich nehme einen Kaffee bitte",
      why: "<b>bitte</b> se met en fin de commande." },
    { t: "order", f: "J'aimerais un verre de vin.", a: "Ich hätte gerne ein Glas Wein",
      why: "La formule polie, puis le contenant." },
    { t: "order", f: "Que voudrais-tu boire ?", a: "Was möchtest du trinken",
      why: "Mot interrogatif, modal, sujet, infinitif." },
    { t: "order", f: "Le matin, je bois du café.", a: "Morgens trinke ich Kaffee",
      why: "Complément en tête, donc inversion." },
    { t: "order", f: "La bière pression est bonne.", a: "Das Bier vom Fass ist gut",
      why: "<b>vom</b> = <b>von dem</b>." },
    { t: "order", f: "Un verre d'eau gazeuse, s'il vous plaît.", a: "Ein Glas Sprudelwasser bitte",
      why: "Contenant, contenu, <b>bitte</b>." },

    { t: "trad", f: "Je prends un café.", a: "Ich nehme einen Kaffee.",
      why: "Masculin complément → <b>einen</b>." },
    { t: "trad", f: "J'aimerais un verre de vin.", a: "Ich hätte gerne ein Glas Wein.",
      why: "Le contenant est obligatoire." },
    { t: "trad", f: "Une tasse de café, s'il vous plaît.", a: "Eine Tasse Kaffee, bitte.",
      why: "<b>Tasse</b> est féminin." },
    { t: "trad", f: "J'ai soif.", a: "Ich habe Durst.",
      why: "Sensation → <b>haben</b>." },
    { t: "trad", f: "De l'eau plate, s'il vous plaît.", a: "Stilles Wasser, bitte.",
      why: "Sans article, l'adjectif prend <b>-es</b>." },
    { t: "trad", f: "Que voudrais-tu boire ?", a: "Was möchtest du trinken?",
      why: "L'infinitif en fin." },
    { t: "trad", f: "Le lait est froid.", a: "Die Milch ist kalt.",
      why: "<b>Milch</b> est féminin." }
  ]
},

/* ------------------------------- ÉTAPE 27 -----------------------------
   Unité 26 du livre (p.44) — dire ce qu'on aime.
   Le livre aligne treize expressions sans distinguer « mögen » de
   « gefallen ». Or elles ne se construisent pas pareil : gefallen retourne
   la phrase, et c'est le genre de chose qui bloque une conversation. */
{
  day: 27, title: "Ce que j'aime", de: "Ich mag Kaffee.",
  steps: [
    {
      idea: "mögen dit ce qu'on aime — au goût, au sens le plus simple.",
      detail: "<b>Ich mag Kaffee</b> — j'aime le café. Il se construit comme en français : moi, j'aime, quelque chose. C'est un modal, donc <b>ich</b> et <b>er</b> partagent la forme : <b>ich mag</b>, <b>er mag</b>.",
      gloss: { de: ["Ich", "mag", "Kaffee"], fr: ["J'", "aime", "le café"] },
      check: { q: "« Il aime les tomates » se dit…", o: ["Er mag Tomaten", "Er magt Tomaten", "Er mögt Tomaten"], a: 0, why: "C'est un modal : <b>ich mag</b> et <b>er mag</b>, sans <b>-t</b>." }
    },
    {
      idea: "gefallen retourne la phrase — et c'est là que ça coince.",
      detail: "Il ne veut pas dire « aimer » mais <b>plaire</b>. Ce n'est donc pas toi le sujet, c'est la chose. <b>Mir gefällt diese Farbe</b> — mot à mot « à moi plaît cette couleur ». Comme le français « ça me plaît », mais on l'oublie parce qu'on pense en « j'aime ».",
      table: [["Ich mag diese Farbe.", "j'aime cette couleur — je suis sujet"], ["Mir gefällt diese Farbe.", "cette couleur me plaît — elle est sujet"]],
      check: { q: "« Ce livre me plaît » se dit…", o: ["Mir gefällt dieses Buch", "Ich gefalle dieses Buch", "Ich gefällt dieses Buch"], a: 0, why: "C'est le livre qui plaît : lui est sujet, toi tu es au datif — <b>mir</b>." }
    },
    {
      idea: "Pour aimer FAIRE quelque chose : gern après le verbe.",
      detail: "Pas besoin d'un verbe « aimer ». <b>Ich lese gern</b> — j'aime lire. <b>Ich esse gern Fisch</b> — j'aime manger du poisson. Un seul petit mot, glissé juste après le verbe conjugué.",
      gloss: { de: ["Ich", "lese", "gern"], fr: ["J'", "aime", "lire"] },
      check: { q: "« J'aime nager » se dit…", o: ["Ich schwimme gern", "Ich mag schwimmen", "Ich liebe schwimmen"], a: 0, why: "<b>gern</b> après le verbe. C'est la tournure la plus naturelle." }
    },
    {
      idea: "Et pour préférer : lieber, qui est le comparatif de gern.",
      detail: "<b>gern</b> → <b>lieber</b> → <b>am liebsten</b>. J'aime, je préfère, j'aime par-dessus tout. Et pour comparer deux choses, <b>als</b> — comme à l'étape 17 : <b>Ich mag Äpfel lieber als Birnen</b>.",
      table: [["gern", "volontiers"], ["lieber", "de préférence"], ["am liebsten", "par-dessus tout"]],
      check: { q: "« Je préfère le thé » se dit…", o: ["Ich trinke lieber Tee", "Ich trinke gerner Tee", "Ich preferiere Tee"], a: 0, why: "<b>lieber</b> est le comparatif de <b>gern</b>." }
    },
    {
      idea: "Enfin, le raccourci qui dit tout : Lieblings-.",
      detail: "Collé devant n'importe quel nom, il en fait le préféré. <b>mein Lieblingsbuch</b>, <b>meine Lieblingsfarbe</b>, <b>mein Lieblingsessen</b>. C'est le mot le plus rentable de l'étape : un seul procédé, autant de mots que tu veux.",
      check: { q: "« Mon plat préféré » se dit…", o: ["mein Lieblingsessen", "mein liebstes Essen", "mein Essen Liebling"], a: 0, why: "<b>Lieblings-</b> se colle au nom, en un seul mot." }
    }
  ],
  examples: [
    { d: "Ich mag Kaffee.", f: "J'aime le café." },
    { d: "Ich mag Tomaten.", f: "J'aime les tomates." },
    { d: "Mir gefällt diese Farbe nicht.", f: "Je n'aime pas cette couleur." },
    { d: "Das Buch gefällt mir.", f: "Ce livre me plaît." },
    { d: "Ich lese gern.", f: "J'aime lire." },
    { d: "Ich esse gern Fisch.", f: "J'aime manger du poisson." },
    { d: "Ich trinke lieber Tee.", f: "Je préfère le thé." },
    { d: "Ich mag Äpfel lieber als Birnen.", f: "Je préfère les pommes aux poires." },
    { d: "Mein Lieblingsbuch ist hier.", f: "Mon livre préféré est ici." },
    { d: "Das Essen ist gut.", f: "La nourriture est bonne." },
    { d: "Ich freue mich auf den Sommer.", f: "Je me réjouis de l'été." },
    { d: "Der Film ist klasse.", f: "Le film est génial." }
  ],
  vocab: [
    { d: "mögen", f: "aimer", p: "MEU-guenn" },
    { d: "gefallen", f: "plaire", p: "gue-FA-lenn" },
    { d: "gern", f: "volontiers", p: "GUÈRN" },
    { d: "lieber", f: "de préférence", p: "LII-beur" },
    { d: "Lieblings-", f: "préféré", p: "LIIP-linngs" },
    { d: "lustig", f: "amusant", p: "LOUS-tich" },
    { d: "klasse", f: "génial", p: "KLA-se" },
    { d: "lachen", f: "rire", p: "LA-khenn" },
    { d: "sich freuen", f: "se réjouir", p: "zich FROÏ-enn" },
    { d: "die Birne", f: "la poire", p: "dii BIR-ne" }
  ],
  quiz: [
    { q: "« Il aime les tomates » se dit…", o: ["Er mag Tomaten", "Er magt Tomaten", "Er mögt Tomaten", "Er mag Tomaten gern"], a: 0, why: "<b>mögen</b> est un modal : <b>ich mag</b>, <b>er mag</b>." },
    { q: "« Ce livre me plaît » se dit…", o: ["Mir gefällt dieses Buch", "Ich gefalle dieses Buch", "Ich gefällt dieses Buch", "Mich gefällt dieses Buch"], a: 0, why: "C'est le livre qui plaît : toi tu es au datif, <b>mir</b>." },
    { q: "« J'aime lire » se dit…", o: ["Ich lese gern", "Ich mag lesen", "Ich liebe lesen", "Ich lese gut"], a: 0, why: "<b>gern</b> après le verbe : la tournure la plus naturelle." },
    { q: "<b>lieber</b> est le comparatif de…", o: ["gern", "gut", "viel", "mögen"], a: 0, why: "<b>gern · lieber · am liebsten</b>." },
    { q: "« Ma couleur préférée » se dit…", o: ["meine Lieblingsfarbe", "meine liebste Farbe", "meine Farbe Liebling", "mein Lieblingsfarbe"], a: 0, why: "<b>Lieblings-</b> collé, et <b>Farbe</b> est féminin." }
  ],
  drills: [
    { t: "gap", f: "J'aime le café.", s: "Ich ___ Kaffee.", a: "mag", why: "Modal : pas de terminaison à <b>ich</b>." },
    { t: "gap", f: "Il aime les tomates.", s: "Er ___ Tomaten.", a: "mag", why: "Même forme qu'à <b>ich</b>." },
    { t: "gap", f: "Ce livre me plaît.", s: "___ gefällt dieses Buch.", a: "Mir", why: "Toi au datif, le livre sujet." },
    { t: "gap", f: "Je n'aime pas cette couleur.", s: "Mir ___ diese Farbe nicht.", a: "gefällt", why: "<b>gefallen</b> → <b>gefällt</b> à la 3ᵉ personne." },
    { t: "gap", f: "J'aime lire.", s: "Ich lese ___.", a: "gern", why: "Juste après le verbe." },
    { t: "gap", f: "Je préfère le thé.", s: "Ich trinke ___ Tee.", a: "lieber", why: "Le comparatif de <b>gern</b>." },
    { t: "gap", f: "Je préfère les pommes aux poires.", s: "Ich mag Äpfel lieber ___ Birnen.", a: "als", why: "<b>als</b> pour comparer." },
    { t: "gap", f: "Mon livre préféré.", s: "mein ___", a: "Lieblingsbuch", why: "<b>Lieblings-</b> collé au nom." },
    { t: "gap", f: "Le film est génial.", s: "Der Film ist ___.", a: "klasse", why: "Après <b>ist</b>, pas de terminaison." },
    { t: "gap", f: "Je me réjouis de l'été.", s: "Ich freue ___ auf den Sommer.", a: "mich", why: "<b>sich freuen</b> est réfléchi." },

    { t: "trans", inst: "Dis-le avec « gefallen ».", from: "Ich mag diese Farbe.", a: "Mir gefällt diese Farbe.",
      why: "La phrase se retourne : la couleur devient sujet." },
    { t: "trans", inst: "Dis-le avec « mögen ».", from: "Mir gefällt dieses Buch.", a: "Ich mag dieses Buch.",
      why: "Le chemin inverse : c'est toi qui redeviens sujet." },
    { t: "trans", inst: "Dis que tu aimes faire ça.", from: "Ich lese.", a: "Ich lese gern.",
      why: "<b>gern</b> suffit, sans verbe « aimer »." },
    { t: "trans", inst: "Mets à la préférence.", from: "Ich trinke gern Tee.", a: "Ich trinke lieber Tee.",
      why: "<b>gern</b> devient <b>lieber</b>." },
    { t: "trans", inst: "Mets à la troisième personne (er).", from: "Ich mag Kaffee.", a: "Er mag Kaffee.",
      why: "Modal : la forme ne change pas." },
    { t: "trans", inst: "Corrige la faute.", from: "Ich gefalle dieses Buch.", a: "Mir gefällt dieses Buch.",
      why: "C'est le livre qui plaît, pas toi." },
    { t: "trans", inst: "Fais-en ton préféré.", from: "mein Buch", a: "mein Lieblingsbuch",
      why: "<b>Lieblings-</b> se colle devant." },

    { t: "order", f: "J'aime le café.", a: "Ich mag Kaffee",
      why: "Sujet, verbe, objet." },
    { t: "order", f: "Ce livre me plaît.", a: "Mir gefällt dieses Buch",
      why: "Le datif en tête pousse le sujet après le verbe." },
    { t: "order", f: "J'aime manger du poisson.", a: "Ich esse gern Fisch",
      why: "<b>gern</b> juste après le verbe." },
    { t: "order", f: "Je préfère les pommes aux poires.", a: "Ich mag Äpfel lieber als Birnen",
      why: "<b>lieber</b> après l'objet, puis <b>als</b>." },
    { t: "order", f: "Mon livre préféré est ici.", a: "Mein Lieblingsbuch ist hier",
      why: "Le mot composé compte pour un." },
    { t: "order", f: "Je me réjouis de l'été.", a: "Ich freue mich auf den Sommer",
      why: "<b>sich freuen auf</b> + accusatif." },

    { t: "trad", f: "J'aime le café.", a: "Ich mag Kaffee.",
      why: "Pas d'article devant une matière." },
    { t: "trad", f: "Ce livre me plaît.", a: "Mir gefällt dieses Buch.",
      why: "La phrase retournée." },
    { t: "trad", f: "J'aime lire.", a: "Ich lese gern.",
      why: "<b>gern</b> après le verbe." },
    { t: "trad", f: "Je préfère le thé.", a: "Ich trinke lieber Tee.",
      why: "Le comparatif de <b>gern</b>." },
    { t: "trad", f: "Ma couleur préférée est le vert.", a: "Meine Lieblingsfarbe ist grün.",
      why: "<b>Lieblings-</b> collé, <b>Farbe</b> féminin." },
    { t: "trad", f: "Le livre est amusant.", a: "Das Buch ist lustig.",
      why: "Après <b>ist</b>, aucune terminaison." },
    { t: "trad", f: "Je n'aime pas cette couleur.", a: "Mir gefällt diese Farbe nicht.",
      why: "<b>nicht</b> à la fin nie toute la phrase." }
  ]
},

/* ------------------------------- ÉTAPE 28 -----------------------------
   Unité 27 du livre (p.45-46) — au restaurant.
   L'unité la plus utile du niveau si l'on voyage. Le livre donne les deux
   côtés du dialogue, ce qui est rare et précieux : on entend le serveur
   autant qu'on lui parle. On garde ce parti, et on ajoute les cuissons,
   qui sont la seule chose qu'on ne peut pas improviser sur place. */
{
  day: 28, title: "Au restaurant", de: "Ich hätte gerne…",
  steps: [
    {
      idea: "Arriver : demander une table.",
      detail: "<b>Ich hätte gerne einen Tisch für zwei</b> — une table pour deux. La formule polie de l'étape 25, avec l'accusatif : <b>Tisch</b> est masculin, donc <b>einen</b>.",
      gloss: { de: ["Ich", "hätte gerne", "einen", "Tisch"], fr: ["J'", "aimerais", "une", "table"] }
    },
    {
      idea: "Reconnaître ce que dit le serveur — c'est là qu'on se fige.",
      detail: "On prépare sa phrase, et c'est la réponse qu'on ne comprend pas. Ces quatre-là couvrent presque tout ce qu'on t'adressera.",
      table: [["Haben Sie sich entschieden?", "Avez-vous choisi ?"], ["Was möchten Sie?", "Que désirez-vous ?"], ["Und danach?", "Et ensuite ?"], ["Was darf ich Ihnen bringen?", "Que puis-je vous apporter ?"]],
      check: { q: "<b>Haben Sie sich entschieden?</b> veut dire…", o: ["Avez-vous choisi ?", "Voulez-vous payer ?", "Êtes-vous seul ?"], a: 0, why: "<b>sich entscheiden</b> = se décider. On te demande si tu as choisi." }
    },
    {
      idea: "Commander : trois formules, du plus poli au plus direct.",
      detail: "<b>Ich hätte gerne…</b> est le plus soigné, <b>Ich möchte…</b> convient partout, <b>Ich nehme…</b> est direct mais correct. Aucune n'est impolie — <b>Ich will</b>, en revanche, ne se dit pas au restaurant.",
      table: [["Ich hätte gerne…", "J'aimerais…"], ["Ich möchte…", "Je voudrais…"], ["Ich nehme…", "Je prends…"]]
    },
    {
      idea: "Signaler ce qu'on ne peut pas manger.",
      detail: "Ça se prépare avant d'y aller. <b>Ich bin allergisch gegen Nüsse</b> — allergique aux noix. <b>gegen</b> demande l'accusatif. Et <b>Ich bin Vegetarier</b>, sans article, comme pour les métiers à l'étape 8.",
      table: [["Ich bin allergisch gegen …", "Je suis allergique à…"], ["Ich bin Vegetarier.", "Je suis végétarien."], ["Ich kann … nicht essen.", "Je ne peux pas manger…"]],
      check: { q: "« Je suis allergique aux noix » se dit…", o: ["Ich bin allergisch gegen Nüsse", "Ich bin allergisch zu Nüsse", "Ich habe allergisch Nüsse"], a: 0, why: "<b>allergisch gegen</b> + accusatif — une expression figée." }
    },
    {
      idea: "Les cuissons : la seule chose qu'on ne peut pas deviner.",
      detail: "On te demandera <b>Wie möchten Sie es gegart?</b>. Les mots ne ressemblent à rien de français, et se tromper d'un cran change le plat. <b>durch</b> veut dire « à travers » : bien cuit de part en part.",
      table: [["blutig", "très saignant"], ["englisch", "saignant"], ["rosa", "rosé"], ["medium", "à point"], ["durch", "bien cuit"]],
      check: { q: "Tu veux ta viande à point. Tu dis…", o: ["medium", "durch", "blutig"], a: 0, why: "<b>durch</b> serait bien cuit, <b>blutig</b> très saignant." }
    },
    {
      idea: "Partir : l'addition, et le pourboire.",
      detail: "<b>Die Rechnung, bitte</b> suffit. On laisse en général un pourboire — <b>das Trinkgeld</b>, mot à mot « l'argent à boire ». Et si la carte dit <b>Service inbegriffen</b>, le service est déjà compris.",
      gloss: { de: ["Die", "Rechnung", "bitte"], fr: ["L'", "addition", "s'il vous plaît"] }
    }
  ],
  examples: [
    { d: "Ich hätte gerne einen Tisch für zwei.", f: "J'aimerais une table pour deux." },
    { d: "Haben Sie sich entschieden?", f: "Avez-vous choisi ?" },
    { d: "Ich nehme das Tagesgericht.", f: "Je prends le plat du jour." },
    { d: "Ich hätte gerne einen Salat.", f: "J'aimerais une salade." },
    { d: "Was möchten Sie trinken?", f: "Que désirez-vous boire ?" },
    { d: "Ich bin allergisch gegen Nüsse.", f: "Je suis allergique aux noix." },
    { d: "Ich bin Vegetarier.", f: "Je suis végétarien." },
    { d: "Wie möchten Sie es gegart?", f: "Comment le voulez-vous cuit ?" },
    { d: "Medium, bitte.", f: "À point, s'il vous plaît." },
    { d: "Die Rechnung, bitte.", f: "L'addition, s'il vous plaît." },
    { d: "Kann ich bar bezahlen?", f: "Puis-je payer en espèces ?" },
    { d: "Guten Appetit!", f: "Bon appétit !" }
  ],
  vocab: [
    { d: "der Tisch", f: "la table", p: "dèr TICH" },
    { d: "bestellen", f: "commander", p: "be-CHTÈ-lenn" },
    { d: "bezahlen", f: "payer", p: "be-TSAA-lenn" },
    { d: "die Rechnung", f: "l'addition", p: "dii RÈCH-noung" },
    { d: "das Trinkgeld", f: "le pourboire", p: "das TRINNK-guèlt" },
    { d: "die Karte", f: "la carte, le menu", p: "dii KAR-te" },
    { d: "der Kellner", f: "le serveur", p: "dèr KÈL-neur" },
    { d: "allergisch", f: "allergique", p: "a-LÈR-guich" },
    { d: "das Tagesgericht", f: "le plat du jour", p: "das TAA-guess-gue-richt" },
    { d: "Guten Appetit", f: "bon appétit", p: "GOU-tenn a-pé-TIIT" }
  ],
  quiz: [
    { q: "« Une table pour deux » se dit…", o: ["einen Tisch für zwei", "ein Tisch für zwei", "eine Tisch für zwei", "einem Tisch für zwei"], a: 0, why: "<b>Tisch</b> masculin complément → <b>einen</b>." },
    { q: "<b>Haben Sie sich entschieden?</b> veut dire…", o: ["Avez-vous choisi ?", "Voulez-vous payer ?", "Avez-vous réservé ?", "Êtes-vous prêt à partir ?"], a: 0, why: "<b>sich entscheiden</b> = se décider." },
    { q: "Quelle formule ne se dit PAS au restaurant ?", o: ["Ich will…", "Ich hätte gerne…", "Ich möchte…", "Ich nehme…"], a: 0, why: "<b>Ich will</b> sonne comme un ordre." },
    { q: "« À point » se dit…", o: ["medium", "durch", "blutig", "englisch"], a: 0, why: "<b>durch</b> = bien cuit, <b>blutig</b> = très saignant." },
    { q: "« Je suis allergique aux noix » se dit…", o: ["Ich bin allergisch gegen Nüsse", "Ich bin allergisch zu Nüsse", "Ich habe Allergie Nüsse", "Ich bin allergisch für Nüsse"], a: 0, why: "<b>allergisch gegen</b> + accusatif, expression figée." }
  ],
  drills: [
    { t: "gap", f: "J'aimerais une table pour deux.", s: "Ich hätte gerne ___ Tisch für zwei.", a: "einen", why: "Masculin complément." },
    { t: "gap", f: "Je prends le plat du jour.", s: "Ich nehme ___ Tagesgericht.", a: "das", why: "<b>Gericht</b> est neutre." },
    { t: "gap", f: "L'addition, s'il vous plaît.", s: "Die ___, bitte.", a: "Rechnung", why: "<b>-ung</b> → féminin." },
    { t: "gap", f: "Je suis allergique aux noix.", s: "Ich bin allergisch ___ Nüsse.", a: "gegen", why: "Expression figée avec l'accusatif." },
    { t: "gap", f: "Je suis végétarien.", s: "Ich bin ___.", a: "Vegetarier", why: "Sans article, comme pour un métier." },
    { t: "gap", f: "À point.", s: "___", a: "medium", why: "Le cran du milieu." },
    { t: "gap", f: "Bien cuit.", s: "___", a: "durch", why: "Mot à mot « à travers »." },
    { t: "gap", f: "Puis-je payer en espèces ?", s: "Kann ich ___ bezahlen?", a: "bar", why: "<b>bar</b> = en liquide." },
    { t: "gap", f: "Le pourboire", s: "das ___", a: "Trinkgeld", why: "Mot à mot « argent à boire »." },
    { t: "gap", f: "Que désirez-vous ?", s: "Was ___ Sie?", a: "möchten", why: "Le <b>Sie</b> poli prend la forme longue." },

    { t: "trans", inst: "Rends la commande polie.", from: "Ich will einen Salat.", a: "Ich hätte gerne einen Salat.",
      why: "<b>will</b> ne se dit pas au restaurant." },
    { t: "trans", inst: "Dis-le plus simplement.", from: "Ich hätte gerne das Tagesgericht.", a: "Ich nehme das Tagesgericht.",
      why: "<b>Ich nehme</b> est direct mais correct." },
    { t: "trans", inst: "Mets le bon article.", from: "Ich hätte gerne ___ Tisch.", a: "Ich hätte gerne einen Tisch.",
      why: "Masculin complément." },
    { t: "trans", inst: "Change la cuisson pour bien cuit.", from: "Medium, bitte.", a: "Durch, bitte.",
      why: "<b>durch</b> = cuit de part en part." },
    { t: "trans", inst: "Transforme en question.", from: "Sie haben sich entschieden.", a: "Haben Sie sich entschieden?",
      why: "Verbe en tête pour une question fermée." },
    { t: "trans", inst: "Signale que tu ne peux pas en manger.", from: "Ich bin allergisch gegen Nüsse.", a: "Ich kann Nüsse nicht essen.",
      why: "<b>nicht</b> juste avant l'infinitif." },

    { t: "order", f: "J'aimerais une table pour deux.", a: "Ich hätte gerne einen Tisch für zwei",
      why: "<b>für</b> + accusatif." },
    { t: "order", f: "Je prends le plat du jour.", a: "Ich nehme das Tagesgericht",
      why: "Sujet, verbe, objet." },
    { t: "order", f: "Que désirez-vous boire ?", a: "Was möchten Sie trinken",
      why: "L'infinitif ferme la phrase." },
    { t: "order", f: "Je suis allergique aux noix.", a: "Ich bin allergisch gegen Nüsse",
      why: "L'expression reste en bloc." },
    { t: "order", f: "Comment le voulez-vous cuit ?", a: "Wie möchten Sie es gegart",
      why: "Le participe ferme la phrase." },
    { t: "order", f: "Puis-je payer en espèces ?", a: "Kann ich bar bezahlen",
      why: "Modal en tête, infinitif au bout." },

    { t: "trad", f: "J'aimerais une table pour deux.", a: "Ich hätte gerne einen Tisch für zwei.",
      why: "La phrase d'arrivée." },
    { t: "trad", f: "Avez-vous choisi ?", a: "Haben Sie sich entschieden?",
      why: "Ce que dit le serveur." },
    { t: "trad", f: "Je prends le plat du jour.", a: "Ich nehme das Tagesgericht.",
      why: "Direct et correct." },
    { t: "trad", f: "Je suis allergique aux noix.", a: "Ich bin allergisch gegen Nüsse.",
      why: "À préparer avant d'y aller." },
    { t: "trad", f: "À point, s'il vous plaît.", a: "Medium, bitte.",
      why: "Le cran du milieu." },
    { t: "trad", f: "L'addition, s'il vous plaît.", a: "Die Rechnung, bitte.",
      why: "Suffit pour demander à payer." },
    { t: "trad", f: "Bon appétit !", a: "Guten Appetit!",
      why: "Se dit avant de commencer, comme en français." }
  ]
},

/* ------------------------------- ÉTAPE 29 -----------------------------
   Unité 28 du livre (p.47-48) — « es gibt », repris.
   Le livre traite « es gibt » deux fois : unité 14 puis unité 28. On ne
   recopie pas la répétition, on en fait une étape de consolidation : ce
   qu'on n'avait pas vu la première fois — les quantités, la question, la
   négation — et l'occasion de réemployer l'accusatif. */
{
  day: 29, title: "Il y a, en pratique", de: "Gibt es hier ein Café?",
  steps: [
    {
      idea: "Rappel en une ligne : es gibt ne change jamais.",
      detail: "Singulier, pluriel, question, négation — la formule reste identique. Seul ce qui suit bouge, et il est toujours à l'accusatif.",
      gloss: { de: ["Es", "gibt", "einen", "Markt"], fr: ["Il", "y a", "un", "marché"] }
    },
    {
      idea: "Avec une quantité, l'article disparaît.",
      detail: "<b>Es gibt viele Blumen</b> — pas d'article après <b>viele</b>. Pareil avec un nombre : <b>Es gibt fünf Äpfel</b>. C'est la quantité qui remplace l'article.",
      table: [["Es gibt viele Cafés.", "beaucoup de cafés"], ["Es gibt fünf Äpfel.", "cinq pommes"], ["Es gibt wenig Zeit.", "peu de temps"]],
      check: { q: "« Il y a beaucoup de livres » se dit…", o: ["Es gibt viele Bücher", "Es gibt viele die Bücher", "Es gibt die viele Bücher"], a: 0, why: "Après une quantité, plus d'article." }
    },
    {
      idea: "Demander ce qu'il y a : Was gibt es…?",
      detail: "Avec un mot interrogatif, le verbe reste en place 2 — la règle de l'étape 24. <b>Was gibt es heute in der Stadt?</b>. Et sans mot interrogatif, le verbe passe en tête : <b>Gibt es hier ein Café?</b>",
      table: [["Was gibt es …?", "Qu'y a-t-il … ?"], ["Gibt es …?", "Y a-t-il … ?"], ["Wo gibt es …?", "Où y a-t-il … ?"]],
      check: { q: "« Y a-t-il un parking ? » se dit…", o: ["Gibt es einen Parkplatz?", "Es gibt einen Parkplatz?", "Ist es einen Parkplatz?"], a: 0, why: "Question fermée : le verbe passe devant." }
    },
    {
      idea: "Dire qu'il n'y a pas : kein, décliné comme ein.",
      detail: "Donc <b>keinen</b> au masculin, comme <b>einen</b>. <b>Es gibt keinen Platz mehr</b> — il n'y a plus de place. Le <b>mehr</b> à la fin ajoute le « plus ».",
      table: [["Es gibt keinen Platz.", "masculin → keinen"], ["Es gibt keine Zeit.", "féminin → keine"], ["Es gibt kein Café.", "neutre → kein"]],
      check: { q: "« Il n'y a pas de parking » se dit…", o: ["Es gibt keinen Parkplatz", "Es gibt kein Parkplatz", "Es gibt nicht einen Parkplatz"], a: 0, why: "<b>kein</b> se décline comme <b>ein</b> : masculin → <b>keinen</b>." }
    },
    {
      idea: "Et le réflexe à prendre en voyage : Gibt es hier…?",
      detail: "Trois mots qui ouvrent presque toutes les questions utiles : <b>Gibt es hier ein Restaurant?</b>, <b>… eine Apotheke?</b>, <b>… einen Bahnhof?</b>. Avec <b>hier</b> ou <b>in der Nähe</b> — dans le coin.",
      gloss: { de: ["Gibt", "es", "hier", "eine", "Apotheke"], fr: ["Y a-t-il", "—", "ici", "une", "pharmacie"] }
    }
  ],
  examples: [
    { d: "Es gibt einen Markt in der Stadt.", f: "Il y a un marché en ville." },
    { d: "Was gibt es heute in der Stadt?", f: "Qu'y a-t-il en ville aujourd'hui ?" },
    { d: "Es gibt viele Blumen.", f: "Il y a beaucoup de fleurs." },
    { d: "Es gibt fünf Äpfel im Korb.", f: "Il y a cinq pommes dans le panier." },
    { d: "Gibt es hier ein Café?", f: "Y a-t-il un café ici ?" },
    { d: "Nein, es gibt kein Café.", f: "Non, il n'y a pas de café." },
    { d: "Gibt es einen Parkplatz?", f: "Y a-t-il un parking ?" },
    { d: "Es gibt keinen Platz mehr.", f: "Il n'y a plus de place." },
    { d: "Gibt es hier eine Apotheke?", f: "Y a-t-il une pharmacie ici ?" },
    { d: "Es gibt ein Restaurant in der Nähe.", f: "Il y a un restaurant à proximité." },
    { d: "Es gibt Obst und Gemüse auf dem Markt.", f: "Il y a des fruits et des légumes au marché." },
    { d: "Wo gibt es einen Bahnhof?", f: "Où y a-t-il une gare ?" }
  ],
  vocab: [
    { d: "der Markt", f: "le marché", p: "dèr MARKT" },
    { d: "die Apotheke", f: "la pharmacie", p: "dii a-po-TÉÉ-ke" },
    { d: "in der Nähe", f: "à proximité", p: "in dèr NÈ-e" },
    { d: "viele", f: "beaucoup de", p: "FII-le" },
    { d: "wenig", f: "peu de", p: "VÉ-nich" },
    { d: "kein", f: "aucun, pas de", p: "KAÏN" },
    { d: "der Korb", f: "le panier", p: "dèr KORP" },
    { d: "der Bahnhof", f: "la gare", p: "dèr BAAN-hof" },
    { d: "mehr", f: "plus, davantage", p: "MÉÉR" },
    { d: "hier", f: "ici", p: "HIIR" }
  ],
  quiz: [
    { q: "Après une quantité comme <b>viele</b>, l'article…", o: ["disparaît", "reste", "devient den", "devient dem"], a: 0, why: "<b>Es gibt viele Bücher</b> — la quantité remplace l'article." },
    { q: "« Y a-t-il un parking ? » se dit…", o: ["Gibt es einen Parkplatz?", "Es gibt einen Parkplatz?", "Ist es ein Parkplatz?", "Hat es einen Parkplatz?"], a: 0, why: "Question fermée : le verbe passe en tête." },
    { q: "« Il n'y a pas de parking » se dit…", o: ["Es gibt keinen Parkplatz", "Es gibt kein Parkplatz", "Es gibt nicht Parkplatz", "Es ist kein Parkplatz"], a: 0, why: "<b>kein</b> se décline comme <b>ein</b>." },
    { q: "Après <b>es gibt</b>, le nom est…", o: ["à l'accusatif", "au nominatif", "au datif", "au génitif"], a: 0, why: "C'est un complément — d'où <b>einen</b> au masculin." },
    { q: "<b>in der Nähe</b> veut dire…", o: ["à proximité", "à l'intérieur", "au fond", "en face"], a: 0, why: "<b>die Nähe</b> = la proximité." }
  ],
  drills: [
    { t: "gap", f: "Il y a un marché.", s: "Es gibt ___ Markt.", a: "einen", why: "Masculin complément." },
    { t: "gap", f: "Il y a une pharmacie.", s: "Es gibt ___ Apotheke.", a: "eine", why: "Féminin : rien ne change." },
    { t: "gap", f: "Il y a beaucoup de fleurs.", s: "Es gibt ___ Blumen.", a: "viele", why: "La quantité remplace l'article." },
    { t: "gap", f: "Il n'y a pas de café.", s: "Es gibt ___ Café.", a: "kein", why: "<b>Café</b> est neutre." },
    { t: "gap", f: "Il n'y a plus de place.", s: "Es gibt keinen Platz ___.", a: "mehr", why: "<b>mehr</b> ajoute le « plus »." },
    { t: "gap", f: "Y a-t-il un café ici ?", s: "___ es hier ein Café?", a: "Gibt", why: "Le verbe passe en tête." },
    { t: "gap", f: "Qu'y a-t-il en ville ?", s: "Was ___ es in der Stadt?", a: "gibt", why: "Après un mot interrogatif, le verbe reste en place 2." },
    { t: "gap", f: "Il y a un restaurant à proximité.", s: "Es gibt ein Restaurant in der ___.", a: "Nähe", why: "<b>die Nähe</b> = la proximité." },
    { t: "gap", f: "Il y a cinq pommes.", s: "Es gibt fünf ___.", a: "Äpfel", why: "<b>Apfel</b> → <b>Äpfel</b> au pluriel." },
    { t: "gap", f: "Où y a-t-il une gare ?", s: "___ gibt es einen Bahnhof?", a: "Wo", why: "<b>wo</b> pour le lieu." },

    { t: "trans", inst: "Mets à la forme négative.", from: "Es gibt einen Parkplatz.", a: "Es gibt keinen Parkplatz.",
      why: "<b>einen</b> devient <b>keinen</b>." },
    { t: "trans", inst: "Mets à la forme négative.", from: "Es gibt ein Café.", a: "Es gibt kein Café.",
      why: "Neutre : <b>ein</b> devient <b>kein</b>." },
    { t: "trans", inst: "Transforme en question.", from: "Es gibt hier ein Restaurant.", a: "Gibt es hier ein Restaurant?",
      why: "Le verbe passe devant." },
    { t: "trans", inst: "Mets au pluriel avec « beaucoup ».", from: "Es gibt eine Blume.", a: "Es gibt viele Blumen.",
      why: "La quantité chasse l'article." },
    { t: "trans", inst: "Demande où ça se trouve.", from: "Es gibt einen Bahnhof.", a: "Wo gibt es einen Bahnhof?",
      why: "<b>wo</b> en place 1, verbe en place 2." },
    { t: "trans", inst: "Corrige la faute.", from: "Es gibt ein Markt.", a: "Es gibt einen Markt.",
      why: "Ce qui suit <b>es gibt</b> est à l'accusatif." },

    { t: "order", f: "Il y a un marché en ville.", a: "Es gibt einen Markt in der Stadt",
      why: "Formule, complément, lieu." },
    { t: "order", f: "Y a-t-il un café ici ?", a: "Gibt es hier ein Café",
      why: "Verbe en tête, puis le lieu." },
    { t: "order", f: "Il n'y a plus de place.", a: "Es gibt keinen Platz mehr",
      why: "<b>mehr</b> après le nom nié." },
    { t: "order", f: "Qu'y a-t-il en ville aujourd'hui ?", a: "Was gibt es heute in der Stadt",
      why: "Temps avant lieu." },
    { t: "order", f: "Il y a beaucoup de fleurs.", a: "Es gibt viele Blumen",
      why: "Sans article après la quantité." },

    { t: "trad", f: "Il y a un marché en ville.", a: "Es gibt einen Markt in der Stadt.",
      why: "Accusatif après <b>es gibt</b>." },
    { t: "trad", f: "Y a-t-il un café ici ?", a: "Gibt es hier ein Café?",
      why: "La question la plus utile en voyage." },
    { t: "trad", f: "Il n'y a pas de parking.", a: "Es gibt keinen Parkplatz.",
      why: "<b>kein</b> décliné comme <b>ein</b>." },
    { t: "trad", f: "Il y a beaucoup de fleurs.", a: "Es gibt viele Blumen.",
      why: "Pas d'article après <b>viele</b>." },
    { t: "trad", f: "Y a-t-il une pharmacie ici ?", a: "Gibt es hier eine Apotheke?",
      why: "<b>Apotheke</b> est féminin." },
    { t: "trad", f: "Il y a un restaurant à proximité.", a: "Es gibt ein Restaurant in der Nähe.",
      why: "<b>in der Nähe</b> reste en bloc." },
    { t: "trad", f: "Où y a-t-il une gare ?", a: "Wo gibt es einen Bahnhof?",
      why: "<b>Bahnhof</b> masculin complément." }
  ]
},

/* ------------------------------- ÉTAPE 30 -----------------------------
   Unité 29 du livre (p.49) — les transports.
   Vocabulaire, mais deux points de langue s'y jouent : « mit dem » + datif
   pour dire comment on se déplace, et « nach » pour la destination. Sans
   eux la liste ne sert à rien. */
{
  day: 30, title: "Se déplacer", de: "Ich fahre mit dem Bus.",
  steps: [
    {
      idea: "Pour dire comment on se déplace : mit dem + le moyen.",
      detail: "<b>mit</b> demande toujours le datif — sans exception, dans tous les cas. Donc <b>mit dem Bus</b>, <b>mit dem Auto</b>, <b>mit der U-Bahn</b>. C'est une préposition à cas fixe : une chose de moins à décider.",
      table: [["mit dem Bus", "en bus — masculin"], ["mit dem Auto", "en voiture — neutre"], ["mit der U-Bahn", "en métro — féminin"], ["mit dem Fahrrad", "à vélo — neutre"]],
      check: { q: "« En métro » se dit…", o: ["mit der U-Bahn", "mit die U-Bahn", "mit den U-Bahn"], a: 0, why: "<b>U-Bahn</b> est féminin, et au datif le féminin devient <b>der</b>." }
    },
    {
      idea: "Une exception qui s'entend souvent : à pied.",
      detail: "<b>zu Fuß</b> — mot à mot « au pied ». Pas de <b>mit</b>, pas d'article. C'est une formule figée, comme <b>nach Hause</b> à l'étape 18.",
      check: { q: "« À pied » se dit…", o: ["zu Fuß", "mit dem Fuß", "mit Fuß"], a: 0, why: "Formule figée : <b>zu Fuß</b>, sans article." }
    },
    {
      idea: "Deux verbes pour se déplacer, et ils ne sont pas interchangeables.",
      detail: "<b>fahren</b> quand un véhicule est en jeu, <b>gehen</b> quand on marche. Un Allemand ne dira jamais <b>ich gehe nach Berlin</b> s'il prend le train. Et souviens-toi de l'étape 12 : <b>fahren</b> prend un tréma, <b>du fährst</b>.",
      table: [["Ich fahre nach Berlin.", "en véhicule"], ["Ich gehe zur Arbeit.", "à pied"]],
      check: { q: "Tu prends le train pour Berlin. Tu dis…", o: ["Ich fahre nach Berlin", "Ich gehe nach Berlin", "Ich laufe nach Berlin"], a: 0, why: "<b>fahren</b> dès qu'il y a un véhicule." }
    },
    {
      idea: "La destination : nach pour les villes et les pays.",
      detail: "<b>nach Berlin</b>, <b>nach Deutschland</b> — sans article. Mais pour un lieu qui en prend un, c'est <b>zu</b> + datif : <b>zum Bahnhof</b>, <b>zur Arbeit</b>. <b>zum</b> = <b>zu dem</b>, <b>zur</b> = <b>zu der</b>.",
      table: [["nach Berlin", "ville — sans article"], ["nach Deutschland", "pays — sans article"], ["zum Bahnhof", "zu dem — masculin"], ["zur Arbeit", "zu der — féminin"]],
      check: { q: "« Je vais à la gare » se dit…", o: ["Ich fahre zum Bahnhof", "Ich fahre nach Bahnhof", "Ich fahre zu Bahnhof"], a: 0, why: "<b>Bahnhof</b> prend un article, donc <b>zu</b> + datif → <b>zum</b>." }
    },
    {
      idea: "Et le vocabulaire du billet, à connaître avant le guichet.",
      detail: "<b>einfach</b> pour un aller simple, <b>hin und zurück</b> pour un aller-retour — mot à mot « là-bas et retour ». Et deux mots qui décident de ta journée : <b>pünktlich</b>, à l'heure, et <b>verspätet</b>, en retard.",
      table: [["das Ticket", "le billet"], ["einfach", "aller simple"], ["hin und zurück", "aller-retour"], ["pünktlich", "à l'heure"], ["verspätet", "en retard"]]
    }
  ],
  examples: [
    { d: "Ich fahre mit dem Bus zur Arbeit.", f: "Je vais au travail en bus." },
    { d: "Sie nimmt lieber die U-Bahn.", f: "Elle préfère prendre le métro." },
    { d: "Ich fahre nach Berlin.", f: "Je vais à Berlin." },
    { d: "Wir fahren mit dem Fahrrad.", f: "Nous y allons à vélo." },
    { d: "Ich gehe zu Fuß.", f: "Je vais à pied." },
    { d: "Wo ist der Bahnhof?", f: "Où est la gare ?" },
    { d: "Ich habe mein Ticket verloren.", f: "J'ai perdu mon billet." },
    { d: "Ein Ticket nach Berlin, bitte.", f: "Un billet pour Berlin, s'il vous plaît." },
    { d: "Hin und zurück, bitte.", f: "Aller-retour, s'il vous plaît." },
    { d: "Der Zug ist verspätet.", f: "Le train est en retard." },
    { d: "Der Bus ist pünktlich.", f: "Le bus est à l'heure." },
    { d: "Wir fahren zum Flughafen.", f: "Nous allons à l'aéroport." }
  ],
  vocab: [
    { d: "der Zug", f: "le train", p: "dèr TSOUK" },
    { d: "der Bahnhof", f: "la gare", p: "dèr BAAN-hof" },
    { d: "die U-Bahn", f: "le métro", p: "dii OU-baan" },
    { d: "das Fahrrad", f: "le vélo", p: "das FAAR-raat" },
    { d: "das Flugzeug", f: "l'avion", p: "das FLOUK-tsoïk" },
    { d: "das Ticket", f: "le billet", p: "das TI-keut" },
    { d: "zu Fuß", f: "à pied", p: "tsou FOUSS" },
    { d: "pünktlich", f: "à l'heure", p: "PUNKT-lich" },
    { d: "verspätet", f: "en retard", p: "feur-CHPÈÈ-teut" },
    { d: "die Haltestelle", f: "l'arrêt", p: "dii HAL-te-chtè-le" }
  ],
  quiz: [
    { q: "« En métro » se dit…", o: ["mit der U-Bahn", "mit die U-Bahn", "mit den U-Bahn", "mit dem U-Bahn"], a: 0, why: "<b>mit</b> + datif, et le féminin devient <b>der</b>." },
    { q: "« À pied » se dit…", o: ["zu Fuß", "mit dem Fuß", "mit Fuß", "auf Fuß"], a: 0, why: "Formule figée, sans article." },
    { q: "Tu prends le train pour Berlin. Tu dis…", o: ["Ich fahre nach Berlin", "Ich gehe nach Berlin", "Ich laufe nach Berlin", "Ich fahre zu Berlin"], a: 0, why: "<b>fahren</b> dès qu'il y a un véhicule, et <b>nach</b> pour une ville." },
    { q: "« Je vais à la gare » se dit…", o: ["Ich fahre zum Bahnhof", "Ich fahre nach Bahnhof", "Ich fahre zu Bahnhof", "Ich fahre in Bahnhof"], a: 0, why: "Un lieu qui prend un article demande <b>zu</b> + datif." },
    { q: "« Aller-retour » se dit…", o: ["hin und zurück", "einfach", "hin und her", "vor und zurück"], a: 0, why: "Mot à mot « là-bas et retour ». <b>einfach</b> serait un aller simple." }
  ],
  drills: [
    { t: "gap", f: "en bus", s: "mit ___ Bus", a: "dem", why: "<b>mit</b> + datif, masculin → <b>dem</b>." },
    { t: "gap", f: "en métro", s: "mit ___ U-Bahn", a: "der", why: "Datif féminin → <b>der</b>." },
    { t: "gap", f: "à vélo", s: "mit ___ Fahrrad", a: "dem", why: "Neutre au datif → <b>dem</b>." },
    { t: "gap", f: "à pied", s: "___ Fuß", a: "zu", why: "Formule figée." },
    { t: "gap", f: "Je vais à Berlin.", s: "Ich fahre ___ Berlin.", a: "nach", why: "<b>nach</b> pour une ville." },
    { t: "gap", f: "Je vais à la gare.", s: "Ich fahre ___ Bahnhof.", a: "zum", why: "<b>zum</b> = <b>zu dem</b>." },
    { t: "gap", f: "Je vais au travail.", s: "Ich fahre ___ Arbeit.", a: "zur", why: "<b>zur</b> = <b>zu der</b>, féminin." },
    { t: "gap", f: "Le train est en retard.", s: "Der Zug ist ___.", a: "verspätet", why: "Après <b>ist</b>, pas de terminaison." },
    { t: "gap", f: "Aller-retour, s'il vous plaît.", s: "___ und zurück, bitte.", a: "Hin", why: "Mot à mot « là-bas et retour »." },
    { t: "gap", f: "Où est la gare ?", s: "Wo ist der ___?", a: "Bahnhof", why: "<b>Bahnhof</b> est masculin." },

    { t: "trans", inst: "Dis-le avec le bon verbe.", from: "Ich gehe nach Berlin mit dem Zug.", a: "Ich fahre mit dem Zug nach Berlin.",
      why: "<b>fahren</b> dès qu'il y a un véhicule, et manière avant lieu." },
    { t: "trans", inst: "Passe du bus au métro.", from: "Ich fahre mit dem Bus.", a: "Ich fahre mit der U-Bahn.",
      why: "<b>U-Bahn</b> est féminin : <b>dem</b> devient <b>der</b>." },
    { t: "trans", inst: "Dis que tu y vas à pied.", from: "Ich fahre mit dem Bus.", a: "Ich gehe zu Fuß.",
      why: "À pied, on emploie <b>gehen</b>, et <b>zu Fuß</b> sans article." },
    { t: "trans", inst: "Mets la bonne préposition.", from: "Ich fahre ___ Bahnhof.", a: "Ich fahre zum Bahnhof.",
      why: "Un lieu à article prend <b>zu</b> + datif." },
    { t: "trans", inst: "Mets à la deuxième personne (du).", from: "Ich fahre nach Berlin.", a: "Du fährst nach Berlin.",
      why: "<b>fahren</b> prend un tréma à la 2ᵉ personne." },
    { t: "trans", inst: "Demande un aller simple.", from: "Hin und zurück, bitte.", a: "Einfach, bitte.",
      why: "<b>einfach</b> pour un aller simple." },

    { t: "order", f: "Je vais au travail en bus.", a: "Ich fahre mit dem Bus zur Arbeit",
      why: "Manière avant lieu." },
    { t: "order", f: "Nous allons à l'aéroport.", a: "Wir fahren zum Flughafen",
      why: "<b>zum</b> pour un lieu à article." },
    { t: "order", f: "Un billet pour Berlin, s'il vous plaît.", a: "Ein Ticket nach Berlin bitte",
      why: "<b>nach</b> + ville." },
    { t: "order", f: "Le train est en retard.", a: "Der Zug ist verspätet",
      why: "Sujet, verbe, adjectif." },
    { t: "order", f: "Elle préfère prendre le métro.", a: "Sie nimmt lieber die U-Bahn",
      why: "<b>lieber</b> après le verbe, et <b>nehmen</b> → <b>nimmt</b>." },

    { t: "trad", f: "Je vais au travail en bus.", a: "Ich fahre mit dem Bus zur Arbeit.",
      why: "<b>mit</b> + datif, <b>zur</b> pour la destination." },
    { t: "trad", f: "Je vais à pied.", a: "Ich gehe zu Fuß.",
      why: "<b>gehen</b> et la formule figée." },
    { t: "trad", f: "Je vais à Berlin.", a: "Ich fahre nach Berlin.",
      why: "<b>nach</b> + ville, sans article." },
    { t: "trad", f: "Nous y allons à vélo.", a: "Wir fahren mit dem Fahrrad.",
      why: "<b>Fahrrad</b> est neutre." },
    { t: "trad", f: "Où est la gare ?", a: "Wo ist der Bahnhof?",
      why: "<b>wo</b> pour la position." },
    { t: "trad", f: "Le train est en retard.", a: "Der Zug ist verspätet.",
      why: "Le mot qui décide de ta journée." },
    { t: "trad", f: "Aller-retour, s'il vous plaît.", a: "Hin und zurück, bitte.",
      why: "Au guichet, ça suffit." }
  ]
},

/* ------------------------------- ÉTAPE 31 -----------------------------
   Unité 30 du livre (p.50) — la négation.
   La faute la plus fréquente des francophones, et le livre l'expédie en
   quatre puces. On lui donne une étape entière : « nicht » ou « kein » ne
   se choisit pas au feeling, et la place de « nicht » change le sens. */
{
  day: 31, title: "Dire non", de: "Ich habe kein Auto.",
  steps: [
    {
      idea: "Deux mots pour nier, et le choix n'est pas libre.",
      detail: "<b>kein</b> devant un <b>nom</b>. <b>nicht</b> pour tout le reste — un verbe, un adjectif, un adverbe. C'est la règle entière, et elle règle presque tous les cas.",
      table: [["Ich habe kein Auto.", "un nom → kein"], ["Ich arbeite nicht.", "un verbe → nicht"], ["Das ist nicht gut.", "un adjectif → nicht"]],
      check: { q: "« Je n'ai pas de voiture » se dit…", o: ["Ich habe kein Auto", "Ich habe nicht ein Auto", "Ich habe nicht Auto"], a: 0, why: "On nie un nom → <b>kein</b>. « nicht ein » ne se dit pas." }
    },
    {
      idea: "kein se décline exactement comme ein.",
      detail: "Rien de nouveau à apprendre : tu connais déjà le tableau. <b>ein</b> → <b>kein</b>, <b>einen</b> → <b>keinen</b>, <b>eine</b> → <b>keine</b>. Un <b>k</b> devant, et c'est tout.",
      table: [["ein Auto", "kein Auto — neutre"], ["einen Hund", "keinen Hund — masculin"], ["eine Katze", "keine Katze — féminin"], ["Bücher", "keine Bücher — pluriel"]],
      check: { q: "« Je n'ai pas de chien » se dit…", o: ["Ich habe keinen Hund", "Ich habe kein Hund", "Ich habe keine Hund"], a: 0, why: "<b>Hund</b> masculin complément → <b>keinen</b>, comme <b>einen</b>." }
    },
    {
      idea: "Un nom sans article se nie aussi avec kein.",
      detail: "<b>Ich habe Zeit</b> → <b>Ich habe keine Zeit</b>. <b>Ich trinke Kaffee</b> → <b>Ich trinke keinen Kaffee</b>. Le nom n'avait pas d'article, il en reçoit un négatif.",
      check: { q: "« Je n'ai pas le temps » se dit…", o: ["Ich habe keine Zeit", "Ich habe nicht Zeit", "Ich habe nicht die Zeit"], a: 0, why: "<b>Zeit</b> est un nom, donc <b>kein</b> — au féminin, <b>keine</b>." }
    },
    {
      idea: "Et la place de nicht : à la fin, sauf devant ce qu'il vise.",
      detail: "Quand <b>nicht</b> nie toute la phrase, il va en fin : <b>Ich arbeite heute nicht</b>. Mais s'il vise un mot précis, il se place juste devant lui — et le sens change : <b>Ich arbeite nicht heute</b> veut dire « pas aujourd'hui, un autre jour ».",
      table: [["Ich arbeite heute nicht.", "je ne travaille pas aujourd'hui"], ["Ich arbeite nicht heute.", "pas aujourd'hui — un autre jour"]],
      check: { q: "Où va <b>nicht</b> quand il nie toute la phrase ?", o: ["à la fin", "après le sujet", "en première position"], a: 0, why: "En fin de phrase — sauf s'il vise un mot précis, qu'il précède alors." }
    },
    {
      idea: "Deux mots de plus, et tu as tout : nie et nichts.",
      detail: "<b>nie</b> = jamais. <b>nichts</b> = rien. Attention à ne pas confondre <b>nicht</b> (pas) et <b>nichts</b> (rien) : un <b>s</b> les sépare, et le sens n'est pas le même.",
      table: [["nicht", "pas"], ["nichts", "rien"], ["nie", "jamais"], ["kein", "aucun, pas de"]],
      check: { q: "« Il n'y a rien d'intéressant » se dit…", o: ["Es gibt nichts Interessantes", "Es gibt nicht Interessantes", "Es gibt kein Interessantes"], a: 0, why: "« rien » se dit <b>nichts</b>, avec un <b>s</b>." }
    }
  ],
  examples: [
    { d: "Ich habe kein Auto.", f: "Je n'ai pas de voiture." },
    { d: "Ich habe keinen Hund.", f: "Je n'ai pas de chien." },
    { d: "Ich habe keine Zeit.", f: "Je n'ai pas le temps." },
    { d: "Ich arbeite heute nicht.", f: "Je ne travaille pas aujourd'hui." },
    { d: "Das ist nicht gut.", f: "Ce n'est pas bien." },
    { d: "Ich sehe den Film nicht.", f: "Je ne vois pas le film." },
    { d: "Es gibt nichts Interessantes im Fernsehen.", f: "Il n'y a rien d'intéressant à la télé." },
    { d: "Ich habe ihn nie getroffen.", f: "Je ne l'ai jamais rencontré." },
    { d: "Es gibt keinen Platz mehr.", f: "Il n'y a plus de place." },
    { d: "Sie trinkt keinen Kaffee.", f: "Elle ne boit pas de café." },
    { d: "Das Wochenende war nicht so gut.", f: "Le week-end n'était pas très bon." },
    { d: "Ich verstehe das nicht.", f: "Je ne comprends pas ça." }
  ],
  vocab: [
    { d: "nicht", f: "pas", p: "NICHT" },
    { d: "kein", f: "aucun, pas de", p: "KAÏN" },
    { d: "nichts", f: "rien", p: "NICHTS" },
    { d: "nie", f: "jamais", p: "NII" },
    { d: "leider", f: "malheureusement", p: "LAÏ-deur" },
    { d: "langweilig", f: "ennuyeux", p: "LANNG-vaï-lich" },
    { d: "verstehen", f: "comprendre", p: "feur-CHTÉ-enn" },
    { d: "das Fernsehen", f: "la télévision", p: "das FÈRN-zé-enn" },
    { d: "treffen", f: "rencontrer", p: "TRÈ-fenn" },
    { d: "hoffentlich", f: "espérons-le", p: "HO-fennt-lich" }
  ],
  quiz: [
    { q: "On nie un nom avec…", o: ["kein", "nicht", "nichts", "nie"], a: 0, why: "<b>kein</b> devant un nom, <b>nicht</b> pour tout le reste." },
    { q: "« Je n'ai pas de chien » se dit…", o: ["Ich habe keinen Hund", "Ich habe kein Hund", "Ich habe nicht einen Hund", "Ich habe nicht Hund"], a: 0, why: "<b>kein</b> se décline comme <b>ein</b> : masculin complément → <b>keinen</b>." },
    { q: "Où va <b>nicht</b> quand il nie toute la phrase ?", o: ["à la fin", "après le sujet", "en première position", "devant le verbe"], a: 0, why: "En fin de phrase — sauf s'il vise un mot précis." },
    { q: "Quelle est la différence entre <b>nicht</b> et <b>nichts</b> ?", o: ["nicht = pas, nichts = rien", "aucune", "nichts est plus poli", "nicht s'emploie au passé"], a: 0, why: "Un <b>s</b> les sépare, et le sens change complètement." },
    { q: "« Je n'ai pas le temps » se dit…", o: ["Ich habe keine Zeit", "Ich habe nicht Zeit", "Ich habe nicht die Zeit", "Ich habe kein Zeit"], a: 0, why: "<b>Zeit</b> est un nom féminin → <b>keine</b>." }
  ],
  drills: [
    { t: "gap", f: "Je n'ai pas de voiture.", s: "Ich habe ___ Auto.", a: "kein", why: "<b>Auto</b> est neutre." },
    { t: "gap", f: "Je n'ai pas de chien.", s: "Ich habe ___ Hund.", a: "keinen", why: "Masculin complément → <b>keinen</b>." },
    { t: "gap", f: "Je n'ai pas le temps.", s: "Ich habe ___ Zeit.", a: "keine", why: "<b>Zeit</b> est féminin." },
    { t: "gap", f: "Je ne travaille pas aujourd'hui.", s: "Ich arbeite heute ___.", a: "nicht", why: "Il nie le verbe → en fin de phrase." },
    { t: "gap", f: "Ce n'est pas bien.", s: "Das ist ___ gut.", a: "nicht", why: "Devant l'adjectif qu'il vise." },
    { t: "gap", f: "Il n'y a rien d'intéressant.", s: "Es gibt ___ Interessantes.", a: "nichts", why: "« rien » → <b>nichts</b>." },
    { t: "gap", f: "Je ne l'ai jamais rencontré.", s: "Ich habe ihn ___ getroffen.", a: "nie", why: "« jamais » → <b>nie</b>." },
    { t: "gap", f: "Elle ne boit pas de café.", s: "Sie trinkt ___ Kaffee.", a: "keinen", why: "<b>Kaffee</b> masculin complément." },
    { t: "gap", f: "Il n'y a plus de place.", s: "Es gibt ___ Platz mehr.", a: "keinen", why: "<b>Platz</b> est masculin." },
    { t: "gap", f: "Je ne comprends pas ça.", s: "Ich verstehe das ___.", a: "nicht", why: "Il nie le verbe → en fin." },

    { t: "trans", inst: "Mets à la forme négative.", from: "Ich habe ein Auto.", a: "Ich habe kein Auto.",
      why: "<b>ein</b> devient <b>kein</b>." },
    { t: "trans", inst: "Mets à la forme négative.", from: "Ich habe einen Hund.", a: "Ich habe keinen Hund.",
      why: "<b>einen</b> devient <b>keinen</b>." },
    { t: "trans", inst: "Mets à la forme négative.", from: "Ich habe Zeit.", a: "Ich habe keine Zeit.",
      why: "Un nom sans article reçoit quand même <b>kein</b>." },
    { t: "trans", inst: "Mets à la forme négative.", from: "Ich arbeite heute.", a: "Ich arbeite heute nicht.",
      why: "On nie le verbe → <b>nicht</b> en fin." },
    { t: "trans", inst: "Corrige la faute.", from: "Ich habe nicht ein Auto.", a: "Ich habe kein Auto.",
      why: "On ne dit jamais « nicht ein » : c'est <b>kein</b>." },
    { t: "trans", inst: "Corrige la faute.", from: "Ich habe nicht Zeit.", a: "Ich habe keine Zeit.",
      why: "<b>Zeit</b> est un nom." },
    { t: "trans", inst: "Dis que ça n'arrive jamais.", from: "Ich treffe ihn nicht.", a: "Ich treffe ihn nie.",
      why: "<b>nie</b> pour « jamais »." },

    { t: "order", f: "Je n'ai pas de voiture.", a: "Ich habe kein Auto",
      why: "Sujet, verbe, négation collée au nom." },
    { t: "order", f: "Je ne travaille pas aujourd'hui.", a: "Ich arbeite heute nicht",
      why: "<b>nicht</b> ferme la phrase." },
    { t: "order", f: "Elle ne boit pas de café.", a: "Sie trinkt keinen Kaffee",
      why: "<b>keinen</b> devant le nom." },
    { t: "order", f: "Il n'y a rien d'intéressant à la télé.", a: "Es gibt nichts Interessantes im Fernsehen",
      why: "<b>im</b> = <b>in dem</b>." },
    { t: "order", f: "Je ne comprends pas ça.", a: "Ich verstehe das nicht",
      why: "<b>nicht</b> après le complément." },

    { t: "trad", f: "Je n'ai pas de voiture.", a: "Ich habe kein Auto.",
      why: "La faute classique évitée : jamais « nicht ein »." },
    { t: "trad", f: "Je n'ai pas de chien.", a: "Ich habe keinen Hund.",
      why: "Masculin complément." },
    { t: "trad", f: "Je n'ai pas le temps.", a: "Ich habe keine Zeit.",
      why: "Un nom, donc <b>kein</b>." },
    { t: "trad", f: "Je ne travaille pas aujourd'hui.", a: "Ich arbeite heute nicht.",
      why: "<b>nicht</b> en fin de phrase." },
    { t: "trad", f: "Ce n'est pas bien.", a: "Das ist nicht gut.",
      why: "<b>nicht</b> devant l'adjectif." },
    { t: "trad", f: "Il n'y a rien d'intéressant.", a: "Es gibt nichts Interessantes.",
      why: "<b>nichts</b> avec un <b>s</b>." },
    { t: "trad", f: "Je ne l'ai jamais rencontré.", a: "Ich habe ihn nie getroffen.",
      why: "<b>nie</b>, et le participe en fin." }
  ]
},

/* ------------------------------- ÉTAPE 32 -----------------------------
   Unité 31 du livre (p.51) — les pronoms réfléchis.
   Le livre donne la liste et signale que certains verbes prennent le datif.
   On garde les deux, mais on explique QUAND — sinon « mich » et « mir »
   se choisissent au hasard. */
{
  day: 32, title: "Les verbes réfléchis", de: "Ich wasche mich.",
  steps: [
    {
      idea: "Un verbe réfléchi, c'est une action qui retombe sur soi.",
      detail: "Comme en français : je me lave, tu t'excuses. L'allemand ajoute un pronom après le verbe : <b>Ich wasche mich</b>. La différence avec le français, c'est la <b>place</b> — chez nous le pronom précède le verbe, en allemand il le suit.",
      gloss: { de: ["Ich", "wasche", "mich"], fr: ["Je", "me", "lave"] }
    },
    {
      idea: "Les six pronoms, dont deux identiques.",
      detail: "<b>mich</b>, <b>dich</b>, <b>sich</b>, <b>uns</b>, <b>euch</b>, <b>sich</b>. Un seul est vraiment nouveau : <b>sich</b>, qui sert à la fois pour <i>il/elle</i> et pour <i>ils/elles</i> — et aussi pour le <b>Sie</b> poli.",
      table: [["ich", "mich"], ["du", "dich"], ["er / sie / es", "sich"], ["wir", "uns"], ["ihr", "euch"], ["sie / Sie", "sich"]],
      check: { q: "« Nous nous dépêchons » se dit…", o: ["Wir beeilen uns", "Wir beeilen sich", "Wir beeilen wir"], a: 0, why: "<b>wir</b> prend <b>uns</b>." }
    },
    {
      idea: "Certains verbes sont réfléchis en allemand et pas en français.",
      detail: "Il faut les apprendre comme tels, avec leur <b>sich</b> collé. <b>sich freuen</b> — se réjouir, mais qu'on traduit souvent par « être content ». <b>sich beeilen</b> — se dépêcher. <b>sich erholen</b> — se reposer.",
      table: [["sich freuen", "être content, se réjouir"], ["sich beeilen", "se dépêcher"], ["sich erholen", "se reposer"], ["sich entspannen", "se détendre"], ["sich entschuldigen", "s'excuser"]]
    },
    {
      idea: "Et le point que le livre effleure : mich ou mir ?",
      detail: "<b>mich</b> quand l'action retombe directement sur toi. <b>mir</b> quand elle retombe sur autre chose, et que tu en es seulement le bénéficiaire. <b>Ich wasche mich</b> — je me lave. <b>Ich wasche mir die Hände</b> — je me lave les mains : ce sont les mains qui sont lavées, pour moi.",
      table: [["Ich wasche mich.", "c'est moi qui suis lavé → mich"], ["Ich wasche mir die Hände.", "ce sont les mains → mir"], ["Ich kaufe mir ein Buch.", "c'est le livre, pour moi → mir"]],
      check: { q: "« Je m'achète un livre » se dit…", o: ["Ich kaufe mir ein Buch", "Ich kaufe mich ein Buch", "Ich kaufe ein Buch mich"], a: 0, why: "C'est le livre qu'on achète : toi tu en es le bénéficiaire → <b>mir</b>." }
    },
    {
      idea: "Un repère simple pour ne pas hésiter.",
      detail: "S'il y a <i>déjà un complément</i> après le verbe — les mains, un livre, un film — alors le pronom passe au datif : <b>mir</b>, <b>dir</b>. S'il n'y en a pas, c'est <b>mich</b>, <b>dich</b>. Une seule question à se poser.",
      check: { q: "« Tu te laves les cheveux » — quel pronom ?", o: ["dir, car les cheveux sont le complément", "dich", "sich"], a: 0, why: "Il y a déjà un complément — <b>die Haare</b> — donc le pronom passe au datif." }
    }
  ],
  examples: [
    { d: "Ich wasche mich.", f: "Je me lave." },
    { d: "Ich wasche mir die Hände.", f: "Je me lave les mains." },
    { d: "Du musst dich entschuldigen.", f: "Tu dois t'excuser." },
    { d: "Wir müssen uns beeilen.", f: "Nous devons nous dépêcher." },
    { d: "Ich habe mich im Park erholt.", f: "Je me suis reposé au parc." },
    { d: "Ich freue mich auf den Sommer.", f: "Je me réjouis de l'été." },
    { d: "Er entspannt sich heute Abend.", f: "Il se détend ce soir." },
    { d: "Ich kaufe mir ein Buch.", f: "Je m'achète un livre." },
    { d: "Sie trifft sich gerne mit Freunden.", f: "Elle aime retrouver des amis." },
    { d: "Setzen Sie sich, bitte.", f: "Asseyez-vous, s'il vous plaît." },
    { d: "Wie fühlst du dich?", f: "Comment te sens-tu ?" },
    { d: "Ich ziehe mich an.", f: "Je m'habille." }
  ],
  vocab: [
    { d: "sich waschen", f: "se laver", p: "zich VA-chenn" },
    { d: "sich beeilen", f: "se dépêcher", p: "zich be-AÏ-lenn" },
    { d: "sich erholen", f: "se reposer", p: "zich eur-HOO-lenn" },
    { d: "sich freuen", f: "être content", p: "zich FROÏ-enn" },
    { d: "sich entschuldigen", f: "s'excuser", p: "zich ennt-CHOUL-di-guenn" },
    { d: "sich setzen", f: "s'asseoir", p: "zich ZÈ-tsenn" },
    { d: "sich fühlen", f: "se sentir", p: "zich FU-lenn" },
    { d: "die Hand", f: "la main", p: "dii HANNT" },
    { d: "die Haare", f: "les cheveux", p: "dii HAA-re" },
    { d: "sich anziehen", f: "s'habiller", p: "zich ANN-tsii-enn" }
  ],
  quiz: [
    { q: "En allemand, le pronom réfléchi se place…", o: ["après le verbe", "avant le verbe", "en fin de phrase", "avant le sujet"], a: 0, why: "<b>Ich wasche mich</b> — l'inverse du français." },
    { q: "« Nous nous dépêchons » se dit…", o: ["Wir beeilen uns", "Wir beeilen sich", "Wir beeilen wir", "Wir uns beeilen"], a: 0, why: "<b>wir</b> prend <b>uns</b>." },
    { q: "« Je m'achète un livre » se dit…", o: ["Ich kaufe mir ein Buch", "Ich kaufe mich ein Buch", "Ich mir kaufe ein Buch", "Ich kaufe ein Buch mich"], a: 0, why: "Il y a déjà un complément — le livre — donc le pronom passe au datif." },
    { q: "Quand emploie-t-on <b>mir</b> plutôt que <b>mich</b> ?", o: ["quand il y a déjà un complément", "quand la phrase est longue", "au passé", "avec les verbes courts"], a: 0, why: "<b>Ich wasche mich</b> mais <b>Ich wasche mir die Hände</b>." },
    { q: "<b>sich freuen</b> veut dire…", o: ["être content", "avoir peur", "se souvenir", "se plaindre"], a: 0, why: "Réfléchi en allemand, alors que le français dit simplement « être content »." }
  ],
  drills: [
    { t: "gap", f: "Je me lave.", s: "Ich wasche ___.", a: "mich", why: "L'action retombe sur moi." },
    { t: "gap", f: "Tu dois t'excuser.", s: "Du musst ___ entschuldigen.", a: "dich", why: "<b>du</b> prend <b>dich</b>." },
    { t: "gap", f: "Nous devons nous dépêcher.", s: "Wir müssen ___ beeilen.", a: "uns", why: "<b>wir</b> prend <b>uns</b>." },
    { t: "gap", f: "Il se détend.", s: "Er entspannt ___.", a: "sich", why: "<b>er</b> prend <b>sich</b>." },
    { t: "gap", f: "Vous vous détendez.", s: "Ihr entspannt ___.", a: "euch", why: "<b>ihr</b> prend <b>euch</b>." },
    { t: "gap", f: "Je me lave les mains.", s: "Ich wasche ___ die Hände.", a: "mir", why: "Il y a déjà un complément → datif." },
    { t: "gap", f: "Je m'achète un livre.", s: "Ich kaufe ___ ein Buch.", a: "mir", why: "C'est le livre qu'on achète, pour moi." },
    { t: "gap", f: "Je me réjouis de l'été.", s: "Ich freue ___ auf den Sommer.", a: "mich", why: "Pas d'autre complément → accusatif." },
    { t: "gap", f: "Asseyez-vous, s'il vous plaît.", s: "Setzen Sie ___, bitte.", a: "sich", why: "Le <b>Sie</b> poli prend <b>sich</b>." },
    { t: "gap", f: "Comment te sens-tu ?", s: "Wie fühlst du ___?", a: "dich", why: "<b>sich fühlen</b> est réfléchi." },

    { t: "trans", inst: "Mets à la deuxième personne (du).", from: "Ich wasche mich.", a: "Du wäschst dich.",
      why: "<b>waschen</b> prend un tréma, et <b>mich</b> devient <b>dich</b>." },
    { t: "trans", inst: "Mets à la troisième personne (er).", from: "Ich entspanne mich.", a: "Er entspannt sich.",
      why: "<b>mich</b> devient <b>sich</b>." },
    { t: "trans", inst: "Passe au pluriel (wir).", from: "Ich beeile mich.", a: "Wir beeilen uns.",
      why: "<b>wir</b> prend <b>uns</b>." },
    { t: "trans", inst: "Ajoute un complément.", from: "Ich wasche mich.", a: "Ich wasche mir die Hände.",
      why: "Le complément fait passer le pronom au datif." },
    { t: "trans", inst: "Corrige la faute.", from: "Ich kaufe mich ein Buch.", a: "Ich kaufe mir ein Buch.",
      why: "Il y a déjà un complément : le pronom passe au datif." },
    { t: "trans", inst: "Corrige la faute.", from: "Ich mich wasche.", a: "Ich wasche mich.",
      why: "Le pronom suit le verbe, il ne le précède pas." },

    { t: "order", f: "Je me lave les mains.", a: "Ich wasche mir die Hände",
      why: "Verbe, pronom au datif, complément." },
    { t: "order", f: "Nous devons nous dépêcher.", a: "Wir müssen uns beeilen",
      why: "Modal, pronom, infinitif en fin." },
    { t: "order", f: "Je me réjouis de l'été.", a: "Ich freue mich auf den Sommer",
      why: "<b>auf</b> + accusatif après <b>sich freuen</b>." },
    { t: "order", f: "Tu dois t'excuser.", a: "Du musst dich entschuldigen",
      why: "L'infinitif ferme la phrase." },
    { t: "order", f: "Elle aime retrouver des amis.", a: "Sie trifft sich gerne mit Freunden",
      why: "<b>gerne</b> après le pronom, <b>mit</b> + datif." },

    { t: "trad", f: "Je me lave.", a: "Ich wasche mich.",
      why: "Le pronom suit le verbe." },
    { t: "trad", f: "Je me lave les mains.", a: "Ich wasche mir die Hände.",
      why: "Un complément est là → datif." },
    { t: "trad", f: "Nous devons nous dépêcher.", a: "Wir müssen uns beeilen.",
      why: "<b>wir</b> → <b>uns</b>." },
    { t: "trad", f: "Tu dois t'excuser.", a: "Du musst dich entschuldigen.",
      why: "<b>du</b> → <b>dich</b>." },
    { t: "trad", f: "Je m'achète un livre.", a: "Ich kaufe mir ein Buch.",
      why: "Bénéficiaire → <b>mir</b>." },
    { t: "trad", f: "Comment te sens-tu ?", a: "Wie fühlst du dich?",
      why: "Réfléchi en allemand." },
    { t: "trad", f: "Asseyez-vous, s'il vous plaît.", a: "Setzen Sie sich, bitte.",
      why: "Le <b>Sie</b> poli prend <b>sich</b>." }
  ]
},

/* ------------------------------- ÉTAPE 33 -----------------------------
   Unité 32 du livre (p.52) — les prépositions.
   La plus rentable du niveau. Une seule idée porte tout : datif quand on
   EST quelque part, accusatif quand on Y VA. On l'a semée à l'étape 18,
   elle se récolte ici. Le reste — les prépositions à cas fixe — n'est
   qu'une liste à connaître. */
{
  day: 33, title: "Les prépositions", de: "Ich gehe ins Kino.",
  steps: [
    {
      idea: "La question à se poser : est-ce que ça bouge ?",
      detail: "C'est toute la règle. <i>Si tu vas quelque part</i> → accusatif. <i>Si tu y es déjà</i> → datif. Une seule question, et neuf prépositions se rangent d'elles-mêmes.",
      table: [["Ich gehe ins Kino.", "j'y vais → accusatif"], ["Ich bin im Kino.", "j'y suis → datif"]],
      check: { q: "« Je suis au cinéma » se dit…", o: ["Ich bin im Kino", "Ich bin ins Kino", "Ich bin in das Kino"], a: 0, why: "On y est, rien ne bouge → datif → <b>im</b>." }
    },
    {
      idea: "Les contractions qu'on entend tout le temps.",
      detail: "L'allemand fusionne la préposition et l'article. <b>in dem</b> devient <b>im</b>, <b>in das</b> devient <b>ins</b>. C'est pour ça qu'on entend <b>im</b> et <b>ins</b> partout — ce ne sont pas des mots à part.",
      table: [["in dem → im", "datif — position"], ["in das → ins", "accusatif — mouvement"], ["zu dem → zum", "au, vers le"], ["zu der → zur", "à la, vers la"]],
      check: { q: "<b>ins</b> est la contraction de…", o: ["in das", "in dem", "in der"], a: 0, why: "<b>in das</b> → <b>ins</b>. Accusatif, donc mouvement." }
    },
    {
      idea: "Les quatre prépositions de lieu qui suivent cette règle.",
      detail: "<b>in</b> (dans), <b>auf</b> (sur), <b>unter</b> (sous), <b>hinter</b> (derrière). Chacune prend le datif ou l'accusatif selon que ça bouge ou non.",
      table: [["Das Buch liegt auf dem Tisch.", "il y est → datif"], ["Ich lege das Buch auf den Tisch.", "je l'y mets → accusatif"], ["Der Hund liegt unter dem Tisch.", "datif"], ["Das Auto steht hinter dem Haus.", "datif"]],
      check: { q: "« Je mets le livre sur la table » se dit…", o: ["auf den Tisch", "auf dem Tisch", "auf der Tisch"], a: 0, why: "Le livre se déplace → accusatif → <b>den</b>." }
    },
    {
      idea: "D'autres prépositions ne se posent pas la question : leur cas est fixe.",
      detail: "Elles prennent toujours le même, quoi qu'il arrive. Quatre à connaître, et elles reviennent sans arrêt.",
      table: [["für", "toujours accusatif — Das ist für dich."], ["durch", "toujours accusatif — durch einen Tunnel"], ["mit", "toujours datif — mit dem Bus"], ["bei", "toujours datif — bei Julia"]],
      check: { q: "<b>mit</b> demande…", o: ["toujours le datif", "toujours l'accusatif", "l'un ou l'autre selon le mouvement"], a: 0, why: "Cas fixe : <b>mit dem Bus</b>, même si le bus roule." }
    },
    {
      idea: "Les prépositions de temps, qui ne suivent aucune logique de mouvement.",
      detail: "Elles s'apprennent une par une, mais elles sont peu nombreuses. <b>seit</b> pour un début qui dure, <b>vor</b> pour le passé, <b>in</b> pour le futur.",
      table: [["in zwei Jahren", "dans deux ans — futur"], ["seit einem Monat", "depuis un mois"], ["vor drei Wochen", "il y a trois semaines"], ["nach einer Woche", "après une semaine"], ["bis zum 5. August", "jusqu'au 5 août"], ["um 15 Uhr", "à 15 heures"]],
      check: { q: "« Il y a trois semaines » se dit…", o: ["vor drei Wochen", "seit drei Wochen", "in drei Wochen"], a: 0, why: "<b>vor</b> pour le passé. <b>seit</b> voudrait dire « depuis trois semaines »." }
    },
    {
      idea: "Et une exception qu'on emploie tous les jours : nach.",
      detail: "Pour aller dans une ville ou un pays, on ne se demande rien : <b>nach Berlin</b>, <b>nach Deutschland</b>, sans article. Et <b>nach Hause</b> pour rentrer chez soi — la formule figée de l'étape 18.",
      gloss: { de: ["Ich", "fahre", "nach", "Deutschland"], fr: ["Je", "vais", "en", "Allemagne"] }
    }
  ],
  examples: [
    { d: "Ich gehe ins Kino.", f: "Je vais au cinéma." },
    { d: "Ich bin im Kino.", f: "Je suis au cinéma." },
    { d: "Das Buch liegt auf dem Tisch.", f: "Le livre est sur la table." },
    { d: "Ich lege das Buch auf den Tisch.", f: "Je mets le livre sur la table." },
    { d: "Der Hund liegt unter dem Tisch.", f: "Le chien est sous la table." },
    { d: "Das ist für dich.", f: "C'est pour toi." },
    { d: "Wir fahren durch einen Tunnel.", f: "Nous traversons un tunnel." },
    { d: "Ich bin bei Julia.", f: "Je suis chez Julia." },
    { d: "Ich fahre nach Deutschland.", f: "Je vais en Allemagne." },
    { d: "Seit einem Monat lerne ich Deutsch.", f: "J'apprends l'allemand depuis un mois." },
    { d: "Vor drei Wochen war ich in Berlin.", f: "Il y a trois semaines, j'étais à Berlin." },
    { d: "Wir treffen uns um 15 Uhr.", f: "Nous nous retrouvons à 15 heures." }
  ],
  vocab: [
    { d: "in", f: "dans", p: "INN" },
    { d: "auf", f: "sur", p: "AOUF" },
    { d: "unter", f: "sous", p: "OUNN-teur" },
    { d: "hinter", f: "derrière", p: "HINN-teur" },
    { d: "für", f: "pour", p: "FUR" },
    { d: "durch", f: "à travers", p: "DOURCH" },
    { d: "bei", f: "chez", p: "BAÏ" },
    { d: "seit", f: "depuis", p: "ZAÏT" },
    { d: "der Tunnel", f: "le tunnel", p: "dèr TOU-neul" },
    { d: "legen", f: "poser, mettre", p: "LÉ-guenn" }
  ],
  quiz: [
    { q: "Quelle question décide du cas ?", o: ["est-ce que ça bouge ?", "est-ce masculin ?", "est-ce au passé ?", "y a-t-il un article ?"], a: 0, why: "Mouvement → accusatif. Position → datif." },
    { q: "« Je suis au cinéma » se dit…", o: ["Ich bin im Kino", "Ich bin ins Kino", "Ich bin in das Kino", "Ich bin in der Kino"], a: 0, why: "On y est → datif → <b>im</b>." },
    { q: "<b>ins</b> est la contraction de…", o: ["in das", "in dem", "in der", "in den"], a: 0, why: "Accusatif neutre, donc mouvement." },
    { q: "<b>mit</b> demande…", o: ["toujours le datif", "toujours l'accusatif", "l'un ou l'autre", "le génitif"], a: 0, why: "Cas fixe, quoi qu'il arrive." },
    { q: "« Il y a trois semaines » se dit…", o: ["vor drei Wochen", "seit drei Wochen", "in drei Wochen", "nach drei Wochen"], a: 0, why: "<b>vor</b> pour le passé, <b>seit</b> pour une durée qui continue." }
  ],
  drills: [
    { t: "gap", f: "Je vais au cinéma.", s: "Ich gehe ___ Kino.", a: "ins", why: "Mouvement → accusatif → <b>ins</b>." },
    { t: "gap", f: "Je suis au cinéma.", s: "Ich bin ___ Kino.", a: "im", why: "Position → datif → <b>im</b>." },
    { t: "gap", f: "Le livre est sur la table.", s: "Das Buch liegt auf ___ Tisch.", a: "dem", why: "Il y est posé → datif." },
    { t: "gap", f: "Je mets le livre sur la table.", s: "Ich lege das Buch auf ___ Tisch.", a: "den", why: "Il se déplace → accusatif." },
    { t: "gap", f: "Le chien est sous la table.", s: "Der Hund liegt unter ___ Tisch.", a: "dem", why: "Position → datif." },
    { t: "gap", f: "C'est pour toi.", s: "Das ist ___ dich.", a: "für", why: "<b>für</b> + accusatif, toujours." },
    { t: "gap", f: "Nous traversons un tunnel.", s: "Wir fahren ___ einen Tunnel.", a: "durch", why: "<b>durch</b> + accusatif." },
    { t: "gap", f: "Je suis chez Julia.", s: "Ich bin ___ Julia.", a: "bei", why: "<b>bei</b> + datif." },
    { t: "gap", f: "Je vais en Allemagne.", s: "Ich fahre ___ Deutschland.", a: "nach", why: "<b>nach</b> + pays, sans article." },
    { t: "gap", f: "J'apprends l'allemand depuis un mois.", s: "___ einem Monat lerne ich Deutsch.", a: "Seit", why: "Un début qui dure encore." },
    { t: "gap", f: "Il y a trois semaines.", s: "___ drei Wochen", a: "Vor", why: "<b>vor</b> pour le passé." },

    { t: "trans", inst: "Passe du mouvement à la position.", from: "Ich gehe ins Kino.", a: "Ich bin im Kino.",
      why: "L'accusatif devient datif." },
    { t: "trans", inst: "Passe de la position au mouvement.", from: "Das Buch liegt auf dem Tisch.", a: "Ich lege das Buch auf den Tisch.",
      why: "Le datif devient accusatif." },
    { t: "trans", inst: "Corrige la faute.", from: "Ich bin ins Kino.", a: "Ich bin im Kino.",
      why: "On y est : rien ne bouge, donc datif." },
    { t: "trans", inst: "Corrige la faute.", from: "Ich gehe im Kino.", a: "Ich gehe ins Kino.",
      why: "On s'y rend : accusatif." },
    { t: "trans", inst: "Dis-le au passé récent.", from: "In drei Wochen fahre ich nach Berlin.", a: "Vor drei Wochen war ich in Berlin.",
      why: "<b>in</b> pour le futur, <b>vor</b> pour le passé." },
    { t: "trans", inst: "Mets la préposition qui convient.", from: "Ich fahre ___ dem Bus.", a: "Ich fahre mit dem Bus.",
      why: "<b>mit</b> + datif pour le moyen de transport." },

    { t: "order", f: "Je vais au cinéma.", a: "Ich gehe ins Kino",
      why: "Mouvement → <b>ins</b>." },
    { t: "order", f: "Je mets le livre sur la table.", a: "Ich lege das Buch auf den Tisch",
      why: "Verbe, objet, puis le lieu à l'accusatif." },
    { t: "order", f: "Nous traversons un tunnel.", a: "Wir fahren durch einen Tunnel",
      why: "<b>durch</b> + accusatif." },
    { t: "order", f: "J'apprends l'allemand depuis un mois.", a: "Seit einem Monat lerne ich Deutsch",
      why: "Complément en tête → inversion." },
    { t: "order", f: "Nous nous retrouvons à 15 heures.", a: "Wir treffen uns um 15 Uhr",
      why: "<b>um</b> pour l'heure précise." },
    { t: "order", f: "Le chien est sous la table.", a: "Der Hund liegt unter dem Tisch",
      why: "Position → datif." },

    { t: "trad", f: "Je vais au cinéma.", a: "Ich gehe ins Kino.",
      why: "Ça bouge → accusatif." },
    { t: "trad", f: "Je suis au cinéma.", a: "Ich bin im Kino.",
      why: "Ça ne bouge pas → datif." },
    { t: "trad", f: "Le livre est sur la table.", a: "Das Buch liegt auf dem Tisch.",
      why: "Position." },
    { t: "trad", f: "C'est pour toi.", a: "Das ist für dich.",
      why: "<b>für</b> + accusatif, cas fixe." },
    { t: "trad", f: "Je suis chez Julia.", a: "Ich bin bei Julia.",
      why: "<b>bei</b> + datif, cas fixe." },
    { t: "trad", f: "Je vais en Allemagne.", a: "Ich fahre nach Deutschland.",
      why: "<b>nach</b> + pays." },
    { t: "trad", f: "Il y a trois semaines, j'étais à Berlin.", a: "Vor drei Wochen war ich in Berlin.",
      why: "<b>vor</b> pour le passé, et <b>war</b> = j'étais." }
  ]
},

/* ------------------------------- ÉTAPE 34 -----------------------------
   Unité 33 du livre (p.53-54) — à l'hôtel.
   Le livre y aligne vingt phrases utiles. On n'en garde que celles qu'on
   emploie vraiment, et on ajoute ce qu'il ne dit pas : les questions qui
   évitent les mauvaises surprises sur la note. */
{
  day: 34, title: "À l'hôtel", de: "Ich möchte ein Zimmer reservieren.",
  steps: [
    {
      idea: "Réserver : une phrase, et deux choses à préciser.",
      detail: "<b>Ich möchte ein Zimmer für zwei Nächte reservieren</b>. Le nombre de nuits, et le type de chambre. <b>Zimmer</b> est neutre, donc <b>ein</b> ne change pas à l'accusatif — une chance.",
      gloss: { de: ["Ich", "möchte", "ein Zimmer", "reservieren"], fr: ["Je", "voudrais", "une chambre", "réserver"] }
    },
    {
      idea: "Le type de chambre : deux mots composés transparents.",
      detail: "<b>das Einzelzimmer</b> — chambre simple, mot à mot « chambre individuelle ». <b>das Doppelzimmer</b> — chambre double. Une fois découpés, ils se devinent : <b>einzel</b> = seul, <b>doppel</b> = double.",
      table: [["das Einzelzimmer", "chambre simple"], ["das Doppelzimmer", "chambre double"], ["verfügbar", "disponible"], ["besetzt", "occupé"]],
      check: { q: "<b>das Doppelzimmer</b>, c'est…", o: ["une chambre double", "une chambre simple", "une suite"], a: 0, why: "<b>doppel</b> = double, comme dans « doublon »." }
    },
    {
      idea: "Les questions qui évitent les mauvaises surprises.",
      detail: "Toutes commencent pareil, et méritent d'être posées avant de monter : le petit-déjeuner est-il compris, à quelle heure il faut libérer la chambre, y a-t-il le WiFi.",
      table: [["Ist das Frühstück inbegriffen?", "Le petit-déjeuner est-il compris ?"], ["Um wie viel Uhr ist der Check-out?", "À quelle heure est le check-out ?"], ["Haben Sie WLAN?", "Avez-vous le WiFi ?"], ["Kann ich bar bezahlen?", "Puis-je payer en espèces ?"]],
      check: { q: "<b>inbegriffen</b> veut dire…", o: ["compris, inclus", "interdit", "supplémentaire"], a: 0, why: "<b>Service inbegriffen</b> — service compris. Utile aussi au restaurant." }
    },
    {
      idea: "Demander son chemin dans l'hôtel.",
      detail: "<b>Wo ist…?</b> suffit pour tout : <b>Wo ist die Rezeption?</b>, <b>Wo ist der Aufzug?</b>. Et <b>der Aufzug</b>, l'ascenseur, se découpe aussi : <b>auf</b> + <b>Zug</b>, « le train vers le haut ».",
      table: [["die Rezeption", "la réception"], ["der Aufzug", "l'ascenseur"], ["die Etage", "l'étage"], ["der Schlüssel", "la clé"]],
      check: { q: "« Où est l'ascenseur ? » se dit…", o: ["Wo ist der Aufzug?", "Wo ist die Aufzug?", "Wo ist das Aufzug?"], a: 0, why: "<b>der Zug</b> est masculin, et <b>Aufzug</b> le reste." }
    },
    {
      idea: "Et de quoi signaler un problème sans se fâcher.",
      detail: "<b>Das Zimmer ist zu laut</b> — la chambre est trop bruyante. <b>Die Dusche funktioniert nicht</b> — la douche ne marche pas. Avec <b>Entschuldigung</b> devant, c'est poli et ça suffit.",
      table: [["Entschuldigung, …", "Excusez-moi, …"], ["… ist zu laut", "… est trop bruyant"], ["… funktioniert nicht", "… ne fonctionne pas"]]
    }
  ],
  examples: [
    { d: "Ich möchte ein Zimmer für zwei Nächte reservieren.", f: "Je voudrais réserver une chambre pour deux nuits." },
    { d: "Haben Sie ein Doppelzimmer?", f: "Avez-vous une chambre double ?" },
    { d: "Wie ist Ihr Name?", f: "Quel est votre nom ?" },
    { d: "Hier ist Ihr Schlüssel.", f: "Voici votre clé." },
    { d: "Ist das Frühstück inbegriffen?", f: "Le petit-déjeuner est-il compris ?" },
    { d: "Um wie viel Uhr ist der Check-out?", f: "À quelle heure est le check-out ?" },
    { d: "Wo ist die Rezeption?", f: "Où est la réception ?" },
    { d: "Wo ist der Aufzug?", f: "Où est l'ascenseur ?" },
    { d: "Haben Sie WLAN in den Zimmern?", f: "Avez-vous le WiFi dans les chambres ?" },
    { d: "Kann ich bar bezahlen?", f: "Puis-je payer en espèces ?" },
    { d: "Entschuldigung, das Zimmer ist zu laut.", f: "Excusez-moi, la chambre est trop bruyante." },
    { d: "Die Dusche funktioniert nicht.", f: "La douche ne fonctionne pas." }
  ],
  vocab: [
    { d: "das Zimmer", f: "la chambre", p: "das TSI-meur" },
    { d: "die Rezeption", f: "la réception", p: "dii ré-tsèp-TSIOON" },
    { d: "der Schlüssel", f: "la clé", p: "dèr CHLU-seul" },
    { d: "der Aufzug", f: "l'ascenseur", p: "dèr AOUF-tsouk" },
    { d: "die Dusche", f: "la douche", p: "dii DOU-che" },
    { d: "das Handtuch", f: "la serviette", p: "das HANNT-toukh" },
    { d: "inbegriffen", f: "compris, inclus", p: "INN-be-gri-fenn" },
    { d: "verfügbar", f: "disponible", p: "feur-FUK-baar" },
    { d: "die Nacht", f: "la nuit", p: "dii NAKHT" },
    { d: "reservieren", f: "réserver", p: "ré-zèr-VII-renn" }
  ],
  quiz: [
    { q: "<b>das Doppelzimmer</b>, c'est…", o: ["une chambre double", "une chambre simple", "une suite", "un étage"], a: 0, why: "<b>doppel</b> = double." },
    { q: "<b>inbegriffen</b> veut dire…", o: ["compris, inclus", "interdit", "supplémentaire", "réservé"], a: 0, why: "Le mot à repérer sur une note d'hôtel ou de restaurant." },
    { q: "« Où est l'ascenseur ? » se dit…", o: ["Wo ist der Aufzug?", "Wo ist die Aufzug?", "Wo ist das Aufzug?", "Wo ist den Aufzug?"], a: 0, why: "<b>Aufzug</b> contient <b>Zug</b>, masculin." },
    { q: "« Je voudrais réserver une chambre » se dit…", o: ["Ich möchte ein Zimmer reservieren", "Ich möchte reservieren ein Zimmer", "Ich reservieren möchte ein Zimmer", "Ich will ein Zimmer reservieren"], a: 0, why: "L'infinitif ferme la phrase — et <b>möchte</b> plutôt que <b>will</b>." },
    { q: "« La douche ne fonctionne pas » se dit…", o: ["Die Dusche funktioniert nicht", "Die Dusche nicht funktioniert", "Die Dusche funktioniert kein", "Die Dusche ist nicht funktioniert"], a: 0, why: "<b>nicht</b> nie le verbe, donc en fin de phrase." }
  ],
  drills: [
    { t: "gap", f: "Je voudrais réserver une chambre.", s: "Ich möchte ein Zimmer ___.", a: "reservieren", why: "L'infinitif ferme la phrase." },
    { t: "gap", f: "une chambre double", s: "ein ___", a: "Doppelzimmer", why: "<b>doppel</b> = double." },
    { t: "gap", f: "une chambre simple", s: "ein ___", a: "Einzelzimmer", why: "<b>einzel</b> = seul." },
    { t: "gap", f: "Voici votre clé.", s: "Hier ist Ihr ___.", a: "Schlüssel", why: "<b>Schlüssel</b> est masculin." },
    { t: "gap", f: "Le petit-déjeuner est-il compris ?", s: "Ist das Frühstück ___?", a: "inbegriffen", why: "Le mot à repérer sur la note." },
    { t: "gap", f: "Où est la réception ?", s: "Wo ist die ___?", a: "Rezeption", why: "<b>-tion</b> → féminin." },
    { t: "gap", f: "Où est l'ascenseur ?", s: "Wo ist ___ Aufzug?", a: "der", why: "<b>Zug</b> est masculin." },
    { t: "gap", f: "Puis-je payer en espèces ?", s: "Kann ich ___ bezahlen?", a: "bar", why: "<b>bar</b> = en liquide." },
    { t: "gap", f: "La douche ne fonctionne pas.", s: "Die Dusche funktioniert ___.", a: "nicht", why: "<b>nicht</b> nie le verbe → en fin." },
    { t: "gap", f: "pour deux nuits", s: "für zwei ___", a: "Nächte", why: "<b>Nacht</b> → <b>Nächte</b> au pluriel." },

    { t: "trans", inst: "Rends la demande polie.", from: "Ich will ein Zimmer.", a: "Ich möchte ein Zimmer.",
      why: "<b>will</b> ne convient pas à une réception." },
    { t: "trans", inst: "Transforme en question.", from: "Sie haben WLAN.", a: "Haben Sie WLAN?",
      why: "Verbe en tête." },
    { t: "trans", inst: "Demande où ça se trouve.", from: "Die Rezeption ist dort.", a: "Wo ist die Rezeption?",
      why: "<b>wo</b> en place 1, verbe en place 2." },
    { t: "trans", inst: "Signale le problème poliment.", from: "Das Zimmer ist laut.", a: "Entschuldigung, das Zimmer ist zu laut.",
      why: "<b>Entschuldigung</b> devant, et <b>zu</b> pour « trop »." },
    { t: "trans", inst: "Passe d'une nuit à deux.", from: "für eine Nacht", a: "für zwei Nächte",
      why: "<b>Nacht</b> prend un tréma au pluriel." },
    { t: "trans", inst: "Corrige la place du verbe.", from: "Ich möchte reservieren ein Zimmer.", a: "Ich möchte ein Zimmer reservieren.",
      why: "L'infinitif va tout au bout." },

    { t: "order", f: "Je voudrais réserver une chambre pour deux nuits.", a: "Ich möchte ein Zimmer für zwei Nächte reservieren",
      why: "L'infinitif ferme la phrase, après tous les compléments." },
    { t: "order", f: "Avez-vous une chambre double ?", a: "Haben Sie ein Doppelzimmer",
      why: "Verbe en tête." },
    { t: "order", f: "Le petit-déjeuner est-il compris ?", a: "Ist das Frühstück inbegriffen",
      why: "Question fermée." },
    { t: "order", f: "Où est l'ascenseur ?", a: "Wo ist der Aufzug",
      why: "<b>wo</b>, verbe, sujet." },
    { t: "order", f: "La douche ne fonctionne pas.", a: "Die Dusche funktioniert nicht",
      why: "<b>nicht</b> en fin." },
    { t: "order", f: "Puis-je payer en espèces ?", a: "Kann ich bar bezahlen",
      why: "Modal en tête, infinitif au bout." },

    { t: "trad", f: "Je voudrais réserver une chambre.", a: "Ich möchte ein Zimmer reservieren.",
      why: "La phrase d'arrivée à l'hôtel." },
    { t: "trad", f: "Avez-vous une chambre double ?", a: "Haben Sie ein Doppelzimmer?",
      why: "<b>Zimmer</b> est neutre." },
    { t: "trad", f: "Le petit-déjeuner est-il compris ?", a: "Ist das Frühstück inbegriffen?",
      why: "La question qui évite les surprises." },
    { t: "trad", f: "Où est la réception ?", a: "Wo ist die Rezeption?",
      why: "<b>-tion</b> → féminin." },
    { t: "trad", f: "Voici votre clé.", a: "Hier ist Ihr Schlüssel.",
      why: "Ce que dit le réceptionniste." },
    { t: "trad", f: "La douche ne fonctionne pas.", a: "Die Dusche funktioniert nicht.",
      why: "<b>nicht</b> nie le verbe." },
    { t: "trad", f: "Puis-je payer en espèces ?", a: "Kann ich bar bezahlen?",
      why: "<b>bar</b> = en liquide." }
  ]
},

/* ------------------------------- ÉTAPE 35 -----------------------------
   Unité 34 du livre (p.55-56) — à l'aéroport.
   La dernière du niveau A1. Beaucoup de mots composés, ce qui tombe bien :
   c'est l'occasion de montrer une dernière fois que l'allemand se déchiffre
   en découpant. Et de dire au revoir proprement. */
{
  day: 35, title: "À l'aéroport", de: "Haben Sie Gepäck?",
  steps: [
    {
      idea: "Presque tout se déchiffre en découpant.",
      detail: "<b>Flug</b> = vol, <b>Zeug</b> = engin → <b>Flugzeug</b>, l'avion. <b>Flug</b> + <b>Hafen</b> (port) → <b>Flughafen</b>, l'aéroport. Une fois le principe vu, la moitié des mots de cette étape se devinent sans les avoir appris.",
      table: [["das Flugzeug", "vol + engin → l'avion"], ["der Flughafen", "vol + port → l'aéroport"], ["das Handgepäck", "main + bagage → bagage à main"], ["die Bordkarte", "bord + carte → carte d'embarquement"]],
      check: { q: "<b>der Flughafen</b> est composé de…", o: ["Flug (vol) et Hafen (port)", "Flug et Hafer", "fliegen et Ofen"], a: 0, why: "Un « port pour les vols » — l'allemand construit ses mots ainsi." }
    },
    {
      idea: "L'enregistrement : ce qu'on vous demandera.",
      detail: "Trois questions, toujours les mêmes. <b>Haben Sie Gepäck zum Einchecken?</b>, <b>Können Sie mir Ihren Pass zeigen?</b>, et le poids. Y répondre demande peu de mots.",
      table: [["Haben Sie Gepäck?", "Avez-vous des bagages ?"], ["Ihren Pass, bitte.", "Votre passeport, s'il vous plaît."], ["Ja, ich habe zwei Stück.", "Oui, j'en ai deux."]],
      check: { q: "<b>Gepäck</b> veut dire…", o: ["les bagages", "le passeport", "la porte"], a: 0, why: "Toujours au singulier en allemand, même pour plusieurs valises." }
    },
    {
      idea: "Les mots qui décident de ta journée.",
      detail: "<b>pünktlich</b> à l'heure, <b>verspätet</b> en retard, <b>gestrichen</b> annulé. Ce sont eux qu'on cherche sur les écrans d'affichage — et les seuls qu'il faut reconnaître sans hésiter.",
      table: [["pünktlich", "à l'heure"], ["verspätet", "en retard"], ["gestrichen", "annulé"], ["der Zwischenstopp", "l'escale"]]
    },
    {
      idea: "Se repérer : trois mots suffisent.",
      detail: "<b>Abflüge</b> pour les départs, <b>Ankünfte</b> pour les arrivées, <b>Gate</b> pour la porte. Et <b>Wo ist…?</b>, qu'on connaît depuis l'étape 21, ouvre le reste.",
      table: [["die Abflüge", "les départs"], ["die Ankünfte", "les arrivées"], ["das Gate", "la porte d'embarquement"], ["der Zoll", "la douane"]],
      check: { q: "Tu cherches ton vol au départ. Tu regardes…", o: ["Abflüge", "Ankünfte", "Zoll"], a: 0, why: "<b>ab</b> marque l'éloignement — <b>abfahren</b>, <b>abfliegen</b>." }
    },
    {
      idea: "Et voilà : c'est la dernière étape du niveau A1.",
      detail: "Tu as vu les trois genres, les quatre cas, les verbes réguliers et irréguliers, les modaux, la négation, l'ordre des mots, les prépositions — et de quoi te débrouiller à table, à l'hôtel et en voyage. Le reste, c'est de l'usage. <b>Gute Reise!</b>",
      gloss: { de: ["Gute", "Reise"], fr: ["Bon", "voyage"] }
    }
  ],
  examples: [
    { d: "Haben Sie Gepäck zum Einchecken?", f: "Avez-vous des bagages à enregistrer ?" },
    { d: "Ja, ich habe zwei Stück.", f: "Oui, j'en ai deux." },
    { d: "Können Sie mir Ihren Pass zeigen?", f: "Pouvez-vous me montrer votre passeport ?" },
    { d: "Wo ist das Gate?", f: "Où est la porte d'embarquement ?" },
    { d: "Der Flug ist pünktlich.", f: "Le vol est à l'heure." },
    { d: "Der Flug ist verspätet.", f: "Le vol est en retard." },
    { d: "Ich habe nur Handgepäck.", f: "Je n'ai qu'un bagage à main." },
    { d: "Wo sind die Abflüge?", f: "Où sont les départs ?" },
    { d: "Ihr Flug startet von Gate sieben.", f: "Votre vol part de la porte sept." },
    { d: "Ich möchte einen Fensterplatz.", f: "Je voudrais une place côté fenêtre." },
    { d: "Wo ist die Gepäckausgabe?", f: "Où est la livraison des bagages ?" },
    { d: "Gute Reise!", f: "Bon voyage !" }
  ],
  vocab: [
    { d: "das Flugzeug", f: "l'avion", p: "das FLOUK-tsoïk" },
    { d: "der Flughafen", f: "l'aéroport", p: "dèr FLOUK-haa-fenn" },
    { d: "der Flug", f: "le vol", p: "dèr FLOUK" },
    { d: "das Gepäck", f: "les bagages", p: "das gue-PÈK" },
    { d: "der Reisepass", f: "le passeport", p: "dèr RAÏ-ze-pass" },
    { d: "die Bordkarte", f: "la carte d'embarquement", p: "dii BORT-kar-te" },
    { d: "der Zoll", f: "la douane", p: "dèr TSOL" },
    { d: "die Abflüge", f: "les départs", p: "dii AP-flu-gue" },
    { d: "die Ankünfte", f: "les arrivées", p: "dii ANN-kunnf-te" },
    { d: "die Reise", f: "le voyage", p: "dii RAÏ-ze" }
  ],
  quiz: [
    { q: "<b>der Flughafen</b> est composé de…", o: ["Flug (vol) et Hafen (port)", "fliegen et Ofen", "Flug et Hafer", "Flucht et Hafen"], a: 0, why: "Un « port pour les vols »." },
    { q: "<b>Gepäck</b> veut dire…", o: ["les bagages", "le passeport", "la porte", "le vol"], a: 0, why: "Toujours au singulier, même pour plusieurs valises." },
    { q: "Tu cherches ton vol au départ. Tu regardes…", o: ["Abflüge", "Ankünfte", "Zoll", "Gepäckausgabe"], a: 0, why: "<b>ab</b> marque l'éloignement." },
    { q: "« Le vol est en retard » se dit…", o: ["Der Flug ist verspätet", "Der Flug ist pünktlich", "Der Flug ist gestrichen", "Der Flug ist spät"], a: 0, why: "<b>verspätet</b> — le mot à reconnaître sur l'écran." },
    { q: "<b>das Handgepäck</b>, c'est…", o: ["le bagage à main", "le bagage en soute", "le chariot", "la valise perdue"], a: 0, why: "<b>Hand</b> + <b>Gepäck</b> : ce qu'on garde avec soi." }
  ],
  drills: [
    { t: "gap", f: "l'avion", s: "das ___", a: "Flugzeug", why: "<b>Flug</b> + <b>Zeug</b>." },
    { t: "gap", f: "l'aéroport", s: "der ___", a: "Flughafen", why: "<b>Flug</b> + <b>Hafen</b>, masculin comme <b>Hafen</b>." },
    { t: "gap", f: "Avez-vous des bagages ?", s: "Haben Sie ___?", a: "Gepäck", why: "Toujours au singulier." },
    { t: "gap", f: "Où est la porte d'embarquement ?", s: "Wo ist das ___?", a: "Gate", why: "Mot emprunté à l'anglais, neutre." },
    { t: "gap", f: "Le vol est à l'heure.", s: "Der Flug ist ___.", a: "pünktlich", why: "Après <b>ist</b>, pas de terminaison." },
    { t: "gap", f: "Le vol est en retard.", s: "Der Flug ist ___.", a: "verspätet", why: "Le mot à reconnaître sur l'écran." },
    { t: "gap", f: "Je n'ai qu'un bagage à main.", s: "Ich habe nur ___.", a: "Handgepäck", why: "<b>Hand</b> + <b>Gepäck</b>." },
    { t: "gap", f: "Où sont les départs ?", s: "Wo sind die ___?", a: "Abflüge", why: "<b>ab</b> marque l'éloignement." },
    { t: "gap", f: "votre passeport", s: "Ihren ___", a: "Pass", why: "<b>Ihren</b> : masculin complément, forme polie." },
    { t: "gap", f: "Bon voyage !", s: "Gute ___!", a: "Reise", why: "<b>Reise</b> est féminin, d'où <b>Gute</b> sans <b>n</b>." },

    { t: "trans", inst: "Transforme en question.", from: "Sie haben Gepäck.", a: "Haben Sie Gepäck?",
      why: "Verbe en tête." },
    { t: "trans", inst: "Demande où ça se trouve.", from: "Das Gate ist dort.", a: "Wo ist das Gate?",
      why: "<b>wo</b> en place 1." },
    { t: "trans", inst: "Dis que le vol est en retard.", from: "Der Flug ist pünktlich.", a: "Der Flug ist verspätet.",
      why: "Le contraire de <b>pünktlich</b>." },
    { t: "trans", inst: "Rends la demande polie.", from: "Zeigen Sie Ihren Pass!", a: "Können Sie mir Ihren Pass zeigen?",
      why: "<b>können</b> adoucit un ordre — vu à l'étape 25." },
    { t: "trans", inst: "Découpe le mot.", from: "Flughafen", a: "Flug + Hafen",
      why: "Vol + port. C'est ainsi que se lisent les mots composés." },
    { t: "trans", inst: "Mets au pluriel.", from: "der Abflug", a: "die Abflüge",
      why: "Masculin → <b>-e</b>, avec tréma." },

    { t: "order", f: "Avez-vous des bagages à enregistrer ?", a: "Haben Sie Gepäck zum Einchecken",
      why: "<b>zum</b> = <b>zu dem</b>." },
    { t: "order", f: "Pouvez-vous me montrer votre passeport ?", a: "Können Sie mir Ihren Pass zeigen",
      why: "Modal en tête, infinitif au bout." },
    { t: "order", f: "Votre vol part de la porte sept.", a: "Ihr Flug startet von Gate sieben",
      why: "<b>von</b> + datif pour l'origine." },
    { t: "order", f: "Je voudrais une place côté fenêtre.", a: "Ich möchte einen Fensterplatz",
      why: "<b>Platz</b> masculin complément → <b>einen</b>." },
    { t: "order", f: "Où est la livraison des bagages ?", a: "Wo ist die Gepäckausgabe",
      why: "Un mot composé compte pour un." },

    { t: "trad", f: "Avez-vous des bagages ?", a: "Haben Sie Gepäck?",
      why: "<b>Gepäck</b> reste au singulier." },
    { t: "trad", f: "Où est la porte d'embarquement ?", a: "Wo ist das Gate?",
      why: "La question la plus utile à l'aéroport." },
    { t: "trad", f: "Le vol est en retard.", a: "Der Flug ist verspätet.",
      why: "Le mot des écrans d'affichage." },
    { t: "trad", f: "Je n'ai qu'un bagage à main.", a: "Ich habe nur Handgepäck.",
      why: "<b>nur</b> = seulement." },
    { t: "trad", f: "Pouvez-vous me montrer votre passeport ?", a: "Können Sie mir Ihren Pass zeigen?",
      why: "<b>zeigen</b> demande le datif : <b>mir</b>." },
    { t: "trad", f: "Où sont les départs ?", a: "Wo sind die Abflüge?",
      why: "Pluriel → <b>sind</b>." },
    { t: "trad", f: "Bon voyage !", a: "Gute Reise!",
      why: "<b>Reise</b> est féminin : <b>Gute</b> sans <b>n</b>, comme <b>Gute Nacht</b>." }
  ]
},

/* ======================================================================
   NIVEAU A2 — à partir d'ici
   ======================================================================
   ⚠️ CE CONTENU NE VIENT PAS DU LIVRE, et c'est une décision d'Exsangue
   du 02/08/2026. Les photos s'arrêtent à la page 62 ; le programme du A2
   est de toute façon public (CECRL, repris par Goethe, telc et l'ÖSD).
   Voir PLAN-A2.md pour les 28 étapes prévues.

   Conséquence à ne pas oublier : ces étapes sont NOTRE texte, pas celui du
   livre. Elles ne sont donc pas concernées par le copyright et n'ont rien
   à faire dans `sans-livre.ps1` — seuls BOOK et BOOK_TEST en sortent.

   Tous les participes passés et tous les auxiliaires ci-dessous ont été
   relevés le 02/08/2026 dans `reference/verbes-wiktionnaire.csv`, colonnes
   « Partizip II » et « Hilfsverb ». Aucun n'est écrit de mémoire. */

/* ------------------------------- ÉTAPE 36 -----------------------------
   Le corps. Ouvre le niveau sur du vocabulaire concret plutôt que sur une
   règle : le A2 commence par une marche facile, la suivante est le Perfekt.
   C'est aussi l'unité 1 du A2 dans le livre (p.61) — le seul endroit où les
   deux plans se rejoignent, et ça n'a rien coûté de garder l'ordre. */
{
  day: 36, title: "Le corps", de: "Der Körper",
  steps: [
    {
      idea: "Le corps se dit <b>der Körper</b>.",
      detail: "C'est un mot qu'on croise partout — chez le médecin, au sport, quand on a mal quelque part. Cette étape en donne les dix parties les plus utiles. Rien de neuf en grammaire : on réutilise l'article et le pluriel, appris au A1.",
      gloss: { de: ["Das", "ist", "mein", "Körper"], fr: ["Ça", "est", "mon", "corps"] }
    },
    {
      idea: "Les trois genres sont représentés — il faut apprendre l'article avec le mot.",
      detail: "Aucune règle ne dit qu'une partie du corps est masculine ou neutre. C'est un cas où mémoriser l'article en même temps que le mot fait gagner des mois.",
      table: [["masculin", "<b>der</b> Kopf, <b>der</b> Arm, <b>der</b> Fuß"], ["féminin", "<b>die</b> Nase, <b>die</b> Hand"], ["neutre", "<b>das</b> Auge, <b>das</b> Ohr, <b>das</b> Bein"]],
      check: { q: "Quel est l'article de <b>Auge</b> (l'œil) ?", o: ["das", "der", "die"], a: 0, why: "<b>das Auge</b>, neutre — comme <b>das Ohr</b> et <b>das Bein</b>." }
    },
    {
      idea: "Beaucoup de parties vont par deux : le pluriel sert tout le temps.",
      detail: "C'est la particularité du vocabulaire du corps. On parle plus souvent de ses <b>mains</b> que de sa <b>main</b> — le pluriel n'est donc pas un supplément, c'est la forme courante.",
      table: [["das Auge &rarr; die <b>Augen</b>", "les yeux"], ["die Hand &rarr; die <b>Hände</b>", "les mains"], ["der Fuß &rarr; die <b>Füße</b>", "les pieds"], ["der Arm &rarr; die <b>Arme</b>", "les bras"], ["das Bein &rarr; die <b>Beine</b>", "les jambes"]],
      check: { q: "Le pluriel de <b>die Hand</b> est…", o: ["die Hände", "die Handen", "die Hands", "die Händer"], a: 0, why: "Tréma sur le <b>a</b> et <b>-e</b> à la fin. Le tréma au pluriel n'est pas réservé au masculin : <b>die Hände</b> le prouve." }
    },
    {
      idea: "Pour dire qu'on a mal : <b>weh tun</b>.",
      detail: "L'allemand ne dit pas « j'ai mal à la tête » mais <i>la tête fait mal</i>. C'est donc la partie du corps qui est sujet — et le verbe s'accorde avec elle, pas avec toi.",
      table: [["Der Kopf <b>tut</b> weh.", "J'ai mal à la tête."], ["Die Füße <b>tun</b> weh.", "J'ai mal aux pieds."]],
      check: { q: "Pour « j'ai mal aux pieds », on dit…", o: ["Die Füße tun weh", "Ich habe Füße weh", "Die Füße tut weh"], a: 0, why: "<b>Füße</b> est un pluriel, donc <b>tun</b> et non <b>tut</b>. C'est le pied qui fait mal, pas toi qui as mal." }
    },
    {
      idea: "<b>mein</b> devant le mot, et il s'accorde comme <b>ein</b>.",
      detail: "Rien de nouveau : <b>mein Kopf</b> au masculin et au neutre, <b>meine Nase</b> au féminin, et <b>meine</b> au pluriel pour tout le monde. C'est exactement la règle du A1, appliquée à un vocabulaire neuf.",
      check: { q: "Comment dit-on « mes mains » ?", o: ["meine Hände", "mein Hände", "meinen Hände"], a: 0, why: "Au pluriel, c'est toujours <b>meine</b>, quel que soit le genre du singulier." }
    }
  ],
  examples: [
    { d: "Das ist mein Kopf.", f: "C'est ma tête." },
    { d: "Ich habe zwei Augen.", f: "J'ai deux yeux." },
    { d: "Meine Nase ist klein.", f: "Mon nez est petit." },
    { d: "Der Mund ist rot.", f: "La bouche est rouge." },
    { d: "Ich habe zwei Ohren.", f: "J'ai deux oreilles." },
    { d: "Meine Hände sind kalt.", f: "Mes mains sont froides." },
    { d: "Der Arm ist lang.", f: "Le bras est long." },
    { d: "Meine Beine sind müde.", f: "Mes jambes sont fatiguées." },
    { d: "Mein Fuß ist groß.", f: "Mon pied est grand." },
    { d: "Der Rücken tut weh.", f: "J'ai mal au dos." },
    { d: "Meine Füße tun weh.", f: "J'ai mal aux pieds." },
    { d: "Der Kopf tut oft weh.", f: "J'ai souvent mal à la tête." }
  ],
  vocab: [
    { d: "der Kopf", f: "la tête", p: "dèr KOPF" },
    { d: "das Auge", f: "l'œil", p: "das AO-gue" },
    { d: "die Nase", f: "le nez", p: "dii NAA-ze" },
    { d: "der Mund", f: "la bouche", p: "dèr MOUNT" },
    { d: "das Ohr", f: "l'oreille", p: "das OOR" },
    { d: "die Hand", f: "la main", p: "dii HANT" },
    { d: "der Arm", f: "le bras", p: "dèr ARM" },
    { d: "das Bein", f: "la jambe", p: "das BAÏN" },
    { d: "der Fuß", f: "le pied", p: "dèr FOUSS" },
    { d: "der Rücken", f: "le dos", p: "dèr RUU-keun" }
  ],
  quiz: [
    { q: "Le pluriel de <b>der Fuß</b> est…", o: ["die Füße", "die Fuße", "die Fußen", "die Füßer"], a: 0, why: "Tréma et <b>-e</b>. Le <b>ß</b> reste : on écrit <b>Füße</b>, et <b>Fuesse</b> est accepté par l'app." },
    { q: "<b>Auge</b> est de quel genre ?", o: ["neutre : das Auge", "masculin : der Auge", "féminin : die Auge"], a: 0, why: "<b>das Auge</b>. Comme <b>das Ohr</b> et <b>das Bein</b> — trois parties du corps neutres, à retenir ensemble." },
    { q: "Pour « j'ai mal à la tête », l'allemand dit…", o: ["Der Kopf tut weh", "Ich habe Kopf weh", "Der Kopf ist weh"], a: 0, why: "C'est la partie du corps qui est SUJET : littéralement « la tête fait mal »." },
    { q: "Dans <b>Meine Hände sind kalt</b>, pourquoi <b>sind</b> et non <b>ist</b> ?", o: ["parce que Hände est un pluriel", "parce que Hände est féminin", "parce que kalt demande sind"], a: 0, why: "<b>die Hände</b> = les mains, donc pluriel, donc <b>sind</b>." },
    { q: "Comment dit-on « mes yeux » ?", o: ["meine Augen", "mein Augen", "meinen Augen"], a: 0, why: "Au pluriel, <b>meine</b> pour tous les genres — même si <b>das Auge</b> est neutre au singulier." }
  ],
  drills: [
    { t: "gap", f: "C'est ma tête.", s: "Das ist mein ___.", a: "Kopf",
      why: "<b>der Kopf</b> est masculin, donc <b>mein</b> sans <b>e</b>." },
    { t: "gap", f: "J'ai deux yeux.", s: "Ich habe zwei ___.", a: "Augen",
      why: "Pluriel de <b>das Auge</b> : <b>-n</b>, sans tréma." },
    { t: "gap", f: "Mon nez est petit.", s: "Meine ___ ist klein.", a: "Nase",
      why: "<b>die Nase</b> est féminin, d'où <b>meine</b>." },
    { t: "gap", f: "La bouche est rouge.", s: "Der ___ ist rot.", a: "Mund",
      why: "<b>der Mund</b>, masculin." },
    { t: "gap", f: "Mes mains sont froides.", s: "Meine ___ sind kalt.", a: "Hände",
      why: "Pluriel de <b>die Hand</b> : tréma et <b>-e</b>." },
    { t: "gap", f: "Le bras est long.", s: "Der ___ ist lang.", a: "Arm",
      why: "<b>der Arm</b>, pluriel <b>die Arme</b> sans tréma." },
    { t: "gap", f: "J'ai mal au dos.", s: "Der Rücken tut ___.", a: "weh",
      why: "<b>weh tun</b> : le mot <b>weh</b> ne change jamais." },
    { t: "gap", f: "J'ai mal aux pieds.", s: "Meine Füße ___ weh.", a: "tun",
      why: "<b>Füße</b> est un pluriel, donc <b>tun</b>." },

    { t: "order", f: "C'est ma tête.", a: "Das ist mein Kopf",
      why: "Sujet, verbe, puis l'attribut — l'ordre du A1 ne bouge pas." },
    { t: "order", f: "J'ai deux yeux.", a: "Ich habe zwei Augen",
      why: "<b>haben</b> en deuxième position, comme toujours." },
    { t: "order", f: "Mes mains sont froides.", a: "Meine Hände sind kalt",
      why: "Pluriel : <b>meine</b> et <b>sind</b> vont ensemble." },
    { t: "order", f: "J'ai mal au dos.", a: "Der Rücken tut weh",
      why: "La partie du corps est le sujet, et <b>weh</b> ferme la phrase." },
    { t: "order", f: "Mon pied est grand.", a: "Mein Fuß ist groß",
      why: "<b>der Fuß</b> masculin, donc <b>mein</b> sans terminaison." },
    { t: "order", f: "J'ai souvent mal à la tête.", a: "Der Kopf tut oft weh",
      why: "L'adverbe <b>oft</b> se glisse avant <b>weh</b>." },

    { t: "trad", f: "la tête", a: "der Kopf",
      why: "Masculin. Pluriel : <b>die Köpfe</b>." },
    { t: "trad", f: "l'œil", a: "das Auge",
      why: "Neutre, et son pluriel <b>die Augen</b> est bien plus courant." },
    { t: "trad", f: "le nez", a: "die Nase",
      why: "Féminin, comme beaucoup de mots en <b>-e</b>." },
    { t: "trad", f: "la main", a: "die Hand",
      why: "Féminin. Pluriel <b>die Hände</b>, avec tréma." },
    { t: "trad", f: "le pied", a: "der Fuß",
      why: "Masculin. <b>Fuss</b> est accepté : le <b>ß</b> n'est jamais exigé." },
    { t: "trad", f: "le dos", a: "der Rücken",
      why: "Masculin, et invariable au pluriel : <b>die Rücken</b>." },
    { t: "trad", f: "la jambe", a: "das Bein",
      why: "Neutre. Pluriel <b>die Beine</b>." },
    { t: "trad", f: "l'oreille", a: "das Ohr",
      why: "Neutre. Pluriel <b>die Ohren</b>." },

    { t: "trans", inst: "Mets au pluriel.", from: "die Hand", a: "die Hände",
      why: "Tréma sur le <b>a</b> et <b>-e</b> ajouté." },
    { t: "trans", inst: "Mets au pluriel.", from: "der Fuß", a: "die Füße",
      why: "Tréma et <b>-e</b>. L'article devient <b>die</b>, comme tous les pluriels." },
    { t: "trans", inst: "Mets au pluriel.", from: "das Auge", a: "die Augen",
      why: "Simple <b>-n</b> : les mots en <b>-e</b> font souvent leur pluriel ainsi." },
    { t: "trans", inst: "Mets au pluriel.", from: "das Ohr", a: "die Ohren",
      why: "<b>-en</b> ici, sans tréma." },
    { t: "trans", inst: "Mets au pluriel.", from: "der Arm", a: "die Arme",
      why: "<b>-e</b> sans tréma — à ne pas confondre avec <b>die Hände</b>." },
    { t: "trans", inst: "Mets au pluriel.", from: "das Bein", a: "die Beine",
      why: "<b>-e</b>, sans tréma." }
  ]
},

/* ------------------------------- ÉTAPE 37 -----------------------------
   Le Perfekt avec haben. LE point du niveau A2 : sans lui on ne peut rien
   raconter. On le coupe en trois étapes (37 réguliers, 38 irréguliers,
   39 avec sein) plutôt que d'en faire un mur. */
{
  /* ⚠️ Le titre a d'abord été « Le passé de tous les jours ». Il faisait tomber
     le garde-fou qui interdit le mot « jour » à l'écran — celui qui empêche de
     revenir à l'ancien « jour N » abandonné au profit de « étape N ». Le
     garde-fou a raison de ne pas faire d'exception : une règle qui tolère un
     cas finit par en tolérer dix. C'est le titre qui change. */
  day: 37, title: "Le passé composé", de: "Das Perfekt",
  steps: [
    {
      idea: "Pour raconter hier, l'allemand a un seul passé à l'oral.",
      detail: "Il s'appelle le <b>Perfekt</b> et se construit exactement comme notre passé composé : un auxiliaire, puis un participe. <b>Ich habe gespielt</b> = « j'ai joué ». Tout le reste du niveau A2 s'appuie dessus.",
      gloss: { de: ["Ich", "habe", "Deutsch", "gelernt"], fr: ["J'", "ai", "allemand", "appris"] }
    },
    {
      idea: "Deux morceaux, et ils sont séparés : l'auxiliaire en deuxième position, le participe à la FIN.",
      detail: "C'est la seule vraie difficulté. En français les deux se collent (« j'ai appris l'allemand ») ; en allemand tout ce qui compte se glisse ENTRE les deux, et le participe attend la fin de la phrase.",
      table: [["Ich <b>habe</b> Deutsch <b>gelernt</b>.", "J'ai appris l'allemand."], ["Ich <b>habe</b> gestern Fußball <b>gespielt</b>.", "J'ai joué au foot hier."]],
      check: { q: "Dans une phrase au Perfekt, le participe se place…", o: ["à la fin", "en deuxième position", "juste après le sujet"], a: 0, why: "Toujours à la fin, même si la phrase est longue. L'auxiliaire, lui, reste en deuxième position." }
    },
    {
      idea: "Le participe régulier : <b>ge-</b> devant, <b>-t</b> derrière.",
      detail: "On prend le radical du verbe — l'infinitif sans <b>-en</b> — et on l'encadre. <b>spielen</b> donne <b>spiel</b>, qui devient <b>ge-spiel-t</b>. La grande majorité des verbes marche ainsi.",
      table: [["machen", "ge<b>mach</b>t"], ["spielen", "ge<b>spiel</b>t"], ["lernen", "ge<b>lern</b>t"], ["kaufen", "ge<b>kauf</b>t"], ["hören", "ge<b>hör</b>t"]],
      check: { q: "Le participe de <b>kaufen</b> (acheter) est…", o: ["gekauft", "gekaufen", "kauft", "gekaufte"], a: 0, why: "Radical <b>kauf</b>, encadré par <b>ge-</b> et <b>-t</b>." }
    },
    {
      idea: "Un radical qui finit par <b>t</b> ou <b>d</b> prend <b>-et</b>.",
      detail: "Sans cela, deux <b>t</b> se colleraient et le mot deviendrait imprononçable. <b>arbeiten</b> ne donne pas « gearbeitt » mais <b>gearbeitet</b>. Même chose pour les radicaux en <b>d</b>.",
      table: [["arbeiten", "ge<b>arbeit</b>et"], ["warten", "ge<b>wart</b>et"], ["reden", "ge<b>red</b>et"]],
      check: { q: "Le participe de <b>arbeiten</b> est…", o: ["gearbeitet", "gearbeitt", "gearbeit", "arbeitet"], a: 0, why: "Le radical <b>arbeit</b> finit déjà par un <b>t</b> : on ajoute <b>-et</b> pour pouvoir le prononcer." }
    },
    {
      idea: "L'auxiliaire est <b>haben</b>, conjugué normalement.",
      detail: "C'est le verbe <b>haben</b> du A1, sans changement : <b>ich habe</b>, <b>du hast</b>, <b>er hat</b>, <b>wir haben</b>. Seul le participe, à la fin, ne bouge jamais — il ne s'accorde avec rien.",
      table: [["ich <b>habe</b> gespielt", "j'ai joué"], ["du <b>hast</b> gespielt", "tu as joué"], ["er <b>hat</b> gespielt", "il a joué"], ["wir <b>haben</b> gespielt", "nous avons joué"]],
      check: { q: "« Elle a travaillé » se dit…", o: ["Sie hat gearbeitet", "Sie haben gearbeitet", "Sie hat gearbeitete"], a: 0, why: "<b>hat</b> pour la 3ᵉ personne du singulier, et le participe ne s'accorde jamais." }
    }
  ],
  examples: [
    { d: "Ich habe Deutsch gelernt.", f: "J'ai appris l'allemand." },
    { d: "Wir haben Fußball gespielt.", f: "Nous avons joué au foot." },
    { d: "Hast du das gehört?", f: "As-tu entendu ça ?" },
    { d: "Er hat ein Buch gekauft.", f: "Il a acheté un livre." },
    { d: "Sie hat gestern gearbeitet.", f: "Elle a travaillé hier." },
    { d: "Ich habe nichts gesagt.", f: "Je n'ai rien dit." },
    { d: "Was hast du gemacht?", f: "Qu'as-tu fait ?" },
    { d: "Wir haben den Bahnhof gesucht.", f: "Nous avons cherché la gare." },
    { d: "Er hat mich gefragt.", f: "Il m'a demandé." },
    { d: "Ich habe gestern Musik gehört.", f: "J'ai écouté de la musique hier." },
    { d: "Sie haben viel gelernt.", f: "Ils ont beaucoup appris." },
    { d: "Ich habe das nicht gemacht.", f: "Je n'ai pas fait ça." }
  ],
  vocab: [
    { d: "gemacht", f: "fait", p: "gue-MAKHT" },
    { d: "gespielt", f: "joué", p: "gue-CHPIILT" },
    { d: "gelernt", f: "appris", p: "gue-LÈRNT" },
    { d: "gekauft", f: "acheté", p: "gue-KAOFT" },
    { d: "gearbeitet", f: "travaillé", p: "gue-AR-baï-teut" },
    { d: "gehört", f: "entendu", p: "gue-HEURT" },
    { d: "gesucht", f: "cherché", p: "gue-ZOUKHT" },
    { d: "gefragt", f: "demandé", p: "gue-FRAAKT" },
    { d: "gesagt", f: "dit", p: "gue-ZAAKT" },
    { d: "gestern", f: "hier", p: "GUES-teurn" }
  ],
  quiz: [
    { q: "Dans <b>Ich habe Deutsch gelernt</b>, où se trouve le participe ?", o: ["à la fin de la phrase", "en deuxième position", "juste après le sujet"], a: 0, why: "L'auxiliaire prend la deuxième place, le participe attend la fin. Tout le reste se glisse entre les deux." },
    { q: "Le participe de <b>spielen</b> est…", o: ["gespielt", "gespielen", "spielt", "gespielte"], a: 0, why: "Radical <b>spiel</b>, encadré par <b>ge-</b> et <b>-t</b>." },
    { q: "Quel auxiliaire pour <b>machen</b> au passé ?", o: ["haben", "sein", "werden"], a: 0, why: "<b>haben</b> — c'est le cas de la grande majorité des verbes. L'exception se voit à l'étape 39." },
    { q: "<b>arbeiten</b> donne au participe…", o: ["gearbeitet", "gearbeitt", "gearbeit", "arbeitet"], a: 0, why: "Le radical finit par <b>t</b> : on intercale un <b>e</b> pour pouvoir le prononcer." },
    { q: "Comment dit-on « Qu'as-tu fait ? »", o: ["Was hast du gemacht?", "Was du hast gemacht?", "Was gemacht hast du?"], a: 0, why: "Dans une question, l'auxiliaire passe devant le sujet — mais le participe reste à la fin." }
  ],
  drills: [
    { t: "gap", f: "J'ai appris l'allemand.", s: "Ich habe Deutsch ___.", a: "gelernt",
      why: "Radical <b>lern</b>, encadré par <b>ge-</b> et <b>-t</b>." },
    { t: "gap", f: "Nous avons joué au foot.", s: "Wir haben Fußball ___.", a: "gespielt",
      why: "Le participe ferme la phrase." },
    { t: "gap", f: "Elle a travaillé hier.", s: "Sie hat gestern ___.", a: "gearbeitet",
      why: "Radical en <b>t</b> : la terminaison est <b>-et</b>." },
    { t: "gap", f: "Il a acheté un livre.", s: "Er hat ein Buch ___.", a: "gekauft",
      why: "<b>kaufen</b> est régulier." },
    { t: "gap", f: "As-tu entendu ça ?", s: "___ du das gehört?", a: "Hast",
      why: "Dans une question, l'auxiliaire passe en tête." },
    { t: "gap", f: "Je n'ai rien dit.", s: "Ich habe nichts ___.", a: "gesagt",
      why: "<b>sagen</b> donne <b>gesagt</b>." },
    { t: "gap", f: "Nous avons cherché la gare.", s: "Wir ___ den Bahnhof gesucht.", a: "haben",
      why: "<b>wir</b> prend <b>haben</b>, en deuxième position." },
    { t: "gap", f: "J'ai écouté de la musique hier.", s: "Ich habe gestern Musik ___.", a: "gehört",
      why: "Le complément de temps se glisse entre l'auxiliaire et le participe." },

    { t: "order", f: "J'ai appris l'allemand.", a: "Ich habe Deutsch gelernt",
      why: "Auxiliaire en deuxième position, participe à la fin." },
    { t: "order", f: "Nous avons joué au foot.", a: "Wir haben Fußball gespielt",
      why: "Le complément se place entre les deux morceaux du verbe." },
    { t: "order", f: "Il a acheté un livre.", a: "Er hat ein Buch gekauft",
      why: "<b>hat</b> pour <b>er</b>, et <b>gekauft</b> ferme la phrase." },
    { t: "order", f: "Elle a travaillé hier.", a: "Sie hat gestern gearbeitet",
      why: "<b>gestern</b> tient entre l'auxiliaire et le participe." },
    { t: "order", f: "Je n'ai pas fait ça.", a: "Ich habe das nicht gemacht",
      why: "<b>nicht</b> se met juste avant le participe." },
    { t: "order", f: "Ils ont beaucoup appris.", a: "Sie haben viel gelernt",
      why: "<b>viel</b> précède le participe, comme tout complément." },

    { t: "trad", f: "J'ai joué.", a: "Ich habe gespielt.",
      why: "Deux mots pour un seul en français : auxiliaire plus participe." },
    { t: "trad", f: "Tu as appris.", a: "Du hast gelernt.",
      why: "<b>hast</b> pour <b>du</b>." },
    { t: "trad", f: "Il a acheté.", a: "Er hat gekauft.",
      why: "<b>hat</b> pour <b>er</b>." },
    { t: "trad", f: "Nous avons travaillé.", a: "Wir haben gearbeitet.",
      why: "<b>gearbeitet</b>, avec le <b>e</b> d'appui." },
    { t: "trad", f: "Qu'as-tu fait ?", a: "Was hast du gemacht?",
      why: "Le mot interrogatif d'abord, puis l'auxiliaire, puis le sujet." },
    { t: "trad", f: "J'ai entendu ça.", a: "Ich habe das gehört.",
      why: "<b>das</b> se glisse avant le participe." },
    { t: "trad", f: "Elle a demandé.", a: "Sie hat gefragt.",
      why: "<b>fragen</b> est régulier : <b>gefragt</b>." },
    { t: "trad", f: "Nous avons cherché.", a: "Wir haben gesucht.",
      why: "<b>suchen</b> donne <b>gesucht</b>." },

    { t: "trans", inst: "Mets la phrase au passé.", from: "Ich lerne Deutsch.", a: "Ich habe Deutsch gelernt.",
      why: "Le verbe se dédouble : <b>habe</b> en deuxième position, <b>gelernt</b> à la fin." },
    { t: "trans", inst: "Mets la phrase au passé.", from: "Wir spielen Fußball.", a: "Wir haben Fußball gespielt.",
      why: "<b>spielen</b> devient <b>haben … gespielt</b>." },
    { t: "trans", inst: "Mets la phrase au passé.", from: "Er kauft ein Buch.", a: "Er hat ein Buch gekauft.",
      why: "<b>kauft</b> devient <b>hat … gekauft</b>." },
    { t: "trans", inst: "Mets la phrase au passé.", from: "Sie arbeitet.", a: "Sie hat gearbeitet.",
      why: "Radical en <b>t</b>, d'où <b>gearbeitet</b>." },
    { t: "trans", inst: "Mets la phrase au passé.", from: "Ich höre Musik.", a: "Ich habe Musik gehört.",
      why: "<b>höre</b> devient <b>habe … gehört</b>." },
    { t: "trans", inst: "Mets la phrase au passé.", from: "Was machst du?", a: "Was hast du gemacht?",
      why: "Dans une question, l'auxiliaire garde la place qu'occupait le verbe." }
  ]
},

/* ------------------------------- ÉTAPE 38 -----------------------------
   Les participes irréguliers. Rien à comprendre, tout à retenir — d'où une
   étape entière plutôt qu'un tableau glissé dans la précédente. Les dix
   choisis sont les plus fréquents, pas les plus spectaculaires. */
{
  day: 38, title: "Les participes irréguliers", de: "Unregelmäßige Partizipien",
  steps: [
    {
      idea: "Une famille de verbes ne finit pas en <b>-t</b> mais en <b>-en</b>.",
      detail: "Ce sont les mêmes verbes qui changeaient déjà de voyelle au présent (<b>du sprichst</b>, <b>er sieht</b>). Au passé ils continuent : <b>sprechen</b> donne <b>gesprochen</b>, pas « gesprecht ». La bonne nouvelle : ils sont peu nombreux.",
      gloss: { de: ["Ich", "habe", "einen", "Film", "gesehen"], fr: ["J'", "ai", "un", "film", "vu"] }
    },
    {
      idea: "Le moule reste le même : <b>ge-</b> devant, mais <b>-en</b> derrière.",
      detail: "La structure de la phrase ne change pas d'un pouce — auxiliaire en deuxième position, participe à la fin. Seule la forme du participe est à mémoriser.",
      table: [["sehen", "ge<b>seh</b>en"], ["lesen", "ge<b>les</b>en"], ["geben", "ge<b>geb</b>en"], ["schlafen", "ge<b>schlaf</b>en"]],
      check: { q: "Le participe de <b>lesen</b> (lire) est…", o: ["gelesen", "gelest", "geliest", "gelesend"], a: 0, why: "<b>-en</b> à la fin, et la voyelle ne bouge pas ici." }
    },
    {
      idea: "Souvent, la voyelle du milieu change aussi.",
      detail: "C'est ce qui rend ces verbes irréguliers. Il n'y a pas de règle qui dise laquelle : ces huit-là s'apprennent comme du vocabulaire, et ils reviennent tous les jours.",
      table: [["trinken", "ge<b>tr<u>u</u>nk</b>en"], ["sprechen", "ge<b>spr<u>o</u>ch</b>en"], ["nehmen", "ge<b>n<u>o</u>mm</b>en"], ["finden", "ge<b>f<u>u</u>nd</b>en"], ["schreiben", "ge<b>schr<u>ie</u>b</b>en"]],
      check: { q: "Le participe de <b>trinken</b> (boire) est…", o: ["getrunken", "getrinken", "getrankt", "getrunkt"], a: 0, why: "Le <b>i</b> devient <b>u</b>, et la terminaison est <b>-en</b>." }
    },
    {
      idea: "<b>essen</b> double son <b>ge</b> : <b>gegessen</b>.",
      detail: "C'est le seul de la liste qui surprend vraiment. Le verbe commence déjà par une voyelle, et le participe garde tout de même son <b>ge-</b> : on obtient <b>ge-gessen</b>. Ce n'est pas une faute de frappe.",
      check: { q: "« J'ai mangé » se dit…", o: ["Ich habe gegessen", "Ich habe geessen", "Ich habe gessen"], a: 0, why: "<b>gegessen</b>, avec les deux <b>ge</b>. C'est irrégulier même parmi les irréguliers." }
    },
    {
      idea: "L'auxiliaire ne change pas : c'est toujours <b>haben</b>.",
      detail: "Irrégulier ne veut pas dire « avec <b>sein</b> ». Ces dix verbes prennent <b>haben</b> comme les réguliers de l'étape précédente. Les verbes à <b>sein</b> forment une autre famille — c'est l'étape suivante.",
      table: [["ich <b>habe</b> gesehen", "j'ai vu"], ["du <b>hast</b> getrunken", "tu as bu"], ["wir <b>haben</b> gelesen", "nous avons lu"]],
      check: { q: "Quel auxiliaire pour <b>sehen</b> au passé ?", o: ["haben", "sein", "les deux au choix"], a: 0, why: "<b>haben</b>. Un participe irrégulier ne dit rien sur l'auxiliaire." }
    }
  ],
  examples: [
    { d: "Ich habe einen Film gesehen.", f: "J'ai vu un film." },
    { d: "Wir haben Pizza gegessen.", f: "Nous avons mangé une pizza." },
    { d: "Er hat Wasser getrunken.", f: "Il a bu de l'eau." },
    { d: "Ich habe ein Buch gelesen.", f: "J'ai lu un livre." },
    { d: "Sie hat einen Brief geschrieben.", f: "Elle a écrit une lettre." },
    { d: "Wir haben Deutsch gesprochen.", f: "Nous avons parlé allemand." },
    { d: "Ich habe den Bus genommen.", f: "J'ai pris le bus." },
    { d: "Hast du den Schlüssel gefunden?", f: "As-tu trouvé la clé ?" },
    { d: "Er hat mir ein Buch gegeben.", f: "Il m'a donné un livre." },
    { d: "Ich habe gut geschlafen.", f: "J'ai bien dormi." },
    { d: "Was hast du gestern gegessen?", f: "Qu'as-tu mangé hier ?" },
    { d: "Wir haben viel gesehen.", f: "Nous avons vu beaucoup de choses." }
  ],
  vocab: [
    { d: "gesehen", f: "vu", p: "gue-ZÉÉ-eun" },
    { d: "gegessen", f: "mangé", p: "gue-GUÈ-seun" },
    { d: "getrunken", f: "bu", p: "gue-TROUN-keun" },
    { d: "gelesen", f: "lu", p: "gue-LÉÉ-zeun" },
    { d: "geschrieben", f: "écrit", p: "gue-CHRII-beun" },
    { d: "gesprochen", f: "parlé", p: "gue-CHPRO-kheun" },
    { d: "genommen", f: "pris", p: "gue-NO-meun" },
    { d: "gefunden", f: "trouvé", p: "gue-FOUN-deun" },
    { d: "gegeben", f: "donné", p: "gue-GUÉÉ-beun" },
    { d: "geschlafen", f: "dormi", p: "gue-CHLAA-feun" }
  ],
  quiz: [
    { q: "Le participe de <b>trinken</b> est…", o: ["getrunken", "getrinken", "getrunkt", "getrankt"], a: 0, why: "La voyelle passe de <b>i</b> à <b>u</b>, et la terminaison est <b>-en</b>." },
    { q: "« J'ai mangé » se dit…", o: ["Ich habe gegessen", "Ich habe geessen", "Ich habe gessen"], a: 0, why: "<b>essen</b> garde son <b>ge-</b> alors qu'il commence par une voyelle : <b>gegessen</b>." },
    { q: "Le participe de <b>sprechen</b> est…", o: ["gesprochen", "gesprecht", "gesprichen", "gesprachen"], a: 0, why: "Le <b>e</b> devient <b>o</b> : <b>gesprochen</b>." },
    { q: "Quel auxiliaire pour <b>nehmen</b> (prendre) ?", o: ["haben", "sein", "cela dépend du sens"], a: 0, why: "<b>haben</b> — être irrégulier ne change rien à l'auxiliaire." },
    { q: "Comment dit-on « As-tu trouvé la clé ? »", o: ["Hast du den Schlüssel gefunden?", "Hast du gefunden den Schlüssel?", "Du hast den Schlüssel gefunden?"], a: 0, why: "Question : l'auxiliaire en tête, le participe toujours à la fin." }
  ],
  drills: [
    { t: "gap", f: "J'ai vu un film.", s: "Ich habe einen Film ___.", a: "gesehen",
      why: "<b>sehen</b> donne <b>gesehen</b>, sans changement de voyelle." },
    { t: "gap", f: "Nous avons mangé une pizza.", s: "Wir haben Pizza ___.", a: "gegessen",
      why: "Les deux <b>ge</b> de <b>gegessen</b>." },
    { t: "gap", f: "Il a bu de l'eau.", s: "Er hat Wasser ___.", a: "getrunken",
      why: "<b>i</b> devient <b>u</b>." },
    { t: "gap", f: "J'ai lu un livre.", s: "Ich habe ein Buch ___.", a: "gelesen",
      why: "<b>lesen</b> garde son <b>e</b> au participe." },
    { t: "gap", f: "Elle a écrit une lettre.", s: "Sie hat einen Brief ___.", a: "geschrieben",
      why: "<b>ei</b> devient <b>ie</b> : <b>geschrieben</b>." },
    { t: "gap", f: "Nous avons parlé allemand.", s: "Wir haben Deutsch ___.", a: "gesprochen",
      why: "<b>e</b> devient <b>o</b>." },
    { t: "gap", f: "J'ai pris le bus.", s: "Ich habe den Bus ___.", a: "genommen",
      why: "<b>nehmen</b> donne <b>genommen</b>, avec deux <b>m</b>." },
    { t: "gap", f: "J'ai bien dormi.", s: "Ich habe gut ___.", a: "geschlafen",
      why: "<b>schlafen</b> garde son <b>a</b>." },

    { t: "order", f: "J'ai vu un film.", a: "Ich habe einen Film gesehen",
      why: "Le participe ferme la phrase, comme pour les réguliers." },
    { t: "order", f: "Il a bu de l'eau.", a: "Er hat Wasser getrunken",
      why: "<b>hat</b> en deuxième position." },
    { t: "order", f: "Nous avons parlé allemand.", a: "Wir haben Deutsch gesprochen",
      why: "Le complément se glisse entre l'auxiliaire et le participe." },
    { t: "order", f: "Il m'a donné un livre.", a: "Er hat mir ein Buch gegeben",
      why: "Le datif <b>mir</b> passe avant le complément d'objet." },
    { t: "order", f: "J'ai bien dormi.", a: "Ich habe gut geschlafen",
      why: "<b>gut</b> précède le participe." },
    { t: "order", f: "Nous avons vu beaucoup de choses.", a: "Wir haben viel gesehen",
      why: "<b>viel</b> se place avant le participe." },

    { t: "trad", f: "J'ai vu.", a: "Ich habe gesehen.",
      why: "<b>sehen</b> &rarr; <b>gesehen</b>." },
    { t: "trad", f: "Tu as bu.", a: "Du hast getrunken.",
      why: "<b>trinken</b> &rarr; <b>getrunken</b>." },
    { t: "trad", f: "Nous avons mangé.", a: "Wir haben gegessen.",
      why: "<b>essen</b> &rarr; <b>gegessen</b>, avec le double <b>ge</b>." },
    { t: "trad", f: "Elle a lu.", a: "Sie hat gelesen.",
      why: "<b>lesen</b> &rarr; <b>gelesen</b>." },
    { t: "trad", f: "J'ai écrit.", a: "Ich habe geschrieben.",
      why: "<b>schreiben</b> &rarr; <b>geschrieben</b>." },
    { t: "trad", f: "Il a pris.", a: "Er hat genommen.",
      why: "<b>nehmen</b> &rarr; <b>genommen</b>." },
    { t: "trad", f: "Nous avons trouvé.", a: "Wir haben gefunden.",
      why: "<b>finden</b> &rarr; <b>gefunden</b>." },
    { t: "trad", f: "J'ai dormi.", a: "Ich habe geschlafen.",
      why: "<b>schlafen</b> &rarr; <b>geschlafen</b>." },

    { t: "trans", inst: "Mets la phrase au passé.", from: "Ich sehe einen Film.", a: "Ich habe einen Film gesehen.",
      why: "<b>sehe</b> devient <b>habe … gesehen</b>." },
    { t: "trans", inst: "Mets la phrase au passé.", from: "Er trinkt Wasser.", a: "Er hat Wasser getrunken.",
      why: "<b>trinkt</b> devient <b>hat … getrunken</b>." },
    { t: "trans", inst: "Mets la phrase au passé.", from: "Wir essen Pizza.", a: "Wir haben Pizza gegessen.",
      why: "<b>essen</b> devient <b>haben … gegessen</b>." },
    { t: "trans", inst: "Mets la phrase au passé.", from: "Sie liest ein Buch.", a: "Sie hat ein Buch gelesen.",
      why: "<b>liest</b> devient <b>hat … gelesen</b>." },
    { t: "trans", inst: "Mets la phrase au passé.", from: "Ich nehme den Bus.", a: "Ich habe den Bus genommen.",
      why: "<b>nehme</b> devient <b>habe … genommen</b>." },
    { t: "trans", inst: "Mets la phrase au passé.", from: "Wir sprechen Deutsch.", a: "Wir haben Deutsch gesprochen.",
      why: "<b>sprechen</b> devient <b>haben … gesprochen</b>." }
  ]
},

/* ------------------------------- ÉTAPE 39 -----------------------------
   Le Perfekt avec sein. Ferme le chapitre 13 : après cette étape, on peut
   raconter une journée entière au passé.
   Le point d'appui pédagogique est que le français fait presque le même
   partage (« je suis allé », « je suis resté ») — sauf pour courir et voler,
   qui sont justement les exemples à montrer. */
{
  day: 39, title: "Le passé avec sein", de: "Perfekt mit sein",
  steps: [
    {
      idea: "Une petite famille de verbes prend <b>sein</b> et non <b>haben</b>.",
      detail: "Ils sont peu nombreux, mais ce sont des verbes qu'on emploie sans arrêt. <b>Ich bin gegangen</b> = « je suis allé ». La construction ne change pas : auxiliaire en deuxième position, participe à la fin.",
      gloss: { de: ["Ich", "bin", "nach", "Hause", "gegangen"], fr: ["Je", "suis", "à", "la maison", "allé"] }
    },
    {
      idea: "Ce sont les verbes de DÉPLACEMENT.",
      detail: "Aller, venir, partir, courir, voler, rouler : tout ce qui va d'un endroit à un autre prend <b>sein</b>. C'est la règle qui couvre presque tous les cas.",
      table: [["gehen", "ich bin ge<b>gangen</b>"], ["kommen", "ich bin ge<b>kommen</b>"], ["fahren", "ich bin ge<b>fahren</b>"], ["laufen", "ich bin ge<b>laufen</b>"], ["fliegen", "ich bin ge<b>flogen</b>"]],
      check: { q: "« Il est venu » se dit…", o: ["Er ist gekommen", "Er hat gekommen", "Er ist gekommt"], a: 0, why: "<b>kommen</b> est un déplacement : auxiliaire <b>sein</b>, participe <b>gekommen</b>." }
    },
    {
      idea: "Plus <b>bleiben</b>, qui est l'exception à retenir.",
      detail: "Rester n'est pas un déplacement — c'est même le contraire. <b>bleiben</b> prend pourtant <b>sein</b> : <b>ich bin geblieben</b>. Il faut simplement le savoir, et le français aide ici puisqu'il dit aussi « je suis resté ».",
      check: { q: "« Elle est restée à la maison » se dit…", o: ["Sie ist zu Hause geblieben", "Sie hat zu Hause geblieben", "Sie ist zu Hause gebleibt"], a: 0, why: "<b>bleiben</b> prend <b>sein</b> malgré l'absence de mouvement, et son participe est <b>geblieben</b>." }
    },
    {
      idea: "Le français ne dit pas toujours la même chose — attention à deux verbes.",
      detail: "Pour aller, venir et rester, les deux langues sont d'accord. Mais on dit « <b>j'ai</b> couru » et « <b>j'ai</b> volé », là où l'allemand dit <b>ich bin gelaufen</b> et <b>ich bin geflogen</b>. Traduire l'auxiliaire français mot à mot fait donc une faute exactement là.",
      table: [["j'ai couru", "ich <b>bin</b> gelaufen"], ["j'ai volé", "ich <b>bin</b> geflogen"], ["je suis allé", "ich <b>bin</b> gegangen"]],
      check: { q: "« Nous avons couru vite » se dit…", o: ["Wir sind schnell gelaufen", "Wir haben schnell gelaufen", "Wir sind schnell gelauft"], a: 0, why: "Le français dit « avons », l'allemand dit <b>sind</b> : c'est un déplacement." }
    },
    {
      idea: "<b>sein</b> se conjugue normalement, et le participe ne s'accorde jamais.",
      detail: "C'est le <b>sein</b> du A1 : <b>ich bin</b>, <b>du bist</b>, <b>er ist</b>, <b>wir sind</b>. Et contrairement au français, le participe ne prend jamais de <b>e</b> ni de <b>s</b> — <b>sie ist gegangen</b>, même au féminin.",
      table: [["ich <b>bin</b> gegangen", "je suis allé(e)"], ["du <b>bist</b> gegangen", "tu es allé(e)"], ["wir <b>sind</b> gegangen", "nous sommes allé(e)s"]],
      check: { q: "« Elles sont venues » se dit…", o: ["Sie sind gekommen", "Sie sind gekommene", "Sie haben gekommen"], a: 0, why: "Le participe allemand ne s'accorde avec rien : <b>gekommen</b> pour tout le monde." }
    }
  ],
  examples: [
    { d: "Ich bin nach Hause gegangen.", f: "Je suis rentré à la maison." },
    { d: "Wir sind nach Berlin gefahren.", f: "Nous sommes allés à Berlin." },
    { d: "Er ist gestern gekommen.", f: "Il est venu hier." },
    { d: "Sie ist zu Hause geblieben.", f: "Elle est restée à la maison." },
    { d: "Ich bin nach Wien geflogen.", f: "Je suis allé à Vienne en avion." },
    { d: "Wir sind schnell gelaufen.", f: "Nous avons couru vite." },
    { d: "Bist du mit dem Bus gefahren?", f: "Es-tu venu en bus ?" },
    { d: "Sie sind ins Kino gegangen.", f: "Ils sont allés au cinéma." },
    { d: "Wann bist du gekommen?", f: "Quand es-tu venu ?" },
    { d: "Ich bin lange geblieben.", f: "Je suis resté longtemps." },
    { d: "Der Zug ist schon gefahren.", f: "Le train est déjà parti." },
    { d: "Wir sind zu Fuß gegangen.", f: "Nous y sommes allés à pied." }
  ],
  vocab: [
    { d: "gegangen", f: "allé", p: "gue-GANG-eun" },
    { d: "gekommen", f: "venu", p: "gue-KO-meun" },
    { d: "gefahren", f: "allé (en véhicule)", p: "gue-FAA-reun" },
    { d: "geblieben", f: "resté", p: "gue-BLII-beun" },
    { d: "geflogen", f: "allé en avion", p: "gue-FLOO-gueun" },
    { d: "gelaufen", f: "couru", p: "gue-LAO-feun" },
    { d: "das Kino", f: "le cinéma", p: "das KII-no" },
    { d: "der Zug", f: "le train", p: "dèr TSOUK" },
    { d: "lange", f: "longtemps", p: "LANG-e" },
    { d: "schon", f: "déjà", p: "CHOON" }
  ],
  quiz: [
    { q: "Quel auxiliaire pour <b>gehen</b> au passé ?", o: ["sein", "haben", "les deux au choix"], a: 0, why: "<b>gehen</b> est un déplacement : <b>ich bin gegangen</b>." },
    { q: "« Nous avons couru » se dit en allemand…", o: ["Wir sind gelaufen", "Wir haben gelaufen", "Wir sind gelauft"], a: 0, why: "Le français dit « avons », l'allemand dit <b>sind</b> : c'est là qu'on se trompe." },
    { q: "Quel verbe prend <b>sein</b> sans être un déplacement ?", o: ["bleiben", "kaufen", "lesen", "trinken"], a: 0, why: "<b>bleiben</b> (rester) prend <b>sein</b> : <b>ich bin geblieben</b>. Le français fait pareil." },
    { q: "Le participe de <b>fliegen</b> est…", o: ["geflogen", "gefliegen", "geflugen", "gefliegt"], a: 0, why: "La voyelle passe de <b>ie</b> à <b>o</b> : <b>geflogen</b>." },
    { q: "« Elle est venue » se dit…", o: ["Sie ist gekommen", "Sie ist gekommene", "Sie hat gekommen"], a: 0, why: "Auxiliaire <b>sein</b>, et le participe ne s'accorde jamais — pas de <b>e</b> au féminin." }
  ],
  drills: [
    { t: "gap", f: "Je suis rentré à la maison.", s: "Ich ___ nach Hause gegangen.", a: "bin",
      why: "<b>gehen</b> prend <b>sein</b>, donc <b>bin</b> pour <b>ich</b>." },
    { t: "gap", f: "Nous sommes allés à Berlin.", s: "Wir sind nach Berlin ___.", a: "gefahren",
      why: "<b>fahren</b> &rarr; <b>gefahren</b>, sans changement de voyelle." },
    { t: "gap", f: "Il est venu hier.", s: "Er ___ gestern gekommen.", a: "ist",
      why: "<b>ist</b> pour <b>er</b>, puisque <b>kommen</b> prend <b>sein</b>." },
    { t: "gap", f: "Elle est restée à la maison.", s: "Sie ist zu Hause ___.", a: "geblieben",
      why: "<b>bleiben</b> &rarr; <b>geblieben</b>." },
    { t: "gap", f: "Nous avons couru vite.", s: "Wir ___ schnell gelaufen.", a: "sind",
      why: "Le français dit « avons », l'allemand exige <b>sind</b>." },
    { t: "gap", f: "Ils sont allés au cinéma.", s: "Sie sind ins Kino ___.", a: "gegangen",
      why: "<b>gehen</b> &rarr; <b>gegangen</b>." },
    { t: "gap", f: "Je suis allé à Vienne en avion.", s: "Ich bin nach Wien ___.", a: "geflogen",
      why: "<b>fliegen</b> &rarr; <b>geflogen</b>." },
    { t: "gap", f: "Le train est déjà parti.", s: "Der Zug ist ___ gefahren.", a: "schon",
      why: "<b>schon</b> = déjà, placé avant le participe." },

    { t: "order", f: "Je suis rentré à la maison.", a: "Ich bin nach Hause gegangen",
      why: "Auxiliaire en deuxième position, participe à la fin — rien ne change." },
    { t: "order", f: "Il est venu hier.", a: "Er ist gestern gekommen",
      why: "<b>gestern</b> se glisse entre les deux morceaux du verbe." },
    { t: "order", f: "Elle est restée à la maison.", a: "Sie ist zu Hause geblieben",
      why: "<b>zu Hause</b> précède le participe." },
    { t: "order", f: "Nous avons couru vite.", a: "Wir sind schnell gelaufen",
      why: "<b>sind</b> et non <b>haben</b> : c'est un déplacement." },
    { t: "order", f: "Ils sont allés au cinéma.", a: "Sie sind ins Kino gegangen",
      why: "<b>ins Kino</b> indique la direction, donc l'accusatif." },
    { t: "order", f: "Je suis resté longtemps.", a: "Ich bin lange geblieben",
      why: "<b>lange</b> se place avant le participe." },

    { t: "trad", f: "Je suis allé.", a: "Ich bin gegangen.",
      why: "<b>gehen</b> prend <b>sein</b>." },
    { t: "trad", f: "Tu es venu.", a: "Du bist gekommen.",
      why: "<b>bist</b> pour <b>du</b>." },
    { t: "trad", f: "Elle est restée.", a: "Sie ist geblieben.",
      why: "<b>bleiben</b> prend <b>sein</b>, comme en français." },
    { t: "trad", f: "Nous avons couru.", a: "Wir sind gelaufen.",
      why: "Piège : l'allemand dit <b>sind</b> là où le français dit « avons »." },
    { t: "trad", f: "Le train est parti.", a: "Der Zug ist gefahren.",
      why: "<b>fahren</b> pour tout ce qui roule." },
    { t: "trad", f: "Quand es-tu venu ?", a: "Wann bist du gekommen?",
      why: "Mot interrogatif, auxiliaire, sujet, puis participe à la fin." },
    { t: "trad", f: "le cinéma", a: "das Kino",
      why: "Neutre, comme beaucoup de mots venus d'ailleurs." },
    { t: "trad", f: "le train", a: "der Zug",
      why: "Masculin. Pluriel <b>die Züge</b>, avec tréma." },

    { t: "trans", inst: "Mets la phrase au passé.", from: "Ich gehe nach Hause.", a: "Ich bin nach Hause gegangen.",
      why: "<b>gehe</b> devient <b>bin … gegangen</b>." },
    { t: "trans", inst: "Mets la phrase au passé.", from: "Er kommt heute.", a: "Er ist heute gekommen.",
      why: "<b>kommt</b> devient <b>ist … gekommen</b>." },
    { t: "trans", inst: "Mets la phrase au passé.", from: "Wir fahren nach Berlin.", a: "Wir sind nach Berlin gefahren.",
      why: "<b>fahren</b> devient <b>sind … gefahren</b>." },
    { t: "trans", inst: "Mets la phrase au passé.", from: "Sie bleibt zu Hause.", a: "Sie ist zu Hause geblieben.",
      why: "<b>bleibt</b> devient <b>ist … geblieben</b>." },
    { t: "trans", inst: "Mets la phrase au passé.", from: "Ich laufe schnell.", a: "Ich bin schnell gelaufen.",
      why: "<b>laufe</b> devient <b>bin … gelaufen</b> — avec <b>sein</b>, pas <b>haben</b>." },
    { t: "trans", inst: "Mets la phrase au passé.", from: "Der Zug fährt.", a: "Der Zug ist gefahren.",
      why: "<b>fährt</b> devient <b>ist gefahren</b>." }
  ]
},

/* ------------------------------- ÉTAPE 40 -----------------------------
   Chez le médecin. Ouvre le chapitre 14 et s'appuie DIRECTEMENT sur
   l'étape 36 : les parties du corps y servent enfin à quelque chose.
   Le mot composé `Kopf + Schmerzen` est le fil de l'étape — il rend
   productif un vocabulaire qui était jusqu'ici une simple liste. */
{
  day: 40, title: "Chez le médecin", de: "Beim Arzt",
  steps: [
    {
      idea: "Trois mots suffisent pour prendre rendez-vous.",
      detail: "<b>der Arzt</b> le médecin, <b>die Praxis</b> son cabinet, <b>der Termin</b> le rendez-vous. Avec eux et le <b>ich möchte</b> du A1, on obtient déjà ce qu'on est venu chercher.",
      gloss: { de: ["Ich", "möchte", "einen", "Termin"], fr: ["Je", "voudrais", "un", "rendez-vous"] }
    },
    {
      idea: "La douleur porte le nom de l'endroit : <b>Kopf</b> + <b>Schmerzen</b>.",
      detail: "L'allemand colle les deux mots en un seul. C'est ici que le vocabulaire de l'étape 36 devient utile : chaque partie du corps donne sa douleur, sans rien apprendre de neuf.",
      table: [["der Kopf", "ich habe <b>Kopfschmerzen</b>"], ["der Rücken", "ich habe <b>Rückenschmerzen</b>"], ["die Ohren", "ich habe <b>Ohrenschmerzen</b>"]],
      check: { q: "« J'ai mal au dos » se dit…", o: ["Ich habe Rückenschmerzen", "Ich habe Rückenschmerz", "Ich habe Rücken Schmerzen"], a: 0, why: "Un seul mot collé, et <b>Schmerzen</b> reste au pluriel — on a rarement une douleur unique." }
    },
    {
      idea: "Deux façons de dire la même chose, et les deux sont justes.",
      detail: "<b>Mein Kopf tut weh</b> (l'étape 36) et <b>ich habe Kopfschmerzen</b> veulent dire exactement la même chose. La première décrit ce qu'on ressent sur le moment, la seconde est celle qu'on emploie chez le médecin.",
      table: [["Mein Kopf tut weh.", "sur le moment"], ["Ich habe Kopfschmerzen.", "chez le médecin"]],
      check: { q: "Laquelle de ces phrases dit « j'ai mal à la tête » ?", o: ["les deux : Mein Kopf tut weh et Ich habe Kopfschmerzen", "seulement Mein Kopf tut weh", "seulement Ich habe Kopfschmerzen"], a: 0, why: "Les deux sont correctes. La seconde est la formule attendue dans un cabinet." }
    },
    {
      idea: "Pour dire qu'on ne va pas bien : <b>krank</b>, et son contraire <b>gesund</b>.",
      detail: "<b>Ich bin krank</b> = je suis malade. <b>Ich bin gesund</b> = je vais bien. On entend aussi <b>mir geht es nicht gut</b> — remarque le <b>mir</b> : l'allemand dit « à moi ça ne va pas ». Ce petit mot revient en force à l'étape 49.",
      check: { q: "Le contraire de <b>krank</b> est…", o: ["gesund", "gut", "warm"], a: 0, why: "<b>gesund</b> = en bonne santé. <b>gut</b> veut dire bon ou bien, ce n'est pas la même idée." }
    },
    {
      idea: "En partant : <b>Gute Besserung!</b>",
      detail: "C'est ce qu'on souhaite à quelqu'un de malade — l'équivalent de « bon rétablissement ». <b>die Besserung</b> est féminin, d'où <b>Gute</b> sans <b>n</b> : exactement la même mécanique que <b>Gute Reise</b> et <b>Gute Nacht</b>, vues au A1.",
      check: { q: "Pourquoi <b>Gute</b> et non <b>Guten</b> dans <b>Gute Besserung</b> ?", o: ["parce que Besserung est féminin", "parce que c'est un souhait", "parce que le mot est long"], a: 0, why: "Comme <b>Gute Reise</b> et <b>Gute Nacht</b>. On dit en revanche <b>Guten Tag</b>, parce que <b>Tag</b> est masculin." }
    }
  ],
  examples: [
    { d: "Ich bin krank.", f: "Je suis malade." },
    { d: "Ich habe Kopfschmerzen.", f: "J'ai mal à la tête." },
    { d: "Ich habe Fieber.", f: "J'ai de la fièvre." },
    { d: "Ich möchte einen Termin.", f: "Je voudrais un rendez-vous." },
    { d: "Wo ist die Praxis?", f: "Où est le cabinet ?" },
    { d: "Der Arzt ist nicht da.", f: "Le médecin n'est pas là." },
    { d: "Ich habe eine Erkältung.", f: "J'ai un rhume." },
    { d: "Mein Rücken tut weh.", f: "J'ai mal au dos." },
    { d: "Das Medikament ist gut.", f: "Le médicament est bon." },
    { d: "Ich habe Husten.", f: "Je tousse." },
    { d: "Ich bin wieder gesund.", f: "Je suis de nouveau en bonne santé." },
    { d: "Gute Besserung!", f: "Bon rétablissement !" }
  ],
  vocab: [
    { d: "der Arzt", f: "le médecin", p: "dèr ARTST" },
    { d: "die Praxis", f: "le cabinet médical", p: "dii PRA-ksiss" },
    { d: "der Termin", f: "le rendez-vous", p: "dèr tèr-MIIN" },
    { d: "die Schmerzen", f: "les douleurs", p: "dii CHMÈR-tseun" },
    { d: "das Fieber", f: "la fièvre", p: "das FII-beur" },
    { d: "die Erkältung", f: "le rhume", p: "dii èr-KÈL-toung" },
    { d: "das Medikament", f: "le médicament", p: "das mé-di-ka-MENT" },
    { d: "der Husten", f: "la toux", p: "dèr HOUSS-teun" },
    { d: "krank", f: "malade", p: "KRANK" },
    { d: "gesund", f: "en bonne santé", p: "gue-ZOUNT" }
  ],
  quiz: [
    { q: "« J'ai mal au dos » se dit…", o: ["Ich habe Rückenschmerzen", "Ich habe Rücken Schmerzen", "Ich habe Rückenschmerz"], a: 0, why: "Un seul mot collé, et <b>Schmerzen</b> au pluriel." },
    { q: "Le contraire de <b>krank</b> est…", o: ["gesund", "gut", "kalt", "schön"], a: 0, why: "<b>gesund</b> = en bonne santé. <b>gut</b> ne dit rien de la santé." },
    { q: "Comment demander un rendez-vous ?", o: ["Ich möchte einen Termin", "Ich möchte eine Praxis", "Ich möchte einen Arzt"], a: 0, why: "<b>der Termin</b> est le rendez-vous. <b>die Praxis</b> est le lieu, <b>der Arzt</b> la personne." },
    { q: "Dans <b>Gute Besserung</b>, pourquoi <b>Gute</b> sans <b>n</b> ?", o: ["Besserung est féminin", "c'est une exception", "parce qu'on part"], a: 0, why: "Même règle que <b>Gute Reise</b>. Au masculin on dirait <b>Guten</b>, comme dans <b>Guten Tag</b>." },
    { q: "<b>Ich habe Fieber</b> veut dire…", o: ["j'ai de la fièvre", "j'ai froid", "je suis fatigué"], a: 0, why: "<b>das Fieber</b> = la fièvre. Attention au faux ami : ce n'est pas « fébrile »." }
  ],
  drills: [
    { t: "gap", f: "Je suis malade.", s: "Ich bin ___.", a: "krank",
      why: "<b>krank</b> ne prend pas de terminaison après <b>sein</b>." },
    { t: "gap", f: "J'ai mal à la tête.", s: "Ich habe ___.", a: "Kopfschmerzen",
      why: "<b>Kopf</b> et <b>Schmerzen</b> collés en un seul mot." },
    { t: "gap", f: "J'ai de la fièvre.", s: "Ich habe ___.", a: "Fieber",
      why: "<b>das Fieber</b>, sans article dans cette tournure." },
    { t: "gap", f: "Je voudrais un rendez-vous.", s: "Ich möchte einen ___.", a: "Termin",
      why: "<b>der Termin</b> est masculin, d'où <b>einen</b> à l'accusatif." },
    { t: "gap", f: "Où est le cabinet ?", s: "Wo ist die ___?", a: "Praxis",
      why: "<b>die Praxis</b> est féminin." },
    { t: "gap", f: "J'ai un rhume.", s: "Ich habe eine ___.", a: "Erkältung",
      why: "<b>die Erkältung</b> est féminin — comme tous les mots en <b>-ung</b>." },
    { t: "gap", f: "J'ai mal au dos.", s: "Mein Rücken tut ___.", a: "weh",
      why: "L'autre façon de le dire, vue à l'étape 36." },
    { t: "gap", f: "Je suis de nouveau en bonne santé.", s: "Ich bin wieder ___.", a: "gesund",
      why: "<b>gesund</b> est le contraire de <b>krank</b>." },

    { t: "order", f: "Je voudrais un rendez-vous.", a: "Ich möchte einen Termin",
      why: "Sujet, verbe, complément à l'accusatif." },
    { t: "order", f: "J'ai mal à la tête.", a: "Ich habe Kopfschmerzen",
      why: "Pas d'article : on dit simplement <b>ich habe Kopfschmerzen</b>." },
    { t: "order", f: "Le médecin n'est pas là.", a: "Der Arzt ist nicht da",
      why: "<b>nicht</b> se place avant <b>da</b>." },
    { t: "order", f: "Où est le cabinet ?", a: "Wo ist die Praxis",
      why: "Question en <b>wo</b> : le verbe suit immédiatement." },
    { t: "order", f: "J'ai un rhume.", a: "Ich habe eine Erkältung",
      why: "<b>eine</b> à l'accusatif féminin — identique au nominatif." },
    { t: "order", f: "Je suis de nouveau en bonne santé.", a: "Ich bin wieder gesund",
      why: "<b>wieder</b> se glisse avant l'adjectif." },

    { t: "trad", f: "le médecin", a: "der Arzt",
      why: "Masculin. Au féminin on dit <b>die Ärztin</b>." },
    { t: "trad", f: "le rendez-vous", a: "der Termin",
      why: "Masculin. Vaut aussi pour un rendez-vous professionnel." },
    { t: "trad", f: "la fièvre", a: "das Fieber",
      why: "Neutre." },
    { t: "trad", f: "le rhume", a: "die Erkältung",
      why: "Féminin, comme tous les mots en <b>-ung</b>." },
    { t: "trad", f: "le médicament", a: "das Medikament",
      why: "Neutre. Pluriel <b>die Medikamente</b>." },
    { t: "trad", f: "malade", a: "krank",
      why: "Adjectif : pas de terminaison après <b>sein</b>." },
    { t: "trad", f: "Je suis malade.", a: "Ich bin krank.",
      why: "<b>sein</b> et non <b>haben</b> — l'allemand rejoint le français ici." },
    { t: "trad", f: "Bon rétablissement !", a: "Gute Besserung!",
      why: "<b>Besserung</b> est féminin, donc <b>Gute</b> sans <b>n</b>." },

    { t: "trans", inst: "Dis-le autrement, avec Schmerzen.", from: "Mein Kopf tut weh.", a: "Ich habe Kopfschmerzen.",
      why: "La partie du corps cesse d'être sujet : c'est <b>ich</b> qui prend la place." },
    { t: "trans", inst: "Dis-le autrement, avec Schmerzen.", from: "Mein Rücken tut weh.", a: "Ich habe Rückenschmerzen.",
      why: "<b>Rücken</b> et <b>Schmerzen</b> se collent en un mot." },
    { t: "trans", inst: "Dis-le autrement, avec Schmerzen.", from: "Meine Ohren tun weh.", a: "Ich habe Ohrenschmerzen.",
      why: "C'est le PLURIEL <b>Ohren</b> qui entre dans le mot composé." },
    { t: "trans", inst: "Mets la phrase au passé.", from: "Der Arzt kommt.", a: "Der Arzt ist gekommen.",
      why: "<b>kommen</b> prend <b>sein</b> : <b>ist gekommen</b>." },
    { t: "trans", inst: "Mets la phrase au passé.", from: "Ich nehme das Medikament.", a: "Ich habe das Medikament genommen.",
      why: "<b>nehmen</b> prend <b>haben</b>, et son participe est irrégulier." },
    { t: "trans", inst: "Mets la phrase au passé.", from: "Ich kaufe das Medikament.", a: "Ich habe das Medikament gekauft.",
      why: "<b>kaufen</b> est régulier : <b>gekauft</b>." }
  ]
},

/* ------------------------------- ÉTAPE 41 -----------------------------
   war et hatte — le prétérit de sein et haben.

   ⚠️⚠️ LA TABLE DE `sein` EST ÉCRITE DE MÉMOIRE, ET IL FAUT LE SAVOIR.
   Vérifié le 02/08/2026 : `sein` est ABSENT de `reference/verbes-wiktionnaire.csv`
   (zéro ligne). C'est le même trou que celui déjà noté au A1. `haben`, lui, y
   est bien — sa ligne donne `Präteritum_ich = hatte`, et c'est de là que vient
   la table de `hatte` ci-dessous.
   Si le socle est un jour complété, revérifier `war / warst / waren / wart`. */
{
  day: 41, title: "war et hatte", de: "Das Präteritum von sein und haben",
  steps: [
    {
      idea: "Deux verbes ont un passé plus court, et c'est celui qu'on entend.",
      detail: "Pour presque tous les verbes, l'allemand parlé emploie le passé composé des étapes 37 à 39. Mais <b>sein</b> et <b>haben</b> font exception : on dit <b>ich war</b> et <b>ich hatte</b>, en un seul mot. Ce sont les deux formes de passé les plus fréquentes de la langue.",
      gloss: { de: ["Gestern", "war", "ich", "krank"], fr: ["Hier", "étais", "je", "malade"] }
    },
    {
      idea: "<b>sein</b> au passé donne <b>war</b>.",
      detail: "Une seule racine, <b>war</b>, et des terminaisons très légères. Remarque que la 1ʳᵉ et la 3ᵉ personne du singulier sont <b>identiques</b> — comme au présent avec <b>ist</b>, il n'y a rien de neuf à retenir de ce côté.",
      table: [["ich <b>war</b>", "j'étais"], ["du <b>warst</b>", "tu étais"], ["er/sie/es <b>war</b>", "il / elle était"], ["wir <b>waren</b>", "nous étions"], ["ihr <b>wart</b>", "vous étiez"], ["sie/Sie <b>waren</b>", "ils étaient / vous étiez"]],
      check: { q: "« Où étais-tu ? » se dit…", o: ["Wo warst du?", "Wo war du?", "Wo wart du?"], a: 0, why: "<b>du</b> prend <b>-st</b> : <b>warst</b>. <b>wart</b> est la forme de <b>ihr</b>." }
    },
    {
      idea: "<b>haben</b> au passé donne <b>hatte</b>.",
      detail: "Même principe : une racine <b>hatt-</b> et les terminaisons habituelles. Attention à ne pas confondre avec <b>hätte</b>, qui prend un tréma et veut dire « j'aurais » — celui-là arrive à l'étape 60.",
      table: [["ich <b>hatte</b>", "j'avais"], ["du <b>hattest</b>", "tu avais"], ["er/sie/es <b>hatte</b>", "il / elle avait"], ["wir <b>hatten</b>", "nous avions"], ["ihr <b>hattet</b>", "vous aviez"], ["sie/Sie <b>hatten</b>", "ils avaient / vous aviez"]],
      check: { q: "Le passé de <b>ich habe</b> est…", o: ["ich hatte", "ich hätte", "ich habte", "ich war"], a: 0, why: "<b>hatte</b> sans tréma. <b>hätte</b> existe aussi mais veut dire « j'aurais »." }
    },
    {
      idea: "Avec ces deux-là, on n'emploie pas le passé composé.",
      detail: "<b>Ich bin krank gewesen</b> existe, mais personne ne parle ainsi. On dit <b>ich war krank</b>. C'est l'inverse de la règle des étapes précédentes, et c'est justement pour ça que ces deux verbes méritent leur propre étape.",
      table: [["<b>Ich war krank.</b>", "ce qu'on dit"], ["Ich bin krank gewesen.", "correct, mais rare"]],
      check: { q: "Pour dire « j'étais malade », on emploie…", o: ["ich war krank", "ich bin krank gewesen", "ich habe krank"], a: 0, why: "Avec <b>sein</b> et <b>haben</b>, la forme courte l'emporte toujours à l'oral." }
    },
    {
      idea: "Le verbe reste en deuxième position, même après un mot de temps.",
      detail: "Rien de neuf, mais c'est là qu'on se trompe : dès qu'une phrase commence par <b>gestern</b>, <b>damals</b> ou <b>letzte Woche</b>, le sujet passe APRÈS le verbe. On dit <b>gestern war ich krank</b>, jamais « gestern ich war krank ».",
      table: [["Ich <b>war</b> gestern krank.", "sujet d'abord"], ["Gestern <b>war</b> ich krank.", "temps d'abord, sujet après le verbe"]],
      check: { q: "Comment dit-on « Hier j'étais fatigué » ?", o: ["Gestern war ich müde", "Gestern ich war müde", "Ich gestern war müde"], a: 0, why: "Le verbe garde sa deuxième place ; c'est le sujet qui recule." }
    }
  ],
  examples: [
    { d: "Ich war krank.", f: "J'étais malade." },
    { d: "Gestern war ich müde.", f: "Hier j'étais fatigué." },
    { d: "Wir waren in Berlin.", f: "Nous étions à Berlin." },
    { d: "Ich hatte Fieber.", f: "J'avais de la fièvre." },
    { d: "Er hatte Kopfschmerzen.", f: "Il avait mal à la tête." },
    { d: "Wo warst du?", f: "Où étais-tu ?" },
    { d: "Das war sehr gut.", f: "C'était très bien." },
    { d: "Wir hatten keine Zeit.", f: "Nous n'avions pas le temps." },
    { d: "Letzte Woche war ich allein.", f: "La semaine dernière j'étais seul." },
    { d: "Früher war ich oft krank.", f: "Autrefois j'étais souvent malade." },
    { d: "Hattest du einen Termin?", f: "Avais-tu un rendez-vous ?" },
    { d: "Damals hatten wir kein Auto.", f: "À l'époque nous n'avions pas de voiture." }
  ],
  vocab: [
    { d: "war", f: "était, j'étais", p: "VAAR" },
    { d: "waren", f: "étions, étaient", p: "VAA-reun" },
    { d: "hatte", f: "avait, j'avais", p: "HA-te" },
    { d: "hatten", f: "avions, avaient", p: "HA-teun" },
    { d: "früher", f: "autrefois", p: "FRUU-eur" },
    { d: "damals", f: "à l'époque", p: "DAA-malss" },
    { d: "vorgestern", f: "avant-hier", p: "FOR-guès-teurn" },
    { d: "letzte Woche", f: "la semaine dernière", p: "LÈT-ste VO-khe" },
    { d: "allein", f: "seul", p: "a-LAÏN" },
    { d: "anders", f: "différent, autrement", p: "AN-deurss" }
  ],
  quiz: [
    { q: "La forme courte du passé de <b>sein</b>, celle qu'on entend, est…", o: ["ich war", "ich bin", "ich hatte", "ich habe"], a: 0, why: "<b>ich war</b>. Le passé composé <b>ich bin gewesen</b> existe, mais personne ne l'emploie à l'oral." },
    { q: "Le passé de <b>ich habe</b> est…", o: ["ich hatte", "ich hätte", "ich habte", "ich war"], a: 0, why: "<b>hatte</b>, sans tréma. Avec tréma, <b>hätte</b> veut dire « j'aurais »." },
    { q: "« Où étais-tu ? » se dit…", o: ["Wo warst du?", "Wo war du?", "Wo hattest du?"], a: 0, why: "<b>du</b> prend <b>-st</b> : <b>warst</b>." },
    { q: "<b>wir</b> au passé de <b>sein</b> donne…", o: ["wir waren", "wir wart", "wir warn", "wir hatten"], a: 0, why: "<b>waren</b>. <b>wart</b> est la forme de <b>ihr</b>." },
    { q: "Dans <b>Gestern war ich krank</b>, pourquoi <b>war</b> passe-t-il avant <b>ich</b> ?", o: ["parce que le verbe reste en deuxième position", "parce que c'est une question", "parce que gestern est un mot du passé"], a: 0, why: "<b>gestern</b> occupe la première place, donc le sujet recule après le verbe. Règle du A1, toujours valable." }
  ],
  drills: [
    { t: "gap", f: "J'étais malade.", s: "Ich ___ krank.", a: "war",
      why: "<b>ich war</b> : la 1ʳᵉ personne n'a pas de terminaison." },
    { t: "gap", f: "Nous étions à Berlin.", s: "Wir ___ in Berlin.", a: "waren",
      why: "<b>wir</b> prend <b>-en</b> : <b>waren</b>." },
    { t: "gap", f: "J'avais de la fièvre.", s: "Ich ___ Fieber.", a: "hatte",
      why: "<b>hatte</b>, sans tréma." },
    { t: "gap", f: "Il avait mal à la tête.", s: "Er ___ Kopfschmerzen.", a: "hatte",
      why: "La 3ᵉ personne est identique à la 1ʳᵉ : <b>hatte</b>." },
    { t: "gap", f: "Où étais-tu ?", s: "Wo ___ du?", a: "warst",
      why: "<b>du</b> prend <b>-st</b>." },
    { t: "gap", f: "Nous n'avions pas le temps.", s: "Wir ___ keine Zeit.", a: "hatten",
      why: "<b>wir hatten</b>, avec <b>-en</b>." },
    { t: "gap", f: "Hier j'étais fatigué.", s: "Gestern ___ ich müde.", a: "war",
      why: "Le verbe garde la deuxième place, le sujet passe après." },
    { t: "gap", f: "À l'époque nous n'avions pas de voiture.", s: "___ hatten wir kein Auto.", a: "Damals",
      why: "<b>damals</b> = à l'époque, et il fait reculer le sujet." },

    { t: "order", f: "J'étais malade.", a: "Ich war krank",
      why: "Sujet, verbe, adjectif — l'ordre le plus simple." },
    { t: "order", f: "Nous étions à Berlin.", a: "Wir waren in Berlin",
      why: "<b>waren</b> pour <b>wir</b>." },
    { t: "order", f: "Hier j'étais fatigué.", a: "Gestern war ich müde",
      why: "Le complément de temps ouvre la phrase, le verbe reste deuxième." },
    { t: "order", f: "Il avait mal à la tête.", a: "Er hatte Kopfschmerzen",
      why: "<b>hatte</b> pour <b>er</b>." },
    { t: "order", f: "La semaine dernière j'étais seul.", a: "Letzte Woche war ich allein",
      why: "<b>letzte Woche</b> en tête, donc <b>war ich</b> et non « ich war »." },
    { t: "order", f: "Nous n'avions pas le temps.", a: "Wir hatten keine Zeit",
      why: "<b>keine</b> devant un féminin, comme au A1." },

    { t: "trad", f: "J'étais.", a: "Ich war.",
      why: "Un seul mot pour le passé de <b>sein</b>." },
    { t: "trad", f: "Tu étais.", a: "Du warst.",
      why: "<b>-st</b> pour <b>du</b>." },
    { t: "trad", f: "Nous étions.", a: "Wir waren.",
      why: "<b>-en</b> pour <b>wir</b>." },
    { t: "trad", f: "J'avais.", a: "Ich hatte.",
      why: "<b>hatte</b>, à ne pas confondre avec <b>hätte</b>." },
    { t: "trad", f: "Elle avait.", a: "Sie hatte.",
      why: "Identique à la 1ʳᵉ personne." },
    { t: "trad", f: "C'était très bien.", a: "Das war sehr gut.",
      why: "<b>das war</b> est la tournure la plus courante pour commenter." },
    { t: "trad", f: "autrefois", a: "früher",
      why: "Se place en tête de phrase et fait reculer le sujet." },
    { t: "trad", f: "avant-hier", a: "vorgestern",
      why: "<b>vor</b> = avant, collé à <b>gestern</b>." },

    { t: "trans", inst: "Mets la phrase au passé.", from: "Ich bin krank.", a: "Ich war krank.",
      why: "<b>bin</b> devient <b>war</b> — un seul mot, pas de participe." },
    { t: "trans", inst: "Mets la phrase au passé.", from: "Wir sind in Berlin.", a: "Wir waren in Berlin.",
      why: "<b>sind</b> devient <b>waren</b>." },
    { t: "trans", inst: "Mets la phrase au passé.", from: "Ich habe Fieber.", a: "Ich hatte Fieber.",
      why: "<b>habe</b> devient <b>hatte</b>." },
    { t: "trans", inst: "Mets la phrase au passé.", from: "Er hat Kopfschmerzen.", a: "Er hatte Kopfschmerzen.",
      why: "<b>hat</b> devient <b>hatte</b>." },
    { t: "trans", inst: "Mets la phrase au passé.", from: "Wo bist du?", a: "Wo warst du?",
      why: "<b>bist</b> devient <b>warst</b>." },
    { t: "trans", inst: "Mets la phrase au passé.", from: "Hast du einen Termin?", a: "Hattest du einen Termin?",
      why: "<b>hast</b> devient <b>hattest</b>." }
  ]
},

/* ------------------------------- ÉTAPE 42 -----------------------------
   weil, et le verbe rejeté à la fin. Ferme le chapitre 14.

   C'est la première subordonnée du cours, et la règle qu'elle installe
   resservira pour `dass` (45) et `wenn` (50) : on ne l'apprend qu'une fois.
   D'où le choix de lui donner une étape entière alors qu'elle tient en une
   phrase — c'est l'ENTRAÎNEMENT qui coûte, pas l'énoncé.

   Les exercices `order` portent volontairement sur la SEULE subordonnée
   (« weil ich krank bin »), sans virgule ni principale : c'est exactement le
   morceau qu'il faut réordonner, et une virgule collée à un mot rendrait le
   jeu de cartes illisible. */
{
  day: 42, title: "Dire pourquoi", de: "Der Nebensatz mit weil",
  steps: [
    {
      idea: "<b>weil</b> veut dire « parce que ».",
      detail: "C'est la réponse à <b>warum?</b>. Elle s'ajoute à une phrase que tu sais déjà faire : <b>ich bleibe zu Hause</b>, puis la raison. Mais elle emporte une règle qui change tout — celle de l'écran suivant.",
      gloss: { de: ["weil", "ich", "krank", "bin"], fr: ["parce que", "je", "malade", "suis"] }
    },
    {
      idea: "⚠️ Après <b>weil</b>, le verbe part à la FIN.",
      detail: "C'est la règle la plus dépaysante de l'allemand, et il n'y a aucune exception. Le verbe conjugué quitte sa deuxième place et va se poser au bout. On dit <b>weil ich krank bin</b>, jamais « weil ich bin krank ».",
      table: [["Ich <b>bin</b> krank.", "phrase normale : verbe en 2ᵉ"], ["…, weil ich krank <b>bin</b>.", "après weil : verbe à la fin"]],
      check: { q: "« parce que je suis malade » se dit…", o: ["weil ich krank bin", "weil ich bin krank", "weil bin ich krank"], a: 0, why: "Le verbe <b>bin</b> descend tout au bout. C'est la seule chose à retenir de cette étape." }
    },
    {
      idea: "Une virgule sépare toujours les deux morceaux.",
      detail: "En allemand elle n'est pas facultative : elle marque l'endroit où la phrase change de règle. Avant la virgule, verbe en deuxième position ; après, verbe à la fin.",
      table: [["Ich bleibe zu Hause<b>,</b> weil ich krank bin.", "Je reste à la maison parce que je suis malade."], ["Er kommt nicht<b>,</b> weil er keine Zeit hat.", "Il ne vient pas parce qu'il n'a pas le temps."]],
      check: { q: "Que met-on obligatoirement devant <b>weil</b> ?", o: ["une virgule", "un point", "rien du tout"], a: 0, why: "La virgule est obligatoire en allemand. Elle signale que la règle du verbe change juste après." }
    },
    {
      idea: "Avec <b>war</b> et <b>hatte</b>, c'est la même chose.",
      detail: "Rien de neuf : les formes de l'étape 41 descendent au bout comme les autres. C'est même là qu'on raconte le plus souvent une raison — un fait passé.",
      table: [["…, weil ich krank <b>war</b>.", "parce que j'étais malade"], ["…, weil ich Fieber <b>hatte</b>.", "parce que j'avais de la fièvre"]],
      check: { q: "« parce qu'elle était seule » se dit…", o: ["weil sie allein war", "weil sie war allein", "weil war sie allein"], a: 0, why: "<b>war</b> se comporte comme n'importe quel verbe : il finit la phrase." }
    },
    {
      idea: "Avec le passé composé, c'est l'AUXILIAIRE qui finit.",
      detail: "Voilà le seul point qui surprend. Dans une phrase normale, le participe ferme la marche (<b>ich habe geschlafen</b>). Après <b>weil</b>, le participe recule d'un cran et laisse l'auxiliaire passer dernier : <b>weil ich geschlafen habe</b>. Les deux morceaux du verbe restent collés, mais dans l'autre sens.",
      table: [["Ich <b>habe</b> nicht <b>geschlafen</b>.", "phrase normale"], ["…, weil ich nicht <b>geschlafen habe</b>.", "après weil : l'auxiliaire finit"]],
      check: { q: "« parce que je n'ai pas dormi » se dit…", o: ["weil ich nicht geschlafen habe", "weil ich nicht habe geschlafen", "weil ich habe nicht geschlafen"], a: 0, why: "Le participe d'abord, l'auxiliaire tout au bout. C'est l'inverse de l'ordre habituel." }
    }
  ],
  examples: [
    { d: "Ich bleibe zu Hause, weil ich krank bin.", f: "Je reste à la maison parce que je suis malade." },
    { d: "Warum bist du müde?", f: "Pourquoi es-tu fatigué ?" },
    { d: "Ich bin müde, weil ich nicht geschlafen habe.", f: "Je suis fatigué parce que je n'ai pas dormi." },
    { d: "Er kommt nicht, weil er keine Zeit hat.", f: "Il ne vient pas parce qu'il n'a pas le temps." },
    { d: "Ich nehme das Medikament, weil ich Fieber habe.", f: "Je prends le médicament parce que j'ai de la fièvre." },
    { d: "Wir bleiben hier, weil wir müde sind.", f: "Nous restons ici parce que nous sommes fatigués." },
    { d: "Sie war traurig, weil sie allein war.", f: "Elle était triste parce qu'elle était seule." },
    { d: "Ich lerne Deutsch, weil es wichtig ist.", f: "J'apprends l'allemand parce que c'est important." },
    { d: "Das ist der Grund.", f: "C'est la raison." },
    { d: "Ich habe nichts gegessen, weil ich keinen Hunger hatte.", f: "Je n'ai rien mangé parce que je n'avais pas faim." },
    { d: "Vielleicht ist er krank.", f: "Il est peut-être malade." },
    { d: "Natürlich komme ich!", f: "Bien sûr que je viens !" }
  ],
  vocab: [
    { d: "weil", f: "parce que", p: "VAÏL" },
    { d: "der Grund", f: "la raison", p: "dèr GROUNT" },
    { d: "wichtig", f: "important", p: "VIKH-tikh" },
    { d: "vielleicht", f: "peut-être", p: "fii-LAÏKHT" },
    { d: "natürlich", f: "bien sûr", p: "na-TUUR-likh" },
    { d: "schlecht", f: "mauvais", p: "CHLÈKHT" },
    { d: "traurig", f: "triste", p: "TRAO-rikh" },
    { d: "sicher", f: "sûr, certain", p: "ZI-kheur" },
    { d: "endlich", f: "enfin", p: "ÈNT-likh" },
    { d: "genug", f: "assez", p: "gue-NOUK" }
  ],
  quiz: [
    { q: "Dans une phrase avec <b>weil</b>, le verbe conjugué se place…", o: ["à la fin de la phrase", "en deuxième position", "juste après weil"], a: 0, why: "Il descend au bout, sans exception. C'est la règle de toutes les subordonnées allemandes." },
    { q: "« Je reste à la maison parce que je suis malade » se dit…", o: ["Ich bleibe zu Hause, weil ich krank bin", "Ich bleibe zu Hause, weil ich bin krank", "Ich bleibe zu Hause, weil bin ich krank"], a: 0, why: "Verbe en deuxième position avant la virgule, verbe à la fin après." },
    { q: "Avec un passé composé après <b>weil</b>, où va l'auxiliaire ?", o: ["tout à la fin, après le participe", "juste après weil", "avant le participe, comme d'habitude"], a: 0, why: "<b>weil ich geschlafen habe</b> : le participe recule, l'auxiliaire finit. C'est l'inverse de l'ordre normal." },
    { q: "Que met-on obligatoirement devant <b>weil</b> ?", o: ["une virgule", "un point", "rien"], a: 0, why: "La virgule est obligatoire, et elle marque l'endroit où la règle du verbe change." },
    { q: "<b>weil</b> répond à quelle question ?", o: ["warum ?", "wann ?", "wo ?", "wer ?"], a: 0, why: "<b>warum</b> = pourquoi. <b>weil</b> introduit la réponse." }
  ],
  drills: [
    { t: "gap", f: "Je reste à la maison parce que je suis malade.", s: "Ich bleibe zu Hause, weil ich krank ___.", a: "bin",
      why: "Le verbe descend à la fin de la subordonnée." },
    { t: "gap", f: "Il ne vient pas parce qu'il n'a pas le temps.", s: "Er kommt nicht, weil er keine Zeit ___.", a: "hat",
      why: "<b>hat</b> ferme la phrase, après son complément." },
    { t: "gap", f: "Je suis fatigué parce que je n'ai pas dormi.", s: "Ich bin müde, weil ich nicht geschlafen ___.", a: "habe",
      why: "Au passé composé, c'est l'AUXILIAIRE qui finit, après le participe." },
    { t: "gap", f: "Elle était triste parce qu'elle était seule.", s: "Sie war traurig, weil sie allein ___.", a: "war",
      why: "<b>war</b> se comporte comme les autres verbes." },
    { t: "gap", f: "J'apprends l'allemand parce que c'est important.", s: "Ich lerne Deutsch, ___ es wichtig ist.", a: "weil",
      why: "<b>weil</b> ouvre la raison, et envoie <b>ist</b> à la fin." },
    { t: "gap", f: "Pourquoi es-tu fatigué ?", s: "___ bist du müde?", a: "Warum",
      why: "<b>warum</b> pose la question à laquelle <b>weil</b> répond." },
    { t: "gap", f: "C'est la raison.", s: "Das ist der ___.", a: "Grund",
      why: "<b>der Grund</b> est masculin. Pluriel <b>die Gründe</b>." },
    { t: "gap", f: "Il est peut-être malade.", s: "___ ist er krank.", a: "Vielleicht",
      why: "<b>vielleicht</b> en tête fait reculer le sujet — le verbe garde sa deuxième place." },

    { t: "order", f: "parce que je suis malade", a: "weil ich krank bin",
      why: "<b>weil</b>, le sujet, le reste, puis le verbe tout au bout." },
    { t: "order", f: "parce qu'il n'a pas le temps", a: "weil er keine Zeit hat",
      why: "Le complément passe avant le verbe, qui finit." },
    { t: "order", f: "parce que je n'ai pas dormi", a: "weil ich nicht geschlafen habe",
      why: "Participe puis auxiliaire : l'ordre s'inverse après <b>weil</b>." },
    { t: "order", f: "parce qu'elle était seule", a: "weil sie allein war",
      why: "<b>war</b> descend comme n'importe quel verbe." },
    { t: "order", f: "parce que c'est important", a: "weil es wichtig ist",
      why: "L'adjectif précède le verbe, qui ferme." },
    { t: "order", f: "parce que nous sommes fatigués", a: "weil wir müde sind",
      why: "<b>sind</b> tout au bout." },

    { t: "trad", f: "parce que", a: "weil",
      why: "Et il envoie le verbe à la fin." },
    { t: "trad", f: "la raison", a: "der Grund",
      why: "Masculin." },
    { t: "trad", f: "important", a: "wichtig",
      why: "Adjectif : pas de terminaison après <b>sein</b>." },
    { t: "trad", f: "peut-être", a: "vielleicht",
      why: "Ne pas confondre avec <b>viel</b> (beaucoup)." },
    { t: "trad", f: "bien sûr", a: "natürlich",
      why: "Littéralement « naturellement »." },
    { t: "trad", f: "assez", a: "genug",
      why: "Se place APRÈS ce qu'il quantifie : <b>Zeit genug</b>." },
    { t: "trad", f: "Je reste à la maison parce que je suis malade.", a: "Ich bleibe zu Hause, weil ich krank bin.",
      why: "Virgule obligatoire, et <b>bin</b> à la fin." },
    { t: "trad", f: "Il ne vient pas parce qu'il n'a pas le temps.", a: "Er kommt nicht, weil er keine Zeit hat.",
      why: "<b>hat</b> ferme la subordonnée." },

    { t: "trans", inst: "Relie les deux phrases avec weil.", from: "Ich bleibe zu Hause. Ich bin krank.", a: "Ich bleibe zu Hause, weil ich krank bin.",
      why: "<b>bin</b> quitte sa deuxième place et descend à la fin." },
    { t: "trans", inst: "Relie les deux phrases avec weil.", from: "Er kommt nicht. Er hat keine Zeit.", a: "Er kommt nicht, weil er keine Zeit hat.",
      why: "<b>hat</b> passe derrière son complément." },
    { t: "trans", inst: "Relie les deux phrases avec weil.", from: "Ich bin müde. Ich habe nicht geschlafen.", a: "Ich bin müde, weil ich nicht geschlafen habe.",
      why: "Les deux morceaux du verbe s'inversent : participe, puis auxiliaire." },
    { t: "trans", inst: "Relie les deux phrases avec weil.", from: "Sie war traurig. Sie war allein.", a: "Sie war traurig, weil sie allein war.",
      why: "Le second <b>war</b> descend à la fin, le premier ne bouge pas." },
    { t: "trans", inst: "Relie les deux phrases avec weil.", from: "Ich lerne Deutsch. Es ist wichtig.", a: "Ich lerne Deutsch, weil es wichtig ist.",
      why: "<b>ist</b> ferme la subordonnée." },
    { t: "trans", inst: "Relie les deux phrases avec weil.", from: "Wir bleiben hier. Wir sind müde.", a: "Wir bleiben hier, weil wir müde sind.",
      why: "<b>sind</b> descend au bout." }
  ]
}
];
