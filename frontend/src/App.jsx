import React from "react";
import { Routes, Route, useParams } from "react-router-dom";
import VoterPage from "./pages/VoterPage";
import "./App.css";
import VotePage from "./pages/VotePage";

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
    <>
      <Routes>
        <Route path="/" element={<VoterPage />} />
        <Route path="/voter/vote/:id" element={<VotePage electionId={id} />} />
      </Routes>
    </>
  );
}

export default App;
