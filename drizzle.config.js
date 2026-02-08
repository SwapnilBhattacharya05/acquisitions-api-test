import 'dotenv/config';

export default {
  schema: './src/models/*.js', // Your schema file path
  out: './drizzle', // Your migrations folder
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
};
