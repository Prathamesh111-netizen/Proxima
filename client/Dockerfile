# Dockerfile for React client

# Build react client
FROM node:16.14.0

# Working directory be app
WORKDIR /usr/src/app

COPY package*.json ./

###  Installing dependencies

RUN npm install --silent

# copy local files to app folder
COPY . .

EXPOSE 5173

CMD ["npm","run", "dev"]