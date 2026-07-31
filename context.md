# Contexte — Deutsch Täglich

## Ce que c'est

Une application web personnelle pour apprendre l'allemand un peu chaque jour.
Usage strictement privé (Exsangue, un seul utilisateur). Pas de compte, pas de serveur,
pas de publication sur un store.

Inspirée dans sa **structure** du livre *Apprendre l'allemand en 30 jours*
(Werner Dubois & Álvaro García Noble) — progression jour par jour. Le livre est possédé
en **papier** : le contenu de l'app est rédigé indépendamment, il n'en reproduit pas le texte.

## Comment ça marche

Quatre modes, articulés autour d'un « jour » courant :

1. **La leçon** — 4 à 5 étapes courtes, une idée par écran. Certaines étapes posent une
   mini-question qui **bloque** le passage à la suivante tant qu'on n'a pas répondu.
2. **Les cartes** — révision espacée du vocabulaire, 5 niveaux
   (intervalles **0 / 0 / 1 / 4 / 16** jours). Un mot raté perd **un** niveau.
   Les niveaux 1 et 2 sont des étapes d'apprentissage franchies dans la même séance :
   un mot neuf repasse jusqu'à être **écrit le jour même**.
3. **Le quiz** — 5 questions. 3 bonnes réponses sur 5 valident le jour et débloquent le suivant.
4. **L'entraînement libre** — quand rien n'est dû, ou pour en faire plus. Reprend les mots
   les plus ratés, note les réponses, mais **ne touche pas au calendrier** : réviser en
   avance ne doit pas dérégler l'espacement.

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
| **Niveaux 1-2 franchis dans la séance** (v2.3) | Demandé après usage : « monter mes mots niveau 3 sur un même jour ». Le seuil de re-passage est `<= WRITE_FROM_BOX` et non `<` — un mot qui vient d'atteindre le niveau où il s'écrit doit être écrit une fois le jour même, sinon l'y monter n'apprend rien. C'est l'auto-test qui a révélé ce défaut : le mot atteignait 3 puis quittait la séance. |
| **Un mot raté perd 1 niveau, pas tout** (v2.3) | Demandé après usage. La chute complète efface des semaines de travail sur une simple hésitation ; elle décourage plus qu'elle n'apprend. Un mot redescendu au niveau 2 redevient dû le jour même, donc se re-travaille tout de suite. |
| **Réponse écrite à partir du niveau 3** (v2.2) | Demandé après usage réel. Le seuil vient de la note d'origine d'Exsangue : « pas au début quand on est débutant ». Sens français → allemand, car taper la traduction française d'un mot allemand n'apprend aucune orthographe. |
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

## Le contenu des jours 1 à 12

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
