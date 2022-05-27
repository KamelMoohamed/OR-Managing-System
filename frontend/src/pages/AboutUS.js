import React from "react";
import PersonCard from "../components/PersonCard";
import Image from "../Source/test.jpg";

const AboutUS = () => {
  const person = {
    image: Image,
    name: "Kamel Mohamed",
    additionalInfo: "Full-Stack web developer",
  };
  return (
    <div>
      <PersonCard person={person} />
    </div>
  );
};

export default AboutUS;
