# Contexte — Deutsch Täglich

## Ce que c'est

Une application web personnelle pour apprendre l'allemand un peu chaque jour.
Usage strictement privé (Exsangue, un seul utilisateur). Pas de compte, pas de serveur,
pas de publication sur un store.

⚠️ **LE LIVRE A ÉTÉ RETIRÉ DE L'APP LE 02/08/2026**, à la demande d'Exsangue. Ce qui suit
décrit le livre qui a servi de **plan** au niveau A1 — il reste utile pour comprendre
l'ordre des 35 étapes, et pour les numéros de pages si on veut y revenir. Mais l'app ne
contient plus une ligne de son texte, et le **niveau A2 ne le suit pas** (voir `PLAN-A2.md`).

Le livre papier d'Exsangue : **Werner Dubois & Alvaro Garcia Noble, © 2025,
tous droits réservés**, 280 pages.

Le livre s'intitule bien **« Apprendre l'Allemand en 30 Jours »** — mais ces « 30 jours »
sont un argument de couverture : **le sommaire ne mentionne aucun jour**. Sous-titre exact :
« 7 livres en 1 : cours complet de A1 à C2 avec 162 leçons à partir de zéro ».
Structure réelle, relevée sur les 42 photos le 01/08/2026 :

```
6 niveaux : A1 (p.3-56) · A2 (61-106) · B1 (111-173) · B2 (178-220) · C1 (225-240) · C2 (245-264)
└── chaque niveau est découpé en UNITÉS, renumérotées à partir de 1 à chaque niveau
    └── chaque unité contient : un dialogue, des règles de grammaire,
        des listes de vocabulaire, des exercices
└── un test de niveau à la fin de chaque niveau
```

**Le niveau A1 compte 35 unités** (numérotées 0 à 34), de 1 à 3 pages chacune, plus un
test de fin de niveau en 22 exercices (p.57-60). Le relevé complet — chaque unité, ses
pages, sa grammaire, son vocabulaire — est dans **`PLAN-A1.md`**, avec la correspondance
vers les 12 étapes déjà écrites.

Le « 30 étapes prévues » de l'app venait donc du titre commercial, pas du contenu.
Corrigé le 01/08/2026 : `TOTAL_PLANNED` vaut **35**.

**Photos** dans `~/../livre/lecons/` (42 fichiers, tout le niveau A1) — **hors du dépôt git**,
qui est public. Elles ne doivent jamais y entrer.

**Usage du livre — la boucle est bouclée le 02/08/2026.** Il y a eu trois régimes
successifs, et c'est le dernier qui vaut :

1. *Jusqu'au 01/08* — contenu écrit indépendamment, dépôt public.
2. *Le 01/08* — le livre est transcrit fidèlement, le dépôt passe en **privé** (le livre
   est sous copyright : un site public n'est plus une copie personnelle mais une
   rediffusion). L'iPhone perd l'accès, GitHub Pages ne servant que le public.
3. *Le 02/08* — **le livre est retiré de l'app.** Le dépôt est **public**, l'iPhone
   remarche, et `index.html` **entre enfin dans git** — il en était exclu justement
   parce qu'il contenait le livre.

⚠️ **Règle actuelle : plus une ligne du livre dans l'app.** Le contenu est écrit ici, donc
publiable sans condition. Si le livre devait revenir un jour, il faudrait **rétablir
`/index.html` dans `.gitignore` AVANT tout commit** — `publier.ps1` protège la
publication, pas le dépôt.

