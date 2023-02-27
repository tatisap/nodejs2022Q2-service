# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker](https://www.docker.com).

## Downloading

Clone this repo and checkout to dev branch:

```
git clone {repository URL}
```

```
git checkout dev-auth-logging
```

## Creating .env file

Add .env file with following information (example):

```
APP_PORT=4000

POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_USERNAME=postgres
POSTGRES_PASSWORD=root
POSTGRES_DATABASE=nodejs_course_db

LOG_LEVEL=4
MAX_LOG_FILE_SIZE=64 #in kB

CRYPT_SALT=10
JWT_SECRET_KEY=secret123123
JWT_SECRET_REFRESH_KEY=secret123123
TOKEN_EXPIRE_TIME=1h
TOKEN_REFRESH_EXPIRE_TIME=24h
```

## Installing dependencies

```
npm install
```

## Running application

```
docker compose up
```

After starting the app on port you can open in your browser OpenAPI documentation by typing http://localhost:{port you specified}/api.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

Or you can use api.yaml file from doc folder in root for importing to Postman

## Testing

After application running open new terminal and enter:

```
npm run test:auth
```

## Check eslint

```
npm run lint
```

## Useful information

### Nest.js log levels

- 0 - error (for uncaughted exeptions and non-Http exeptions);
- 1 - warn (for Http exeptions);
- 2 - log;
- 3 - verbose;
- 4 - debug.

If you set log level as 2 in .env file, there are error, warn and log in log files.

### Error immitation

For error immitation you can place ```throw new Error('Oops');``` in any controller method and call it.

For immitation uncaughtException you can place following code to the end of the ./src/main.ts file:

```
setTimeout(() => {
  throw new Error('Oops');
}, 5000);
```

For immitation unhandledRejection you can place ```throw new Error('Oops');``` to the end of the bootstrap function in ./src/main.ts file.
