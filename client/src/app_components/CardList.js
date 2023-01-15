// import "./App.css";
import React from "react";
import CardHeaderExample from "./CardHeaderExample";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import LinearProgress from "@mui/material/LinearProgress";

class CardList extends React.Component {
  constructor() {
    super();
    this.state = { jobs: [], doneLoading: false};
  }

  componentDidMount() {
    fetch("http://localhost:3000/api/jobs")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ jobs: data, doneLoading: true});
      });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.searchString !== this.props.searchString || nextState !== this.state;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.searchString !== this.props.searchString) {
      fetch(`http://localhost:3000/api/jobs?q=${this.props.searchString}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ jobs: data, doneLoading: true});
      });
    }
  }

  render() {
    return (
      <Box>
        {this.state.doneLoading ? this.state.jobs.map((jobItem) => {
          return (
            <ListItem key={jobItem._id}>
              <CardHeaderExample job={jobItem} />
            </ListItem>
          );
        }) : <LinearProgress/>}
      </Box>
    );
  }
}

export default CardList;
