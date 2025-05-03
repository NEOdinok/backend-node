# Node.js Assignment (Authentication)

## Task

Create your own API.

A detailed explanation of how to approach this can be found in the Net Ninja tutorials.

### Node.js basicw

[NodeJS - Net Ninja](https://www.youtube.com/watch?v=zb3Qk8SG5Ms&list=PL4cUxeGkcC9jsz4LDYc6kv3ymONOKxwBU)  
(_Don't go too deep about reading / writing files for now, just watch it. API and MongoDB start from lesson #9_)

### JWT video

[JWT Authentication - Net Ninja](https://www.youtube.com/watch?v=SnoAwLP1a-0&list=PL4cUxeGkcC9iqqESP8335DA5cRFp8loyp)

## Requirements

- Create a server using **Express**
- Integrate with a **MongoDB** database
- Add some business logic  
  (e.g., reading products by category — this part is up to your imagination)

- Learn what **middleware** is  
  (implementation of the _Chain of Responsibility_ pattern)

- Implement **authentication and registration**

  - Use middleware
  - Use **JWT** tokens for authentication
  - Use **bcrypt** (or bcryptjs if having issues with bcrypt) for password hashing

- Add **error handling** at the end  
  (In Express, errors are passed to the next middleware using `next(err)`)

- Instead of using a `config.js`, use **`.env` environment variables**  
  (for things like `PORT` and other sensitive data — none of this should be hardcoded)

- Use **Git** for version control

- Use a proper **`.gitignore`** file  
  (e.g., ignore `node_modules`, `.env`, `package-lock.json`, etc.)

- Test your API using **Postman**

[My solution](https://github.com/NEOdinok/gosha-node)
