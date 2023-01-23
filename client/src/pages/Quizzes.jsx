import axios, { Axios } from "axios";
import React, { useEffect } from "react";
import { BsQuestionCircle } from "react-icons/bs";
import { useState } from "react";
import {
  Button,
  Row,
  Col,
  Card,
  Modal,
  InputGroup,
  Form,
} from "react-bootstrap";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";

const Quizzes = () => {
  const [show, setShow] = useState(false);
  const [response, setResponse] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  function parseJwt(token) {
    if (!token) {
      return;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  }

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const quizzes = await axios.get(`${import.meta.env.VITE_API_URL}quiz`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setQuizzes(quizzes.data.quizzes || []);
        setResponse(quizzes.data.results);
        setIsLoaded(true);
      } catch {
        setIsLoaded(true);
        setQuizzes([]);
      }
    };
    fetchData();
  }, []);

  const getColumnsForRow = () => {
    let items = quizzes.map((quiz) => {
      let result = null;
      response.forEach((r) => {
        if (r.quiz == quiz._id) result = r;
      });
      if (parseJwt(localStorage.getItem("token")).role === "student") {
        return (
          <div
            key={nanoid()}
            className={`border rounded m-4 border-${
              result ? "success" : "warning"
            } border-4 p-3 d-flex justify-content-between`}
          >
            <div>
              <BsQuestionCircle className="d-inline m-2" size={25} />
              <p className="d-inline">{quiz.title}</p>
              <p>
                {result
                  ? `Complete ${result.score}/${quiz.questions.length}`
                  : "Incomplete"}
              </p>
            </div>
            {result ? (
              <Button onClick={() => navigate(`/review/${result._id}`)}>
                Review answers
              </Button>
            ) : (
              <Button onClick={() => navigate(`/quiz/${quiz._id}`)}>
                Pass Quiz
              </Button>
            )}
          </div>
        );
      } else {
        return (
          <div key={nanoid()} className="p-3">
            <div className="p-4 border border-2 rounded border-secondary d-flex justify-content-between">
              <div className="">
                <BsQuestionCircle className="d-inline m-2" size={25} />
                <p className="d-inline">{quiz.title}</p>
              </div>
              <Button onClick={() => navigate(`/results/${quiz._id}`)}>
                View Results
              </Button>
            </div>
          </div>
        );
      }
    });
    return items;
  };

  if (!isLoaded) {
    return <></>;
  }

  return (
    <div className="container">
      <br />
      <h2 className="text-center mb-2 text-uppercase">Quizzes</h2>
      <br />
      {parseJwt(localStorage.getItem("token")).role === "teacher" && (
        <div className="text-center">
          <Button className="mx-auto" onClick={() => navigate("/edit")}>
            Add Quiz
          </Button>
        </div>
      )}
      <br />
      {getColumnsForRow()}
    </div>
  );
};

export default Quizzes;
