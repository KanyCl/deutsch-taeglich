# Verifie le contenu allemand du cours contre le socle de reference.
#
#   .\verifier.ps1
#
# Ce que ca controle, et pourquoi ces trois choses la :
#
#   1. LES ARTICLES. Un genre faux s'apprend et se garde des annees. C'est la
#      seule faute qui coute plus cher que de ne pas enseigner le mot du tout.
#   2. LES MOTS INEXISTANTS. Un mot absent des 90 000 noms et 8 000 verbes du
#      Wiktionnaire est suspect : soit un pluriel (normal), soit une invention.
#   3. LA FREQUENCE. Enseigner un mot de rang 40 000 avant un mot de rang 200,
#      c'est du temps perdu. Seule une liste de frequence peut le dire.
#
# Ce que ca ne controle PAS, et ne pourra jamais : la clarte d'une explication,
# le naturel d'une phrase, l'ordre des lecons. Ca reste du jugement.
#
# NOTE : fichier en ASCII pur, comme sans-livre.ps1. PowerShell 5.1 lit les
# scripts en ANSI ; un accent ou un tiret long y casse l'analyse du script.
# Le CONTENU lu, lui, est bien en UTF-8 : les umlauts passent sans probleme.

$ErrorActionPreference = "Stop"

$src = $PSScriptRoot
$ref = Join-Path $src "reference"

foreach ($f in @("noms-wiktionnaire.csv", "verbes-wiktionnaire.csv", "frequence-50k.txt")) {
  if (-not (Test-Path (Join-Path $ref $f))) {
    Write-Output ("ECHEC : " + $f + " introuvable dans reference\.")
    Write-Output "Voir reference\LISEZMOI.md pour les sources."
    exit 1
  }
}

Write-Output "Chargement du socle de reference..."

# --- Les noms : lemme -> TOUS ses genres attestes -------------------------
#
# Deux pieges dans ce fichier, decouverts a l'usage :
#
#   1. Les colonnes de genre sont au nombre de CINQ : "genus", puis "genus 1"
#      a "genus 4". Un nom a genre unique remplit la premiere ; un nom a
#      plusieurs genres laisse la premiere VIDE et remplit les suivantes.
#         Monat,Substantiv,,m,n,...     <- der Monat, das Monat (Autriche)
#   2. Un meme mot occupe plusieurs LIGNES, une par entree du dictionnaire.
#         Foto,Substantiv,,n,f,...
#         Foto,Substantiv,m,,,,...
#
# Ne lire que la premiere colonne de la premiere ligne trouvee donnait
# "Foto = masculin" et signalait "das Foto" comme une faute. On collecte donc
# l'UNION de tous les genres, sur toutes les lignes.
#
# La colonne "pos" est parfois entre guillemets et contient des virgules :
# un split naif sur la virgule decalerait tout ce qui suit.
$genres = @{}
$sr = New-Object System.IO.StreamReader((Join-Path $ref "noms-wiktionnaire.csv"), [System.Text.Encoding]::UTF8)
$null = $sr.ReadLine()
while (($l = $sr.ReadLine()) -ne $null) {
  $ch = [regex]::Matches($l, '(?:"([^"]*)"|([^,]*))(?:,|$)')
  if ($ch.Count -lt 7) { continue }
  $lem = if ($ch[0].Groups[1].Success) { $ch[0].Groups[1].Value } else { $ch[0].Groups[2].Value }
  if (-not $lem) { continue }
  if (-not $genres.ContainsKey($lem)) { $genres[$lem] = @{} }
  foreach ($i in 2, 3, 4, 5, 6) {
    $g = if ($ch[$i].Groups[1].Success) { $ch[$i].Groups[1].Value } else { $ch[$i].Groups[2].Value }
    if ($g -eq "m" -or $g -eq "f" -or $g -eq "n") { $genres[$lem][$g] = 1 }
  }
}
$sr.Close()

# Rend les genres lisibles pour le rapport : "m" ou "n ou f".
function genresDe($lem) { ($genres[$lem].psbase.Keys | Sort-Object) -join " ou " }

# --- Les verbes : infinitif -----------------------------------------------
$verbes = @{}
foreach ($l in [System.IO.File]::ReadAllLines((Join-Path $ref "verbes-wiktionnaire.csv"), [System.Text.Encoding]::UTF8)) {
  $i = $l.IndexOf(","); if ($i -gt 0) { $verbes[$l.Substring(0, $i)] = 1 }
}

