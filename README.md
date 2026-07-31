# Deutsch Täglich

L'allemand un peu chaque jour. Application web personnelle, sans compte ni serveur.
Niveau A1 — 12 jours écrits sur 30 prévus.

## Utiliser l'app

**L'adresse :** https://kanycl.github.io/deutsch-taeglich/

**Sur le téléphone** — ouvrir cette adresse, puis dans le menu de partage du navigateur :
*Ajouter à l'écran d'accueil*. Elle s'ouvre ensuite comme une vraie app, plein écran,
avec son icône.

> **iPhone — une seule porte d'entrée.** Une fois l'app ajoutée à l'écran d'accueil, iOS
> lui donne une mémoire **séparée** de celle de Safari. Passe toujours par l'icône, sinon
> tu te retrouveras avec deux progressions différentes sans comprendre pourquoi.

**Sur l'ordinateur** — double-cliquer sur `index.html`, ou ouvrir la même adresse.
Attention : le fichier local et le site en ligne ont chacun leur progression.

L'adresse est publique — n'importe qui la connaissant peut ouvrir l'app. Il n'y a rien de
sensible dedans : **ta progression ne quitte jamais ton appareil**, elle n'est envoyée
à aucun serveur.

## Chaque jour

| Mode | Ce que ça fait |
|---|---|
| **La leçon** | 4 à 5 étapes courtes. Une idée par écran, et des mini-questions qui bloquent le passage à la suite tant qu'on n'a pas répondu |
| **Les cartes** | Révision espacée : les mots ratés reviennent vite, les mots sus s'espacent. À partir du niveau 3, le mot ne se reconnaît plus — **il s'écrit** |
| **Le quiz** | 5 questions. 3/5 valident le jour et débloquent le suivant |
| **L'entraînement** | Quand rien n'est à réviser, ou pour en faire plus. Reprend tes mots les plus ratés **sans toucher au calendrier** de révision |

Compter 10 à 15 minutes. La série en haut à droite compte les jours d'affilée.

Rien ne t'oblige à t'arrêter : si tu as le temps, enchaîne sur le jour suivant ou lance un
entraînement. Et si tu sautes un jour, rien n'est perdu — seule la série repart de 1.

### Comment un mot progresse

Chaque mot a un niveau, de 1 à 5. Bonne réponse : **+1**. Réponse ratée : **−1**, jamais la
chute complète — perdre quinze jours de travail sur un mot hésitant décourage plus que ça
n'apprend.

| Niveau | Prochaine révision | Ce qu'on te demande |
|---|---|---|
| 1 | le jour même | reconnaître |
| 2 | le jour même | reconnaître |
| 3 | le lendemain | **écrire** |
| 4 | dans 4 jours | **écrire** |
| 5 | dans 16 jours | **écrire** |

Les niveaux 1 et 2 se franchissent **dans la même séance** : un mot nouveau repasse deux
fois, monte au niveau 3, et t'est alors demandé **à écrire le jour même**. Autrement dit un
mot découvert aujourd'hui est déjà écrit aujourd'hui — c'est là qu'il rentre vraiment.

Compte donc une trentaine de cartes le premier jour d'une leçon (une dizaine de mots, trois
passages chacun). Les jours suivants sont beaucoup plus courts.

### Écrire les mots

Tant qu'un mot est neuf (niveaux 1 et 2), la carte te le montre en allemand et tu te testes
dans ta tête. **À partir du niveau 3**, elle te montre le français et tu dois **écrire
l'allemand** — c'est le seul sens qui fasse retenir l'orthographe.

La correction est tolérante sur la forme et stricte sur le mot :

- la **casse** est ignorée (le téléphone met des majuscules tout seul de toute façon)
- `ae` vaut `ä`, `oe` vaut `ö`, `ue` vaut `ü`, `ss` vaut `ß` — pratique sans clavier allemand
- **l'article oublié passe**, avec un rappel de la forme complète
- **le mauvais article compte comme une erreur** : le genre est ce qui s'apprend le plus mal
  tout seul, autant le travailler

Un bouton **« je ne sais pas »** est toujours là — mieux vaut voir la réponse que rester
bloqué. Le bouton ▶ n'apparaît qu'**après** avoir répondu : avant, il donnerait la solution.

L'app **note tes erreurs** : chaque mot compte ses réussites et ses échecs, chaque question
de quiz ratée est enregistrée. L'accueil indique combien de mots restent fragiles, et
l'entraînement les reprend en priorité. Tout part dans le fichier de sauvegarde — envoie-le
moi et on travaillera tes vraies fautes.

Trois aides pour ne pas lire sans comprendre :

