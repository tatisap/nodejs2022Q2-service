FROM node:lts-alpine
WORKDIR /usr/app
RUN npm prune
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "start:dev"]
