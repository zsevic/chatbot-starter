# chatbot-starter

> Chatbot starter

## Getting started

### Prerequisites

- Node.js installed (version 14)
- Local MongoDB database

### Setup

* Local setup

```bash
git clone https://github.com/zsevic/chatbot-starter
cd chatbot-starter
cp .env.sample .env # change values after copying
npm i
mongod --dbpath=mongodb/data
npm run start:dev
```

* Chatbot setup for local usage

```bash
npx ngrok http 3000
npm run messenger-webhook:set <URL>/webhooks/messenger
```

### Build

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
npm run lint:fix
```

### Testing

```bash
npm test
npm run test:e2e
```

### API documentation

Generated at `/api-docs` endpoint

### Technologies used

- Node.js, TypeScript, NestJS, Mongoose, Bottender
