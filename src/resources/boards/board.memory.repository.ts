import Board from './board.model';
import { IBoardAPI } from '../../interfaces';

const db = [];

export const getAll = async () => db;

export const getById = (id: string) => {
  const board = db.find(boardItem => boardItem.id === id);
  return board;
};

export const checkExistingById = (id: string) => db.findIndex(boardItem => boardItem.id === id) >= 0;

export const getIndexById = (id: string) => db.findIndex(boardItem => boardItem.id === id);
 
export const deleteByIndex = async (index: number) => {
  await db.splice(index, 1);
  return true;
};

export const insertOne = async (data: IBoardAPI) => {
  const newBoard = new Board(data);

  await db.push(newBoard);

  return newBoard;
};

export const updateOne = async (id: string, index: number, data: IBoardAPI) => {
  const updatedBoard = {
    id,
    title: data.title,
    columns: data.columns,
  };

  await db.splice(index, 1, updatedBoard);

  return updatedBoard;
};

export const boardsRepo = {
  getAll,
  getById,
  getIndexById,
  checkExistingById,
  deleteByIndex,
  insertOne,
  updateOne,
};
