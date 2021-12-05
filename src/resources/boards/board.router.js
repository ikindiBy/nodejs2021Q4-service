const boardsService = require('./board.service');

async function routes (fastify) {
  fastify.get('/boards', async () => {
    const boards = await boardsService.getAll();
    if (!boards) {
      throw new Error('No boards found')
    }
    return boards;
  });

  fastify.get('/boards/:boardId', async (request, reply) => {
    const boardId = request?.params?.boardId;
    if (boardId) {
      const board = await boardsService.getById(boardId);

      return reply.status(200).send(board);
    }
  
    return reply.status(404).send(new Error("Board doesn't exist"));
  });

  const deleteSchema = {
    params: {
      userId: { type: 'string' },
    },
  };

  fastify.delete('/boards/:boardId', deleteSchema, async (request, reply) => {
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

  fastify.post('/boards', { schema }, async (request, reply) => {
    const result = await boardsService.insertOne(request.body);
    return reply.status(201).send(result);
  });

  fastify.put('/boards/:boardId', { schema }, async (request, reply) => {
    const boardId = request?.params?.boardId;
    const result = await boardsService.updateOne(boardId, request.body);
    return reply.status(200).send(result);
  });
}

module.exports = routes
