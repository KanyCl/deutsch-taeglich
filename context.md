# Contexte — Deutsch Täglich

## Ce que c'est

Une application web personnelle pour apprendre l'allemand un peu chaque jour.
Usage strictement privé (Exsangue, un seul utilisateur). Pas de compte, pas de serveur,
pas de publication sur un store.

Adossée au livre papier d'Exsangue : **Werner Dubois & Alvaro Garcia Noble, © 2025,
tous droits réservés**, 280 pages.

⚠️ **Le titre « Apprendre l'allemand en 30 jours » noté ici jusqu'au 01/08/2026 était faux.**
Photos du livre reçues le 01/08/2026 : il n'y a aucune notion de « jour ». Structure réelle :

```
6 niveaux : A1 (p.3-56) · A2 (61-106) · B1 (111-173) · B2 (178-220) · C1 (225-240) · C2 (245-264)
└── chaque niveau est découpé en UNITÉS
    └── chaque unité contient : un dialogue, des règles de grammaire,
        des listes de vocabulaire, des exercices
└── un test de niveau à la fin de chaque niveau
```

Le « 30 étapes prévues » affiché par l'app est donc une invention à corriger : il faut
s'aligner sur le nombre réel d'unités du niveau A1.

**Photos** dans `~/../livre/lecons/` (42 fichiers, tout le niveau A1) — **hors du dépôt git**,
qui est public. Elles ne doivent jamais y entrer.

**Usage du livre** : on s'en sert comme *plan* — ordre des unités, points de grammaire,
listes de vocabulaire. Ce sont des faits, non protégeables. Les textes, dialogues et
exercices du livre ne sont **pas** recopiés : l'app est publiée publiquement, et son
contenu est rédigé indépendamment.

## Comment ça marche

Cinq modes, articulés autour d'un « jour » courant :

1. **La leçon** — 4 à 5 étapes courtes, une idée par écran. Certaines étapes posent une
   mini-question qui **bloque** le passage à la suivante tant qu'on n'a pas répondu.
2. **Les cartes** — révision espacée du vocabulaire, 5 niveaux
   (intervalles **0 / 0 / 1 / 4 / 16** jours). Un mot raté perd **un** niveau.
   Les niveaux 1 et 2 sont des étapes d'apprentissage franchies dans la même séance :
   un mot neuf est vu une fois, puis **écrit le jour même**.
3. **Le quiz** — 5 questions. 3 bonnes réponses sur 5 valident le jour et débloquent le suivant.
4. **L'entraînement libre** — quand rien n'est dû, ou pour en faire plus. Reprend les mots
   les plus ratés, note les réponses, mais **ne touche pas au calendrier** : réviser en
   avance ne doit pas dérégler l'espacement.
5. **L'oral** — aucun texte à l'écran. La phrase est prononcée, et il faut soit l'écrire en
   allemand (dictée), soit la traduire. Puise dans le vocabulaire **et** les phrases de la
   leçon. Ne touche pas au calendrier non plus.

Une « série » (streak) compte les jours consécutifs de travail.

Chaque mot compte ses réussites et ses échecs (`hit` / `miss`), chaque question de quiz
ratée est comptée dans `S.qmiss`. C'est ce journal qui alimente la priorité de
l'entraînement et le compteur de « mots fragiles » sur l'accueil.

## Décisions prises et pourquoi

