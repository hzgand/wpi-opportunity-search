// import "./App.css";
import React from "react";
import CardHeaderExample from "./CardHeaderExample";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";

class CardList extends React.Component {
  constructor() {
    super();
    this.state = { jobs: [] };
  }

  componentDidMount() {
    let jobs = [];
    fetch("http://localhost:3000/api/jobs")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ jobs: data });
      });
  }

  render() {
    return (
      <Box>
        {this.state.jobs.map((jobItem) => {
          return (
            <ListItem>
              <CardHeaderExample job={jobItem} />
            </ListItem>
          );
        })}
      </Box>
    );
  }
}

export default CardList;
