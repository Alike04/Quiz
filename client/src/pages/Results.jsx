import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, ListGroup } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { nanoid } from "nanoid";

const Results = () => {
  const param = useParams();
  const [results, setResults] = useState([]);
  const [isLoaded, setIdLoaded] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `${import.meta.env.VITE_API_URL}result/quiz/${param.quizId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      let data = result.data.result.sort((a, b) => {
        if (a.score < b.score) return 1;
        if (a.score > b.score) return -1;
        return 0;
      });

      setResults(data);
      setIdLoaded(true);
    };
    fetchData();
  }, []);

  if (!isLoaded) {
    return <></>;
  }
  return (
    <Container>
      <h3 className="text-center">Results</h3>
      <Table className="mt-4">
        <thead>
          <tr className="font-weight-bold ">
            <td>
              <h5> Name</h5>
            </td>
            <td>
              <h5>Email</h5>
            </td>
            <td>
              <h5>Score</h5>
            </td>
          </tr>
        </thead>
        <tbody>
          {results.map((item) => (
            <tr key={nanoid()}>
              <td>{item.user.name}</td>
              <td>{item.user.email}</td>
              <td>{item.score}</td>
            </tr>
          ))}
        </tbody>
        <ListGroup></ListGroup>
      </Table>
    </Container>
  );
};

export default Results;
