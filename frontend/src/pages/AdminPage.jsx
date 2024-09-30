import React from "react";
import ElectionForm from "../components/ElectionForm";
import CandidateForm from "../components/CandidateForm";
import VoterForm from "../components/VoterForm";

const AdminPage = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <ElectionForm />
      <CandidateForm />
      <VoterForm />
    </div>
  );
};

export default AdminPage;
