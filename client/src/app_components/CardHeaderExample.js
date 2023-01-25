import React from "react";
import moment from "moment";
// import {makeStyles } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { Typography, Box } from "@mui/material";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EmailIcon from "@mui/icons-material/Email";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ApartmentIcon from "@mui/icons-material/Apartment";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";

const config = {
  iconPadding: "0.5rem",
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ImgMediaCard(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card sx={{ width: 0.6, margin: "auto" }}>
      <CardActionArea onClick={handleClickOpen}>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <CardHeader
            avatar={
              <Avatar
                sx={{ fontSize: "2rem", width: 100, height: 100 }}
                aria-label="recipe"
              >
                {(props.job.positionTitle.match(/\b([A-Z])/g)
                  ? props.job.positionTitle.match(/\b([A-Z])/g).join("")
                  : "?"
                ).substring(0, 3)}
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
              <Box sx={{display: 'flex', flexDirection: 'row'}}>
                <Typography gutterBottom variant="h5" component="h2">
                  {props.job.positionTitle}
                </Typography>
                <Typography gutterBottom variant="subtitle2" component="h4" sx={{marginLeft: 'auto'}}>
                  {moment(props.job.updatedAt).fromNow()}
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
                    width: 0.5,
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
                      {props.job.federalFunding ? (
                        <Box sx={{ display: "flex", flexDirection: "row" }}>
                          <AssuredWorkloadIcon
                            sx={{ paddingRight: config.iconPadding }}
                          />{" "}
                          Federal Work Study Required
                        </Box>
                      ) : (
                        ""
                      )}
                    </Box>
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {" "}
                    <Box>
                      {props.job.jobType === "Summer" ? (
                        <Box sx={{ display: "flex", flexDirection: "row" }}>
                          <WbSunnyIcon
                            sx={{ paddingRight: config.iconPadding }}
                          />{" "}
                          Summer
                        </Box>
                      ) : (
                        <Box sx={{ display: "flex", flexDirection: "row" }}>
                          <CalendarMonthIcon
                            sx={{ paddingRight: config.iconPadding }}
                          />{" "}
                          Academic Year
                        </Box>
                      )}
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
      {/* Dialog */}
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography
              sx={{ ml: 2, flex: 1 }}
              variant="h6"
              component="div"
            ></Typography>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem>
            <Typography variant="h4" component="h4">
              {props.job.positionTitle}
            </Typography>
          </ListItem>
          <ListItem>
            <ListItemText
              primary={moment(props.job.createdAt).format('MMMM Do, YYYY')}
              secondary="Added to Database"
            />
            <ListItemText
              primary={moment(props.job.updatedAt).format('MMMM Do, YYYY')}
              secondary="Last Updated"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={props.job.jobType}
              secondary="Employment Period"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={props.job.department}
              secondary="Department"
            />
          </ListItem>
          <ListItem>
            <ListItemText primary={props.job.location} secondary="Location" />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={props.job.studentsRequired}
              secondary="Number of Students Required"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={props.job.hoursPerWeek}
              secondary="Hours Per Week"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={props.job.federalFunding ? "Required" : "Not Required"}
              secondary="Federal Funding"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={props.job.jobDescription}
              secondary="Description"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={props.job.requirements ?? "N/A"}
              secondary="Requirements"
            />
          </ListItem>
          <ListItem>
            <ListItemText primary={props.job.contact} secondary="Contact" />
          </ListItem>
          <ListItem>
            <ListItemText primary={props.job.email} secondary="Email" />
          </ListItem>
          <ListItem>
            <ListItemText primary={props.job.phone} secondary="Phone" />
          </ListItem>
        </List>
      </Dialog>
    </Card>
  );
}
