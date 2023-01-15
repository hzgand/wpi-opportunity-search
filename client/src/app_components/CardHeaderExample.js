import React from "react";
// import {makeStyles } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Typography, Box } from "@mui/material";

export default function ImgMediaCard(props) {
  return (
    <Card>
      <CardHeader
        avatar={<Avatar aria-label="recipe">bruh</Avatar>}
        action={
          <IconButton aria-label="settings">
            <FavoriteIcon />
          </IconButton>
        }
        title={
          <Box>
            <Typography>{props.job.positionTitle}</Typography>
          </Box>
        }
        subheader={
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography>Work here!</Typography>
              <Typography>Hello</Typography>
              <Typography>Hello</Typography>
            </Box>
            <Box>
              <Typography>Work here!</Typography>
              <Typography>Hello</Typography>
              <Typography>Hello</Typography>
            </Box>
          </Box>
        }
      />
    </Card>
  );
}
