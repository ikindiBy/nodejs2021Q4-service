import { usersRepo } from './user.memory.repository';
import { IUserAPI } from '../../interfaces';

const getAll = async () => await usersRepo.getAll();

const getById = async (id) => await usersRepo.getById(id);

const deleteById = async (id: string) => {
  const index = await usersRepo.getIndexById(id);
  if (index >= 0) {
    return usersRepo.deleteByIndex(index);
  }
  return false;
};

const updateOne = async (id: string, data: IUserAPI) => {
  const index = await usersRepo.getIndexById(id);
  if (index >= 0) {
    return usersRepo.updateOne(id, index, data);
  }
  return false;
};

const insertOne = async (data: IUserAPI) => await usersRepo.insertOne(data);

export const usersService = {
  deleteById,
  getAll,
  getById,
  insertOne,
  updateOne,
};
