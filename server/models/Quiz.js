const mongoose = require("mongoose")

const questionSchema = mongoose.Schema({
  question: { type: String },
  option1: { type: String },
  option2: { type: String },
  option3: { type: String },
  option4: { type: String },
  answer: { type: Number }
})
const quizSchema = mongoose.Schema({
  title: { type: String },
  questions: { type: [questionSchema] }
})

module.exports = mongoose.model("quiz", quizSchema)