// react-routers components
import { Link } from "react-router-dom";

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiAvatar from "components/SuiAvatar";
import SuiButton from "components/SuiButton";

function OperationsList({ title, operations }) {
  let renderOperations = "";

  if (operations.length < 1)
    renderOperations = (
      <SuiBox alignItems="center" mt="10rem">
        <SuiTypography variant="caption" ml={"30%"}>
          There is no upcoming operations
        </SuiTypography>
      </SuiBox>
    );
  else {
    renderOperations = operations.map(({ name, type, time, date }) => (
      <SuiBox key={name} component="li" display="flex" alignItems="center" py={1} mb={1}>
        {/* <SuiBox mr={2}>
                    <SuiAvatar src={drImage} alt="something here" variant="rounded" shadow="md"/>
                </SuiBox> */}

        <SuiBox
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="center"
        >
          <SuiTypography variant="button" fontWeight="medium">
            Dr. {name}
          </SuiTypography>
          <SuiTypography variant="caption" color="text">
            {type} Surgery
          </SuiTypography>
          <SuiTypography variant="button" color="text">
            {date} {"    "} {time}
          </SuiTypography>
        </SuiBox>

        <SuiBox ml="auto"></SuiBox>
      </SuiBox>
    ));
  }
  return (
    <Card sx={{ height: "29rem" }}>
      <SuiBox pt={2} px={2}>
        <SuiTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </SuiTypography>
      </SuiBox>
      <SuiBox p={2}>
        <SuiBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {renderOperations}
        </SuiBox>
      </SuiBox>
    </Card>
  );
}

// Typechecking props for the ProfilesList
OperationsList.propTypes = {
  title: PropTypes.string.isRequired,
  operations: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default OperationsList;