Copie de l'app d'avant suppression, hors dépôt :
`C:\Shared\atelier\livre\index-AVEC-LIVRE-2026-08-02.html`

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
| ~~Un seul fichier `index.html`~~ — **dépassé le 11/08/2026** | La contrainte d'origine (zéro build, zéro dépendance, zéro `npm install`) reste valable ; la conclusion « donc un seul fichier » était le mauvais raccourci. Les navigateurs lisent nativement les **modules ES** : on découpe en vrais fichiers sans build. Décision et plan de découpage dans `TODO.md`, section « L'architecture ». |
| **Un seul endroit décide du rendu du contenu** (11/08/2026) | `idea` était échappé et `detail` non ; `check.q` échappé et `quiz.q` non. Ce n'était pas une politique, c'était un oubli — et l'écran affichait `<b>der Körper</b>` en clair. `rich()` échappe TOUT puis réautorise une liste blanche (`b`, `i`, `u`, six entités). L'ordre compte : l'inverse laisserait passer ce qu'on neutralise. Le gras est employé **2 802 fois** dans le cours pour faire ressortir le mot allemand — l'échappement total aurait détruit la pédagogie. |
| **`seed()` n'est appelé que par `lessonView()`** (11/08/2026) | Quatre appelants, dont la validation du quiz qui ensemençait l'étape **suivante** : le mode cartes servait des mots jamais vus, on les ratait tous, et chaque erreur ajoutant deux cartes, le paquet grossissait plus vite qu'on ne le vidait. `context.md` affirmait déjà « le mot a déjà été présenté dans la leçon avant d'arriver aux cartes » — c'est vrai dans le code depuis seulement cette date. |
| Contenu écrit à la main dans `COURSE` | Pas de base de données ni d'API à maintenir. Ajouter un jour = ajouter un objet au tableau. |
| Progression dans `localStorage` | Suffisant pour un usage mono-appareil. Sauvegarde/restauration JSON pour ne rien perdre. |
| ~~Pas de `<!doctype>` ni de `<html>` dans le fichier~~ — **abandonné le 31/07/2026** | Valait tant que l'app était publiée en Artifact, où le format enveloppe le fichier. Mais ce mode d'affichage (dans un cadre sur claude.ai) empêchait iOS de sauvegarder la progression. Le fichier est donc une page HTML complète, hébergée seule. |
| Hébergement sur GitHub Pages | Gratuit, adresse propre (indispensable pour le stockage iOS), et le dépôt git sert aussi d'historique. Dépôt public : c'est la contrepartie du gratuit, sans conséquence ici. |
| **Leçons en étapes plutôt qu'en prose** (v2) | Retour utilisateur direct : « des leçons plus simplifiées que juste devoir lire sans forcément comprendre ». Un mur de texte se survole ; une mini-question obligatoire ne se survole pas. |
| **Mot à mot systématique** (v2) | Un débutant lit une phrase allemande sans savoir quel mot porte quel sens. L'alignement mot par mot rend la mécanique visible. |
| **Niveau > Chapitre > Étape** (v3.0) | Demandé après usage : « j'ai fait les 12 jours en 30 minutes ». Appeler « jour » une séance de 2 min 30 était un mensonge sur le contrat. Les chapitres regroupent des étapes **consécutives** : la progression est linéaire (l'accusatif suppose le présent), regrouper par thème la casserait. Les écrans d'une leçon perdent leur nom — « étape » étant pris — et sont seulement numérotés. |
| **Le dépôt est passé en PRIVÉ, et l'app transcrit le livre** (01/08/2026) | Exsangue veut le livre **retranscrit** : mêmes dialogues, mêmes exercices, tout pareil en numérique. Impossible tant que l'app était publiée — le livre est sous copyright (© 2025), et un site public n'est plus une copie personnelle mais une rediffusion. Le dépôt GitHub est donc passé en privé (`gh repo edit --visibility private`), ce qui a coupé GitHub Pages : `kanycl.github.io/deutsch-taeglich` renvoie désormais 404, vérifié. L'app redevient ce qu'elle était censée être — la copie de travail d'Exsangue sur son propre livre. **Conséquence : reste à trouver un hébergement privé pour l'iPhone** (piste : Cloudflare Pages + Access, gratuit, protégé par code). **Et règle nouvelle : on transcrit le livre fidèlement**, ce qui annule la consigne précédente d'écrire un contenu indépendant. |
| ⚠️ **DÉPASSÉ le 02/08/2026 — le dépôt est REDEVENU PUBLIC.** La ligne ci-dessus décrit un régime qui a duré une journée. Voir « Usage du livre » plus haut. | — |
| **Le niveau A2 ne suit pas le livre** (02/08/2026) | Deux raisons. **1.** Les 42 photos s'arrêtent à la page 62 : suivre le livre voudrait dire s'arrêter à la deuxième étape. **2.** Le programme du A2 est **public et standardisé** (CECRL, repris par Goethe, telc, ÖSD) — relevé dans `~/.claude/skills/allemand/examens.md`. Conséquence décisive : ce contenu est **le nôtre**, donc hors copyright et publiable sans condition. |
| **Le livre est retiré de l'app** (02/08/2026) | Demandé par Exsangue, et c'était l'objectif fixé au départ une fois le A1 complet. Gain principal : `index.html` était ignoré par git **parce qu'il** contenait le livre — la source du travail n'était donc sauvegardée nulle part. Elle l'est désormais. `sans-livre.ps1` disparaît, `publier.ps1` le remplace. |
| **Un dépliant par niveau sur l'accueil** (02/08/2026) | Demandé par Exsangue : le sommaire unique mélangeait A1 et A2, rien ne disait où l'un finissait. Le découpage vient des **bornes de `NIVEAUX`**, jamais d'une étiquette portée par le chapitre — deux sources décrivant la même chose finissent toujours par se contredire. |
| **Le livre est un plan, pas une autorité** (01/08/2026) | Deux endroits où l'app s'en écarte sciemment, l'app étant publiée et devant enseigner un allemand juste. **1.** Le livre range l'âge du côté de *haben* (unité 7) — vrai en français, en italien et en espagnol, **faux en allemand**, qui dit *ich bin 25 Jahre alt*. L'étape 8 en fait un point d'attention explicite plutôt que de le recopier. **2.** L'âge figurait dans l'ancienne étape des nombres ; il relève de *sein*/*haben*, donc de l'unité 7 — déplacé à l'étape 8. Règle générale : on suit l'**ordre** et le **découpage** du livre, pas ses erreurs de langue. |
| **L'app suit le livre unité par unité** (décidé le 01/08/2026) | Choix d'Exsangue, une fois le plan réel connu : étape N = unité N−1, pour pouvoir ouvrir le livre et l'app à la même page. Conséquence acceptée : l'ordre des 12 étapes déjà écrites est démonté — le présent des verbes réguliers passe de la 3ᵉ à la 11ᵉ place, la famille de la 12ᵉ à la 16ᵉ. Conséquence **découverte après coup**, plus lourde : la progression étant linéaire (valider l'étape N ouvre la N+1), on ne peut pas laisser de trous. Les 19 unités absentes doivent donc être écrites **dans l'ordre du livre**, en commençant par l'unité 0 — on ne peut pas se contenter de renuméroter ce qui existe. |
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
embarqué (`index.html#test`, **2 070 vérifications** au 11/08/2026) et sait photographier
chaque écran en thème clair et sombre. Aucune dépendance : ni Node, ni Playwright, ni
droits admin.

⚠️ **Il a déjà annoncé « Tout passe » sur une app morte** (corrigé le 11/08/2026) : il
cherchait le rapport dans le DOM entier, qui contient le code source, lequel contient les
chaînes qui *fabriquent* le rapport. Il retire désormais les blocs `script` avant analyse et
exige un score de la forme `N / N`. **Un harnais de test se vérifie sur une copie
volontairement cassée** — c'est comme ça que le faux positif a été prouvé.

Les écrans sont aussi accessibles par l'URL (`#lesson`, `#cards`, `#quiz`).

`verifier.ps1` contrôle une autre chose, que l'auto-test ne peut pas voir : **l'exactitude
de l'allemand**. Il croise chaque article et chaque mot du cours avec le socle de
`reference/` (99 898 noms, 8 047 verbes, 50 000 mots classés par fréquence). L'auto-test
dit que l'app *fonctionne* ; `verifier.ps1` dit qu'elle enseigne le *vrai*. À relancer
après tout ajout de contenu — un genre faux s'apprend et se garde des années.

Ce qu'il ne juge pas, et ne jugera jamais : la clarté d'une explication, le naturel d'une
phrase, l'ordre des leçons. Ça reste du jugement.

Deux pièges du harnais, à ne pas re-découvrir :
- Chrome sans fenêtre plafonne à 500 px de large minimum → les captures passent par un
  cadre de 390 px, sinon la page est mise en page en 500 px puis rognée.
- Poser `data-theme` sur l'app depuis une page parente donne des styles calculés faux
  (un `background-color` posé en ligne se lit encore à sa valeur d'avant) → le script
  génère une copie de l'app qui applique le thème elle-même avant l'affichage.


## Où ça en est — 11/08/2026

**Niveau A1 : complet.** 35 étapes, 350 mots, 1026 exercices, 12 chapitres, plus un test
de fin de niveau (24 questions, 4 épreuves, seuil 70 %).

**Niveau A2 : ouvert.** 7 étapes écrites sur 28 prévues (36 à 42), chapitres 13 et 14
complets. Plan complet dans `PLAN-A2.md`.

- ✅ **En ligne et à jour** : https://kanycl.github.io/deutsch-taeglich/ — dépôt public,
  publié par `publier.ps1` qui copie la source vers `docs/`.
- ✅ **Auto-test : 2070 vérifications**, toutes au vert, **source et version publiée**.
  `verifier.ps1` : 0 écart d'article.
- ✅ **Audit externe passé le 11/08/2026** (le mentor d'Exsangue) — deux bloquants corrigés
  le soir même, le reste est une liste ouverte dans `TODO.md`, section « Audit externe ».
- ✅ **Le livre est retiré**, `index.html` est suivi par git.
- ✅ **Deux niveaux dans le sommaire** : un dépliant A1, un dépliant A2 en dessous.
- ⬜ **Étapes 43 à 63** — à écrire.
- ⬜ **Test de fin de niveau A2** — en dernier, quand les 28 étapes existent.
- ⬜ Jamais testé automatiquement : le rendu sur un vrai téléphone (police système, zone
  sûre) et la qualité de la voix allemande selon l'appareil.
- ⛔ **Un dialogue avec une IA reste impossible** dans l'app : c'est un fichier HTML seul,
  sans serveur. Il faudrait un hébergement qui détienne une clé d'API.
- ⛔ **Ne pas relancer Cloudflare** : il exigeait une carte bancaire, et le besoin a
  disparu — `publier.ps1` + GitHub Pages suffisent.

### Ce qu'il faut savoir avant de toucher au projet

- ⚠️ **Toute constante lue par `sane()` doit être déclarée AVANT `let S = load()`.**
  Cette zone morte a cassé l'app trois fois, dont une qui a coûté sa progression à Exsangue.
- ⚠️ **`reference/` est hors dépôt** (données tierces, ~21 Mo). `verifier.ps1` et le skill
  `/allemand` en dépendent : sur une machine neuve, il faut le reconstituer.
  Provenance et licences dans `reference/LISEZMOI.md`.
- ⚠️ **`sein` est absent du socle du Wiktionnaire.** Sa conjugaison est écrite de mémoire
  et signalée comme telle dans le code. Ne jamais inventer une autre conjugaison :
  tout vient de `reference/verbes-wiktionnaire.csv`.
- ⚠️ **Un repère de découpage doit vivre dans le bloc qu'il découpe.** `verifier.ps1`
  délimitait le cours avec un repère du LIVRE : il est mort avec lui, en silence.
- ⚠️ **Quand Exsangue signale un défaut déjà corrigé, vérifier d'abord la version.**
  Son iPhone sert du cache. La date de version est affichée dans les réglages.
  Contournement sans risque : ouvrir l'adresse avec `?v=2` à la fin.
- ⚠️ **Aucun outil ne relit ce que l'app AFFIRME.** `verifier.ps1` contrôle les articles et
  les mots, pas les règles de grammaire énoncées. Chercher les affirmations absolues
  (*jamais · toujours · tous · aucun*) et les vérifier une par une.
- ⚠️ **Un commentaire n'est pas une preuve.** Reproche central de l'audit du 11/08, et il
  était fondé : plusieurs commentaires affirmaient des garanties que le code ne tenait pas
  (un bug décrit comme corrigé ne l'était pas ; un autre avait été contourné localement
  sans être généralisé). Avant d'écrire « corrigé » quelque part, le vérifier sur pièce.
- ⚠️ **Une balise fermante de `script` écrite telle quelle dans une chaîne JavaScript
  referme le bloc** — l'analyseur HTML ne sait pas qu'il lit une chaîne. App morte, écran
  blanc. Rencontré deux fois le même soir, dont une dans le commentaire qui expliquait la
  première.

## Où reprendre

Deux chantiers ouverts. **Le découpage passe devant le contenu** — décidé après l'audit du
11/08 : chaque bug de cette soirée venait de la même cause, 15 000 lignes où rien n'a de
frontière.

1. **Le découpage en modules ES** — plan complet et ordre des étapes dans `TODO.md`,
   section « L'architecture ». Commencer par sortir `COURSE` et `runTests` du fichier :
   c'est mécanique, ça ne touche aucune fonction, et ça divise le fichier par trois.
2. **Étape 43 · Le logement** — l'appartement, les pièces, les meubles. Elle ouvre le
   **chapitre 15 « Chez soi, et ce qu'on en pense »**, qui n'est pas encore déclaré : le
   créer avec la seule étape 43, puis l'allonger. On ne déclare que ce qui existe, sinon
   l'auto-test échoue — et il a raison. Ordre des étapes suivantes dans `PLAN-A2.md`.

Le reste de l'audit (§2.x, accessibilité, service worker) est une liste à cocher dans
`TODO.md`, section « Audit externe ».
