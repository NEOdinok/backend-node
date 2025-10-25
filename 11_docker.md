# 🐳 Docker Overview

**Docker** is a platform for building, shipping, and running containers — lightweight, isolated environments for applications.

---

### 📦 Image vs Container

- **Image**: A **snapshot** of the filesystem and execution settings (like a blueprint)
- **Container**: A **running instance** of an image

---

### 💾 Volumes (`-v` flag)

- Used to **persist data** outside the container lifecycle
- Example: `docker run -v myvolume:/app/data`
- Think of a volume like a **USB drive**:
  - Can be shared across multiple containers
  - Keeps data even after the container is deleted

---

### 🚦 Stopping Containers

- `docker stop`:

  - Sends **SIGTERM**
  - Waits, then sends **SIGKILL** if the container doesn’t exit
  - ✅ Graceful shutdown

- `docker kill`:
  - Sends **SIGKILL immediately**
  - ❌ No chance for graceful shutdown

---

### 🔧 Interacting with Running Containers

- `docker exec -it <container> bash`
  - Executes commands **inside a running container**
  - `-i`: interactive
  - `-t`: pseudo-terminal (for shell access)

---

### 🛠️ Dockerfile Example

```Dockerfile
# Use base image with Node.js
FROM node:14

# Set working directory
WORKDIR /usr/src/app

# Copy dependency definitions
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the app source code
COPY . .

# Expose port 8080
EXPOSE 8080

# Run app
CMD [ "node", "server.js" ]
```

---

### Docker Compose vs Docker Swarm 

> 💡 **Docker Compose** is a simple tool for defining and running multi-container applications on a single host.

> 💡 **Docker Swarm** is Docker’s built-in container orchestrator for running and scaling services across multiple machines (nodes).

| Feature            | Docker Compose                         | Docker Swarm                                  |
| ------------------ | -------------------------------------- | --------------------------------------------- |
| **Use case**       | Local development                      | Production / multi-node clusters              |
| **Scope**          | Manages containers on a single machine | Orchestrates containers across multiple nodes |
| **Command**        | `docker compose up`                    | `docker stack deploy`                         |
| **Load balancing** | ❌ No built-in load balancing           | ✅ Built-in load balancing via routing mesh    |
