// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";
import OperationTable from "examples/Tables/OperationTable";
import OperationForm from "../../../examples/Dialog/OperationForm";
// Data
import Grid from "@mui/material/Grid";
import Calender from "examples/Calender/Calender";

import getData from "../data/doctorOperations";
import getRequests from "../data/doctorRequests";
import { useEffect, useState } from "react";

function AdminOperations() {
  const OpreationsData = [
    {
      date: "1",
      name: "John",
      email: "kamel@gmail.com",
      department: "Manager",
      status: "valid",
    },
    {
      date: "1",
      name: "John Michael",
      email: "kamel@gmail.com",
      department: "Manager",
      status: "InValid",
    },
    {
      date: "1",
      name: "John Michael",
      email: "kamel@gmail.com",
      department: "Manager",
      status: "valid",
    },
  ];

  const [operationRequests, setOperationRequests] = useState(OpreationsData);
  const [upOperations, setUpOperations] = useState(OpreationsData);
  const [pastOperations, setPastOperations] = useState(OpreationsData);

  useEffect(() => {
    const getUpOpertaions = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/operation/upcoming", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        });
        const responseData = await response.json();
        const outputOperations = responseData.operations.map((op) => {
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
            name: op.patient.name,
            department: op.type,
            status: op.OperationStatus,
          };
        });
        setUpOperations(outputOperations);
      } catch (err) {
        console.log(err);
      }
    };

    const getPastOperations = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/operation/pervious", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        });
        const responseData = await response.json();
        const outputOperations = responseData.operations.map((op) => {
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
            name: op.patient.name,
            department: op.type,
            status: op.OperationStatus,
          };
        });
        setPastOperations(outputOperations);
      } catch (err) {
        console.log(err);
      }
    };

    const getPendingOperation = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/request", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        });
        const responseData = await response.json();
        const outputOperations = responseData.data.data.map((op) => {
          const date = new Date(op.start).toLocaleString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          });
          const now = new Date(op.start);
          const current = now.getHours() + ":" + now.getMinutes();
          console.log(op.id);
          return {
            doctorName: op.doctor.name,
            patientSSN: op.patientSSN,
            paymentMethod: op.paymentMethod,
            status: op.status,
          };
        });
        setOperationRequests(outputOperations);
      } catch (err) {
        console.log(err);
      }
    };

    getUpOpertaions();
    getPastOperations();
    getPendingOperation();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <OperationForm buttonText={"Create New Operation"} />
      <SuiBox py={3}>
        <Grid container spacing={3} xl={12}>
          <Grid item xs={12} xl={6}>
            <SuiBox mb={3}>
              <Card>
                <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                  <SuiTypography variant="h6">Operations Requests</SuiTypography>
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
                  style={{ overflow: "scroll", ["overflow-x"]: "hidden", height: "32vh" }}
                >
                  <OperationTable
                    columns={getRequests(operationRequests).columns}
                    rows={getRequests(operationRequests).rows}
                  />
                </SuiBox>
              </Card>
            </SuiBox>
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
                  style={{ overflow: "scroll", ["overflow-x"]: "hidden", height: "32vh" }}
                >
                  <Table
                    columns={getData(upOperations).columns}
                    rows={getData(upOperations).rows}
                  />
                </SuiBox>
              </Card>
            </SuiBox>
          </Grid>

          <Grid item xs={12} xl={6}>
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
                  style={{ overflow: "scroll", ["overflow-x"]: "hidden", height: "75vh" }}
                >
                  <Table
                    columns={getData(pastOperations).columns}
                    rows={getData(pastOperations).rows}
                    sx={{ height: "100%" }}
                  />
                </SuiBox>
              </Card>
            </SuiBox>
          </Grid>
        </Grid>
      </SuiBox>
      <SuiBox mb={3}>
        <Card>
          <Calender />
        </Card>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default AdminOperations;
