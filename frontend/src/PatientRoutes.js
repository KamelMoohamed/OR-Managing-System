import AdminEquipment from "layouts/tables/AdminEquipment";

// Soft UI Dashboard React icons
import Shop from "examples/Icons/Shop";
import Settings from "examples/Icons/Settings";
import CustomerSupport from "examples/Icons/CustomerSupport";
import CreditCard from "examples/Icons/CreditCard";

import Profile from "./layouts/profile/Profile";
import Billing from "./layouts/billing/Billing";
import DashboardPatient from "./layouts/dashboard/Dashboard-patient";
import MedicalRecord from "./layouts/medical-record/MedicalRecord";
import ContactUs from "layouts/authentication/contact-us/ContactUs";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <Shop size="12px" />,
    component: <DashboardPatient />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Billing",
    key: "billing",
    route: "/billing",
    icon: <CreditCard size="12px" />,
    component: <Billing />,
    noCollapse: true,
  },

  {
    type: "collapse",
    name: "Medical Record",
    key: "medical-record",
    route: "/medical-record",
    icon: <Settings size="12px" />,
    component: <MedicalRecord />,
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
