# messenger-chatbot-starter

> Messenger chatbot starter

## Getting started

### Prerequisites

- Node version 14
- Local PostgreSQL database

### Setup

* Local setup

```bash
git clone https://github.com/zsevic/messenger-chatbot-starter
cd messenger-chatbot-starter
cp .env.sample .env # change values after copying
npm i
pg_ctl -D /usr/local/var/postgres restart
npm run start:dev
```

* Chatbot setup for local usage

```bash
ngrok http 3000
npm run start:dev
```
Change webhook callback URL with the given ngrok Forwarding https value and validate it inside Messenger/Settings section - https://developers.facebook.com/apps/<FB_APP_ID>/messenger/settings/

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

### Migrations

```bash
npm run migration:generate <MIGRATION_NAME>
npm run migrate
npm run migrate:down
```

### API documentation

Generated at `/api-docs` endpoint

### Technologies used

- Node.js, TypeScript, NestJS, TypeORM, BootBot
