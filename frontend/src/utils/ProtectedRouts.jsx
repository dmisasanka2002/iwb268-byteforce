import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { ElectionContext } from "../contexts/ElectionContext";
import VoterPage from "../pages/VoterPage";

function ProtectedRouts() {
  const { isVerified } = useContext(ElectionContext);

  return isVerified ? <Outlet /> : <VoterPage />;
}

export default ProtectedRouts;
