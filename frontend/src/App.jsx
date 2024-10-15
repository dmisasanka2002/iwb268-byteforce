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

/**
 * The main App component.
 *
 * This component renders the voter login form at the root route and
 * the vote page at the "/voter/vote/:id" route.
 *
 * It also wraps the entire application in the ElectionContextProvider
 * and the ToastContainer.
 *
 * @param {object} props - Props passed to the component.
 * @return {JSX.Element} - The JSX element representing the App component.
 */
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
