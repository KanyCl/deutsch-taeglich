"use strict";
/* L'APPLICATION — tout le code, sauf les données du cours et les tests.
   Sorti de index.html le 13/08/2026.

   Ce fichier reste gros : le découpage en moteur/ et ecrans/ est l'étape
   suivante (voir TODO.md, section « L'architecture »). Cette première coupe
   est volontairement MÉCANIQUE — elle ne touche aucune fonction. */
/* ===============================================================
   1 bis. LE LIVRE — onglet séparé
   ===============================================================
   Demandé par Exsangue le 01/08/2026 : garder l'app telle quelle, et
   ajouter à côté le livre lui-même — ses dialogues, ses listes, ses
   exercices, son test de fin de niveau.

   ⚠️ CONDITION À NE JAMAIS PERDRE DE VUE. Ce contenu est repris d'un
   ouvrage sous copyright (Werner Dubois & Alvaro Garcia Noble, © 2025).
   Il n'a sa place ici QUE parce que l'app est la copie de travail
   personnelle d'Exsangue sur son propre exemplaire, et que le dépôt est
   PRIVÉ. Si l'app devait être republiée, tout le tableau BOOK et le
   tableau BOOK_TEST doivent en sortir d'abord — le reste de l'app, lui,
   est rédigé indépendamment et peut être publié sans rien retirer.
   C'est exactement pour ça que le livre vit dans son propre onglet et
   dans ses propres tableaux : la frontière doit rester nette. */
/* Le livre a été retiré — son contenu (Werner Dubois et Alvaro Garcia Noble,
   2025) est sous copyright et ne vit que dans la copie de travail personnelle,
   sur le disque. Cette version-ci est en ligne : elle ne contient que du
   contenu rédigé indépendamment.

   Les tableaux restent déclarés mais VIDES, et c'est volontaire : le reste du
   code les interroge par `BOOK.length` et s'adapte tout seul. Les supprimer
   obligerait à retoucher 23 endroits pour un gain nul.

   ⚠️ CE FICHIER S'ÉDITE À LA MAIN. Le bandeau qui vivait ici jusqu'au
   13/08/2026 disait « Généré par sans-livre.ps1 : ne pas modifier à la main ».
   Or `sans-livre.ps1` a été supprimé le 02/08/2026, remplacé par
   `publier.ps1`, qui ne génère plus rien — il copie. La consigne interdisait
   donc de toucher au fichier au nom d'un script qui n'existe plus. C'est le
   §3 du rapport du mentor sous une autre forme : du mort qui donne encore des
   ordres. */
const BOOK = [];
const BOOK_GROUPS = [];
const BOOK_TEST = { pages: "", title: "", exercises: [] };

/* Le niveau A1 du livre compte 35 unités (numérotées 0 à 34, pages 3 à 56).
   Le 30 affiché jusqu'au 01/08/2026 venait du titre commercial du livre
   (« en 30 Jours ») et ne correspondait à rien dans son sommaire. Voir PLAN-A1.md.

   ⚠️ LE LIVRE NE COUVRE QUE LE A1, et le libellé de son onglet est donc écrit
   en dur plus bas. Le niveau A2 ne vient PAS du livre : les photos s'arrêtent à
   la page 62, et le programme du A2 est de toute façon public (CECRL, Goethe).
   Voir PLAN-A2.md. Conséquence utile : le contenu A2 est le nôtre, donc
   publiable — `sans-livre.ps1` n'a rien à en retirer. */
const LIVRE_NIVEAU = "A1";

/* Les niveaux, dans l'ordre. `prevu` est l'objectif du niveau en étapes ; il
   sert à l'accueil, qui annonce « 4 / 28 » DANS le niveau en cours et non sur
   le total des deux. « 4 / 63 » ne dirait rien à personne.
   `premiere` est la première étape du niveau : elle définit ses bornes avec le
   niveau suivant, sans avoir à recopier une liste d'étapes. */
const NIVEAUX = [
  { id: "A1", prevu: 35, premiere: 1  },
  { id: "A2", prevu: 28, premiere: 36 }
];

/* Le niveau d'une étape. Volontairement calculé sur `premiere` plutôt que lu
   dans le chapitre : une étape peut exister avant que son chapitre soit
   déclaré (on écrit l'étape, puis on range), et l'accueil ne doit pas tomber
   en marche pour autant. */
function niveauDe(stepNo) {
  let n = NIVEAUX[0];
  for (let i = 0; i < NIVEAUX.length; i++) {
    if (stepNo >= NIVEAUX[i].premiere) n = NIVEAUX[i];
  }
  return n;
}

/* Les étapes ÉCRITES d'un niveau, et celles qui y sont terminées. C'est ce
   couple que l'accueil affiche. */
function avancementNiveau(niv) {
  const suivant = NIVEAUX[NIVEAUX.indexOf(niv) + 1];
  const fin = suivant ? suivant.premiere - 1 : Infinity;
  const dans = function (n) { return n >= niv.premiere && n <= fin; };
  return {
    faites: S.done.filter(dans).length,
    ecrites: COURSE.filter(function (c) { return dans(c.day); }).length,
    prevu: niv.prevu
  };
}

/* Niveau > Chapitre > Étape.
   Les chapitres regroupent des étapes CONSÉCUTIVES : la progression
   pédagogique est linéaire (on ne peut pas voir l'accusatif avant le
   présent), regrouper par thème obligerait à la casser.
   Le mot « étape » désigne ici une séance de travail. Les écrans qui la
   composent n'ont pas de nom : ils sont simplement numérotés. */
/* Un chapitre par groupe d'unités consécutives du livre. Il s'allonge à
   mesure que les étapes s'écrivent ; on ne déclare que ce qui existe. */
const CHAPTERS = [
  { n: 1, title: "Lire et situer",  steps: [1, 2] },
  { n: 2, title: "Aborder les gens", steps: [3, 4] },
  { n: 3, title: "Nommer les choses", steps: [5, 6, 7] },
  { n: 4, title: "Être et avoir",     steps: [8, 9, 10] },
  { n: 5, title: "Les verbes",        steps: [11, 12] },
  { n: 6, title: "Les cas et le monde", steps: [13, 14, 15] },
  { n: 7, title: "Décrire et raconter", steps: [16, 17, 18] },
  { n: 8, title: "Le temps et la question", steps: [19, 20, 21] },
  { n: 9, title: "Dates, repas, charpente", steps: [22, 23, 24] },
  { n: 10, title: "Vouloir et pouvoir",     steps: [25, 26, 27] },
  { n: 11, title: "Sortir et se déplacer",  steps: [28, 29, 30] },
  { n: 12, title: "Nier, situer, voyager",  steps: [31, 32, 33, 34, 35] },
  /* --- Niveau A2, à partir de l'étape 36. La numérotation des chapitres est
     CONTINUE : le niveau se lit à son étiquette, pas au numéro du chapitre.
     Repartir à 1 ferait deux « chapitre 1 » dans la même liste. --- */
  { n: 13, title: "Raconter ce qui s'est passé", steps: [36, 37, 38, 39] },
  { n: 14, title: "Le corps, la santé, la cause", steps: [40, 41, 42] },
  /* Chapitre 15 COMPLET — « chez soi » (43-44), « ce qu'on en pense » (45).
     Le chapitre 16 s'ouvrira avec l'étape 46. On ne déclare que ce qui existe :
     une étape annoncée mais absente ferait échouer l'auto-test, et il aurait
     raison. */
  { n: 15, title: "Chez soi, et ce qu'on en pense", steps: [43, 44, 45] }
];

/* Le chapitre auquel appartient une étape, et son rang à l'intérieur. */
function chapterOf(stepNo) {
  for (let i = 0; i < CHAPTERS.length; i++) {
    const pos = CHAPTERS[i].steps.indexOf(stepNo);
    if (pos !== -1) return { chapter: CHAPTERS[i], rank: pos + 1 };
  }
  return null;
}

/* ===============================================================
   2. L'ÉTAT
   =============================================================== */
/* v2 depuis le 01/08/2026, et le changement de nom est délibéré.
   Le cours a été refait sur le plan du livre : les 12 anciennes étapes ont
   disparu et les nouvelles ne disent pas la même chose. Or toute la
   progression est repérée par POSITION — « étape 5, exercice 3 » pour
   dseen, qmiss et oral. Relire une sauvegarde de l'ancien cours ne
   donnerait donc pas une progression fausse d'un peu : elle rattacherait
   chaque compteur à un contenu sans rapport. On repart proprement. */
const KEY = "deutsch-taeglich-v2";

/* ---------- LE NIVEAU D'UN MOT ----------
   Refonte du 18/08/2026, spec dans PLAN-ANCRAGE.md.

   AVANT : chaque mot portait une box Leitner 1→5 ET une date `due` calculée
   par un tableau d'intervalles. Deux nombres pour dire une seule chose.

   MAINTENANT : un seul niveau, 0 → 20, et AUCUNE date. Les mots reviennent
   parce que le tirage aléatoire de l'ancrage les ramène, pas parce qu'un
   calendrier arrive à échéance.

   ⚠️ POURQUOI LES DATES SONT PARTIES, et pourquoi il ne faut pas les
   réintroduire « juste pour les cartes » : une date dit « ne repose pas ce
   mot avant le 4 septembre », un tirage aléatoire dit « quand son tour
   vient ». Les deux se contrediront, et ce jour-là RIEN ne le signalera —
   le mot sera simplement posé trop tôt, ou jamais. Pas d'erreur, pas
   d'écran rouge : un calendrier qui ment en silence, sur une app dont la
   révision est le cœur. C'est exactement le défaut qu'on vient de retirer. */
/* ⚠️ ETAT_V EST ICI, ET PAS À CÔTÉ DE `migreVersNiveaux` QUI L'EMPLOIE.
   `let S = load()` (plus bas) appelle `sane()`, qui appelle la migration : une
   constante déclarée après cette ligne serait en ZONE MORTE TEMPORELLE au
   moment où on la lit. Ce n'est pas théorique — c'est le défaut du 02/08/2026,
   celui qui a fait repartir la progression d'Exsangue de zéro pendant que
   2 501 vérifications étaient au vert. Écrit ici la première fois, la faute a
   été rattrapée par le test « la sauvegarde a été relue sans erreur ». */
const ETAT_V    = 2;    // version du format de sauvegarde — voir migreVersNiveaux()
const NIV_MAX   = 20;   // au-delà, le mot est ancré et sort du stock
const ANCRE_A   = 20;   // « ancré définitivement »
const APPRIS_A  = 15;   // compté comme appris sur l'accueil — l'ancien `box >= 4`
const ECRIT_DE_A = 3;   // en dessous, on écrit le français ; à partir de là, l'allemand
const ARTICLE_A  = 5;   // à partir de là, le déterminant est exigé

/* ---------- Les préférences ----------
   Demandées par Exsangue le 01/08/2026, après avoir choisi le design.
   Chaque valeur possible est déclarée ICI, en un seul endroit : l'écran des
   réglages, la validation d'une sauvegarde et l'auto-test lisent tous ces
   mêmes tables. Une liste recopiée à trois endroits finit par diverger.

   ⚠️ Ces tables doivent rester AVANT `let S = load()`. `load` appelle `sane`,
   qui les lit : déclarées plus bas, elles sont encore dans leur zone morte et
   le chargement échoue avant le premier affichage — écran blanc, sans message.
   C'est exactement ce qui est arrivé en écrivant ce bloc. */
const VOIX    = { lente: 0.6, posee: 0.85, normale: 1, vive: 1.2 };
const TEXTE   = { normal: 1, grand: 1.15, enorme: 1.3 };
const SEANCES = { courte: 5, normale: 8, longue: 12 };
const COULEURS = ["bauhaus", "indigo", "prune", "encre"];
const THEMES   = ["auto", "light", "dark"];
const FORMES   = ["carre", "rond"];
const TAILLES  = ["compacte", "normale", "grande"];

/* Les cinq modes de l'accueil, dans leur ordre d'origine. Sert à la fois de
   référence pour valider un ordre enregistré et de source des noms affichés
   dans les réglages — deux listes séparées finiraient par ne plus coïncider. */
const MODES = [
  { id: "lesson", nom: "La leçon" },
  { id: "cards",  nom: "Les cartes" },
  { id: "oral",   nom: "L'oral" },
  { id: "drills", nom: "Les exercices" },
  { id: "quiz",   nom: "Le quiz" }
];
const MODES_IDS = MODES.map(function (m) { return m.id; });

/* ---------- Les couleurs choisies à la main ----------
   Demandé par Exsangue le 02/08/2026 : « je veux pouvoir choisir et designer
   moi-même ». Donc une vraie pastille de couleur, pas une liste de teintes
   toutes prêtes.

   La table dit de QUEL jeton chaque case tire sa couleur quand on n'en a
   choisi aucune. C'est ce détour qui permet aux deux réglages de coexister :
   `couleur` (bauhaus / indigo / prune / encre) continue de repeindre les
   cases restées d'origine, et seules celles qu'Exsangue a touchées lui
   échappent. Enregistrer un hexadécimal pour les cinq d'emblée aurait
   silencieusement débranché l'autre réglage.

   ⚠️ Conséquence à connaître : une couleur choisie à la main ne s'inverse
   PAS en thème sombre. Les jetons de l'app, eux, s'inversent. C'est le prix
   du choix libre, et il est écrit dans l'écran des réglages. La LISIBILITÉ,
   elle, reste garantie : l'encre est recalculée pour chaque teinte. */
const TEINTE_SOURCE = {
  lesson: "--accent", cards: "--amber-bg", oral: "--ink",
  drills: "--surface", quiz: "--accent"
};
/* Le filet de sécurité si le jeton est illisible (valeur non hexadécimale,
   feuille de style pas encore appliquée). Jamais consulté en marche normale. */
const TEINTE_SECOURS = {
  lesson: "#1d4e89", cards: "#f4a300", oral: "#111111",
  drills: "#ffffff", quiz: "#1d4e89"
};

const PREFS_DEFAUT = {
  voix: "posee",       // vitesse de la voix allemande
  theme: "auto",       // auto = on suit le réglage du téléphone
  texte: "normal",     // taille de TOUT le texte (l'échelle est en rem)
  seance: "normale",   // combien d'exercices et de phrases par séance
  couleur: "bauhaus",  // la couleur des cases de l'accueil
  forme: "carre",      // cases rectangulaires ou disques
  taille: "normale",   // hauteur des cases de l'accueil
  ordre: MODES_IDS.slice(),  // l'ordre des cinq modes sur l'accueil
  sonAuto: true,       // le mot se prononce-t-il tout seul à l'affichage
  /* Vide au départ, et c'est le point : une case sans entrée ici suit la
     palette du thème. On n'enregistre que ce qui a été choisi à la main. */
  teintes: {}
};

/* ⚠️ DES RÉGLAGES NEUFS, VRAIMENT NEUFS — signalé par le mentor (§2.1),
   et le symptôme était visible : après « Tout effacer », les couleurs
   personnalisées choisies plus tôt REVENAIENT.

   `Object.assign({}, PREFS_DEFAUT)` est une copie de SURFACE. `ordre` et
   `teintes` restaient donc le même tableau et le même objet que ceux de la
   constante — et `S.prefs.teintes[id] = v` écrivait dans les valeurs par
   défaut. La constante n'en était plus une : elle dérivait au fil de la
   session, et chaque remise à zéro repartait de l'état dérivé.

   Pourquoi ça ne se voyait pas toujours : `sane()` reconstruit `teintes` et
   `ordre` à neuf. Mais QUATRE chemins retournent `fresh()` sans passer par
   `sane()` — première ouverture, stockage bloqué, sauvegarde illisible, et
   « Tout effacer ». C'est exactement là que le défaut vivait. */
function prefsNeuves() {
  const p = Object.assign({}, PREFS_DEFAUT);
  p.ordre = PREFS_DEFAUT.ordre.slice();
  p.teintes = Object.assign({}, PREFS_DEFAUT.teintes);
  return p;
}

/* L'ordre à utiliser, toujours COMPLET et sans doublon, quoi qu'il y ait dans
   la sauvegarde. Un ordre amputé ferait disparaître un mode de l'accueil sans
   aucun message — on ne saurait même pas que « l'oral » existe. On repart donc
   de ce qui est enregistré, on ne garde que les identifiants connus et uniques,
   puis on complète avec les manquants dans leur ordre d'origine. */
function ordreModes() {
  const enregistre = Array.isArray(S.prefs && S.prefs.ordre) ? S.prefs.ordre : [];
  const vus = {};
  const sortie = [];
  enregistre.forEach(function (id) {
    if (MODES_IDS.indexOf(id) !== -1 && !vus[id]) { vus[id] = true; sortie.push(id); }
  });
  MODES_IDS.forEach(function (id) { if (!vus[id]) sortie.push(id); });
  return sortie;
}

/* ⚠️ DÉCLARÉ ICI, avant `let S = load()`, et non près de son mode d'emploi.
   `load` appelle `fresh`, qui remet cette table à zéro. Déclarée plus bas —
   même de deux lignes — elle serait encore en **zone morte temporelle** au
   moment de cet appel, et l'accès lèverait une erreur : écran blanc, sans
   message. Le fichier connaît déjà ce piège pour les tables de réglages ;
   il s'est reproduit ici, et il a fallu deux tentatives pour le placer assez
   haut. Le mode d'emploi complet est près de `reprend`. */
const seanceDe = { cards: 0, practice: 0, ancrage: 0, oral: 0, drills: 0, quiz: 0 };

/* ⚠️ DÉCLARÉ ICI, au-dessus de `load()`, et pour la troisième fois dans ce
   fichier : `sane()` s'en sert, et `load()` appelle `sane()`. Déclaré plus
   bas — il l'était 3 000 lignes plus loin — la constante est en **zone morte
   temporelle** au moment de l'appel, l'accès lève une erreur, et le `catch`
   de `load()` l'avalait en concluant à tort que le stockage était bloqué.
   Résultat pour Exsangue le 02/08/2026 : progression apparemment perdue à
   chaque ouverture, et un message qui accusait son navigateur.
   Toute constante lue par `sane()` doit vivre ici. */
const CHRONO_RECORDS = 5;        // combien de records du contre-la-montre on garde

let storageOK = true;
/* Le texte d'une sauvegarde qu'on n'a PAS su relire. Distinct de
   `storageOK` : un stockage bloqué et une sauvegarde illisible sont deux
   pannes différentes, et les confondre envoie chercher au mauvais endroit. */
let sauveIllisible = null;

let S = load();

function fresh() {
  // qmiss : nombre de fois où chaque question de quiz a été ratée, clé "jour:index".
  // oral  : niveau atteint à l'oreille, clé "v:jour:index" (mot) ou "p:jour:index" (phrase).
  // dseen : nombre de fois où chaque exercice a été servi, clé "jour:index".
  //         C'est lui qui garantit qu'on ne revoit pas les mêmes en boucle.
  // unit  : la dernière unité du livre ouverte dans l'onglet « Le livre ».
  // bookq : le PREMIER verdict de chaque question du livre, 1 juste / 0 faux.
  // prefs : les réglages, voir PREFS_DEFAUT.
  /* ⚠️ Une progression neuve n'a AUCUNE séance en cours. Sans cette ligne,
     les séances survivaient au remplacement de l'état : « Tout effacer »
     rendait la progression vierge, puis rouvrir « les cartes » reprenait la
     séance d'avant — des mots venus d'une progression qui n'existait plus.
     Même chose après avoir restauré une sauvegarde.
     C'est un test des cartes qui l'a révélé, pas un raisonnement : il
     attendait un champ de saisie et tombait sur un écran de correction. */
  oublieSeances();
  // chrono : les records du contre-la-montre, { s: score, c: combo, d: date }.
  // a1     : le test de fin de niveau, { passe, score, total, date } — ou null.
  return { day: 1, done: [], cards: {}, streak: 0, last: null,
           scores: {}, qmiss: {}, oral: {}, dseen: {}, unit: 0, bookq: {},
           chrono: { records: [] }, a1: null,
           prefs: prefsNeuves() };
}

/* Elle ne touche qu'aux MARQUEURS : les paquets eux-mêmes seront remplacés
   au prochain passage, puisque plus aucun ne sera reconnu. */
function oublieSeances() {
  Object.keys(seanceDe).forEach(function (m) { seanceDe[m] = 0; });
}
/* ⚠️ DEUX PANNES DIFFÉRENTES, ET IL FAUT LES SÉPARER.

   La version d'avant enveloppait tout dans un seul `try` : lire le stockage,
   analyser le texte, et le passer à `sane()`. N'importe laquelle des trois
   étapes échouait, et on affichait « ton navigateur bloque le stockage ».

   Le 02/08/2026, c'est `sane()` qui levait une erreur (une constante en zone
   morte temporelle). Le message envoyait donc Exsangue chercher du côté de
   la navigation privée, et l'app repartait d'une progression vierge — que
   la première action venait ensuite ÉCRIRE PAR-DESSUS la vraie. La faute
   n'est pas d'avoir eu un bug : c'est de l'avoir mal nommé, puis d'avoir
   détruit la sauvegarde en croyant bien faire.

   Deux garanties désormais :
     - on distingue « le stockage refuse » de « le texte est illisible » ;
     - un texte qu'on n'a pas su relire est RECOPIÉ AILLEURS avant toute
       chose. Même si l'app repart à zéro, les octets survivent et se
       restaurent depuis les réglages. */
const KEY_SECOURS = KEY + "-secours";

/* La copie de secours laissée par une lecture ratée, s'il y en a une. Elle
   survit à la fermeture de l'app : quelqu'un qui découvre le problème le
   lendemain doit pouvoir récupérer sa progression, pas seulement dans la
   minute qui suit. */
function secoursEnAttente() {
  try { return localStorage.getItem(KEY_SECOURS) || ""; }
  catch (e) { return ""; }
}

function load() {
  let raw = null;
  try {
    raw = localStorage.getItem(KEY);
  } catch (e) {
    // Là, c'est vraiment le stockage : navigation privée, quota, blocage.
    storageOK = false;
    return fresh();
  }
  if (!raw) return fresh();

  try {
    return sane(Object.assign(fresh(), JSON.parse(raw)));
  } catch (e) {
    /* Le stockage marche — c'est le CONTENU qu'on n'a pas su relire. On met
       les octets à l'abri avant de rendre la main, puis on le dit. */
    sauveIllisible = raw;
    try { localStorage.setItem(KEY_SECOURS, raw); } catch (e2) {}
    return fresh();
  }
}

/* Garde-fou : une sauvegarde peut désigner une étape qui n'existe plus.
   C'est arrivé le 01/08/2026 en refaisant le cours sur le plan du livre —
   une progression enregistrée sur 12 étapes, relue par une app qui n'en
   comptait plus que 10, ouvrait COURSE[11] et plantait l'écran d'accueil.
   Le cas se reproduira à chaque remaniement : on borne une fois pour
   toutes, au lieu de compter sur le fait que ça ne rearrivera pas. */
/* ---------- LA MIGRATION box → niv ----------
   Écrite le 18/08/2026 avec la refonte de l'ancrage (PLAN-ANCRAGE.md §3).

   Une progression réelle existe sur l'iPhone d'Exsangue : des mois de travail.
   Elle ne doit RIEN perdre. La conversion :

       niv = (box - 1) × 5      box 1 → 0 · 2 → 5 · 3 → 10 · 4 → 15 · 5 → 20

   Choisie pour deux raisons, pas pour la commodité arithmétique :
     - `box >= 4` valait « appris » et donne `niv >= 15` : le compteur de
       l'accueil affiche le même nombre avant et après la mise à jour, ce qui
       évite la seule chose qu'on ne pourrait pas rattraper — la conviction
       d'avoir perdu sa progression ;
     - la box 5 tombe pile sur 20, donc « ancré ».

   `hit` et `miss` sont RECOPIÉS tels quels : c'est le journal des mots
   fragiles, et rien dans la refonte ne le remplace.

   ⚠️ IDEMPOTENCE — c'est tout l'enjeu, et elle repose sur un détail fragile.
   Le témoin est `s.v`, et `fresh()` NE DOIT PAS LE POSER. La raison est dans
   `load()` : l'état lu vaut `Object.assign(fresh(), JSON.parse(raw))`. Si
   `fresh()` renvoyait `v: 2`, une vieille sauvegarde — qui n'a pas de `v` —
   hériterait du 2 de `fresh()` et passerait pour déjà migrée. La progression
   resterait en box, la migration ne tournerait jamais, et le mot ne serait ni
   appris ni ancré. Silencieusement.

   Donc : pas de `v` dans `fresh()`. Une progression neuve n'a pas de cartes,
   la migrer ne coûte rien, et elle ressort en v2 comme les autres.

   On ne détecte SURTOUT pas « à la volée » (« si la carte a un box… ») : une
   sauvegarde à moitié convertie serait le pire des cas, et c'est exactement
   ce qu'on obtient en migrant carte par carte au fil de la lecture.

   `ETAT_V` est déclaré tout en haut du fichier, avec les autres constantes de
   niveau, et pas ici : `let S = load()` appelle cette fonction, donc une
   constante écrite à cet endroit serait lue avant d'exister. */
function migreVersNiveaux(s) {
  if (Number(s.v) >= ETAT_V) return false;
  const src = (s.cards && typeof s.cards === "object") ? s.cards : {};
  Object.keys(src).forEach(function (id) {
    const c = src[id];
    if (!c || typeof c !== "object") return;
    if (c.niv === undefined) {
      // La box est bornée ICI aussi : on migre des données brutes, pas encore
      // normalisées. Une box absente ou absurde vaut 1, donc niveau 0.
      const box = Math.floor(Number(c.box));
      const sain = (isFinite(box) && box >= 1 && box <= 5) ? box : 1;
      c.niv = (sain - 1) * 5;
    }
    delete c.box;
    delete c.due;
  });
  s.v = ETAT_V;
  return true;
}

