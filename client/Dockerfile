# Dockerfile for React client

# Build react client
FROM node:17-alpine as build

# Working directory be app
WORKDIR /client

COPY package*.json .

###  Installing dependencies
RUN npm install

# copy local files to app folder
COPY . /client/

# Build react app
RUN npm run build

# Install serve to run the application
RUN npm install -g serve

EXPOSE 5173

# start app
CMD ["serve", "-s", "dist", "-l", "5173"]