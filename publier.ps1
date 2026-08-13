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

# --- Ce qu on publie -------------------------------------------------------
#
# Depuis le decoupage du 13/08/2026, l app n est plus un fichier mais cinq.
# tests\tests.js N EN FAIT PAS PARTIE : 3 385 lignes que l utilisateur
# telechargeait pour rien, et le vecteur du bug qui ecrasait sa progression.
# demarrage.js verifie que runTests existe avant de l appeler, donc son absence
# ne casse rien -- #test ouvre simplement l accueil sur la version en ligne.
#
# sw.js ajoute le 13/08/2026 (§4) : c est du code publie, il passe donc par
# $fichiers et non par $statiques -- ainsi le garde-fou du livre le scrute lui
# aussi. Un controle doit suivre ce qu il controle.
$fichiers = @("donnees\cours.js", "app.js", "demarrage.js", "sw.js")
$statiques = @("icon-180.png", "icon-512.png", "manifest.webmanifest")

# Garde-fou conserve, et il n est pas decoratif. Si le livre revenait un jour
# -- une transcription reprise depuis les photos, par exemple -- ce script le
# publierait sans rien dire. On refuse donc de publier des qu une entree de
# livre apparait. Le temoin est STRUCTUREL : chaque unite du tableau BOOK porte
# un champ "pages" renseigne, qu on ne trouve nulle part ailleurs.
# Un temoin lexical (chercher des mots allemands) bloquerait a tort des mots que
# les etapes emploient legitimement, et un garde-fou qui crie a tort finit par
# etre contourne.
#
# ATTENTION : IL SCRUTE MAINTENANT TOUS LES FICHIERS PUBLIES, pas seulement
# index.html.
# Le 13/08/2026 le code est sorti du HTML : un garde-fou qui ne regarde que
# index.html ne verrait plus rien passer. Un controle doit suivre ce qu il
# controle, jamais l endroit ou il se trouvait au depart.
foreach ($rel in @("index.html") + $fichiers) {
  $chemin = Join-Path $src $rel
  if (-not (Test-Path $chemin)) {
    Write-Output ("ECHEC : " + $rel + " introuvable. Le decoupage a-t-il bouge ?")
    exit 1
  }
  $texte = Get-Content $chemin -Raw -Encoding utf8
  if ([regex]::IsMatch($texte, 'pages: "[^"]')) {
    Write-Output ("ECHEC : une entree du tableau BOOK est presente dans " + $rel + ".")
    Write-Output "Le livre est sous copyright (Werner Dubois et Alvaro Garcia Noble, 2025)."
    Write-Output "Publication annulee. Retirer le livre avant de publier."
    exit 1
  }
  foreach ($t in @("LIVRE-DEBUT", "Kaffeehaus", "Steppenwolf")) {
    if ($texte.Contains($t)) {
      Write-Output ("ECHEC : '" + $t + "' est present dans " + $rel + ".")
      Write-Output "Le livre n est pas sorti. Publication annulee."
      exit 1
    }
  }
}

if (Test-Path $dst) { Remove-Item $dst -Recurse -Force }
New-Item -ItemType Directory -Force $dst | Out-Null

# index.html publie = la source, MOINS la balise des tests.
$balise = '<script src="tests/tests.js"></script>'
if (-not $html.Contains($balise)) {
  Write-Output "ECHEC : la balise des tests est introuvable dans index.html."
  Write-Output "Attendu : $balise"
  Write-Output "Sans elle, on ne sait plus si les tests sont publies ou non."
  exit 1
}
$publie = $html.Replace($balise + "`r`n", "").Replace($balise + "`n", "").Replace($balise, "")
$utf8 = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText((Join-Path $dst "index.html"), $publie, $utf8)

foreach ($rel in $fichiers) {
  $cible = Join-Path $dst $rel
  New-Item -ItemType Directory -Force (Split-Path $cible -Parent) | Out-Null
  Copy-Item (Join-Path $src $rel) $cible -Force
}
foreach ($f in $statiques) {
  Copy-Item (Join-Path $src $f) $dst -Force
}

# Ceinture et bretelles : on verifie que les tests ne sont PAS partis.
if (Test-Path (Join-Path $dst "tests")) {
  Write-Output "ECHEC : le dossier tests\ s est retrouve dans docs\."
  exit 1
}

$total = (Get-ChildItem $dst -Recurse -File | Measure-Object -Property Length -Sum).Sum
Write-Output "Dossier publiable pret : $dst"
foreach ($rel in @("index.html") + $fichiers) {
  $ko = [math]::Round((Get-Item (Join-Path $dst $rel)).Length / 1KB)
  Write-Output ("  " + $rel.PadRight(20) + " " + $ko + " Ko")
}
Write-Output ("  TOTAL (avec icones)  " + [math]::Round($total / 1KB) + " Ko")
Write-Output ""
Write-Output "Il reste a commiter et pousser : GitHub Pages sert le dossier docs\."
