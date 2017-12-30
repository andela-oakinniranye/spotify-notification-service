FROM node:8.6.0

# Update the base Ubuntu OS
RUN apt-get update && apt-get -y upgrade

# Install vim for easier usage in our base image
RUN apt-get -y install vim

# Run yarn update command
# TODO - Update this when Yarn fixes the `yarn self-update` command
RUN npm install yarn -g

# Create /var/app dir and set as working directory
RUN mkdir -p /var/app

COPY app /var/app

WORKDIR /var/app

CMD yarn start
