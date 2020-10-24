
# Use the official lightweight Node.js 10 image.
# https://hub.docker.com/_/node
FROM node:12-slim


# Create and change to the app directory.
WORKDIR /usr/src/app
RUN chown -R node:node /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
COPY front/package*.json ./front/
COPY back/package*.json ./back/

# Install production dependencies.
# If you add a package-lock.json, speed your build by switching to 'npm ci'.
# RUN npm ci --only=production
RUN cd front && npm install
RUN cd back && npm install

# Copy local code to the container image.
COPY . ./

RUN cd front && npm run build

EXPOSE 80

# Create and change to the app directory.
WORKDIR /usr/src/app/back

# Run the web service on container startup.
 CMD [ "npm", "start" ]