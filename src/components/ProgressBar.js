// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import "./ProgressBar.css";

type Props = { progress: Number };

class ProgressBar extends Component<Props> {
  render() {
    const { progress } = this.props;
    const classNames = cx("progress-bar", {
      "progress-bar--warning": progress < 70,
      "progress-bar--alert": progress < 50,
    });

    return (
      <div className="progress">
        <div
          style={{ width: `${String(progress)}%` }}
          className={classNames}
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
