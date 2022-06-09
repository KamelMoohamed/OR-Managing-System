import Settings from "examples/Icons/Settings";
import CustomerSupport from "examples/Icons/CustomerSupport";

import Profile from "./layouts/profile/Profile";
import AdminStaff from "./layouts/tables/AdminStaff";
import AdminStats from "./layouts/AdminStats/AdminStats";
import ContactUs from "layouts/authentication/contact-us/ContactUs";

const routes = [
  {
    type: "collapse",
    name: "Staff",
    key: "staff-admin",
    route: "/staff-admin",
    icon: <Settings size="12px" />,
    component: <AdminStaff />,
    noCollapse: true,
  },

  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <Settings size="12px" />,
    component: <AdminStats />,
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
