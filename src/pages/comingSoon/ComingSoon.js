import React, { Component } from "react";
import { Link } from "react-router-dom";

class ComingSoon extends Component {
  render() {
    return (
      <div className="container mt-5">
        <div className="col-md-8 offset-md-2 text-center">
          <span style={{ fontSize: "50px" }} className="font-weight-bold">
            Coming soon...
          </span>
          <h3 className="mt-2">Oops, this page is in the works.</h3>
          <Link to="/" className="btn btn-primary">
            Go Home
          </Link>
        </div>
      </div>
    );
  }
}

export default ComingSoon;