- **Le mot à mot** — sous chaque phrase allemande, chaque mot est aligné avec sa
  traduction. On voit la mécanique de la phrase, pas seulement son sens.
- **La prononciation** — écrite à la française sous chaque mot (`GOU-tenn TAAK`).
- **Le bouton écouter** (▶) — le navigateur prononce l'allemand. Il n'apparaît que si
  une voix allemande est installée sur l'appareil ; sinon il reste masqué, plutôt que
  d'offrir un bouton muet.

## Ne pas perdre sa progression

La progression vit dans le navigateur. Elle disparaît si l'historique est effacé, et
elle ne suit pas d'un appareil à l'autre — le fichier local et la version publiée sont
deux emplacements distincts.

- **Sauvegarder** (bas de l'accueil) → un fichier `.json` à ranger quelque part.
- **Restaurer** → recharger ce fichier, sur n'importe quel appareil.

## Vérifier que tout marche

L'app sait se tester elle-même. Deux façons :

**Dans le navigateur** — ouvrir `index.html#test`. Un rapport s'affiche : chaque
vérification en OK ou KO. La progression enregistrée est mise de côté puis remise
en place, rien n'est perdu.

**Depuis le terminal** — `.\test.ps1`. Le script lance Chrome sans fenêtre, exécute
l'auto-test et affiche le résultat.

```
.\test.ps1                 # l'auto-test seul
.\test.ps1 -Shots          # + captures en thème clair
.\test.ps1 -Shots -Dark    # + captures en thème sombre
```

Les 240 vérifications couvrent le calcul des dates, la répétition espacée, la série,
un parcours de leçon complet (y compris le blocage tant qu'on n'a pas répondu), un
parcours de quiz complet, les écrans, et **l'intégrité du contenu**.

C'est cette dernière partie qui rapporte le plus : elle a déjà attrapé, au jour 8, une
mini-question dont deux réponses proposées étaient identiques.

### Deux pièges du harnais, notés pour plus tard

- Chrome sans fenêtre **refuse de descendre sous 500 px de large**. Une capture
  demandée en 390 px affiche donc une page mise en page en 500 px, puis rognée — on
  croit voir un débordement qui n'existe pas. D'où le cadre de 390 px dans `test.ps1`.
- **Imposer le thème sombre depuis la page parente donne des styles calculés faux.**
  Le script produit donc une copie de l'app qui pose `data-theme` elle-même avant de
  s'afficher.

## Ajouter un jour de cours

Tout le contenu est dans le tableau `COURSE`, au début du `<script>` de `index.html`.
Un jour = un objet :

```js
{
  day: 13,
  title: "Le titre en français",
  de: "Une phrase allemande qui résume",

  steps: [
    {
      idea:   "L'idée de l'étape, en UNE phrase simple.",
      detail: "Une ou deux phrases de plus. <b>Le gras</b> est rendu en serif.",
      gloss:  { de: ["Ich", "lerne"], fr: ["J'", "apprends"] },
      table:  [["ich", "lerne"], ["du", "lernst"]],
      check:  { q: "La mini-question ?", o: ["bonne", "a", "b"], a: 0, why: "Pourquoi." }
    }
  ],

  examples: [ { d: "Phrase allemande.", f: "Traduction." } ],
  vocab:    [ { d: "das Wort", f: "le mot", p: "dass VORT" } ],
  quiz:     [ { q: "La question ?", o: ["bonne","a","b","c"], a: 0, why: "Pourquoi." } ]
}
```

Règles que l'auto-test fait respecter — inutile de les retenir, il les rappellera :

- `a` est l'index de la bonne réponse dans `o` (0 = la première)
- `gloss.de` et `gloss.fr` ont **toujours** la même longueur
- chaque ligne de `table` a exactement deux colonnes
- au moins une étape par jour porte un `check`
- aucune option dupliquée dans une question
- chaque mot de `vocab` a sa prononciation `p`

`detail`, `gloss`, `table` et `check` sont tous facultatifs — une étape peut n'avoir
qu'une `idea`. Vise 4 à 5 étapes par jour : au-delà, ça redevient un mur de texte.

## Structure du fichier

`index.html` contient tout, dans cet ordre :

1. Les **tokens** CSS — couleurs et polices, thème clair et thème sombre
2. Le **style** des composants
3. `COURSE` — le contenu du cours
4. L'**état** — progression, dates, méthode Leitner
5. La **voix** — prononciation par le navigateur, sans fichier audio
6. Le **rendu** — une fonction par écran
7. La **navigation** — un seul écouteur de clic
8. La **sauvegarde** et l'**auto-test**

Aucune dépendance, aucune étape de construction.
