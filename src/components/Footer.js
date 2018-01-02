import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <div className="footer text-center text-secondary mt-5 mb-3">
        <small className="d-inline m-2">
          <span>Pensieve &copy; 2017</span>
        </small>
        &middot;
        <small className="d-inline m-2">
          <span>Feedback?</span>
          <a className="ml-2" href="mailto:hello@pensieve.space">
            Send me an email
          </a>
        </small>
        &middot;
        <small className="d-inline m-2">
          <a href="https://github.com/pensieve-srs" target="_blank" rel="noopener noreferrer">
            Contribute
          </a>
        </small>
      </div>
    );
  }
}

export default Footer;
