// import "./App.css";
import React, { useCallback } from "react";
import Box from "@mui/material/Box";
import CardList from "./app_components/CardList";
import Fab from "@mui/material/Fab";
import AddIcon from '@mui/icons-material/Add';
import JobAddForm from "./app_components/JobAddForm";
import SearchBar from "./app_components/NavBar";


function App() {

  const [open, setOpen] = React.useState(false);
  const [searchString, setSearchString] = React.useState("");
  const [finalSearch, setFinalSearch] = React.useState("");

  const onSearchSubmit = () => {
    setFinalSearch(searchString);
  };

  const onSearchUpdate = (e) => {
    setSearchString(e.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="App">
      <Box>
        <SearchBar onSearchUpdate={onSearchUpdate} onSearchSubmit={onSearchSubmit}/>
        <CardList searchString={finalSearch}/>
        <Fab color="primary" aria-label="add" sx={{ position: "fixed", bottom: "1rem", right: "1rem" }} onClick={handleClickOpen}>
          <AddIcon />
        </Fab>
        <JobAddForm open={open} onClose={handleClose}></JobAddForm>
      </Box>
    </div>
  );
}

export default App;
