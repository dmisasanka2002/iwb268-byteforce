import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
import VoterPage from "./pages/VoterPage";
import "./App.css";
// import ElectionList from "./components/ElectionList";
import ElectionContextProvider from "./contexts/ElectionContext";
import VotePage from "./pages/VotePage";

function App() {
  const { id } = useParams();
  return (
    <ElectionContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<VoterPage />} />
          {/* <Route path="/election/list" element={<ElectionList />} /> */}
          <Route path="/voter/vote" element={<VotePage electionId={id} />} />
        </Routes>
      </Router>
    </ElectionContextProvider>
  );
}

export default App;
