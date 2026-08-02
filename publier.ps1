# Prepare le dossier publie : .\docs\
#
#   .\publier.ps1
#
# Remplace sans-livre.ps1, devenu sans objet le 02/08/2026 : le livre a ete
# retire de index.html a la demande d Exsangue, il n y a donc plus rien a
# decouper. La source EST desormais la version publiable.
#
# Consequence heureuse, et c est la vraie raison de garder une trace ici :
# index.html n etait pas suivi par git tant qu il contenait le livre. Il l est
# maintenant. La source du travail est enfin sauvegardee dans le depot, et non
# plus seulement sur un disque.
#
# NOTE : fichier volontairement en ASCII pur. PowerShell 5.1 lit les scripts en
# ANSI ; un tiret long ou un guillemet francais y devient une suite d octets qui
# casse l analyse du script. Meme piege que celui documente dans extraire-verbes.ps1.

$ErrorActionPreference = "Stop"

$src = $PSScriptRoot
$dst = Join-Path $src "docs"

$app = Join-Path $src "index.html"
if (-not (Test-Path $app)) { Write-Output "ECHEC : index.html introuvable."; exit 1 }

$html = Get-Content $app -Raw -Encoding utf8

# Garde-fou conserve, et il n est pas decoratif. Si le livre revenait un jour
# dans index.html -- une transcription reprise depuis les photos, par exemple --
# ce script le publierait sans rien dire. On refuse donc de publier des qu une
# entree de livre apparait. Le temoin est STRUCTUREL : chaque unite du tableau
# BOOK porte un champ "pages" renseigne, qu on ne trouve nulle part ailleurs.
# Un temoin lexical (chercher des mots allemands) bloquerait a tort des mots que
# les etapes emploient legitimement, et un garde-fou qui crie a tort finit par
# etre contourne.
if ([regex]::IsMatch($html, 'pages: "[^"]')) {
  Write-Output "ECHEC : une entree du tableau BOOK est presente dans index.html."
  Write-Output "Le livre est sous copyright (Werner Dubois et Alvaro Garcia Noble, 2025)."
  Write-Output "Publication annulee. Retirer le livre avant de publier."
  exit 1
}
foreach ($t in @("LIVRE-DEBUT", "Kaffeehaus", "Steppenwolf")) {
  if ($html.Contains($t)) {
    Write-Output ("ECHEC : '" + $t + "' est present dans index.html.")
    Write-Output "Le livre n est pas sorti. Publication annulee."
    exit 1
  }
}

if (Test-Path $dst) { Remove-Item $dst -Recurse -Force }
New-Item -ItemType Directory -Force $dst | Out-Null

Copy-Item $app $dst -Force
foreach ($f in @("icon-180.png", "icon-512.png", "manifest.webmanifest")) {
  Copy-Item (Join-Path $src $f) $dst -Force
}

$ko = [math]::Round((Get-Item (Join-Path $dst "index.html")).Length / 1KB)
Write-Output "Dossier publiable pret : $dst"
Write-Output "index.html : $ko Ko"
Write-Output ""
Write-Output "Il reste a commiter et pousser : GitHub Pages sert le dossier docs\."
