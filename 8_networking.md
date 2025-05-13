# Networks

## TCP/IP Stack (Networking Fundamentals)

The **TCP/IP stack** is a set of protocols that enable communication over the internet. It has **4 layers**:

---

### 1. Network Interface Layer

- **Lowest level**
- Handles actual data transmission over hardware (e.g. Ethernet, Wi-Fi)
- Deals with **device drivers**, **MAC addresses**, physical delivery

---

### 2. Internet (IP) Layer

- **Routes packets** between devices
- Uses **IP addresses**
- Responsible for **packet fragmentation**, **addressing**, **routing**

---

### 3. Transport Layer

- Ensures **reliable** or **fast** data delivery
- **Protocols**:
  - **TCP**: connection-oriented, reliable, ordered, error-checked
  - **UDP**: connectionless, faster, no guarantees (used for video/games)

---

### 4. Application Layer

- Used by actual programs (browsers, APIs, etc.)
- **Protocols**:
  - **HTTP/HTTPS** – web communication
  - **SMTP** – email
  - **FTP** – file transfers
  - **WebSockets** – real-time messaging

---

### Summary Table

| Layer             | Purpose                | Examples             |
| ----------------- | ---------------------- | -------------------- |
| Application       | App-level protocols    | HTTP, FTP, WebSocket |
| Transport         | Reliable data flow     | TCP, UDP             |
| Internet (IP)     | Routing, addressing    | IP, ICMP             |
| Network Interface | Hardware communication | Ethernet, Wi-Fi      |

## TCP vs UDP

| Feature        | TCP                            | UDP                          |
| -------------- | ------------------------------ | ---------------------------- |
| Type           | Connection-oriented            | Connectionless               |
| Reliability    | ✅ Guaranteed delivery & order | ❌ No guarantee              |
| Speed          | ❌ Slower (handshake, ACKs)    | ✅ Faster (minimal overhead) |
| Use Case       | Web servers, email, DBs        | Streaming, games, VoIP       |
| Error Handling | ✅ Built-in                    | ❌ Manual if needed          |

## DNS (Domain Name System)

- Translates **human-readable domains** (e.g. `google.com`) into **IP addresses** (e.g. `142.250.64.110`)
- Works like a **phonebook** for the internet

## Session vs Cookies

| Feature              | Cookies                                 | Sessions                       |
| -------------------- | --------------------------------------- | ------------------------------ |
| Stored Where?        | Client (browser)                        | Server                         |
| Sent on Each Request | ✅ Yes                                  | ✅ Via cookie (session ID)     |
| Capacity             | Small (~4KB)                            | Large (stored in memory or DB) |
| Security             | Can be stolen via XSS if not `HttpOnly` | Safer (logic is server-side)   |
| Expiry               | Client-controlled                       | Server-controlled              |

- ✅ Use **cookies** to store session IDs
- ✅ Use **sessions** to store secure, larger user data
