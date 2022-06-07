// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";

// Soft UI Dashboard React components
import MasterCard from "examples/Cards/MasterCard";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Billing page components
import PaymentMethod from "layouts/billing/components/PaymentMethod";
import Invoices from "layouts/billing/components/Invoices";
import BillingInformation from "layouts/billing/components/BillingInformation";
import Transactions from "layouts/billing/components/Transactions";

function Billing() {
    return (
        <DashboardLayout>
            <DashboardNavbar/>
            <SuiBox mt={4}>
                <SuiBox mb={1.5}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} lg={12}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} xl={4}>
                                    <MasterCard number={4562112245947852} holder="Ibrahim Mohamed" expires="11/24"/>
                                </Grid>
                                <Grid item xs={12} xl={8}>
                                    <PaymentMethod/>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </SuiBox>
                <SuiBox my={3}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={7}>
                            <BillingInformation/>
                        </Grid>
                        <Grid item xs={12} md={5}>
                            <Transactions/>
                        </Grid>
                    </Grid>
                </SuiBox>
            </SuiBox>
            <Footer/>
        </DashboardLayout>
    );
}

export default Billing;
