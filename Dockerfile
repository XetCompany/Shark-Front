FROM node:18-alpine

WORKDIR /app

COPY package.json ./

RUN npm install -g --force yarn

RUN yarn install

COPY . .

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
