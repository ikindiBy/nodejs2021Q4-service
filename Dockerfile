FROM node:16-alpine

ENV PORT $PORT

EXPOSE $PORT

WORKDIR /app

COPY package*.json .

RUN npm i

COPY . .

CMD ["npm", "run", "dev"]