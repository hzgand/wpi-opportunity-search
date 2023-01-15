import React from "react";
// import {makeStyles } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Typography, Box } from "@mui/material";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EmailIcon from "@mui/icons-material/Email";
import ShareIcon from "@mui/icons-material/Share";
import CardContent from "@mui/material/CardContent";

export default function ImgMediaCard(props) {
  return (
    <Card sx={{ width: 0.65, margin: "auto" }}>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <CardHeader
          avatar={
            <Avatar
              sx={{ fontSize: "2rem", width: 100, height: 100 }}
              aria-label="recipe"
            >
              AI
            </Avatar>
          }
        />

        <CardContent sx={{ width: 1 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyItems: "space-evenly",
              width: 1,
            }}
          >
            <Box>
              <Typography gutterBottom variant="h5" component="h2">
                {props.job.positionTitle}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  paddingRight: "10rem",
                }}
              >
                <Typography variant="body2" color="textSecondary" component="p">
                  {props.job.department}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {props.job.location}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {props.job.hoursPerWeek}{" "}
                  {props.job.hoursPerWeek === 1 ? "hr/week" : "hrs/week"}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="textSecondary" component="p">
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <AssuredWorkloadIcon />
                    {props.job.federalFunding
                      ? "Work Study Required"
                      : "Work Study Not Required"}
                  </Box>
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {" "}
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <CalendarMonthIcon
                      sx={{ paddingRight: "0.1rem" }}
                    ></CalendarMonthIcon>
                    {props.job.jobType}
                  </Box>
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <EmailIcon sx={{ paddingRight: "0.1rem" }}></EmailIcon>
                    {props.job.email}
                  </Box>
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
}
