# Check if tables exist in the database
$env:DATABASE_URL = "postgresql://eboo:eboo123@localhost:5432/eboocommerce"

Write-Host "Checking database tables..." -ForegroundColor Green

Push-Location services\auth-service

# Use Prisma to verify connection and list tables
npx prisma db pull --print

Pop-Location

Write-Host ""
Write-Host "If tables don't exist, run: npm run migrate:prisma" -ForegroundColor Yellow
