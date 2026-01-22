# Update auth-service .env with SendGrid configuration
# NOTE: This script does NOT include API keys for security reasons.
# You must add your SendGrid API key manually to the .env file.
# Get your API key from: https://app.sendgrid.com/settings/api_keys

$envFile = "services\auth-service\.env"

if (Test-Path $envFile) {
    $content = Get-Content $envFile -Raw
    
    # Add or update SendGrid configuration
    if ($content -match "EMAIL_PROVIDER=") {
        $content = $content -replace "EMAIL_PROVIDER=.*", "EMAIL_PROVIDER=sendgrid"
    } else {
        $content += "`nEMAIL_PROVIDER=sendgrid"
    }
    
    if ($content -match "SENDGRID_API_KEY=") {
        Write-Host "SENDGRID_API_KEY already exists. Please update it manually with your API key." -ForegroundColor Yellow
    } else {
        Write-Host "Please add SENDGRID_API_KEY manually to your .env file" -ForegroundColor Yellow
        Write-Host "Get your API key from: https://app.sendgrid.com/settings/api_keys" -ForegroundColor Cyan
    }
    
    if ($content -notmatch "SENDGRID_FROM_EMAIL=") {
        $content += "`nSENDGRID_FROM_EMAIL=noreply@yourdomain.com"
        Write-Host "IMPORTANT: Update SENDGRID_FROM_EMAIL with your verified sender email in SendGrid" -ForegroundColor Yellow
    }
    
    Set-Content $envFile $content
    Write-Host "Updated $envFile with SendGrid configuration" -ForegroundColor Green
} else {
    Write-Host "Creating $envFile with SendGrid configuration..." -ForegroundColor Yellow
    $content = @"
PORT=4001
SERVICE_NAME=auth-service
LOG_LEVEL=info
DATABASE_URL=postgresql://eboo:eboo123@localhost:5432/eboocommerce
REDIS_URL=redis://localhost:6379
JWT_SECRET=dev-jwt-secret-key-change-in-production
JWT_REFRESH_SECRET=dev-refresh-secret-key-change-in-production
RABBITMQ_URL=amqp://eboo:eboo123@localhost:5672
EMAIL_PROVIDER=sendgrid
SENDGRID_API_KEY=your-sendgrid-api-key-here
SENDGRID_FROM_EMAIL=noreply@yourdomain.com
FRONTEND_URL=http://localhost:3000
RESET_PASSWORD_URL=http://localhost:3000/reset-password
VERIFY_EMAIL_URL=http://localhost:3000/verify-email
PASSWORD_RESET_TOKEN_EXPIRY=24
EMAIL_VERIFICATION_TOKEN_EXPIRY=72
"@
    Set-Content $envFile $content
    Write-Host "Created $envFile" -ForegroundColor Green
    Write-Host "IMPORTANT: Update SENDGRID_FROM_EMAIL with your verified sender email in SendGrid" -ForegroundColor Yellow
}
