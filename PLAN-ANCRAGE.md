# Plan — L'ancrage, et la refonte des cartes

Conçu le 18/08/2026 avec Exsangue. Ce fichier est la **spec**, pas le code : il fige les
décisions avant d'écrire, pour qu'on puisse les relire dans six mois et savoir *pourquoi*.

---

## Le problème qu'on résout

Le paquet de cartes actuel mélange deux besoins qui n'ont ni le même rythme ni le même but :

- **apprendre** les mots de la leçon qu'on vient de lire ;
- **ne pas perdre** les 990 mots vus depuis le début.

Aujourd'hui ils partagent le même paquet, la même box Leitner, le même écran. Résultat :
réviser noie apprendre, et un mot de l'étape 3 peut tomber au milieu de l'étape 45.

On les sépare. **Deux outils, deux écrans, une seule échelle de niveau.**

---

## Décisions arrêtées

| Question | Décision |
|---|---|
| Rythme | **aucune notion de jour.** Une boucle de 50 mots, enchaînable à volonté. |
| Sélection | **hasard pur**, retirage à chaque boucle. |
| Échelle de niveau | **une seule, 0 → 20**, partagée par les deux outils. |
| Mot à 20 | **sort du stock.** |
| Mot raté | perd un niveau, **rien d'autre**. |
| Mots ancrés | **~2 % de chance** de repasser, comme filet. |

### Ce que le calcul donne

990 mots × 20 réussites = **19 800 bonnes réponses**, soit **~400 boucles** de 50.
À ~4 min la boucle : **~26 h de jeu parfait**, une cinquantaine d'heures avec les échecs.
Il n'y a plus de plafond quotidien — **c'est Exsangue qui fixe le rythme, plus l'app.**

Et le retrait à 20 a un effet secondaire heureux, obtenu sans une ligne de code pour lui :
**le stock rétrécit à mesure que les mots s'ancrent**, donc ceux qui restent — les
difficiles — reviennent de plus en plus souvent. La fin accélère toute seule.

---

## 1. Les cartes de la leçon

**Portée : la leçon en cours, uniquement.** Pas les mots d'avant, pas ceux d'après.
Les mots des étapes passées sont le travail de l'ancrage, plus celui des cartes.

**Trois paliers — TOUT EST ÉCRIT**, et ce sont **exactement ceux de l'ancrage** (§2) :

| Niveau | On présente | On répond | Déterminant |
|---|---|---|---|
| 0 – 2 | le mot écrit en **allemand** | en **français** | — |
| 3 – 4 | le mot écrit en **français** | en **allemand** | facultatif |
| 5 et + | le mot écrit en **français** | en **allemand** | **obligatoire** |

> ⚠️ **Rectifié par Exsangue le 18/08/2026, après une version fausse.** La première
> rédaction de cette spec faisait *entendre* les mots des deux premiers paliers, sans les
> écrire, sur la foi d'un « prononcé en allemand » de la demande initiale. Ce n'est pas ce
> qu'il veut : **rien n'est présenté à l'oreille**, tout est écrit. La synthèse vocale
> reste ce qu'elle était — un bouton « écouter » qu'on déclenche si on veut, jamais la
> question elle-même.
>
> Conséquence heureuse : plus aucune dépendance à une voix installée. Un appareil sans
> voix allemande fait tourner l'app à l'identique.

> **Une seule table de paliers pour les deux outils**, décidée par `modeAncrage()`. Les
> cartes et l'ancrage partagent déjà le niveau d'un mot ; leur laisser deux tables ferait
> qu'un même mot, au même niveau, serait demandé de deux façons selon l'écran ouvert.
> La **seule nouveauté** des cartes par rapport à l'app d'avant est donc le déterminant
> exigé à partir du niveau 5.

> **L'entraînement libre reste hors de cette règle.** Il ne touche pas aux niveaux — on y
> révise, on n'y est pas examiné — donc il n'en applique pas la sévérité : l'article
> oublié y reste pardonné, quel que soit le niveau du mot.

**Ce qu'on supprime : les cartes ajoutées en cas d'échec.** Rater une carte en ajoutait
deux (le mot + un mot facile). C'était une spirale : un mauvais jour gonflait le paquet,
ce qui produisait d'autres échecs. Demandé par Exsangue, et c'est juste — la sanction
d'un échec, c'est le niveau perdu, pas du travail en plus.

**Lien avec l'ancrage :** réussir ou rater une carte de leçon fait gagner ou perdre un
niveau au mot, exactement comme dans l'ancrage. C'est le **même compteur** — voir §3.

---

## 2. L'ancrage

Un outil **à part**, accessible depuis l'accueil, hors de la progression des étapes —
même statut que « Les verbes irréguliers », et pour la même raison : ça ne s'inscrit pas
dans la suite des leçons, c'est disponible tout le temps.

### Le stock

Les mots **dont la leçon a été terminée**, et **dont le niveau est inférieur à 20**. Un mot
qui atteint 20 est **ancré** et quitte le stock.

