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

export default function FormDialog({ buttonText }) {
  const [open, setOpen] = useState(false);

  const [mainDoctorSSN, setMainDoctorSSN] = useState({ target: { value: "" } });
  const [nurseSSN, setNurseSSN] = useState({ target: { value: "" } });
  const [doctorSSN, setDoctorSSN] = useState({ target: { value: "" } });
  const [patientSSN, setPatientSSN] = useState({ target: { value: "" } });
  const [department, setDepartment] = useState({ target: { value: "" } });
  const [date, setDate] = useState({ target: { value: "" } });

  const [ORID, setORID] = useState({ target: { value: "" } });
  const [RRID, setRRID] = useState({ target: { value: "" } });

  const [ORStartTime, setORStartTime] = useState({ target: { value: "" } });
  const [RRStartTime, setRRStartTime] = useState({ target: { value: "" } });

  const [OREndTime, setOREndime] = useState({ target: { value: "" } });
  const [RREndTime, setRREndTime] = useState({ target: { value: "" } });

  const [emergency, setEmergency] = useState({ target: { value: "Emergency" } });

  const mainDoctorSSNHandler = (d) => setMainDoctorSSN(d);
  const nurseSSNHandler = (d) => setNurseSSN(d);
  const doctorSSNHandler = (d) => setDoctorSSN(d);
  const departmentHandler = (d) => setDepartment(d);
  const dateHandler = (d) => setDate(d);
  const ORIDHandler = (d) => setORID(d);
  const RRIDHandler = (d) => setRRID(d);
  const ORStartTimeHandler = (d) => setORStartTime(d);
  const RRStartTimeHandler = (d) => setRRStartTime(d);
  const OREndTimeHandler = (d) => setOREndime(d);
  const RREndTimeHandler = (d) => setRREndTime(d);
  const emergencyHandler = (d) => setEmergency(d);
  const patientHandler = (d) => setPatientSSN(d);

  const onClickHandler = (ob) => {
    return async (event) => {
      event.preventDefault();
      console.log(ob.nurseSSN);
      try {
        const res = await fetch("http://localhost:8000/api/v1/operation", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
          body: JSON.stringify({
            mainDoctorSSN: ob.mainDoctorSSN,
            patientSSN: ob.patientSSN,
            staffSSN: [ob.doctorSSN, ob.nurseSSN],
            rooms: [
              {
                RID: ob.ORID,
                start: `${ob.date}, ${ob.ORStartTime}`,
                end: `${ob.date}, ${ob.OREndTime}`,
              },
              {
                RID: ob.RRID,
                start: `${ob.date}, ${ob.RRStartTime}`,
                end: `${ob.date}, ${ob.RREndTime}`,
              },
            ],
            type: ob.emergency,
            department: ob.department,
          }),
        });
        const resData = await res.json();
        if (resData.status === "fail") {
          swal(resData.message);
        }
        setOpen(false);
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
      <SuiBox mt={2} border>
        <SuiButton variant="contained" onClick={handleClickOpen} color={"info"} size={"small"}>
          <SuiTypography variant="button" color={""}>
            {buttonText}
          </SuiTypography>
        </SuiButton>
      </SuiBox>

      <Card>
        <Dialog open={open} onClose={handleClose} sx={{ width: "100%" }}>
          <DialogTitle>Operation Form</DialogTitle>
          <DialogContent>
            <Card sx={{ width: "100%" }}>
              <SuiBox pt={2} pb={3} pl={5} pr={5}>
                <SuiBox component="form" role="form" sx={{ width: "25rem" }}>
                  <SuiBox mb={2}>
                    <SuiInput
                      placeholder="Main Doctor SSN"
                      size={"large"}
                      onChange={mainDoctorSSNHandler}
                    />
                  </SuiBox>
                  <SuiBox mb={2}>
                    <SuiInput placeholder="Department" onChange={departmentHandler} />
                  </SuiBox>
                  <SuiBox mb={2}>
                    <SuiInput placeholder="Doctor" onChange={doctorSSNHandler} />
                  </SuiBox>
                  <SuiBox mb={2}>
                    <SuiInput placeholder="Nurse" onChange={nurseSSNHandler} />
                  </SuiBox>
                  <SuiBox mb={2}>
                    <SuiInput placeholder="Patient" onChange={patientHandler} />
                  </SuiBox>
                  <SuiBox mb={2}>
                    <SuiInput type="date" placeholder="Start Date" onChange={dateHandler} />
                  </SuiBox>
                  <h4>Operation Room Info</h4>
                  <SuiBox mb={2}>
                    <SuiInput placeholder="Operation Room ID" onChange={ORIDHandler} />
                  </SuiBox>
                  <SuiBox mb={2}>
                    <SuiInput type="time" placeholder="Start Time" onChange={ORStartTimeHandler} />
                  </SuiBox>
                  <SuiBox mb={2}>
                    <SuiInput type="time" placeholder="End Time" onChange={OREndTimeHandler} />
                  </SuiBox>
                  <h4>Recovery Room Info</h4>
                  <SuiBox mb={2}>
                    <SuiInput placeholder="Recovery Room ID" onChange={RRIDHandler} />
                  </SuiBox>
                  <SuiBox mb={2}>
                    <SuiInput type="time" placeholder="Start Time" onChange={RRStartTimeHandler} />
                  </SuiBox>
                  <SuiBox mb={2}>
                    <SuiInput type="time" placeholder="End Time" onChange={RREndTimeHandler} />
                  </SuiBox>

                  <SuiBox mb={2}>
                    <select
                      name="cars"
                      style={{ height: "2rem", border: "0.5rem transparent" }}
                      onChange={emergencyHandler}
                    >
                      <option value="Emergency">Emergency</option>
                      <option value="Outpatient">Outpatient</option>
                    </select>
                  </SuiBox>

                  <SuiBox mt={4} mb={1}>
                    <SuiButton
                      variant="gradient"
                      color="info"
                      fullWidth
                      onClick={onClickHandler({
                        mainDoctorSSN: mainDoctorSSN.target.value,
                        nurseSSN: nurseSSN.target.value,
                        doctorSSN: doctorSSN.target.value,
                        department: department.target.value,
                        ORID: ORID.target.value,
                        RRID: RRID.target.value,
                        date: date.target.value,
                        ORStartTime: ORStartTime.target.value,
                        RRStartTime: RRStartTime.target.value,
                        OREndTime: OREndTime.target.value,
                        RREndTime: RREndTime.target.value,
                        emergency: emergency.target.value,
                        patientSSN: patientSSN.target.value,
                      })}
                    >
                      Request
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
