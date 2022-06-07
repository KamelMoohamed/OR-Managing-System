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
import getData from "./data/equipmentTableData";
import getSupplies from "./data/suppliesData";
import Container from "@mui/material/Container";
import { useState, useEffect } from "react";

function AdminEquipment() {
  const EquipmentData = [
    {
      id: "1",
      name: "John",
      room: "Manager",
      status: "valid",
    },
    {
      id: "1",
      name: "John Michael",
      room: "Manager",
      status: "InValid",
    },
    {
      id: "1",
      name: "John Michael",
      room: "Manager",
      status: "valid",
    },
  ];

  const SuppliesData = [
    {
      id: "1",
      name: "John",
      quantity: "Manager",
      status: "valid",
    },
    {
      id: "1",
      name: "John Michael",
      quantity: "Manager",
      status: "InValid",
    },
    {
      id: "1",
      name: "John Michael",
      quantity: "Manager",
      status: "valid",
    },
  ];

  const [equipmentsData, setEquipmentData] = useState(EquipmentData);
  const [suppliesData, setSuppliesData] = useState(SuppliesData);

  useEffect(() => {
    const getSupplies = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/supply", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        });
        const responseData = await response.json();
        const supplyOutput = responseData.data.data.map((d) => {
          return {
            id: d.SID,
            name: d.name,
            quantity: d.quantity,
            status: d.inNeed,
          };
        });
        setSuppliesData(supplyOutput);
      } catch (err) {
        console.log(err);
      }
    };
    const getEquipments = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/equipment", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        });
        const responseData = await response.json();
        // console.log(responseData);
        const equipmentOutput = responseData.data.data.map((d) => {
          return {
            id: d.EID,
            name: d.name,
            room: d.room.RID,
            status: d.valid,
          };
        });
        // console.log(equipmentOutput);
        setEquipmentData(equipmentOutput);
      } catch (err) {
        console.log(err);
      }
    };

    getSupplies();
    getEquipments();
  }, []);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox py={3}>
        <SuiBox mb={3}>
          <Container>
            <Card>
              <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <SuiTypography variant="h6">Equipments table</SuiTypography>
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
                  columns={getData(equipmentsData).columns}
                  rows={getData(equipmentsData).rows}
                />
              </SuiBox>
            </Card>
          </Container>
        </SuiBox>
        <SuiBox mb={3}>
          <Container>
            <Card>
              <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <SuiTypography variant="h6">Supplies table</SuiTypography>
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
                  columns={getSupplies(suppliesData).columns}
                  rows={getSupplies(suppliesData).rows}
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

export default AdminEquipment;
