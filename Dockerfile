FROM node:0.10-onbuild

MAINTAINER Norman Xin, norman.xin@turn.com

#WORKDIR /home/data-geek-webapp

# Install prerequisites
RUN npm install -g nodemon
#RUN npm install

# currently only works for development
ENV NODE_ENV development

# Port 3000 for server
EXPOSE 3000
CMD nodemon app.js
