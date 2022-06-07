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

// Data
import getData from "./data/PatientsTableData";
import Container from "@mui/material/Container";
import SuiButton from "../../components/SuiButton";
import SuiBadge from "../../components/SuiBadge";
import LetterAvatars from "../../components/MuiAvatar/LetterAvatar";
import PatientTableData from "../../layouts/tables/data/PatientsTableData";

import { useState, useEffect } from "react";

function Patient({ name }) {
  return (
    <SuiBox display="flex" alignItems="center" px={1} py={0.5}>
      <SuiBox mr={2}>
        <LetterAvatars name={name} alt={name} size="sm" variant="rounded" />
      </SuiBox>
      <SuiBox display="flex" flexDirection="column">
        <SuiTypography variant="button" fontWeight="medium">
          {name}
        </SuiTypography>
      </SuiBox>
    </SuiBox>
  );
}

function Surgery({ surgery }) {
  return (
    <SuiBox display="flex" flexDirection="column">
      <SuiTypography variant="caption" fontWeight="medium" color="text">
        {surgery}
      </SuiTypography>
      <SuiTypography variant="caption" color="secondary">
        Surgery
      </SuiTypography>
    </SuiBox>
  );
}

const data = [
  {
    name: "John",
    SSN: "john@creative-tim.com",
    phone: "Manager",
    birthdate: "23/04/18",
  },
];

function DoctorsPatients() {
  const [patientsData, setPatientData] = useState(data);

  useEffect(() => {
    const getpatients = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/user/patients", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        });
        const responseData = await response.json();
        setPatientData(
          responseData.patients.map((d) => {
            const date = new Date(d.birthDate);
            return {
              name: d.name,
              SSN: d.SSN,
              phone: d.phone[0],
              birthdate: date.toLocaleString("en-US", {
                month: "long",
                year: "numeric",
              }),
            };
          })
        );
      } catch (err) {
        console.log(err);
      }
    };
    getpatients();
  }, []);

  const columns = [
    { name: "name", align: "left" },
    { name: "SSN", align: "center" },
    { name: "phone", align: "center" },
    { name: "birthdate", align: "center" },
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox py={3}>
        <SuiBox mb={3}>
          <Container fixed>
            <Card>
              <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <SuiTypography variant="h6">Patients table</SuiTypography>
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
                style={{ overflow: "scroll", ["overflow-x"]: "hidden", maxHeight: "68.5vh" }}
              >
                <Table columns={columns} rows={getData(patientsData).rows} />
              </SuiBox>
            </Card>
          </Container>
        </SuiBox>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default DoctorsPatients;
