import User from './user.model';
import { IUserAPI, IUser, IUserApiResponse } from '../../interfaces';

const db: IUser[] = [];

const getWithoutPassword = ({ password, ...rest}: IUser): IUserApiResponse => rest;

const getAll = async (): Promise<IUserApiResponse[]> => await db.map(getWithoutPassword);

const getById = async (id: string): Promise<IUserApiResponse | null> => {
  const user = await db.find(userItem => userItem.id === id);
  if (user) {
    return getWithoutPassword(user);
  }

  return null;
};

const checkExistingById = async (id: string): Promise<boolean>  => await db.findIndex(userItem => userItem.id === id) >= 0;

const getIndexById = async (id: string): Promise<number>  => await db.findIndex(userItem => userItem.id === id);
 
const deleteByIndex = async (index: number): Promise<boolean> => {
  await db.splice(index, 1);
  return true;
};

const insertOne = async (data: IUserAPI): Promise<IUserApiResponse> => {
  const newUser = new User(data);

  await db.push(newUser);

  return getWithoutPassword(newUser);;
};

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
  checkExistingById,
  updateOne,
};
