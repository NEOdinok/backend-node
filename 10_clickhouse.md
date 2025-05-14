#🖱️ ClickHouse

## ⚡ What is ClickHouse?

**ClickHouse** is a fast, open-source **columnar database management system** designed for OLAP
**ClickHouse** is designed for fast reading. Write performance is **traded for fast reads**

> **OLAP** (Online Analytical Processing).

### 🔑 Key Features

- **Columnar Storage**

  - Stores data **by columns**, not rows
  - Speeds up reading, filtering, and aggregation of large datasets

- **Advanced Aggregation Functions**

  - Built-in support for `quantiles`, `histograms`, `approximate counts`, etc.
  - Not available in traditional row-based SQL systems

- **Unique Data Types**

  - `LowCardinality`: optimized for columns with repeated string values
  - `Nullable`: supports optional fields

- **Distributed Queries**

  - Run a single query **across multiple nodes**
  - Scales horizontally for big data processing

### **Use Cases:**

- **Analytics** dashboards
- **Real-time monitoring** (metrics, logs)
- **Event tracking at scale** (billions of rows)
- **User activity** (page views, activity, session time)

### 📌 Indexes

- Supports **primary and secondary indexes**
- Uses **`MERGE_TREE`** engine family to optimize:
  - Data reading
  - Range queries
  - Filtering large datasets efficiently

### 📁 Supported Formats

- ✅ `JSON`
- ✅ `CSV`
- ✅ `TSV`
- ✅ `Parquet`
- And many other structured formats

### ✍️ Writing Data in ClickHouse

ClickHouse is optimized for **reading**, not writing. Writing involves buffering and merging to improve performance.

### 🔄 Features of Data Insertion

- **Buffering & Merging**

  - Data isn't written directly
  - Goes into **memory buffers**, then periodically **merged** to storage
  - ✅ Improves write efficiency
  - ❌ Merges are **asynchronous** and **less predictable**

- **Batch Insertion**

  - ✅ Recommended to insert **large batches** of data
  - ⚠️ Small frequent writes can cause overhead

- **Buffer Flushing**

  - Buffers are flushed **automatically**
  - Behavior depends on **configuration** and **system load**

### ✅ Writing Best Practices

- Best practice: **batch insert** large chunks of data.
- Monitor **buffer size and flush conditions** for critical systems
- Buffer **flush is not immediate**. Use `OPTIMIZE TABLE my_table FINAL` to **force** merge and flush to disk
