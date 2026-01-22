FROM node:20-alpine
COPY shared ./shared
WORKDIR /app
COPY services/order-service/package.json services/order-service/package-lock.json* ./
RUN npm install --production=false
COPY services/order-service/ ./
RUN npm run build
EXPOSE 4006
CMD ["npm", "start"]
