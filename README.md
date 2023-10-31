# photoalbum

# Getting started

> **Note!** I used pnpm instead of npm for package management [pnpm](https://pnpm.io/)

- Install dependencies

```
pnpm install
```

Start devlopment server.

```
pnpm  dev
```

The dev server will be started locally at `http://localhost:3000`.

## Project Structure

| Name                | Description                                                                                                |
| ------------------- | ---------------------------------------------------------------------------------------------------------- |
| **dist**            | Contains the build files.                                                                                  |
| **node_modules**    | Contains all npm dependencies.                                                                             |
| **src**             | Contains source code that will be compiled to the dist dir.                                                |
| **src/config**      | Authentication, Databse and other global config files.                                                     |
| **src/controllers** | Controllers define objects/methods that handle http requests.                                              |
| **src/models**      | Models define entities and DTOs that will be used in storing and retrieving data from databse.             |
| **src/shared**      | Contains midllewares and global utilities                                                                  |
| **uploads**         | Public and private photos directory.                                                                       |
| **src**/app.ts      | Entry point to express app.                                                                                |
| index.ts            | Entry point to main server.                                                                                |
| .env.dev            | API keys, tokens, passwords, database URI.                                                                 |
| package.json        | File that contains npm dependencies as well as [build scripts](#what-if-a-library-isnt-on-definitelytyped) |
| tsconfig.json       | Config settings for compiling server code written in TypeScript                                            |
| .eslintrc           | Config settings for ESLint code style checking                                                             |
| .eslintignore       | Config settings for paths to exclude from linting                                                          |

### Running ESLint

```
pnpm lint    // ESLint
```

### Running ESLint

```
pnpm build    // Build the project to /dist folder.
```
