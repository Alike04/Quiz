const mongoose = require("mongoose")

const responseSchema = new mongoose.Schema({
  question: { type: String },
  option1: { type: String },
  option2: { type: String },
  option3: { type: String },
  option4: { type: String },
  correct: { type: Number },
  selected: { type: Number },
  isCorrect: { type: Boolean },
})

const resultSchema = new mongoose.Schema({
  quiz: { type: mongoose.Types.ObjectId, ref: "quiz" },
  user: { type: mongoose.Types.ObjectId, ref: "user" },
  score: { type: Number },
  responses: { type: [responseSchema] },
})

module.exports = mongoose.model("result", resultSchema)