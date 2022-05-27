import React from "react";
import { NavLink } from "react-router-dom";

import "./NavLinks.css";

const NavLinks = (props) => {
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact="true">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/about">About</NavLink>
      </li>
      <li>
        <NavLink to="/staff">Staff</NavLink>
      </li>
      <li>
        <NavLink to="/about-us">About US</NavLink>
      </li>
      <li>
        <NavLink to="/login">Sign in</NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
