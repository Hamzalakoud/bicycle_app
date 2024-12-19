import React, { useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import "../App.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Import Google and Facebook login components
import { GoogleLogin } from "@react-oauth/google";

function SignIn() {
  const url = "http://localhost:5000/api/signIn"; // Replace with your API endpoint
  const navigate = useNavigate();

  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState(""); // State to manage error messages

  // Handle input changes
  const handleChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!user.email || !user.password) {
      setError("Both email and password are required.");
      return;
    }

    setError(""); // Clear previous errors

    axios
      .post(url, user)
      .then((response) => {
        const { token, user: userData } = response.data;
        localStorage.setItem("token", token);

        // Navigate based on user role
        if (userData.role === "user") {
          navigate("/profile");
        } else {
          navigate("/customers");
        }
      })
      .catch((error) => {
        // Handle API errors
        setError(
          error.response?.data?.message ||
            "Invalid email or password. Please try again."
        );
        console.error("Sign-in error:", error);
      });
  };

  // Google login success callback
  const handleGoogleLogin = (response) => {
    const token = response?.credential; // Token from Google
    if (token) {
      axios
        .post("http://localhost:5000/api/googleSignIn", { token })
        .then((res) => {
          const { token, user: userData } = res.data;
          localStorage.setItem("token", token);

          if (userData.role === "user") {
            navigate("/profile");
          } else {
            navigate("/customers");
          }
        })
        .catch((error) => {
          setError(
            error.response?.data?.message ||
              "Google login failed. Please try again."
          );
          console.error("Google login error:", error);
        });
    }
  };

  return (
    <div
      style={{
        backgroundImage: "url(/image_way.jpg)", // Replace with the correct file name and extension
        backgroundPosition: "left center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <MDBContainer
        fluid
        className="d-flex align-items-center justify-content-end bg-image"
        style={{ marginTop: "60px" }}
      >
        <div className="mask gradient-custom-3"></div>
        <div>
          <MDBCard className="m-5" style={{ maxWidth: "600px" }}>
            <MDBCardBody className="px-5">
              <h2 className="text-uppercase text-center mb-5">
                Sign In to your account
              </h2>

              {/* Error Message */}
              {error && <p className="text-danger text-center">{error}</p>}

              <form onSubmit={handleSubmit}>
                <MDBInput
                  wrapperClass="mb-4"
                  size="lg"
                  placeholder="Enter email"
                  onChange={handleChange}
                  id="email"
                  type="email"
                  required
                />

                <MDBInput
                  wrapperClass="mb-4"
                  size="lg"
                  type="password"
                  placeholder="Enter password"
                  onChange={handleChange}
                  id="password"
                  required
                />

                <MDBBtn
                  className="mb-4 w-100 gradient-custom-4"
                  size="lg"
                  type="submit"
                >
                  Sign In
                </MDBBtn>

                <div className="text-center">
                  <p className="mb-0">
                    Forgot your password?{" "}
                    <Link to="/resetPassword">Reset password</Link>
                  </p>
                </div>
              </form>

              {/* Google Login Button */}
              <div className="mt-3">
                <GoogleLogin
                  onSuccess={handleGoogleLogin}
                  onError={(error) =>
                    setError("Google login failed. Please try again.")
                  }
                  useOneTap
                />
              </div>

            </MDBCardBody>
          </MDBCard>
        </div>
      </MDBContainer>
    </div>
  );
}

export default SignIn;
