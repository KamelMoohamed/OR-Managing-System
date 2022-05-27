import React from "react";

import "./DoctorsCard.css";
const PersonCard = (props) => {
  return (
    <div className="doctors-card">
      <img src={props.doctors.image} />
      <p>{props.doctors.describtion}</p>
    </div>
  );
};

export default PersonCard;
