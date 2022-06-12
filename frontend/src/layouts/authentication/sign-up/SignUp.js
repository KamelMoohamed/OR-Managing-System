// Alert Package
import swal from "sweetalert";

import { useState, useContext } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import Socials from "layouts/authentication/components/Socials";
import Separator from "layouts/authentication/components/Separator";

// Images
import headerImg from "assets/images/HospitalsSignup.1.jpg";
import { useHttpClient } from "../../../Hooks/http-hook";
import { AuthContext } from "../../../context/index";

function SignUp() {
  const [agreement, setAgremment] = useState(true);
  const [isChangedEmail, setOnChangeEmail] = useState("");
  const [isChangedName, setOnChangeName] = useState("");
  const [isChangedPassword, setOnChangePassword] = useState("");
  const [isChangedSSN, setOnChangeSSN] = useState("");
  const [isChangedGender, setOnChangeGender] = useState("");

  const handleSetAgremment = () => setAgremment(!agreement);
  const handelEmail = (email) => setOnChangeEmail(email);
  const handelName = (name) => setOnChangeName(name);
  const handelPassword = (password) => setOnChangePassword(password);
  const handelSSN = (ssn) => setOnChangeSSN(ssn);
  const handelGender = (gender) => setOnChangeGender(gender);

  const navigate = useNavigate();

  const auth = useContext(AuthContext);

  const onClickHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/v1/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          SSN: isChangedSSN.target.value,
          name: isChangedName.target.value,
          email: isChangedEmail.target.value,
          password: isChangedPassword.target.value,
          gender: isChangedGender.target.value,
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
    <BasicLayout
      title="Welcome to CuOR+"
      description="Create your new account in the largest operation rooms systems for free."
      image={headerImg}
    >
      <Card>
        <SuiBox p={3} mb={1} textAlign="center">
          <SuiTypography variant="h5" fontWeight="medium">
            Register with
          </SuiTypography>
        </SuiBox>
        <SuiBox mb={2}>
          <Socials />
        </SuiBox>
        <Separator />
        <SuiBox pt={2} pb={3} px={3}>
          <SuiBox component="form" role="form">
            <SuiBox mb={2}>
              <SuiInput placeholder="Name" onChange={handelName} />
            </SuiBox>
            <SuiBox mb={2}>
              <SuiInput type="email" placeholder="Email" onChange={handelEmail} />
            </SuiBox>
            <SuiBox mb={2}>
              <SuiInput placeholder="Social Security Number" onChange={handelGender} />
            </SuiBox>
            <SuiBox mb={2}>
              <SuiInput placeholder="Gender" onChange={handelSSN} />
            </SuiBox>
            <SuiBox mb={2}>
              <SuiInput type="password" placeholder="Password" onChange={handelPassword} />
            </SuiBox>
            <SuiBox display="flex" alignItems="center">
              <Checkbox checked={agreement} onChange={handleSetAgremment} />
              <SuiTypography
                variant="button"
                fontWeight="regular"
                onClick={handleSetAgremment}
                sx={{ cursor: "poiner", userSelect: "none" }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </SuiTypography>
              <SuiTypography component="a" href="#" variant="button" fontWeight="bold" textGradient>
                Terms and Conditions
              </SuiTypography>
            </SuiBox>
            <SuiBox mt={4} mb={1}>
              <SuiButton variant="gradient" color="info" fullWidth onClick={onClickHandler}>
                sign up
              </SuiButton>
            </SuiBox>
            <SuiBox mt={3} textAlign="center">
              <SuiTypography variant="button" color="text" fontWeight="regular">
                Already have an account?&nbsp;
                <SuiTypography
                  component={Link}
                  to="/sign-in"
                  variant="button"
                  color="dark"
                  fontWeight="bold"
                  textGradient
                >
                  Sign in
                </SuiTypography>
              </SuiTypography>
            </SuiBox>
          </SuiBox>
        </SuiBox>
      </Card>
    </BasicLayout>
  );
}

export default SignUp;
