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

## Explore another application

- Try running your client/side project in a container

---

# Discussion
