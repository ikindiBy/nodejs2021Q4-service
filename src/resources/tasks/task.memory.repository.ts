import Task from './task.model';
import { ITask, ITaskAPI } from '../../interfaces';

const db: ITask[] = [];

/**
 * Returns all tasks with concrete board ID from DB
 * @param boardId id of Board
 * @returns Array of objects type of Task
 */
export const getAllByBoardId = async (boardId: string) => db.filter(taskItem => taskItem.boardId === boardId);

/**
 * Returns a board from DB by ID
 * @param boardId id of Board
 * @param taskId id of Task in DB
 * @returns Promise of object type of Task
 */
export const getById = async ({ boardId, taskId }: {boardId: string, taskId: string}): Promise<ITask | null> => {
  const task = await db.find(taskItem => taskItem.id === taskId && taskItem.boardId === boardId);
  if (task) {
    return task;
  }

  return null;
};

/**
 * Returns a board from DB by ID
 * @param boardId id of Board
 * @param taskId id of Task in DB
 * @returns Promise of task's index in array db
 */
export const getIndexById = ({ boardId, taskId }: { boardId: string, taskId: string }): number => db.findIndex(taskItem => taskItem.id === taskId && taskItem.boardId === boardId);

/**
 * Removes a task from DB by index in array db
 * @param index index of Task in array DB
 * @returns Promise removing's status
 */
export const deleteByIndex = async (index: number): Promise<boolean> => {
  await db.splice(index, 1);
  return true;
};

/**
 * Removes tasks from DB by board ID
 * @param boardId id of Board
 * @returns Promise removing's status
 */
export const deleteByBoardId = async (boardId: string): Promise<boolean> => {

  let i = 0;
  while (i < db.length) {
    if (db[i].boardId === boardId) {
      db.splice(i, 1);
    } else {
      i += 1;
    }
  }

  return true;
};

/**
 * Insert a new board into DB
 * @param data {object} type of Task
 * @returns successfully created object of Task
 */
export const insertOne = async (data: ITaskAPI): Promise<ITask> => {
  const newTask = new Task(data);

  await db.push(newTask);

  return newTask;
};

/**
 * Updates a task in DB by ID
 * @param id id of Task in DB
 * @param index index in array db
 * @param data {object} type of Task
 * @returns Promise with updated object of Task
 */
export const updateOne = async (id: string, index: number, data: ITaskAPI): Promise<ITask> => {
  const updatedTask = {
    id,
    ...data,
  };

  await db.splice(index, 1, updatedTask);

  return updatedTask;
};

/**
 * Unassign task in DB by ID of User
 * @param userId id of User
 * @returns Promise of status completing
 */
export const unassignByUserId = async (userId: string): Promise<boolean> => {
  let i = 0;
  while (i < db.length) {
    if (db[i].userId === userId) {
      const taskByUser = db.find(taskItem => taskItem.userId === userId);
      if (taskByUser) {
        const updatedTask = {
          ...taskByUser,
          userId: null
        };
        db.splice(i, 1, updatedTask);
      }
    } else {
      i += 1;
    }
  }

  return true;
};



export const taskRepo = {
  getAllByBoardId,
  getById,
  getIndexById,
  deleteByIndex,
  deleteByBoardId,
  insertOne,
  unassignByUserId,
  updateOne,
};
