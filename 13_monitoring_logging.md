# 📊 Logging

---

## 📝 Winston, Pino (Node.js Logging)

- A **logging libraries** for Node.js
- Helps replace raw `console.log` with **structured, organized, configurable logs**

> Winston is very old one. Pino - new, widely used one

> Installed as a **project dependency**, can log to console, files, etc

## 📦 Filebeat

- Lightweight **log shipper** by Elastic
- Watches local log files and **forwards new logs** to another service (e.g., Logstash)
- **Doesn’t parse logs** — only ships them

> Typically installed/configured via **Kubernetes ConfigMap**

## ELK Stack

Works together with **Filebeat** for full logging pipeline

### 🧹 Logstash

- Receives logs from Filebeat
- **Parses, transforms, filters** log data
- Acts as a **pipeline processor**
- Forwards cleaned logs to Elasticsearch

> Runs as a **standalone service** (in its own pod)

### 🔎 Elasticsearch

- **Full-text search**
  - Google-style search with typo tolerance and relevance scoring
- **Log analysis**
  - Ideal for viewing and filtering logs from distributed systems
- **Aggregation**
  - Analyze and visualize metrics in **charts, dashboards, reports**
- **JSON-based**
  - All data is stored and queried in **JSON format**
- **Integration**
  - Can be used via **HTTP API** or **Node.js clients**
- **CRUD support**
  - Create, Read, Update, Delete documents
- **DSL (Domain-Specific Language)**
  - Rich querying language built for complex search/filter logic

> Runs as a **standalone service** (in its own pod)

🔤 **Full-text search** (fuzzy, tokenized):

```json
{ "match": { "description": "laptop" } }
```

🏷️ **Exact value search**:

```json
{ "term": { "status": "active" } }
```

🔢 **Numeric/date range filtering**:

```json
{
  "range": {
    "price": {
      "gte": 1000,
      "lte": 2000
    }
  }
}
```

**Elasticsearch Core Concepts**

- **📁 Index**

  - Like a **table** in SQL or a **collection** in MongoDB
  - Contains many documents
  - Has a unique name

- **📄 Document**

  - A single **JSON record** stored in an index
  - Identified by a unique `_id`
  - Example: user profile, log entry, product info

- **🧱 Mapping**

  - Defines the **structure** of documents in an index
  - Specifies field types:
    - `text` – for full-text search
    - `keyword` – for exact matches
    - `date`, `boolean`, `number`, etc.

- **🧪 Analyzer**
  - Used during **indexing and searching** of `text` fields
  - Breaks down text into tokens (words), normalizes them
  - Enables powerful full-text search (e.g. lowercase, remove punctuation, stemming)

### 📈 Kibana

- **UI dashboard** for viewing and analyzing logs from Elasticsearch
- Allows:

  - Full-text search **(google-style text search)**
  - Filtering
  - Graphing and dashboards

# 📈 Monitoring

## 🔍 Monitoring Overview

- **Monitoring is continuous**: constantly tracks system health, logs, and metrics
- Example pipeline for a Node.js microservice:

```plaintext
🟦 Node.js Microservices → 📦 K8S Pod with 📝 Filebeat → 🧹 Logstash → 🗃️ Elasticsearch → 📊 Kibana
```
