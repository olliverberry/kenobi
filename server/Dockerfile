# taken largely from nestjs's official example for docker deployments: 
# https://docs.nestjs.com/deployment#dockerizing-your-application

FROM node:22

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

ENV NODE_ENV=production
ENV PORT=3000

CMD ["node", "dist/main"]