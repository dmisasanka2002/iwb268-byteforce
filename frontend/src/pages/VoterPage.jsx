import React from "react";
import VoterLogin from "../components/VoterLogin";
// import "../styles/VoterPage.css"; // Custom CSS for styling

/**
 * A React component that renders the voter login form.
 *
 * It contains a VoterLogin2 component that provides the actual login form.
 *
 * @returns {JSX.Element} The JSX element representing the voter login form.
 */
const VoterPage = () => {
  return (
    <div className="voter-page-container">
      <VoterLogin />
    </div>
  );
};

export default VoterPage;
