"use strict";
/* LE SERVICE WORKER — l'app marche sans réseau. §4 du rapport du mentor.

   Ce qu'il apporte : réviser dans le métro, en avion, ou avec deux barres de
   réseau. Pour une app qui s'annonce « sans compte ni serveur », c'est
   l'attente par défaut — et c'est aussi ce qui rend l'app installable pour de
   bon depuis l'écran d'accueil.

   ⚠️⚠️ LA STRATÉGIE EST « RÉSEAU D'ABORD », ET CE CHOIX N'EST PAS NÉGOCIABLE
   ICI. La stratégie habituelle d'un service worker est « cache d'abord » :
   plus rapide, et c'est ce que recommandent tous les tutoriels. Elle est
   INTERDITE dans ce projet, pour une raison qui lui est propre :

     Exsangue a déjà perdu du temps trois fois sur des pages servies depuis le
     cache de son iPhone. Il a signalé des défauts déjà corrigés, et on a
     cherché dans du code qu'il n'exécutait pas. Un « cache d'abord » rendrait
     ce piège PERMANENT et bien pire : l'app se figerait sur la version du
     jour de l'installation, et il n'y aurait plus de « recharger » qui tienne.

   Avec « réseau d'abord » : en ligne, on a toujours la dernière version, comme
   avant ce fichier — rien ne change et rien ne se fige. Hors ligne, on sert la
   dernière version vue. On gagne le hors-ligne sans rien perdre.

   ⚠️ On ne répond JAMAIS à la place du navigateur pour ce qui n'est pas à
   nous : autre origine, ou méthode autre que GET. Un service worker qui
   s'interpose partout devient le suspect n°1 de toute panne réseau, et on ne
   peut plus rien diagnostiquer. */

const CACHE = "deutsch-taeglich-v1";

/* Le socle : ce qu'il faut pour que l'app s'ouvre, même la toute première
   fois qu'on la lance sans réseau. `donnees/cours.js` en fait partie — sans
   le cours, l'app démarre sur une coquille vide, ce qui est pire qu'une page
   d'erreur : on croirait avoir perdu sa progression. */
const SOCLE = [
  "./",
  "./index.html",
  "./app.js",
  "./donnees/cours.js",
  "./demarrage.js",
  "./manifest.webmanifest",
  "./icon-180.png",
  "./icon-512.png"
];

self.addEventListener("install", function (e) {
  /* Chaque fichier est mis en cache SÉPARÉMENT, et un échec ne fait pas
     tomber les autres. `cache.addAll` est tout ou rien : une icône renommée
     suffirait à faire échouer l'installation entière, donc à priver l'app de
     hors-ligne pour une image. */
  e.waitUntil(
    caches.open(CACHE).then(function (c) {
      return Promise.all(SOCLE.map(function (u) {
        return c.add(u).catch(function () {});
      }));
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (e) {
  /* On efface les caches des versions précédentes. Sans ce ménage, chaque
     version laisserait son dépôt derrière elle et l'espace disque enflerait
     sans que rien ne le montre. */
  e.waitUntil(
    caches.keys().then(function (noms) {
      return Promise.all(noms.map(function (n) {
        return (n === CACHE) ? null : caches.delete(n);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (e) {
  const req = e.request;
  if (req.method !== "GET") return;

  let url;
  try { url = new URL(req.url); } catch (err) { return; }
  if (url.origin !== self.location.origin) return;

  e.respondWith(
    fetch(req).then(function (rep) {
      /* On ne garde que ce qui est réellement bon. Mettre une 404 en cache la
         servirait ensuite hors ligne comme si c'était la page. */
      if (rep && rep.ok) {
        const copie = rep.clone();
        caches.open(CACHE).then(function (c) { c.put(req, copie); }).catch(function () {});
      }
      return rep;
    }).catch(function () {
      return caches.match(req).then(function (trouve) {
        if (trouve) return trouve;
        /* Une adresse avec `?v=2` — le contournement de cache qu'Exsangue
           utilise — ne correspond à aucune entrée. Pour une NAVIGATION, on
           sert quand même la page : c'est la même app. */
        if (req.mode === "navigate") return caches.match("./index.html");
        return Response.error();
      });
    })
  );
});
