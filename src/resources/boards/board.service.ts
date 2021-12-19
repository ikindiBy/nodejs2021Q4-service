import { boardsRepo } from './board.memory.repository';

import { IBoardAPI } from '../../interfaces';

/**
 * Returns all boards from DB
 * @returns All array of objects type of Board
 */
export const getAll = () => boardsRepo.getAll();

/**
 * Returns a board from DB by ID
 * @param id id of Board in DB
 * @returns object type of Board
 */
export const getById = (id: string) => boardsRepo.getById(id);

/**
 * Removes a board from DB by ID
 * @param id id of Board in DB
 * @returns status of removing
 */
export const deleteById = async (id: string) => {
  const index = boardsRepo.getIndexById(id);
  if (index >= 0) {
    return boardsRepo.deleteByIndex(index);
  }
  return false;
};

/**
 * Updates a board in DB by ID
 * @param id id of Board in DB
 * @param data {object} type of Board
 * @returns status of updating
 */
export const updateOne = (id: string, data: IBoardAPI) => {
  const index = boardsRepo.getIndexById(id);
  if (index >= 0) {
    return boardsRepo.updateOne(id, index, data);
  }
  return false;
};

/**
 * Insert a new board into DB
 * @param data {object} type of Board
 * @returns successfully created object of Board
 */
export const insertOne = (data: IBoardAPI) => boardsRepo.insertOne(data);

export const boardsService = {
  deleteById,
  getAll,
  getById,
  insertOne,
  updateOne,
 };
