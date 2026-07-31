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
