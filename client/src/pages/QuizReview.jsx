import React, { useEffect, useState } from "react";
import { Container, Button, Form, Card } from "react-bootstrap";
import axios, { Axios } from "axios";
import { useNavigate, useParams } from "react-router-dom";

const QuizReview = () => {
  const [page, setPage] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [title, setTitle] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState();
  const [isLoaded, setIsLoaded] = useState();

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}result/${params.quizId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        console.log(response.data);
        setQuestions(response.data.result.responses);
        setTitle(response.data.result.title);
        setCurrentQuestion(response.data.result.responses[0]);
        setIsLoaded(true);
      })
      .catch((e) => console.log(e));
  }, []);

  const nextPage = () => {
    if (page + 1 < questions.length) {
      setCurrentQuestion(questions[page + 1]);
      setPage(page + 1);
    }
  };

  const backPage = () => {
    if (page - 1 > -1) {
      setCurrentQuestion(questions[page - 1]);
      setPage(page - 1);
    }
  };

  const takeBorder = (correct, selected, number) => {
    if (correct == number && selected == number) {
      return "border-success";
    }
    if(correct == number){
      return "border-success"
    }
    if(selected == number){
      return "border-danger"
    }

    // return "border-secondary";
  };

  const Question = ({ question }) => {
    return (
      <div>
        <Card.Subtitle>{question.question}</Card.Subtitle>
        <hr />
        <div className="d-flex flex-column">
          <div
            className={` ${takeBorder(
              question.correct,
              question.selected,
              1
            )} border border-4 rounded p-2 m-1`}
          >
            {question.option1}
          </div>
          <div
            className={` ${takeBorder(
              question.correct,
              question.selected,
              2
            )} border border-4 rounded p-2 m-1`}
          >
            {question.option2}
          </div>
          <div
            className={` ${takeBorder(
              question.correct,
              question.selected,
              3
            )} border border-4 rounded p-2 m-1`}
          >
            {question.option3}
          </div>
          <div
            className={` ${takeBorder(
              question.correct,
              question.selected,
              4
            )} border border-4 rounded p-2 m-1`}
          >
            {question.option4}
          </div>
        </div>
      </div>
    );
  };

  if (!isLoaded) {
    return <div></div>;
  } else {
    return (
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ height: "80vh" }}
      >
        <div className="w-75">
          <h2 className="text-center">{title}</h2>
          <Card className="p-5">
            <Card.Body>
              <Question question={currentQuestion} />
            </Card.Body>
            <hr />
            <div className="d-flex justify-content-between">
              <Button disabled={page === 0} onClick={backPage}>
                Back
              </Button>
              <h4>{`${page + 1}/${questions.length}`}</h4>
              {page === questions.length - 1 ? (
                <Button onClick={() => navigate("/")}>Back to Quizzes</Button>
              ) : (
                <Button onClick={nextPage}>Next</Button>
              )}
            </div>
          </Card>
        </div>
      </Container>
    );
  }
};

export default QuizReview;
