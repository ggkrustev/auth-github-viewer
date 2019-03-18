FROM node:9.6.1

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./

# expose `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

RUN npm install
RUN npm install -g @angular/cli

# add app
COPY . /usr/src/app

# start app
CMD ng serve --host 0.0.0.0
