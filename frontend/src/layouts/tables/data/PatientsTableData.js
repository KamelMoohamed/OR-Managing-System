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
      { name: "name", align: "left" },
      { name: "SSN", align: "center" },
      { name: "phone", align: "center" },
      { name: "birthdate", align: "center" },
    ],

    rows: [],
  };

  PatientTableData.rows = data.map((d) => {
    return {
      name: (
        <SuiButton variant={"text"} color={"primary"} onclick>
          <Patient name={d.name} />
        </SuiButton>
      ),
      SSN: <Surgery surgery={d.SSN} />,
      phone: (
        <SuiTypography variant="caption" color="secondary" fontWeight="medium">
          {d.phone}
        </SuiTypography>
      ),
      birthdate: (
        <SuiTypography variant="caption" color="secondary" fontWeight="medium">
          {d.birthdate}
        </SuiTypography>
      ),
    };
  });

  return PatientTableData;
};

// console.log(PatientTableData)

export default getData;
