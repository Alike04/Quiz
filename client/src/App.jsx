import { useState } from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import BasicExample from "./components/Navbar";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Quizzes from "./pages/Quizzes";
import Quiz from "./pages/Quiz";
import EditQuiz from "./pages/EditQuiz";
import QuizReview from "./pages/QuizReview";
import Results from "./pages/Results";

function App() {
  return (
    <BrowserRouter>
      <BasicExample />
      <Routes>
        <Route element={<Login />} path="/login" />
        <Route element={<Register />} path="/register" />
        <Route element={<Quizzes />} path="/" />
        <Route element={<Quiz />} path="/quiz/:quizId" />
        <Route element={<QuizReview />} path="/review/:quizId" />
        <Route element={<EditQuiz />} path="/edit" />
        <Route element={<Results />} path="/results/:quizId" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
