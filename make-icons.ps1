# Fabrique les icones de l'app (ecran d'accueil iPhone / Android).
#
#   .\make-icons.ps1
#
# Aucune installation requise : on utilise le dessin fourni avec Windows.
# A relancer seulement si on change la couleur ou les lettres.

$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.Drawing

$bg      = "#0B4FA8"   # le bleu d'accent de l'app, thème clair
$letters = "DT"

function New-Icon {
  param([int]$Size, [string]$Path)

  $bmp = New-Object System.Drawing.Bitmap($Size, $Size)
  $g   = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode     = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
  $g.Clear([System.Drawing.ColorTranslator]::FromHtml($bg))

  # Les lettres occupent ~46 % de la largeur : Android rogne les bords des
  # icones "maskable", il faut donc laisser de la marge tout autour.
  $font   = New-Object System.Drawing.Font("Segoe UI", ($Size * 0.34), [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
  $brush  = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
  $format = New-Object System.Drawing.StringFormat
  $format.Alignment     = [System.Drawing.StringAlignment]::Center
  $format.LineAlignment = [System.Drawing.StringAlignment]::Center

  $rect = New-Object System.Drawing.RectangleF(0, 0, $Size, $Size)
  $g.DrawString($letters, $font, $brush, $rect, $format)

  $g.Dispose()
  $bmp.Save($Path, [System.Drawing.Imaging.ImageFormat]::Png)
  $bmp.Dispose()
  Write-Output "icone : $Path"
}

New-Icon -Size 180 -Path (Join-Path $PSScriptRoot "icon-180.png")
New-Icon -Size 512 -Path (Join-Path $PSScriptRoot "icon-512.png")
