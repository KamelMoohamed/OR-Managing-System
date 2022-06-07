// react-routers components
import {Link} from "react-router-dom";

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiAvatar from "components/SuiAvatar";
import SuiButton from "components/SuiButton";
import Divider from "@mui/material/Divider";
import Separator from "layouts/authentication/components/Separator/index";

function DescriptionList({title, data}) {
    const renderData = data.map(({header, description}) => (
        <SuiBox key={header} component="li" display="flex" alignItems="center" py={1} mb={1}>
            <SuiBox display="flex" flexDirection="column" alignItems="flex-start" justifyContent="center">
                <SuiTypography variant="button" fontWeight="medium">
                    {header}
                </SuiTypography>
                <SuiTypography variant="caption" color="text">
                    {description}
                    <Separator />
                </SuiTypography>
                <SuiTypography>

                </SuiTypography>
            </SuiBox>
        </SuiBox>
    ));

    return (
        <Card sx={{height: "27.5rem"}}>
            <SuiBox pt={2} px={2}>
                <SuiTypography variant="h6" fontWeight="medium" textTransform="capitalize">
                    {title}
                </SuiTypography>
            </SuiBox>
            <SuiBox p={2}>
                <SuiBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
                    {renderData}

                </SuiBox>
            </SuiBox>
        </Card>
    );
}

// Typechecking props for the ProfilesList
DescriptionList.propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DescriptionList;
