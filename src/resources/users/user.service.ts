import { usersRepo } from './user.memory.repository';
import { IUserAPI, IUserApiResponse } from '../../interfaces';

const getAll = (): IUserApiResponse[] =>  usersRepo.getAll();

const getById = (id): IUserApiResponse | null => usersRepo.getById(id);

const deleteById = (id: string) => {
  const index = usersRepo.getIndexById(id);
  if (index >= 0) {
    return usersRepo.deleteByIndex(index);
  }
  return false;
};

const updateOne = (id: string, data: IUserAPI) => {
  const index = usersRepo.getIndexById(id);
  if (index >= 0) {
    return usersRepo.updateOne(id, index, data);
  }
  return false;
};

const insertOne = (data: IUserAPI): IUserApiResponse => usersRepo.insertOne(data);

export const usersService = {
  deleteById,
  getAll,
  getById,
  insertOne,
  updateOne,
};
