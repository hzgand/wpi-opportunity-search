import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import { Toolbar, TextField, InputAdornment, Button, Box, MenuItem, Typography, Select, FormControl, FormHelperText, InputLabel } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

const jobType = [
    {
        value: 'Academic Year',
    },
    {
        value: 'Summer',
    },
];

export default function SearchBar(props) {

    const [departments, setDepartmenets] = useState([]);

    useEffect(() => {
        fetch('/api/jobs/departments')
            .then((res) => res.json())
            .then((data) => {
                setDepartmenets(data);
            });
    }, []);

    return (
        <AppBar position="sticky" style={{ background: "white" }}>
            <Toolbar>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
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
                    <FormControl sx={{ m: 1, minWidth: 200 }}>
                        <InputLabel id="jobType-simple-select-helper-label">Employment Period</InputLabel>
                        <Select
                            labelId="jobType-simple-select-helper-label"
                            id="jobType-simple-select-helper"
                            label="Employment Period"
                            onChange={props.onJobTypeUpdate}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>

                            {jobType ?
                                jobType.map((jobType) => {
                                    return (
                                        <MenuItem key={jobType.value} value={jobType.value}>{jobType.value}</MenuItem>
                                    );
                                }) : ""}
                        </Select>
                    </FormControl>

                    <FormControl sx={{ m: 1, minWidth: 150 }}>
                        <InputLabel id="department-simple-select-helper-label">Department</InputLabel>
                        <Select
                            labelId="department-simple-select-helper-label"
                            id="department-simple-select-helper"
                            label="Department"
                            onChange={props.onDepartmentUpdate}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>

                            {departments ?
                                departments.map((department) => {
                                    return (
                                        <MenuItem key={department} value={department}>{department}</MenuItem>
                                    );
                                }) : ""}
                        </Select>
                    </FormControl>

                    &nbsp;&nbsp;&nbsp;

                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <TextField
                            id="input-hours-gte"
                            placeholder="min"
                            variant="outlined"
                            size="small"
                            sx={{ width: 0.25 }}
                            onChange={props.onMinHourUpdate}
                        />
                        <Typography
                            sx={{ color: 'black', height: 0.5 }}
                            variant="body1"
                            component="h4">
                            &nbsp;&lt; Hours / Week &lt;&nbsp;</Typography>
                        <TextField
                            id="input-hours-gte"
                            placeholder="max"
                            variant="outlined"
                            size="small"
                            sx={{ width: 0.25 }}
                            onChange={props.onMaxHourUpdate}
                        />
                    </Box>

                    <Button variant="outlined" onClick={props.onSearchSubmit}>Submit</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}