function sane(s) {
  const max = COURSE.length;
  if (!(s.day >= 1 && s.day <= max)) s.day = Math.min(Math.max(1, s.day | 0 || 1), max);
  s.done = (Array.isArray(s.done) ? s.done : []).filter(function (n) { return n >= 1 && n <= max; });

  /* ⚠️ LES CARTES — signalé par le mentor (§2.2), et c'est l'objet le plus
     exposé de toute la sauvegarde : c'est LA progression, et le seul chemin
     qui l'écrase entièrement (restaurer un fichier) ne demande aucune
     confirmation.

     Ce qu'une carte abîmée provoque, et pourquoi ça ne se voit pas tout de
     suite : un `niv` non numérique se propage en NaN dans les comparaisons,
     qui répondent alors `false` partout. Le mot n'est plus jamais tiré, ou
     l'est toujours, et il n'est ni appris ni ancré. Rien ne plante, rien ne
     s'affiche en rouge : la progression ment en silence, ce qui est le pire
     des deux mondes pour une app dont la révision est le cœur. Et une entrée
     qui n'est pas un objet fait carrément écran blanc à la première lecture.

     On BORNE plutôt que de jeter : une carte au `niv` fantaisiste garde son
     journal (hit/miss), qui représente du travail réel. Seul ce qui n'a aucun
     sens — une entrée qui n'est pas un objet — disparaît. */
  migreVersNiveaux(s);
  s.cards = (function () {
    const src = (s.cards && typeof s.cards === "object") ? s.cards : {};
    const propre = {};
    const entier = function (v) {
      const n = Math.floor(Number(v));
      return isFinite(n) && n >= 0 ? n : 0;
    };
    Object.keys(src).forEach(function (id) {
      const c = src[id];
      if (!c || typeof c !== "object") return;
      const niv = Math.floor(Number(c.niv));
      propre[id] = {
        niv: (isFinite(niv) && niv >= 0 && niv <= NIV_MAX) ? niv : 0,
        hit: entier(c.hit),
        miss: entier(c.miss)
      };
    });
    return propre;
  })();

  /* Les records du contre-la-montre. Une sauvegarde d'une version antérieure
     n'en a pas, et une sauvegarde abîmée pourrait en avoir de faux : on ne
     garde que des entrées complètes et numériques, sinon le classement
     afficherait « NaN mots ». */
  s.chrono = (s.chrono && typeof s.chrono === "object") ? s.chrono : {};
  s.chrono.records = (Array.isArray(s.chrono.records) ? s.chrono.records : [])
    .filter(function (r) {
      return r && typeof r === "object" &&
             typeof r.s === "number" && isFinite(r.s) && r.s >= 0 &&
             typeof r.c === "number" && isFinite(r.c) && r.c >= 0;
    })
    .sort(function (a, b) { return b.s - a.s; })
    .slice(0, CHRONO_RECORDS);

  /* Le test A1. Un résultat incomplet ou fantaisiste ferait afficher
     « validé le undefined avec NaN / NaN » : on préfère l'oublier. */
  if (!(s.a1 && typeof s.a1 === "object" &&
        typeof s.a1.score === "number" && isFinite(s.a1.score) &&
        typeof s.a1.total === "number" && s.a1.total > 0 &&
        typeof s.a1.date === "string" && s.a1.date)) {
    s.a1 = null;
  }

  /* Les réglages subissent le même traitement que l'étape : une sauvegarde
     peut venir d'une version qui n'avait pas encore ce réglage, ou en proposer
     un qui n'existe plus. Toute valeur inconnue retombe sur son défaut plutôt
     que de se propager — un `texte: "gigantesque"` rendrait l'app illisible
     sans qu'on sache d'où ça vient. */
  const p = Object.assign({}, PREFS_DEFAUT, s.prefs && typeof s.prefs === "object" ? s.prefs : {});
  if (!VOIX[p.voix])   p.voix = PREFS_DEFAUT.voix;
  if (!TEXTE[p.texte]) p.texte = PREFS_DEFAUT.texte;
  if (!SEANCES[p.seance]) p.seance = PREFS_DEFAUT.seance;
  if (COULEURS.indexOf(p.couleur) === -1) p.couleur = PREFS_DEFAUT.couleur;
  if (THEMES.indexOf(p.theme) === -1) p.theme = PREFS_DEFAUT.theme;
  if (FORMES.indexOf(p.forme) === -1) p.forme = PREFS_DEFAUT.forme;
  if (TAILLES.indexOf(p.taille) === -1) p.taille = PREFS_DEFAUT.taille;

  /* Les teintes choisies à la main. On ne garde que ce qui est à la fois un
     mode connu ET un hexadécimal complet : une valeur inventée irait droit
     dans un `style` et donnerait une case sans couleur du tout, donc du
     texte sur du vide. Ce qui est écarté RETOMBE sur la palette du thème,
     qui est toujours lisible — jamais sur du blanc. */
  p.teintes = (function () {
    const src = (p.teintes && typeof p.teintes === "object") ? p.teintes : {};
    const propre = {};
    MODES_IDS.forEach(function (id) {
      const v = String(src[id] || "").trim().toLowerCase();
      if (/^#[0-9a-f]{6}$/.test(v)) propre[id] = v;
    });
    return propre;
  })();
  // L'ordre est remis d'aplomb par `ordreModes`, mais on le range aussi ici :
  // ce qui est enregistré doit être valide, pas seulement ce qui est affiché.
  s.prefs = p;
  p.ordre = (function () {
    const vus = {}, sortie = [];
    (Array.isArray(p.ordre) ? p.ordre : []).forEach(function (id) {
      if (MODES_IDS.indexOf(id) !== -1 && !vus[id]) { vus[id] = true; sortie.push(id); }
    });
    MODES_IDS.forEach(function (id) { if (!vus[id]) sortie.push(id); });
    return sortie;
  })();
  p.sonAuto = p.sonAuto !== false;
  s.prefs = p;
  return s;
}

/* Rend les réglages effectifs. Appelée au démarrage et à chaque changement.
   Tout passe par la racine du document : les composants n'ont donc RIEN à
   savoir des préférences, ils continuent de lire leurs jetons habituels. */
/* ---------- Lisibilité d'une couleur choisie à la main ----------
   Le garde-fou promis à Exsangue : quelle que soit la teinte qu'il pose, le
   texte reste lisible dessus. Ce n'est pas un confort, c'est ce qui rend le
   choix libre acceptable — sans lui, un jaune clair effacerait le nom de la
   case et il faudrait deviner sur quoi on appuie.

   La formule est celle du WCAG : on linéarise chaque canal, on en tire la
   luminance relative, puis on compare le contraste obtenu avec du noir et
   avec du blanc, et on garde le meilleur. Un simple seuil sur la moyenne des
   canaux se trompe sur les couleurs saturées — un bleu vif et un jaune vif
   ont la même moyenne et appellent des encres opposées. */
function luminance(hex) {
  const c = String(hex).replace("#", "");
  const canal = function (i) {
    const v = parseInt(c.substr(i, 2), 16) / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * canal(0) + 0.7152 * canal(2) + 0.0722 * canal(4);
}
/* ⚠️ Noir PUR et blanc PUR, et non l'encre `#111` du reste de l'app. Ce
   n'est pas un détail de goût, c'est ce qui rend la promesse tenable :

   le pire cas est le gris moyen, où le noir et le blanc contrastent aussi
   mal l'un que l'autre. Avec du noir pur, ce minimum vaut 4,58 pour 1 —
   au-dessus du seuil lisible du WCAG (4,5). Avec `#111`, il tombe à 4,16 :
   sous le seuil. Autrement dit, `#111` laissait exister des teintes sur
   lesquelles le nom de la case devenait pénible à lire, quelle que soit
   l'encre choisie. L'auto-test l'a attrapé sur `#767676`. */
function encrePour(hex) {
  const L = luminance(hex);
  const avecNoir  = (L + 0.05) / 0.05;
  const avecBlanc = 1.05 / (L + 0.05);
  return avecNoir >= avecBlanc ? "#000000" : "#ffffff";
}

/* La couleur EFFECTIVE d'une case : celle choisie à la main si elle existe,
   sinon celle que le thème lui donne. On lit le jeton dans la feuille de
   style plutôt que de recopier sa valeur ici — sans quoi la pastille
   afficherait le bleu Bauhaus alors que la case serait prune. */
function teinteDe(id) {
  const perso = S.prefs.teintes && S.prefs.teintes[id];
  if (perso) return perso;
  let v = "";
  try {
    v = getComputedStyle(document.documentElement)
          .getPropertyValue(TEINTE_SOURCE[id] || "").trim().toLowerCase();
  } catch (e) { v = ""; }
  return /^#[0-9a-f]{6}$/.test(v) ? v : (TEINTE_SECOURS[id] || "#1d4e89");
}

function applyPrefs() {
  const p = S.prefs;
  const root = document.documentElement;

  /* « auto » = pas d'attribut du tout, on laisse la media query du téléphone
     décider. Poser data-theme="auto" gagnerait sur elle et figerait le clair.

     ⚠️ Mais on ne retire QUE ce qu'on a posé soi-même. `data-theme` n'est pas
     notre canal privé : le harnais de capture l'injecte avant l'affichage pour
     photographier le thème sombre, et un hôte peut faire de même. La première
     version retirait l'attribut sans condition — elle a rendu toutes les
     captures sombres identiques aux claires, ce qui l'a trahie. */
  if (p.theme === "auto") {
    if (root.getAttribute("data-theme-par") === "app") {
      root.removeAttribute("data-theme");
      root.removeAttribute("data-theme-par");
    }
  } else {
    root.setAttribute("data-theme", p.theme);
    root.setAttribute("data-theme-par", "app");
  }

  root.setAttribute("data-couleur", p.couleur);

  // L'échelle du texte agit sur la RACINE, pas sur le corps : toute l'app est
  // dimensionnée en rem, donc les marges et les boutons grandissent avec les
  // lettres. Agrandir le seul corps donnerait de grosses lettres dans des
  // boutons restés petits.
  root.style.setProperty("--zoom", TEXTE[p.texte]);

  /* Les teintes choisies à la main. On pose UNIQUEMENT celles qui existent,
     et on retire les autres : la feuille de style prévoit un repli
     (`var(--c-lesson, var(--accent))`), donc une variable absente vaut
     « suis le thème ». Poser la couleur du thème ici la figerait, et
     changer de palette n'aurait plus d'effet sur cette case.
     `--ct-…` est l'encre calculée : jamais choisie, toujours déduite. */
  MODES_IDS.forEach(function (id) {
    const perso = p.teintes && p.teintes[id];
    if (perso) {
      root.style.setProperty("--c-" + id, perso);
      root.style.setProperty("--ct-" + id, encrePour(perso));
    } else {
      root.style.removeProperty("--c-" + id);
      root.style.removeProperty("--ct-" + id);
    }
  });
  /* L'entraînement libre partage la case des cartes : il prend donc la même
     couleur. Le déclarer à part dans les réglages laisserait croire à un
     sixième mode, alors que c'est le même bouton qui change de rôle. */
  if (p.teintes && p.teintes.cards) {
    root.style.setProperty("--c-practice", p.teintes.cards);
    root.style.setProperty("--ct-practice", encrePour(p.teintes.cards));
  } else {
    root.style.removeProperty("--c-practice");
    root.style.removeProperty("--ct-practice");
  }

  DRILL_SESSION = SEANCES[p.seance];
  ORAL_SIZE = SEANCES[p.seance];
}

function persist() {
  try { localStorage.setItem(KEY, JSON.stringify(S)); }
  catch (e) { storageOK = false; }
}

function today() {
  const d = new Date();
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}
function shift(iso, days) {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(y, m - 1, d + days);
  return dt.getFullYear() + "-" + String(dt.getMonth() + 1).padStart(2, "0") + "-" + String(dt.getDate()).padStart(2, "0");
}
/* Une date ISO qui EXISTE. Une simple expression régulière laisserait passer
   `2026-02-31` — que `shift()` transformerait silencieusement en 3 mars. Une
   carte due un jour qui n'existe pas, c'est un calendrier qui a glissé sans
   que rien ne le dise. On reconstruit donc la date et on vérifie qu'elle est
   revenue identique. */
function dateValide(v) {
  if (typeof v !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(v)) return false;
  const [y, m, d] = v.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  return dt.getFullYear() === y && dt.getMonth() === m - 1 && dt.getDate() === d;
}

function touchStreak() {
  const t = today();
  if (S.last === t) return;
  S.streak = (S.last === shift(t, -1)) ? S.streak + 1 : 1;
  S.last = t;
  persist();
  paintStreak();
}

/* Fait entrer le vocabulaire d une etape dans le paquet de cartes.

   ⚠️ UN SEUL ENDROIT L APPELLE HORS DES TESTS : renderQuestion(), au moment
   ou le quiz est VALIDE. La regle a change le 18/08/2026 a la demande
   d Exsangue, et elle s est DURCIE : avant, seed() partait de lessonView(),
   donc ouvrir une etape et la refermer aussitot suffisait a mettre ses mots
   dans le paquet. Un mot survole n est pas un mot appris. Desormais il faut
   avoir fini la lecon. Consequence assumee et voulue : qui n a pas termine la
   lecon 1 n a aucun mot, et l ancrage lui est vide.

   ⚠️ NE PAS CONFONDRE AVEC LE DEFAUT DU 11/08/2026 — c est le meme fichier, le
   meme voisinage, et l erreur serait naturelle. Ce defaut-la etait de semer la
   lecon SUIVANTE (`seed(S.day)` apres que S.day a ete incremente) : des mots
   jamais presentes tombaient dans le paquet, on les ratait tous. Semer l etape
   qu on vient de FINIR est l inverse exact. Voir la note sur place. */
function seed(dayNo) {
  const lesson = COURSE[dayNo - 1];
  if (!lesson) return;
  let added = false;
  lesson.vocab.forEach(function (v, i) {
    const id = dayNo + ":" + i;
    if (!S.cards[id]) { S.cards[id] = { niv: 0, hit: 0, miss: 0 }; added = true; }
  });
  if (added) persist();
}

/* Retire du paquet les cartes semees par l ancien defaut : celles d etapes
   situees APRES la derniere etape validee et sur lesquelles on n a JAMAIS
   travaille (ni reussite ni echec). Tout ce qui porte une trace de travail est
   garde, quelle que soit son etape — on ne jette pas l historique de quelqu un.
   Tourne une fois au demarrage ; les mots reviendront d eux-memes a l ouverture
   de leur lecon. Renvoie le nombre de cartes retirees. */
function nettoieCartesJamaisVues() {
  const faites = (S.done || []).filter(function (n) { return typeof n === "number"; });
  const limite = faites.length ? Math.max.apply(null, faites) : 0;
  let retirees = 0;
  Object.keys(S.cards).forEach(function (id) {
    const etape = Number(id.split(":")[0]);
    const c = S.cards[id] || {};
    if (etape > limite && !(c.hit || 0) && !(c.miss || 0)) { delete S.cards[id]; retirees++; }
  });
  if (retirees) persist();
  return retirees;
}

/* Fragilité d'un mot, entre 0 (toujours su) et 1 (toujours raté).
   Un mot jamais révisé vaut 0.5 : il mérite plus d'attention qu'un mot
   toujours réussi, mais moins qu'un mot réellement raté. */
function weakness(id) {
  const c = S.cards[id] || {};
  const hit = c.hit || 0, miss = c.miss || 0;
  if (hit + miss === 0) return 0.5;
  return miss / (hit + miss);
}
function cardById(id) {
  const parts = id.split(":").map(Number);
  const lesson = COURSE[parts[0] - 1];
  if (!lesson || !lesson.vocab[parts[1]]) return null;
  return Object.assign({ id: id, day: parts[0] }, lesson.vocab[parts[1]]);
}
/* Les cartes de la LEÇON, dans un ordre différent à chaque séance.

   Remplace `dueCards()` le 18/08/2026. Il n'y a plus de calendrier : le paquet
   n'est plus « ce qui est dû aujourd'hui » mais « les mots de la leçon qu'on
   vient de terminer ». Le reste du vocabulaire est le travail de l'ancrage,
   plus celui des cartes — c'est toute la séparation de PLAN-ANCRAGE.md §1.

   ⚠️ « LA LEÇON EN COURS » A DEUX SENS, ET IL FAUT LES DEUX. Posé par
   Exsangue le 18/08/2026 : les cartes montrent les mots de la leçon en cours,
   uniquement. Sauf que `S.day` seul ne suffit pas à le dire.

     - Parcours normal. Valider le quiz sème les mots ET avance `S.day` à
       l'étape suivante. Viser `S.day` donnerait donc TOUJOURS un paquet vide,
       puisque la leçon suivante n'est pas encore faite. Et le piège est
       muet : un écran de cartes vide ressemble à « rien à réviser ».
     - Rejeu d'une vieille étape. Choisir l'étape 10 sur le chemin fait
       `S.day = 10` (voir `data-step`). Là, « en cours » veut bien dire 10 —
       et remonter à la dernière étape finie servirait les mots de la 46,
       alors qu'on vient d'ouvrir la 10.

   D'où la règle : `S.day` s'il a des cartes, sinon l'étape la plus récente
   qui en a. Les deux lectures tombent juste, et aucune ne rend l'écran vide
   par construction.

   L'étape de repli se lit dans LES CARTES, pas dans `S.done` : un mot n'entre
   qu'au quiz validé, donc la carte la plus récente vient forcément de la
   dernière étape finie. Une seule source de vérité au lieu de deux qui
   finiraient par diverger — et sur une sauvegarde d'avant le 18/08/2026, où
   les mots entraient à l'ouverture, c'est la plus juste des deux : elle montre
   les mots qu'on a vraiment. */
function etapeAdesCartes(n) {
  return Object.keys(S.cards).some(function (id) {
    return Number(id.split(":")[0]) === n;
  });
}
function etapeDesCartes() {
  if (etapeAdesCartes(S.day)) return S.day;
  let max = 0;
  Object.keys(S.cards).forEach(function (id) {
    const etape = Number(id.split(":")[0]);
    if (isFinite(etape) && etape > max) max = etape;
  });
  return max;
}
function cartesLecon() {
  const etape = etapeDesCartes();
  if (!etape) return [];
  const ids = Object.keys(S.cards).filter(function (id) {
    return Number(id.split(":")[0]) === etape && cardById(id);
  });
  return shuffleIdx(ids.length).map(function (i) { return cardById(ids[i]); });
}

/* L'entraînement libre : réviser quand rien n'est dû, sans attendre demain.
   Les mots les plus ratés d'abord, mais tirés dans un vivier deux fois plus
   grand que nécessaire — sinon deux entraînements de suite donneraient
   exactement la même liste. */
function practiceCards(n) {
  const ids = Object.keys(S.cards).filter(function (id) { return !!cardById(id); });
  if (!ids.length) return [];
  ids.sort(function (a, b) { return weakness(b) - weakness(a); });

  // La moitié la plus fragile est TOUJOURS reprise — c'est le but de
  // l'entraînement. L'autre moitié est tirée dans un vivier plus large, pour
  // que deux séances de suite ne donnent pas exactement la même liste.
  const keep = Math.min(ids.length, Math.ceil(n / 2));
  const head = ids.slice(0, keep);
  const want = Math.min(n, ids.length) - keep;
  const rest = ids.slice(keep, keep + want * 2);
  const extra = shuffleIdx(rest.length).slice(0, want).map(function (i) { return rest[i]; });

  const chosen = head.concat(extra);
  return shuffleIdx(chosen.length).map(function (i) { return cardById(chosen[i]); });
}

/* schedule === false : on note la réponse sans toucher au niveau.
   C'est le mode entraînement — réviser en avance ne doit pas faire avancer
   la progression, sinon on pourrait ancrer un mot en le répétant d'affilée. */
function grade(id, ok, schedule) {
  const c = S.cards[id];
  if (!c) return;
  // Le journal, lui, compte toujours : c'est lui qui repère les mots fragiles.
  if (ok) c.hit = (c.hit || 0) + 1;
  else    c.miss = (c.miss || 0) + 1;
  if (schedule !== false) {
    /* Un cran de plus, un cran de moins. Jamais la chute complète — perdre
       des semaines de travail sur un mot hésitant décourage plus que ça
       n'apprend. Le niveau est le MÊME compteur pour les cartes de la leçon
       et pour l'ancrage : c'est tout l'objet de la refonte, deux nombres pour
       le même mot finissant toujours par se contredire. */
    c.niv = ok ? Math.min(NIV_MAX, c.niv + 1) : Math.max(0, c.niv - 1);
  }
  persist();
}
/* « niveau 3 → 4 », montré avec la correction. Demandé par Exsangue le
   18/08/2026 : savoir ce que la réponse vient de coûter ou de rapporter, au
   moment où on la lit.

   ⚠️ ON CALCULE L'ARRIVÉE, ON NE LA LIT PAS. Le niveau ne bouge qu'au
   « Continuer » — `grade` est appelé par `advanceCard`, pas à la
   vérification — donc au moment où cette ligne s'affiche, la carte porte
   encore son ancien niveau. Lire `c.niv` deux fois afficherait « 3 → 3 ».
   Le calcul doit rester le MÊME que celui de `grade`, bornes comprises.

   Trois cas se disent différemment, et les confondre serait mentir :
     - l'entraînement libre ne touche à rien : on n'annonce aucun mouvement ;
     - au plafond comme au plancher, le niveau ne bouge pas non plus, et
       prétendre le contraire ferait attendre une progression qui n'arrive
       jamais ;
     - atteindre 20 est l'événement du parcours : il se dit en toutes lettres. */
function transitionNiveau(id, ok) {
  if (training) return "";
  const c = S.cards[id];
  if (!c) return "";
  const de = c.niv;
  const vers = ok ? Math.min(NIV_MAX, de + 1) : Math.max(0, de - 1);

  if (vers === de) {
    return '<div class="niv-move">niveau ' + de + '/' + NIV_MAX +
      (de >= ANCRE_A ? ' &#183; ancré' : ' &#183; déjà au plus bas') + '</div>';
  }
  return '<div class="niv-move' + (ok ? ' up' : ' down') + '">niveau ' +
    de + ' &#8594; <b>' + vers + '</b>' +
    (vers >= ANCRE_A ? ' &#183; ancré' : '') + '</div>';
}

function learnedCount() {
  return Object.keys(S.cards).filter(function (id) { return S.cards[id].niv >= APPRIS_A; }).length;
}
/* Les mots ancrés : sortis du stock de l'ancrage, acquis pour de bon. */
function ancreCount() {
  return Object.keys(S.cards).filter(function (id) { return S.cards[id].niv >= ANCRE_A; }).length;
}
/* Mots réellement fragiles : ratés au moins une fois, et au moins une fois
   sur trois. C'est ce chiffre qui dit sur quoi il reste du travail. */
function shakyCount() {
  return Object.keys(S.cards).filter(function (id) {
    return (S.cards[id].miss || 0) > 0 && weakness(id) >= 1 / 3;
  }).length;
}

/* ===============================================================
   3. LA VOIX — prononciation par le navigateur, sans fichier audio
   Les boutons restent masqués tant qu'aucune voix allemande n'est
   installée sur l'appareil : mieux vaut rien qu'un bouton muet.
   =============================================================== */
const TTS = { voice: null };

function initTTS() {
  if (!("speechSynthesis" in window)) return;
  function pick() {
    let list = [];
    try { list = window.speechSynthesis.getVoices() || []; } catch (e) { return; }
    TTS.voice = list.filter(function (v) { return /^de/i.test(v.lang); })[0] || null;
    document.body.classList.toggle("has-tts", !!TTS.voice);
  }
  pick();
  try { window.speechSynthesis.addEventListener("voiceschanged", pick); } catch (e) {}
}

function speak(text) {
  if (!TTS.voice || !("speechSynthesis" in window)) return;
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.voice = TTS.voice;
    u.lang = TTS.voice.lang;
    u.rate = debit();
    window.speechSynthesis.speak(u);
  } catch (e) {}
}

/* La vitesse de la voix, réglable depuis le 01/08/2026. Elle était figée à
   0,85 à deux endroits — la lecture d'un mot et celle d'un dialogue — et les
   deux auraient fini par diverger. Une seule source.
   La valeur de repli sert au cas où l'état ne serait pas encore chargé. */
function debit() {
  return (S && S.prefs && VOIX[S.prefs.voix]) || VOIX.posee;
}

/* ---------------------------------------------------------------
   Lire un dialogue d'un bout à l'autre
   ---------------------------------------------------------------
   Demandé par Exsangue : « que les dialogues se lisent à la suite sans
   devoir appuyer sur chacun ». Cliquer dix fois pour écouter une
   conversation, ce n'est pas écouter une conversation.

   On enchaîne sur l'événement `onend` de chaque réplique plutôt que sur
   un minuteur : la durée d'une phrase dépend de la voix de l'appareil, et
   un délai fixe couperait les longues ou laisserait des blancs.
   `onerror` relance aussi — si une réplique échoue, la lecture continue
   au lieu de s'arrêter net au milieu.

   La pause de 400 ms entre deux répliques n'est pas cosmétique : sans
   elle, les deux voix se collent et on ne distingue plus qui parle. */
let lecture = null;

function stopLecture() {
  if (lecture) lecture.stop = true;
  lecture = null;
  try { window.speechSynthesis.cancel(); } catch (e) {}
  const b = view.querySelector("[data-play]");
  if (b) b.textContent = "▶ Écouter tout le dialogue";
  Array.prototype.forEach.call(view.querySelectorAll(".saying"), function (el) {
    el.classList.remove("saying");
  });
}

function playDialogue(lignes) {
  stopLecture();
  if (!TTS.voice || !("speechSynthesis" in window)) return false;

  const etat = { i: 0, stop: false };
  lecture = etat;
  const b = view.querySelector("[data-play]");
  if (b) b.textContent = "■ Arrêter";

  function suivant() {
    if (etat.stop) return;
    if (etat.i >= lignes.length) { stopLecture(); return; }

    const idx = etat.i++;
    Array.prototype.forEach.call(view.querySelectorAll(".saying"), function (el) {
      el.classList.remove("saying");
    });
    const carte = view.querySelector('[data-line="' + idx + '"]');
    if (carte) {
      carte.classList.add("saying");
      // La réplique en cours doit rester visible sans qu'on ait à suivre
      // l'écran du doigt.
      try { carte.scrollIntoView({ block: "center", behavior: "smooth" }); } catch (e) {}
    }

    try {
      const u = new SpeechSynthesisUtterance(lignes[idx]);
      u.voice = TTS.voice;
      u.lang = TTS.voice.lang;
      u.rate = debit();
      u.onend   = function () { if (!etat.stop) setTimeout(suivant, 400); };
      u.onerror = function () { if (!etat.stop) setTimeout(suivant, 400); };
      window.speechSynthesis.speak(u);
    } catch (e) { setTimeout(suivant, 400); }
  }

  suivant();
  return true;
}

/* ===============================================================
   4. RENDU
   =============================================================== */
const view = document.getElementById("view");
const streakEl = document.getElementById("streak");

function esc(s) {
  return String(s).replace(/[<>&]/g, function (c) { return { "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c]; });
}

/* ---------- Le SEUL rendu autorise pour le contenu du cours ----------

   Defaut signale par Exsangue le 11/08/2026 : « Le corps se dit <b>der Körper</b> »
   s affichait tel quel a l ecran. La cause n etait pas une etourderie mais une
   absence de regle : idea passait par esc(), detail non ; check.q par esc(),
   quiz.q non. Deux champs voisins, deux traitements, aucune decision ecrite.

   La decision, maintenant ecrite : le contenu emploie un balisage MINUSCULE et
   volontaire — <b> pour faire ressortir le mot allemand dans une phrase francaise
   (2802 emplois), <i>, <u>, et trois entites. Tout le reste doit s afficher tel quel.

   L ordre compte : on echappe TOUT, PUIS on reautorise cette liste. L inverse
   laisserait passer ce qu on veut precisement neutraliser.

   ⚠️ Aucun champ de contenu ne doit etre concatene sans passer par ici. Une
   verification balaie tout le cours et refuse toute balise hors de cette liste. */
const RICHE_BALISES = ["b", "i", "u"];
const RICHE_ENTITES = { "rarr": "→", "mdash": "—", "#9888": "⚠", "middot": "·", "hellip": "…", "nbsp": " " };
function rich(s) {
  let out = esc(s == null ? "" : s);
  RICHE_BALISES.forEach(function (t) {
    out = out.split("&lt;" + t + "&gt;").join("<" + t + ">");
    out = out.split("&lt;/" + t + "&gt;").join("</" + t + ">");
  });
  Object.keys(RICHE_ENTITES).forEach(function (nom) {
    out = out.split("&amp;" + nom + ";").join(RICHE_ENTITES[nom]);
  });
  return out;
}
function att(s) {
  return esc(s).replace(/"/g, "&quot;");
}

/* ===============================================================
   LA LANGUE DU TEXTE ALLEMAND — `lang="de"`
   ===============================================================
   Signalé par le mentor d'Exsangue le 11/08/2026, et c'était le point
   d'accessibilité le plus lourd de son rapport : la page est déclarée
   `lang="fr"` (elle a raison, l'interface est en français), donc un lecteur
   d'écran prononçait *der Körper* avec une voix française. Sur une app
   d'apprentissage des langues, c'est le défaut qui coûte le plus cher.

   ⚠️ D'OÙ VIENT LA LISTE DES ÉLÉMENTS ALLEMANDS : DE LA FEUILLE DE STYLE.
   L'app marque déjà l'allemand visuellement, par la police `var(--de)`.
   Recopier ces sélecteurs dans une constante JavaScript aurait créé une
   seconde source de vérité, et le projet a déjà payé deux fois pour savoir
   que deux sources décrivant la même chose finissent par se contredire (le
   badge de l'en-tête, l'écran de fin du test A1). Ici, une règle CSS neuve
   qui porte la police allemande est marquée toute seule, sans que personne
   ait à y penser.

   L'EXCEPTION, et elle est réelle : `.answer`, le champ de saisie. Il porte
   la police allemande dans TOUS les exercices, y compris ceux qui attendent
   une réponse en FRANÇAIS. Sa langue dépend de la question posée, pas de son
   style — elle est donc décidée à la source, dans `saisieAttrs`. */
const SANS_LANGUE = [".answer"];
let selDE = null;

function selecteursAllemands() {
  if (selDE !== null) return selDE;
  const pris = [];
  for (let i = 0; i < document.styleSheets.length; i++) {
    let regles;
    /* Une feuille venue d'ailleurs lève une exception à la lecture. Il n'y en
       a aucune ici — zéro dépendance — mais on ne veut pas qu'une extension
       de navigateur puisse tuer l'affichage. */
    try { regles = document.styleSheets[i].cssRules; } catch (e) { continue; }
    for (let j = 0; j < regles.length; j++) {
      const r = regles[j];
      if (!r.style || !r.selectorText) continue;
      if (r.style.fontFamily !== "var(--de)") continue;
      if (SANS_LANGUE.indexOf(r.selectorText) >= 0) continue;
      pris.push(r.selectorText);
    }
  }
  selDE = pris.join(", ");
  return selDE;
}

/* Pose `lang="de"` sur tout ce qui, dans `racine`, porte la police allemande.
   Appelée après CHAQUE injection de HTML — un écran reconstruit repart d'un
   DOM neuf, et l'attribut ne survit pas à `innerHTML`. */
function marqueAllemand(racine) {
  const sel = selecteursAllemands();
  if (!sel || !racine) return;
  if (racine.matches && racine.matches(sel)) racine.lang = "de";
  const trouves = racine.querySelectorAll(sel);
  for (let i = 0; i < trouves.length; i++) trouves[i].lang = "de";
}
function sayBtn(text) {
  return '<button class="say" data-say="' + att(text) + '" aria-label="Écouter">&#9654;</button>';
}

/* Les attributs communs à TOUT champ de saisie de l'app — cartes, oral,
   exercices, questions du livre. Ils étaient recopiés à cinq endroits ; une
   correction sur quatre d'entre eux serait passée inaperçue.

   Demande d'Exsangue le 02/08/2026 : « le remplissage automatique me propose
   de remplir avec mon adresse quand on parle de Straße, et avec mon nom ».
   Ce qui se joue, et pourquoi la version d'avant ne suffisait pas :

     - `autocomplete="off"` est LU par Safari, puis IGNORÉ dès qu'il croit
       reconnaître un champ d'adresse ou de nom. En revanche une valeur
       qu'il ne connaît pas le fait retomber sur le comportement « off ».
       D'où le jeton bidon plutôt que le mot `off`.
     - Le `name` sert de crochet aux valeurs déjà enregistrées. Un nom
       différent à chaque affichage n'accroche rien.
     - `data-lpignore` / `data-form-type` visent les gestionnaires de mots de
       passe (LastPass, Dashlane, 1Password), qui ont leurs propres règles.

   Honnêteté sur la limite : la barre de suggestions d'iOS relève du clavier,
   pas de la page. Aucun attribut HTML ne la fait taire. Ce qu'on supprime
   ici, c'est le bandeau « Remplissage automatique » et ses propositions de
   contact — pas les prédictions de mots. */
let nSaisie = 0;
/* `enAllemand` : ce que le champ ATTEND, pas ce qu'il affiche. Le style ne
   peut pas le dire — `.answer` porte la police allemande même quand la
   réponse demandée est en français. Sans ce paramètre, un lecteur d'écran
   relirait « la sœur » avec une voix allemande. */
function saisieAttrs(label, enAllemand) {
  nSaisie++;
  return (enAllemand ? ' lang="de"' : "") +
    ' type="text" enterkeyhint="done"' +
    ' name="rep-' + nSaisie + '-' + Math.random().toString(36).slice(2, 8) + '"' +
    ' autocomplete="rien-a-remplir"' +
    ' autocorrect="off" autocapitalize="off" spellcheck="false"' +
    ' data-lpignore="true" data-form-type="other"' +
    ' aria-label="' + att(label) + '"';
}
function paintStreak() {
  if (S.streak > 0) {
    streakEl.hidden = false;
    streakEl.textContent = S.streak + (S.streak > 1 ? " jours d'affilée" : " jour");
  } else {
    streakEl.hidden = true;
  }
}
/* `show` sert à DEUX choses très différentes, et les confondre était le
   défaut signalé par Exsangue le 02/08/2026 — « dès que je fais une action ça
   me remet en haut de la page, ça rend fou » :

     - CHANGER d'écran : remonter en haut est juste, on arrive sur autre chose.
     - REDESSINER le même écran après une action (valider une réponse, cocher
       un mot, choisir un réglage) : remonter est absurde. On était en bas de
       la page, on y regardait quelque chose, et on se retrouve projeté en
       haut à chaque clic.

   La position est donc CONSERVÉE par défaut, et on ne remonte que si on le
   demande explicitement — ce que fait `go`, qui est le seul vrai changement
   d'écran. Le défaut inverse (tout conserver) serait moins grave : on peut
   toujours remonter à la main, alors qu'on ne peut pas annuler un saut. */
/* ⚠️ QUAND ENREGISTRER LE SERVICE WORKER — §4 du rapport du mentor.

   Sorti en fonction pour une raison précise : c'est la SEULE partie du
   hors-ligne qu'on puisse vraiment vérifier ici. Un service worker ne
   s'installe qu'en `https:` (ou sur `localhost`), et l'auto-test ouvre la page
   en `file://` — le tester pour de bon demanderait un serveur qu'on n'a pas.
   La décision, elle, se teste avec de faux `location` et `navigator`.

   Et c'est bien la décision qui est dangereuse : une inscription tentée en
   `file://` lève une exception au démarrage, donc pendant l'auto-test, donc
   très loin de sa cause apparente. */
function doitEnregistrerSW(loc, nav) {
  if (!loc || !nav || !("serviceWorker" in nav)) return false;
  if (loc.protocol === "https:") return true;
  /* `http:` ne vaut que sur la machine elle-même : ailleurs le navigateur
     refuse, et prétendre le contraire ferait échouer une inscription qu'on
     annonçait possible. */
  return loc.protocol === "http:" &&
         (loc.hostname === "localhost" || loc.hostname === "127.0.0.1");
}

/* ⚠️ CE QUE L'APP DIT À VOIX HAUTE — §4 du rapport du mentor.

   Les écrans sont reconstruits par `innerHTML` : pour un lecteur d'écran, la
   page ne change pas, elle se remplace en silence. On annonce donc nous-mêmes,
   et une seule chose à la fois — la CORRECTION quand il y en a une, le titre
   de l'écran sinon. C'est l'ordre des priorités de quelqu'un qui révise :
   savoir si c'était juste passe avant de savoir où l'on est.

   ⚠️ Réécrire le MÊME texte ne déclenche rien : le navigateur ne relit une
   région que si elle a changé. Deux « Exact. » de suite resteraient donc
   muets la seconde fois — d'où l'espace ajouté, invisible à l'oreille comme à
   l'œil, mais qui fait bien un texte différent. */
function annonce(txt) {
  const el = document.getElementById("annonce");
  if (!el) return;
  const t = String(txt || "").replace(/\s+/g, " ").trim();
  el.textContent = (t && t === el.textContent) ? t + " " : t;
}

function show(html, versLeHaut) {
  // Quitter l'écran doit couper la lecture : sinon le dialogue continue à
  // parler par-dessus l'écran suivant, sans aucun bouton pour l'arrêter.
  stopLecture();
  const y = window.scrollY;
  view.innerHTML = html;
  marqueAllemand(view);

  /* On lit le RENDU, pas le HTML : `textContent` donne le texte tel qu'il
     s'affiche, sans les balises de mise en valeur ni les entités. Annoncer
     « Le mot est bon, mais pas le genre : <b>das Haus</b> » ferait épeler des
     chevrons. */
  const aDire = view.querySelector(".why") || view.querySelector("h2");
  annonce(aDire ? aDire.textContent : "");

  /* Remettre la position APRÈS le remplacement : le navigateur peut l'avoir
     écrêtée si la nouvelle page est plus courte, et c'est très bien ainsi.

     ⚠️ MAIS PAS QUAND UN CHAMP VA PRENDRE LE FOCUS. Troisième cause du « ça
     bouge » signalé par Exsangue le 02/08/2026 : on replaçait la page à `y`,
     puis le focus (quelques lignes plus bas) faisait défiler le navigateur
     ailleurs pour montrer le champ. Deux défilements contradictoires à
     chaque affichage — d'où la secousse. Quand il y a un champ, c'est lui
     qui décide de la position, et lui seul. */
  const field = view.querySelector("#answer");
  if (versLeHaut) window.scrollTo(0, 0);
  else if (!field) window.scrollTo(0, y);
  // L'oral : la phrase est prononcée dès l'affichage. Avant le focus, sinon
  // l'ouverture du clavier peut couper le début.
  // Le réglage « son automatique » se joue ICI, au seul endroit qui déclenche
  // une lecture spontanée. Coupé, plus rien ne parle sans qu'on le demande —
  // y compris à l'oral, où l'écran reste alors muet jusqu'à l'appui sur
  // « Réécouter ». C'est assumé et dit dans les réglages : le mode garde son
  // bouton, on ne se retrouve pas devant un écran sans issue.
  const auto = view.querySelector("[data-autosay]");
  if (auto && S.prefs.sonAuto) speak(auto.getAttribute("data-autosay"));
  // Carte à écrire : le clavier s'ouvre tout de suite, ça évite un appui.
  // `field` est relevé plus haut — c'est sa présence qui décide du
  // défilement, les deux ne peuvent donc pas se contredire.
  if (field) { try { field.focus(); } catch (e) {} }
}
function backBar(label) {
  return '<button class="back" data-go="home">&#8592; ' + label + '</button>';
}

/* ---------------------------------------------------------------
   Le parcours guidé
   ---------------------------------------------------------------
   Demandé par Exsangue le 01/08/2026 : « après la première leçon on est
   envoyé direct aux exercices, puis aux cartes, puis à l'oral, puis une
   fois terminé on est autorisé à aller à la leçon suivante ».

   Sans fil conducteur, on fait la leçon et on s'arrête là — les quatre
   autres modes vivaient sur l'accueil et attendaient qu'on pense à eux.

   Le quiz ferme la marche parce que c'est lui qui valide l'étape et
   débloque la suivante : le retirer du parcours laisserait la porte
   fermée à la fin d'un enchaînement pourtant complet.

   Le bouton de retour à l'accueil reste partout : on guide, on n'enferme
   pas. Un jour où l'on ne veut que réviser les cartes, on doit pouvoir. */
const PARCOURS = ["lesson", "drills", "cards", "oral", "quiz"];

const PARCOURS_NOM = {
  lesson: "la leçon", drills: "les exercices", cards: "les cartes",
  oral:   "l'oral",   quiz:   "le quiz"
};

/* Le nom affiché dans l'en-tête — « où suis-je ». Table SÉPARÉE de
   `PARCOURS_NOM`, qui ne couvre que les cinq maillons du parcours et sert à
   composer des phrases (« place à l'oral »). Ici il faut aussi le livre, les
   réglages et l'entraînement libre, et il faut des titres, pas des morceaux
   de phrase. Les fusionner obligerait l'une des deux à porter des formes qui
   ne lui servent pas.
   L'accueil n'y figure pas volontairement : c'est là que le nom de l'app
   reprend sa place, puisqu'on ne peut pas s'y perdre. */
/* Les écrans qui servent une carte à deux faces. Ils prennent `body.plein`,
   qui leur donne la hauteur — et la carte sa forme. Voir `go()`. */
const ECRANS_CARTES = ["cards", "practice", "ancrage"];

const OU_SUIS_JE = {
  lesson: "La leçon", drills: "Les exercices", cards: "Les cartes",
  practice: "Entraînement", oral: "L'oral", quiz: "Le quiz",
  book: "Le livre", unit: "Le livre", booktest: "Test du livre",
  reglages: "Réglages", relais: "La suite", chrono: "Contre la montre",
  verbes: "Verbes irréguliers", a1: "Test A1", ancrage: "L'ancrage"
};

/* L'étape suivante du parcours, en sautant celles qui n'ont rien à offrir
   — une étape sans exercices écrits, par exemple. */
function apres(mode) {
  const l = COURSE[S.day - 1];
  let i = PARCOURS.indexOf(mode);
  if (i === -1) return null;
  while (++i < PARCOURS.length) {
    const suivant = PARCOURS[i];
    if (suivant === "drills" && !(l.drills || []).length) continue;
    return suivant;
  }
  return null;
}

/* Le bouton qui pousse vers la suite. Rendu en premier et en couleur : c'est
   le geste attendu, l'accueil reste le second choix.

   Il ne mène plus DIRECTEMENT au mode suivant mais à un écran de relais —
   demandé par Exsangue le 02/08/2026 : « fin de leçon, hop une animation
   pour dire place à la révision ». La raison de fond : passer d'un écran de
   score à un écran d'exercice sans rupture, c'est se retrouver en train de
   répondre avant d'avoir compris qu'on avait changé de mode. */
function suiteBtn(mode) {
  const s = apres(mode);
  if (!s) return "";
  return '<button class="btn primary wide" data-relais="' + s + '">Suite &#183; ' +
         PARCOURS_NOM[s] + '</button>';
}

/* ---------- Le relais entre deux phases ----------
   Où l'on va, retenu entre le clic et l'écran. Une route ne prend pas
   d'argument : la garder ici évite d'inventer un système de paramètres pour
   un seul écran. */
let relaisVers = null;

/* Ce que le relais annonce. Une phrase, pas un titre : « Place à l'oral »
   dit qu'on change de terrain, « L'oral » n'aurait fait que nommer. */
const RELAIS_PHRASE = {
  drills: "Place aux exercices",
  cards:  "Place aux cartes",
  oral:   "Place à l'oral",
  quiz:   "Place au test",
  lesson: "Place à la leçon"
};
/* Ce qu'on y fera, en une ligne. Le relais est le seul moment où on peut
   dire à quoi s'attendre sans interrompre quoi que ce soit. */
const RELAIS_SOUS = {
  drills: "Quatre formes d'exercices, tirées au sort.",
  cards:  "Tu écris. Chaque mot monte ou redescend d'un niveau.",
  oral:   "Aucun texte à l'écran. Tu écoutes, puis tu écris.",
  quiz:   "Cinq questions. C'est lui qui débloque l'étape suivante.",
  lesson: "Quelques écrans courts, une idée à la fois."
};

function relaisView() {
  const s = RELAIS_PHRASE[relaisVers] ? relaisVers : "quiz";
  return [
    '<div class="stack">',
      '<div class="relais" data-ou="' + att(s) + '">',
        '<span class="relais-l">Étape ' + S.day + '</span>',
        '<strong>' + esc(RELAIS_PHRASE[s]) + '</strong>',
        '<span class="relais-s">' + esc(RELAIS_SOUS[s]) + '</span>',
        '<button class="relais-go" data-go="' + att(s) + '">Commencer</button>',
      '</div>',
      /* L'accueil reste offert ici aussi : on guide, on n'enferme pas. Le
         relais est le meilleur endroit pour s'arrêter — on vient de finir
         quelque chose, on n'a rien commencé. */
      '<button class="btn wide" data-go="home">Plus tard &#183; retour à l\'accueil</button>',
    '</div>'
  ].join("");
}
function glossHTML(g) {
  const cells = g.de.map(function (w, i) {
    return '<span><b>' + esc(w) + '</b><i>' + esc(g.fr[i]) + '</i></span>';
  }).join("");
  return '<div class="gloss">' + cells + '</div>' +
         '<div class="gloss-say">' + sayBtn(g.de.join(" ")) + '<span class="t">Écouter la phrase</span></div>';
}
function tableHTML(rows) {
  return '<div class="scroll-x"><table class="conj"><tbody>' +
    rows.map(function (r) { return '<tr><td>' + rich(r[0]) + '</td><td>' + rich(r[1]) + '</td></tr>'; }).join("") +
    '</tbody></table></div>';
}

/* Mélange (Fisher-Yates) — renvoie les indices 0..n-1 dans un ordre au hasard.
   Seul l'ORDRE D'AFFICHAGE change : chaque bouton garde son index d'origine
   dans data-pick / data-scheck. Le calcul du score, comme l'auto-test,
   continue donc de raisonner sur le fichier et pas sur l'écran. */
function shuffleIdx(n) {
  const a = [];
  for (let i = 0; i < n; i++) a.push(i);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}

/* Une étape est atteignable si elle est déjà faite, ou si elle suit
   immédiatement les étapes validées. Sert aux pastilles de l'accueil. */
function reachable(n) {
  return n >= 1 && n <= COURSE.length &&
         (S.done.indexOf(n) !== -1 || n <= Math.max(1, S.done.length + 1));
}

/* ---------- Accueil ---------- */
function home() {
  /* Pas de seed() ici : passer par l accueil n est pas avoir lu la lecon.
     Voir la note sur seed() — un mot n entre dans le paquet qu une fois presente. */
  const lesson = COURSE[S.day - 1];
  const due = cartesLecon().length;
  const doneToday = S.done.indexOf(S.day) !== -1;
  const place = chapterOf(S.day);
  const nbDrills = (lesson.drills || []).length;

  // Un chapitre par bloc repliable. Signalé par Exsangue le 01/08/2026 :
  // avec trente-cinq étapes, la liste dépliée mangeait tout l'accueil et il
  // fallait défiler pour atteindre les modes. On replie, et SEUL le chapitre
  // en cours s'ouvre — c'est le seul qu'on regarde vraiment.
  //
  // Les pastilles mènent désormais DIRECTEMENT à la leçon (data-lesson) et
  // non plus à l'accueil de l'étape (data-day) : « j'aimerais pouvoir appuyer
  // sur une leçon pour y aller directement ». Un clic au lieu de deux.
  // Une étape encore verrouillée reste inerte : c'est `reachable` qui tranche,
  // pas l'affichage.
  let stations = "";
  /* L'étape qui vient d'être validée, pour ne l'animer QU'UNE fois. On la
     consomme au premier dessin : sans ça, l'animation repartirait à chaque
     retour à l'accueil, et une avancée qui se rejoue sans qu'on ait rien
     avancé cesse d'être une récompense. */
  const franchi = vientDeValider;
  vientDeValider = null;

  function palierHTML(n) {
    const st = COURSE[n - 1];
    const fait = S.done.indexOf(n) !== -1;
    const score = S.scores[n];
    const total = st.quiz.length;
    /* « Sans faute » se juge sur le MEILLEUR score, pas sur le dernier :
       c'est l'inverse de la règle du livre, et c'est voulu. Ici on peut
       refaire une étape autant qu'on veut — c'est même ce qu'Exsangue
       demande avec l'orange, « revenir plus tard pour rattraper sa faute ».
       Rattraper doit donc pouvoir effacer l'orange, sinon le rattrapage ne
       servirait à rien. */
    const net = fait && score === total;
    const ouvert = reachable(n);

    const cls = fait ? (net ? "net" : "tache")
              : (n === S.day ? "ici" : (ouvert ? "" : "plus-tard"));

    let etat;
    if (fait && net)      etat = "Sans faute";
    else if (fait)        etat = (total - score) + (total - score > 1 ? " fautes" : " faute") + " · à rattraper";
    else if (n === S.day) etat = "Tu en es là";
    else if (ouvert)      etat = "Ouverte";
    else                  etat = "Pas encore ouverte";

    return '<button class="palier ' + cls + (n === franchi ? " franchi" : "") + '"' +
             (ouvert ? ' data-lesson="' + n + '"' : ' disabled') +
             ' aria-label="Étape ' + n + ' : ' + att(st.title) + ' — ' + att(etat) + '">' +
             '<span class="dot">' + n + '</span>' +
             '<span class="t"><b>' + esc(st.title) + '</b>' +
               '<span class="e">' + esc(etat) + '</span></span>' +
           '</button>';
  }

  /* Les chapitres d'UN niveau, et d'un seul.
     Demandé par Exsangue le 02/08/2026 : « je veux le A1 dans son dépliant, et
     un autre dépliant en dessous pour le A2 et ses chapitres ». Un sommaire
     unique mélangeait les deux, et rien ne disait où l'un finissait.
     Le filtre se fait sur les BORNES du niveau et non sur une étiquette portée
     par le chapitre : c'est `NIVEAUX` qui fait autorité sur ce découpage, et
     une seconde source finirait par le contredire. */
  function stationsDe(niv) {
    const suivant = NIVEAUX[NIVEAUX.indexOf(niv) + 1];
    const dernier = suivant ? suivant.premiere - 1 : Infinity;
    let out = "";
    CHAPTERS.forEach(function (ch) {
      const dispo = ch.steps.filter(function (n) {
        return n <= COURSE.length && n >= niv.premiere && n <= dernier;
      });
      if (!dispo.length) return;
      const faits = dispo.filter(function (n) { return S.done.indexOf(n) !== -1; }).length;
      const ouvert = dispo.indexOf(S.day) !== -1;
      out +=
        '<details class="grp"' + (ouvert ? ' open' : '') + '>' +
          '<summary>' +
            '<span class="g-t">Chapitre ' + ch.n + ' &#183; ' + esc(ch.title) + '</span>' +
            '<span class="g-n">' + faits + '/' + dispo.length + '</span>' +
          '</summary>' +
          '<div class="chemin">' + dispo.map(palierHTML).join("") + '</div>' +
        '</details>';
    });
    return out;
  }

  /* Un dépliant par niveau, dans l'ordre. Un niveau dont aucune étape n'est
     encore écrite n'apparaît pas du tout : on ne déclare que ce qui existe,
     et une ligne « Niveau B1 · 0 / 0 » ne promettrait que du vide. */
  stations = NIVEAUX.map(function (niv) {
    const av = avancementNiveau(niv);
    if (!av.ecrites) return "";
    return '<details class="grp tout">' +
        '<summary>' +
          '<span class="g-t">Niveau ' + esc(niv.id) + ' &#183; ' +
            av.faites + ' / ' + av.ecrites + ' étapes</span>' +
          '<span class="g-n">' + av.prevu + ' prévues</span>' +
        '</summary>' +
        stationsDe(niv) +
      '</details>';
  }).join("");

  const finished = S.done.length >= COURSE.length;

  return [
    '<div class="stack">',

      /* Le sommaire tient sous UNE ligne PAR NIVEAU, repliée par défaut. Les
         chapitres empilés, même repliés, poussaient l'étape en cours et les
         modes hors de l'écran — or c'est eux qu'on vient chercher. L'étape du
         jour est affichée juste en dessous : on ne perd rien à fermer.
         ⚠️ Les deux niveaux restent FERMÉS au démarrage, y compris celui où
         l'on se trouve. En ouvrir un rendrait à l'accueil la hauteur qu'on lui
         avait justement retirée. Le niveau en cours se lit sur le badge de
         l'en-tête et sur la plaque ci-dessous. */
      stations,

      '<div class="plate">',
        '<div class="num"><b>' + S.day + '</b></div>',
        '<div>',
          '<span class="label">' + (doneToday ? 'Étape terminée' : 'Étape en cours') +
            (place ? ' &#183; chapitre ' + place.chapter.n : '') + '</span>',
          '<h2>' + esc(lesson.title) + '</h2>',
          '<p class="de">' + esc(lesson.de) + '</p>',
        '</div>',
      '</div>',

      /* `modes-home` distingue cette grille de la liste des unités du livre,
         qui réutilise la classe `.mode`. Sans ce marqueur, colorier les cinq
         modes colorierait aussi les 35 unités.

         Les cinq blocs sont décrits séparément puis rendus DANS L'ORDRE CHOISI
         par Exsangue (`prefs.ordre`). C'est ce qui permet à « l'emplacement
         des onglets » d'être un réglage : le contenu de chaque bloc ne dépend
         pas de sa place, et sa place ne dépend pas de son contenu. */
      '<div class="modes modes-home ' + (S.prefs.forme === "rond" ? "rond" : "carre") +
        ' t-' + S.prefs.taille + '">',
        ordreModes().map(function (id, rang) {
          const bloc = {
            lesson: {
              go: "lesson",
              titre: "La leçon",
              sous: lesson.steps.length + " écrans, " + lesson.vocab.length + " mots",
              chip: String(lesson.steps.length)
            },
            /* ⚠️ DEUX PAQUETS VIDES QUI NE DISENT PAS LA MÊME CHOSE, et les
               confondre découragerait exactement la personne qu'il ne faut pas
               décourager. Depuis le 18/08/2026 un mot n'entre qu'une fois sa
               leçon TERMINÉE : quelqu'un qui débute n'a donc aucune carte, et
               l'envoyer vers l'entraînement libre — vide lui aussi — serait le
               cul-de-sac qu'on avait justement retiré.

                 - aucune carte du tout  → il n'a rien fini. On l'envoie à la
                   leçon, et on le lui dit.
                 - des cartes, séance faite → l'entraînement libre, qui travaille
                   les mots les plus ratés sans toucher aux niveaux. */
            cards: (function () {
              const vierge = Object.keys(S.cards).length === 0;
              if (vierge) return {
                go: "lesson",
                titre: "Les cartes",
                sous: "Termine une leçon : ses mots arriveront ici",
                chip: "—"
              };
              return {
                go: due === 0 ? "practice" : "cards",
                titre: "Les cartes",
                sous: due === 0
                  ? "Rien d'obligatoire aujourd'hui — entraîne-toi si tu veux"
                  : "Le vocabulaire de ta dernière leçon",
                chip: due > 0 ? String(due) : "libre",
                classeChip: due > 0 ? " hot" : ""
              };
            })(),
            // Toujours actif : les voix de l'appareil arrivent parfois après
            // le premier affichage. C'est l'écran lui-même qui explique s'il
            // en manque.
            oral: {
              go: "oral",
              titre: "L'oral",
              sous: "Écoute seule — écris ou traduis ce qui est dit",
              chip: String(ORAL_SIZE)
            },
            drills: {
              go: "drills",
              titre: "Les exercices",
              sous: nbDrills
                ? Math.min(DRILL_SESSION, nbDrills) + " tirés parmi " + nbDrills + " — différents à chaque fois"
                : "Pas encore d'exercices pour cette étape",
              chip: String(Math.min(DRILL_SESSION, nbDrills)),
              inactif: !nbDrills
            },
            quiz: {
              go: "quiz",
              titre: "Le quiz",
              sous: doneToday ? "Refaire le test de cette étape"
                              : "Valide cette étape et débloque la suite",
              chip: S.scores[S.day] != null
                ? S.scores[S.day] + "/" + lesson.quiz.length
                : String(lesson.quiz.length),
              classeChip: doneToday ? " ok" : ""
            }
          }[id];
          if (!bloc) return "";
          /* L'autre moitié de la demande d'Exsangue : « je veux qu'on puisse
             savoir dans lequel on était ». Sans marque, une séance reprise
             serait une surprise — on rouvrirait « les cartes » en croyant
             repartir à zéro et on tomberait au milieu. La marque prévient. */
          const enCours = seanceEnCours(bloc.go);
          return '<button class="mode" data-go="' + bloc.go + '" data-pos="' + (rang + 1) + '"' +
                   (bloc.inactif ? ' disabled' : '') + '>' +
                   '<div class="txt"><strong>' + esc(bloc.titre) + '</strong>' +
                     '<span>' + esc(enCours || bloc.sous) + '</span></div>' +
                   '<span class="chip' + (enCours ? " encours" : (bloc.classeChip || "")) + '">' +
                     esc(bloc.chip) + '</span>' +
                 '</button>';
        }).join(""),
      '</div>',

      // Le livre lui-même, dans son coin : on ne le mélange pas aux cinq
      // modes ci-dessus, qui corrigent et comptent. Ici on lit, c'est tout.
      //
      // L'onglet n'apparaît QUE si le livre est là. La version publiée en
      // ligne est produite en vidant `BOOK` — le contenu du livre en sort,
      // et avec lui l'onglet, sans qu'on ait à toucher au reste du code.
      BOOK.length
        ? '<button class="btn wide" data-go="book">Le livre &#183; dialogues et exercices</button>'
        : '',

      /* Le contre-la-montre, dans le même coin « à part » que le livre, et
         pour la même raison : ce n'est pas une étape du parcours. Exsangue
         a été explicite — « je ne veux pas qu'après une leçon ça me lance
         dans cet onglet ». Il se cherche, il ne se subit pas.
         Masqué tant qu'il n'y a rien à jouer : proposer un défi sur quatre
         mots qu'on n'a pas encore vus n'aurait aucun sens. */
      Object.keys(S.cards).length >= 4
        ? '<button class="btn wide" data-go="chrono">Contre la montre &#183; 30 secondes</button>'
        : '',

      /* L'ancrage, même coin « à part » — il ne s'enchaîne jamais après une
         leçon, c'est tout son intérêt : il travaille TOUT le vocabulaire,
         alors que les cartes ne travaillent que la leçon en cours.
         Toujours visible, même à zéro mot : son écran explique alors comment
         le remplir. Le cacher priverait un débutant de savoir qu'il existe. */
      (function () {
        const reste = stockAncrage().length, ancres = motsAncres().length;
        return '<button class="btn wide" data-go="ancrage">L\'ancrage &#183; ' +
          (reste + ancres === 0
            ? 'à remplir'
            : reste + ' mot' + (reste > 1 ? 's' : '') + ' à ancrer') + '</button>';
      })(),

      /* Les verbes irréguliers, même coin « à part ». Toujours accessible,
         lui : contrairement au contre-la-montre, il n'a besoin d'aucun
         acquis — c'est une table de référence qu'on vient réviser. */
      '<button class="btn wide" data-go="verbes">Les verbes irréguliers &#183; ' +
        VERBES.length + '</button>',

      /* Le test de fin de niveau. Toujours accessible — on doit pouvoir se
         mesurer quand on veut — mais il DIT clairement, sur son écran
         d'accueil, quand le cours n'est pas fini. Le cacher jusqu'à la 35ᵉ
         étape priverait de la seule façon de savoir où l'on en est. */
      '<button class="btn wide" data-go="a1">Test de fin de niveau A1' +
        (S.a1 && S.a1.passe ? ' &#183; validé' : '') + '</button>',

      // Le jour est fini mais l'envie est là : on ne renvoie pas à demain.
      (doneToday && reachable(S.day + 1)
        ? '<button class="btn primary wide" data-lesson="' + (S.day + 1) + '">Enchaîner sur l\'étape ' + (S.day + 1) + '</button>'
        : ''),

      finished ? '<div class="card"><span class="label">Fin de la série</span><p class="msg" style="margin:.5rem 0 0">Tu as terminé les ' + COURSE.length + ' étapes écrites. Demande-moi la suite — le contenu s\'ajoute dans un seul fichier.</p></div>' : '',

      /* Deux messages, parce que ce sont deux pannes différentes. Le second
         est celui qui manquait le 02/08/2026 : on annonçait un stockage
         bloqué alors que le stockage marchait très bien — c'était la
         sauvegarde qu'on ne savait plus relire. Un message qui désigne le
         mauvais coupable fait chercher au mauvais endroit. */
      !storageOK
        ? '<p class="warn">Ton navigateur bloque le stockage local : la progression ne sera pas conservée après fermeture. Essaie hors navigation privée.</p>'
        : '',
      sauveIllisible
        ? '<p class="warn">Ta sauvegarde n\'a pas pu être relue — le stockage, lui, fonctionne. ' +
          'Elle a été <b>mise de côté intacte</b> : ouvre les réglages, ' +
          '« Sauvegarde sans fichier », et restaure-la.</p>'
        : '',

      /* « Ma progression » et ses quatre outils vivaient ici, en bas de
         l'accueil. Déplacés dans le rouage le 01/08/2026 à la demande
         d'Exsangue : ils occupaient un tiers de l'écran pour des actions
         qu'on fait une fois par mois, et ils repoussaient les cinq modes —
         c'est-à-dire ce pour quoi on ouvre l'app. */

    '</div>'
  ].join("");
}

/* ---------- La leçon, étape par étape ---------- */
let stepIdx = 0, stepPick = null, stepPerm = null;

/* Se placer sur une étape. L'ordre des réponses est figé ICI, une fois :
   sinon elles se remélangeraient à chaque redessin — en particulier
   juste après avoir répondu, ce qui serait illisible. */
function setStep(i) {
  stepIdx = i;
  stepPick = null;
  const l = COURSE[S.day - 1];
  const st = l && l.steps[i];
  stepPerm = (st && st.check) ? shuffleIdx(st.check.o.length) : null;
}

function lessonView() {
  /* Pas de seed() ici depuis le 18/08/2026. Ouvrir une leçon n'est pas l'avoir
     faite : le mot entre dans le paquet quand le quiz est validé, et là
     seulement. Voir la note sur seed(). */
  setStep(0);
  return renderStep();
}

function renderStep() {
  const l = COURSE[S.day - 1];
  const place = chapterOf(S.day);
  if (stepIdx >= l.steps.length) return renderRecap();

  const st = l.steps[stepIdx];
  const answered = stepPick !== null;

  let body = '<p class="step-idea">' + rich(st.idea) + '</p>';
  if (st.detail) body += '<p class="step-detail">' + rich(st.detail) + '</p>';
  if (st.gloss)  body += glossHTML(st.gloss);
  if (st.table)  body += tableHTML(st.table);

  let quest = "";
  if (st.check) {
    const order = stepPerm || st.check.o.map(function (_, i) { return i; });
    const opts = order.map(function (i) {
      let cls = "opt";
      if (answered) {
        if (i === st.check.a) cls += " right";
        else if (i === stepPick) cls += " wrong";
      }
      return '<button class="' + cls + '" data-scheck="' + i + '"' + (answered ? " disabled" : "") + '>' + rich(st.check.o[i]) + '</button>';
    }).join("");
    quest = [
      '<div class="card">',
        '<h3 class="sec">À toi</h3>',
        '<p class="q" style="margin-top:.75rem">' + rich(st.check.q) + '</p>',
        '<div class="opts" style="margin-top:.75rem">' + opts + '</div>',
        answered ? '<div class="why" style="margin-top:.75rem">' + rich(st.check.why) + '</div>' : '',
      '</div>'
    ].join("");
  }

  // Sans mini-question, on peut continuer tout de suite.
  // Avec, il faut avoir répondu : c'est ce qui empêche de survoler.
  const canGo = !st.check || answered;
  const nav = stepIdx === 0
    ? (canGo ? '<button class="btn primary wide" data-act="step-next">Continuer</button>' : '')
    : '<div class="pair"><button class="btn" data-act="step-back">Précédent</button>' +
      (canGo ? '<button class="btn primary" data-act="step-next">Continuer</button>' : '<button class="btn" disabled>Réponds d\'abord</button>') +
      '</div>';

  return [
    backBar('Accueil'),
    '<div class="stack">',
      '<div class="stack-s">',
        // Chapitre, rang de l'étape dans le chapitre, puis position dans la leçon.
        // Les écrans internes n'ont pas de nom : ils sont seulement numérotés.
        '<span class="label">' + (place ? 'Chapitre ' + place.chapter.n + ' &#183; étape ' + place.rank + ' &#183; ' : '') +
          esc(l.title) + ' &#183; ' + (stepIdx + 1) + ' sur ' + l.steps.length + '</span>',
        '<div class="meter">' + l.steps.map(function (_, i) {
          return '<i class="' + (i <= stepIdx ? 'on' : '') + '"></i>';
        }).join("") + '</div>',
      '</div>',
      '<div class="card">' + body + '</div>',
      quest,
      nav,
    '</div>'
  ].join("");
}

const RECAP_EXAMPLES = 5;   // combien de phrases montrer, tirées parmi toutes

/* Fin de la leçon : les phrases, puis les mots, puis le quiz. */
function renderRecap() {
  const l = COURSE[S.day - 1];
  touchStreak();

  // Un tirage, pas la liste entière : en revenant sur la leçon on doit tomber
  // sur d'autres phrases, pas relire mot pour mot les mêmes.
  const choisies = shuffleIdx(l.examples.length)
    .slice(0, Math.min(RECAP_EXAMPLES, l.examples.length))
    .map(function (i) { return l.examples[i]; });

  const ex = choisies.map(function (e) {
    return '<div class="ex"><div class="top-line"><span class="d">' + esc(e.d) + '</span>' + sayBtn(e.d) + '</div>' +
           '<div class="f">' + esc(e.f) + '</div></div>';
  }).join("");

  const voc = l.vocab.map(function (v) {
    return '<li>' + sayBtn(v.d) +
      '<span class="w"><span class="d">' + esc(v.d) + '</span><span class="p">' + esc(v.p) + '</span></span>' +
      '<span class="f">' + esc(v.f) + '</span></li>';
  }).join("");

  return [
    backBar('Accueil'),
    '<div class="stack">',
      '<div class="plate">',
        '<div class="num"><b>' + S.day + '</b></div>',
        '<div><span class="label">Leçon terminée</span><h2>' + esc(l.title) + '</h2><p class="de">' + esc(l.de) + '</p></div>',
      '</div>',
      '<div class="card"><h3 class="sec">Des phrases entières</h3><div style="margin-top:.875rem">' + ex + '</div></div>',
      '<div class="card"><h3 class="sec">Les mots du jour</h3><ul class="voc">' + voc + '</ul></div>',
      '<div class="pair">',
        '<button class="btn" data-act="step-restart">Revoir</button>',
        '<button class="btn primary" data-go="' + (apres("lesson") || "quiz") + '">Suite &#183; ' +
          PARCOURS_NOM[apres("lesson") || "quiz"] + '</button>',
      '</div>',
      S.day > 1 ? '<button class="btn wide" data-lesson="' + (S.day - 1) + '">Revenir à l\'étape ' + (S.day - 1) + '</button>' : '',
    '</div>'
  ].join("");
}

/* ---------- Comparaison d'une réponse écrite ----------
   Tolérant sur la forme, strict sur le mot. On accepte l'orthographe de
   dépannage utilisée quand le clavier n'a pas les touches allemandes
   (ae pour ä, ss pour ß), et on ignore la casse : sur téléphone, la
   majuscule automatique se déclenche de toute façon toute seule. */
const ARTICLES = ["der", "die", "das"];

function normDE(s) {
  return String(s)
    .toLowerCase()
    .replace(/ß/g, "ss")
    .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue")
    .replace(/[.,!?;:'"()\[\]-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
function splitArticle(norm) {
  const parts = norm.split(" ");
  if (parts.length > 1 && ARTICLES.indexOf(parts[0]) !== -1) {
    return { art: parts[0], rest: parts.slice(1).join(" ") };
  }
  return { art: null, rest: norm };
}

/* Ce qui est entre parenthèses dans le vocabulaire est une NOTE — la forme
   irrégulière d'un verbe, « sprechen (du sprichst) » — pas une partie de la
   réponse. On ne l'a jamais demandée, on ne peut pas l'exiger. Les deux
   formes sont acceptées : « sprechen » comme « sprechen du sprichst ». */
function deCore(s) {
  return normDE(String(s).replace(/\([^)]*\)/g, " "));
}

/* ⚠️ CE QUE LE COURS SAIT DU GENRE DE SES NOMS — construit pour le §2.5.

   Utile quand la réponse attendue n'a PAS d'article et qu'on en écrit un
   quand même : sans index, on ne pourrait que tout accepter (l'ancien défaut)
   ou tout refuser. Or refuser à l'aveugle serait faux — *der Bär* EST de
   l'allemand correct, même si l'exercice ne demandait que *Bär*. Mesuré sur
   le cours avant de coder : **118 réponses d'exercices sont un nom nu**, donc
   118 endroits où un refus sec crierait au loup.

   L'index se construit à la première question et une seule fois. Il vient du
   vocabulaire du cours — la même source que les cartes, jamais une liste
   recopiée à côté.

   ⚠️ Le cache vit sur la FONCTION, pas dans une variable de module : une
   déclaration `let` ici serait sous `let S = load()` (ligne 276), donc dans
   la zone morte temporelle qui a déjà cassé l'app trois fois. Une fonction
   déclarée, elle, est utilisable de partout.

   Un nom vu avec deux articles différents ne tranche rien : on préfère ne pas
   savoir que savoir faux. */
function genreConnu(nom) {
  if (!genreConnu.index) {
    const idx = {};
    (typeof COURSE !== "undefined" ? COURSE : []).forEach(function (etape) {
      (etape.vocab || []).forEach(function (v) {
        const s = splitArticle(deCore(v.d));
        if (!s.art || !s.rest || s.rest.indexOf(" ") !== -1) return;
        if (idx[s.rest] && idx[s.rest] !== s.art) idx[s.rest] = "?";
        else if (!idx[s.rest]) idx[s.rest] = s.art;
      });
    });
    genreConnu.index = idx;
  }
  const g = genreConnu.index[nom];
  return (g && g !== "?") ? g : null;
}

/* Renvoie { ok, kind }. Le genre compte : oublier l'article passe, en
   mettre un faux non — c'est justement ce qui s'apprend mal tout seul. */
function checkAnswer(typed, expected) {
  const t = normDE(typed);
  if (!t) return { ok: false, kind: "empty" };

  const targets = [normDE(expected), deCore(expected)];
  if (targets.indexOf(t) !== -1) return { ok: true, kind: "exact" };

  const ts = splitArticle(t);
  for (let i = 0; i < targets.length; i++) {
    const es = splitArticle(targets[i]);
    if (ts.rest !== es.rest) continue;
    if (es.art && !ts.art) return { ok: true, kind: "no-article" };
    if (es.art && ts.art)  return { ok: false, kind: "bad-article" };

    /* ⚠️ UN ARTICLE AJOUTÉ LÀ OÙ ON N'EN ATTEND AUCUN — signalé par le mentor
       (§2.5). Tout passait, *das Hund* compris : sur une app dont l'argument
       est « strict sur le genre », c'était la mauvaise direction.

       Mais tout refuser aurait été faux dans l'autre sens : *der Bär* est de
       l'allemand correct même quand l'exercice ne demande que *Bär*, et le
       cours compte 118 réponses de cette forme. On ne juge donc QUE ce qu'on
       sait : si le cours connaît le genre de ce nom et que l'article écrit le
       contredit, c'est faux — et c'est exactement ce qu'on veut attraper,
       puisque c'est une faute de genre affirmée, pas un oubli. Si le cours ne
       le connaît pas, on ne devine pas. */
    if (ts.art) {
      const vrai = genreConnu(ts.rest);
      if (vrai && vrai !== ts.art) return { ok: false, kind: "bad-article" };
      return { ok: true, kind: "article-en-plus" };
    }
    return { ok: true, kind: "exact" };
  }
  return { ok: false, kind: "wrong" };
}

/* ---------- Dire POURQUOI c'est faux ----------
   Demandé par Exsangue le 02/08/2026 : « donne l'explication de l'erreur et
   la règle grammaticale correspondante, ou dis faute d'orthographe en me
   disant laquelle ».

   Deux familles, et les séparer honnêtement est tout l'enjeu :

     - une faute d'ORTHOGRAPHE : le mot visé est le bon, la forme non. Là on
       peut montrer exactement où ça coince, et c'est utile.
     - autre chose : ce n'est pas le bon mot. Prétendre y pointer une lettre
       serait mentir sur ce qu'on a compris. On renvoie `null`, et la règle
       de l'exercice (le champ `why`, déjà écrit) prend seule le relais.

   Ce qui n'a PAS besoin d'être diagnostiqué, et pourquoi : les trémas et le
   ß ne peuvent pas être la cause d'un échec — `normDE` replie ä sur ae et ß
   sur ss avant toute comparaison. La casse non plus. Chercher à expliquer
   une faute que l'app pardonne enverrait corriger ce qui était déjà juste. */
function fauteOrtho(saisi, attendu) {
  const t = normDE(saisi), e = normDE(attendu);
  if (!t || t === e) return null;

  const mt = t.split(" "), me = e.split(" ");
  if (mt.length !== me.length) return null;      // ce n'est plus de l'orthographe

  /* On isole LE mot qui diffère. Sur une phrase entière, annoncer « une
     lettre » sans dire dans quel mot ne sert à rien — et si deux mots
     diffèrent, c'est que la phrase est à revoir, pas une lettre. */
  let i = -1, n = 0;
  for (let k = 0; k < me.length; k++) if (mt[k] !== me[k]) { i = k; n++; }
  if (n !== 1) return null;

  const a = mt[i], b = me[i];
  if (editDistance(a, b, 3) > 2) return null;

  // Le mot tel qu'il s'écrit VRAIMENT, pas sa forme repliée : montrer
  // « strasse » quand la réponse est « Straße » apprendrait une faute.
  const brut = String(attendu).split(/\s+/);
  const mot = (brut.length === me.length) ? brut[i] : b;
  const tete = "Faute d'orthographe : ";

  if (a.length === b.length) {
    const pos = [];
    for (let k = 0; k < a.length; k++) if (a.charAt(k) !== b.charAt(k)) pos.push(k);

    /* Deux lettres voisines interverties. C'est la faute la plus fréquente
       du francophone sur ie / ei, et elle mérite sa règle : en allemand,
       c'est la DEUXIÈME lettre de la paire qui donne le son. */
    if (pos.length === 2 && pos[1] === pos[0] + 1 &&
        a.charAt(pos[0]) === b.charAt(pos[1]) && a.charAt(pos[1]) === b.charAt(pos[0])) {
      const paire = b.substr(pos[0], 2);
      if (paire === "ie" || paire === "ei") {
        return tete + "tu as inversé <b>" + esc(a.substr(pos[0], 2)) + "</b> et <b>" +
               esc(paire) + "</b> dans <b>" + esc(mot) + "</b>. En allemand, c'est la " +
               "<b>deuxième</b> lettre de la paire qui donne le son : <b>ie</b> se lit " +
               "« i », <b>ei</b> se lit « aï ».";
      }
      return tete + "deux lettres sont inversées dans <b>" + esc(mot) + "</b>.";
    }
    if (pos.length === 1) {
      return tete + "une seule lettre à changer dans <b>" + esc(mot) + "</b> — tu as écrit " +
             "<b>" + esc(a.charAt(pos[0])) + "</b> là où il faut <b>" +
             esc(b.charAt(pos[0])) + "</b>.";
    }
    return tete + "le mot est <b>" + esc(mot) + "</b>, à deux lettres près.";
  }

  if (a.length === b.length - 1) return tete + "il manque une lettre à <b>" + esc(mot) + "</b>.";
  if (a.length === b.length + 1) return tete + "une lettre de trop — le mot est <b>" + esc(mot) + "</b>.";
  return tete + "le mot visé est bien <b>" + esc(mot) + "</b>, mais pas sous cette forme.";
}

/* ---------- Comparaison d'une traduction française ----------
   Bien plus lâche que le contrôle de l'allemand : ici on vérifie qu'on a
   COMPRIS, pas qu'on sait écrire le français. Accents, ponctuation, article
   et précision entre parenthèses sont tous facultatifs — « salut » suffit
   pour « salut (en partant) ». */
const FR_ARTICLES = ["le", "la", "les", "l", "un", "une", "des", "du"];

function normFR(s) {
  return String(s)
    .toLowerCase()
    // Les ligatures d'abord : « sœur » s'écrit avec UN caractère, alors qu'au
    // clavier on tape o puis e. Sans cette ligne, « la soeur » était refusé.
    .replace(/œ/g, "oe").replace(/æ/g, "ae")
    .replace(/[àâä]/g, "a").replace(/[éèêë]/g, "e").replace(/[îï]/g, "i")
    .replace(/[ôö]/g, "o").replace(/[ùûü]/g, "u").replace(/ç/g, "c")
    .replace(/[.,!?;:'’"()\[\]-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
function stripFR(n) {
  const parts = n.split(" ");
  if (parts.length > 1 && FR_ARTICLES.indexOf(parts[0]) !== -1) return parts.slice(1).join(" ");
  return n;
}
/* Distance d'édition, plafonnée à `max` : au-delà, la valeur exacte ne sert
   à rien. Permet de pardonner une faute de frappe aux premiers niveaux. */
function editDistance(a, b, max) {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  let prev = [];
  for (let j = 0; j <= b.length; j++) prev[j] = j;
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    let best = i;
    for (let j = 1; j <= b.length; j++) {
      const cost = a.charAt(i - 1) === b.charAt(j - 1) ? 0 : 1;
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
      if (cur[j] < best) best = cur[j];
    }
    if (best > max) return max + 1;   // plus aucune chance de repasser sous le seuil
    prev = cur;
  }
  return prev[b.length];
}

function checkFR(typed, expected) {
  const t = normFR(typed);
  if (!t) return { ok: false, kind: "empty" };
  const full = normFR(expected);
  const core = normFR(String(expected).replace(/\([^)]*\)/g, " "));
  if (t === full || t === core) return { ok: true, kind: "exact" };
  if (stripFR(t) === stripFR(full) || stripFR(t) === stripFR(core)) return { ok: true, kind: "exact" };
  return { ok: false, kind: "wrong" };
}

/* Traduction d'un MOT de vocabulaire, où la virgule sépare des synonymes.
   Trouvé par Exsangue le 01/08/2026 : la carte « das ist » attend « voici,
   c'est », et taper « voici » — juste — était refusé. La virgule ne fait pas
   partie de la traduction : elle liste deux façons de dire la même chose, et
   on n'a aucune raison d'exiger les deux.

   Ça touche des dizaines d'entrées : « pouvoir, savoir », « vieux, âgé »,
   « vite, rapide », « aller, conduire »…

   ⚠️ On ne touche PAS à `checkFR` lui-même : il sert aussi aux exercices du
   livre, où une réponse comme « ich bin, ich habe » attend bien les deux
   morceaux. Découper là-bas accepterait une demi-réponse. La souplesse
   n'a de sens que sur une glose de vocabulaire. */
function checkGloss(typed, expected) {
  const complet = checkFR(typed, expected);
  if (complet.ok) return complet;

  /* On découpe des DEUX côtés. Exsangue avait répondu « c'est / voici » à une
     carte qui attendait « voici, c'est » : il avait donné les deux synonymes,
     dans l'autre ordre et avec un autre séparateur. C'était juste trois fois
     plutôt qu'une, et c'était compté faux. Un seul synonyme suffit, dans
     n'importe quel ordre, quel que soit le séparateur. */
  const decoupe = function (s) {
    return String(s).split(/\s*[,\/]\s*/).filter(function (p) { return p.trim(); });
  };
  const attendus = decoupe(expected);
  const donnes = decoupe(typed);
  if (attendus.length < 2 && donnes.length < 2) return complet;

  for (let i = 0; i < donnes.length; i++) {
    for (let j = 0; j < attendus.length; j++) {
      const v = checkFR(donnes[i], attendus[j]);
      if (v.ok) return v;
    }
  }
  return complet;
}

/* Un autre mot allemand peut traduire la même chose.
   Trouvé par Exsangue le 01/08/2026 : la carte affichait « voici » et
   attendait « das ist ». Il a répondu « hier ist » — juste aussi. Deux
   entrées du cours partagent la même glose française, l'une écrite à la
   main, l'autre venue du livre. Refuser une traduction correcte parce que
   ce n'est pas celle qu'on visait, c'est punir une bonne réponse.

   On cherche donc, dans TOUT le cours, les mots allemands qui partagent une
   glose avec celui demandé, et on les accepte. Le verdict le dit quand même :
   « juste aussi, on attendait… ». Sinon on croirait avoir visé juste.

   Le tour du cours est refait à chaque réponse fausse seulement — jamais sur
   le chemin normal, donc son coût ne se voit pas. */
function autreTraduction(typed, carte) {
  const glose = function (s) {
    return String(s).split(/\s*[,\/]\s*/).map(function (p) { return normFR(p); })
                    .filter(function (p) { return p; });
  };
  const cherchees = glose(carte.f);
  if (!cherchees.length) return null;

  for (let d = 0; d < COURSE.length; d++) {
    const v = COURSE[d].vocab;
    for (let i = 0; i < v.length; i++) {
      if (normDE(v[i].d) === normDE(carte.d)) continue;      // le mot visé lui-même
      const siennes = glose(v[i].f);
      const partage = siennes.some(function (s) { return cherchees.indexOf(s) !== -1; });
      if (!partage) continue;
      if (checkAnswer(typed, v[i].d).ok) return v[i].d;
    }
  }
  return null;
}

/* ---------- Cartes ----------
   Deux modes sur le même écran :
   - la révision du jour (Leitner), qui fait avancer le calendrier ;
   - l'entraînement libre, qui n'y touche pas — pour pouvoir travailler
     plus un jour où on a le temps, sans dérégler l'espacement. */
let deck = [], pos = 0, revealed = false, training = false, deckCap = 0, verdict = null;
/* Le même paquet sert trois écrans : les cartes de leçon, l'entraînement libre
   et l'ancrage. `training` et `ancrage` les distinguent — jamais deux à la fois.
   Un seul jeu de vues pour les trois, c'est ce qui garantit qu'ils se
   ressemblent : Exsangue a demandé le 18/08/2026 que l'ancrage ait EXACTEMENT
   le dessin des cartes, et une copie de l'écran aurait divergé au premier
   changement. */
let ancrage = false;
let passes = {};   // combien de fois chaque mot est déjà passé dans CETTE séance

const PRACTICE_SIZE = 10;
/* Un même mot ne repasse pas indéfiniment dans une séance, même en le ratant. */
const MAX_PASSES = 5;
/* Le sens d'écriture est décidé par `ECRIT_DE_A` (voir en tête de fichier) :
   en dessous on écrit le français, au-dessus l'allemand. La constante a
   remplacé `WRITE_FROM_BOX` le 18/08/2026 avec le passage à l'échelle 0-20 ;
   le raisonnement, lui, n'a pas bougé et vaut d'être gardé.

   Il n'y a AUCUNE carte passive. Signalé par Exsangue le 01/08/2026 : « je
   n'ai pas l'impression d'apprendre sur les niveaux 1, j'apprends beaucoup en
   écrivant par moi-même ». Il a raison, et c'est un défaut connu du principe
   même de la carte à retourner : « Révéler » puis « Je savais » mesure la
   RECONNAISSANCE, pas le rappel. On croit savoir parce qu'on reconnaît, et on
   sèche le lendemain.

   Les premiers niveaux demandent donc le français — le sens le plus facile,
   mais actif : il faut aller chercher la réponse au lieu de la reconnaître.
   Ensuite on écrit l'allemand, seul sens qui apprenne l'orthographe.

   ⚠️ Le seuil est passé de « box 2 » à « niveau 3 », ce qui n'est pas une
   traduction exacte : la box 2 devient le niveau 5. Sans conséquence sur une
   progression migrée — la conversion ne produit que 0, 5, 10, 15 et 20, donc
   jamais 3 ni 4 — et c'est le palier de PLAN-ANCRAGE.md, qu'on applique
   désormais aux deux outils puisqu'ils partagent l'échelle. */

/* ---------- Le thème d'une étape ----------
   Demandé par Exsangue le 02/08/2026 : « le fond de la carte est dans le
   thème du mot ou de la phrase inscrite ».

   Le thème vient de l'ÉTAPE, pas du mot. Ce n'est pas un raccourci : chaque
   étape du livre EST un thème — les animaux, les boissons, l'hôtel. Étiqueter
   350 mots un par un donnerait la même chose au prix de 350 occasions de se
   tromper, et il faudrait recommencer à chaque mot ajouté.

   Table à PART plutôt qu'un champ dans les 35 étapes : c'est une information
   d'affichage, pas de contenu. Groupée ici, on voit d'un coup d'œil qu'aucune
   étape n'a été oubliée — et une vérification s'en assure.

   ⚠️ Aucun thème n'est vert ni rouge. Ces deux couleurs appartiennent au juste
   et au faux dans toute l'app : une carte au fond verdâtre laisserait croire
   à une bonne réponse avant même qu'on ait répondu. */
/* ⚠️ CETTE TABLE EST UN PIS-ALLER, et il faut le savoir en la lisant.

   Elle donne le thème de l'ÉTAPE. Ça ne vaut que pour les étapes qui SONT un
   thème — les animaux, la table, l'hôtel. Pour celles qui enseignent une
   règle, le vocabulaire n'est qu'une série d'exemples sans rapport entre eux :
   l'étape 1 porte sur les sons, et son vocabulaire est *der Bär*, *die
   Schule*, *das Buch*, *die Straße*, choisis pour ce qu'ils font entendre.

   Exsangue l'a vu immédiatement le 02/08/2026 : « le thème de la carte n'est
   pas en lien avec le mot ». Il a raison.

   Le vrai correctif est d'étiqueter les 350 MOTS un par un — c'est noté dans
   `TODO.md`, et c'est le même travail qui permettra d'éviter que *eins, zwei,
   drei* se suivent dans un paquet. En attendant, les étapes dont le
   vocabulaire est hétéroclite portent le thème NEUTRE (« la langue », gris)
   plutôt qu'un thème faux : ne rien affirmer vaut mieux qu'affirmer à côté. */
const THEME_ETAPE = {
  1: "mots",   2: "monde",  3: "gens",   4: "gens",   5: "mots",
  6: "mots",   7: "nombres", 8: "verbes", 9: "verbes", 10: "couleurs",
  11: "verbes", 12: "verbes", 13: "mots", 14: "nature", 15: "voyage",
  16: "gens",  17: "couleurs", 18: "quotidien", 19: "nombres", 20: "mots",
  21: "mots",  22: "nombres", 23: "table", 24: "mots", 25: "verbes",
  26: "table", 27: "gens",  28: "table", 29: "voyage", 30: "voyage",
  31: "mots",  32: "verbes", 33: "mots",  34: "voyage", 35: "voyage",
  /* Niveau A2 */
  36: "corps", 37: "verbes", 38: "verbes", 39: "verbes", 40: "corps",
  41: "verbes", 42: "mots", 43: "maison", 44: "mots", 45: "verbes"
};
const THEME_DEFAUT = "mots";

/* ---------- Le thème d'un MOT ----------
   Le vrai correctif, posé le 02/08/2026. Exsangue avait vu tout de suite que
   « le thème de la carte n'est pas en lien avec le mot » : le thème venait de
   l'ÉTAPE, ce qui ne vaut que pour les étapes qui SONT un thème. L'étape 1
   porte sur les sons, et son vocabulaire est *der Bär*, *die Schule*,
   *das Buch* — choisis pour ce qu'ils font entendre.

   Les 350 mots du cours sont donc rangés un par un. Écrits en GROUPES et non
   en 350 lignes « mot : thème » : groupés, la liste se relit d'un coup d'œil
   et une erreur de rangement saute aux yeux. Une vérification s'assure
   qu'aucun mot n'est oublié — et elle échoue en les nommant.

   `THEME_ETAPE` reste, en filet : un mot ajouté demain prendra le thème de
   son étape en attendant d'être rangé ici. */
const THEME_MOT = {};
[
  ["monde", ["das Land", "Deutschland", "Frankreich", "Deutsch", "Französisch",
    "Englisch", "die Sprache"]],

  ["gens", ["ich heiße", "mein Name ist", "ich bin", "Wie geht's?", "mir geht's gut",
    "danke", "der Freund", "freut mich", "Guten Morgen", "Guten Tag", "Guten Abend",
    "Gute Nacht", "Hallo", "Tschüss", "Auf Wiedersehen", "bis bald", "bis morgen",
    "willkommen", "der Mann", "die Frau", "das Kind", "der Lehrer", "das Mädchen",
    "die Kinder", "die Frauen", "die Männer", "die Lehrer", "der Arzt", "der Student",
    "die Geschwister", "die Eltern", "der Nachbar", "der Bürgermeister", "die Leute",
    "der Vater", "die Mutter", "der Sohn", "die Tochter", "der Onkel", "die Tante",
    "die Familie", "der Verwandte", "der Chef"]],

  ["nombres", ["null", "vier", "fünf", "zehn", "zwölf", "zwanzig", "dreißig",
    "hundert", "tausend", "der erste", "der zweite"]],

  ["temps", ["die Zeit", "das Jahr", "immer", "jeden Tag", "heute Abend", "morgen früh",
    "die Uhr", "die Stunde", "die Minute", "halb", "das Viertel", "nach", "vor",
    "Mittag", "Mitternacht", "jetzt", "oft", "selten", "der Montag", "der Mittwoch",
    "der Sonntag", "der Monat", "das Datum", "der Frühling", "der Herbst", "der Winter",
    "der Geburtstag", "die Nacht"]],

  ["couleurs", ["grün", "schön", "interessant", "müde", "alt", "glücklich", "nett",
    "pünktlich", "spannend", "die Farbe", "weiß", "schwarz", "rot", "blau", "gelb",
    "grau", "braun", "die Lieblingsfarbe", "Angst haben", "frisch", "groß", "klein",
    "neu", "bunt", "sportlich", "schnell", "leise", "wunderschön", "friedlich",
    "lustig", "klasse", "langweilig", "hell"]],

  ["nature", ["der Bär", "die Blume", "die Blumen", "die Katze", "der Hund",
    "die Maus", "der Elefant", "der Knochen", "der Hase", "das Pferd", "die Kuh",
    "das Schaf", "die Biene", "der Schmetterling", "der Löwe", "das Haustier",
    "der Garten", "das Meer", "die Sonne"]],

  ["maison", ["das Haus", "der Tisch", "das Buch", "die Bücher", "die Häuser",
    "die Tische", "zu Hause", "das Bett", "der Raum", "der Eingang", "die Tasche",
    "die Möbel", "nach Hause", "das Fenster", "der Korb",
    /* Étape 43 · Le logement */
    "die Wohnung", "die Küche", "das Bad", "das Schlafzimmer", "das Wohnzimmer",
    "der Stuhl", "der Schrank", "die Tür", "die Treppe"]],

  ["quotidien", ["die Schule", "die Zeitung", "der Pullover", "die Jacke",
    "das Konzert", "die Hand", "die Arbeit", "der Spaziergang", "einkaufen",
    "aufwachen", "anrufen", "aufstehen", "die Hausaufgaben", "das Fernsehen",
    "sich waschen", "sich beeilen", "sich erholen", "sich entschuldigen",
    "sich setzen", "sich fühlen", "die Haare", "sich anziehen"]],

  ["table", ["das Wasser", "Hunger haben", "Durst haben", "der Apfel", "der Markt",
    "das Restaurant", "das Frühstück", "das Abendessen", "das Brot", "der Fisch",
    "das Fleisch", "das Gemüse", "das Obst", "die Suppe", "das Salz", "das Getränk",
    "der Saft", "der Tee", "das Bier", "der Wein", "die Milch", "das Glas",
    "die Tasse", "die Birne", "bestellen", "bezahlen", "die Rechnung",
    "das Trinkgeld", "die Karte", "der Kellner", "allergisch", "das Tagesgericht",
    "Guten Appetit"]],

  ["voyage", ["die Straße", "die Autos", "das Auto", "der Koffer", "das Fahrrad",
    "der Platz", "die Warteschlange", "der Park", "abfahren", "der Urlaub",
    "der Ausflug", "der Ort", "die Apotheke", "der Bahnhof", "der Zug", "die U-Bahn",
    "das Flugzeug", "das Ticket", "zu Fuß", "verspätet", "die Haltestelle",
    "der Tunnel", "das Zimmer", "die Rezeption", "der Schlüssel", "der Aufzug",
    "die Dusche", "das Handtuch", "reservieren", "der Flughafen", "der Flug",
    "das Gepäck", "der Reisepass", "die Bordkarte", "der Zoll", "die Abflüge",
    "die Ankünfte", "die Reise"]],

  ["verbes", ["spielen", "lernen", "kaufen", "arbeiten", "wohnen", "machen",
    "kommen", "sprechen", "lesen", "essen", "nehmen", "fahren", "schlafen", "sehen",
    "geben", "gehören", "legen", "gehen", "werden", "scheinen", "können", "wollen",
    "müssen", "möchten", "dürfen", "sollen", "schwimmen", "mögen", "gefallen",
    "lachen", "sich freuen", "verstehen", "treffen"]],

  ["mots", ["ja", "ein wenig", "auch", "das ist", "ebenfalls", "die Freiheit",
    "viele", "es gibt", "die Idee", "die Auswahl", "mein", "dein", "besser", "als",
    "dort", "oben", "sehr", "ein bisschen", "wer", "wen", "was", "wo", "woher",
    "wann", "warum", "wie viele", "gern", "lieber", "Lieblings-", "in der Nähe",
    "wenig", "kein", "mehr", "hier", "nicht", "nichts", "nie", "leider",
    "hoffentlich", "in", "auf", "unter", "hinter", "für", "durch", "bei", "seit",
    "inbegriffen", "verfügbar"]],

  /* ---- Niveau A2 ---- */

  ["corps", ["der Kopf", "das Auge", "die Nase", "der Mund", "das Ohr",
    "die Hand", "der Arm", "das Bein", "der Fuß", "der Rücken",
    /* Étape 40 : la santé rejoint le corps plutôt que d'ouvrir un thème à
       part. Un thème sert à donner un fond de carte qui a du sens ; séparer
       « le dos » de « le mal de dos » n'en aurait aucun. */
    "der Arzt", "die Praxis", "der Termin", "die Schmerzen", "das Fieber",
    "die Erkältung", "das Medikament", "der Husten", "krank", "gesund"]],

  /* Les participes passés vont dans « les verbes » — c'est bien ce qu'ils
     sont. Les ranger par le sens du verbe (manger &rarr; à table) casserait le
     seul regroupement qui compte ici : ils s'apprennent en série, parce que
     c'est la TERMINAISON qu'on retient, pas le sens. */
  ["verbes", ["gemacht", "gespielt", "gelernt", "gekauft", "gearbeitet",
    "gehört", "gesucht", "gefragt", "gesagt", "gesehen", "gegessen",
    "getrunken", "gelesen", "geschrieben", "gesprochen", "genommen",
    "gefunden", "gegeben", "geschlafen", "gegangen", "gekommen", "gefahren",
    "geblieben", "geflogen", "gelaufen"]],

  ["quotidien", ["das Kino"]],

  /* Étape 41 : les formes de sein et haben au passé sont des VERBES ; les
     repères de temps qui les accompagnent vont dans « le temps qui passe ».
     Les mélanger donnerait un fond de carte qui ne veut rien dire. */
  ["verbes", ["war", "waren", "hatte", "hatten"]],
  ["temps", ["früher", "damals", "vorgestern", "letzte Woche"]],

  /* Étape 42 : `weil` et les mots qui servent à donner une raison vont dans
     « la langue » ; les adjectifs de jugement vont dans « décrire », qui est
     le nom affiché du thème `couleurs`. */
  ["mots", ["gestern", "lange", "schon", "allein", "anders",
    "weil", "der Grund", "vielleicht", "natürlich", "endlich", "genug"]],
  ["couleurs", ["wichtig", "schlecht", "traurig", "sicher"]],

  /* Étape 44 : les prépositions et le mot interrogatif vont dans « la langue »
     (thème `mots`), les deux paires de position dans « les verbes », et les
     deux noms rejoignent la maison — c'est là qu'on les emploie. */
  ["mots", ["wohin", "an", "neben", "über", "zwischen"]],
  ["verbes", ["stehen", "stellen", "liegen"]],
  ["maison", ["die Wand", "der Boden"]],

  /* Étape 45 : six verbes de la tête et de la parole, plus `dass` et l'avis
     lui-même, qui relèvent de la langue. */
  ["verbes", ["denken", "glauben", "wissen", "sagen", "hoffen", "finden",
    "antworten", "erzählen"]],
  ["mots", ["dass", "die Meinung"]]
].forEach(function (groupe) {
  groupe[1].forEach(function (mot) { THEME_MOT[mot] = groupe[0]; });
});

/* Le nom affiché. Il compte autant que la couleur : une teinte qu'on ne sait
   pas nommer ne veut rien dire, et personne ne devinera « quotidien » d'après
   un mauve. Il s'écrit dans la ligne d'état, au-dessus de la carte. */
const THEME_NOM = {
  monde: "langues et pays", gens: "les gens", mots: "la langue",
  nombres: "les nombres", temps: "le temps qui passe", verbes: "les verbes",
  couleurs: "décrire", nature: "animaux et nature", quotidien: "la journée",
  maison: "la maison", table: "à table", voyage: "en déplacement",
  corps: "le corps et la santé"
};

/* Le thème d'une carte : celui du MOT d'abord, celui de l'étape en secours.
   L'ordre est tout : c'est lui qui corrige le défaut signalé par Exsangue.
   Prend la carte entière et non son numéro d'étape — sans le mot, on ne peut
   pas faire mieux que deviner. */
function themeDe(carte) {
  if (!carte) return THEME_DEFAUT;
  return THEME_MOT[carte.d] || THEME_ETAPE[carte.day] || THEME_DEFAUT;
}

/* ---------- Ne jamais perdre sa place ----------
   Demandé par Exsangue le 02/08/2026 : « lorsqu'on sort d'un exercice comme
   les cartes, l'oral ou n'importe quel onglet, je veux qu'on puisse reprendre
   sa progression exactement au même point ».

   Une séance vit déjà dans des variables de module — `deck`/`pos`, `oral`/`oi`,
   `drills`/`di`, le quiz. Elles SURVIVENT à un changement d'écran : c'est une
   page unique, rien n'est rechargé. Le seul obstacle était que chaque vue
   REDÉMARRAIT sa séance en entrant. On ne redémarre donc plus que lorsqu'il
   n'y a rien à reprendre : séance finie, ou séance d'une autre étape.

   ⚠️ Portée exacte, à ne pas surestimer. Cela couvre la NAVIGATION dans
   l'app. Fermer complètement l'app repart sur une séance neuve — mais rien
   n'est perdu pour autant : les erreurs sont comptées **à chaque réponse**
   (`hit` / `miss`, `S.qmiss`), jamais en fin de séance. Recommencer n'efface
   donc aucune faute, ce qu'Exsangue demandait dans la même phrase. */
function reprend(mode, enCours) {
  if (enCours && seanceDe[mode] === S.day) return true;
  seanceDe[mode] = S.day;
  return false;
}

/* Ce que l'accueil affiche sur une case dont la séance est en cours — ou une
   chaîne vide. Le calcul est ICI, à côté de `reprend`, et pas dans l'accueil :
   les deux doivent répondre la même chose, sinon la case annoncerait une
   reprise que l'écran ne ferait pas (ou l'inverse, plus déroutant encore). */
function seanceEnCours(mode) {
  if (seanceDe[mode] !== S.day) return "";
  const reste =
    mode === "cards"    ? (!training && deck.length > 0 ? deck.length - pos : 0) :
    mode === "practice" ? ( training && deck.length > 0 ? deck.length - pos : 0) :
    mode === "oral"     ? (oral.length > 0 ? oral.length - oi : 0) :
    mode === "drills"   ? (drills.length > 0 ? drills.length - di : 0) :
    mode === "quiz"     ? (qOrder.length > 0 ? qOrder.length - qi : 0) : 0;
  if (reste <= 0) return "";
  return "Séance en cours — encore " + reste;
}

function startDeck(cards, isTraining, isAncrage) {
  deck = cards;
  pos = 0;
  revealed = false;
  verdict = null;
  training = isTraining;
  ancrage = !!isAncrage;
  passes = {};
  // Les mots repassent dans la séance — pour monter de niveau, ou parce
  // qu'ils ont été ratés. Sans plafond, une mauvaise séance n'aurait pas de fin.
  deckCap = cards.length * 4 + 8;
  return renderCard();
}
/* Les cartes et l'entraînement partagent `deck` : c'est `training` qui les
   distingue. Passer de l'un à l'autre repart donc de zéro, et c'est juste —
   ce ne sont pas les mêmes mots. Le test le dit explicitement. */
function cardsView() {
  return reprend("cards", deck.length > 0 && pos < deck.length && !training && !ancrage)
    ? renderCard() : startDeck(cartesLecon(), false, false);
}
function practiceView() {
  return reprend("practice", deck.length > 0 && pos < deck.length && training)
    ? renderCard() : startDeck(practiceCards(PRACTICE_SIZE), true, false);
}

/* Affiche la carte, PUIS déclenche le retournement. En deux temps, et c'est
   toute la condition de l'animation : posée dès le rendu, la classe ferait
   naître l'élément déjà retourné et il n'y aurait rien à voir.
   `requestAnimationFrame` attend que le navigateur ait dessiné la face avant.

   Toutes les cartes passent par ici. Un `show(renderCard())` oublié quelque
   part donnerait une carte juste — mais qui ne se retourne pas. */
function montreCarte() {
  show(renderCard());
  if (!verdict) return;
  const i = view.querySelector(".carte-i");
  if (i) requestAnimationFrame(function () { i.classList.add("retourne"); });
}

function renderCard() {
  if (pos >= deck.length) {
    touchStreak();
    const n = deck.length;

    /* La fin d'une BOUCLE D'ANCRAGE. Même écran de bilan, autre suite : on ne
       renvoie pas vers la leçon suivante — l'ancrage n'est pas une étape du
       parcours — mais vers une nouvelle boucle, qui est tout ce qu'on vient y
       chercher. */
    if (ancrage) {
      const ancres = motsAncres().length;
      const reste = stockAncrage().length;
      return [
        backBar('Accueil'),
        '<div class="stack">',
          '<div class="score"><b>' + n + '</b><span>mot' + (n > 1 ? 's revus' : ' revu') +
            '. Un mot est ancré quand il atteint le niveau ' + ANCRE_A + '.</span></div>',
          '<div class="card"><span class="label">Ancrés</span>' +
            '<p class="msg" style="margin:.5rem 0 0"><b>' + ancres + '</b> sur ' +
            (ancres + reste) + '.</p></div>',
          '<button class="btn primary wide" data-act="ancr-boucle">Une autre boucle</button>',
          '<button class="btn wide" data-go="home">Retour à l\'accueil</button>',
        '</div>'
      ].join("");
    }

    let msg;
    if (n === 0) msg = 'Aucun mot à réviser pour l\'instant. Fais une leçon pour en apprendre de nouveaux.';
    else if (training) msg = 'Entraînement : le calendrier de révision n\'a pas bougé, mais tes erreurs sont notées.';
    else msg = 'Les mots sus montent d\'un niveau, les mots hésitants redescendent.';

    return [
      backBar('Accueil'),
      '<div class="stack">',
        '<div class="score"><b>' + n + '</b><span>carte' + (n > 1 ? 's passées' : ' passée') + '. ' + msg + '</span></div>',
        suiteBtn("cards"),
        Object.keys(S.cards).length ? '<button class="btn wide" data-go="practice">Encore un tour</button>' : '',
        '<button class="btn wide" data-go="home">Retour à l\'accueil</button>',
      '</div>'
    ].join("");
  }

  const c = deck[pos];
  const st = S.cards[c.id];
  const left = deck.length - pos - 1;
  const tag = training
    ? (st.miss ? 'entraînement &#183; raté ' + st.miss + ' fois' : 'entraînement')
    : 'niveau ' + st.niv + '/' + NIV_MAX;

  return [
    backBar('Accueil'),
    '<div class="stack">',
      '<div class="stack-s">',
        // Pas de total : il grandit en cours de route, puisqu'un mot qui monte
        // de niveau repasse dans la séance. « Encore N » ne ment jamais.
        /* Le thème est NOMMÉ, pas seulement teinté. Une couleur qu'on ne sait
           pas nommer ne veut rien dire — personne ne devinera « la journée »
           d'après un mauve. Écrit ici plutôt que sur la carte : la carte se
           retourne, cette ligne non. */
        '<span class="label">' + (left > 0 ? 'Encore ' + left : 'Dernière carte') +
          ' &#183; étape ' + c.day + ' &#183; ' +
          esc(THEME_NOM[themeDe(c)] || "") + ' &#183; ' + tag + '</span>',
        '<div class="meter">' + deck.map(function (_, i) { return '<i class="' + (i < pos ? 'on' : '') + '"></i>'; }).join("") + '</div>',
      '</div>',

      corpsCarte(c, st.niv),
    '</div>'
  ].join("");
}

/* Mot encore neuf : on part de l'allemand et on écrit le français.
   Le sens facile, mais on écrit quand même — c'est ce qui distingue le rappel
   de la simple reconnaissance. La correction est celle de `checkFR`, très
   indulgente : une traduction s'écrit de dix façons, et sanctionner le
   français transformerait un exercice de compréhension en piège orthographique.
   Le bouton d'écoute reste visible : entendre le mot allemand ne donne pas sa
   traduction, et c'est le bon moment pour associer le son au sens. */
/* Les deux faces d'une carte, dans un seul bloc retournable.
   `attrsAvant` / `attrsArriere` portent ce qui ne vaut que pour une face —
   la consigne en filigrane, et surtout `data-autosay`.

   ⚠️ `data-autosay` doit être posé sur la face VISIBLE, et sur elle seule.
   Les deux faces existant en permanence, un `autosay` resté sur la face
   cachée prononcerait la réponse pendant qu'on la cherche encore. */
function carte3d(theme, attrsAvant, avant, attrsArriere, arriere) {
  return '<div class="carte3d" data-th="' + att(theme) + '">' +
           '<div class="carte-i">' +
             '<div class="face avant"' + (attrsAvant || "") + '>' + avant + '</div>' +
             '<div class="face arriere"' + (attrsArriere || "") + '>' + arriere + '</div>' +
           '</div>' +
         '</div>';
}

/* ---------- LES TROIS PALIERS D'UNE CARTE DE LEÇON ----------
   Posés par Exsangue le 18/08/2026, et RECTIFIÉS par lui le même jour : une
   première version présentait les mots des deux premiers paliers à l'oreille,
   sans les écrire. Ce n'est pas ce qu'il veut. Tout est ÉCRIT.

     niveau 0-2   le mot est écrit en ALLEMAND  → on répond en français
     niveau 3-4   le mot est écrit en FRANÇAIS  → on répond en allemand
     niveau 5+    le mot est écrit en FRANÇAIS  → on répond en allemand, avec
                  le déterminant, sans approximation

   ⚠️ CE SONT LES PALIERS DE L'ANCRAGE, et c'est `modeAncrage` qui les décide —
   pas une seconde fonction. Les deux outils partagent déjà le niveau d'un mot ;
   leur laisser deux tables de paliers reviendrait à ce qu'un même mot soit
   demandé de deux façons différentes selon l'écran, pour le même niveau. */
function corpsCarte(c, niv) {
  return modeAncrage(niv) === "vers-fr" ? writeFrBody(c) : writeBody(c);
}

/* Le premier palier : le mot est écrit en allemand, on répond en français. */
function writeFrBody(c) {
  // Le mot est prononcé dès qu'il s'affiche : demandé par Exsangue pour
  // pouvoir travailler à l'oreille autant qu'à l'œil. Sans risque ici, le
  // mot allemand étant déjà à l'écran — c'est la traduction qu'on cherche.
  const avant =
    '<div class="front">' + esc(c.d) + '</div>' +
    sayBtn(c.d) +
    '<div class="tip">Écris ce que ça veut dire, en français.</div>';

  let note = "";
  if (verdict) {
    if (verdict.kind === "dunno")      note = "Pas grave — ce mot va revenir vite.";
    else if (verdict.kind === "empty") note = "Rien d'écrit.";
    else if (verdict.ok)               note = "Exact.";
    /* Pas de `fauteOrtho` ici, et c'est voulu : la réponse attendue est
       FRANÇAISE. Diagnostiquer une lettre sur du français irait contre la
       règle de `checkFR`, volontairement très indulgente — une traduction
       s'écrit de dix façons, et la sanctionner transformerait un exercice de
       compréhension en piège orthographique. */
    else                               note = "Ce n'était pas ça.";
  }

  const arriere =
    '<div class="front">' + esc(c.d) + '</div>' +
    '<div class="p">' + esc(c.p) + '</div>' +
    sayBtn(c.d) +
    '<div class="trad">' + esc(c.f) + '</div>' +
    (verdict && verdict.typed ? '<div class="tip">Tu as écrit : ' + esc(verdict.typed) + '</div>' : '');

  return carte3d(themeDe(c),
      verdict ? '' : ' data-consigne="En français" data-autosay="' + att(c.d) + '"', avant,
      '', arriere) +
    (verdict
      ? '<div class="why ' + (verdict.ok ? "good" : "bad") + '">' + note + '</div>' +
        transitionNiveau(c.id, verdict.ok) +
        '<button class="btn primary wide" data-act="card-next">Continuer</button>'
      /* ⚠️ LE SEUL CHAMP QUI RESTE EN FRANÇAIS — ne pas « corriger ».
         C'est la carte du niveau 1, qui montre l'allemand et demande le sens.
         Il porte la police allemande comme tous les autres : le style ne peut
         donc pas décider ici, seule la question le peut. */
      : '<input class="answer" id="answer"' + saisieAttrs("Ta réponse en français", false) + '>' +
        '<div class="pair">' +
          '<button class="btn" data-act="dunno">Je ne sais pas</button>' +
          '<button class="btn primary" data-act="check-word">Vérifier</button>' +
        '</div>');
}

/* Mot connu : on part du français et on écrit l'allemand. C'est le seul
   sens qui apprenne l'orthographe — et le bouton « écouter » n'apparaît
   qu'après la réponse, sinon il la donnerait. */
function writeBody(c) {
  const avant =
    '<div class="ask">' + esc(c.f) + '</div>' +
    '<div class="tip">Écris le mot en allemand.</div>';

  let note = "";
  if (verdict) {
  if (verdict.kind === "exact")            note = "Exact.";
  else if (verdict.kind === "autre")       note = "Juste aussi — <b>" + esc(verdict.autre) +
                                                  "</b> traduit bien « " + esc(c.f) +
                                                  " ». Ici on visait <b>" + esc(c.d) + "</b>.";
  else if (verdict.kind === "no-article")  note = "Juste. Pense à l'article : <b>" + esc(c.d) + "</b>.";
  /* On ne dit PAS « et ton article est bon » : on ne le sait que si le cours
     connaît ce nom. Annoncer une validation qu'on n'a pas faite serait
     exactement le travers que le mentor traque. */
  else if (verdict.kind === "article-en-plus")
                                           note = "Juste — ici on attendait <b>" + esc(c.d) +
                                                  "</b>, sans article.";
  else if (verdict.kind === "bad-article") note = "Le mot est bon, mais pas le genre : c'est <b>" + esc(c.d) + "</b>.";
  /* À partir du niveau 5, l'article oublié ne passe plus — le mot est réputé
     su, c'est le genre qu'il reste à ancrer. Le dire AINSI et non « faux » :
     ce qui est acquis reste acquis, seule l'exigence a monté. */
  else if (verdict.kind === "article-manquant")
                                           note = "Le mot est bon, mais à ce niveau le déterminant compte : " +
                                                  "c'est <b>" + esc(c.d) + "</b>.";
  else if (verdict.kind === "dunno")       note = "Pas grave — ce mot va revenir vite.";
  else if (verdict.kind === "empty")       note = "Rien d'écrit.";
  /* « Ce n'était pas ça » ne dit rien de ce qu'il faut corriger. Quand le mot
     visé était le bon et que seule la forme cloche, on montre où — demande
     d'Exsangue le 02/08/2026. Quand ce n'est pas ça du tout, `fauteOrtho`
     renvoie `null` et on ne prétend pas en savoir plus. */
  else                                     note = fauteOrtho(verdict.typed, c.d) ||
                                                  "Ce n'était pas ça.";
  }

  const arriere =
    '<div class="ask">' + esc(c.f) + '</div>' +
    '<div class="sol">' + esc(c.d) + '</div>' +
    '<div class="p">' + esc(c.p) + '</div>' +
    sayBtn(c.d) +
    (verdict && verdict.typed ? '<div class="tip">Tu as écrit : ' + esc(verdict.typed) + '</div>' : '');

  /* Le son ne part QU'APRÈS la réponse, et donc seulement sur la face
     arrière. Ici c'est l'allemand qu'on doit écrire : le prononcer avant
     reviendrait à le souffler. C'est aussi pourquoi le bouton d'écoute ne
     figure que sur cette face. */
  return carte3d(themeDe(c),
      verdict ? '' : ' data-consigne="En allemand"', avant,
      verdict ? ' data-autosay="' + att(c.d) + '"' : '', arriere) +
    (verdict
      ? '<div class="why ' + (verdict.ok ? "good" : "bad") + '">' + note + '</div>' +
        transitionNiveau(c.id, verdict.ok) +
        '<button class="btn primary wide" data-act="card-next">Continuer</button>'
      : '<input class="answer" id="answer"' + saisieAttrs("Ta réponse en allemand", true) + '>' +
        '<div class="pair">' +
          '<button class="btn" data-act="dunno">Je ne sais pas</button>' +
          '<button class="btn primary" data-act="check-word">Vérifier</button>' +
        '</div>');
}

/* Passe à la carte suivante, quel que soit le mode qui a jugé la réponse. */
function advanceCard(ok) {
  const cur = deck[pos];
  grade(cur.id, ok, !training);

  passes[cur.id] = (passes[cur.id] || 0) + 1;
  const room = deck.length < deckCap && passes[cur.id] < MAX_PASSES;

  /* ⚠️ DANS L'ANCRAGE, RIEN NE REPASSE. Ni le mot raté, ni celui qui vient de
     monter d'un cran : une boucle fait 50 mots et en fait 50. C'est le choix
     d'Exsangue du 18/08/2026, contre la version d'origine qui renvoyait le mot
     raté « plus tard dans la journée » — il n'y a plus de journée, et une
     boucle qui s'allonge à chaque faute punit les mauvais jours. Le mot
     reviendra quand le hasard le ramènera. */
  if (ancrage) {
    // rien
  } else if (room && !ok) {
    /* Le mot raté repasse en fin de paquet — le retravailler tout de suite est
       ce qui l'ancre. Mais RIEN D'AUTRE ne s'ajoute.

       ⚠️ On ajoutait ici un second mot, déjà su, « pour ne pas terminer en
       boucle sur ses seules erreurs ». Retiré le 18/08/2026 à la demande
       d'Exsangue, et il a raison : chaque faute coûtait DEUX cartes, donc un
       mauvais jour gonflait le paquet, ce qui produisait d'autres fautes, qui
       le gonflaient encore. La sanction d'un échec, c'est le niveau perdu —
       pas du travail en plus. */
    deck.push(cur);
  } else if (room && !training && S.cards[cur.id].niv <= ECRIT_DE_A) {
    // Étapes d'apprentissage : le mot repasse dans la même séance pour monter
    // d'un cran. Le seuil est « <= » et non « < » : un mot qui vient d'atteindre
    // le niveau où il s'écrit doit être écrit AU MOINS UNE FOIS le jour même,
    // sinon le monter n'aurait rien appris.
    deck.push(cur);
  }

  pos++; revealed = false; verdict = null;
  montreCarte();
}

/* ---------- Quiz ---------- */
/* L'étape qui vient d'être validée. Elle sert UNIQUEMENT à jouer l'avancée
   sur le chemin, une fois, au retour au menu — « un effet qui nous fait
   avancer », demandé par Exsangue le 02/08/2026. L'accueil la consomme dès
   qu'il l'a dessinée. Volontairement hors de `S` : ce n'est pas de la
   progression, c'est un événement qui n'a pas à survivre à la fermeture. */
let vientDeValider = null;

let qi = 0, qScore = 0, qLog = [], answered = false;
/* qOrder[position] = l'index de la question dans le fichier
   qPerm[position]  = l'ordre d'affichage de ses réponses
   Tirés une seule fois au démarrage du quiz, pour rester stables ensuite. */
let qOrder = [], qPerm = [];

function quizView() {
  const l = COURSE[S.day - 1];
  /* Le quiz aussi se reprend — c'est même le plus important : c'est lui qui
     valide l'étape, et le recommencer effacerait les mauvaises réponses
     déjà données. Reprendre est donc à la fois plus commode et plus juste. */
  if (reprend("quiz", qOrder.length > 0 && qi < l.quiz.length)) return renderQuestion();
  qi = 0; qScore = 0; qLog = []; answered = false;
  qOrder = shuffleIdx(l.quiz.length);
  qPerm = qOrder.map(function (src) { return shuffleIdx(l.quiz[src].o.length); });
  return renderQuestion();
}
function renderQuestion() {
  const l = COURSE[S.day - 1];

  if (qi >= l.quiz.length) {
    const d = S.day;                                   // le jour testé, avant tout déblocage
    const passed = qScore >= Math.ceil(l.quiz.length * 0.6);

    S.scores[d] = Math.max(S.scores[d] || 0, qScore);
    if (passed) {
      // L'avancée à jouer sur le chemin, au prochain passage par l'accueil.
      vientDeValider = d;
      if (S.done.indexOf(d) === -1) S.done.push(d);

      /* L'étape est finie : SES mots entrent dans le paquet. Posé par Exsangue
         le 18/08/2026 — un mot survolé n'est pas un mot appris, il faut avoir
         terminé la leçon.

         ⚠️ LIRE AVANT DE « CORRIGER » CETTE LIGNE. Le commentaire qui tenait
         cette place disait « surtout PAS de seed() ici », et il avait raison —
         mais d'un autre seed(). Le défaut signalé le 11/08/2026 était
         `seed(S.day)` APRÈS l'incrément ci-dessous : ça semait la leçon
         SUIVANTE, jamais ouverte, dont les mots tombaient dus le jour même et
         qu'on ratait tous. Ici on sème `d`, l'étape qu'on vient de terminer.
         La différence tient dans une variable, et c'est toute la différence.
         Ne pas remplacer `d` par `S.day`. */
      seed(d);

      // On n'avance que si c'était le jour le plus avancé (pas en rejouant un ancien).
      if (d === Math.max.apply(null, S.done) && d < COURSE.length) {
        S.day = d + 1;
      }
    }
    persist();
    touchStreak();

    const need = Math.ceil(l.quiz.length * 0.6);
    const nextOK = reachable(d + 1);

    return [
      backBar('Accueil'),
      '<div class="stack">',
        '<div class="score"><b>' + qScore + '/' + l.quiz.length + '</b><span>' +
          (passed
            ? (d < COURSE.length ? 'Étape validée. L\'étape ' + (d + 1) + ' est débloquée.' : 'Étape validée.')
            : 'Il faut ' + need + ' bonnes réponses sur ' + l.quiz.length + ' pour valider. Relis la leçon et retente.') +
        '</span></div>',
        /* ⚠️ LE TOUR SE FERME ICI, ET IL RAMÈNE AU MENU. Demandé par Exsangue
           le 02/08/2026 : « une fois un tour terminé on revient au menu pour
           ne pas se perdre — si on enchaîne les leçons on ne sait plus où on
           en est en sortant ».

           C'est pourquoi « Accueil » est passé en PREMIER et en couleur,
           alors que « Leçon suivante » y était. Le geste par défaut n'est
           plus d'enchaîner mais de reprendre son souffle et de constater où
           l'on en est. Enchaîner reste possible, d'un doigt — on ne retire
           rien, on change ce qui est proposé d'abord. */
        '<button class="btn primary wide" data-go="home">Retour au menu</button>',
        // On repart du jour TESTÉ (d), pas du jour courant : la validation
        // vient peut-être de faire passer S.day au suivant.
        nextOK
          ? '<div class="pair">' +
              '<button class="btn" data-lesson="' + d + '">Revoir l\'étape ' + d + '</button>' +
              '<button class="btn" data-lesson="' + (d + 1) + '">Leçon suivante</button>' +
            '</div>'
          : '<button class="btn wide" data-lesson="' + d + '">Revoir l\'étape ' + d + '</button>',
      '</div>'
    ].join("");
  }

  const q = l.quiz[qOrder[qi]];
  const picked = answered ? qLog[qi] : null;

  const opts = qPerm[qi].map(function (i) {
    let cls = "opt";
    if (answered) {
      if (i === q.a) cls += " right";
      else if (i === picked) cls += " wrong";
    }
    return '<button class="' + cls + '" data-pick="' + i + '"' + (answered ? " disabled" : "") + '>' + rich(q.o[i]) + '</button>';
  }).join("");

  return [
    backBar('Accueil'),
    '<div class="stack">',
      '<div class="stack-s">',
        '<span class="label">Quiz &#183; étape ' + S.day + ' &#183; question ' + (qi + 1) + ' sur ' + l.quiz.length + '</span>',
        '<div class="meter">' + l.quiz.map(function (_, i) {
          return '<i class="' + (i < qi || (answered && i === qi) ? (qLog[i] === l.quiz[qOrder[i]].a ? 'on' : 'err') : '') + '"></i>';
        }).join("") + '</div>',
      '</div>',

      /* L'énoncé est du HTML, pas du texte échappé — et c'est un DÉFAUT
         corrigé le 02/08/2026, trouvé en enquêtant sur la question fausse
         signalée par Exsangue. 88 énoncés emploient <b> pour détacher le mot
         allemand du français qui l'entoure ; `esc` les affichait en clair,
         « Le <b>w</b> allemand se prononce… » balises comprises.

         Ce n'est pas une brèche : le contenu de `quiz` est écrit dans ce
         fichier, il ne vient ni du réseau ni de l'utilisateur. Les OPTIONS,
         elles, restent échappées — aucune n'a jamais eu besoin de balise, et
         la règle « ce qui n'a pas besoin de HTML n'en reçoit pas » vaut d'être
         gardée là où elle ne coûte rien.
         ⚠️ Le livre reste sur l'autre règle : ses énoncés sont échappés, et
         une vérification l'impose. Les deux tableaux n'ont pas le même auteur. */
      '<p class="q">' + rich(q.q) + '</p>',
      '<div class="opts">' + opts + '</div>',
      answered ? '<div class="why">' + rich(q.why) + '</div>' : '',
      answered ? '<button class="btn primary wide" data-act="next">' + (qi + 1 >= l.quiz.length ? 'Voir le résultat' : 'Question suivante') + '</button>' : '',
    '</div>'
  ].join("");
}

/* ---------- L'oral ----------
   Aucun texte allemand à l'écran tant qu'on n'a pas répondu : on écoute, et
   on écrit. Deux consignes tirées au sort — réécrire ce qui est dit, ou le
   traduire. Les phrases entières de la leçon viennent s'ajouter aux mots :
   c'est à l'oreille qu'elles servent le plus. */
// `let` et non `const` : la longueur d'une séance est un réglage, posé par
// applyPrefs au démarrage et à chaque changement.
let ORAL_SIZE = 8;
const ORAL_MAX = 5;
let oral = [], oi = 0, oralVerdict = null;

/* Chaque phrase entendue a son propre niveau, indépendant de celui des cartes :
   reconnaître un mot à l'oreille n'est pas la même compétence que le restituer
   à l'écrit. La difficulté monte sur DEUX axes à la fois.

     niveau 1  traduire en français   une faute de frappe pardonnée
     niveau 2  traduire OU écrire     une faute de frappe pardonnée
     niveau 3  écrire en allemand     ae/ss acceptés, article facultatif
     niveau 4  écrire en allemand     l'article devient obligatoire
     niveau 5  écrire en allemand     forme exacte, trémas compris — mais le
                                      ß reste toujours facultatif (absent des
                                      claviers français, voir checkOral)

   Bonne réponse : +1. Ratée : −1, comme pour les cartes. */
function oralLevel(key) {
  return (S.oral && S.oral[key]) || 1;
}
function oralTask(level) {
  if (level <= 1) return "translate";
  if (level === 2) return Math.random() < 0.5 ? "translate" : "write";
  return "write";
}

function checkOral(typed, it, level) {
  if (!String(typed).trim()) return { ok: false, kind: "empty" };

  if (it.task === "translate") {
    // Même souplesse qu'aux cartes : la virgule d'une glose sépare des
    // synonymes, on n'exige pas de les citer tous.
    const v = checkGloss(typed, it.fr);
    if (v.ok || level > 2) return v;
    const core = normFR(String(it.fr).replace(/\([^)]*\)/g, " "));
    if (editDistance(normFR(typed), core, 2) <= 2) return { ok: true, kind: "typo" };
    return v;
  }

  if (level >= ORAL_MAX) {
    // Dernier niveau : les trémas sont exigés, plus de ae ni de oe.
    //
    // Le ß, LUI, reste toujours facultatif — corrigé le 01/08/2026. Exsangue :
    // « je trouverai une solution pour écrire ö ou ü, sauf ß qui n'est pas du
    // tout sur mon clavier ». Un tréma se compose sur un clavier français ; le
    // ß ne s'y trouve nulle part. L'exiger rendait le niveau 5 infranchissable
    // sur des mots aussi courants que Straße, groß ou heißen — on sanctionnait
    // le matériel, pas la connaissance.
    //
    // Restent libres deux choses qui NE S'ENTENDENT PAS et qu'il serait donc
    // absurde de sanctionner dans un exercice d'écoute : la ponctuation, et
    // la casse — que le téléphone impose de toute façon tout seul.
    const bare = function (s) {
      return String(s).toLowerCase()
        .replace(/ß/g, "ss")
        .replace(/[.,!?;:'’"()\[\]-]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
    };
    // Avec ou sans la note entre parenthèses : elle n'a jamais été demandée.
    const sansNote = bare(String(it.de).replace(/\([^)]*\)/g, " "));
    const got = bare(typed);
    return (got === bare(it.de) || got === sansNote)
      ? { ok: true, kind: "exact" }
      : { ok: false, kind: "strict" };
  }

  const v = checkAnswer(typed, it.de);
  if (level >= 4 && v.kind === "no-article") return { ok: false, kind: "need-article" };
  if (v.ok) return v;
  if (level <= 2 && v.kind === "wrong" &&
      editDistance(normDE(typed), normDE(it.de), 1) <= 1) {
    return { ok: true, kind: "typo" };
  }
  return v;
}

function oralItems(n) {
  const l = COURSE[S.day - 1];
  const pool = [];
  l.vocab.forEach(function (v, i) {
    pool.push({ de: v.d, fr: v.f, p: v.p, id: S.day + ":" + i, key: "v:" + S.day + ":" + i });
  });
  l.examples.forEach(function (e, i) {
    pool.push({ de: e.d, fr: e.f, p: "", id: null, key: "p:" + S.day + ":" + i });
  });

  /* Signalé par Exsangue le 01/08/2026 : une réplique de sept mots tombée en
     dictée, avec deux mots inconnus dedans — trop dur pour son niveau. Il a
     raison, et le défaut vient d'ici : le tirage mélangeait mots isolés et
     phrases entières au hasard, sans jamais regarder la difficulté.

     Une dictée de sept mots dont on n'en connaît pas deux n'apprend rien —
     on n'entend même pas où commencent les mots. La longueur est donc un
     plafond, et il MONTE avec le travail déjà fait sur l'étape : trois mots
     au départ, un mot de plus par phrase déjà sortie du niveau 1.

     On mesure en nombre de mots plutôt qu'en caractères : c'est ce qui décide
     de la charge à l'oreille, pas la longueur du mot. */
  const acquis = pool.filter(function (x) { return oralLevel(x.key) > 1; }).length;
  const plafond = Math.min(3 + acquis, 12);
  const mots = function (x) { return String(x.de).trim().split(/\s+/).length; };

  let dispo = pool.filter(function (x) { return mots(x) <= plafond; });

  /* Une étape dont toutes les phrases dépassent le plafond ne doit pas ouvrir
     une séance vide : on sert alors les plus courtes qu'on ait. */
  if (!dispo.length) {
    dispo = pool.slice().sort(function (a, b) { return mots(a) - mots(b); }).slice(0, n);
  }

  return shuffleIdx(dispo.length).slice(0, Math.min(n, dispo.length)).map(function (i) {
    const lvl = oralLevel(dispo[i].key);
    return Object.assign({ level: lvl, task: oralTask(lvl) }, dispo[i]);
  });
}

function oralView() {
  if (reprend("oral", oral.length > 0 && oi < oral.length)) return renderOral();
  oral = oralItems(ORAL_SIZE);
  oi = 0;
  oralVerdict = null;
  return renderOral();
}

function renderOral() {
  // Sans voix allemande, ce mode n'a aucun sens : on le dit, plutôt que
  // d'afficher un écran muet où rien ne se passe.
  if (!TTS.voice) {
    return [
      backBar('Accueil'),
      '<div class="stack">',
        '<div class="card">',
          '<span class="label">L\'oral</span>',
          '<p class="msg" style="margin:.5rem 0 0">Cet appareil n\'a pas de voix allemande installée, ' +
            'rien ne peut donc être prononcé.<br><br>Sur iPhone : <b>Réglages → Accessibilité → ' +
            'Contenu énoncé → Voix → Allemand</b>, puis reviens ici.</p>',
        '</div>',
        // Sans voix installée, l'oral est infaisable : on ne doit pas pour
        // autant se retrouver coincé au milieu du parcours.
        suiteBtn("oral"),
        '<button class="btn wide" data-go="home">Retour à l\'accueil</button>',
      '</div>'
    ].join("");
  }

  if (oi >= oral.length) {
    touchStreak();
    const good = oral.filter(function (x) { return x.ok; }).length;

    /* Refaire l'oral quand il y a eu trop de fautes — demandé par Exsangue le
       02/08/2026. Le seuil est la MOITIÉ, le même esprit que le quiz (qui en
       demande 60 %) mais plus indulgent : à l'oreille, on est légitimement
       moins bon qu'à la lecture, et un seuil trop haut enfermerait dans une
       boucle au lieu d'aider.

       On ne FORCE pas la reprise, on la met en premier et en couleur : le
       parcours passe au second plan, l'accueil reste offert. Enfermer
       quelqu'un dans un exercice raté est le meilleur moyen qu'il ferme
       l'app — et les erreurs sont déjà notées, rien ne serait sauvé. */
    const rate = good / oral.length;
    const aRefaire = rate < 0.5;

    return [
      backBar('Accueil'),
      '<div class="stack">',
        '<div class="score"><b>' + good + '/' + oral.length + '</b><span>à l\'oreille. ' +
          'Le calendrier de révision n\'a pas bougé, mais tes erreurs sont notées.</span></div>',
        aRefaire
          ? '<div class="why bad">Moins de la moitié. Reprends l\'oral une fois avant ' +
            'de passer à la suite : ce sont les mêmes mots, tu les entendras mieux.</div>' +
            '<button class="btn primary wide" data-go="oral">Refaire l\'oral</button>' +
            suiteBtn("oral")
          : suiteBtn("oral") +
            '<button class="btn wide" data-go="oral">Encore un tour</button>',
        '<button class="btn wide" data-go="home">Retour à l\'accueil</button>',
      '</div>'
    ].join("");
  }

  const it = oral[oi];
  const head = [
    backBar('Accueil'),
    '<div class="stack">',
      '<div class="stack-s">',
        '<span class="label">L\'oral &#183; ' + (oi + 1) + ' sur ' + oral.length +
          ' &#183; niveau ' + it.level + '/' + ORAL_MAX + '</span>',
        '<div class="meter">' + oral.map(function (_, i) {
          return '<i class="' + (i < oi ? (oral[i].ok ? 'on' : 'err') : '') + '"></i>';
        }).join("") + '</div>',
      '</div>'
  ].join("");

  if (!oralVerdict) {
    return head + [
      /* Le filigrane dit LA langue dans laquelle il faut répondre : c'est le
         seul choix qu'on peut se tromper à l'oral, puisqu'on n'a rien à
         lire. La consigne complète, juste dessous, ajoute le degré
         d'exigence (article, tréma) — un détail qui ne se résume pas. */
      '<div class="flash" data-consigne="' +
          (it.task === "write" ? "En allemand" : "En français") + '">',
        // data-autosay : la phrase est prononcée dès que l'écran s'affiche.
        '<button class="btn primary" data-say="' + att(it.de) + '" data-autosay="' + att(it.de) + '">&#9654;&nbsp; Réécouter</button>',
        '<div class="tip">' + (it.task === "write"
          ? (it.level >= ORAL_MAX
              ? 'Écris en allemand, <b>exactement</b> — tréma et ß compris.'
              : (it.level >= 4
                  ? 'Écris en allemand, <b>article compris</b>.'
                  : 'Écris en allemand ce que tu entends.'))
          : 'Écris en français ce que ça veut dire.') + '</div>',
      '</div>',
      '<input class="answer" id="answer"' + saisieAttrs("Ce que tu entends", it.task === "write") + '>',
      '<div class="pair">',
        '<button class="btn" data-act="oral-dunno">Je ne sais pas</button>',
        '<button class="btn primary" data-act="oral-check">Vérifier</button>',
      '</div>',
    '</div>'
    ].join("");
  }

  let note;
  if (oralVerdict.kind === "exact")            note = "Exact.";
  else if (oralVerdict.kind === "typo")        note = "Juste, à une faute de frappe près.";
  else if (oralVerdict.kind === "no-article")  note = "Juste. Pense à l'article : <b>" + esc(it.de) + "</b>.";
  else if (oralVerdict.kind === "article-en-plus")
                                               note = "Juste — ici on attendait <b>" + esc(it.de) +
                                                      "</b>, sans article.";
  else if (oralVerdict.kind === "need-article") note = "À ce niveau l'article compte : c'est <b>" + esc(it.de) + "</b>.";
  else if (oralVerdict.kind === "strict")      note = "Presque — à ce niveau il faut la forme exacte : <b>" + esc(it.de) + "</b>.";
  else if (oralVerdict.kind === "bad-article") note = "Le mot est bon, mais pas le genre : c'est <b>" + esc(it.de) + "</b>.";
  else if (oralVerdict.kind === "dunno")       note = "Pas grave — réécoute-la une fois de plus.";
  else if (oralVerdict.kind === "empty")       note = "Rien d'écrit.";
  /* À l'oral la faute d'orthographe n'a de sens que si l'on écrivait
     l'allemand : quand la consigne était de traduire, une lettre près n'est
     pas le sujet — c'est le sens qui manquait. */
  else                                         note = (it.task === "write" &&
                                                  fauteOrtho(oralVerdict.typed, it.de)) ||
                                                  "Ce n'était pas ça.";

  // Le déplacement de niveau, dit explicitement : c'est ce qui rend la
  // progression lisible d'une séance à l'autre.
  if (it.after > it.level)      note += ' <b>Niveau ' + it.level + ' → ' + it.after + '.</b>';
  else if (it.after < it.level) note += ' Niveau ' + it.level + ' → ' + it.after + '.';
  else if (it.after === ORAL_MAX && oralVerdict.ok) note += ' Niveau maximum tenu.';

  return head + [
    '<div class="flash">',
      '<div class="sol">' + esc(it.de) + '</div>',
      it.p ? '<div class="p">' + esc(it.p) + '</div>' : '',
      sayBtn(it.de),
      '<div class="trad">' + esc(it.fr) + '</div>',
      oralVerdict.typed ? '<div class="tip">Tu as écrit : ' + esc(oralVerdict.typed) + '</div>' : '',
    '</div>',
    '<div class="why ' + (oralVerdict.ok ? "good" : "bad") + '">' + note + '</div>',
    '<button class="btn primary wide" data-act="oral-next">Continuer</button>',
  '</div>'
  ].join("");
}

/* ---------- Les exercices ----------
   Quatre formes, pour ne pas servir le même QCM indéfiniment :

     order  remettre les mots dans l'ordre  — l'ordre des mots allemand, qui
                                              ne s'apprend que comme ça
     gap    compléter un trou               — terminaisons, articles, cas
     trans  transformer une phrase          — négation, question : la mécanique
     trad   traduire une phrase entière     — tout à la fois

   Ils vivent dans `drills`, au niveau de l'étape. Une étape sans `drills`
   n'affiche simplement pas le mode. */
let DRILL_SESSION = 8;   // combien on en sert par séance — réglable, voir applyPrefs

let drills = [], di = 0, drillVerdict = null, orderPool = [], orderPicked = [];

/* Le réservoir est plus grand qu'une séance, et on sert d'abord ce qui a été
   le MOINS VU. Mélanger seulement, comme au début, redonnait mot pour mot les
   mêmes exercices dans un autre ordre — c'est exactement ce qu'on veut éviter.
   À nombre de passages égal, on tire au hasard : deux séances de suite ne
   donnent donc pas la même liste. */
function drawDrills(n) {
  const src = (COURSE[S.day - 1] || {}).drills || [];
  if (!src.length) return [];

  const idx = shuffleIdx(src.length);                       // départage aléatoire
  idx.sort(function (a, b) {
    return drillSeen(a) - drillSeen(b);
  });

  return idx.slice(0, Math.min(n, src.length)).map(function (i) {
    return Object.assign({ key: S.day + ":" + i }, src[i]);
  });
}
function drillSeen(i) {
  return (S.dseen && S.dseen[S.day + ":" + i]) || 0;
}

function drillsView() {
  if (reprend("drills", drills.length > 0 && di < drills.length)) return renderDrill();
  drills = drawDrills(DRILL_SESSION);
  // On note tout de suite ce qui est servi : même si la séance est abandonnée,
  // la prochaine proposera autre chose.
  if (!S.dseen) S.dseen = {};
  drills.forEach(function (d) { S.dseen[d.key] = (S.dseen[d.key] || 0) + 1; });
  persist();
  di = 0;
  setupDrill();
  return renderDrill();
}

/* Prépare l'exercice courant. Pour « remettre dans l'ordre », les étiquettes
   sont tirées une fois ici : les remélanger à chaque redessin les ferait
   sauter sous le doigt. */
function setupDrill() {
  drillVerdict = null;
  orderPicked = [];
  orderPool = [];
  const d = drills[di];
  if (d && d.t === "order") {
    const mots = bareSentence(d.a).split(" ");
    orderPool = shuffleIdx(mots.length).map(function (i) { return mots[i]; });
  }
}

/* La phrase sans sa ponctuation : ce sont les mots qu'on assemble. */
function bareSentence(s) {
  return String(s).replace(/[.,!?;:]/g, " ").replace(/\s+/g, " ").trim();
}

function drillAnswer(d) {
  return orderPicked.map(function (i) { return orderPool[i]; }).join(" ");
}

/* Ce que cache le trou d'un énoncé « ___ ».

   Signalé par Exsangue le 18/08/2026, capture à l'appui : l'exercice affichait
   « ___ Mai » sous la consigne « mets la préposition qui convient », il a écrit
   « im » — la bonne préposition — et l'app a refusé, parce qu'elle attendait
   « im Mai ». Il a raison, c'est illogique : on ne peut pas montrer un trou et
   exiger la phrase entière.

   L'app a pourtant le bon type pour ça — `gap`, que 443 exercices emploient.
   Huit exercices étaient typés `trans` alors qu'ils sont POSÉS comme des `gap`.
   On aurait pu retyper ces huit-là ; on corrige plutôt le moteur, parce que
   retyper ne protège pas le neuvième, celui qui sera écrit dans six mois.

   Le trou se DÉDUIT : l'énoncé donne le début et la fin, la réponse complète
   donne le tout, la différence est le mot attendu. Aucune donnée à ressaisir,
   donc aucune occasion de se tromper en la ressaisissant.

   Renvoie null s'il n'y a pas de trou, s'il y en a plusieurs — on ne saurait
   pas lequel est demandé — ou si la réponse ne colle pas à l'énoncé : données
   incohérentes, et là on ne devine pas, on laisse le contrôle plein juger. */
function gapOf(from, answer) {
  const parts = String(from == null ? "" : from).split(/_{3,}/);
  if (parts.length !== 2) return null;
  const quote = function (s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); };
  const re = new RegExp(
    "^\\s*" + quote(parts[0].trim()) + "\\s*(.+?)\\s*" + quote(parts[1].trim()) + "\\s*$"
  );
  const m = String(answer == null ? "" : answer).match(re);
  return m ? m[1] : null;
}

function checkDrill(d, typed) {
  if (d.t === "order") {
    const got = normDE(drillAnswer(d));
    if (!got) return { ok: false, kind: "empty" };
    return got === normDE(bareSentence(d.a))
      ? { ok: true, kind: "exact" }
      : { ok: false, kind: "wrong" };
  }
  const plein = checkAnswer(typed, d.a);
  if (plein.ok) return plein;

  /* Énoncé à trou : le mot seul vaut la phrase entière. Les DEUX sont acceptés
     — écrire « im Mai » reste juste — et rien d'autre ne s'élargit : c'est le
     même checkAnswer, avec la même sévérité sur le genre. */
  const trou = gapOf(d.from, d.a);
  if (trou) {
    const court = checkAnswer(typed, trou);
    if (court.ok) return court;
    /* Raté des deux côtés : on garde le verdict du trou, celui de la question
       réellement posée. C'est lui qui permettra de pointer la faute de frappe
       sur « im » plutôt que de la chercher, en vain, dans « im Mai ». */
    court.gap = trou;
    return court;
  }
  return plein;
}

function renderDrill() {
  if (!drills.length) {
    return [
      backBar('Accueil'),
      '<div class="stack">',
        '<div class="card"><span class="label">Les exercices</span>',
          '<p class="msg" style="margin:.5rem 0 0">Cette étape n\'a pas encore d\'exercices écrits.</p></div>',
        suiteBtn("drills"),
        '<button class="btn wide" data-go="home">Retour à l\'accueil</button>',
      '</div>'
    ].join("");
  }

  if (di >= drills.length) {
    touchStreak();
    const bons = drills.filter(function (x) { return x.ok; }).length;
    return [
      backBar('Accueil'),
      '<div class="stack">',
        '<div class="score"><b>' + bons + '/' + drills.length + '</b><span>exercices réussis.</span></div>',
        suiteBtn("drills"),
        '<button class="btn wide" data-go="drills">Recommencer</button>',
        '<button class="btn wide" data-go="home">Retour à l\'accueil</button>',
      '</div>'
    ].join("");
  }

  const d = drills[di];
  const consignes = {
    order: "Remets les mots dans l'ordre.",
    gap:   "Complète la phrase.",
    trans: d.inst || "Transforme la phrase.",
    trad:  "Traduis en allemand."
  };

  /* Le filigrane — le coup d'œil, pas la phrase. Pour les transformations,
     le PREMIER MOT de l'instruction est déjà le verbe qui compte
     (« Transforme… », « Remets… ») : on le prend là plutôt que d'écrire une
     seconde table, qui finirait tôt ou tard par contredire la première. */
  const filigranes = {
    order: "Dans l'ordre",
    gap:   "Complète",
    trans: String(d.inst || "Transforme").split(" ")[0].replace(/[.,;:!?]+$/, ""),
    trad:  "En allemand"
  };
  const filigrane = filigranes[d.t] || "";

  const head = [
    backBar('Accueil'),
    '<div class="stack">',
      '<div class="stack-s">',
        '<span class="label">Exercice ' + (di + 1) + ' sur ' + drills.length + '</span>',
        '<div class="meter">' + drills.map(function (_, i) {
          return '<i class="' + (i < di ? (drills[i].ok ? 'on' : 'err') : '') + '"></i>';
        }).join("") + '</div>',
      '</div>',
      '<div class="card"' +
        (filigrane ? ' data-consigne="' + att(filigrane) + '"' : '') + '>',
        '<h3 class="sec">' + esc(consignes[d.t] || "") + '</h3>',
        d.f     ? '<p class="q" style="margin-top:.75rem">' + esc(d.f) + '</p>' : '',
        d.from  ? '<p class="de" style="margin-top:.5rem">' + esc(d.from) + '</p>' : '',
        d.s     ? '<p class="de" style="margin-top:.5rem">' + esc(d.s) + '</p>' : '',
      '</div>'
  ].join("");

  if (!drillVerdict) {
    const saisie = d.t === "order"
      ? [
          '<div class="build">' +
            orderPicked.map(function (p, k) {
              return '<button class="chip-w" data-unchip="' + k + '">' + esc(orderPool[p]) + '</button>';
            }).join("") +
          '</div>',
          '<div class="chips">' +
            orderPool.map(function (w, i) {
              return orderPicked.indexOf(i) !== -1 ? '' :
                '<button class="chip-w" data-chip="' + i + '">' + esc(w) + '</button>';
            }).join("") +
          '</div>'
        ].join("")
      : '<input class="answer" id="answer"' + saisieAttrs("Ta réponse", true) + '>';

    return head + saisie + [
      '<div class="pair">',
        '<button class="btn" data-act="drill-skip">Je ne sais pas</button>',
        '<button class="btn primary" data-act="drill-check">Vérifier</button>',
      '</div>',
    '</div>'
    ].join("");
  }

  return head + [
    '<div class="flash">',
      '<div class="sol">' + esc(d.a) + '</div>',
      drillVerdict.typed ? '<div class="tip">Tu as écrit : ' + esc(drillVerdict.typed) + '</div>' : '',
    '</div>',
    /* Deux choses différentes, et il faut les deux : la FAUTE (où ça coince
       dans ce qu'on a écrit) puis la RÈGLE (`why`, écrite avec l'exercice).
       La faute vient en premier — on regarde d'abord son erreur, on comprend
       la règle ensuite. Elle ne s'affiche que si c'est vraiment une question
       d'orthographe ; sinon la règle seule répond mieux. */
    '<div class="why ' + (drillVerdict.ok ? "good" : "bad") + '">' +
      (drillVerdict.ok
        ? "Exact. "
        : (function () {
            /* Sur un énoncé à trou, la faute se cherche dans LE MOT demandé,
               pas dans la phrase entière : « in » pour « im » est une lettre à
               corriger, et la comparer à « im Mai » ne trouverait rien. */
            const f = fauteOrtho(drillVerdict.typed, drillVerdict.gap || d.a);
            return f ? f + "<br>" : "";
          })()) +
      (d.why || "") + '</div>',
    '<button class="btn primary wide" data-act="drill-next">Continuer</button>',
  '</div>'
  ].join("");
}

/* ===============================================================
   5. NAVIGATION — un seul écouteur pour toute l'app
   =============================================================== */
/* ---------------------------------------------------------------
   L'onglet « Le livre »
   ---------------------------------------------------------------
   Trois écrans : le sommaire des unités, une unité, le test de fin
   de niveau.

   La première version était volontairement passive — on lisait, rien
   n'était corrigé. Exsangue l'a arrêtée net : « j'aimerais pouvoir
   répondre aux questions du livre et que tu me corriges ». Il a raison,
   et le raisonnement d'avant était faux : un exercice qu'on ne peut pas
   faire n'est plus un exercice, c'est une page à regarder.

   On corrige donc ici, avec le MÊME moteur que le reste de l'app —
   checkAnswer pour l'allemand (tolérant sur ß, les trémas, la casse et
   la ponctuation ; strict sur le genre) et checkFR pour le français.
   Aucun second moteur : deux correcteurs qui divergent, c'est la
   garantie qu'un jour l'un des deux refusera ce que l'autre accepte.

   Deux sortes de questions, et la distinction est nette :
   - `a` : une réponse attendue → on corrige.
   - `model` : une question ouverte (« présentez-vous », « décrivez votre
     famille ») → aucune correction automatique n'a de sens, on montre
     une réponse possible à comparer. Prétendre corriger « décrivez votre
     famille » serait mentir sur ce que l'app sait faire. */

/* ---------------------------------------------------------------
   Le suivi du livre
   ---------------------------------------------------------------
   Demandé par Exsangue le 01/08/2026 : voir qu'une leçon est faite, et
   si elle l'a été sans faute.

   On enregistre le PREMIER verdict de chaque question, et lui seul.
   Réessayer ensuite n'efface pas l'erreur — sinon « sans faute » ne
   voudrait plus rien dire, il suffirait d'insister. Réviser reste
   possible et utile ; c'est la trace qui ne bouge plus.

   Révéler la réponse avant d'avoir répondu compte comme une faute :
   c'est exactement ce que veut dire le bouton.

   Les questions ouvertes (`model`) restent hors du compte — on ne peut
   pas juger « décrivez votre famille », et un compteur qui prétendrait
   le faire serait faux. */

function askIds(u) {
  const ids = [];
  (u.exercises || []).forEach(function (ex, k) {
    (ex.items || []).forEach(function (it, j) {
      if (it.a) ids.push("u" + u.n + "-" + k + "-" + j);
    });
  });
  return ids;
}

function unitScore(u) {
  const ids = askIds(u);
  let faits = 0, fautes = 0;
  ids.forEach(function (id) {
    const v = S.bookq[id];
    if (v === undefined) return;
    faits++;
    if (!v) fautes++;
  });
  return {
    total: ids.length, faits: faits, fautes: fautes,
    fini: ids.length > 0 && faits === ids.length
  };
}

/* L'étiquette affichée pour une unité, sur le sommaire comme en fin d'unité. */
function unitBadge(u) {
  const s = unitScore(u);
  if (!s.total)  return { txt: "à lire", cls: "" };
  if (!s.faits)  return { txt: s.total + " questions", cls: "" };
  if (!s.fini)   return { txt: s.faits + " / " + s.total, cls: "" };
  if (!s.fautes) return { txt: "sans faute", cls: " ok" };
  return { txt: s.fautes + " faute" + (s.fautes > 1 ? "s" : ""), cls: " hot" };
}

/* ---------------------------------------------------------------
   L'indice « où chercher »
   ---------------------------------------------------------------
   Signalé par Exsangue le 01/08/2026 : à l'unité 4, l'exercice demande de
   traduire « chez moi », « fiancée », « samedi soir »… mais la liste de
   vocabulaire n'a que six mots pour sept demandés. Les réponses sont dans
   le DIALOGUE — jamais dans la liste.

   Le livre attend donc qu'on relise le dialogue pour y pêcher les mots.
   La méthode est défendable : elle force à relire. Mais il ne le dit nulle
   part, et sa liste laisse croire qu'elle est complète — on cherche alors
   un mot qu'on est certain de n'avoir jamais vu, et on se croit fautif.

   On calcule donc l'indice au lieu de l'écrire à la main : pour chaque
   question, on regarde si la réponse se trouve dans les listes de
   vocabulaire, dans le dialogue, ou nulle part. Écrit à la main sur 35
   unités, il finirait faux quelque part ; calculé, il reste juste même si
   une unité change. */

function motsDeLUnite(u) {
  const listes = [], dialogue = [];
  (u.sections || []).forEach(function (s) {
    (s.rows || []).forEach(function (r) {
      listes.push(normDE(r[0]));
      listes.push(normDE(r[1]));
    });
    (s.p || []).forEach(function (t) { listes.push(normDE(t)); });
  });
  if (u.dialogue) {
    u.dialogue.lines.forEach(function (l) { dialogue.push(normDE(l.de)); });
  }
  return { listes: listes.join(" · "), dialogue: dialogue.join(" · ") };
}

/* Renvoie l'indice à afficher sous une question, ou "" s'il n'y a rien
   d'utile à dire. On ne signale QUE le cas gênant : la réponse existe dans
   l'unité, mais ailleurs que là où on la cherche. */
function indiceOu(u, it) {
  if (!it.a) return "";
  const cible = normDE(it.a);
  if (!cible) return "";
  const src = motsDeLUnite(u);

  if (src.listes.indexOf(cible) !== -1) return "";           // là où on l'attend
  if (src.dialogue.indexOf(cible) !== -1) return "Cherche dans le dialogue.";
  return "";
}

/* Une question du livre : l'énoncé, un champ, un bouton.
   `id` doit être unique sur l'écran — c'est lui qui relie le bouton à son
   champ et à sa zone de réponse. */
function askItem(it, id, indice) {
  ASKED[id] = it;
  const ouverte = !it.a;
  return [
    '<div class="ask-item">',
      '<p class="ask-q">' + esc(it.q) + '</p>',
      indice ? '<p class="ask-ou">' + esc(indice) + '</p>' : '',
      ouverte
        ? '<button class="btn" data-model="' + att(id) + '">Voir une réponse possible</button>'
        /* Les exercices du livre étaient en allemand. Ce chemin est DORMANT
           depuis que le livre a été retiré (`BOOK` est vide) : on ne peut plus
           le vérifier à l'écran, seulement dans l'historique. */
        : '<input class="answer" data-in="' + att(id) + '"' + saisieAttrs("Ta réponse", true) + '>' +
          '<div class="pair">' +
            '<button class="btn primary" data-send="' + att(id) + '">Envoyer</button>' +
            '<button class="btn" data-check="' + att(id) + '">Voir la réponse</button>' +
          '</div>',
      '<div class="ask-fb" data-fb="' + att(id) + '" hidden></div>',
    '</div>'
  ].join("");
}

/* L'indice donné quand la réponse est fausse. Il doit aider à REESSAYER
   sans donner la solution — demandé par Exsangue : « peut-être j'ai oublié
   juste un mot ou mal orthographié ». Dire seulement « faux » ne permet pas
   de savoir s'il faut tout revoir ou corriger une lettre. */
function hintFor(typed, expected, fr) {
  const norm = fr ? normFR : normDE;
  const t = norm(typed), e = norm(expected);
  if (!t) return "Écris quelque chose d'abord.";

  const mt = t.split(" ").length, me = e.split(" ").length;
  if (mt < me) return "Presque — il manque " + (me - mt > 1 ? (me - mt) + " mots." : "un mot.");
  if (mt > me) return "Il y a " + (mt - me > 1 ? (mt - me) + " mots de trop." : "un mot de trop.");

  // On réutilise la distance plafonnée de l'app : au-delà de 5, savoir si
  // c'est 6 ou 40 ne change rien à ce qu'on affiche.
  const d = editDistance(t, e, 5);
  if (d <= 2) return "Tout près — regarde l'orthographe.";
  if (d <= 5) return "Le bon nombre de mots, mais ce n'est pas encore ça.";
  return "Pas encore. Reprends la phrase depuis le début.";
}

/* Corrige une question. `reveal` sépare les deux boutons demandés par
   Exsangue : « Envoyer » dit juste ou faux et laisse réessayer ; « Voir la
   réponse » dévoile. Confondre les deux, c'est priver du deuxième essai —
   or c'est souvent au deuxième essai qu'on apprend vraiment.
   Renvoie true si la réponse est juste. */
function gradeItem(id, reveal) {
  const it = ASKED[id];
  if (!it) return false;
  const input = view.querySelector('[data-in="' + id + '"]');
  const fb = view.querySelector('[data-fb="' + id + '"]');
  const tape = input ? input.value : "";

  // Le français est corrigé avec indulgence, l'allemand avec exigence :
  // c'est là que l'orthographe EST l'objectif.
  const v = it.fr ? checkFR(tape, it.a) : checkAnswer(tape, it.a);

  let note, classe;
  if (reveal) {
    note = "La réponse : <b>" + esc(it.a) + "</b>";
    classe = "";
  } else if (v.ok) {
    note = v.kind === "no-article"
      ? "Juste — pense à l'article la prochaine fois."
      : v.kind === "article-en-plus"
        ? "Juste — l'article n'était pas demandé ici."
        : "Exact.";
    classe = " good";
  } else if (v.kind === "bad-article") {
    note = "Le genre de l'article n'est pas le bon. Réessaie.";
    classe = " bad";
  } else {
    note = hintFor(tape, it.a, it.fr);
    classe = " bad";
  }

  /* On fige le premier verdict. Un champ vide n'en est pas un : appuyer sur
     Envoyer sans avoir écrit ne doit pas coûter une faute. */
  const vide = !reveal && v.kind === "empty";
  if (!vide && S.bookq[id] === undefined) {
    S.bookq[id] = (!reveal && v.ok) ? 1 : 0;
    persist();
  }

  if (fb) {
    fb.className = "ask-fb" + classe;
    fb.innerHTML = note;
    marqueAllemand(fb);
    fb.hidden = false;
  }
  return v.ok;
}

/* Les questions affichées à l'écran, par identifiant. Rempli à chaque
   rendu : sans ça, le bouton « Vérifier » n'aurait aucun moyen de
   retrouver la réponse attendue. */
let ASKED = {};

function bookView() {
  ASKED = {};
  let finies = 0, impec = 0;
  BOOK.forEach(function (u) {
    const s = unitScore(u);
    if (s.fini) { finies++; if (!s.fautes) impec++; }
  });

  /* Trente-cinq unités à la file font un écran interminable qu'on ne relit
     jamais. Signalé par Exsangue. On les replie par groupes, avec un
     `<details>` natif : pas de code d'ouverture à écrire, et ça reste
     accessible au clavier et aux lecteurs d'écran.
     Le groupe où l'on travaille s'ouvre tout seul — sinon il faudrait
     recliquer au même endroit à chaque visite. */
  const groupes = BOOK_GROUPS.map(function (g) {
    const dedans = BOOK.filter(function (u) { return u.n >= g.de && u.n <= g.a; });
    if (!dedans.length) return "";

    let gFinies = 0;
    const cartes = dedans.map(function (u) {
      const s = unitScore(u), b = unitBadge(u);
      if (s.fini) gFinies++;
      return '<button class="mode" data-unit="' + u.n + '">' +
               '<div class="txt"><strong>' + (s.fini ? '&#10003; ' : '') +
                 'Unité ' + u.n + ' &#183; ' + esc(u.title) + '</strong>' +
               '<span>page ' + esc(u.pages) + (u.dialogue ? ' &#183; dialogue' : '') + '</span></div>' +
               '<span class="chip' + b.cls + '">' + b.txt + '</span>' +
             '</button>';
    }).join("");

    const ouvert = S.unit >= g.de && S.unit <= g.a;
    return '<details class="grp"' + (ouvert ? ' open' : '') + '>' +
             '<summary>' +
               '<span class="g-t">' + esc(g.titre) + '</span>' +
               '<span class="g-n">unités ' + g.de + '–' + g.a + ' &#183; ' +
                 gFinies + '/' + dedans.length + '</span>' +
             '</summary>' +
             '<div class="modes">' + cartes + '</div>' +
           '</details>';
  }).join("");

  return [
    '<div class="stack">',
      backBar("Accueil"),
      '<div class="stack-s">',
        '<span class="label">Le livre &#183; niveau ' + LIVRE_NIVEAU + ' &#183; ' +
          finies + ' / ' + BOOK.length + ' unités terminées' +
          (impec ? ' &#183; ' + impec + ' sans faute' : '') + '</span>',
        '<h2>Le livre</h2>',
        '<p class="msg">Les unités telles qu\'elles sont dans ton livre : le dialogue, ' +
          'les listes, les exercices. Une unité est terminée quand tu as répondu à toutes ' +
          'ses questions — c\'est la <b>première</b> réponse qui compte.</p>',
      '</div>',
      groupes,
      '<button class="btn wide" data-go="booktest">Test de fin de niveau &#183; ' +
        BOOK_TEST.exercises.length + ' exercices</button>',
    '</div>'
  ].join("");
}

/* Le bilan affiché au bas d'une unité. Tant qu'elle n'est pas terminée on
   dit seulement où on en est : annoncer un score à mi-parcours donnerait
   une note à un travail inachevé. */
function bilan(u) {
  const s = unitScore(u);
  if (!s.total) return "";

  let titre, corps;
  if (!s.fini) {
    titre = "En cours";
    corps = s.faits + " question" + (s.faits > 1 ? "s" : "") + " sur " + s.total +
            ". Il en reste " + (s.total - s.faits) + ".";
  } else if (!s.fautes) {
    titre = "&#10003; Unité terminée &#183; sans faute";
    corps = "Les " + s.total + " questions justes du premier coup. Tu peux passer à la suite.";
  } else {
    titre = "&#10003; Unité terminée";
    corps = (s.total - s.fautes) + " sur " + s.total + " justes du premier coup, " +
            s.fautes + " faute" + (s.fautes > 1 ? "s" : "") +
            ". Refaire l'unité remet le compteur à zéro.";
  }

  return '<div class="card">' +
           '<span class="label">' + titre + '</span>' +
           '<p class="msg" style="margin:.375rem 0 0">' + corps + '</p>' +
           (s.faits ? '<button class="btn" style="margin-top:.5rem" data-reset="' + u.n +
                      '">Refaire cette unité</button>' : '') +
         '</div>';
}

function unitView() {
  ASKED = {};
  const u = BOOK.filter(function (x) { return x.n === S.unit; })[0] || BOOK[0];

  /* Dans la version publiée, `BOOK` est vide et cet écran n'est atteignable
     que par une adresse tapée à la main (#unite3). Il ne doit pas planter
     pour autant : une page blanche muette vaut mieux qu'un écran cassé. */
  if (!u) {
    return [
      backBar("Accueil"),
      '<div class="stack"><div class="card">',
        '<span class="label">Le livre</span>',
        '<p class="msg" style="margin:.5rem 0 0">Cette version ne contient pas le livre.</p>',
      '</div></div>'
    ].join("");
  }

  const dial = u.dialogue ? [
    '<div class="stack-s">',
      '<h3 class="sec">Dialogue</h3>',
      '<p class="msg">' + esc(u.dialogue.inst) + '</p>',
      '<button class="btn primary wide" data-play="' + u.n + '">▶ Écouter tout le dialogue</button>',
      u.dialogue.lines.map(function (l, i) {
        return '<div class="card" data-line="' + i + '">' +
                 '<span class="label">' + esc(l.who) + '</span>' +
                 '<p class="de">' + esc(l.de) + ' ' + sayBtn(l.de) + '</p>' +
                 (l.fr ? '<p class="trad" data-fr="' + i + '" hidden>' + esc(l.fr) + '</p>' +
                         '<button class="btn" data-reveal="' + i + '">Traduction</button>' : '') +
               '</div>';
      }).join(""),
    '</div>'
  ].join("") : "";

  const secs = (u.sections || []).map(function (s) {
    const corps = s.rows
      ? '<table class="tbl">' + s.rows.map(function (r) {
          return '<tr><td>' + esc(r[0]) + '</td><td>' + esc(r[1]) + '</td></tr>';
        }).join("") + '</table>'
      : (s.p || []).map(function (t) { return '<p class="msg">' + esc(t) + '</p>'; }).join("");
    return '<div class="stack-s"><h3 class="sec">' + esc(s.h) + '</h3>' + corps + '</div>';
  }).join("");

  const exos = (u.exercises || []).map(function (ex, k) {
    return '<div class="card">' +
             '<p class="msg">' + esc(ex.inst) + '</p>' +
             (ex.items || []).map(function (it, j) {
               return askItem(it, "u" + u.n + "-" + k + "-" + j, indiceOu(u, it));
             }).join("") +
           '</div>';
  }).join("");

  const i = BOOK.map(function (x) { return x.n; }).indexOf(u.n);
  const prev = i > 0 ? BOOK[i - 1].n : null;
  const next = i < BOOK.length - 1 ? BOOK[i + 1].n : null;

  return [
    '<div class="stack">',
      '<button class="back" data-go="book">&#8592; Le livre</button>',
      '<div class="stack-s">',
        '<span class="label">Unité ' + u.n + ' &#183; niveau ' + LIVRE_NIVEAU + ' &#183; page ' + esc(u.pages) + '</span>',
        '<h2>' + esc(u.title) + '</h2>',
        u.intro ? '<p class="msg">' + esc(u.intro) + '</p>' : '',
      '</div>',
      dial,
      secs,
      exos ? '<div class="stack-s"><h3 class="sec">Exercices</h3>' + exos + '</div>' : '',
      bilan(u),
      '<div class="tools">',
        prev !== null ? '<button class="tool" data-unit="' + prev + '">&#8592; Unité ' + prev + '</button>' : '',
        next !== null ? '<button class="tool" data-unit="' + next + '">Unité ' + next + ' &#8594;</button>' : '',
      '</div>',
    '</div>'
  ].join("");
}

function bookTestView() {
  ASKED = {};
  const exos = BOOK_TEST.exercises.map(function (ex) {
    return '<div class="card">' +
             '<span class="label">Exercice ' + ex.n + ' &#183; ' + esc(ex.h) + '</span>' +
             '<p class="msg">' + esc(ex.inst) + '</p>' +
             (ex.items || []).map(function (it, j) {
               return askItem(it, "t" + ex.n + "-" + j);
             }).join("") +
           '</div>';
  }).join("");

  return [
    '<div class="stack">',
      '<button class="back" data-go="book">&#8592; Le livre</button>',
      '<div class="stack-s">',
        '<span class="label">Pages ' + esc(BOOK_TEST.pages) + ' &#183; ' + BOOK_TEST.exercises.length + ' exercices</span>',
        '<h2>' + esc(BOOK_TEST.title) + '</h2>',
        '<p class="msg">Le test du livre, à faire sur papier. Il reprend tout le niveau, ' +
          'dans l\'ordre des unités.</p>',
      '</div>',
      exos,
    '</div>'
  ].join("");
}

/* ---------- Les réglages ----------
   Demandés par Exsangue le 01/08/2026 : « peut-être rajouter des paramètres
   pour modifier les préférences ». Six réglages, tous appliqués sur-le-champ
   et conservés dans la sauvegarde.

   Aucun bouton « Enregistrer » : le changement prend effet au clic et se
   voit tout de suite. Un écran de réglages qu'il faut valider oblige à
   deviner ce qu'on obtiendra, alors qu'ici il suffit de regarder. */
function segment(cle, valeurs, actuel) {
  return '<div class="seg">' + valeurs.map(function (v) {
    return '<button class="segb' + (v.id === actuel ? ' on' : '') + '"' +
           ' data-pref="' + cle + '" data-val="' + v.id + '"' +
           (v.id === actuel ? ' aria-pressed="true"' : ' aria-pressed="false"') + '>' +
           esc(v.nom) + '</button>';
  }).join("") + '</div>';
}

function reglagesView() {
  const p = S.prefs;
  const bloc = function (titre, aide, corps) {
    return '<div class="stack-s">' +
             '<h3 class="sec">' + titre + '</h3>' +
             (aide ? '<p class="msg">' + aide + '</p>' : '') +
             corps +
           '</div>';
  };

  return [
    backBar('Accueil'),
    '<div class="stack">',

      '<div class="stack-s">',
        /* Plus d'étiquette « Réglages » ici : le badge de l'en-tête le dit
           déjà, et le mot s'affichait deux fois à trois centimètres d'écart.
           Vu sur une capture, pas par un test. */
        '<h2>À ton goût</h2>',
        '<p class="msg">Tout se change ici et s\'applique tout de suite. ' +
          'Ces choix partent dans la sauvegarde avec ta progression.</p>',
      '</div>',

      /* Le chiffre avant les préférences : quand on ouvre le rouage, c'est
         souvent pour savoir où l'on en est, pas pour changer une couleur. */
      bloc('Ma progression', '',
        '<p class="msg">' + Object.keys(S.cards).length + ' mots en circulation &#183; ' +
          learnedCount() + ' bien ancrés &#183; ' + shakyCount() + ' fragiles &#183; ' +
          'série de ' + S.streak + ' jour' + (S.streak > 1 ? 's' : '') + '</p>' +
        '<div class="tools">' +
          '<button class="tool" data-act="export">Sauvegarder</button>' +
          '<button class="tool" data-act="import">Restaurer</button>' +
          '<button class="tool danger" data-act="reset">Tout effacer</button>' +
        '</div>' +
        /* La date de la version. Ajoutée le 02/08/2026 après une photo
           d'Exsangue montrant un défaut déjà corrigé : son iPhone servait
           une page en cache, et ni lui ni moi n'avions moyen de le savoir —
           on a cherché un bug dans du code qu'il n'exécutait pas.

           `document.lastModified` est la date du FICHIER, donnée par le
           serveur. Elle ne peut pas se désynchroniser d'un numéro de version
           écrit à la main, qu'on oublierait de changer une fois sur deux. */
        '<p class="msg" style="margin-top:.5rem">Version du <b>' +
          esc(new Date(document.lastModified).toLocaleString("fr-FR", {
            day: "2-digit", month: "2-digit", year: "numeric",
            hour: "2-digit", minute: "2-digit"
          })) + '</b><br>Si cette date est ancienne alors qu\'une correction ' +
          'vient d\'être faite, ferme complètement l\'app et rouvre-la.</p>'),

      /* ---- La sauvegarde par copier-coller ----
         Ajoutée le 02/08/2026, sur une vraie inquiétude d'Exsangue : « si je
         supprime l'icône et la refais depuis Safari, je perds ma progression ? »

         La question est juste, et la réponse honnête est « peut-être » : iOS
         PEUT donner à une app ajoutée à l'écran d'accueil un espace de
         stockage distinct de celui de Safari. On ne parie pas une progression
         là-dessus.

         Or les deux boutons du dessus reposent sur un FICHIER — un
         téléchargement et un sélecteur de fichier — et c'est précisément ce
         qui marche le moins bien dans une app d'écran d'accueil iOS, où il
         n'y a ni barre d'adresse ni gestionnaire de téléchargements visible.

         Le texte, lui, marche partout : on copie, on colle. Aucun fichier,
         aucun dossier à retrouver. C'est le chemin de secours, et sur iPhone
         c'est probablement le chemin principal. */
      '<details class="grp">' +
        '<summary>' +
          '<span class="g-t">Sauvegarde sans fichier</span>' +
          '<span class="g-n">copier-coller</span>' +
        '</summary>' +
        '<div class="stack-s" style="padding-top:.75rem">' +
          '<p class="msg">À utiliser avant de changer de téléphone, ou avant de ' +
            'refaire le raccourci sur l\'écran d\'accueil. <b>Copie</b> ce texte et ' +
            'garde-le quelque part (une note, un message que tu t\'envoies). ' +
            'Pour revenir en arrière, colle-le dans le second cadre.</p>' +
          '<textarea class="sauve" id="sauve-out" readonly rows="3" ' +
            'aria-label="Ta progression, à copier">' + esc(JSON.stringify(S)) + '</textarea>' +
          '<button class="btn wide" data-act="copier">Copier ma progression</button>' +
          /* Les attributs sont écrits ici et non repris de `saisieAttrs` :
             celle-ci pose `type="text"`, qui n'a aucun sens sur un
             `textarea`. Ce qui compte est gardé — pas de correction
             automatique ni de majuscule sur du JSON, où un caractère changé
             rend la sauvegarde illisible. */
          /* Le cadre est PRÉ-REMPLI avec la sauvegarde mise de côté quand on
             n'a pas su la relire. Sans ça, on dirait à quelqu'un « ta
             progression est à l'abri » en le laissant chercher où. Ici il
             n'a qu'à appuyer sur Restaurer. */
          '<textarea class="sauve" id="sauve-in" rows="3"' +
            ' autocomplete="rien-a-remplir" autocorrect="off"' +
            ' autocapitalize="off" spellcheck="false"' +
            ' aria-label="Colle ici une sauvegarde">' +
            esc(sauveIllisible || secoursEnAttente() || "") + '</textarea>' +
          '<button class="btn wide" data-act="coller">Restaurer depuis le texte</button>' +
        '</div>' +
      '</details>',

      bloc('La voix',
        'La vitesse à laquelle l\'allemand est prononcé. ' +
        '<b>Lente</b> pour distinguer chaque son, <b>vive</b> quand tu ' +
        'commences à comprendre sans effort.',
        segment("voix", [
          { id: "lente",   nom: "Lente" },
          { id: "posee",   nom: "Posée" },
          { id: "normale", nom: "Normale" },
          { id: "vive",    nom: "Vive" }
        ], p.voix)),

      bloc('Le son au démarrage',
        'Coupé, plus rien ne se prononce sans que tu le demandes. ' +
        'À l\'oral, l\'écran reste alors muet jusqu\'à ce que tu appuies sur ' +
        '<b>Réécouter</b> — le bouton est toujours là.',
        segment("sonAuto", [
          { id: "oui", nom: "Le mot se dit tout seul" },
          { id: "non", nom: "Seulement si je demande" }
        ], p.sonAuto ? "oui" : "non")),

      bloc('Le thème',
        '<b>Automatique</b> suit le réglage de ton téléphone.',
        segment("theme", [
          { id: "auto",  nom: "Automatique" },
          { id: "light", nom: "Clair" },
          { id: "dark",  nom: "Sombre" }
        ], p.theme)),

      bloc('La taille du texte',
        'Tout grandit ensemble — les mots, les boutons, les marges.',
        segment("texte", [
          { id: "normal", nom: "Normal" },
          { id: "grand",  nom: "Grand" },
          { id: "enorme", nom: "Très grand" }
        ], p.texte)),

      bloc('La couleur des cases',
        'L\'ambre ne change pas : il signale ce qui t\'attend, et une couleur ' +
        'qui veut dire quelque chose ne se choisit pas.',
        '<div class="seg">' + COULEURS.map(function (c) {
          const noms = { bauhaus: "Bauhaus", indigo: "Indigo", prune: "Prune", encre: "Encre" };
          return '<button class="segb pastille' + (c === p.couleur ? ' on' : '') + '"' +
                 ' data-pref="couleur" data-val="' + c + '"' +
                 ' aria-pressed="' + (c === p.couleur) + '">' +
                 '<i class="pas pas-' + c + '"></i>' + noms[c] + '</button>';
        }).join("") + '</div>'),

      /* Demandé par Exsangue le 02/08/2026 : « je veux pouvoir choisir et
         designer moi-même ». D'où une vraie pastille libre et non une
         nouvelle liste de teintes toutes faites. */
      bloc('Tes couleurs',
        'Une pastille par case : appuie dessus et prends la couleur que tu ' +
        'veux. Le nom de la case passe tout seul en noir ou en blanc pour ' +
        'rester lisible, quelle que soit la teinte — c\'est calculé, tu ne ' +
        'peux pas te tromper. ' +
        '<b>Une case laissée d\'origine suit la palette juste au-dessus ; ' +
        'une case que tu as peinte n\'en dépend plus</b> et garde ta couleur ' +
        'même en thème sombre.',
        '<div class="teintes">' + MODES.map(function (m) {
          const perso = !!(p.teintes && p.teintes[m.id]);
          return '<div class="teinte-l">' +
                   '<input type="color" class="teinte-p" data-teinte="' + m.id + '"' +
                     ' value="' + att(teinteDe(m.id)) + '"' +
                     ' aria-label="Couleur de ' + att(m.nom) + '">' +
                   '<b>' + esc(m.nom) + '</b>' +
                   '<span class="teinte-e">' + (perso ? 'à toi' : "d'origine") + '</span>' +
                   (perso
                     ? '<button class="ordre-b" data-teinte-off="' + m.id + '"' +
                       ' aria-label="Rendre ' + att(m.nom) + ' à la palette">&#10005;</button>'
                     : '') +
                 '</div>';
        }).join("") + '</div>' +
        '<button class="btn wide" data-act="teintes-reset">Rendre toutes les cases à la palette</button>'),

      bloc('La forme des cases',
        'En cercles, le sous-titre de chaque case disparaît — il ne tient pas ' +
        'dans un disque sans couper les mots n\'importe où. Le compte, lui, reste.',
        segment("forme", [
          { id: "carre", nom: "Rectangles" },
          { id: "rond",  nom: "Cercles" }
        ], p.forme)),

      bloc('La taille des cases',
        'N\'agit que sur la hauteur des cases. Le texte, lui, a son propre réglage ' +
        'juste au-dessus.',
        segment("taille", [
          { id: "compacte", nom: "Compacte" },
          { id: "normale",  nom: "Normale" },
          { id: "grande",   nom: "Grande" }
        ], p.taille)),

      bloc('L\'ordre des cases',
        'La première case s\'affiche en pleine largeur, la deuxième occupe la ' +
        'grande colonne, la dernière ferme en pleine largeur. Mets en premier ' +
        'ce que tu ouvres le plus souvent.',
        '<div class="ordre">' + ordreModes().map(function (id, i, tab) {
          const m = MODES.filter(function (x) { return x.id === id; })[0];
          return '<div class="ordre-l">' +
                   '<span class="ordre-n">' + (i + 1) + '</span>' +
                   '<b>' + esc(m.nom) + '</b>' +
                   '<button class="ordre-b" data-monte="' + id + '"' +
                     (i === 0 ? ' disabled' : '') +
                     ' aria-label="Monter ' + att(m.nom) + '">&#8593;</button>' +
                   '<button class="ordre-b" data-descend="' + id + '"' +
                     (i === tab.length - 1 ? ' disabled' : '') +
                     ' aria-label="Descendre ' + att(m.nom) + '">&#8595;</button>' +
                 '</div>';
        }).join("") + '</div>'),

      bloc('La longueur d\'une séance',
        'Vaut pour les exercices et pour l\'oral. Les cartes, elles, suivent ' +
        'le calendrier de révision : c\'est lui qui décide, pas toi.',
        /* Le point médian s'écrit ICI en vrai caractère, pas en `&#183;` :
           `segment` échappe le texte des boutons, donc le code se serait
           affiché tel quel. Vu sur une capture, pas par un test — un test
           qui vérifie du texte le compare à la même chaîne fautive. */
        segment("seance", [
          { id: "courte",  nom: "Courte · 5" },
          { id: "normale", nom: "Normale · 8" },
          { id: "longue",  nom: "Longue · 12" }
        ], p.seance)),

      '<button class="btn wide" data-act="prefs-reset">Revenir aux réglages d\'origine</button>',
      '<p class="msg" id="toolmsg"></p>',

    '</div>'
  ].join("");
}

/* ===============================================================
   LE TEST DE FIN DE NIVEAU A1
   ===============================================================
   Demandé par Exsangue le 02/08/2026 : « fais un test pour valider la partie
   finale A1, réfère-toi à des tests officiels, 70 % ou plus ».

   Calqué sur le **Goethe-Zertifikat A1 / Start Deutsch 1**, qui comporte
   quatre épreuves : Hören, Lesen, Schreiben, Sprechen.

   ⚠️ IL N'Y EN A QUE TROIS ICI, ET C'EST DIT À L'ÉCRAN. L'épreuve de
   PAROLE est absente : l'app peut faire entendre de l'allemand, elle ne sait
   pas écouter. Prétendre évaluer l'expression orale en faisant taper des
   phrases serait mentir sur ce qu'on mesure. Mieux vaut un test qui annonce
   son périmètre qu'un test qui gonfle son score.

   ⚠️ SEUIL À 70 %, choisi par Exsangue. L'examen officiel passe à **60 %** :
   son seuil est donc plus exigeant que le vrai, il l'a confirmé en connaissant
   le chiffre. On ne le « corrige » pas en douce.

   Réussir ce test valide le A1 et ouvre le A2. ⚠️ L'écran de résultat annonce
   le nombre d'étapes A2 RÉELLEMENT écrites, calculé sur `COURSE` : tant que le
   niveau est incomplet, on le dit au lieu de laisser croire à un cours entier.
   On n'a jamais promis de déblocage vers un niveau vide, et ça ne change pas. */
const A1_SEUIL = 0.70;

const A1_TEXTE = "Hallo! Ich heiße Lukas. Ich bin fünfundzwanzig Jahre alt und " +
  "ich wohne in Berlin. Ich arbeite in einem Café. Am Wochenende spiele ich " +
  "Fußball mit meinen Freunden. Ich habe einen Hund. Er heißt Max.";

/* Comme le quiz du cours, la bonne réponse est TOUJOURS `a: 0` dans le
   fichier ; c'est l'affichage qui mélange. Le score raisonne donc sur la
   source, jamais sur l'écran. */
const TEST_A1 = [
  {
    t: "Écouter",
    aide: "Appuie sur le bouton pour entendre la phrase. Tu peux la réécouter autant que tu veux.",
    items: [
      { say: "Ich komme aus Frankreich.", q: "Qu'est-ce que la personne dit ?",
        o: ["D'où elle vient", "Son âge", "Son métier", "Où elle habite"], a: 0 },
      { say: "Es ist halb acht.", q: "Quelle heure est-il ?",
        o: ["7 h 30", "8 h 30", "8 h 00", "6 h 30"], a: 0 },
      { say: "Ich hätte gerne einen Kaffee.", q: "Où se trouve sans doute cette personne ?",
        o: ["Au café", "À la gare", "À l'hôtel", "À l'aéroport"], a: 0 },
      { say: "Der Zug fährt um zehn Uhr.", q: "Écris en allemand l'heure que tu entends.",
        ecrit: "zehn" },
      { say: "Meine Schwester heißt Anna.", q: "De qui la personne parle-t-elle ?",
        o: ["De sa sœur", "De sa mère", "De sa fille", "De son amie"], a: 0 },
      { say: "Wo ist der Bahnhof?", q: "Que cherche la personne ?",
        o: ["La gare", "L'hôtel", "La pharmacie", "Le restaurant"], a: 0 }
    ]
  },
  {
    t: "Lire",
    aide: "Lis le texte, puis réponds. Il reste affiché pendant toutes les questions.",
    texte: A1_TEXTE,
    items: [
      { q: "Wie alt ist Lukas ?", o: ["25 ans", "35 ans", "15 ans", "45 ans"], a: 0 },
      { q: "Wo wohnt er ?", o: ["À Berlin", "À Munich", "À Vienne", "À Hambourg"], a: 0 },
      { q: "Où travaille-t-il ?", o: ["Dans un café", "Dans une école", "À la gare", "À l'hôpital"], a: 0 },
      { q: "Que fait-il le week-end ?", o: ["Il joue au football", "Il travaille", "Il dort", "Il lit"], a: 0 },
      { q: "Wie heißt sein Hund ?", o: ["Max", "Lukas", "Anna", "Paul"], a: 0 },
      { q: "Vrai ou faux : Lukas a un chat.", o: ["Faux", "Vrai"], a: 0 }
    ]
  },
  {
    t: "Écrire",
    aide: "Écris la phrase en allemand. L'article compte, mais le ß n'est jamais exigé " +
          "et « ae » passe pour « ä ».",
    items: [
      { q: "Je m'appelle Anna.",        ecrit: "Ich heiße Anna." },
      { q: "J'ai vingt ans.",           ecrit: "Ich bin zwanzig Jahre alt." },
      { q: "Le livre est grand.",       ecrit: "Das Buch ist groß." },
      { q: "Je voudrais un café.",      ecrit: "Ich hätte gerne einen Kaffee." },
      { q: "Où est la gare ?",          ecrit: "Wo ist der Bahnhof?" },
      { q: "Je n'ai pas de voiture.",   ecrit: "Ich habe kein Auto." }
    ]
  },
  {
    t: "La langue",
    aide: "Grammaire : articles, cas, conjugaison, pluriels.",
    items: [
      { q: "___ Frau ist nett.", o: ["Die", "Der", "Das", "Den"], a: 0 },
      { q: "Ich sehe ___ Hund.", o: ["den", "der", "dem", "das"], a: 0 },
      { q: "Du ___ sehr gut Deutsch. (sprechen)", o: ["sprichst", "sprechst", "spricht", "sprechen"], a: 0 },
      { q: "Wir ___ nach Berlin. (fahren)", o: ["fahren", "fährt", "fahrt", "fährst"], a: 0 },
      { q: "Le pluriel de <b>das Kind</b> est…", o: ["die Kinder", "die Kinde", "die Kinden", "die Kinds"], a: 0 },
      { q: "Ich fahre ___ dem Bus.", o: ["mit", "für", "aus", "um"], a: 0 }
    ]
  }
];

/* Les questions mises bout à bout, chacune sachant d'où elle vient. Le test
   se parcourt d'un seul mouvement : découper la navigation par épreuve
   ajouterait des écrans sans rien apprendre. */
function a1Questions() {
  const l = [];
  TEST_A1.forEach(function (sec) {
    sec.items.forEach(function (it, i) {
      l.push({ sec: sec, it: it, premier: i === 0 });
    });
  });
  return l;
}

let a1i = 0, a1Log = [], a1Perm = [], a1Repondu = false, a1Verdict = null;

/* Le résultat, calculé UNE fois quand la dernière question est répondue.

   ⚠️ Il vivait auparavant dans la vue, qui enregistrait le score en même
   temps qu'elle l'affichait. Un test l'a attrapé : réafficher l'écran de
   résultat le réenregistrait, et un vieux résultat pouvait ainsi être écrit
   par-dessus une progression neuve. Une vue AFFICHE, elle ne décide de
   rien — sans quoi le simple fait de regarder change l'état. */
let a1Resultat = null;

function a1Demarre() {
  const qs = a1Questions();
  a1i = 0; a1Log = []; a1Repondu = false; a1Verdict = null;
  a1Resultat = null;
  a1Perm = qs.map(function (q) {
    return q.it.o ? shuffleIdx(q.it.o.length) : null;
  });
  show(a1View());
}

/* Clôt le test : compte, décide, enregistre. Appelée depuis le bouton qui
   quitte la dernière question, jamais depuis un rendu. */
function a1Termine() {
  const qs = a1Questions();
  const bons = a1Log.filter(function (x) { return x; }).length;
  const part = bons / qs.length;
  const passe = part >= A1_SEUIL;
  a1Resultat = { bons: bons, total: qs.length, part: part, passe: passe };
  // On ne remplace un résultat déjà obtenu que par un MEILLEUR : refaire le
  // test pour s'entraîner ne doit pas effacer un niveau déjà validé.
  if (passe && (!S.a1 || !S.a1.passe || S.a1.score < bons)) {
    S.a1 = { passe: true, score: bons, total: qs.length, date: today() };
    persist();
  }
}

function a1Repond(bon) {
  a1Log[a1i] = bon;
  a1Repondu = true;
  show(a1View());
}

function a1View() {
  const qs = a1Questions();

  // ---- L'écran d'accueil du test ----
  if (!a1Perm.length) {
    const fait = S.done.length;
    const dejaPasse = S.a1 && S.a1.passe;
    return [
      backBar('Accueil'),
      '<div class="stack">',
        '<div class="stack-s">',
          '<h2>Test de fin de niveau A1</h2>',
          '<p class="msg">' + qs.length + ' questions, en quatre épreuves : ' +
            '<b>écouter</b>, <b>lire</b>, <b>écrire</b>, <b>la langue</b>. ' +
            'Il faut <b>' + Math.round(A1_SEUIL * 100) + ' %</b> de bonnes réponses pour ' +
            'le valider, soit <b>' + Math.ceil(qs.length * A1_SEUIL) + '</b> sur ' + qs.length + '.</p>',
          /* Le périmètre est annoncé AVANT de commencer, pas après. Un test
             qui révèle ses limites à la fin a déjà menti. */
          '<p class="msg">Calqué sur le <b>Goethe-Zertifikat A1</b>, qui compte quatre ' +
            'épreuves. La quatrième, <b>parler</b>, n\'est pas ici : l\'app sait faire ' +
            'entendre de l\'allemand, elle ne sait pas t\'écouter. La juger en te faisant ' +
            'taper des phrases serait mentir sur ce qu\'on mesure.</p>',
          '<p class="msg">À savoir : l\'examen officiel passe à <b>60 %</b>. ' +
            'Le seuil de <b>' + Math.round(A1_SEUIL * 100) + ' %</b> est ton choix — ' +
            'il est donc plus exigeant que le vrai.</p>',
        '</div>',
        fait < COURSE.length
          ? '<div class="why bad">Tu as terminé <b>' + fait + '</b> étapes sur ' +
            COURSE.length + '. Le test couvre tout le niveau : tu peux le tenter, ' +
            'mais il portera sur des choses que tu n\'as pas encore vues.</div>'
          : '',
        dejaPasse
          ? '<div class="why good">Déjà validé le ' + esc(S.a1.date) +
            ' avec ' + S.a1.score + ' / ' + S.a1.total + '.</div>'
          : '',
        '<button class="btn primary wide" data-act="a1-go">Commencer le test</button>',
        '<button class="btn wide" data-go="home">Retour à l\'accueil</button>',
      '</div>'
    ].join("");
  }

  // ---- Le résultat ----
  if (a1i >= qs.length && a1Resultat) {
    const bons = a1Resultat.bons, part = a1Resultat.part, passe = a1Resultat.passe;
    // Le détail par épreuve : un score global ne dit pas OÙ ça coince.
    let k = 0;
    const detail = TEST_A1.map(function (sec) {
      const n = sec.items.filter(function () { return a1Log[k++]; }).length;
      return '<div class="rec"><span class="rec-n">' + n + '/' + sec.items.length +
             '</span><b>' + esc(sec.t) + '</b></div>';
    }).join("");

    return [
      backBar('Accueil'),
      '<div class="stack">',
        '<div class="score"><b>' + bons + '/' + qs.length + '</b><span>' +
          Math.round(part * 100) + ' %. ' +
          (passe
            /* ⚠️ Le compte des étapes A2 est CALCULÉ, jamais écrit à la main.
               Cet écran a dit « le A2 n'existe pas » jusqu'au 02/08/2026 ; le
               jour où il a existé, la phrase est devenue fausse en silence.
               Calculée, elle suit le contenu toute seule. */
            ? 'Le niveau A1 est validé. Le A2 est ouvert — ' +
              avancementNiveau(NIVEAUX[1]).ecrites + ' étapes y sont écrites sur ' +
              NIVEAUX[1].prevu + ' prévues.'
            : 'Il faut ' + Math.ceil(qs.length * A1_SEUIL) + ' bonnes réponses. Revois les épreuves les plus faibles et retente.') +
        '</span></div>',
        '<div class="stack-s"><h3 class="sec">Par épreuve</h3><div class="recs">' + detail + '</div></div>',
        '<button class="btn primary wide" data-act="a1-go">Refaire le test</button>',
        '<button class="btn wide" data-go="home">Retour à l\'accueil</button>',
      '</div>'
    ].join("");
  }

  // ---- Une question ----
  const q = qs[a1i];
  const it = q.it;
  const perm = a1Perm[a1i];

  const corps = it.o
    ? '<div class="opts">' + perm.map(function (i) {
        let cls = "opt";
        if (a1Repondu) {
          if (i === it.a) cls += " right";
          else if (i === a1Verdict) cls += " wrong";
        }
        return '<button class="' + cls + '" data-a1pick="' + i + '"' +
               (a1Repondu ? " disabled" : "") + '>' + esc(it.o[i]) + '</button>';
      }).join("") + '</div>'
    : (a1Repondu
        ? '<div class="why ' + (a1Log[a1i] ? "good" : "bad") + '">' +
            (a1Log[a1i] ? "Exact. " : "La réponse attendue : ") +
            '<b>' + esc(it.ecrit) + '</b></div>'
        : '<input class="answer" id="answer"' + saisieAttrs("Ta réponse en allemand", true) + '>' +
          '<button class="btn primary wide" data-act="a1-check">Valider</button>');

  return [
    backBar('Accueil'),
    '<div class="stack">',
      '<div class="stack-s">',
        '<span class="label">Test A1 &#183; ' + esc(q.sec.t) +
          ' &#183; question ' + (a1i + 1) + ' sur ' + qs.length + '</span>',
        '<div class="meter">' + qs.map(function (_, i) {
          return '<i class="' + (i < a1i ? (a1Log[i] ? 'on' : 'err') : '') + '"></i>';
        }).join("") + '</div>',
      '</div>',
      q.premier ? '<p class="msg">' + esc(q.sec.aide) + '</p>' : '',
      q.sec.texte ? '<div class="card"><p class="de">' + esc(q.sec.texte) + '</p></div>' : '',
      it.say
        ? '<div class="card" style="text-align:center">' +
            '<button class="btn primary" data-say="' + att(it.say) + '">&#9654;&nbsp; Écouter</button>' +
          '</div>'
        : '',
      '<p class="q">' + it.q + '</p>',
      corps,
      a1Repondu
        ? '<button class="btn primary wide" data-act="a1-next">' +
            (a1i + 1 >= qs.length ? 'Voir le résultat' : 'Question suivante') + '</button>'
        : '',
    '</div>'
  ].join("");
}

/* ===============================================================
   LES VERBES IRRÉGULIERS
   ===============================================================
   Demandé par Exsangue le 02/08/2026 : « répertorie-moi tous les verbes
   irréguliers, tu me proposeras aléatoirement des verbes et je devrai les
   conjuguer au présent ; ensuite on rajoutera peut-être d'autres temps ».

   ⚠️ AUCUNE CONJUGAISON N'EST INVENTÉE. La table est extraite du socle de
   référence (`reference/verbes-wiktionnaire.csv`, 8 047 verbes) par un
   script, puis triée par fréquence réelle. Est retenu « irrégulier au
   présent » un verbe dont la forme `du`/`er` ne se déduit PAS de l'infinitif
   par la règle ordinaire — c'est exactement ce qu'il faut réviser, le reste
   se calcule.

   Trois choix à connaître :

   1. **`sein` est écrit DE MÉMOIRE**, et c'est la seule entrée dans ce cas :
      le dictionnaire de référence ne le contient pas — vérifié, aucune ligne.
      C'est pourtant le verbe le plus irrégulier de la langue. Le signaler
      plutôt que de le taire est la règle du socle : une donnée absente se
      dit, elle ne se maquille pas.
   2. **Les verbes à particule séparable sont écartés** (mitfahren, aufstehen).
      Leur difficulté est la PLACE DE LA PARTICULE, pas le changement de
      voyelle. Ils méritent leur propre leçon ; les mêler ici ferait deux
      exercices en un.
   3. **La liste est choisie à la main parmi les plus fréquents**, et non
      « les N premiers ». Le dictionnaire remonte aussi des composés
      littéraires (*vermögen*, *hinterlassen*) et une ligne visiblement
      fautive (*umgehen*, donné au subjonctif). Trente-sept verbes sûrs
      valent mieux que deux cents douteux.

   Ordre des colonnes : infinitif, sens, ich, du, er/sie/es, wir, ihr, sie. */
const VERBES = [
  // Écrit de mémoire — absent du socle de référence. Voir ci-dessus.
  ["sein", "être", "bin", "bist", "ist", "sind", "seid", "sind"],
  ["haben", "avoir", "habe", "hast", "hat", "haben", "habt", "haben"],
  ["werden", "devenir", "werde", "wirst", "wird", "werden", "werdet", "werden"],
  ["können", "pouvoir, savoir", "kann", "kannst", "kann", "können", "könnt", "können"],
  ["sehen", "voir", "sehe", "siehst", "sieht", "sehen", "seht", "sehen"],
  ["wissen", "savoir", "weiß", "weißt", "weiß", "wissen", "wisst", "wissen"],
  ["müssen", "devoir", "muss", "musst", "muss", "müssen", "müsst", "müssen"],
  ["wollen", "vouloir", "will", "willst", "will", "wollen", "wollt", "wollen"],
  ["lassen", "laisser", "lasse", "lässt", "lässt", "lassen", "lasst", "lassen"],
  ["helfen", "aider", "helfe", "hilfst", "hilft", "helfen", "helft", "helfen"],
  ["geben", "donner", "gebe", "gibst", "gibt", "geben", "gebt", "geben"],
  ["sollen", "devoir (conseil)", "soll", "sollst", "soll", "sollen", "sollt", "sollen"],
  ["essen", "manger", "esse", "isst", "isst", "essen", "esst", "essen"],
  ["nehmen", "prendre", "nehme", "nimmst", "nimmt", "nehmen", "nehmt", "nehmen"],
  ["sprechen", "parler", "spreche", "sprichst", "spricht", "sprechen", "sprecht", "sprechen"],
  ["halten", "tenir", "halte", "hältst", "hält", "halten", "haltet", "halten"],
  ["vergessen", "oublier", "vergesse", "vergisst", "vergisst", "vergessen", "vergesst", "vergessen"],
  ["fahren", "aller en véhicule", "fahre", "fährst", "fährt", "fahren", "fahrt", "fahren"],
  ["treffen", "rencontrer", "treffe", "triffst", "trifft", "treffen", "trefft", "treffen"],
  ["gefallen", "plaire", "gefalle", "gefällst", "gefällt", "gefallen", "gefallt", "gefallen"],
  ["schlafen", "dormir", "schlafe", "schläfst", "schläft", "schlafen", "schlaft", "schlafen"],
  ["dürfen", "avoir le droit", "darf", "darfst", "darf", "dürfen", "dürft", "dürfen"],
  ["laufen", "courir", "laufe", "läufst", "läuft", "laufen", "lauft", "laufen"],
  ["tragen", "porter", "trage", "trägst", "trägt", "tragen", "tragt", "tragen"],
  ["lesen", "lire", "lese", "liest", "liest", "lesen", "lest", "lesen"],
  ["mögen", "aimer bien", "mag", "magst", "mag", "mögen", "mögt", "mögen"],
  ["fallen", "tomber", "falle", "fällst", "fällt", "fallen", "fallt", "fallen"],
  ["fangen", "attraper", "fange", "fängst", "fängt", "fangen", "fangt", "fangen"],
  ["schlagen", "frapper", "schlage", "schlägst", "schlägt", "schlagen", "schlagt", "schlagen"],
  ["werfen", "jeter", "werfe", "wirfst", "wirft", "werfen", "werft", "werfen"],
  ["treten", "donner un coup de pied", "trete", "trittst", "tritt", "treten", "tretet", "treten"],
  ["brechen", "casser", "breche", "brichst", "bricht", "brechen", "brecht", "brechen"],
  ["raten", "conseiller, deviner", "rate", "rätst", "rät", "raten", "ratet", "raten"],
  ["waschen", "laver", "wasche", "wäschst", "wäscht", "waschen", "wascht", "waschen"],
  ["sterben", "mourir", "sterbe", "stirbst", "stirbt", "sterben", "sterbt", "sterben"],
  ["verlassen", "quitter", "verlasse", "verlässt", "verlässt", "verlassen", "verlasst", "verlassen"],
  ["laden", "charger", "lade", "lädst", "lädt", "laden", "ladet", "laden"]
];

const PRONOMS = ["ich", "du", "er / sie / es", "wir", "ihr", "sie / Sie"];

/* La conjugaison qu'aurait un verbe RÉGULIER. Sert à ne demander que ce qui
   est réellement irrégulier — voir `formesAdemander`. */
function verbeRegulier(inf) {
  const rad = /(eln|ern)$/.test(inf) ? inf.slice(0, -1)
            : /en$/.test(inf)        ? inf.slice(0, -2)
            : inf.slice(0, -1);
  // Le « -e- d'appui » : après d ou t, et après m/n précédé d'une consonne —
  // mais jamais après l, m, n, r, h. C'est ce dernier point qu'on oublie, et
  // il ferait passer *kommen* ou *nehmen* pour irréguliers.
  const appui = /[dt]$/.test(rad) || /[^aeiouäöüAEIOUÄÖÜlmnrh][mn]$/.test(rad);
  const siffl = /(s|z|x|ß)$/.test(rad);
  return [
    rad + "e",
    rad + (appui ? "est" : (siffl ? "t" : "st")),
    rad + (appui ? "et" : "t"),
    inf,
    rad + (appui ? "et" : "t"),
    inf
  ];
}

/* Les formes à demander : UNIQUEMENT celles qui s'écartent du moule régulier.

   ⚠️ C'est un principe, pas une économie. Exsangue avait fait retirer les
   exercices « réécris sans le tréma » parce qu'ils étaient impossibles à
   rater — « je n'apprends rien de spécial ». Faire taper « wir sprechen »
   à partir de « sprechen » serait exactement la même chose. Au pluriel, un
   verbe fort ne change JAMAIS de voyelle ; le demander serait de la copie.

   La règle se retourne d'elle-même sur `sein`, seul verbe dont le pluriel
   sort du moule : lui, on le demande en entier. */
function formesAdemander(v) {
  const reg = verbeRegulier(v[0]);
  const idx = [];
  for (let i = 0; i < 6; i++) if (v[i + 2] !== reg[i]) idx.push(i);
  return idx.length ? idx : [1, 2];      // filet : jamais un écran sans question
}

let verbeCourant = null, verbeVerdict = null, verbeSerie = 0;

function verbeTire() {
  let v = VERBES[Math.floor(Math.random() * VERBES.length)];
  if (verbeCourant && v[0] === verbeCourant[0] && VERBES.length > 1) {
    v = VERBES[(VERBES.indexOf(v) + 1) % VERBES.length];
  }
  return v;
}

function verbesView() {
  if (!verbeCourant) verbeCourant = verbeTire();
  const v = verbeCourant;
  const demandees = formesAdemander(v);

  /* La table complète, montrée seulement APRÈS la réponse. Avant, elle
     donnerait tout. */
  const table = verbeVerdict
    ? '<div class="conj">' + PRONOMS.map(function (p, i) {
        const juste = demandees.indexOf(i) === -1 ||
                      (verbeVerdict.formes[i] && verbeVerdict.formes[i].ok);
        return '<div class="conj-l' + (demandees.indexOf(i) === -1 ? ' calme' : (juste ? ' ok' : ' ko')) + '">' +
                 '<span class="conj-p">' + esc(p) + '</span>' +
                 '<b>' + esc(v[i + 2]) + '</b>' +
                 (demandees.indexOf(i) !== -1 && verbeVerdict.formes[i] && !verbeVerdict.formes[i].ok
                   ? '<span class="conj-t">tu as écrit : ' +
                     esc(verbeVerdict.formes[i].saisi || "rien") + '</span>'
                   : '') +
               '</div>';
      }).join("") + '</div>'
    : '';

  const champs = demandees.map(function (i) {
    return '<div class="conj-q">' +
             '<label for="vf' + i + '">' + esc(PRONOMS[i]) + '</label>' +
             '<input class="answer" id="vf' + i + '" data-vf="' + i + '"' +
               saisieAttrs("Forme pour " + PRONOMS[i], true) + '>' +
           '</div>';
  }).join("");

  return [
    backBar('Accueil'),
    '<div class="stack">',
      '<div class="stack-s">',
        '<span class="label">Verbes irréguliers &#183; ' + VERBES.length + ' au programme' +
          (verbeSerie > 0 ? ' &#183; ' + verbeSerie + ' d\'affilée' : '') + '</span>',
      '</div>',
      '<div class="card">',
        '<div class="verbe-i">' + esc(v[0]) + '</div>',
        '<div class="verbe-f">' + esc(v[1]) + '</div>',
      '</div>',
      verbeVerdict
        ? table +
          '<div class="why ' + (verbeVerdict.ok ? "good" : "bad") + '">' +
            (verbeVerdict.ok
              ? "Tout juste."
              : "Regarde les lignes en rouge. Au pluriel, un verbe fort ne change " +
                "jamais de voyelle — c'est au singulier que tout se joue.") +
          '</div>' +
          '<button class="btn primary wide" data-act="verbe-next">Un autre verbe</button>'
        : '<p class="msg">Écris les formes demandées. Les autres se déduisent de ' +
          'l\'infinitif — on ne te fait pas recopier ce qui ne change pas.</p>' +
          champs +
          '<button class="btn primary wide" data-act="verbe-check">Vérifier</button>',
      '<button class="btn wide" data-go="home">Retour à l\'accueil</button>',
    '</div>'
  ].join("");
}

function verbeRepond() {
  const v = verbeCourant;
  if (!v) return;
  const demandees = formesAdemander(v);
  const formes = {};
  let tout = true;
  demandees.forEach(function (i) {
    const champ = document.getElementById("vf" + i);
    const saisi = champ ? champ.value : "";
    // `checkAnswer` : mêmes tolérances que partout — `ae` pour `ä`, jamais
    // le `ß` exigé, la casse ignorée. Le verbe, lui, doit être exact.
    const ok = checkAnswer(saisi, v[i + 2]).ok;
    formes[i] = { ok: ok, saisi: String(saisi).trim() };
    if (!ok) tout = false;
  });
  verbeVerdict = { ok: tout, formes: formes };
  verbeSerie = tout ? verbeSerie + 1 : 0;
  show(verbesView());
}

/* ===============================================================
   L'ANCRAGE
   ===============================================================
   Conçu avec Exsangue le 18/08/2026. La spec complète, avec le raisonnement
   et les chiffres, est dans PLAN-ANCRAGE.md §2.

   À QUOI ÇA SERT, et pourquoi c'est un outil SÉPARÉ des cartes. Les cartes
   travaillent la leçon qu'on vient de finir — apprendre. L'ancrage travaille
   tout le vocabulaire depuis le début — ne pas perdre. Les mélanger dans un
   même paquet, ce que faisait l'app jusqu'ici, fait que réviser noie
   apprendre : un mot de l'étape 3 tombait au milieu de l'étape 45.

   C'est donc un onglet « à part », comme les verbes irréguliers : hors du
   PARCOURS, jamais enchaîné après une leçon, disponible tout le temps.

   LA BOUCLE. 50 mots tirés au hasard, tous différents. Les 50 finis, nouveau
   tirage, sans aucune mémoire du précédent : un mot peut retomber tout de
   suite ou pas avant longtemps. Aucune notion de jour, aucun quota — on
   enchaîne autant de boucles qu'on veut. Choisi par Exsangue contre une
   version à 50 mots par jour : le rythme lui appartient, pas à l'app.

   LE RETRAIT À 20. Un mot ancré sort du stock. Effet secondaire heureux, et
   gratuit : le stock rétrécit à mesure, donc les mots qui restent — les
   difficiles — reviennent de plus en plus souvent. La fin accélère seule,
   sans une ligne de code pour la pondération qu'on avait justement écartée.

   L'ÉCHEC ne fait perdre qu'un niveau, et RIEN D'AUTRE. Le mot n'est pas
   reproposé dans la boucle : une boucle qui s'allonge à chaque faute
   punirait les mauvais jours, ce qui fait arrêter. */
const BOUCLE_MOTS = 50;
/* Le filet contre l'oubli à un an. Un mot ancré a cette chance de repasser ;
   raté, il retombe à 19 et réintègre le stock. ~1 mot par boucle : c'est un
   filet, pas une révision — rendre au joueur des mots qu'il connaît serait
   lui faire perdre son temps. */
const CHANCE_ANCRE = 0.02;

/* Les mots encore à travailler, et ceux qui sont acquis. `cardById` filtre au
   passage les cartes d'étapes qui n'existent plus — une sauvegarde peut
   toujours désigner un contenu retiré depuis. */
function stockAncrage() {
  return Object.keys(S.cards).filter(function (id) {
    return S.cards[id].niv < ANCRE_A && cardById(id);
  });
}
function motsAncres() {
  return Object.keys(S.cards).filter(function (id) {
    return S.cards[id].niv >= ANCRE_A && cardById(id);
  });
}

/* Tire une boucle. Les mots sont TOUS DIFFÉRENTS à l'intérieur d'une boucle —
   le hasard joue d'une boucle à l'autre, pas au sein de la même : reposer le
   même mot deux fois dans la minute n'apprend rien.

   Le filet des ancrés est tiré par slot et non « un ancré garanti » : à 2 %
   par slot, il arrive qu'une boucle n'en contienne aucun, et c'est bien ce
   qu'on veut d'un filet. */
function tireBoucle() {
  const stock = stockAncrage();
  const ancres = motsAncres();

  /* ⚠️ LA TAILLE SE MESURE SUR LE STOCK SEUL, pas sur stock + ancrés. Une
     première version prenait les deux, et le test du filet l'a attrapée : avec
     33 mots à travailler et 33 ancrés, elle servait une boucle de 50 en
     complétant avec 17 mots déjà sus — un tiers de la séance passé sur du
     connu. La spec dit « moins de 50 au stock, la boucle fait ce qu'il y a » ;
     les ancrés sont un filet, jamais un remplissage. */
  const base = stock.length ? stock : ancres;
  if (!base.length) return [];
  const taille = Math.min(BOUCLE_MOTS, base.length);

  const pris = {};
  const out = [];
  let garde = 0;
  while (out.length < taille && garde++ < base.length * 40) {
    // Le filet ne joue que s'il y a un ailleurs où piocher.
    const filet = ancres.length && base !== ancres && Math.random() < CHANCE_ANCRE;
    const vivier = filet ? ancres : base;
    const id = vivier[Math.floor(Math.random() * vivier.length)];
    if (pris[id]) continue;
    pris[id] = true;
    out.push(cardById(id));
  }
  return out;
}

/* Ce que le niveau du mot commande. Les paliers viennent de PLAN-ANCRAGE.md :
   on reconnaît d'abord, on produit ensuite, on produit parfaitement à la fin.
   Repousser le genre est délibéré — c'est la partie dure de l'allemand, et
   l'exiger d'un mot qu'on reconnaît à peine ne produit que de l'échec. */
function modeAncrage(niv) {
  if (niv < ECRIT_DE_A) return "vers-fr";      // on montre l'allemand, on écrit le français
  if (niv < ARTICLE_A) return "vers-de";       // on écrit l'allemand, déterminant facultatif
  return "vers-de-strict";                     // déterminant obligatoire
}

/* Juge une réponse d'ancrage. Un seul correcteur — `checkAnswer` — avec une
   seule différence selon le palier : au-dessus de ARTICLE_A, l'article oublié
   ne passe plus. `checkAnswer` le signale déjà par `kind: "no-article"`, on
   n'a donc rien à re-décider ici, seulement à cesser de le pardonner.

   ⚠️ Ça ne rend PAS l'article obligatoire sur les mots qui n'en ont pas :
   « grün » ou « ja » ne produisent jamais ce verdict, puisque la réponse
   attendue n'a pas d'article. La règle ne mord que là où elle a un sens. */
function jugeAncrage(mot, saisi) {
  const niv = S.cards[mot.id].niv;
  const mode = modeAncrage(niv);
  if (mode === "vers-fr") return checkGloss(saisi, mot.f);
  const v = checkAnswer(saisi, mot.d);
  if (mode === "vers-de-strict" && v.ok && v.kind === "no-article") {
    return { ok: false, kind: "article-manquant" };
  }
  return v;
}

/* L'écran de l'ancrage.

   ⚠️ IL N'A PAS DE DESSIN À LUI, ET C'EST VOULU. Une première version, écrite
   le 18/08/2026, redessinait tout — carte plate, boutons à part, ses propres
   `ancr-check` / `ancr-next`. Exsangue l'a arrêtée net : « l'ancrage doit avoir
   le même design que les cartes, c'était vraiment cool et instinctif ». Il a
   raison deux fois. Le dessin des cartes est celui qu'il connaît déjà, donc
   celui qu'il n'a pas à réapprendre ; et deux écrans qui se ressemblent sans
   partager leur code finissent TOUJOURS par diverger, à la première retouche
   faite d'un seul côté.

   L'ancrage est donc le même paquet que les cartes, avec un autre contenu :
   `startDeck` avec `ancrage = true`. Tout le reste — la carte à deux faces, le
   retournement, la jauge, la consigne en filigrane, les boutons — est celui des
   cartes, et le restera parce que c'est LE MÊME.

   Ne restent ici que les deux écrans vides, qui n'ont pas d'équivalent chez les
   cartes et qui disent l'inverse l'un de l'autre. */
function ancrageView() {
  const stock = stockAncrage(), ancres = motsAncres();

  /* ⚠️ DEUX ABSENCES QUI NE VEULENT PAS DIRE LA MÊME CHOSE. Un mot n'entre
     qu'une fois sa leçon TERMINÉE : quelqu'un qui débute a donc un stock vide,
     et c'est normal — pas un échec. Le même écran en fin de parcours voudrait
     dire l'exact contraire. Les confondre découragerait précisément celui
     qu'il ne faut pas décourager. */
  if (!stock.length && !ancres.length) {
    return [
      backBar('Accueil'),
      '<div class="stack">',
        '<div class="card"><span class="label">L\'ancrage</span>',
          '<p class="msg" style="margin:.5rem 0 0">L\'ancrage revoit tout le ' +
          'vocabulaire appris depuis le début, pour ne plus rien perdre.</p>',
          '<p class="msg" style="margin:.5rem 0 0">Il est vide pour l\'instant : ' +
          'un mot y entre quand tu as <b>terminé</b> sa leçon. Commence par ' +
          'là, et reviens.</p></div>',
        '<button class="btn primary wide" data-go="lesson">Aller à la leçon</button>',
        '<button class="btn wide" data-go="home">Retour à l\'accueil</button>',
      '</div>'
    ].join("");
  }

  if (!stock.length && !(ancrage && pos < deck.length)) {
    return [
      backBar('Accueil'),
      '<div class="stack">',
        '<div class="card"><span class="label">L\'ancrage</span>',
          '<p class="msg" style="margin:.5rem 0 0">Tes <b>' + ancres.length +
          '</b> mots sont ancrés. Il n\'en reste aucun à travailler.</p>',
          '<p class="msg" style="margin:.5rem 0 0">Tu peux continuer sur les ' +
          'mots ancrés : ce qui se perd, se perd sans prévenir.</p></div>',
        '<button class="btn primary wide" data-act="ancr-boucle">Une boucle quand même</button>',
        '<button class="btn wide" data-go="home">Retour à l\'accueil</button>',
      '</div>'
    ].join("");
  }

  return reprend("ancrage", deck.length > 0 && pos < deck.length && ancrage)
    ? renderCard() : startDeck(tireBoucle(), false, true);
}

/* ===============================================================
   LE CONTRE-LA-MONTRE
   ===============================================================
   Demandé par Exsangue le 02/08/2026 : « un timer de 30 secondes, je dois
   traduire le plus de mots possible, on gagne du temps quand on fait des
   combos, une erreur remet le combo à 0, avec un classement des records ».

   ⚠️ C'est un onglet « À PART », selon son mot : il ne s'enchaîne JAMAIS
   après une leçon. Il ne figure donc pas dans `PARCOURS`, et il vit hors de
   la grille des cinq modes sur l'accueil. La raison est pédagogique : c'est
   un jeu de vitesse, il mesure ce qu'on sait déjà. Le mettre sur le chemin
   d'apprentissage reviendrait à demander d'aller vite avant de savoir.

   Il ne touche NI au calendrier de révision, NI aux niveaux des cartes —
   comme l'entraînement libre. Répondre vite n'est pas la même compétence que
   se souvenir à trois jours d'intervalle, et laisser une bonne partie
   espacer les révisions fausserait le calendrier. */
const CHRONO_DUREE = 300;        // en dixièmes de seconde : 30,0 s
const CHRONO_COMBO_BONUS = 3;    // à partir de ce combo, on gagne du temps
// CHRONO_RECORDS est déclaré tout en haut, avec `storageOK` : `sane()` s'en
// sert, et `sane()` court avant que ce bloc n'existe. Voir le commentaire
// là-bas — c'est le piège qui a fait perdre sa progression à Exsangue.

let chronoEtat = "pret";         // pret | joue | fini
let chronoReste = 0;
let chronoScore = 0, chronoCombo = 0, chronoMeilleurCombo = 0;
let chronoMot = null, chronoTimer = null, chronoDernier = "";

/* Les mots déjà rencontrés — pas tout le cours. Interroger un mot jamais vu
   ne serait pas un défi, seulement une devinette. */
function chronoVivier() {
  return Object.keys(S.cards).map(cardById).filter(function (c) { return c; });
}

function chronoTire() {
  const v = chronoVivier();
  if (!v.length) return null;
  /* On évite de retomber sur le mot qu'on vient de faire : à trois mots en
     réserve, le hasard pur en servirait deux fois de suite et on croirait à
     un bug. */
  let choix = v[Math.floor(Math.random() * v.length)];
  if (v.length > 1 && chronoMot && choix.id === chronoMot.id) {
    choix = v[(v.indexOf(choix) + 1) % v.length];
  }
  return choix;
}

function stopChrono() {
  if (chronoTimer) { clearInterval(chronoTimer); chronoTimer = null; }
}

function chronoFin() {
  stopChrono();
  chronoEtat = "fini";
  if (!S.chrono || !Array.isArray(S.chrono.records)) S.chrono = { records: [] };
  S.chrono.records.push({ s: chronoScore, c: chronoMeilleurCombo, d: today() });
  S.chrono.records.sort(function (a, b) { return b.s - a.s; });
  S.chrono.records = S.chrono.records.slice(0, CHRONO_RECORDS);
  persist();
  show(chronoView());
}

function chronoDemarre() {
  chronoEtat = "joue";
  chronoReste = CHRONO_DUREE;
  chronoScore = 0; chronoCombo = 0; chronoMeilleurCombo = 0;
  chronoDernier = "";
  chronoMot = chronoTire();
  stopChrono();
  /* Le compte à rebours ne redessine PAS l'écran : il n'écrit que dans
     l'élément du temps. Redessiner dix fois par seconde détruirait le champ
     de saisie et donc le focus — on ne pourrait plus écrire un mot entier. */
  chronoTimer = setInterval(function () {
    chronoReste--;
    const el = document.getElementById("chrono-temps");
    if (el) el.textContent = (chronoReste / 10).toFixed(1);
    if (chronoReste <= 0) chronoFin();
  }, 100);
  show(chronoView());
}

/* Une réponse. Le sens est FRANÇAIS → ALLEMAND, demandé par Exsangue le
   02/08/2026 : « je veux que ce soit l'inverse, le français apparaît, on
   écrit l'allemand ».

   C'est le sens exigeant — l'allemand est jugé au mot près, là où le
   français est corrigé avec indulgence. C'est aussi le seul sens qui
   apprenne l'orthographe, exactement comme les cartes au-dessus du seuil.

   Deux tolérances reprises des cartes, sans quoi le jeu punirait des
   réponses justes :
     - `checkAnswer` pardonne déjà l'orthographe de dépannage (`ae` pour `ä`),
       n'exige jamais le `ß`, ignore la casse et l'article oublié ;
     - `autreTraduction` accepte un AUTRE mot allemand qui traduit la même
       chose. Se faire refuser un synonyme correct dans un jeu de vitesse est
       la meilleure façon de le fermer. */
function chronoRepond() {
  if (chronoEtat !== "joue" || !chronoMot) return;
  const champ = document.getElementById("answer");
  const saisi = champ ? champ.value : "";
  if (!String(saisi).trim()) return;              // Entrée à vide : on ignore

  let v = checkAnswer(saisi, chronoMot.d);
  if (!v.ok && v.kind !== "empty" && autreTraduction(saisi, chronoMot)) {
    v = { ok: true, kind: "autre" };
  }
  if (v.ok) {
    chronoScore++;
    chronoCombo++;
    if (chronoCombo > chronoMeilleurCombo) chronoMeilleurCombo = chronoCombo;
    grade(chronoMot.id, true, false);             // le journal, jamais le calendrier
    /* Le bonus de temps monte avec le combo, mais par paliers : un gain
       continu rendrait la partie sans fin dès qu'on enchaîne. */
    let gain = 0;
    if (chronoCombo >= CHRONO_COMBO_BONUS * 2) gain = 20;
    else if (chronoCombo >= CHRONO_COMBO_BONUS) gain = 10;
    chronoReste += gain;
    chronoDernier = gain ? "+" + (gain / 10).toFixed(0) + " s" : "";
  } else {
    /* Le combo tombe, mais on ne RETIRE pas de temps. Punir deux fois rendrait
       une mauvaise série irrattrapable, et le jeu n'aurait plus d'intérêt
       passé la troisième erreur. */
    chronoCombo = 0;
    chronoDernier = "";
    grade(chronoMot.id, false, false);
  }
  chronoMot = chronoTire();
  show(chronoView());
}

function chronoView() {
  const vivier = chronoVivier();
  const records = (S.chrono && Array.isArray(S.chrono.records)) ? S.chrono.records : [];

  const tableauRecords = records.length
    ? '<div class="stack-s"><h3 class="sec">Tes records</h3>' +
        '<div class="recs">' + records.map(function (r, i) {
          return '<div class="rec' + (i === 0 ? ' top' : '') + '">' +
                   '<span class="rec-n">' + (i + 1) + '</span>' +
                   '<b>' + r.s + ' mot' + (r.s > 1 ? 's' : '') + '</b>' +
                   '<span class="rec-d">combo ' + r.c + ' &#183; ' + esc(r.d) + '</span>' +
                 '</div>';
        }).join("") + '</div></div>'
    : '';

  if (chronoEtat === "joue") {
    return [
      '<div class="stack">',
        '<div class="chrono-tete">',
          '<span class="chrono-t" id="chrono-temps">' + (chronoReste / 10).toFixed(1) + '</span>',
          '<span class="chrono-s"><b>' + chronoScore + '</b>trouvés</span>',
          '<span class="chrono-c' + (chronoCombo >= CHRONO_COMBO_BONUS ? ' chaud' : '') + '">' +
            '<b>' + chronoCombo + '</b>combo</span>',
        '</div>',
        chronoDernier ? '<div class="chrono-gain">' + esc(chronoDernier) + '</div>' : '',
        '<div class="card" data-consigne="En allemand">',
          '<div class="chrono-mot">' + esc(chronoMot ? chronoMot.f : "") + '</div>',
        '</div>',
        '<input class="answer" id="answer"' + saisieAttrs("Écris le mot en allemand", true) + '>',
        '<div class="pair">',
          '<button class="btn" data-act="chrono-passe">Passer</button>',
          '<button class="btn primary" data-act="chrono-check">Valider</button>',
        '</div>',
        '<button class="btn wide" data-act="chrono-stop">Arrêter</button>',
      '</div>'
    ].join("");
  }

  if (chronoEtat === "fini") {
    const meilleur = records.length ? records[0].s : 0;
    return [
      backBar('Accueil'),
      '<div class="stack">',
        '<div class="score"><b>' + chronoScore + '</b><span>mot' +
          (chronoScore > 1 ? 's' : '') + ' en 30 secondes' +
          (chronoMeilleurCombo > 1 ? ', meilleur combo ' + chronoMeilleurCombo : '') + '. ' +
          (chronoScore >= meilleur && chronoScore > 0
            ? 'C\'est ton record.'
            : 'Ton record est de ' + meilleur + '.') +
          ' Le calendrier de révision n\'a pas bougé.</span></div>',
        '<button class="btn primary wide" data-act="chrono-go">Rejouer</button>',
        tableauRecords,
        '<button class="btn wide" data-go="home">Retour à l\'accueil</button>',
      '</div>'
    ].join("");
  }

  // L'écran d'accueil du mode.
  return [
    backBar('Accueil'),
    '<div class="stack">',
      '<div class="stack-s">',
        '<h2>Contre la montre</h2>',
        '<p class="msg">Trente secondes pour traduire un maximum de mots <b>déjà ' +
          'rencontrés</b>. Chaque bonne réponse enchaînée fait monter le combo : ' +
          'à partir de <b>' + CHRONO_COMBO_BONUS + '</b>, tu gagnes du temps. ' +
          'Une erreur remet le combo à zéro — mais ne te coûte aucune seconde.</p>',
        '<p class="msg">On te montre le <b>français</b>, tu écris l\'<b>allemand</b>. ' +
          'L\'article n\'est pas obligatoire, le <b>ß</b> jamais exigé, et ' +
          '<b>ae</b> passe pour <b>ä</b> — mais le mot, lui, doit être le bon. ' +
          'Rien ici ne touche à ton calendrier de révision.</p>',
      '</div>',
      vivier.length >= 4
        ? '<button class="btn primary wide" data-act="chrono-go">Commencer</button>'
        : '<div class="why bad">Il faut au moins quatre mots rencontrés pour ' +
          'jouer. Fais une leçon d\'abord.</div>',
      tableauRecords,
    '</div>'
  ].join("");
}

const ROUTES = {
  home: home, lesson: lessonView, cards: cardsView,
  practice: practiceView, oral: oralView, drills: drillsView, quiz: quizView,
  book: bookView, unit: unitView, booktest: bookTestView,
  reglages: reglagesView, relais: relaisView, chrono: chronoView,
  verbes: verbesView, a1: a1View, ancrage: ancrageView
};

/* L'écran affiché. Sert au rouage, qui doit savoir s'il ouvre les réglages
   ou s'il en revient — sans quoi il serait sans effet une fois dessus. */
let ecranCourant = "home";

/* Le badge « où suis-je ». Il vit dans l'en-tête, donc hors de la zone
   redessinée : c'est `go` qui doit le tenir à jour, et personne d'autre.
   `esc` par principe, même si la table est écrite à la main : la règle « tout
   ce qui devient du HTML passe par esc » ne souffre pas d'exception, sinon
   elle finit par en souffrir une vraie. */
function paintOu(name) {
  const w = document.getElementById("wordmark");
  if (!w) return;
  const nom = OU_SUIS_JE[name];
  /* ⚠️ Le badge du niveau était écrit en dur (« A1 »). Il aurait affiché A1 à
     quelqu'un rendu à l'étape 40. Il suit désormais l'étape en cours, comme
     l'accueil — un libellé de niveau ne doit exister qu'à UN endroit calculé,
     sinon les deux finissent par se contredire. */
  /* Le nom de l'app est ALLEMAND, et un lecteur d'écran le disait en français.
     Le niveau (« A2 ») reste hors de la marque : c'est un code, pas un mot. */
  w.innerHTML = nom
    ? '<span class="ou" data-ou="' + att(name) + '">' + esc(nom) + '</span>'
    : '<span lang="de">Deutsch Täglich</span> <small>' + esc(niveauDe(S.day).id) + '</small>';
}

function go(name) {
  ecranCourant = name;
  paintOu(name);
  /* Les écrans de cartes tiennent dans la hauteur visible et ne défilent
     pas — c'est la seule façon de garantir que le mot ET le champ restent
     vus ensemble quand le clavier monte. Posé sur `body` et non sur `view` :
     l'en-tête et la marge de `.app` entrent dans le calcul, et ils sont
     au-dessus de `view`.

     ⚠️ TOUT ÉCRAN QUI SERT UNE `.carte3d` DOIT ÊTRE DANS CETTE LISTE. C'est
     `body.plein` qui donne à la carte sa hauteur et donc sa FORME : sans lui
     elle s'effondre, et l'écran ne ressemble plus à des cartes du tout.
     Oublié pour l'ancrage le 18/08/2026 — j'avais partagé le HTML des cartes
     en croyant que partager le dessin suffisait, alors que la moitié du
     dessin vit ici, dans une liste de noms d'écrans. Signalé par Exsangue,
     qui voyait un écran plat là où le code disait « c'est la même vue ».
     La liste est vérifiée par un test : un écran à cartes absent d'ici le
     fait tomber. */
  document.body.classList.toggle("plein", ECRANS_CARTES.indexOf(name) !== -1);

  /* Quitter le contre-la-montre arrête le compte à rebours. Sans ça, il
     continuerait à tourner sous les autres écrans et finirait par ramener de
     force à un écran de fin qu'on n'a pas demandé. */
  if (name !== "chrono") { stopChrono(); chronoEtat = "pret"; }

  /* Quitter le test A1 l'abandonne. C'est un EXAMEN : pouvoir en sortir,
     revoir une leçon, puis revenir finir ses questions le viderait de son
     sens. On repart de son écran d'accueil, qui annonce tout. */
  if (name !== "a1") a1Perm = [];
  const g = document.getElementById("gear");
  if (g) {
    g.classList.toggle("on", name === "reglages");
    g.setAttribute("aria-label", name === "reglages"
      ? "Fermer les réglages" : "Réglages et progression");
  }
  // Seul vrai changement d'écran : c'est ici, et nulle part ailleurs, qu'on
  // remonte en haut.
  show(ROUTES[name](), true);
}

/* Le rouage vit dans l'en-tête, hors de la zone redessinée : il ne peut donc
   pas passer par la délégation posée sur `view`. Son propre écouteur, une
   fois pour toutes — l'élément, lui, ne disparaît jamais.
   C'est un va-et-vient : appuyer dessus alors qu'on y est déjà ramène à
   l'accueil, sinon le bouton semblerait cassé. */
/* ---------- Suivre le clavier ----------
   La pièce manquante, et l'aveu qui va avec : deux tentatives ont échoué
   parce qu'elles s'appuyaient sur `dvh`. `dvh` suit les barres du navigateur.
   Le clavier d'iPhone, lui, se pose PAR-DESSUS la page sans réduire la
   fenêtre de mise en page — `100dvh` vaut exactement la même chose clavier
   ouvert ou fermé. Exsangue a dû le signaler deux fois avant que je cherche
   au bon endroit.

   `visualViewport` est la seule mesure qui recule quand le clavier monte.
   Elle n'existe qu'en JavaScript : on la recopie donc dans `--vv`, que la
   feuille de style lit pour dimensionner l'écran des cartes.

   Le `scrollTo(0, 0)` accompagne : en mode pleine hauteur il n'y a rien à
   faire défiler, donc tout défilement est un défilement parasite d'iOS
   cherchant à montrer le champ. On le défait aussitôt. Ailleurs, on n'y
   touche pas — les leçons et le livre doivent défiler normalement. */
function suitLeClavier() {
  const vv = window.visualViewport;
  if (!vv) return;                       // navigateur ancien : `dvh` reprend la main
  const poser = function () {
    document.documentElement.style.setProperty("--vv", vv.height + "px");
    if (document.body.classList.contains("plein")) window.scrollTo(0, 0);
  };
  poser();
  vv.addEventListener("resize", poser);
  vv.addEventListener("scroll", poser);
}
suitLeClavier();

const gearBtn = document.getElementById("gear");
if (gearBtn) {
  gearBtn.addEventListener("click", function () {
    go(ecranCourant === "reglages" ? "home" : "reglages");
  });
}

/* ⚠️ CE QUI EST CLIQUABLE — et c'est une liste qui a déjà menti.
   Un `data-` traité dans le gestionnaire mais absent d'ici ne sera JAMAIS
   résolu : le bouton existe, il est dessiné, et le clic tombe dans le vide.
   C'est exactement ce qui rendait les flèches de l'ordre des cases inertes
   (§1.2 du rapport du 11/08) — le gestionnaire manquait, mais même écrit, il
   n'aurait rien reçu.

   Sortie en constante le 13/08/2026 pour que la vérification emploie CETTE
   liste et non une copie. Un test qui recopie ce qu'il contrôle ne contrôle
   plus rien : la première version de cette vérification portait sa propre
   copie du sélecteur, et elle est restée muette pendant que le vrai était
   amputé. Une seule source, ou pas de source du tout. */
const CIBLES_CLIC =
  "[data-go],[data-act],[data-pick],[data-grade],[data-day],[data-lesson]," +
  "[data-say],[data-scheck],[data-chip],[data-unchip],[data-unit],[data-reveal]," +
  "[data-check],[data-model],[data-send],[data-reset],[data-play],[data-pref]," +
  "[data-teinte-off],[data-relais],[data-a1pick],[data-monte],[data-descend]";

view.addEventListener("click", function (e) {
  const t = e.target.closest(CIBLES_CLIC);
  if (!t) return;

  /* Un réglage : on l'enregistre, on l'applique, on redessine l'écran pour
     que le bouton retenu change d'aspect. Pas de bouton « Enregistrer » —
     l'effet se voit immédiatement, c'est ce qui permet de choisir.
     `sonAuto` est le seul booléen : les rangées ne savent manier que des
     chaînes, on traduit ici plutôt que d'inventer un second mécanisme. */
  if (t.dataset.pref) {
    const cle = t.dataset.pref, val = t.dataset.val;
    S.prefs[cle] = (cle === "sonAuto") ? (val === "oui") : val;
    sane(S);
    persist();
    applyPrefs();
    go("reglages");
    return;
  }

  // Écouter une réplique seule doit interrompre la lecture continue :
  // sinon deux voix se superposent et on ne comprend plus rien.
  if (t.hasAttribute("data-say")) { stopLecture(); speak(t.getAttribute("data-say")); return; }

  if (t.dataset.play) {
    if (lecture) { stopLecture(); return; }          // le bouton fait aussi « arrêter »
    const u = BOOK.filter(function (x) { return x.n === Number(t.dataset.play); })[0];
    if (u && u.dialogue) {
      playDialogue(u.dialogue.lines.map(function (l) { return l.de; }));
    }
    return;
  }

  // Le livre : ouvrir une unité, révéler une traduction, corriger une réponse.
  if (t.dataset.unit) { S.unit = Number(t.dataset.unit); persist(); go("unit"); return; }
  if (t.dataset.reveal) {
    const p = view.querySelector('.trad[data-fr="' + t.dataset.reveal + '"]');
    if (p) { p.hidden = false; t.remove(); }
    return;
  }
  if (t.dataset.reset) {
    const u = BOOK.filter(function (x) { return x.n === Number(t.dataset.reset); })[0];
    if (u) { askIds(u).forEach(function (id) { delete S.bookq[id]; }); persist(); go("unit"); }
    return;
  }
  if (t.dataset.send)  { gradeItem(t.dataset.send, false); return; }
  if (t.dataset.check) { gradeItem(t.dataset.check, true); return; }
  if (t.dataset.model) {
    const it = ASKED[t.dataset.model];
    const fb = view.querySelector('[data-fb="' + t.dataset.model + '"]');
    if (it && fb) {
      fb.className = "ask-fb";
      /* `lang` écrit à la main : ce `<b>` ne porte pas la police allemande,
         il échappe donc à la déduction par la feuille de style. C'est bien
         de l'allemand — la réponse modèle de l'exercice. */
      fb.innerHTML = 'Une réponse possible : <b lang="de">' + esc(it.model) + "</b>";
      fb.hidden = false;
      t.remove();
    }
    return;
  }

  if (t.dataset.go) { go(t.dataset.go); return; }

  if (t.dataset.day) {
    const n = Number(t.dataset.day);
    if (reachable(n)) { S.day = n; persist(); go("home"); }
    return;
  }

  // Ouvrir directement la leçon d'un jour donné (précédent ou suivant).
  if (t.dataset.lesson) {
    const n = Number(t.dataset.lesson);
    if (reachable(n)) { S.day = n; persist(); go("lesson"); }
    return;
  }

  /* --- étapes de la leçon --- */
  if (t.hasAttribute("data-scheck")) {
    if (stepPick !== null) return;
    stepPick = Number(t.dataset.scheck);
    show(renderStep());
    return;
  }
  /* Changer d'écran DANS la leçon remonte en haut : c'est un contenu
     entièrement nouveau, pas une mise à jour. Répondre à la mini-question
     d'un écran (juste au-dessus) conserve la position, elle. */
  if (t.dataset.act === "step-next")    { setStep(stepIdx + 1); show(renderStep(), true); return; }
  if (t.dataset.act === "step-back")    { setStep(Math.max(0, stepIdx - 1)); show(renderStep(), true); return; }
  if (t.dataset.act === "step-restart") { setStep(0); show(renderStep(), true); return; }

  if (t.hasAttribute("data-grade")) { advanceCard(t.dataset.grade === "1"); return; }

  if (t.dataset.act === "check-word" || t.dataset.act === "dunno") {
    const inp = document.getElementById("answer");
    const raw = inp ? inp.value : "";
    const cur = deck[pos];
    // Le sens dépend du niveau du mot : en dessous du seuil on écrit le
    // français, au-dessus l'allemand. Deux correcteurs, parce que les deux
    // langues ne s'exigent pas pareil — le français est jugé avec indulgence,
    // l'allemand au mot près.
    const enAllemand = S.cards[cur.id].niv >= ECRIT_DE_A;
    /* ⚠️ C'est `jugeAncrage` qui tranche, PAS un `checkAnswer` recopié ici.
       Les cartes et l'ancrage partagent le niveau d'un mot : leur laisser deux
       correcteurs ferait qu'un même mot, au même niveau, serait accepté sur un
       écran et refusé sur l'autre. C'est lui qui applique la sévérité sur le
       déterminant à partir du niveau 5.

       ⚠️ Sauf en ENTRAÎNEMENT LIBRE, qui ne touche pas aux niveaux et ne doit
       donc pas non plus en appliquer la sévérité : on y révise, on n'y est pas
       examiné. */
    verdict = (t.dataset.act === "dunno")
      ? { ok: false, kind: "dunno", typed: "" }
      : (training
          ? (enAllemand ? checkAnswer(raw, cur.d) : checkGloss(raw, cur.f))
          : jugeAncrage(cur, raw));

    // Réponse refusée en allemand : peut-être un autre mot qui traduit la
    // même chose. On ne punit pas une traduction correcte.
    if (enAllemand && !verdict.ok && verdict.kind !== "empty") {
      const autre = autreTraduction(raw, cur);
      if (autre) verdict = { ok: true, kind: "autre", autre: autre };
    }

    if (t.dataset.act === "check-word") verdict.typed = raw.trim();
    montreCarte();
    return;
  }

  if (t.dataset.act === "card-next") { advanceCard(!!(verdict && verdict.ok)); return; }

  if (t.dataset.act === "oral-check" || t.dataset.act === "oral-dunno") {
    const inp = document.getElementById("answer");
    const raw = inp ? inp.value : "";
    const it = oral[oi];
    if (t.dataset.act === "oral-dunno") {
      oralVerdict = { ok: false, kind: "dunno", typed: "" };
    } else {
      oralVerdict = checkOral(raw, it, it.level);
      oralVerdict.typed = raw.trim();
    }
    it.ok = oralVerdict.ok;

    // Niveau à l'oreille : +1 si c'est juste, −1 sinon, comme pour les cartes.
    it.after = oralVerdict.ok
      ? Math.min(ORAL_MAX, it.level + 1)
      : Math.max(1, it.level - 1);
    if (!S.oral) S.oral = {};
    S.oral[it.key] = it.after;
    persist();

    // Seuls les mots du vocabulaire ont une fiche ; les phrases n'en ont pas.
    // Comme l'entraînement, l'oral nourrit le journal sans toucher au calendrier.
    if (it.id && S.cards[it.id]) grade(it.id, oralVerdict.ok, false);
    show(renderOral());
    return;
  }
  if (t.dataset.act === "oral-next") { oi++; oralVerdict = null; show(renderOral()); return; }

  /* --- les exercices --- */
  if (t.dataset.chip)   { orderPicked.push(Number(t.dataset.chip)); show(renderDrill()); return; }
  if (t.dataset.unchip) { orderPicked.splice(Number(t.dataset.unchip), 1); show(renderDrill()); return; }
  if (t.dataset.act === "drill-check" || t.dataset.act === "drill-skip") {
    const d = drills[di];
    const inp = document.getElementById("answer");
    const raw = inp ? inp.value : "";
    if (t.dataset.act === "drill-skip") {
      drillVerdict = { ok: false, kind: "dunno", typed: "" };
    } else {
      drillVerdict = checkDrill(d, raw);
      drillVerdict.typed = d.t === "order" ? drillAnswer(d) : raw.trim();
    }
    d.ok = drillVerdict.ok;
    show(renderDrill());
    return;
  }
  if (t.dataset.act === "drill-next") { di++; setupDrill(); show(renderDrill()); return; }

  if (t.hasAttribute("data-pick")) {
    if (answered) return;
    qLog[qi] = Number(t.dataset.pick);
    const src = qOrder[qi];
    if (qLog[qi] === COURSE[S.day - 1].quiz[src].a) qScore++;
    else {
      // Journal : quelle question résiste, et depuis combien de fois.
      const k = S.day + ":" + src;
      S.qmiss[k] = (S.qmiss[k] || 0) + 1;
      persist();
    }
    answered = true;
    show(renderQuestion());
    return;
  }

  if (t.dataset.act === "next") { qi++; answered = false; show(renderQuestion()); return; }

  if (t.dataset.act === "quit-test") {
    try { history.replaceState(null, "", window.location.pathname); } catch (e) {}
    go("home");
    return;
  }

  // Le test de fin de niveau A1.
  if (t.dataset.act === "a1-go")   { a1Demarre(); return; }
  if (t.dataset.act === "a1-next") {
    a1i++; a1Repondu = false; a1Verdict = null;
    // La clôture se décide ICI, sur un geste, jamais dans un rendu.
    if (a1i >= a1Questions().length) a1Termine();
    show(a1View());
    return;
  }
  if (t.dataset.a1pick !== undefined && !a1Repondu) {
    const qs = a1Questions();
    a1Verdict = Number(t.dataset.a1pick);
    a1Repond(a1Verdict === qs[a1i].it.a);
    return;
  }
  if (t.dataset.act === "a1-check") {
    const qs = a1Questions();
    const inp = document.getElementById("answer");
    // `checkAnswer` : mêmes tolérances que partout, y compris dans un examen.
    // Un test qui exigerait le ß alors que l'app ne l'exige jamais mesurerait
    // le clavier, pas l'allemand.
    a1Repond(checkAnswer(inp ? inp.value : "", qs[a1i].it.ecrit).ok);
    return;
  }

  // Les verbes irréguliers.
  if (t.dataset.act === "verbe-check") { verbeRepond(); return; }
  if (t.dataset.act === "verbe-next")  {
    verbeVerdict = null;
    verbeCourant = verbeTire();
    show(verbesView());
    return;
  }

  /* L'ancrage n'a plus qu'UN geste à lui : relancer une boucle. Répondre,
     corriger, passer au mot suivant — tout cela passe par les gestes des
     cartes (`check-word`, `dunno`, `card-next`), puisque c'est le même écran.
     C'est la contrepartie de la fusion demandée par Exsangue, et la seule qui
     compte : rien à maintenir en double. */
  if (t.dataset.act === "ancr-boucle") {
    show(startDeck(tireBoucle(), false, true), true);
    return;
  }

  // Le contre-la-montre.
  if (t.dataset.act === "chrono-go")    { chronoDemarre(); return; }
  if (t.dataset.act === "chrono-check") { chronoRepond(); return; }
  if (t.dataset.act === "chrono-passe") {
    // Passer coûte le combo, comme une erreur : sinon on passerait tous les
    // mots durs sans jamais rien risquer, et le combo ne voudrait plus rien.
    chronoCombo = 0; chronoDernier = "";
    chronoMot = chronoTire();
    show(chronoView());
    return;
  }
  if (t.dataset.act === "chrono-stop")  { chronoFin(); return; }

  /* Le relais : on retient où l'on va, puis on annonce. Une route ne prenant
     pas d'argument, la cible passe par cette variable. */
  if (t.dataset.relais) { relaisVers = t.dataset.relais; go("relais"); return; }

  /* ⚠️ LES FLÈCHES DE L'ORDRE DES CASES — signalé par le mentor (§1.2).
     Elles étaient DESSINÉES dans les réglages, avec leur `aria-label`, leur
     état désactivé en haut et en bas de liste... et personne ne les écoutait.
     Rien ne se passait au clic. Tout le reste du mécanisme existait pourtant :
     `prefs.ordre` était enregistré, `ordreModes()` le lisait, l'accueil le
     respectait — il ne manquait que ces huit lignes.

     Un bouton inerte est pire qu'un bouton absent : il promet quelque chose.

     ⚠️ Ne pas brancher ça AVANT la copie profonde de `fresh()` : `prefs.ordre`
     était le tableau de `PREFS_DEFAUT` lui-même, et l'échange ci-dessous aurait
     réordonné les valeurs par défaut de l'app. Les deux défauts se tenaient. */
  if (t.dataset.monte || t.dataset.descend) {
    const monte = !!t.dataset.monte;
    const id = monte ? t.dataset.monte : t.dataset.descend;
    /* On repart de `ordreModes()` et non de `prefs.ordre` brut : c'est la
       liste COMPLÈTE et sans doublon, donc la même que celle affichée. Agir
       sur autre chose que ce qui est à l'écran donnerait un déplacement qui
       ne correspond pas au clic. */
    const ordre = ordreModes();
    const i = ordre.indexOf(id);
    const j = monte ? i - 1 : i + 1;
    if (i !== -1 && j >= 0 && j < ordre.length) {
      ordre[i] = ordre[j];
      ordre[j] = id;
      S.prefs.ordre = ordre;
      persist();
      go("reglages");
    }
    return;
  }

  /* Rendre UNE case à la palette. On supprime l'entrée au lieu d'y réécrire
     la couleur du thème : réécrire la figerait, et changer de palette
     n'aurait plus d'effet sur cette case — elle serait « d'origine » à
     l'écran tout en étant peinte dans le fichier. */
  if (t.dataset.teinteOff) {
    delete S.prefs.teintes[t.dataset.teinteOff];
    persist();
    applyPrefs();
    go("reglages");
    return;
  }
  if (t.dataset.act === "teintes-reset") {
    S.prefs.teintes = {};
    persist();
    applyPrefs();
    go("reglages");
    toolMsg("Les cinq cases suivent de nouveau la palette.");
    return;
  }

  /* Copier la progression. Deux chemins, et le second n'est pas un luxe :
     l'API du presse-papiers exige un geste de l'utilisateur ET une page
     sécurisée, et elle échoue silencieusement dans certains navigateurs
     embarqués. On sélectionne donc le texte de toute façon — même en cas
     d'échec, il ne reste plus qu'un appui long et « Copier ». */
  if (t.dataset.act === "copier") {
    const zone = document.getElementById("sauve-out");
    if (!zone) return;
    zone.focus();
    zone.setSelectionRange(0, zone.value.length);
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(zone.value).then(function () {
        toolMsg("Progression copiée. Colle-la dans une note pour la garder.");
      }).catch(function () {
        toolMsg("Le texte est sélectionné : appuie longuement dessus, puis « Copier ».");
      });
    } else {
      toolMsg("Le texte est sélectionné : appuie longuement dessus, puis « Copier ».");
    }
    return;
  }

  /* Restaurer depuis du texte collé. Exactement les mêmes garanties que la
     restauration par fichier — et ce n'est plus une promesse en l'air depuis
     le 13/08/2026 : les deux chemins lisent, valident, appellent
     `confirmeRemplacement`, puis `sane`. On refuse un texte illisible plutôt
     que d'écraser une progression avec du vide. */
  if (t.dataset.act === "coller") {
    const zone = document.getElementById("sauve-in");
    if (!zone) return;
    const brut = String(zone.value || "").trim();
    if (!brut) { toolMsg("Colle d'abord une sauvegarde dans le cadre."); return; }
    let lu;
    try { lu = JSON.parse(brut); }
    catch (e) { toolMsg("Ce texte n'est pas une sauvegarde valable. Recopie-le en entier."); return; }
    const issue = restaureDepuis(lu, "reglages");
    if (issue === "format") { toolMsg("Ce texte n'est pas une sauvegarde de cette app."); return; }
    if (issue === "annule") { toolMsg("Restauration annulée. Rien n'a bougé."); return; }
    toolMsg("Progression restaurée.");
    return;
  }

  if (t.dataset.act === "export") { exportData(); return; }
  if (t.dataset.act === "import") { importData(); return; }
  /* Remettre les réglages d'origine ne touche PAS à la progression : ce sont
     deux choses sans rapport, et confondre les deux ferait de ce bouton un
     piège. « Tout effacer », lui, est ailleurs et demande confirmation. */
  if (t.dataset.act === "prefs-reset") {
    /* Les champs composés sont RECOPIÉS, pas partagés. `Object.assign` ne
       copie que la surface : sans ces deux lignes, `S.prefs.teintes` et
       `PREFS_DEFAUT.teintes` seraient le même objet, et peindre une case
       après un retour aux réglages d'origine modifierait la valeur par
       défaut elle-même — donc pour toujours, y compris au prochain reset. */
    S.prefs = Object.assign({}, PREFS_DEFAUT, {
      teintes: {},
      ordre: MODES_IDS.slice()
    });
    persist();
    applyPrefs();
    go("reglages");
    toolMsg("Réglages d'origine rétablis. Ta progression n'a pas bougé.");
    return;
  }
  if (t.dataset.act === "reset") {
    if (window.confirm("Effacer toute ta progression ? C'est définitif.")) {
      S = fresh(); persist(); paintStreak(); applyPrefs(); go("home");
    }
    return;
  }
});

/* ---------- La pastille de couleur ----------
   Elle n'émet pas de clic exploitable : c'est `input` pendant qu'on déplace
   le doigt, et `change` quand on referme le sélecteur. D'où un écouteur à
   part, et deux comportements distincts :

     - `input`  → on applique la couleur SANS redessiner l'écran. Redessiner
                  à chaque mouvement arracherait le sélecteur des mains.
                  C'est ce qui donne l'aperçu en direct sur le badge d'en-tête.
     - `change` → là seulement on enregistre et on redessine, pour que la
                  ligne passe de « d'origine » à « à toi » et gagne sa croix.

   Posé sur `view` par délégation, comme les clics : l'écran des réglages est
   reconstruit à chaque changement, un écouteur par pastille ne survivrait
   pas au premier redessin. */
function poseTeinte(cible, redessiner) {
  const id = cible && cible.dataset && cible.dataset.teinte;
  if (!id || MODES_IDS.indexOf(id) === -1) return;
  const v = String(cible.value || "").trim().toLowerCase();
  if (!/^#[0-9a-f]{6}$/.test(v)) return;   // rien ne vaut mieux qu'une case sans fond
  if (!S.prefs.teintes || typeof S.prefs.teintes !== "object") S.prefs.teintes = {};
  S.prefs.teintes[id] = v;
  applyPrefs();
  if (redessiner) { persist(); go("reglages"); }
}
view.addEventListener("input", function (e) {
  if (e.target && e.target.dataset && e.target.dataset.teinte) poseTeinte(e.target, false);
});
view.addEventListener("change", function (e) {
  if (e.target && e.target.dataset && e.target.dataset.teinte) poseTeinte(e.target, true);
});

/* Entrée : valider, puis enchaîner.
   Demandé par Exsangue le 01/08/2026. L'ancien gestionnaire ne savait que
   valider, et seulement dans les cartes et l'oral : il fallait reprendre la
   souris entre chaque carte, et les exercices comme les questions du livre
   n'y répondaient pas du tout. Enchaîner vingt cartes au clavier change le
   rythme d'une séance.

   L'écouteur est sur `document` et non sur `view` : une fois la réponse
   validée, le champ disparaît de l'écran, donc le focus retombe sur la page
   et la touche n'atteindrait plus `view`.

   L'ordre compte : on valide d'abord s'il y a quelque chose à valider, on
   passe à la suite seulement sinon. L'inverse ferait sauter une carte à
   chaque fois qu'on appuie deux fois un peu vite.

   ⚠️ `revele` vivait ici — « quand la carte courante a été retournée ». Retiré
   le 13/08/2026 (§3) : plus rien ne le lisait depuis que les cartes ne se
   retournent plus (« plus aucune carte passive », 01/08/2026). Il servait à
   empêcher qu'un double appui trop rapide valide « Je savais » juste après le
   retournement — un bouton qui n'existe plus. La variable, elle, était restée,
   et son commentaire décrivait un mécanisme disparu à qui lisait le fichier. */

document.addEventListener("keydown", function (e) {
  if (e.key !== "Enter") return;

  const cible = e.target;
  // Un texte long se saisit sur plusieurs lignes : Entrée doit y rester Entrée.
  if (cible && cible.tagName === "TEXTAREA") return;

  /* ⚠️ ON NE VOLE PAS ENTRÉE À CELUI QUI L'ATTEND — signalé par le mentor
     (§2.4), et c'est le prix de l'écouteur posé sur `document`.

     Le navigateur active DÉJÀ le bouton qui a le focus quand on appuie sur
     Entrée : c'est le fonctionnement normal du clavier, celui dont dépend
     quiconque ne se sert pas d'une souris. On tombait pourtant sur la branche
     « valider », qui faisait `preventDefault()` — donc le bouton focalisé ne
     recevait jamais son clic, et un autre agissait à sa place. Concrètement :
     tabuler jusqu'à « Je ne sais pas » et appuyer sur Entrée VALIDAIT la
     carte, et le rouage des réglages, focalisé, validait une carte aussi.

     La règle est simple : si l'élément focalisé sait déjà répondre à Entrée,
     on se retire. `preventDefault()` est le vrai coupable ici — ce n'est pas
     « en plus » du comportement normal, c'est À LA PLACE.

     Ce qui suit continue de marcher, et c'est le point : après une validation
     l'écran est redessiné, le champ disparaît, le focus retombe sur la page
     (`body`) — qui n'active rien. Entrée est alors libre, et c'est là qu'on
     enchaîne. */
  if (cible && cible.closest && cible.closest('button,a[href],summary,select')) return;

  // Dans une question du livre, Entrée envoie la réponse — sans la dévoiler.
  if (cible && cible.dataset && cible.dataset.in) {
    const envoi = view.querySelector('[data-send="' + cible.dataset.in + '"]');
    if (envoi) { e.preventDefault(); envoi.click(); }
    return;
  }

  /* Les verbes irréguliers ont PLUSIEURS champs. Entrée doit y descendre au
     suivant, et ne valider que depuis le dernier — sinon on validerait une
     conjugaison à moitié écrite en croyant passer à la ligne d'en dessous. */
  if (cible && cible.dataset && cible.dataset.vf) {
    const champs = Array.prototype.slice.call(view.querySelectorAll("[data-vf]"));
    const i = champs.indexOf(cible);
    if (i !== -1 && i < champs.length - 1) {
      e.preventDefault();
      champs[i + 1].focus();
      return;
    }
  }

  const valider = view.querySelector(
    '[data-act="check-word"],[data-act="oral-check"],[data-act="drill-check"],[data-act="chrono-check"],[data-act="verbe-check"]');
  if (valider) { e.preventDefault(); valider.click(); return; }

  const suivant = view.querySelector(
    '[data-act="card-next"],[data-act="oral-next"],[data-act="drill-next"],[data-act="verbe-next"]');
  if (suivant) { e.preventDefault(); suivant.click(); }
});

/* La flèche gauche vaut « Je ne sais pas ». Elle visait « Raté » tant que les
   cartes se retournaient ; depuis qu'on écrit toujours, c'est le bouton
   d'abandon qu'elle sert. Placée sous la main gauche, à l'opposé d'Entrée,
   pour qu'on ne l'atteigne pas par inadvertance en validant.
   Elle est ignorée dans un champ de saisie : la flèche doit y déplacer le
   curseur, sinon on ne peut plus corriger une faute de frappe. */
document.addEventListener("keydown", function (e) {
  if (e.key !== "ArrowLeft") return;
  if (e.target && (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")) return;
  const abandon = view.querySelector('[data-act="dunno"],[data-act="oral-dunno"]');
  if (abandon) { e.preventDefault(); abandon.click(); }
});

/* ===============================================================
   6. SAUVEGARDE / RESTAURATION
   =============================================================== */
function toolMsg(txt) {
  const el = document.getElementById("toolmsg");
  if (el) el.textContent = txt;
}

/* ⚠️ LA MÊME QUESTION POUR LES DEUX CHEMINS DE RESTAURATION — signalé par le
   mentor (§2.3). Restaurer par FICHIER n'a longtemps rien demandé du tout : le
   fichier écrasait la progression directement, alors que le collage par texte,
   lui, demandait confirmation. Deux portes vers la même pièce, une seule
   fermée à clé.

   Le commentaire du collage annonçait pourtant « mêmes garanties que la
   restauration par fichier ». C'est la famille de défauts que le mentor
   pointe partout dans son rapport : une garantie ÉCRITE quelque part et tenue
   nulle part. Elle est vraie maintenant, et elle l'est parce que les deux
   chemins appellent LA MÊME FONCTION — deux confirmations recopiées auraient
   fini par diverger.

   Elle DIT CE QU'ON PERD. Une question à laquelle on répond toujours oui ne
   protège de rien : « Remplacer ta progression ? » ne se compare à rien, alors
   que « étape 26 → étape 4 » se voit tout de suite. C'est exactement le cas
   dangereux — restaurer une vieille sauvegarde en croyant récupérer la
   récente. */
function confirmeRemplacement(p) {
  const etape = function (n) {
    const v = Math.floor(Number(n));
    return isFinite(v) ? Math.min(COURSE.length, Math.max(1, v)) : 1;
  };
  const mots = function (o) {
    return (o && o.cards && typeof o.cards === "object") ? Object.keys(o.cards).length : 0;
  };
  return window.confirm(
    "Remplacer ta progression actuelle par cette sauvegarde ?\n\n" +
    "Maintenant :   étape " + etape(S.day) + ", " + mots(S) + " mots travaillés\n" +
    "La sauvegarde :  étape " + etape(p && p.day) + ", " + mots(p) + " mots travaillés\n\n" +
    "L'actuelle sera perdue."
  );
}
/* ⚠️ LE SEUL ENDROIT QUI ÉCRIT UNE SAUVEGARDE ENTRANTE. Il y en avait deux —
   le fichier et le texte collé — et ils ne faisaient PAS la même chose : le
   fichier reposait le contenu sur `fresh()` avant de le borner, le texte
   collé non. C'est ainsi que la confirmation avait pu manquer d'un côté sans
   que personne le voie : deux copies d'une même procédure dérivent toujours,
   et c'est le défaut de fond du §2.3, pas la confirmation elle-même.

   `Object.assign(fresh(), p)` d'abord, et pour une raison précise : une
   sauvegarde d'une version ANTÉRIEURE n'a pas toutes les clés d'aujourd'hui.
   La reposer sur une progression neuve garantit qu'aucune ne manque, avant
   même que `sane` ne borne les valeurs.

   Renvoie « format », « annule » ou « ok » — au lieu d'afficher lui-même le
   message. Les deux appelants ne parlent pas de la même chose (« ce fichier »,
   « ce texte ») et n'atterrissent pas sur le même écran : la fonction fait,
   l'appelant raconte. */
function restaureDepuis(p, ecran) {
  if (!p || typeof p !== "object" || !p.cards) return "format";
  if (!confirmeRemplacement(p)) return "annule";
  S = sane(Object.assign(fresh(), p));
  persist();
  paintStreak();
  applyPrefs();
  go(ecran || "home");
  return "ok";
}

function exportData() {
  const json = JSON.stringify(S, null, 2);
  const name = "allemand-progression-" + today() + ".json";

  if (window.claude && window.claude.downloads) {
    window.claude.downloads.save({ filename: name, data: json })
      .then(function () { toolMsg("Sauvegarde enregistrée."); })
      .catch(function (err) {
        if (err && err.code === "declined") toolMsg("Sauvegarde annulée.");
        else toolMsg("Sauvegarde impossible ici. Essaie depuis un navigateur classique.");
      });
    return;
  }
  /* ⚠️ DEUX DÉFAUTS DU TÉLÉCHARGEMENT — signalés par le mentor (§2.3). Les
     deux donnaient le même résultat : « Sauvegarde enregistrée. » à l'écran,
     et aucun fichier sur l'appareil. Le pire message possible sur l'écran de
     sauvegarde — on croit sa progression à l'abri, et elle ne l'est pas.

     1. Le lien n'était JAMAIS inséré dans la page. Plusieurs navigateurs
        ignorent le clic sur un élément détaché du document.
     2. `URL.revokeObjectURL` était appelé tout de suite après `click()`. Or le
        téléchargement ne fait que COMMENCER au clic : révoquer l'adresse dans
        la foulée, c'est retirer le fichier des mains du navigateur pendant
        qu'il l'écrit. On libère donc plus tard — la mémoire est rendue de
        toute façon, juste pas dans la même seconde.

     Le lien est retiré tout de suite, lui : il n'a rien à faire dans la page,
     et il porte `hidden` pour ne pas déplacer un pixel entre-temps. */
  try {
    const url = URL.createObjectURL(new Blob([json], { type: "application/json" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.hidden = true;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 60000);
    toolMsg("Sauvegarde enregistrée.");
  } catch (e) { toolMsg("Sauvegarde impossible dans ce navigateur."); }
}
function importData() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "application/json,.json";
  input.addEventListener("change", function () {
    const f = input.files && input.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = function () {
      try {
        /* ⚠️ ON DEMANDE APRÈS AVOIR LU, JAMAIS AVANT — c'est `restaureDepuis`
           qui tient cet ordre. Poser la question en premier ferait confirmer
           l'écrasement de sa progression par un fichier qui se révèle ensuite
           illisible : on aurait dit oui à rien. */
        const issue = restaureDepuis(JSON.parse(r.result), "home");
        if (issue === "format") { toolMsg("Ce fichier n'est pas une sauvegarde valide."); return; }
        if (issue === "annule") { toolMsg("Restauration annulée. Rien n'a bougé."); return; }
        toolMsg("Progression restaurée.");
      } catch (e) { toolMsg("Ce fichier n'est pas une sauvegarde valide."); }
    };
    r.readAsText(f);
  });
  input.click();
}
