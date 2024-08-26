import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  // Check if the user is logged in by looking for tokens in localStorage
  const isCafeOwnerLoggedIn = !!localStorage.getItem("token");
  const isCustomerLoggedIn = !!localStorage.getItem("customerToken");

  const handleLogout = (userType) => {
    // Remove the token from localStorage to log out
    if (userType === "cafeOwner") {
      localStorage.removeItem("token");
    } else if (userType === "customer") {
      localStorage.removeItem("customerToken");
    }
    navigate("/");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Cafe Management</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {!isCafeOwnerLoggedIn && !isCustomerLoggedIn && (
              <>
                <LinkContainer to="/login">
                  <Nav.Link style={{ color: "lightblue" }}>
                    Cafe Owner Login
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link style={{ color: "lightblue" }}>
                    Cafe Owner Register
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/customer/login">
                  <Nav.Link style={{ color: "lightgreen" }}>
                    Customer Login
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/customer/register">
                  <Nav.Link style={{ color: "lightgreen" }}>
                    Customer Register
                  </Nav.Link>
                </LinkContainer>
              </>
            )}
            {isCafeOwnerLoggedIn && (
              <>
                <LinkContainer to="/dashboard">
                  <Nav.Link style={{ color: "lightblue" }}>Dashboard</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/menu">
                  <Nav.Link style={{ color: "lightblue" }}>Menu</Nav.Link>
                </LinkContainer>
                <Nav.Link
                  onClick={() => handleLogout("cafeOwner")}
                  style={{ color: "lightblue" }}
                >
                  Logout
                </Nav.Link>
              </>
            )}
            {isCustomerLoggedIn && (
              <>
                <LinkContainer to="/customer/profile">
                  <Nav.Link style={{ color: "lightgreen" }}>Profile</Nav.Link>
                </LinkContainer>
                <Nav.Link
                  onClick={() => handleLogout("customer")}
                  style={{ color: "lightgreen" }}
                >
                  Logout
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
