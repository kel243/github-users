import React from "react";

function CardImage(props) {
  return (
    <img
      className={props.type === "home" ? "card-image" : "card-image-profile"}
      src={props.avatar}
      alt="Avatar"
    ></img>
  );
}

export default CardImage;
