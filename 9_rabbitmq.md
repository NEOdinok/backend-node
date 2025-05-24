# RabbitMQ

> **AMQP** - Advanced Message Queuing Protocol. Built **on top of TCP**.

**RabbitMQ** is a message broker that offers a flexible and reliable system for transmitting messages between systems.  
It supports the **AMQP protocol**.

**Distributed task processing** - meaning that distributed system processes messages by **publisher confirmations** that
RabbitMQ got the message and **consumer acknowledgements** that consumer got and processed the message.

```plaintext
producers (publishers) → Exchange → Queue
```

### 🧭 RabbitMQ Workflow

- `assertExchange` → create exchange
- `assertQueue` → create queue
- `publish` → send message to exchange with a routing key
- `consume` → listen to messages from queue

`amqplib` - node js package for rabbitmq

## 🧭 Exchange Types

- **Direct** - Exact match on routing key
- **Topic** - Pattern match (`*.error`, `user.*`)
- **Fanout** - Broadcast to all queues
- **Headers** Match on custom headers instead of keys

## 🔁 Message Ordering

- ❌ **No by default**
- Messages in a **single queue** are delivered in order
- To ensure order: use **"one queue per consumer"** pattern. Each consumer processes messages from it's own queue

## 📡 Channels in RabbitMQ

**Channels** are virtual connections inside a single TCP connection to the RabbitMQ.

- Created and managed using the AMQP protocol.
- Multiple channels can be opened per connection.
- Used to isolate different operations (e.g., publishing vs consuming) in the same connection.
- Lightweight and fast – avoids the overhead of opening multiple TCP connections.

> ⚠️ It's important to never share a channel between producers and consumers. Always create separate channels for each logical responsibility.

## 💾 Durable Messaging

| Option                                 | Behavior                        |
| -------------------------------------- | ------------------------------- |
| `deliveryMode: 1`                      | Non-persistent queue            |
| `deliveryMode: 2`                      | Message survives broker restart |
| `assertQueue(..., { durable: true })`  | Queue survives broker restart   |
| `assertQueue(..., { durable: false })` | Temporary queue                 |

> Durable messages `deliveryMode: 2` require durable queue to matter

## ✅ Acknowledgements (At-Least-Once Delivery)

- **Manual ack**: `channel.ack(msg)`

  - Use for **critical operations** (e.g. orders, payments). Do the operation, then acknowledge
  - Set with: `{ noAck: false }` in `channel.consume(...)`

- **Auto ack**: `{ noAck: true }`

  - Use for **non-critical data** (e.g. logs, metrics)
  - Message is treated as handled immediately upon delivery

## 🗃️ RabbitMQ vs Kafka Persistence

**RabbitMQ**:

- Messages can be persisted with:
- `channel.assertQueue('q', { durable: true })`
- `channel.sendToQueue('q', Buffer.from(msg), { deliveryMode: 2 })`
- ❌ **Messages are deleted after delivery**
- Designed for **message passing**, not long-term storage

**Example:** Multiple workers consume tasks.

**Kafka**:

- Stores messages on disk for a **configurable retention period**
- ✅ Consumers can **re-read** messages multiple times "Replayability"
- Designed for **event streaming** and **log storage**.

**Example:** Frontend sends events to analytics.

## 🧱 Role of Queues in Server Architecture

1. **Load Balancing Among Handlers**

   - Distribute tasks across multiple workers
   - Add more consumers to scale under high load

2. **Message Buffering for Resilience**

   - Queue stores incoming messages if handlers are slow/unavailable
   - Prevents message loss during spikes or failures

3. **Ordered & Reliable Processing**

   - Ensures messages are processed **in the order sent**
   - Combined with **acknowledgements**, guarantees reliability

## Smart broker dumb consumer

- In `RabbitMQ` the **broker (server)** manages all the logic for delivery, routing, and ordering of messages
- **Consumer (client)** only processes and acknowledgments messages.
- **Simplifies client code**, **reduces the load** on the consumer.

## RabbitMQ usage example on a project:

```plaintext
RabbitMQ is a message broker that offers a flexible and reliable system for transmitting some messages between systems.
It supports the AMQP protocol. Also Rabbit enables distributed message or task processing, which is very beneficial in a microservices architecture like our online store.

In my project, there was a product service and an order service. Under normal circumstances, both services interacted with
other services via an API Gateway. However, in certain situations, such as checking product availability when
placing an order, my order service would directly send an HTTP request to the product service.
And actually this is where Rabbit came into play.

To improve architecture and avoid direct dependencies between microservices, we implemented Rabbit.
We used the concept of "exchanges" and "queues" in Rabbit to control how messages are transmitted.
So when the "Orders" service receives a new order, it sends a message with order information to an exchange (like product ID).
The exchange routes this message to a queue listened to by the "Products" service.

Once the "Products" service receives a message, it checks product availability. After checking, it sends a message
(like availability or lack thereof) back to another exchange which connected to a queue that the "Orders" service listens to.
And the main advantage of using RabbitMQ in this scenario is that interaction between services becomes completely asynchronous.
That is, services don't block while waiting for a response from another service. Moreover, using RabbitMQ ensures reliability,
as even if one of the services fails, messages aren't lost; they remain in the queue until they are successfully processed.
```
