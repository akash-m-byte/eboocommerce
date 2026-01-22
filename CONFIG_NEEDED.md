# Configuration Needed for Auth Features

## Required Environment Variables

Add these to `services/auth-service/.env`:

```env
# Email Configuration (Choose ONE option)

# Option 1: SMTP (Gmail, Outlook, etc.)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@yourdomain.com

# Option 2: SendGrid (Recommended for Production)
SENDGRID_API_KEY=SG.your-sendgrid-api-key-here
SENDGRID_FROM_EMAIL=noreply@yourdomain.com
SENDGRID_FROM_NAME=E-boo Platform
SENDGRID_REPLY_TO=support@yourdomain.com
SENDGRID_SANDBOX_MODE=false
# Note: Update SENDGRID_FROM_EMAIL with your verified sender email in SendGrid
# IMPORTANT: Authenticate your domain in SendGrid to prevent spam!

# Option 3: Mailgun
MAILGUN_API_KEY=your-mailgun-api-key
MAILGUN_DOMAIN=your-domain.com
MAILGUN_FROM_EMAIL=noreply@yourdomain.com

# Frontend URLs (for email links)
FRONTEND_URL=http://localhost:3000
RESET_PASSWORD_URL=${FRONTEND_URL}/reset-password
VERIFY_EMAIL_URL=${FRONTEND_URL}/verify-email

# Email Branding (for better deliverability)
COMPANY_NAME=E-boo Platform
SUPPORT_EMAIL=support@yourdomain.com

# Token Expiration (in hours)
PASSWORD_RESET_TOKEN_EXPIRY=24
EMAIL_VERIFICATION_TOKEN_EXPIRY=72

# Email Service Provider (smtp, sendgrid, mailgun, or notification-service)
EMAIL_PROVIDER=notification-service
```

## Quick Setup Options

### Option 1: Use Notification Service (Recommended for Development)
- Set `EMAIL_PROVIDER=notification-service`
- No additional email config needed
- Emails will be queued through notification-service

### Option 2: SMTP (Gmail Example)
```env
EMAIL_PROVIDER=smtp
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password  # Use App Password, not regular password
SMTP_FROM=noreply@yourdomain.com
```

### Option 3: SendGrid (Production Recommended)
```env
EMAIL_PROVIDER=sendgrid
SENDGRID_API_KEY=SG.xxxxx
SENDGRID_FROM_EMAIL=noreply@yourdomain.com
```

## Frontend URLs

Update these based on your frontend:
- `FRONTEND_URL`: Your frontend application URL
- `RESET_PASSWORD_URL`: Page where users reset password (receives `?token=xxx`)
- `VERIFY_EMAIL_URL`: Page where users verify email (receives `?token=xxx`)

## Default Values (if not set)
- Password reset token: 24 hours
- Email verification token: 72 hours
- Email provider: notification-service (uses RabbitMQ)
