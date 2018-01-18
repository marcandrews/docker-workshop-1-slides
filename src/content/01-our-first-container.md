# Let's create our first container

- Docker builds containers by reading instructions from a `Dockerfile`
- In the root of our sample application, create a `Dockerfile` with the following contents:
  ```
  FROM ubuntu:16.04

  CMD ["/bin/bash"]
  ```

- <!-- .element: class="fragment" data-fragment-index="1" --> `FROM` instruction tells Docker to use the [Ubuntu image](https://hub.docker.com/_/ubuntu/) from [Docker Hub](https://hub.docker.com/)
  - <!-- .element: class="fragment" data-fragment-index="1" --> Specify different versions of Ubuntu, or even `latest`
- <!-- .element: class="fragment" data-fragment-index="1" --> `CMD` instruction provides defaults for an executing container
- <!-- .element: class="fragment" data-fragment-index="1" --> Between `FROM` and `CMD` we will extend this image to make a suitable environment for our application
- <!-- .element: class="fragment" data-fragment-index="2" --> Why Ubuntu? Why not Node?
  - <!-- .element: class="fragment" --> Ubuntu may provide a familiar environment
  - <!-- .element: class="fragment" --> Emulating production environments

- <!-- .element: class="fragment" --> We will use this `Dockerfile` to familiarize ourselves with the Docker CLI

Notes:
- `CMD`
  - Instructs Docker to run this when executing this container
  - This will be expanded upon later
- Hub
  - Like NPM, but for Docker images
  - Can sometimes be helpful to take a peek and the Dockerfiles used by images.
- Ubuntu
  - Debug in a familiar, well-supported environment
  - Easy to install depenencies (imagemagick, etc.)
  - If you're more comfortable with, or using another Linux distro in production, use that instead
  - Emulate a production environment (Alpine, CoreOS, etc.)
  - Although the goal of this workshop is to familarize ourselves with Docker and ease development concerns, the ultimate goal of using Docker is to use it for deployment (i.e. deploy containers to production).
  - Until our application is completely _Dockerized_ (i.e. no weird dependencies), stick to Ubuntu/Debian rather than Node