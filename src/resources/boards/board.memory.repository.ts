import Board from './board.model';
import { IBoardAPI, IBoard } from '../../interfaces';

const db: IBoard[] = [];

export const getAll = async () => db;

export const getById = async (id: string): Promise<IBoard | null> => {
  const board = await db.find(boardItem => boardItem.id === id);
  if (board) {
    return board;
  }

  return null;
};

export const checkExistingById = async (id: string): Promise<boolean> => await db.findIndex(boardItem => boardItem.id === id) >= 0;

export const getIndexById = (id: string): number => db.findIndex(boardItem => boardItem.id === id);
 
export const deleteByIndex = async (index: number): Promise<boolean> => {
  await db.splice(index, 1);
  return true;
};

export const insertOne = async (data: IBoardAPI): Promise<IBoard> => {
  const newBoard = new Board({
    ...data,
    columns: data.columns || [],
  });

  await db.push(newBoard);

  return newBoard;
};

export const updateOne = async (id: string, index: number, data: IBoardAPI): Promise<IBoard> => {
  const updatedBoard = {
    id,
    title: data.title,
    columns: data.columns || [],
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
