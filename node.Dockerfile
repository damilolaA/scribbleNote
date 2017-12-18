FROM node:latest

RUN mkdir -p /opt/app

WORKDIR /opt/app

EXPOSE 2000 3000

CMD ["node", "index.js"]