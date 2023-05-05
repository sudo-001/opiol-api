###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18-alpine AS development

WORKDIR /usr/src/app

COPY --chown=node:node package*.json tsconfig*.json OpiolDatabase* ./

RUN npm ci

COPY --chown=node:node . .

USER node


###################
# BUILD FOR PRODUCTION
###################

FROM node:18-alpine AS build

WORKDIR /usr/src/app

COPY --chown=node:node package*.json tsconfig*.json OpiolDatabase* ./

COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

RUN npm run build

ENV NODE_ENV production

RUN npm ci --only=production && npm cache clean --force

USER node


###################
# PRODUCTION
###################

FROM node:18-alpine AS production

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
COPY OpiolDatabase* ./

CMD ["node", "dist/main.js"]



# # THE BASE IMAGE
# FROM node:18-alpine

# # Create app directory
# WORKDIR /usr/src/app

# COPY package*.json tsconfig*.json ./

# # Install app dependencies
# RUN npm install

# # Bundle app source
# COPY src/ src/

# # Creates a "dist" folder with the production build
# RUN npm run build

# # Remove the original src directory (our new compiled source is in the `dist` folder)
# RUN rm -r src

# # Start the server using the production build
# CMD ["node", "dist/main.js"]

# # Assign `npm run start:prod` as the default command to run when booting the container
# # CMD ["npm", "run", "start:prod"]

# # CMD ["npm", "run build"]

# # CMD ["rm", "-r src"]