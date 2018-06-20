# Orchestration

- We will use Docker Compose to orchestrate our services by defining each service in a `docker-compose.yml`
- Let's start by defining our Node backend API

+++

## Defining our Backend service

- In the root of our sample application, create a `docker-compose.yml` with the following contents:

  ```
  version: "3"

  services:

    # backend API on port 3000
    api:
      build: .
      ports:
        - "3000:3000"
      volumes:
        - ./api:/app
      working_dir: /app
      command: npm start
  ```

- <!-- .element: class="fragment" data-fragment-index="1" --> This instructs Compose to:
  - <!-- .element: class="fragment" data-fragment-index="1" --> Create a service called api (`api:`) using the Dockerfile in the current directory (`build: .`)
  - <!-- .element: class="fragment" data-fragment-index="1" --> Map the container's internal port `3000` to the host's port `3000`
  - <!-- .element: class="fragment" data-fragment-index="1" --> Mount `/api` in the container at `/app`
  - <!-- .element: class="fragment" data-fragment-index="1" --> Upon execution, run `npm start` in the container and start our service

+++

## Building our Backend service

- Similar to working with a single Dockerfile; however, instead of `docker`, we use `docker-compose`
- First we build our image:
  ```
  $ docker-compose build
  Building api
  ...
  Successfully built $HASH
  ```
- Then, we install npm dependencies
  ```
  $ docker-compose run api npm install
  ...
  ```

Notes:

- Since the environment within our container is most likely different than that of our host machine's, and the installation procedure for certain dependencies may vary under different operating systems, we will need to install dependencies from within the container
- This runs the api service defined in our docker-compose.yml and executes npm install within the container, ensuring that the dependencies are installed against Ubuntu (and not our host's operating system)

+++

## Starting our Backend service

- Let's start our application with `docker-compose up`:
  ```
  $ docker-compose up
  Creating network ...
  Creating docker_api_1
  Attaching to docker_api_1
  ...
  api_1  | Example API listening on port 3000
  ```
  - <!-- .element: class="fragment" --> Log output streaming to our shell
  - <!-- .element: class="fragment" --> Changes will be detected by nodemon, automatically restarting our Node server
  - <!-- .element: class="fragment" --> Bring down our application by pressing `Ctrl+C`

+++

## Frontend service

- Edit our `docker-compose.yml`:

  ```
  version: "3"

  services:

    # backend API on port 3000
    api:
      build: .
      ports:
        - "3000:3000"
      volumes:
        - ./api:/app
      working_dir: /app
      command: npm start

    # frontend on port 8080
    frontend:
      build: .
      environment:
        API_URL: http://api:3000
      ports:
        - "8080:8080"
      volumes:
        - ./frontend:/app
      working_dir: /app
      links:
        - api
      command: npm start
  ```

  - <!-- .element: class="fragment" --> Compose exposes each service's network on a hostname defined by the service name
  - <!-- .element: class="fragment" --> Provide an environment variable that our service can access to determine the proxy destination
  - <!-- .element: class="fragment" --> Instruct Compose to start our `api` service whenever our `frontend` service is started

+++

## Starting our distributed application

- We are now ready to:
  - Build our application
  - Install the dependencies against the container's Ubuntu environment and,
  - Bring up our application, now composed of both the backend API and frontend services:
  ```
  $ docker-compose build
  Building api
  ...
  Successfully built $HASH
  Building frontend
  ...
  Successfully built $HASH
  $ docker-compose run frontend npm install
  ...
  $ docker-compose up
  Starting docker_api_1
  Creating docker_frontend_1
  Attaching to docker_api_1, docker_frontend_1
  ...
  api_1       | Example API listening on port 3000
  ...
  frontend_1  | webpack: Compiled successfully.
  ```
- Navigate to http://localhost:8080 to see our distributed application running

Notes:

- webpack-dev-server renders our frontend React application and, through `http://api:3000`, requests the list of colors from our backend API service that are then displayed in our React application
- Because we have mounted `/frontend` within our container, any changes to our frontend code will trigger a webpack rebuild automatically, just like with our backend service

+++

## `docker-compose` is just like `docker`

- `docker-compose up -d` to run our application detached from our current shell
- `docker-compose exec api bash` or `docker-compose exec frontend bash` to bash into a running container
- Stream logs from our running services to our shell with `docker-compose logs -f`

+++

## Additional services

- Define them in our `docker-compose.yml`
- For example, to add PostgreSQL and Redis to our distributed application:

  ```
  version: "3"

  services:

    # PostgreSQL
    postgres:
      image: postgres
      environment:
        POSTGRES_USER: "admin"
        POSTGRES_PASSWORD: "password"
        POSTGRES_DB: "db"
      ports:
        - "5432:5432"

    # Redis
    redis:
      image: redis
      ports:
        - "6379:6379"

    # backend API on port 3000
    api:
      build: .
      environment:
        POSTGRES_URI: postgres://admin:password@postgres:5432/db
        REDIS_URI: redis://redis:6379
      links:
        - postgres
        - redis
  ...
  ```

  - <!-- .element: class="fragment" --> `image: postgres` and `image: redis` instructs Compose to use the latest images in the Docker repository for [PostgreSQL](https://hub.docker.com/_/postgres/) and [Redis](https://hub.docker.com/_/redis/)
  - <!-- .element: class="fragment" --> Via the `environment:` instruction, pass in any connection information to services that need it
  - <!-- .element: class="fragment" --> Use the `links:` instruction to ensure that dependent services start in unison

Notes:

- Like the `FROM` instruction in a `Dockerfile`, the `image: postgres` and `image: redis` instructs Compose to use the latest images in the Docker repository for [PostgreSQL](https://hub.docker.com/_/postgres/) and [Redis](https://hub.docker.com/_/redis/), respectively
- When consuming images with Compose, be sure to check the repository's information on [Docker Hub](https://hub.docker.com/) for additional configuration instructions
- For example, you can set username, password and database name via the `environment:` instruction for [PostgreSQL images](https://hub.docker.com/_/postgres/).
- Also via the `environment:` instruction, pass in any connection information to services that need it
- Our backend API service does not connect to PostgreSQL or Redis now, but when we need to, we can simply use `process.env.POSTGRES_URI` and `process.env.REDIS_URI` to connect to those services, respectively
- Finally, use the `links:` instruction to ensure that when our backend API services starts, our PostgreSQL and Redis services start as well.
