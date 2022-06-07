// Soft UI Dashboard React icons
import Document from "examples/Icons/Document";
import SpaceShip from "examples/Icons/SpaceShip";

import SignIn from "./layouts/authentication/sign-in/Login";
import SignUp from "./layouts/authentication/sign-up/SignUp";
import ContactUs from "./layouts/authentication/contact-us/ContactUs";

const routes = [
  { type: "title", title: "Account Pages", key: "account-pages" },

  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    route: "/sign-in",
    icon: <Document size="12px" />,
    component: <SignIn />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    route: "/sign-up",
    icon: <SpaceShip size="12px" />,
    component: <SignUp />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "contact-us",
    key: "contact-us",
    route: "/contact-us",
    icon: <SpaceShip size="12px" />,
    component: <ContactUs />,
    noCollapse: true,
  },
];

export default routes;
