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
      <div className="card-top"></div>
      <div className="card-bottom"></div>
      <CardImage type={props.type} avatar={props.avatar} />
      <h2 className="card-heading">{props.login}</h2>
    </div>
  );
}

export default Card;
