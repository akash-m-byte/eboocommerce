FROM node:20-alpine
COPY shared ./shared
WORKDIR /app
COPY services/cart-service/package.json services/cart-service/package-lock.json* ./
RUN npm install --production=false
COPY services/cart-service/ ./
RUN npm run build
EXPOSE 4005
CMD ["npm", "start"]
