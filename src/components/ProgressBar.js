// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import "./ProgressBar.css";

type Props = { percent: number };

class ProgressBar extends Component<Props> {
  render() {
    const { percent } = this.props;

    const classNames = cx("progress-bar", {
      "progress-bar--warning": percent <= 0.7,
      "progress-bar--alert": percent < 0.5,
    });

    return (
      <div className="progress">
        <div
          style={{ width: `${String(percent * 100)}%` }}
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
  percent: PropTypes.number.isRequired,
};

export default ProgressBar;
