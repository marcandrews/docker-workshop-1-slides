# Our first container

- Docker builds containers by reading instructions from a `Dockerfile`
- In the root of our sample application, create a `Dockerfile` with the following contents:

  ```
  FROM ubuntu:16.04

  CMD ["/bin/bash"]
  ```

- <!-- .element: class="fragment" data-fragment-index="1" --> `FROM` instruction tells Docker to use the [Ubuntu image](https://hub.docker.com/_/ubuntu/) from [Docker Hub](https://hub.docker.com/)
- <!-- .element: class="fragment" data-fragment-index="1" --> `CMD` instruction provides defaults for an executing container
- <!-- .element: class="fragment" data-fragment-index="1" --> Between `FROM` and `CMD` we will extend this image to make a suitable environment for our application

- <!-- .element: class="fragment" --> We will use this `Dockerfile` to familiarize ourselves with the Docker CLI

Notes:

- `CMD`
  - Instructs Docker to run this when executing this container
  - This will be expanded upon later
- Hub
  - Like NPM, but for Docker images
  - Can sometimes be helpful to take a peek and the Dockerfiles used by images
- When would you not want to use Docker?

+++

## Why Ubuntu? Why not Node?

- <!-- .element: class="fragment" --> Ubuntu may provide a familiar environment
- <!-- .element: class="fragment" --> Emulating production environments

Notes:

- Ubuntu
  - Debug in a familiar, well-supported environment
  - Easy to install depenencies (imagemagick, etc.)
  - If you're more comfortable with, or using another Linux distro in production, use that instead
  - Emulate a production environment (Alpine, CoreOS, etc.)
  - Although the goal of this workshop is to familarize ourselves with Docker and ease development concerns, the ultimate goal of using Docker is to use it for deployment (i.e. deploy containers to production).
  - Until our application is completely _Dockerized_ (i.e. no weird dependencies), stick to Ubuntu/Debian rather than Node

+++

## Security

- Backdoored images
  - [_Cryptojacking invades cloud. How modern containerization trend is exploited by attackers_](https://kromtech.com/blog/security-center/cryptojacking-invades-cloud-how-modern-containerization-trend-is-exploited-by-attackers) ~ Kromtech
  - [_Backdoored images downloaded 5 million times finally removed from Docker Hub_](https://arstechnica.com/information-technology/2018/06/backdoored-images-downloaded-5-million-times-finally-removed-from-docker-hub/) ~ Ars Technica
  - malware that mined over $90,000 worth of digital coin

+++

### Recommendation

- create a user with a known uid in the Dockerfile and run the application process as that user

  ```
  RUN groupadd -g 999 appuser && useradd -r -u 999 -g appuser appuser
  USER appuser
  ```

- Read more about it here in
  [_Processes In Containers Should Not Run As Root_](https://medium.com/@mccode/processes-in-containers-should-not-run-as-root-2feae3f0df3b) by Marc Campbell ~ Medium.com
