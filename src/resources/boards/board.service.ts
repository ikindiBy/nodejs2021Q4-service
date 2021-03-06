import { boardsRepo } from './board.memory.repository';
import { tasksService } from '../tasks/task.service';
import { IBoardAPI, IBoard } from '../../interfaces';

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
  const index = await boardsRepo.getIndexById(id);
  if (index >= 0) {
    tasksService.deleteByBoardId(id);
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
export const insertOne = async (data: IBoardAPI): Promise<IBoard> => {

  const result = await boardsRepo.insertOne({
    ...data,
    columns: data.columns || [],
  });

  return result;
}

export const boardsService = {
  deleteById,
  getAll,
  getById,
  insertOne,
  updateOne,
 };
