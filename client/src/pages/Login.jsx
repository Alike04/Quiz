import axios from "axios";
import { useRef } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const email = useRef();
  const password = useRef();

  function parseJwt(token) {
    if (!token) {
      return;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  }

  const navigate = useNavigate();

  const handleSubmit = () => {
    const body = {
      email: email.current.value,
      password: password.current.value,
    };
    axios
      .post(`${import.meta.env.VITE_API_URL}auth/login`, body)
      .then((result) => {
        localStorage.setItem("token", result.data.token);
        if (parseJwt(result.data.token).role === "student")
          navigate("/");
        if (parseJwt(result.data.token).role === "teacher") {
          navigate("/");
        }
      })
      .catch((result) => {
        console.log(result);
      });
  };

  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center text-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-3 border-primary"></div>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-uppercase ">Log in</h2>
                  <div className="mb-3">
                    <Form>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter email"
                          ref={email}
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          ref={password}
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      ></Form.Group>
                      <div className="d-grid">
                        <Button variant="primary" onClick={handleSubmit}>
                          Login
                        </Button>
                      </div>
                      <a onClick={() => navigate("/register")}>register</a>
                    </Form>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
