param([switch]$SkipPdf, [switch]$VerifySourcePreservation)
$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path $PSScriptRoot -Parent
$sharedRoot = Join-Path $PSScriptRoot '../../../Website/publication/latex-web-v1'
Push-Location $projectRoot
try {
    New-Item -ItemType Directory -Path 'tmp/web/pdf' -Force | Out-Null
    if (-not $SkipPdf) {
        & latexmk -pdf -interaction=nonstopmode -halt-on-error -file-line-error -outdir=tmp/web/pdf 'Efimov K-theory Notes.tex' *> tmp/web/pdf-build.log
        if ($LASTEXITCODE -ne 0) { throw 'PDF compilation failed; see tmp/web/pdf-build.log.' }
    }
    & node web/prepare.mjs
    if ($LASTEXITCODE -ne 0) { throw 'Source preparation failed.' }
    $inventory = Get-Content tmp/web/inventory.json -Raw | ConvertFrom-Json
    Push-Location tmp/web
    try {
        foreach ($chapter in $inventory.chapters) {
            $name = $chapter.htmlName
            $digest = ((Get-FileHash -Algorithm SHA256 -LiteralPath "$name.tex").Hash + (Get-FileHash -Algorithm SHA256 -LiteralPath 'preamble-web.tex').Hash + 'mathjax,charset=utf-8')
            $stamp = "$name.converted-hash"
            if ((Test-Path -LiteralPath "html/$name.html") -and (Test-Path -LiteralPath $stamp) -and (Get-Content -LiteralPath $stamp -Raw).Trim() -eq $digest) {
                Write-Output "Reusing conversion for $($chapter.heading)."
            } else {
                Write-Output "Converting $($chapter.heading): $($chapter.title)."
                & make4ht -a warning -f html5 -d html -s "$name.tex" 'mathjax,charset=utf-8' *> "$name.conversion.log"
                if ($LASTEXITCODE -ne 0 -or (Select-String -LiteralPath "$name.conversion.log" -Pattern '\[FATAL\]|\[ERROR\]')) { throw "TeX4ht conversion failed; see tmp/web/$name.conversion.log." }
                Set-Content -LiteralPath $stamp -Value $digest -Encoding utf8
            }
        }
    } finally { Pop-Location }
    $stage = [System.IO.Path]::GetFullPath((Join-Path $projectRoot 'output/web-staging'))
    $expectedStage = Join-Path ([System.IO.Path]::GetFullPath($projectRoot)) 'output\web-staging'
    if ($stage -ne $expectedStage) { throw "Unexpected staging path: $stage" }
    if (Test-Path -LiteralPath $stage) { Remove-Item -LiteralPath $stage -Recurse -Force }
    $env:WEB_OUTPUT_ROOT = $stage
    & node web/assemble.mjs
    if ($LASTEXITCODE -ne 0) { throw 'HTML assembly failed.' }
    New-Item -ItemType Directory -Path (Join-Path $stage '_assets/mathjax') -Force | Out-Null
    Get-ChildItem -LiteralPath (Join-Path $sharedRoot 'vendor/mathjax-4.1.3') | Copy-Item -Destination (Join-Path $stage '_assets/mathjax') -Recurse -Force
    Push-Location tmp/web/diagrams
    try {
        $jobs = Get-Content ../diagram-jobs.json -Raw | ConvertFrom-Json
        foreach ($name in $jobs) {
            if (-not (Test-Path -LiteralPath "$name.svg")) {
                & latex -interaction=nonstopmode -halt-on-error "$name.tex" *> "$name.build.log"
                if ($LASTEXITCODE -ne 0) { throw "Diagram compilation failed: $name" }
                & dvisvgm --no-fonts -o "$name.svg" "$name.dvi" *> "$name.svg.log"
                if ($LASTEXITCODE -ne 0) { throw "SVG conversion failed: $name" }
            }
        }
    } finally { Pop-Location }
    if ($VerifySourcePreservation) { & node web/finalize.mjs $stage --verify-source-metadata }
    else { & node web/finalize.mjs $stage }
    if ($LASTEXITCODE -ne 0) { throw 'Generated edition validation failed.' }
    # Preserve the previous local preview until the complete candidate validates.
    & node web/promote-local.mjs $stage
    if ($LASTEXITCODE -ne 0) { throw 'Local preview replacement failed.' }
} finally {
    Remove-Item Env:\WEB_OUTPUT_ROOT -ErrorAction SilentlyContinue
    Pop-Location
}
