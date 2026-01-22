FROM node:20-alpine
WORKDIR /app
COPY api-gateway/package.json api-gateway/package-lock.json* ./
RUN npm install --production=false
COPY shared ./shared
COPY api-gateway/ ./
RUN npm run build
EXPOSE 4000
CMD ["npm", "start"]
