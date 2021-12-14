FROM node:14-alpine


COPY ["package.json", "package-lock.json", "/home/node/app/"]

WORKDIR '/home/node/app'

RUN npm install 

COPY ["." , "."]

#RUN npm install -g jest
#RUN npm run docs

CMD ["npm", "run", "start:dev"]