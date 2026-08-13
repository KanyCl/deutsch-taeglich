# Lance l'auto-test de l'app dans Chrome sans fenêtre, et affiche le résultat.
#
#   .\test.ps1              → l'auto-test seul
#   .\test.ps1 -Shots       → l'auto-test + une capture de chaque écran dans .\captures\
#   .\test.ps1 -Publie      → l'auto-test sur le contenu de .\docs\ (ce qui part en ligne)
#
# Aucune installation requise : on réutilise le Chrome déjà présent sur la machine.

param([switch]$Shots, [switch]$Dark, [switch]$Publie)

$ErrorActionPreference = "Stop"

$chrome = @(
  "$env:ProgramFiles\Google\Chrome\Application\chrome.exe",
  "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe"
) | Where-Object { Test-Path $_ } | Select-Object -First 1

if (-not $chrome) { Write-Output "Aucun navigateur Chromium trouve."; exit 1 }

$app  = Join-Path $PSScriptRoot "index.html"
$url  = "file:///" + ($app -replace '\\', '/')
$prof = Join-Path $env:TEMP "deutsch-taeglich-test-profile"

# ---- 0. Le mode -Publie -------------------------------------------------
#
# POURQUOI CE MODE EXISTE. Jusqu'au 13/08/2026, les tests etaient DANS l'app :
# on pouvait donc lancer l'auto-test sur la version publiee, et le projet le
# faisait -- c'est ce qui garantissait que le decoupage de publication n'avait
# rien casse. Sortir les tests de la production fait perdre cette garantie.
#
# On la reconstitue ici : on repose les tests dans .\docs\ le temps d'une
# execution, dans une page a part, puis on efface. La version publiee, elle,
# ne contient jamais les tests.
#
# Ce qu'on verifie vraiment : que les fichiers copies dans docs\ sont sains et
# se chargent entre eux. C'est peu de chose -- la copie est fidele -- mais
# c'est exactement le genre d'evidence qui s'est deja revelee fausse ici.
$menage = @()
if ($Publie) {
  $docs = Join-Path $PSScriptRoot "docs"
  if (-not (Test-Path (Join-Path $docs "index.html"))) {
    Write-Output "ECHEC : docs\index.html introuvable. Lancer .\publier.ps1 d'abord."
    exit 1
  }

  $ancre = '<script src="demarrage.js"></script>'
  $pub = Get-Content (Join-Path $docs "index.html") -Raw -Encoding utf8
  if (-not $pub.Contains($ancre)) {
    Write-Output "ECHEC : point d'insertion introuvable dans docs\index.html."
    exit 1
  }
  # Garantie du sens inverse : si les tests etaient DEJA publies, ce mode
  # n'aurait rien a reposer -- et surtout, publier.ps1 aurait echoue a les
  # retirer. On refuse de le decouvrir en silence.
  if ($pub.Contains('tests/tests.js')) {
    Write-Output "ECHEC : docs\index.html contient deja les tests. publier.ps1 ne les a pas retires."
    exit 1
  }

  New-Item -ItemType Directory -Force (Join-Path $docs "tests") | Out-Null
  Copy-Item (Join-Path $PSScriptRoot "tests\tests.js") (Join-Path $docs "tests\tests.js") -Force
  $page = Join-Path $docs "_verif.html"
  $utf8 = New-Object System.Text.UTF8Encoding($false)
  [System.IO.File]::WriteAllText($page, $pub.Replace($ancre, '<script src="tests/tests.js"></script>' + "`r`n" + $ancre), $utf8)

  $menage = @($page, (Join-Path $docs "tests"))
  $app = $page
  $url = "file:///" + ($page -replace '\\', '/')
}

$common = @(
  "--headless", "--disable-gpu", "--no-first-run", "--no-default-browser-check",
  "--hide-scrollbars", "--user-data-dir=$prof", "--virtual-time-budget=5000"
)

Write-Output "Navigateur : $chrome"
Write-Output "Page       : $url"
Write-Output ""

# ---- 1. L'auto-test ----------------------------------------------------
$dom = & $chrome @common --dump-dom "$url#test" | Out-String

# Menage AVANT toute analyse, donc avant tout `exit` : le DOM est deja en
# memoire, les fichiers n'ont plus d'utilite. Rien de temporaire ne doit
# survivre dans docs\, qui part tel quel sur GitHub Pages.
foreach ($m in $menage) { if (Test-Path $m) { Remove-Item $m -Recurse -Force } }

# ATTENTION : --dump-dom rend AUSSI le code source de l'app, dans ses balises
# <script>. Ce code contient des chaines qui RESSEMBLENT au rapport, puisque
# c'est lui qui le fabrique ('<div class="t-sum" ...').
#
# Le 11/08/2026, une erreur de syntaxe a tue l'app : ecran blanc, plus une
# ligne de rapport. test.ps1 a lu les chaines du code source et a annonce
# "Tout passe" sur une app morte. Le garde-fou "pas de rapport" existait
# deja et n'a rien vu : il cherchait dans un texte qui contenait le motif.
#
# On retire donc les blocs <script> AVANT toute analyse. Ce qui reste est ce
# que l'ecran montre reellement -- la seule chose qu'on ait le droit de croire.
$rendu = [regex]::Replace($dom, '(?s)<script\b[^>]*>.*?</script\s*>', '')

