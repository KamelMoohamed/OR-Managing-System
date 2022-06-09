// Soft UI Dashboard React examples
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard/index";
import SuiButton from "../../../components/SuiButton";
import Grid from "@mui/material/Grid";
import SuiBox from "../../../components/SuiBox";
import Card from "@mui/material/Card";

function Room({ icon, roomNum, description }) {
  return (
    <Card>
      <SuiBox>
        <SuiButton sx={{ padding: 0, width: "100%" }} size={"large"}>
          <Grid xs={12}>
            <DefaultInfoCard icon="single_bed_rounded" value={roomNum} title={description} />
          </Grid>
        </SuiButton>
      </SuiBox>
    </Card>
  );
}

export default Room;
