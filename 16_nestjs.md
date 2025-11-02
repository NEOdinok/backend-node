# NestJS basics

## Advantages of Nest.js

- **Structure:** Encourages organizing code into **modules, controllers, providers**, facilitating maintenance and scalability.
- **Built-in TypeScript Support:**
- **Decorators:** Those simplify configuration and setup, making the code less error-prone.
- **Built-in Dependency Injection:** Simplifies testing and development of scalable applications.

## Differences from Express

- **Express**, **Koa** and others are usually less multifaceted and structured.
- They provide basic mechanisms for **routing** and **handling requests** but lack a strict structure or built-in DI.
- Nest.js is built **on top of Express or Fastify**, offering higher-level abstractions and design patterns.

### Here is an example of Nest.js application

```typescript
import {
  Module,
  Controller,
  Get,
  Injectable,
  NestMiddleware,
  MiddlewareConsumer,
  NestModule,
} from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Request, Response, NextFunction } from "express";

// Middleware for authentication
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // There we do some authentication logic
    next();
  }
}

// /users route controller
@Controller("users")
class UsersController {
  @Get()
  findAll(): string {
    return "Returns all users or instance";
  }
}

// App module
@Module({
  imports: [
    TypeOrmModule.forRoot({
      /* Params for accessing the database*/
    }),
  ],
  controllers: [UsersController],
})
class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware) // Apply auth middleware
      .forRoutes("users"); // for /users route
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
```

## NestJS App boilerplate

When creating NestJS App through command line, you get the following project structure:

- **Modules** Classes decorated with **@Module()**. The fundamental building block of a NestJS application, encapsulating providers, controllers, imports, and exports.
- **Controllers** They're decorated with **@Controller()** and contain route handlers. Handle incoming requests and return responses to the client.
- **Providers** Can be any class that can be injected into other classes through the constructor, including services, repositories, factories, helpers, etc.
- **Services** Usually decorated with **@Injectable()**. Used to abstract business logic or interact with databases,
- **Pipes** Used for input data transformation or validation, applied at the route parameter level, globally, or at the route handler level.
- **Exception Filters** Let us plug into global `ExceptionsHandler` thing and alter the behaviour a bit.
- **Interceptors** Extend basic method functionality, allowing additional logic before or after the execution of a method.
- **Decorators** Used to add additional **metadata** to classes, methods, and parameters.
- **Guards** Responsible for authorization and other access checks, controlling **whether a specific request is allowed**.
- **DTOs (Data Transfer Objects)** Define the format of data transferred between the client and server.

## Dynamic Modules

- **Dynamic modules** in NestJS allow configuring modules at runtime rather than compile-time
- This allows us to enable different providers, dependencies, and configurations depending on the **runtime environment or other conditions**.

**How to Create a Dynamic Module:**
Using the `forRoot()` method, which returns a `DynamicModule` object.  
Parameters defining the module's behavior or dependencies can be passed to `forRoot()`.

```typescript
// my-module.module.ts
@Module({})
export class MyModule {
  static forRoot(config: MyConfig): DynamicModule {
    return {
      module: MyModule,
      providers: [{ provide: MyService, useValue: new MyService(config) }],
    };
  }
}
```

**Practical Use Cases:**

1. **Configuration:** Often used for modules dependent on external configuration, like database connections.
2. **Pluggable Modules:** Creating plugins or extensions that can be easily added or removed without altering the core code.
3. **Multi-tenancy:** When one application serves different clients with varied logic or settings.
4. **Connecting to Different APIs:** When it's necessary to interact with different external services depending on conditions.

## Guards - Authentication - Microservices

**Guards** in NestJS are classes annotated with `@Injectable()`, implementing the **CanActivate** interface.  
They're used to determine **whether a request can be handled** by a route (router).

**Connection Between Guards and Authentication:**

- Guards are often used for user authentication and authorization
- The check for the presence and validity of a token or other credentials in the request.
- They can return **true (allow access)** / **false (deny access)** / **exception** for error handling.

**Authentication Strategies Using Guards:**

- **JWT (JSON Web Tokens):** A guard checks for the presence and validity of a `JWT` in the request's Authorization header.
- **Local (Login/Password):** A guard can use data from the request body to verify user credentials.
- **OAuth (Open Authorization):** Guards can implement authentication strategies through third-party services (e.g., Google, Facebook).

**Using Guards in Microservices:**

- **Authentication at the API Gateway Level:** A guard at the entry microservice (API Gateway) can perform authentication and pass approved requests further down the chain.
- **Authentication in Each Microservice:** Each microservice can have its guards for request verification, providing an additional security layer.
- **Token Exchange Between Microservices:** Guards can be used for verifying and passing authentication tokens between microservices.

**Guard Example:**

```typescript
// jwt-auth.guard.ts
@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {}

// users.controller.ts
@Controller("users")
export class UsersController {
  @UseGuards(JwtAuthGuard)
  @Get("profile")
  getProfile(@Request() req) {
    return req.user;
  }
}
```

## HTTP ExceptionsHandler

- Nest has a global `ExceptionsHandler` that knows how to turn thrown errors (e.g., HttpException) into HTTP responses.
- `Exception Filters` are your way to plug into that mechanism to:
  - Catch specific exception types (or all),
  - Log/enrich them
  - Return a custom HTTP response/body/headers.



## Pipes

**Pipes** in NestJS are classes used for transforming or validating input data in your application.  
They run before the route method (e.g., controller) and can modify incoming data (e.g., request parameters) or throw an error if the data doesn't meet expected criteria.

## Key Decorators in NestJS

1. **Class Decorators (@Controller, @Module, @Injectable):**

   - `@Controller(path`)`: Defines the base path for all methods within the controller.
   - `@Module({...})`: Defines a module that can contain providers, controllers, imports, and exports.
   - `@Injectable()`: Marks a class as a provider that can be injected into other classes via the constructor.

2. **Method Decorators (@Get, @Post, @Put, @Delete, @Patch):**

   - Define route handlers for the corresponding HTTP methods.

3. **Parameter Decorators (@Param, @Body, @Query, @Headers, @Req, @Res):**

   - Extract route parameters, request body, query parameters, request headers, and provide the full request or response object.

4. **Exception Handling Decorators (@Catch):**
   - Catches exceptions of a specified type in exception filters.

## NestJS tasks and questions

1. Refactoring Nest.js app:
