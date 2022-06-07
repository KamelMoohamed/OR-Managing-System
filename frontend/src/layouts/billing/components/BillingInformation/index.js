
// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// Billing page components
import Bill from "layouts/billing/components/Bill";

function BillingInformation() {
  return (
    <Card id="delete-account">
      <SuiBox pt={3} px={2}>
        <SuiTypography variant="h6" fontWeight="medium">
          Billing Information
        </SuiTypography>
      </SuiBox>
      <SuiBox pt={1} pb={2} px={2}>
        <SuiBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          <Bill
            name="Ibrahim Mohamed"
            company="SBME 24"
            email="imimazim7@gmail.com"
            vat="FRB1235476"
          />
          <Bill
            name="Kamel Mohamed"
            company="SBME 24"
            email="kamelmohamed@gmai.com"
            vat="FRB1235476"
          />
          <Bill
            name="Romaisaa Sherif"
            company="SBME 24"
            email="romisaa sheif"
            vat="FRB1235476"
            noGutter
          />
        </SuiBox>
      </SuiBox>
    </Card>
  );
}

export default BillingInformation;
