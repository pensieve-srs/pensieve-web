/* @flow */
import React, { Component, Fragment } from "react";
import FlashMessage from "./FlashMessage";
import type { ElementType } from "react";

type Props = any;
type State = {
  open: boolean,
  message: string,
};

const ErrorHandler = (ComposedComponent: ElementType) => {
  class ErrorHandler extends Component<Props, State> {
    state = { open: false, message: "" };

    onDismiss = () => this.setState({ open: false, message: "" });

    onError = (message: string) => this.setState({ open: true, message });

    render() {
      const { open, message } = this.state;
      return (
        <Fragment>
          {open &&
          message.length > 0 && (
            <FlashMessage
              onDismiss={this.onDismiss}
              className="App-flashMessage"
              message={message}
            />
          )}
          <ComposedComponent {...this.props} onError={this.onError} />;
        </Fragment>
      );
    }
  }

  return ErrorHandler;
};

export default ErrorHandler;
