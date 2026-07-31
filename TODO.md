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

## Lot 3 — à discuter avant d'attaquer

- [ ] **Éviter les suites logiques.** un-deux-trois, les jours de la semaine… ne doivent pas
      se suivre dans un quiz ou un paquet de cartes : la réponse se devine.
      Demande d'étiqueter le contenu par thème.
- [ ] **Écrire la réponse** au lieu de cocher, pour retenir l'orthographe. Plutôt à partir
      d'un certain niveau, pas au tout début.
- [ ] **Dialogue guidé** qui s'adapte au niveau : très aidé en A1 (structure suggérée,
      traduction disponible mais cachée pour ne pas tricher), libre en B2.
      ⚠️ À vérifier avant de promettre : l'app est un fichier HTML seul, sans serveur.
      Un vrai dialogue demande une IA derrière — peut-être possible sur la version publiée
      en ligne, pas sur le fichier local.
