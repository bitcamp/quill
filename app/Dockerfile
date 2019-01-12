FROM node:8.15.0
RUN apt-get update -qq && apt-get install -y build-essential

ENV APP_HOME /quill/
RUN mkdir $APP_HOME
WORKDIR $APP_HOME
ENV NODE_PATH /quill/node_modules/

ADD . .

RUN rm -rf NODE_PATH
RUN npm install