**« Terminée » veut dire quiz validé**, pas leçon ouverte. Posé par Exsangue le 18/08/2026,
et c'est un durcissement : aujourd'hui `seed()` est appelé depuis `lessonView()`
(`app.js:1545`), donc ouvrir une étape et la refermer aussitôt met déjà ses mots dans le
paquet. Un mot survolé n'est pas un mot appris. **Conséquence assumée : quelqu'un qui n'a
pas fini la leçon 1 n'a aucun mot**, et l'ancrage lui est vide.

> ⚠️ **Piège pour le prochain qui touche à ça — moi compris.** Il y a un commentaire à
> `app.js:2506` qui dit « Surtout PAS de seed() ici », à l'endroit précis où il va
> désormais en falloir un. Ce n'est pas une contradiction : à ce moment du code `S.day` a
> déjà été incrémenté, donc `seed(S.day)` sèmerait la leçon **suivante**, jamais ouverte —
> c'était le défaut signalé par Exsangue le 11/08/2026. Semer l'étape qu'on vient de
> **finir** (`seed(d)`) est l'inverse. Écrire la distinction sur place, sinon quelqu'un
> annulera le changement en croyant réparer.

### La boucle

- Une boucle = **50 mots tirés au hasard** dans le stock, **tous différents**.
- Les 50 finis → **nouvelle boucle, nouveau tirage**. Aucune mémoire d'une boucle à
  l'autre : un mot peut retomber immédiatement, ou pas avant longtemps. C'est voulu.
- **Rien ne limite le nombre de boucles.** Une par jour ou dix d'affilée, l'app ne juge pas.

**Le filet des mots ancrés.** Chacun des 50 tirages a **2 % de chance** de piocher dans les
mots ancrés plutôt que dans le stock — environ **un mot ancré par boucle**. S'il est raté,
il retombe à 19 et **réintègre le stock**. C'est un filet, pas une révision : il rattrape
le seul vrai risque du modèle — oublier en un an un mot ancré aujourd'hui — sans rendre
au joueur des mots qu'il connaît.

### Ce qu'on demande, selon le niveau du mot

| Niveau | On présente | On écrit | Exigence qui s'ajoute |
|---|---|---|---|
| 0 – 2 | le mot en **allemand** | en **français** | — |
| 3 – 4 | le mot en **français** | en **allemand** | déterminant facultatif |
| 5 – 7 | le mot en **français** | en **allemand** | **déterminant obligatoire** |
| 8 et + | le mot en **français** | en **allemand** | **+ la majuscule compte** |

L'exigence monte par crans, et **chaque cran arrive tard exprès**.

Le genre au niveau 5 : c'est la partie dure de l'allemand, et l'exiger d'un mot qu'on
reconnaît à peine ne produit que de l'échec.

La majuscule au niveau 8 (demandée par Exsangue le 18/08/2026) : c'est une vraie règle —
**tout nom commun allemand en porte une** — et c'est la faute la plus visible à l'écrit.
Mais la casse d'un mot qu'on ne sait pas encore écrire n'apprend rien.

> Ce qui **ne devient jamais** strict : le tréma tapé `ae`/`oe`/`ue` et le `ß` écrit `ss`
> restent acceptés à tous les niveaux. Ce sont des contraintes de clavier, pas des fautes
> d'allemand — faire échouer quelqu'un qui a tout bon parce que son clavier n'a pas de ü
> serait le seul vrai contresens de tout ce système.

> Et la casse n'est reprochée **que si le mot visé est le bon**. Sur une réponse
> franchement fausse, « attention à la majuscule » masquerait la vraie erreur et enverrait
> chercher au mauvais endroit.

> **Trou connu, à trancher plus tard :** entre 7 et 20, rien ne change — c'est le même
> exercice, quatorze fois. Ce n'est pas bloquant (c'est de la consolidation, et c'est
> ainsi que la mémoire travaille), mais si l'ennui vient, c'est ici qu'il faudra ajouter
> des paliers : produire une phrase, le pluriel, le mot en contexte.

### La notation

- Réussite → **+1**. À 20, le mot est ancré et sort du stock.
- Échec → **−1**, jamais sous 0. **Et rien d'autre** : le mot n'est pas reproposé dans la
  boucle, il reviendra quand le hasard le rendra. Choisi par Exsangue le 18/08/2026, contre
  la version d'origine qui le renvoyait « plus tard dans la journée » — la journée n'existe
  plus, et une boucle qui s'allonge à chaque faute punit les mauvais jours.

### Les cas limites — à traiter, pas à découvrir en marchant

- **Moins de 50 mots au stock** → la boucle fait ce qu'il y a. Ça arrivera en fin de
  parcours, et aussi à quelqu'un qui démarre : l'étape 1 ne fait que 22 mots.
