const Result = require("../models/Result")
const { getQuizById } = require("../services/quizService");
const ApiError = require("../utils/ApiError");

const checkQuiz = async (userId, body) => {
  const isExists = await isResultExists(userId, body.quizId);
  if (isExists) {
    throw new ApiError(400, "Quiz have been already passed")
  }
  const quiz = await getQuizById(body.quizId);
  let result = { responses: [] };
  let score = 0;
  result.quiz = body.quizId;
  result.user = userId;

  for (let i = 0; i < quiz.questions.length; i++) {
    let response = {};
    const question = quiz.questions[i];
    response.correct = question.answer;
    response.selected = body.answer[i];
    response.option1 = question.option1;
    response.option2 = question.option2;
    response.option3 = question.option3;
    response.option4 = question.option4;
    response.question = question.question;
    if (question.answer == response.selected) {
      score++;
      response.isCorrect = true;
    }
    else {
      response.isCorrect = false;
    }
    result.score = score;
    result.responses.push(response)
  }
  const entity = await Result.create(result);
  return entity;
}

const getResultsByUser = async (userId) => {
  const results = await Result.find({ user: userId });
  return results;
}

const getResultById = async (id) => {
  const result = await Result.findById(id);
  if (!result) throw new ApiError(404, "result is not found")
  return result
}

const isResultExists = async (userId, quizId) => {
  const result = await Result.find({ user: userId, quiz: quizId })
  if (result.length !== 0) return true;
  return false;
}

const getResultsByQuiz = async (quizId) => {
  const results = await Result.find({ quiz: quizId });
  return results;
}

module.exports = { checkQuiz, getResultsByQuiz, getResultsByUser, getResultById }