import AdminEquipment from "layouts/tables/AdminEquipment";

// Soft UI Dashboard React icons
import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
import Settings from "examples/Icons/Settings";
import CustomerSupport from "examples/Icons/CustomerSupport";
import CreditCard from "examples/Icons/CreditCard";
import Cube from "examples/Icons/Cube";

import Profile from "./layouts/profile/Profile";
import Billing from "./layouts/billing/Billing";
import DashboardPatient from "./layouts/dashboard/Dashboard-patient";
import MedicalRecord from "./layouts/medical-record/MedicalRecord";
import DoctorDashboard from "./layouts/dashboard/Dashboard-doctor";
import DoctorsOperations from "./layouts/Operations/Doctor-Nurse/DoctorsOperations";
import DoctorsPatients from "./layouts/tables/DoctorsPatients";
import Requests from "./layouts/requests/Requests";
import Rooms from "./layouts/Rooms/Rooms";
import AdminStaff from "./layouts/tables/AdminStaff";
import AdminOperations from "./layouts/Operations/Admin/AdminOperations";
import AdminStats from "./layouts/AdminStats/AdminStats";
import Dashboard from "./layouts/dashboard/Dashboard";
import SignUp from "layouts/authentication/sign-up/SignUp";
import Login from "layouts/authentication/sign-in/Login";
import ContactUs from "layouts/authentication/contact-us/ContactUs";

const routes = [
  {
    type: "collapse",
    name: "Operations Admin",
    key: "operations-admin",
    route: "/operations-admin",
    icon: <Office size="12px" />,
    component: <AdminOperations />,
    noCollapse: true,
  },

  {
    type: "collapse",
    name: "Rooms",
    key: "rooms",
    route: "/rooms",
    icon: <CreditCard size="12px" />,
    component: <Rooms />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Stocks",
    key: "Stocks",
    route: "/equipments",
    icon: <Cube size="12px" />,
    component: <AdminEquipment />,
    noCollapse: true,
  },

  { type: "title", title: "Account Pages", key: "account-pages" },

  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    route: "/profile",
    icon: <CustomerSupport size="12px" />,
    component: <Profile />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "contact-us",
    key: "contact-us",
    route: "/contact-us",
    icon: <CustomerSupport size="12px" />,
    component: <ContactUs />,
    noCollapse: true,
  },
];

export default routes;
