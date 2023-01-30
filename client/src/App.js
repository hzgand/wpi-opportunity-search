// import "./App.css";
import React from "react";
import CardList from "./app_components/CardList";

import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Box, AppBar, Toolbar, Typography, IconButton, CssBaseline } from "@mui/material";
import FilterDrawer from "./app_components/FilterDrawer";

function App() {
  // --- SEARCH ---  
  const [searchString, setSearchString] = React.useState("");
  const [searchJobType, setSearchJobType] = React.useState("");
  const [searchHourRange, setSearchHourRange] = React.useState([0, 100]);
  const [department, setDepartment] = React.useState("");
  const [searchParameters, setSearchParameters] = React.useState({});

  const onSearchSubmit = () => {
    let searchMinHour = searchHourRange[0];
    let searchMaxHour = searchHourRange[1];

    let searchParams = {};
    if (searchString) searchParams["q"] = searchString;
    if (searchJobType && searchJobType !== "All") searchParams["jobtype"] = searchJobType;
    if (searchMinHour !== undefined && searchMinHour !== -1) searchParams['hoursgte'] = searchMinHour;
    if (searchMaxHour !== undefined && searchMaxHour !== -1) searchParams['hourslte'] = searchMaxHour;
    if (department) searchParams["department"] = department;
    handleDrawerToggle();
    setSearchParameters(searchParams);
  };

  const onSearchUpdate = (e) => {
    setSearchString(e.target.value);
  };

  const onJobTypeUpdate = (e) => {
    setSearchJobType(e.target.value);
  }

  const onSearchHourRangeUpdate = (e, newValue) => {
    setSearchHourRange(newValue);
  }

  const onDepartmentUpdate = (e) => {
    setDepartment(e.target.value);
  }
  // -------------

  // --- DRAWER ---

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerWidth = 240;

  // ----------

  return (
    <div className="App">
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <FilterAltIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              WPI Opportunity Search
            </Typography>
          </Toolbar>
        </AppBar>

        <FilterDrawer
          drawerWidth={drawerWidth}
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
          onSearchUpdate={onSearchUpdate}
          onJobTypeUpdate={onJobTypeUpdate}

          onSearchHourRangeUpdate={onSearchHourRangeUpdate}
          searchHourRange={searchHourRange}

          onDepartmentUpdate={onDepartmentUpdate}
          onSearchSubmit={onSearchSubmit}
        />

        <Box
          sx={{
            mb: 2,
            display: "flex",
            flexGrow: 1,
            flexDirection: "column",
            height: "100vh",
            overflow: "hidden",
            overflowY: "scroll",
          }}
        >
          <Toolbar />
          <CardList searchParameters={searchParameters} />
        </Box>

      </Box>
    </div>
  );
}

export default App;
