import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class Results extends Component {
  render() {
    const { items } = this.props;
    return (
      <div className="session-results review-page">
        <div className="container">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <h5 className="mb-3">Results</h5>
              <ul className="list-group">
                {items.map((item, key) => (
                  <li className="list-group-item" key={item._id}>
                    {item.front}
                  </li>
                ))}
              </ul>
              <div className="text-right mt-3">
                <Link to="/decks" className="btn btn-primary">
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

Results.propTypes = {
  items: PropTypes.array.isRequired,
};

export default Results;
