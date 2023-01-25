// import "./App.css";
import React from "react";
import Box from "@mui/material/Box";
import CardList from "./app_components/CardList";

import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import JobAddForm from "./app_components/JobAddForm";
import SearchBar from "./app_components/SearchBar";

function App() {
  const [open, setOpen] = React.useState(false);
  const [searchString, setSearchString] = React.useState("");
  const [searchJobType, setSearchJobType] = React.useState("");
  const [searchMinHour, setSearchMinHour] = React.useState(-1);
  const [searchMaxHour, setSearchMaxHour] = React.useState(-1);
  const [department, setDepartment] = React.useState("");
  const [searchParameters, setSearchParameters] = React.useState({});

  const onSearchSubmit = () => {
    let searchParams = {};
    if(searchString) searchParams["q"] = searchString;
    if(searchJobType && searchJobType !== "All") searchParams["jobtype"] = searchJobType;
    if(searchMinHour && searchMinHour !== -1) searchParams['hoursgte'] = searchMinHour;
    if(searchMaxHour && searchMaxHour !== -1) searchParams['hourslte'] = searchMaxHour;
    if(department) searchParams["department"] = department;
    setSearchParameters(searchParams);
  };

  const onSearchUpdate = (e) => {
    setSearchString(e.target.value);
  };

  const onJobTypeUpdate = (e) => {
    setSearchJobType(e.target.value);
  }

  const onMinHourUpdate = (e) => {
    setSearchMinHour(e.target.value);
  }

  const onMaxHourUpdate = (e) => {
    setSearchMaxHour(e.target.value);
  }

  const onDepartmentUpdate = (e) => {
    setDepartment(e.target.value);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="App">
      <Box>
        <SearchBar
          onSearchUpdate={onSearchUpdate}
          onJobTypeUpdate={onJobTypeUpdate}
          onMinHourUpdate={onMinHourUpdate}
          onMaxHourUpdate={onMaxHourUpdate}
          onDepartmentUpdate={onDepartmentUpdate}
          onSearchSubmit={onSearchSubmit}
        />
        <CardList searchParameters={searchParameters} />
        <Fab
          color="primary"
          aria-label="add"
          sx={{ position: "fixed", bottom: "1rem", right: "1rem" }}
          onClick={handleClickOpen}
        >
          <AddIcon />
        </Fab>
        <JobAddForm open={open} onClose={handleClose}></JobAddForm>
      </Box>
    </div>
  );
}

export default App;