# --- La frequence : le NUMERO DE LIGNE est le rang -------------------------
# Ce fichier est entierement en minuscules, contrairement aux deux autres.
$rang = @{}; $n = 0
foreach ($l in [System.IO.File]::ReadAllLines((Join-Path $ref "frequence-50k.txt"), [System.Text.Encoding]::UTF8)) {
  $n++; $w = ($l -split ' ')[0]
  if ($w -and -not $rang.ContainsKey($w)) { $rang[$w] = $n }
}

# .psbase.Keys et non .Keys : la liste de frequence contient le mot "keys"
# (emprunt a l'anglais, rang 26692), qui masque la propriete du tableau et
# faisait afficher "1 mot classe".
Write-Output ("  " + $genres.psbase.Keys.Count + " noms, " + $verbes.psbase.Keys.Count + " verbes, " + $rang.psbase.Keys.Count + " mots classes.")
Write-Output ""

# --- Le cours --------------------------------------------------------------
$html = Get-Content (Join-Path $src "index.html") -Raw -Encoding utf8
$deb = $html.IndexOf("const COURSE = [")
$fin = $html.IndexOf("/* LIVRE-DEBUT")
if ($deb -lt 0 -or $fin -le $deb) {
  Write-Output "ECHEC : impossible de delimiter COURSE dans index.html."
  exit 1
}
$cours = $html.Substring($deb, $fin - $deb)

# Les tableaux d'options de QCM contiennent des reponses VOLONTAIREMENT
# fausses ("das Aufzug", "den Frau"). Les controler reviendrait a signaler
# les pieges comme des erreurs : on les retire avant analyse.
$sansQcm = [regex]::Replace($cours, 'o: \[[^\]]*\]', 'o: []')

$fautes = 0

# =========================================================================
# 1. Les articles du vocabulaire
# =========================================================================
$attendu = @{ "der" = "m"; "die" = "f"; "das" = "n" }
$vus = 0; $ecarts = @(); $absents = @(); $pluriels = 0; $adjectivaux = 0

# Les NOMS ADJECTIVAUX prennent le genre de la personne designee, pas celui
# du mot : der Verwandte (un homme) et die Verwandte (une femme) sont tous
# deux corrects. Aucune recherche de genre ne peut les trancher, et le
# Wiktionnaire n'en atteste souvent qu'une forme. Les laisser remonter, c'est
# garantir un rapport bruyant a chaque execution -- donc un rapport ignore.
$nomsAdjectivaux = @("erste", "zweite", "dritte", "vierte", "Verwandte",
                     "Deutsche", "Bekannte", "Erwachsene", "Angestellte",
                     "Jugendliche", "Reisende", "Kranke")

foreach ($m in [regex]::Matches($sansQcm, '\{ d: "(der|die|das) ([^" ]+)", f: "([^"]+)"')) {
  $art = $m.Groups[1].Value; $mot = $m.Groups[2].Value; $fr = $m.Groups[3].Value

  # Un pluriel porte TOUJOURS "die", quel que soit le genre du singulier :
  # die Kinder, die Moebel, die Haeuser. Le socle n'indexe que le singulier,
  # les comparer n'a donc aucun sens. La traduction francaise le dit :
  # elle commence par "les". C'est notre propre donnee, donc fiable.
  if ($fr -like "les *") { $pluriels++; continue }
  if ($nomsAdjectivaux -contains $mot) { $adjectivaux++; continue }

  if (-not $genres.ContainsKey($mot) -or $genres[$mot].psbase.Keys.Count -eq 0) {
    $absents += ("$art $mot ($fr)"); continue
  }
  $vus++
  if (-not $genres[$mot].ContainsKey($attendu[$art])) {
    $ecarts += ("  {0} {1}  ({2})  -- la reference n'atteste que : {3}" -f $art, $mot, $fr, (genresDe $mot))
  }
}

Write-Output "1. ARTICLES DU VOCABULAIRE"
Write-Output ("   " + $vus + " verifies, " + $ecarts.Count + " a regarder")
Write-Output ("   (ignores : " + $pluriels + " pluriels, " + $adjectivaux + " noms adjectivaux)")
$ecarts | ForEach-Object { Write-Output $_ }
$fautes += $ecarts.Count
Write-Output ""

