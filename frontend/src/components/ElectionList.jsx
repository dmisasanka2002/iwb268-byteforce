import React, { useContext } from "react";
import { ElectionContext } from "../contexts/ElectionContext";
import "../styles/ElectionList.css";
import { useNavigate } from "react-router-dom";

const ElectionList = () => {
  const { elections, setElectionId } = useContext(ElectionContext);
  const navigate = useNavigate();

  const handleButtonClick = (e, election_id) => {
    // console.log(e.target.textContent);
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
    }
  };
  return (
    <div className="election-list">
      {/* List of Created Elections */}
      <div className="elections-list">
        <h2>Created Elections</h2>
        {elections.length > 0 ? (
          <ul>
            {elections.map((election, index) => (
              <li key={index} id={election.id}>
                <div className="name">{election.name}</div>
                <div className="buttons">
                  <button onClick={(e) => handleButtonClick(e, election.id)}>
                    Add Candidates
                  </button>
                  <button onClick={(e) => handleButtonClick(e, election.id)}>
                    Add Voters
                  </button>
                  <button onClick={(e) => handleButtonClick(e, election.id)}>
                    See Results
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No elections created yet.</p>
        )}
      </div>
    </div>
  );
};

export default ElectionList;
