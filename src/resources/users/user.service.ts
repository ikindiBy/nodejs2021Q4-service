import { usersRepo } from './user.memory.repository';
import { tasksService } from '../tasks/task.service';
import { IUserAPI, IUserApiResponse } from '../../interfaces';

/**
 * Returns all users from DB
 * @returns Array of objects type of User
 */
const getAll = (): IUserApiResponse[] =>  usersRepo.getAll();

/**
 * Returns an user from DB by ID
 * @param id id of User in DB
 * @returns object type of User
 */
const getById = (id: string): IUserApiResponse | null => usersRepo.getById(id);

/**
 * Removes an user from DB by ID
 * @param id id of User in DB
 * @returns status of removing
 */
const deleteById = (id: string) => {
  const index = usersRepo.getIndexById(id);
  if (index >= 0) {
    tasksService.unassignByUserId(id);
    return usersRepo.deleteByIndex(index);
  }
  return false;
};

/**
 * Updates an user in DB by ID
 * @param id id of User in DB
 * @param data {object} type of User
 * @returns status of updating
 */
const updateOne = (id: string, data: IUserAPI) => {
  const index = usersRepo.getIndexById(id);
  if (index >= 0) {
    return usersRepo.updateOne(id, index, data);
  }
  return false;
};

/**
 * Insert a new user into DB
 * @param data {object} type of User
 * @returns successfully created object of User
 */
const insertOne = (data: IUserAPI): IUserApiResponse => usersRepo.insertOne(data);

export const usersService = {
  deleteById,
  getAll,
  getById,
  insertOne,
  updateOne,
};
