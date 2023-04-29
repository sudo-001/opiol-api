# THE BASE IMAGE
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

COPY package*.json tsconfig*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY src/ src/

# Creates a "dist" folder with the production build
RUN npm run build

# Remove the original src directory (our new compiled source is in the `dist` folder)
# RUN rm -r src

# Start the server using the production build
# CMD ["node", "dist/main.js"]

# Assign `npm run start:prod` as the default command to run when booting the container
# CMD ["npm", "run", "start:prod"]

# CMD ["npm", "run build"]

CMD ["npm", "-r src"]