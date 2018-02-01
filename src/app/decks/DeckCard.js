// @flow
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Header, Segment, Progress } from "semantic-ui-react";
import pluralize from "pluralize";

import { Deck } from "../../types";

import "./DeckCard.css";

type Props = {
  deck: Deck,
  className: string,
};

class DeckCard extends Component<Props> {
  render() {
    const { deck, className } = this.props;

    // TODO: add progress strength
    const percent = Math.random() * 100;

    return (
      <div className={className}>
        <Link to={`/decks/${deck._id}`} className="position-relative">
          <Segment className="deck-card mt-4 position-relative">
            <Header className="m-0" as="h5">
              {deck.title}
            </Header>
            <div
              className="d-flex justify-content-between align-items-center position-absolute pb-2 px-3"
              style={{ bottom: "0", right: "0", left: "0" }}
            >
              <small className="m-0 text-secondary font-weight-bold">
                {pluralize("card", deck.numCards, true)}
              </small>
              <div className="progress" style={{ width: "35px", borderRadius: "999px" }}>
                <div
                  style={{ background: "#50E3C2", width: `${percent}%`, borderRadius: "999px" }}
                  className="progress-bar"
                  role="progressbar"
                  aria-valuenow="0"
                  aria-valuemin=""
                  aria-valuemax="100"
                />
              </div>
            </div>
            <Progress attached="bottom" color="blue" percent={100} />
          </Segment>
        </Link>
      </div>
    );
  }
}

export default DeckCard;
