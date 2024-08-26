import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Container className="text-center">
      <Row>
        <Col>
          <h1>Welcome to the Cafe Management App</h1>
          <p className="lead mt-4">
            Manage your cafe effortlessly with our intuitive platform. Create
            menus, manage tables, and handle orders with ease.
          </p>
          <div className="mt-5">
            <Link to="/register">
              <Button variant="primary" className="me-3">
                Get Started
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="secondary">Login</Button>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
