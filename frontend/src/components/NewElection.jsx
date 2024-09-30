import React, { useContext } from "react";
import { ElectionContext } from "../contexts/ElectionContext";
import ElectionForm from "./ElectionForm";
import ElectionList from "./ElectionList";

const NewElection = () => {
  return (
    <div>
      <div className="new-election">
        {/* Election Form */}
        <div className="form-container">
          <h2>Create New Election</h2>
          <ElectionForm />
        </div>
      </div>
      <ElectionList />
    </div>
  );
};

export default NewElection;
