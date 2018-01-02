import React, { Component } from "react";
import { Grid, Icon, Progress, Segment } from "semantic-ui-react";

class ActivityOverview extends Component {
  render() {
    return (
      <Segment className="mb-3">
        <Grid columns="3" textAlign="center">
          <Grid.Column>
            <span className="text-secondary">
              <Icon name="folder open outline" />
              <strong className="text-dark">10</strong> decks
            </span>
          </Grid.Column>
          <Grid.Column>
            <span className="text-secondary">
              <Icon name="file outline" />
              <strong className="text-dark">124</strong> cards
            </span>
          </Grid.Column>
          <Grid.Column>
            <span className="text-secondary">
              <Icon name="repeat" />
              <strong className="text-dark">100</strong> reviews
            </span>
          </Grid.Column>
        </Grid>
        <Progress attached="bottom" total={120} value={120} color="grey" />
        <Progress attached="bottom" total={120} value={70} color="orange" />
        <Progress attached="bottom" total={120} value={50} color="teal" />
      </Segment>
    );
  }
}

export default ActivityOverview;
