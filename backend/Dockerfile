FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "node", "index.js" ]



##You can then build the Docker image using the following command:

## -  docker build -t my-node-app .

#To run the image, use the following command:

## - docker build -t my-node-app
