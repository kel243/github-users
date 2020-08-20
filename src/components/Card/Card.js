import React from "react";
import { useHistory } from "react-router-dom";
import CardImage from "./CardImage/CardImage";
import "./Card.css";

function Card(props) {
  const history = useHistory();
  const clickHandler = () => {
    history.push(`/users/${props.login}`);
  };

  return (
    <div className="card" onClick={clickHandler}>
      <h2 className="card-heading">{props.login}</h2>
      <CardImage avatar={props.avatar} />
    </div>
  );
}

export default Card;
