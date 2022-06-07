// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";

// Soft UI Dashboard React components
// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DefaultLineChart from "../../examples/Charts/LineCharts/DefaultLineChart";
import Scans from "./components/Scans";
// medical record page components
import Card from "@mui/material/Card";
import SuiTypography from "../../components/SuiTypography";
import getData from "../tables/data/pastOperationData";
import PatientCard from "./components/PatientCard";
import homeDecor1 from "assets/images/home-decor-1.jpg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import OperationCard from "../../examples/Cards/OperationCard/OperationCard";
import Table from "../../examples/Tables/Table/index";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/index";

function MedicalRecord() {
  const auth = useContext(AuthContext);

  const [isChangedEmail, setOnChangeEmail] = useState("");
  const [isChangedName, setOnChangeName] = useState("");
  const [isChangedBirthDate, setOnChangeBirthDate] = useState("");
  const [isChangedPhone, setChangedPhone] = useState("");
  const [isChangedAdress, setOnChangeAdress] = useState("");
  const [upComingOps, setUpComingOps] = useState([]);
  const [previousOps, setPreviousOps] = useState([]);
  const [pendingOperations, setPendingOperations] = useState([
    {
      date: "20-5",
      title: "Department",
      start: "2022-06-09T10:30:00.000Z",
    },
  ]);

  useEffect(() => {
    const fetchPendingOperation = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/v1/user/pending-operations", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        });
        const responceData = await res.json();

        const jsonOutput = responceData.pendingOps.ops;
        console.log(jsonOutput);
        // const date = new Date(jsonOutput.start);
        // jsonOutput.start = date.toLocaleString("en-US", { month: "short", day: "numeric" });
        // jsonOutput.end = date.toLocaleString("en-US", { hour: "2-digit", minute: "2-digit" });
        setPendingOperations(jsonOutput);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchMe = async () => {
      try {
        const responce = await fetch(`http://localhost:8000/api/v1/user/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        });
        const responceData = await responce.json();

        setOnChangeName(responceData.user.name);
        setOnChangeEmail(responceData.user.email);
        setOnChangeAdress(responceData.user.address);
        const birthdate = new Date(responceData.user.birthDate);
        setOnChangeBirthDate(
          birthdate.toLocaleString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })
        );
        setChangedPhone(responceData.user.phone[0]);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchUpCOperations = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/user/upcoming-operation", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        });
        const responseData = await response.json();
        const outputOperations = responseData.operations.preOps.map((op) => {
          const date = new Date(op.start).toLocaleString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          });
          const now = new Date(op.start);
          const current = now.getHours() + ":" + now.getMinutes();

          return {
            date: date,
            time: current,
            doctor: op.mainDoctor.name,
            type: op.mainDoctor.department,
            status: op.OperationStatus,
          };
        });
        setUpComingOps(outputOperations);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchPerviousCOperations = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/user/previous-operation", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        });
        const responseData = await response.json();
        const outputOperations = responseData.operations.preOps.map((op) => {
          const date = new Date(op.start).toLocaleString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          });
          const now = new Date(op.start);
          const current = now.getHours() + ":" + now.getMinutes();

          return {
            date: date,
            time: current,
            doctor: op.mainDoctor.name,
            type: op.mainDoctor.department,
            status: op.OperationStatus,
          };
        });
        setPreviousOps(outputOperations);
      } catch (err) {
        console.log(err);
      }
    };

    fetchMe();
    fetchUpCOperations();
    fetchPerviousCOperations();
    fetchPendingOperation();
  }, [auth.token]);

  const onClickSuccess = (id) => {
    return async (event) => {
      event.preventDefault();
      try {
        const res = await fetch(`http://localhost:8000/api/v1/operation/replay/${id}/Accept`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        });
        const resData = await res.json();
      } catch (err) {
        console.log(err);
      }
    };
  };

  const onClickError = (id) => {
    return async (event) => {
      event.preventDefault();
      try {
        const res = await fetch(`http://localhost:8000/api/v1/operation/replay/${id}/Refuse`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        });
        const resData = await res.json();
      } catch (err) {
        console.log(err);
      }
    };
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox mt={3} mb={4}>
        <SuiBox mb={1.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} xl={6}>
                  <PatientCard
                    name={isChangedName}
                    birthday={isChangedBirthDate}
                    email={isChangedEmail}
                    address={isChangedAdress}
                    phoneNumber={isChangedPhone}
                  />
                </Grid>
                <Grid item xs={12} xl={6}></Grid>
              </Grid>
            </Grid>
          </Grid>
        </SuiBox>

        <SuiBox>
          <SuiBox mb={3}>
            <Card>
              <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <SuiTypography variant="h6">Upcoming Operations</SuiTypography>
              </SuiBox>
              <SuiBox
                sx={{
                  "& .MuiTableRow-root:not(:last-child)": {
                    "& td": {
                      borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                        `${borderWidth[1]} solid ${borderColor}`,
                    },
                  },
                }}
              >
                <Table columns={getData(upComingOps).columns} rows={getData(upComingOps).rows} />
              </SuiBox>
            </Card>
          </SuiBox>

          <SuiBox mb={3}>
            <Card>
              <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <SuiTypography variant="h6">Past Operations</SuiTypography>
              </SuiBox>
              <SuiBox
                sx={{
                  "& .MuiTableRow-root:not(:last-child)": {
                    "& td": {
                      borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                        `${borderWidth[1]} solid ${borderColor}`,
                    },
                  },
                }}
              >
                <Table columns={getData(previousOps).columns} rows={getData(previousOps).rows} />
              </SuiBox>
            </Card>
          </SuiBox>
        </SuiBox>

        <SuiBox mb={3}>
          <Grid container xl={12} spacing={3} sx={{ height: "100%" }}>
            <Grid item xs={12} lg={3}>
              <DefaultLineChart
                height="10rem"
                title="Blood Pressure"
                chart={{
                  labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                  datasets: [
                    {
                      label: "Organic Search",
                      color: "info",
                      data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
                    },
                  ],
                }}
              />
            </Grid>
            <Grid item xs={12} lg={3}>
              <DefaultLineChart
                height="10rem"
                title="Heart rate"
                chart={{
                  labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                  datasets: [
                    {
                      label: "Organic Search",
                      color: "dark",
                      data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
                    },
                  ],
                }}
              />
            </Grid>
            <Grid item xs={12} lg={3}>
              <DefaultLineChart
                height="10rem"
                title="Cholesterol"
                chart={{
                  labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                  datasets: [
                    {
                      label: "Organic Search",
                      color: "primary",
                      data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
                    },
                  ],
                }}
              />
            </Grid>
            <Grid item xs={12} lg={3}>
              <DefaultLineChart
                height="10rem"
                title="Glucose Level"
                chart={{
                  labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                  datasets: [
                    {
                      label: "Organic Search",
                      color: "secondary",
                      data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
                    },
                  ],
                }}
              />
            </Grid>
          </Grid>
        </SuiBox>

        <SuiBox mb={3}>
          <Grid container xl={12} spacing={3}>
            <Grid item xs={12} lg={3}>
              <Scans />
            </Grid>

            <Grid item xs={12} lg={9}>
              <SuiBox mb={3}>
                <Card>
                  <SuiBox pt={2} px={2}>
                    <SuiBox>
                      <SuiTypography variant="h6" fontWeight="medium">
                        Operation Confirmation
                      </SuiTypography>
                    </SuiBox>
                    <SuiBox>
                      <SuiTypography variant="button" fontWeight="regular" color="text">
                        Confirm your Operation time
                      </SuiTypography>
                    </SuiBox>
                  </SuiBox>
                  <SuiBox p={2}>
                    <Grid container spacing={3}>
                      {pendingOperations.map((op) => {
                        return (
                          <Grid item xs={12} md={6} xl={3}>
                            <OperationCard
                              image={homeDecor1}
                              title={op.title}
                              id={op.id}
                              date={op.start}
                              time={op.end}
                              staff={[{ image: team1, name: "" }]}
                              onClickError={onClickError}
                              onClickSuccess={onClickSuccess}
                            />
                          </Grid>
                        );
                      })}
                    </Grid>
                  </SuiBox>
                </Card>
              </SuiBox>
            </Grid>
          </Grid>
        </SuiBox>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default MedicalRecord;
