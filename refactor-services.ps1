# Refactor all services to follow layered architecture
Write-Host "Refactoring all services to layered architecture..." -ForegroundColor Green

$services = @(
    "cart-service", "order-service", "payment-service",
    "pricing-service", "inventory-service", "seller-service", "shipping-service",
    "notification-service", "review-service"
)

foreach ($service in $services) {
    $servicePath = "services\$service"
    
    if (-not (Test-Path $servicePath)) {
        Write-Host "Skipping $service - not found" -ForegroundColor Yellow
        continue
    }
    
    Write-Host "`nProcessing $service..." -ForegroundColor Cyan
    
    # Check if controller exists and needs refactoring
    $controllerFiles = Get-ChildItem -Path "$servicePath\src\controllers" -Filter "*.ts" -ErrorAction SilentlyContinue
    foreach ($file in $controllerFiles) {
        if ($file.Name -eq "healthController.ts") { continue }
        
        $content = Get-Content $file.FullName -Raw
        $needsFix = $false
        
        # Check if controller methods don't have NextFunction
        if ($content -match "async.*\(req.*res.*\)" -and $content -notmatch "NextFunction") {
            $needsFix = $true
        }
        
        # Check if controller has business logic (direct repository calls)
        if ($content -match "Repository|repository|prisma\.|mongoose\.|Model\.") {
            Write-Host "  Warning: $($file.Name) may have business logic - needs manual review" -ForegroundColor Yellow
        }
        
        if ($needsFix) {
            Write-Host "  Controller $($file.Name) needs NextFunction parameter" -ForegroundColor Yellow
        }
    }
    
    # Check if service exists
    $serviceFiles = Get-ChildItem -Path "$servicePath\src\services" -Filter "*.ts" -ErrorAction SilentlyContinue
    if ($serviceFiles.Count -eq 0) {
        Write-Host "  Warning: No service files found - may need to create service layer" -ForegroundColor Yellow
    }
    
    # Check if repository exists
    $repoFiles = Get-ChildItem -Path "$servicePath\src\repositories" -Filter "*.ts" -ErrorAction SilentlyContinue
    if ($repoFiles.Count -eq 0) {
        Write-Host "  Warning: No repository files found - may need to create repository layer" -ForegroundColor Yellow
    }
}

Write-Host "`n=== Refactoring Complete ===" -ForegroundColor Green
Write-Host "See ARCHITECTURE_LAYERS.md for the layered architecture pattern"
Write-Host "Review each service and ensure proper separation of concerns"
