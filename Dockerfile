# base image
FROM node:18

# create app directory
WORKDIR /urs/src/app

# copy and install dependencies
COPY package*.json ./
RUN npm install

# copy app 
COPY . .

# expose port
EXPOSE 3000

# run application
CMD ["npm", "start"]