# Produit la version PUBLIABLE de l'app : la meme, sans le livre.
#
#   .\sans-livre.ps1
#
# Pourquoi un script plutot que deux fichiers : deux fichiers divergent en une
# journee. Il n'y a qu'une source, index.html, et la version publique en est
# extraite a la demande.
#
# Ce qu'il fait : il coupe tout ce qui se trouve entre les reperes LIVRE-DEBUT
# et LIVRE-FIN dans index.html, et le remplace par des tableaux vides. Le reste
# du code ne bouge pas :
#   - l'onglet du livre ne s'affiche que si BOOK contient quelque chose ;
#   - les verifications propres au livre sont sous "if (BOOK.length)" ;
#   - enrichirDepuisLivre ne trouve plus d'unite et ne fait rien.
#
# NOTE : ce fichier est volontairement en ASCII pur. PowerShell 5.1 lit les
# scripts en ANSI ; un tiret long ou un guillemet francais y devient une suite
# d'octets qui casse l'analyse du script.
#
# Resultat dans .\public\ : c'est ce dossier qu'on publie.

$ErrorActionPreference = "Stop"

$src = $PSScriptRoot
$dst = Join-Path $src "docs"

$html = Get-Content (Join-Path $src "index.html") -Raw -Encoding utf8

$debut = $html.IndexOf("/* LIVRE-DEBUT")
$fin   = $html.IndexOf("/* LIVRE-FIN")

if ($debut -lt 0 -or $fin -lt 0 -or $fin -le $debut) {
  Write-Output "ECHEC : reperes LIVRE-DEBUT / LIVRE-FIN introuvables."
  Write-Output "Ne pas publier tant que ce n'est pas regle : le livre partirait en ligne."
  exit 1
}

$finLigne = $html.IndexOf("*/", $fin) + 2

$lignes = @(
  '/* Version publiee : le livre a ete retire.',
  '',
  '   Le contenu du livre (Werner Dubois et Alvaro Garcia Noble, 2025) ne vit',
  '   que dans la copie de travail personnelle, sur le disque. Cette version-ci',
  '   est en ligne : elle ne contient que du contenu redige independamment.',
  '',
  '   Les tableaux restent declares mais vides. Le reste du code les interroge',
  '   par BOOK.length et s adapte tout seul.',
  '',
  '   Genere par sans-livre.ps1 : ne pas modifier a la main. */',
  'const BOOK = [];',
  'const BOOK_GROUPS = [];',
  'const BOOK_TEST = { pages: "", title: "", exercises: [] };',
  'function enrichirDepuisLivre() {}'
)
$remplacement = ($lignes -join "`n")

$public = $html.Substring(0, $debut) + $remplacement + $html.Substring($finLigne)

# Garde-fou : si un morceau du livre subsiste, on ne publie pas. Mieux vaut un
# echec bruyant qu'une mise en ligne silencieuse de ce qui ne doit pas sortir.
#
# Les temoins sont STRUCTURELS et non lexicaux. Une premiere version guettait
# des mots comme "Tagesgericht" ou "Vorfahren" : elle bloquait des mots
# allemands parfaitement ordinaires que les etapes emploient legitimement.
# Un garde-fou qui crie a tort finit par etre contourne.
#
# Ce qu'on cherche ici, c'est la SIGNATURE du tableau BOOK : chacune de ses
# entrees porte un champ "pages:", qu'on ne trouve nulle part ailleurs.
$temoins = @(
  @{ quoi = "LIVRE-DEBUT"; sens = "le repere de decoupage" },
  @{ quoi = "Kaffeehaus";  sens = "un dialogue du livre" },
  @{ quoi = "Steppenwolf"; sens = "un dialogue du livre" }
)
foreach ($t in $temoins) {
  if ($public.Contains($t.quoi)) {
    Write-Output ("ECHEC : '" + $t.quoi + "' subsiste apres le decoupage (" + $t.sens + ").")
    Write-Output "Le livre n'est pas completement sorti. Publication annulee."
    exit 1
  }
}

# Une entree du tableau BOOK porte un champ "pages" RENSEIGNE. Le stub qu'on
# injecte, lui, ecrit pages: "" — chercher la chaine nue le faisait echouer sur
# son propre remplacement. On exige donc au moins un caractere entre guillemets.
if ([regex]::IsMatch($public, 'pages: "[^"]')) {
  Write-Output "ECHEC : une entree du tableau BOOK subsiste (champ pages renseigne)."
  Write-Output "Le livre n'est pas completement sorti. Publication annulee."
  exit 1
}

if (-not $public.Contains("const BOOK = [];")) {
  Write-Output "ECHEC : le tableau BOOK n'a pas ete remplace par un tableau vide."
  Write-Output "Publication annulee."
  exit 1
}

if (Test-Path $dst) { Remove-Item $dst -Recurse -Force }
New-Item -ItemType Directory -Force $dst | Out-Null

$public | Out-File -FilePath (Join-Path $dst "index.html") -Encoding utf8
foreach ($f in @("icon-180.png", "icon-512.png", "manifest.webmanifest")) {
  Copy-Item (Join-Path $src $f) $dst -Force
}

$avant = [math]::Round((Get-Item (Join-Path $src "index.html")).Length / 1KB)
$apres = [math]::Round((Get-Item (Join-Path $dst "index.html")).Length / 1KB)

Write-Output "Version publiable prete : $dst"
Write-Output "index.html : $avant Ko avec le livre, $apres Ko sans."
