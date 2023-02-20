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
git checkout dev-docker
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
```

## Running application

```
docker compose up
```

After starting the app on port you can open in your browser OpenAPI documentation by typing http://localhost:{port you specified}/api.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

Or you can use api.yaml file from doc folder in root for importing to Postman

## Vulnerabilities scanning

```
npm run docker:scan
```

## Testing

After application running open new terminal and enter:

```
npm run test
```

### Check eslint

```
npm run lint
```
