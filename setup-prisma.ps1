# Generate Prisma clients for all services
Write-Host "Generating Prisma clients..." -ForegroundColor Green

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
        Write-Host "Generating Prisma client for $service..." -ForegroundColor Yellow
        Push-Location "services\$service"
        npx prisma generate
        Pop-Location
    } else {
        Write-Host "No Prisma schema found for $service, skipping..." -ForegroundColor Gray
    }
}

Write-Host "`nPrisma client generation complete!" -ForegroundColor Green
