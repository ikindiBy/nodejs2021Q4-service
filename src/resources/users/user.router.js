const User = require('./user.model');
const usersService = require('./user.service');

async function routes (fastify) {
  fastify.get('/users', async () => {
    const users = await usersService.getAll();
    if (!users) {
      throw new Error('No users found')
    }
    return users.map(userItem => User.toResponse(userItem));
  })

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
  }

  fastify.post('/users', { schema }, async (request) => {
    const result = await usersService.insertOne(request.body)
    return User.toResponse(result);
  })
}

module.exports = routes
