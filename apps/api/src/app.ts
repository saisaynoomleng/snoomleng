import express, { type Express } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import env, { isTest } from './lib/env';
import morgan from 'morgan';

const app: Express = express();

app.use(helmet());
app.use(
  cors({
    origin: env.ALLOW_ORIGINS,
    credentials: true,
  }),
);

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

app.use((req, res) => {
  res.status(404).json({ message: 'Not Resources Found' });
});

export default app;
