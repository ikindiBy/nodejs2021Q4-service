import Board from './board.model';
import { IBoardAPI, IBoard } from '../../interfaces';

const db: IBoard[] = [];

/**
 * Returns all boards from DB
 * @returns Array of objects type of Board
 */
export const getAll = async () => db;

/**
 * Returns a board from DB by ID
 * @param id id of Board in DB
 * @returns Promise type of Board or null
 */
export const getById = async (id: string): Promise<IBoard | null> => {
  const board = await db.find(boardItem => boardItem.id === id);
  if (board) {
    return board;
  }

  return null;
};

/**
 * Removes an index of Board in array db
 * @param id id of Board in DB
 * @returns Promise of board's index in db
 */
export const getIndexById = (id: string): number => db.findIndex(boardItem => boardItem.id === id);

/**
 * Removes a board from DB by index in array db
 * @param index index in array db
 * @returns Promise of removing's status
 */
export const deleteByIndex = async (index: number): Promise<boolean> => {
  await db.splice(index, 1);
  return true;
};

/**
 * Insert a new board into DB
 * @param data {object} type of Board
 * @returns Promise for created object of Board
 */
export const insertOne = async (data: IBoardAPI): Promise<IBoard> => {
  const newBoard = new Board({
    ...data,
    columns: data.columns || [],
  });

  await db.push(newBoard);

  return newBoard;
};

/**
 * Updates a board in DB by ID
 * @param id id of Board in DB
 * @param index index in array db
 * @param data {object} type of Board
 * @returns Promise for updated object of Board
 */
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
  deleteByIndex,
  insertOne,
  updateOne,
};
