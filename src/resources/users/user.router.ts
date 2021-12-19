// import { FastifyInstance } from 'fastify';
import { usersService } from './user.service';


//  const userRoutes = async (fastify: FastifyInstance) => {
const userRoutes = async (fastify) => {
  fastify.get('/users', async () => {
    const users = await usersService.getAll();
    if (!users) {
      throw new Error('No users found')
    }
    return users;
  });

  fastify.get('/users/:userId', async (request, reply) => {
    const userId = request?.params?.userId;
    if (userId) {
      const user = await usersService.getById(userId);

      return reply.status(200).send(user);
    }
  
    return null;
  });

  const deleteSchema = {
    params: {
      userId: { type: 'string' },
    },
  };

  fastify.delete('/users/:userId', deleteSchema, async (request, reply) => {
    const userId = request?.params?.userId;
    const result = await usersService.deleteById(userId);
    if (result) {
      return reply.status(200).send('User deleted');
    }
    
    return reply.status(404).send(new Error("User doesn't exist"));
  });

  const userBodyJsonSchema = {
    type: 'object',
    required: ['name'],
    properties: {
      name: { type: 'string' },
      login: { type: 'string' },
      password: { type: 'string' },
    },
  };

  const schema = {
    body: userBodyJsonSchema,
  };

  fastify.post('/users', { schema }, async (request, reply) => {
    const result = await usersService.insertOne(request.body);
    return reply.status(201).send(result);
  });

  fastify.put('/users/:userId', { schema }, async (request, reply) => {
    const userId = request?.params?.userId;
    const result = await usersService.updateOne(userId, request.body);
    return reply.status(200).send(result);
  });
}

export default userRoutes;
