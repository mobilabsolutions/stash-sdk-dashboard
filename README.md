# payment sdk dashboard

Provides a Web Dashboard for the Payment SDK

## Requirements

- node (10+ recommended)
- Docker

## Installation requirements on macOS

```bash
brew install node
brew install docker
```

## Development

```bash
git clone git@github.com:mobilabsolutions/payment-sdk-dashboard-open
npm install
npm run dev
```

## Docker

To run it in docker

```bash
npm run docker
```

## Deployment

- done through travis script

## Environment Keys

- PORT (default 3000)
- API_UPSTREAM (default https://pd.mblb.net)
- NODE_ENV (production|development|test) do not change, set by package.json scripts

## Helpful scripts

Just run

```bash
npm run
```

to get an overview

## Build with

- next.js
- react
- styled-components
- fastify

### other components

- react-dates (date)

## folder structure

- /asserts translation and styles

- /components Atomic design structure of Components

- /hooks react hooks / middleware and business logic

- /pages entry points for the next.js app / check next.js documentation

- /scripts bash scripts for helper and build

- /server fastify backend (upstream, next.js, healthcheck)

- /static static files like fonts / image, css

- /static_utils test helpers
