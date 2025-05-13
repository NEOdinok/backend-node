# 🔌 WebSockets

## [Fireship video](https://www.youtube.com/watch?v=1BfCnjr_Vjg)

- **Persistent two-way connection** between client and server.
- Uses **TCP**, starts as HTTP then upgrades.
- Protocols:
  - `ws://` → insecure
  - `wss://` → secure (via SSL/TLS)

### Advantages over HTTP

- **Persistent**: single connection reused
- **Two-way**: both client and server can send messages
- **Low latency**: no need to reopen connection
- **Extensible**: supports binary/text, real-time features (chat, gaming, live updates)

### Connection Flow

1. Client sends HTTP `Upgrade` request
2. Server accepts and upgrades to WebSocket
3. TCP connection stays open for real-time communication

## `Socket.IO`

- JavaScript library for real-time web apps
- Uses WebSockets if available, **fallbacks** such as:
  - **AJAX Long Polling**
  - **Server-Sent Events (SSE)**
  - **JSONP Polling** (legacy support)
- Handles reconnection, rooms, broadcasting, etc.

```js
//server
io.emit("message", "Hello, client!");

//client
socket.on("message", (data) => {
  console.log(data);
});

//handle errors
socket.on("error", (err) => {
  console.error(err);
});
```

> **AJAX** Asynchronous JavaScript and XML - send HTTP request from JS without page reload.

## Server-Sent Events (SSE)

- One-way: **Server → Client**
- Client opens a connection and **only receives** messages
- Simpler than WebSockets, but **no client-to-server messages**
- Good for: **notifications**, **live feeds**

## Implement rooms with socket.io

### 1. **Client Side**

- Store `roomID` locally (e.g. from DB or URL)
- On connecting, send config to server:

```js
socket.emit("joinRoom", { roomId: "room123", userId: "u1" });
```

### 2. **Server Side**

- Connect client to an appropriate room
- Route messages to that room

```js
io.on("connection", (socket) => {
  socket.on("joinRoom", ({ roomId, userId }) => {
    socket.join(roomId);
    console.log(`${userId} joined room ${roomId}`);
  });

  socket.on("sendMessage", ({ roomId, message }) => {
    io.to(roomId).emit("newMessage", message);
  });
});
```

- Multiple clients are connected **connect to the same backend**.
- **Both emit joinRoom** with shared roomId.
- Messages are sent/received in that room.

### Message History

- **Stored in a database** with fields like userId, operatorId, roomId, message, timestamp.
- Backend fetches and **sends history when a room is opened**.

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
