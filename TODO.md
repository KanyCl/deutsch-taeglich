# TODO — Deutsch Täglich

Retours d'Exsangue après usage réel de l'app, le 31 juillet 2026.
Rangés par lot, pas par ordre d'importance : le lot 1 est le plus rentable à l'heure passée.

## Lot 1 — corrections courtes ✅ fait le 31/07/2026

- [x] **La bonne réponse n'est plus toujours la première.** Les 84 questions du fichier
      ont toutes `a: 0` — c'est resté tel quel, mais l'ordre d'AFFICHAGE est désormais
      mélangé (`shuffleIdx`). Les boutons gardent leur index d'origine dans
      `data-pick` / `data-scheck`, donc le score et l'auto-test raisonnent toujours
      sur le fichier et pas sur l'écran.
- [x] **Ordre des questions du quiz aléatoire** (`qOrder`), tiré une fois par partie.
- [x] **Boutons de fin de leçon.** « Revoir le jour N » vise le jour testé et non le jour
      courant ; « Leçon suivante » ajouté ; retour au jour précédent depuis la fin d'une
      leçon. Le seuil affiché (« il faut N bonnes réponses ») est maintenant calculé au
      lieu d'être écrit en dur.
- [x] Auto-test passé de 240 à **256 vérifications**, dont le mélange lui-même.

## Lot 1 bis — bloquant, remonté après coup ✅ corrigé le 31/07/2026

- [x] **La progression ne survivait pas sur iPhone.** iOS refuse le stockage local à une
      page affichée dans le cadre d'un autre site. L'app est devenue une page autonome
      hébergée à sa propre adresse : https://kanycl.github.io/deutsch-taeglich/
      Zéro ligne de logique modifiée.
- [ ] **À confirmer par Exsangue** : ouvrir la nouvelle adresse sur l'iPhone, l'ajouter à
      l'écran d'accueil, faire une leçon, fermer, rouvrir → la progression doit tenir.

## Lot 2 — le système de révision ✅ fait le 31/07/2026

- [x] **Cartes mélangées** à chaque session (`dueCards` passe par `shuffleIdx`).
- [x] **Mots ratés repiochés.** Un mot raté repasse en fin de paquet, accompagné d'un mot
      déjà su tiré au hasard (`pickEasy`) — on ne finit plus en boucle sur ses erreurs.
      Plafond de paquet (`deckCap`) pour qu'une mauvaise session ait quand même une fin.
- [x] **Priorité aux mots les plus ratés.** L'entraînement reprend *toujours* la moitié la
      plus fragile, et complète par un tirage dans un vivier plus large pour varier.
- [x] **Apprentissage irrégulier.** « Rien à réviser » n'est plus un cul-de-sac : le bouton
      bascule sur l'**entraînement libre**, qui note les réponses **sans toucher au
      calendrier** — réviser en avance ne doit pas dérégler l'espacement Leitner.
      Ajout aussi d'un « Enchaîner sur le jour suivant » quand le jour est validé.
- [x] **Journal des erreurs.** Chaque mot compte ses `hit` / `miss` ; chaque question de quiz
      ratée est comptée dans `S.qmiss`. L'accueil affiche le nombre de mots fragiles.
      Tout part dans le fichier de sauvegarde : il suffit de me l'envoyer pour qu'on
      travaille les vraies fautes.
- [x] Auto-test : **279 vérifications**.

## Rythme de progression ✅ revu le 01/08/2026

- [x] **Écrire le mot le jour même.** Les niveaux 1 et 2 ont un intervalle de 0 jour : ce
      sont des étapes d'apprentissage franchies dans la séance. Nouveaux intervalles :
      0 / 0 / 1 / 4 / 16 jours.
- [x] **Seuil d'écriture abaissé au niveau 2** (`WRITE_FROM_BOX`) : une seule vue, puis on
      écrit. Le mot a déjà été présenté dans la leçon avant d'arriver aux cartes.
- [x] **Un mot raté perd un niveau au lieu de tout perdre** (`max(1, box - 1)`).
- [x] Garde-fous : `MAX_PASSES` (un mot ne repasse pas plus de 5 fois par séance) et
      `deckCap`, sinon une mauvaise séance n'aurait pas de fin.
- [x] Le compteur « carte 3 sur 10 » devenait faux (le total grandit en séance) →
      remplacé par « Encore N ».
- [x] Auto-test : **328 vérifications**.

## Le mode oral ✅ ajouté le 01/08/2026

- [x] **Onglet « L'oral »** — aucun texte à l'écran, la phrase est prononcée à l'affichage.
      Consigne tirée au sort : écrire en allemand ce qu'on entend, ou le traduire.
      Puise dans le vocabulaire **et** les phrases entières de la leçon.
- [x] `checkFR` — correction du français volontairement lâche (accents, ponctuation,
      article, parenthèses facultatifs). L'allemand, lui, reste contrôlé strictement.
- [x] Écran d'explication si l'appareil n'a pas de voix allemande, au lieu d'un écran muet.
- [x] Corrigé au passage : `.back` servait au bouton « ← Accueil » **et** à la traduction,
      qui s'affichait donc en majuscules. Défaut présent depuis la v2.
- [x] **Niveaux à l'oreille** (1 à 5, `S.oral`), indépendants de ceux des cartes.
      Deux axes montent ensemble : moins de français, moins d'indulgence.
      1 traduire · 2 traduire ou écrire · 3 écrire · 4 + article obligatoire ·
      5 forme exacte. +1 si juste, −1 sinon, comme les cartes.
