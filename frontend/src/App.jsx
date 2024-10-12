import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
import VoterPage from "./pages/VoterPage";
import "./App.css";
import ElectionContextProvider from "./contexts/ElectionContext";
import VotePage from "./pages/VotePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { id } = useParams();
  return (
    <ElectionContextProvider>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<VoterPage />} />
          <Route
            path="/voter/vote/:id"
            element={<VotePage electionId={id} />}
          />
        </Routes>
      </Router>
    </ElectionContextProvider>
  );
}

export default App;
