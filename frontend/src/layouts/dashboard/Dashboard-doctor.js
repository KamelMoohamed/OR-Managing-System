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
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";

// Soft UI Dashboard React base styles
import typography from "assets/theme/base/typography";

// Dashboard layout components
import BuildBy from "layouts/dashboard/components/BuildBy";
import ImageCardWithText from "layouts/dashboard/components/ImageCardWithText";
import Projects from "layouts/dashboard/components/Projects";
import OrderOverview from "layouts/dashboard/components/NotificationBox";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";
import OperationsList from "../../examples/Lists/OpeartionsList";
import OperationsListData from "../profile/data/operationsListData";
import NotificationsBox from "layouts/dashboard/components/NotificationBox";
import DescriptionList from "../../examples/Lists/DescriptionList";
import newsData from "../profile/data/newsData";
import SuiButton from "../../components/SuiButton";

import { useEffect, useState } from "react";

function DoctorDashboard() {
  const { size } = typography;
  const { chart } = reportsBarChartData;

  const [dayCount, setDayCount] = useState("2");
  const [weekCount, setWeekCount] = useState("7");
  const [monthCount, setMonthCount] = useState("20");
  const [yearCount, setYearCount] = useState("100");
  const [charData, setChartData] = useState(chart.datasets.data);

  const [OperationsListData, setOperationsListData] = useState([
    {
      date: "date",
      time: "current",
      name: "op.patient.name",
      type: "op.type",
    },
  ]);

  useEffect(() => {
    const getDoctorMoney = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/v1/stats/user-operations?groupdate=day`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          }
        );
        const responseData = await response.json();
        const output = responseData.data.map((d) => {
          return d.number;
        });

        setChartData(output);
      } catch (err) {
        console.log(err);
      }
    };

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
      } catch (err) {
        console.log(err);
      }
    };

    const fetchDay = async () => {
      try {
        const responce = await fetch(`http://localhost:8000/api/v1/stats/many-operation`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        });
        const resData = await responce.json();
        setDayCount(resData.Data[0].operations[0]);
        setWeekCount(resData.Data[1].operations[0]);
        setMonthCount(resData.Data[2].operations[0]);
        setYearCount(resData.Data[3].operations[0]);
      } catch (err) {
        console.log(err);
      }
    };
    // fetchDay();
    getUpOpertaions();
    getDoctorMoney();
  }, []);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox py={3}>
        <SuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "today's Operations" }}
                count={dayCount}
                icon={{ color: "info", component: "today" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "This Week's Operations" }}
                count={weekCount}
                icon={{ color: "info", component: "event" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "This Month's Operations" }}
                count={monthCount}
                icon={{ color: "info", component: "date_range" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "This Years's Operations" }}
                count={yearCount}
                icon={{
                  color: "info",
                  component: "medical_services",
                }}
              />
            </Grid>
          </Grid>
        </SuiBox>

        <SuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={6}>
              <OperationsList operations={OperationsListData} title={"Upcoming Operations"} />
            </Grid>
            <Grid item xs={12} lg={6}>
              <Grid item xs={5} lg={12}>
                <ImageCardWithText text="You have a surgery in one day, please be prepared" />
              </Grid>
              <Grid item xs={5} lg={12} mt={1}>
                <ImageCardWithText text="Dr Romaisaa Wants to see you, please refer to her" />
              </Grid>
            </Grid>
          </Grid>
        </SuiBox>

        <SuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={5}>
              {/* <ReportsBarChart
                title="Career"
                description={
                  <>
                    (<strong>+23%</strong>) than last week
                  </>
                }
                chart={chart.labels}
                data={charData}
                datalabel={chart.dataset.label}
              /> */}
            </Grid>
            <Grid item xs={12} lg={7}>
              {/* <GradientLineChart
                title="Operations Overview"
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
              /> */}
            </Grid>
          </Grid>
        </SuiBox>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <DescriptionList data={newsData} title={"News"} />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <NotificationsBox />
          </Grid>
          <Grid item xs={12} md={6} lg={4} sx={{ height: "100%" }}>
            <BuildBy height={"40rem"} />
          </Grid>
        </Grid>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default DoctorDashboard;
