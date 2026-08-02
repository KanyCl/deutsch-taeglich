# Extrait les verbes IRREGULIERS AU PRESENT du socle de reference, et les
# classe par frequence reelle. Aucune conjugaison inventee : tout vient de
# verbes-wiktionnaire.csv.
#
# Est "irregulier au present" un verbe dont la forme du/er ne se deduit PAS
# de l infinitif par la regle ordinaire. C est exactement ce qu il faut
# reviser : le reste se calcule.
#
# NOTE : ce fichier est en ASCII PUR et accede aux colonnes PAR POSITION.
# PowerShell 5.1 lit les scripts en ANSI ; ecrire "Praesens_du" avec son
# trema donnait une suite d octets qui ne correspondait a aucune colonne, et
# le filtre rejetait les 8047 verbes en silence. Meme piege que sans-livre.ps1.
#   0 Infinitive  1 Praesens_ich  2 Praesens_du  3 Praesens_er  4 Praeteritum
#   5 Partizip II 6 Konjunktiv II 7 Imperativ sg 8 Imperativ pl 9 Hilfsverb

$ErrorActionPreference = "Stop"
$ref = "C:\Shared\atelier\Repos\projets\allemand\reference"

$freq = @{}
$n = 0
# Chaque ligne est "mot compte" — le RANG est le numero de ligne, pas le
# compte. Prendre la ligne entiere comme cle ne trouvait evidemment rien.
foreach ($ligne in [System.IO.File]::ReadLines("$ref\frequence-50k.txt")) {
  $n++
  $m = ($ligne -split '\s+')[0]
  if ($m -and -not $freq.ContainsKey($m)) { $freq[$m] = $n }
}

function Get-Radical([string]$inf) {
  if ($inf -match '(eln|ern)$') { return $inf.Substring(0, $inf.Length - 1) }
  if ($inf -match 'en$')        { return $inf.Substring(0, $inf.Length - 2) }
  if ($inf -match 'n$')         { return $inf.Substring(0, $inf.Length - 1) }
  return $inf
}

# Les lettres allemandes sont construites PAR LEUR CODE, jamais tapees.
# La source reste ainsi strictement ASCII : PowerShell 5.1 lit les scripts
# en ANSI, et un trema ecrit tel quel y devient une suite d octets qui ne
# correspond plus a rien dans une classe de caracteres. C est le meme piege
# que sans-livre.ps1 documente, et il s est reproduit ici.
#   E4 a-trema  F6 o-trema  FC u-trema  C4/D6/DC leurs majuscules  DF eszett
$VOY = 'aeiouAEIOU' +
       [char]0xE4 + [char]0xF6 + [char]0xFC +
       [char]0xC4 + [char]0xD6 + [char]0xDC
$ESZETT = [string][char]0xDF

function Get-Attendu([string]$rad, [string]$qui) {
  # Le "-e- d appui" : apres d ou t, et apres m/n precede d une consonne —
  # MAIS PAS apres l, m, n, r, h. C est ce dernier point qui manquait, et il
  # faisait passer komm-en, lern-en, kenn-en, wohn-en pour irreguliers.
  if ($rad -match '[dt]$' -or $rad -match "[^${VOY}lmnrh][mn]`$") {
    if ($qui -eq "du") { return $rad + "est" } else { return $rad + "et" }
  }
  # Radical deja siffant : le "du" ne prend que -t. Le eszett manquait aussi,
  # d ou hei-en et schlie-en signales a tort.
  if ($rad -match "(s|z|x|$ESZETT)`$") {
    return $rad + "t"
  }
  if ($qui -eq "du") { return $rad + "st" } else { return $rad + "t" }
}

$sortie = @()
foreach ($v in (Import-Csv "$ref\verbes-wiktionnaire.csv")) {
  $col = @($v.PSObject.Properties.Value)
  $inf = $col[0]; $ich = $col[1]; $du = $col[2]; $er = $col[3]
  if (-not $inf -or -not $du -or -not $er -or -not $ich) { continue }
  $du  = ($du  -split ',')[0].Trim()
  $er  = ($er  -split ',')[0].Trim()
  $ich = ($ich -split ',')[0].Trim()

  # Formes manquantes du dictionnaire (verbes impersonnels, defectifs).
  if ($ich -match '^\W*$' -or $du -match '^\W*$' -or $er -match '^\W*$') { continue }

  # VERBES A PARTICULE SEPARABLE ecartes. Leur forme du/er contient un espace
  # ("faehrst mit") : le test de regularite echoue toujours, et ils
  # remontaient donc en masse. Surtout, leur difficulte est la PLACE DE LA
  # PARTICULE, pas le changement de voyelle — c est une autre lecon. On garde
  # cet onglet sur une seule chose.
  if ($inf -match '\s' -or $ich -match '\s' -or $du -match '\s' -or $er -match '\s') { continue }

  $rad = Get-Radical $inf
  if (($du -eq (Get-Attendu $rad "du")) -and ($er -eq (Get-Attendu $rad "er"))) { continue }

  $cle = $inf.ToLower()
  $rang = if ($freq.ContainsKey($cle)) { $freq[$cle] } else { 999999 }
  $sortie += [pscustomobject]@{ inf = $inf; ich = $ich; du = $du; er = $er; rang = $rang }
}

Write-Output ("irreguliers au present trouves : " + $sortie.Count)

# La liste RETENUE, choisie a la main dans les plus frequents. On ne prend pas
# "les N premiers" aveuglement : le dictionnaire remonte aussi des composes
# litteraires (vermoegen, hinterlassen) et une ligne visiblement fautive
# (umgehen, donne au subjonctif). Mieux vaut une liste courte et sure.
$garder = @(
  'haben','werden','koennen','sehen','wissen','muessen','wollen','lassen',
  'helfen','geben','sollen','essen','nehmen','sprechen','halten','vergessen',
  'fahren','treffen','gefallen','schlafen','duerfen','laufen','tragen',
  'lesen','moegen','fallen','fangen','schlagen','werfen','treten','brechen',
  'raten','waschen','sterben','verlassen','laden'
) | ForEach-Object {
  $_ -replace 'ae', [string][char]0xE4 -replace 'oe', [string][char]0xF6 -replace 'ue', [string][char]0xFC
}

# Le pluriel se DEDUIT : wir et sie reprennent l infinitif, ihr prend le
# radical + t (avec le -e- d appui). Aucun verbe fort ne change de voyelle au
# pluriel — c est toute la regle, et elle ne souffre qu une exception, sein,
# qui est absent de ce dictionnaire et ajoute a la main dans l app.
function Get-Ihr([string]$rad) {
  if ($rad -match '[dt]$' -or $rad -match "[^${VOY}lmnrh][mn]`$") { return $rad + "et" }
  return $rad + "t"
}

Write-Output "--- table ---"
foreach ($cle in $garder) {
  $v = $sortie | Where-Object { $_.inf -eq $cle } | Select-Object -First 1
  if (-not $v) { Write-Output ("MANQUANT : " + $cle); continue }
  $rad = Get-Radical $v.inf
  Write-Output ("  [`"{0}`", `"`", `"{1}`", `"{2}`", `"{3}`", `"{0}`", `"{4}`", `"{0}`"]," -f
    $v.inf, $v.ich, $v.du, $v.er, (Get-Ihr $rad))
}
