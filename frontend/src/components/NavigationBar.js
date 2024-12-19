import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom"; // Make sure NavLink is imported
import { useNavigate } from "react-router-dom";
import "./NavigationBar.css"; // External CSS for better organization

export default function NavigationBar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Check if the user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // Update authentication status based on token presence
  }, []);

  // Sign Out function
  const handleSignOut = () => {
    if (window.confirm("Are you sure you want to Sign Out?")) {
      localStorage.removeItem("token"); // Remove token from local storage
      setIsAuthenticated(false); // Update state
      navigate("/"); // Redirect to the homepage
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="navbar-custom">
      <Container fluid>
        {/* Left-side Links */}
        <Navbar.Brand>
          {/* 'Way' link should be a NavLink */}
          <NavLink
            to=""
            className={({ isActive }) =>
              `nav-link-custom ${isActive ? "active-link" : ""}`
            }
          >
            Way
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `nav-link-custom ${isActive ? "active-link" : ""}`
                }
              >
                About us
              </NavLink>
            </Nav.Link>
            <Nav.Link>
              <NavLink
                to="/maps"
                className={({ isActive }) =>
                  `nav-link-custom ${isActive ? "active-link" : ""}`
                }
              >
                Maps
              </NavLink>
            </Nav.Link>
          </Nav>

          {/* Right-side Links */}
          <Nav>
            {isAuthenticated ? (
              <>
                {/* Profile Page Link */}
                <Nav.Link>
                  <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                      `nav-link-custom ${isActive ? "active-link" : ""}`
                    }
                  >
                    Profile
                  </NavLink>
                </Nav.Link>

                {/* Sign Out Button */}
                <Nav.Link>
                  <NavLink
                    to="/"
                    onClick={handleSignOut}
                    className="nav-link-custom sign-out"
                  >
                    Sign Out
                  </NavLink>
                </Nav.Link>
              </>
            ) : (
              <Nav.Link>
                <NavLink to="/signUp" className="nav-link-custom sign-in">
                  Sign Up / In
                </NavLink>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
