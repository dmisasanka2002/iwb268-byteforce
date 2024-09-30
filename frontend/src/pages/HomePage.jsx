import React from "react";
import { Link } from "react-router-dom";
import "../styles/HomePage.css"; // Custom CSS for styling

const HomePage = () => {
  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <h1 className="homepage-title">Election System</h1>
      </header>
      <nav className="homepage-nav">
        <ul className="nav-links">
          <li className="nav-item">
            <Link to="/admin" className="nav-link">
              Admin
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/voter" className="nav-link">
              Voter
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default HomePage;
