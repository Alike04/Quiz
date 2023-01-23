const express = require("express")
const auth = require("../middleware/authMiddleware")
const { getQuizById, getQuizzes, createQuiz } = require("../services/quizService");
const { getResultsByUser } = require("../services/resultService");
const catchAsync = require("../utils/catchAsync");

const router = express.Router();

router.get("/", auth(), catchAsync(async (req, res) => {
  const quizzes = await getQuizzes()
  const results = await getResultsByUser(req.userData._id)
  res.status(200).json({ quizzes: quizzes, results: results })
}))

router.get("/:id", auth(), catchAsync(async (req, res) => {
  const quiz = await getQuizById(req.params.id);
  res.status(200).json({ quiz: quiz });
}))
router.post("/", auth("teacher"), catchAsync(async (req, res) => {
  await createQuiz(req.body)
  res.status(200).json({ message: "success" });
}))

module.exports = router;