- **Aucun mot ancré** (au début) → les 2 % ne piochent nulle part, on tire tout du stock.
- **Stock vide — et les deux raisons ne disent PAS la même chose.** Même écran, messages
  opposés, et les confondre serait décourager quelqu'un qui vient de commencer :
  - *aucune leçon terminée* → « L'ancrage travaille les mots des leçons finies. Commence
    par la leçon 1. »
  - *tout est ancré* → « Les N mots sont ancrés. » Et on propose de continuer sur eux.

---

## 3. Une seule échelle — le point technique délicat

C'est **la** décision structurante, et celle qui doit être faite proprement du premier coup.

### Aujourd'hui

Chaque carte porte `{ box: 1..5, due: "AAAA-MM-JJ", hit, miss }`. La `box` est une échelle
Leitner, `due` une date calculée par `INTERVALS = {1:0, 2:0, 3:1, 4:4, 5:16}`, et
`WRITE_FROM_BOX = 2` décide si l'on écrit en allemand ou en français.

### Demain

Chaque mot porte **un seul niveau, `niv` de 0 à 20**. `box` et `due` **disparaissent**.

`due` disparaît parce qu'il n'y a plus de calendrier du tout : plus de « ne repose pas ce
mot avant le 4 septembre », le mot revient quand le hasard le tire. Garder une date à côté
d'un tirage aléatoire, c'est garantir qu'un jour les deux se contrediront — et ce jour-là
**rien ne le signalera** : le mot sera simplement posé trop tôt ou jamais, et ça ne se
verra pas avant des mois.

⚠️ **Ce que ça touche ailleurs :** l'accueil affiche aujourd'hui un compteur de cartes
« dues » (`dueCards()`, `app.js:693`) qui pilote la pastille de la tuile « Les cartes ».
Sans dates, ce compteur devient **les mots de la leçon en cours**, et l'ancrage prend sa
propre tuile. À ne pas oublier : c'est le genre de détail qui casse l'accueil en silence.

### La migration — sans perdre la progression

⚠️ Une progression existe déjà sur l'iPhone d'Exsangue. Elle ne doit pas être remise à
zéro. Conversion à la première ouverture de la nouvelle version :

```
niv = (box - 1) × 5        box 1 → 0 · box 2 → 5 · box 3 → 10 · box 4 → 15 · box 5 → 20
```

Choisi pour que **`box >= 4` (« appris » aujourd'hui) donne `niv >= 15`**, et que la box 5
tombe pile sur « ancré ». `hit` et `miss` sont **conservés** : ce sont eux qui repèrent les
mots fragiles, et le compteur affiché sur l'accueil en dépend.

La migration doit être **idempotente** — la relancer ne doit rien changer. Un témoin de
version dans l'état sauvegardé, et jamais une détection à la volée du genre « si `box`
existe » : une sauvegarde à moitié convertie est le pire des cas.

**La règle « leçon terminée » ne s'applique PAS rétroactivement.** La sauvegarde actuelle
contient des mots semés à l'ancienne, à l'ouverture de leur leçon. On ne les retire pas :
`nettoieCartesJamaisVues()` (`app.js:658`) fait déjà le tri utile — elle enlève ce qui vient
d'étapes non validées **et sur quoi on n'a jamais travaillé**, en gardant tout ce qui porte
une trace de réussite ou d'échec. On ne jette pas l'historique de quelqu'un pour faire
respecter une règle écrite après coup ; la règle vaut pour la suite.

---

## Ce qu'il faudra vérifier (tests à écrire)

**Migration**
- Convertit une progression réelle sans rien perdre ; la relancer deux fois ne change rien.
- `hit` et `miss` survivent.

**L'entrée dans le stock**
- Ouvrir une leçon puis la quitter **n'ajoute aucun mot**.
- Valider le quiz ajoute les mots de **cette** étape, et **jamais** ceux de la suivante.
- Sans aucune leçon terminée, l'ancrage est vide et le dit — sans se confondre avec
  « tout est ancré ».

**La boucle**
- Une boucle fait 50 mots **tous différents**.
- Un mot raté **ne revient pas** dans la boucle en cours.
- Deux boucles consécutives ne sont pas identiques, et un mot **peut** apparaître dans les
  deux — c'est le hasard, pas un bug.
- Stock à 30 mots → la boucle fait 30. Stock vide → l'écran le dit, il ne plante pas.

**Les niveaux**
- Ne descend pas sous 0, ne monte pas au-dessus de 20.
- Un mot à 20 **sort du stock**.
- Un mot ancré raté retombe à 19 et **y revient**.
- Sur un grand nombre de tirages, la part de mots ancrés est de l'ordre de 2 %.

**Le déterminant**
- Facultatif à 3-4, refusé s'il est **faux** (le genre reste jugé), obligatoire à partir de 5.

**Le lien entre les deux outils**
- Une carte de leçon ratée fait perdre un niveau **dans l'ancrage** — compteur partagé,
  c'est tout l'enjeu de §3.
- Rater une carte n'ajoute plus de cartes au paquet.
