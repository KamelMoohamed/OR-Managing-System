import React from "react";

import "./PersonCard.css";
const PersonCard = (props) => {
  return (
    <div className="person-card">
      <img src={props.person.image} />
      <h2>{props.person.name}</h2>
      <p>{props.person.additionalInfo}</p>
    </div>
  );
};

export default PersonCard;
