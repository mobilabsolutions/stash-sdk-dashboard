[![travis-ci.com](https://travis-ci.com/mobilabsolutions/payment-sdk-dashboard-open.svg?token=1TXB69xLKwUo1aProyxt&branch=master)](https://travis-ci.com/mobilabsolutions/payment-sdk-dashboard-open) [![TypeScript](https://badges.frapsoft.com/typescript/version/typescript-next.svg?v=101)](https://www.typescriptlang.org/) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/) [![style: styled-components](https://img.shields.io/badge/style-%F0%9F%92%85%20styled--components-orange.svg?colorB=daa357&colorA=db748e)](https://github.com/styled-components/styled-components)

# payment sdk dashboard

Provides a Web Dashboard for the Payment SDK

## Functionality

Current state is just a Prototype

- Authorization is done via a Token
- Displays the Transactions
- Filter by Date, Status, and Text (Reason in the backend)
- Paging, if to many results
- Show Detail on "Click"
- Refund of "approved" Transactions

## Developer Instructions

### Requirements

- node.js (10+ recommended)
- Docker

### Installation requirements on macOS

```bash
brew install node
brew cask install docker
```

### Development

```bash
git clone git@github.com:mobilabsolutions/payment-sdk-dashboard-open
npm install
npm run dev
```

### Docker

To run it in docker

```bash
npm run docker
```

### Deployment

- done through travis script

Run one of the following scripts to create a new Version

```bash
npm run version:patch
npm run version:minor
npm run version:major
```

### Environment Keys

(just needed )

- PORT (default 3000)
- API_UPSTREAM (default https://pd.mblb.net)
- NODE_ENV (production|development|test) do not change, set by package.json scripts

### Helpful scripts

Just run

```bash
npm run
```

to get an overview

### Build with

- [typescript](https://www.typescriptlang.org/) (Language)
- [next.js](https://nextjs.org/) (SSR Framework)
- [react](https://reactjs.org/) (View Lib)
- [styled-components](https://www.styled-components.com/) (css Lib)
- [fastify](https://www.fastify.io/) (Webserver)
- [docker](https://www.docker.com/) (alpine-node)

### other components

- [react-dates](https://github.com/airbnb/react-dates) (Date Range Picker)

### folder structure

- [/asserts](https://github.com/mobilabsolutions/payment-sdk-dashboard-open/tree/master/assets) translation and styles
- [/components](https://github.com/mobilabsolutions/payment-sdk-dashboard-open/tree/master/components) Atomic design structure of Components
- [/hooks](https://github.com/mobilabsolutions/payment-sdk-dashboard-open/tree/master/hooks) react hooks / middleware and business logic
- [/pages](https://github.com/mobilabsolutions/payment-sdk-dashboard-open/tree/master/pages) entry points for the next.js app / check next.js documentation
- [/scripts](https://github.com/mobilabsolutions/payment-sdk-dashboard-open/tree/master/scripts) bash scripts for helper and build
- [/server](https://github.com/mobilabsolutions/payment-sdk-dashboard-open/tree/master/server) fastify backend (upstream, next.js, healthcheck)
- [/static](https://github.com/mobilabsolutions/payment-sdk-dashboard-open/tree/master/static) static files like fonts / image, css
- [/test_utils](https://github.com/mobilabsolutions/payment-sdk-dashboard-open/tree/master/test_utils) test helpers
