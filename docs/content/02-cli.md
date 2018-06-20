# Docker CLI

- Revolves around three commands:
  1.  `docker build`
  1.  `docker run`
  1.  `docker exec`

+++

## `docker build`

- `docker build` is used to build an image from a `Dockerfile`
- Open a shell and build our first container image:
  ```
  $ docker build -t my-first-container .
  Sending build context to Docker daemon
  ...
  Successfully built $HASH
  ```
  - This creates a Docker image with the tag (`-t`) _my-first-container_ using the Dockerfile in the current directory (`.`)

Notes:

- Notice how Docker processes each instruction in our Dockerfile, downloading the required image(s), in our case Ubuntu 16.04, and caching each step
- Let's try building this image again
  - It will build almost instantly because, instead of downloading Ubuntu again, Docker will use the cached image
- Docker assigns a unique hash to each image it builds/runs
  - If we did not tag (`-t`) it, we would have to use the hash to reference the image

+++

## `docker run`

- Now that our image is built, we can run it in a container

  ```
  $ docker run -it my-first-container
  root@07b0a5c8a53b:/#
  ```

  - This allocates a pseudo-terminal (`-it`), and because we specified `CMD ["/bin/bash"]` in our `Dockerfile`, we are now in a terminal within our Ubuntu container

- When you're ready, you can exit the container:
  ```
  root@07b0a5c8a53b:/# exit
  $
  ```

Notes:

- We can try a few things to confirm that we are running Ubuntu:
  - `root@07b0a5c8a53b:/# cat /etc/lsb-release`
  - `root@07b0a5c8a53b:/# apt list --installed`
  - Why use Ubuntu?
    - documentation
    - debugging
    - Apt (Advanced Packaging Tool)
    - If you are more comfortable with another distro, use it

+++

### Running containers in the background

- We can also run our container in the background detached (`-d`) from our current shell with:

  ```
  $ docker run -it -d my-first-container
  fd4d2604ba9d...
  ```

- To view a list of running containers:

  ```
  $ docker ps
  CONTAINER ID        IMAGE                 COMMAND             CREATED             STATUS              PORTS               NAMES
  fd4d2604ba9d        our-first-container   "/bin/bash"         9 seconds ago       Up 7 seconds                            random_name
  ```

- How do we get back into our container?

Notes:

- Game: who has the funniest name?

+++

## `docker exec`

- With the container ID hash listed in `$ docker ps`, we access a container running in the background with
  ```
  $ docker exec -it fd4d2604ba9d bash
  root@fd4d2604ba9d:/#
  ```
- Finally, stop this container with:
  ```
  $ docker stop fd4d2604ba9d
  ```

Notes:

- In case you need to debug a running container, this is when a familiar container environment will be handy.

+++

## Docker CLI overview

- So far, we've learned about:

  - `docker build` to build an image from a `Dockerfile`
  - `docker run` to run an image in a container
  - `docker exec` to access a container running in the background

- <!-- .element: class="fragment" data-fragment-index="1" --> We also learned about:

  - <!-- .element: class="fragment" data-fragment-index="1" --> `docker ps` to see a list of running containers
  - <!-- .element: class="fragment" data-fragment-index="1" --> `docker stop` to stop a container that is running in the background

- <!-- .element: class="fragment" --> Now that we're familiar with the Docker CLI, we can create a suitable environment in which our application will run by adding additional instructions between the `FROM` and `CMD` instructions in our `Dockerfile`
