FROM node:17-alpine as server

# Create app directory
RUN mkdir -p /server
WORKDIR /server

# Install app dependencies
COPY package*.json /server
RUN npm install

# Bundle app source
COPY . /server/

EXPOSE 3000-3001

CMD [ "npm", "start" ]
