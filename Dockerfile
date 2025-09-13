FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3003
# CMD ["npm", "start"]
CMD ["node", "dist/server.js"]
