# Juventud Ioná - Frontend

Frontend App for Juventud Ioná

### Env file Configuration

Create a *.env* file in the root project folder. This file has to contain the same keys as the *.env.example* file. Fill the keys with the official Juventud Ioná keys provided by the Product Owner. 
```
PORT=3000
BACKEND_DOMAIN=<the root url where backend is hosted>
REACT_APP_AUTH0_DOMAIN=<the auth0 client domain>
REACT_APP_AUTH0_CLIENT_ID=<the auth0 client id>
```

## Running

```console
cd juventudiona
npm install
npm start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Testing

```console
npm test
```

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Build

```console
npm run build
```

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.