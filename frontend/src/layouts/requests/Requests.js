// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import FormDialog from "../../examples/Dialog/FormDialog";
import SuiBox from "../../components/SuiBox";
import Card from "@mui/material/Card";
import SuiTypography from "../../components/SuiTypography";
import Table from "../../examples/Tables/Table";
import getData from "../tables/data/authorsTableData";
import { useEffect, useState } from "react";

function Requests() {
  const [requestsData, setRequestsData] = useState([
    {
      doctor: "",
      patient: "",
      payment: "",
    },
  ]);

  useEffect(() => {
    const getSupplies = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/user/requests", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        });
        const responseData = await response.json();
        const supplyOutput = responseData.requests.requests.map((d) => {
          return {
            department: d.department,
            patient: d.patientSSN,
            payment: d.paymentMethod,
            status: d.status,
          };
        });
        setRequestsData(supplyOutput);
      } catch (err) {
        console.log(err);
      }
    };
    getSupplies();
  }, []);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <FormDialog/>
      <SuiBox mt={3} mb={3}>
        <Card>
          <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
            <SuiTypography variant="h6">Requests</SuiTypography>
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
            <Table columns={getData(requestsData).columns} rows={getData(requestsData).rows} />
          </SuiBox>
        </Card>
      </SuiBox>

      <Footer />
    </DashboardLayout>
  );
}

export default Requests;
