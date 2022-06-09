import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
import CustomerSupport from "examples/Icons/CustomerSupport";
import Profile from "./layouts/profile/Profile";
import DoctorDashboard from "./layouts/dashboard/Dashboard-doctor";
import DoctorsOperations from "./layouts/Operations/Doctor-Nurse/DoctorsOperations";
import DoctorsPatients from "./layouts/tables/DoctorsPatients";
import ContactUs from "layouts/authentication/contact-us/ContactUs";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <Shop size="12px" />,
    component: <DoctorDashboard />,
    noCollapse: true,
  },

  {
    type: "collapse",
    name: "Operations",
    key: "operations",
    route: "/operations",
    icon: <Office size="12px" />,
    component: <DoctorsOperations />,
    noCollapse: true,
  },

  {
    type: "collapse",
    name: "Patients",
    key: "patients",
    route: "/patients",
    icon: <Office size="12px" />,
    component: <DoctorsPatients />,
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
