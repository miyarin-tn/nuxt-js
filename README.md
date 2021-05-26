# Nuxt JS

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Build by Docker

1. Prerequisites:

- [Install docker](https://docs.docker.com/engine/install)
- [Install docker-compose](https://docs.docker.com/compose/install/)

2. Build

> Only with Docker

```bash
# build images
$ docker build .

# run container
docker run -d -it -v .:<virtual_path> -p <real_port>:<container_expose_port> <image_name>
# Ex: docker run -d -it -v .:/usr/local/app/nuxt -p 3000:3000 nuxt_web
```

> Only with Docker Compose (Recommend)

```bash
$ docker-compose up

# rebuild
$ docker-compose up --build

# run with current user
$ CURRENT_UID=$(id -u):$(id -g) docker-compose up --build
```
