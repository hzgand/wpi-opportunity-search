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
import CardActionArea from "@mui/material/CardActionArea";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ApartmentIcon from "@mui/icons-material/Apartment";
import WbSunnyIcon from '@mui/icons-material/WbSunny';

const config = {
  iconPadding: "0.5rem",
};

export default function ImgMediaCard(props) {
  return (
    <Card sx={{ width: 0.6, margin: "auto" }}>
      <CardActionArea>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <CardHeader
            avatar={
              <Avatar
                sx={{ fontSize: "2rem", width: 100, height: 100 }}
                aria-label="recipe"
              >
                {(props.job.positionTitle.match(/\b([A-Z])/g) ? props.job.positionTitle.match(/\b([A-Z])/g).join("") : "?").substring(0, 3)}
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
                    width: 0.5
                  }}
                >
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                      <ApartmentIcon
                        sx={{ paddingRight: config.iconPadding }}
                      ></ApartmentIcon>
                      {props.job.department}
                    </Box>
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                      <LocationOnIcon
                        sx={{ paddingRight: config.iconPadding }}
                      ></LocationOnIcon>
                      {props.job.location}
                    </Box>
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                      <EmailIcon
                        sx={{ paddingRight: config.iconPadding }}
                      ></EmailIcon>
                      {props.job.email}
                    </Box>
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    <Box>
                      {props.job.federalFunding
                        ? <Box sx={{ display: "flex", flexDirection: "row" }}><AssuredWorkloadIcon
                          sx={{ paddingRight: config.iconPadding }}
                        /> Federal Work Study Required</Box>
                        : ""}
                    </Box>
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {" "}
                    <Box>
                      {props.job.jobType === "Summer"
                        ? <Box sx={{ display: "flex", flexDirection: "row" }}><WbSunnyIcon
                          sx={{ paddingRight: config.iconPadding }}
                        /> Summer</Box>
                        : <Box sx={{ display: "flex", flexDirection: "row" }}><CalendarMonthIcon
                        sx={{ paddingRight: config.iconPadding }}
                      /> Academic Year</Box>}
                    </Box>
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                      <QueryBuilderIcon
                        sx={{ paddingRight: config.iconPadding }}
                      />
                      {props.job.hoursPerWeek}{" "}
                      {props.job.hoursPerWeek === 1 ? "hr/week" : "hrs/week"}
                    </Box>
                  </Typography>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Box>
      </CardActionArea>
    </Card>
  );
}
