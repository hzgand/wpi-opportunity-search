import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';

import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import Box from "@mui/material/Box";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";

export default function JobCardNew(props) {
    return (
        <Card sx={{
            width: 0.5,
            margin: "auto"
        }}>
            <CardActionArea>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>    
                    <CardHeader
                        avatar={
                            <Avatar aria-label="recipe" sx={{
                                fontSize: "1rem",
                                width: 100,
                                height: 100
                                }}>
                                {props.job.positionTitle.match(/\b([A-Z])/g).join('')}
                            </Avatar>
                        }
                    />
                    <Box>
                        <Box>
                            <CardContent>
                                <Box>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {props.job.positionTitle}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {props.job.hoursPerWeek} hrs/week
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {props.job.jobDescription}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Box>
                        <Box>
                            <IconButton aria-label="add to favorites">
                                <FavoriteIcon />
                            </IconButton>
                            <IconButton aria-label="share">
                                <ShareIcon />
                            </IconButton>
                            <Button size="small" color="primary">
                                Primary
                            </Button>
                            <Button size="small" color="secondary">
                                Secondary
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </CardActionArea>
        </Card>
    );
}