import application from './app';
import { PORT } from './common/config';

const fastify = application();

const start = async () => {
  try {
    await fastify.listen(PORT);
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
};

start();