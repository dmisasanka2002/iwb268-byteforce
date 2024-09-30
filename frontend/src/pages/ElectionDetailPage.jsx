import React from "react";
import VotePage from "../components/VotePage";
import ElectionResults from "../components/ElectionResults";
import { useParams } from "react-router-dom";

const ElectionDetailPage = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Election Detail</h1>
      <VotePage electionId={id} />
      <ElectionResults electionId={id} />
    </div>
  );
};

export default ElectionDetailPage;
