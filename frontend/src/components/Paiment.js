import React from "react";
import { useNavigate } from "react-router-dom";

const Paiment = () => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    navigate("/confirm"); // Redirect to a confirmation page or wherever necessary
  };

  return (
    <div
      style={{
        fontFamily: "Arial",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Full viewport height
        backgroundColor: "#f9f9f9",
      }}
    >
      <div>
        <h1>Payment Page</h1>
        <img
          src="https://cdn.prod.website-files.com/64db80a5e88c6b1723ff7649/65ba1ad10b26d4306eb198ad_2cQMU6V8b8wNSBn6Mjda-Lq26oVzPjYt4T0p24IxXpqggPB0ouJYVj-2pQsMIwSWkN3vr3X7nRbXK_34kpU2HCG-FC-mYHf7DZAXMStAG0JdzqUuW4l_MmpFPkbB1FfXwlevHUHNZ_x2TWpjPLyB9iY.png"
          alt="Click to Pay"
          style={{
            display: "block",
            margin: "20px auto",
            maxWidth: "80%",
            height: "60%",
          }}
        />
        <p style={{ fontSize: "18px", fontWeight: "bold", margin: "20px 0" }}>
          Click "Confirm" to proceed with your payment.
        </p>
        <button
          onClick={handleConfirm}
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default Paiment;
