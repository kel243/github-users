import React from "react";
import "./RepoCard.css";

function RepoCard(props) {
  return (
    <div className="repoCard">
      <h2>{props.name}</h2>
    </div>
  );
}

export default RepoCard;
