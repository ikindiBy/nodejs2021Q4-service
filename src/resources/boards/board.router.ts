 
import { FastifyInstance  } from 'fastify';
import { boardsService } from './board.service';
import { IBoardAPI, IFastifyParams, IFastifyBody } from '../../interfaces';

interface IParams {
  boardId: string;
}

const boardRoutes = async (fastify: FastifyInstance ) => {
  fastify.get('/boards', async () => {
    const boards = await boardsService.getAll();
    if (!boards) {
      throw new Error('No boards found')
    }
    return boards;
  });

  fastify.get<IFastifyParams<IParams>>('/boards/:boardId', async (request, reply) => {
    const boardId = request?.params?.boardId;
    if (boardId) {
      const board = await boardsService.getById(boardId);
      if (board) {
        return reply.status(200).send(board);
      }
    }
  
    return reply.status(404).send(new Error("Board doesn't exist"));
  });

  fastify.delete<IFastifyParams<IParams>>('/boards/:boardId', async (request, reply) => {
    const boardId = request?.params?.boardId;
    const result = await boardsService.deleteById(boardId);
    if (result) {
      return reply.status(200).send('Board deleted');
    }
    
    return reply.status(404).send(new Error("Board doesn't exist"));
  });

  const boardBodyJsonSchema = {
    type: 'object',
    properties: {
      name: { type: 'string' },
      login: { type: 'string' },
    },
  };

  const schema = {
    body: boardBodyJsonSchema,
  };

  fastify.post<IFastifyBody<IBoardAPI>>('/boards', { schema }, async (request, reply) => {
    const result = await boardsService.insertOne(request.body);
    return reply.status(201).send(result);
  });

  fastify.put<IFastifyBody<IBoardAPI> & IFastifyParams<IParams>>('/boards/:boardId', { schema }, async (request, reply) => {
    const boardId = request?.params?.boardId;
    const result = await boardsService.updateOne(boardId, request.body);
    return reply.status(200).send(result);
  });
}

export default boardRoutes;
