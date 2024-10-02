import React from "react";
import { Link } from "react-router-dom";
import "../styles/AdminDashboard.css"; // Custom styles

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <div className="container">
        <div className="left">
          <h1 className="dashboard-title">
            Welcome to Administrative Control of E-Vorting System
          </h1>
          <nav className="dashboard-nav">
            <Link to="/election/new" className="nav-link">
              Create New Election
            </Link>
            <Link to="/election/list" className="nav-link">
              View Election List
            </Link>
            {/* Add more links as needed */}
          </nav>
        </div>
        <div className="main">
          {/* Content goes here (ElectionList or other components) */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
