FROM node:20-alpine
COPY shared ./shared
WORKDIR /app
COPY services/inventory-service/package.json services/inventory-service/package-lock.json* ./
RUN npm install --production=false
COPY services/inventory-service/ ./
RUN npm run build
EXPOSE 4004
CMD ["npm", "start"]
