import React from "react";

import "./Footer.css";
import logo from "../../Source/logo.jpg";
const Footer = () => {
  return (
    <div className="footer">
      <img src={logo} />
      <p>All rights reserved team 5 -</p>
      <p>Systems and Biomedical Engineering</p>
      <p>Second Year - Second Term</p>
    </div>
  );
};

export default Footer;
