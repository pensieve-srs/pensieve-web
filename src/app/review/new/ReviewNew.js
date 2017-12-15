import React, { Component } from "react";

import * as api from "../home/homeActions";

class ReviewNew extends Component {
  componentWillMount() {
    this.createSession("study");
  }

  createSession = sessionType => {
    api.createSession(sessionType).then(
      response => {
        this.props.history.push(`/sessions/${response.data.session._id}`);
      },
      error => {
        console.log("error", error);
      },
    );
  };

  render() {
    return (
      <div className="pt-5">
        <div className="col-md-8 offset-md-2 text-center pt-5">
          <h3>Creating your study session...</h3>
        </div>
      </div>
    );
  }
}

export default ReviewNew;
