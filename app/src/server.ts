import compression from 'compression';
import polka from 'polka';
import { handler } from '../build/handler.js';

const server = polka().use(
  compression({ threshold: 0 }),
  handler
);

const listenOpts = { path: '/', host: '0.0.0.0', port: 3000 };

server.listen(listenOpts, () => {
  console.log(`Listening on ${listenOpts}`);
});

export { server };
