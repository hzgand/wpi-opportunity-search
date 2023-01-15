// import "./App.css";
import React from "react";
import CardHeaderExample from "./CardHeaderExample";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import LinearProgress from "@mui/material/LinearProgress";

const toQueryString = (searchParameters) => {
  return new URLSearchParams(searchParameters).toString();
}

class CardList extends React.Component {
  constructor() {
    super();
    this.state = { jobs: [], doneLoading: false };
  }

  componentDidMount() {
    fetch("http://localhost:3000/api/jobs")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ jobs: data, doneLoading: true });
      });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      JSON.stringify(nextProps.searchParameters) !== JSON.stringify(this.props.searchParameters) ||
      nextState !== this.state
    );
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.searchParameters) !== JSON.stringify(this.props.searchParameters)) {
      this.setState({ jobs: [], doneLoading: false });
      fetch(`http://localhost:3000/api/jobs?${toQueryString(this.props.searchParameters)}`)
        .then((response) => response.json())
        .then((data) => {
          this.setState({ jobs: data, doneLoading: true });
        });
    }
  }

  render() {
    return (
      <Box>
        {this.state.doneLoading ? (
          this.state.jobs.map((jobItem) => {
            return (
              <ListItem key={jobItem._id}>
                <CardHeaderExample job={jobItem} />
              </ListItem>
            );
          })
        ) : (
          <LinearProgress />
        )}
      </Box>
    );
  }
}

export default CardList;
