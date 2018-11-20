# Next steps

+++

## Explore the Docker CLI

- Try running one of the sample application's services using `docker` instead of `docker-compose`
  - Tip: `docker run -it -v $(pwd)/api:/app -w /app --rm node npm start`

+++

## Explore the sample application

- Add PostgreSQL service
- Add MongoDB service
  - Tip: use a volume
- Instead of Ubuntu, try Node image
  - `FROM node:latest` in `Dockerfile`
  - `image: node` in `docker-compose.yml`

+++

## Explore application images for production

- Prepare an image our Node Backend API service for production deployments with this `Dockerfile`:

```
#
# Build frontend
#
FROM node:8.11

ENV NODE_ENV=production

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Install dependencies
COPY package.json /app
RUN npm install

# Build, if necessary
# RUN npm run build

# Bundle app source and build
COPY . /app
RUN npm start

EXPOSE 3000
```

+++

## Explore another application

- Try running your client/side project in a container

---

# Discussion
