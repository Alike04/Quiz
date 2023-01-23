import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const email = useRef();
  const name = useRef();
  const password1 = useRef();
  const password2 = useRef();

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (password1 === password2) return;
    const body = {
      email: email.current.value,
      password: password1.current.value,
      name: name.current.value,
      role: "student",
    };
    axios
      .post(`${import.meta.env.VITE_API_URL}auth/register`, body)
      .then((result) => {
        localStorage.setItem("token", result.data.token);
        navigate("/");
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
                  <h2 className="fw-bold mb-2 text-uppercase ">Sing up</h2>
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
                          ref={password1}
                          type="password"
                          placeholder="Password"
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Confirm password</Form.Label>
                        <Form.Control
                          type="password"
                          ref={password2}
                          placeholder="Password"
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Name</Form.Label>
                        <Form.Control ref={name} placeholder="name" />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      ></Form.Group>
                      <div className="d-grid">
                        <Button variant="primary" onClick={handleSubmit}>
                          Sign in
                        </Button>
                      </div>
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
