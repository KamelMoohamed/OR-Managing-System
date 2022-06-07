// Soft UI Dashboard React components
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import Footer from "../../examples/Footer";
import reportsBarChartData from "../rtl/data/reportsBarChartData";
import typography from "../../assets/theme/base/typography";
import VerticalBarChart from "../../examples/Charts/BarCharts/VerticalBarChart";
import HorizontalBarChart from "../../examples/Charts/BarCharts/HorizontalBarChart";
import DefaultDoughnutChart from "../../examples/Charts/DoughnutCharts/DefaultDoughnutChart";
import MixedChart from "../../examples/Charts/MixedChart";
import SuiBox from "../../components/SuiBox";
import Grid from "@mui/material/Grid";
import MiniStatisticsCard from "../../examples/Cards/StatisticsCards/MiniStatisticsCard";
import PieChart from "examples/Charts/PieChart";
import GradientLineChart from "../../examples/Charts/LineCharts/GradientLineChart";
import Icon from "@mui/material/Icon";
import SuiTypography from "../../components/SuiTypography";
import gradientLineChartData from "../dashboard/data/gradientLineChartData";
import DefaultInfoCard from "../../examples/Cards/InfoCards/DefaultInfoCard";
import ReportsBarChart from "../../examples/Charts/BarCharts/ReportsBarChart";

function Dashboard() {
  const { size } = typography;
  const { chart, items } = reportsBarChartData;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox py={3}>
        {/*first row*/}
        <SuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Operations Today" }}
                count="5"
                icon={{ color: "info", component: "today" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "This Week's Operations" }}
                count="2,300"
                icon={{ color: "info", component: "event" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "This Months's Operations" }}
                count="+3,462"
                icon={{ color: "info", component: "date_range" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "This Years's Operations" }}
                count="$103,430"
                icon={{
                  color: "info",
                  component: "medical_services",
                }}
              />
            </Grid>
          </Grid>
        </SuiBox>

        {/*second row*/}
        <SuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={6}>
              <VerticalBarChart
                title="Operation/Day (Current Week)"
                chart={{
                  labels: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
                  datasets: [
                    {
                      label: "Operations by month",
                      color: "info",
                      data: [15, 20, 12, 60, 20, 15],
                    },
                  ],
                }}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <VerticalBarChart
                title="Operation/Month (Current Year)"
                chart={{
                  labels: [
                    "JAN",
                    "FEB",
                    "MAR",
                    "APR",
                    "MAY",
                    "JUN",
                    "JUL",
                    "AUG",
                    "SEP",
                    "OCT",
                    "NOV",
                    "DEC",
                  ],
                  datasets: [
                    {
                      label: "Sales by age",
                      color: "dark",
                      data: [15, 20, 12, 60, 20, 15],
                    },
                  ],
                }}
              />
            </Grid>
          </Grid>
        </SuiBox>

        {/*third row*/}
        <SuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={3}>
              <PieChart
                title="Patients Gender"
                chart={{
                  labels: ["male", "female"],
                  datasets: {
                    label: "Age Group",
                    backgroundColors: [
                      "info",
                      "primary",
                      "dark",
                      "secondary",
                      "warning",
                      "error",
                      "success",
                      "black",
                    ],
                    data: [15, 20],
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} lg={9}>
              <HorizontalBarChart
                title="Patients Age Group"
                chart={{
                  labels: ["1-5", "6-10", "10-18", "19-25", "26-35", "36-50", "51-65", "above 65"],
                  datasets: [
                    {
                      label: "Age Group",
                      color: "dark",
                      data: [15, 20, 12, 60, 21, 23, 76, 78],
                    },
                  ],
                }}
              />
            </Grid>
          </Grid>
        </SuiBox>

        {/*forth row*/}
        <SuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={9}>
              <HorizontalBarChart
                title="Staff Age Group"
                chart={{
                  labels: ["1-5", "6-10", "10-18", "19-25", "26-35", "36-50", "51-65", "above 65"],
                  datasets: [
                    {
                      label: "Age Group",
                      color: "secondary",
                      data: [15, 20, 12, 60, 21, 23, 76, 78],
                    },
                  ],
                }}
              />
            </Grid>

            <Grid item xs={12} lg={3}>
              <PieChart
                title="Staff Gender"
                chart={{
                  labels: ["male", "female"],
                  datasets: {
                    label: "Staff Gender",
                    backgroundColors: [
                      "info",
                      "primary",
                      "dark",
                      "secondary",
                      "warning",
                      "error",
                      "success",
                      "black",
                    ],
                    data: [58, 21],
                  },
                }}
              />
            </Grid>
          </Grid>
        </SuiBox>

        {/*5th row*/}
        <SuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={4}>
              <Grid container mb={3} spacing={3}>
                <Grid item xs={12} lg={6}>
                  <DefaultInfoCard
                    icon="masks"
                    title="Number of Patients"
                    description="Belong Interactive"
                    value="1000"
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <DefaultInfoCard
                    icon="vaccines"
                    title="Number of Equipment"
                    description="Belong Interactive"
                    value="748"
                  />
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={12} lg={6}>
                  <DefaultInfoCard
                    icon="medical_services"
                    title="Number of Doctors"
                    description="Belong Interactive"
                    value="35"
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <DefaultInfoCard
                    icon="healing"
                    title="Number of Nurses"
                    description="Belong Interactive"
                    value="50"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} lg={8}>
              <ReportsBarChart title="Career" chart={chart} items={items} />
            </Grid>
          </Grid>
        </SuiBox>

        {/*sixth row*/}
        <SuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={7}>
              <GradientLineChart
                title="Current Year vs Last Year"
                height="20.25rem"
                chart={gradientLineChartData}
              />
            </Grid>
            <Grid item xs={12} lg={5}>
              <DefaultDoughnutChart
                title="Default Doughnut Chart"
                chart={{
                  labels: ["Cash", "Insurance"],
                  datasets: {
                    label: "Projects",
                    backgroundColors: ["success", "dark"],
                    data: [20, 15],
                  },
                }}
                height={"20.2rem"}
              />
            </Grid>
          </Grid>
        </SuiBox>
      </SuiBox>

      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
