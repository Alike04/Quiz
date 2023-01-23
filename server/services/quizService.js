const Quiz = require("../models/Quiz")
const ApiError = require("../utils/ApiError")

const createQuiz = async (body) => {
  const quiz = await Quiz.create(body);
  return quiz;
}

const getQuizById = async (id) => {
  const quiz = await Quiz.findById(id);
  if (!quiz) {
    throw new ApiError(404, "quiz is not found")
  }
  return quiz
}
const getQuizzes = async () => {
  const quizzes = await Quiz.find({});
  if (quizzes.length === 0) {
    throw new ApiError(404, "quiz is not found")
  }
  return quizzes;
}
module.exports = { createQuiz, getQuizById, getQuizzes }