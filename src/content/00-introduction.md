## Workshop
# Getting Started with Docker

Marc Andrews

Jan 19, 2017

---

# Prerequisites

1. Install [Docker](https://docs.docker.com/engine/installation/)
1. Familiarity with:
  - running commands in a terminal and bash
  - `git`
  - creating and editing `YML` configuration files
1. Run the slides [locally](http://localhost:8081/):
  ```
  $ git clone https://github.com/marcandrews/docker-workshop-1-slides.git
  $ npm install
  $ npm start
  ```
1. Clone the [associated repository](https://github.com/marcandrews/blogs-onboard-your-devs-with-docker) containing the sample application:
  ```shell
  $ git clone https://github.com/marcandrews/blogs-onboard-your-devs-with-docker.git
  ```
1. Join **#docker** on Slack

---

# Let's build an app

Notes:
- Q: What are the different components/services of a typical application?
- A: An application may consist of:
  - Node backend API
  - React frontend served with Node/Nginx
  - Database for long-term data storage with PostgreSQL/MongoDB
  - Database for short-term data storage with Redis
  - Websockets API
  - Reports engine (C/Python)
  - Legacy components in transition

- Q: What are the advantages of a distributed application?
- A: The advantages are:
  - modularization
    - separation of concerns, development, regressions
  - scaling
    - ultimate evolution is micro services AWS Lamda/Google Cloud Functions


+++

## Concerns when developing distributed services

- Developer's machine environment
- Dependencies
- Orchestrating
- Onboarding
- Testing
- Upgrading/migrating
- Deploying

---

# Enter Docker

+++

## What is Docker

- Container platform
- Bundle only libraries and settings required by your application
- Efficient, lightweight, self-contained
- Different from virtual machines

+++

## Virtual machines vs containers

| VM | Container |
|:-:|:-:|
| ![VM](content/images/vm@2x.png) | ![Container](content/images/container@2x.png) |

Source https://docs.docker.com/get-started/

Notes:
- Virtual machines:
  - run guest OSs
  - resource intensive
  - entanglement of OS settings, dependencies, patches and our application
- Containers:
  - share the host OS kernal (few caveats which will be expanded upon later)
  - only what our application needs is bundled on top
  - light
  - fast (startup)
  - portable

+++

## Docker core concepts

- Docker bundles your application into an **image**
- Docker executes images _inside_ a **container**
- Concepts of image and container usually overlap
- Environment inside the container is isolated from that of the **host**

---

# Let's get started with Docker

- Use Docker to build a container with a suitable environment in which our [sample application](https://github.com/marcandrews/blogs-onboard-your-devs-with-docker) can run
- Use Docker Compose to orchestrate each service in our sample application during development
- Address the concerns when developing distributed applications

+++

## Our sample application

- Node/Express backend API
  - `nodemon` exposed on port 3000
  - serves a JSON array of colors from a `/colors` endpoint
- React frontend
  - `webpack-dev-server` exposed on port 8080
  - retrieves the list of colors from the backend and displays them