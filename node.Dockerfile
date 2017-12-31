FROM node:latest

RUN mkdir -p /opt/app

WORKDIR /opt/app

#ADD ./package.json /opt/app

#RUN npm install

EXPOSE 2000 3000

CMD ["node", "index.js"]