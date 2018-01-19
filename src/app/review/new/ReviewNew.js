import React, { Component } from "react";
import PropTypes from "prop-types";

import * as api from "../../home/homeActions";

class ReviewNew extends Component {
  componentWillMount() {
    this.createSession("study");
  }

  createSession = sessionType => {
    api.createSession(sessionType).then(
      ({ data }) => {
        this.props.history.push(`/sessions/${data.session._id}`);
      },
      error => {
        this.props.onError("Oops! Something went wrong.");
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

ReviewNew.propTypes = {
  history: PropTypes.object.isRequired,
};

export default ReviewNew;
