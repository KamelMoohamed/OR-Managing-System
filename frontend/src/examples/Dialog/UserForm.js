// Alert Package
import swal from "sweetalert";

import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import SuiButton from "../../components/SuiButton";
import SuiTypography from "../../components/SuiTypography";
import Card from "@mui/material/Card";
import SuiBox from "../../components/SuiBox";
import SuiInput from "../../components/SuiInput";
import { useState } from "react";

export default function FormDialog() {
  const [open, setOpen] = useState(false);

  const [SSN, setSSN] = useState({ target: { value: "" } });
  const [name, setName] = useState({ target: { value: "" } });
  const [email, setEmail] = useState({ target: { value: "" } });
  const [role, setRole] = useState({ target: { value: "lead-doctor" } });
  const [phone, setPhone] = useState({ target: { value: "" } });
  const [gender, setGender] = useState({ target: { value: "male" } });
  const [password, setPassword] = useState({ target: { value: "" } });
  const [birthdate, setBirthdate] = useState({ target: { value: "" } });

  const SSNHandler = (d) => setSSN(d);
  const nameHandler = (d) => setName(d);
  const emailHandler = (d) => setEmail(d);
  const roleHandler = (d) => setRole(d);
  const phoneHandler = (d) => setPhone(d);
  const genderHandler = (d) => setGender(d);
  const birthdateHandler = (d) => setBirthdate(d);
  const passwordHandler = (d) => setPassword(d);

  const onClickHandler = (ob) => {
    return async (event) => {
      event.preventDefault();
      console.log(ob.nurseSSN);
      try {
        const res = await fetch("http://localhost:8000/api/v1/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
          body: JSON.stringify({
            SSN: ob.SSN,
            name: ob.name,
            email: ob.email,
            role: ob.role,
            phone: ob.phone,
            password: ob.password,
            birthDate: ob.birthdate,
            gender: ob.gender,
          }),
        });
        const resData = await res.json();
        if (resData.status === "fail") {
          swal(resData.message);
        } else {
          setOpen(false);
        }
      } catch (err) {
        console.log(err);
      }
    };
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <SuiButton variant="contained" onClick={handleClickOpen} color={"info"}>
        <SuiTypography variant="button" color={""}>
          New Member
        </SuiTypography>
      </SuiButton>

      <Card>
        <Dialog open={open} onClose={handleClose} sx={{ width: "100%" }}>
          <DialogTitle>Member Form</DialogTitle>
          <DialogContent>
            <Card sx={{ width: "100%" }}>
              <SuiBox pt={2} pb={3} pl={5} pr={5}>
                <SuiBox component="form" role="form" sx={{ width: "25rem" }}>
                  <SuiBox mb={2}>
                    <SuiInput placeholder="SSN" onChange={SSNHandler} />
                  </SuiBox>
                  <SuiBox mb={2}>
                    <SuiInput placeholder="Name" onChange={nameHandler} />
                  </SuiBox>
                  <SuiBox mb={2}>
                    <SuiInput type="email" placeholder="E-mail" onChange={emailHandler} />
                  </SuiBox>
                  <SuiBox mb={2}>
                    <SuiInput type="type" placeholder="Phone" onChange={phoneHandler} />
                  </SuiBox>
                  <h4>Birthdate</h4>
                  <SuiBox mb={2}>
                    <SuiInput type="date" placeholder="Birthdate" onChange={birthdateHandler} />
                  </SuiBox>
                  <h4>Recovery Room Info</h4>
                  <SuiBox mb={2}>
                    <SuiInput type="password" placeholder="Password" onChange={passwordHandler} />
                  </SuiBox>
                  <SuiBox mb={2}>
                    <select
                      name="cars"
                      style={{ height: "2rem", border: "0.5rem transparent" }}
                      onChange={genderHandler}
                    >
                      <option value="male">Male</option>
                      <option value="female">Fe-male</option>
                    </select>
                  </SuiBox>
                  <SuiBox mb={2}>
                    <select
                      name="cars"
                      style={{ height: "2rem", border: "0.5rem transparent" }}
                      onChange={roleHandler}
                    >
                      <option value="lead-doctor">Lead-Doctor</option>
                      <option value="doctor">Doctor</option>
                      <option value="lead-nurse">Lead-Nurse</option>
                      <option value="nurse">Nurse</option>
                      <option value="patient">Patient</option>
                      <option value="admin">Admin</option>
                      <option value="ORadmin">CuOR Admin</option>
                    </select>
                  </SuiBox>

                  <SuiBox mt={4} mb={1}>
                    <SuiButton
                      variant="gradient"
                      color="info"
                      fullWidth
                      onClick={onClickHandler({
                        SSN: SSN.target.value,
                        name: name.target.value,
                        email: email.target.value,
                        role: role.target.value,
                        phone: phone.target.value,
                        gender: gender.target.value,
                        password: password.target.value,
                        birthdate: birthdate.target.value,
                      })}
                    >
                      Add Member
                    </SuiButton>
                  </SuiBox>
                </SuiBox>
              </SuiBox>
            </Card>
          </DialogContent>
        </Dialog>
      </Card>
    </div>
  );
}
