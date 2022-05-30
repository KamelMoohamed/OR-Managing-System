import React from "react";
import "./Section1.css";
import orPhoto from "../../Source/or.jpg";
import logo from "../../Source/logo.jpg";

const Section1 = () => {
  return (
    <div className="home-section1">
      <img className="or-photo" src={orPhoto} />
      <img className="logo" src={logo} />
      <p>Cairo University Operation Rooms</p>
      <p>Cairo University Operation Rooms</p>
      <p>Cairo University Operation Rooms</p>
    </div>
  );
};

export default Section1;
