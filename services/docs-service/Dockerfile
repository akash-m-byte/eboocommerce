FROM node:20-alpine
WORKDIR /app
COPY services/docs-service/package.json services/docs-service/package-lock.json* ./
RUN npm install --production=false
COPY shared ./shared
COPY services/docs-service/ ./
RUN ls -la shared/controllers/ || echo "Shared controllers not found"
RUN npm run build
EXPOSE 4012
CMD ["npm", "start"]
