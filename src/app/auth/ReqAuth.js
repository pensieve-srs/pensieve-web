import React, { Component } from "react";
import cookie from "js-cookie";
import PropTypes from "prop-types";

const ReqAuth = ComposedComponent => {
  class Authentication extends Component {
    componentWillMount() {
      const token = cookie.get("token");
      if (!token) {
        this.props.history.push("/");
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  return Authentication;
};

ReqAuth.propTypes = {
  history: PropTypes.object.isRequired,
};

export default ReqAuth;
