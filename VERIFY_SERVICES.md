# How to Verify Services Are Running

## Quick Verification Script

Run the automated verification script:

```powershell
.\verify-services.ps1
```

This will:
- Check all service health endpoints
- Show which services are running
- Display port status
- Provide quick access links

## Manual Verification Methods

### 1. Check Health Endpoints

Each service exposes a health endpoint. Test them:

```powershell
# API Gateway
Invoke-WebRequest -Uri http://localhost:4000/health

# Auth Service
Invoke-WebRequest -Uri http://localhost:4001/api/health

# Product Service
Invoke-WebRequest -Uri http://localhost:4002/api/health

# Pricing Service
Invoke-WebRequest -Uri http://localhost:4003/api/health

# Inventory Service
Invoke-WebRequest -Uri http://localhost:4004/api/health

# Cart Service
Invoke-WebRequest -Uri http://localhost:4005/api/health

# Order Service
Invoke-WebRequest -Uri http://localhost:4006/api/health

# Payment Service
Invoke-WebRequest -Uri http://localhost:4007/api/health

# Seller Service
Invoke-WebRequest -Uri http://localhost:4008/api/health

# Shipping Service
Invoke-WebRequest -Uri http://localhost:4009/api/health

# Notification Service
Invoke-WebRequest -Uri http://localhost:4010/api/health

# Review Service
Invoke-WebRequest -Uri http://localhost:4011/api/health

# Docs Service
Invoke-WebRequest -Uri http://localhost:4012/api/health
```

### 2. Check Port Status

Verify which ports are listening:

```powershell
# Check all service ports
Get-NetTCPConnection -LocalPort 4000,4001,4002,4003,4004,4005,4006,4007,4008,4009,4010,4011,4012 -ErrorAction SilentlyContinue | 
    Select-Object LocalPort, State, OwningProcess

# Or check individually
netstat -an | findstr "4000 4001 4002 4003 4004 4005 4006 4007 4008 4009 4010 4011 4012"
```

### 3. Browser Checks

Open these URLs in your browser:

- **Documentation Hub**: http://localhost:4012/docs
  - Should show a list of all services
  - If it loads, Docs Service is running

- **API Gateway GraphQL**: http://localhost:4000/graphql
  - Should show GraphQL Playground/Explorer
  - If it loads, API Gateway is running

- **Service Swagger Docs**: 
  - http://localhost:4001/api/docs (Auth Service)
  - http://localhost:4002/api/docs (Product Service)
  - ... etc for each service

### 4. Check Process List

See all running Node.js processes:

```powershell
# Windows PowerShell
Get-Process node -ErrorAction SilentlyContinue | 
    Select-Object Id, ProcessName, StartTime, @{Name="Port";Expression={(Get-NetTCPConnection -OwningProcess $_.Id -ErrorAction SilentlyContinue | Select-Object -First 1).LocalPort}}

# Or simpler
Get-Process node -ErrorAction SilentlyContinue
```

### 5. Check Terminal Output

When you run `npm run dev`, you should see:
- Multiple service processes starting
- "Service listening on port XXXX" messages
- No error messages (or minimal warnings)

### 6. Test API Endpoints

Test actual functionality:

```powershell
# Test GraphQL endpoint
$query = @{
    query = "{ __typename }"
} | ConvertTo-Json

Invoke-WebRequest -Uri http://localhost:4000/graphql `
    -Method POST `
    -ContentType "application/json" `
    -Body $query

# Test REST endpoint (if available)
Invoke-WebRequest -Uri http://localhost:4002/api/products?limit=5
```

## Expected Service Ports

| Service | Port | Health Endpoint |
|---------|------|----------------|
| API Gateway | 4000 | /health |
| Auth Service | 4001 | /api/health |
| Product Service | 4002 | /api/health |
| Pricing Service | 4003 | /api/health |
| Inventory Service | 4004 | /api/health |
| Cart Service | 4005 | /api/health |
| Order Service | 4006 | /api/health |
| Payment Service | 4007 | /api/health |
| Seller Service | 4008 | /api/health |
| Shipping Service | 4009 | /api/health |
| Notification Service | 4010 | /api/health |
| Review Service | 4011 | /api/health |
| Docs Service | 4012 | /api/health |

## Troubleshooting

### Service Not Responding?

1. **Check if service is actually running**
   ```powershell
   Get-Process node | Where-Object { $_.Path -like "*eboocommerce*" }
   ```

2. **Check for errors in terminal**
   - Look for red error messages
   - Check for missing environment variables
   - Verify database connections

3. **Check if port is already in use**
   ```powershell
   Get-NetTCPConnection -LocalPort 4000 -ErrorAction SilentlyContinue
   ```

4. **Verify infrastructure is running**
   ```powershell
   docker-compose -f docker-compose.dev.yml ps
   ```

5. **Check service logs**
   - Each service outputs logs to the terminal
   - Look for startup messages and errors

### Common Issues

- **Port already in use**: Another process is using the port. Stop it or change the port in `.env`
- **Database connection failed**: Make sure infrastructure is running (`docker-compose -f docker-compose.dev.yml up -d`)
- **Missing Prisma client**: Run `.\setup-prisma.ps1` or `npm run generate:prisma`
- **Missing dependencies**: Run `npm run install:all`
