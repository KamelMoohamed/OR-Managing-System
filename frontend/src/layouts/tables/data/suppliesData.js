/* eslint-disable react/prop-types */
// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiAvatar from "components/SuiAvatar";
import SuiBadge from "components/SuiBadge";

// Images
import team2 from "assets/images/team-2.jpg";
import SuiButton from "../../../components/SuiButton";

function Patient({ name, id }) {
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

const getSupplies = (data) => {
  const PatientTableData = {
    columns: [
      { name: "Supply", align: "left" },
      { name: "ID", align: "center" },
      { name: "Quantity", align: "center" },
      { name: "status", align: "center" },
    ],

    rows: [],
  };

  PatientTableData.rows = data.map((d) => {


    let badgeContent, badgeColor;

    if (d.status === false){
      badgeContent = 'In Stock';
      badgeColor = 'success'
    }
    else if (d.status === true){
      badgeContent = 'Needed';
      badgeColor = 'warning'
    }



    return {
      Supply: (
        <SuiButton variant={"text"} color={"primary"} on click>
          <Patient name={d.name} id={d.id} />
        </SuiButton>
      ),
      ID: (
        <SuiTypography variant="caption" color="secondary">
          {d.id}
        </SuiTypography>
      ),
      Quantity: <Surgery surgery={d.quantity} />,
      status: (
        <SuiBadge variant="gradient" badgeContent={badgeContent} color={badgeColor} size="xs" container />
      ),
    };
  });

  return PatientTableData;
};

export default getSupplies;
