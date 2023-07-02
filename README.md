# Base Service for NestJS

This is the boilerplate service for NestJS, intended as a starting point when creating any new backend services using Nest.

## How to use

- To start, you can clone this repo and make a copy.

- Simply need to navigate to `localhost:8000/v1/docs`, after you run the service.

### How to run the service

- Copy `.env.example` to `.env`.
- `npm i`
- `npm run build`
- `npm run db` (this runs the DB)
- `npm run db:migrate`
- `npm run start:dev`

## Features and capabilities

This is an opinionated way of using NestJS. Feedback is welcome in the form of a PR or other discussion channels.

### Features:

- Standardized configs
- Extendable Logger
- Custom decorators over NestJS defaults which combine `@nestjs/swagger` for easy-to-use Swagger UI
- Useful custom hooks (not the frontend hooks, but a similar idea) for the following:
  - CORS
  - Validations
  - Swagger
  - API Versioning
  - Logger
- Custom exceptions and an exception filter that allows throwing exceptions inside the service code which automatically generate and return the appropriate error.
- Config for TypeORM and Postgres

### Opinions

A few things we prefer doing:

- Every folder that has exports will have an `index.ts` file which manages the exports. This allows us to do something like: `import { useSwagger, useCors } from 'src/core/hooks'` instead of `import useSwagger from 'src/core/hooks/useSwagger'` + `import useCors from 'src/core/hooks/useCors'`.
- Extend each entity from the base entity. This allows us to keep fields like `created_at` and `updated_at` consistent across all tables.
- Extend each service from the base service. This allows us to share common functionality across services.

## Folder Structure

- `src/`
  - `config/`: Common configs should go here. Example: database config, logging config, etc.
  - `core/`: The "core" folder is where we store commonly used core functionality, like decorators, hooks
    - `database/`
    - `decorators/`: Custom decorators
    - `entity/`: Base Entity that is extended by other entities in our project
    - `exceptions/`: Custom exceptions and handling logic
    - `hooks/`: "Hooks" add-ons to the server. You can think of them as a simpler way to enable certain options in the server.
    - `service/`
  - `migrations/`: Automatically generated migrations from TypeORM
  - `modules/`: This is where our business logic resides. We break down the business logic into different modules. An example module structure is below.
    - `example_module`:
      - `dto/`: Request and Response DTOs should go here, if the module is exposed via API
      - other files go here: `.module.ts`, `.service.ts`, `.controller.ts` (if exposed), `.entity.ts`
  - other files that go here
