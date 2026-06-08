# Royal Groww Frontend Renaming Script
# This script renames the frontend project from RoyalZomato to Royal Groww

$frontendPath = "c:\Users\ramak\OneDrive\Desktop\Spring boot froud - Copy-1\frontend"

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host " Royal Groww Frontend Renaming Script    " -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Update package.json
Write-Host "[1/6] Updating package.json..." -ForegroundColor Yellow
$packageJsonPath = "$frontendPath\package.json"
if (Test-Path $packageJsonPath) {
    $content = Get-Content $packageJsonPath -Raw
    $newContent = $content -replace '"name":\s*"royalzomato-frontend"', '"name": "royalgroww-frontend"'
    Set-Content -Path $packageJsonPath -Value $newContent -NoNewline
    Write-Host "   ✓ package.json updated" -ForegroundColor Green
} else {
    Write-Host "   ⚠ package.json not found" -ForegroundColor Red
}

# Step 2: Update index.html
Write-Host "[2/6] Updating index.html..." -ForegroundColor Yellow
$indexHtmlPath = "$frontendPath\index.html"
if (Test-Path $indexHtmlPath) {
    $content = Get-Content $indexHtmlPath -Raw
    $newContent = $content -replace '<title>.*?</title>', '<title>Royal Groww - Investment Platform</title>'
    Set-Content -Path $indexHtmlPath -Value $newContent -NoNewline
    Write-Host "   ✓ index.html updated" -ForegroundColor Green
} else {
    Write-Host "   ⚠ index.html not found" -ForegroundColor Red
}

# Step 3: Update all JSX/JS files with "RoyalZomato" text
Write-Host "[3/6] Updating JSX/JS files..." -ForegroundColor Yellow
$jsxFiles = Get-ChildItem -Path "$frontendPath\src" -Include "*.jsx","*.js" -Recurse
$fileCount = 0
foreach ($file in $jsxFiles) {
    $content = Get-Content $file.FullName -Raw
    if ($content -match "RoyalZomato") {
        $newContent = $content -replace "RoyalZomato", "Royal Groww"
        Set-Content -Path $file.FullName -Value $newContent -NoNewline
        $fileCount++
        Write-Host "   - Updated: $($file.Name)" -ForegroundColor Gray
    }
}
Write-Host "   ✓ Updated $fileCount JSX/JS files" -ForegroundColor Green

# Step 4: Update README.md if exists
Write-Host "[4/6] Updating README.md..." -ForegroundColor Yellow
$readmePath = "$frontendPath\README.md"
if (Test-Path $readmePath) {
    $content = Get-Content $readmePath -Raw
    $newContent = $content -replace "RoyalZomato", "Royal Groww"
    $newContent = $newContent -replace "royalzomato", "royalgroww"
    Set-Content -Path $readmePath -Value $newContent -NoNewline
    Write-Host "   ✓ README.md updated" -ForegroundColor Green
} else {
    Write-Host "   ⚠ README.md not found" -ForegroundColor Yellow
}

# Step 5: Check for any logo files that might need updating
Write-Host "[5/6] Checking for logo/image files..." -ForegroundColor Yellow
$publicPath = "$frontendPath\public"
if (Test-Path $publicPath) {
    $logoFiles = Get-ChildItem -Path $publicPath -Include "*.png","*.jpg","*.svg","*.ico" -Recurse
    if ($logoFiles.Count -gt 0) {
        Write-Host "   ⚠ Found $($logoFiles.Count) logo/image file(s):" -ForegroundColor Yellow
        foreach ($logo in $logoFiles) {
            Write-Host "     - $($logo.Name)" -ForegroundColor Gray
        }
        Write-Host "   ℹ You may want to update these with 'Royal Groww' branding" -ForegroundColor Cyan
    } else {
        Write-Host "   ℹ No logo files found in public folder" -ForegroundColor Cyan
    }
} else {
    Write-Host "   ⚠ Public folder not found" -ForegroundColor Yellow
}

# Step 6: Update any environment files (.env)
Write-Host "[6/6] Checking environment files..." -ForegroundColor Yellow
$envFiles = Get-ChildItem -Path $frontendPath -Filter ".env*"
if ($envFiles.Count -gt 0) {
    foreach ($envFile in $envFiles) {
        $content = Get-Content $envFile.FullName -Raw
        if ($content -match "royalzomato" -or $content -match "RoyalZomato") {
            $newContent = $content -replace "royalzomato", "royalgroww"
            $newContent = $newContent -replace "RoyalZomato", "Royal Groww"
            Set-Content -Path $envFile.FullName -Value $newContent -NoNewline
            Write-Host "   ✓ $($envFile.Name) updated" -ForegroundColor Green
        }
    }
} else {
    Write-Host "   ℹ No .env files found" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "  NEXT STEPS:" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "1. Clear node_modules and reinstall:" -ForegroundColor White
Write-Host "   rm -r node_modules" -ForegroundColor Gray
Write-Host "   npm install" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Clear build cache:" -ForegroundColor White
Write-Host "   rm -r dist" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Update API endpoint if needed (check .env file)" -ForegroundColor White
Write-Host ""
Write-Host "4. Test the frontend:" -ForegroundColor White
Write-Host "   npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "✓ Frontend renaming completed!" -ForegroundColor Green
