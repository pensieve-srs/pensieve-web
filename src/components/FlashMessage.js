/* @flow */
import React, { Component } from "react";
import { Message, Icon } from "semantic-ui-react";
import cx from "classnames";

import "./FlashMessage.css";

type Props = {
  onDismiss: () => any,
  className: string,
  message: string,
};

class FlashMessage extends Component<Props> {
  render() {
    const { className, message } = this.props;
    return (
      <div className={cx(className, "FlashMessage")} style={{ zIndex: "2000" }}>
        <Message negative className="rounded-0">
          <div className="container">
            <span>{message}</span>
            <Icon onClick={this.props.onDismiss} name="close" />
          </div>
        </Message>
      </div>
    );
  }
}

export default FlashMessage;
