// @flow
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Header, Segment, Progress, Label, Button } from "semantic-ui-react";
import pluralize from "pluralize";

import { Deck } from "../../types";
import { Octicon } from "../../components";
import * as api from "./deckActions";

import "./DeckCard.css";

type Props = {
  deck: Deck,
  className: string,
};

class DeckCard extends Component<Props> {
  studyDeck = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    api.studyDeck(id).then(response => {
      this.props.history.push(`/sessions/${response.data._id}`);
    });
  };

  render() {
    const { deck, className } = this.props;
    const isExpired = deck.recallRate < 0.5;

    return (
      <div className={className}>
        <Link to={`/decks/${deck._id}`} className="position-relative">
          <Segment className="deck-card mt-4 position-relative">
            <div className="d-flex">
              <div className="mt-1">
                {isExpired ? (
                  <Octicon name="issue-reopened" color="red" />
                ) : (
                  <Octicon name="checklist" />
                )}
              </div>
              <div className="ml-1">
                <Header className="m-0" as="h4">
                  <Header.Content className="pl-1">
                    {deck.title}
                    <Header.Subheader>{deck.description}</Header.Subheader>
                  </Header.Content>
                </Header>
                {deck.tags && (
                  <div className="deck-tags mt-1">
                    {deck.tags.slice(0, 10).map(tag => (
                      <Label key={tag._id} className="mb-2">
                        {tag.value}
                      </Label>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div
              className="d-flex justify-content-between align-items-center position-absolute pb-2 px-3"
              style={{ bottom: "0", right: "0", left: "0" }}
            >
              {deck.cardsCount >= 0 && (
                <small className="m-0 text-secondary float-left" style={{ fontWeight: 600 }}>
                  {pluralize("card", deck.cardsCount, true)}
                </small>
              )}
              {isExpired && (
                <Button compact primary onClick={e => this.studyDeck(e, deck._id)}>
                  Study
                </Button>
              )}
            </div>
            <Progress attached="bottom" color="blue" percent={100} />
          </Segment>
        </Link>
      </div>
    );
  }
}

export default withRouter(DeckCard);
