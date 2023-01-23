const User = require("../models/User")
const ApiError = require("../utils/ApiError")


const createUser = async (body) => {
  const result = await User.isEmailTaken(body.email);
  if (result) {
    throw new ApiError(400, "Email is already taken");
  }
  return User.create(body);
}

const getUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new ApiError(404, "User is not found")
  }
  return user;
}

const getUserByEmail = async (email) => {
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new ApiError(404, "User is not found")
  }
  return user;
}

module.exports = { createUser, getUserByEmail, getUserById };