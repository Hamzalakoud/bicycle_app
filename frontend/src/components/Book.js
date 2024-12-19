import { useParams, useNavigate } from "react-router-dom";

// Data containing the bike spots information
const bikeSpotsData = {
  1: {
    name: "Ennaser spot",
    bikes: [
      {
        id: "E-MTB",
        type: "Electric Mountain Bike",
        available: 2,
        price: "5DT per hour",
        image:
          "https://pinion.eu/wp-content/uploads/2023/09/BULLS-Vuca-Evo-AM-2.jpg",
      },
      {
        id: "E-VTT",
        type: "Electric All-Terrain",
        available: 3,
        price: "4DT per hour",
        image:
          "https://image.migros.ch/original/d4313fd8fe2abacbb3af378af3eecbc430971f67/flyer-uproc-x-210-mullet-vtt-electrique-fully.jpg",
      },
      {
        id: "E-VTC",
        type: "Electric City Bike",
        available: 6,
        price: "3.5DT per hour",
        image:
          "https://images.frandroid.com/wp-content/uploads/2024/03/decathlon-rockrider-e-actv-500-vtc-electrique-scaled.jpg",
      },
    ],
  },
  2: {
    name: "La Marsa Spot",
    bikes: [
      {
        id: "E-VTT",
        type: "Electric All-Terrain",
        available: 4,
        price: "4DT per hour",
        image:
          "https://image.migros.ch/original/d4313fd8fe2abacbb3af378af3eecbc430971f67/flyer-uproc-x-210-mullet-vtt-electrique-fully.jpg",
      },
      {
        id: "E-ROAD",
        type: "Electric Road Bike",
        available: 1,
        price: "5DT per hour",
        image:
          "https://www.bianchi.com/store/pub/media/catalog/product/cache/df8fd7705d6797f1ec7e35595b9ba832/Y/Q/YQBN8551A_7.jpg",
      },
      {
        id: "E-VTC",
        type: "Electric City Bike",
        available: 3,
        price: "3.5DT per hour",
        image:
          "https://images.frandroid.com/wp-content/uploads/2024/03/decathlon-rockrider-e-actv-500-vtc-electrique-scaled.jpg",
      },
      {
        id: "E-SCOOTER",
        type: "Electric Scooter",
        available: 7,
        price: "3DT per hour",
        image:
          "https://images.tuyacn.com/ecommerce/1716807365a27285b9207.png?x-oss-process=image/resize,w_510",
      },
    ],
  },
  3: {
    name: "Lac 2 Spot",
    bikes: [
      {
        id: "E-VTT",
        type: "Electric All-Terrain",
        available: 2,
        price: "4DT per hour",
        image:
          "https://image.migros.ch/original/d4313fd8fe2abacbb3af378af3eecbc430971f67/flyer-uproc-x-210-mullet-vtt-electrique-fully.jpg",
      },
      {
        id: "E-VTC",
        type: "Electric City Bike",
        available: 5,
        price: "3.5DT per hour",
        image:
          "https://images.frandroid.com/wp-content/uploads/2024/03/decathlon-rockrider-e-actv-500-vtc-electrique-scaled.jpg",
      },
      {
        id: "E-TOURING",
        type: "Electric Touring Bike",
        available: 1,
        price: "6DT per hour",
        image:
          "https://www.canyon.com/dw/image/v2/BCML_PRD/on/demandware.static/-/Library-Sites-canyon-shared/default/dw7f0358bb/images/plp/e-touring-bikes-canyon-my23-03.jpg?sw=848",
      },
      {
        id: "E-ROAD",
        type: "Electric Road Bike",
        available: 2,
        price: "5DT per hour",
        image:
          "https://www.pearsoncycles.com/cdn/shop/files/ON_OFF_better_SQ_0a29aef7-4dd1-41c1-bac8-33fc22f8aad9_1200x.jpg?v=1727884869",
      },
      {
        id: "E-SCOOTER",
        type: "Electric Scooter",
        available: 5,
        price: "3DT per hour",
        image:
          "https://images.tuyacn.com/ecommerce/1716807365a27285b9207.png?x-oss-process=image/resize,w_510",
      },
    ],
  },
};

const Book = () => {
  const { spotId, bikeId } = useParams(); // Get IDs from URL
  const navigate = useNavigate();

  const spot = bikeSpotsData[spotId];
  const bike = spot ? spot.bikes.find((bike) => bike.id === bikeId) : null;

  if (!bike) {
    return <div>Invalid bike details. Please go back.</div>;
  }

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#111",
        color: "white",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      {/* Header */}
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>{bikeId}</h2>

      {/* Bike Details */}
      <div
        style={{
          backgroundColor: "#222",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
          padding: "15px",
          textAlign: "center",
        }}
      >
        <img
          src={bike.image}
          alt={bikeId}
          style={{
            width: "100%",
            height: "150px",
            objectFit: "contain",
            marginBottom: "10px",
          }}
        />
        <p style={{ fontSize: "14px", margin: "5px 0" }}>
          <strong>Type:</strong> {bike.type}
        </p>
        <p style={{ fontSize: "14px", margin: "5px 0" }}>
          <strong>Price:</strong> {bike.price}
        </p>
        <p style={{ fontSize: "14px", margin: "5px 0" }}>
          <strong>Available:</strong> {bike.available} at {spot.name}
        </p>
      </div>

      {/* Schedule Buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "15px",
          marginTop: "20px",
        }}
      >
        <button
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            fontSize: "14px",
            cursor: "pointer",
            width: "auto",
          }}
        >
          Coming Now!
        </button>
        <button
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            fontSize: "14px",
            cursor: "pointer",
            width: "auto",
          }}
        >
          Schedule for later
        </button>
      </div>

      {/* Confirm Pickup */}
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <button
          onClick={() => navigate("/confirm")}
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            padding: "15px",
            width: "50%", // Adjusted width
            borderRadius: "5px",
            fontSize: "16px",
            cursor: "pointer",
            boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
          }}
        >
          Confirm Pickup &gt;
        </button>
      </div>
    </div>
  );
};

export default Book;
