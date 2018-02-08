import React, { Component } from "react";
import cx from "classnames";
import { Link } from "react-router-dom";

class Footer extends Component {
  render() {
    const { className } = this.props;
    return (
      <div className={cx(className, "footer container text-secondary mt-5 mb-4")}>
        <div className="row">
          <div className="col-lg-10 offset-lg-1 d-flex justify-content-between">
            <div className="left-side">
              <small className="d-inline m-2">
                <span>Pensieve &copy; 2018</span>
              </small>
              <small className="d-inline m-2">
                <a className="ml-2" href="mailto:hello@pensieve.space">
                  Contact
                </a>
              </small>
            </div>
            <div className="right-side">
              <small className="d-inline m-2">
                <a href="https://github.com/pensieve-srs" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </small>
              <small className="d-inline m-2">
                <Link to="/api">API</Link>
              </small>
              <small className="d-inline m-2">
                <a href="http://eepurl.com/dfhnq9" target="_blank" rel="noopener noreferrer">
                  Newsletter
                </a>
              </small>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
