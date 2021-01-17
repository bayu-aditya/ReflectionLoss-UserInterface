  
FROM node:12.14.1-alpine3.10

ENV PORT 80

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copying source files
COPY ./ /usr/src/app
RUN npm install

# Building app
RUN npm run build
EXPOSE 80

# Running the app
CMD "npm" "run" "start"