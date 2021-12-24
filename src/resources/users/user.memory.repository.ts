import User from './user.model';
import { IUserAPI, IUser, IUserApiResponse } from '../../interfaces';

const db: IUser[] = [];

/**
 * Returns all users from DB
 * @param {object} type of User
 * @returns {object}  type of User without password field
 */
const getWithoutPassword = ({ password, ...rest}: IUser): IUserApiResponse => rest;

/**
 * Returns all users from DB
 * @returns Array of objects type of User
 */
const getAll = (): IUserApiResponse[] => db.map(getWithoutPassword);

/**
 * Returns an user from DB by ID
 * @param id id of User in DB
 * @returns object type of User or null
 */
const getById = (id: string): IUserApiResponse | null => {
  const user = db.find(userItem => userItem.id === id);
  if (user) {
    return getWithoutPassword(user);
  }

  return null;
};

/**
 * Returns a user from DB by ID
 * @param id id of User in DB
 * @returns Promise of user's index in array db
 */
const getIndexById = (id: string): number  => db.findIndex(userItem => userItem.id === id);

/**
 * Removes an user from DB by ID
 * @param id id of User in DB
 * @returns Promise removing's status
 */
const deleteByIndex = async (index: number): Promise<boolean> => {
  await db.splice(index, 1);
  return true;
};

/**
 * Insert a new user into DB
 * @param data {object} type of User
 * @returns created object of User without password field
 */
const insertOne = (data: IUserAPI): IUserApiResponse => {
  const newUser = new User(data);

  db.push(newUser);

  return getWithoutPassword(newUser);
};

/**
 * Updates an user in DB by ID
 * @param id id of User in DB
 * @param index index in array db
 * @param data {object} type of User
 * @returns Promise with updated object of User without password field
 */
const updateOne = async (id: string, index: number, data: IUserAPI): Promise<IUserApiResponse> => {
  const updatedUser = {
    id,
    name: data.name,
    login: data.login,
    password: data.password,
  };

  await db.splice(index, 1, updatedUser);

  return getWithoutPassword(updatedUser);
};

export const usersRepo = {
  deleteByIndex,
  getAll,
  getById,
  getIndexById,
  insertOne,
  updateOne,
};
