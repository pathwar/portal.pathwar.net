FROM node:0.10-onbuild
RUN npm run prestart
EXPOSE 8090 35729
