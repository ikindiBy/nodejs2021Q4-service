const User = require('./user.model');

const db = [];

const getAll = async () => db;

const getById = (id) => {
  const user = db.find(userItem => userItem.id === id);
  return user;
};

const checkExistingById = id => db.findIndex(userItem => userItem.id === id) >= 0;
const getIndexById = id => db.findIndex(userItem => userItem.id === id);
 
const deleteByIndex = async (index) => {
  await db.splice(index, 1);
  return true;
};

const insertOne = async (data) => {
  const newUser = new User(data);

  await db.push(newUser);

  return newUser;
};

const updateOne = async (id, index, data) => {
  const updatedUser = {
    id,
    name: data.name,
    login: data.login,
    password: data.password,
  };

  await db.splice(index, 1, updatedUser);

  return updatedUser;
};

module.exports = { deleteByIndex, getAll, getById, getIndexById, insertOne, checkExistingById, updateOne };
