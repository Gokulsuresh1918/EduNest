FROM node:20-alpine3.18 

WORKDIR /app
COPY package*.json ./
RUN npm  install --production
COPY . .
EXPOSE 3000
RUN npm run build   
CMD [ "npm","run","start" ]