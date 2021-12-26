import { taskRepo } from './task.memory.repository';
import { ITaskAPI, ITask } from '../../interfaces';

/**
 * Returns all boards from DB
 * @param boardId id of Board in DB
 * @returns All array of objects type of Task
 */
export const getAllByBoardId = (boardId: string) => taskRepo.getAllByBoardId(boardId);

/**
 * Returns a board from DB by ID
 * @param boardId id of Board in DB
 * @param taskId id of Task in DB
 * @returns object type of Task
 */
export const getById = ({boardId, taskId}: {boardId: string, taskId: string}) => taskRepo.getById({ boardId, taskId });

/**
 * Removes a task from DB by index in array db
 * @param boardId id of Board in DB
 * @param taskId id of Task in DB
 * @returns status of removing
 */
export const deleteById = async ({ boardId, taskId }: { boardId: string, taskId: string }) => {
  const index = await taskRepo.getIndexById({ boardId, taskId });
  if (index >= 0) {
    return taskRepo.deleteByIndex(index);
  }
  return false;
};

/**
 * Removes tasks from DB by board ID
 * @param boardId id of Board in DB
 * @returns status of removing
 */
 export const deleteByBoardId = async (boardId: string) => taskRepo.deleteByBoardId(boardId);

/**
 * Updates a board in DB by ID
 * @param id id of Board in DB
 * @param data {object} type of Board
 * @returns status of updating
 */
export const updateOne = (
  {boardId, taskId}: {boardId: string, taskId: string},
  data: ITaskAPI) => {
  const index = taskRepo.getIndexById({ boardId, taskId });
  if (index >= 0) {
    return taskRepo.updateOne(taskId, index, data);
  }
  return false;
};

/**
 * Insert a new board into DB
 * @param boardId id of existing Board
 * @param data {object} type of Board
 * @returns successfully created object of Task
 */
export const insertOne = async (boardId: string, data: ITaskAPI): Promise<ITask> => {

  const result = await taskRepo.insertOne({
    ...data,
    boardId,
  });

  return result;
}

/**
 * Updates a board in DB by ID
 * @param userId id of User in DB
 * @returns status of updating
 */
 export const unassignByUserId = async (userId: string): Promise<boolean> => taskRepo.unassignByUserId(userId);

export const tasksService = {
  deleteById,
  deleteByBoardId,
  getAllByBoardId,
  getById,
  insertOne,
  unassignByUserId,
  updateOne,
 };
