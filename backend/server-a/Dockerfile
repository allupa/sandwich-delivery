# This is where you define the image for
# the server A, which implements the Swagger API.

# Start by copying the server stub to this directory.

# You should then use Noje 10 image from Docker Hub as the basis,
# and then follow the instructions linked to in assignment document.
# You should be able to produce a working installation by just
# following the instructions.

# First line is provided for your convenience.
# This line fetches the Node Docker image with tag "10"
# from Docker Hub.
FROM node:10

# App directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Expose port number to docker daemon
EXPOSE 8080

# Define command to run app
CMD [ "node", "index.js" ]