const express = require("express")
const authorize = require("../middleware/authMiddleware");
const User = require("../models/User");
const { getResultsByQuiz, getResultsByUser, checkQuiz, getResultById } = require("../services/resultService")
const catchAsync = require("../utils/catchAsync")
const router = express.Router();

router.get("/user/:userId", authorize(), catchAsync(async (req, res) => {
  const result = await getResultsByUser(req.params.userId);
  return res.status(200).json({ result: result })
}))
router.get("/quiz/:quizId", authorize("teacher"), catchAsync(async (req, res) => {
  const result = await getResultsByQuiz(req.params.quizId);
  for (let i = 0; i < result.length; i++) {
    const user = await User.findById(result[i].user);
    result[i].user = user;
  }
  return res.status(200).json({ result: result })
}))
router.get("/:id", authorize(), catchAsync(async (req, res) => {
  const result = await getResultById(req.params.id);
  return res.status(200).json({ result: result });
}))
router.post("/", authorize("student"), catchAsync(async (req, res) => {
  const result = await checkQuiz(req.userData._id, req.body)
  return res.status(200).json({ result: result })
}))

module.exports = router;