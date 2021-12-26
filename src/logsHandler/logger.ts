import { FastifyInstance } from 'fastify';
import pino from 'pino';

import { LOG_STATUS } from '../common/config';

export const loggerConfig = pino({
  transport: {
    targets: [
      {
        level: LOG_STATUS as pino.LevelWithSilent,
        target: 'pino-pretty',
        options: {
          destination: './logs/infoLogs.log',
          colorize: true,
          req: {
            method: 'string',
            url: 'string',
            remoteAddress: 'string',
            raw: 'string',
          },
        }
      },
      {
        level: 'error',
        target: 'pino-pretty',
        options: {
          destination: './logs/errorsLogs.log',
          colorize: true,
          req: {
            method: 'string',
            url: 'string',
            remoteAddress: 'string',
            raw: 'string',
          },
        }
      }
    ],
  },
});

export const logParamsAndBody = (server: FastifyInstance): void => {
  server.addHook('preHandler', (req, reply, done) => {
    if (req.body) {
      req.log.info({ body: req.body }, 'parsed body')
    }
    if (req.params) {
      req.log.info({ params: req.params }, 'parsed params')
    }
    done()
  });
}