// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiAvatar from "../../../components/SuiAvatar";

function PaitentCard({name, birthday, email, address, phoneNumber}) {
    return (
        <Card>
            <SuiBox variant="gradient">
                <SuiBox p={2}>
                    <Grid container alignItems="center">
                        <Grid item>
                            <SuiBox
                                width="10rem"
                                height="8rem"
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <SuiAvatar src="https://bit.ly/3I3pbe6" alt="Avatar" size='xxl'/>
                            </SuiBox>
                        </Grid>

                        <Grid item xs={5}>
                            <SuiBox ml={1} lineHeight={1}>
                                <SuiTypography
                                    variant="h5"
                                    textTransform="capitalize"
                                    fontWeight={name.fontWeight}
                                >
                                    {name}
                                </SuiTypography>
                            </SuiBox>
                            <SuiBox ml={1}>
                                <SuiTypography variant="caption">
                                    <strong>Birthday:</strong> {birthday}
                                    <br/>
                                    <strong>Email:</strong> {email}
                                </SuiTypography>
                            </SuiBox>
                        </Grid>

                        <Grid item xs mt={3}>
                            <SuiBox>
                                <SuiTypography variant="caption">
                                    <strong>Address:</strong> {address}
                                    <br/>
                                    <strong>Phone Number:</strong> {phoneNumber}
                                </SuiTypography>
                            </SuiBox>
                        </Grid>

                    </Grid>
                </SuiBox>
            </SuiBox>
        </Card>
    );
}

// Setting default values for the props of MiniStatisticsCard
PaitentCard.defaultProps = {
    bgColor: "white",
    title: {
        fontWeight: "medium",
        text: "",
    },
    percentage: {
        color: "success",
        text: "",
    },
    direction: "right",
};

// Typechecking props for the MiniStatisticsCard
PaitentCard.propTypes = {
    bgColor: PropTypes.oneOf([
        "white",
        "primary",
        "secondary",
        "info",
        "success",
        "warning",
        "error",
        "dark",
    ]),
    title: PropTypes.PropTypes.shape({
        fontWeight: PropTypes.oneOf(["light", "regular", "medium", "bold"]),
        text: PropTypes.string,
    }),
    count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    percentage: PropTypes.shape({
        color: PropTypes.oneOf([
            "primary",
            "secondary",
            "info",
            "success",
            "warning",
            "error",
            "dark",
            "white",
        ]),
        text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
    icon: PropTypes.shape({
        color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
        component: PropTypes.node.isRequired,
    }).isRequired,
    direction: PropTypes.oneOf(["right", "left"]),
};

export default PaitentCard;
