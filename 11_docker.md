# 🐳 Docker Overview

## 🐳 Basics

**Docker** is a platform for building, shipping, and running containers — lightweight, isolated environments for applications.

When you run a container, it’s like creating a **tiny virtual** computer inside your system.

**It has:**
- its own *filesystem*,
- its own *IP address* (inside Docker’s private network),
- and its own *network interface*.

### DNS
Docker has it's own `DNS server`, **not related** to the Internet DNS.

> Containers **on the same user-defined-network** talk via names instead of IPs, because **IPs can change**.

When you connect containers to the same network, Docker **registers** their names.  
When one container tries to resolve db, Docker DNS **replies with the IP** of that container.

### Docker networks (bridges)

`bridge` is default name of a network Docker network created automatically.
- Legacy
- Does not connect containers by their **name**
- If no **user network** is specified docker automatically puts containers on `bridge`
- You can still expose ports with `-p`

`user-defined-bridge` 
- built-in DNS
- Better, modern version

> 💡 `Docker Compose` automatically creates `user-defined` bridge

### Communication in Docker

```bash
doker run -p 8080:3000 myapp
```
Then you open `http://localhost:8080` and see the container's `3000` port

> 💡 **host.docker.internal** - special reserved hostname that means **host machine that 
runs Docker deamon**

### Communicate Connect container --> container

```bash
postgres://user:pass@db:5432/app
```

**🧩 Full meaning**

“Connect to the PostgreSQL database 
that runs **in the container named `db`**,  
which is available on port `5432`,  
using credentials `user:pass`,  
and open the database named `app`.”  

### Connect container --> host machine**
```bash
postgres://user:pass@host.docker.internal:5432/app
```

**🧩 Full meaning**
“Connect using the `postgres://` (PostgreSQL protocol),
using username `user`, password `pass`,
to the PostgreSQL server running **on my host machine** (`host.docker.internal`)
on port `5432`,
and open the database named `app`”

### Connect host machine --> container**

Other way around scenario

```bash
docker run -p 8080:3000 myapp
```
Now hosts can access **container's** `3000` port via `http://localhost:8080`

## 📦 Image vs Container

- **Image**: A **snapshot** of the filesystem and execution settings (like a blueprint)
- **Container**: A **running instance** of an image

---

## 💾 Volumes (`-v` flag)

- Used to **persist data** outside the container lifecycle
- Example: `docker run -v myvolume:/app/data`
- Think of a volume like a **USB drive**:
  - Can be shared across multiple containers
  - Keeps data even after the container is deleted

---

## 🚦 Stopping Containers

- `docker stop`:

  - Sends **SIGTERM**
  - Waits, then sends **SIGKILL** if the container doesn’t exit
  - ✅ Graceful shutdown

- `docker kill`:
  - Sends **SIGKILL immediately**
  - ❌ No chance for graceful shutdown

---

## 🔧 Interacting with Running Containers

`docker exec -it <container> bash` Executes commands **inside a running container**

- `-i`: interactive
- `-t`: pseudo-terminal (for shell access)

---

## 🛠️ Dockerfile Example

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
