import express, { type Express } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import env, { isTest } from './lib/env.js';
import morgan from 'morgan';

import { toNodeHandler } from 'better-auth/node';
import { auth } from './lib/auth.js';

import ContactRouter from './modules/contacts/contacts.router.js';

const app: Express = express();

app.use(
  cors({
    origin: env.ALLOW_ORIGINS.split(','),
    credentials: true,
  }),
);
app.all('/api/auth/{*any}', toNodeHandler(auth));
app.use(helmet());

app.use(
  morgan('dev', {
    skip: () => isTest(),
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// health check
app.get('/health-check', (req, res) => {
  res.status(200).json({ message: 'Health OK' });
});

// routes
app.use('/api/contacts', ContactRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'No Resources Found' });
});

export default app;
