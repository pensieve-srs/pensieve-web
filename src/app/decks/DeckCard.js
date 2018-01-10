// @flow
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Segment } from "semantic-ui-react";

import { Deck } from "../../types";

type Props = {
  deck: Deck,
  className: string,
};

class DeckCard extends Component<Props> {
  render() {
    const { deck, className } = this.props;
    return (
      <div className={className}>
        <Link to={`/decks/${deck._id}`} className="position-relative">
          <Segment className="deck-card mt-4">
            <h4 className="text-dark font-weight-bold h6 m-0">{deck.title}</h4>
          </Segment>
        </Link>
      </div>
    );
  }
}

export default DeckCard;
