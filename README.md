# [Pensieve](https://www.pensieve.space/) &middot; ![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://reactjs.org/docs/how-to-contribute.html#your-first-pull-request)

> "I use Pensieve. One simply siphons the excess thoughts from one's mind, pours them into the basin, and examines them at one's leisure. It becomes easier to spot patterns and links, you understand, when they are in this form."
>
> _Albus Dumbledore_

This project contains the web application for Pensieve providing the interface to create and review items. This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and will be useful to reference its [User Guide](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Installing

Clone this project and update path accordingly:

```sh
git clone git@github.com:pensieve-srs/pensieve-web.git
cd pensieve-web/
```

Install the dependencies:

```sh
yarn install
```

Note: if you don't have `yarn` installed, feel free to use `npm`.

Copy the `.env.example` and update the variables to your settings:

```sh
cp .env.example .env.development.local
```

Make sure you have an API server running, either locally or on a server. The
API server repository is here:
[https://github.com/pensieve-srs/pensieve-api](https://github.com/pensieve-srs/pensieve-api).
The default server url is `localhost:5000` but feel free to modify.

Finally, run the app in development mode:

```sh
yarn start
```

Open [http://localhost:3000/](http://localhost:3000/) to view it in the browser.

Go to [http://localhost:3000/signup](http://localhost:3000/signup) to create an
account and get started.

## Contributing

### Roadmap

View the [Project Roadmap](https://github.com/orgs/pensieve-srs/projects/1) which includes upcoming features, reported bugs, and other updates to the project.

### Contributing Guide

All work happens directly on GitHub and contributions are welcomed!. [Submit a Pull Request](https://github.com/pensieve-srs/pensieve-web/pulls) to introduce new code changes. [Open an Issue](https://github.com/pensieve-srs/pensieve-web/issues) to request a new feature or report a bug. Interested in contributing? Contact [@nlaz](https://github.com/nlaz) for help to get started.

### License

Pensieve is [MIT licensed](./LICENSE.md).
