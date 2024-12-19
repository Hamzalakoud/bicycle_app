import React from "react";
import { Shield, Key, Zap } from "lucide-react";
import "./Home.css";

function Home() {
  const handleStart = () => {
    window.location.href = "/maps"; // Change this to your map page route
  };
  return (
    <div className="container">
      <main className="main-content">
        {/* herohome Section */}
        <div className="herohome">
          <div className="herohome-image">
            <img
              src="https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80"
              alt="Modern Bicycle"
            />
          </div>
          <div className="herohome-content">
            <h1>
              Discover a new <span className="highlight">WAY</span> to drive
            </h1>
            <div className="text-content">
              <p className="text">
              Enjoy the freedom of effortless biking with our easy rental service. Explore the city or go on an adventure with the perfect ride for you!
              </p>
            </div>
            <button className="start-button" onClick={handleStart}>
              Start now
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div className="features">
          <div className="feature">
            <Shield className="feature-icon" />
            <h3>Safety focused</h3>
            <p>the safety of our riders is at the center of everything we</p>
          </div>
          <div className="feature">
            <Key className="feature-icon" />
            <h3>Easy way to get</h3>
            <p>the safety of our riders is at the center of everything we</p>
          </div>
          <div className="feature">
            <Zap className="feature-icon" />
            <h3>Supercharging</h3>
            <p>the safety of our riders is at the center of everything we</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
