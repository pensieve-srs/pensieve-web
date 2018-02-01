// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";

type Props = { progress: Number };

class ProgressBar extends Component<Props> {
  render() {
    const { progress } = this.props;
    return (
      <div className="progress" style={{ width: "35px", borderRadius: "999px" }}>
        <div
          style={{ background: "#50E3C2", width: `${String(progress)}%`, borderRadius: "999px" }}
          className="progress-bar"
          role="progressbar"
          aria-valuenow="0"
          aria-valuemin=""
          aria-valuemax="100"
        />
      </div>
    );
  }
}

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
};

export default ProgressBar;
