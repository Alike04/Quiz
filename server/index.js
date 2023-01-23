const express = require("express");
const mongoose = require("mongoose");
const authRoute = require("./routes/authRoute")
const quizRoute = require("./routes/QuizRouter")
const resultRouter = require("./routes/resultRouter")
const errorMiddleware = require("./middleware/errorMiddleware");
const cors = require("cors");
const ApiError = require("./utils/ApiError");


require("dotenv").config();

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
  credentials: false
}));

app.use(express.json());

mongoose.set('strictQuery', false);

app.use("/api/auth", authRoute);
app.use("/api/quiz", quizRoute);
app.use("/api/result", resultRouter)

app.use(errorMiddleware);

mongoose.connect("mongodb://localhost:27017/quiz", () => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  })
})
