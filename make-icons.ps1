# Fabrique les icones de l'app (ecran d'accueil iPhone / Android).
#
#   .\make-icons.ps1
#
# Aucune installation requise : on utilise le dessin fourni avec Windows.
# A relancer seulement si on change le dessin.
#
# Le dessin est le drapeau allemand : trois bandes horizontales egales,
# noir / rouge / or (DIN 6171-1). Demande d'Exsangue le 02/08/2026 —
# les lettres "DT" sur fond bleu ne lui plaisaient pas sur son iPhone.
#
# Pourquoi trois bandes pleines et rien d'autre :
#   - iOS arrondit lui-meme les angles, et Android rogne les bords des icones
#     "maskable". Des bandes horizontales survivent aux deux : quel que soit
#     le rognage on voit encore noir-rouge-or. Un logo centre, lui, se fait
#     manger les coins.
#   - A 40 px sur un ecran d'accueil une lettre ne se lit plus. Un drapeau,
#     si : c'est la forme qui porte le sens, pas le detail.

$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.Drawing

# Les couleurs officielles du drapeau federal.
$bandes = @("#000000", "#DD0000", "#FFCE00")

function New-Icon {
  param([int]$Size, [string]$Path)

  $bmp = New-Object System.Drawing.Bitmap($Size, $Size)
  $g   = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias

  # Trois tiers exacts. On calcule le haut ET le bas de chaque bande a partir
  # de la taille totale, au lieu d'empiler des hauteurs arrondies : sinon
  # l'arrondi laisse une ligne de pixels vides en bas de l'icone.
  for ($i = 0; $i -lt 3; $i++) {
    $haut  = [int][Math]::Round($Size * $i / 3)
    $bas   = [int][Math]::Round($Size * ($i + 1) / 3)
    $brush = New-Object System.Drawing.SolidBrush(
      [System.Drawing.ColorTranslator]::FromHtml($bandes[$i]))
    $g.FillRectangle($brush, 0, $haut, $Size, ($bas - $haut))
    $brush.Dispose()
  }

  $g.Dispose()
  $bmp.Save($Path, [System.Drawing.Imaging.ImageFormat]::Png)
  $bmp.Dispose()
  Write-Output "icone : $Path"
}

New-Icon -Size 180 -Path (Join-Path $PSScriptRoot "icon-180.png")
New-Icon -Size 512 -Path (Join-Path $PSScriptRoot "icon-512.png")
