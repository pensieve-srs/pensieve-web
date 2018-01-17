import React, { Component } from "react";
import { Grid, Icon, Progress, Segment } from "semantic-ui-react";

class ActivityOverview extends Component {
  state = {
    decks: { all: 0 },
    cards: { all: 0, new: 0, due: 0 },
    reviews: { all: 0 },
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps !== this.props && nextProps.counts) {
      this.setState({ ...nextProps.counts });
    }
  };

  render() {
    const { decks, cards, reviews } = this.state;

    return (
      <Segment className="mb-3">
        <Grid columns="3" textAlign="center">
          <Grid.Column>
            <span className="text-secondary">
              <Icon name="folder open outline" />
              <strong className="text-dark">{decks.all}</strong> decks
            </span>
          </Grid.Column>
          <Grid.Column>
            <span className="text-secondary">
              <Icon name="file outline" />
              <strong className="text-dark">{cards.all}</strong> cards
            </span>
          </Grid.Column>
          <Grid.Column>
            <span className="text-secondary">
              <Icon name="repeat" />
              <strong className="text-dark">{reviews.all}</strong> reviews
            </span>
          </Grid.Column>
        </Grid>
        {cards.all > 0 && (
          <Progress attached="bottom" total={cards.all} value={cards.all} color="grey" />
        )}
        {cards.due > 0 && (
          <Progress
            attached="bottom"
            total={cards.all}
            value={cards.due + cards.new}
            color="orange"
          />
        )}
        {cards.new > 0 && (
          <Progress attached="bottom" total={cards.all} value={cards.new} color="teal" />
        )}
      </Segment>
    );
  }
}

export default ActivityOverview;
