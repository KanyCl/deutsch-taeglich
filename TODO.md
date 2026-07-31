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

## Lot 2 — le système de révision

- [ ] **Cartes mélangées.** Toujours le même ordre aujourd'hui.
- [ ] **Repiocher les mots ratés.** Un mot raté revient, mais accompagné d'un mot su tiré au
      sort — pour ne pas terminer la session en boucle sur ses seules erreurs.
      Priorité aux mots au plus fort pourcentage de fautes.
- [ ] **Apprentissage irrégulier.** Pouvoir en faire plus un jour où on a le temps. Ce qui
      bloque aujourd'hui : les cartes se grisent avec « reviens demain » (`index.html:1388`).
      Les leçons, elles, ne sont pas bloquées.
- [ ] **Journal des erreurs.** Enregistrer quelle question et quel mot sont ratés, et combien
      de fois — pour pouvoir travailler les vraies fautes. (La progression, elle, est déjà
      sauvegardée automatiquement.)

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
