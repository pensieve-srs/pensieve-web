import React, { Component } from "react";
import { Segment, Header, Icon } from "semantic-ui-react";

class Export extends Component {
  render() {
    return (
      <Segment padded="very">
        <Header icon textAlign="center">
          <Icon name="settings" circular />
          Coming soon
          <Header.Subheader>We are working to make this a feature hopefully soon!</Header.Subheader>
        </Header>
      </Segment>
    );
  }
}

export default Export;