$score = [regex]::Match($rendu, '<div class="t-sum"[^>]*>\s*([^<]+?)\s*</div>').Groups[1].Value
if (-not $score) {
  Write-Output "ECHEC : la page n'a pas produit de rapport. Le JavaScript a probablement plante."
  Write-Output "        (ouvre index.html#test dans un navigateur et regarde la console)"
  exit 1
}

# Le score doit avoir la forme "N / N". Toute autre forme signifie qu'on lit
# autre chose que le compteur -- on prefere echouer que rassurer a tort.
if ($score -notmatch '^\s*\d+\s*/\s*\d+\s*$') {
  Write-Output "ECHEC : le rapport est illisible (lu : « $score »)."
  exit 1
}

$ko = [regex]::Matches($rendu, '(?s)<span class="t-tag ko">KO</span><span>(.*?)</span></div>')

Write-Output "=== AUTO-TEST : $score ==="
if ($ko.Count -eq 0) {
  Write-Output "Tout passe."
} else {
  Write-Output "$($ko.Count) echec(s) :"
  foreach ($m in $ko) {
    $txt = $m.Groups[1].Value -replace '<br>', ' -- ' -replace '<[^>]+>', ''
    Write-Output "  KO  $txt"
  }
}

# ---- 2. Les captures d'ecran -------------------------------------------
#
# Chrome sans fenetre refuse de descendre sous 500 px de large : une capture
# demandee en 390 px affiche donc une page mise en page en 500 px, puis rognee.
# Pour obtenir une VRAIE largeur de telephone, on glisse l'app dans un cadre
# (iframe) de 390 px : a l'interieur, la mise en page croit disposer de 390 px.
# La bande rose a droite marque la limite de l'ecran simule.

if ($Shots) {
  $out = Join-Path $PSScriptRoot "captures"
  New-Item -ItemType Directory -Force $out | Out-Null

  $W = 390; $H = 844
  $suffix = ""
  $target = $url

  # Thème sombre : on ne l'impose pas depuis la page parente (le style calcule
  # alors des valeurs peu fiables). On produit une copie de l'app qui pose
  # elle-meme data-theme AVANT de s'afficher — exactement ce que fait le
  # lecteur de claude.ai. C'est la vraie feuille de style, testee normalement.
  #
  # ATTENTION : la copie sombre doit rester DANS LE DOSSIER DU PROJET.
  # Depuis le decoupage du 13/08/2026, index.html charge ses fichiers par des
  # chemins relatifs (donnees/cours.js, app.js...). Une copie posee dans %TEMP%
  # ne les trouverait plus : la page s'afficherait vide, et la capture montrerait
  # une app morte sans que rien ne le signale. Le fichier est efface a la fin.
  if ($Dark) {
    $suffix = "-sombre"
    $src  = Get-Content $app -Raw -Encoding utf8
    $hook = '<meta name="color-scheme" content="light dark">'
    if ($src -notlike "*$hook*") { Write-Output "ATTENTION : point d'insertion du theme introuvable."; exit 1 }
    $src  = $src.Replace($hook, $hook + "`n<script>document.documentElement.setAttribute('data-theme','dark');</script>")
    $copy = Join-Path $PSScriptRoot "_sombre.html"
    $src | Out-File -FilePath $copy -Encoding utf8
    $target = "file:///" + ($copy -replace '\\', '/')
  }

  # "drills" ajoute le 02/08/2026 : c'est le seul ecran qui porte le filigrane
  # de consigne dans une boite COURTE. Les cartes, elles, ont 14 rem de haut —
  # un debordement ne s'y verrait pas.
  foreach ($screen in @("home", "lesson", "cards", "drills", "practice", "quiz", "reglages", "test")) {
    $hash    = if ($screen -eq "home") { "" } else { "#$screen" }
    $wrapper = Join-Path $env:TEMP "deutsch-shot-$screen.html"
    $png     = Join-Path $out "$screen$suffix.png"

    @"
<title>capture $screen</title>
<style>html,body{margin:0;background:#ff5fa2}iframe{border:0;display:block;width:${W}px;height:${H}px}</style>
<iframe src="$target$hash"></iframe>
"@ | Out-File -FilePath $wrapper -Encoding utf8

    $wurl = "file:///" + ($wrapper -replace '\\', '/')
    & $chrome @common --allow-file-access-from-files --window-size=500,$H --screenshot="$png" "$wurl" | Out-Null
    if (Test-Path $png) { Write-Output "capture : $png" }
  }

  if ($Dark -and (Test-Path $copy)) { Remove-Item $copy -Force }
}
