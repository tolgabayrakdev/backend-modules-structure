import 'dotenv/config';
import app from './app.js';
import { env } from './config/env.js';
import { db } from './config/db.js';

const start = async () => {
  await db.raw('SELECT 1');
  console.log('Database connected');

  app.listen(env.port, () => {
    console.log(`Server running on port ${env.port} [${env.nodeEnv}]`);
  });
};

start().catch((err) => {
  console.error('Failed to start server:', err.message);
  process.exit(1);
});
