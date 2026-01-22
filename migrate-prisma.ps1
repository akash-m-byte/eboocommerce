# Run Prisma migrations for all services
Write-Host "Running Prisma migrations for all services..." -ForegroundColor Green

$services = @(
    "auth-service",
    "cart-service",
    "inventory-service",
    "notification-service",
    "order-service",
    "payment-service",
    "pricing-service",
    "seller-service",
    "shipping-service"
)

foreach ($service in $services) {
    $prismaPath = "services\$service\prisma\schema.prisma"
    if (Test-Path $prismaPath) {
        Write-Host ""
        Write-Host "Running migrations for $service..." -ForegroundColor Yellow
        Push-Location "services\$service"
        try {
            # Use db push for development (non-interactive, creates tables directly)
            npx prisma db push --accept-data-loss
            if ($LASTEXITCODE -eq 0) {
                Write-Host "Database schema synced for $service" -ForegroundColor Green
            } else {
                Write-Host "Schema sync failed for $service" -ForegroundColor Red
            }
        } catch {
            Write-Host "Error syncing schema for $service : $_" -ForegroundColor Red
        }
        Pop-Location
    } else {
        Write-Host "No Prisma schema found for $service, skipping..." -ForegroundColor Gray
    }
}

Write-Host ""
Write-Host "=== Migration Complete ===" -ForegroundColor Green
Write-Host "All Prisma services should now have their database tables created."
