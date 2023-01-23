import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";

function BasicExample() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <LinkContainer to="/quizzes">
          <Navbar.Brand>Quizzes</Navbar.Brand>
        </LinkContainer>
        <Nav className="me-auto">
          <LinkContainer
            to="/login"
            onClick={() => localStorage.removeItem("token")}
          >
            <Nav.Link>logout</Nav.Link>
          </LinkContainer>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
