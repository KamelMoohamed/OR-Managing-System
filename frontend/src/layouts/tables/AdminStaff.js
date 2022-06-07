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
import getData from "./data/StaffTableData";
import getNursesData from "./data/nursesTableData";
import Container from "@mui/material/Container";
import UserForm from "../../examples/Dialog/UserForm";
import { useState, useEffect } from "react";

const DoctorsData = [
  {
    SSN: "1",
    name: "John",
    department: "Manager",
    major: "valid",
    title: "valid",
  },
];

const NursesData = [
  {
    SSN: "1",
    name: "John",
    title: "Manager",
    birthdate: "valid",
  },
];

function AdminStaff() {
  const [doctorsData, setDoctorsData] = useState(DoctorsData);
  const [nursesData, setNursesData] = useState(NursesData);

  useEffect(() => {
    const getDoctors = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/user/getalldoc", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        });
        const responseData = await response.json();
        const supplyOutput = responseData.data.data.map((d) => {
          return {
            SSN: d.SSN,
            name: d.name,
            major: d.major,
            title: d.role,
            department: d.department,
          };
        });
        console.log(supplyOutput);
        setDoctorsData(supplyOutput);
      } catch (err) {
        console.log(err);
      }
    };
    const getNurses = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/user/getallnurse", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        });
        const responseData = await response.json();
        const equipmentOutput = responseData.data.data.map((d) => {
          const date = new Date(d.birthDate);
          return {
            SSN: d.SSN,
            name: d.name,
            title: d.role,
            birthdate: date.toLocaleString("en-US", { month: "long", year: "numeric" }),
          };
        });

        setNursesData(equipmentOutput);
      } catch (err) {
        console.log(err);
      }
    };

    getNurses();
    getDoctors();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <UserForm />
      <SuiBox py={3}>
        <SuiBox mb={3}>
          <Container>
            <Card>
              <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <SuiTypography variant="h6">Doctors table</SuiTypography>
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
                <Table columns={getData(doctorsData).columns} rows={getData(doctorsData).rows} />
              </SuiBox>
            </Card>
          </Container>
        </SuiBox>
        <SuiBox mb={3}>
          <Container>
            <Card>
              <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <SuiTypography variant="h6">Nurses table</SuiTypography>
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
                <Table
                  columns={getNursesData(nursesData).columns}
                  rows={getNursesData(nursesData).rows}
                />
              </SuiBox>
            </Card>
          </Container>
        </SuiBox>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default AdminStaff;
