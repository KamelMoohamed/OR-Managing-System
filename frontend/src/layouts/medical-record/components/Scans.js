// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import Scan from "./Scan";

// Scan page components

function Scans() {
    return (
        <Card id="delete-account" sx={{height: "100%"}}>
            <SuiBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
                <SuiTypography variant="h6" fontWeight="medium">
                    Scans
                </SuiTypography>
            </SuiBox>
            <SuiBox p={2}>
                <SuiBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
                    <Scan date="March, 01, 2020" id="#CT-415646"/>
                    <Scan date="February, 10, 2021" id="#MRI-126749"/>
                    <Scan date="April, 05, 2020" id="#Mamography-103578"/>
                    <Scan date="June, 25, 2019" id="#Xray-415646"/>
                    <Scan date="March, 01, 2019" id="#Himaray-803481" noGutter/>
                </SuiBox>
            </SuiBox>
        </Card>
    );
}

export default Scans;
