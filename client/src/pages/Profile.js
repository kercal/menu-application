import React, { useEffect, useState } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Profile = () => {
  const [cafeOwner, setCafeOwner] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      console.log("Token being sent:", token); // Log the token to ensure it's being retrieved

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:5000/api/auth/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("Profile data received:", response.data); // Log the profile data
        setCafeOwner(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        navigate("/login");
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!cafeOwner) return null; // Show nothing while loading

  return (
    <Container className="mt-5">
      <h2>Your Profile</h2>
      <Row className="mt-4">
        <Col>
          <p>
            <strong>Name:</strong> {cafeOwner.name}
          </p>
          <p>
            <strong>Cafe Name:</strong> {cafeOwner.cafeName}
          </p>
        </Col>
      </Row>
      <div className="mt-4">
        <Link to="/menu">
          <Button variant="primary" className="me-3">
            Manage Menu
          </Button>
        </Link>
        <Button variant="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </Container>
  );
};

export default Profile;
