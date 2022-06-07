// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";

// Soft UI Dashboard React base styles
import typography from "assets/theme/base/typography";

// Dashboard layout components
import BuildBy from "layouts/dashboard/components/BuildBy";
import ImageCardWithText from "layouts/dashboard/components/ImageCardWithText";
import OperationsList from "../../examples/Lists/OpeartionsList";
import NotificationsBox from "layouts/dashboard/components/NotificationBox";
import DescriptionList from "../../examples/Lists/DescriptionList";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";
import OperationsListData1 from "../profile/data/operationsListData";
import newsData from "../profile/data/newsData";
import instructionsData from "../profile/data/InstructionsData";
import { AuthContext } from "../../context/index";
import { useState, useEffect, useContext } from "react";

function DashboardPatient() {
  const { size } = typography;
  const { chart, items } = reportsBarChartData;
  const auth = useContext(AuthContext);

  const [OperationsListData, setOperationsListData] = useState([
    {
      date: "date",
      time: "current",
      name: "op.patient.name",
      type: "op.type",
    },
  ]);

  useEffect(() => {
    const getUpOpertaions = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/user/upcoming-operation", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        });
        const responseData = await response.json();
        console.log(responseData);
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
            name: op.patient.name,
            type: op.type,
          };
        });
        setOperationsListData(outputOperations);
        console.log(outputOperations);
      } catch (err) {
        console.log(err);
      }
    };
    getUpOpertaions();
  }, [auth.userId, auth.token]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox py={3}>
        <SuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={7}>
              <BuildBy />
            </Grid>
            <Grid item xs={12} lg={5}>
              <ImageCardWithText />
            </Grid>
          </Grid>
        </SuiBox>

        <SuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={5}>
              <OperationsList operations={OperationsListData} title={"Upcoming Operations"} />
            </Grid>
            <Grid item xs={12} lg={7}>
              <GradientLineChart
                title="Sales Overview"
                description={
                  <SuiBox display="flex" alignItems="center">
                    <SuiBox fontSize={size.lg} color="success" mb={0.3} mr={0.5} lineHeight={0}>
                      <Icon className="font-bold">arrow_upward</Icon>
                    </SuiBox>
                    <SuiTypography variant="button" color="text" fontWeight="medium">
                      4% more{" "}
                      <SuiTypography variant="button" color="text" fontWeight="regular">
                        in 2021
                      </SuiTypography>
                    </SuiTypography>
                  </SuiBox>
                }
                height="20.25rem"
                chart={gradientLineChartData}
              />
            </Grid>
          </Grid>
        </SuiBox>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <DescriptionList data={instructionsData} title={"Instructions"} />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <DescriptionList data={newsData} title={"News"} />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <NotificationsBox />
          </Grid>
        </Grid>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default DashboardPatient;
