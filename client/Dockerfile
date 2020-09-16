#specify the base image
FROM node:alpine

ENV CI=true

#Set the working directory in the container
#All the following commands will be issued relative to this dir 
WORKDIR /app

#copy over only the package.json file
COPY package.json ./

#Install all dependencies
RUN npm install

#Copy over all of our remaining source code
COPY ./ ./

#set the command to run when conatiner starts up
CMD ["npm", "start"]