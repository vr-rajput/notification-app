import User  from "../models/users.js";

export const findUserByUsername = async (username) => {
  return await User.findOne({ where: { username } });
};

export const createUser = async (username, password) => {
  return await User.create({ username, password });
};
