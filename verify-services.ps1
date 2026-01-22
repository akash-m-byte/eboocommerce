# Service Verification Script
Write-Host "=== E-boo Service Health Check ===" -ForegroundColor Cyan
Write-Host ""

$services = @(
    @{ Name = "API Gateway"; Port = 4000; Path = "/graphql"; Health = "/health" },
    @{ Name = "Auth Service"; Port = 4001; Path = "/api/health"; Health = "/api/health" },
    @{ Name = "Product Service"; Port = 4002; Path = "/api/health"; Health = "/api/health" },
    @{ Name = "Pricing Service"; Port = 4003; Path = "/api/health"; Health = "/api/health" },
    @{ Name = "Inventory Service"; Port = 4004; Path = "/api/health"; Health = "/api/health" },
    @{ Name = "Cart Service"; Port = 4005; Path = "/api/health"; Health = "/api/health" },
    @{ Name = "Order Service"; Port = 4006; Path = "/api/health"; Health = "/api/health" },
    @{ Name = "Payment Service"; Port = 4007; Path = "/api/health"; Health = "/api/health" },
    @{ Name = "Seller Service"; Port = 4008; Path = "/api/health"; Health = "/api/health" },
    @{ Name = "Shipping Service"; Port = 4009; Path = "/api/health"; Health = "/api/health" },
    @{ Name = "Notification Service"; Port = 4010; Path = "/api/health"; Health = "/api/health" },
    @{ Name = "Review Service"; Port = 4011; Path = "/api/health"; Health = "/api/health" },
    @{ Name = "Docs Service"; Port = 4012; Path = "/docs"; Health = "/api/health" }
)

$running = 0
$failed = 0

foreach ($service in $services) {
    $url = "http://localhost:$($service.Port)$($service.Health)"
    try {
        $response = Invoke-WebRequest -Uri $url -Method GET -TimeoutSec 2 -UseBasicParsing -ErrorAction Stop
        if ($response.StatusCode -eq 200) {
            Write-Host "✅ $($service.Name) (Port $($service.Port))" -ForegroundColor Green
            $running++
        } else {
            Write-Host "⚠️  $($service.Name) (Port $($service.Port)) - Status: $($response.StatusCode)" -ForegroundColor Yellow
            $failed++
        }
    } catch {
        Write-Host "❌ $($service.Name) (Port $($service.Port)) - Not responding" -ForegroundColor Red
        $failed++
    }
}

Write-Host ""
Write-Host "=== Summary ===" -ForegroundColor Cyan
Write-Host "Running: $running" -ForegroundColor Green
Write-Host "Failed: $failed" -ForegroundColor $(if ($failed -eq 0) { "Green" } else { "Red" })
Write-Host ""

# Check if ports are listening
Write-Host "=== Port Status ===" -ForegroundColor Cyan
$ports = 4000..4012
foreach ($port in $ports) {
    $listener = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
    if ($listener) {
        Write-Host "Port $port : Listening" -ForegroundColor Green
    } else {
        Write-Host "Port $port : Not listening" -ForegroundColor Gray
    }
}

Write-Host ""
Write-Host "=== Quick Links ===" -ForegroundColor Cyan
Write-Host "API Gateway GraphQL: http://localhost:4000/graphql" -ForegroundColor Yellow
Write-Host "Documentation Hub: http://localhost:4012/docs" -ForegroundColor Yellow
Write-Host "RabbitMQ Management: http://localhost:15672" -ForegroundColor Yellow
