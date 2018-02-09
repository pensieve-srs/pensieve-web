import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Segment, Header, Icon } from "semantic-ui-react";

class ComingSoon extends Component {
  render() {
    return (
      <div className="container mt-5">
        <div className="col-md-8 offset-md-2 text-center">
          <Segment padded="very">
            <Header icon textAlign="center">
              <Icon name="settings" circular />
              Coming soon
              <Header.Subheader>
                We are working to build out this page as fast as possible!
              </Header.Subheader>
            </Header>
            <Link to="/" className="btn btn-primary">
              Go Home
            </Link>
          </Segment>
        </div>
      </div>
    );
  }
}

export default ComingSoon;
