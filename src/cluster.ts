import cluster from 'cluster';
import { cpus } from 'os';
import http from 'http';
import { createProxyServer } from 'http-proxy';

const numCPUs = cpus().length;
const PORT = Number(process.env.PORT) || 4000;

if (cluster.isPrimary) {
  for (let i = 1; i < numCPUs; i++) {
    cluster.fork({ PORT: PORT + i });
  }

  let current = 1;
  const proxy = createProxyServer();

  const server = http.createServer((req, res) => {
    const targetPort = PORT + current;
    proxy.web(req, res, { target: `http://localhost:${targetPort}` });
    current = current + 1 < numCPUs ? current + 1 : 1;
  });

  server.listen(PORT, () => {
    console.log(`Load balancer listening on port ${PORT}`);
    for (let i = 1; i < numCPUs; i++) {
      console.log(`Worker expected on port ${PORT + i}`);
    }
  });
} else {
   import('./index').then(({ createApp }) => {
    const app = createApp();
    const workerPort = Number(process.env.PORT) || 4000;
    app.listen({ port: workerPort, host: '0.0.0.0' }, (err, address) => {
      if (err) {
        app.log.error(err);
        process.exit(1);
      }
      console.log(`Worker listening at ${address}`);
    });
  });
}