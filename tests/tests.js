"use strict";
/* L'AUTO-TEST — ouvrir index.html#test.
   Sorti de index.html le 13/08/2026, et surtout SORTI DE LA VERSION PUBLIÉE :
   publier.ps1 ne copie pas ce fichier et retire sa balise du index.html publié.
   Il pesait 20 % du poids téléchargé par l'utilisateur pour rien.

   demarrage.js vérifie que runTests existe avant de l'appeler : sur la version
   publiée, il n'existe pas, et #test ouvre simplement l'accueil. */
/* ===============================================================
   7. AUTO-TEST — ouvrir index.html#test
   =============================================================== */
let T = [];
function ok(name, cond, detail) { T.push({ n: name, p: !!cond, d: detail || "" }); }
function eq(name, got, want) {
  ok(name, got === want, "obtenu " + JSON.stringify(got) + " · attendu " + JSON.stringify(want));
}

function runTests() {
  /* La vraie progression est mise de cote AVANT tout, et remise en place dans le
     "finally" plus bas : les tests ecrivent pour de vrai dans le stockage (grade()
     appelle persist()), donc une exception en cours de route laisserait l etat de
     test a la place de la vraie sauvegarde. C est arrive le 02/08/2026.
     "lu" distingue "il n y avait rien" de "je n ai pas pu lire" : sans ce drapeau,
     un getItem qui echoue ferait EFFACER la sauvegarde par le removeItem. */
  let backup = null, lu = false;
  try { backup = localStorage.getItem(KEY); lu = true; } catch (e) {}
  T = [];

  try {

  /* --- A. Intégrité du contenu --- */
  COURSE.forEach(function (l, i) {
    const tag = "jour " + (i + 1);
    ok(tag + " : numéro cohérent avec sa position", l.day === i + 1);
    ok(tag + " : titre et phrase-titre renseignés", !!l.title && !!l.de);

    ok(tag + " : au moins deux étapes", l.steps.length >= 2);
    ok(tag + " : chaque étape porte une idée", l.steps.every(function (s) { return !!s.idea; }));
    ok(tag + " : les mots à mots sont alignés",
       l.steps.every(function (s) { return !s.gloss || s.gloss.de.length === s.gloss.fr.length; }));
    ok(tag + " : aucun mot à mot vide",
       l.steps.every(function (s) { return !s.gloss || (s.gloss.de.length > 0 && s.gloss.de.every(Boolean) && s.gloss.fr.every(Boolean)); }));
    ok(tag + " : les tableaux ont deux colonnes",
       l.steps.every(function (s) { return !s.table || s.table.every(function (r) { return r.length === 2 && r[0] && r[1]; }); }));
    ok(tag + " : au moins une mini-question dans la leçon",
       l.steps.some(function (s) { return !!s.check; }));
    ok(tag + " : chaque mini-question est valide",
       l.steps.every(function (s) {
         if (!s.check) return true;
         const c = s.check;
         return !!c.q && !!c.why && c.o.length >= 2 &&
                Number.isInteger(c.a) && c.a >= 0 && c.a < c.o.length &&
                new Set(c.o).size === c.o.length;
       }));

    ok(tag + " : exemples complets (allemand + français)", l.examples.length > 0 && l.examples.every(function (e) { return e.d && e.f; }));
    ok(tag + " : vocabulaire complet, prononciation comprise",
       l.vocab.length > 0 && l.vocab.every(function (v) { return v.d && v.f && v.p; }));
    ok(tag + " : aucun mot en double", new Set(l.vocab.map(function (v) { return v.d; })).size === l.vocab.length);

    ok(tag + " : quiz non vide", l.quiz.length > 0);
    ok(tag + " : chaque bonne réponse pointe sur une option existante",
       l.quiz.every(function (q) { return Number.isInteger(q.a) && q.a >= 0 && q.a < q.o.length; }));
    ok(tag + " : aucune option dupliquée dans une question",
       l.quiz.every(function (q) { return new Set(q.o).size === q.o.length; }));
    ok(tag + " : chaque question est expliquée", l.quiz.every(function (q) { return !!q.why; }));
  });

  /* --- A bis. La structure Niveau / Chapitre / Étape --- */
  ok("structure : chaque étape écrite appartient à un chapitre",
     (function () {
       for (let n = 1; n <= COURSE.length; n++) if (!chapterOf(n)) return false;
       return true;
     })());
  ok("structure : aucune étape n'est rangée dans deux chapitres",
     (function () {
       const vus = {};
       for (let i = 0; i < CHAPTERS.length; i++) {
         for (let j = 0; j < CHAPTERS[i].steps.length; j++) {
           const n = CHAPTERS[i].steps[j];
           if (vus[n]) return false;
           vus[n] = true;
         }
       }
       return true;
     })());
  ok("structure : les chapitres regroupent des étapes consécutives",
     CHAPTERS.every(function (ch) {
       return ch.steps.every(function (n, i) { return i === 0 || n === ch.steps[i - 1] + 1; });
     }));
  ok("structure : chaque chapitre a un titre", CHAPTERS.every(function (ch) { return !!ch.title; }));
  eq("structure : l'étape 1 ouvre le chapitre 1", chapterOf(1).chapter.n, 1);
  eq("structure : et elle y est en première position", chapterOf(1).rank, 1);
  /* Ces règles ne visent plus des numéros d'étape en dur : le cours se
     construit unité par unité, et une vérification qui nomme « l'étape 4 »
     casse à chaque étape ajoutée au lieu de signaler un vrai défaut. */
  ok("structure : chaque chapitre reprend là où le précédent s'arrête",
     CHAPTERS.every(function (ch, i) {
       if (i === 0) return ch.steps[0] === 1;
       const avant = CHAPTERS[i - 1].steps;
       return ch.steps[0] === avant[avant.length - 1] + 1;
     }));
  ok("structure : le dernier chapitre se termine sur la dernière étape écrite",
     (function () {
       const dernier = CHAPTERS[CHAPTERS.length - 1].steps;
       return dernier[dernier.length - 1] === COURSE.length;
     })());
  ok("structure : chaque étape est en première position de son chapitre ou suit la précédente",
     CHAPTERS.every(function (ch) {
       return ch.steps.every(function (n, i) { return chapterOf(n).rank === i + 1; });
     }));

  /* ---- La touche Entrée ----
     Demandé par Exsangue : valider ET enchaîner sans reprendre la souris.
     On envoie une vraie touche, pas un appel de fonction : c'est le seul
     moyen de vérifier que l'écouteur est bien branché là où il faut. */
  function entree(sur) {
    (sur || document.body).dispatchEvent(
      new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
  }

  S = fresh(); S.day = 1; seed(1);
  go("cards");
  (function () {
    const champ = view.querySelector("#answer");
    if (champ) {
      champ.value = "n'importe quoi";
      entree(champ);
      ok("Entrée : dans les cartes, elle valide",
         !!view.querySelector('[data-act="card-next"]'));
      entree();
      ok("Entrée : puis elle passe à la carte suivante",
         !view.querySelector('[data-act="card-next"]'));
    }
  })();

  /* Les cartes du niveau 1 : on y écrit le français, comme partout ailleurs.
     Le garde-fou du double appui n'a plus lieu d'être — il protégeait le
     « Je savais » d'un retournement trop rapide, et ce bouton n'existe plus. */
  S = fresh(); S.day = 1; seed(1);
  go("cards");
  (function () {
    const champ = document.getElementById("answer");
    ok("Entrée : au niveau 1 aussi, il y a un champ à remplir", !!champ);
    if (!champ) return;
    champ.value = deck[0].f;
    entree(champ);
    ok("Entrée : elle valide la carte de niveau 1",
       !!view.querySelector('[data-act="card-next"]'));
    entree();
    ok("Entrée : puis elle passe à la suivante",
       !view.querySelector('[data-act="card-next"]'));
  })();

  /* ---- §2.4 · Entrée n'est plus volée aux autres boutons ----
     L'écouteur est sur `document`, il voit donc TOUTES les touches Entrée, y
     compris celles destinées au bouton qui a le focus. Il tombait sur la
     branche « valider » et faisait `preventDefault()` : le bouton focalisé ne
     recevait jamais son clic, et un autre agissait à sa place.

     Ce qui est vérifié n'est pas « le bon bouton s'active » — une touche
     envoyée par programme n'active nativement rien, seul un vrai navigateur le
     fait. C'est l'inverse, et c'est ce qui compte : **l'app ne fait rien et ne
     mange pas la touche**, donc le navigateur peut faire son travail. */
  S = fresh(); S.day = 1; seed(1);
  go("cards");
  (function () {
    const abandon = view.querySelector('[data-act="dunno"]');
    ok("Entrée : la carte offre bien un autre bouton que « valider »", !!abandon);
    if (!abandon) return;

    const ev = new KeyboardEvent("keydown", { key: "Enter", bubbles: true, cancelable: true });
    abandon.dispatchEvent(ev);
    ok("Entrée : sur un autre bouton, elle ne valide pas la carte",
       !view.querySelector('[data-act="card-next"]'));
    /* ⚠️ LA VÉRIFICATION QUI PORTE VRAIMENT. `preventDefault()` n'agit pas
       « en plus » du comportement normal du clavier : il agit À LA PLACE.
       Tant qu'il est appelé, le bouton focalisé reste inerte quoi qu'on
       fasse — c'est la cause du §2.4, pas son symptôme. */
    ok("Entrée : et elle laisse le navigateur activer ce bouton",
       ev.defaultPrevented === false);
  })();

  /* Le rouage vit dans l'en-tête, hors de `view`. Focalisé, il validait une
     carte : la touche traversait tout l'écran pour agir ailleurs. */
  S = fresh(); S.day = 1; seed(1);
  go("cards");
  (function () {
    const rouage = document.getElementById("gear");
    ok("Entrée : le rouage est là pour l'essai", !!rouage);
    if (!rouage) return;
    const ev = new KeyboardEvent("keydown", { key: "Enter", bubbles: true, cancelable: true });
    rouage.dispatchEvent(ev);
    ok("Entrée : depuis le rouage, elle ne valide aucune carte",
       !view.querySelector('[data-act="card-next"]'));
    ok("Entrée : le rouage garde sa touche", ev.defaultPrevented === false);
  })();

  /* ⚠️ ET LE CHEMIN NORMAL, qui ne doit RIEN perdre au passage : une fois la
     réponse validée, l'écran est redessiné, le champ disparaît et le focus
     retombe sur la page. C'est là — et seulement là — qu'Entrée enchaîne.
     Sans cette vérification, « ne rien voler » se règlerait en ne faisant
     plus rien du tout. */
  S = fresh(); S.day = 1; seed(1);
  go("cards");
  (function () {
    const champ = view.querySelector("#answer");
    if (!champ) return;
    champ.value = "n'importe quoi";
    entree(champ);
    ok("Entrée : elle valide toujours depuis le champ",
       !!view.querySelector('[data-act="card-next"]'));
    entree();
    ok("Entrée : et enchaîne toujours depuis la page",
       !view.querySelector('[data-act="card-next"]'));
  })();

  /* La flèche gauche vaut « Je ne sais pas » depuis que les cartes s'écrivent
     toutes — elle visait « Raté », qui n'existe plus. */
  S = fresh(); S.day = 1; seed(1);
  go("cards");
  (function () {
    const avant = !!view.querySelector('[data-act="dunno"]');
    document.body.dispatchEvent(
      new KeyboardEvent("keydown", { key: "ArrowLeft", bubbles: true }));
    ok("Flèche gauche : elle vaut « Je ne sais pas »",
       avant && !!view.querySelector('[data-act="card-next"]'));
  })();

  /* Mais elle ne doit rien déclencher pendant qu'on écrit : dans un champ,
     la flèche sert à corriger une faute de frappe. */
  S = fresh(); S.day = 1; seed(1);
  go("cards");
  (function () {
    const champ = document.getElementById("answer");
    champ.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft", bubbles: true }));
    ok("Flèche gauche : sans effet quand on est dans le champ",
       !view.querySelector('[data-act="card-next"]'));
  })();

  S = fresh(); S.day = 1; seed(1);
  go("drills");
  (function () {
    const champ = view.querySelector("#answer");
    if (!champ) { ok("Entrée : exercice sans champ, rien à vérifier", true); return; }
    champ.value = "n'importe quoi";
    entree(champ);
    ok("Entrée : dans les exercices, elle valide aussi",
       !!view.querySelector('[data-act="drill-next"]'));
  })();

  /* La touche Entrée dans une question du livre : seulement s'il y a un livre. */
  if (BOOK.length) {
    S.unit = 1; go("unit");
    const champ = view.querySelector('[data-in="u1-0-0"]');
    champ.value = "Ich spreche Russisch";
    entree(champ);
    const fb = view.querySelector('[data-fb="u1-0-0"]');
    ok("Entrée : dans une question du livre, elle envoie la réponse",
       !fb.hidden && fb.className.indexOf("good") !== -1);
    ok("Entrée : et elle ne dévoile pas la réponse",
       fb.innerHTML.indexOf("La réponse") === -1);
  }

  /* Tout ce qui suit ne concerne que le livre. Dans la version publiée,
     `BOOK` est vide : ces vérifications n'ont plus d'objet et se retirent
     d'elles-mêmes, au lieu d'échouer en bloc. */
  if (BOOK.length) {

  /* ---- Lire un dialogue d'un bout à l'autre ----
     Demandé par Exsangue. On ne peut pas faire parler la voix de synthèse
     dans le harnais, mais on vérifie tout ce qui l'entoure : le bouton, le
     repère visuel, l'arrêt, et surtout qu'on ne laisse pas une lecture
     tourner derrière un autre écran. */
  S = fresh(); S.unit = 2; go("unit");
  (function () {
    ok("dialogue : un bouton propose d'écouter tout le dialogue",
       !!view.querySelector('[data-play="2"]'));
    eq("dialogue : chaque réplique est repérable pour le surlignage",
       view.querySelectorAll("[data-line]").length,
       BOOK.filter(function (x) { return x.n === 2; })[0].dialogue.lines.length);

    /* La lecture doit s'arrêter quand on change d'écran, sinon le dialogue
       continue à parler par-dessus la suite, sans bouton pour le couper. */
    lecture = { i: 0, stop: false };
    go("book");
    ok("dialogue : changer d'écran coupe la lecture", lecture === null);

    /* Écouter une réplique seule doit couper la lecture continue : deux
       voix en même temps ne s'écoutent pas. */
    S.unit = 2; go("unit");
    lecture = { i: 0, stop: false };
    view.querySelector(".card [data-say]").click();
    ok("dialogue : écouter une réplique seule interrompt la lecture", lecture === null);

    /* Une unité sans dialogue ne doit pas afficher de bouton de lecture. */
    S.unit = 10; go("unit");
    ok("dialogue : pas de bouton quand l'unité n'a pas de dialogue",
       !view.querySelector("[data-play]"));
  })();
  S = fresh(); seed(1);

  /* ---- L'indice « où chercher » ----
     Trouvé par Exsangue : l'unité 4 demande de traduire « chez moi », mais
     sa liste de vocabulaire n'a que six mots pour sept demandés. La réponse
     est dans le dialogue. On vérifie sur ce cas précis, puis on s'assure
     qu'on ne colle pas un indice là où il n'a rien à faire. */
  (function () {
    const u4 = BOOK.filter(function (x) { return x.n === 4; })[0];
    const items = u4.exercises[0].items;

    const chezMoi = items.filter(function (it) { return it.q === "Chez moi"; })[0];
    ok("indice : « chez moi » n'est pas dans la liste de vocabulaire",
       motsDeLUnite(u4).listes.indexOf(normDE(chezMoi.a)) === -1);
    ok("indice : mais bien dans le dialogue",
       motsDeLUnite(u4).dialogue.indexOf(normDE(chezMoi.a)) !== -1);
    eq("indice : on le signale donc", indiceOu(u4, chezMoi), "Cherche dans le dialogue.");

    /* Un mot qui EST dans la liste ne doit pas recevoir d'indice : ce serait
       du bruit, et à force on ne lirait plus les indices utiles. */
    const plage = items.filter(function (it) { return it.q === "Plage"; })[0];
    eq("indice : rien à dire quand le mot est dans la liste", indiceOu(u4, plage), "");

    /* Une question ouverte n'a pas de réponse à chercher. */
    const u0 = BOOK.filter(function (x) { return x.n === 0; })[0];
    eq("indice : rien sur une question ouverte",
       indiceOu(u0, u0.exercises[0].items[0]), "");

    /* Et l'indice s'affiche vraiment à l'écran. */
    S = fresh(); S.unit = 4; go("unit");
    ok("indice : il apparaît sous la question",
       view.innerHTML.indexOf("Cherche dans le dialogue") !== -1);

    /* Il ne doit jamais apparaître sur une unité dont tout le vocabulaire
       est listé — sinon c'est que le calcul déraille. */
    S.unit = 9; go("unit");
    ok("indice : absent quand l'unité liste tout son vocabulaire",
       view.innerHTML.indexOf("Cherche dans le dialogue") === -1);

    S = fresh(); seed(1);
  })();

  /* ---- Le suivi du livre ----
     Demandé par Exsangue : voir qu'une unité est faite, et si elle l'a été
     sans faute. On répond réellement aux questions de l'unité 9 — la plus
     courte, deux questions — pour vérifier le compte de bout en bout. */
  (function () {
    const u9 = BOOK.filter(function (x) { return x.n === 9; })[0];
    const ids = askIds(u9);
    eq("suivi : l'unité 9 a deux questions comptées", ids.length, 2);

    S = fresh(); S.unit = 9; go("unit");
    ok("suivi : une unité jamais commencée n'est pas terminée", !unitScore(u9).fini);

    repondre(ids[0], "Meine Lieblingsfarbe ist grün.");
    ok("suivi : une réponse juste est enregistrée", S.bookq[ids[0]] === 1);
    ok("suivi : mais l'unité n'est pas finie tant qu'il reste une question",
       !unitScore(u9).fini);

    go("unit");
    repondre(ids[1], "n'importe quoi");
    ok("suivi : une réponse fausse est enregistrée comme faute", S.bookq[ids[1]] === 0);

    const s = unitScore(u9);
    ok("suivi : l'unité est maintenant terminée", s.fini);
    eq("suivi : avec une faute", s.fautes, 1);

    /* Le point qui fait tenir « sans faute » : réessayer ne réécrit pas
       l'histoire. Sinon il suffirait d'insister pour se déclarer parfait. */
    go("unit");
    repondre(ids[1], "Mein Pullover ist gelb und grau.");
    eq("suivi : réessayer juste n'efface pas la faute", unitScore(u9).fautes, 1);

    go("unit");
    ok("suivi : le bilan annonce l'unité terminée",
       view.innerHTML.indexOf("Unité terminée") !== -1);

    go("book");
    ok("suivi : le sommaire montre l'unité comme faite",
       view.innerHTML.indexOf("1 / " + BOOK.length + " unités terminées") !== -1);

    /* Refaire l'unité remet le compteur à zéro — et seulement celui-là. */
    S.unit = 9; go("unit");
    view.querySelector('[data-reset="9"]').click();
    ok("suivi : « Refaire cette unité » remet à zéro", !unitScore(u9).fini);

    /* Une unité tout juste, pour vérifier l'étiquette « sans faute ». */
    S = fresh(); S.unit = 9; go("unit");
    repondre(ids[0], "Meine Lieblingsfarbe ist grün.");
    go("unit");
    repondre(ids[1], "Mein Pullover ist gelb und grau.");
    eq("suivi : aucune faute quand tout est juste", unitScore(u9).fautes, 0);
    go("unit");
    ok("suivi : le bilan le dit", view.innerHTML.indexOf("sans faute") !== -1);

    /* Un champ vide ne doit pas coûter une faute : on n'a rien tenté. */
    S = fresh(); S.unit = 9; go("unit");
    view.querySelector('[data-send="' + ids[0] + '"]').click();
    ok("suivi : envoyer à vide ne compte pas de faute", S.bookq[ids[0]] === undefined);

    /* Révéler avant d'avoir répondu, si : c'est le sens du bouton. */
    S = fresh(); S.unit = 9; go("unit");
    view.querySelector('[data-check="' + ids[0] + '"]').click();
    ok("suivi : révéler la réponse compte comme une faute", S.bookq[ids[0]] === 0);

    /* Les questions ouvertes restent hors du compte — on ne peut pas les juger. */
    const u0 = BOOK.filter(function (x) { return x.n === 0; })[0];
    eq("suivi : une unité sans question fermée ne compte rien", askIds(u0).length, 0);

    S = fresh(); seed(1);
  })();

  /* ---- Le livre nourrit les cartes, l'oral et le récapitulatif ---- */
  (function () {
    function mots(n) { return COURSE[n - 1].vocab.map(function (v) { return v.d; }); }
    function phrases(n) { return COURSE[n - 1].examples.map(function (e) { return e.d; }); }

    ok("livre → app : le vocabulaire de l'unité 1 est dans l'étape 2",
       mots(2).indexOf("Wurzeln") !== -1 && mots(2).indexOf("Empfehlen") !== -1);
    /* « Ebenfalls » ne convient pas comme témoin : l'étape 3 l'avait déjà,
       et la déduplication l'écarte — à juste titre. On vise un mot que
       seul le livre apporte. */
    ok("livre → app : le vocabulaire de l'unité 2 est dans l'étape 3",
       mots(3).indexOf("Hier ist") !== -1 && mots(3).indexOf("Mein Freund") !== -1);
    ok("livre → app : un mot déjà présent n'est pas ajouté une deuxième fois",
       mots(3).filter(function (m) { return normDE(m) === "ebenfalls"; }).length === 1);
    ok("livre → app : le vocabulaire de l'unité 3 est dans l'étape 4",
       mots(4).indexOf("Alles gut?") !== -1);
    ok("livre → app : le vocabulaire de l'unité 4 est dans l'étape 5",
       mots(5).indexOf("Nachholen") !== -1);

    /* Le décalage se résorbe tout seul : dès qu'une étape existe, l'unité
       correspondante la nourrit sans qu'on ait rien à rebrancher. */
    ok("livre → app : l'unité 10 nourrit l'étape 11 dès que l'étape existe",
       mots(11).indexOf("die Vokabeln") !== -1 && mots(11).indexOf("die Bibliothek") !== -1);
    ok("livre → app : l'unité 11 nourrit l'étape 12",
       mots(12).indexOf("trinken") !== -1 && mots(12).indexOf("treffen") !== -1);
    /* Toutes les unités n'ont pas de dialogue : les unités 10 et 11 sont des
       pages de tableaux. Une étape en face d'une telle unité garde donc ses
       propres phrases, et c'est le comportement voulu — mieux vaut douze
       phrases écrites pour l'étape qu'aucune. */
    ok("livre → app : une unité sans dialogue laisse l'étape avec ses phrases",
       !BOOK.filter(function (u) { return u.n === 11; })[0].dialogue &&
       phrases(12).length === 12);

    ok("livre → app : les répliques du dialogue deviennent des phrases d'exemple",
       phrases(2).indexOf("Das ist toll! Hast du deutsche Wurzeln?") !== -1);

    /* Les tableaux de référence ne sont PAS du vocabulaire à réciter :
       personne n'a à savoir écrire « Italie » en allemand sur une carte
       alors que la ligne sert à montrer pays / habitant / langue. */
    ok("livre → app : un tableau de référence ne devient pas des cartes",
       mots(2).indexOf("Italie") === -1 && mots(1).indexOf("A") === -1);

    /* Une réplique trop longue ne doit pas partir en dictée. */
    ok("livre → app : les répliques trop longues restent hors de l'oral",
       COURSE.every(function (l) {
         return l.examples.every(function (e) { return e.d.length <= ORAL_MAX_LEN + 40; });
       }));

    /* Un mot en double serait révisé deux fois, et compté deux fois. */
    COURSE.forEach(function (l) {
      const vus = {};
      let doublon = null;
      l.vocab.forEach(function (v) {
        const k = normDE(v.d);
        if (vus[k]) doublon = v.d;
        vus[k] = true;
      });
      ok("livre → app : étape " + l.day + " sans mot en double", !doublon, doublon || "");
    });

    /* La condition qui rend tout ça sûr : tout mot versé garde sa
       prononciation, sinon les cartes et l'oral affichent du vide. */
    ok("livre → app : chaque mot versé a sa prononciation",
       COURSE.every(function (l) {
         return l.vocab.every(function (v) { return v.d && v.f && v.p; });
       }));
  })();

  /* ---- L'onglet « Le livre » ---- */
  S = fresh(); seed(1);
  go("home");
  ok("livre : l'accueil propose l'onglet", !!view.querySelector('[data-go="book"]'));

  go("book");
  eq("livre : une carte par unité transcrite", view.querySelectorAll("[data-unit]").length, BOOK.length);
  ok("livre : le test de fin de niveau est proposé", !!view.querySelector('[data-go="booktest"]'));

  /* Trente-cinq unités à la file faisaient un écran interminable. Elles sont
     repliées par groupes, et le groupe où l'on travaille s'ouvre tout seul —
     sinon il faudrait recliquer au même endroit à chaque visite. */
  eq("livre : le sommaire est replié par groupes",
     view.querySelectorAll("details.grp").length, BOOK_GROUPS.length);
  ok("livre : chaque unité tombe dans un groupe et un seul",
     BOOK.every(function (u) {
       return BOOK_GROUPS.filter(function (g) { return u.n >= g.de && u.n <= g.a; }).length === 1;
     }));
  S.unit = 20; go("book");
  ok("livre : le groupe de l'unité en cours est ouvert",
     (function () {
       const g = BOOK_GROUPS.filter(function (x) { return 20 >= x.de && 20 <= x.a; })[0];
       const i = BOOK_GROUPS.indexOf(g);
       return view.querySelectorAll("details.grp")[i].open;
     })());
  ok("livre : et les autres sont fermés",
     view.querySelectorAll("details.grp[open]").length === 1);
  S.unit = 0;

  S.unit = 1; go("unit");
  ok("livre : l'unité affiche son titre", view.innerHTML.indexOf("langues et les nationalités") !== -1);
  eq("livre : les dix répliques du dialogue sont là",
     view.querySelectorAll('[data-reveal]').length, BOOK[1].dialogue.lines.length);
  ok("livre : chaque réplique peut être écoutée",
     view.querySelectorAll('.card [data-say]').length >= BOOK[1].dialogue.lines.length);
  ok("livre : la traduction est cachée au départ",
     Array.prototype.every.call(view.querySelectorAll(".trad"), function (p) { return p.hidden; }));

  /* Révéler une traduction ne doit dévoiler que celle-là. */
  view.querySelector('[data-reveal="0"]').click();
  ok("livre : révéler montre la bonne réplique",
     view.querySelector('.trad[data-fr="0"]').hidden === false);
  ok("livre : et ne dévoile pas les autres",
     view.querySelector('.trad[data-fr="1"]').hidden === true);

  S.unit = 0; go("unit");
  ok("livre : l'unité 0 affiche l'alphabet", view.innerHTML.indexOf("üp-silon") !== -1);
  ok("livre : une unité sans dialogue ne casse pas l'écran",
     !BOOK[0].dialogue && view.querySelectorAll("[data-reveal]").length === 0);

  go("booktest");
  eq("livre : le test de niveau a ses 22 exercices",
     view.querySelectorAll(".card").length, BOOK_TEST.exercises.length);
  ok("livre : le test renvoie au sommaire", !!view.querySelector('[data-go="book"]'));

  /* ---- Le livre corrige vraiment ----
     Demandé par Exsangue : « je veux que tu saches la bonne réponse et que
     tu me corriges ». On le vérifie en tapant réellement dans le champ. */
  /* On tape dans le champ puis on CLIQUE le bouton, au lieu d'appeler
     gradeItem directement : c'est le clic qui a révélé le défaut du
     01/08/2026 — les boutons du livre manquaient dans la liste des
     éléments cliquables, et rien ne se passait à l'écran alors que la
     fonction de correction, elle, marchait très bien. */
  function repondre(id, texte) {
    view.querySelector('[data-in="' + id + '"]').value = texte;
    view.querySelector('[data-send="' + id + '"]').click();
    const fb = view.querySelector('[data-fb="' + id + '"]');
    return !fb.hidden && fb.className.indexOf("good") !== -1;
  }
  function retour(id) { return view.querySelector('[data-fb="' + id + '"]').innerHTML; }

  S.unit = 1; go("unit");
  ok("livre : une question à réponse attendue a un champ de saisie",
     !!view.querySelector('[data-in="u1-0-0"]'));
  ok("livre : la bonne réponse est acceptée", repondre("u1-0-0", "Ich spreche Russisch"));
  ok("livre : et le verdict s'affiche",
     view.querySelector('[data-fb="u1-0-0"]').hidden === false &&
     view.querySelector('[data-fb="u1-0-0"]').className.indexOf("good") !== -1);

  go("unit");
  ok("livre : une réponse fausse est refusée", repondre("u1-0-1", "Ich spreche Russisch") === false);

  /* Les deux boutons demandés par Exsangue le 01/08/2026. « Envoyer » ne
     doit RIEN dévoiler, sinon le deuxième essai n'existe plus. */
  ok("livre : « Envoyer » ne dévoile pas la réponse",
     retour("u1-0-1").indexOf("Französisch lernen") === -1);
  ok("livre : mais il donne un indice utile", retour("u1-0-1").length > 0);

  go("unit");
  repondre("u1-0-0", "Ich spreche");
  ok("livre : l'indice signale un mot manquant", retour("u1-0-0").indexOf("manque") !== -1);
  go("unit");
  repondre("u1-0-0", "Ich spreche Russisch heute");
  ok("livre : l'indice signale un mot de trop", retour("u1-0-0").indexOf("de trop") !== -1);
  go("unit");
  repondre("u1-0-0", "Ich spreche Russich");
  ok("livre : une faute de frappe est signalée comme telle",
     retour("u1-0-0").indexOf("orthographe") !== -1);
  go("unit");
  repondre("u1-0-0", "");
  ok("livre : un champ vide le dit", retour("u1-0-0").indexOf("Écris") !== -1);

  go("unit");
  view.querySelector('[data-check="u1-0-1"]').click();
  ok("livre : « Voir la réponse » la dévoile, elle",
     retour("u1-0-1").indexOf("Französisch lernen") !== -1);

  ok("livre : chaque question a bien ses deux boutons",
     view.querySelectorAll('[data-send]').length === view.querySelectorAll('[data-check]').length &&
     view.querySelectorAll('[data-send]').length > 0);

  /* La tolérance doit être celle du reste de l'app, pas une autre. */
  go("unit");
  ok("livre : la casse et la ponctuation sont pardonnées",
     repondre("u1-0-2", "haben sie spanische wurzeln"));
  go("unit");
  ok("livre : ss est accepté à la place de ß",
     repondre("u1-0-1", "Ich moechte Franzoesisch lernen"));

  go("booktest");
  ok("livre : le test corrige aussi", repondre("t6-0", "fünfundzwanzig"));
  ok("livre : et refuse une réponse fausse", repondre("t6-1", "vierzig") === false);
  go("booktest");
  ok("livre : une question en français est corrigée avec indulgence",
     repondre("t8-0", "Rouge"));

  /* Les questions ouvertes n'ont pas de champ : prétendre corriger
     « décrivez votre famille » serait mentir sur ce que l'app sait faire. */
  go("booktest");
  ok("livre : une question ouverte n'a pas de champ de saisie",
     !view.querySelector('[data-in="t10-0"]') && !!view.querySelector('[data-model="t10-0"]'));
  view.querySelector('[data-model="t10-0"]').click();
  ok("livre : elle propose une réponse possible",
     view.querySelector('[data-fb="t10-0"]').innerHTML.indexOf("Meine Familie") !== -1);

  /* Les énoncés sont échappés à l'affichage — donc une balise écrite dedans
     s'afficherait en clair, telle quelle. Attrapé le 01/08/2026 sur l'unité
     12, où j'avais mis du gras autour des articles à identifier. */
  (function () {
    const balise = /<[a-z/]/i;
    BOOK.forEach(function (u) {
      (u.exercises || []).forEach(function (ex) {
        (ex.items || []).forEach(function (it) {
          ok("livre : unité " + u.n + ", l'énoncé « " + it.q.slice(0, 30) + "… » est sans balise",
             !balise.test(it.q));
        });
      });
    });
    BOOK_TEST.exercises.forEach(function (ex) {
      (ex.items || []).forEach(function (it) {
        ok("livre : test " + ex.n + ", énoncé sans balise", !balise.test(it.q));
      });
    });
  })();

  /* Chaque question à réponse attendue doit être corrigeable : une réponse
     manquante ou vide passerait inaperçue à la lecture. */
  BOOK.forEach(function (u) {
    (u.exercises || []).forEach(function (ex) {
      (ex.items || []).forEach(function (it) {
        ok("livre : unité " + u.n + ", « " + it.q + " » a une réponse ou un modèle",
           !!(it.a || it.model));
      });
    });
  });
  BOOK_TEST.exercises.forEach(function (ex) {
    ok("livre : le test, exercice " + ex.n + ", a des questions",
       !!(ex.items && ex.items.length));
    (ex.items || []).forEach(function (it) {
      ok("livre : test " + ex.n + ", « " + it.q + " » a une réponse ou un modèle",
         !!(it.a || it.model));
    });
  });

  } // fin des vérifications propres au livre

  /* Signalé par Exsangue : le trou d'un exercice à trou doit porter sur un
     MOT ENTIER. Écrire « ßig » ou « ücher » tout seul ne s'apprend pas —
     on tape une bribe sans jamais former le mot. Le trou doit donc être
     isolé par un espace, une ponctuation ou un bord de phrase. */
  COURSE.forEach(function (l) {
    (l.drills || []).filter(function (d) { return d.t === "gap"; }).forEach(function (d) {
      ok("étape " + l.day + " : le trou « " + d.s + " » porte sur un mot entier",
         !/[A-Za-zÀ-ÿäöüÄÖÜß]___|___[A-Za-zÀ-ÿäöüÄÖÜß]/.test(d.s));
    });
  });

  /* Une sauvegarde faite sur un cours plus long ne doit ni planter, ni
     laisser croire que des étapes disparues sont acquises. */
  ok("sauvegarde : une étape au-delà du cours est ramenée dans les clous",
     sane(Object.assign(fresh(), { day: COURSE.length + 7 })).day === COURSE.length);
  ok("sauvegarde : les étapes validées qui n'existent plus sont oubliées",
     sane(Object.assign(fresh(), { done: [1, COURSE.length + 3, 99] })).done.join() === "1");
  ok("sauvegarde : une étape valide n'est pas touchée",
     sane(Object.assign(fresh(), { day: 2, done: [1] })).day === 2);
  ok("sauvegarde : un contenu abîmé ne plante pas",
     sane(Object.assign(fresh(), { day: null, done: "n'importe quoi" })).day === 1);

  /* ---------- Les réglages ----------
     Demandés par Exsangue le 01/08/2026. Ce qu'on vérifie ici n'est pas
     l'apparence — c'est qu'un réglage SURVIT et qu'il AGIT. Un écran de
     réglages joli dont les valeurs ne changent rien serait pire que rien. */

  // La validation d'abord : une sauvegarde peut venir d'ailleurs.
  eq("réglages : une vitesse inconnue retombe sur le défaut",
     sane(Object.assign(fresh(), { prefs: { voix: "supersonique" } })).prefs.voix, PREFS_DEFAUT.voix);
  eq("réglages : une taille de texte inconnue aussi",
     sane(Object.assign(fresh(), { prefs: { texte: "gigantesque" } })).prefs.texte, PREFS_DEFAUT.texte);
  eq("réglages : une couleur inconnue aussi",
     sane(Object.assign(fresh(), { prefs: { couleur: "fuchsia" } })).prefs.couleur, PREFS_DEFAUT.couleur);
  eq("réglages : une valeur valide est conservée",
     sane(Object.assign(fresh(), { prefs: { voix: "vive" } })).prefs.voix, "vive");
  ok("réglages : une sauvegarde sans réglages du tout en reçoit",
     !!sane(Object.assign(fresh(), { prefs: undefined })).prefs.theme);
  eq("réglages : les autres réglages ne sont pas emportés par un seul mauvais",
     sane(Object.assign(fresh(), { prefs: { voix: "n'importe quoi", couleur: "prune" } })).prefs.couleur, "prune");

  // Puis l'effet réel sur le document et sur les constantes de séance.
  const prefsAvant = Object.assign({}, S.prefs);

  S.prefs.theme = "dark"; applyPrefs();
  eq("réglages : le thème sombre est posé sur la racine",
     document.documentElement.getAttribute("data-theme"), "dark");
  /* « auto » doit RETIRER l'attribut et non le poser à "auto" : posé, il
     gagnerait sur la media query du téléphone et figerait le thème clair. */
  S.prefs.theme = "auto"; applyPrefs();
  ok("réglages : automatique retire l'attribut au lieu de le figer",
     !document.documentElement.hasAttribute("data-theme"));

  /* Mais il ne retire que ce que l'app a posé. Le harnais de capture injecte
     data-theme de l'extérieur pour photographier le thème sombre ; l'effacer
     rendait toutes les captures sombres identiques aux claires. */
  document.documentElement.setAttribute("data-theme", "dark");   // comme un hôte
  S.prefs.theme = "auto"; applyPrefs();
  eq("réglages : un thème imposé de l'extérieur survit à « automatique »",
     document.documentElement.getAttribute("data-theme"), "dark");
  document.documentElement.removeAttribute("data-theme");

  S.prefs.couleur = "prune"; applyPrefs();
  eq("réglages : la couleur est posée sur la racine",
     document.documentElement.getAttribute("data-couleur"), "prune");

  S.prefs.texte = "enorme"; applyPrefs();
  eq("réglages : la taille du texte agit sur la racine",
     document.documentElement.style.getPropertyValue("--zoom"), String(TEXTE.enorme));

  S.prefs.seance = "courte"; applyPrefs();
  eq("réglages : une séance courte raccourcit les exercices", DRILL_SESSION, SEANCES.courte);
  eq("réglages : et l'oral aussi", ORAL_SIZE, SEANCES.courte);
  S.prefs.seance = "longue"; applyPrefs();
  eq("réglages : une séance longue les rallonge", DRILL_SESSION, SEANCES.longue);

  S.prefs.voix = "lente";
  eq("réglages : la voix lit sa vitesse dans les réglages", debit(), VOIX.lente);
  S.prefs.voix = "vive";
  eq("réglages : et elle suit quand on la change", debit(), VOIX.vive);

  // L'écran lui-même : chaque réglage doit offrir un choix cliquable, et
  // exactement un doit être marqué comme retenu.
  S = fresh(); S.day = 1; seed(1); applyPrefs();
  go("reglages");
  /* Un code de caractère HTML ne doit JAMAIS se lire à l'écran. `segment`
     échappe le texte de ses boutons : y écrire `&#183;` affichait le code en
     clair au lieu du point médian. Défaut vu sur une capture, pas par un
     test — un test qui compare du texte à la même chaîne fautive est
     d'accord avec lui-même. On vérifie donc le RENDU, sur tous les écrans
     qui s'ouvrent sans état particulier. */
  ["home", "reglages"].forEach(function (ecran) {
    go(ecran);
    ok("écran « " + ecran + " » : aucun code de caractère HTML visible",
       view.textContent.indexOf("&#") === -1 && view.textContent.indexOf("&amp;") === -1,
       view.textContent.slice(Math.max(0, view.textContent.indexOf("&#") - 20), view.textContent.indexOf("&#") + 20));
  });

  /* Le remplissage automatique — demande d'Exsangue le 02/08/2026 : « ça me
     propose mon adresse quand on parle de Straße ».

     Le contrôle porte sur le RENDU de tous les écrans qui portent un champ,
     et pas sur `saisieAttrs` elle-même. C'est délibéré : le risque n'est pas
     que la fonction soit fausse, c'est qu'un futur champ soit écrit à la main
     à côté d'elle. Tester la fonction ne verrait jamais ce champ-là. */
  (function () {
    let vus = 0;
    const fautifs = [];
    [["cards",  function () { S = fresh(); S.day = 1; seed(1); }],
     ["drills", function () { S = fresh(); S.day = 1; seed(1); }],
     ["unit",   function () { S = fresh(); S.unit = 2; }]
    ].forEach(function (paire) {
      paire[1]();
      go(paire[0]);
      Array.prototype.forEach.call(view.querySelectorAll("input"), function (c) {
        vus++;
        const a = (c.getAttribute("autocomplete") || "").toLowerCase();
        /* Un jeton INCONNU vaut « off » dans tous les navigateurs. Le mot
           `off` lui-même, non : Safari le contourne dès qu'il croit
           reconnaître une adresse ou un nom. C'est exactement le défaut
           signalé, donc c'est exactement ce qu'on interdit ici. */
        if (a === "" || a === "off" || a === "on") {
          fautifs.push(paire[0] + " : autocomplete=\"" + a + "\"");
        }
        if (!c.getAttribute("name")) fautifs.push(paire[0] + " : pas de name");
        if (c.getAttribute("spellcheck") !== "false") {
          fautifs.push(paire[0] + " : spellcheck laissé actif");
        }
      });
    });
    ok("saisie : des champs ont bien été examinés", vus > 0, "champs vus : " + vus);
    ok("saisie : aucun champ ne laisse passer le remplissage automatique",
       fautifs.length === 0, fautifs.join(" | "));
  })();

  /* Aucune balise ne doit se LIRE à l'écran. Défaut trouvé le 02/08/2026 :
     les énoncés du quiz passaient par `esc`, alors que 88 d'entre eux
     emploient <b> pour détacher le mot allemand. Résultat à l'écran :
     « Le <b>w</b> allemand se prononce… ».

     La vérification porte sur le TEXTE RENDU, jamais sur la source — un test
     qui compare une chaîne à elle-même est d'accord avec lui-même, c'est
     exactement ce qui avait laissé passer `&#183;` en juillet. On parcourt
     donc les 35 étapes et on lit ce qui s'affiche vraiment. */
  (function () {
    const vus = [];
    for (let d = 1; d <= COURSE.length; d++) {
      S = fresh(); S.day = d; seed(d);
      go("quiz");
      for (let tour = 0; tour < COURSE[d - 1].quiz.length; tour++) {
        const txt = view.textContent;
        if (/<\/?[a-z]/i.test(txt) || txt.indexOf("&lt;") !== -1) {
          vus.push("étape " + d + " : " + txt.slice(0, 60));
          break;
        }
        const opt = view.querySelector(".opt");
        if (!opt) break;
        opt.click();                                   // répond, pour voir aussi le « pourquoi »
        if (/<\/?[a-z]/i.test(view.textContent)) {
          vus.push("étape " + d + " (explication) : " + view.textContent.slice(0, 60));
          break;
        }
        const suivant = view.querySelector('[data-act="next"]');
        if (!suivant) break;
        suivant.click();
      }
    }
    ok("quiz : aucune balise ne se lit à l'écran", vus.length === 0, vus.slice(0, 3).join(" | "));
  })();

  /* ---- La langue du texte allemand — `lang="de"` ----
     Point le plus lourd de l'audit du 11/08/2026 : la page est en français, et
     un lecteur d'écran prononçait donc *der Körper* avec une voix française.

     ⚠️ CE CONTRÔLE NE REGARDE PAS `marqueAllemand`, IL REGARDE L'ÉCRAN.
     Vérifier la fonction avec la liste de sélecteurs qu'elle emploie
     reviendrait à la comparer à elle-même — exactement le défaut de l'ancienne
     « sécurité : le HTML des contenus est échappé », qui mesurait `esc()` en
     vase clos et passait pendant que l'écran était cassé.
     Ici on lit le STYLE CALCULÉ : tout ce qui s'affiche dans la police
     allemande doit être annoncé en allemand. Une règle CSS neuve qui oublierait
     la marque tombe donc toute seule, même si personne n'a pensé à ce test. */
  ok("langue : la page reste déclarée en français",
     document.documentElement.lang === "fr", "lu : " + document.documentElement.lang);

  /* ---- §2.1 · Des réglages neufs sont vraiment neufs ----
     Le symptôme visible était : après « Tout effacer », les couleurs
     personnalisées revenaient. La cause : `fresh()` partageait `ordre` et
     `teintes` avec `PREFS_DEFAUT`, donc les écrire abîmait la constante.
     ⚠️ La vérification porte sur la CONSTANTE, pas sur la copie — c'est elle
     qui était corrompue, et une copie a toujours l'air correcte. */
  (function () {
    S = fresh();
    S.prefs.teintes["cards"] = "#123456";
    S.prefs.ordre.reverse();
    ok("réglages : peindre une case n'écrit pas dans les valeurs par défaut",
       PREFS_DEFAUT.teintes.cards === undefined,
       "PREFS_DEFAUT.teintes = " + JSON.stringify(PREFS_DEFAUT.teintes));
    ok("réglages : réordonner les cases n'écrit pas dans les valeurs par défaut",
       PREFS_DEFAUT.ordre.join() === MODES_IDS.join(),
       "PREFS_DEFAUT.ordre = " + PREFS_DEFAUT.ordre.join());
    /* Et deux progressions neuves ne se partagent pas leurs réglages. */
    const a = fresh(), b = fresh();
    a.prefs.teintes["quiz"] = "#abcdef";
    ok("réglages : deux progressions neuves sont indépendantes",
       b.prefs.teintes.quiz === undefined);
  })();

  /* ---- §2.2 · Une carte abîmée ne peut plus dérégler la progression ----
     C'est l'objet le plus exposé de la sauvegarde, et le seul chemin qui
     l'écrase entièrement (restaurer un fichier) ne demande aucune
     confirmation. Un `niv` non numérique ne plante pas : il se propage en NaN
     dans les comparaisons, qui répondent `false` partout — le mot n'est alors
     ni appris, ni ancré, ni jamais tiré. EN SILENCE.

     Réécrit le 18/08/2026 : les dates ont disparu avec la box. */
  (function () {
    const abime = { v: 2, cards: {
      "1:0": { niv: "beaucoup", hit: 3, miss: 1 },
      "1:1": { niv: 99,  hit: -5, miss: "x" },
      "1:2": { niv: -3,  hit: 2, miss: 0 },
      "1:3": "je ne suis pas un objet",
      "1:4": null,
      "1:5": { niv: 12, hit: 1, miss: 2 }
    } };
    const propre = sane(Object.assign(fresh(), abime)).cards;
    eq("cartes : un niveau non numérique retombe à 0", propre["1:0"].niv, 0);
    eq("cartes : un niveau au-dessus du plafond retombe à 0", propre["1:1"].niv, 0);
    eq("cartes : un niveau négatif retombe à 0", propre["1:2"].niv, 0);
    ok("cartes : un journal négatif ou illisible retombe à 0",
       propre["1:1"].hit === 0 && propre["1:1"].miss === 0);
    ok("cartes : ce qui n'est pas un objet disparaît",
       propre["1:3"] === undefined && propre["1:4"] === undefined);
    /* Le point qui compte autant que le nettoyage : on BORNE, on ne jette pas.
       Le journal d'une carte mal notée est du travail réel. */
    ok("cartes : le journal d'une carte bornée est conservé",
       propre["1:0"].hit === 3 && propre["1:0"].miss === 1);
    ok("cartes : une carte saine traverse sans être touchée",
       propre["1:5"].niv === 12 && propre["1:5"].hit === 1 && propre["1:5"].miss === 2);
    ok("cartes : plus aucune trace de box ni de date",
       propre["1:5"].box === undefined && propre["1:5"].due === undefined);
    ok("dates : le 31 février est refusé", !dateValide("2026-02-31"));
    ok("dates : une vraie date est acceptée", dateValide("2026-02-28"));
  })();

  /* ---- La migration box → niv (18/08/2026, PLAN-ANCRAGE.md §3) ----
     Une progression réelle existe sur l'iPhone d'Exsangue. Elle ne doit RIEN
     perdre, et la migration ne doit jamais tourner deux fois sur la même. */
  (function () {
    const vieux = {
      day: 3, done: [1, 2],
      cards: {
        "1:0": { box: 1, due: "2026-01-01", hit: 0, miss: 0 },
        "1:1": { box: 2, due: "2026-01-02", hit: 4, miss: 1 },
        "1:2": { box: 3, due: "2026-01-03", hit: 7, miss: 2 },
        "1:3": { box: 4, due: "2026-01-04", hit: 9, miss: 0 },
        "1:4": { box: 5, due: "2026-01-05", hit: 12, miss: 3 },
        "1:5": { due: "2026-01-06", hit: 1, miss: 1 },        // box absente
        "1:6": { box: "?", due: "2026-01-07", hit: 2, miss: 2 } // box absurde
      }
    };
    const migre = sane(Object.assign(fresh(), JSON.parse(JSON.stringify(vieux)))).cards;

    eq("migration : box 1 devient le niveau 0",  migre["1:0"].niv, 0);
    eq("migration : box 2 devient le niveau 5",  migre["1:1"].niv, 5);
    eq("migration : box 3 devient le niveau 10", migre["1:2"].niv, 10);
    eq("migration : box 4 devient le niveau 15", migre["1:3"].niv, 15);
    eq("migration : box 5 devient le niveau 20", migre["1:4"].niv, 20);
    eq("migration : une box absente vaut le niveau 0", migre["1:5"].niv, 0);
    eq("migration : une box absurde vaut le niveau 0", migre["1:6"].niv, 0);

    /* Le point qui décide si Exsangue croit avoir perdu sa progression : le
       nombre affiché sur l'accueil doit être le même avant et après. */
    ok("migration : ce qui valait « appris » (box>=4) le reste (niv>=15)",
       migre["1:3"].niv >= APPRIS_A && migre["1:4"].niv >= APPRIS_A);
    ok("migration : ce qui ne l'était pas ne le devient pas",
       migre["1:2"].niv < APPRIS_A);
    ok("migration : la box 5 tombe pile sur « ancré »", migre["1:4"].niv >= ANCRE_A);

    ok("migration : le journal survit intact",
       migre["1:4"].hit === 12 && migre["1:4"].miss === 3);
    ok("migration : box et date ont disparu",
       migre["1:1"].box === undefined && migre["1:1"].due === undefined);

    /* IDEMPOTENCE. Le piège est que `load()` fait Object.assign(fresh(), …) :
       si `fresh()` posait un `v`, une vieille sauvegarde en hériterait et
       passerait pour déjà migrée — la progression resterait en box, en
       silence. D'où le test suivant, qui vaut autant que la conversion. */
    ok("migration : fresh() ne pose PAS de témoin de version",
       fresh().v === undefined);

    const relu = sane(JSON.parse(JSON.stringify(
      sane(Object.assign(fresh(), JSON.parse(JSON.stringify(vieux))))
    )));
    eq("migration : la relancer ne change rien (niveau)", relu.cards["1:3"].niv, 15);
    eq("migration : la relancer ne change rien (journal)", relu.cards["1:3"].hit, 9);
    eq("migration : la sauvegarde porte le témoin de version", relu.v, ETAT_V);

    /* Une progression DÉJÀ migrée ne doit pas être reconvertie : un niveau 7
       relu comme une box donnerait n'importe quoi. */
    const deja = sane(Object.assign(fresh(), { v: ETAT_V, cards: {
      "1:0": { niv: 7, hit: 1, miss: 1 }
    } }));
    eq("migration : un état déjà en v2 traverse sans être reconverti",
       deja.cards["1:0"].niv, 7);
  })();

  /* ---- §1.2 · Les flèches de l'ordre des cases ----
     Elles étaient dessinées et inertes. La vérification CLIQUE dessus et
     regarde l'ordre obtenu : vérifier que le gestionnaire existe ne prouve
     rien, puisque le défaut était que le clic n'arrivait jamais jusqu'à lui
     (le bouton manquait dans la liste des cibles cliquables). */
  (function () {
    S = fresh();
    const avant = ordreModes().slice();
    go("reglages");
    const bas = view.querySelector('[data-monte="' + avant[1] + '"]');
    ok("ordre : les flèches sont bien dessinées", !!bas);
    if (bas) {
      bas.click();
      const apres = ordreModes();
      ok("ordre : monter une case l'échange avec celle du dessus",
         apres[0] === avant[1] && apres[1] === avant[0],
         "avant " + avant.join(",") + " · après " + apres.join(","));
      ok("ordre : aucune case n'est perdue ni dupliquée",
         apres.length === MODES_IDS.length &&
         apres.slice().sort().join() === MODES_IDS.slice().sort().join());

      /* Et le contraire : redescendre rend l'ordre initial. */
      go("reglages");
      const haut = view.querySelector('[data-descend="' + avant[1] + '"]');
      if (haut) {
        haut.click();
        ok("ordre : descendre annule le mouvement inverse",
           ordreModes().join() === avant.join());
      }
    }
    /* La flèche du haut de liste et celle du bas sont désactivées : sans ça,
       un clic sortirait de la liste et perdrait une case. */
    go("reglages");
    const premier = view.querySelector('[data-monte="' + ordreModes()[0] + '"]');
    const dernier = view.querySelector('[data-descend="' + ordreModes()[MODES_IDS.length - 1] + '"]');
    ok("ordre : on ne peut pas monter la première case", !!premier && premier.disabled);
    ok("ordre : on ne peut pas descendre la dernière", !!dernier && dernier.disabled);
  })();

  /* ⚠️ Aucun bouton dessiné ne doit être SOURD au clic.
     La liste `CIBLES_CLIC` décide de ce qui est résolu ; un bouton porteur
     d'un `data-` absent de cette liste ne reçoit jamais rien, comme les
     flèches jusqu'au 13/08/2026.

     ⚠️ Cette vérification emploie `CIBLES_CLIC` elle-même, JAMAIS une copie.
     Sa première version recopiait le sélecteur : elle est restée muette
     pendant qu'on amputait le vrai, parce qu'elle était d'accord avec
     elle-même. C'est le même piège que l'ancienne « sécurité : le HTML est
     échappé », et il se déguise à chaque fois autrement.

     On balaie tous les écrans, pas seulement les réglages : un bouton sourd
     peut naître n'importe où. */
  (function () {
    const sourds = [];
    ["home", "lesson", "cards", "quiz", "practice", "drills", "oral", "verbes",
     "chrono", "reglages"].forEach(function (ecran) {
      S = fresh(); S.day = 1; seed(1);
      go(ecran);
      const boutons = view.querySelectorAll("button, [role='button']");
      for (let i = 0; i < boutons.length; i++) {
        const b = boutons[i];
        /* Un bouton sans `data-` n'attend rien du gestionnaire global — le
           champ de saisie et les liens de retour ont leur propre chemin. */
        let porteur = false;
        for (let k = 0; k < b.attributes.length; k++) {
          if (b.attributes[k].name.indexOf("data-") === 0) { porteur = true; break; }
        }
        if (!porteur) continue;
        if (b.closest(CIBLES_CLIC)) continue;
        sourds.push(ecran + " · " + (b.getAttribute("aria-label") || b.className || b.textContent.trim().slice(0, 20)));
      }
    });
    ok("clic : aucun bouton dessiné n'est sourd", sourds.length === 0,
       sourds.slice(0, 4).join(" | "));
  })();

  (function () {
    const policeDE = getComputedStyle(document.documentElement)
      .getPropertyValue("--de").trim();
    ok("langue : la police allemande est bien définie", policeDE.length > 0);

    function enPoliceDE(el) {
      return getComputedStyle(el).fontFamily.trim() === policeDE;
    }

    const muets = [];
    ["home", "lesson", "cards", "quiz", "practice", "drills", "oral", "verbes",
     "chrono", "reglages"].forEach(function (ecran) {
      S = fresh(); S.day = 1; seed(1);
      go(ecran);
      const tous = view.querySelectorAll("*");
      for (let i = 0; i < tous.length; i++) {
        const el = tous[i];
        if (!enPoliceDE(el)) continue;
        /* Le champ de saisie est le seul cas où le style ne décide pas : il
           porte la police allemande même quand la réponse attendue est en
           français. Il est vérifié juste en dessous, à la source. */
        if (el.matches(".answer")) continue;
        /* Un descendant hérite de la police ET de la langue : seul l'endroit
           où la police COMMENCE doit porter la marque. */
        if (el.parentElement && el.parentElement !== view && enPoliceDE(el.parentElement)) continue;
        if (!el.textContent.trim()) continue;
        if (el.closest('[lang="de"]')) continue;
        muets.push(ecran + " · " + (el.className || el.tagName) +
                   " « " + el.textContent.trim().slice(0, 28) + " »");
      }
    });
    ok("langue : tout ce qui s'affiche en allemand est annoncé en allemand",
       muets.length === 0, muets.slice(0, 4).join(" | "));
  })();

  /* Le champ de saisie, à la source. Les deux sens comptent : marquer le champ
     qui attend de l'allemand, et NE PAS marquer celui qui attend du français —
     une erreur dans ce sens-là ferait relire « la sœur » avec une voix
     allemande, et elle serait invisible à l'écran. */
  (function () {
    const de = saisieAttrs("x", true), fr = saisieAttrs("x", false);
    ok("langue : le champ qui attend de l'allemand est marqué",
       de.indexOf('lang="de"') !== -1);
    ok("langue : le champ qui attend du français ne l'est pas",
       fr.indexOf('lang=') === -1);

    /* Et à l'écran : la carte du niveau 1 demande le SENS, en français. */
    S = fresh(); S.day = 1; seed(1);
    go("cards");
    const champ = view.querySelector("#answer");
    if (champ) {
      const attendue = view.querySelector('[data-consigne="En français"]') ? "" : "de";
      ok("langue : la carte qui demande le sens laisse le champ en français",
         (champ.getAttribute("lang") || "") === attendue,
         "lu : " + (champ.getAttribute("lang") || "aucun"));
    }
  })();

  /* ---- Le test de fin de niveau A1 ----
     Demande d'Exsangue le 02/08/2026. Un examen qui se trompe est pire
     qu'un examen absent : il donne un niveau qu'on n'a pas, ou refuse un
     niveau qu'on a. */
  (function () {
    const qs = a1Questions();
    ok("test A1 : il y a des questions", qs.length > 0);

    /* Chaque question doit être d'un des DEUX types, et complète. Une entrée
       à moitié écrite passerait inaperçue à la lecture — pas ici. */
    const bancales = [];
    qs.forEach(function (q, i) {
      const it = q.it;
      if (it.o) {
        if (it.a !== 0) bancales.push(i + " : la bonne réponse n'est pas en tête du fichier");
        if (it.o.length < 2) bancales.push(i + " : moins de deux choix");
        const vus = {};
        it.o.forEach(function (x) { if (vus[x]) bancales.push(i + " : choix en double"); vus[x] = true; });
      } else if (!it.ecrit) {
        bancales.push(i + " : ni choix ni réponse écrite");
      }
      if (!it.q || !String(it.q).trim()) bancales.push(i + " : énoncé vide");
    });
    ok("test A1 : chaque question est complète", bancales.length === 0, bancales.slice(0, 3).join(" | "));

    /* ⚠️ Une réponse attendue doit s'accepter ELLE-MÊME. C'est le contrôle
       bête qui attrape la faute de frappe : si `checkAnswer` refuse la
       réponse du corrigé, personne ne pourra jamais avoir juste. */
    const refusees = [];
    qs.forEach(function (q) {
      if (q.it.ecrit && !checkAnswer(q.it.ecrit, q.it.ecrit).ok) refusees.push(q.it.ecrit);
    });
    ok("test A1 : chaque corrigé est accepté par le correcteur",
       refusees.length === 0, refusees.join(" | "));

    // Le seuil annoncé et le seuil appliqué doivent être le même nombre.
    eq("test A1 : le seuil est bien à 70 %", A1_SEUIL, 0.70);

    /* Le parcours complet, tout juste : le niveau doit être validé et gardé. */
    S = fresh(); S.day = 1; seed(1);
    go("a1");
    ok("test A1 : l'écran d'accueil annonce l'épreuve absente",
       view.textContent.indexOf("parler") !== -1);
    ok("test A1 : et le seuil officiel, pour comparaison",
       view.textContent.indexOf("60 %") !== -1);

    view.querySelector('[data-act="a1-go"]').click();
    for (let k = 0; k < qs.length; k++) {
      const it = qs[k].it;
      if (it.o) {
        view.querySelector('[data-a1pick="0"]').click();     // 0 = la bonne, toujours
      } else {
        document.getElementById("answer").value = it.ecrit;
        view.querySelector('[data-act="a1-check"]').click();
      }
      view.querySelector('[data-act="a1-next"]').click();
    }
    ok("test A1 : un sans-faute valide le niveau", !!(S.a1 && S.a1.passe));
    eq("test A1 : et le score est enregistré", S.a1 && S.a1.score, qs.length);
    ok("test A1 : le résultat détaille chaque épreuve",
       view.textContent.indexOf("Par épreuve") !== -1);
    /* La règle n'a pas changé, seulement le fait qu'elle constate : l'écran ne
       doit annoncer QUE des étapes A2 réellement écrites. Le nombre affiché est
       comparé au contenu, pas à une constante — c'est la seule façon que la
       phrase reste vraie quand le A2 s'allongera. */
    ok("test A1 : le A2 annoncé est celui qui existe vraiment",
       view.textContent.indexOf(avancementNiveau(NIVEAUX[1]).ecrites + " étapes y sont écrites") !== -1);
    ok("test A1 : et il ne promet pas plus d'étapes qu'il n'en existe",
       avancementNiveau(NIVEAUX[1]).ecrites <= NIVEAUX[1].prevu);

    /* Et l'inverse : tout faux ne doit RIEN valider. Un examen qui se laisse
       arracher un niveau ne sert à rien. */
    S = fresh(); S.day = 1; seed(1);
    go("a1");
    view.querySelector('[data-act="a1-go"]').click();
    for (let k = 0; k < qs.length; k++) {
      const it = qs[k].it;
      if (it.o) {
        const faux = view.querySelector('.opt:not([data-a1pick="0"])');
        if (faux) faux.click(); else view.querySelector('[data-a1pick="0"]').click();
      } else {
        document.getElementById("answer").value = "zzz";
        view.querySelector('[data-act="a1-check"]').click();
      }
      view.querySelector('[data-act="a1-next"]').click();
    }
    ok("test A1 : tout faux ne valide rien", !(S.a1 && S.a1.passe));

    /* Quitter le test l'abandonne : c'est un examen, on ne sort pas revoir
       la leçon au milieu pour revenir finir ses questions. */
    go("a1");
    view.querySelector('[data-act="a1-go"]').click();
    go("home");
    go("a1");
    ok("test A1 : quitter l'examen le remet à zéro",
       !!view.querySelector('[data-act="a1-go"]'));

    // Un résultat abîmé dans une sauvegarde ne doit pas s'afficher.
    const abime = sane(Object.assign(fresh(), { a1: { passe: true, score: "beaucoup" } }));
    ok("test A1 : un résultat illisible est écarté", abime.a1 === null);

    S = fresh(); S.day = 1; seed(1);
    go("home");
    ok("test A1 : l'accueil y donne accès", !!view.querySelector('[data-go="a1"]'));
  })();

  /* ---- La progression survit au rechargement ----
     Écrit le 02/08/2026 APRÈS avoir cassé la sauvegarde d'Exsangue, et
     surtout après avoir constaté que 2 501 vérifications étaient au vert
     pendant que l'app repartait de zéro à chaque ouverture.

     Pourquoi rien ne l'a vu : `load()` court UNE fois, au démarrage, bien
     avant les tests. Son échec était avalé par un `catch`, et au moment où
     les tests s'exécutaient la constante fautive existait — tout marchait.
     Un bug qui ne se produit qu'à l'instant du chargement ne se teste pas en
     rejouant la fonction : il faut regarder ce que le chargement a LAISSÉ. */
  (function () {
    /* Le contrôle le plus bête, et celui qui manquait : au démarrage, dans un
       navigateur normal, la lecture doit avoir réussi. Ces deux témoins
       auraient crié dès la première seconde. */
    ok("sauvegarde : le stockage a répondu au démarrage", storageOK === true);
    ok("sauvegarde : et la sauvegarde a été relue sans erreur",
       sauveIllisible === null,
       sauveIllisible ? String(sauveIllisible).slice(0, 60) : "");

    /* Le trajet complet : on écrit, on relit, on retrouve. C'est ce que fait
       l'app à chaque ouverture. On remet le contenu d'origine en partant —
       un test ne doit pas coûter sa progression à qui lance l'auto-test. */
    let avant = null;
    try { avant = localStorage.getItem(KEY); } catch (e) {}
    try {
      const temoin = Object.assign(fresh(), { day: 4, streak: 9, done: [1, 2, 3] });
      localStorage.setItem(KEY, JSON.stringify(temoin));
      const relu = load();
      eq("sauvegarde : l'étape survit au rechargement", relu.day, 4);
      eq("sauvegarde : la série aussi", relu.streak, 9);
      eq("sauvegarde : et les étapes validées", relu.done.length, 3);
      ok("sauvegarde : une relecture réussie ne déclenche aucune alerte",
         sauveIllisible === null && storageOK === true);

      /* ⚠️ ET SURTOUT : une sauvegarde ILLISIBLE ne doit jamais disparaître.
         C'est ce qui a coûté sa progression à Exsangue — l'app repartait à
         zéro, puis la première action écrivait par-dessus l'original. Les
         octets sont désormais mis à l'abri avant tout. */
      localStorage.removeItem(KEY_SECOURS);
      localStorage.setItem(KEY, "{ceci n'est pas du JSON");
      const apres = load();
      ok("sauvegarde : une sauvegarde illisible ne fait pas planter l'app", !!apres);
      ok("sauvegarde : elle est signalée comme telle", sauveIllisible !== null);
      eq("sauvegarde : et mise à l'abri intacte",
         localStorage.getItem(KEY_SECOURS), "{ceci n'est pas du JSON");
      ok("sauvegarde : sans accuser le stockage à tort", storageOK === true);

      localStorage.removeItem(KEY_SECOURS);
      sauveIllisible = null;
    } catch (e) {
      ok("sauvegarde : le trajet complet a pu être joué", false, String(e));
    }
    try {
      if (avant === null) localStorage.removeItem(KEY);
      else localStorage.setItem(KEY, avant);
    } catch (e) {}
  })();

  /* ---- Les verbes irréguliers ----
     Demande d'Exsangue le 02/08/2026. Ici le risque n'est pas l'interface :
     c'est qu'une conjugaison soit FAUSSE. Elles viennent d'un script et d'un
     dictionnaire, mais une entrée recopiée à la main peut toujours déraper —
     et une conjugaison fausse s'apprend et se garde des années. */
  (function () {
    const mal = [];
    const vus = {};
    VERBES.forEach(function (v) {
      if (v.length !== 8) mal.push(v[0] + " : " + v.length + " colonnes");
      if (vus[v[0]]) mal.push(v[0] + " : en double");
      vus[v[0]] = true;
      for (let i = 0; i < 8; i++) {
        if (!v[i] || !String(v[i]).trim()) mal.push(v[0] + " : colonne " + i + " vide");
      }
    });
    ok("verbes : la table est complète et sans doublon", mal.length === 0, mal.join(" | "));

    /* Chaque verbe doit être VRAIMENT irrégulier au présent — sinon il n'a
       rien à faire ici, et l'exercice se réduirait à recopier l'infinitif. */
    const faciles = VERBES.filter(function (v) {
      const reg = verbeRegulier(v[0]);
      for (let i = 0; i < 6; i++) if (v[i + 2] !== reg[i]) return false;
      return true;
    });
    ok("verbes : aucun verbe régulier ne s'est glissé dans la table",
       faciles.length === 0, faciles.map(function (v) { return v[0]; }).join(", "));

    /* Le pluriel d'un verbe fort ne change JAMAIS de voyelle : wir et sie
       reprennent l'infinitif. `sein` est la seule exception de la langue —
       si une autre apparaît, c'est une faute de frappe, pas une découverte. */
    const pluriels = VERBES.filter(function (v) {
      return v[0] !== "sein" && (v[5] !== v[0] || v[7] !== v[0]);
    });
    ok("verbes : au pluriel, wir et sie reprennent l'infinitif",
       pluriels.length === 0, pluriels.map(function (v) { return v[0]; }).join(", "));

    // `sein`, lui, sort du moule partout : c'est bien pour ça qu'on l'a ajouté.
    const sein = VERBES.filter(function (v) { return v[0] === "sein"; })[0];
    ok("verbes : sein est présent", !!sein);
    eq("verbes : et son pluriel est irrégulier", sein && sein[5], "sind");

    /* ⚠️ On ne demande QUE ce qui est irrégulier. Faire taper « wir sprechen »
       à partir de « sprechen » serait un exercice impossible à rater — la
       famille qu'Exsangue avait justement fait retirer. */
    const inutiles = [];
    VERBES.forEach(function (v) {
      const reg = verbeRegulier(v[0]);
      formesAdemander(v).forEach(function (i) {
        if (v[i + 2] === reg[i]) inutiles.push(v[0] + " / " + PRONOMS[i]);
      });
    });
    ok("verbes : aucune forme régulière n'est demandée",
       inutiles.length === 0, inutiles.slice(0, 3).join(" | "));
    ok("verbes : et il y a toujours au moins une question",
       VERBES.every(function (v) { return formesAdemander(v).length > 0; }));
    eq("verbes : sein se demande en entier", formesAdemander(sein).length, 6);

    // L'écran : on répond juste, puis on se trompe.
    S = fresh(); S.day = 1; seed(1);
    go("verbes");
    verbeCourant = VERBES.filter(function (v) { return v[0] === "sprechen"; })[0];
    verbeVerdict = null;
    show(verbesView());
    ok("verbes : l'infinitif et son sens sont montrés",
       view.textContent.indexOf("sprechen") !== -1 && view.textContent.indexOf("parler") !== -1);
    ok("verbes : la réponse n'est pas déjà affichée",
       view.textContent.indexOf("sprichst") === -1);

    formesAdemander(verbeCourant).forEach(function (i) {
      document.getElementById("vf" + i).value = verbeCourant[i + 2];
    });
    view.querySelector('[data-act="verbe-check"]').click();
    ok("verbes : une conjugaison juste est acceptée", !!view.querySelector(".why.good"));
    ok("verbes : et la table complète s'affiche alors",
       view.textContent.indexOf("sprechen") !== -1 && view.textContent.indexOf("sprichst") !== -1);
    eq("verbes : la série monte", verbeSerie, 1);

    verbeVerdict = null;
    show(verbesView());
    document.getElementById("vf1").value = "sprechst";     // la faute classique
    view.querySelector('[data-act="verbe-check"]').click();
    ok("verbes : une forme fausse est refusée", !!view.querySelector(".why.bad"));
    ok("verbes : et la ligne fautive est marquée", !!view.querySelector(".conj-l.ko"));
    eq("verbes : la série retombe", verbeSerie, 0);

    // Les tolérances habituelles valent ici aussi.
    verbeVerdict = null;
    verbeCourant = VERBES.filter(function (v) { return v[0] === "fahren"; })[0];
    show(verbesView());
    formesAdemander(verbeCourant).forEach(function (i) {
      document.getElementById("vf" + i).value =
        verbeCourant[i + 2].replace(/ä/g, "ae").replace(/ü/g, "ue").replace(/ö/g, "oe");
    });
    view.querySelector('[data-act="verbe-check"]').click();
    ok("verbes : le tréma écrit en deux lettres est accepté",
       !!view.querySelector(".why.good"));

    go("home");
    ok("verbes : l'accueil y donne accès", !!view.querySelector('[data-go="verbes"]'));
  })();

  /* ---- Le contre-la-montre ----
     Demande d'Exsangue le 02/08/2026. Deux choses comptent plus que le
     reste : que le compte à rebours s'arrête quand on quitte, et que le
     mode ne touche PAS au calendrier de révision. */
  (function () {
    S = fresh(); S.day = 1; seed(1);
    go("chrono");
    ok("chrono : l'écran d'accueil du mode s'ouvre",
       view.textContent.indexOf("Contre la montre") !== -1);
    ok("chrono : et propose de commencer", !!view.querySelector('[data-act="chrono-go"]'));

    view.querySelector('[data-act="chrono-go"]').click();
    eq("chrono : la partie démarre à 30 secondes", chronoReste, CHRONO_DUREE);
    eq("chrono : et à zéro trouvé", chronoScore, 0);
    ok("chrono : un mot est proposé", !!chronoMot);
    ok("chrono : avec un champ pour répondre", !!document.getElementById("answer"));

    /* ⚠️ LE SENS : le FRANÇAIS est montré, l'ALLEMAND est attendu. Exsangue
       l'a demandé explicitement après un premier essai en sens inverse. Une
       inversion silencieuse ne casserait rien — elle changerait juste
       complètement l'exercice, sans que rien ne le signale. */
    eq("chrono : c'est le français qui est montré",
       view.querySelector(".chrono-mot").textContent, chronoMot.f);
    document.getElementById("answer").value = chronoMot.f;
    view.querySelector('[data-act="chrono-check"]').click();
    eq("chrono : répondre en français ne compte pas", chronoScore, 0);

    /* Une bonne réponse : le score et le combo montent. En dessous du seuil,
       aucun temps gagné — sinon le combo ne récompenserait rien. */
    const avant = chronoReste;
    document.getElementById("answer").value = chronoMot.d;
    view.querySelector('[data-act="chrono-check"]').click();
    eq("chrono : une bonne réponse compte un point", chronoScore, 1);
    eq("chrono : et fait monter le combo", chronoCombo, 1);
    ok("chrono : sous le seuil, aucun temps gagné", chronoReste <= avant);

    // Au seuil, le temps monte : c'est tout l'intérêt du combo.
    chronoCombo = CHRONO_COMBO_BONUS - 1;
    const avant2 = chronoReste;
    document.getElementById("answer").value = chronoMot.d;
    view.querySelector('[data-act="chrono-check"]').click();
    ok("chrono : au seuil, le combo fait gagner du temps", chronoReste > avant2);

    /* Une erreur remet le combo à zéro — mais ne retire PAS de temps. Punir
       deux fois rendrait une mauvaise série irrattrapable. */
    const avant3 = chronoReste;
    document.getElementById("answer").value = "n'importe quoi du tout";
    view.querySelector('[data-act="chrono-check"]').click();
    eq("chrono : une erreur remet le combo à zéro", chronoCombo, 0);
    ok("chrono : mais ne coûte pas de temps", chronoReste >= avant3 - 1);

    // Passer coûte le combo aussi : sinon on éviterait tous les mots durs.
    chronoCombo = 4;
    view.querySelector('[data-act="chrono-passe"]').click();
    eq("chrono : passer coûte le combo", chronoCombo, 0);

    /* ⚠️ LE POINT LE PLUS IMPORTANT : quitter arrête le compte à rebours.
       Sans ça, il tournerait sous les autres écrans et finirait par ramener
       de force à un écran de fin qu'on n'a pas demandé. */
    go("home");
    ok("chrono : quitter arrête le compte à rebours", chronoTimer === null);
    eq("chrono : et remet le mode au repos", chronoEtat, "pret");

    /* Et il ne touche pas au calendrier : répondre vite n'est pas la même
       compétence que se souvenir à trois jours d'intervalle. */
    S = fresh(); S.day = 1; seed(1);
    const id0 = Object.keys(S.cards)[0];
    const niveau = S.cards[id0].niv;
    go("chrono");
    view.querySelector('[data-act="chrono-go"]').click();
    chronoMot = cardById(id0);
    show(chronoView());
    document.getElementById("answer").value = chronoMot.d;
    view.querySelector('[data-act="chrono-check"]').click();
    eq("chrono : le niveau du mot ne bouge pas", S.cards[id0].niv, niveau);
    ok("chrono : et aucune date n'est réintroduite", S.cards[id0].due === undefined);
    ok("chrono : mais la réussite est notée", S.cards[id0].hit > 0);

    // La fin enregistre un record, et le classement reste borné.
    chronoScore = 12; chronoMeilleurCombo = 5;
    chronoFin();
    eq("chrono : la partie finie entre au classement", S.chrono.records[0].s, 12);
    for (let k = 0; k < CHRONO_RECORDS + 3; k++) {
      chronoScore = k; chronoMeilleurCombo = 1; chronoFin();
    }
    ok("chrono : le classement ne garde que les meilleurs",
       S.chrono.records.length === CHRONO_RECORDS &&
       S.chrono.records[0].s === 12);

    /* Une sauvegarde abîmée ne doit pas afficher « NaN mots ». */
    const abime = sane(Object.assign(fresh(), {
      chrono: { records: [{ s: "beaucoup", c: 1, d: "x" }, { s: 3, c: 2, d: "y" }, null] }
    }));
    eq("chrono : un record illisible est écarté", abime.chrono.records.length, 1);

    go("home");
  })();

  /* ---- Les cartes qui se retournent ----
     Demande d'Exsangue le 02/08/2026 : « de vraies cartes, avec une
     animation où ça se retourne, et le fond dans le thème du mot ». */
  (function () {
    // Aucune étape ne doit être sans thème : une carte sans teinte, au milieu
    // de cartes teintées, se lirait comme un défaut.
    const sans = [];
    for (let n = 1; n <= COURSE.length; n++) {
      if (!THEME_ETAPE[n]) sans.push(n);
      else if (!THEME_NOM[THEME_ETAPE[n]]) sans.push(n + " (thème sans nom)");
    }
    ok("cartes : chaque étape a son thème, et chaque thème son nom",
       sans.length === 0, sans.join(", "));

    /* ⚠️ ET SURTOUT : chaque MOT du cours doit avoir le sien. C'est le défaut
       qu'Exsangue avait signalé — « le thème de la carte n'est pas en lien
       avec le mot » — et le seul contrôle qui le ferme vraiment. Il échoue
       en NOMMANT les mots oubliés : une liste de 350 entrées se complète,
       elle ne se devine pas. */
    /* On n'exige un thème que pour le vocabulaire ÉCRIT POUR L'APP. Celui
       qui vient du livre est marqué `livre: true` : il n'existe pas dans la
       version publiée, donc réclamer son rangement demanderait un travail
       que personne ne verrait jamais. Il prend le thème de son étape. */
    const orphelins = [];
    COURSE.forEach(function (st) {
      (st.vocab || []).forEach(function (v) {
        if (!v.livre && !THEME_MOT[v.d]) orphelins.push(v.d);
      });
    });
    ok("cartes : chaque mot du cours est rangé dans un thème",
       orphelins.length === 0,
       orphelins.length + " oublié(s) : " + orphelins.slice(0, 8).join(", "));

    // Et aucun thème inventé au passage : tout thème posé doit avoir un nom.
    const inconnus = [];
    Object.keys(THEME_MOT).forEach(function (m) {
      if (!THEME_NOM[THEME_MOT[m]]) inconnus.push(m + " → " + THEME_MOT[m]);
    });
    ok("cartes : aucun thème sans nom affichable",
       inconnus.length === 0, inconnus.slice(0, 5).join(" | "));

    /* Le MOT prime sur l'étape — c'est tout l'objet de la correction.
       *der Bär* est un animal, même s'il est enseigné à l'étape des sons. */
    eq("cartes : le thème vient du mot, pas de l'étape",
       themeDe({ d: "der Bär", day: 1 }), "nature");
    eq("cartes : et l'étape ne sert que de filet",
       themeDe({ d: "mot-jamais-vu", day: 14 }), THEME_ETAPE[14]);

    S = fresh(); S.day = 1; seed(1);
    oublieSeances();
    go("cards");
    ok("cartes : la carte porte deux faces",
       !!view.querySelector(".face.avant") && !!view.querySelector(".face.arriere"));
    ok("cartes : et le thème de son étape",
       !!view.querySelector('.carte3d[data-th="' + themeDe(deck[pos]) + '"]'));
    ok("cartes : le thème est aussi écrit en toutes lettres",
       view.textContent.indexOf(THEME_NOM[themeDe(deck[pos])]) !== -1);

    /* ⚠️ `data-autosay` ne doit jamais être sur la face CACHÉE : les deux
       faces vivent en permanence dans le document, et un `autosay` resté
       derrière prononcerait la réponse pendant qu'on la cherche. */
    const cachee = view.querySelector(".face.arriere[data-autosay]");
    ok("cartes : la face cachée ne parle pas", !cachee);

    /* Le retournement lui-même. Il est déclenché à l'image SUIVANTE — sans
       quoi la carte naîtrait déjà retournée et il n'y aurait rien à voir.
       L'auto-test étant synchrone, on remplace `requestAnimationFrame` par un
       appel immédiat le temps de l'essai, et on le remet ensuite : le laisser
       modifié fausserait des animations très loin d'ici. */
    const vraiRAF = window.requestAnimationFrame;
    let planifie = false;
    window.requestAnimationFrame = function (fn) { planifie = true; fn(); };
    try {
      document.getElementById("answer").value = "n'importe quoi";
      view.querySelector('[data-act="check-word"]').click();
      ok("cartes : le retournement est déclenché après la réponse",
         planifie && !!view.querySelector(".carte-i.retourne"));
      ok("cartes : et la réponse est bien sur la face arrière",
         !!view.querySelector(".face.arriere .trad, .face.arriere .sol"));
    } finally {
      window.requestAnimationFrame = vraiRAF;
    }

    // Et la carte suivante repart à l'endroit : une carte qui resterait
    // retournée montrerait sa réponse d'emblée.
    view.querySelector('[data-act="card-next"]').click();
    ok("cartes : la carte suivante se présente à l'endroit",
       !view.querySelector(".carte-i.retourne"));
  })();

  /* ---- Le clavier ne doit pas faire sauter la page ----
     Signalé par Exsangue le 02/08/2026 : « ça ouvre le clavier, ça bouge la
     page, le focus est mal géré ».

     Ce qui est vérifiable ici : que le champ prenne le focus TOUT SEUL. Sans
     ça, il faut un appui de plus — et c'est cet appui, une fois la page déjà
     placée, qui déclenchait le second défilement.

     ⚠️ Et il faut être franc sur le reste : la carte qui se rétracte au
     clavier (`dvh`) et la place réservée sous l'en-tête collant
     (`scroll-padding-top`) relèvent de la mise en page réelle. Aucun test
     sans fenêtre ne peut en juger — il n'y a pas de clavier ici. Ces deux-là
     se vérifient sur un vrai téléphone, et nulle part ailleurs. */
  (function () {
    S = fresh(); S.day = 1; seed(1);
    oublieSeances();
    go("cards");
    const champ = document.getElementById("answer");
    ok("clavier : le champ de réponse prend le focus tout seul",
       !!champ && document.activeElement === champ);

    /* Et il ne doit pas le perdre en avançant d'une carte à l'autre : c'est
       la perte de focus qui referme le clavier, et sa réouverture qui fait
       sauter la page à chaque mot. */
    champ.value = "n'importe quoi";
    view.querySelector('[data-act="check-word"]').click();
    view.querySelector('[data-act="card-next"]').click();
    const suivant = document.getElementById("answer");
    ok("clavier : et il le garde à la carte suivante",
       !!suivant && document.activeElement === suivant);

    /* L'écran des cartes doit être en mode « pleine hauteur » : c'est lui qui
       empêche la page de défiler, donc qui garantit que le mot et le champ
       restent vus ensemble. La photo d'Exsangue montrait exactement le
       contraire — la page défilée, le mot sorti par le haut. */
    ok("clavier : l'écran des cartes tient dans la hauteur visible",
       document.body.classList.contains("plein"));
    go("practice");
    ok("clavier : l'entraînement aussi", document.body.classList.contains("plein"));
    /* Et les autres écrans NON : le livre et les leçons sont longs, les
       enfermer dans une hauteur fixe les rendrait illisibles. */
    go("home");
    ok("clavier : mais pas les écrans qui doivent défiler",
       !document.body.classList.contains("plein"));
  })();

  /* ---- Le chemin vertical ----
     Demande d'Exsangue le 02/08/2026 : « les leçons réussies en vert, en
     orange là où on a des fautes, les prochaines en bas grisées ». Ce qui
     compte : que chaque état soit VRAI, et que l'orange se rattrape. */
  (function () {
    S = fresh(); seed(1); seed(2); seed(3);
    const t1 = COURSE[0].quiz.length, t2 = COURSE[1].quiz.length;
    S.done = [1, 2];
    S.scores[1] = t1;          // étape 1 : sans faute
    S.scores[2] = t2 - 1;      // étape 2 : une faute
    S.day = 3;
    go("home");

    const p = function (n) { return view.querySelector('.palier[aria-label^="Étape ' + n + ' :"]'); };
    ok("chemin : une étape sans faute est verte", p(1) && p(1).className.indexOf("net") !== -1);
    ok("chemin : et le dit en toutes lettres", p(1) && p(1).textContent.indexOf("Sans faute") !== -1);
    ok("chemin : une étape avec des fautes est orange",
       p(2) && p(2).className.indexOf("tache") !== -1);
    ok("chemin : et annonce ce qu'il y a à rattraper",
       p(2) && p(2).textContent.indexOf("rattraper") !== -1);
    ok("chemin : l'étape en cours est marquée", p(3) && p(3).className.indexOf("ici") !== -1);
    ok("chemin : une étape non ouverte est grisée",
       p(6) && p(6).className.indexOf("plus-tard") !== -1);

    /* La couleur seule ne suffit pas : elle ne se lit pas par tout le monde,
       et « 3 fautes » dit ce qu'aucune teinte ne dira. Chaque palier doit
       donc porter son état en toutes lettres. */
    const muets = [];
    Array.prototype.forEach.call(view.querySelectorAll(".palier"), function (b) {
      if (!b.querySelector(".e") || !b.querySelector(".e").textContent.trim()) {
        muets.push(b.getAttribute("aria-label"));
      }
    });
    ok("chemin : chaque palier dit son état en toutes lettres",
       muets.length === 0, muets.slice(0, 2).join(" | "));

    /* Rattraper doit pouvoir EFFACER l'orange, sinon revenir sur une étape
       ne servirait à rien — c'est exactement ce qu'Exsangue demande. D'où le
       MEILLEUR score et non le dernier. */
    S.scores[2] = t2;
    go("home");
    ok("chemin : rattraper une étape la fait passer au vert",
       p(2) && p(2).className.indexOf("net") !== -1);
  })();

  /* L'avancée ne se joue QU'UNE fois. Une animation qui repart à chaque
     retour à l'accueil, sans qu'on ait rien avancé, cesse d'être une
     récompense et devient un défaut. */
  (function () {
    S = fresh(); S.day = 1; seed(1);
    vientDeValider = 1;
    go("home");
    ok("chemin : l'avancée se joue au retour au menu",
       !!view.querySelector(".palier.franchi"));
    go("home");
    ok("chemin : et elle ne se rejoue pas ensuite",
       !view.querySelector(".palier.franchi"));
  })();

  /* ---- La sauvegarde par copier-coller ----
     Ajoutée sur l'inquiétude d'Exsangue avant de refaire son icône : « je
     vais perdre ma progression ? ». Elle doit donc être irréprochable sur un
     point précis — ne JAMAIS écraser une progression par du vide ou du
     n'importe quoi. C'est le seul filet, il ne peut pas être troué. */
  (function () {
    S = fresh(); S.day = 3; S.streak = 7; seed(3);
    go("reglages");

    const out = document.getElementById("sauve-out");
    ok("sauvegarde : la progression est offerte en texte",
       !!out && out.value.indexOf('"day":3') !== -1);

    // Et ce texte doit vraiment se relire — sinon on garde une copie morte.
    let relu = null;
    try { relu = JSON.parse(out.value); } catch (e) {}
    ok("sauvegarde : le texte proposé se relit", !!relu);
    eq("sauvegarde : et il porte bien l'étape", relu && sane(relu).day, 3);
    eq("sauvegarde : et la série", relu && sane(relu).streak, 7);

    /* Un texte qui n'est pas une sauvegarde ne doit RIEN écraser. On vérifie
       par l'état, pas par le message : c'est la progression qui compte. */
    const zone = document.getElementById("sauve-in");
    zone.value = "bonjour";
    view.querySelector('[data-act="coller"]').click();
    eq("sauvegarde : un texte illisible n'écrase rien", S.day, 3);

    zone.value = "";
    view.querySelector('[data-act="coller"]').click();
    eq("sauvegarde : un cadre vide n'écrase rien", S.day, 3);

    /* Un JSON valable mais étranger à l'app non plus — sans quoi coller
       n'importe quel objet remettrait la progression à zéro. */
    document.getElementById("sauve-in").value = '{"quelque":"chose"}';
    view.querySelector('[data-act="coller"]').click();
    eq("sauvegarde : un JSON étranger n'écrase rien", S.day, 3);

    /* ⚠️ Et surtout LE CHEMIN QUI MARCHE. Sans lui, tout ce qui précède ne
       prouverait qu'une chose : que l'app sait refuser. Une sauvegarde qui
       refuse tout, y compris les bonnes, passerait ces trois tests haut la
       main et perdrait quand même la progression d'Exsangue.

       La confirmation est forcée le temps de l'essai : sans fenêtre, le
       navigateur répond « non » à `confirm`, et la restauration n'aurait
       jamais lieu. Elle est remise en place dans `finally` — une boîte de
       dialogue neutralisée pour le reste des tests fausserait tout ce qui
       suit, très loin de sa cause. */
    const copie = out.value;
    const vraiConfirm = window.confirm;
    window.confirm = function () { return true; };
    try {
      S = fresh(); S.day = 1; S.streak = 0; seed(1);
      go("reglages");
      document.getElementById("sauve-in").value = copie;
      view.querySelector('[data-act="coller"]').click();
      eq("sauvegarde : une sauvegarde valable est bien restaurée", S.day, 3);
      eq("sauvegarde : la série revient avec elle", S.streak, 7);
    } finally {
      window.confirm = vraiConfirm;
    }
  })();

  /* ---- §4 · L'indicateur de focus est de retour ----
     `.answer:focus { outline: none }` retirait le repérage clavier du champ
     PRINCIPAL de l'app — celui où l'on tape toutes les réponses.

     ⚠️ Cette vérification lit le STYLE CALCULÉ, pas la feuille de style :
     c'est la seule façon de savoir ce qui est réellement peint. Une règle
     peut exister et être écrasée par une autre plus spécifique — c'était
     exactement le défaut, `:focus-visible` général perdait contre
     `.answer:focus`. */
  S = fresh(); S.day = 1; seed(1);
  go("cards");
  (function () {
    const champ = document.getElementById("answer");
    ok("focus : le champ de réponse est là", !!champ);
    if (!champ) return;
    champ.focus();
    const st = getComputedStyle(champ);
    ok("focus : le champ focalisé porte un contour visible",
       st.outlineStyle !== "none" && parseFloat(st.outlineWidth) >= 2,
       st.outlineStyle + " " + st.outlineWidth);
    /* La bordure d'accent reste : elle s'ajoute au contour, elle ne le
       remplace pas. Vérifié pour que la correction n'ait pas jeté l'un pour
       l'autre. */
    ok("focus : et le champ garde sa bordure", parseFloat(st.borderTopWidth) > 0);
  })();

  /* ---- §4 · Ce qui est annoncé aux lecteurs d'écran ----
     Les écrans sont reconstruits par `innerHTML` : sans région live, ni le
     changement d'écran ni la correction ne sont annoncés. Pour qui n'a pas
     l'écran sous les yeux, l'app répondait « juste » ou « faux » en silence. */
  (function () {
    const zone = document.getElementById("annonce");
    ok("annonce : la région existe", !!zone);
    if (!zone) return;
    eq("annonce : elle est polie, elle ne coupe pas la parole",
       zone.getAttribute("aria-live"), "polite");
    /* ⚠️ Hors de #view : sinon chaque `innerHTML` la remplacerait, et le
       navigateur perdrait le fil de ce qu'il devait dire. */
    ok("annonce : elle vit hors de l'écran redessiné", !view.contains(zone));
    /* Et elle doit rester lisible pour l'arbre d'accessibilité : `display:none`
       ou `visibility:hidden` en feraient un message écrit dans une pièce vide. */
    const st = getComputedStyle(zone);
    ok("annonce : invisible à l'œil mais pas escamotée",
       st.display !== "none" && st.visibility !== "hidden",
       st.display + " / " + st.visibility);

    S = fresh(); S.day = 1; seed(1);
    go("cards");
    const champ = document.getElementById("answer");
    if (champ) {
      champ.value = "n'importe quoi";
      view.querySelector('[data-act="check-word"]').click();
      ok("annonce : la correction est annoncée", zone.textContent.trim().length > 0,
         "lu : " + zone.textContent);
      /* On annonce le RENDU, pas le HTML : des chevrons se feraient épeler. */
      ok("annonce : et sans une seule balise", zone.textContent.indexOf("<") === -1,
         zone.textContent);
    }

    /* Un écran sans correction annonce son titre : savoir où l'on vient
       d'arriver est le minimum quand on ne voit pas la page. */
    go("home");
    ok("annonce : un écran sans correction annonce son titre",
       zone.textContent.trim().length > 0, "lu : " + zone.textContent);
  })();

  /* ---- §4 · Le hors-ligne : la décision d'inscription ----
     Un service worker ne s'installe qu'en https (ou sur localhost), et
     l'auto-test ouvre la page en file:// — le hors-ligne lui-même demanderait
     un serveur qu'on n'a pas. Mais la DÉCISION se teste, et c'est elle qui est
     dangereuse : une inscription tentée en file:// lève une exception au
     démarrage, donc pendant l'auto-test, très loin de sa cause apparente. */
  (function () {
    const avecSW = { serviceWorker: {} };
    ok("hors-ligne : on s'inscrit en https",
       doitEnregistrerSW({ protocol: "https:", hostname: "kanycl.github.io" }, avecSW));
    ok("hors-ligne : jamais en file:// — c'est le cas de l'auto-test",
       !doitEnregistrerSW({ protocol: "file:", hostname: "" }, avecSW));
    ok("hors-ligne : ni en http ailleurs que sur la machine",
       !doitEnregistrerSW({ protocol: "http:", hostname: "exemple.fr" }, avecSW));
    ok("hors-ligne : mais oui sur localhost, pour mettre au point",
       doitEnregistrerSW({ protocol: "http:", hostname: "localhost" }, avecSW));
    ok("hors-ligne : et jamais si le navigateur ne sait pas faire",
       !doitEnregistrerSW({ protocol: "https:", hostname: "kanycl.github.io" }, {}));
    /* ⚠️ La preuve par l'usage : l'auto-test tourne en ce moment même, en
       file://. Si la décision était fausse, l'inscription aurait été tentée au
       démarrage — et cette ligne ne serait jamais atteinte. */
    ok("hors-ligne : rien n'a été tenté pendant cet auto-test",
       !doitEnregistrerSW(window.location, navigator) ||
       window.location.protocol !== "file:");
  })();

  /* ---- §2.3 · Restaurer ne peut plus écraser sans prévenir ----
     Le mentor a trouvé la porte restée ouverte : restaurer par FICHIER
     n'demandait rien, quand le texte collé demandait confirmation. Ce qui est
     vérifié ici n'est donc pas « la confirmation existe » — c'est qu'un refus
     laisse la progression EXACTEMENT où elle était. Une question posée puis
     ignorée serait pire que pas de question du tout. */
  (function () {
    const vraiConfirm = window.confirm;
    let demande = null;

    try {
      /* Refuser. La progression ne doit pas bouger d'un cheveu. */
      window.confirm = function (txt) { demande = txt; return false; };
      S = fresh(); S.day = 5; S.streak = 4; seed(5);
      const avant = JSON.stringify(S);
      const issue = restaureDepuis({ day: 1, cards: {}, streak: 0 }, "home");
      eq("restaurer : un refus est rapporté comme tel", issue, "annule");
      eq("restaurer : un refus ne touche à RIEN", JSON.stringify(S), avant);

      /* ⚠️ La question doit DIRE CE QU'ON PERD. Une confirmation à laquelle on
         répond oui par réflexe ne protège de rien : c'est le cas dangereux —
         restaurer une vieille sauvegarde en croyant prendre la récente. */
      ok("restaurer : la question nomme l'étape actuelle",
         !!demande && demande.indexOf("étape 5") !== -1, String(demande));
      ok("restaurer : et celle de la sauvegarde",
         !!demande && demande.indexOf("étape 1") !== -1, String(demande));

      /* Un objet étranger est refusé AVANT même de demander quoi que ce soit :
         on ne fait pas confirmer l'écrasement par du vide. */
      demande = null;
      eq("restaurer : un objet étranger est refusé", restaureDepuis({ a: 1 }, "home"), "format");
      eq("restaurer : rien du tout non plus", restaureDepuis(null, "home"), "format");
      ok("restaurer : et on n'a même pas posé la question", demande === null);
      eq("restaurer : la progression est toujours là", S.day, 5);

      /* Et LE CHEMIN QUI MARCHE — sans lui, tout ce qui précède ne prouverait
         que l'app sait refuser, y compris les bonnes sauvegardes. */
      window.confirm = function () { return true; };
      eq("restaurer : une sauvegarde valable passe",
         restaureDepuis({ day: 2, cards: {}, streak: 6 }, "home"), "ok");
      eq("restaurer : et elle est bien en place", S.day, 2);
      eq("restaurer : avec sa série", S.streak, 6);

      /* ⚠️ Une sauvegarde d'une VERSION ANTÉRIEURE n'a pas toutes les clés
         d'aujourd'hui. Elle est reposée sur `fresh()` : aucune ne doit
         manquer, sinon le premier écran qui lit la clé absente plante. */
      restaureDepuis({ day: 1, cards: {} }, "home");
      const neuf = fresh();
      const manquantes = Object.keys(neuf).filter(function (k) { return !(k in S); });
      ok("restaurer : une sauvegarde ancienne ressort complète",
         manquantes.length === 0, "manque : " + manquantes.join(", "));
      ok("restaurer : réglages compris", !!S.prefs && typeof S.prefs === "object");
    } finally {
      window.confirm = vraiConfirm;
    }
  })();

  /* ---- §2.3 · La sauvegarde s'enregistre VRAIMENT ----
     Deux défauts donnaient le même résultat : « Sauvegarde enregistrée. » à
     l'écran, et aucun fichier sur l'appareil. C'est le pire message possible
     ici — on croit sa progression à l'abri.

     Ce test regarde ce que le navigateur a réellement reçu, pas ce que l'app
     affiche. Le message, lui, était déjà là quand rien ne marchait. */
  (function () {
    const vraiCreate = URL.createObjectURL;
    const vraiRevoke = URL.revokeObjectURL;
    const vraiClick = HTMLAnchorElement.prototype.click;
    let connecteAuClic = null, revoqueTot = false, telecharge = null;

    URL.createObjectURL = function () { return "blob:essai"; };
    URL.revokeObjectURL = function () { revoqueTot = true; };
    HTMLAnchorElement.prototype.click = function () {
      connecteAuClic = this.isConnected;
      telecharge = this.download;
    };
    try {
      S = fresh(); S.day = 3;
      exportData();
      /* Plusieurs navigateurs ignorent le clic sur un élément détaché du
         document : le lien doit être DANS la page à cet instant précis. */
      ok("sauvegarde : le lien est dans la page au moment du clic",
         connecteAuClic === true);
      ok("sauvegarde : et le fichier porte un nom",
         typeof telecharge === "string" && telecharge.indexOf(".json") !== -1,
         String(telecharge));
      /* Le téléchargement ne fait que COMMENCER au clic. Libérer l'adresse
         dans la foulée, c'est retirer le fichier des mains du navigateur
         pendant qu'il l'écrit. */
      ok("sauvegarde : l'adresse n'est pas révoquée dans la foulée",
         revoqueTot === false);
      ok("sauvegarde : et le lien ne reste pas dans la page",
         !document.querySelector('a[download]'));
    } finally {
      URL.createObjectURL = vraiCreate;
      URL.revokeObjectURL = vraiRevoke;
      HTMLAnchorElement.prototype.click = vraiClick;
    }
  })();

  /* ---- Le relais entre deux phases ----
     Demande d'Exsangue le 02/08/2026 : « fin de leçon, hop une animation
     pour dire place à la révision, écrire, puis oral, ensuite place au
     test ». Ce qui est vérifié : on ne saute plus d'un écran de score à un
     écran d'exercice sans rien entre les deux. */
  (function () {
    S = fresh(); S.day = 1; seed(1);

    // Le bouton de suite mène au RELAIS, plus directement au mode.
    go("lesson");
    const suite = document.createElement("div");
    suite.innerHTML = suiteBtn("cards");
    const b = suite.querySelector("button");
    ok("relais : le bouton de suite passe par le relais",
       !!b && b.hasAttribute("data-relais") && !b.hasAttribute("data-go"));

    /* Chaque maillon du parcours doit savoir s'annoncer. Une phrase
       manquante donnerait un aplat vide — la règle parcourt donc PARCOURS
       au lieu d'une liste écrite ici, sinon un mode ajouté passerait au
       travers. */
    const muets = PARCOURS.filter(function (m) {
      return !RELAIS_PHRASE[m] || !RELAIS_SOUS[m];
    });
    ok("relais : chaque phase du parcours sait s'annoncer",
       muets.length === 0, muets.join(", "));

    // L'écran lui-même : il annonce, il propose de commencer, et il laisse
    // partir. Un relais sans issue serait pire que pas de relais.
    relaisVers = "oral";
    go("relais");
    ok("relais : la phrase annonce le mode qui arrive",
       view.textContent.indexOf("Place à l'oral") !== -1);
    ok("relais : l'aplat prend la couleur du mode",
       !!view.querySelector('.relais[data-ou="oral"]'));
    ok("relais : on peut commencer", !!view.querySelector('[data-go="oral"]'));
    ok("relais : et on peut partir", !!view.querySelector('[data-go="home"]'));

    // Une cible inconnue ne doit pas donner un écran vide.
    relaisVers = "licorne";
    go("relais");
    ok("relais : une cible inconnue reste un écran utilisable",
       !!view.querySelector(".relais strong") &&
       !!view.querySelector(".relais strong").textContent.trim());
  })();

  /* ---- Le tour se ferme au menu ----
     « Si on enchaîne les leçons on ne sait plus où on en est en sortant. »
     Ce qui compte n'est pas que le bouton existe — il existait — mais qu'il
     soit le PREMIER, donc le geste par défaut. */
  (function () {
    S = fresh(); S.day = 1; seed(1);
    go("quiz");
    const l = COURSE[0];
    for (let k = 0; k < l.quiz.length; k++) {
      const bon = view.querySelector('.opt[data-pick="' + l.quiz[qOrder[qi]].a + '"]');
      if (bon) bon.click();
      const suivant = view.querySelector('[data-act="next"]');
      if (suivant) suivant.click();
    }
    const boutons = view.querySelectorAll(".stack > button, .stack > .pair > button");
    ok("fin du tour : le premier bouton ramène au menu",
       boutons.length > 0 && boutons[0].getAttribute("data-go") === "home",
       boutons.length ? boutons[0].textContent : "aucun bouton");
    ok("fin du tour : et il est mis en avant",
       boutons.length > 0 && boutons[0].className.indexOf("primary") !== -1);
    ok("fin du tour : enchaîner reste possible",
       !!view.querySelector("[data-lesson]"));
  })();

  /* ---- Refaire l'oral si trop de fautes ----
     Demande d'Exsangue. On PROPOSE, on ne force pas : enfermer quelqu'un
     dans un exercice raté est le meilleur moyen qu'il ferme l'app — et ses
     erreurs sont déjà notées, rien ne serait sauvé. */
  (function () {
    if (!TTS.voice) { ok("oral : pas de voix sur cet appareil, rien à vérifier", true); return; }

    S = fresh(); S.day = 1; seed(1);
    go("oral");
    if (!oral.length) { ok("oral : aucun élément à tirer, rien à vérifier", true); return; }

    // Toutes fausses : la reprise doit être proposée, et en premier.
    oral.forEach(function (x) { x.ok = false; });
    oi = oral.length;
    show(renderOral());
    const b1 = view.querySelectorAll(".stack > button")[0];
    ok("oral : sous la moitié, on propose de refaire",
       view.textContent.indexOf("Moins de la moitié") !== -1);
    ok("oral : et refaire est le premier geste proposé",
       !!b1 && b1.getAttribute("data-go") === "oral" &&
       b1.className.indexOf("primary") !== -1);
    ok("oral : la suite du parcours reste offerte",
       !!view.querySelector("[data-relais]"));
    ok("oral : et l'accueil aussi", !!view.querySelector('[data-go="home"]'));

    // Toutes justes : rien ne doit être reproché.
    oral.forEach(function (x) { x.ok = true; });
    oi = oral.length;
    show(renderOral());
    ok("oral : au-dessus de la moitié, aucune reprise imposée",
       view.textContent.indexOf("Moins de la moitié") === -1);
  })();

  /* ---- Ne jamais perdre sa place ----
     Demande d'Exsangue le 02/08/2026. On vérifie le comportement RÉEL —
     entrer, avancer, sortir, revenir — et non l'état des variables : c'est
     le trajet qui l'intéresse, pas la mécanique. */
  (function () {
    S = fresh(); S.day = 1; seed(1);

    go("drills");
    const total = drills.length;
    if (total > 1) {
      di = 1;                                    // comme si on avait répondu une fois
      const premier = drills[0].key;
      go("home");
      go("drills");
      eq("reprise : les exercices reprennent où on les a laissés", di, 1);
      eq("reprise : et sur les MÊMES exercices", drills[0].key, premier);
    }

    /* Une séance TERMINÉE ne se reprend pas : rouvrir l'onglet doit donner
       une séance neuve, sans quoi on resterait bloqué sur l'écran de fin. */
    di = drills.length;
    go("home"); go("drills");
    ok("reprise : une séance finie repart à zéro", di === 0);

    /* Et une séance appartenant à une AUTRE étape ne se reprend pas non
       plus — ce ne sont plus les mêmes exercices. */
    go("drills");
    di = 1;
    S.day = 2; seed(2);
    go("drills");
    eq("reprise : changer d'étape donne une séance neuve", di, 0);

    // L'accueil doit ANNONCER la séance en cours : la reprendre sans
    // prévenir ferait tomber au milieu sans comprendre.
    S = fresh(); S.day = 1; seed(1);
    go("drills");
    if (drills.length > 1) {
      di = 1;
      go("home");
      ok("reprise : l'accueil signale la séance en cours",
         view.textContent.indexOf("Séance en cours") !== -1);
      ok("reprise : et la pastille le marque aussi",
         !!view.querySelector(".chip.encours"));
    }

    // Rien ne doit être annoncé quand aucune séance ne court.
    S = fresh(); S.day = 1; seed(1);
    seanceDe.drills = 0; seanceDe.cards = 0; seanceDe.oral = 0;
    seanceDe.quiz = 0; seanceDe.practice = 0;
    go("home");
    ok("reprise : rien n'est annoncé sans séance en cours",
       view.textContent.indexOf("Séance en cours") === -1);

    /* Les cartes et l'entraînement partagent `deck`. Passer de l'un à
       l'autre DOIT repartir de zéro : ce ne sont pas les mêmes mots, et
       reprendre l'un dans l'autre servirait des cartes du mauvais paquet. */
    S = fresh(); S.day = 1; seed(1);
    go("cards");
    const nCartes = deck.length;
    go("practice");
    ok("reprise : l'entraînement ne reprend pas la séance des cartes",
       training === true);
    go("cards");
    ok("reprise : et les cartes ne reprennent pas celle de l'entraînement",
       training === false && deck.length === nCartes);
  })();

  /* ---- Expliquer l'erreur ----
     Demande d'Exsangue le 02/08/2026 : « donne l'explication de l'erreur,
     la règle, ou dis-moi quelle faute d'orthographe ». Le risque n'est pas
     de ne rien dire — c'est de dire une bêtise avec assurance. D'où deux
     séries : ce qu'on DOIT reconnaître, et ce qu'on doit refuser d'expliquer. */
  (function () {
    // Une lettre à changer, et on dit laquelle.
    const une = fauteOrtho("Hars", "Haus");
    ok("erreur : une seule lettre fautive est pointée",
       une && une.indexOf("une seule lettre") !== -1, String(une));

    /* Deux lettres voisines INTERVERTIES : le piège ie / ei mérite sa règle.
       ⚠️ « Bierne » pour « Birne » n'en est pas une — c'est une lettre en
       trop. Ce test s'est trompé d'exemple avant de trouver le bon, et il
       avait raison de crier : les deux mots doivent avoir la même longueur
       pour qu'il y ait interversion. */
    const inv = fauteOrtho("Beir", "Bier");
    ok("erreur : ie / ei inversés reçoivent leur règle",
       inv && inv.indexOf("deuxième") !== -1, String(inv));

    ok("erreur : une lettre manquante est signalée",
       (fauteOrtho("Hus", "Haus") || "").indexOf("manque") !== -1);
    ok("erreur : une lettre en trop est signalée",
       (fauteOrtho("Hauus", "Haus") || "").indexOf("de trop") !== -1);

    /* Le mot montré est celui qui s'écrit VRAIMENT. `normDE` replie ß sur ss ;
       afficher « strasse » comme correction apprendrait une faute. */
    const st = fauteOrtho("Strase", "Straße");
    ok("erreur : la correction montre le mot tel qu'il s'écrit",
       !st || st.indexOf("Straße") !== -1, String(st));

    /* Et surtout : ce qu'il faut REFUSER d'expliquer. Prétendre pointer une
       lettre quand ce n'est pas le bon mot serait mentir sur ce qu'on a
       compris — la règle de l'exercice répond mieux dans ce cas. */
    ok("erreur : un mot sans rapport n'est pas traité comme une faute de frappe",
       fauteOrtho("Katze", "Haus") === null);
    ok("erreur : une phrase de longueur différente n'est pas traitée",
       fauteOrtho("Ich bin", "Ich bin hier") === null);
    ok("erreur : deux mots fautifs ne se résument pas à une lettre",
       fauteOrtho("Der Katze ist gross", "Die Blume ist klein") === null);
    ok("erreur : rien d'écrit n'est pas une faute d'orthographe",
       fauteOrtho("", "Haus") === null);

    /* Ce que l'app PARDONNE ne doit jamais être « expliqué » : envoyer
       corriger un tréma accepté enverrait corriger ce qui était juste. */
    ok("erreur : un tréma écrit en deux lettres reste sans reproche",
       fauteOrtho("gruen", "grün") === null);
    ok("erreur : ß écrit ss reste sans reproche",
       fauteOrtho("Strasse", "Straße") === null);
    ok("erreur : la casse reste sans reproche",
       fauteOrtho("haus", "Haus") === null);
  })();

  /* Le filigrane de consigne — demande d'Exsangue le 02/08/2026 : « on ne
     voit pas d'un regard ce qu'on doit faire ». Un mode où l'on répond sans
     consigne visible est précisément ce qui le faisait se tromper. */
  (function () {
    const sans = [];
    [["cards",  function () { S = fresh(); S.day = 1; seed(1); }],
     ["drills", function () { S = fresh(); S.day = 1; seed(1); }]
    ].forEach(function (paire) {
      paire[1]();
      go(paire[0]);
      const f = view.querySelector("[data-consigne]");
      if (!f || !f.getAttribute("data-consigne").trim()) sans.push(paire[0]);
    });
    ok("consigne : chaque mode de réponse porte son filigrane",
       sans.length === 0, sans.join(", "));
  })();

  /* Le filigrane des transformations est TIRÉ du premier mot de la consigne.
     Une consigne qui commencerait par une ponctuation ou un espace donnerait
     un filigrane vide — donc une boîte qui réserve la place d'un texte
     absent. On vérifie la matière première, sur tout le cours. */
  (function () {
    const mauvais = [];
    COURSE.forEach(function (st, i) {
      (st.drills || []).forEach(function (d) {
        if (d.t !== "trans") return;
        const mot = String(d.inst || "Transforme").split(" ")[0].replace(/[.,;:!?]+$/, "");
        if (!mot) mauvais.push("étape " + (i + 1) + " : « " + d.inst + " »");
      });
    });
    ok("consigne : chaque transformation donne un filigrane non vide",
       mauvais.length === 0, mauvais.join(" | "));

    /* Et il doit TENIR sur une ligne. Le filigrane est en `white-space:
       nowrap` dans une boîte en `overflow: hidden` : trop long, il sort du
       cadre et se lit comme un texte coupé. À 2,25 rem dans une boîte de
       390 px, quatorze caractères sont la limite tenable. La règle porte
       sur la longueur plutôt que sur un pixel mesuré : aucune mesure n'est
       possible ici, le rendu dépend de la police de l'appareil. */
    const longs = [];
    COURSE.forEach(function (st, i) {
      (st.drills || []).forEach(function (d) {
        if (d.t !== "trans") return;
        const mot = String(d.inst || "Transforme").split(" ")[0].replace(/[.,;:!?]+$/, "");
        if (mot.length > 14) longs.push("étape " + (i + 1) + " : « " + mot + " »");
      });
    });
    ok("consigne : aucun filigrane trop long pour tenir sur une ligne",
       longs.length === 0, longs.join(" | "));
  })();

  /* « Où suis-je » — demande d'Exsangue le 02/08/2026 : « pouvoir lever les
     yeux et lire dans quel onglet je suis ».

     La règle vérifiée est GÉNÉRALE : tout écran sauf l'accueil doit se
     nommer. Elle parcourt `ROUTES` au lieu d'une liste écrite ici, sinon un
     écran ajouté plus tard passerait sans badge — c'est-à-dire précisément
     le défaut qu'on corrige. */
  (function () {
    const sans = [];
    Object.keys(ROUTES).forEach(function (nom) {
      if (nom === "home") return;
      S = fresh(); S.day = 1; S.unit = 2; seed(1);
      go(nom);
      const b = document.querySelector("#wordmark .ou");
      if (!b || !b.textContent.trim()) sans.push(nom + " : aucun badge");
      else if (b.getAttribute("data-ou") !== nom) sans.push(nom + " : mauvais data-ou");
    });
    ok("où suis-je : chaque écran affiche son nom", sans.length === 0, sans.join(" | "));

    S = fresh(); S.day = 1; seed(1);
    go("home");
    ok("où suis-je : l'accueil rend sa place au nom de l'app",
       !document.querySelector("#wordmark .ou") &&
       document.getElementById("wordmark").textContent.indexOf("Deutsch") !== -1);
  })();

  /* Deux champs affichés en même temps ne doivent pas porter le même `name` :
     c'est lui qui sert de crochet aux valeurs déjà enregistrées. */
  ok("saisie : chaque champ reçoit un nom qui lui est propre",
     saisieAttrs("x").match(/name="([^"]+)"/)[1] !==
     saisieAttrs("x").match(/name="([^"]+)"/)[1]);

  /* ---- Les couleurs choisies à la main ----
     Demande d'Exsangue le 02/08/2026. Le point sensible n'est pas que la
     couleur s'applique — c'est que la LISIBILITÉ tienne quoi qu'il choisisse,
     et que le réglage de palette continue de fonctionner à côté. */
  (function () {
    // Le garde-fou : l'encre est celle qui contraste le plus, pas un seuil
    // approximatif. Un jaune vif et un bleu vif ont des canaux comparables
    // et appellent pourtant des encres opposées.
    eq("couleurs : encre noire sur un fond clair", encrePour("#ffffff"), "#000000");
    eq("couleurs : encre blanche sur un fond sombre", encrePour("#111111"), "#ffffff");
    eq("couleurs : encre noire sur un jaune vif", encrePour("#f4a300"), "#000000");
    eq("couleurs : encre blanche sur un bleu profond", encrePour("#1d4e89"), "#ffffff");
    /* Le rouge pur appelle du NOIR, pas du blanc — c'est contre-intuitif et
       ce test s'est d'abord trompé, pas le code. Sa luminance (0,21) le place
       du côté clair de la bascule : noir 5,25 pour 1, blanc seulement 4,0. */
    eq("couleurs : encre noire sur un rouge pur", encrePour("#ff0000"), "#000000");

    /* Et le contraste obtenu doit VRAIMENT passer le seuil lisible du WCAG
       (4,5:1 pour du texte courant). Vérifier que la fonction renvoie du
       noir ou du blanc ne dit rien : encore faut-il que ce soit suffisant.
       On balaie donc un éventail de teintes, dont les pires cas — les gris
       moyens, où aucune des deux encres n'est confortable. */
    const durs = [];
    ["#808080", "#7f7f7f", "#00ff00", "#ff0000", "#0000ff", "#ffff00",
     "#767676", "#8a8a8a", "#c0c0c0", "#404040"].forEach(function (h) {
      const e = encrePour(h);
      const a = luminance(h), b = luminance(e);
      const ratio = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
      if (ratio < 4.5) durs.push(h + " → " + e + " (" + ratio.toFixed(2) + ":1)");
    });
    ok("couleurs : l'encre choisie reste lisible sur toutes les teintes",
       durs.length === 0, durs.join(" | "));

    // Une teinte posée s'applique à la case ET à son badge — les deux lisent
    // la même variable, c'est justement ce qui les empêche de diverger.
    S = fresh(); S.day = 1; seed(1);
    S.prefs.teintes = { oral: "#ff0000" };
    applyPrefs();
    const racine = document.documentElement;
    eq("couleurs : la teinte choisie est posée sur la racine",
       racine.style.getPropertyValue("--c-oral").trim(), "#ff0000");
    eq("couleurs : son encre est calculée, pas choisie",
       racine.style.getPropertyValue("--ct-oral").trim(), "#000000");

    // L'entraînement libre partage la case des cartes : il doit suivre.
    S.prefs.teintes = { cards: "#00ff00" };
    applyPrefs();
    eq("couleurs : l'entraînement suit la couleur des cartes",
       racine.style.getPropertyValue("--c-practice").trim(), "#00ff00");

    /* Le point le plus facile à casser : une case SANS couleur choisie ne
       doit poser aucune variable. Si on y écrivait la couleur du thème, elle
       serait figée et le réglage de palette n'aurait plus d'effet dessus —
       la case se dirait « d'origine » tout en étant peinte. */
    S.prefs.teintes = {};
    applyPrefs();
    ok("couleurs : une case d'origine ne fige rien",
       !racine.style.getPropertyValue("--c-oral") &&
       !racine.style.getPropertyValue("--c-practice"));

    // Une valeur inventée dans une sauvegarde ne doit pas donner une case
    // sans fond : elle est écartée, et la case retombe sur la palette.
    const abime = sane(Object.assign(fresh(), {
      prefs: Object.assign({}, PREFS_DEFAUT, {
        teintes: { oral: "rouge", quiz: "#12ab", lesson: "#1D4E89", inconnu: "#000000" }
      })
    }));
    ok("couleurs : une teinte illisible est écartée",
       !abime.prefs.teintes.oral && !abime.prefs.teintes.quiz);
    eq("couleurs : une teinte valable est gardée, en minuscules",
       abime.prefs.teintes.lesson, "#1d4e89");
    ok("couleurs : un mode inconnu est écarté", !abime.prefs.teintes.inconnu);

    /* Le retour aux réglages d'origine ne doit pas PARTAGER l'objet des
       teintes avec la valeur par défaut. `Object.assign` ne copie que la
       surface : sans recopie, peindre une case après un reset modifierait
       le défaut lui-même, définitivement. */
    S = fresh(); S.day = 1; seed(1); applyPrefs();
    go("reglages");
    view.querySelector('[data-act="prefs-reset"]').click();
    S.prefs.teintes.oral = "#123456";
    ok("couleurs : le retour aux réglages d'origine ne partage pas ses objets",
       !PREFS_DEFAUT.teintes.oral);
    delete S.prefs.teintes.oral;
  })();

  /* ---- Le bouton des réglages ----
     Il est FIGÉ dans le HTML depuis qu'Exsangue a choisi les trois points
     (02/08/2026) : il n'y a plus de réglage à tester. Ce qui reste à
     garantir, c'est qu'il existe et qu'il agisse — c'est le seul chemin
     vers les réglages, et il vit hors de la zone redessinée, donc hors de
     la délégation de clic posée sur `view`. */
  (function () {
    S = fresh(); S.day = 1; seed(1);
    go("home");
    const g = document.getElementById("gear");
    ok("bouton : le dessin est présent", !!g && !!g.querySelector("svg"));
    g.click();
    eq("bouton : il ouvre les réglages", ecranCourant, "reglages");
    g.click();
    eq("bouton : et il en revient — c'est un va-et-vient", ecranCourant, "home");
  })();

  S = fresh(); S.day = 1; seed(1); applyPrefs();
  go("reglages");
  ["voix", "sonAuto", "theme", "texte", "couleur", "forme", "seance"].forEach(function (cle) {
    const boutons = view.querySelectorAll('[data-pref="' + cle + '"]');
    ok("réglages : « " + cle + " » propose au moins deux choix", boutons.length >= 2);
    eq("réglages : « " + cle + " » en marque exactement un",
       view.querySelectorAll('[data-pref="' + cle + '"].on').length, 1);
  });

  /* Le clic doit faire les trois choses d'un coup : enregistrer, appliquer,
     et redessiner pour que le bouton retenu change. Une version qui oublie
     le redessin donne l'impression que rien ne s'est passé. */
  view.querySelector('[data-pref="couleur"][data-val="indigo"]').click();
  eq("réglages : un clic change la préférence", S.prefs.couleur, "indigo");
  eq("réglages : et l'applique aussitôt",
     document.documentElement.getAttribute("data-couleur"), "indigo");
  eq("réglages : et le bouton retenu suit",
     view.querySelector('[data-pref="couleur"].on').getAttribute("data-val"), "indigo");

  view.querySelector('[data-pref="sonAuto"][data-val="non"]').click();
  eq("réglages : le son automatique se coupe", S.prefs.sonAuto, false);
  view.querySelector('[data-pref="sonAuto"][data-val="oui"]').click();
  eq("réglages : et se rallume", S.prefs.sonAuto, true);

  /* Remettre les réglages d'origine ne doit PAS toucher à la progression :
     les confondre ferait de ce bouton un piège. */
  S.prefs.couleur = "prune"; S.day = 1; S.done = [];
  S.cards["temoin"] = { box: 3, due: null, hit: 2, miss: 1 };
  go("reglages");
  view.querySelector('[data-act="prefs-reset"]').click();
  eq("réglages : la remise à zéro rétablit les défauts", S.prefs.couleur, PREFS_DEFAUT.couleur);
  ok("réglages : mais ne touche pas à la progression", !!S.cards["temoin"]);
  delete S.cards["temoin"];

  /* ---------- Le rouage ----------
     Demandé par Exsangue : « rajoute tout ce qui est en bas dans un petit
     rouage en haut à droite ». Le bloc « Ma progression » et ses outils
     occupaient un tiers de l'accueil pour des actions faites une fois par
     mois, et repoussaient les cinq modes plus bas. */
  const rouage = document.getElementById("gear");
  ok("rouage : il existe", !!rouage);
  /* Il vit dans l'en-tête, HORS de la zone redessinée : c'est ce qui lui
     permet d'être sur toutes les pages, et ce qui l'oblige à avoir son
     propre écouteur au lieu de la délégation posée sur `view`. */
  ok("rouage : il est hors de la zone redessinée", !view.contains(rouage));
  ok("rouage : il porte un nom lisible à voix haute", !!rouage.getAttribute("aria-label"));

  go("home");
  ok("accueil : les outils ne l'encombrent plus", !view.querySelector('[data-act="export"]'));
  ok("accueil : ni le bloc de progression", view.textContent.indexOf("mots en circulation") === -1);

  rouage.click();
  eq("rouage : un appui ouvre les réglages", ecranCourant, "reglages");
  ok("rouage : la progression y est passée", view.textContent.indexOf("mots en circulation") !== -1);
  ok("rouage : les outils aussi", !!view.querySelector('[data-act="export"]'));
  ok("rouage : et « tout effacer » également", !!view.querySelector('[data-act="reset"]'));
  ok("rouage : il se marque comme actif", rouage.classList.contains("on"));

  /* Va-et-vient : sans ça, appuyer sur le rouage alors qu'on y est déjà ne
     ferait rien et le bouton semblerait cassé. */
  rouage.click();
  eq("rouage : un second appui ramène à l'accueil", ecranCourant, "home");
  ok("rouage : et il n'est plus marqué actif", !rouage.classList.contains("on"));

  /* ---------- La forme des cases ----------
     Demandée par Exsangue : « peut-on essayer des cercles pour oral, leçon,
     etc. au lieu de rectangles ? ». Faite réglable plutôt que tranchée : il
     essaie sur son téléphone et garde ce qu'il préfère. */
  eq("formes : une forme inconnue retombe sur le défaut",
     sane(Object.assign(fresh(), { prefs: { forme: "triangle" } })).prefs.forme, PREFS_DEFAUT.forme);

  S.prefs.forme = "carre"; go("home");
  ok("formes : en rectangles, la grille est nommée « carre »",
     !!view.querySelector(".modes-home.carre"));
  ok("formes : et le sous-titre d'un mode est bien là",
     view.textContent.indexOf("dernière leçon") !== -1);

  S.prefs.forme = "rond"; go("home");
  ok("formes : en cercles, la grille est nommée « rond »",
     !!view.querySelector(".modes-home.rond"));
  ok("formes : et il n'y a pas les deux à la fois",
     !view.querySelector(".modes-home.carre"));
  /* Les cinq modes doivent survivre au changement de forme : c'est la
     disposition qui change, pas le contenu. */
  eq("formes : les cinq modes sont toujours là",
     view.querySelectorAll(".modes-home .mode").length, 5);
  ok("formes : les comptes restent affichés", !!view.querySelector(".modes-home .chip"));
  S.prefs.forme = PREFS_DEFAUT.forme; go("home");

  /* Remettre les réglages tels qu'ils étaient AVANT ce bloc. `applyPrefs`
     écrit dans ORAL_SIZE et DRILL_SESSION, qui sont globales : les laisser
     déréglées fausse tous les tests suivants, et l'échec apparaît très loin
     d'ici — c'est arrivé, sur une vérification de l'oral.
     Le passage par PREFS_DEFAUT n'est pas décoratif : si l'état d'où l'on
     vient n'avait pas de réglages, `prefsAvant` est vide et `SEANCES[undefined]`
     rendrait la longueur de séance indéfinie. */
  S.prefs = Object.assign({}, PREFS_DEFAUT, prefsAvant); applyPrefs();

  S = fresh(); S.day = 1; seed(1);
  go("home");
  eq("accueil : un bloc repliable par chapitre",
     view.querySelectorAll("details.grp:not(.tout)").length, CHAPTERS.length);

  /* Demandé par Exsangue : la liste mangeait tout l'accueil. Le sommaire tient
     sous UNE LIGNE PAR NIVEAU, repliée par défaut.
     ⚠️ Ce test exigeait exactement une ligne jusqu'au 02/08/2026, date à
     laquelle Exsangue a demandé un dépliant par niveau. Son intention n'a pas
     changé — rien ne doit être ouvert au départ — mais l'unité de mesure, si.
     On la rattache donc au NOMBRE DE NIVEAUX ÉCRITS et non à la constante 1,
     sinon le test retombera au premier niveau ajouté. */
  eq("accueil : une ligne de sommaire par niveau écrit",
     view.querySelectorAll("details.grp.tout").length,
     NIVEAUX.filter(function (n) { return avancementNiveau(n).ecrites > 0; }).length);
  (function () {
    const ouverts = [];
    const tous = view.querySelectorAll("details.grp.tout");
    for (let i = 0; i < tous.length; i++) {
      if (tous[i].open) ouverts.push(tous[i].querySelector(".g-t").textContent);
    }
    ok("accueil : et aucun niveau n'est ouvert au départ",
       ouverts.length === 0, ouverts.join(" | "));
  })();

  /* À l'intérieur, seul le chapitre où l'on travaille est ouvert. */
  eq("accueil : un seul chapitre ouvert",
     view.querySelectorAll("details.grp:not(.tout)[open]").length, 1);
  ok("accueil : c'est celui de l'étape en cours",
     (function () {
       const i = CHAPTERS.indexOf(chapterOf(S.day).chapter);
       return view.querySelectorAll("details.grp:not(.tout)")[i].open;
     })());

  /* Un palier ouvre la leçon d'un seul clic, au lieu de revenir à l'accueil
     de l'étape.

     ⚠️ La règle a changé le 02/08/2026 : elle exigeait que TOUTES les étapes
     portent le lien. Depuis le chemin vertical, une étape verrouillée est
     inerte dans le HTML même (`disabled`, pas de `data-lesson`) et non plus
     seulement au clic. C'est plus solide — on ne dépend plus d'un contrôle
     au moment du geste — mais le compte n'est plus le total. La règle juste
     est : ce qui est ATTEIGNABLE porte le lien, et rien ne passe par
     `data-day`. */
  (function () {
    const liens = view.querySelectorAll('.palier[data-lesson]');
    const attendus = [];
    for (let n = 1; n <= COURSE.length; n++) if (reachable(n)) attendus.push(n);
    ok("accueil : les paliers atteignables mènent droit à la leçon",
       liens.length === attendus.length && liens.length > 0 &&
       !view.querySelector('.palier[data-day]'),
       liens.length + " liens pour " + attendus.length + " étapes ouvertes");
    ok("accueil : une étape verrouillée est inerte dans le HTML",
       view.querySelectorAll(".palier[disabled]").length === COURSE.length - attendus.length);
  })();
  (function () {
     S.done = [1]; go("home");
     const p2 = view.querySelector('.palier[data-lesson="2"]');
     p2.click();
     eq("accueil : cliquer une pastille ouvre bien cette étape", S.day, 2);
     ok("accueil : et directement sa leçon", !!view.querySelector('[data-act="step-next"]'));
     S = fresh(); S.day = 1; seed(1); go("home");
  })();

  /* Une étape verrouillée ne doit pas s'ouvrir au clic — sinon on saute la
     progression sans avoir validé le quiz. */
  (function () {
     S = fresh(); S.day = 1; seed(1); go("home");
     const loin = view.querySelector('.palier[data-lesson="5"]');
     if (loin) {
       loin.click();
       eq("accueil : une étape verrouillée reste inaccessible", S.day, 1);
     } else {
       ok("accueil : pas d'étape lointaine dans ce cours", true);
     }
     go("home");
  })();
  eq("accueil : une pastille par étape écrite", view.querySelectorAll(".palier").length, COURSE.length);
  ok("accueil : le niveau est annoncé", view.innerHTML.indexOf("Niveau " + niveauDe(S.day).id) !== -1);

  /* Le badge de l'en-tête et l'accueil doivent dire LE MÊME niveau. Ils sont
     peints par deux fonctions différentes ; c'est exactement la configuration
     où l'un se met à mentir sans que l'autre bouge. On vérifie donc aux deux
     bouts du cours, pas seulement là où l'on se trouve par hasard. */
  (function () {
    const garde = S.day;
    [1, 36].forEach(function (d) {
      if (d > COURSE.length) return;
      S.day = d;
      go("home");
      eq("en-tête : le badge suit le niveau de l'étape " + d,
         document.getElementById("wordmark").textContent.indexOf(niveauDe(d).id) !== -1, true);
      ok("accueil : et il dit la même chose que le sommaire à l'étape " + d,
         view.innerHTML.indexOf("Niveau " + niveauDe(d).id) !== -1);
    });
    S.day = garde;
    go("home");
  })();

  /* --- Un dépliant PAR NIVEAU, demandé par Exsangue le 02/08/2026 ---
     Le vrai risque n'est pas qu'il en manque un : c'est qu'une étape se range
     du mauvais côté. Un chapitre A2 glissé sous « Niveau A1 » ne se verrait
     qu'en dépliant, et personne ne déplie tous les jours. On vérifie donc
     l'APPARTENANCE de chaque pastille, pas seulement le compte des dépliants. */
  (function () {
    go("home");
    const ecrits = NIVEAUX.filter(function (n) { return avancementNiveau(n).ecrites > 0; });
    const blocs = view.querySelectorAll("details.tout");
    eq("accueil : un dépliant par niveau écrit", blocs.length, ecrits.length);

    let vues = 0;
    for (let i = 0; i < blocs.length; i++) {
      const niv = ecrits[i];
      const suivant = NIVEAUX[NIVEAUX.indexOf(niv) + 1];
      const dernier = suivant ? suivant.premiere - 1 : Infinity;

      ok("accueil : le dépliant " + i + " s'annonce comme le niveau " + niv.id,
         blocs[i].querySelector("summary").textContent.indexOf("Niveau " + niv.id) !== -1);

      /* Chaque pastille du bloc doit tomber dans les bornes de SON niveau. */
      const dedans = blocs[i].querySelectorAll(".palier");
      const egarees = [];
      for (let k = 0; k < dedans.length; k++) {
        const n = parseInt(dedans[k].querySelector(".dot").textContent, 10);
        if (!(n >= niv.premiere && n <= dernier)) egarees.push(n);
      }
      vues += dedans.length;
      ok("accueil : aucune étape étrangère dans le niveau " + niv.id,
         egarees.length === 0, egarees.join(", "));
    }

    /* Et rien ne doit se perdre entre les deux : la somme des pastilles des
       dépliants est le cours entier. Sans ce contrôle, une étape hors de toute
       borne disparaîtrait de l'écran sans qu'aucun test ne bronche. */
    eq("accueil : les dépliants couvrent tout le cours", vues, COURSE.length);
  })();
  ok("accueil : le mot « jour » a disparu de l'écran",
     view.innerHTML.toLowerCase().indexOf(">jour") === -1 &&
     view.innerHTML.indexOf(" jours ") === -1);

  /* --- B. Calcul des dates --- */
  eq("date : +2 jours franchit le mois", shift("2026-07-30", 2), "2026-08-01");
  eq("date : -1 jour franchit le mois", shift("2026-03-01", -1), "2026-02-28");
  eq("date : +1 jour franchit l'année", shift("2025-12-31", 1), "2026-01-01");
  eq("date : le 29 février existe en année bissextile", shift("2024-02-28", 1), "2024-02-29");
  ok("date : today() au format AAAA-MM-JJ", /^\d{4}-\d{2}-\d{2}$/.test(today()), today());

  /* --- C. Répétition espacée --- */
  S = fresh(); S.day = 1; seed(1);
  const id = "1:0";
  eq("carte neuve : niveau 0", S.cards[id].niv, 0);
  ok("carte neuve : aucune date, il n'y a plus de calendrier",
     S.cards[id].due === undefined);
  eq("toutes les cartes de l'étape sont dans le paquet",
     cartesLecon().length, COURSE[0].vocab.length);

  grade(id, true);
  eq("bonne réponse : un cran de plus", S.cards[id].niv, 1);
  grade(id, true); grade(id, true);
  eq("trois bonnes réponses : niveau 3", S.cards[id].niv, 3);
  ok("niveau 3 : c'est là qu'on passe à l'écriture en allemand",
     S.cards[id].niv >= ECRIT_DE_A);

  /* Le paquet de la leçon ne dépend PLUS du niveau : monter un mot ne le fait
     pas sortir de sa leçon. C'est l'ancrage qui espace, plus un calendrier. */
  eq("monter de niveau ne retire pas la carte de sa leçon",
     cartesLecon().length, COURSE[0].vocab.length);

  for (let k = 0; k < 30; k++) grade(id, true);
  eq("le niveau ne dépasse jamais 20", S.cards[id].niv, NIV_MAX);
  ok("à 20, le mot est ancré", S.cards[id].niv >= ANCRE_A);

  grade(id, false);
  eq("carte ratée : un seul niveau perdu, pas la chute complète", S.cards[id].niv, 19);
  grade(id, false); grade(id, false);
  eq("carte ratée trois fois : elle redescend niveau par niveau", S.cards[id].niv, 17);
  for (let k = 0; k < 30; k++) grade(id, false);
  eq("le niveau ne descend jamais sous 0", S.cards[id].niv, 0);

  /* L'entraînement libre note la réponse SANS toucher au niveau : sinon on
     ancrerait un mot en le répétant d'affilée. */
  grade(id, true, false);
  eq("entraînement : le journal compte", S.cards[id].hit > 0, true);
  eq("entraînement : mais le niveau ne bouge pas", S.cards[id].niv, 0);

  /* --- D. La série --- */
  S = fresh();
  touchStreak();
  eq("série : premier jour de travail", S.streak, 1);
  touchStreak();
  eq("série : deux sessions le même jour ne comptent qu'une fois", S.streak, 1);
  S.last = shift(today(), -1); touchStreak();
  eq("série : travaillé hier, elle s'incrémente", S.streak, 2);
  S.last = shift(today(), -3); touchStreak();
  eq("série : après une coupure, elle repart à 1", S.streak, 1);

  /* Les clés des exercices qu'un tirage servirait, sans rien enregistrer. */
  function drawDrillsKeys() {
    return drawDrills(DRILL_SESSION).map(function (d) { return d.key; }).sort();
  }

  /* Lit l'ordre des boutons de réponse actuellement à l'écran, par index d'origine. */
  function optOrder(attr) {
    return Array.prototype.map.call(view.querySelectorAll(".opts .opt"), function (b) {
      return b.getAttribute(attr);
    }).join(",");
  }

  /* --- E. La leçon pas à pas, en cliquant vraiment --- */
  S = fresh(); S.day = 1; seed(1);
  go("lesson");
  const steps1 = COURSE[0].steps;
  let sawCheck = false;
  for (let i = 0; i < steps1.length; i++) {
    if (steps1[i].check) {
      sawCheck = true;
      ok("leçon : « Continuer » est bloqué tant qu'on n'a pas répondu (étape " + (i + 1) + ")",
         !view.querySelector('[data-act="step-next"]'));
      const pick = view.querySelector('[data-scheck="' + steps1[i].check.a + '"]');
      if (!pick) { ok("leçon : la mini-question de l'étape " + (i + 1) + " est cliquable", false); break; }
      const ordBefore = optOrder("data-scheck");
      pick.click();
      ok("leçon : l'explication apparaît après la réponse", !!view.querySelector(".why"));
      eq("leçon : répondre ne remélange pas les réponses (étape " + (i + 1) + ")", optOrder("data-scheck"), ordBefore);
    }
    const nx = view.querySelector('[data-act="step-next"]');
    if (!nx) { ok("leçon : bouton « Continuer » à l'étape " + (i + 1), false); break; }
    nx.click();
  }
  ok("leçon : au moins une étape comporte une mini-question", sawCheck);
  ok("leçon : le récapitulatif s'affiche à la fin", !!view.querySelector(".voc"));
  eq("récapitulatif : tout le vocabulaire est listé", view.querySelectorAll(".voc li").length, COURSE[0].vocab.length);
  ok("récapitulatif : la prononciation est affichée", view.querySelectorAll(".voc .p").length === COURSE[0].vocab.length);
  eq("récapitulatif : les phrases sont un tirage, pas la liste entière",
     view.querySelectorAll(".ex").length,
     Math.min(RECAP_EXAMPLES, COURSE[0].examples.length));
  ok("récapitulatif : les phrases changent d'une relecture à l'autre",
     (function () {
       const vues = {};
       for (let k = 0; k < 40; k++) {
         show(renderRecap());
         vues[Array.prototype.map.call(view.querySelectorAll(".ex .d"),
           function (n) { return n.textContent; }).join("|")] = true;
       }
       return Object.keys(vues).length > 1;
     })());

  /* --- F. Le quiz, de bout en bout --- */
  const l1 = COURSE[0];

  S = fresh(); S.day = 1; seed(1);
  go("quiz");
  ok("quiz : la première question s'affiche", !!view.querySelector('[data-pick="0"]'));
  for (let i = 0; i < l1.quiz.length; i++) {
    const good = view.querySelector('[data-pick="' + l1.quiz[qOrder[i]].a + '"]');
    if (!good) { ok("quiz : question " + (i + 1) + " affichée", false); break; }
    good.click();
    const next = view.querySelector('[data-act="next"]');
    if (!next) { ok("quiz : bouton de passage après la question " + (i + 1), false); break; }
    next.click();
  }
  eq("quiz réussi : score plein", S.scores[1], l1.quiz.length);
  ok("quiz réussi : le jour 1 est marqué fait", S.done.indexOf(1) !== -1);
  eq("quiz réussi : le jour 2 devient le jour courant", S.day, 2);
  /* ⚠️ Ce test disait l'inverse jusqu'au 11/08/2026 : il exigeait que le vocabulaire
     du jour 2 soit chargé en validant le jour 1. Il encodait le défaut signalé par
     Exsangue — on tombait sur des mots jamais vus dès la première carte. Retourné. */
  ok("quiz réussi : le vocabulaire du jour 2 n'entre PAS encore dans le paquet", !S.cards["2:0"]);
  ok("quiz réussi : mais celui du jour 1, qu'on vient de finir, oui", !!S.cards["1:0"]);
  /* ⚠️ Retourné le 18/08/2026 avec le durcissement demandé par Exsangue :
     ouvrir une leçon ne suffit plus, il faut l'avoir TERMINÉE. Un mot survolé
     n'est pas un mot appris. Le test d'avant exigeait l'inverse. */
  go("lesson");
  ok("ouvrir la leçon du jour 2 n'y fait PAS entrer son vocabulaire", !S.cards["2:0"]);

  /* Le nettoyage des paquets abîmés par l'ancien défaut. */
  S = fresh(); S.day = 3; S.done = [1, 2];
  seed(1); seed(2); seed(3);
  S.cards["3:1"].hit = 4;                      // une carte réellement travaillée
  const avant = Object.keys(S.cards).length;
  const retirees = nettoieCartesJamaisVues();
  ok("nettoyage : les mots jamais vus au-delà des étapes faites sont retirés", retirees > 0);
  ok("nettoyage : le vocabulaire des étapes validées est intact", !!S.cards["1:0"] && !!S.cards["2:0"]);
  ok("nettoyage : une carte déjà travaillée est gardée même hors des étapes faites", !!S.cards["3:1"]);
  ok("nettoyage : et les cartes vierges de la même étape sont parties", !S.cards["3:0"]);
  eq("nettoyage : le compte annoncé correspond", Object.keys(S.cards).length, avant - retirees);
  eq("nettoyage : repasser dessus ne retire plus rien", nettoieCartesJamaisVues(), 0);

  S = fresh(); S.day = 1; seed(1);
  go("quiz");
  for (let i = 0; i < l1.quiz.length; i++) {
    const src = l1.quiz[qOrder[i]];
    const wrong = (src.a + 1) % src.o.length;
    view.querySelector('[data-pick="' + wrong + '"]').click();
    view.querySelector('[data-act="next"]').click();
  }
  eq("quiz raté : score nul", S.scores[1], 0);
  ok("quiz raté : le jour n'est pas validé", S.done.indexOf(1) === -1);
  eq("quiz raté : aucun déblocage", S.day, 1);
  ok("quiz raté : aucun bouton « Leçon suivante »", !view.querySelector('[data-lesson="2"]'));

  /* --- G. Le mélange — le défaut trouvé en jouant : sans lui, la bonne
     réponse était TOUJOURS le premier bouton (les 84 questions ont a: 0). --- */
  eq("mélange : autant d'indices que demandé", shuffleIdx(5).length, 5);
  ok("mélange : chaque indice apparaît une fois et une seule",
     (function () {
       for (let n = 1; n <= 6; n++) {
         const a = shuffleIdx(n).slice().sort(function (x, y) { return x - y; });
         for (let i = 0; i < n; i++) if (a[i] !== i) return false;
       }
       return true;
     })());
  ok("mélange : l'ordre change vraiment d'un tirage à l'autre",
     (function () {
       let moved = 0;
       for (let k = 0; k < 200; k++) if (shuffleIdx(4)[0] !== 0) moved++;
       return moved > 20; // ~150 attendus ; 0 trahirait un mélange inerte
     })());

  S = fresh(); S.day = 1; seed(1);
  let firstCount = 0, orderCount = 0;
  const ROUNDS = 40;
  for (let k = 0; k < ROUNDS; k++) {
    /* Il faut 40 parties NEUVES pour juger d'un tirage. Depuis que le quiz
       se reprend, `go("quiz")` seul rejouerait 40 fois la même — le test
       mesurerait alors une partie, et conclurait qu'elle ne varie pas. */
    oublieSeances();
    go("quiz");
    const q0 = l1.quiz[qOrder[0]];
    const btns = view.querySelectorAll(".opts .opt");
    for (let i = 0; i < btns.length; i++) {
      if (Number(btns[i].getAttribute("data-pick")) === q0.a && i === 0) firstCount++;
    }
    if (qOrder[0] === 0) orderCount++;
  }
  ok("quiz : la bonne réponse n'est plus toujours le premier bouton",
     firstCount < ROUNDS, firstCount + " fois en tête sur " + ROUNDS + " parties");
  ok("quiz : l'ordre des questions change d'une partie à l'autre",
     orderCount < ROUNDS, orderCount + " fois la même question en tête sur " + ROUNDS);
  ok("quiz : chaque question est posée une fois et une seule",
     (function () {
       const seen = qOrder.slice().sort(function (a, b) { return a - b; });
       for (let i = 0; i < l1.quiz.length; i++) if (seen[i] !== i) return false;
       return true;
     })());

  S = fresh(); S.day = 1; seed(1);
  go("quiz");
  const qOrdBefore = optOrder("data-pick");
  view.querySelector('[data-pick="' + l1.quiz[qOrder[0]].a + '"]').click();
  eq("quiz : répondre ne remélange pas les réponses", optOrder("data-pick"), qOrdBefore);

  /* --- H. Fin de quiz : les boutons pointent sur le bon jour --- */
  S = fresh(); S.day = 1; seed(1);
  go("quiz");
  for (let i = 0; i < l1.quiz.length; i++) {
    view.querySelector('[data-pick="' + l1.quiz[qOrder[i]].a + '"]').click();
    view.querySelector('[data-act="next"]').click();
  }
  ok("fin de quiz : « Revoir » vise le jour qu'on vient de faire, pas le suivant",
     !!view.querySelector('[data-lesson="1"]'));
  ok("fin de quiz : un bouton « Leçon suivante » est proposé",
     !!view.querySelector('[data-lesson="2"]'));
  const back1 = view.querySelector('[data-lesson="1"]');
  if (back1) {
    back1.click();
    eq("fin de quiz : « Revoir » rouvre bien le jour 1", S.day, 1);
    ok("fin de quiz : et c'est l'écran leçon qui s'affiche", !!view.querySelector(".step-idea"));
  }

  /* --- I. Revenir à la leçon précédente depuis la fin d'une leçon --- */
  S = fresh(); S.day = 2; S.done = [1]; seed(2);
  go("lesson");
  const steps2 = COURSE[1].steps;
  for (let i = 0; i < steps2.length; i++) {
    if (steps2[i].check) {
      const p = view.querySelector('[data-scheck="' + steps2[i].check.a + '"]');
      if (p) p.click();
    }
    const nx = view.querySelector('[data-act="step-next"]');
    if (!nx) break;
    nx.click();
  }
  ok("fin de leçon : le bouton vers le jour précédent est présent",
     !!view.querySelector('[data-lesson="1"]'));
  const prevBtn = view.querySelector('[data-lesson="1"]');
  if (prevBtn) {
    prevBtn.click();
    eq("fin de leçon : il ouvre bien le jour 1", S.day, 1);
  }

  /* --- J. Les écrans --- */
  S = fresh(); S.day = 1; seed(1);
  go("home");
  eq("accueil : un palier par étape du cours", view.querySelectorAll(".palier").length, COURSE.length);
  eq("accueil : les cinq modes sont présents", view.querySelectorAll(".mode").length, 5);
  eq("accueil : la plaque affiche le bon numéro", view.querySelector(".plate .num b").textContent, "1");

  /* ---- Un autre mot peut traduire la même chose ----
     Trouvé par Exsangue le 01/08/2026 : la carte affichait « voici » et
     attendait « das ist ». Il a répondu « hier ist », qui est juste aussi —
     les deux entrées partagent la glose « voici », l'une écrite à la main,
     l'autre venue du livre. */
  (function () {
    /* On FABRIQUE la collision au lieu de compter sur le contenu. Le mot qui
       l'avait révélée — « hier ist » — vient du livre, et la version publiée
       ne l'a pas : le test échouait là-bas alors que le code était bon.
       Un test doit valoir dans les deux versions. */
    const faux = { d: "hier ist", f: "voici", p: "hiir IST" };
    COURSE[0].vocab.push(faux);

    const carte = { d: "das ist", f: "voici, c'est" };
    eq("synonyme : un autre mot traduisant « voici » est reconnu",
       autreTraduction("hier ist", carte), "hier ist");
    ok("synonyme : un mot sans rapport reste refusé",
       autreTraduction("der Hund", carte) === null);
    ok("synonyme : le mot visé lui-même n'est pas proposé comme autre",
       autreTraduction("das ist", carte) === null);

    /* Et le verdict le dit, sinon on croirait avoir visé juste.
       On vise la carte « das ist » explicitement : la laisser au tirage
       rendait le test aléatoire, et il tombait sur « hier ist » elle-même. */
    S = fresh(); S.day = 3; seed(3);
    Object.keys(S.cards).forEach(function (id) { S.cards[id].niv = ECRIT_DE_A; });
    go("cards");
    const idx = deck.map(function (c) { return normDE(c.d); }).indexOf(normDE("das ist"));
    ok("synonyme : la carte « das ist » est bien dans le paquet", idx !== -1);
    if (idx !== -1) {
      pos = idx;
      verdict = null;
      montreCarte();
      document.getElementById("answer").value = "hier ist";
      view.querySelector('[data-act="check-word"]').click();
      ok("synonyme : la réponse est acceptée", verdict && verdict.ok);
      eq("synonyme : et signalée comme une autre traduction", verdict.kind, "autre");
      ok("synonyme : le mot visé est rappelé",
         view.innerHTML.indexOf("Ici on visait") !== -1);
    }

    COURSE[0].vocab.pop();   // on retire la collision fabriquée
    S = fresh(); S.day = 1; seed(1);
  })();

  /* ---- La virgule d'une glose sépare des synonymes ----
     Trouvé par Exsangue le 01/08/2026 sur la carte « das ist », dont la
     traduction est enregistrée « voici, c'est » : taper « voici » était
     refusé alors que c'est juste. */
  ok("glose : le premier synonyme suffit", checkGloss("voici", "voici, c'est").ok);
  ok("glose : le second aussi", checkGloss("c'est", "voici, c'est").ok);
  ok("glose : la réponse complète marche toujours", checkGloss("voici, c'est", "voici, c'est").ok);
  ok("glose : un mot faux reste refusé", !checkGloss("maison", "voici, c'est").ok);
  ok("glose : trois synonymes, n'importe lequel", checkGloss("savoir", "pouvoir, savoir").ok);
  ok("glose : la barre oblique sépare aussi", checkGloss("rapide", "vite / rapide").ok);
  ok("glose : sans virgule, rien ne change", checkGloss("la maison", "la maison").ok);

  /* Le cas exact d'Exsangue : il avait donné les DEUX synonymes, dans l'autre
     ordre et avec un autre séparateur. Compté faux alors que c'était juste
     deux fois plutôt qu'une. */
  ok("glose : les deux synonymes, dans l'autre ordre et avec une barre",
     checkGloss("c'est / voici", "voici, c'est").ok);
  ok("glose : les deux synonymes avec une virgule aussi",
     checkGloss("c'est, voici", "voici, c'est").ok);
  ok("glose : un synonyme juste et un faux passe quand même",
     checkGloss("voici / maison", "voici, c'est").ok);
  ok("glose : et une glose d'un seul mot reste stricte", !checkGloss("chien", "le chat").ok);

  /* Le garde-fou : on ne desserre PAS les exercices du livre, où une réponse
     à deux morceaux les attend vraiment tous les deux. */
  ok("glose : une réponse en deux morceaux reste exigée en entier",
     !checkFR("ich bin", "ich bin, ich habe").ok);

  /* ---- L'oral monte en difficulté ----
     Signalé par Exsangue : une réplique de sept mots tombée en dictée, trop
     dure pour son niveau. Le tirage mélangeait mots isolés et phrases entières
     au hasard. Désormais la longueur est plafonnée, et le plafond monte avec
     le travail déjà fait sur l'étape. */
  (function () {
    const mots = function (t) { return String(t).trim().split(/\s+/).length; };

    S = fresh(); S.day = 2; seed(1);
    let items = oralItems(ORAL_SIZE);
    ok("oral : au départ, rien de plus long que trois mots",
       items.every(function (x) { return mots(x.de) <= 3; }),
       "le plus long : " + Math.max.apply(null, items.map(function (x) { return mots(x.de); })));

    /* La phrase de sept mots qu'Exsangue avait trouvée trop dure tombe sous le
       plafond de trois mots vérifié juste au-dessus : inutile de la citer en
       dur ici. On ne le fait d'ailleurs pas — le script qui produit la version
       publiable refuse de sortir si un morceau du livre traîne encore dans le
       fichier, y compris dans un test. */
    ok("oral : rien qui dépasse le plafond, quelle que soit la séance",
       (function () {
         for (let k = 0; k < 20; k++) {
           const s = oralItems(ORAL_SIZE);
           if (s.some(function (x) { return mots(x.de) > 3; })) return false;
         }
         return true;
       })());

    /* Le plafond monte : une fois des phrases acquises, les longues arrivent.

       ⚠️ Cette vérification portait sur UN SEUL tirage, et elle a lâché deux
       fois sur une dizaine de passages sans que rien ait changé autour.
       C'est normal : la séance tire 8 éléments parmi ~22, et rien ne garantit
       qu'un tirage donné contienne une phrase longue. Le test était donc juste
       sur le fond mais instable sur la forme — et un test qui crie au loup
       une fois sur dix finit par être ignoré, ce qui est pire que pas de test.

       On énonce désormais ce qu'on veut vraiment dire : les phrases longues
       DEVIENNENT possibles. Vingt tirages, comme la vérification voisine.
       Si le plafond ne montait pas, aucun des vingt n'en contiendrait. */
    S = fresh(); S.day = 2; seed(1);
    const l = COURSE[1];
    l.vocab.forEach(function (v, i) { S.oral["v:2:" + i] = 3; });
    l.examples.forEach(function (e, i) { S.oral["p:2:" + i] = 3; });
    ok("oral : une fois l'étape travaillée, les phrases longues arrivent",
       (function () {
         for (let k = 0; k < 20; k++) {
           const s = oralItems(ORAL_SIZE);
           if (s.some(function (x) { return mots(x.de) > 3; })) return true;
         }
         return false;
       })());

    /* Et une séance n'est jamais vide, même si tout dépasse le plafond. */
    S = fresh(); S.day = 2; seed(1);
    ok("oral : la séance n'est jamais vide", oralItems(ORAL_SIZE).length > 0);

    S = fresh(); S.day = 1; seed(1);
  })();

  /* ---- Le parcours guidé ----
     Demandé par Exsangue : après la leçon, on est mené aux exercices, puis aux
     cartes, puis à l'oral, puis au quiz qui débloque l'étape suivante. */
  (function () {
    S = fresh(); S.day = 1; seed(1);

    eq("parcours : après la leçon viennent les exercices", apres("lesson"), "drills");
    eq("parcours : après les exercices, les cartes", apres("drills"), "cards");
    eq("parcours : après les cartes, l'oral", apres("cards"), "oral");
    eq("parcours : après l'oral, le quiz", apres("oral"), "quiz");
    ok("parcours : le quiz ferme la marche", apres("quiz") === null);

    /* Une étape sans exercices écrits ne doit pas ouvrir un écran vide au
       milieu du parcours : on saute au maillon suivant. */
    const vraisDrills = COURSE[0].drills;
    COURSE[0].drills = [];
    eq("parcours : une étape sans exercices saute directement aux cartes",
       apres("lesson"), "cards");
    COURSE[0].drills = vraisDrills;

    /* Chaque écran de fin doit pousser vers la suite. */
    go("drills");
    for (let k = 0; k < 40; k++) {
      const valider = view.querySelector('[data-act="drill-check"]');
      if (!valider) break;
      valider.click();
      const suivant = view.querySelector('[data-act="drill-next"]');
      if (!suivant) break;
      suivant.click();
    }
    /* Le lien passe désormais par le RELAIS : c'est `data-relais` et non
       `data-go` qu'il faut chercher. Le test disait vrai — le chemin a
       changé, pas la destination. */
    ok("parcours : la fin des exercices mène aux cartes",
       !!view.querySelector('[data-relais="cards"]'));

    /* Et l'accueil reste accessible partout : on guide, on n'enferme pas. */
    ok("parcours : l'accueil reste proposé", !!view.querySelector('[data-go="home"]'));

    S = fresh(); S.day = 1; seed(1);
  })();

  /* ---- Le son se lance tout seul, mais jamais quand il donnerait la réponse ----
     Demandé par Exsangue : « dès qu'une carte apparaît, l'audio se lance, pour
     pouvoir le faire sans lire ». Au niveau 1 le mot allemand est déjà à
     l'écran : l'entendre n'apprend rien à personne sur la traduction cherchée.
     Au-dessus, c'est l'allemand qu'on doit écrire — le prononcer avant la
     réponse la soufflerait, donc on attend. */
  (function () {
    S = fresh(); S.day = 1; seed(1);
    go("cards");
    const front = view.querySelector(".face[data-autosay]");
    ok("son : au niveau 0, le mot est prononcé dès l'affichage", !!front);
    if (front) {
      eq("son : et c'est bien le mot allemand", front.getAttribute("data-autosay"), deck[pos].d);
    }

    S = fresh(); S.day = 1; seed(1);
    Object.keys(S.cards).forEach(function (id) { S.cards[id].niv = ECRIT_DE_A; });
    go("cards");
    ok("son : au-dessus du seuil, rien n'est prononcé avant la réponse",
       !view.querySelector(".face[data-autosay]"));

    document.getElementById("answer").value = deck[pos].d;
    view.querySelector('[data-act="check-word"]').click();
    ok("son : mais la solution est prononcée une fois la réponse donnée",
       !!view.querySelector(".face[data-autosay]"));

    // Ce bloc a monté tous les mots au niveau d'écriture : on rend un état
    // neuf aux vérifications suivantes, qui repartent d'un mot de niveau 1.
    S = fresh(); S.day = 1; seed(1);
  })();

  /* ---- « niveau 3 → 4 » sous la correction ----
     Demandé par Exsangue le 18/08/2026 : savoir ce que la réponse vient de
     coûter ou de rapporter, au moment où on la lit.

     ⚠️ CETTE LIGNE PEUT MENTIR SANS QUE RIEN NE PLANTE, et c'est tout l'objet
     de ces tests. Le niveau ne bouge qu'au « Continuer » : elle CALCULE son
     arrivée au lieu de la lire. Si son calcul s'écarte de celui de `grade` —
     une borne oubliée, un signe inversé — elle annoncera un niveau que le mot
     n'atteindra pas, et rien ne le signalera. On vérifie donc systématiquement
     L'ANNONCE **ET** LE RÉSULTAT. */
  (function () {
    function carteA(niv) {
      S = fresh(); S.day = 1; seed(1);
      const id = Object.keys(S.cards)[0];
      Object.keys(S.cards).forEach(function (k) { if (k !== id) delete S.cards[k]; });
      S.cards[id].niv = niv;
      oublieSeances(); deck = []; pos = 0; ancrage = false;
      go("cards");
      return id;
    }
    function repond(juste, id) {
      const c = cardById(id);
      const enDE = S.cards[id].niv >= ECRIT_DE_A;
      document.getElementById("answer").value =
        juste ? (enDE ? c.d : c.f) : "totalement faux et pas une traduction";
      view.querySelector('[data-act="check-word"]').click();
    }
    /* ⚠️ ON LIT DANS LE BANDEAU DE CORRECTION, et c'est le fond du sujet. La
       première version affichait le niveau dans une ligne à part ; ces tests
       passaient, et Exsangue ne voyait rien. Chercher le texte n'importe où
       dans la page les ferait repasser au vert le jour où l'information
       ressortirait du bandeau — donc on vise `.why`, et rien d'autre. */
    function texteWhy() {
      const w = view.querySelector(".why");
      return w ? w.textContent : "(aucun bandeau de correction)";
    }

    let nid = carteA(3);
    repond(true, nid);
    ok("niveau : la montée est annoncée",
       texteWhy().indexOf("Niveau 3 → 4.") !== -1, texteWhy());
    view.querySelector('[data-act="card-next"]').click();
    eq("niveau : et l'annonce disait vrai", S.cards[nid].niv, 4);

    nid = carteA(3);
    repond(false, nid);
    ok("niveau : la descente est annoncée",
       texteWhy().indexOf("Niveau 3 → 2.") !== -1, texteWhy());
    view.querySelector('[data-act="card-next"]').click();
    eq("niveau : et l'annonce disait vrai aussi", S.cards[nid].niv, 2);

    /* Les bornes. Annoncer « 20 → 21 » ou « 0 → -1 » ferait attendre une
       progression qui n'arrive jamais. */
    nid = carteA(NIV_MAX);
    repond(true, nid);
    ok("niveau : au plafond, aucune montée n'est promise",
       texteWhy().indexOf("→") === -1, texteWhy());
    ok("niveau : et le mot est dit ancré", view.innerHTML.indexOf("ancré") !== -1);
    view.querySelector('[data-act="card-next"]').click();
    eq("niveau : le plafond tient", S.cards[nid].niv, NIV_MAX);

    nid = carteA(0);
    repond(false, nid);
    ok("niveau : au plancher, aucune descente n'est promise",
       texteWhy().indexOf("→") === -1, texteWhy());
    view.querySelector('[data-act="card-next"]').click();
    eq("niveau : le plancher tient", S.cards[nid].niv, 0);

    /* Atteindre 20 est l'événement du parcours : il se dit. */
    nid = carteA(NIV_MAX - 1);
    repond(true, nid);
    ok("niveau : la dernière marche annonce l'ancrage",
       view.innerHTML.indexOf("ancré") !== -1);
    view.querySelector('[data-act="card-next"]').click();
    eq("niveau : et le mot est bien ancré", S.cards[nid].niv, ANCRE_A);

    /* ⚠️ L'ENTRAÎNEMENT LIBRE NE TOUCHE À RIEN. Y annoncer un mouvement serait
       le mensonge le plus coûteux de tous : on croirait progresser en révisant. */
    S = fresh(); S.day = 1; seed(1);
    Object.keys(S.cards).forEach(function (k) { S.cards[k].niv = 3; });
    oublieSeances(); deck = []; pos = 0; ancrage = false;
    go("practice");
    const pid = deck[pos].id, pavant = S.cards[pid].niv;
    document.getElementById("answer").value = cardById(pid).d;
    view.querySelector('[data-act="check-word"]').click();
    ok("niveau : l'entraînement libre n'annonce aucun mouvement",
       texteWhy().indexOf("Niveau") === -1, texteWhy());
    view.querySelector('[data-act="card-next"]').click();
    eq("niveau : et n'en produit aucun", S.cards[pid].niv, pavant);

    S = fresh(); S.day = 1; seed(1);
  })();

  /* ---- LES TROIS PALIERS DE LA CARTE DE LEÇON (PLAN-ANCRAGE.md §1) ----
     Posés par Exsangue le 18/08/2026, puis RECTIFIÉS par lui le même jour :
     une première version présentait les deux premiers paliers à l'oreille,
     sans écrire le mot. Ce n'est pas ce qu'il veut — tout est écrit.

       niveau 0-2  le mot est écrit en ALLEMAND → on répond en français
       niveau 3-4  le mot est écrit en FRANÇAIS → on répond en allemand
       niveau 5+   idem, mais le déterminant est EXIGÉ

     ⚠️ Ce sont les paliers de l'ancrage, décidés par la même fonction. Ces
     tests-ci vérifient que l'ÉCRAN DES CARTES les applique vraiment : les
     deux outils partagent le niveau d'un mot, et deux tables de paliers
     feraient qu'un même mot serait demandé de deux façons selon l'écran. */
  (function () {
    function carteAu(niv) {
      S = fresh(); S.day = 1; seed(1);
      const id = Object.keys(S.cards).filter(function (k) {
        return /^(der|die|das) /.test(cardById(k).d);      // un nom, pour l'article
      })[0] || Object.keys(S.cards)[0];
      Object.keys(S.cards).forEach(function (k) { if (k !== id) delete S.cards[k]; });
      S.cards[id].niv = niv;
      oublieSeances();
      go("cards");
      return cardById(id);
    }

    /* Palier 1 — l'allemand est ÉCRIT, on répond en français. */
    let c = carteAu(0);
    eq("palier 1 : le mot allemand est affiché",
       view.querySelector(".face.avant .front").textContent, c.d);
    ok("palier 1 : c'est le français qui est demandé",
       view.innerHTML.indexOf("en français") !== -1);
    ok("palier 1 : la traduction n'est pas dévoilée", !view.querySelector(".face.avant .trad"));
    document.getElementById("answer").value = c.f;
    view.querySelector('[data-act="check-word"]').click();
    ok("palier 1 : la traduction française est acceptée", !!view.querySelector(".why.good"));

    /* Palier 2 — le français est écrit, on répond en allemand, article libre. */
    c = carteAu(ECRIT_DE_A);
    eq("palier 2 : le français est affiché",
       view.querySelector(".face.avant .ask").textContent, c.f);
    ok("palier 2 : l'allemand n'est pas montré", !view.querySelector(".face.avant .sol"));
    ok("palier 2 : rien n'est prononcé avant la réponse",
       !view.querySelector(".face.avant[data-autosay]"));
    document.getElementById("answer").value = c.d.replace(/^(der|die|das) /, "");
    view.querySelector('[data-act="check-word"]').click();
    ok("palier 2 : le mot sans son article est accepté", !!view.querySelector(".why.good"));

    /* Palier 3 — même présentation, mais le déterminant est exigé. C'est la
       SEULE nouveauté par rapport à l'app d'avant. */
    c = carteAu(ARTICLE_A);
    eq("palier 3 : le français est affiché aussi",
       view.querySelector(".face.avant .ask").textContent, c.f);
    document.getElementById("answer").value = c.d.replace(/^(der|die|das) /, "");
    view.querySelector('[data-act="check-word"]').click();
    ok("palier 3 : le mot sans son article est REFUSÉ", !!view.querySelector(".why.bad"));
    ok("palier 3 : et l'app dit que c'est le déterminant qui manque",
       view.innerHTML.indexOf("déterminant") !== -1);

    c = carteAu(ARTICLE_A);
    document.getElementById("answer").value = c.d;
    view.querySelector('[data-act="check-word"]').click();
    ok("palier 3 : avec l'article, c'est juste", !!view.querySelector(".why.good"));

    /* ⚠️ L'ENTRAÎNEMENT LIBRE N'EST PAS UN EXAMEN. Il ne touche pas aux
       niveaux, il ne doit donc pas non plus en appliquer la sévérité : on y
       révise, on n'y est pas jugé. */
    S = fresh(); S.day = 1; seed(1);
    const tid = Object.keys(S.cards).filter(function (k) {
      return /^(der|die|das) /.test(cardById(k).d);
    })[0];
    if (tid) {
      S.cards[tid].niv = ARTICLE_A;
      oublieSeances();
      go("practice");
      const idx = deck.map(function (m) { return m.id; }).indexOf(tid);
      if (idx !== -1) {
        pos = idx; verdict = null; montreCarte();
        document.getElementById("answer").value =
          cardById(tid).d.replace(/^(der|die|das) /, "");
        view.querySelector('[data-act="check-word"]').click();
        ok("entraînement : l'article reste pardonné, même au niveau 5",
           !!view.querySelector(".why.good"));
      }
    }

    S = fresh(); S.day = 1; seed(1);
  })();

  /* Plus aucune carte passive depuis le 01/08/2026 : aux premiers niveaux on
     écrit la traduction française, au-dessus l'allemand. « Révéler / Je
     savais » mesurait la reconnaissance et non le rappel — on croyait savoir
     parce qu'on reconnaissait. */
  go("cards");
  const firstId = deck[0] ? deck[0].id : null;
  ok("cartes : une carte est présentée", !!view.querySelector(".face .front"));
  /* ⚠️ La règle a dû être reformulée le 02/08/2026, quand les cartes se sont
     mises à se retourner. La réponse est DÉSORMAIS dans le HTML dès le
     départ — c'est la condition d'un retournement, on ne peut pas animer un
     remplacement. Ce qui doit rester vrai, c'est qu'elle n'est pas VISIBLE :
     elle vit sur la face arrière, et la carte n'est pas retournée.
     Vérifier son absence du document serait devenu un test de la mécanique,
     pas de ce qu'on voit. */
  ok("cartes : la traduction n'est pas montrée au départ",
     !view.querySelector(".face.avant .trad") && !view.querySelector(".carte-i.retourne"));
  ok("cartes : plus aucun bouton « Révéler »", !view.querySelector('[data-act="reveal"]'));
  ok("cartes : au niveau 1, il faut écrire", !!view.querySelector("#answer"));
  ok("cartes : et c'est le français qui est demandé",
     view.innerHTML.indexOf("en français") !== -1);
  ok("cartes : le mot allemand est écoutable avant de répondre",
     !!view.querySelector(".face [data-say]"));

  /* Une traduction française juste, écrite avec l'indulgence de checkFR. */
  document.getElementById("answer").value = deck[0].f.toUpperCase();
  view.querySelector('[data-act="check-word"]').click();
  ok("cartes : au niveau 1, la casse est pardonnée", verdict && verdict.ok);
  ok("cartes : la traduction s'affiche après la réponse", !!view.querySelector(".face .trad"));
  ok("cartes : et la prononciation aussi", !!view.querySelector(".face .p"));

  /* `oublieSeances` d'abord : depuis que les séances se reprennent, un simple
     `go("cards")` retomberait sur l'écran de correction laissé juste au-dessus.
     Ce test-ci veut mesurer un paquet NEUF, il doit donc le demander. */
  oublieSeances();
  go("cards");
  const sizeBefore = deck.length;
  document.getElementById("answer").value = "n'importe quoi du tout";
  view.querySelector('[data-act="check-word"]').click();
  view.querySelector('[data-act="card-next"]').click();
  eq("cartes : une carte ratée est remise dans le paquet", deck.length, sizeBefore + 1);
  eq("cartes : au niveau 0, elle ne peut pas descendre plus bas", S.cards[firstId].niv, 0);

  /* Au-dessus du seuil, c'est l'allemand qu'on écrit — et il est jugé au mot près. */
  S = fresh(); S.day = 1; seed(1);
  Object.keys(S.cards).forEach(function (id) { S.cards[id].niv = ECRIT_DE_A; });
  go("cards");
  ok("cartes : au-dessus du seuil, c'est l'allemand qui est demandé",
     view.innerHTML.indexOf("en allemand") !== -1);
  document.getElementById("answer").value = deck[0].f;
  view.querySelector('[data-act="check-word"]').click();
  ok("cartes : y répondre en français est refusé", verdict && !verdict.ok);

  /* --- L. Le journal des erreurs --- */
  S = fresh(); S.day = 1; seed(1);
  const jid = "1:0";
  eq("journal : un mot neuf part de zéro", (S.cards[jid].hit || 0) + (S.cards[jid].miss || 0), 0);
  eq("journal : un mot jamais révisé est à mi-chemin", weakness(jid), 0.5);
  grade(jid, false);
  eq("journal : une erreur est comptée", S.cards[jid].miss, 1);
  eq("journal : et la fragilité monte à 1", weakness(jid), 1);
  grade(jid, true); grade(jid, true); grade(jid, true);
  eq("journal : trois réussites plus tard, une erreur sur quatre", weakness(jid), 0.25);
  eq("journal : les réussites sont comptées aussi", S.cards[jid].hit, 3);

  S = fresh(); S.day = 1; seed(1);
  go("quiz");
  const badSrc = qOrder[0];
  const badOpt = (l1.quiz[badSrc].a + 1) % l1.quiz[badSrc].o.length;
  view.querySelector('[data-pick="' + badOpt + '"]').click();
  eq("journal : la question de quiz ratée est enregistrée", S.qmiss["1:" + badSrc], 1);

  /* --- M. L'entraînement libre ne dérègle pas le calendrier --- */
  S = fresh(); S.day = 1; seed(1);
  const tid = "1:0";
  S.cards[tid].niv = 3;

  grade(tid, true, false);
  eq("entraînement : le niveau ne bouge pas", S.cards[tid].niv, 3);
  ok("entraînement : et aucune date n'apparaît", S.cards[tid].due === undefined);
  eq("entraînement : mais la réponse est notée", S.cards[tid].hit, 1);

  /* Le mot le plus raté doit ressortir à tous les coups. */
  S = fresh(); S.day = 1; seed(1);
  Object.keys(S.cards).forEach(function (id) { grade(id, true, false); grade(id, true, false); });
  grade("1:3", false, false); grade("1:3", false, false); grade("1:3", false, false);
  ok("entraînement : le mot le plus raté est repris à chaque fois",
     (function () {
       for (let k = 0; k < 25; k++) {
         const has = practiceCards(4).some(function (c) { return c.id === "1:3"; });
         if (!has) return false;
       }
       return true;
     })());
  eq("entraînement : on obtient bien le nombre de cartes demandé", practiceCards(4).length, 4);
  ok("entraînement : la liste varie d'une séance à l'autre",
     (function () {
       const ref = practiceCards(4).map(function (c) { return c.id; }).join(",");
       for (let k = 0; k < 40; k++) {
         if (practiceCards(4).map(function (c) { return c.id; }).join(",") !== ref) return true;
       }
       return false;
     })());

  /* ================= L'ANCRAGE (PLAN-ANCRAGE.md §2) =================
     Conçu avec Exsangue le 18/08/2026. Ce qui est vérifié ici n'est pas
     « l'écran s'affiche » mais les règles qui le rendent honnête : la boucle,
     le retrait à 20, le filet, et les deux écrans vides qui disent l'inverse
     l'un de l'autre. */
  (function () {
    // Un stock large : plusieurs étapes semées, tous les mots à zéro.
    function stockDe(nEtapes) {
      S = fresh();
      for (let d = 1; d <= nEtapes; d++) { S.done.push(d); seed(d); }
      S.day = nEtapes;
      oublieSeances(); deck = []; pos = 0; ancrage = false;
    }

    /* --- La boucle --- */
    stockDe(6);
    const total = Object.keys(S.cards).length;
    ok("ancrage : le stock est assez grand pour le test", total > BOUCLE_MOTS,
       "mots : " + total);

    const b1 = tireBoucle();
    eq("ancrage : une boucle fait 50 mots", b1.length, BOUCLE_MOTS);
    eq("ancrage : tous différents à l'intérieur d'une boucle",
       Object.keys(b1.reduce(function (acc, m) { acc[m.id] = 1; return acc; }, {})).length,
       BOUCLE_MOTS);

    /* Le hasard est REEL d'une boucle à l'autre : deux tirages de suite ne
       doivent pas donner la même liste. On tolère la coïncidence en réessayant
       — sinon le test lui-même serait aléatoire. */
    ok("ancrage : deux boucles ne sont pas identiques", (function () {
      const a = tireBoucle().map(function (m) { return m.id; }).join(",");
      for (let k = 0; k < 20; k++) {
        if (tireBoucle().map(function (m) { return m.id; }).join(",") !== a) return true;
      }
      return false;
    })());

    /* Et un mot PEUT retomber d'une boucle à l'autre — c'est le hasard pur
       qu'Exsangue a choisi, pas une rotation. Le vérifier évite qu'on
       « corrige » un jour en croyant à un doublon. */
    ok("ancrage : un mot peut revenir d'une boucle à la suivante", (function () {
      const a = {}; tireBoucle().forEach(function (m) { a[m.id] = 1; });
      for (let k = 0; k < 30; k++) {
        if (tireBoucle().some(function (m) { return a[m.id]; })) return true;
      }
      return false;
    })());

    /* --- Le stock est plus petit que la boucle --- */
    stockDe(1);
    const petit = Object.keys(S.cards).length;
    ok("ancrage : l'étape 1 fait moins de 50 mots", petit < BOUCLE_MOTS, "mots : " + petit);
    eq("ancrage : la boucle fait alors ce qu'il y a", tireBoucle().length, petit);

    /* --- Le retrait à 20 --- */
    stockDe(2);
    const unId = Object.keys(S.cards)[0];
    S.cards[unId].niv = ANCRE_A;
    ok("ancrage : un mot à 20 sort du stock", stockAncrage().indexOf(unId) === -1);
    ok("ancrage : et rejoint les ancrés", motsAncres().indexOf(unId) !== -1);
    eq("ancrage : il compte comme ancré", ancreCount(), 1);

    /* Un ancré raté retombe à 19 et REVIENT dans le stock. C'est tout l'objet
       du filet : sans ce retour, le rattraper ne servirait à rien. */
    grade(unId, false, true);
    eq("ancrage : un ancré raté retombe à 19", S.cards[unId].niv, ANCRE_A - 1);
    ok("ancrage : et réintègre le stock", stockAncrage().indexOf(unId) !== -1);

    /* --- Le filet à 2 % --- */
    stockDe(3);
    Object.keys(S.cards).forEach(function (id, i) {
      if (i % 2 === 0) S.cards[id].niv = ANCRE_A;      // la moitié ancrée
    });
    ok("ancrage : le filet ramène parfois un mot ancré", (function () {
      for (let k = 0; k < 60; k++) {
        if (tireBoucle().some(function (m) { return S.cards[m.id].niv >= ANCRE_A; })) return true;
      }
      return false;
    })());
    /* Mais RAREMENT : un filet qui rendrait la moitié des mots déjà sus ferait
       perdre son temps. Sur un gros échantillon, la part doit rester basse
       alors même que la moitié du vocabulaire est ancrée. */
    ok("ancrage : mais il reste rare", (function () {
      let ancres = 0, vus = 0;
      for (let k = 0; k < 20; k++) {
        tireBoucle().forEach(function (m) {
          vus++; if (S.cards[m.id].niv >= ANCRE_A) ancres++;
        });
      }
      return vus > 0 && ancres / vus < 0.25;
    })());

    /* ---- LA MAJUSCULE, À PARTIR DU NIVEAU 8 ----
       Demandé par Exsangue le 18/08/2026. Vraie règle d'allemand : tout nom
       commun en porte une, et l'oublier est la faute la plus visible à
       l'écrit. Elle arrive tard exprès — exiger la casse d'un mot qu'on ne
       sait pas encore écrire n'apprendrait rien. */
    (function () {
      S = fresh(); S.done = [1]; seed(1); S.day = 1;
      const nomId = Object.keys(S.cards).filter(function (id) {
        return /^(der|die|das) [A-ZÄÖÜ]/.test(cardById(id).d);
      })[0];
      ok("majuscule : le cours a bien un nom pour ce test", !!nomId);
      if (!nomId) return;
      const nom = cardById(nomId);
      const sansMaj = nom.d.toLowerCase();

      S.cards[nomId].niv = MAJUSCULE_A - 1;
      ok("majuscule : au niveau 7, la casse est encore pardonnée",
         jugeAncrage(nom, sansMaj).ok, sansMaj + " vs " + nom.d);

      S.cards[nomId].niv = MAJUSCULE_A;
      ok("majuscule : au niveau 8, elle ne l'est plus", !jugeAncrage(nom, sansMaj).ok);
      eq("majuscule : et l'erreur est nommée", jugeAncrage(nom, sansMaj).kind, "majuscule");
      ok("majuscule : la bonne casse passe", jugeAncrage(nom, nom.d).ok);

      /* ⚠️ ON NE PARLE DE CASSE QUE SI LE MOT EST LE BON. Sur une réponse
         franchement fausse, « attention à la majuscule » masquerait la vraie
         erreur et enverrait chercher au mauvais endroit. */
      eq("majuscule : sur un mot faux, ce n'est pas la casse qu'on reproche",
         jugeAncrage(nom, "der Quatschkopf").kind === "majuscule", false);

      /* Les tolérances d'écriture RESTENT : le clavier sans tréma et le ss
         pour ß ne sont pas des fautes de casse. Les confondre ferait échouer
         quelqu'un qui a tout bon, pour un clavier. */
      const tremaId = Object.keys(S.cards).filter(function (id) {
        return /[äöüßÄÖÜ]/.test(cardById(id).d);
      })[0];
      if (tremaId) {
        const t = cardById(tremaId);
        S.cards[tremaId].niv = MAJUSCULE_A;
        const sansTrema = t.d.replace(/ä/g, "ae").replace(/ö/g, "oe")
                             .replace(/ü/g, "ue").replace(/ß/g, "ss");
        ok("majuscule : le tréma tapé « ae » reste accepté au niveau 8",
           jugeAncrage(t, sansTrema).ok, sansTrema + " vs " + t.d);
      }

      /* ⚠️ LA FAUTE VA DANS LES DEUX SENS. Signalé par Exsangue sur
         `sportlich` : mettre une majuscule à un adjectif est une faute AUSSI,
         et lui répondre « tout nom commun prend une majuscule » serait un
         contresens — la correction est exactement l'inverse. La règle
         allemande est une frontière : les noms en prennent une, TOUT LE RESTE
         non. Dire la moitié qui ne s'applique pas apprendrait le contraire. */
      const adjId = Object.keys(S.cards).filter(function (id) {
        const d = cardById(id).d;
        return /^[a-zäöü]/.test(d) && !/\s/.test(d);        // un mot seul, en minuscule
      })[0];
      ok("majuscule : le cours a bien un mot sans majuscule pour ce test", !!adjId);
      if (adjId) {
        const adj = cardById(adjId);
        S.cards[adjId].niv = MAJUSCULE_A;
        ok("majuscule : une majuscule EN TROP est une faute aussi",
           !jugeAncrage(adj, adj.d.charAt(0).toUpperCase() + adj.d.slice(1)).ok,
           adj.d);
        eq("majuscule : et c'est la même erreur nommée",
           jugeAncrage(adj, adj.d.charAt(0).toUpperCase() + adj.d.slice(1)).kind,
           "majuscule");
        ok("majuscule : la minuscule passe", jugeAncrage(adj, adj.d).ok);
      }
      ok("majuscule : le cours sait qui attend une majuscule", attendMajuscule("das Haus"));
      ok("majuscule : l'article ne décide pas à la place du nom",
         attendMajuscule("die Tasche"));
      eq("majuscule : et un adjectif n'en attend pas", attendMajuscule("sportlich"), false);

      /* La règle vaut aussi sur l'écran des cartes — même correcteur. */
      const cid = nomId;
      S.cards[cid].niv = MAJUSCULE_A;
      Object.keys(S.cards).forEach(function (k) { if (k !== cid) delete S.cards[k]; });
      oublieSeances(); deck = []; pos = 0; ancrage = false;
      go("cards");
      document.getElementById("answer").value = sansMaj;
      view.querySelector('[data-act="check-word"]').click();
      ok("majuscule : les cartes appliquent la règle elles aussi",
         !!view.querySelector(".why.bad"));
      ok("majuscule : et l'app enseigne la règle, pas seulement la faute",
         view.innerHTML.indexOf("nom commun") !== -1);

      /* ⚠️ ET LE MESSAGE DOIT SUIVRE LE SENS DE LA FAUTE. Ce test-ci existe
         parce qu'il manquait : vérifier `attendMajuscule()` et `jugeAncrage()`
         ne dit rien de ce qui S'AFFICHE, et on peut donc refuser correctement
         un mot tout en expliquant l'inverse de la règle. Contrôlé en forçant
         le message des noms sur tout : sans ce test, rien ne tombait. */
      if (adjId) {
        S = fresh(); S.done = [1]; seed(1); S.day = 1;
        Object.keys(S.cards).forEach(function (k) { if (k !== adjId) delete S.cards[k]; });
        S.cards[adjId].niv = MAJUSCULE_A;
        oublieSeances(); deck = []; pos = 0; ancrage = false;
        go("cards");
        const mot = cardById(adjId);
        document.getElementById("answer").value =
          mot.d.charAt(0).toUpperCase() + mot.d.slice(1);
        view.querySelector('[data-act="check-word"]').click();
        ok("majuscule : sur un mot qui n'est pas un nom, la faute est signalée",
           !!view.querySelector(".why.bad"), mot.d);
        ok("majuscule : et le message dit la BONNE moitié de la règle",
           view.innerHTML.indexOf("seuls les noms") !== -1,
           view.querySelector(".why") ? view.querySelector(".why").textContent : "");
        ok("majuscule : sans réclamer une majuscule qu'il ne faut pas mettre",
           view.innerHTML.indexOf("tout nom commun prend") === -1);
      }

      S = fresh(); S.day = 1; seed(1);
    })();

    /* --- Les paliers --- */
    eq("paliers : au niveau 0, on écrit le français", modeAncrage(0), "vers-fr");
    eq("paliers : au niveau 2 encore", modeAncrage(2), "vers-fr");
    eq("paliers : au niveau 3, on passe à l'allemand", modeAncrage(3), "vers-de");
    eq("paliers : au niveau 4 aussi", modeAncrage(4), "vers-de");
    eq("paliers : au niveau 5, le déterminant devient obligatoire",
       modeAncrage(5), "vers-de-strict");
    eq("paliers : et ça ne redescend plus", modeAncrage(NIV_MAX), "vers-de-strict");

    /* --- Le déterminant, palier par palier --- */
    stockDe(1);
    const nomId = Object.keys(S.cards).filter(function (id) {
      return /^(der|die|das) /.test(cardById(id).d);
    })[0];
    ok("ancrage : le cours a bien un nom avec article pour ce test", !!nomId);
    if (nomId) {
      const nom = cardById(nomId);
      const sansArticle = nom.d.replace(/^(der|die|das) /, "");

      S.cards[nomId].niv = 3;
      ok("déterminant : facultatif au niveau 3", jugeAncrage(nom, sansArticle).ok);
      ok("déterminant : le bon article passe aussi", jugeAncrage(nom, nom.d).ok);

      S.cards[nomId].niv = ARTICLE_A;
      ok("déterminant : obligatoire au niveau 5", !jugeAncrage(nom, sansArticle).ok);
      eq("déterminant : et l'erreur est nommée",
         jugeAncrage(nom, sansArticle).kind, "article-manquant");
      ok("déterminant : avec l'article, c'est juste", jugeAncrage(nom, nom.d).ok);

      /* ⚠️ La règle ne doit mordre QUE sur les mots qui ont un article. Un
         adjectif n'en a pas : exiger un déterminant sur « grün » rendrait le
         niveau 5 impossible à passer sur la moitié du vocabulaire. */
      const adjId = Object.keys(S.cards).filter(function (id) {
        return !/^(der|die|das) /.test(cardById(id).d);
      })[0];
      if (adjId) {
        S.cards[adjId].niv = ARTICLE_A;
        ok("déterminant : un mot sans article reste jugeable au niveau 5",
           jugeAncrage(cardById(adjId), cardById(adjId).d).ok);
      }
    }

    /* --- Les deux écrans vides, qui disent l'inverse l'un de l'autre --- */
    S = fresh(); oublieSeances(); deck = []; pos = 0; ancrage = false;   // rien de terminé
    go("ancrage");
    ok("vide : sans leçon terminée, l'écran explique comment le remplir",
       view.innerHTML.indexOf("terminé") !== -1);
    ok("vide : et renvoie à la leçon plutôt qu'à un cul-de-sac",
       !!view.querySelector('[data-go="lesson"]'));

    stockDe(1);
    Object.keys(S.cards).forEach(function (id) { S.cards[id].niv = ANCRE_A; });
    go("ancrage");
    ok("vide : tout ancré, l'écran le dit",
       view.innerHTML.indexOf("ancrés") !== -1);
    ok("vide : et propose de continuer quand même",
       !!view.querySelector('[data-act="ancr-boucle"]'));
    ok("vide : sans confondre avec « rien de terminé »",
       view.innerHTML.indexOf("Aller à la leçon") === -1);

    /* ---- L'ANCRAGE A LE MÊME DESSIN QUE LES CARTES ----
       Demandé par Exsangue le 18/08/2026 après avoir vu la première version,
       qui redessinait son propre écran : « l'ancrage doit avoir le même design
       que les cartes, c'était vraiment cool et instinctif ». Ce n'est pas une
       préférence de goût qu'on peut laisser dériver — deux écrans qui se
       ressemblent sans partager leur code divergent à la première retouche.
       Ces tests-ci verrouillent le PARTAGE, pas l'apparence. */
    stockDe(3);
    go("ancrage");
    ok("dessin : l'ancrage sert une carte à deux faces, comme les cartes",
       !!view.querySelector(".carte3d .face.avant") &&
       !!view.querySelector(".carte3d .face.arriere"));
    ok("dessin : avec la jauge d'avancement", !!view.querySelector(".meter"));
    ok("dessin : et les mêmes gestes que les cartes, pas des gestes à lui",
       !!view.querySelector('[data-act="check-word"]') &&
       !!view.querySelector('[data-act="dunno"]'));
    ok("dessin : l'ancrage passe bien par le paquet commun", ancrage === true);

    /* ⚠️ LA MOITIÉ DU DESSIN N'EST PAS DANS LE HTML. `body.plein` donne à la
       carte sa hauteur, donc sa FORME : sans lui elle s'effondre et l'écran
       ne ressemble plus à des cartes, quand bien même le HTML serait
       rigoureusement le même. C'est ce qui s'est produit le 18/08/2026 —
       j'avais fusionné les vues et conclu que le dessin suivait, alors que
       `go()` porte une liste de noms d'écrans que j'avais laissée derrière.
       Exsangue a vu un écran plat là où le code disait « c'est la même vue ».

       Ce test balaie la liste au lieu de nommer l'ancrage : le prochain écran
       à cartes sera couvert sans que personne y pense. */
    ECRANS_CARTES.forEach(function (ecran) {
      go(ecran);
      ok("dessin : « " + ecran + " » reçoit body.plein, qui donne sa forme à la carte",
         document.body.classList.contains("plein"));
    });
    ok("dessin : et l'ancrage est bien dans cette liste",
       ECRANS_CARTES.indexOf("ancrage") !== -1);
    /* L'inverse compte autant : un écran sans carte ne doit pas être bloqué en
       pleine hauteur, sinon il ne défile plus. */
    go("home");
    ok("dessin : un écran sans carte ne prend pas body.plein",
       !document.body.classList.contains("plein"));

    stockDe(3);
    go("ancrage");

    /* --- Le parcours réel, bout en bout --- */
    ok("ancrage : l'écran s'ouvre sur un mot", !!document.getElementById("answer"));
    const premier = deck[pos], nivAvant = S.cards[premier.id].niv;
    document.getElementById("answer").value = premier.f;      // niveau 0 : le français
    view.querySelector('[data-act="check-word"]').click();
    ok("ancrage : la bonne réponse est acceptée", !!view.querySelector(".why.good"));
    /* ⚠️ Le niveau bouge au « Continuer », pas au « Vérifier » — c'est le
       rythme des cartes, hérité avec leur écran. La première version de
       l'ancrage notait dès la vérification ; ce test disait donc l'inverse. */
    view.querySelector('[data-act="card-next"]').click();
    eq("ancrage : et le mot monte d'un niveau", S.cards[premier.id].niv, nivAvant + 1);
    eq("ancrage : on passe au mot suivant", pos, 1);

    /* ⚠️ RIEN NE REPASSE DANS UNE BOUCLE. Ni le mot raté, ni celui qui vient de
       monter d'un cran — les cartes de leçon font les deux, l'ancrage aucun.
       C'est LA différence de comportement entre les deux écrans, et donc celle
       que la fusion des vues pouvait effacer sans bruit. */
    const rate = deck[pos];
    S.cards[rate.id].niv = 4;
    const tailleAvant = deck.length;
    show(renderCard());
    document.getElementById("answer").value = "n'importe quoi du tout";
    view.querySelector('[data-act="check-word"]').click();
    view.querySelector('[data-act="card-next"]').click();
    eq("ancrage : un mot raté perd un niveau", S.cards[rate.id].niv, 3);
    eq("ancrage : et la boucle ne s'allonge pas", deck.length, tailleAvant);
    ok("ancrage : le mot raté n'est pas reprogrammé",
       deck.slice(pos).every(function (m) { return m.id !== rate.id; }));

    /* Un mot de bas niveau ne repasse pas non plus, alors qu'il le ferait
       dans les cartes de leçon. */
    const bas = deck[pos];
    S.cards[bas.id].niv = 0;
    const avantBas = deck.length;
    show(renderCard());
    document.getElementById("answer").value = bas.f;
    view.querySelector('[data-act="check-word"]').click();
    view.querySelector('[data-act="card-next"]').click();
    eq("ancrage : un mot qui monte ne repasse pas non plus", deck.length, avantBas);

    /* Le niveau reste borné même en enchaînant les réponses. */
    const borneId = deck[0].id;
    for (let k = 0; k < 40; k++) grade(borneId, true, true);
    eq("ancrage : le niveau ne dépasse jamais 20", S.cards[borneId].niv, NIV_MAX);
    for (let k = 0; k < 40; k++) grade(borneId, false, true);
    eq("ancrage : et ne descend jamais sous 0", S.cards[borneId].niv, 0);

    /* --- La boucle finie propose la suivante, pas la leçon --- */
    stockDe(2);
    go("ancrage");
    pos = deck.length;
    show(renderCard());
    ok("boucle finie : on peut en relancer une",
       !!view.querySelector('[data-act="ancr-boucle"]'));
    ok("boucle finie : et le bilan dit combien de mots sont ancrés",
       view.innerHTML.indexOf("Ancrés") !== -1);
    view.querySelector('[data-act="ancr-boucle"]').click();
    ok("boucle finie : relancer redonne un mot à travailler",
       !!document.getElementById("answer"));
    eq("boucle finie : et on repart du début", pos, 0);
  })();

  /* --- N. Le paquet de cartes : ordre, relances, plafond --- */
  S = fresh(); S.day = 1; seed(1);
  ok("cartes : l'ordre du paquet change d'une session à l'autre",
     (function () {
       const first = cartesLecon()[0].id;
       for (let k = 0; k < 40; k++) if (cartesLecon()[0].id !== first) return true;
       return false;
     })());

  S = fresh(); S.day = 1; seed(1);
  grade("1:8", true, false); grade("1:9", true, false);   // deux mots désormais « sus »
  go("cards");
  const beforeMiss = deck.length;
  view.querySelector('[data-act="dunno"]').click();
  view.querySelector('[data-act="card-next"]').click();
  /* ⚠️ Ce test disait « accompagné d'un mot déjà su » et attendait +2 jusqu'au
     18/08/2026. Retourné à la demande d'Exsangue : chaque faute coûtait DEUX
     cartes, donc un mauvais jour gonflait le paquet, ce qui produisait
     d'autres fautes. La sanction d'un échec est le niveau perdu, pas du
     travail en plus. */
  eq("cartes : un mot raté repasse SEUL, sans carte ajoutée", deck.length, beforeMiss + 1);

  S = fresh(); S.day = 1; seed(1);
  go("cards");
  const cap = deckCap;
  for (let k = 0; k < 80; k++) {
    const abandon = view.querySelector('[data-act="dunno"]');
    if (!abandon) break;
    abandon.click();
    const suite = view.querySelector('[data-act="card-next"]');
    if (!suite) break;
    suite.click();
  }
  ok("cartes : rater en boucle ne produit pas un paquet sans fin",
     deck.length <= cap, "paquet " + deck.length + " pour un plafond de " + cap);

  /* --- O. Les deux paquets vides, qui ne disent pas la même chose ---
     Réécrit le 18/08/2026. Le cas « rien à réviser aujourd'hui » venait des
     dates, qui n'existent plus. Ce qui reste, et qui compte davantage : un
     débutant n'a AUCUNE carte tant qu'il n'a pas fini une leçon, et l'envoyer
     vers l'entraînement libre — vide lui aussi — serait un cul-de-sac. */
  S = fresh(); S.day = 1;                 // rien de terminé, donc aucune carte
  go("home");
  eq("accueil : sans leçon terminée, aucune carte", cartesLecon().length, 0);
  ok("accueil : la tuile renvoie à la leçon, pas à l'entraînement vide",
     !!view.querySelector('.mode[data-go="lesson"]') &&
     !view.querySelector('.mode[data-go="practice"]'));
  ok("accueil : et elle explique pourquoi",
     view.innerHTML.indexOf("Termine une leçon") !== -1);

  S = fresh(); S.day = 1; seed(1);
  go("home");
  ok("accueil : dès qu'une leçon est finie, les cartes sont proposées",
     !!view.querySelector('.mode[data-go="cards"]'));
  ok("accueil : et le bouton n'est pas grisé", !view.querySelector(".mode[disabled]"));

  /* ---- Les cartes ne montrent QUE la leçon en cours ----
     Posé par Exsangue le 18/08/2026. « En cours » a deux sens selon qu'on
     avance ou qu'on rejoue, et les deux doivent tomber juste. */
  (function () {
    // Parcours normal : on vient de finir la 2, S.day pointe déjà la 3.
    S = fresh(); S.done = [1, 2]; seed(1); seed(2); S.day = 3;
    const paquet = cartesLecon();
    eq("cartes : le paquet fait la taille de la leçon terminée",
       paquet.length, COURSE[1].vocab.length);
    ok("cartes : QUE des mots de l'étape 2 — ni avant, ni après",
       paquet.every(function (c) { return c.day === 2; }),
       paquet.map(function (c) { return c.day; }).join(","));

    /* Rejeu. Choisir l'étape 1 sur le chemin fait S.day = 1 : c'est ELLE que
       les cartes doivent servir, pas la 2 qui est pourtant la plus avancée.
       C'est le cas que la première version ratait. */
    S.day = 1;
    const rejeu = cartesLecon();
    ok("cartes : en rejouant une vieille étape, ce sont SES mots",
       rejeu.length > 0 && rejeu.every(function (c) { return c.day === 1; }),
       rejeu.map(function (c) { return c.day; }).join(","));

    /* Et le repli : une étape sans cartes ne doit pas vider l'écran. */
    S.day = 3;
    ok("cartes : une étape non terminée retombe sur la dernière qui a des mots",
       cartesLecon().every(function (c) { return c.day === 2; }));
  })();

  S = fresh(); S.day = 1; S.done = [1]; seed(1);
  go("home");
  ok("accueil : jour terminé, on peut enchaîner sur le suivant",
     !!view.querySelector('[data-lesson="2"]'));

  S = fresh(); S.day = 1; seed(1);
  go("practice");
  ok("entraînement : l'écran s'ouvre sur une carte", !!view.querySelector(".face .front"));
  const pNiv = S.cards[deck[0].id].niv, pId = deck[0].id;
  document.getElementById("answer").value = deck[0].f;
  view.querySelector('[data-act="check-word"]').click();
  view.querySelector('[data-act="card-next"]').click();
  eq("entraînement : depuis l'écran, le niveau reste inchangé", S.cards[pId].niv, pNiv);
  ok("entraînement : et aucune date n'apparaît", S.cards[pId].due === undefined);

  /* --- Q. Écrire la réponse, à partir du niveau 3 --- */
  ok("saisie : la casse est ignorée", checkAnswer("hallo", "Hallo").ok);
  ok("saisie : les espaces en trop sont ignorés", checkAnswer("  das Wort  ", "das Wort").ok);
  ok("saisie : ae remplace ä quand le clavier ne l'a pas", checkAnswer("Maedchen", "Mädchen").ok);
  ok("saisie : ss remplace ß", checkAnswer("Strasse", "Straße").ok);
  ok("saisie : le vrai ä est accepté aussi", checkAnswer("Mädchen", "Mädchen").ok);
  ok("saisie : l'article oublié ne fait pas échouer", checkAnswer("Wort", "das Wort").ok);
  eq("saisie : mais il est rappelé", checkAnswer("Wort", "das Wort").kind, "no-article");
  ok("saisie : un mauvais genre est une erreur", !checkAnswer("der Wort", "das Wort").ok);
  eq("saisie : et il est nommé comme tel", checkAnswer("der Wort", "das Wort").kind, "bad-article");
  ok("saisie : le bon genre passe", checkAnswer("das Wort", "das Wort").ok);
  ok("saisie : un autre mot est une erreur", !checkAnswer("Haus", "das Wort").ok);
  ok("saisie : une réponse vide est une erreur", !checkAnswer("   ", "Hallo").ok);

  /* ---- §2.5 · Un article AJOUTÉ ne passe plus en fraude ----
     La tolérance était à l'envers : oublier l'article passait (voulu), en
     mettre un faux quand la réponse en attend un était refusé (voulu), mais
     en ajouter un là où la réponse n'en attend AUCUN passait toujours —
     *das Hund* compris. Sur une app dont l'argument est « strict sur le
     genre », c'était la mauvaise direction.

     ⚠️ Refuser à l'aveugle aurait été faux dans l'autre sens : *der Bär* est
     de l'allemand correct même si l'exercice ne demande que *Bär*, et le
     cours compte 118 réponses de cette forme. On ne juge donc QUE ce que le
     cours sait. */
  ok("saisie : un article ajouté avec le bon genre passe",
     checkAnswer("das Haus", "Haus").ok);
  eq("saisie : et il est nommé pour ce qu'il est",
     checkAnswer("das Haus", "Haus").kind, "article-en-plus");
  ok("saisie : un article ajouté au MAUVAIS genre est refusé",
     !checkAnswer("der Haus", "Haus").ok);
  eq("saisie : et c'est bien une faute de genre",
     checkAnswer("der Haus", "Haus").kind, "bad-article");
  ok("saisie : vrai aussi sur un nom à tréma", !checkAnswer("das Bär", "Bär").ok);
  ok("saisie : le nom seul reste évidemment juste", checkAnswer("Haus", "Haus").ok);

  /* ⚠️ LA LIMITE, ASSUMÉE ET VÉRIFIÉE : un nom que le cours ne connaît pas ne
     se juge pas. Deviner un genre serait inventer une correction — c'est la
     règle « ne jamais inventer une conjugaison » appliquée aux articles. */
  ok("saisie : un nom inconnu du cours ne se juge pas",
     checkAnswer("der Trumpelbolz", "Trumpelbolz").ok);
  eq("saisie : le cours connaît le genre de ses noms", genreConnu("haus"), "das");
  eq("saisie : et avoue quand il ne le connaît pas", genreConnu("trumpelbolz"), null);

  /* L'index sort du vocabulaire du cours, jamais d'une liste recopiée : il
     doit donc contenir de quoi juger. Une liste vide ferait passer tous les
     tests « on ne devine pas » ci-dessus sans rien corriger du tout. */
  ok("saisie : l'index des genres n'est pas vide",
     Object.keys(genreConnu.index || {}).length > 20,
     "connus : " + Object.keys(genreConnu.index || {}).length);

  /* Et les trois comportements d'origine, qui ne doivent RIEN perdre. */
  eq("saisie : l'oubli reste pardonné", checkAnswer("Wort", "das Wort").kind, "no-article");
  eq("saisie : le faux genre reste refusé", checkAnswer("der Wort", "das Wort").kind, "bad-article");
  ok("saisie : la réponse exacte reste exacte", checkAnswer("das Wort", "das Wort").ok);

  /* Signalé par Exsangue : « sprechen » était refusé parce que le vocabulaire
     dit « sprechen (du sprichst) ». La parenthèse est une note, pas la réponse. */
  ok("saisie : la note entre parenthèses n'est pas à taper",
     checkAnswer("sprechen", "sprechen (du sprichst)").ok);
  ok("saisie : mais la taper en entier passe aussi",
     checkAnswer("sprechen du sprichst", "sprechen (du sprichst)").ok);
  ok("saisie : parenthèses comprises également",
     checkAnswer("sprechen (du sprichst)", "sprechen (du sprichst)").ok);
  ok("saisie : un autre verbe reste faux",
     !checkAnswer("laufen", "sprechen (du sprichst)").ok);

  /* ---- Un énoncé à trou se répond par le trou ----
     Signalé par Exsangue le 18/08/2026, capture à l'appui : « ___ Mai » sous
     la consigne « mets la préposition qui convient », il écrit « im » — juste —
     et l'app refuse, parce qu'elle attend « im Mai ». Montrer un trou et exiger
     la phrase entière n'est pas défendable. */
  eq("trou : le mot manquant se déduit de la réponse",
     gapOf("___ Mai", "im Mai"), "im");
  eq("trou : au milieu de la phrase aussi",
     gapOf("Ich nehme ___ Saft.", "Ich nehme einen Saft."), "einen");
  eq("trou : et quand il reste des mots derrière",
     gapOf("Ich fahre ___ dem Bus.", "Ich fahre mit dem Bus."), "mit");
  eq("trou : sans trou, rien à déduire", gapOf("im Freitag", "am Freitag"), null);
  eq("trou : deux trous, on ne devine pas lequel",
     gapOf("___ Mai ___ Juni", "im Mai im Juni"), null);
  eq("trou : un énoncé qui ne colle pas à sa réponse ne se devine pas",
     gapOf("___ Mai", "am Montag"), null);

  const trou = { t: "trans", from: "___ Mai", a: "im Mai" };
  ok("trou : la préposition seule est acceptée", checkDrill(trou, "im").ok);
  ok("trou : la phrase entière reste acceptée elle aussi", checkDrill(trou, "im Mai").ok);
  ok("trou : la mauvaise préposition reste fausse", !checkDrill(trou, "am").ok);
  ok("trou : et un mot sans rapport aussi", !checkDrill(trou, "Hund").ok);
  eq("trou : la faute se pointe sur le mot demandé, pas sur la phrase",
     checkDrill(trou, "in").gap, "im");

  /* Ce que la correction devait laisser intact : un `trans` SANS trou attend
     toujours la phrase entière — « Corrige la faute : im Freitag » se répond
     « am Freitag », pas « am ». */
  const plein = { t: "trans", from: "im Freitag", a: "am Freitag" };
  ok("trans : sans trou, la phrase entière est toujours exigée",
     !checkDrill(plein, "am").ok);
  ok("trans : et la phrase entière passe", checkDrill(plein, "am Freitag").ok);

  /* La garantie qui vaut pour tout le cours : plus un seul énoncé n'affiche un
     trou en attendant autre chose que ce trou. C'est ce test-là qui rattrapera
     le prochain exercice écrit de travers. */
  (function () {
    const boiteux = [];
    COURSE.forEach(function (u, iu) {
      (u.drills || []).forEach(function (d, id) {
        if (!d.from || String(d.from).indexOf("___") === -1) return;
        const t = gapOf(d.from, d.a);
        if (!t || !checkDrill(d, t).ok) boiteux.push("étape " + (iu + 1) + " ex." + (id + 1));
      });
    });
    ok("trou : tout énoncé à trou du cours se répond par son trou",
       boiteux.length === 0, boiteux.join(", "));
  })();

  /* Garantie sur tout le cours, à tous les niveaux : le mot seul suffit. */
  COURSE.forEach(function (l, i) {
    ok("jour " + (i + 1) + " : chaque mot s'écrit sans sa note entre parenthèses",
       l.vocab.every(function (v) {
         const seul = String(v.d).replace(/\([^)]*\)/g, " ").replace(/\s+/g, " ").trim();
         return checkAnswer(seul, v.d).ok &&
                checkOral(seul, { task: "write", de: v.d, fr: v.f }, ORAL_MAX).ok;
       }));
  });
  eq("saisie : la réponse vide est signalée à part", checkAnswer("", "Hallo").kind, "empty");

  /* Un seul mot dans le paquet, à un niveau donné.

     ⚠️ On RETIRE les autres cartes au lieu de les repousser à une date future,
     comme le faisait la version d'avant le 18/08/2026 : il n'y a plus de dates,
     et le paquet d'une leçon contient désormais tous ses mots. Isoler par le
     calendrier ne veut plus rien dire. */
  function soloCard(niv) {
    S = fresh(); S.day = 1; seed(1);
    const id = Object.keys(S.cards)[0];
    Object.keys(S.cards).forEach(function (k) { if (k !== id) delete S.cards[k]; });
    S.cards[id].niv = niv;
    return id;
  }

  const wid = soloCard(ARTICLE_A);
  go("cards");
  eq("saisie : un seul mot est dû", deck.length, 1);
  ok("saisie : le mot connu demande d'écrire", !!view.querySelector("#answer"));
  ok("saisie : plus de bouton « Révéler »", !view.querySelector('[data-act="reveal"]'));
  eq("saisie : c'est le français qui est montré", view.querySelector(".face.avant .ask").textContent, cardById(wid).f);
  // Même reformulation : la solution est sur la face arrière, pas montrée.
  ok("saisie : la réponse allemande n'est pas montrée avant de répondre",
     !view.querySelector(".face.avant .sol") && !view.querySelector(".carte-i.retourne"));

  document.getElementById("answer").value = cardById(wid).d;
  view.querySelector('[data-act="check-word"]').click();
  ok("saisie : la bonne réponse est acceptée", !!view.querySelector(".why.good"));
  ok("saisie : la solution s'affiche ensuite", !!view.querySelector(".face .sol"));
  view.querySelector('[data-act="card-next"]').click();
  eq("saisie : le mot monte d'un niveau", S.cards[wid].niv, ARTICLE_A + 1);
  eq("saisie : la réussite est notée au journal", S.cards[wid].hit, 1);

  const wid2 = soloCard(ARTICLE_A);
  go("cards");
  view.querySelector('[data-act="dunno"]').click();
  ok("saisie : « je ne sais pas » montre la réponse", !!view.querySelector(".face .sol"));
  ok("saisie : et c'est compté comme raté", !!view.querySelector(".why.bad"));
  view.querySelector('[data-act="card-next"]').click();
  eq("saisie : l'erreur est notée au journal", S.cards[wid2].miss, 1);
  eq("saisie : le mot redescend d'un niveau", S.cards[wid2].niv, ARTICLE_A - 1);

  const wid3 = soloCard(ARTICLE_A);
  go("cards");
  document.getElementById("answer").value = "totalement faux";
  view.querySelector('[data-act="check-word"]').click();
  ok("saisie : une mauvaise réponse est refusée", !!view.querySelector(".why.bad"));
  ok("saisie : ce qu'on a écrit est rappelé", view.innerHTML.indexOf("Tu as écrit") !== -1);
  view.querySelector('[data-act="card-next"]').click();
  eq("saisie : une mauvaise réponse fait redescendre d'un niveau", S.cards[wid3].niv, ARTICLE_A - 1);

  /* En dessous du seuil, on écrit aussi — mais en français, et on part de
     l'allemand. Le sens facile, jamais la reconnaissance passive. */
  const wid4 = soloCard(ECRIT_DE_A - 1);
  go("cards");
  ok("saisie : un mot pas encore acquis demande d'écrire lui aussi", !!view.querySelector("#answer"));
  eq("saisie : et c'est l'allemand qui est montré", view.querySelector(".face.avant .front").textContent, cardById(wid4).d);
  ok("saisie : la traduction n'est pas montrée avant de répondre",
     !view.querySelector(".face.avant .trad") && !view.querySelector(".carte-i.retourne"));

  document.getElementById("answer").value = cardById(wid4).f;
  view.querySelector('[data-act="check-word"]').click();
  ok("saisie : la traduction française est acceptée", !!view.querySelector(".why.good"));
  view.querySelector('[data-act="card-next"]').click();
  eq("saisie : le mot monte d'un niveau", S.cards[wid4].niv, ECRIT_DE_A);

  /* --- R. Monter jusqu'à l'écriture dans la même séance --- */
  const climbId = soloCard(0);
  go("cards");
  eq("montée : on démarre avec un seul mot, au niveau 0", S.cards[climbId].niv, 0);

  /* Trois bonnes réponses d'affilée sans quitter l'écran. On répond dans la
     langue que le niveau du mot demande : français au niveau 1, allemand
     ensuite. */
  let seenWrite = false;
  for (let k = 0; k < 6 && pos < deck.length; k++) {
    const champ = document.getElementById("answer");
    if (!champ) break;
    seenWrite = true;
    const enAllemand = S.cards[deck[pos].id].niv >= ECRIT_DE_A;
    champ.value = enAllemand ? cardById(climbId).d : cardById(climbId).f;
    view.querySelector('[data-act="check-word"]').click();
    view.querySelector('[data-act="card-next"]').click();
  }
  ok("montée : le mot est repassé dans la séance au lieu de disparaître", seenWrite,
     "niveau atteint : " + S.cards[climbId].niv);
  ok("montée : il a atteint le niveau où l'on écrit l'allemand",
     S.cards[climbId].niv >= ECRIT_DE_A, "niveau " + S.cards[climbId].niv);
  ok("montée : et sans qu'aucune date ne réapparaisse",
     S.cards[climbId].due === undefined);

  /* Un mot déjà acquis, lui, ne repasse pas : il sort de la séance. */
  const doneId = soloCard(ECRIT_DE_A);
  go("cards");
  eq("montée : un mot déjà au niveau d'écriture est seul dans le paquet", deck.length, 1);
  document.getElementById("answer").value = cardById(doneId).d;
  view.querySelector('[data-act="check-word"]').click();
  view.querySelector('[data-act="card-next"]').click();
  eq("montée : réussi, il quitte la séance sans repasser", deck.length, 1);
  ok("montée : la séance est terminée", pos >= deck.length);

  /* L'entraînement libre ne fait pas monter, donc ne doit pas boucler. */
  S = fresh(); S.day = 1; seed(1);
  go("practice");
  const beforeTraining = deck.length;
  document.getElementById("answer").value = deck[0].f;
  view.querySelector('[data-act="check-word"]').click();
  view.querySelector('[data-act="card-next"]').click();
  eq("entraînement : une bonne réponse ne réinjecte pas le mot", deck.length, beforeTraining);

  /* --- S. L'oral --- */
  ok("traduction : les accents sont ignorés", checkFR("bonjour", "Bonjour").ok);
  ok("traduction : la précision entre parenthèses est facultative",
     checkFR("salut", "salut (en partant)").ok);
  ok("traduction : la forme complète marche aussi",
     checkFR("salut en partant", "salut (en partant)").ok);
  ok("traduction : l'article français est facultatif", checkFR("mot", "le mot").ok);
  ok("traduction : la ponctuation est ignorée", checkFR("bonjour !", "Bonjour").ok);
  ok("traduction : un autre mot est refusé", !checkFR("maison", "le mot").ok);
  ok("traduction : une réponse vide est refusée", !checkFR("   ", "le mot").ok);
  /* Signalé par Exsangue : « la soeur » était compté faux. Le vocabulaire écrit
     « sœur » avec la ligature, un seul caractère, alors qu'on tape o puis e. */
  ok("traduction : la ligature œ s'écrit aussi oe", checkFR("la soeur", "la sœur").ok);
  ok("traduction : et la vraie ligature marche toujours", checkFR("la sœur", "la sœur").ok);
  ok("traduction : idem dans une phrase entière",
     checkFR("comment s'appelle ta soeur", "Comment s'appelle ta sœur ?").ok);
  ok("traduction : la ligature æ aussi", checkFR("un noeud", "un nœud").ok);

  /* Aucun contenu ne doit contenir une ligature sans que la comparaison la gère. */
  COURSE.forEach(function (l, i) {
    const textes = l.vocab.map(function (v) { return v.f; })
      .concat(l.examples.map(function (e) { return e.f; }));
    ok("jour " + (i + 1) + " : chaque traduction se retrouve en la retapant au clavier",
       textes.every(function (f) { return checkFR(normFR(f), f).ok; }));
  });

  /* --- Niveaux à l'oreille --- */
  eq("oral : au niveau 1, on traduit", oralTask(1), "translate");
  eq("oral : au niveau 3, on écrit en allemand", oralTask(3), "write");
  eq("oral : au niveau 5 aussi", oralTask(5), "write");
  ok("oral : le niveau 2 mélange les deux consignes",
     (function () {
       let w = false, t = false;
       for (let k = 0; k < 60; k++) {
         if (oralTask(2) === "write") w = true; else t = true;
       }
       return w && t;
     })());

  eq("distance : deux mots identiques sont à 0", editDistance("hallo", "hallo", 2), 0);
  eq("distance : une lettre changée vaut 1", editDistance("hallo", "hallu", 2), 1);
  eq("distance : au-delà du plafond, on ne calcule plus", editDistance("hallo", "guten tag", 2), 3);

  const itFR = { task: "translate", de: "die Schwester", fr: "la sœur" };
  ok("oral niveau 1 : une faute de frappe est pardonnée",
     checkOral("la soeurr", itFR, 1).ok);
  eq("oral niveau 1 : et c'est dit comme tel", checkOral("la soeurr", itFR, 1).kind, "typo");
  ok("oral niveau 3 : la même faute ne passe plus",
     !checkOral("la soeurr", { task: "translate", de: "x", fr: "la sœur" }, 3).ok);

  const itDE = { task: "write", de: "das Wort", fr: "le mot" };
  ok("oral niveau 3 : l'article reste facultatif", checkOral("Wort", itDE, 3).ok);
  ok("oral niveau 4 : l'article devient obligatoire", !checkOral("Wort", itDE, 4).ok);
  eq("oral niveau 4 : et on explique pourquoi", checkOral("Wort", itDE, 4).kind, "need-article");
  ok("oral niveau 4 : avec l'article, c'est bon", checkOral("das Wort", itDE, 4).ok);

  const itU = { task: "write", de: "Tschüss", fr: "salut" };
  ok("oral niveau 3 : ue remplace ü", checkOral("Tschuess", itU, 3).ok);
  ok("oral niveau 5 : le vrai tréma est exigé", !checkOral("Tschuess", itU, 5).ok);
  eq("oral niveau 5 : et c'est nommé", checkOral("Tschuess", itU, 5).kind, "strict");
  ok("oral niveau 5 : la forme exacte passe", checkOral("Tschüss", itU, 5).ok);
  ok("oral niveau 5 : la casse reste libre", checkOral("tschüss", itU, 5).ok);

  /* Le ß est traité à part des trémas, et c'est une distinction MATÉRIELLE, pas
     pédagogique. Exsangue : « je trouverai une solution pour écrire ö ou ü,
     sauf ß qui n'est pas du tout sur mon clavier ». Un tréma se compose sur un
     clavier français ; le ß ne s'y trouve nulle part. Exiger le ß au niveau 5,
     c'était rendre infranchissables des mots aussi courants que Straße, groß
     ou heißen — on sanctionnait le clavier, pas la connaissance. */
  const itSS = { task: "write", de: "die Straße", fr: "la rue" };
  ok("oral niveau 5 : ss est toujours accepté pour ß",
     checkOral("die Strasse", itSS, 5).ok);
  ok("oral niveau 5 : le vrai ß passe évidemment aussi",
     checkOral("die Straße", itSS, 5).ok);
  ok("oral niveau 5 : mais le tréma, lui, reste exigé",
     !checkOral("die Strasse", { task: "write", de: "die Größe", fr: "la taille" }, 5).ok);

  /* Signalé par Exsangue : un point oublié comptait faux. La ponctuation ne
     s'entend pas — la sanctionner dans un exercice d'écoute n'a aucun sens. */
  const itPh = { task: "write", de: "Guten Tag!", fr: "Bonjour" };
  ok("oral : un point final oublié ne compte pas faux (niveau 3)",
     checkOral("Guten Tag", itPh, 3).ok);
  ok("oral : ni au niveau 4", checkOral("Guten Tag", itPh, 4).ok);
  ok("oral : ni même au niveau 5, le plus strict",
     checkOral("Guten Tag", itPh, 5).ok);
  ok("oral : la ponctuation en trop ne gêne pas non plus",
     checkOral("Guten Tag !!", itPh, 5).ok);
  ok("oral : mais au niveau 5 le tréma reste exigé",
     !checkOral("Tschuess", itU, 5).ok);
  ok("traduction : un point oublié en français non plus",
     checkFR("Comment s'appelle ta soeur", "Comment s'appelle ta sœur ?").ok);

  /* Toute phrase du cours doit être acceptée quand on la retape sans sa
     ponctuation finale — c'est exactement ce qu'on fait sous la dictée. */
  COURSE.forEach(function (l, i) {
    ok("jour " + (i + 1) + " : chaque phrase passe même sans sa ponctuation",
       l.examples.every(function (e) {
         const nu = String(e.d).replace(/[.!?]+\s*$/, "");
         return checkOral(nu, { task: "write", de: e.d, fr: e.f }, ORAL_MAX).ok;
       }));
  });

  /* Sans voix installée, le mode doit se justifier au lieu d'être muet. */
  const keepVoice = TTS.voice;
  TTS.voice = null;
  S = fresh(); S.day = 1; seed(1);
  go("oral");
  ok("oral : sans voix allemande, l'écran l'explique",
     view.innerHTML.indexOf("voix allemande") !== -1);
  ok("oral : et ne propose pas d'exercice", !view.querySelector("#answer"));

  TTS.voice = { lang: "de-DE", name: "test" };
  S = fresh(); S.day = 1; seed(1);
  go("oral");
  ok("oral : une consigne est donnée", !!view.querySelector(".flash .tip"));
  ok("oral : un champ de saisie est présent", !!view.querySelector("#answer"));
  ok("oral : un bouton permet de réécouter", !!view.querySelector("[data-say]"));
  ok("oral : la phrase est prononcée dès l'affichage", !!view.querySelector("[data-autosay]"));
  ok("oral : AUCUN texte allemand n'est montré avant de répondre",
     !view.querySelector(".flash .sol"));
  ok("oral : ni la traduction", !view.querySelector(".flash .trad"));

  const it0 = oral[0];
  document.getElementById("answer").value = (it0.task === "write") ? it0.de : it0.fr;
  view.querySelector('[data-act="oral-check"]').click();
  ok("oral : la bonne réponse est acceptée, quelle que soit la consigne",
     !!view.querySelector(".why.good"), "consigne : " + it0.task);
  ok("oral : la solution allemande s'affiche ensuite", !!view.querySelector(".flash .sol"));
  ok("oral : la traduction aussi", !!view.querySelector(".flash .trad"));
  view.querySelector('[data-act="oral-next"]').click();
  ok("oral : on passe à la suite", oi === 1);

  S = fresh(); S.day = 1; seed(1);
  go("oral");
  view.querySelector('[data-act="oral-dunno"]').click();
  ok("oral : « je ne sais pas » montre la réponse", !!view.querySelector(".flash .sol"));
  ok("oral : et compte comme raté", !!view.querySelector(".why.bad"));

  /* Le journal est nourri, le calendrier de révision ne bouge pas. */
  S = fresh(); S.day = 1; seed(1);
  go("oral");
  const ov = COURSE[0].vocab[0];
  oral = [{ de: ov.d, fr: ov.f, p: ov.p, id: "1:0", task: "write" }];
  oi = 0; oralVerdict = null;
  show(renderOral());
  const oBox = S.cards["1:0"].box, oDue = S.cards["1:0"].due;
  document.getElementById("answer").value = ov.d;
  view.querySelector('[data-act="oral-check"]').click();
  eq("oral : la réussite est notée au journal", S.cards["1:0"].hit, 1);
  eq("oral : mais le niveau ne bouge pas", S.cards["1:0"].box, oBox);
  eq("oral : ni la date de révision", S.cards["1:0"].due, oDue);

  /* Les phrases de la leçon entrent aussi dans le tirage — mais plus d'emblée.
     Ce test affirmait qu'elles sortaient dès la première séance ; c'est
     exactement ce qu'Exsangue a trouvé trop dur le 01/08/2026. Elles arrivent
     désormais une fois l'étape travaillée, ce qu'on vérifie ici. */
  ok("oral : les phrases entières arrivent une fois l'étape travaillée",
     (function () {
       const l = COURSE[S.day - 1];
       l.vocab.forEach(function (v, i) { S.oral["v:" + S.day + ":" + i] = 3; });
       l.examples.forEach(function (e, i) { S.oral["p:" + S.day + ":" + i] = 3; });
       for (let k = 0; k < 30; k++) {
         if (oralItems(ORAL_SIZE).some(function (x) { return x.id === null; })) return true;
       }
       return false;
     })());
  S.oral = {};
  ok("oral : tout part au niveau 1, donc en traduction",
     oralItems(ORAL_SIZE).every(function (x) { return x.level === 1 && x.task === "translate"; }));

  /* Une fois monté, le même contenu se demande en allemand. */
  S = fresh(); S.day = 1; seed(1);
  // Tout le vivier, pas seulement un tirage : oralItems en choisit 8 au hasard.
  COURSE[0].vocab.forEach(function (_, i) { S.oral["v:1:" + i] = 3; });
  COURSE[0].examples.forEach(function (_, i) { S.oral["p:1:" + i] = 3; });
  ok("oral : à partir du niveau 3, tout se demande en allemand",
     oralItems(ORAL_SIZE).every(function (x) { return x.level === 3 && x.task === "write"; }));

  /* Le niveau monte, descend, et se garde d'une séance à l'autre. */
  S = fresh(); S.day = 1; seed(1);
  go("oral");
  const k0 = oral[0].key;
  eq("oral : un contenu neuf démarre au niveau 1", oral[0].level, 1);
  document.getElementById("answer").value = oral[0].fr;
  view.querySelector('[data-act="oral-check"]').click();
  eq("oral : une réussite fait monter d'un niveau", S.oral[k0], 2);
  ok("oral : la montée est annoncée à l'écran", view.innerHTML.indexOf("Niveau 1 &rarr; 2") !== -1 ||
     view.innerHTML.indexOf("Niveau 1 → 2") !== -1);
  view.querySelector('[data-act="oral-next"]').click();

  S = fresh(); S.day = 1; seed(1);
  go("oral");
  const k1 = oral[0].key;
  S.oral[k1] = 4; oral[0].level = 4; oral[0].task = "write";
  oralVerdict = null; show(renderOral());
  view.querySelector('[data-act="oral-dunno"]').click();
  eq("oral : un échec fait redescendre d'un niveau", S.oral[k1], 3);

  S = fresh(); S.day = 1; seed(1);
  go("oral");
  const k2 = oral[0].key;
  S.oral[k2] = 1; oral[0].level = 1;
  oralVerdict = null; show(renderOral());
  view.querySelector('[data-act="oral-dunno"]').click();
  eq("oral : le niveau ne descend jamais sous 1", S.oral[k2], 1);

  ok("oral : le niveau est affiché pendant l'exercice",
     (function () {
       S = fresh(); S.day = 1; seed(1);
       go("oral");
       return view.innerHTML.indexOf("niveau 1/" + ORAL_MAX) !== -1;
     })());

  TTS.voice = keepVoice;

  /* --- T. Les exercices --- */
  COURSE.forEach(function (l, i) {
    const ds = l.drills || [];
    if (!ds.length) return;
    const tag = "étape " + (i + 1);
    ok(tag + " : chaque exercice a un type connu",
       ds.every(function (d) { return ["order", "gap", "trans", "trad"].indexOf(d.t) !== -1; }));
    ok(tag + " : chaque exercice a une réponse et une explication",
       ds.every(function (d) { return !!d.a && !!d.why; }));
    ok(tag + " : chaque exercice pose sa question",
       ds.every(function (d) { return !!(d.f || d.s || d.from); }));
    ok(tag + " : les trous ont bien un trou",
       ds.every(function (d) { return d.t !== "gap" || String(d.s).indexOf("___") !== -1; }));
    ok(tag + " : les remises en ordre ont au moins trois mots",
       ds.every(function (d) { return d.t !== "order" || bareSentence(d.a).split(" ").length >= 3; }));
    ok(tag + " : la réponse attendue est acceptée par le correcteur",
       ds.every(function (d) { return d.t === "order" || checkAnswer(d.a, d.a).ok; }));
    /* Cette règle exigeait TROIS formes par étape. Elle a été reformulée le
       01/08/2026, et il faut être franc sur la raison : elle est tombée quand
       les cinq exercices creux de l'étape 1 ont été retirés. Mais elle ne
       tenait que grâce à eux — ils lui fournissaient une troisième forme qui
       n'existait pas vraiment. Elle passait pour une mauvaise raison.

       L'étape 1 porte sur les SONS : « remettre dans l'ordre » suppose une
       grammaire qu'on n'a pas, « transformer » suppose une règle à appliquer.
       Compléter et traduire sont les deux formes justes, et 10 contre 13 n'est
       pas « une seule forme en boucle ».

       La règle mesure donc désormais ce que son nom annonce : qu'AUCUNE forme
       n'écrase les autres. Deux formes équilibrées passent, vingt trous suivis
       d'une traduction ne passent pas. Et surtout, elle reste générale : pas de
       numéro d'étape en dur, qui casserait à la prochaine restructuration. */
    ok(tag + " : plusieurs formes d'exercices, pas une seule en boucle",
       (function () {
         const parForme = {};
         ds.forEach(function (d) { parForme[d.t] = (parForme[d.t] || 0) + 1; });
         const formes = Object.keys(parForme);
         if (formes.length < 2) return false;
         let plusGrande = 0;
         formes.forEach(function (t) { plusGrande = Math.max(plusGrande, parForme[t]); });
         return plusGrande / ds.length <= 0.7;
       })());
  });

  /* Les quatre formes d'exercices ne sont pas toutes présentes à l'étape 1 :
     elle porte sur les SONS, et « remettre dans l'ordre » suppose une phrase
     à ordonner, donc une grammaire qu'on n'a pas encore vue. Chaque forme se
     teste donc sur la PREMIÈRE étape qui la contient, et non sur l'étape 1 —
     sinon ajouter une étape d'ouverture casse le harnais au lieu du code. */
  function premierExercice(forme) {
    for (let i = 0; i < COURSE.length; i++) {
      const trouves = (COURSE[i].drills || []).filter(function (x) { return x.t === forme; });
      if (trouves.length) return trouves.slice(0, 1);
    }
    return [];
  }
  ["order", "gap", "trans", "trad"].forEach(function (forme) {
    ok("exercices : la forme « " + forme + " » existe quelque part dans le cours",
       premierExercice(forme).length === 1);
  });

  /* Un exercice de transformation doit être RATABLE. Le cours en a longtemps
     contenu cinq qui ne l'étaient pas : « réécris grün sans le tréma » attendait
     « gruen », mais `normDE` convertit ä→ae et ß→ss avant de comparer — les deux
     écritures sont la même chaîne pour le correcteur, et recopier l'énoncé
     validait l'exercice. Retirés à la demande d'Exsangue, qui l'avait senti
     sans lire le code : « je n'apprends rien de spécial ».
     Cette vérification empêche la famille entière de revenir.

     Le critère n'est PAS « les deux chaînes diffèrent » — ce serait trop faible.
     C'est : recopier l'énoncé est-il accepté ? Deux tolérances du correcteur
     rendent un exercice creux sans que les chaînes se ressemblent :
       - l'orthographe de dépannage (ä↔ae, ß↔ss) — le cas des cinq retirés ;
       - l'article facultatif : « Haus » est accepté pour « das Haus », donc
         « ajoute l'article » serait tout aussi impossible à rater.
     On pose donc la seule question qui compte : `checkAnswer(from, a)`. */
  const creux = [];
  COURSE.forEach(function (l, i) {
    (l.drills || []).forEach(function (d) {
      if (d.from && d.a && checkAnswer(d.from, d.a).ok) {
        creux.push("étape " + (i + 1) + " : « " + d.from + " » → « " + d.a + " »");
      }
    });
  });
  ok("exercices : recopier l'énoncé ne valide jamais une transformation",
     creux.length === 0, creux.join(" · "));

  S = fresh(); S.day = 1; seed(1);
  go("drills");
  eq("exercices : une séance en sert un nombre fixe", drills.length,
     Math.min(DRILL_SESSION, COURSE[0].drills.length));
  ok("exercices : le réservoir est plus grand qu'une séance",
     COURSE[0].drills.length > DRILL_SESSION,
     COURSE[0].drills.length + " exercices pour " + DRILL_SESSION + " servis");

  /* Le point signalé par Exsangue : en refaisant la leçon, les exercices
     étaient mot pour mot les mêmes, seulement dans un autre ordre. */
  S = fresh(); S.day = 1; seed(1);
  const serie1 = drawDrillsKeys();
  drillsView();
  const serie2 = drawDrillsKeys();
  ok("exercices : deux séances de suite ne servent pas la même liste",
     serie1.join(",") !== serie2.join(","),
     "1re : " + serie1.length + " · 2e : " + serie2.length);

  /* Et surtout : tout le réservoir finit par passer, rien n'est oublié. */
  S = fresh(); S.day = 1; seed(1);
  const total = COURSE[0].drills.length;
  const tours = Math.ceil(total / DRILL_SESSION);
  const vus = {};
  for (let k = 0; k < tours; k++) {
    // Même raison qu'au quiz : on veut des séances SUCCESSIVES, pas une
    // seule séance reprise `tours` fois.
    oublieSeances();
    drillsView();
    drills.forEach(function (d) { vus[d.key] = true; });
  }
  eq("exercices : en " + tours + " séances, tout le réservoir a été servi",
     Object.keys(vus).length, total);

  ok("exercices : les moins vus passent en premier",
     (function () {
       S = fresh(); S.day = 1; seed(1);
       drillsView();
       const dejaVus = drills.map(function (d) { return d.key; });
       oublieSeances();          // une DEUXIÈME séance, pas la reprise de la première
       drillsView();
       // Aucun des exercices de la 1re séance ne doit revenir tant qu'il
       // reste des exercices jamais servis.
       return drills.every(function (d) { return dejaVus.indexOf(d.key) === -1; });
     })());

  /* Remettre les mots dans l'ordre, en cliquant vraiment. */
  S = fresh(); S.day = 1; seed(1);
  go("drills");
  drills = premierExercice("order");
  di = 0; setupDrill(); show(renderDrill());
  const attendu = bareSentence(drills[0].a).split(" ");
  eq("ordre : une étiquette par mot", view.querySelectorAll(".chips .chip-w").length, attendu.length);
  ok("ordre : la zone de construction est vide au départ",
     view.querySelectorAll(".build .chip-w").length === 0);

  // On clique les etiquettes dans le bon ordre, en cherchant le mot voulu.
  for (let k = 0; k < attendu.length; k++) {
    const libres = view.querySelectorAll(".chips .chip-w");
    let cible = null;
    for (let z = 0; z < libres.length; z++) {
      if (libres[z].textContent === attendu[k]) { cible = libres[z]; break; }
    }
    if (!cible) { ok("ordre : le mot « " + attendu[k] + " » est disponible", false); break; }
    cible.click();
  }
  eq("ordre : tous les mots sont posés", view.querySelectorAll(".build .chip-w").length, attendu.length);
  view.querySelector('[data-act="drill-check"]').click();
  ok("ordre : la phrase reconstituée est acceptée", !!view.querySelector(".why.good"));

  /* Le mauvais ordre doit être refusé — c'est tout l'intérêt. */
  S = fresh(); S.day = 1; seed(1);
  go("drills");
  drills = premierExercice("order");
  di = 0; setupDrill(); show(renderDrill());
  // On pose systématiquement la DERNIÈRE étiquette libre : la phrase sort à l'envers.
  const nbMots = bareSentence(drills[0].a).split(" ").length;
  for (let k = 0; k < nbMots; k++) {
    const libres = view.querySelectorAll(".chips .chip-w");
    libres[libres.length - 1].click();
  }
  // Le tirage étant aléatoire, cet ordre-là PEUT tomber juste. On vérifie donc
  // l'invariant qui compte : le verdict correspond à ce qui a été construit.
  const construit = normDE(drillAnswer(drills[0]));
  const vise = normDE(bareSentence(drills[0].a));
  view.querySelector('[data-act="drill-check"]').click();
  ok("ordre : le verdict suit exactement la phrase construite",
     construit === vise ? !!view.querySelector(".why.good") : !!view.querySelector(".why.bad"),
     construit === vise ? "ordre juste" : "ordre faux, refusé");

  /* Retirer une étiquette posée. */
  S = fresh(); S.day = 1; seed(1);
  go("drills");
  drills = premierExercice("order");
  di = 0; setupDrill(); show(renderDrill());
  view.querySelector(".chips .chip-w").click();
  eq("ordre : une étiquette cliquée rejoint la phrase", view.querySelectorAll(".build .chip-w").length, 1);
  view.querySelector(".build .chip-w").click();
  eq("ordre : et on peut la reprendre", view.querySelectorAll(".build .chip-w").length, 0);

  /* Les exercices au clavier. */
  S = fresh(); S.day = 1; seed(1);
  go("drills");
  drills = premierExercice("gap");
  di = 0; setupDrill(); show(renderDrill());
  ok("trou : un champ de saisie est proposé", !!view.querySelector("#answer"));
  ok("trou : l'énoncé montre le trou", view.innerHTML.indexOf("___") !== -1);
  document.getElementById("answer").value = drills[0].a;
  view.querySelector('[data-act="drill-check"]').click();
  ok("trou : la bonne réponse est acceptée", !!view.querySelector(".why.good"));
  view.querySelector('[data-act="drill-next"]').click();
  ok("exercices : on arrive au décompte final", !!view.querySelector(".score"));

  S = fresh(); S.day = 1; seed(1);
  go("drills");
  drills = premierExercice("trad");
  di = 0; setupDrill(); show(renderDrill());
  document.getElementById("answer").value = "n'importe quoi";
  view.querySelector('[data-act="drill-check"]').click();
  ok("traduction : une mauvaise réponse est refusée", !!view.querySelector(".why.bad"));
  ok("traduction : la solution est montrée", !!view.querySelector(".flash .sol"));

  /* Une étape sans exercices ne doit pas offrir un écran vide. */
  S = fresh(); S.day = 1; seed(1);
  const sansDrills = (function () {
    for (let n = 1; n <= COURSE.length; n++) if (!(COURSE[n - 1].drills || []).length) return n;
    return 0;
  })();
  if (sansDrills) {
    S.day = sansDrills;
    go("drills");
    ok("exercices : une étape sans exercices l'annonce clairement",
       view.innerHTML.indexOf("pas encore d'exercices") !== -1);
  }

  /* --- P. Robustesse --- */
  ok("sécurité : le HTML des contenus est échappé", esc("<b>&</b>") === "&lt;b&gt;&amp;&lt;/b&gt;");
  ok("sécurité : les guillemets sont échappés dans les attributs", att('a"b') === "a&quot;b");

  /* ---------- Le rendu du contenu ----------
     Défaut signalé par Exsangue le 11/08/2026 : « Le corps se dit <b>der Körper</b> »
     s'affichait tel quel à l'écran. ⚠️ Le test juste au-dessus passait pendant ce
     temps-là : il mesure esc() en vase clos, pas ce que l'écran montre. C'est la
     famille de test qui rassure sans rien garantir. On vérifie donc les deux :
     la fonction, le contenu, ET le DOM. */
  /* ⚠️ PIÈGE, à ne pas re-découvrir : la barre oblique de la balise fermante est
     échappée volontairement (barre obliqué précédée d'un antislash). L'analyseur
     HTML ne sait pas qu'il lit une chaîne JavaScript : une balise fermante de
     script écrite telle quelle referme le bloc ICI MÊME, et tout le reste du
     fichier devient du texte. Écran blanc, app morte.
     Le 11/08/2026 ça s'est produit DEUX fois de suite — la seconde dans le
     commentaire qui expliquait la première. Ne jamais écrire la séquence, même
     en prose. Et test.ps1 annonçait « Tout passe » pendant ce temps : il lisait
     le code source, pas l'écran. Le harnais a été corrigé dans la foulée. */
  ok("rendu : rich() neutralise ce qui n'est pas dans la liste blanche",
     rich("<script>x<\/script>") === "&lt;script&gt;x&lt;\/script&gt;");
  ok("rendu : rich() garde le gras, qui porte le mot allemand",
     rich("le <b>Körper</b>") === "le <b>Körper</b>");
  ok("rendu : rich() garde l'italique et le souligné",
     rich("<i>a</i><u>b</u>") === "<i>a</i><u>b</u>");
  ok("rendu : rich() convertit les entités déclarées", rich("a &rarr; ä") === "a → ä");
  ok("rendu : une entité non déclarée reste visible plutôt que d'être devinée",
     rich("&copy;").indexOf("&amp;copy;") === 0);
  ok("rendu : un attribut n'accepte toujours aucune balise", att("<b>") === "&lt;b&gt;");

  /* Balayage de TOUT le cours. Écrit à la main sur 42 étapes, ce contrôle finirait
     faux quelque part ; calculé, il reste juste quand le contenu change. */
  (function () {
    const balisesOK = /^<\/?(b|i|u)>$/;
    const entitesOK = new RegExp("^&(" + Object.keys(RICHE_ENTITES).join("|") + ");$");
    const horsListe = [], platsBalises = [];
    /* Les champs « riches » traversent rich() ; les « plats » traversent esc() et
       ne doivent donc porter AUCUNE balise — elle s'y afficherait en clair. */
    function riche(s, ou) {
      if (typeof s !== "string") return;
      (s.match(/<[^>]*>/g) || []).forEach(function (b) {
        if (!balisesOK.test(b)) horsListe.push(ou + " : " + b);
      });
      (s.match(/&[a-zA-Z#0-9]{1,8};/g) || []).forEach(function (e) {
        if (!entitesOK.test(e)) horsListe.push(ou + " : " + e);
      });
    }
    function plat(s, ou) {
      if (typeof s !== "string") return;
      if (/<[^>]*>|&[a-zA-Z#0-9]{1,8};/.test(s)) platsBalises.push(ou + " : " + s.slice(0, 40));
    }
    COURSE.forEach(function (l) {
      const e = "étape " + l.day;
      plat(l.title, e + " titre"); plat(l.de, e + " phrase-titre");
      (l.steps || []).forEach(function (s, j) {
        const o = e + " écran " + (j + 1);
        riche(s.idea, o + " idea"); riche(s.detail, o + " detail");
        (s.table || []).forEach(function (r) { riche(r[0], o + " table"); riche(r[1], o + " table"); });
        if (s.check) {
          riche(s.check.q, o + " check.q"); riche(s.check.why, o + " check.why");
          (s.check.o || []).forEach(function (x) { riche(x, o + " check.o"); });
        }
        if (s.gloss) {
          (s.gloss.de || []).forEach(function (w) { plat(w, o + " gloss.de"); });
          (s.gloss.fr || []).forEach(function (w) { plat(w, o + " gloss.fr"); });
        }
      });
      (l.quiz || []).forEach(function (q, j) {
        const o = e + " quiz " + (j + 1);
        riche(q.q, o + ".q"); riche(q.why, o + ".why");
        (q.o || []).forEach(function (x) { riche(x, o + ".o"); });
      });
      (l.vocab || []).forEach(function (v) { plat(v.de, e + " vocab.de"); plat(v.fr, e + " vocab.fr"); plat(v.pron, e + " vocab.pron"); });
      (l.examples || []).forEach(function (x) { plat(x.de, e + " exemple.de"); plat(x.fr, e + " exemple.fr"); });
      (l.drills || []).forEach(function (d) {
        plat(d.f, e + " drill.f"); plat(d.from, e + " drill.from");
        plat(d.s, e + " drill.s"); plat(d.a, e + " drill.a");
      });
    });
    ok("contenu : aucune balise ni entité hors de la liste blanche",
       horsListe.length === 0, horsListe.slice(0, 5).join(" · "));
    ok("contenu : les champs rendus par esc() ne portent aucune balise",
       platsBalises.length === 0, platsBalises.slice(0, 5).join(" · "));
  })();

  /* ⚠️ LA vérification qui aurait attrapé le défaut : on regarde le DOM.
     Pas de numéro d'étape en dur — il tomberait au prochain remaniement. */
  (function () {
    let etape = -1, ecran = -1;
    COURSE.forEach(function (l, i) {
      (l.steps || []).forEach(function (s, j) {
        if (etape === -1 && s.idea && s.idea.indexOf("<b>") !== -1) { etape = i; ecran = j; }
      });
    });
    if (etape === -1) { ok("rendu à l'écran : une idée emploie le gras quelque part", false); return; }
    S = fresh(); S.day = etape + 1; seed(S.day);
    go("lesson"); setStep(ecran); show(renderStep());
    const p = view.querySelector(".step-idea");
    ok("rendu à l'écran : le gras d'une idée est une vraie balise",
       !!p && p.querySelectorAll("b").length > 0);
    ok("rendu à l'écran : aucune balise ne s'affiche en clair dans la leçon",
       !!p && p.textContent.indexOf("<b>") === -1, p ? p.textContent.slice(0, 60) : "pas d'idée affichée");
  })();
  eq("mobile : le double-tap ne déclenche pas le zoom",
     getComputedStyle(document.body).touchAction, "manipulation");
  ok("mobile : le champ de saisie fait au moins 16px, sinon iOS zoome au focus",
     (function () {
       const probe = document.createElement("input");
       probe.className = "answer";
       document.body.appendChild(probe);
       const size = parseFloat(getComputedStyle(probe).fontSize);
       document.body.removeChild(probe);
       return size >= 16;
     })());
  ok("audio : ne plante pas quand aucune voix allemande n'est disponible",
     (function () { try { speak("Guten Tag"); return true; } catch (e) { return false; } })());

  } catch (e) {
    /* Un test qui plante ne doit pas emporter le rapport avec lui : on le consigne
       comme un echec ordinaire, et report() s affiche quand meme. Sans ca, l ecran
       reste vide et rien ne dit que la progression a ete touchee. */
    ok("l'auto-test est allé jusqu'au bout", false,
       "interrompu par une erreur : " + ((e && e.message) ? e.message : String(e)));
  } finally {
    /* --- Restauration de la vraie progression, quoi qu il arrive --- */
    if (lu) {
      try {
        if (backup === null) localStorage.removeItem(KEY);
        else localStorage.setItem(KEY, backup);
      } catch (e) {}
    }
    S = load();
    paintStreak();
  }
  report();
}

function report() {
  const failed = T.filter(function (t) { return !t.p; });
  const rows = T.map(function (t) {
    return '<div class="t-row"><span class="t-tag ' + (t.p ? "ok" : "ko") + '">' + (t.p ? "OK" : "KO") + '</span><span>' +
      esc(t.n) + ((t.p || !t.d) ? "" : '<br><span class="d">' + esc(t.d) + '</span>') +
    '</span></div>';
  }).join("");

  show([
    '<div class="stack">',
      '<div class="card">',
        '<span class="label">Auto-test</span>',
        '<div class="t-sum" style="color:' + (failed.length ? "var(--bad)" : "var(--good)") + '">' +
          (T.length - failed.length) + ' / ' + T.length + '</div>',
        '<p class="msg">' +
          (failed.length ? failed.length + " test(s) en échec." : "Tout passe.") +
          ' La progression enregistrée n\'a pas été modifiée.</p>',
      '</div>',
      '<div class="card">' + rows + '</div>',
      '<button class="btn primary wide" data-act="quit-test">Ouvrir l\'application</button>',
    '</div>'
  ].join(""));
}
