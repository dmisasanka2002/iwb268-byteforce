import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import ElectionForm from "./ElectionForm";
import CandidateForm from "./CandidateForm";
import VoterForm from "./VoterForm";
import "../styles/AdminDashboard.css"; // Custom styles
import { ElectionContext } from "../contexts/ElectionContext";
import ElectionList from "./ElectionList";

const AdminDashboard = () => {
  const { electionId, electionCreated } = useContext(ElectionContext);

  return (
    <div className="admin-dashboard">
      <div className="container">
        <div className="left">
          <h1 className="dashboard-title">Admin Dashboard</h1>
          <Link to="/election/new">New Election</Link>
          <Link to="/election/list">Election List</Link>
        </div>
        <div className="main">{/* <ElectionList /> */}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
