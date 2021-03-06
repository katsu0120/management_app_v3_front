FROM node:14.18.0-alpine

ARG WORKDIR
ARG API_URL

ENV HOME=/${WORKDIR} \
    LANG=C.UTF-8 \
    TZ=Asia/Tokyo \
    HOST=0.0.0.0 \
    API_URL=${API_URL}


WORKDIR ${HOME}

# EXPOSE ${CONTAINER_PORT}

COPY package*.json ./
RUN yarn install

COPY . ./

RUN yarn run build