import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import SuiButton from "../../components/SuiButton";
import SuiTypography from "../../components/SuiTypography";
import Card from "@mui/material/Card";
import SuiBox from "../../components/SuiBox";
import SuiInput from "../../components/SuiInput";
import { PaymentOutlined } from "@mui/icons-material";

export default function FormDialog() {
  const [open, setOpen] = React.useState({ target: { value: "" } });
  const [patientSSN, setPatientSSN] = React.useState({ target: { value: "" } });
  const [nurseSSN, setNurseSSN] = React.useState({ target: { value: "" } });
  const [ORD, setORD] = React.useState({ target: { value: "" } });
  const [RRD, setRRD] = React.useState({ target: { value: "" } });
  const [payment, setPayment] = React.useState({ target: { value: "Cash" } });

  const handlePatient = (p) => {
    setPatientSSN(p);
  };
  const handleNurse = (p) => {
    setNurseSSN(p);
  };
  const handleORD = (p) => {
    setORD(p);
  };
  const handleRRD = (p) => {
    setRRD(p);
  };
  const handlePayment = (p) => {
    setPayment(p);
  };

  const onClickHandler = (ob) => {
    return async (event) => {
      event.preventDefault();
      console.log(ob.nurseSSN);
      try {
        const res = await fetch("http://localhost:8000/api/v1/request", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
          body: JSON.stringify({
            patientSSN: ob.patientSSN,
            nurseSSN: ob.nurseSSN,
            duration: [
              { roomType: "Operation", duration: ob.ORD },
              { roomType: "Recovery", duration: ob.RRD },
            ],
            paymentMethod: ob.payment,
          }),
        });
        const resData = await res.json();

        console.log(resData);
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
      <SuiButton variant="contained" onClick={handleClickOpen} color={"info"}>
        <SuiTypography variant="button" color={""}>
          Request New Operation
        </SuiTypography>
      </SuiButton>

      <Card>
        <Dialog open={open} onClose={handleClose} sx={{ width: "100%" }}>
          <DialogTitle>New Operation </DialogTitle>
          <DialogContent>
            <Card sx={{ width: "100%" }}>
              <SuiBox pt={2} pb={3} pl={5} pr={5}>
                <SuiBox component="form" role="form" sx={{ width: "25rem" }}>
                  <SuiBox mb={2}>
                    <SuiInput placeholder="Patient SSN" size={"large"} onChange={handlePatient} />
                  </SuiBox>
                  <SuiBox mb={2}>
                    <SuiInput placeholder="Nurse SSN" onChange={handleNurse} />
                  </SuiBox>
                  <SuiBox mb={2}>
                    <h4>Operation Room Duration</h4>
                    <SuiInput type="number" placeholder="number" onChange={handleORD} />
                  </SuiBox>
                  <SuiBox mb={2}>
                    <h4>Recovery Room Duration</h4>
                    <SuiInput type="number" placeholder="number" onChange={handleRRD} />
                  </SuiBox>
                  <SuiBox mb={2}>
                    <select
                      name="cars"
                      style={{ height: "2rem", border: "0.5rem transparent" }}
                      onChange={handlePayment}
                    >
                      <option value="Cash">Cash</option>
                      <option value="Insurance">Insurance</option>
                    </select>
                  </SuiBox>
                  <SuiBox mt={4} mb={1}>
                    <SuiButton
                      variant="gradient"
                      color="info"
                      fullWidth
                      onClick={onClickHandler({
                        patientSSN: patientSSN.target.value,
                        nurseSSN: nurseSSN.target.value,
                        ORD: ORD.target.value,
                        RRD: RRD.target.value,
                        payment: payment.target.value,
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
