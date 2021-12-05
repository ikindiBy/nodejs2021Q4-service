const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const getById = (id) => usersRepo.getById(id);

const deleteById = async (id) => {
  const index = usersRepo.getIndexById(id);
  if (index >= 0) {
    return usersRepo.deleteByIndex(index);
  }
  return false;
};

const updateOne = (id, data) => {
  const index = usersRepo.getIndexById(id);
  if (index >= 0) {
    return usersRepo.updateOne(id, index, data);
  }
  return false;
};

const insertOne = (data) => usersRepo.insertOne(data);

module.exports = { deleteById, getAll, getById, insertOne, updateOne };
