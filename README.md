# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

Clone this repo and checkout to dev branch:

```
git clone {repository URL}
```

```
git checkout dev
```

## Installing NPM modules

```
npm install
```

## Creating .env file

Add .env file to root and specify into it APP_PORT variable (4000, for example). Overwise the app will be crashed with following error:

```Error: Config validation error: "APP_PORT" is required```

## Running application

```
npm start
```

After starting the app on port you can open in your browser OpenAPI documentation by typing http://localhost:{port you specified}/api.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

Or you can use api.yaml file from doc folder in root for importing to Postman

## Testing

After application running open new terminal and enter:

```
npm run test
```

### Check eslint

```
npm run lint
```
