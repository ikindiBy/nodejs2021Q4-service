const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();

const getById = (id) => boardsRepo.getById(id);

const deleteById = async (id) => {
  const index = boardsRepo.getIndexById(id);
  if (index >= 0) {
    return boardsRepo.deleteByIndex(index);
  }
  return false;
};

const updateOne = (id, data) => {
  const index = boardsRepo.getIndexById(id);
  if (index >= 0) {
    return boardsRepo.updateOne(id, index, data);
  }
  return false;
};

const insertOne = (data) => boardsRepo.insertOne(data);

module.exports = {
  deleteById,
  getAll,
  getById,
  insertOne,
  updateOne,
 };
