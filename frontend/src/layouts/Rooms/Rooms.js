// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Room from "./components/Room";
import Grid from "@mui/material/Grid";
import SuiBox from "../../components/SuiBox";
import RoomData from "./roomsData";
import { useState, useEffect } from "react";

function RoomCom(RID, rtype, icon) {
  return (
    <Grid item xs={12} lg={2}>
      <Room roomNum={RID} description={rtype} icon={icon} />
    </Grid>
  );
}

function Rooms() {
  let [renderRooms, setRenderRooms] = useState(RoomCom("", "", RoomData.icon));
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/v1/room", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        });

        const resData = await res.json();
        console.log(resData);
        setRenderRooms(
          resData.data.data.map(({ RID, active }) => {
            return RoomCom(RID, active, RoomData.icon);
          })
        );
      } catch (err) {
        console.log(err);
      }
    };
    fetchRooms();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox py={3}>
        <Grid container spacing={3}>
          {renderRooms}
        </Grid>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Rooms;