# =========================================================================
# 2. Les articles dans les phrases, dialogues et exercices
# =========================================================================
# On ne teste que "das X" (forcement neutre) et "den X" (forcement masculin
# a l'accusatif). "der X" et "die X" sont ambigus : der = masculin nominatif
# MAIS aussi feminin datif ; die = feminin MAIS aussi pluriel. Les tester
# produirait plus de bruit que de signal.
$vus2 = 0; $ecarts2 = @{}
# Les echappements Ä etc. designent les voyelles a trema sans les ecrire :
# le fichier reste en ASCII, mais le motif attrape bien Uebung, Oel, Aerzte.
$motAllemand = '\b(das|den) ([A-ZÄÖÜ][a-zäöüß]{2,})\b'
foreach ($m in [regex]::Matches($sansQcm, $motAllemand)) {
  $art = $m.Groups[1].Value; $mot = $m.Groups[2].Value
  if (-not $genres.ContainsKey($mot) -or $genres[$mot].psbase.Keys.Count -eq 0) { continue }
  $vus2++
  $att = if ($art -eq "das") { "n" } else { "m" }
  if (-not $genres[$mot].ContainsKey($att)) {
    $cle = ("  {0} {1}  -- la reference n'atteste que : {2}" -f $art, $mot, (genresDe $mot))
    if (-not $ecarts2.ContainsKey($cle)) { $ecarts2[$cle] = 0 }
    $ecarts2[$cle]++
  }
}
Write-Output "2. ARTICLES DANS LES PHRASES"
Write-Output ("   " + $vus2 + " verifies, " + $ecarts2.Keys.Count + " a regarder")
$ecarts2.Keys | Sort-Object | ForEach-Object { Write-Output ($_ + "   (x" + $ecarts2[$_] + ")") }
$fautes += $ecarts2.Keys.Count
Write-Output ""

# =========================================================================
# 3. Les mots absents du socle
# =========================================================================
Write-Output "3. MOTS ABSENTS DU SOCLE"
Write-Output ("   " + $absents.Count + " noms")
if ($absents.Count) {
  $absents | ForEach-Object { Write-Output ("     " + $_) }
  Write-Output "   Un mot absent des 99 000 noms du Wiktionnaire est a verifier a la"
  Write-Output "   main : c'est la seule facon de reperer un mot qui n'existe pas."
}
Write-Output ""

# =========================================================================
# 4. La frequence du vocabulaire enseigne
# =========================================================================
$tranches = [ordered]@{ "rang 1-1000 (indispensable)" = 0; "rang 1000-5000 (courant)" = 0; "rang 5000-15000 (utile)" = 0; "au-dela de 15000 (rare)" = 0; "hors liste" = 0 }
$rares = @()
foreach ($m in [regex]::Matches($sansQcm, '\{ d: "([^"]+)", f: "([^"]+)"')) {
  $d = $m.Groups[1].Value; $fr = $m.Groups[2].Value
  $mot = $d -replace '^(der|die|das) ', ''
  if ($mot -match ' ') { continue }
  $k = $mot.ToLower()
  if (-not $rang.ContainsKey($k)) { $tranches["hors liste"]++; continue }
  $r = $rang[$k]
  if ($r -le 1000) { $tranches["rang 1-1000 (indispensable)"]++ }
  elseif ($r -le 5000) { $tranches["rang 1000-5000 (courant)"]++ }
  elseif ($r -le 15000) { $tranches["rang 5000-15000 (utile)"]++ }
  else { $tranches["au-dela de 15000 (rare)"]++; $rares += ("     {0,-24} {1,-28} rang {2}" -f $d, $fr, $r) }
}
Write-Output "4. FREQUENCE DU VOCABULAIRE"
foreach ($k in $tranches.Keys) { Write-Output ("   {0,-32} {1}" -f $k, $tranches[$k]) }
if ($rares.Count) {
  Write-Output "   Les mots rares :"
  $rares | ForEach-Object { Write-Output $_ }
  Write-Output "   La liste vient de sous-titres de films : le vocabulaire d'aeroport"
  Write-Output "   ou d'administration y est sous-represente sans etre inutile."
}
Write-Output ""

Write-Output "======================================================================"
if ($fautes -eq 0) {
  Write-Output "RIEN A SIGNALER. Aucun ecart d'article."
} else {
  Write-Output ("A REGARDER : " + $fautes + " ecart(s) d'article.")
  Write-Output "Chacun peut etre un pluriel, une variante regionale, ou une vraie faute."
}
Write-Output "Ce controle ne juge NI la pedagogie, NI la clarte, NI l'ordre des lecons."
Write-Output "======================================================================"
