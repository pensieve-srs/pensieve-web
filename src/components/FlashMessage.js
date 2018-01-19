/* @flow */
import React, { Component } from "react";
import { Message, Icon } from "semantic-ui-react";
import cx from "classnames";

type Props = {
  onDismiss: () => any,
  className: string,
};

class FlashMessage extends Component<Props> {
  onDismiss = () => {
    console.log("Flash dismissed!");
    this.props.onDismiss();
  };

  render() {
    const { className } = this.props;
    return (
      <div className={cx(className, "FlashMessage")}>
        <Message negative>
          <div className="container">
            <span>This is an error message</span>
            <Icon onClick={this.onDismiss} name="close" />
          </div>
        </Message>
      </div>
    );
  }
}

export default FlashMessage;
