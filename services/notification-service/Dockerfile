FROM node:20-alpine
COPY shared ./shared
WORKDIR /app
COPY services/notification-service/package.json services/notification-service/package-lock.json* ./
RUN npm install --production=false
COPY services/notification-service/ ./
RUN npm run build
EXPOSE 4010
CMD ["npm", "start"]
