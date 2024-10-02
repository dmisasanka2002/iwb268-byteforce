import React, { useContext } from "react";
import { ElectionContext } from "../contexts/ElectionContext";
import "../styles/ElectionList.css";
import { useNavigate } from "react-router-dom";

const ElectionList = () => {
  const {
    setElectionId,
    upcomingElections,
    happeningElections,
    closedElections,
  } = useContext(ElectionContext);
  const navigate = useNavigate();

  const handleButtonClick = (e, election_id) => {
    switch (e.target.textContent) {
      case "Add Candidates":
        setElectionId(election_id);
        navigate(`/election/${election_id}/add/candidates`);
        break;
      case "Add Voters":
        setElectionId(election_id);
        navigate(`/election/${election_id}/add/voters`);
        break;
      case "See Results":
        setElectionId(election_id);
        navigate(`/election/${election_id}`);
        break;
      default:
        break;
    }
  };

  return (
    <div className="election-list">
      {/* Happening Elections */}
      <div className="happening-elections">
        <h2>Happening Elections</h2>
        {happeningElections.length > 0 ? (
          <ul>
            {happeningElections.map((election, index) => (
              <li key={index} id={election.id}>
                <div className="name">{election.name}</div>
                <div className="buttons">
                  <button className="see-results-button" disabled>
                    See Results
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No ongoing elections.</p>
        )}
      </div>

      {/* Upcoming Elections */}
      <div className="upcoming-elections">
        <h2>Upcoming Elections</h2>
        {upcomingElections.length > 0 ? (
          <ul>
            {upcomingElections.map((election, index) => (
              <li key={index} id={election.id}>
                <div className="name">{election.name}</div>
                <div className="buttons">
                  <button onClick={(e) => handleButtonClick(e, election.id)}>
                    Add Candidates
                  </button>
                  <button onClick={(e) => handleButtonClick(e, election.id)}>
                    Add Voters
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No upcoming elections.</p>
        )}
      </div>

      {/* Closed Elections */}
      <div className="closed-elections">
        <h2>Closed Elections</h2>
        {closedElections.length > 0 ? (
          <ul>
            {closedElections.map((election, index) => (
              <li key={index} id={election.id}>
                <div className="name">{election.name}</div>
                <div className="buttons">
                  <button onClick={(e) => handleButtonClick(e, election.id)}>
                    See Results
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No closed elections.</p>
        )}
      </div>
    </div>
  );
};

export default ElectionList;
