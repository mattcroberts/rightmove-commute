FROM node:10-alpine

WORKDIR /home/nodejs/app
RUN chown node:node .
USER node

COPY --chown=node:node packages/api .

RUN yarn

ENV NODE_ENV=production

EXPOSE 3000

CMD [ "yarn", "start" ]
