import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ErrorPage = ({ message }) => {
  const navigate = useNavigate();

  return (
    <Container className="text-center mt-5">
      <h1>Error</h1>
      <p>{message}</p>
      <Button variant="primary" onClick={() => navigate("/")}>
        Go Back to Home
      </Button>
    </Container>
  );
};

export default ErrorPage;
