/* @flow */
import React, { Component, Fragment } from "react";
import FlashMessage from "../components/FlashMessage";
import axios from "axios";
import cookie from "js-cookie";
import type { ElementType } from "react";

type Props = any;
type State = {
  open: boolean,
  message: string,
};

const withErrors = (ComposedComponent: ElementType) => {
  class ErrorHandler extends Component<Props, State> {
    state = { open: false, message: "" };

    constructor(props: any) {
      super(props);
      this._resInterceptor = axios.interceptors.response.use(null, error => {
        if (error.response && error.response.status === 401) {
          cookie.remove("token");
          cookie.remove("user");
          this.props.history.push("/");
          return Promise.reject(error);
        } else {
          this.onError("Oops, looks like something went wrong.");
          return Promise.reject(error);
        }
      });
    }
    
    componentWillUnmount() {
      axios.interceptors.response.eject(this._resInterceptor);
    }

    onDismiss = () => this.setState({ open: false, message: "" });

    onError = (message: string) => this.setState({ open: true, message });

    render() {
      const { open, message = "" } = this.state;
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
          <ComposedComponent {...this.props} onError={this.onError} />
        </Fragment>
      );
    }
  }

  return ErrorHandler;
};

export default withErrors;
