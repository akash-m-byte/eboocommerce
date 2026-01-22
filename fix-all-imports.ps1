# Fix all shared import paths across all services
Write-Host "Fixing shared import paths in all services..." -ForegroundColor Green

$services = @(
    "product-service", "cart-service", "order-service", "payment-service",
    "pricing-service", "inventory-service", "seller-service", "shipping-service",
    "notification-service", "review-service", "docs-service"
)

foreach ($service in $services) {
    $servicePath = "services\$service"
    
    if (-not (Test-Path $servicePath)) {
        Write-Host "Skipping $service - not found" -ForegroundColor Yellow
        continue
    }
    
    Write-Host "`nProcessing $service..." -ForegroundColor Cyan
    
    # Fix src/index.ts - should be ../../../shared (3 levels)
    $indexFile = "$servicePath\src\index.ts"
    if (Test-Path $indexFile) {
        $content = Get-Content $indexFile -Raw
        $newContent = $content -replace "from ['\`"]\.\.\/\.\.\/shared", "from '../../../shared"
        if ($newContent -ne $content) {
            $newContent | Set-Content $indexFile -NoNewline
            Write-Host "  Fixed src/index.ts" -ForegroundColor Green
        }
    }
    
    # Fix src/config/env.ts - should be ../../../../shared (4 levels)
    $configFile = "$servicePath\src\config\env.ts"
    if (Test-Path $configFile) {
        $content = Get-Content $configFile -Raw
        $newContent = $content -replace "from ['\`"]\.\.\/\.\.\/shared", "from '../../../../shared"
        if ($newContent -ne $content) {
            $newContent | Set-Content $configFile -NoNewline
            Write-Host "  Fixed src/config/env.ts" -ForegroundColor Green
        }
    }
    
    # Fix src/services/*.ts - should be ../../../../shared (4 levels)
    $servicesFiles = Get-ChildItem -Path "$servicePath\src\services" -Filter "*.ts" -ErrorAction SilentlyContinue
    foreach ($file in $servicesFiles) {
        $content = Get-Content $file.FullName -Raw
        $newContent = $content -replace "from ['\`"]\.\.\/\.\.\/shared", "from '../../../../shared"
        if ($newContent -ne $content) {
            $newContent | Set-Content $file.FullName -NoNewline
            Write-Host "  Fixed $($file.Name)" -ForegroundColor Green
        }
    }
    
    # Fix src/controllers/*.ts - should be ../../../../shared (4 levels)
    $controllersFiles = Get-ChildItem -Path "$servicePath\src\controllers" -Filter "*.ts" -ErrorAction SilentlyContinue
    foreach ($file in $controllersFiles) {
        $content = Get-Content $file.FullName -Raw
        $newContent = $content -replace "from ['\`"]\.\.\/\.\.\/shared", "from '../../../../shared"
        if ($newContent -ne $content) {
            $newContent | Set-Content $file.FullName -NoNewline
            Write-Host "  Fixed $($file.Name)" -ForegroundColor Green
        }
    }
    
    # Fix src/routes/*.ts - should be ../../../../shared (4 levels)
    $routesFiles = Get-ChildItem -Path "$servicePath\src\routes" -Filter "*.ts" -ErrorAction SilentlyContinue
    foreach ($file in $routesFiles) {
        $content = Get-Content $file.FullName -Raw
        $newContent = $content -replace "from ['\`"]\.\.\/\.\.\/shared", "from '../../../../shared"
        if ($newContent -ne $content) {
            $newContent | Set-Content $file.FullName -NoNewline
            Write-Host "  Fixed $($file.Name)" -ForegroundColor Green
        }
    }
}

Write-Host "`n=== All services fixed! ===" -ForegroundColor Green
