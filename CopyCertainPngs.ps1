# Define source and destination folders
$sourceDir = ".\all_logos"
$destDir = ".\selected_logos"

# Create the destination folder if it doesn't exist
if (!(Test-Path -Path $destDir)) {
    New-Item -ItemType Directory -Path $destDir
}

# Read file and copy logos
Get-Content .\logos.txt | ForEach-Object {
    $logoFile = Join-Path -Path $sourceDir -ChildPath $_
    if (Test-Path -Path $logoFile) {
        Copy-Item -Path $logoFile -Destination $destDir
        Write-Host "Copied: $_"
    } else {
        Write-Host "Missing: $_"
    }
}

Write-Host "Copy complete."
