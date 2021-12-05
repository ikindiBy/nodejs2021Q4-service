const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const insertOne = (data) => usersRepo.insertOne(data);

module.exports = { getAll, insertOne };
