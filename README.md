# Blockstack React Redux Starter

> This is a work in progress. It is also my first exposure to Redux (and Blockstack), so any comments on how to improve anything are appreciated!

Starter kit for building apps with [Blockstack](https://blockstack.org/) using React.

## Features

* Authentication with Blockstack using [`blockstack.js`](https://github.com/blockstack/blockstack.js)
* Editor component (only accessible when authenticated)
  * Read files from Blockstack
  * Write files to Blockstack
* Routing with [`react-router`](https://github.com/ReactTraining/react-router)
  * `Authenticated` and `Public` components to create routes only accessible when either signed in or not, respectively
* Basic styling using [`bulma`](https://github.com/jgthms/bulma)
* State management with [`redux`](https://github.com/reactjs/redux)
* Code formatting using [`standard`](https://github.com/standard/standard)
  * `yarn run standard` for linting
  * `yarn run standard-fix` for automatic code formatting
* Ability to use Sass (`.scss`) files for styling
  * Uses [`node-sass-chokidar`](https://github.com/michaelwayman/node-sass-chokidar)
* Created with `create-react-app`. Additional feature details available [here](https://github.com/facebookincubator/create-react-app)

## Usage

Install dependencies using `yarn` or `npm`

```
> yarn install
> npm install
```

Start the development server

```
> yarn start
> npm start
```

The application will be available at `localhost:3000`

## FAQ

> I'm getting a 'Sign in Request' error when attempting to authenticate with Blockstack

You'll need to enable CORS stuff for only `localhost:3000`. I use
[Allow-Control-Allow-Origin: *](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi/related?hl=en)
for Chrome.
The only rule I have enabled in the extension is `http://localhost:3000/*`. You'll need to disable the catch all rule (`*://*/*`). If you are still getting the error open the extension and disable then re-enable it using the switch.  
