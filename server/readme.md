# Chat App Server

## Installation

1. Install dependencies

   ```shell
   npm i
   ```

2. Duplicate `.env.template` file
   ```shell
   cp .env.template .env
   ```

## Running

1. Pull a MongoDB Docker image and run it as a container

    ```shell
    npm run db:dev:restart
    ```

2. Build and run the application.

    ```shell
    npm start
    ```
