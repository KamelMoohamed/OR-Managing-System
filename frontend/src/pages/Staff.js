import React from "react";
import PersonCard from "../components/PersonCard";
import DoctorsCard from "../components/DoctorsCard";
import doctorsImg from "../assets/doctors.jpg";
import personImg from "../assets/test.jpg";

const Staff = () => {
  const person = {
    image: personImg,
    name: "Kamel Mohamed",
    additionalInfo: "Full-Stack web developer",
  };

  return (
    <div>
      <DoctorsCard
        doctors={{
          image: doctorsImg,
          describtion: "CuOR Doctors",
        }}
      />
      <br />
      <PersonCard person={person} />
    </div>
  );
};

export default Staff;
