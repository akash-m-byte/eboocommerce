FROM node:20-alpine
COPY shared ./shared
WORKDIR /app
COPY services/pricing-service/package.json services/pricing-service/package-lock.json* ./
RUN npm install --production=false
COPY services/pricing-service/ ./
RUN npm run build
EXPOSE 4003
CMD ["npm", "start"]
