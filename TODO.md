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
      Le niveau A1 va des pages 3 à 56.

## Le plan du niveau A1 ✅ établi le 01/08/2026

- [x] **Les 42 photos sont lues.** Couverture vérifiée page par page : **3 à 60, sans trou**
      (le niveau A1 entier plus son test de fin de niveau). Relevé complet dans
      **`PLAN-A1.md`** — les 35 unités, leurs pages, leur grammaire, leur vocabulaire.
- [x] **Le niveau A1 compte 35 unités**, numérotées 0 à 34. Une unité fait 1 à 3 pages.
      La numérotation redémarre à 1 au niveau A2 (p.61).
- [x] **`TOTAL_PLANNED` corrigé : 30 → 35.** Le 30 venait du titre commercial du livre
      (« Apprendre l'Allemand en 30 Jours ») — le sommaire, lui, ne parle jamais de jours.
      Auto-test toujours au vert : **547 vérifications**.
- [x] **Correspondance établie** entre les 12 étapes écrites et les unités du livre
      (tableau dans `PLAN-A1.md`). Les 12 étapes couvrent 13 unités ; il en reste
      **19 non couvertes** — dont l'alphabet, les salutations, le pluriel, l'ordre des
      mots, les prépositions, les réfléchis, et tout le vocabulaire de situation
      (restaurant, hôtel, transports, aéroport).
- [x] **Tranché par Exsangue le 01/08/2026 : l'app suit le livre unité par unité.**
      Étape N = unité N−1. L'ordre actuel des 12 étapes est donc démonté.

## La restructuration — l'ordre du livre

⚠️ **Conséquence découverte en préparant le travail, à ne pas re-découvrir :** on ne peut
pas se contenter de renuméroter les 12 étapes existantes. La progression est **linéaire**
(valider l'étape N ouvre la N+1) : une étape vide bloque tout ce qui suit. Or renuméroter
les 12 étapes vers leurs positions du livre laisse des trous partout — à commencer par
l'étape 1, qui n'existerait pas. **Il faut donc écrire les unités manquantes dans l'ordre
du livre**, en avançant par un préfixe toujours complet.

**Décision d'Exsangue, 01/08/2026 : les 12 anciennes étapes sont supprimées.** L'app ne
contient plus que ce qui vient du livre. Elles restent dans l'historique git — commit
`8883587` « Les exercices des douze étapes » — et servent de **matière première** : quand
une unité recouvre un sujet déjà écrit, on y repuise au lieu de repartir de zéro.
Les 16 unités concernées sont marquées « ex-étape N » dans la colonne Source.

Ordre de travail, chaque ligne laissant l'app jouable jusque-là :

| Étape | Unité | Source | État |
|---|---|---|---|
| 1 | 0 · L'alphabet et les sons | écrite le 01/08/2026 | ✅ |
| 2 | 1 · Langues et nationalités | écrite le 01/08/2026 | ✅ |
| 3 | 2 · Se présenter | écrite — ex-étape 1 reprise, salutations et table de *sein* retirées | ✅ |
| 4 | 3 · Les salutations | écrite — vocabulaire de l'ex-étape 1 + *bis…*, *Gute Nacht* | ✅ |
| 5 | 4 · Les substantifs, le genre | écrite — ex-étape 2 + les terminaisons du livre | ✅ |
| 6 | 5 · Le pluriel | écrite — contenu neuf | ✅ |
| 7 | 6 · Les nombres | écrite — ex-étape 4 + jusqu'à 10 000 + les ordinaux | ✅ |
| 8 | 7 · Sein et haben, à quoi ils servent | écrite — ex-étapes 1 et 5, + l'âge | ✅ |
| 9 | 8 · Sein et haben au présent | écrite — tables des ex-étapes 1 et 5 | ✅ |
| 10 | 9 · Les couleurs | écrite — ex-étape 8 (partie couleurs) | ✅ |
| 11 | 10 · Les verbes réguliers | ex-étape 3 | ⬜ |
| 12 | 11 · Les verbes irréguliers | ex-étape 9 | ⬜ |
| 13 | 12 · Les déclinaisons, les 4 cas | ex-étape 6 (accusatif) + datif et génitif à écrire | ⬜ |
| 14 | 13 · Les animaux | à écrire | ⬜ |
| 15 | 14 · Es gibt / da ist | à écrire | ⬜ |
| 16 | 15 · La famille | ex-étape 12 | ⬜ |
| 17 | 16 · Les adjectifs | ex-étape 8 (partie adjectifs) | ⬜ |
| 18 | 17 · Vie quotidienne | à écrire | ⬜ |
| 19 | 18 · L'heure | ex-étape 10 (partie heure) | ⬜ |
| 20 | 19 · Les adverbes | à écrire | ⬜ |
| 21 | 20 · Poser des questions | ex-étape 7 | ⬜ |
| 22 | 21 · Le calendrier | ex-étape 10 (partie jours) | ⬜ |
| 23 | 22 · La nourriture | à écrire | ⬜ |
| 24 | 23 · L'ordre des mots | à écrire | ⬜ |
| 25 | 24 · Les verbes modaux | ex-étape 11 | ⬜ |
| 26 | 25 · Les boissons | à écrire | ⬜ |
| 27 | 26 · Ça me plaît | à écrire | ⬜ |
| 28 | 27 · Au restaurant | à écrire | ⬜ |
| 29 | 28 · Es gibt, reprise | à écrire (ou fusionner avec l'étape 15) | ⬜ |
| 30 | 29 · Les transports | à écrire | ⬜ |
| 31 | 30 · La négation | ex-étape 5 (partie négation) | ⬜ |
| 32 | 31 · Les pronoms réfléchis | à écrire | ⬜ |
| 33 | 32 · Les prépositions | à écrire | ⬜ |
| 34 | 33 · À l'hôtel | à écrire | ⬜ |
| 35 | 34 · À l'aéroport | à écrire | ⬜ |

### Avancement au 01/08/2026

- [x] **Étapes 1 et 2 écrites** (unités 0 et 1) : leçon en 5 écrans, 12 phrases d'exemple,
      10 mots de vocabulaire, 5 questions de quiz, 28 exercices chacune.
- [x] **Les 12 anciennes étapes supprimées** à la demande d'Exsangue : l'app ne suit plus
      que le livre. Récupérables dans l'historique git (`8883587`) au fur et à mesure.
- [x] Chapitres réduits à un seul, « Lire et situer » (étapes 1-2). Il s'allongera avec
      le cours : on ne déclare que ce qui existe.
- [x] **Corrigé : trois vérifications nommaient « l'étape 4 » et « l'étape 6 » en dur.**
      Elles cassaient à chaque changement de structure au lieu de signaler un vrai défaut.
      Remplacées par des règles générales : chaque chapitre reprend où le précédent
      s'arrête, le dernier finit sur la dernière étape écrite.
- [x] **Corrigé : cinq vérifications visaient `COURSE[0]` en dur** pour tester les formes
      d'exercices. L'étape 1 portant sur les sons, elle n'a pas d'exercice « remettre dans
      l'ordre » — il n'y a pas encore de phrase à ordonner — et l'auto-test plantait
      (`Cannot read properties of undefined`). Elles visent désormais **la première étape
      qui contient la forme testée**. Une nouvelle vérification s'assure que chacune des
      quatre formes existe quelque part dans le cours.
- [x] Auto-test : **297 vérifications**, toutes au vert. (Le nombre baisse de 609 à 297
      parce que l'essentiel des vérifications portait sur le contenu des 12 étapes
      supprimées — ce n'est pas une perte de couverture, mais moins de contenu à couvrir.)
- [x] Écran d'accueil relu en capture : « 0 / 2 étapes · 35 prévues », les 5 modes en place.

- [x] **Étapes 3 à 6 écrites** (unités 2 à 5), même densité que les deux premières.
      Auto-test : **401 vérifications**. Chapitres : « Lire et situer » (1-2),
      « Aborder les gens » (3-4), « Nommer les choses » (5-6).
- [x] Défaut attrapé par l'auto-test à l'étape 6 : un exercice de remise en ordre à deux
      mots seulement (« Viele Kinder »), donc infaisable — il n'y a qu'un ordre possible.
      Rallongé en « Viele Kinder sind hier ».

- [x] **Étapes 7 à 10 écrites** (unités 6 à 9). Auto-test : **505 vérifications**.
      Chapitre 4 « Être et avoir » (8-10) ajouté.
- [x] **Deux endroits où l'app ne recopie volontairement pas le livre**, notés dans
      `context.md` : l'âge (le livre le range sous *haben*, l'allemand dit *ich bin …
      Jahre alt*) et l'âge retiré de l'unité 6, où il n'a rien à faire.

- [ ] **Reprendre ici : l'étape 11 (unité 10, les verbes réguliers).** Repartir de
      l'ex-étape 3 dans git (`git show 8883587:index.html`) : terminaisons
      -e / -st / -t / -en / -t / -en, sur *spielen*, *lernen*, *kaufen*.
- [ ] Revoir le découpage en chapitres au fur et à mesure : il devra couvrir 35 étapes.

- [ ] **Phase 3b : les phrases d'exemple.** Seule l'étape 1 est à la
      cible avec 12 phrases ; **les étapes 2 à 12 n'en ont que 3 chacune**. Le
      récapitulatif en tire 5 : avec 3 en réservoir, il les montre toutes et ne
      diversifie rien. Cible : ~12 phrases par étape, dont des reformulations
      (même idée tournée autrement).
- [ ] Les étapes 13 à 30 restent à écrire.
- [ ] Les étapes 13 à 30 restent à écrire.

## L'onglet « Le livre » — ouvert le 01/08/2026

Demande d'Exsangue : garder l'app telle quelle — « la partie oral est vraiment
intéressante dans l'état actuel » — et **ajouter à côté un onglet séparé** contenant le
livre lui-même : ses leçons, ses dialogues, ses exercices, et son test final.

- [x] **Dépôt repassé en PRIVÉ.** Condition non négociable : le livre est sous copyright
      (© 2025). Il n'a sa place dans l'app que parce qu'elle est la copie de travail
      personnelle d'Exsangue sur son propre exemplaire. Vérifié : l'adresse publique
      renvoie 404. ⚠️ **Si l'app est republiée un jour, `BOOK` et `BOOK_TEST` doivent en
      sortir d'abord** — c'est exactement pourquoi le livre vit dans ses propres tableaux
      et son propre onglet : la frontière doit rester nette.
- [x] **Trois écrans** : le sommaire des unités, une unité, le test de fin de niveau.
- [x] ⚠️ **Conception corrigée le 01/08/2026, après retour d'Exsangue.** La première
      version était volontairement passive — on lisait, rien n'était corrigé, au motif
      que la correction était le métier du reste de l'app. Exsangue l'a arrêtée net :
      « j'aimerais pouvoir répondre aux questions du livre et que tu me corriges ».
      Il avait raison : **un exercice qu'on ne peut pas faire n'est plus un exercice.**
      Les questions du livre sont désormais **corrigées**, avec le *même* moteur que le
      reste de l'app (`checkAnswer` pour l'allemand, `checkFR` pour le français) — pas un
      second correcteur, qui finirait par diverger du premier.
- [x] Deux sortes de questions : `a` (réponse attendue → correction) et `model` (question
      ouverte type « décrivez votre famille » → réponse possible à comparer). Prétendre
      corriger une question ouverte serait mentir sur ce que l'app sait faire.
- [x] **Toutes les réponses du test de fin de niveau écrites** — 22 exercices, 45 questions.
- [x] Défaut attrapé par l'auto-test : les boutons du livre manquaient dans la liste des
      éléments cliquables. La correction marchait, mais **rien ne se passait au clic**.
      Le test ne l'avait pas vu parce qu'il appelait la fonction directement au lieu de
      cliquer — corrigé lui aussi, il clique désormais pour de vrai.
- [x] Dialogue réplique par réplique, chacune écoutable, **traduction cachée** derrière un
      bouton — pour ne pas la lire avant d'avoir essayé.
- [x] **Unité 0** (l'alphabet, p.3) et **unité 1** (les langues et nationalités, p.4)
      transcrites, dialogue et exercices compris.
- [x] **Test de fin de niveau** transcrit en entier : les 22 exercices, p.57-60.
- [x] Auto-test : **632 vérifications**, dont 14 pour le seul onglet.

- [x] **Deux boutons au lieu d'un**, demandés par Exsangue le 01/08/2026 :
      **Envoyer** dit juste ou faux **sans dévoiler**, pour qu'on puisse réessayer ;
      **Voir la réponse** dévoile. Les confondre, c'est supprimer le deuxième essai —
      or c'est souvent au deuxième essai qu'on apprend.
- [x] **Un indice qui n'en dit pas trop** quand c'est faux : « il manque un mot »,
      « un mot de trop », « tout près, regarde l'orthographe », « pas encore ».
      Sa raison d'être : « peut-être j'ai oublié juste un mot ou mal orthographié ».
- [x] Défaut attrapé au passage : j'avais **redéfini `editDistance`**, qui existait déjà
      dans l'app avec un plafond. La mienne l'écrasait et **cassait le mode oral** —
      l'auto-test l'a vu tout de suite. Supprimée, on réutilise l'existante.
- [x] **Unité 2** (se présenter, p.5-6) transcrite : dialogue Max/Sophie/Klaus, les deux
      parties de la leçon, les deux exercices avec leurs réponses.

- [x] **Unités 3, 4 et 5 transcrites** (salutations · les substantifs et le genre ·
      le pluriel et les 4 cas). Dialogues Alice/Bob/Dylan et Raul/Lorenzo complets,
      grammaire du livre, exercices avec leurs réponses. Auto-test : **766**.

- [x] **Le livre nourrit l'app** (`enrichirDepuisLivre`). Demandé par Exsangue : le
      vocabulaire et les phrases de l'unité N descendent dans l'étape N+1, donc dans les
      **cartes**, **l'oral** et le **récapitulatif** d'un coup — les trois puisent au même
      endroit. Deux règles de tri : une ligne de tableau à **3 colonnes** devient une
      carte (la 3ᵉ est la prononciation), une ligne à 2 reste de la référence — l'alphabet
      et la liste des pays n'ont pas à être récités ; et une réplique de plus de 55
      caractères ne part pas en dictée. Déduplication par mot, sinon on réviserait deux
      fois la même carte.
- [x] **Unités 6 à 9 transcrites** (nombres cardinaux et ordinaux · sein et haben ·
      leur conjugaison · les couleurs). Auto-test : **809**.

- [x] **La touche Entrée fait tout**, demandé par Exsangue : elle valide, puis elle
      enchaîne. Elle marche dans les cartes, l'oral, les exercices **et** les questions du
      livre. L'ancien gestionnaire ne savait que valider, et seulement dans deux modes.
      Deux détails qui comptent : l'écouteur est sur `document` et non sur `view`, sinon
      la touche n'atteint plus rien une fois le champ disparu de l'écran ; et on **valide
      avant d'enchaîner**, sinon deux appuis rapides sautent une carte.
      Auto-test : **813**, dont quatre qui envoient une vraie touche.

- [x] **Unités 10 à 16 transcrites** (verbes réguliers · irréguliers · déclinaisons ·
      animaux · es gibt · famille · adjectifs). Auto-test : **1056**.
- [x] Coquille du livre non recopiée : le tableau des articles p.25 donne *die – einen*
      au féminin accusatif. Au féminin, l'accusatif est identique au nominatif :
      *die – eine*. Noté aussi dans `context.md`.
- [x] Défaut attrapé chez moi : j'avais mis des balises `<b>` dans des énoncés, or ils
      sont échappés à l'affichage — elles se seraient vues en clair. Une vérification
      passe désormais sur **tous** les énoncés du livre.

⚠️ **À SAVOIR — décalage entre le livre et les étapes.** `enrichirDepuisLivre` verse le
vocabulaire de l'unité N dans l'étape N+1. Or `COURSE` s'arrête à l'étape 10 (unité 9) :
**les unités 10 et au-delà n'ont pas encore d'étape**, donc leur vocabulaire ne descend
ni dans les cartes, ni dans l'oral. Elles se lisent et se travaillent dans l'onglet du
livre, mais ne se révisent pas encore. Le décalage se résorbera en écrivant les étapes
11 à 35 — rien à changer dans le code, la couture est déjà là et prendra effet toute
seule dès que l'étape existera.

- [x] **Unités 17 à 20 transcrites** (vie quotidienne · l'heure · les adverbes ·
      les phrases interrogatives). Auto-test : **1096**.

- [x] **Unités 21 à 24 transcrites** (calendrier · nourriture · phrase affirmative ·
      verbes modaux). Auto-test : **1172**.

- [x] **Unités 25 à 28 transcrites** (boissons · das mag ich · restaurant · es gibt).
      Auto-test : **1210**.

- [x] **Unités 29 à 34 transcrites** (transports · négation · pronoms réfléchis ·
      prépositions · hôtel · aéroport).

## ✅ LE LIVRE EST COMPLET — 01/08/2026

**Les 35 unités du niveau A1 sont transcrites**, de l'unité 0 (l'alphabet) à l'unité 34
(l'aéroport), plus le test de fin de niveau. Vérifié par comptage : aucun numéro manquant
entre 0 et 34. Auto-test : **1288 vérifications**, tout au vert.

Chaque unité contient son dialogue (écoutable réplique par réplique, traduction cachée),
ses listes de vocabulaire avec prononciation, sa grammaire, et ses exercices corrigés.
      ⚠️ Ne pas oublier la **3ᵉ colonne de prononciation** sur les lignes de vocabulaire :
      sans elle le mot ne descend pas dans les cartes.
## Le suivi du livre ✅ 01/08/2026

- [x] Demandé par Exsangue : voir qu'une unité est faite, et si elle l'a été sans faute.
      Le sommaire affiche `x / 35 unités terminées`, un ✓ et une étiquette par unité
      (`à lire` · `3 / 11` · **`sans faute`** · **`2 fautes`**). Bilan en bas de chaque
      unité + bouton **Refaire cette unité**.
- [x] Règles posées : **c'est la première réponse qui compte** (sinon « sans faute » ne
      voudrait rien dire, il suffirait d'insister) · **révéler = faute** (c'est le sens du
      bouton) · **champ vide = rien** (on n'a rien tenté) · **questions ouvertes hors du
      compte** (on ne peut pas juger « décrivez votre famille »).
- [x] Enregistré dans `S.bookq`, donc conservé à la fermeture et inclus dans la sauvegarde.

## Trois demandes d'Exsangue ✅ 01/08/2026, après usage

- [x] **Plus aucune carte passive.** « Je n'ai pas l'impression d'apprendre sur les
      niveaux 1, j'apprends beaucoup en écrivant par moi-même. » Il a raison, et c'est un
      défaut connu du principe même de la carte à retourner : « Révéler / Je savais »
      mesure la **reconnaissance**, pas le rappel — on croit savoir parce qu'on reconnaît.
      Désormais **on écrit à tous les niveaux** : au niveau 1 la traduction française
      (`checkFR`, indulgent), au-dessus l'allemand (`checkAnswer`, strict sur le genre).
      `revealBody` et l'action `reveal` supprimées. La flèche gauche vaut maintenant
      « Je ne sais pas » — elle visait « Raté », qui n'existe plus — et reste sans effet
      dans un champ de saisie, sinon on ne pourrait plus corriger une faute de frappe.
- [x] **Le son se lance à l'affichage**, mais **jamais quand il donnerait la réponse** :
      au niveau 1 le mot allemand est déjà à l'écran, donc on le prononce ; au-dessus
      c'est lui qu'il faut écrire, donc on attend la réponse. Trois vérifications.
- [x] **Le sommaire du livre est replié** en six groupes qui ont un sens (« Premiers pas »,
      « Nombres et verbes »…), avec `<details>` natif — accessible au clavier, rien à
      coder. Le groupe de l'unité en cours s'ouvre tout seul.
- [x] **Parcours guidé** : leçon → exercices → cartes → oral → quiz. Le quiz ferme la
      marche parce que c'est lui qui débloque l'étape suivante ; le retirer laisserait la
      porte fermée au bout d'un enchaînement pourtant complet. Une étape sans exercices
      écrits est **sautée** au lieu d'ouvrir un écran vide. Le retour à l'accueil reste
      partout : **on guide, on n'enferme pas**.
- [x] Auto-test : **1639 vérifications**.

## À faire quand Exsangue le dira — indice « où chercher »

Signalé par Exsangue le 01/08/2026 : à l'unité 4, l'exercice 2 demande de traduire
« chez moi », « fiancée », « samedi soir »… mais **la liste de vocabulaire ne contient
que 6 mots pour 7 demandés**. Les réponses sont dans le **dialogue**
(*bei mir zuhause*, *meiner Freundin*, *Samstagabend*…), jamais dans la liste.

Le livre attend donc qu'on relise le dialogue pour y pêcher les mots — méthode
défendable, mais **il ne le dit nulle part**, et sa liste laisse croire qu'elle est
complète. Ce n'est pas un défaut de compréhension d'Exsangue.

**Décision retenue** : ajouter un indice « cherche dans le dialogue » sous les items
d'exercice dont la réponse ne figure pas dans les listes de vocabulaire de l'unité.
On répare le panneau manquant sans réécrire le livre.
Écarté : compléter les listes de vocabulaire — ce ne serait plus son livre.

✅ **Fait le 01/08/2026.** L'indice est **calculé, pas écrit à la main** : pour chaque
question, on compare la réponse au contenu des listes de vocabulaire puis à celui du
dialogue (`indiceOu`, `motsDeLUnite`). Écrit à la main sur 35 unités, il finirait faux
quelque part ; calculé, il reste juste même si une unité change.

On ne signale **que** le cas gênant — la réponse existe dans l'unité, mais ailleurs que
là où on la cherche. Un mot déjà présent dans la liste ne reçoit rien : à force de bruit,
on ne lirait plus les indices utiles. Vérifié sur l'unité 4 : **6 indices sur 7 questions**,
seule « Plage » n'en a pas puisque *am Strand* est bien dans la liste.

## ✅ LE NIVEAU A1 EST COMPLET — 01/08/2026

**Les 35 étapes sont écrites**, de l'alphabet à l'aéroport. Vérifié par comptage :
aucun numéro manquant entre 1 et 35. Auto-test : **2307 vérifications** avec le livre,
**1582** sans, tout au vert. En ligne sur https://kanycl.github.io/deutsch-taeglich/

Deux corrections du garde-fou de publication au passage :
- il guettait des **mots** comme *Tagesgericht* ou *Vorfahren*, et bloquait des mots
  allemands ordinaires que les étapes emploient légitimement. Un garde-fou qui crie à
  tort finit par être contourné : il vérifie désormais la **signature** du tableau `BOOK`
  (le champ `pages` renseigné), pas un lexique.
- il échouait ensuite **sur son propre remplacement**, le stub écrivant un champ `pages`
  vide. La règle exige maintenant au moins un caractère entre les guillemets.

## 🗺️ LA SUITE, dans cet ordre — choisi par Exsangue le 01/08/2026

1. ~~Finir les 10 étapes restantes~~ ✅ **fait**.
2. **Le design.** Lui montrer deux ou trois directions visuelles sous forme de page
   qu'il ouvre sur son iPhone, puis appliquer celle qu'il choisit.
3. **Le multilingue.** Séparer le moteur du contenu : tout ce qui fait tourner l'app
   (cartes, espacement, oral, exercices, quiz, clavier) est déjà indépendant de
   l'allemand ; seul le contenu ne l'est pas. Deux pièges connus d'avance :
   **la progression devra être séparée par langue** (sinon l'étape 3 d'espagnol
   écraserait celle d'allemand), et **le correcteur est écrit pour l'allemand** —
   il tolère `ss` pour `ß`, `ae` pour `ä` ; chaque langue aura ses règles.
   Volontairement en dernier : refactoriser pendant que le contenu bouge encore
   reviendrait à viser une cible mouvante.

À noter : **« Claude design » n'existe pas** comme outil à brancher dans l'app. Ce qui
existe, c'est la conception faite ici, avec la possibilité de **montrer** des maquettes
plutôt que de les décrire.

## 🎯 L'OBJECTIF, fixé par Exsangue le 01/08/2026

**Finir les 35 étapes, puis supprimer l'onglet du livre.**

Ce n'est pas qu'une question de ménage. Les tableaux `BOOK` et `BOOK_TEST` sont la seule
chose qui oblige le dépôt à rester privé — donc la seule chose qui prive Exsangue de
l'app sur son iPhone, puisque GitHub Pages ne sert que les dépôts publics et qu'il a
refusé d'enregistrer une carte bancaire pour Cloudflare.

Une fois les étapes complètes, le livre a joué son rôle de plan : on retire les deux
tableaux, le dépôt repasse en public, et l'iPhone remarche. Tout le reste de l'app est
rédigé indépendamment et peut être publié tel quel.

## Les étapes 11 à 35 — en cours

- [x] **Étapes 11 et 12 écrites** (verbes réguliers · verbes qui changent). Vérifié : le
      vocabulaire des unités 10 et 11 descend bien dans leurs cartes et leur oral — le
      décalage se résorbe tout seul, sans rien rebrancher. Auto-test : **1383**.
- [x] Constaté au passage : **toutes les unités n'ont pas de dialogue** (10 et 11 sont des
      pages de tableaux). Une étape en face d'une telle unité garde ses propres phrases —
      c'est voulu, et une vérification le dit maintenant explicitement.

- [x] **Lecture continue des dialogues**, demandée par Exsangue : bouton « Écouter tout le
      dialogue », réplique surlignée et amenée à l'écran, bouton qui devient « Arrêter ».
      On enchaîne sur l'événement `onend` de chaque réplique, pas sur un minuteur — la
      durée dépend de la voix de l'appareil. Pause de 400 ms entre deux répliques, sans
      quoi les voix se collent. `onerror` relance aussi, pour qu'une réplique ratée
      n'arrête pas tout. **Changer d'écran coupe la lecture** (sinon elle continue par
      dessus l'écran suivant, sans bouton pour l'arrêter), et écouter une réplique seule
      l'interrompt aussi.
- [x] **Étapes 13, 14 et 15 écrites** (les quatre cas · les animaux · il y a).
      Auto-test : **1500**.

- [x] **Étapes 16, 17 et 18 écrites** (la famille · décrire les choses · ma journée).
      Auto-test : **1611**. Chapitre 7 « Décrire et raconter » ajouté.

- [x] **Étapes 19, 20 et 21 écrites** (l'heure · les adverbes · poser des questions).
      Chapitre 8 « Le temps et la question ». Auto-test : **1757**.

- [x] **Étapes 22, 23 et 24 écrites** (le calendrier · à table · l'ordre des mots).
      Chapitre 9 « Dates, repas, charpente ». Auto-test : **1868**.

- [x] **L'oral monte en difficulté**, signalé par Exsangue : « Ja, aber ich habe auch
      italienische Vorfahren » en dictée, trop dur pour son niveau. Le défaut venait du
      tirage, qui mélangeait mots isolés et phrases entières au hasard. La longueur est
      désormais **plafonnée en nombre de mots** — trois au départ, **un de plus par phrase
      déjà sortie du niveau 1**. Mesuré en mots et non en caractères : c'est le nombre de
      mots qui décide de la charge à l'oreille. Une séance n'est jamais vide (repli sur
      les plus courtes). Un ancien test affirmait que les phrases sortaient dès la
      première séance — c'était exactement le défaut : réécrit.
- [x] **Étape 25 écrite** (les verbes modaux). Auto-test : **1909**.

- [ ] **Reprendre ici : étape 26** (unité 25, les boissons), puis 27 à 35.
      Ordre des restantes : 25 les modaux · 26 les boissons · 27 ça me plaît ·
      28 le restaurant · 29 es gibt (reprise) · 30 les transports · 31 la négation ·
      32 les réfléchis · 33 les prépositions · 34 l'hôtel · 35 l'aéroport.
      Matière première pour certaines dans git `8883587` : accusatif (ex-étape 6), famille
      (ex-12), adjectifs (ex-8), heure et jours (ex-10), questions (ex-7), modaux (ex-11),
      négation (ex-5).
      Une unité = `{ n, pages, title, intro?, dialogue?, sections[], exercises[] }`.
      Les items d'exercice prennent soit `a` (réponse attendue → corrigée), soit `model`
      (question ouverte → réponse possible). `fr: true` sur un item dont la réponse est
      en français, pour que `checkFR` prenne le relais de `checkAnswer`.
      **Relire la photo de la page à chaque unité** plutôt que de se fier à la mémoire :
      les dialogues et les listes doivent être exacts.
      Correspondance page → photo : les 42 fichiers de `C:\Shared\atelier\livre\lecons\`
      sont dans l'ordre des pages, du titre (p.1) à la conclusion (p.279-280).
- [x] ~~Hébergement privé pour l'iPhone~~ — **sans objet, et à ne pas ressortir.** Le
      besoin venait du livre, qui obligeait le dépôt à rester privé. `sans-livre.ps1`
      publie désormais une version sans livre : le dépôt est public, GitHub Pages suffit.
      ⚠️ Cloudflare Access demandait **d'enregistrer une carte bancaire** — Exsangue a
      refusé, et il a eu raison de se méfier d'un « gratuit » qui réclame une carte.

## Le contenu A1 relu contre le socle de référence ✅ 01/08/2026

Question d'Exsangue : est-ce que ça vaut le coup de repasser sur les 35 étapes avec le
skill `/allemand` ? **Oui, mais pour une chose précise** — ce qui est mécaniquement vrai
ou faux : les genres, les mots inventés, la fréquence. La clarté et l'ordre des leçons
restent du jugement, aucun fichier ne les tranche.

Fait en une passe automatique plutôt qu'en relecture — voir **`verifier.ps1`**, à relancer
à chaque ajout de contenu :

```
articles du vocabulaire     140 verifies    0 faute
articles dans les phrases   150 verifies    0 faute
mots absents du socle         0
frequence                   312 mots        83 % dans les 5 000 plus courants
```

**Aucune faute dans le contenu.** Les 8 mots au-delà du rang 15 000 (*Reisepass*,
*Bordkarte*, *Haltestelle*…) sont gardés volontairement : la liste de fréquence vient de
sous-titres de films, où le vocabulaire d'aéroport est rare sans être inutile.

Trois pièges du fichier de référence, trouvés en écrivant le contrôle — **à ne pas
re-découvrir** :

- **Cinq colonnes de genre**, pas une. Un nom à genre unique remplit `genus` ; un nom à
  plusieurs genres la laisse **vide** et remplit `genus 1`…`genus 4`
  (`Monat,Substantiv,,m,n` = *der* Monat, *das* Monat en Autriche). Et un même mot occupe
  **plusieurs lignes**. Ne lire que la première colonne de la première ligne donnait
  « Foto = masculin » et signalait *das Foto* comme une faute. Le bon calcul est l'**union**
  des genres — au passage, l'index passe de 90 875 à **99 898 noms** : les lignes à
  genres multiples étaient purement perdues.
- **`$table.Keys` ment.** La liste de fréquence contient le mot `keys` (rang 26692,
  emprunt à l'anglais), qui masque la propriété du tableau PowerShell. Utiliser
  `.psbase.Keys`.
- **Les options de QCM sont fausses exprès.** *das Aufzug*, *den Frau* sont des pièges
  avec `a: 0` sur la bonne réponse. Les contrôler revient à signaler les pièges comme des
  erreurs — `verifier.ps1` les retire avant analyse.

Trois familles sont exclues du contrôle, et c'est voulu : les **pluriels** (toujours
« die », le socle n'indexe que le singulier), les **noms adjectivaux** (*der/die
Verwandte* — le genre suit la personne, pas le mot), et les **questions ouvertes**.
Un contrôle qui crie à tort finit par être ignoré.

## Les exercices de transcription supprimés ✅ 01/08/2026

Retour d'Exsangue : « les exercices où tu me demandes de remplacer ü ou ö par
l'équivalent, je n'aime pas, je n'apprends rien de spécial — je trouverai une solution
pour écrire ö ou ü, sauf ß qui n'est pas du tout sur mon clavier ».

Il avait raison deux fois, et **le code le prouvait** : `normDE` convertit `ä→ae` et
`ß→ss` **avant** de comparer. Donc `normDE("grün")` et `normDE("gruen")` sont la même
chaîne. Les cinq exercices « réécris sans le tréma » de l'étape 1 étaient **impossibles
à rater** : recopier l'énoncé les validait. Ils n'enseignaient rien et ne testaient rien.

- [x] **Les cinq exercices retirés**, ceux sur le ß compris. Le savoir n'est pas perdu :
      les notes des exercices voisins disent que *Strasse* est accepté, et l'étape
      explique les trémas. C'est le *drill* qui était vide, pas la connaissance.
- [x] **Le ß n'est plus jamais exigé, à aucun niveau.** Distinction **matérielle**, pas
      pédagogique : un tréma se compose sur un clavier français, le ß ne s'y trouve
      nulle part. L'oral niveau 5 l'exigeait — il rendait infranchissables *Straße*,
      *groß*, *heißen*. Les trémas, eux, **restent exigés au niveau 5** : Exsangue a dit
      qu'il trouverait une solution, et c'est une vraie lettre allemande.
- [x] **Garde-fou pour que la famille ne revienne pas.** Le critère n'est pas « les deux
      chaînes diffèrent » — trop faible. C'est **`checkAnswer(from, a)`** : recopier
      l'énoncé est-il accepté ? Deux tolérances rendent un exercice creux sans que les
      chaînes se ressemblent — l'orthographe de dépannage, et **l'article facultatif**
      (« Haus » passe pour « das Haus », donc « ajoute l'article » serait tout aussi
      impossible à rater — piège évité de justesse en écrivant le remplacement).
- [x] **Une règle du harnais reformulée, et il faut être franc sur la raison.** Elle
      exigeait 3 formes d'exercices par étape ; elle est tombée en retirant les cinq.
      Mais elle ne tenait **que grâce à eux** — ils lui fournissaient une 3ᵉ forme qui
      n'existait pas. L'étape 1 porte sur les sons : « remettre dans l'ordre » suppose
      une grammaire qu'on n'a pas, « transformer » suppose une règle à appliquer.
      Compléter (10) et traduire (13) sont les deux formes justes. La règle mesure
      désormais ce que son nom annonce — **qu'aucune forme n'écrase les autres** (70 %
      maximum) — et reste générale, sans numéro d'étape en dur.
- [x] Vérifié : le livre ne contient **aucun** exercice de ce type, seulement des
      explications sur l'Umlaut et le ß. Rien n'y a été touché.
- [x] Auto-test : **2311 vérifications**.

## Le design ✅ 01/08/2026 — direction « Ordnung » (Bauhaus)

Trois directions maquettées sur les vrais écrans et montrées à Exsangue sur son iPhone
(A · Verkehr signalétique · B · Das Heft le cahier · C · Ordnung Bauhaus).
**Il a choisi C.**

- [x] **Palette** : primaires franches sur papier `#F4F3EF`, encre `#111`, bleu `#1D4E89`,
      ambre `#F4A300`. `--edge` passe à **0** : au Bauhaus l'angle est droit.
- [x] **Typographie** : `--display` = **Futura**, présente sur iPhone — là où l'app sert
      vraiment. Century Gothic prend le relais sous Windows. **Aucun téléchargement de
      police** : une police chargée depuis le web s'affiche d'abord en secours, et ce
      clignotement se voit à chaque ouverture.
- [x] **L'accueil devient une grille**, ce qui règle le défaut principal : les cinq modes
      étaient cinq rectangles interchangeables. Chacun a maintenant sa couleur et sa
      taille. « Les cartes » occupe deux rangées — la taille encode la charge. Le bleu
      encadre le parcours : « la leçon » l'ouvre, « le quiz » le ferme.

⚠️ **Trois pièges rencontrés, à ne pas re-découvrir :**

- **Le placement passe par `data-go`, jamais par `:nth-child`.** Le deuxième bouton
  bascule entre `cards` et `practice` selon qu'il reste des mots à réviser, et un mode
  peut être absent : une grille positionnelle se décalerait en silence.
- **`.mode` sert AUSSI aux 35 unités du livre** (ligne ~9205). Sans le marqueur
  `modes-home`, colorier les cinq modes coloriait aussi tout le sommaire du livre.
- **Aucune règle de couleur propre au thème sombre**, et c'est voulu : les jetons
  s'inversent déjà, donc le bloc encre de « l'oral » devient un aplat *clair* sur fond
  sombre — la vraie inversion, qui garde le contraste franc. Une première version le
  forçait en gris : il redevenait un rectangle indistinct, soit exactement le défaut
  qu'on corrigeait.

Deux écarts assumés par rapport à la maquette :

- **Pas de bloc rouge sur l'accueil.** La maquette en donnait un à « l'oral » ; écarté.
  Le rouge appartient à l'ERREUR. Sur l'accueil on navigue, dans un exercice on est
  corrigé — si les deux emploient le même rouge, le rouge ne veut plus rien dire.
- **Les pastilles sont cerclées en `currentColor`**, pas remplies d'une teinte fixe.
  La première version posait du blanc à 20 % : invisible dès qu'un bloc devenait clair
  en thème sombre.

Régression corrigée dans la foulée : le nouveau fond (`#F4F3EF`) étant bien plus clair
que le gris qu'il remplace, les panneaux blancs à liseré gris ne s'en détachaient plus.
`.flash`, `.card` et `.opt` prennent un trait franc de 2 px — le Bauhaus dessine ses
limites, autant les dessiner pour de bon.

- [x] Auto-test : **2311 vérifications**, dans les deux thèmes.

## Les réglages ✅ 01/08/2026

Demandé par Exsangue après avoir vu le design : « peut-être rajouter des paramètres pour
modifier les préférences ». Six réglages, choisis par lui : **la voix · le son au
démarrage · le thème · la taille du texte · la couleur des cases · la longueur d'une
séance**. Accessible depuis « Ma progression » sur l'accueil, ou par `#reglages`.

- [x] **Aucun bouton « Enregistrer ».** Le changement prend effet au clic et se voit
      tout de suite. Un écran qu'il faut valider oblige à deviner ce qu'on obtiendra.
- [x] **Toutes les valeurs possibles sont déclarées en un seul endroit** (`VOIX`,
      `TEXTE`, `SEANCES`, `COULEURS`, `THEMES`). L'écran, la validation d'une sauvegarde
      et l'auto-test lisent les mêmes tables — une liste recopiée finit par diverger.
- [x] **`sane()` valide aussi les réglages.** Toute valeur inconnue retombe sur son
      défaut sans emporter les autres : une sauvegarde venue d'une version différente ne
      peut pas rendre l'app illisible.
- [x] **La taille du texte agit sur la RACINE** (`--zoom` sur `html`), pas sur le corps :
      l'app étant dimensionnée en rem, les marges et les boutons grandissent avec les
      lettres. Agrandir le seul corps donnerait de grosses lettres dans des boutons
      restés petits.
- [x] **La couleur ne touche que l'accent.** L'ambre reste l'ambre : il ne décore pas,
      il signale ce qui attend. Et aucune des quatre teintes n'est verte ni rouge — ces
      deux-là appartiennent au juste et au faux.
- [x] Auto-test : **2346 vérifications**, dont 34 pour les seuls réglages.

⚠️ **Trois pièges rencontrés, à ne pas re-découvrir :**

- **Zone morte temporelle.** Les tables de réglages ont d'abord été déclarées *après*
  `let S = load()`, qui les lit via `sane()`. Résultat : échec avant le premier
  affichage, **écran blanc sans message**. Elles doivent rester au-dessus.
- **`data-theme` n'est pas notre canal privé.** `applyPrefs` le retirait sans condition
  quand le thème est « automatique » — or le harnais de capture l'injecte de l'extérieur
  pour photographier le sombre. Toutes les captures sombres sont devenues identiques aux
  claires. On ne retire désormais que ce que l'app a posé (`data-theme-par="app"`).
  C'est l'égalité des tailles de fichier qui a trahi le défaut, pas un test.
- **Couper le son automatique rend l'oral muet** jusqu'à l'appui sur « Réécouter ».
  C'est assumé et écrit dans le réglage : le bouton reste, on ne se retrouve pas devant
  un écran sans issue.

Défaut préexistant corrigé au passage : **`importData` n'appelait pas `sane()`**, alors
que `load()` le fait. Une sauvegarde restaurée n'était donc pas bornée — une progression
venue d'un cours plus long ouvrait une étape inexistante.

## Le rouage et la forme des cases ✅ 01/08/2026

**Le rouage.** Demandé par Exsangue : « rajoute tout ce qui est en bas dans un petit
rouage en haut à droite ». Le bloc « Ma progression » et ses quatre outils occupaient un
tiers de l'accueil pour des actions faites une fois par mois, et repoussaient les cinq
modes — c'est-à-dire ce pour quoi on ouvre l'app.

- [x] Tout est passé dans l'écran des réglages, la progression **en premier** : quand on
      ouvre le rouage, c'est souvent pour savoir où l'on en est.
- [x] Le rouage vit dans l'**en-tête**, hors de la zone redessinée — il est donc sur
      toutes les pages, et il lui faut son **propre écouteur** : la délégation de clic
      est posée sur `view`, qui ne le contient pas.
- [x] C'est un **va-et-vient** : appuyer dessus alors qu'on y est déjà ramène à
      l'accueil, sinon le bouton semblerait cassé.
- [x] Rouage **dessiné en SVG**, pas le caractère ⚙ : sur iPhone celui-ci s'affiche en
      emoji couleur, qui jurerait et ne suivrait pas le thème. Cible tactile de 44 px
      alors que l'icône en fait 22 — un bouton discret ne doit pas être dur à toucher.

**La forme des cases.** Demandé par Exsangue : « peut-on essayer des cercles pour oral,
leçon, etc. au lieu de rectangles ? » — fait **réglable** plutôt que tranché, pour qu'il
essaie sur son téléphone. Le cercle est d'ailleurs l'une des trois formes primaires du
Bauhaus, avec le carré et le triangle : la demande est dans l'esprit de la direction.

Deux choses se perdent en cercles, et c'est écrit dans le réglage :

- le **sous-titre** (« 8 tirés parmi 28 ») ne tient pas dans un disque sans couper les
  mots n'importe où. Il est retiré, pas rétréci — du texte illisible ne vaut pas mieux
  que pas de texte ;
- la **taille ne dit plus la charge**. Cinq disques inégaux à cette échelle se lisent
  mal ; le compte reste affiché sur chacun. Et l'accueil descend nettement plus bas.

⚠️ Les **couleurs sont communes aux deux formes**, seule la disposition change. Les mêler
à la grille obligerait à tout redéclarer pour les cercles, et les deux jeux finiraient
par diverger.

- [x] Auto-test : **2367 vérifications**.

⚠️ **Piège rencontré, à ne pas re-découvrir : `applyPrefs` écrit dans `ORAL_SIZE` et
`DRILL_SESSION`, qui sont globales.** Un bloc de tests qui les dérègle sans les remettre
fausse tous les tests suivants — et l'échec apparaît très loin de sa cause. C'est arrivé
ici : une vérification de l'oral, 400 lignes plus bas, a lâché parce que la restauration
recopiait des réglages incomplets (`SEANCES[undefined]`). La restauration passe désormais
par `PREFS_DEFAUT`.

## Trois défauts vus sur une capture, pas par un test ✅ 02/08/2026

Exsangue a demandé confirmation que le choix de forme était bien dans les réglages. En
photographiant l'écran entier pour le lui montrer, trois défauts sont apparus.

- [x] **`&#183;` s'affichait en clair** dans « Courte &#183; 5 ». `segment()` échappe le
      texte de ses boutons : le code du caractère y devient du texte visible. Remplacé
      par le vrai caractère `·`. ⚠️ **Aucun test ne pouvait le voir** — un test qui
      compare du texte à la même chaîne fautive est d'accord avec lui-même. Ajouté une
      vérification du **rendu** : aucun écran ne doit contenir `&#` ni `&amp;` visible.
- [x] **La pastille « Bauhaus » disparaissait une fois choisie** : sa couleur est celle
      du bouton actif. La rangée des couleurs ne prend donc plus l'aplat d'accent — le
      choix s'y marque par un trait épais et le gras, ce qui reste lisible sans dépendre
      de la couleur.
- [x] **Un test instable démasqué.** « Les phrases longues arrivent » portait sur UN
      tirage, alors que la séance tire 8 éléments parmi ~22 : rien ne garantissait qu'un
      tirage donné contienne une phrase longue. Il a lâché deux fois sur une dizaine de
      passages sans que rien ne change autour, et j'ai d'abord cru à une cause voisine.
      Vingt tirages désormais, comme la vérification jumelle. **Un test qui crie au loup
      une fois sur dix est pire que pas de test** : on finit par ignorer ses échecs.
      Vérifié par 8 passages consécutifs au vert.

Leçon à garder : **regarder l'écran reste indispensable**. L'auto-test dit que l'app
fonctionne, il ne dit pas qu'elle est lisible.

- [x] Auto-test : **2369 vérifications**.

## Douze demandes d'Exsangue — 02/08/2026, après une soirée d'usage

Rangées en quatre lots, du plus rentable à l'heure passée au plus lourd.
**Lot 1 fait**, lots 2 à 4 à venir.

### Lot 1 ✅ 02/08/2026 — ce qu'on croise à chaque séance

- [x] **L'icône est un drapeau allemand.** Trois bandes pleines, noir/rouge/or
      (DIN 6171-1), sans lettre ni logo. Raison du choix : iOS arrondit les angles
      et Android rogne les bords des icônes « maskable » — des bandes horizontales
      survivent aux deux, un logo centré se fait manger les coins. Et à 40 px sur un
      écran d'accueil, une lettre ne se lit plus ; un drapeau, si.
      Corrigé au passage : le manifeste annonçait encore `#EDEEF0`, la couleur de
      fond d'avant le design Bauhaus. Passé à `#F4F3EF`.
- [x] **Le remplissage automatique ne propose plus ni l'adresse ni le nom.**
      `autocomplete="off"` était déjà posé — Safari le LIT puis l'IGNORE dès qu'il
      croit reconnaître un champ d'adresse. En revanche il traite une valeur
      **inconnue** comme « off » : d'où un jeton bidon à la place du mot `off`.
      S'y ajoutent un `name` différent à chaque affichage (c'est lui qui sert de
      crochet aux valeurs enregistrées) et les marqueurs des gestionnaires de mots
      de passe.
      ⚠️ **Limite à dire franchement** : la barre de suggestions de mots d'iOS
      relève du clavier, pas de la page. Aucun attribut HTML ne la fait taire. Ce
      qui disparaît, c'est le bandeau « Remplissage automatique » et ses
      propositions de contact — pas les prédictions de mots.
      Les attributs étaient recopiés à **cinq** endroits → une seule fonction
      `saisieAttrs`. Une correction sur quatre des cinq serait passée inaperçue.
- [x] **Un badge « où suis-je » dans l'en-tête**, et **l'en-tête devient collant**.
      Le badge prend la PLACE du nom de l'app au lieu de s'ajouter à côté : à 390 px,
      titre + badge + série + rouage ne tiennent pas sur une ligne. Sur un écran de
      leçon, « Deutsch Täglich » n'apprend rien ; « L'ORAL » répond à la question.
      Sur l'accueil, où l'on ne peut pas se perdre, le nom revient.
      **Ses couleurs sont celles des cases de l'accueil** : on appuie sur le bloc
      bleu « la leçon », on obtient le bandeau bleu « LA LEÇON » — le badge confirme
      le geste. Le livre et les réglages prennent un aplat sourd : ce ne sont pas des
      étapes du parcours, et chaque couleur de plus est une couleur de moins qui
      veut dire quelque chose.
      L'en-tête est collant parce qu'un en-tête qui défile ne répond qu'à moitié :
      au milieu d'une leçon il est déjà sorti de l'écran. Le rouage devient
      accessible partout au passage.
- [x] **Filigrane de consigne** — « quand on va vite parce qu'on connaît, on se
      trompe : on ne voit pas d'un regard ce qu'on doit faire ». Deux décisions :
      **1.** le filigrane est **dans la boîte**, jamais derrière le champ de saisie.
      Écrire par-dessus un texte, même pâle, gêne la relecture de ce qu'on tape —
      ce serait échanger un défaut de lisibilité contre un autre. La boîte, elle, a
      de la place perdue (14 rem de haut pour un mot).
      **2.** il porte un **verbe court** (« EN ALLEMAND », « COMPLÈTE », « DANS
      L'ORDRE »), pas la consigne entière : un filigrane qu'il faut lire n'est plus
      un coup d'œil. La phrase exacte reste en clair juste dessous.
      Le texte vient de `attr()`, donc une seule règle CSS sert les cartes, l'oral
      et les exercices — le filigrane ne peut pas se désaccorder de sa consigne.
      Pour les transformations il est **tiré du premier mot** de l'instruction
      (« Transforme… », « Remets… ») plutôt que d'une seconde table, qui finirait
      par contredire la première.
      Au passage : la consigne précise n'est plus en gris pâle minuscule — c'est
      elle qu'Exsangue disait ne pas voir.
- [x] Auto-test : **2377 vérifications**.

⚠️ **Deux défauts vus sur une capture, pas par un test** — encore une fois :
- Le filigrane **débordait vers le bas** (`bottom: -.375rem`). Avec
  `overflow: hidden`, ça ne se lisait pas comme un débord voulu mais comme un texte
  coupé — et la cédille de « FRANÇAIS » disparaissait avec.
- Une boîte courte se faisait **traverser** par le filigrane. La place est
  désormais réservée (`padding-bottom`) au lieu d'être partagée.
Conséquence : `test.ps1` photographie maintenant aussi l'écran **`drills`**, le seul
qui porte un filigrane dans une boîte courte.

## ⚠️ DU CONTENU FAUX — signalé par Exsangue le 02/08/2026

**Il avait raison, et il faut le dire franchement : l'app lui a enseigné une chose
fausse.** Question du quiz de l'étape 6 : « Quel genre ne prend JAMAIS de tréma au
pluriel ? », réponse attendue « le féminin ». C'est **faux** — *die Hand → die Hände*,
*die Nacht → die Nächte*, *die Stadt → die Städte*. Les trois genres prennent le tréma.

**L'app se contredisait elle-même** : l'étape 34 enseigne « *Nacht* prend un tréma au
pluriel », et *die Nacht* est féminin. Deux affirmations opposées dans le même fichier.

- [x] **Question remplacée** par une vraie règle, qui porte sur la **terminaison** et non
      sur le genre : *un pluriel en `-en` ou `-n` ne prend jamais de tréma*. Celle-là ne
      souffre aucune exception.
- [x] **La même erreur trouvée deux fois de plus**, non signalée, dans la leçon de
      l'étape 6 : « Le féminin ajoute -n ou -en, et jamais de tréma » et « jamais de
      tréma au féminin ». Corrigées, avec l'exception donnée **après** la règle.
- [x] **Quatre affirmations trop absolues** corrigées dans la foulée. Le tri s'est fait
      en cherchant les mots *jamais · toujours · tous · aucun · sans exception* : c'est
      la famille de phrases où ce genre de faute se loge.
      · « *Uhr* ne prend jamais de pluriel » → faux, *die Uhren* existe (les montres) ;
        c'est vrai **pour dire l'heure** seulement.
      · « notre son v s'écrit toujours *w* » → faux, *die Vase* se dit « VA-ze ».
      · « *viel* avec un verbe, jamais *sehr* » → *ich danke dir sehr* est correct ;
        c'est quantité contre intensité, pas verbe contre adjectif.
      · « avec *du*, toujours *-st* » → *du heißt*, que l'app enseigne elle-même.
      · « un modal ne vit jamais seul » → *ich kann Deutsch* se dit très bien.

### Ce que ça apprend sur le harnais — à ne pas oublier

`verifier.ps1` était **au vert** pendant tout ce temps, et il le reste. C'est normal et
ce n'est pas un défaut : il croise les **articles** et les **mots** avec le socle de
référence, il ne lit pas les **affirmations de grammaire**. Il le dit lui-même en bas de
son rapport. Autrement dit : **aucun outil du projet ne relisait ce que l'app affirme.**
Le seul contrôle possible reste la lecture — et le meilleur détecteur aura été Exsangue.

## 🐛 Un défaut trouvé en enquêtant : les balises visibles

- [x] **88 énoncés de quiz affichaient leurs balises en clair.** `renderQuestion` passait
      l'énoncé par `esc`, alors que 88 d'entre eux emploient `<b>` pour détacher le mot
      allemand du français. À l'écran : « Le \<b\>w\</b\> allemand se prononce… ».
      L'énoncé n'est plus échappé — le contenu de `quiz` est écrit dans le fichier, il ne
      vient ni du réseau ni de l'utilisateur. Les **options**, elles, restent échappées :
      aucune n'a jamais eu besoin d'une balise.
      ⚠️ **Le livre garde l'autre règle** (énoncés échappés, vérification à l'appui) :
      les deux tableaux n'ont pas le même auteur.
- [x] **Vérification ajoutée** : elle parcourt les 35 étapes, répond à chaque question et
      lit le **texte rendu** — jamais la source. Un test qui compare une chaîne à
      elle-même est d'accord avec lui-même : c'est ce qui avait laissé passer `&#183;`.

## Le rouage et les couleurs ✅ 02/08/2026

Deux demandes d'Exsangue, dont une restée en plan la veille.

- [x] **Le bouton des réglages se choisit dans l'app.** Il trouvait le rouage « horrible »
      et demandait comment choisir : la réponse honnête est que ce soit **lui** qui
      choisisse, sur son téléphone, plutôt que moi qui devine depuis une capture.
      Cinq dessins : curseurs (défaut), rouage, le mot « Réglages », trois points, carré
      divisé. Tous en SVG — le caractère ⚙ s'affiche en emoji couleur sur iPhone, qui
      jurerait et ne suivrait pas le thème.
      ⚠️ Le quart de tour à l'ouverture ne vaut que pour le rouage et le carré : les trois
      points et les curseurs tourneraient sans qu'on comprenne pourquoi. C'est la
      **couleur** qui porte l'état partout.
- [x] **Chaque case se peint à la main** — « je veux pouvoir choisir et designer
      moi-même ». Une vraie pastille système par mode, avec toutes les teintes.
- [x] **Le garde-fou de lisibilité.** L'encre du nom est **calculée**, jamais choisie :
      on compare le contraste obtenu avec du noir et avec du blanc (formule WCAG) et on
      garde le meilleur. Un simple seuil sur la moyenne des canaux se trompe sur les
      couleurs saturées — un bleu vif et un jaune vif ont des canaux comparables et
      appellent des encres opposées.
      ⚠️ **Noir PUR, pas le `#111` de l'app**, et l'auto-test l'a imposé : sur un gris
      moyen (`#767676`), `#111` ne donne que 4,16:1, sous le seuil lisible du WCAG. Le
      noir pur garantit **4,58:1 au minimum, quelle que soit la teinte**.
- [x] **Une case non peinte ne fige rien.** On ne pose aucune variable CSS pour elle : la
      feuille de style prévoit un repli (`var(--c-lesson, var(--accent))`). C'est ce qui
      permet aux deux réglages de coexister — la palette (bauhaus / indigo / prune /
      encre) continue de repeindre les cases restées d'origine. Y écrire la couleur du
      thème l'aurait figée : la case se serait dite « d'origine » tout en étant peinte.
- [x] **Le badge d'onglet suit les mêmes variables** que les cases : peindre « l'oral »
      repeint son bloc ET son bandeau. Deux jeux de règles séparés auraient divergé.
- [x] Défaut préexistant corrigé au passage : **`prefs-reset` partageait ses objets** avec
      `PREFS_DEFAUT`. `Object.assign` ne copie que la surface — peindre une case après un
      retour aux réglages d'origine aurait modifié la valeur par défaut elle-même,
      définitivement.
- ⚠️ **Conséquence assumée** : une couleur choisie à la main ne s'inverse pas en thème
      sombre, là où les jetons de l'app le font. C'est le prix du choix libre, et c'est
      écrit dans l'écran des réglages. La lisibilité, elle, reste garantie.
- [x] Auto-test : **2396 vérifications**. `verifier.ps1` : aucun écart d'article.

## Le bouton est FIGÉ — trois points, 02/08/2026

Exsangue voulait trancher une fois pour toutes : « que sur l'appli ce soit fixe et qu'il
n'y ait rien à changer ensuite ». Le réglage à cinq dessins, créé le matin même, a donc
été **entièrement retiré** — constante, préférence, validation, bloc d'écran, aperçu et
tests. Un réglage qui ne sert qu'une fois est un réglage de trop.

**Comment le choix s'est fait, et c'est reproductible** : douze candidats dessinés, posés
dans le **vrai en-tête** de l'app (règle de 3 px, badge d'onglet, cible tactile de 44 px),
publiés en page web qu'Exsangue a ouverte **sur son iPhone** — le seul endroit où l'app
est vraiment utilisée. Il a tapé le n° 9. Une planche de contact sur fond blanc flatte
tout et ne décide de rien.

⚠️ **« Claude design » n'existe pas** comme outil à brancher — c'était déjà noté. Ce qui
existe, c'est ce procédé-là. Il est en cours de normalisation en skill.

- [x] **Trois points empilés**, en SVG (le caractère ⋮ s'affiche en emoji couleur sur
      iPhone, qui jurerait et ne suivrait pas le thème).
- [x] **Plus de quart de tour à l'ouverture** : trois points empilés tourneraient sans
      qu'on voie pourquoi. C'est la **couleur** qui porte l'état — elle le faisait déjà.
- [x] Les tests du réglage sont remplacés par ce qui reste vrai : le bouton existe, il
      ouvre les réglages, et il en revient. C'est le seul chemin vers cet écran, et il
      vit **hors** de la délégation de clic posée sur `view`.

### Lot 2 — le parcours 🔄

- [x] **Expliquer chaque erreur** (`fauteOrtho`). Branché sur les trois écrans de
      correction : les cartes, l'oral et les exercices.
      Le risque n'était pas de ne rien dire — c'était de **dire une bêtise avec
      assurance**. La fonction sépare donc deux familles : le mot visé est le bon et
      seule la forme cloche (on montre où), ou ce n'est pas le bon mot (on renvoie
      `null`, et la règle de l'exercice répond seule).
      Ce qu'elle reconnaît : une lettre à changer, une lettre manquante, une de trop,
      et **deux lettres interverties** — avec sa règle quand c'est le piège *ie / ei* :
      en allemand c'est la **deuxième** lettre de la paire qui donne le son.
      ⚠️ **Ce que l'app pardonne n'est jamais « expliqué ».** `normDE` replie ä sur ae,
      ß sur ss, et ignore la casse : diagnostiquer un tréma enverrait corriger ce qui
      était déjà juste. Trois vérifications l'imposent.
      ⚠️ Le mot montré est celui qui **s'écrit vraiment** (`Straße`), pas sa forme
      repliée (`strasse`) — sans quoi la correction enseignerait une faute.
      Aux exercices, la **faute** vient avant la **règle** : on regarde d'abord son
      erreur, on comprend la règle ensuite.
- [x] Auto-test : **2407 vérifications**.
- [x] **Reprise exacte** — « quand on sort d'un exercice, je veux reprendre exactement
      au même point ». Les séances vivaient déjà dans des variables de module qui
      **survivent** à un changement d'écran (page unique, rien n'est rechargé) : le seul
      obstacle était que chaque vue **redémarrait** sa séance en entrant. On ne redémarre
      plus que s'il n'y a rien à reprendre — séance finie, ou séance d'une autre étape.
      Vaut pour les cartes, l'entraînement, l'oral, les exercices **et le quiz** — ce
      dernier étant le plus important : le recommencer effacerait les mauvaises réponses
      déjà données.
      **L'accueil l'annonce** : « Séance en cours — encore N », et la pastille se cercle.
      Sans marque, reprendre serait une surprise : on rouvrirait « les cartes » en croyant
      repartir à zéro et on tomberait au milieu.
      ⚠️ **Portée exacte** : cela couvre la navigation dans l'app. Fermer complètement
      l'app repart sur une séance neuve — mais rien n'est perdu, les erreurs sont comptées
      **à chaque réponse**, jamais en fin de séance. Recommencer n'efface donc aucune
      faute, l'autre moitié de la demande.

⚠️ **Trois pièges rencontrés là-dessus, à ne pas re-découvrir :**

- **Un vrai bug, révélé par un test des cartes** : les séances survivaient au
  remplacement de l'état. « Tout effacer » rendait la progression vierge, puis rouvrir
  « les cartes » **reprenait la séance d'avant** — des mots venus d'une progression qui
  n'existait plus. Idem après avoir restauré une sauvegarde. `fresh()` appelle désormais
  `oublieSeances()`. Le test attendait un champ de saisie et tombait sur un écran de
  correction : c'est lui qui a trouvé, pas un raisonnement.
- **Zone morte temporelle, encore.** `const seanceDe` doit être déclaré **avant**
  `let S = load()` — `load` appelle `fresh`, qui y touche. Déclaré même deux lignes plus
  bas, l'accès lève une erreur et donne un **écran blanc sans message**. Il a fallu deux
  tentatives pour le placer assez haut. Le fichier connaissait déjà ce piège pour les
  tables de réglages.
- **Trois tests mesuraient désormais une seule séance reprise** au lieu de N séances
  successives — le tirage du quiz sur 40 parties, et deux sur le réservoir d'exercices.
  Ils appellent maintenant `oublieSeances()` entre deux tours. Le test ne mentait pas :
  il disait exactement ce qui se passait.

- [x] Auto-test : **2416 vérifications**.
- [x] **Le relais entre deux phases** — « fin de leçon, hop une animation pour dire
      place à la révision, écrire, puis oral, ensuite place au test ».
      Un écran s'intercale : un aplat pleine largeur aux couleurs du mode qui arrive,
      « Place à l'oral », ce qu'on va y faire en une ligne, et **Commencer**.
      La raison de fond : passer d'un écran de score à un écran d'exercice sans rupture,
      c'est se retrouver en train de répondre avant d'avoir compris qu'on avait changé
      de mode.
      L'animation dure **0,32 s** — une respiration, pas un générique. Au-delà, on attend.
      `prefers-reduced-motion` est déjà coupé globalement dans le fichier.
      **On guide, on n'enferme pas** : « Plus tard · retour à l'accueil » est là aussi.
      Le relais est même le meilleur endroit pour s'arrêter — on vient de finir quelque
      chose, on n'a rien commencé.
- [x] **Le tour se ferme au menu.** « Si on enchaîne les leçons on ne sait plus où on en
      est en sortant. » Le bouton existait déjà ; ce qui change, c'est qu'il est
      désormais **le premier et en couleur**, là où « Leçon suivante » l'était.
      Enchaîner reste possible d'un doigt — on ne retire rien, on change ce qui est
      proposé d'abord.
- [x] **Refaire l'oral sous la moitié.** Seuil à **50 %**, plus indulgent que le quiz
      (60 %) : à l'oreille on est légitimement moins bon qu'à la lecture, et un seuil
      trop haut enfermerait dans une boucle au lieu d'aider.
      ⚠️ **On propose, on ne force pas.** « Refaire l'oral » passe en premier et en
      couleur, la suite du parcours reste offerte juste dessous. Enfermer quelqu'un dans
      un exercice raté est le meilleur moyen qu'il ferme l'app — et ses erreurs sont
      déjà notées, rien ne serait sauvé.

⚠️ **Deux choses vues sur une capture, pas par un test :**

- **Le bouton « Commencer » se confondait avec l'aplat.** Posé sous le relais, le bouton
  bleu de l'app se retrouvait collé sous l'aplat bleu du relais de la leçon et du quiz —
  deux rectangles de la même couleur sans limite lisible. Il vit maintenant **dans**
  l'aplat, en inversé : le bloc devient une seule chose, ce qui arrive et le geste pour
  y aller.
- Chaque mode ne déclare que **deux valeurs** (`--relais-bg`, `--relais-ink`). Le bloc et
  son bouton les lisent tous les deux, le bouton en les échangeant. Des règles séparées
  auraient doublé la table et fini par se désaccorder.

Un test disait « la fin des exercices mène aux cartes » en cherchant `data-go` : le
chemin passe désormais par `data-relais`. Il avait raison de crier — la destination n'a
pas changé, le chemin si.

- [x] Auto-test : **2427 vérifications**.

## Sauvegarde sans fichier ✅ 02/08/2026

Inquiétude d'Exsangue, juste avant de refaire son icône : « si je supprime l'icône et
la refais depuis Safari, je vais perdre ma progression ? »

**La question est légitime et la réponse honnête est « peut-être ».** iOS *peut* donner
à une app ajoutée à l'écran d'accueil un espace de stockage **distinct** de celui de
Safari. On ne parie pas une progression là-dessus.

Or les deux boutons existants reposent sur un **fichier** — un téléchargement et un
sélecteur de fichier — et c'est justement ce qui marche le moins bien dans une app
d'écran d'accueil iOS, où il n'y a ni barre d'adresse ni gestionnaire de
téléchargements visible.

- [x] **Sauvegarde en texte** : un cadre à copier, un cadre à coller. Aucun fichier,
      aucun dossier à retrouver. Sur iPhone c'est probablement le chemin principal,
      pas le chemin de secours.
- [x] **Copier** passe par le presse-papiers **et** sélectionne le texte. L'API exige
      un geste et une page sécurisée, et échoue silencieusement dans certains
      navigateurs embarqués — la sélection laisse toujours l'appui long disponible.
- [x] **Restaurer refuse le vide, le texte illisible et un JSON étranger** à l'app,
      puis demande confirmation. `sane()` borne ce qui entre, comme partout ailleurs.
- [x] ⚠️ **Et surtout : le chemin qui MARCHE est testé.** Sans lui, les trois refus
      ci-dessus ne prouveraient qu'une chose — que l'app sait dire non. Une sauvegarde
      qui refuse *tout*, y compris les bonnes, passerait ces tests haut la main et
      perdrait quand même la progression. Le test force `window.confirm` (sans fenêtre,
      le navigateur répond « non » d'office) et le remet en place dans un `finally` :
      une boîte de dialogue neutralisée pour la suite fausserait des tests très loin
      de leur cause.

**La marche à suivre donnée à Exsangue**, dans cet ordre — ne rien supprimer d'abord :
sauvegarder · ajouter le **deuxième** raccourci sans toucher au premier · ouvrir le
nouveau · si la progression est là, supprimer l'ancien ; sinon, restaurer.

Vu sur une capture, pas par un test : **« RÉGLAGES » s'affichait deux fois**, dans le
badge d'en-tête et dans l'étiquette juste dessous. L'étiquette est retirée — le badge
est arrivé après elle.

### Lot 3 — la carte de progression ✅ 02/08/2026

- [x] **Chemin vertical** — « comme sur Duolingo, des paliers, on avance sur un plan
      vertical, les prochaines leçons en bas grisées, les réussies en vert, en orange
      là où on a des fautes ».
      **Pourquoi le vertical vaut mieux** : la ligne horizontale d'avant tenait 35 étapes
      dans un défilement latéral de 2,5 rem chacune. On y voyait sa position, jamais son
      parcours — et le titre d'une étape n'y tenait pas du tout. Une colonne rend la
      liste lisible et laisse la place au nom.
- [x] **Quatre états** : vert `sans faute` · orange `N fautes · à rattraper` ·
      bleu `tu en es là` · grisé `pas encore ouverte`.
      ⚠️ **L'orange remplace le rouge, et ce n'est pas un détail** : dans le reste de
      l'app, le vert et le rouge appartiennent au juste et au faux. Le vert convient
      (une étape validée *est* une réussite), mais une étape acquise ne peut pas porter
      la couleur de l'erreur.
- [x] **Chaque palier dit son état en toutes lettres**, pas seulement par la couleur —
      qui ne se lit pas par tout le monde, et où « 3 fautes » dit ce qu'aucune teinte
      ne dira. Une vérification l'impose sur les 35.
- [x] **Rattraper efface l'orange.** L'état se juge sur le **meilleur** score, pas sur le
      dernier — c'est l'inverse de la règle du livre, et c'est voulu : Exsangue demande
      justement de « revenir plus tard pour rattraper sa faute », donc rattraper doit
      pouvoir changer quelque chose.
- [x] **L'avancée est jouée une seule fois**, au retour au menu après avoir validé.
      Une animation qui repart à chaque passage sur l'accueil, sans qu'on ait rien
      avancé, cesse d'être une récompense et devient un défaut. Le drapeau vit **hors de
      `S`** : ce n'est pas de la progression, c'est un événement qui n'a pas à survivre
      à la fermeture.
- [x] **Une étape verrouillée est inerte dans le HTML même** (`disabled`, pas de
      `data-lesson`), et non plus seulement au clic. Un test l'a signalé : il exigeait
      que *toutes* les étapes portent le lien. Il avait raison de crier — la règle juste
      est « ce qui est atteignable porte le lien », et c'est plus solide qu'un contrôle
      au moment du geste.
- [x] Auto-test : **2447 vérifications**.

## Les cartes se retournent pour de vrai ✅ 02/08/2026

Demande d'Exsangue : « je veux que ce soient de vraies cartes avec une animation où ça
se retourne, et le fond de la carte dans le thème du mot ou de la phrase inscrite ».

- [x] **Deux faces dans le même bloc**, retournées en 3D (`rotateY`, 0,55 s).
      ⚠️ **Les deux faces vivent en permanence dans le document** — c'est la condition
      même d'un retournement : on ne peut pas animer un *remplacement*. Elles sont
      empilées dans **une case de grille** plutôt qu'en absolu, pour que la hauteur suive
      spontanément la plus haute. En absolu, il aurait fallu figer une hauteur et la face
      la plus longue aurait débordé.
- [x] ⚠️ **Le champ et les boutons restent DEHORS.** À l'intérieur, ils partiraient à
      l'envers avec la face — un champ inversé ne se remplit pas.
- [x] ⚠️ **`data-autosay` ne va que sur la face visible.** Les deux faces existant en
      permanence, un `autosay` resté derrière prononcerait la réponse pendant qu'on la
      cherche encore. Une vérification l'impose.
- [x] **Le retournement est déclenché à l'image suivante** (`requestAnimationFrame`), pas
      au rendu : posée d'emblée, la classe ferait naître la carte déjà retournée et il
      n'y aurait rien à voir. Tout passe par `montreCarte()` — un `show(renderCard())`
      oublié donnerait une carte juste, mais qui ne se retourne pas.

### Le fond thématique

- [x] **Le thème vient de l'ÉTAPE, pas du mot.** Ce n'est pas un raccourci : chaque étape
      du livre *est* un thème — les animaux, les boissons, l'hôtel. Étiqueter 350 mots un
      par un donnerait le même résultat au prix de 350 occasions de se tromper, et il
      faudrait recommencer à chaque mot ajouté. Table `THEME_ETAPE` à part : on voit d'un
      coup d'œil qu'aucune étape n'est oubliée, et un test s'en assure.
- [x] **Dix thèmes**, chacun une teinte posée en **alpha faible** sur la surface : au-dessus
      du blanc elle donne un pastel, au-dessus du gris sombre une nuance profonde. **Une
      seule couleur par thème suffit donc pour les deux thèmes de l'app** — pas de table
      à doubler.
- [x] ⚠️ **Aucun thème n'est vert ni rouge.** Ces deux couleurs disent le juste et le faux
      partout ailleurs : une carte au fond verdâtre laisserait croire à une bonne réponse
      avant même qu'on ait répondu.
- [x] **Le thème est NOMMÉ** dans la ligne d'état (« langues et pays »). Une couleur qu'on
      ne sait pas nommer ne veut rien dire — personne ne devinera « la journée » d'après
      un mauve. Écrit là plutôt que sur la carte : la carte se retourne, cette ligne non.
- [x] Teinte et disque sont dessinés en **`background-image`**, pas en pseudo-élément :
      `::before` porte déjà le filigrane de consigne, et empiler deux pseudo-éléments
      aurait obligé à ranger tout le contenu au-dessus par des `z-index`.

⚠️ **Deux choses vues sur une capture, pas par un test :** le disque du thème percutait le
filigrane dans le coin bas — il est remonté en haut à droite, chacun son coin. Et le
`sed` de renommage avait remplacé `show(renderCard())` **à l'intérieur de `montreCarte`
elle-même**, donc une récursion infinie : écran blanc. Trouvé en lisant la console, pas
le rapport de test.

**Une règle de test a dû être reformulée** : « la traduction est cachée au départ »
vérifiait son *absence du document*. Depuis le retournement elle y est forcément. La
règle juste porte sur ce qu'on VOIT — pas sur la face avant, et carte non retournée.

- [x] Auto-test : **2455 vérifications**.

## La carte allongée, et le clavier qui faisait sauter la page ✅ 02/08/2026

- [x] **Carte allongée** de 14 rem à **20 rem**, à la demande d'Exsangue : 14 donnaient un
      rectangle couché qui ne ressemblait pas à une carte. Pas plus de 20 : à 390 px de
      large la carte occupe 358 px, il faudrait donc 22,5 rem pour être *vraiment* plus
      haute que large — mais le clavier mange la moitié de l'écran. Compromis assumé
      entre la forme et l'usage.

- [x] **« Ça ouvre le clavier, ça bouge la page, le focus est mal géré. »** Signalé juste
      après. **Trois causes qui s'additionnaient**, dont deux introduites le jour même :

      **1. La carte trop haute** poussait le champ très bas ; le clavier d'iPhone prenant
      la moitié de l'écran, le champ sortait de vue et iOS devait rattraper d'un coup.
      → La carte se **rétracte** maintenant : `min(20rem, 46dvh)`. `dvh` est la hauteur
      réellement visible, **clavier déduit** — `vh` l'ignore et n'aurait rien changé.
      Isolé dans un `@supports` : sans `dvh`, tout le `min-height` serait invalide et la
      carte n'aurait plus aucune hauteur.

      **2. L'en-tête collant** (ajouté le matin). Le navigateur amenait le champ au ras
      du haut, c'est-à-dire **derrière** un en-tête qui ne défile pas.
      → `scroll-padding-top: 5rem` sur `html` réserve sa hauteur.

      **3. Deux défilements se disputaient la page.** `show()` replaçait la vue à sa
      position précédente, puis le focus faisait défiler le navigateur ailleurs pour
      montrer le champ. Deux ordres contradictoires à chaque affichage.
      → Quand un champ est présent, **c'est lui qui décide**, et lui seul.

- [x] ⚠️ **Ce que les tests ne peuvent PAS voir, et il faut le dire** : la rétractation et
      la place réservée relèvent de la mise en page réelle. Il n'y a pas de clavier dans
      un navigateur sans fenêtre. Seul le focus automatique est vérifié — y compris qu'il
      **survit au passage à la carte suivante**, la perte de focus étant ce qui referme
      le clavier et fait sauter la page à chaque mot.
- [x] Auto-test : **2457 vérifications**.

## La carte devient PORTRAIT — par la largeur, pas par la hauteur ✅ 02/08/2026

Essai sur l'iPhone, retour d'Exsangue : « la carte est toujours rectangle, et ça n'a rien
changé : quand je veux écrire, la carte n'est plus centrée, parfois je ne vois plus ce
qui est écrit dessus. **Je veux voir le mot de la carte ET ce que j'écris, à chaque
nouvelle carte.** »

**Le premier essai était une erreur d'approche.** Allonger la carte a *aggravé* le
problème. Le conflit, une fois nommé : une carte HAUTE et le champ de saisie ne tiennent
pas ensemble quand le clavier prend la moitié de l'écran. Exsangue a tranché — voir les
deux compte plus que la forme.

- [x] **Changement de levier : on rétrécit la LARGEUR** (17 rem) au lieu d'augmenter la
      hauteur. La carte devient portrait sans coûter un pixel de hauteur.
- [x] **La hauteur prend ce qui reste** : `clamp(8rem, calc(100dvh - 20rem), 21rem)`.
      Tant que la page peut défiler, elle défilera — le navigateur amène le champ à
      l'écran et pousse la carte dehors. **Aucun réglage de focus ne corrige ça** : il
      fallait supprimer le défilement lui-même en faisant tenir l'écran entier.
      `dvh` et non `vh` : c'est la hauteur réellement visible, clavier déduit. C'est
      précisément pourquoi le premier essai n'avait rien changé.
- [x] Le filigrane passe à 1,75 rem sur une carte : « EN FRANÇAIS » à 2,25 touchait les
      deux bords d'une carte de 17 rem.

## L'écran des cartes ne défile plus du tout ✅ 02/08/2026

Photo d'Exsangue, clavier ouvert : la page avait défilé pour amener le champ à l'écran,
et **le haut de la carte — donc le mot — était sorti par le haut**. « Le focus est sur le
texte, ce qui rend la carte à moitié cachée, c'est désagréable. »

**J'avais remplacé un problème par une estimation.** Le calcul était « hauteur visible
moins 20 rem de voisinage » — une estimation de l'en-tête, de la ligne d'état, du champ,
des boutons et des marges. Fausse d'un rem, la page redéfile. Et je n'ai **aucun moyen de
la vérifier** : il n'y a pas de clavier dans un navigateur sans fenêtre.

- [x] **Estimation remplacée par une garantie.** L'écran des cartes fait exactement la
      hauteur visible (`body.plein .app { height: 100dvh }`) et la carte prend **ce qui
      reste**, quel qu'il soit (`flex: 1 1 0`). Plus rien à estimer : c'est la mise en
      page qui mesure, et elle ne se trompe pas.
- [x] Seuls **les cartes et l'entraînement** passent en pleine hauteur. Le livre et les
      leçons sont longs — les enfermer dans une hauteur fixe les rendrait illisibles.
      Une vérification l'impose dans les deux sens.
- [x] ⚠️ **Le maillon qu'on oublie** : `.carte-i`, la grille qui porte les deux faces.
      Sans hauteur propre elle reste à la taille de son contenu, et le `height: 100%` des
      faces se mesure alors sur rien. Vu sur une capture : le bloc prenait bien la place,
      mais la carte restait petite au milieu d'un grand vide.

## 🔴 J'AI CASSÉ LA SAUVEGARDE D'EXSANGUE — 02/08/2026

**Le plus grave de la journée.** À l'ouverture, l'app annonçait « le stockage local n'est
pas possible » et repartait d'une progression vierge.

**La chaîne exacte :** `CHRONO_RECORDS` était déclaré 3 000 lignes SOUS `let S = load()`.
`load()` appelle `sane()`, qui lit cette constante → **zone morte temporelle** → erreur →
avalée par le `catch` de `load()` → `storageOK = false` et retour d'un état neuf. La
première action venait ensuite **écrire par-dessus la vraie sauvegarde**.

**Trois fautes, et la première n'est pas le bug :**

1. **Un `catch` trop large.** Il enveloppait *lire le stockage*, *analyser le texte* et
   *valider les données*. N'importe laquelle échouait, et on accusait le navigateur —
   envoyant chercher du côté de la navigation privée alors que le stockage marchait
   parfaitement. **Un message qui désigne le mauvais coupable fait perdre plus de temps
   qu'une absence de message.**
2. **On écrasait ce qu'on n'avait pas su lire.** C'est ça qui détruit, pas le bug.
3. **Zone morte temporelle, TROISIÈME occurrence dans ce fichier.** Déjà documentée pour
   les tables de réglages et pour `seanceDe`. Toute constante lue par `sane()` doit être
   déclarée au-dessus de `let S = load()` — c'est écrit là-bas maintenant.

- [x] **Les deux pannes sont séparées** : « le stockage refuse » ≠ « le texte est
      illisible », avec deux messages distincts.
- [x] **Une sauvegarde illisible est recopiée sous `KEY-secours` AVANT toute chose.**
      Même si l'app repart à zéro, les octets survivent — et à la fermeture aussi, pour
      qui découvre le problème le lendemain.
- [x] **Le cadre de restauration est pré-rempli** avec cette copie : dire « ta
      progression est à l'abri » en laissant chercher où ne vaut guère mieux que rien.

### ⚠️ Pourquoi 2 501 tests étaient au vert pendant ce temps

**`load()` ne court qu'une fois, au démarrage, bien avant les tests.** Son échec était
avalé, et à l'heure des tests la constante existait — tout marchait. **Un bug qui ne se
produit qu'à l'instant du chargement ne se teste pas en rejouant la fonction : il faut
regarder ce que le chargement a LAISSÉ.**

- [x] Deux témoins ajoutés, et ils sont bêtes exprès : au démarrage, `storageOK` doit
      être vrai et `sauveIllisible` nul. Ils auraient crié à la première seconde.
- [x] Le trajet complet est joué : écrire, relire, retrouver. Puis une sauvegarde
      volontairement illisible, pour vérifier qu'elle est **mise à l'abri** et que le
      stockage n'est **pas** accusé à tort. L'état d'origine est remis en partant — un
      test ne doit pas coûter sa progression à qui lance l'auto-test.
- [x] Auto-test : **2511 vérifications**.

## ⚠️ `dvh` NE VOIT PAS LE CLAVIER — l'erreur qui a coûté deux tentatives

**À ne jamais re-découvrir.** Exsangue a dû signaler trois fois que rien ne changeait
avant que je cherche au bon endroit.

`dvh` (*dynamic viewport height*) suit les **barres du navigateur** — l'adresse, les
onglets. **Pas le clavier.** Sur iPhone, le clavier se pose *par-dessus* la page sans
réduire la fenêtre de mise en page : `100dvh` vaut exactement la même chose clavier
ouvert ou fermé. Les deux premières tentatives s'appuyaient dessus ; elles ne pouvaient
pas fonctionner.

**La seule mesure qui recule quand le clavier monte est `window.visualViewport`.** Elle
n'existe qu'en JavaScript — d'où `suitLeClavier()`, qui la recopie dans `--vv`, lue par
la feuille de style. `100dvh` reste en secours pour les navigateurs sans `visualViewport`.

- [x] Un `scrollTo(0, 0)` accompagne : en pleine hauteur il n'y a rien à faire défiler,
      donc tout défilement est un défilement **parasite** d'iOS cherchant à montrer le
      champ. On le défait aussitôt. Ailleurs on n'y touche pas — les leçons et le livre
      doivent défiler normalement.
- [x] **La carte était « beaucoup trop grande »** sans clavier : elle prenait toute la
      hauteur. Elle a désormais `aspect-ratio: 5 / 7` — les proportions d'une carte à
      jouer — et une hauteur bornée à 23,8 rem. Au-delà elle ne grandit plus, elle laisse
      la place.

## ⚠️ La version est affichée dans les réglages ✅ 02/08/2026

La photo d'Exsangue montrait un défaut **déjà corrigé** : son iPhone servait une page en
cache. On a cherché un bug dans du code qu'il n'exécutait pas.

- [x] « Version du JJ/MM/AAAA HH:MM » sous les outils de progression, tirée de
      `document.lastModified` — la date du **fichier**, donnée par le serveur. Elle ne
      peut pas se désynchroniser d'un numéro écrit à la main, qu'on oublierait de changer
      une fois sur deux.

## ⚠️ Le thème des cartes est FAUX — corrigé à moitié, à finir

Exsangue, immédiatement : « le thème de la carte n'est pas en lien avec le mot ».
**Il a raison, et le raisonnement de départ était faux.**

Le thème venait de l'ÉTAPE. Ça ne vaut que pour les étapes qui *sont* un thème — les
animaux, la table, l'hôtel. Pour celles qui enseignent une règle, le vocabulaire n'est
qu'une série d'exemples sans rapport : **l'étape 1 porte sur les sons**, et son
vocabulaire est *der Bär*, *die Schule*, *das Buch*, *die Straße* — choisis pour ce
qu'ils font entendre. Les afficher sous « langues et pays » était un mensonge.

- [x] **Pis-aller posé** puis **VRAI CORRECTIF FAIT ✅ 02/08/2026** : les **350 mots sont
      rangés un par un** dans `THEME_MOT`, consultée **avant** `THEME_ETAPE`.
      Vérification : *der Bär*, enseigné à l'étape des **sons**, s'affiche désormais en
      « animaux et nature » — c'était l'exemple exact du défaut.
      **Écrits en GROUPES et non en 350 lignes** « mot : thème » : groupés, la liste se
      relit d'un coup d'œil et une erreur de rangement saute aux yeux.
      **Deux thèmes ajoutés en rangeant** : `temps` (« le temps qui passe » se
      distinguait mal des nombres) et `maison` (les objets n'en avaient aucun).
      Douze thèmes en tout.
      ⚠️ **Une vérification exige un thème par mot, et elle échoue en les NOMMANT** —
      une liste de 350 entrées se complète, elle ne se devine pas.
      ⚠️ **Le vocabulaire venu du livre est marqué `livre: true` et exempté.** Il
      n'existe pas dans la version publiée : réclamer son rangement demanderait un
      travail que personne ne verrait jamais. Il garde le thème de son étape.
      C'est ce marqueur qui manquait — sans lui, le contrôle réclamait 319 mots
      fantômes.
- [ ] **Reste le deuxième bénéfice** : se servir de `THEME_MOT` pour éviter les suites
      logiques (*eins, zwei, drei* qui se suivent dans un paquet, où la réponse se
      devine). La matière est là désormais ; il reste à s'en servir dans le tirage des
      cartes et du quiz.

### Lot 4 — les onglets « à part » 🔄

Appelés ainsi par Exsangue : ils ne s'enchaînent jamais après une leçon.

- [x] **Contre-la-montre ✅ 02/08/2026.** 30 secondes, l'allemand s'affiche, on écrit le
      français. Combo à partir de **3** → +1 s ; à partir de **6** → +2 s. Classement des
      **5** meilleurs scores.
      ⚠️ **Onglet à part, dans le coin du livre** — « je ne veux pas qu'après une leçon ça
      me lance dans cet onglet ». Absent de `PARCOURS`, absent de la grille des cinq
      modes. La raison est pédagogique : c'est un jeu de vitesse, il mesure ce qu'on sait
      **déjà**. Le mettre sur le chemin d'apprentissage reviendrait à demander d'aller
      vite avant de savoir.
      ⚠️ **Il ne touche NI au calendrier NI aux niveaux**, comme l'entraînement libre :
      répondre vite n'est pas la même compétence que se souvenir à trois jours
      d'intervalle. Il nourrit le journal `hit`/`miss`, rien d'autre. Deux vérifications.
      ⚠️ **Quitter arrête le compte à rebours** — sans quoi il tournerait sous les autres
      écrans et ramènerait de force à un écran de fin qu'on n'a pas demandé.
      **Le sens est FRANÇAIS → ALLEMAND**, corrigé le 02/08/2026 à la demande d'Exsangue :
      « je veux que ce soit l'inverse ». Le premier jet allait dans l'autre sens, pour
      éviter d'exiger l'orthographe allemande dans un jeu de vitesse. Son choix est
      meilleur : c'est le seul sens qui **apprenne** l'orthographe, comme les cartes
      au-dessus du seuil.
      Deux tolérances reprises des cartes, sans quoi le jeu punirait des réponses justes :
      `checkAnswer` pardonne l'orthographe de dépannage (`ae` pour `ä`), n'exige jamais le
      `ß`, ignore la casse et l'article oublié ; et `autreTraduction` accepte un **autre**
      mot allemand qui traduit la même chose — se faire refuser un synonyme correct dans
      un jeu de vitesse est la meilleure façon de le fermer.
      ⚠️ Une vérification **ancre le sens** : répondre en français ne doit rien compter.
      Une inversion silencieuse ne casserait rien, elle changerait juste complètement
      l'exercice sans que rien ne le signale.
      **Une erreur coûte le combo, jamais du temps** : punir deux fois rendrait une
      mauvaise série irrattrapable. **Passer coûte le combo aussi**, sinon on éviterait
      tous les mots durs sans jamais rien risquer.
      **Le compte à rebours ne redessine pas l'écran** — il n'écrit que dans l'élément du
      temps. Redessiner dix fois par seconde détruirait le champ, donc le focus, et on ne
      pourrait pas écrire un mot entier.
      Masqué tant qu'il y a moins de 4 mots rencontrés. Auto-test : **2481**.
- [x] **Verbes irréguliers ✅ 02/08/2026.** 37 verbes, un tiré au hasard, à conjuguer au
      présent. Onglet « à part » lui aussi, mais **toujours accessible** : contrairement
      au contre-la-montre il ne demande aucun acquis, c'est une table de référence qu'on
      vient réviser.
      ⚠️ **AUCUNE CONJUGAISON N'EST INVENTÉE.** La table est extraite par script de
      `reference/verbes-wiktionnaire.csv` (8 047 verbes) et triée par fréquence réelle.
      Est « irrégulier au présent » un verbe dont la forme `du`/`er` ne se déduit **pas**
      de l'infinitif — c'est exactement ce qu'il faut réviser, le reste se calcule.
      **228 verbes** répondent au critère ; on en garde 37.
      ⚠️ **`sein` est écrit de mémoire, et c'est signalé dans le code.** Le dictionnaire
      de référence **ne le contient pas** — vérifié, aucune ligne. C'est pourtant le
      verbe le plus irrégulier de la langue. Une donnée absente se dit, elle ne se
      maquille pas.
      **Verbes à particule séparable écartés** : leur difficulté est la *place de la
      particule*, pas le changement de voyelle. Les mêler ferait deux exercices en un.
      **Liste choisie à la main** parmi les plus fréquents, pas « les N premiers » : le
      dictionnaire remonte des composés littéraires (*vermögen*, *hinterlassen*) et une
      ligne fautive (*umgehen*, donné au subjonctif).

**⚠️ On ne demande QUE les formes irrégulières** — c'est le point le plus important, et
c'est un principe, pas une économie. Exsangue avait fait retirer les exercices « réécris
sans le tréma » parce qu'ils étaient impossibles à rater : « je n'apprends rien de
spécial ». Faire taper *wir sprechen* à partir de *sprechen* serait exactement la même
chose. Au pluriel, un verbe fort ne change **jamais** de voyelle. La règle se retourne
d'elle-même sur `sein`, seul verbe dont le pluriel sort du moule : lui se demande en
entier.

⚠️ **Le piège du script, rencontré trois fois de suite** : PowerShell 5.1 lit les `.ps1`
en **ANSI**. Un tréma tapé dans le script devient une suite d'octets qui ne correspond
plus à rien — les noms de colonnes ne matchaient pas, et le filtre rejetait les 8 047
verbes **en silence**. Les lettres allemandes sont donc construites par `[char]0xE4` et
consorts, la source restant strictement ASCII. Même piège que `sans-livre.ps1` documente.
Deux autres erreurs de règle au passage : le « -e- d'appui » ne s'applique **pas** après
l, m, n, r, h (sinon *kommen*, *lernen*, *wohnen* passent pour irréguliers), et le `ß`
manquait dans la classe des sifflantes (*heißen*, *schließen* signalés à tort).

- [x] Auto-test : **2501 vérifications**, dont une relecture complète de la table —
      colonnes, doublons, régularité, cohérence du pluriel.
- [x] **Test final A1 ✅ 02/08/2026.** 24 questions, quatre épreuves : **écouter**
      (6, la phrase est prononcée), **lire** (6, sur un texte qui reste affiché),
      **écrire** (6, traduire en allemand), **la langue** (6, grammaire).
      Seuil **70 %** = 17 bonnes réponses.
      ⚠️ **L'épreuve de PAROLE du Goethe-Zertifikat est absente, et c'est dit sur
      l'écran d'accueil du test — avant de commencer, pas après.** L'app sait faire
      entendre de l'allemand, elle ne sait pas écouter. Prétendre évaluer
      l'expression orale en faisant taper des phrases serait mentir sur ce qu'on
      mesure. Mieux vaut un test qui annonce son périmètre qu'un test qui gonfle son
      score.
      ⚠️ **Le seuil officiel (60 %) est affiché à côté du sien.** Son 70 % est plus
      exigeant que l'examen réel ; il l'a choisi en connaissant le chiffre, on ne le
      « corrige » pas en douce.
      ⚠️ **Le A2 n'existe pas encore : le test certifie le A1 et le dit.** On
      n'invente pas un déblocage vers un niveau vide. Une vérification l'impose.
      Le résultat se détaille **par épreuve** — un score global ne dit pas *où* ça
      coince. Refaire le test ne peut qu'améliorer un résultat déjà obtenu, jamais
      l'effacer. Quitter en cours **abandonne** : c'est un examen, on ne sort pas
      revoir la leçon au milieu pour revenir finir ses questions.

⚠️ **Un vrai défaut trouvé par un test, et il valait la peine** : l'écran de résultat
**enregistrait** le score au moment de s'afficher. Le réafficher le réenregistrait — et un
vieux résultat pouvait être écrit par-dessus une progression neuve. **Une vue affiche,
elle ne décide de rien**, sans quoi le simple fait de regarder change l'état. Le calcul
se fait désormais sur le geste qui quitte la dernière question.

Le contrôle le plus utile de la série est le plus bête : **chaque corrigé doit s'accepter
lui-même**. Si `checkAnswer` refusait la réponse du barème, personne n'aurait jamais pu
avoir juste — et rien ne l'aurait signalé.

- [x] Auto-test : **2525 vérifications**. `verifier.ps1` : aucun écart d'article.

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

## 🚀 LE NIVEAU A2 EST OUVERT — 02/08/2026

**Décision d'Exsangue : le A2 ne suit pas le livre.** Deux raisons, dans cet ordre.

1. **La matière manque.** Vérifié ce jour : les 42 photos couvrent les pages **3 à 62**,
   soit tout le A1 plus les deux premières unités du A2 (*der Körper*, *Vorher und
   Nachher*). Ensuite elles sautent à la conclusion (p.279-280). Suivre le livre voulait
   dire s'arrêter à la deuxième étape.
2. **On n'en a plus besoin.** Le programme du A2 est **public et standardisé** (CECRL,
   repris tel quel par Goethe, telc et l'ÖSD). Il est relevé dans
   `~/.claude/skills/allemand/examens.md`, écrit le même jour.

⚠️ **CONSÉQUENCE QUI CHANGE L'OBJECTIF DU PROJET, à ne pas re-découvrir :** le contenu A2
est **le nôtre**, pas celui du livre. Il n'est donc pas sous copyright et **n'a rien à
faire dans `sans-livre.ps1`** — seuls `BOOK` et `BOOK_TEST` en sortent. Le A2 est
publiable dès le premier jour, sans rien retirer.

### Le plan — `PLAN-A2.md`

**28 étapes, numérotées 36 à 63**, réparties en 9 chapitres (13 à 21). Grammaire et
vocabulaire **alternent**, comme au A1. Le cœur du niveau : on quitte le présent — le
passé composé, la subordonnée, et l'adjectif décliné.

Les deux unités A2 photographiées ne sont pas perdues : **le corps** ouvre le niveau
(étape 36) et **avant / après** le referme (étape 63).

### L'architecture — l'app connaît enfin deux niveaux

- [x] **`NIVEAUX`** remplace `TOTAL_PLANNED` et `LEVEL`, qui étaient des constantes
      uniques. Chaque niveau déclare son `prevu` et sa `premiere` étape ; `niveauDe(n)`
      calcule le niveau d'une étape à partir de ces bornes, sans recopier de liste.
- [x] **L'accueil compte DANS le niveau en cours** (`avancementNiveau`) : « 2 / 28 »
      situe, « 2 / 63 » ne dit rien à personne.
- [x] **Le libellé du livre reste `A1` en dur** (`LIVRE_NIVEAU`) : le livre transcrit ne
      couvre que ce niveau, et le figer évite qu'il suive un niveau qu'il ne contient pas.
- [x] **La numérotation des chapitres est continue** (le A2 démarre au chapitre 13).
      Repartir à 1 ferait deux « chapitre 1 » dans la même liste.

⚠️ **Deux endroits mentaient sur le niveau, et un seul a été trouvé par un test :**

- **L'écran de fin du test A1** annonçait « le A2 n'existe pas encore ». La phrase est
  devenue fausse **en silence** le jour où le A2 a existé. Elle est désormais **calculée**
  (`avancementNiveau(NIVEAUX[1]).ecrites`) : elle suit le contenu toute seule, et la
  vérification compare l'écran au contenu, plus à une constante.
- **Le badge de l'en-tête** (`Deutsch Täglich A1`) était écrit **en dur, à deux endroits**.
  Il aurait affiché « A1 » à quelqu'un rendu à l'étape 40. Trouvé **sur une capture**,
  pas par un test — comme les trois défauts du 02/08. Il suit maintenant l'étape en cours.
  Une vérification neuve exige que **l'en-tête et le sommaire disent le même niveau**, et
  elle le contrôle **aux deux bouts du cours** : ils sont peints par deux fonctions
  différentes, c'est exactement la configuration où l'un se met à mentir sans l'autre.

### Chapitre 13 « Raconter ce qui s'est passé » — étapes 36 à 39 ✅

- [x] **36 · Le corps** — 10 parties, les trois genres, le pluriel des paires,
      et `weh tun` (c'est la partie du corps qui est SUJET : *der Kopf tut weh*).
- [x] **37 · Le passé composé** — `haben` + participe en **ge—t**, l'auxiliaire en
      deuxième position et le participe rejeté à la fin. Le `-et` d'appui après t/d.
- [x] **38 · Les participes irréguliers** — les 10 plus fréquents en **ge—en**,
      dont `gegessen` et son double `ge`.
- [x] **39 · Le passé avec sein** — les verbes de déplacement, plus `bleiben`.
      Le point d'appui : le français dit « **j'ai** couru » là où l'allemand dit
      **ich bin gelaufen** — c'est exactement là qu'on se trompe.

⚠️ **Les 26 participes et leurs auxiliaires ont été relevés dans
`reference/verbes-wiktionnaire.csv`** (colonnes *Partizip II* et *Hilfsverb*) avant d'être
écrits. **Aucun n'est de mémoire** — la règle du projet n'a pas d'exception.

- [x] Auto-test : **2674 vérifications**. `verifier.ps1` : 152 articles de vocabulaire et
      178 articles dans les phrases, **0 écart**. Aucun mot rare ajouté : tout le
      vocabulaire A2 tombe dans les rangs courants.
- [x] Thèmes : un thème **`corps`** créé, les 25 participes rangés dans `verbes`.
      Les ranger par le sens du verbe (*manger* → à table) casserait le seul regroupement
      qui compte ici — ils s'apprennent en série, pour leur terminaison.

⚠️ **Piège rencontré, à ne pas re-découvrir :** l'étape 37 s'appelait d'abord « Le passé de
tous les jours ». Ce titre faisait **tomber le garde-fou qui interdit le mot « jour » à
l'écran** — celui qui empêche de revenir à l'ancien « jour N », abandonné au profit de
« étape N ». Le garde-fou a raison de ne pas faire d'exception : c'est le titre qui a
changé. Une règle qui tolère un cas finit par en tolérer dix.

### Chapitre 14 « Le corps, la santé, la cause » — en cours

- [x] **40 · Chez le médecin** ✅ 02/08/2026. Le fil de l'étape est le **mot composé**
      `Kopf` + `Schmerzen` : c'est lui qui rend enfin PRODUCTIF le vocabulaire de
      l'étape 36, jusque-là une simple liste. Chaque partie du corps donne sa douleur
      sans rien apprendre de neuf — `Kopfschmerzen`, `Rückenschmerzen`, et
      `Ohrenschmerzen` où c'est le **pluriel** `Ohren` qui entre dans le composé.
      Les deux tournures sont enseignées **comme équivalentes** : `mein Kopf tut weh`
      (sur le moment) et `ich habe Kopfschmerzen` (chez le médecin). Six exercices de
      transformation passent de l'une à l'autre — c'est là que l'étape 36 est réactivée.
      Rappel du A1 réemployé : `Gute Besserung` prend `Gute` sans `n` parce que
      `die Besserung` est féminin — même mécanique que `Gute Reise` et `Gute Nacht`.
      ⚠️ `mir geht es nicht gut` est **montré sans être expliqué** : le datif arrive à
      l'étape 49. L'expliquer ici surchargerait une leçon qui porte sur le vocabulaire.
- [x] **Le thème `corps` devient « le corps et la santé »** plutôt que d'ouvrir un thème
      à part. Un thème sert à donner un fond de carte qui a du sens ; séparer « le dos »
      de « le mal de dos » n'en aurait aucun.
- [x] Auto-test : **2709 vérifications**. `verifier.ps1` : 159 articles de vocabulaire,
      188 dans les phrases, **0 écart**. Aucun mot rare ajouté.

- [x] **41 · war et hatte** ✅ 02/08/2026. Le prétérit de `sein` et `haben` — les deux
      seules formes courtes qu'on emploie vraiment à l'oral. L'étape dit explicitement
      que c'est **l'inverse de la règle des étapes 37-39** : `ich war krank` et non
      `ich bin krank gewesen`, qui est correct mais que personne n'emploie.
      Deux pièges traités de front : `hatte` **sans tréma** (avec, `hätte` veut dire
      « j'aurais », étape 60), et l'**inversion** après un mot de temps —
      `gestern war ich krank`, jamais « gestern ich war krank ».
      Enchaîne naturellement sur l'étape 40 : *j'étais malade, j'avais de la fièvre*.

⚠️⚠️ **`sein` EST ABSENT DU SOCLE — revérifié le 02/08/2026 : zéro ligne dans
`reference/verbes-wiktionnaire.csv`.** Sa table (`war / warst / waren / wart`) est donc
écrite **de mémoire**, et c'est **signalé en tête de l'étape dans le code**. `haben`, lui,
y est : `Präteritum_ich = hatte` vient bien du socle. Si le socle est complété un jour,
revérifier `sein` en priorité.

- [x] Auto-test : **2744 vérifications**. `verifier.ps1` : **0 écart**. Aucun nom nouveau
      à l'étape 41 (elle n'apporte que des formes verbales et des repères de temps).

- [x] **42 · Dire pourquoi (`weil`)** ✅ 02/08/2026. **Le chapitre 14 est complet.**
      La première subordonnée du cours, et la règle qu'elle installe — **le verbe
      conjugué part à la fin** — resservira telle quelle pour `dass` (45) et `wenn` (50).
      C'est pourquoi elle a une étape entière alors qu'elle tient en une phrase :
      **c'est l'entraînement qui coûte, pas l'énoncé.**
      Le point qui surprend est traité à part : au passé composé, l'auxiliaire passe
      **dernier**, après le participe — `weil ich geschlafen habe`. L'ordre habituel
      s'inverse.
      ⚠️ Les exercices `order` portent volontairement sur la **seule subordonnée**
      (« weil ich krank bin »), sans virgule ni principale : c'est exactement le morceau
      à réordonner, et une virgule collée à un mot rendrait le jeu de cartes illisible.
- [x] Auto-test : **2047 vérifications**. `verifier.ps1` : 160 articles de vocabulaire,
      189 dans les phrases, **0 écart**.

⚠️ **EFFET DE BORD DE LA SUPPRESSION DU LIVRE, attrapé le 02/08/2026 :
`verifier.ps1` était CASSÉ.** Il délimitait le tableau `COURSE` entre
`const COURSE = [` et **`/* LIVRE-DEBUT`** — un repère appartenant au livre, donc
disparu avec lui. Le contrôle s'arrêtait sans rien vérifier.

Il est désormais délimité par sa **propre fermeture** : le `];` en début de ligne, à la
colonne zéro. Toutes les entrées du tableau étant indentées, un `];` collé à la marge ne
peut fermer que `COURSE`. Et surtout **le repère appartient maintenant à ce qu'il
délimite** — il ne peut plus être emporté par la suppression d'autre chose, ce qui était
exactement le défaut.

La leçon est générale : **un repère de découpage doit vivre dans le bloc qu'il découpe.**

## Un dépliant par niveau ✅ 02/08/2026

Demandé par Exsangue : « dans le dépliant Niveau A1 je veux que le A1, et un autre
dépliant en dessous avec le niveau A2 et ses chapitres ». Le sommaire unique mélangeait
les deux niveaux et rien ne disait où l'un finissait.

- [x] `stationsDe(niveau)` construit les chapitres **d'un seul niveau**. Le filtre se fait
      sur les **bornes** de `NIVEAUX`, pas sur une étiquette portée par le chapitre :
      `NIVEAUX` fait autorité sur ce découpage, et une seconde source finirait par le
      contredire.
- [x] **Un niveau sans étape écrite n'apparaît pas.** « Niveau B1 · 0 / 0 » ne promettrait
      que du vide.
- [x] ⚠️ **Les deux niveaux restent FERMÉS au démarrage**, y compris celui où l'on se
      trouve. En ouvrir un rendrait à l'accueil la hauteur qu'on lui avait justement
      retirée à la demande d'Exsangue. Le niveau en cours se lit sur le badge de l'en-tête
      et sur la plaque.
- [x] **Le test « une seule ligne de sommaire » a été rattaché au nombre de niveaux
      écrits** au lieu de la constante `1`. Son intention n'a pas changé — rien d'ouvert
      au départ — mais l'unité de mesure, si. Écrit en dur, il serait retombé au premier
      niveau ajouté.
- [x] **Le contrôle qui compte n'est pas le nombre de dépliants, c'est l'APPARTENANCE.**
      Un chapitre A2 glissé sous « Niveau A1 » ne se verrait qu'en dépliant, et personne
      ne déplie tous les jours. Chaque pastille est donc verifiée contre les bornes de son
      niveau, **et** la somme des pastilles doit couvrir le cours entier — sans quoi une
      étape hors de toute borne disparaîtrait de l'écran sans qu'un test bronche.
- [x] Auto-test : **2053 vérifications**. Vérifié aussi sur capture : « Niveau A1 · 0 / 35 »
      puis « Niveau A2 · 0 / 7 », les cinq modes toujours visibles sans défiler.

### Reprendre ici

- [ ] **Étape 43 · Le logement** (l'appartement, les pièces, les meubles), puis 44 à 63
      selon `PLAN-A2.md`. Elle ouvre le **chapitre 15 « Chez soi, et ce qu'on en pense »**,
      qui n'est pas encore déclaré — le créer avec la seule étape 43, puis l'allonger.
      **On ne déclare que ce qui existe**, sinon l'auto-test échoue — et il a raison.

## Mise en ligne du 02/08/2026

- [x] `sans-livre.ps1` : **966 Ko avec le livre, 841 Ko sans**. Les garde-fous
      structurels (repère `LIVRE-DEBUT`, dialogues témoins, signature `pages: "…"`)
      sont tous passés.
- [x] ⚠️ **La version PUBLIÉE a été testée séparément**, et pas seulement celle du
      disque : **2013 / 2013** sur `docs/index.html`. C'est elle qui tourne sur l'iPhone —
      tester uniquement `index.html` laisserait un défaut du découpage invisible.
      (L'écart de nombre est normal : les vérifications du livre sont sous `if (BOOK.length)`.)
- [ ] **Le test de fin de niveau A2** — en DERNIER, quand les 28 étapes sont là : il doit
      porter sur ce qui a été enseigné. Tant qu'il n'existe pas, ne rien promettre.

## 🔍 AUDIT EXTERNE — le mentor d'Exsangue, 11/08/2026

Exsangue a fait relire l'app par son mentor. Rapport en 7 sections, remis le 11/08 à 16 h 59.
**Il a raison sur presque tout, et deux de ses points étaient des bugs que l'utilisateur
subissait sans savoir les nommer.** Le rapport intégral est reproduit dans la session
`1dfb70b8` ; l'essentiel est repris ici, parce qu'une session finit par disparaître.

Ce qu'il note comme réellement bon, vérifié de son côté : `normDE`/`checkAnswer` (article
oublié pardonné, mauvais article refusé — la bonne distinction pour un francophone),
`editDistance` (élagage correct), `luminance`/`encrePour` (formule WCAG juste, l'argument
du noir pur tient au calcul), la validation `/^#[0-9a-f]{6}$/` avant tout `setProperty`,
et le Leitner à 5 boîtes avec le journal découplé du calendrier.

⚠️ **La critique de fond, celle qui vaut pour tout le reste :** les commentaires du code
affirment des garanties que le code ne tient pas. §1.3 est décrit comme résolu alors qu'il
ne l'était pas, §1.1 avait été rencontré puis contourné localement sans être généralisé.
**Un commentaire n'est pas une preuve.** À se rappeler avant d'écrire « corrigé » quelque part.

### Ce qui a été corrigé le 11/08 ✅

- [x] **§1.1 — le balisage s'affichait en clair.** *« Le corps se dit `<b>der Körper</b>` »*
      à l'écran, et `a &rarr; ä` littéralement. La cause n'était pas une étourderie mais
      une **absence de règle** : `idea` passait par `esc()`, `detail` non ; `check.q` par
      `esc()`, `quiz.q` non. Deux champs voisins, deux traitements, aucune décision écrite.
      **`rich()` est désormais le seul rendu du contenu** : on échappe TOUT, puis on
      réautorise une liste blanche minuscule (`b`, `i`, `u` et six entités). L'ordre compte —
      l'inverse laisserait passer ce qu'on veut neutraliser. Les énoncés d'exercices restent
      sur `esc()` : vérifié, ils ne portent aucun balisage.
      Mesure faite avant de corriger : le gras est employé **2 802 fois** dans le cours pour
      faire ressortir le mot allemand. Le retirer aurait détruit la pédagogie — d'où la
      liste blanche plutôt qu'un échappement total.
- [x] **§1.3 — les tests écrasaient la vraie progression.** La suite écrit pour de vrai dans
      `localStorage` et ne restaurait la sauvegarde qu'à la **dernière ligne** : une exception
      avant, et la progression d'Exsangue restait remplacée par l'état de test.
      `runTests()` est enveloppé dans un **`try/finally`**. Un drapeau distingue « il n'y
      avait rien » de « je n'ai pas pu lire » : sans lui, un `getItem` en échec faisait
      **effacer** la sauvegarde.
- [x] **Les cartes servaient des mots jamais vus** (signalé par Exsangue, pas par le rapport).
      `seed()` était appelé depuis quatre endroits, dont la validation du quiz, qui
      ensemençait l'étape **suivante**. On ratait tout, et chaque erreur ajoute deux cartes :
      le paquet grossissait plus vite qu'on ne le vidait. `lessonView()` est désormais le
      seul appelant hors des tests. `nettoieCartesJamaisVues()` répare une fois au démarrage
      les paquets déjà abîmés — **seules partent les cartes jamais travaillées**, toute trace
      de travail est gardée.
      ⚠️ Le test « le vocabulaire du jour 2 est chargé » **encodait exactement le défaut**.
      Il a été retourné et garde maintenant contre la régression.

### Deux pièges du harnais, à ne pas re-découvrir

⚠️ **`test.ps1` annonçait « Tout passe » sur une app morte.** Il cherchait le rapport dans
le DOM entier — lequel contient le code source, lequel contient les chaînes qui *fabriquent*
le rapport. Il retire désormais les blocs `script` avant analyse et exige un score de la
forme `N / N`. **Vérifié sur une copie volontairement cassée** : l'ancienne logique donne un
faux positif, la nouvelle échoue. C'est la seule façon de tester un test.

⚠️ **Une balise fermante de script écrite telle quelle dans une chaîne JavaScript referme le
bloc** — l'analyseur HTML ne sait pas qu'il lit une chaîne. App morte, écran blanc.
Rencontré **deux fois le même soir** : la seconde, c'était dans le commentaire qui
expliquait la première.

### Ce qui RESTE du rapport — revérifié dans le code le 13/08/2026

- [ ] **§2.1 · `fresh()` partage ses objets avec `PREFS_DEFAUT`** (ligne 7467,
      `Object.assign` = copie de **surface**). `S.prefs.teintes` et `S.prefs.ordre` sont le
      même objet que la constante, et `poseTeinte` mute en place → **on écrit dans les
      valeurs par défaut**. Symptôme visible : après « Tout effacer », des couleurs
      personnalisées choisies plus tôt réapparaissent. Chemins atteints : première
      ouverture, stockage bloqué, sauvegarde illisible, « Tout effacer » — tous retournent
      `fresh()` sans passer par `sane()`, seul endroit qui reconstruit `teintes`.
      → **Copie profonde.**
- [ ] **§2.2 · `sane()` ne valide pas `cards`.**
- [ ] **§2.3 · Restaurer par fichier n'a aucune confirmation** (le collage par texte, si).
      Le fichier écrase directement. Et `URL.revokeObjectURL` est appelé de façon synchrone
      juste après `a.click()` (11869) — plusieurs navigateurs annulent le téléchargement ;
      le `<a>` n'est jamais inséré dans le document non plus.
- [ ] **§2.4 · Entrée détourne l'activation des autres boutons.** Le gestionnaire est posé
      sur `document` : si le focus est sur un bouton quelconque, on tombe sur la branche
      `check-word`, qui fait `preventDefault()` et **valide à la place du bouton focalisé**.
      Toute la navigation clavier hors champ de saisie est faussée.
- [ ] **§2.5 · Une tolérance à l'envers dans le correcteur.** `checkAnswer` refuse à juste
      titre un mauvais article et pardonne un article oublié — mais accepte aussi un article
      **ajouté** là où la réponse n'en attend aucun : *der Hund* est validé quand on attend
      *Hund*. Sur une app dont l'argument est « strict sur le genre », c'est la mauvaise
      direction.
- [ ] **§3 · Les 3 265 lignes de tests sont toujours livrées en production.**
      Vérifié : `docs/index.html` fait exactement le même poids que la source (888 815 o).
      20 % du poids téléchargé par l'utilisateur, et c'est le vecteur du §1.3.
- [ ] **§3 · Code mort** : `enrichirDepuisLivre` n'est jamais appelé (le livre est parti) ;
      `revele` est déclaré, commenté sur 6 lignes, jamais lu.
- [x] **§4 · `lang="de"`** ✅ 13/08/2026 — voir la section dédiée plus bas.
- [ ] **§4 · Aucun service worker** (0 occurrence). Manifeste et icônes sont là, mais il n'y
      a ni cache hors-ligne ni éligibilité à l'invite d'installation. Pour une app qui
      s'annonce « sans compte ni serveur », l'usage hors-ligne est l'attente par défaut.
- [ ] **§4 · `.answer:focus { outline: none; }`** (1204) retire l'indicateur de focus du
      champ principal — échoue WCAG 2.4.7 si le contraste de la bordure ne suit pas.
      Et 17 attributs `aria-` en tout : les écrans sont reconstruits par `innerHTML` sans
      région live, ni le changement d'écran ni la correction ne sont annoncés.

### Deux constats de provenance, notés sans conclusion

- Ligne 11791 : `if (window.claude && window.claude.downloads)` — cette API n'existe que
  dans le runtime d'artifacts de Claude. Le code a été produit et exécuté là.
- Les commentaires forment un journal daté (01 et 02/08/2026) qui s'adresse à Exsangue et
  rapporte ses demandes au fil de l'eau.

⚠️ **Copyright — sa mise en garde reste valable** même après le retrait du livre : la
mécanique et la documentation du contenu sous copyright restent dans le fichier, et la
séparation reposait sur un script manuel. À revérifier explicitement avant toute
publication ou remise notée.

## 🏗️ L'ARCHITECTURE — arbitrage du 11/08/2026, chantier NON COMMENCÉ

Le mentor ne demande pas une correction, il demande un **principe** : *chaque fonction a un
rôle, chaque fichier qui contient ces fonctions aussi.* Sa règle générale, telle qu'il l'a
formulée : **proto jetable → un fichier, on s'en fiche ; truc à maintenir → découpé.**
Il ajoute un argument qui vaut pour ce projet en particulier : une IA travaille moins cher
et plus juste sur un code découpé, parce que les **noms de fichiers** lui disent déjà où
regarder.

L'app est clairement dans le second cas : 63 étapes prévues, 42 écrites, retouchée chaque
semaine.

### Le chiffre qui change le plan

| Bloc | Lignes | Ce que c'est |
|---|---:|---|
| `<style>` | 1 613 | le CSS |
| `COURSE` | 5 509 | **le contenu du cours** (données) |
| `runTests` | 3 265 | les tests, **livrés en production** |
| thèmes, verbes, config | ~400 | données |
| **le reste** | **~4 300** | **le code réellement maintenu** |

Le « monstre de 15 000 lignes » est en fait **4 300 lignes de code noyées dans 9 000 lignes
de contenu et de tests**. Conséquence : **le découpage le plus rentable ne demande de
toucher aucune fonction.** Sortir le contenu et les tests est mécanique, sans risque, et
divise le fichier par trois.

### La décision : modules ES natifs, découpés par fonctionnalité

Les navigateurs lisent nativement `import`/`export` : on découpe en vrais fichiers **sans
build, sans npm**. C'était la contrainte d'origine (« zéro build, zéro dépendance ») — mais
on en avait tiré « donc un seul fichier », et c'était le mauvais raccourci.

```
index.html        la coquille HTML, et rien d'autre
styles/           le CSS par zone
donnees/          cours-a1.js · cours-a2.js · themes.js · verbes.js
moteur/           sauvegarde.js · correcteur.js · leitner.js · voix.js · rendu.js
ecrans/           accueil.js · lecon.js · cartes.js · oral.js · quiz.js · exercices.js · reglages.js
tests/            hors du fichier publié
```

**Par fonctionnalité et non par couche, parce que l'app EST ses cinq modes.** Quand Exsangue
dit « l'oral est trop dur », on doit ouvrir un fichier, pas trois. (Le consensus général :
par couche tant que c'est petit, par fonctionnalité dès que ça grandit.)

**Le point non négociable :** le rendu vit dans **un seul** fichier. Le bug du `<b>` visible
n'était pas une étourderie, c'était le symptôme mécanique de 40 endroits qui décidaient
chacun dans leur coin. Tant que c'est éparpillé, ça revient.

⚠️ **Le seul vrai coût :** les modules ES **ne se chargent pas en `file://`**. L'iPhone s'en
fiche (GitHub Pages sert en https), mais `test.ps1` ouvre le fichier en local. Vérifié : ni
Node ni Python ne sont installés (le `python.exe` du système est un leurre du Microsoft
Store). Il faut donc écrire un **`serveur.ps1`** d'une quarantaine de lignes — rien à
installer, pas besoin d'admin.

### L'ordre du chantier

- [x] **1. Sortir `COURSE` et `runTests` du fichier** ✅ 13/08/2026 — voir ci-dessous.
- [ ] **2. Découper `moteur/` puis `ecrans/`** — là seulement on touche au code, et là
      seulement les modules ES (donc `serveur.ps1`) deviennent nécessaires.
- [ ] **3. Ensuite : `lang="de"`, service worker, et les §2.x du rapport.**

### ✅ La première coupe — 13/08/2026

**Un fichier de 15 315 lignes est devenu cinq.** Aucune fonction n'a été touchée : la coupe
est purement mécanique, et l'auto-test rend **exactement le même score qu'avant** (2070).

| Fichier | Lignes | Rôle |
|---|---:|---|
| `index.html` | 1 686 | la coquille et le CSS |
| `donnees/cours.js` | 5 525 | le contenu du cours, données pures |
| `app.js` | 4 704 | **tout le code réellement maintenu** |
| `tests/tests.js` | 3 385 | l'auto-test — **plus jamais publié** |
| `demarrage.js` | 32 | l'amorce, chargée en dernier |

Le chiffre annoncé se vérifie : **4 704 lignes de code**, le reste était du contenu et des
tests. La version publiée passe de **868 à 719 Ko** — 147 Ko de tests que l'utilisateur
téléchargeait pour rien.

⚠️ **SCRIPTS CLASSIQUES, PAS MODULES ES — et c'est une correction de l'arbitrage du 11/08.**
Vérifié empiriquement le 13/08 sur une page d'essai minimale, dans le Chrome de la machine :

| | ouvert en `file://` |
|---|---|
| `<script src="app.js">` | **se charge** ✅ |
| `<script type="module">` + `import` | **ne se charge pas** ❌ |

`test.ps1` ouvre l'app en `file://`. Passer aux modules maintenant aurait donc imposé
d'écrire `serveur.ps1` **dans la même opération**, pour un gain nul à ce stade : les
`const` et `let` de premier niveau d'un script classique restent visibles d'un fichier à
l'autre, ce qui est précisément ce dont cette coupe avait besoin. Les modules deviendront
utiles à l'étape 2, quand il faudra déclarer qui dépend de qui — et le serveur avec eux.

**L'ordre de chargement porte le sens** : données → code → tests → démarrage. `demarrage.js`
existe comme fichier séparé pour cette seule raison — il appelle `runTests()`, qui vit
ailleurs, et un script classique ne peut appeler que ce qui est déjà chargé.

### Trois contrôles cassaient en silence, et c'est la leçon du 02/08 qui les a fait chercher

Un outil qui pointe un fichier survit à la disparition de ce fichier **sans rien dire**.
Les trois ont été repérés en se demandant *« qui lit `index.html` ? »* avant de couper —
et non après.

- [x] **`verifier.ps1` lisait `COURSE` dans `index.html`.** Il pointe désormais
      `donnees/cours.js`, et **refuse de se rabattre sur `index.html`** si le fichier
      manque : un repli silencieux ferait passer le contrôle à côté du cours entier, ce qui
      est exactement l'accident du 02/08.
- [x] **`publier.ps1` ne scrutait qu'`index.html`** pour le garde-fou copyright. Le code
      étant sorti du HTML, il ne voyait plus rien passer. **Il scrute maintenant tous les
      fichiers publiés.** *Un contrôle doit suivre ce qu'il contrôle, jamais l'endroit où il
      se trouvait au départ.*
- [x] **`test.ps1 -Dark` écrivait sa copie dans `%TEMP%`**, où les `.js` ne sont plus à
      côté : la page se serait affichée vide et la capture aurait montré une app morte sans
      que rien ne le signale. La copie reste dans le dossier du projet, et est effacée après.

### La garantie qu'on a failli perdre — `test.ps1 -Publie`

Sortir les tests de la production fait **disparaître la possibilité de tester ce qui est
réellement publié** — une garantie que le projet appliquait depuis le 02/08 (« la version
publiée a été testée séparément »). La perdre en silence aurait été exactement le reproche
du mentor : une garantie annoncée quelque part, et plus tenue nulle part.

`test.ps1 -Publie` la reconstitue : il repose les tests dans `docs\` le temps d'une
exécution, dans une page à part, puis efface. **Le ménage a lieu avant toute analyse**,
donc avant tout `exit` — rien de temporaire ne peut survivre dans `docs\`, qui part tel quel
sur GitHub Pages. Il refuse aussi de tourner si `docs\index.html` contient **déjà** les
tests : ce serait la preuve que `publier.ps1` a échoué à les retirer.

**Vérifié le 13/08 :** `2070 / 2070` sur la source **et** sur la version publiée, `docs\`
propre après coup, et la version publiée démarre bien **sans** fichier de tests — `#test`
y retombe sur l'accueil au lieu de tuer l'app (garde `typeof runTests === "function"`).

⚠️ **Piège rencontré pendant la coupe, déjà documenté et re-rencontré quand même :
PowerShell 5.1 lit les `.ps1` en ANSI.** Le script de découpage contenait des tirets longs
et des guillemets français dans les en-têtes qu'il écrivait — ils sont ressortis en
`â€"` dans les cinq fichiers produits. Corrigés à la main. **Un `.ps1` reste en ASCII pur**,
et c'est écrit en tête de `publier.ps1` depuis le 02/08.

## ✅ `lang="de"` — l'allemand est enfin annoncé comme de l'allemand, 13/08/2026

Point le plus lourd du §4 de l'audit, et il avait raison : la page est déclarée `lang="fr"`
— ce qui est juste, l'interface est en français — donc un lecteur d'écran prononçait
*der Körper* avec une **voix française**. Sur une app d'apprentissage des langues, c'est le
défaut d'accessibilité qui coûte le plus cher. `<html lang="fr">` reste inchangé.

### D'où vient la liste des éléments allemands : de la feuille de style

L'app marquait **déjà** l'allemand, visuellement, par la police `var(--de)` — 16 règles CSS.
`marqueAllemand()` lit ces règles **dans la feuille de style au moment de l'exécution**
(`document.styleSheets`, `r.style.fontFamily === "var(--de)"`) et pose `lang="de"` sur ce
qu'elles désignent, après chaque injection de HTML.

**Recopier ces sélecteurs dans une constante JavaScript aurait créé une seconde source de
vérité**, et le projet a déjà payé deux fois pour ça (le badge de l'en-tête, l'écran de fin
du test A1). Ici, une règle CSS neuve portant la police allemande est marquée **toute
seule**, sans que personne ait à y penser.

Vérifié avant d'écrire la moindre ligne : le CSSOM rend bien `"var(--de)"` comme valeur de
`fontFamily`, et `selectorText` conserve les listes à virgules.

Quatre endroits injectent du HTML, tous branchés : `show()`, le retour des questions du
livre, la réponse modèle d'un exercice ouvert, et le bandeau du titre — où **« Deutsch
Täglich » est de l'allemand** et était lu en français.

### L'exception, et elle est réelle : le champ de saisie

`.answer` porte la police allemande dans **tous** les exercices, y compris ceux qui
attendent une réponse **en français** (la carte de niveau 1, qui montre l'allemand et
demande le sens). Le style ne peut donc pas décider ici : la langue est posée **à la
source**, par `saisieAttrs(label, enAllemand)`. Sept champs sur huit sont en allemand ; le
huitième porte un commentaire qui dit de ne pas le « corriger ».

⚠️ Le mode oral est le cas subtil : `saisieAttrs("Ce que tu entends", it.task === "write")`.
Le même champ attend l'allemand en dictée et le français en traduction.

### Six vérifications, dont une qui regarde l'écran et pas la fonction

La vérification qui compte lit le **style calculé** : tout ce qui s'affiche dans la police
allemande, sur dix écrans, doit être annoncé en allemand. Elle ne réutilise **pas** la liste
de sélecteurs de `marqueAllemand` — la comparer à elle-même serait exactement le défaut de
l'ancienne « sécurité : le HTML des contenus est échappé », qui mesurait `esc()` en vase
clos et passait pendant que l'écran était cassé.

**Éprouvée sur une copie volontairement cassée** : en retirant l'appel dans `show()`, elle
échoue et nomme les fautifs (`home · de « Das Alphabet »`). Un test qui n'a jamais échoué
ne prouve rien.

Auto-test : **2076 / 2076**, source et version publiée.

### ⚠️ Ce que la marque a révélé : le gras ne veut pas toujours dire « allemand »

La convention du projet est *gras = mot allemand* — 2 802 emplois. En marquant, **16 sont
en réalité du français mis en valeur**, et sont donc désormais annoncés avec une voix
allemande. C'est 0,6 % : la marque reste très largement gagnante (2 786 mots allemands enfin
prononcés correctement), mais ces 16-là sont à reprendre.

⚠️ **Ne pas se fier à un comptage automatique ici.** Un premier balayage en a annoncé 46 :
il prenait `<b>-en</b>` et `<b>-et</b>` (suffixes allemands) pour le mot français « en »,
`<b>au</b>` (diphtongue allemande) pour la préposition, `<b>des</b>` (génitif) pour l'article
français, et `<b>les</b>` pour un morceau de `ge**les**en`. **Chaque cas doit être lu dans sa
phrase.**

| Étape | Le gras français |
|---|---|
| 1 | quatre signes en plus |
| 3, 5 | toujours |
| 5 | tout |
| 6 | jamais · les trois genres |
| 13 | Seul le masculin change. |
| 17 | jamais |
| 21 | à la fin |
| 24 | parenthèse verbale |
| 25 | même forme |
| 26 | un verre de vin |
| 32 | déjà un complément |
| 33 | Si tu vas quelque part · Si tu y es déjà |
| 36 | la tête fait mal |

- [ ] **Trancher avec Exsangue.** Le correctif évident est de passer ces 16 en `<i>`, déjà
      dans la liste blanche de `rich()` — mais **c'est un changement visuel** (le gras
      insiste plus que l'italique), donc son choix, pas le mien.
      ⛔ **Ne PAS ajouter d'attribut `lang` dans le contenu** : `rich()` n'accepte que des
      balises nues, et lui faire accepter des attributs rouvrirait exactement la brèche
      refermée le 11/08.
