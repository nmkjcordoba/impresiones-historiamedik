FROM node:14-alpine as build

COPY ["package.json", "package-lock.json", "/home/node/app/"]
WORKDIR '/home/node/app'
RUN npm install --only=production
COPY ["." , "."]
RUN npm install --only=development
RUN npm install -g jest
#RUN npm run test

# production environment

FROM node:14-alpine


COPY ["package.json", "package-lock.json", "/home/node/app/"]
WORKDIR '/home/node/app'
RUN npm install --only=production

COPY --from=build "/home/node/app" '/home/node/app'

CMD ["npm", "run", "start"]