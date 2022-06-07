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

const getData = (data) => {
  const PatientTableData = {
    columns: [
      { name: "Patient", align: "left" },
      { name: "Surgery", align: "left" },
      { name: "date", align: "center" },
      { name: "time", align: "center" },
      { name: "status", align: "center" },
    ],

    rows: [],
  };

  PatientTableData.rows = data.map((d) => {

    let color;

    if (d.status === 'Done'){
      color = 'Success'
    }
    else if (d.status === 'Canceled'){
      color = 'error'
    }
    else if(d.status === 'On Schedule')
    {
      color = 'index'
    }
    return {
      Patient: (
        <SuiButton variant={"text"} color={"primary"} on click>
          <Patient name={d.name} />
        </SuiButton>
      ),
      Surgery: <Surgery surgery={d.department} />,
      date: (
        <SuiTypography variant="caption" color="secondary" fontWeight="medium">
          {d.date}
        </SuiTypography>
      ),
      time: (
        <SuiTypography variant="caption" color="secondary" fontWeight="medium">
          {d.time}
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

export default getData;
