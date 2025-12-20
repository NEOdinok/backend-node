# Caching

## 📚 Caching Strategies Explained (Beginner-Friendly)

---

### ✅ **Cache-Aside (Look-Aside)**

- **How It Works:**
  1. App checks the cache.
  2. Cache Hit ➔ Return data.
  3. Cache Miss ➔ Load from DB, store in cache, return data.
- **Who Controls Cache:** Application code.
- **Example:**
  - User profile data cached in Redis.
  - Key: `user:123`, if not found, load from DB and cache it.
- **Use Case:** Read-heavy apps, API responses, product details.

---

### 💤 **Lazy Caching (Read-Through Caching)**

- **How It Works:**
  1. Cache system checks for data.
  2. Cache Miss ➔ Cache system loads from DB, stores it, returns data.
- **Who Controls Cache:** Cache system (like a library or middleware).
- **Example:**
  - Using a caching library that automatically fetches from DB if key missing.
- **Use Case:** Simple scenarios where TTL (Time To Live) is important (e.g., product prices).

---

### ✍️ **Write-Through**

- **How It Works:**
  1. Write data to **cache AND database immediately**.
- **Pros:** Strong data consistency.
- **Cons:** Slower writes.
- **Example:**
  - Updating product stock ➔ Write to Redis and PostgreSQL at the same time.
- **Use Case:** Banking systems, inventory management.

---

### 📝 **Write-Behind (Write-Back)**

- **How It Works:**
  1. Write data to cache.
  2. Add to a queue for later DB write.
  3. Background job writes data to DB.
- **Pros:** Fast writes.
- **Cons:** Risk of data loss if failure before DB write.
- **Example:**
  - Save user analytics events to Redis, push to queue.
  - Background job (like node-cron) writes batch events to PostgreSQL.
- **Use Case:** Logging, analytics, non-critical data.

## 📊 **Summary Table**

| Strategy          | Read Speed | Write Speed | Consistency | Use Case             |
| ----------------- | ---------- | ----------- | ----------- | -------------------- |
| **Cache-Aside**   | Fast       | Normal      | Eventual    | API, product catalog |
| **Lazy Caching**  | Fast       | Normal      | Eventual    | Product prices       |
| **Write-Through** | Fast       | Slow        | Strong      | Financial data       |
| **Write-Behind**  | Fast       | Fast        | Eventual    | Analytics, logging   |

## 📖 Cache Invalidation and Best Practices

### 🚫 **Invalidation Strategies**

- **Direct Invalidation:**  
  Immediately remove or update cached data when the underlying data changes.

- **Time-Based Invalidation (TTL):**  
  Set an expiration time for cached data (e.g., using Redis TTL). After this time, data is automatically removed.

- **Lazy Invalidation:**  
  On each cache access, check if the data is still fresh. If not, refresh it before returning.

- **Tag-Based Invalidation:**  
  Assign tags to related cached data. Invalidate entire groups by removing data associated with a specific tag.

---

### 📌 **Caching Recommendations**

- **Cache Size Management:**  
  Ensure your cache has enough memory for important data.  
  _Tip:_ Monitor Redis memory usage to decide if scaling is needed.

- **Data Consistency Consideration:**  
  If strong consistency is required (e.g., financial transactions), be cautious with caching.  
  _Caching can lead to stale or inconsistent data if not handled carefully._

- **Optimize Complex Queries:**  
  Cache the results of heavy or frequently executed database queries.  
  _This reduces database load and improves application performance._

---

## 🗃️ PostgreSQL Level Caching

---

### 📚 **Built-In Caching Mechanism**

- PostgreSQL **automatically caches frequently accessed data and query results** using its internal memory structures.
- The primary component for this is the **Shared Buffer Cache**.

### 🔧 **Configuration Example:**

```plaintext
shared_buffers = 1GB
```

- **Recommended:** Set shared_buffers to **25-40% of total system RAM** for performance optimization.

### 📌 Additional Caching Strategies

**Materialized views** store the results of complex queries physically on disk.

```sql
CREATE MATERIALIZED VIEW my_view AS
SELECT product_id, SUM(sales) AS total_sales
FROM sales_data
GROUP BY product_id;
```

Refresh when needed:

```sql
REFRESH MATERIALIZED VIEW my_view;
```

## Pooling

Connection pooling is a technique that **reuses existing database connections** instead of creating and closing a new connection

Creating database connections is **resource-intensive and slow**.
A **"pool"** is a collection of **pre-established, ready-to-use connections**.

### 📌 **Real-World Example:**

- Without pooling:
  - Each API call opens a new DB connection. High load ➔ DB crashes.
- With pooling (e.g., using **PgBouncer**):
  - API reuses existing connections. Handles more requests with fewer open connections.

> Tools: `PgBouncer`, `Pgpool-II`

## Redis: Everyday Commands

- `SET`, `GET` Basic key-value storage
```
SET user:1 "Alex"
GET user:1 -> "Alex"
```

- `HSET` (Hashes) Store object-like structure
```
HSET user:1 name "Alex"
HSET user:1 age "24"

HGET user:1 name -> "Alex"
```

- `SETs` **unique unordered** values
```
SADD online_users 1 2 3
SADD online_users 2   # ignored (already exists)

SMEMBERS online_users -> {1,2,3}
```

- `Sorted sets` Set + score
`-1` - last elemtnt
`-2` - second from the end
`ZREVRANGE` - range in reverce order
```
ZADD leaderboard 100 user1
ZADD leaderboard 200 user2
ZADD leaderboard 150 user3

ZREVRANGE leaderboard 0 1 - user2, user3
```

- `Pub/Sub` Lightweight messaging
```
SUBSCRIBE orders
PUBLISH orders "order_created"
```

- `WATCH` / `WATCH2` Optimistic locking. Abort if someone accesses while i'm executing
```
WATCH balance
GET balance
SET balance 90
EXEC
```

> 💡 Resis can be configured (though not widely used) for pub/sub. `PUBLISH channel message` / `SUBSCRIBE channel`: lightweight notifications.

📌 Common patterns, examples
- Cache with TTL: `SETEX user:123 60 {json}`.
- Cache-if-absent (and simple lock): `SET lock:job abc EX 10 NX`.
- Rolling queue: `LPUSH q item`; worker uses `BRPOP q 5`.
- Leaderboard: `ZADD lb 1200 user:42`; top 10 via `ZREVRANGE lb 0 9`.
