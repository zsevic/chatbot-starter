export default () => ({
  COOKIE_SECRET: process.env.COOKIE_SECRET,
  DATABASE_URL:
    process.env.DATABASE_URL || 'mongodb://localhost:27017/chatbot-starter',
  PORT: process.env.PORT || 8080,
});
