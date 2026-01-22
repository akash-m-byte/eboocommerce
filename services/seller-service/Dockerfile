FROM node:20-alpine
COPY shared ./shared
WORKDIR /app
COPY services/seller-service/package.json services/seller-service/package-lock.json* ./
RUN npm install --production=false
COPY services/seller-service/ ./
RUN npm run build
EXPOSE 4008
CMD ["npm", "start"]
