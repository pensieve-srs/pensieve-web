// @flow
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Header, Segment, Progress, Popup, Label, Icon } from "semantic-ui-react";
import pluralize from "pluralize";

import { Deck } from "../../types";
import { ProgressBar } from "../../components";

import "./DeckCard.css";

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
          <Segment className="deck-card mt-4 position-relative">
            {deck.recallRate <= 0.5 && (
              <Label floating circular color="red" size="tiny">
                <Popup
                  inverted
                  position="bottom right"
                  trigger={<Icon className="m-0" name="exclamation" />}
                >
                  Review this deck before you forget the information and need to relearn it.
                </Popup>
              </Label>
            )}
            <Header className="m-0" as="h4">
              {deck.title}
            </Header>
            <div
              className="d-flex justify-content-between align-items-center position-absolute pb-2 px-3"
              style={{ bottom: "0", right: "0", left: "0" }}
            >
              {deck.cardsCount >= 0 && (
                <small className="m-0 text-secondary" style={{ fontWeight: 600 }}>
                  {pluralize("card", deck.cardsCount, true)}
                </small>
              )}
              {deck.recallRate >= 0 && (
                <Popup
                  inverted
                  position="top right"
                  trigger={
                    <div>
                      <ProgressBar percent={deck.recallRate} />
                    </div>
                  }
                >
                  Your recall strength of this deck is approximately{" "}
                  {parseInt(deck.recallRate * 100, 10)}%.
                </Popup>
              )}
            </div>
            <Progress attached="bottom" color="blue" percent={100} />
          </Segment>
        </Link>
      </div>
    );
  }
}

export default DeckCard;
