FROM node:20-alpine
COPY shared ./shared
WORKDIR /app
COPY services/payment-service/package.json services/payment-service/package-lock.json* ./
RUN npm install --production=false
COPY services/payment-service/ ./
RUN npm run build
EXPOSE 4007
CMD ["npm", "start"]
