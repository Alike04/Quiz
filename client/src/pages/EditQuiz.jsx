import React, { useState, useEffect, useRef } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { nanoid } from "nanoid";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditQuiz = (props) => {
  const [quiz, setQuiz] = useState({});
  const [questions, setQuestions] = useState([
    { question: "", answer: "", options: ["", "", "", ""] },
  ]);
  const [message, setMessage] = useState("");
  const inputRefs = useRef([[]]);
  const titleRef = useRef("");

  const navigate = useNavigate();

  const handleAddQuestion = () => {
    const newQuestions = save();
    newQuestions.push({
      question: "",
      answer: "",
      options: ["", "", "", ""],
    });
    setQuestions(newQuestions);
  };

  const handleDeleteQuestion = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  function validate() {
    for (let i = 0; i < inputRefs.current.length; i++) {
      for (let j = 0; j < inputRefs.current[i].length; j++) {
        if (
          !inputRefs.current[i][j].value ||
          isEmptyOrSpaces(inputRefs.current[i][j].value)
        ) {
          return false;
        }
      }
      let answer = -1;
      if (inputRefs.current[i][5].checked === true) answer = 1;
      if (inputRefs.current[i][6].checked === true) answer = 1;
      if (inputRefs.current[i][7].checked === true) answer = 1;
      if (inputRefs.current[i][8].checked === true) answer = 1;
      if (answer === -1) return false;
    }
    if (isEmptyOrSpaces(titleRef.current.value)) return false;
    return true;
  }

  function save() {
    const newQuestions = [...questions];
    inputRefs.current.forEach((element, index) => {
      if (element[0] != null) {
        newQuestions[index].question = element[0].value;
        newQuestions[index].options[0] = element[1].value;
        newQuestions[index].options[1] = element[2].value;
        newQuestions[index].options[2] = element[3].value;
        newQuestions[index].options[3] = element[4].value;
        let answer = -1;
        if (element[5]?.checked === true) answer = 1;
        if (element[6]?.checked === true) answer = 2;
        if (element[7]?.checked === true) answer = 3;
        if (element[8]?.checked === true) answer = 4;
        newQuestions[index].answer = answer;
      }
    });
    setQuestions(newQuestions);
    return newQuestions;
  }

  function isEmptyOrSpaces(str) {
    return str === null || str.match(/^ *$/) !== null;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const newQuestions = save();
    if (!validate()) {
      setMessage(
        "please make sure that you have entered all fields, including the selection of the correct option and title of the quiz"
      );
      return;
    }
    setMessage("");
    let mappedQuiz = { title: "", questions: [] };
    for (let i = 0; i < newQuestions.length; i++) {
      (mappedQuiz.title = titleRef.current.value),
        mappedQuiz.questions.push({
          question: newQuestions[i].question,
          option1: newQuestions[i].options[0],
          option2: newQuestions[i].options[1],
          option3: newQuestions[i].options[2],
          option4: newQuestions[i].options[3],
          answer: newQuestions[i].answer,
        });
    }
    console.log(mappedQuiz);
    axios
      .post(`${import.meta.env.VITE_API_URL}quiz`, mappedQuiz, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(navigate("/"))
      .catch((e) => console.log(e));
  };

  return (
    <Container>
      <Row >
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="quizName">
              <h2>Quiz Name</h2>
              <Form.Control
                ref={(el) => (titleRef.current = el)}
                type="text"
                name="name"
                defaultValue={quiz.name}
              />
            </Form.Group>
            <h4>Questions:</h4>
            {questions.map((question, index) => (
              <Card className="p-4 mb-4" key={nanoid()}>
                <Form.Group controlId={`question-${index}`}>
                  <Form.Label>{`Question ${index + 1}`}</Form.Label>
                  <Form.Control
                    type="text"
                    name="question"
                    defaultValue={question.question}
                    ref={(el) => {
                      inputRefs.current[index] = inputRefs.current[index] || [];
                      inputRefs.current[index][0] = el;
                    }}
                  />
                </Form.Group>
                <Form.Group>
                  {question.options.map((option, optionIndex) => (
                    <div
                      key={nanoid()}
                      className="d-flex justify-content-between mt-4 text-center align-content-center flex-wrap"
                    >
                      <Form.Label style={{ width: "15%" }}>{`Option ${
                        optionIndex + 1
                      }`}</Form.Label>
                      <Form.Control
                        style={{ width: "70%" }}
                        ref={(el) => {
                          inputRefs.current[index] =
                            inputRefs.current[index] || [];

                          inputRefs.current[index][optionIndex + 1] = el;
                        }}
                        as="textarea"
                        type="text"
                        name={`option-${optionIndex}`}
                        defaultValue={option}
                      />
                      <Form.Check
                        ref={(el) => {
                          inputRefs.current[index] =
                            inputRefs.current[index] || [];

                          inputRefs.current[index][optionIndex + 5] = el;
                        }}
                        name={`options${index}`}
                        defaultChecked={optionIndex === question.answer - 1}
                        id="radio"
                        type="radio"
                        value={optionIndex + 1}
                      />
                    </div>
                  ))}
                </Form.Group>
                <Button
                  variant="danger mt-4"
                  onClick={() => handleDeleteQuestion(index)}
                >
                  Delete Question
                </Button>
              </Card>
            ))}
            <div className="d-flex justify-content-between flex-column">
              <Button
                className="mb-4"
                variant="secondary"
                onClick={handleAddQuestion}
              >
                Add Question
              </Button>
              <p className="text-warning">{message}</p>
              <Button className="mb-4" variant="primary" onClick={handleSubmit}>
                Save Quiz
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditQuiz;
