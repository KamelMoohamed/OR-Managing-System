const reportsBarChartData = {
  chart: {
    labels: ["Saterday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    datasets: { label: "Operations", data: [20, 30, 5, 8, 14, 34, 9, 17, 18] },
  },
  items: [
    {
      icon: { color: "primary", component: "library_books" },
      label: "Operations",
      progress: { content: "1.2K", percentage: 60 },
    },
    {
      icon: { color: "info", component: "touch_app" },
      label: "Patients",
      progress: { content: "1000", percentage: 90 },
    },
    {
      icon: { color: "warning", component: "payment" },
      label: "Revenue",
      progress: { content: "$36 M", percentage: 80 },
    },
    {
      icon: { color: "error", component: "extension" },
      label: "Hospital Patients",
      progress: { content: "750", percentage: 75 },
    },
  ],
};

export default reportsBarChartData;
