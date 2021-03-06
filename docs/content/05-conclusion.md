# Conclusion

- Learned about what Docker is, how it is different from virtual machines
- Created a `Dockerfile` and learned how to work with it using `docker build`, `run` and `exec`
- Extended our `Dockerfile`, creating a suitable environment in which our application's services
- Used Docker Compose, and `docker-compose build` and `docker-compose up`, to orchestrate our application's services for development

- Onboarding our developers is accomplished by:

  ```shell
  $ git clone ...
  $ docker-compose build
  $ docker-compose run api npm install
  $ docker-compose run frontend npm install
  $ docker-compose up
  ```

- <!-- .element: class="fragment" --> Does Docker address some concerns with working with distributed applications?

+++

## Concerns with distributed services

- Developer's machine environment
- Dependencies
- Orchestrating
- Onboarding
- Testing
- Upgrading/migrating
- Deploying

Notes:

- Opens up many possibilities
  - Using images for testing
  - Using images for CircleCI
  - Using images in production
  - Kubernetes
- Containers are immutable
  - Kagen Air once took 3 days to onboard; with Docker: 30 minutes
  - Build order: SASS was being compiled after the application was built; so every time a developer was on-boarded, they encountered this error, but subsequent builds worked
- Under what conditions would we not want to use Docker?
