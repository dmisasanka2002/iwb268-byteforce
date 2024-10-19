import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { ElectionContext } from "../contexts/ElectionContext";
import AdminLogin from "../components/AdminLogin.jsx";

function ProtectedRouts() {
  const { isVerified } = useContext(ElectionContext);

  return isVerified ? <Outlet /> : <AdminLogin />;
}

export default ProtectedRouts;
