import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import SuiButton from "../../components/SuiButton";
import SuiTypography from "../../components/SuiTypography";
import Card from "@mui/material/Card";
import SuiBox from "../../components/SuiBox";
import SuiInput from "../../components/SuiInput";

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

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
          <DialogTitle>New Operation Form</DialogTitle>
          <DialogContent>
            <Card sx={{ width: "100%" }}>
              <SuiBox pt={2} pb={3} pl={5} pr={5}>
                <SuiBox component="form" role="form" sx={{ width: "25rem" }}>
                  <SuiBox mb={2}>
                    <SuiInput placeholder="Patient Name" size={"large"} />
                  </SuiBox>
                  <SuiBox mb={2}>
                    <SuiInput type="email" placeholder="Email" />
                  </SuiBox>
                  <SuiBox mb={2}>
                    <SuiInput placeholder="Social Security Number" />
                  </SuiBox>
                  <SuiBox mb={2}>
                    <SuiInput placeholder="Gender" />
                  </SuiBox>
                  <SuiBox mb={2}>
                    <SuiInput type="time" placeholder="time" />
                  </SuiBox>

                  <SuiBox mb={2}>
                    <SuiInput type="date" placeholder="Date" />
                  </SuiBox>

                  <SuiBox mb={2}>
                    <select name="cars" style={{ height: "2rem", border: "0.5rem transparent" }}>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                    <select
                      name="cars"
                      style={{
                        height: "2rem",
                        border: "0.5rem transparent",
                        "&:after": { border: "0.5rem transparent" },
                      }}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </SuiBox>

                  <SuiBox mt={4} mb={1}>
                    <SuiButton variant="gradient" color="info" fullWidth>
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
