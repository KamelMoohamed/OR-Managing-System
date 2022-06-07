/* eslint-disable react/prop-types */
// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiAvatar from "components/SuiAvatar";
import SuiBadge from "components/SuiBadge";

// Images
import team2 from "assets/images/team-2.jpg";
import SuiButton from "../../../components/SuiButton";

function Patient({ name, email }) {
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
      <SuiTypography variant="caption" color="secondary">
        Surgery
      </SuiTypography>
    </SuiBox>
  );
}

const getRequests = (data) => {
  const PatientTableData = {
    columns: [
      { name: "Doctor", align: "left" },
      { name: "Patient", align: "center" },
      { name: "Payment", align: "center" },
      { name: "status", align: "center" },
    ],

    rows: [],
  };

  PatientTableData.rows = data.map((d) => {
    return {
      Doctor: (
        <SuiButton variant={"text"} color={"primary"} on click>
          <Patient name={d.doctorName} />
        </SuiButton>
      ),
      Patient: (
        <SuiTypography variant="caption" color="secondary" fontWeight="medium">
          {d.patientSSN}
        </SuiTypography>
      ),
      Payment: (
        <SuiTypography variant="caption" color="secondary" fontWeight="medium">
          {d.paymentMethod}
        </SuiTypography>
      ),
      status: (
        <SuiBadge variant="gradient" badgeContent={d.status} color="success" size="xs" container />
      ),
    };
  });

  return PatientTableData;
};

// console.log(PatientTableData)

export default getRequests;
