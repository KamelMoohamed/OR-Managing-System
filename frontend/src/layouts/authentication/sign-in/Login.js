// Alert Package
import swal from "sweetalert";

import { useState, useContext } from "react";
// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";
import doors from "assets/images/hospital-corridor-01.jpg";
// Images

import { AuthContext } from "../../../context/index";

function SignIn() {
  const [rememberMe, setRememberMe] = useState(true);
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const [isChangedEmail, setOnChangeEmail] = useState("");
  const [isChangedPassword, setOnChangePassword] = useState("");

  const handelEmail = (email) => setOnChangeEmail(email);
  const handelPassword = (password) => setOnChangePassword(password);

  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const onClickHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        body: JSON.stringify({
          email: isChangedEmail.target.value,
          password: isChangedPassword.target.value,
        }),
      });
      const responseData = await response.json();
      if (responseData.status === "fail") {
        swal(responseData.message);
      }
      auth.login(responseData.data.user.role);
      auth.token = responseData.token;
      localStorage.setItem("jwt", responseData.token);
      localStorage.setItem("login", true);
      auth.userId = responseData.data.user.id;
      navigate("./dashboard");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <CoverLayout
      title="Welcome back!"
      description="Enter your email and password to sign in"
      image={doors}
    >
      <SuiBox component="form" role="form">
        <SuiBox mb={2}>
          <SuiBox mb={1} ml={0.5}>
            <SuiTypography component="label" variant="caption" fontWeight="bold">
              Email
            </SuiTypography>
          </SuiBox>
          <SuiInput type="email" placeholder="Email" onChange={handelEmail} />
        </SuiBox>
        <SuiBox mb={2}>
          <SuiBox mb={1} ml={0.5}>
            <SuiTypography
              component="label"
              variant="caption"
              fontWeight="bold"
              onChange={handelPassword}
            >
              Password
            </SuiTypography>
          </SuiBox>
          <SuiBox mb={2}>
            <SuiInput type="password" placeholder="Password" onChange={handelPassword} />
          </SuiBox>
        </SuiBox>
        <SuiBox display="flex" alignItems="center">
          <Switch checked={rememberMe} onChange={handleSetRememberMe} />
          <SuiTypography
            variant="button"
            fontWeight="regular"
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            &nbsp;&nbsp;Remember me
          </SuiTypography>
        </SuiBox>
        <SuiBox mt={4} mb={1}>
          <SuiButton variant="gradient" color="info" fullWidth onClick={onClickHandler}>
            sign in
          </SuiButton>
        </SuiBox>
        <SuiBox mt={3} textAlign="center">
          <SuiTypography variant="button" color="text" fontWeight="regular">
            Don&apos;t have an account?{" "}
            <SuiTypography
              component={Link}
              to="/sign-up"
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient
            >
              Sign up
            </SuiTypography>
            {auth.isLoggedIn && <Link to="/sign-up" />}
          </SuiTypography>
        </SuiBox>
      </SuiBox>
    </CoverLayout>
  );
}

export default SignIn;