- [x] **Bug corrigé : « la soeur » comptait faux.** Le contenu écrit `sœur` avec la
      ligature (un seul caractère) ; on tape `o` puis `e`. `normFR` les rapproche
      maintenant. Une vérification retape chaque traduction des 12 jours au clavier.
- [x] **Bug corrigé : un point oublié comptait faux** au niveau 5. La ponctuation ne
      s'entend pas, elle n'est plus jamais exigée.
- [x] **Bug corrigé : « sprechen » refusé** parce que le contenu dit
      `sprechen (du sprichst)`. Les parenthèses sont des notes pédagogiques, jamais des
      réponses à taper — 13 verbes concernés. Les deux écritures passent désormais.
- [x] Trois garanties posées sur **tout le cours**, pas seulement sur les cas signalés :
      chaque traduction retapée au clavier, chaque phrase sans sa ponctuation, chaque mot
      sans sa note entre parenthèses.
- [x] Auto-test : **430 vérifications**.

## Restructuration ✅ phases 1 et 2 faites le 01/08/2026

Retour d'Exsangue : « j'ai fait les 12 jours en 30 minutes ». Mesuré : 3 phrases d'exemple
par étape, 4,2 écrans, 2 mini-questions. Le squelette était bon, rempli au dixième.

- [x] **Phase 1 — structure Niveau / Chapitre / Étape.** 4 chapitres de 3 étapes,
      regroupement d'étapes consécutives pour ne pas casser la progression linéaire.
      Accueil regroupé par chapitre. Tout l'affichage passe de « jour » à « étape ».
- [x] **Phase 2 — quatre formes d'exercices** (`drills`) : remettre les mots dans l'ordre,
      compléter un trou, transformer une phrase, traduire. Nouveau mode sur l'accueil.
- [x] **Tirage, et non simple mélange** (v3.1). La v3.0 rebattait les mêmes exercices ;
      Exsangue l'a vu tout de suite. On sert 8 exercices parmi 29 et 5 phrases parmi 12,
      en commençant par les moins vus (`S.dseen`). Rien ne revient tant qu'il reste du
      jamais-vu.
- [x] Auto-test : **471 vérifications**.
- [x] **Phase 3a — les exercices des 12 étapes.** Densité validée par Exsangue sur le
      pilote, puis déroulée partout. **339 exercices** au total, 27 à 30 par étape,
      les 4 formes présentes dans chacune. Chaque exercice n'emploie que du vocabulaire
      déjà rencontré aux étapes précédentes.

## Le livre est arrivé — 01/08/2026, 3h du matin

42 photos couvrant **tout le niveau A1**, dans `~/../livre/lecons/` (hors dépôt git).

- [x] Lisibilité vérifiée sur 4 photos : parfaite, y compris les pages penchées.
- [x] **Découverte : la structure notée jusqu'ici était fausse.** Le livre n'a pas de
      « jours ». Il fait 280 pages, 6 niveaux A1→C2, chaque niveau découpé en **unités**
      (dialogue + grammaire + vocabulaire + exercices), avec un test en fin de niveau.
      Le niveau A1 va des pages 3 à 56. Vu « Unité 4 — Niveau A1 » en page 10.
- [ ] **À FAIRE EN PREMIER : lire les 42 photos et dresser le plan réel du niveau A1** —
      combien d'unités, quel point de grammaire dans chacune, quelles listes de vocabulaire.
- [ ] Réaligner les étapes de l'app sur ces unités. Le « 30 étapes prévues » actuel est
      une invention ; le vrai nombre sortira du plan ci-dessus.
- [ ] Vérifier si le découpage en 4 chapitres tient, ou s'il doit suivre les unités du livre.

- [ ] **Phase 3b : les phrases d'exemple.** Seule l'étape 1 est à la
      cible avec 12 phrases ; **les étapes 2 à 12 n'en ont que 3 chacune**. Le
      récapitulatif en tire 5 : avec 3 en réservoir, il les montre toutes et ne
      diversifie rien. Cible : ~12 phrases par étape, dont des reformulations
      (même idée tournée autrement).
- [ ] Les étapes 13 à 30 restent à écrire.
- [ ] Les étapes 13 à 30 restent à écrire.

## Lot 3 — à discuter avant d'attaquer

- [ ] **Éviter les suites logiques.** un-deux-trois, les jours de la semaine… ne doivent pas
      se suivre dans un quiz ou un paquet de cartes : la réponse se devine.
      Demande d'étiqueter le contenu par thème.
- [x] **Écrire la réponse — fait pour les cartes le 01/08/2026.** À partir du niveau 3
      (`WRITE_FROM_BOX`), la carte montre le **français** et demande d'écrire l'allemand :
      c'est le seul sens qui apprenne l'orthographe. En dessous du seuil le mot vient
      d'être vu, on garde « Révéler / Je savais ».
      Tolérant sur la forme (casse, `ae`/`ä`, `ss`/`ß`, espaces), strict sur le mot.
      L'article oublié passe avec un rappel ; un **mauvais genre** compte comme une erreur —
      c'est justement ce qui s'apprend mal tout seul. Bouton « je ne sais pas » toujours
      disponible. Le bouton « écouter » n'apparaît qu'après la réponse, sinon il la donnerait.
- [ ] **Écrire la réponse — reste à faire pour le quiz.** Aujourd'hui encore en QCM.
- [ ] **Dialogue guidé** qui s'adapte au niveau : très aidé en A1 (structure suggérée,
      traduction disponible mais cachée pour ne pas tricher), libre en B2.
      ⚠️ À vérifier avant de promettre : l'app est un fichier HTML seul, sans serveur.
      Un vrai dialogue demande une IA derrière — peut-être possible sur la version publiée
      en ligne, pas sur le fichier local.
