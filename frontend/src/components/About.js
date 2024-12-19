import React from "react";
import "./About.css"; // Correct path to your CSS file

function About() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>About Us</h1>
          <p>
            Welcome to <strong>Way</strong>! We are committed to providing
            sustainable, eco-friendly bike rental solutions, helping you
            navigate the city efficiently while caring for the environment. Join
            us in revolutionizing transportation one ride at a time!
          </p>
        </div>
      </section>

      {/* User Stats Section */}
      <section className="stats">
        <h2>Our Impact</h2>
        <div className="stats-container">
          <div className="stat-item">
            <h3>10,000+</h3>
            <p>Active Users</p>
          </div>
          <div className="stat-item">
            <h3>50+</h3>
            <p>Bike Stations</p>
          </div>
          <div className="stat-item">
            <h3>100,000+</h3>
            <p>Rides Completed</p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team">
        <h2>Meet Our Team</h2>
        <div className="team-container">
          <div className="team-member">
            <img src="team-member1.jpg" alt="Zeineb Ben Rayana" />
            <h3>Zeineb Ben Rayana</h3>
            <p>Founder & CEO</p>
          </div>
          <div className="team-member">
            <img src="team-member2.jpg" alt="Hamza Lakoud" />
            <h3>Hamza Lakoud</h3>
            <p>Chief Technical Officer</p>
          </div>
          <div className="team-member">
            <img src="team-member3.jpg" alt="Youssef Bouattour" />
            <h3>Youssef Bouattour</h3>
            <p>Marketing Head</p>
          </div>
          <div className="team-member">
            <img src="team-member4.jpg" alt="Elaa Baccouchi" />
            <h3>Elaa Baccouchi</h3>
            <p>UI/UX Designer</p>
          </div>
          <div className="team-member">
            <img src="team-member5.jpg" alt="Amine Zribi" />
            <h3>Amine Zribi</h3>
            <p>Operations Manager</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;