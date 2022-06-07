import { useEffect, useState, useContext } from "react";
// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
// import ProfilesList from "examples/Lists/ProfilesList";
// Overview page components
// import PlatformSettings from "layouts/profile/components/PlatformSettings";

// Data
// import profilesListData from "layouts/profile/data/profilesListData";

// Images
import Header from "./components/Header/Header";
// import EditProfile from "./Edit Profile/EditProfile";
// Hooks
import { AuthContext } from "../../context/index";

function Overview() {
  const auth = useContext(AuthContext);

  const [loadUser, setLoadedUser] = useState({
    name: "",
    birthDate: "",
    email: "",
    SSN: "",
    Major: "",
    phone: [""],
    address: "",
    role: "",
  });

  useEffect(() => {
    const fetchMe = async () => {
      // console.log("TOOOOOOKEM", localStorage.getItem("jwt"));
      try {
        const responce = await fetch(`http://localhost:8000/api/v1/user/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        });
        const responceData = await responce.json();
        console.log(responceData.user);

        setLoadedUser(responceData.user);
      } catch (err) {
        console.log(err);
      }
    };
    console.log(auth.token);
    fetchMe();
  }, [auth.token]);

  const userData = {
    name: loadUser.name ? loadUser.name : "Not User",
    rule: loadUser.role ? loadUser.role : "Not User",
  };
  return (
    <DashboardLayout>
      {/* Adding S=Loading Spinner with isLoaded */}
      {<Header userData={userData} />}
      <SuiBox mt={5} mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} xl={7}>
            <ProfileInfoCard
              title="Personal information"
              info={{
                fullName: `${loadUser.name}`,
                SSN: `${loadUser.SSN}`,
                Major: `${loadUser.Major}`,
                Adress: `${loadUser.address}`,
                "Birth Date": `${loadUser.birthDate}`,
              }}
              action={{ route: "", tooltip: "Edit Profile" }}
            />
          </Grid>
          <Grid item xs={12} md={6} xl={5}>
            <ProfileInfoCard
              title="Account information"
              info={{
                Email: `${loadUser.email}`,

                Password: "**********",
                Mobile: `${loadUser.phone[0]}`,
              }}
              action={{ route: "", tooltip: "Edit Profile" }}
            />
          </Grid>

          {/*<Grid item xs={12} md={6} xl={4}>*/}
          {/*    /!*<EditProfile />*!/*/}
          {/*</Grid>*/}
        </Grid>
      </SuiBox>
      <SuiBox mb={3}></SuiBox>

      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
