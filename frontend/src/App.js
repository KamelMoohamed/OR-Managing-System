import { useState, useEffect, useMemo, useCallback, React } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";

// Soft UI Dashboard React examples
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Soft UI Dashboard React themes
import theme from "assets/theme";

// RTL plugins
import rtlPlugin from "stylis-plugin-rtl";
import createCache from "@emotion/cache";

// Soft UI Dashboard React routes
import routes from "routes";
import LogoutRoutes from "LogoutRoutes";
import PatientRoutes from "PatientRoutes";
import DoctorRoutes from "DoctorRoutes";
import NurseRoutes from "NurseRoutes";
import AdminRoutes from "AdminRoutes";
import ORAdminRoutes from "ORAdminRoutes";

// Soft UI Dashboard React contexts
import { useSoftUIController, setMiniSidenav, setOpenConfigurator } from "context";

// Images
import brand from "assets/images/logo-ct.png";
import { AuthContext } from "./context/index";
import SignUp from "layouts/authentication/sign-up/SignUp";
import Login from "layouts/authentication/sign-in/Login";
import { token } from "stylis";

export default function App() {
  // const auth = useContext(AuthContext);
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDoctor, setDoctor] = useState(false);
  const [isPatient, setPatient] = useState(false);
  const [isNurse, setNurse] = useState(false);
  const [isAdmin, setAdmin] = useState(false);
  const [isOrAdmin, setORAdmin] = useState(false);
  const [finalRoutes, setFinalRoutes] = useState(routes);

  const login = useCallback((role) => {
    if (role === "lead-doctor" || role === "doctor") {
      setIsLoggedIn(true);
      setDoctor(true);
    } else if (role === "lead-nurse" || role === "nurse") {
      setIsLoggedIn(true);
      setNurse(true);
    } else if (role === "patient") {
      setIsLoggedIn(true);
      setPatient(true);
    } else if (role === "ORadmin") {
      setIsLoggedIn(true);
      setORAdmin(true);
    } else if (role === "admin") {
      setIsLoggedIn(true);
      setAdmin(true);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.setItem("login", false);
    setDoctor(false);
    setAdmin(false);
    setORAdmin(false);
    setNurse(false);
    setPatient(false);
    setIsLoggedIn(false);
  }, []);

  // Cache for the rtl
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  const [R, setR] = useState(
    <Routes>
      <Route path="/sign-in" element={<Login />} />
    </Routes>
  );
  useEffect(() => {
    if (isLoggedIn) {
      if (isPatient) {
        setFinalRoutes(PatientRoutes);
        setR(
          <Routes>
            {getRoutes(PatientRoutes)}
            <Route path="*" element={<Navigate to="dashboard" />} />
          </Routes>
        );
      } else if (isDoctor) {
        setFinalRoutes(DoctorRoutes);
        setR(
          <Routes>
            {getRoutes(DoctorRoutes)}
            <Route path="*" element={<Navigate to="dashboard" />} />
          </Routes>
        );
      } else if (isNurse) {
        setFinalRoutes(NurseRoutes);
        setR(
          <Routes>
            {getRoutes(NurseRoutes)}
            <Route path="*" element={<Navigate to="dashboard" />} />
          </Routes>
        );
      } else if (isAdmin) {
        setFinalRoutes(AdminRoutes);
        setR(
          <Routes>
            {getRoutes(AdminRoutes)}
            <Route path="*" element={<Navigate to="dashboard" />} />
          </Routes>
        );
      } else if (isOrAdmin) {
        setFinalRoutes(ORAdminRoutes);
        setR(
          <Routes>
            {getRoutes(ORAdminRoutes)}
            <Route path="*" element={<Navigate to="operations-admin" />} />
          </Routes>
        );
      } else {
        setR(
          <Routes>
            {getRoutes(routes)}
            <Route path="*" element={<Navigate to="dashboard" />} />
          </Routes>
        );
      }
    } else {
      setFinalRoutes(LogoutRoutes);
      setR(
        <Routes>
          {getRoutes(LogoutRoutes)}
          <Route path="*" element={<Navigate to="sign-up" />} />
        </Routes>
      );
    }
  }, [isLoggedIn, isPatient, isDoctor, isNurse, isOrAdmin, isAdmin]);

  const configsButton = (
    <SuiBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.5rem"
      height="3.5rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="default" color="inherit">
        settings
      </Icon>
    </SuiBox>
  );

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        login: login,
        logout: logout,
        isPatient: isPatient,
        isDoctor: isDoctor,
        isOrAdmin: isOrAdmin,
        isAdmin: isAdmin,
        isNurse: isNurse,
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {layout === "dashboard" && (
          <>
            <Sidenav
              color={sidenavColor}
              brand={brand}
              brandName="CuR Dashboard"
              routes={finalRoutes}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
            />
            <Configurator />
            {configsButton}
          </>
        )}
        {layout === "vr" && <Configurator />}

        <main>{R}</main>
      </ThemeProvider>
    </AuthContext.Provider>
  );
}
