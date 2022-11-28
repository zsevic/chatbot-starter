# chatbot-starter

> Telegram chatbot starter

## Getting started

### Prerequisites

- Node.js installed (version 18)
- Configured Telegram bot on the Telegram app

### Setup

```bash
git clone https://github.com/zsevic/chatbot-starter
cd chatbot-starter
cp .env.sample .env # change values after copying
npm i
docker-compose up
npm run start:dev
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
