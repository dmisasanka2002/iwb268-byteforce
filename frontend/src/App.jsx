import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import VoterPage from "./pages/VoterPage";
import HomePage from "./pages/HomePage";
import ElectionDetailPage from "./pages/ElectionDetailPage";
import "./App.css";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/voter" element={<VoterPage />} />
        <Route path="/election/:id" element={<ElectionDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
