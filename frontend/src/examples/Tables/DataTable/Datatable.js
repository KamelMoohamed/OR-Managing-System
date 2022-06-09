import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Card from "@mui/material/Card";
import SuiBox from "../../../components/SuiBox";
import SuiAvatar from "../../../components/SuiAvatar";
import SuiTypography from "../../../components/SuiTypography";

// Image
import team4 from "assets/images/team-4.jpg";
function Patient({ image, name }) {
  return (
    <SuiBox display="flex" alignItems="center" px={1} py={0.5}>
      <SuiBox mr={2}>
        <SuiAvatar src={image} alt={name} size="sm" variant="rounded" />
      </SuiBox>
      <SuiBox display="flex" flexDirection="column">
        <SuiTypography variant="button" fontWeight="medium">
          {name}
        </SuiTypography>
      </SuiBox>
    </SuiBox>
  );
}

function Surgery({ surgery, org }) {
  return (
    <SuiBox display="flex" flexDirection="column">
      <SuiTypography variant="caption" fontWeight="medium" color="text">
        {surgery}
      </SuiTypography>
      <SuiTypography variant="caption" color="secondary">
        Surgery
      </SuiTypography>
    </SuiBox>
  );
}

const columns = [
  {
    field: "firstName",
    headerName: "First name",
    width: 250,
  },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 200,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 200,
    valueGetter: (params) => `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];

const rows = [
  {
    id: 1,
    lastName: <Patient image={team4} name="Laurent Perrier" email="laurent@creative-tim.com" />,
    firstName: "Jon",
    age: 35,
  },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: "Ibrahim", age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

export default function DataTable() {
  return (
    <Card style={{ height: 400, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} pageSize={6} rowsPerPageOptions={[5]} />
    </Card>
  );
}
