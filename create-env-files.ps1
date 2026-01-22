# Create .env files for all services
Write-Host "Creating .env files for all services..." -ForegroundColor Green

# Auth Service
@"
PORT=4001
SERVICE_NAME=auth-service
LOG_LEVEL=info
DATABASE_URL=postgresql://eboo:eboo123@localhost:5432/eboocommerce
REDIS_URL=redis://localhost:6379
JWT_SECRET=dev-jwt-secret-key-change-in-production
JWT_REFRESH_SECRET=dev-refresh-secret-key-change-in-production
RABBITMQ_URL=amqp://eboo:eboo123@localhost:5672
"@ | Out-File -FilePath "services\auth-service\.env" -Encoding utf8

# Product Service (MongoDB)
@"
PORT=4002
SERVICE_NAME=product-service
LOG_LEVEL=info
MONGO_URI=mongodb://eboo:eboo123@localhost:27017/eboocommerce?authSource=admin
REDIS_URL=redis://localhost:6379
RABBITMQ_URL=amqp://eboo:eboo123@localhost:5672
"@ | Out-File -FilePath "services\product-service\.env" -Encoding utf8

# Pricing Service (PostgreSQL)
@"
PORT=4003
SERVICE_NAME=pricing-service
LOG_LEVEL=info
DATABASE_URL=postgresql://eboo:eboo123@localhost:5432/eboocommerce
REDIS_URL=redis://localhost:6379
RABBITMQ_URL=amqp://eboo:eboo123@localhost:5672
"@ | Out-File -FilePath "services\pricing-service\.env" -Encoding utf8

# Inventory Service (PostgreSQL)
@"
PORT=4004
SERVICE_NAME=inventory-service
LOG_LEVEL=info
DATABASE_URL=postgresql://eboo:eboo123@localhost:5432/eboocommerce
REDIS_URL=redis://localhost:6379
RABBITMQ_URL=amqp://eboo:eboo123@localhost:5672
"@ | Out-File -FilePath "services\inventory-service\.env" -Encoding utf8

# Cart Service (PostgreSQL)
@"
PORT=4005
SERVICE_NAME=cart-service
LOG_LEVEL=info
DATABASE_URL=postgresql://eboo:eboo123@localhost:5432/eboocommerce
REDIS_URL=redis://localhost:6379
RABBITMQ_URL=amqp://eboo:eboo123@localhost:5672
"@ | Out-File -FilePath "services\cart-service\.env" -Encoding utf8

# Order Service (PostgreSQL)
@"
PORT=4006
SERVICE_NAME=order-service
LOG_LEVEL=info
DATABASE_URL=postgresql://eboo:eboo123@localhost:5432/eboocommerce
REDIS_URL=redis://localhost:6379
RABBITMQ_URL=amqp://eboo:eboo123@localhost:5672
"@ | Out-File -FilePath "services\order-service\.env" -Encoding utf8

# Payment Service (PostgreSQL)
@"
PORT=4007
SERVICE_NAME=payment-service
LOG_LEVEL=info
DATABASE_URL=postgresql://eboo:eboo123@localhost:5432/eboocommerce
REDIS_URL=redis://localhost:6379
RABBITMQ_URL=amqp://eboo:eboo123@localhost:5672
"@ | Out-File -FilePath "services\payment-service\.env" -Encoding utf8

# Seller Service (PostgreSQL)
@"
PORT=4008
SERVICE_NAME=seller-service
LOG_LEVEL=info
DATABASE_URL=postgresql://eboo:eboo123@localhost:5432/eboocommerce
REDIS_URL=redis://localhost:6379
RABBITMQ_URL=amqp://eboo:eboo123@localhost:5672
"@ | Out-File -FilePath "services\seller-service\.env" -Encoding utf8

# Shipping Service (PostgreSQL)
@"
PORT=4009
SERVICE_NAME=shipping-service
LOG_LEVEL=info
DATABASE_URL=postgresql://eboo:eboo123@localhost:5432/eboocommerce
REDIS_URL=redis://localhost:6379
RABBITMQ_URL=amqp://eboo:eboo123@localhost:5672
"@ | Out-File -FilePath "services\shipping-service\.env" -Encoding utf8

# Notification Service (PostgreSQL)
@"
PORT=4010
SERVICE_NAME=notification-service
LOG_LEVEL=info
DATABASE_URL=postgresql://eboo:eboo123@localhost:5432/eboocommerce
REDIS_URL=redis://localhost:6379
RABBITMQ_URL=amqp://eboo:eboo123@localhost:5672
"@ | Out-File -FilePath "services\notification-service\.env" -Encoding utf8

# Review Service (MongoDB)
@"
PORT=4011
SERVICE_NAME=review-service
LOG_LEVEL=info
MONGO_URI=mongodb://eboo:eboo123@localhost:27017/eboocommerce?authSource=admin
REDIS_URL=redis://localhost:6379
RABBITMQ_URL=amqp://eboo:eboo123@localhost:5672
"@ | Out-File -FilePath "services\review-service\.env" -Encoding utf8

# Docs Service
@"
PORT=4012
SERVICE_NAME=docs-service
LOG_LEVEL=info
AUTH_SERVICE_URL=http://localhost:4001
PRODUCT_SERVICE_URL=http://localhost:4002
PRICING_SERVICE_URL=http://localhost:4003
INVENTORY_SERVICE_URL=http://localhost:4004
CART_SERVICE_URL=http://localhost:4005
ORDER_SERVICE_URL=http://localhost:4006
PAYMENT_SERVICE_URL=http://localhost:4007
SELLER_SERVICE_URL=http://localhost:4008
SHIPPING_SERVICE_URL=http://localhost:4009
NOTIFICATION_SERVICE_URL=http://localhost:4010
REVIEW_SERVICE_URL=http://localhost:4011
"@ | Out-File -FilePath "services\docs-service\.env" -Encoding utf8

# API Gateway
@"
PORT=4000
JWT_SECRET=dev-jwt-secret-key-change-in-production
REDIS_URL=redis://localhost:6379
AUTH_SERVICE_URL=http://localhost:4001
PRODUCT_SERVICE_URL=http://localhost:4002
PRICING_SERVICE_URL=http://localhost:4003
INVENTORY_SERVICE_URL=http://localhost:4004
CART_SERVICE_URL=http://localhost:4005
ORDER_SERVICE_URL=http://localhost:4006
PAYMENT_SERVICE_URL=http://localhost:4007
SELLER_SERVICE_URL=http://localhost:4008
SHIPPING_SERVICE_URL=http://localhost:4009
NOTIFICATION_SERVICE_URL=http://localhost:4010
REVIEW_SERVICE_URL=http://localhost:4011
"@ | Out-File -FilePath "api-gateway\.env" -Encoding utf8

Write-Host ""
Write-Host "Created .env files for all services" -ForegroundColor Green
Write-Host ""
Write-Host "Make sure infrastructure is running:" -ForegroundColor Yellow
Write-Host "  docker-compose -f docker-compose.dev.yml up -d" -ForegroundColor Cyan
Write-Host ""
