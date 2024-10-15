import React from "react";
import ElectionForm from "../components/ElectionForm";
import CandidateForm from "../components/CandidateForm";
import VoterForm from "../components/VoterForm";

/**
 * A React component that renders the admin dashboard with forms to create a new election, add a candidate, and add a voter.
 *
 * @return {JSX.Element} The JSX element representing the admin dashboard.
 */
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
