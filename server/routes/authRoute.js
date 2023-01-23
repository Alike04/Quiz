const express = require("express");
const { login, register } = require("../services/authService");
const { generateToken } = require("../services/tokenService");
const catchAsync = require("../utils/catchAsync");

const route = express.Router();

route.post("/login", catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await login(email, password);
  const token = generateToken(user);
  return res.status(200).json({ token: token });
}));
route.post("/register", catchAsync(async (req, res) => {
  const user = await register(req.body);
  const token = await generateToken(user);
  return res.status(200).send({ token: token })
}));

module.exports = route;