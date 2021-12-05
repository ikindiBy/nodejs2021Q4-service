const User = require('./user.model');

const db = [];

const getAll = async () => db;

const insertOne = async (data) => {
  const newUser = new User(data);

  await db.push(newUser);

  return newUser;
};

module.exports = { getAll, insertOne };
