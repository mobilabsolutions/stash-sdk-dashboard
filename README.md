[![travis-ci.com](https://travis-ci.com/mobilabsolutions/stash-sdk-dashboard.svg?token=1TXB69xLKwUo1aProyxt&branch=master)](https://travis-ci.com/mobilabsolutions/stash-sdk-dashboard) [![TypeScript](https://badges.frapsoft.com/typescript/version/typescript-next.svg?v=101)](https://www.typescriptlang.org/) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/) [![style: styled-components](https://img.shields.io/badge/style-%F0%9F%92%85%20styled--components-orange.svg?colorB=daa357&colorA=db748e)](https://github.com/styled-components/styled-components)

# Stash! SDK Dashboard

Provides a web dashboard for the Stash! SDK.

## Features

- Displays transactions
- Filter by date, status, payment method and reason
- Paging, if too many results
- Display a detailed view of transactions
- [Transaction actions](https://github.com/mobilabsolutions/payment-sdk-dashboard-open/wiki/Transaction-actions)
  - Refund of "authorised" and "captured" Transactions
  - Capture of "pre-authorised" transactions
  - Reverse of "pre-authorised" transactions


## Requirements

- node.js 10+
- Docker

## Development

```bash
git clone git@github.com:mobilabsolutions/payment-sdk-dashboard-open
cd payment-sdk-dashboard-open
npm install
npm run dev
open http://localhost:3000/
```

## Testing

```bash
npm run test        #all test (lint, type, jest)
npm run lint        #run eslint
npm run typescript  #run type checker
npm run jest        #run all jest test
npm run jest:watch  #run all jest test that are effected by a change
```

## Dependencies

```bash
npm run updtr       # checks for outdated dependencies, updates them if tests do not fail
```

## Docker

```bash
npm run docker
npm run docker:stop # to stop
```

## Deployment

Run one of the following scripts to create a new Version

```bash
npm run version:patch
npm run version:minor
npm run version:major
```

### Environment Keys

- PORT (default 3000)
- API_UPSTREAM
- NODE_ENV (production|development|test) do not change, set by package.json scripts
- SDK_ENV (production|development)

### Built with

- [typescript](https://www.typescriptlang.org/) (Language)
- [next.js](https://nextjs.org/) (SSR Framework)
- [react](https://reactjs.org/) (View Lib)
- [styled-components](https://www.styled-components.com/) (css Lib)
- [jest](https://jestjs.io/) (Testing Framework)
- [fastify](https://www.fastify.io/) (Webserver)
- [docker](https://www.docker.com/) (alpine-node)

### Other Components

- [react-dates](https://github.com/airbnb/react-dates) (Date Range Picker)
- [react-table](https://github.com/react-tools/react-table) (Lightweight, fast and extendable datagrids)
- [formik](https://github.com/jaredpalmer/formik) (Assistant for building forms in React)
- [react-select](https://github.com/JedWatson/react-select) (Select control for React.)
- [react-number-format](https://github.com/s-yadav/react-number-format) (React component to format number in an input or as a text, useful for currency formats)

### Folder Structure

- [/asserts](https://github.com/mobilabsolutions/payment-sdk-dashboard-open/tree/master/assets) translation and styles
- [/components](https://github.com/mobilabsolutions/payment-sdk-dashboard-open/tree/master/components) Home of [Atomic design structure](http://atomicdesign.bradfrost.com/table-of-contents/) of Components
- [/hooks](https://github.com/mobilabsolutions/payment-sdk-dashboard-open/tree/master/hooks) react [hooks](https://reactjs.org/docs/hooks-intro.html), middleware and business logic
- [/k8s](https://github.com/mobilabsolutions/payment-sdk-dashboard-open/tree/master/k8s) Kubernetes configs and scripts
- [/pages](https://github.com/mobilabsolutions/payment-sdk-dashboard-open/tree/master/pages) entry points for the [next.js](https://nextjs.org/) app / check next.js documentation
- [/scripts](https://github.com/mobilabsolutions/payment-sdk-dashboard-open/tree/master/scripts) bash scripts for helper and build
- [/server](https://github.com/mobilabsolutions/payment-sdk-dashboard-open/tree/master/server) fastify backend (upstream, next.js, healthcheck)
- [/static](https://github.com/mobilabsolutions/payment-sdk-dashboard-open/tree/master/static) static files like fonts, images and css
- [/test_utils](https://github.com/mobilabsolutions/payment-sdk-dashboard-open/tree/master/test_utils) test helpers
