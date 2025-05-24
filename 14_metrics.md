# 📊 Metrics

A **metric** tells you something measurable about your system **over time**. Metrics help monitor **performance**, **detect issues**, and **plan scaling**.

## 📌 Core Metrics

- ⏱️ **Uptime**

  - How long the service has been running without crashing

- 📈 **Request Rate (RPS)**

  - Requests per second hitting the service

- 🚀 **Latency**

  - Time taken to respond to a request

- ❌ **Error Rate**

  - Percentage of failed requests

- 🧠 **Saturation**

  - Resource usage (CPU, threads, memory, etc.)

- 🔗 **Dependencies**
  - Latency and error rate when calling external systems (DBs, APIs, etc.)

---

## 🔧 Practical Applications

- ✅ Monitor **dependencies**: Track latency and error rate of external services your microservice calls

- ✅ Observe key metrics:

  - Detect if **errors**, **slowdowns**, or **spikes** are coming from specific services

- 🧪 **Load Testing**:
  - Simulate high traffic to test limits
  - Helps find **bottlenecks** before real users experience issues

## 🔭 Prometheus

- **Real-time metric collection**

  - Regularly **pulls** metrics from target endpoints (e.g. `/metrics`)

- **Pull model**

  - Prometheus initiates requests to services
  - Opposite of the **push model** (used in log pipelines)

- **Service discovery**

  - Automatically detects new services (especially in **Kubernetes**)

- **Alerting**
  - Define conditions (e.g. high error rate)
  - Send alerts via email, Slack, etc.

## 📊 Grafana

- **Connects to data sources** like Prometheus, Elasticsearch, etc.
- **Creates visual dashboards** for metrics (CPU, memory, RPS, etc.)
- **Supports alerting** based on custom thresholds
- Used for **real-time monitoring** and **dashboards**

### 🔍 Kibana vs Grafana

| Tool    | Focus   | Analogy                                         |
| ------- | ------- | ----------------------------------------------- |
| Kibana  | Logs    | “🔎 What went wrong?” — Search and analyze logs |
| Grafana | Metrics | “📈 What’s happening now?” — Live monitoring    |

```
┌─────────────────────┐
│  Your Node.js App   │
│                     │
│  ┌──────────────┐   │
│  │ /metrics     │◄──┴── Prometheus (pull metrics) ──► 📈🔎 Grafana (What is happening ?)
│  └──────────────┘   │
│                     │
│  ┌──────────────┐   │
│  │ logs/app.log │──► Filebeat ──► Logstash ──► Elasticsearch ──► 📊⚠️ Kibana (What is wrong ?)
│  └──────────────┘   │
└─────────────────────┘
```

> `New Relic` - metrics, logs, errors
