import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import VoterPage from "./pages/VoterPage";
import HomePage from "./pages/HomePage";
import ElectionDetailPage from "./pages/ElectionDetailPage";
import "./App.css";
import AdminDashboard from "./components/AdminDashboard";
import NewElection from "./components/NewElection";
import ElectionList from "./components/ElectionList";
import ElectionContextProvider from "./contexts/ElectionContext";
import CandidateForm from "./components/CandidateForm";
import VoterForm from "./components/VoterForm";

function App() {
  return (
    <ElectionContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/election/new" element={<NewElection />} />
          <Route path="/election/list" element={<ElectionList />} />
          <Route
            path="/election/:id/add/candidates"
            element={<CandidateForm />}
          />
          <Route path="/election/:id/add/voters" element={<VoterForm />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/voter" element={<VoterPage />} />
          <Route path="/election/:id" element={<ElectionDetailPage />} />
        </Routes>
      </Router>
    </ElectionContextProvider>
  );
}

export default App;
