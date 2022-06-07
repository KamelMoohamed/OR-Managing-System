// @mui material components
import Card from "@mui/material/Card";
// import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// Billing page components
import Transaction from "layouts/billing/components/Transaction";

function Transactions() {
    return (
        <Card sx={{height: "100%"}}>
            <SuiBox display="flex" justifyContent="space-between" alignItems="center" pt={3} px={2}>
                <SuiTypography variant="h6" fontWeight="medium" textTransform="capitalize">
                    Your Transaction&apos;s
                </SuiTypography>

                <SuiBox display="flex" alignItems="flex-start">
                    <SuiBox color="text" mr={0.5} lineHeight={0}>
                        <Icon color="inherit" fontSize="small">
                            date_range
                        </Icon>
                    </SuiBox>
                    <SuiTypography variant="button" color="text" fontWeight="regular">
                       All
                    </SuiTypography>
                </SuiBox>

            </SuiBox>
            <SuiBox pt={3} pb={2} px={2}>
                <SuiBox mb={2}>
                    <SuiTypography variant="caption" color="text" fontWeight="bold" textTransform="uppercase">
                        newest
                    </SuiTypography>
                </SuiBox>
                <SuiBox
                    component="ul"
                    display="flex"
                    flexDirection="column"
                    p={0}
                    m={0}
                    sx={{listStyle: "none"}}
                >

                    <Transaction
                        color="error"
                        icon="arrow_downward"
                        name="Plastic Surgery"
                        description="28 June 2022, at 12:30 PM"
                        value="- $ 2,500"
                    />
                    <Transaction
                        color="error"
                        icon="arrow_downward"
                        name="Cardiovascular Surgery"
                        description="15 June 2022, at 12:30 PM"
                        value="- $ 6,500"
                    />

                </SuiBox>
                <SuiBox mt={1} mb={2}>
                    <SuiTypography variant="caption" color="text" fontWeight="bold" textTransform="uppercase">
                        Older
                    </SuiTypography>
                </SuiBox>
                <SuiBox
                    component="ul"
                    display="flex"
                    flexDirection="column"
                    p={0}
                    m={0}
                    sx={{listStyle: "none"}}
                >
                    <Transaction
                        color="error"
                        icon="arrow_downward"
                        name="Covid Surgery"
                        description="28 June 2022, at 12:30 PM"
                        value="- $ 10,000"
                    />
                    <Transaction
                        color="error"
                        icon="arrow_downward"
                        name="Nose Tas8yer Surgery"
                        description="15 June 2020, at 12:30 PM"
                        value="- $ 1,000"
                    />
                </SuiBox>
            </SuiBox>
        </Card>
    );
}

export default Transactions;
