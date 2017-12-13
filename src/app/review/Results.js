import React, { Component } from "react";
import { Link } from "react-router-dom";

class Results extends Component {
  render() {
    const { items } = this.props;
    return (
      <div className="session-results review-page pt-5 pb-5">
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <h5 className="mb-3">Results</h5>
              <ul className="list-group">
                {items.map((item, key) => (
                  <li className="list-group-item" key={key}>
                    {item.front}
                  </li>
                ))}
              </ul>
              <div className="text-right mt-3">
                <Link to="/" className="btn btn-primary">
                  Back
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Results;
