import React, { useEffect, useState } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CustomerProfile = () => {
  const [customer, setCustomer] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("customerToken");
      if (!token) {
        navigate("/customer/login");
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:5000/api/customer/auth/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCustomer(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        navigate("/customer/login");
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("customerToken");
    navigate("/customer/login");
  };

  if (!customer) return null; // Show nothing while loading

  return (
    <Container className="mt-5">
      <h2>Your Profile</h2>
      <Row className="mt-4">
        <Col>
          <p>
            <strong>Name:</strong> {customer.name}
          </p>
          <p>
            <strong>Email:</strong> {customer.email}
          </p>
        </Col>
      </Row>
      <Button variant="secondary" onClick={handleLogout}>
        Logout
      </Button>
    </Container>
  );
};

export default CustomerProfile;
