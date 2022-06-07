// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";

// Data
import Grid from "@mui/material/Grid";
import OperationCard from "../../../examples/Cards/OperationCard/OperationCard";
import homeDecor1 from "../../../assets/images/home-decor-1.jpg";
import team1 from "../../../assets/images/team-1.jpg";

import getData from "../data/doctorOperations";
import {useEffect, useState} from "react";

function DoctorsOperations() {
    const OpreationsData = [
        {
            date: "1",
            name: "John",
            email: "kamel@gmail.com",
            department: "Manager",
            status: "valid",
        },
        {
            date: "1",
            name: "John Michael",
            email: "kamel@gmail.com",
            department: "Manager",
            status: "InValid",
        },
        {
            date: "1",
            name: "John Michael",
            time: "kamel@gmail.com",
            department: "Manager",
            status: "valid",
        },
    ];

    const [upOperations, setUpOperations] = useState(OpreationsData);
    const [pastOperations, setPastOperations] = useState(OpreationsData);
    const [pendingOperations, setPendingOperations] = useState([
        {
            date: "20-5",
            title: "Department",
            start: "2022-06-09T10:30:00.000Z",
            id: "",
        },
    ]);

    useEffect(() => {
        const getUpOpertaions = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/v1/user/upcoming-operation", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                    },
                });
                const responseData = await response.json();
                const outputOperations = responseData.operations.preOps.map((op) => {
                    const date = new Date(op.start).toLocaleString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                    });
                    const now = new Date(op.start);
                    const current = now.getHours() + ":" + now.getMinutes();

                    return {
                        date: date,
                        time: current,
                        name: op.patient.name,
                        department: op.type,
                        status: op.OperationStatus,
                    };
                });
                setUpOperations(outputOperations);
            } catch (err) {
                console.log(err);
            }
        };

        const getPastOperations = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/v1/user/previous-operation", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                    },
                });
                const responseData = await response.json();
                const outputOperations = responseData.operations.preOps.map((op) => {
                    const date = new Date(op.start).toLocaleString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                    });
                    const now = new Date(op.start);
                    const current = now.getHours() + ":" + now.getMinutes();

                    return {
                        date: date,
                        time: current,
                        name: op.patient.name,
                        department: op.type,
                        status: op.OperationStatus,
                    };
                });
                setPastOperations(outputOperations);
            } catch (err) {
                console.log(err);
            }
        };

        const getPendingOperation = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/v1/user/pending-operations", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                    },
                });
                const responseData = await response.json();
                const outputOperations = responseData.pendingOps.ops.map((op) => {
                    const date = new Date(op.start).toLocaleString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                    });
                    const now = new Date(op.start);
                    const current = now.getHours() + ":" + now.getMinutes();
                    console.log(op.id);
                    return {
                        start: date,
                        date: current,
                        title: op.mainDoctor.department,
                        id: op.id,
                    };
                });
                setPendingOperations(outputOperations);
            } catch (err) {
                console.log(err);
            }
        };

        getUpOpertaions();
        getPastOperations();
        getPendingOperation();
    }, []);

    const onClickSuccess = (id) => {
        return async (event) => {
            event.preventDefault();
            try {
                const res = await fetch(`http://localhost:8000/api/v1/operation/replay/${id}/Accept`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                    },
                });
                const resData = await res.json();
            } catch (err) {
                console.log(err);
            }
        };
    };

    const onClickError = (id) => {
        return async (event) => {
            event.preventDefault();
            try {
                const res = await fetch(`http://localhost:8000/api/v1/operation/replay/${id}/Refuse`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                    },
                });
                const resData = await res.json();
            } catch (err) {
                console.log(err);
            }
        };
    };

    return (
        <DashboardLayout>
            <DashboardNavbar/>
            <SuiBox py={3}>
                <Grid container spacing={3} xl={12}>
                    <Grid item xs={12} xl={6}>
                        <SuiBox mb={3}>
                            <Card>
                                <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                                    <SuiTypography variant="h6">Upcoming Operations</SuiTypography>
                                </SuiBox>
                                <SuiBox
                                    sx={{
                                        "& .MuiTableRow-root:not(:last-child)": {
                                            "& td": {
                                                borderBottom: ({borders: {borderWidth, borderColor}}) =>
                                                    `${borderWidth[1]} solid ${borderColor}`,
                                            },
                                        },
                                    }}
                                >
                                    <Table
                                        columns={getData(upOperations).columns}
                                        rows={getData(upOperations).rows}
                                    />
                                </SuiBox>
                            </Card>
                        </SuiBox>
                    </Grid>
                    <Grid item xs={12} xl={6}>
                        <SuiBox mb={3}>
                            <Card>
                                <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                                    <SuiTypography variant="h6">Past Operations</SuiTypography>
                                </SuiBox>
                                <SuiBox
                                    sx={{
                                        "& .MuiTableRow-root:not(:last-child)": {
                                            "& td": {
                                                borderBottom: ({borders: {borderWidth, borderColor}}) =>
                                                    `${borderWidth[1]} solid ${borderColor}`,
                                            },
                                        },
                                    }}
                                >
                                    <Table
                                        columns={getData(pastOperations).columns}
                                        rows={getData(pastOperations).rows}
                                    />
                                </SuiBox>
                            </Card>
                        </SuiBox>
                    </Grid>
                </Grid>
                <Grid item xs={12} lg={8}>
                    <SuiBox mb={3}>
                        <Card>
                            <SuiBox pt={2} px={2}>
                                <SuiBox>
                                    <SuiTypography variant="h6" fontWeight="medium">
                                        Operation Confirmation
                                    </SuiTypography>
                                </SuiBox>
                                <SuiBox>
                                    <SuiTypography variant="button" fontWeight="regular" color="text">
                                        Confirm your Operation time
                                    </SuiTypography>
                                </SuiBox>
                            </SuiBox>
                            <Grid container spacing={3}>
                                {pendingOperations.map((op) => {
                                    return (
                                        <SuiBox py={3} px={6} mt={3}>
                                            <Grid item xs={12} lg={3}>
                                                <OperationCard
                                                    image={homeDecor1}
                                                    title={op.title}
                                                    id={op.id}
                                                    date={op.start}
                                                    time={op.end}
                                                    staff={[{image: team1, name: ""}]}
                                                    onClickError={onClickError}
                                                    onClickSuccess={onClickSuccess}
                                                />
                                            </Grid>
                                        </SuiBox>
                                    );
                                })}
                            </Grid>
                        </Card>
                    </SuiBox>
                </Grid>
            </SuiBox>
            <Footer/>
        </DashboardLayout>
    );
}

export default DoctorsOperations;
