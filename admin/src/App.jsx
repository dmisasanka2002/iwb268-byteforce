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
import ElectionContextProvider from "./contexts/ElectionContext";
import CandidateForm from "./components/CandidateForm";
import VoterForm from "./components/VoterForm";
import AdminLogin from "./components/AdminLogin";
import AddNewAdmin from "./components/AddNewAdmin"; // Ensure this path is correct

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * The main App component.
 *
 * This component wraps the entire application in the ElectionContextProvider
 * and the ToastContainer. It also defines the routes for the application.
 *
 * The routes are as follows:
 * - "/" renders the AdminLogin component
 * - "/admin-dashboard" renders the AdminDashboard component
 * - "/election/new" renders the NewElection component
 * - "/election/:id/add/candidates" renders the CandidateForm component
 * - "/election/:id/add/voters" renders the VoterForm component
 * - "/election/:id" renders the ElectionDetailPage component
 */
function App() {
  const { id } = useParams();
  return (
    <ElectionContextProvider>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin-dashboard/addnewadmin" element={<AddNewAdmin />} />

          <Route path="/election/new" element={<NewElection />} />
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
