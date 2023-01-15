import React from "react";
import AppBar from "@mui/material/AppBar";
import { Toolbar, TextField, InputAdornment, Button, Box } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar(props) {
    return (
        <AppBar position="sticky" style={{ background: "white" }}>
            <Toolbar>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <TextField
                        id="input-search"
                        placeholder="Search"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            )
                        }}
                        variant="outlined"
                        onChange={props.onSearchUpdate}
                    />
                    <Button variant="outlined" onClick={props.onSearchSubmit}>Submit</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}