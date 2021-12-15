const Board = require('./board.model');

const db = [];

const getAll = async () => db;

const getById = (id) => {
  const board = db.find(boardItem => boardItem.id === id);
  return board;
};

const checkExistingById = id => db.findIndex(boardItem => boardItem.id === id) >= 0;
const getIndexById = id => db.findIndex(boardItem => boardItem.id === id);
 
const deleteByIndex = async (index) => {
  await db.splice(index, 1);
  return true;
};

const insertOne = async (data) => {
  const newBoard = new Board(data);

  await db.push(newBoard);

  return newBoard;
};

const updateOne = async (id, index, data) => {
  const updatedBoard = {
    id,
    title: data.title,
    columns: data.columns,
  };

  await db.splice(index, 1, updatedBoard);

  return updatedBoard;
};

module.exports = {
  deleteByIndex,
  getAll,
  getById,
  getIndexById,
  insertOne,
  checkExistingById,
  updateOne,
};
