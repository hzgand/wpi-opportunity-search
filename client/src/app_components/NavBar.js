import React from "react";
import AppBar from "@mui/material/AppBar";
import { Toolbar, TextField, InputAdornment, Button, Box, MenuItem, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

const jobType = [
    {
        value: 'All',
    },
    {
        value: 'Academic Year',
    },
    {
        value: 'Summer',
    },
];

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
                    <TextField
                        id="input-job-type"
                        variant="outlined"
                        select
                        placeholder="Job Type"
                        defaultValue="All"
                        onChange={props.onJobTypeUpdate}
                    >
                        {jobType.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.value}
                            </MenuItem>
                        ))}
                    </TextField>

                    &nbsp;&nbsp;&nbsp;

                    <Box sx={{display: 'flex', flexDirection: 'row', margin: 'auto', width: 0.5}}>
                        <TextField
                            id="input-hours-gte"
                            placeholder="min"
                            variant="outlined"
                            size="small"
                            sx={{width: 0.25}}
                            onChange={props.onMinHourUpdate}
                        />
                        <Typography sx={{color: 'black', height: 0.5, paddingTop: "0.5rem"}}>&nbsp;&lt; Hours/Week &lt;&nbsp;</Typography>
                        <TextField
                            id="input-hours-gte"
                            placeholder="max"
                            variant="outlined"
                            size="small"
                            sx={{width: 0.25}}
                            onChange={props.onMaxHourUpdate}
                        />
                    </Box>

                    <Button variant="outlined" onClick={props.onSearchSubmit}>Submit</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}