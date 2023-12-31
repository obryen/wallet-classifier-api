# Wallet classifier API build on Nestjs

The Wallet Classifier API allows users to retrieve a list of classifications based on their wallet address. By providing their wallet address as a parameter, users can receive a comprehensive list of classifications for each token that has been preconfigured.

## How to use

- To start, you can clone this repo and make a copy.

- Simply need to navigate to `localhost:8000/v1/docs`, after you run the service.

### How to run the service

- Copy `.env.example` to `.env`.
- `npm i`
- `npm run build`
- `npm run db` (this runs the DB)
- `npm run start:dev`
//NB DB is set to sync with entities via ORM , in production migration should be preffered
## Features and capabilities

### Features:

#### Main features: 
- Token configuration : allows for admin users (with API keys) to  able to  `create` and `update`  token configurations that specify token addresses as well as the balance threshold for
each token for use when classifying a wallet. 
- Wallet classification: allows for any user to  call the API providing their wallet address and receive a list of classifications one for each token we have preset.

### Minor features (Extended from base-project):
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

 ## Potential Improvements
 - *Caching Token Configurations*: To reduce database load and improve response times, implement caching for token configurations. By caching the fetched configurations, subsequent requests can be served from the cache, minimizing the need for frequent database queries.
 - *Unit Tests*
 -  *Support for Other Token Standards*: Extend the logic of the API to support token standards other than ERC-20. This could include implementing support for token standards like ERC-721 or BEP-20. By expanding the API's capabilities, users can receive classifications for a broader range of token standards, increasing its usefulness.



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
