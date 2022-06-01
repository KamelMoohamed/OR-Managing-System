import React, { useState } from "react";
import "./MainNavigation.css";
import Button from "../FormElements/Button";
import logo from '../../assets/navlogo.png'

function Navbar() {
  const [active, setActive] = useState("nav__menu");
  const [icon, setIcon] = useState("nav__toggler");
  const [activeBar, setActiveBar] = useState('nav__link')

  const navToggle = () => {
    if (active === "nav__menu") {
      setActive("nav__menu nav__active");
    } else setActive("nav__menu");

    // Icon Toggler
    if (icon === "nav__toggler") {
      setIcon("nav__toggler toggle");
    } else setIcon("nav__toggler");
  };

  const activeTabBarChange = __ =>{

  }

  return (
      <nav className="nav">

        <a href='/'>
          <img className='logo' src={logo} alt={'logo'}/>
        </a>

        <ul className={active}>
          <div className="dot"></div>
          <li className="nav__ite">
            <a href="/" className={activeBar} onClick={activeTabBarChange}>
              Home
            </a>
          </li>
          <li className="nav__item">
            <a href="/about" className="nav__link">
              About
            </a>
          </li>
          <li className="nav__item">
            <a href="/staff" className="nav__link">
              Staff
            </a>
          </li>
          <li className="nav__item">
            <a href="#" className="nav__link">
              Contact Us
            </a>
          </li>
          <li className="nav__item">
            <a href="/login" className="nav__link">
             Sign in
            </a>
          </li>

          <li>
            <a>
              <Button>
                <span>Sign Up</span>
              </Button>
            </a>
          </li>

        </ul>
          <div onClick={navToggle} className={icon}>
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
      </nav>
  );
}

export default Navbar;
