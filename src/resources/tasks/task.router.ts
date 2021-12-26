import { FastifyInstance } from 'fastify';
import { tasksService } from './task.service';
import { ITaskAPI, IFastifyParams, IFastifyBody } from '../../interfaces';
import NotFoundError from '../../errorHandler/NotFoundError';

interface IParams {
  boardId: string;
  taskId: string;
}

type IParamsPost = Omit<IParams, "taskId">;

const taskRoutes = async (fastify: FastifyInstance) => {
  fastify.get<IFastifyParams<IParams>>('/boards/:boardId/tasks', async (request) => {
    const boardId = request?.params?.boardId;
    const tasks = await tasksService.getAllByBoardId(boardId);
    if (!tasks) {
      throw new NotFoundError("Tasks don't found");
    }
    return tasks;
  });

  fastify.get<IFastifyParams<IParams>>('/boards/:boardId/tasks/:taskId', async (request, reply) => {
    const boardId = request?.params?.boardId;
    const taskId = request?.params?.taskId;
    if (boardId && taskId) {
      const task = await tasksService.getById({ boardId, taskId });

      if (task) {
        return reply.status(200).send(task);
      }
    }
  
    throw new NotFoundError("Task doesn't exist");
  });


  fastify.delete<IFastifyParams<IParams>>('/boards/:boardId/tasks/:taskId', async (request, reply) => {
    const boardId = request?.params?.boardId;
    const taskId = request?.params?.taskId;
    const result = await tasksService.deleteById({ boardId, taskId });
    if (result) {
      return reply.status(200).send('Task deleted');
    }
    
    throw new NotFoundError("Task doesn't exist");
  });

  const taskBodyJsonSchema = {
    type: 'object',
    properties: {
      title: { type: 'string' },
      userId: { type: 'string', nullable: true },
      boardId: { type: 'string' },
      columnId: { type: 'string', nullable: true },
      order: { type: 'number', nullable: true },
      description: { type: 'string', nullable: true },
    },
  };

  const schema = {
    body: taskBodyJsonSchema,
  };

  fastify.post<IFastifyParams<IParamsPost> & IFastifyBody<ITaskAPI>>('/boards/:boardId/tasks', { schema }, async (request, reply) => {
    const boardId = request?.params?.boardId;
    const result = await tasksService.insertOne(boardId, request.body);
    return reply.status(201).send(result);
  });

  fastify.put<IFastifyParams<IParams> & IFastifyBody<ITaskAPI>>('/boards/:boardId/tasks/:taskId', { schema }, async (request, reply) => {
    const boardId = request?.params?.boardId;
    const taskId = request?.params?.taskId;
    const result = await tasksService.updateOne({ boardId, taskId }, request.body);
    return reply.status(200).send(result);
  });
}

export default taskRoutes;
