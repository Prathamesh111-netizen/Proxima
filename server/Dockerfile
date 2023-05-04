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

<<<<<<< HEAD
CMD [ "npx", "nodemon" ]
=======
CMD [ "npm", "run", "dev" ]
>>>>>>> 92bfda718d590041a04c9d39d605c8344d268ee5
