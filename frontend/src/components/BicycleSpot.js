import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const BicycleSpot = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [spotData, setSpotData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [bikeToBook, setBikeToBook] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [newBike, setNewBike] = useState({
    name: "",
    type: "",
    price: "",
    available: 0,
    image: null,
  });
  const [rentalHours, setRentalHours] = useState(1); // Default to 1 hour
  const [totalAmount, setTotalAmount] = useState(0); // Total amount for the booking

  useEffect(() => {
    // Decode JWT token and check if user is an admin
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken?.role === "admin") {
          setIsAdmin(true);
        }
      } catch (err) {
        console.error("Invalid token", err);
      }
    }

    // Fetch the bike spot data
    const fetchSpotData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/bike-spots/${id}/bikes`);
        const data = await response.json();
        setSpotData(data);
      } catch (err) {
        setError("Failed to load bike spot data.");
      } finally {
        setLoading(false);
      }
    };

    fetchSpotData();
  }, [id]);

  // Function to extract integer part from the price string
  const extractPriceInt = (priceString) => {
    const priceMatch = priceString.match(/\d+/); // Extract digits from the string
    return priceMatch ? parseInt(priceMatch[0]) : 0; // Return the first match as an integer or 0 if no match
  };

  // Handle form input changes for adding a new bike
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBike({ ...newBike, [name]: value });
  };

  // Handle image file change for adding a new bike
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewBike({ ...newBike, image: file });
  };

  // Open the modal for booking confirmation
  const openModal = (bike) => {
    setBikeToBook(bike);
    setRentalHours(1); // Default to 1 hour when opening modal
    setTotalAmount(extractPriceInt(bike.price)); // Set the total amount to bike price * 1 hour
    setShowModal(true);
  };

  // Close the modal
  const closeModal = () => {
    setShowModal(false);
    setNewBike({ name: "", type: "", price: "", available: 0, image: null }); // Clear form
  };

  // Handle bike creation (admin functionality)
  const handleAddBike = async () => {
    const formData = new FormData();
    formData.append("name", newBike.name);
    formData.append("type", newBike.type);
    formData.append("price", newBike.price);
    formData.append("available", newBike.available);
    formData.append("image", newBike.image);

    try {
      const response = await fetch("http://localhost:5000/api/bikes", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        alert("Bike added successfully");
        setSpotData((prevData) => [...prevData, data]); // Update spotData to include new bike
        closeModal(); // Close the modal
      } else {
        alert("Failed to add bike");
      }
    } catch (error) {
      console.error("Error adding bike:", error);
      alert("Error adding bike");
    }
  };

  // Handle book now button click
  const handleBookNow = (bike) => {
    openModal(bike); // Open modal and set default values
  };

  // Confirm booking and reset modal state
  const confirmBooking = () => {
    // Reset rental hours and total amount
    setRentalHours(1);
    setTotalAmount(0);
    setBikeToBook(null);
    setShowModal(false); // Close the modal
    navigate("/paiment"); // Redirect to the payment page
  };

  // Cancel booking
  const cancelBooking = () => {
    // Reset modal state
    setRentalHours(1);
    setTotalAmount(0);
    setBikeToBook(null);
    setShowModal(false); // Close the modal
  };

  // Handle rental hours change and calculate total amount
  const handleRentalHoursChange = (e) => {
    const hours = e.target.value;
    setRentalHours(hours);
    if (bikeToBook) {
      const priceInt = extractPriceInt(bikeToBook.price); // Extract integer price
      setTotalAmount(priceInt * hours); // Update total amount
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{ fontFamily: "Arial", backgroundColor: "#f8f8f8", padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>{spotData?.name} - Available Bikes</h2>

      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "15px" }}>
        {spotData?.length > 0 ? (
          spotData.map((bike, index) => (
            <div
              key={index}
              style={{
                width: "200px",
                backgroundColor: "#333",
                color: "white",
                borderRadius: "10px",
                textAlign: "center",
                padding: "10px",
              }}
            >
              <img
                src={bike.image}
                alt={bike.name}
                style={{
                  width: "100%",
                  height: "120px",
                  objectFit: "cover",
                  marginBottom: "10px",
                }}
              />
              <h3>{bike.name}</h3>
              <p>{bike.type}</p>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    backgroundColor: bike.available > 0 ? "green" : "red",
                    marginRight: "5px",
                  }}
                ></div>
                <p>{bike.available > 0 ? "Availability" : "Not Available"}</p>
              </div>
              <p style={{ fontWeight: "bold" }}>{bike.price}</p>
              <button
                onClick={() => handleBookNow(bike)}
                style={{
                  backgroundColor: bike.available > 0 ? "#4CAF50" : "#f44336",
                  color: "white",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: bike.available > 0 ? "pointer" : "not-allowed",
                  width: "100%",
                }}
                disabled={bike.available === 0}
              >
                Book Now
              </button>
            </div>
          ))
        ) : (
          <p>No bikes available at this spot.</p>
        )}
      </div>

      {/* Admin: Add Bike Button */}
      {isAdmin && (
        <button
          onClick={openModal}
          style={{
            marginTop: "20px",
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "10px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Add Bike
        </button>
      )}

      {/* Modal for booking confirmation */}
      {showModal && bikeToBook && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "300px",
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              textAlign: "center",
            }}
          >
            <h2>Are you sure you want to book this bike?</h2>
            <p>{bikeToBook.name} - {bikeToBook.type}</p>
            <label>
              Enter number of hours:
              <input
                type="number"
                value={rentalHours}
                onChange={handleRentalHoursChange}
                min="1"
                style={{
                  padding: "5px",
                  marginLeft: "10px",
                  width: "60px",
                }}
              />
            </label>
            <p style={{ fontWeight: "bold" }}>Total Amount: ${totalAmount}</p>
            <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-around" }}>
              <button
                onClick={confirmBooking}
                style={{
                  backgroundColor: "#4CAF50",
                  color: "white",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Yes, Book Now
              </button>
              <button
                onClick={cancelBooking}
                style={{
                  backgroundColor: "#f44336",
                  color: "white",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BicycleSpot;
