import React, { useContext } from "react";
import { ElectionContext } from "../contexts/ElectionContext";
import "../styles/ElectionList.css";
import { useNavigate } from "react-router-dom";

const ElectionList = () => {
  const { elections } = useContext(ElectionContext);
  const navigate = useNavigate();

  const handleButtonClick = (e) => {
    // console.log(e.target.textContent);
    switch (e.target.textContent) {
      case "Add Candidates":
        navigate(`/election/${5}/add/candidates`);
        break;
      case "Add Voters":
        navigate(`/election/${5}/add/voters`);
        break;
      case "See Results":
        navigate(`/election/${5}`);
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
              <li key={index}>
                <div className="name">{election.name}</div>
                <div className="buttons">
                  <button onClick={(e) => handleButtonClick(e)}>
                    Add Candidates
                  </button>
                  <button onClick={(e) => handleButtonClick(e)}>
                    Add Voters
                  </button>
                  <button onClick={(e) => handleButtonClick(e)}>
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
