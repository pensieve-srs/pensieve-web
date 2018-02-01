import React, { Component } from "react";

class ProgressBar extends Component {
  render() {
    const { progress } = this.props;
    return (
      <div className="progress" style={{ width: "35px", borderRadius: "999px" }}>
        <div
          style={{ background: "#50E3C2", width: `${progress}%`, borderRadius: "999px" }}
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

export default ProgressBar;
