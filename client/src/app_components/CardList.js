// import "./App.css";
import React from "react";
import JobCard from "./JobCard";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import LinearProgress from "@mui/material/LinearProgress";
import SnackBar from "@mui/material/Snackbar";

const toQueryString = (searchParameters) => {
  return new URLSearchParams(searchParameters).toString();
}

class CardList extends React.Component {
  constructor() {
    super();
    this.state = { jobs: [], doneLoading: false, snackBarOpen: false };
  }

  componentDidMount() {
    fetch("http://localhost:3000/api/jobs")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ jobs: data, doneLoading: true, snackBarOpen: true });
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
      this.setState({ jobs: [], doneLoading: false, snackBarOpen: false });
      fetch(`http://localhost:3000/api/jobs?${toQueryString(this.props.searchParameters)}`)
        .then((response) => response.json())
        .then((data) => {
          this.setState({ jobs: data, doneLoading: true, snackBarOpen: true });
        });
    }
  }

  handleSnackBarClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({snackBarOpen: false});
  }

  render() {
    return (
      <Box>
        <SnackBar
        open={this.state.snackBarOpen}
        autoHideDuration={4000}
        onClose={this.handleSnackBarClose.bind(this)}
        message={this.state.doneLoading ? (this.state.jobs.length === 1 ? `${this.state.jobs.length} job found` : `${this.state.jobs.length} jobs found`) : 'Loading...'}
      />
        {this.state.doneLoading ? (
          this.state.jobs.map((jobItem) => {
            return (
              <ListItem key={jobItem._id}>
                <JobCard job={jobItem} />
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
