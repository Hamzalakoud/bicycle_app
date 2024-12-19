import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "../Profile.css"; // Assuming you have a separate CSS file for styles

function Profile() {
  const url = "http://localhost:5000/api/users";
  const [user, setUser] = useState({}); // Store user details
  const [userId, setUserId] = useState(null); // Store user ID
  const [show, setShow] = useState(false); // Modal visibility state
  const [userUpdate, setUserUpdate] = useState({
    userName: "",
    email: "",
    age: "",
  });
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [errorMessage, setErrorMessage] = useState(null); // Error handling state

  // Toggle modal visibility
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Fetch user data
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.id);
      } catch (error) {
        console.error("Token decoding error:", error);
        setErrorMessage("Invalid token. Please log in again.");
      }
    }
  }, []);

  useEffect(() => {
    if (userId) {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      axios
        .get(`${url}/${userId}`, { headers })
        .then((response) => {
          setUser(response.data.user);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setErrorMessage("Failed to fetch user data.");
          setIsLoading(false);
        });
    }
  }, [userId]);

  // Handle form input changes
  const handleChange = (e) => {
    setUserUpdate({ ...userUpdate, [e.target.id]: e.target.value });
  };

  // Handle user data update
  const handleUpdate = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

    try {
      await axios.put(`${url}/${user._id}`, userUpdate, { headers });
      setUser((prev) => ({ ...prev, ...userUpdate })); // Update local state
      handleClose();
    } catch (error) {
      console.error("Error updating user data:", error);
      setErrorMessage("Failed to update user data.");
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (errorMessage) {
    return <p className="error-message">{errorMessage}</p>;
  }

  return (
    <div className="profile-container">
      <h3 className="welcome-back">Welcome Back</h3>
      <Card className="profile-card">
        <Card.Body>
          <div className="user-detail">
            <h6>Username:</h6>
            <Card.Text>{user.userName}</Card.Text>
          </div>
          <div className="user-detail">
            <h6>Email:</h6>
            <Card.Text>{user.email}</Card.Text>
          </div>
          <div className="user-detail">
            <h6>Age:</h6>
            <Card.Text>{user.age}</Card.Text>
          </div>
          <div className="update-button">
            <Button variant="success" onClick={handleShow}>
              Update
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* Modal for Updating User Information */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdate}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder={user.userName || "Enter username"}
                onChange={handleChange}
                id="userName"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder={user.email || "Enter email"}
                onChange={handleChange}
                id="email"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                placeholder={user.age || "Enter age"}
                onChange={handleChange}
                id="age"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Profile;
