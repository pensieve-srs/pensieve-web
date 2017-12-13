import React, { Component } from "react";

import "./ProgressBar.css";

class ProgressBar extends Component {
  render() {
    const { progress } = this.props;

    return (
      <div className="ProgressBar progress">
        <div
          className="ProgressBar-bar progress-bar"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin="0"
          aria-valuemax="100"
          style={{ width: `${progress}%` }}
        >
          <span className="sr-only">{progress}% Complete</span>
        </div>
      </div>
    );
  }
}

export default ProgressBar;
