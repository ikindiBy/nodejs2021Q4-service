import { FastifyInstance } from 'fastify';
import { usersService } from './user.service';
import { IUserAPI, IFastifyParams, IFastifyBody } from '../../interfaces';
import NotFoundError from '../../errorHandler/NotFoundError';

interface IParams {
  userId: string;
}

const userRoutes = async (fastify: FastifyInstance) => {
  fastify.get('/users', async () => {
    const users = await usersService.getAll();
    if (!users) {
      throw new Error('No users found')
    }
    return users;
  });

  fastify.get<IFastifyParams<IParams>>('/users/:userId', async (request, reply) => {
    const userId = request?.params?.userId;
    if (userId) {
      const user = await usersService.getById(userId);

      return reply.status(200).send(user);
    }
  
    return null;
  });

  fastify.delete<IFastifyParams<IParams>>('/users/:userId', async (request, reply) => {
    const userId = request?.params?.userId;
    const result = await usersService.deleteById(userId);
    if (result) {
      return reply.status(200).send('User deleted');
    }
    
    throw new NotFoundError("User doesn't exist");
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

  fastify.post<IFastifyBody<IUserAPI>>('/users', { schema }, async (request, reply) => {
    const result = await usersService.insertOne(request.body);
    return reply.status(201).send(result);
  });

  fastify.put<IFastifyParams<IParams> & IFastifyBody<IUserAPI>>('/users/:userId', { schema }, async (request, reply) => {
    const userId = request?.params?.userId;
    const result = await usersService.updateOne(userId, request.body);
    return reply.status(200).send(result);
  });
}

export default userRoutes;
