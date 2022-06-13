// @mui material components
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SuiButton from "components/SuiButton";
import SuiBox from "components/SuiBox";

// Custom styles for the SidenavCard
import { card, cardContent, cardIconBox, cardIcon } from "examples/Sidenav/styles/sidenavCard";

// Soft UI Dashboard React context
import { useSoftUIController } from "context";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/index";

function SidenavCard() {
  const [controller] = useSoftUIController();
  const { miniSidenav, sidenavColor } = controller;
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const onClick = (event) => {
    event.preventDefault();
    navigate("./sign-up");
    auth.logout();
  };

  return (
    <Card sx={(theme) => card(theme, { miniSidenav })}>
      <CardContent sx={(theme) => cardContent(theme, { sidenavColor })}>
        <SuiBox lineHeight={1}>
          <SuiBox mb={1.825} mt={1}></SuiBox>
          <SuiButton
            target="_blank"
            rel="noreferrer"
            size="small"
            color="white"
            onClick={onClick}
            fullWidth
          >
            Logout
          </SuiButton>
        </SuiBox>
      </CardContent>
    </Card>
  );
}

export default SidenavCard;
