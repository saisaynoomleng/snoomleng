import express from 'express';
import http from 'node:http';

const app = express();
const server = http.createServer(app);

app.get('/health-check', (req, res) => {
  res.json({ message: 'health check' });
});

server.listen(8000, () => console.log('server is listening on port: 8000'));
