import * as React from "react";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import { Avatar, Typography, Card } from "@mui/material";

export default function JobCard(props) {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 0.75,
        margin: "auto",
        bgcolor: "primary.main",
      }}
    >
      <Card sx={{ display: "flex", flexDirection: "row" }}>
        <Avatar
          sx={{ margin: "1rem", width: 100, height: 100 }}
          variant="square"
        />
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Box
            sx={{
              paddingTop: "0.5rem",
              paddingLeft: "1rem",
            }}
          >
            <Typography
              sx={{ marginBottom: "0.1rem" }}
              variant="h5"
              component="h5"
            >
              Position Title: {props.job.positionTitle}
            </Typography>
            <Typography
              sx={{ marginBottom: "0.1rem" }}
              variant="h6"
              component="h6"
            >
              Department: {props.job.department}
            </Typography>
            <Typography
              sx={{ marginBottom: "0.1rem" }}
              variant="h6"
              component="h6"
            >
              Location: {props.job.location}
            </Typography>
            <Typography
              sx={{ marginBottom: "0.1rem" }}
              variant="h6"
              component="h6"
            >
              Job Type: {props.job.jobType}
            </Typography>
          </Box>

          <Box
            sx={{
              paddingTop: "0.5rem",
              paddingLeft: "1rem",
            }}
          >
            <Typography
              sx={{ marginBottom: "0.1rem" }}
              variant="h5"
              component="h5"
            >
              Job Type: {props.job.jobType}
            </Typography>
            <Typography
              sx={{ marginBottom: "0.1rem" }}
              variant="h5"
              component="h5"
            >
              Hours Per Week: {props.job.hoursPerWeek}
            </Typography>
            <Typography
              sx={{ marginBottom: "0.1rem" }}
              variant="h5"
              component="h5"
            >
              Federal Funding Required?:{" "}
              {props.job.federalFunding ? "Yes" : "No"}
            </Typography>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}
