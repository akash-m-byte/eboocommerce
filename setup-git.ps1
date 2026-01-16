# Git Setup Script for E-boo Platform
# Run this script to configure git for the repository

Write-Host "Setting up Git configuration..." -ForegroundColor Green

# Set user name
git config user.name "Akash Masih"
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Git user name set to: Akash Masih" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to set git user name. Is git installed?" -ForegroundColor Red
    exit 1
}

# Set user email
git config user.email "dev.akashmasih@gmail.com"
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Git email set to: dev.akashmasih@gmail.com" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to set git email. Is git installed?" -ForegroundColor Red
    exit 1
}

# Initialize git repository if not already initialized
if (-not (Test-Path .git)) {
    Write-Host "Initializing git repository..." -ForegroundColor Green
    git init
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Git repository initialized" -ForegroundColor Green
    }
}

# Create .gitignore if it doesn't exist
if (-not (Test-Path .gitignore)) {
    Write-Host "Creating .gitignore..." -ForegroundColor Green
    Copy-Item .gitignore.example .gitignore -ErrorAction SilentlyContinue
}

Write-Host "`nGit configuration complete!" -ForegroundColor Green
Write-Host "Current git config:" -ForegroundColor Cyan
git config --list --local | Select-String "user\."
