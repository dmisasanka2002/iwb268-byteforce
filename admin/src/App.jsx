import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
import ElectionDetailPage from "./pages/ElectionDetailPage";
import "./App.css";
import AdminDashboard from "./components/AdminDashboard";
import NewElection from "./components/NewElection";
import ElectionList from "./components/ElectionList";
import ElectionContextProvider from "./contexts/ElectionContext";
import CandidateForm from "./components/CandidateForm";
import VoterForm from "./components/VoterForm";
import AdminLogin from "./components/AdminLogin";

function App() {
  const { id } = useParams();
  return (
    <ElectionContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/election/new" element={<NewElection />} />
          <Route path="/election/list" element={<ElectionList />} />
          <Route
            path="/election/:id/add/candidates"
            element={<CandidateForm />}
          />
          <Route path="/election/:id/add/voters" element={<VoterForm />} />
          <Route path="/election/:id" element={<ElectionDetailPage />} />
        </Routes>
      </Router>
    </ElectionContextProvider>
  );
}

export default App;