| Décision | Raison |
|---|---|
| PWA / page web plutôt qu'Android natif | Le compte `franky` est standard : impossible d'installer Android Studio + JDK 17 sans l'admin. Une page web ne demande rien. |
| Un seul fichier `index.html` | Zéro build, zéro dépendance, zéro `npm install`. Le fichier s'ouvre tel quel et se publie tel quel. |
| Contenu écrit à la main dans `COURSE` | Pas de base de données ni d'API à maintenir. Ajouter un jour = ajouter un objet au tableau. |
| Progression dans `localStorage` | Suffisant pour un usage mono-appareil. Sauvegarde/restauration JSON pour ne rien perdre. |
| ~~Pas de `<!doctype>` ni de `<html>` dans le fichier~~ — **abandonné le 31/07/2026** | Valait tant que l'app était publiée en Artifact, où le format enveloppe le fichier. Mais ce mode d'affichage (dans un cadre sur claude.ai) empêchait iOS de sauvegarder la progression. Le fichier est donc une page HTML complète, hébergée seule. |
| Hébergement sur GitHub Pages | Gratuit, adresse propre (indispensable pour le stockage iOS), et le dépôt git sert aussi d'historique. Dépôt public : c'est la contrepartie du gratuit, sans conséquence ici. |
| **Leçons en étapes plutôt qu'en prose** (v2) | Retour utilisateur direct : « des leçons plus simplifiées que juste devoir lire sans forcément comprendre ». Un mur de texte se survole ; une mini-question obligatoire ne se survole pas. |
| **Mot à mot systématique** (v2) | Un débutant lit une phrase allemande sans savoir quel mot porte quel sens. L'alignement mot par mot rend la mécanique visible. |
| **Niveau > Chapitre > Étape** (v3.0) | Demandé après usage : « j'ai fait les 12 jours en 30 minutes ». Appeler « jour » une séance de 2 min 30 était un mensonge sur le contrat. Les chapitres regroupent des étapes **consécutives** : la progression est linéaire (l'accusatif suppose le présent), regrouper par thème la casserait. Les écrans d'une leçon perdent leur nom — « étape » étant pris — et sont seulement numérotés. |
| **Le champ interne reste `day`** (v3.0) | 116 occurrences, aucune valeur pour l'utilisateur. Seul l'affichage passe à « étape ». À renommer un jour, quand ce sera le sujet du moment plutôt qu'une diversion. |
| **Réservoir plus grand que la séance** (v3.1) | Signalé après usage : « si je recommence la leçon, les exercices et les exemples sont mot pour mot les mêmes ». La v3.0 ne faisait que **mélanger** — l'ordre changeait, le contenu non. Il faut un vrai **tirage** : 8 exercices servis parmi 29, 5 phrases parmi 12. Le tri se fait par nombre de passages (`S.dseen`), à égalité au hasard : rien ne revient tant qu'il reste du jamais-vu, et tout finit par passer. Corollaire : chaque étape a besoin d'un réservoir d'au moins 3-4 séances, sinon le tirage ne diversifie rien. |
| **Quatre formes d'exercices** (v3.0) | Demandé : « plus d'exercices, plus de phrases différentes, pas toujours les mêmes choses en boucle ». `order` est la plus importante : l'ordre des mots allemand ne s'apprend pas autrement, et rien ne le travaillait. Les exercices vivent dans `drills` au niveau de l'étape ; une étape sans `drills` masque le mode au lieu d'ouvrir un écran vide. |
| **Niveaux propres à l'oral** (v2.5) | Demandé après usage. Deux axes montent ensemble : la part de français diminue (traduire → écrire en allemand) et l'indulgence aussi (faute de frappe pardonnée → forme exacte). Stockés dans `S.oral`, indépendants des niveaux de cartes : reconnaître à l'oreille et restituer à l'écrit sont deux compétences. |
| **Les parenthèses du vocabulaire sont des notes, pas des réponses** (v2.5) | Bug signalé par Exsangue : « sprechen » était refusé car le contenu dit `sprechen (du sprichst)`. 13 verbes portent ainsi leur forme irrégulière. On ne demande jamais cette forme, on ne peut donc pas l'exiger. `deCore` retire la parenthèse ; les deux écritures sont acceptées. Alternative écartée : sortir la note dans un champ `note` séparé — plus propre, mais 13 entrées à réécrire et un affichage à revoir pour un gain nul côté utilisateur. |
| **La ponctuation n'est jamais exigée** (v2.5) | Bug signalé : un point oublié comptait faux au niveau 5. Elle ne s'entend pas — la sanctionner dans un exercice d'écoute revient à noter ce qui n'a pas été prononcé. Le niveau 5 reste strict sur l'audible (tréma, ß, article, mots). |
| **`normFR` traite les ligatures** (v2.5) | Bug signalé par Exsangue : « la soeur » était compté faux. Le contenu écrit `sœur` avec la ligature — un seul caractère — alors qu'on tape `o` puis `e`. Une vérification retape désormais **chaque** traduction des 12 jours au clavier, pour attraper tout autre caractère du même genre. |
| **Correction du français très lâche** (v2.4) | Une traduction s'écrit de dix façons. Contrôler le français comme on contrôle l'allemand transformerait un exercice de compréhension en piège orthographique. `checkFR` ignore accents, ponctuation, article et parenthèses ; `checkAnswer` reste strict pour l'allemand, où l'orthographe *est* l'objectif. |
| **Le mode oral ne touche pas au calendrier** (v2.4) | Même raison que l'entraînement : reconnaître un mot à l'oreille n'est pas la même compétence que le restituer à l'écrit. Il nourrit le journal, pas l'espacement. |
| **Classe `.trad` séparée de `.back`** (v2.4) | `.back` servait à la fois au bouton « ← Accueil » (majuscules, interlettrage large) et à la traduction dans les cartes, qui héritait donc des majuscules. Défaut présent depuis la v2, repéré en relisant les captures du mode oral. |
| **Niveaux 1-2 franchis dans la séance** (v2.3) | Demandé après usage : « monter mes mots niveau 3 sur un même jour ». Le seuil de re-passage est `<= WRITE_FROM_BOX` et non `<` — un mot qui vient d'atteindre le niveau où il s'écrit doit être écrit une fois le jour même, sinon l'y monter n'apprend rien. C'est l'auto-test qui a révélé ce défaut : le mot atteignait 3 puis quittait la séance. |
| **Un mot raté perd 1 niveau, pas tout** (v2.3) | Demandé après usage. La chute complète efface des semaines de travail sur une simple hésitation ; elle décourage plus qu'elle n'apprend. Un mot redescendu au niveau 2 redevient dû le jour même, donc se re-travaille tout de suite. |
| **Réponse écrite dès le niveau 2** (v2.2, seuil abaissé en v2.3) | Demandé après usage réel. Sens français → allemand, car taper la traduction française d'un mot allemand n'apprend aucune orthographe. Le seuil était à 3 ; Exsangue l'a voulu plus tôt (« je veux devoir écrire le mot assez rapidement »). Le niveau 1 reste une vue gratuite — et le mot a déjà été présenté dans la leçon avant d'arriver aux cartes. Un seul réglage : `WRITE_FROM_BOX`. |
| **Mauvais genre = erreur, article oublié = toléré** (v2.2) | Le genre des noms allemands ne s'acquiert pas passivement ; le sanctionner est le seul moyen de le travailler. Mais exiger l'article à chaque saisie rendrait l'exercice pénible pour rien. |
| **Audio par `SpeechSynthesis`** (v2) | Zéro fichier à héberger, zéro poids. Les boutons restent masqués si aucune voix `de-*` n'existe sur l'appareil — mieux vaut rien qu'un bouton muet. |

