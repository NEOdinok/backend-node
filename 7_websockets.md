# 🔌 WebSockets

## [Fireship video](https://www.youtube.com/watch?v=1BfCnjr_Vjg)

WebSockets are built on top of HTTP

- **Persistent two-way connection** between client and server.
- Uses **TCP**, starts as HTTP then upgrades.
- Protocols:
  - `ws://` → insecure
  - `wss://` → secure (via SSL/TLS)

> **TSL** is contemporary version of SSL
> **ws:/**/ uses PORT `80`, **wss://** uses PORT `443` (Same as HTTP)

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
