import React, { useEffect, useState } from "react";

const Confirm = () => {
  const [randomCode, setRandomCode] = useState("");

  useEffect(() => {
    // Generate a random 6-digit code
    const generateCode = () => {
      const code = Math.floor(100000 + Math.random() * 900000); // Ensures a 6-digit number
      setRandomCode(code.toString());
    };

    generateCode();
  }, []); // Only runs once when the component mounts

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
        marginTop: "20px",
        padding: "20px",
      }}
    >
      <h2>Pickup Confirmed!</h2>
      <p>Thank you for confirming. Enjoy your ride!</p>
      <p
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          color: "#007BFF",
          marginTop: "20px",
        }}
      >
        Your Code: {randomCode}
      </p>
      <p style={{ color: "#555" }}>Please enter this code on the bicycle screen.</p>
    </div>
  );
};

export default Confirm;
