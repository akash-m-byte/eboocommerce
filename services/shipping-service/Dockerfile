FROM node:20-alpine
COPY shared ./shared
WORKDIR /app
COPY services/shipping-service/package.json services/shipping-service/package-lock.json* ./
RUN npm install --production=false
COPY services/shipping-service/ ./
RUN npm run build
EXPOSE 4009
CMD ["npm", "start"]
