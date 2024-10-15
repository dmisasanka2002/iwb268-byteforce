import React from "react";
import ElectionForm from "./ElectionForm";

/**
 * NewElection is a React component that renders a form for creating a new election.
 *
 * This component renders a form with the title, start time and end time of the
 * election. It calls the ElectionForm component to render the actual form.
 *
 * @returns {React.ReactElement} - The rendered component.
 */
const NewElection = () => {
  return (
    <div>
      <div className="new-election">
        <ElectionForm />
      </div>
    </div>
  );
};

export default NewElection;
