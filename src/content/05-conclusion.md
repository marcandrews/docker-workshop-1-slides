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

Notes:
- Under what conditions would we not want to use Docker?

+++

## Concerns when developing distributed services

- Developer's machine environment
- Dependencies
- Orchestrating
- Onboarding
- Testing
- Upgrading/migrating
- Deploying
