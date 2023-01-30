import React, { useState, useEffect } from "react";
import { Box, List, ListItem, Drawer, TextField, InputAdornment, FormControl, InputLabel, Select, MenuItem, Typography, Button, Slider, Divider, FormControlLabel, Checkbox } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

const jobType = [
    {
        value: 'Academic Year',
    },
    {
        value: 'Summer',
    },
];

export default function FilterDrawer(props) {

    const { window } = props;

    const container = window !== undefined ? () => window().document.body : undefined;

    const [departments, setDepartmenets] = useState([]);

    useEffect(() => {
        fetch('/api/jobs/departments')
            .then((res) => res.json())
            .then((data) => {
                setDepartmenets(data);
            });
    }, []);

    const drawer = (
        <div>
            <List>
                <ListItem>
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
                </ListItem>

                <Divider />

                <ListItem>
                    <FormControl sx={{ minWidth: 200 }}>
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
                </ListItem>

                <Divider />

                <ListItem>
                    <FormControl sx={{ minWidth: 150 }}>
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
                </ListItem>

                <Divider />

                <ListItem>
                    <Box>
                        <Typography>Hours per Week</Typography>
                        <Slider
                            getAriaLabel={() => 'Hours per Week'}
                            value={props.searchHourRange}
                            onChange={props.onSearchHourRangeUpdate}
                            valueLabelDisplay="auto"
                            getAriaValueText={() => "Hours"}
                        />
                    </Box>
                </ListItem>

                <Divider />

                <ListItem>
                <FormControlLabel control={<Checkbox onChange={props.onFundOptionalUpdate}/>} label="Federal Funding Optional" />
                </ListItem>

                <Divider />

                <ListItem>
                    <Button variant="outlined" onClick={props.onSearchSubmit}>Apply Filters</Button>
                </ListItem>
            </List>
        </div>
    );

    return (
        <Box
            component="nav"
            sx={{ width: { sm: props.drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
        >
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Drawer
                container={container}
                variant="temporary"
                open={props.mobileOpen}
                onClose={props.handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: props.drawerWidth },
                }}
            >
                {drawer}
            </Drawer>
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: props.drawerWidth },
                }}
                open
            >
                {drawer}
            </Drawer>
        </Box>
    );
}