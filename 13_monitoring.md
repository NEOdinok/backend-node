# 📊 Monitoring 

**🔍 Monitoring**
- **Monitoring is continuous**: constantly tracks system health, **logs** and **metrics**

A **metric** tells you something measurable about your system **over time**. Metrics help monitor **performance**, **detect issues**, and **plan scaling**.

**Logging** capture **events** happening in the system: who did what, when, and with what result.  
Using a tool like `Pino` for structured logs instead of console.  
Helps you identify the issue better

## 📌 Core Metrics

💡 **PromQL Queries** - Query language for Prometheus to retrieve and aggregate metrics from your app. Essential metrics for modern backend development:

### 📈 Request Rate (RPS)

- Requests per second hitting the service
- **PromQL:** `sum(rate(http_requests_total[1m]))` (add `by (route)` to break down)

### 🚀 Latency (p95)

- Time taken to respond to a request (95th percentile)
- **PromQL:** `histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket[5m])) by (le))` (add `,route,method` to break down)

### ❌ Error Rate

- Percentage of failed requests (5xx responses)
- **PromQL:** `sum(rate(http_requests_total{status_code=~"5.."}[5m]))`

### 📊 In-flight Requests

- Current number of active requests (saturation indicator)
- **PromQL:** `sum(http_requests_in_flight)`

## 🔧 Practical Applications
- ✅ Monitor **dependencies**: Track latency and error rate of external services your microservice calls

- ✅ Observe key metrics:
  - Detect if **errors**, **slowdowns**, or **spikes** are coming from specific services

- 🧪 **Load Testing**:
  - Simulate high traffic to test limits
  - Helps find **bottlenecks** before real users experience issues

## 🔭 Prometheus

**Real-time metric collection**
- Regularly **pulls** metrics from target endpoints (e.g. `/metrics`)

**Pull model**
  - Prometheus initiates requests to services
  - Opposite of the **push model** (used in log pipelines)

**Service discovery**
= Automatically detects new services (especially in **Kubernetes**)

**Alerting**
- Define conditions (e.g. high error rate)
- Send alerts via email, Slack, etc.

## 📊 Grafana

- **Connects to data sources** like Prometheus, Elasticsearch, Loki, etc.
- **Creates visual dashboards** for metrics (CPU, memory, RPS, etc.)
- **Supports alerting** based on custom thresholds
- Used for **real-time monitoring** and **dashboards**


## 🌲 Pino

- Pino is a **structured, leveled, super-fast logger** (`JSON` by default).
- Gives you*`levels` **(info, warn, error)**, `fields` (e.g. request id, user id, etc.), and plays well with log backends (`Loki`, `Elastic`).
- Much faster and more **machine-parsable** than `console.log` (which is unstructured text).
- So: `Pino` ≈ **"production-grade logger"**, `console.log` ≈ "debug print"*

## 🏗️ Modern Observability Stack

| Component | Purpose | Role |
| --------- | ------- | ---- |
| **Pino** | Logging library in your Node.js app | Writes structured JSON logs to stdout |
| **Promtail** | Log collector/agent | Reads logs (e.g., Docker stdout) and pushes to Loki |
| **Loki** | Log database | Stores and queries logs (like Prometheus but for logs) |
| **Prometheus** | Metrics database | Pulls metrics from `/metrics` endpoint |
| **Grafana** | UI dashboard | Queries Prometheus (metrics) + Loki (logs), displays in dashboards |

> 📌 Your Node.js app **must expose metrics on the `/metrics` endpoint** in **Prometheus format**. Libraries like `prom-client` (Node.js) help generate this format automatically.

> 💡 The app's **stdout** (console.log) is the same as the **Docker container's logs**.

```
┌────────────────────────────────────────────────────┐
│          🐳 Docker Container                       │
│  ┌──────────────────────────────────────────┐      │
│  │  Node.js App                             │      │
│  │                                          │      │
│  │  • Writes JSON structured logs via Pino  │      │
│  │  • Exposes metrics on /metrics endpoint  │      │
│  │    in Prometheus format                  │      │
│  └──────────────────────────────────────────┘      │
└────────────────────────────────────────────────────┘
           │                        │
           │ (push)                 │ (pull)
           │                        │
           ▼                        ▼
      📚 Loki               🔍 Prometheus
       (logs)               (metrics DB)
           │                        │
           └───────────┬────────────┘
                       │
                       ▼
               📊 Grafana
          (dashboards + alerts)
```

> 💡 Everything listed above is `free and open-source`

> 💡 Alternative **New Relic** - Paid all-in-one SAAS. 

## ELK Stack (Almost legacy)

**ELK** = Elasticsearch, Logstash, Kibana

Older centralized logging stack. Still used in some organizations but *considered legacy* in modern microservices architectures.  
Has been largely replaced by cloud-native solutions like `Prometheus` + `Grafana`.