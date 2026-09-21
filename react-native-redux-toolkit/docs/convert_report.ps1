$ErrorActionPreference = 'Stop'
$reportRoot = Split-Path -Parent $PSScriptRoot
[string]$docxPath = Join-Path $PSScriptRoot 'Tim_hieu_Redux_Toolkit.docx'
[string]$docPath = Join-Path $PSScriptRoot 'Tim_hieu_Redux_Toolkit.doc'
$qaPath = Join-Path $reportRoot '.expo/report-qa'
New-Item -ItemType Directory -Path $qaPath -Force | Out-Null
[string]$pdfPath = Join-Path $qaPath 'Tim_hieu_Redux_Toolkit.pdf'
$word = $null
$document = $null
try {
    $word = New-Object -ComObject Word.Application
    $word.Visible = $false
    $word.DisplayAlerts = 0
    $confirmConversions = $false
    $readOnly = $false
    $document = $word.Documents.Open([ref]$docxPath, [ref]$confirmConversions, [ref]$readOnly)
    Write-Output 'Report opened'
    # Word 97-2003 binary format, not a renamed DOCX or HTML file.
    $docFormat = 0
    $document.SaveAs([ref]$docPath, [ref]$docFormat)
    Write-Output 'DOC saved'
    $document.Repaginate()
    $pdfFormat = 17
    $document.SaveAs([ref]$pdfPath, [ref]$pdfFormat)
    Write-Output "DOC created: $docPath"
    Write-Output "Pages: $($document.ComputeStatistics(2))"
} finally {
    if ($null -ne $document) { $discardChanges = 0; $document.Close([ref]$discardChanges) }
    if ($null -ne $word) { $word.Quit() }
}
