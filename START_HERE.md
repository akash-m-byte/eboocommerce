# 🚀 Quick Start Guide

## For Development (Recommended)

### Step 1: Start Infrastructure
```bash
docker-compose -f docker-compose.dev.yml up -d
```
This starts only databases (PostgreSQL, MongoDB, Redis, RabbitMQ).

### Step 2: Install Dependencies
```bash
npm install
npm run install:all
```

### Step 3: Run Services
```bash
npm run dev
```

That's it! All services will start with hot reload.

---

## For Production/Deployment

```bash
docker-compose -f docker-compose.prod.yml up --build
```

---

## Troubleshooting

### Services can't connect to databases?
- Make sure infrastructure is running: `docker-compose -f docker-compose.dev.yml ps`
- Check environment variables in each service's `.env` file
- Default database URLs:
  - PostgreSQL: `postgresql://eboo:eboo123@localhost:5432/eboocommerce`
  - MongoDB: `mongodb://eboo:eboo123@localhost:27017`
  - Redis: `redis://localhost:6379`
  - RabbitMQ: `amqp://eboo:eboo123@localhost:5672`

### Port already in use?
- Stop other services using those ports
- Or change PORT in service `.env` files

### Need to reset databases?
```bash
docker-compose -f docker-compose.dev.yml down -v
docker-compose -f docker-compose.dev.yml up -d
```

---

## Next Steps

- See [dev-setup.md](./dev-setup.md) for detailed development guide
- See [README.md](./README.md) for full documentation
- Visit http://localhost:4012/docs for API documentation
