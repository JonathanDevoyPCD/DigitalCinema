param(
    [Parameter(Mandatory = $true)]
    [string]$PowerPoint
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.IO.Compression.FileSystem
$archive = [IO.Compression.ZipFile]::OpenRead((Resolve-Path $PowerPoint).Path)
try {
    $slides = $archive.Entries |
        Where-Object { $_.FullName -match '^ppt/slides/slide\d+\.xml$' } |
        Sort-Object { [int]([regex]::Match($_.FullName, 'slide(\d+)').Groups[1].Value) }
    $scenes = [ordered]@{}
    foreach ($slide in $slides | Select-Object -Skip 1) {
        $reader = [IO.StreamReader]::new($slide.Open())
        try { [xml]$xml = $reader.ReadToEnd() } finally { $reader.Dispose() }
        $ns = [Xml.XmlNamespaceManager]::new($xml.NameTable)
        $ns.AddNamespace('a', 'http://schemas.openxmlformats.org/drawingml/2006/main')
        $text = @($xml.SelectNodes('//a:t', $ns) | ForEach-Object { $_.'#text' })
        if ($text[1] -ne 'SCENE' -or $text[2] -ne 'SHOT ID' -or $text[10] -ne 'SUGGESTED COVERAGE' -or $text[11] -ne 'SELECTED SETUP') {
            throw "Unexpected slate format in $($slide.FullName)"
        }
        $sceneId = $text[4]
        if (-not $scenes.Contains($sceneId)) {
            $scenes[$sceneId] = [ordered]@{ id = $sceneId; name = $text[7]; location = $text[9]; shots = [System.Collections.ArrayList]::new() }
        }
        $coverage = @($text | Select-Object -Skip 12 | Where-Object { $_ -ne '________________' -and $_ -ne 'INDEX' -and $_ -ne 'Choose framing, angle and movement on set.' -and $_ -notmatch '^\d+ / \d+$' } | ForEach-Object { $_ -replace '^\u2022\s*', '' })
        [void]$scenes[$sceneId].shots.Add([ordered]@{ id = $text[5]; description = $text[8]; coverage = $coverage })
    }
    $json = ConvertTo-Json -InputObject @($scenes.Values) -Depth 10
    $output = Join-Path (Split-Path $PSScriptRoot -Parent) 'slates.js'
    [IO.File]::WriteAllText($output, "const SLATE_DATA = $json;`n", [Text.UTF8Encoding]::new($false))
    Write-Output "Extracted $($slides.Count - 1) slates across $($scenes.Count) scenes to $output"
} finally {
    $archive.Dispose()
}
