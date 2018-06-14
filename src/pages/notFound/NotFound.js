import React, { Component } from "react";
import { Link } from "react-router-dom";

class NotFound extends Component {
  render() {
    return (
      <div className="container mt-5 pt-5">
        <div className="col-md-8 offset-md-2 text-center">
          <span style={{ fontSize: "80px" }} className="font-weight-bold">
            404
          </span>
          <h3>Oops, something went wrong.</h3>
          <Link to="/" className="btn btn-primary">
            Go Home
          </Link>
        </div>
      </div>
    );
  }
}

export default NotFound;
