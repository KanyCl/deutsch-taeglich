"use strict";
/* LE DÉMARRAGE — chargé en DERNIER, après tout le reste.
   Sorti de index.html le 13/08/2026.

   Pourquoi un fichier à part plutôt que la fin de app.js : ce bloc appelle
   runTests(), qui vit dans tests/tests.js. Un script classique ne peut appeler
   que ce qui est déjà chargé, donc le démarrage doit venir après les tests. */
/* ---- Démarrage ----
   #test        → lance l'auto-test
   #lesson etc. → ouvre directement un écran (pratique pour tester)
   sinon        → l'accueil                                        */
initTTS();
// Avant tout affichage : le thème, l'échelle du texte et la couleur doivent
// être posés sur la racine sinon le premier écran clignote dans les réglages
// d'origine avant de prendre les tiens.
applyPrefs();
/* Plus de seed(S.day) ici : arriver sur l app n est pas avoir lu la lecon.
   A la place, on repare une fois les paquets abimes par l ancien defaut. */
nettoieCartesJamaisVues();
paintStreak();

const entry = (window.location.hash || "").replace("#", "");

/* #unite3 ouvre directement l'unité 3 du livre. Ajouté le 01/08/2026 :
   Exsangue ne retrouvait pas les exercices de l'unité 1 en naviguant, et
   lui décrire le chemin par écrit ne servait à rien. Une adresse qui
   tombe pile sur l'écran voulu vaut mieux qu'un itinéraire. */
const uniteVisee = /^unite(\d+)$/.exec(entry);

/* `typeof` et non un simple appel : la version publiée ne contient PAS
   tests/tests.js, donc runTests n'y existe pas. Sans cette garde, ouvrir
   #test sur le site en ligne tuerait l'app au lieu d'ouvrir l'accueil. */
if (entry === "test" && typeof runTests === "function") runTests();
else if (uniteVisee && BOOK.some(function (u) { return u.n === Number(uniteVisee[1]); })) {
  S.unit = Number(uniteVisee[1]);
  go("unit");
}
else if (Object.prototype.hasOwnProperty.call(ROUTES, entry)) go(entry);
else go("home");
