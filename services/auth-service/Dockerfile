FROM node:20-alpine
WORKDIR /app
COPY services/auth-service/package.json services/auth-service/package-lock.json* ./
RUN npm install --production=false
COPY services/auth-service/ ./
COPY shared ./shared
RUN npm run build
EXPOSE 4001
CMD ["npm", "start"]
