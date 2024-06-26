import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "../Styles/HeaderNav.css";

const CustomNavbar = ({ logUser }) => {
  return (
    <Navbar expand="lg" variant="dark" className="custom-navbar">
      <Navbar.Brand
        as={Link}
        to={logUser ? "/dashboard" : "/"}
        className="brand-name"
      >
        MindEase
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          {logUser ? (
            <>
              <Nav.Link
                as={Link}
                to="/dashboard"
                className="nav-link highlight-link"
              >
                Dashboard
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link as={Link} to="/login" className="nav-link">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/register" className="nav-link">
                Register
              </Nav.Link>
            </>
          )}
          <Nav.Link as={Link} to="/quotes" className="nav-link">
            Quotes
          </Nav.Link>
          <Nav.Link as={Link} to="/resources" className="nav-link">
            Resources
          </Nav.Link>
          <Nav.Link as={Link} to="/about" className="nav-link">
            About
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CustomNavbar;
