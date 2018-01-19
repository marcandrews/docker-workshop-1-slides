# Preparing our image for our application

- Our first step is to instruct Docker to update Ubuntu's source list and install any application dependencies
- We do this with a `RUN` instruction:
  ```
  FROM ubuntu:16.04

  # Update source list
  RUN apt-get update && apt-get install -y -qq --no-install-recommends \
    # Install dependencies
    software-properties-common \
    libssl-dev \
    build-essential \
    curl \
    wget \
    git \

    # Clean up
    && apt-get clean && rm -rf /var/lib/apt/lists/*

  CMD ["/bin/bash"]
  ```

Notes:
- If you have experience with bash, this will look familiar
- This is a good starting point, but your application may require additional dependencies - maybe Java (default-jre) or imagemagick (imagemagick)
  - This is another reason to use Ubuntu (and not Node) when starting with Docker
    - Installing non-NPM dependencies
    - Installing debugging tools
    - Installing production dependencies (i.e. nginx) 

+++

## Three important concepts about `RUN`

1. Each instruction runs "on-top" the previous instruction, akin to opening up a new shell
1. Each instruction is cached
1. Some things, like environment variables defined with export do not get passed from the previous instruction

+++

## Installing Node

- Next, we will use [n](https://github.com/tj/n) to install Node and any global dependencies we may need:
  ```
  FROM ubuntu:16.04

  # Update source list
  RUN apt-get update && apt-get install -y -qq --no-install-recommends \
    # Install dependencies
    software-properties-common \
    libssl-dev \
    build-essential \
    software-properties-common
    curl \
    wget \
    git \

    # Clean up
    && apt-get clean && rm -rf /var/lib/apt/lists/*

  # Install Node
  RUN dir=`mktemp -d` \
    && git clone https://github.com/tj/n.git $dir \
    && cd $dir \
    && make install \
    && n 6 \
    && npm i -g nodemon

  CMD ["/bin/bash"]
  ```

Notes:
- Note how we chain the Node installation process into a single `RUN` instruction
- If you separate the installation into multiple RUN instructions, you cannot guarantee that information, such as environment variables, set in a previous instruction, will be available in subsequent instructions
- For this reason, components should be installed via a single `RUN` instruction

+++

## Building/running our container

- Build this container:
  ```
  $ docker build -t my-first-container .
  Sending build context to Docker daemon
  ...
  Successfully built $HASH
  ```
- Run the container we just built and confirm that our dependencies are present:
  ```
  $ docker run -it my-first-container
  root@9d5a58262544:/# git --version
  git version 2.7.4
  root@9d5a58262544:/# n --version
  2.1.8
  root@9d5a58262544:/# node --version
  v6.11.1
  root@9d5a58262544:/# exit
  $
  ```

- <!-- .element: class="fragment" --> Now that we have suitable environment in which our application's services can run, we can use Docker Compose to orchestrate our application's services during development