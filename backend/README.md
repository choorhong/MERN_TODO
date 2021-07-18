# Getting Started with MERN_TODO_BACKEND

## Setup env file
Create a .env file in the root directory and placed the following variables in the file.

```
NODE_ENV=local
PORT=8000
MONGO_URI=mongodb://localhost:27017
MONGO_DB=mern-todo-local
JWT_SECRET=<generate your own preferred jwt_secret or generate one with the instruction below>
FRONTEND_BASE_URL=http://localhost:3000
```
You can generate a JWT_SECRET by running `openssl rand -base64 172 | tr -d '\n'` in the command line.

## Setup firebase
1. Login or register a [firebase](https://firebase.google.com/)
2. Add a project or choose an existing project
3. Retrieve the `database url` by creating or choosing an existing firebase `Realtime Database` > replace the `databaseURL` in `/firebase/index.ts`
3. Click on the `setting icon`:gear: next to `Project Overview` > `Project settings` > `Service accounts` > `Node.js` > `Generate new private key` > place the downloaded `serviceAccountKey.json` file in  `/firebase` folder

## Run project
1. After setting up your env variables, run `yarn install`. Make sure you are in the root directory of the project.
2. After the packages are installed, run `yarn start`.
3. Create a database with name `mern-todo-local` in your local db. This name can be anything as long as its the same in the `.env` file.

## Project structure
The requests flow:
> `Routes` or `Graphql` => `Controllers` => `Service` => `Model`

Controllers should contain the business logic, db logic/query and adhere to the schemas crafted in models.

Enums, interfaces, and types should be defined in `/types` directory.

## Tools
Database Tool: Any mongodb GUI, recommended [MongoDB Compass](https://www.nosqlbooster.com/).

## Production setup
To be changed.
1. Run `yarn build`