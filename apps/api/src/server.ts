import app from './app';
import http from 'node:http';
import env from './lib/env';

export const server = http.createServer(app);

server.listen(env.PORT, () =>
  console.log(`Server is listening on PORT: ${env.PORT}`),
);
