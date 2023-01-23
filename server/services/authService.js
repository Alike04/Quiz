const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User")
const { getUserByEmail, getUserById, createUser } = require("./userService");
const ApiError = require("../utils/ApiError");
require("dotenv").config();

const register = async (userBody) => {
  let password = userBody.password;
  password = await bcrypt.hash(password, 10);
  userBody.password = password;
  const result = await User.isEmailTaken(userBody.email);
  if (result) {
    throw new ApiError(400, "Email is already taken");
  }
  const user = await User.create(userBody);
  user.role = "student";
  return user;
};
const login = async (email, password) => {
  const user = await getUserByEmail(email);
  const result = await bcrypt.compare(password, user.password);
  if (result) {
    return user;
  } else {
    throw new ApiError(400, "Authorization fail");
  }
};


module.exports = { register, login };
