// react-router-dom components
import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Tooltip from "@mui/material/Tooltip";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";
import SuiAvatar from "components/SuiAvatar";
import Grid from "@mui/material/Grid";
import { Icon } from "@mui/material";

function OperationCard({ image, id, title, date, time, staff, onClickError, onClickSuccess }) {
  const renderStaff = staff.map(({ image: media, name }) => (
    <Tooltip key={name} title={name} placement="bottom">
      <SuiAvatar
        src={media}
        alt={name}
        size="xs"
        sx={({ borders: { borderWidth }, palette: { white } }) => ({
          border: `${borderWidth[2]} solid ${white.main}`,
          cursor: "pointer",
          position: "relative",
          ml: -1.25,

          "&:hover, &:focus": {
            zIndex: "10",
          },
        })}
      />
    </Tooltip>
  ));

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "transparent",
        boxShadow: "none",
        overflow: "visible",
      }}
    >
      <SuiBox position="relative" width="100.25%" shadow="xl" borderRadius="xl">
        <CardMedia
          src={image}
          component="img"
          title={title}
          sx={{
            maxWidth: "100%",
            margin: 0,
            boxShadow: ({ boxShadows: { md } }) => md,
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </SuiBox>
      <SuiBox pt={3} px={0.5}>
        <SuiBox mb={1}>
          <SuiTypography variant="h5" textTransform="capitalize">
            {title} Surgery
          </SuiTypography>
        </SuiBox>
        <SuiBox mb={3} lineHeight={0}>
          <Grid container xl={12} spacing={3}>
            <Grid item xs={12} lg={6}>
              <SuiTypography variant="button" fontWeight="regular" color="text">
                {date}
              </SuiTypography>
            </Grid>
            <Grid item xs={12} lg={6}>
              <SuiTypography variant="button" fontWeight="regular" color="text">
                {time}
              </SuiTypography>
            </Grid>
          </Grid>
        </SuiBox>
        <SuiBox display="flex" justifyContent="space-between" alignItems="center">
          <SuiButton onClick={onClickSuccess(id)} variant="outlined" color={"success"}>
            <Icon>check</Icon>
          </SuiButton>
          <SuiButton onClick={onClickError(id)} variant="outlined" color={"error"}>
            <Icon>close</Icon>
          </SuiButton>
          <SuiBox display="flex">{renderStaff}</SuiBox>
        </SuiBox>
      </SuiBox>
    </Card>
  );
}

// Setting default values for the props of DefaultProjectCard
OperationCard.defaultProps = {
  staff: [],
};

// Typechecking props for the DefaultProjectCard
OperationCard.propTypes = {
  image: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  action: PropTypes.shape({
    type: PropTypes.oneOf(["external", "internal"]),
    route: PropTypes.string.isRequired,
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "light",
      "dark",
      "white",
    ]).isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  staff: PropTypes.arrayOf(PropTypes.object),
};

export default OperationCard;
