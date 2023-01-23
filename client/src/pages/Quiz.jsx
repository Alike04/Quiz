import React, { useEffect, useState } from "react";
import { Container, Button, Form, Card } from "react-bootstrap";
import axios, { Axios } from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Quiz = () => {
  const [page, setPage] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [title, setTitle] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState();
  const [isLoaded, setIsLoaded] = useState();
  const [answers, setAnswers] = useState([]);
  const [message, setMessage] = useState("");

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}quiz/${params.quizId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setQuestions(response.data.quiz.questions);
        setTitle(response.data.quiz.title);
        setCurrentQuestion(response.data.quiz.questions[0]);
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

  const finishQuiz = () => {
    if (answers.length === 0) {
      setMessage("please answer all questions");
      return;
    }
    for (let i = 0; i < answers.length; i++) {
      if (
        typeof answers[i] == "undefined" ||
        answers.length !== questions.length
      ) {
        setMessage("please answer all questions");
        return;
      }
    }
    axios
      .post(
        `${import.meta.env.VITE_API_URL}result`,
        { answer: answers, quizId: params.quizId },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then(() => {
        navigate("/");
      })
      .catch((e) => console.log(e));
  };

  const onRadioChange = (event) => {
    const newAnswers = answers;
    newAnswers[page] = event.target.value;
    setAnswers(newAnswers);
  };

  const Question = ({ question }) => {
    return (
      <div>
        <Card.Subtitle>{question.question}</Card.Subtitle>
        <hr />
        <Form className="d-flex flex-column" onChange={onRadioChange}>
          <Form.Check
            defaultChecked={answers[page] == 1}
            inline
            value={1}
            name="group1"
            label={question.option1}
            type="radio"
            id="radio"
          />
          <Form.Check
            defaultChecked={answers[page] == 2}
            value={2}
            inline
            name="group1"
            label={question.option2}
            type="radio"
            id="radio"
          />
          <Form.Check
            defaultChecked={answers[page] == 3}
            value={3}
            inline
            name="group1"
            label={question.option3}
            type="radio"
            id="radio"
          />
          <Form.Check
            defaultChecked={answers[page] == 4}
            value={4}
            inline
            name="group1"
            label={question.option4}
            type="radio"
            id="radio"
          />
        </Form>
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
            <p className="text-danger">{message}</p>
            <div className="d-flex justify-content-between">
              <Button disabled={page === 0} onClick={backPage}>
                Back
              </Button>
              <h4>{`${page + 1}/${questions.length}`}</h4>
              {page === questions.length - 1 ? (
                <Button onClick={finishQuiz}>Finish</Button>
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

export default Quiz;
