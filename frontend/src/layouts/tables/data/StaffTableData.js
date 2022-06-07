/* eslint-disable react/prop-types */
// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiAvatar from "components/SuiAvatar";
import SuiBadge from "components/SuiBadge";

// Images
import team2 from "assets/images/team-2.jpg";
// import team3 from "assets/images/team-3.jpg";
// import team4 from "assets/images/team-4.jpg";
import SuiButton from "../../../components/SuiButton";

function Patient({ name }) {
  return (
    <SuiBox display="flex" alignItems="center" px={1} py={0.5}>
      <SuiBox display="flex" flexDirection="column">
        <SuiTypography variant="button" fontWeight="medium">
          {name}
        </SuiTypography>
      </SuiBox>
    </SuiBox>
  );
}

function Surgery({ surgery, org }) {
  return (
    <SuiBox display="flex" flexDirection="column">
      <SuiTypography variant="caption" fontWeight="medium" color="text">
        {surgery}
      </SuiTypography>
    </SuiBox>
  );
}

const getData = (data) => {
  const PatientTableData = {
    columns: [
      { name: "Name", align: "left" },
      { name: "SSN", align: "center" },
      { name: "Department", align: "center" },
      { name: "Major", align: "center" },
      { name: "Title", align: "center" },
    ],

    rows: [],
  };

  PatientTableData.rows = data.map((d) => {
    return {
      Name: (
        <SuiButton variant={"text"} color={"primary"} onclick>
          <Patient name={d.name} />
        </SuiButton>
      ),
      SSN: <Surgery surgery={d.SSN} />,
      Department: (
        <SuiTypography variant="caption" color="secondary" fontWeight="medium">
          {d.department}
        </SuiTypography>
      ),
      Major: (
        <SuiTypography variant="caption" color="secondary" fontWeight="medium">
          {d.major}
        </SuiTypography>
      ),
      Title: (
        <SuiTypography variant="caption" color="secondary" fontWeight="medium">
          {d.title}
        </SuiTypography>
      ),
    };
  });

  return PatientTableData;
};

export default getData;