## Comment on vérifie

`test.ps1` pilote le Chrome déjà installé, en mode sans fenêtre. Il lance l'auto-test
embarqué (`index.html#test`, **240 vérifications**) et sait photographier chaque écran
en thème clair et sombre. Aucune dépendance : ni Node, ni Playwright, ni droits admin.

Les écrans sont aussi accessibles par l'URL (`#lesson`, `#cards`, `#quiz`).

Deux pièges du harnais, à ne pas re-découvrir :
- Chrome sans fenêtre plafonne à 500 px de large minimum → les captures passent par un
  cadre de 390 px, sinon la page est mise en page en 500 px puis rognée.
- Poser `data-theme` sur l'app depuis une page parente donne des styles calculés faux
  (un `background-color` posé en ligne se lit encore à sa valeur d'avant) → le script
  génère une copie de l'app qui applique le thème elle-même avant l'affichage.

## Où ça en est

- ✅ v2 : 12 jours (A1), leçons pas à pas, mot à mot, prononciation écrite, audio.
- ✅ v2.1 (31/07/2026) : réponses et questions mélangées, navigation entre leçons réparée.
  Voir `TODO.md` — issu d'un usage réel, 9 retours dont 3 traités.
- ✅ Vérifiée : 256 tests au vert, écrans relus en clair et sombre à 390 px.
- ✅ Confirmée utilisable par l'utilisateur (ouverture locale sur le PC).
- 🔄 **Progression perdue sur iPhone — corrigé, reste à confirmer par l'usage.**
  Cause : la page publiée tournait dans un cadre inséré dans claude.ai, et iOS refuse
  le stockage local à une page affichée dans le cadre d'un autre site (protection
  anti-pistage). Correctif : le fichier est devenu une page autonome, hébergée à sa
  propre adresse sur GitHub Pages → https://kanycl.github.io/deutsch-taeglich/
  Aucune ligne de logique changée : c'était un problème d'hébergement, pas de code.
- ⛔ **Un dialogue avec une IA est impossible dans la page publiée.** Vérifié le 31/07/2026 :
  une page publiée ne dispose que de `downloads` (proposer un fichier à enregistrer) et
  `mcp` (appeler les connecteurs du lecteur). Aucun accès à un modèle. Un vrai dialogue
  demande donc d'héberger l'app ailleurs, avec un petit serveur qui détient la clé d'API.
- ⬜ Jours 13 à 30 — à écrire.
- ⬜ Non testé automatiquement : le rendu sur un vrai téléphone (police système, zone
  sûre), et la qualité réelle de la voix allemande selon l'appareil.
- ⬜ Le dépôt n'est pas encore sous git (`git init` à faire).
- ⬜ Piste écartée pour l'instant : l'adjectif épithète décliné (*ein rotes Auto*),
  volontairement contourné au jour 8 — trop lourd à ce stade.

## Où reprendre

Les **exercices** sont écrits pour les 12 étapes (339 au total, 27 à 30 chacune).
Il reste les **phrases d'exemple** : seule l'étape 1 a son réservoir de 12, les étapes
2 à 12 en ont 3. Le récapitulatif en tire 5 — avec 3 disponibles, il n'y a rien à tirer.
Voir `TODO.md`, section « REPRENDRE ICI ».

## Le contenu des étapes 1 à 12

1. Se présenter — pronoms, verbe *sein*
2. Der / die / das — genres, majuscule des noms, ein/eine
3. Le présent des verbes réguliers — terminaisons, -e d'appui
4. Les nombres et l'âge — 0-20, inversion des dizaines
5. *haben* et la négation — nicht vs kein
6. L'accusatif — der → den, ein → einen
7. Poser des questions — mots en W-, verbe en position 2, inversion
8. Décrire — *sein* + adjectif (invariable), couleurs, *sehr*
9. Les verbes à changement de voyelle — e→i, e→ie, a→ä
10. Les jours et le temps — *am* / *um*, heute / morgen / gestern
11. *können*, *wollen*, *müssen* — l'infinitif rejeté en fin de phrase
12. *mein* / *dein* et la famille
