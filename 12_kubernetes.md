### ☸️ Kubernetes Overview

Kubernetes (K8s) is a platform for **automating deployment, scaling, and management** of containerized applications.

---

### 🧱 Core Concepts

- **Pod**: Smallest deployable unit. Can run **one or more containers** sharing network/storage.
- **Service**: Provides a **stable network endpoint** to access pods. Handles **load balancing** and **discovery**.
- **Deployment**: Automates **creation**, **update**, and **scaling** of pods.
- **ConfigMap**: Stores **non-sensitive configuration** (e.g. env vars).
- **Secret**: Stores **sensitive data**, like passwords and tokens (encrypted).
- **Volume**: Provides **persistent storage** for pods (data survives restarts).
- **Ingress**: Manages **HTTP(S) traffic** from outside the cluster to services.

---

### ⚙️ Kubernetes in Microservice Architecture

- ✅ **Service Isolation**: Each microservice can run in its own pod
- ✅ **Scalability**: Easily increase/decrease replicas; supports auto-scaling
- ✅ **Service Discovery**: Built-in **DNS names** and **load balancing**
- ✅ **Seamless Updates**: Roll out updates with zero downtime (rolling updates)
- ✅ **Config Management**: ConfigMaps/Secrets inject config without rebuilding Docker images
- ✅ **Auto Error Handling**: Automatically restarts failed containers

---

### 🧠 Practical Tips

- Use an **optimized Dockerfile** for your app (small, efficient layers)
- Add **liveness** and **readiness probes** to check if the app is running/ready
- Store environment config in **ConfigMap** and **Secret**
- Use **NetworkPolicy** to restrict inter-service traffic as needed

---

### ✅ Summary

| Concept    | Purpose                                     |
| ---------- | ------------------------------------------- |
| Pod        | Deployable unit with one or more containers |
| Service    | Stable access + load balancing              |
| Deployment | Automates scaling/updates                   |
| ConfigMap  | Inject non-sensitive config                 |
| Secret     | Inject sensitive config (encrypted)         |
| Volume     | Persistent storage for pods                 |
| Ingress    | External HTTP(S) access                     |
