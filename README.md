# [ESurveyor](https://stark-chamber-19026.herokuapp.com/)

## Setup Instructions:

This project is a monorepo in which the server is the root directory and the react app is located in a subdirectory under `client`
Please run **npm install** in the root directory as well as in the client subdirectory.

For development purposes a `dev.js` file located under `config` is required, this file consists of key value pairs like in `prod.js` in the production environment (Heroku currently) the values are consumed through liberal use of process.env.(I'm not a madman who committed production keys"

In development we start the express server and the react server using:

```
npm run dev
```

Which will watch for and refresh on file changes.
