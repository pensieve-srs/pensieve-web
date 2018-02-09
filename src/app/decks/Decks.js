// @flow
import React, { Component } from "react";
import { Header, Button, Input } from "semantic-ui-react";
import type { Deck } from "../../types";

import withErrors from "../../helpers/withErrors";

import * as api from "./deckActions";

import DeckCard from "./DeckCard";

import "./Decks.css";

const EmptyView = ({
  title,
  description,
  emoji = "✌️",
}: {
  title: string,
  description: string,
  emoji?: string,
}) => (
  <div className="text-center ml-auto mr-auto my-5">
    <div className="text-center">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <Header size="large">
            {emoji} {title}
            <Header.Subheader className="text-secondary" style={{ lineHeight: "1.4em" }}>
              {description}
            </Header.Subheader>
          </Header>
        </div>
      </div>
    </div>
  </div>
);

type Props = {
  history: any,
  onError: any,
};

type State = {
  decks: Array<Deck>,
  filter: string,
};

class Decks extends Component<Props, State> {
  state = { decks: [], filter: "" };

  componentWillMount = () => {
    this.fetchDecks();
  };

  onGoto = (event: Event, data: any) => this.props.history.push(data.value);

  onSearch = ({ target }: { target: HTMLInputElement }) => this.setState({ filter: target.value });

  fetchDecks = () => {
    api.fetchDecks().then(response => {
      this.setState({ decks: response.data });
    });
  };

  render() {
    const { decks = [], filter } = this.state;

    const filteredDecks =
      filter.length > 0 ? decks.filter(deck => deck.title.indexOf(filter) !== -1) : decks;

    return (
      <div className="decks-page mt-4">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div className="decks-container-header">
                <div>
                  <h1 className="h5 m-0">Decks</h1>
                  <p className="text-secondary m-0">{decks.length} decks in your collection</p>
                </div>
                <div className="decks-container-actions">
                  {decks.length > 0 && (
                    <Input
                      className="mr-3"
                      icon="search"
                      onChange={this.onSearch}
                      placeholder="Search for decks..."
                    />
                  )}
                  <Button onClick={this.onGoto} value="decks/new" primary>
                    Create Deck +
                  </Button>
                </div>
              </div>
              <hr className="mt-2 mb-2" />
              {filteredDecks.length > 0 ? (
                <div className="row">
                  {filteredDecks.map((deck, key) => (
                    <DeckCard className="col-6 col-sm-4 col-md-3" deck={deck} key={key} />
                  ))}
                </div>
              ) : (
                <EmptyView
                  title="No decks in your collection yet"
                  description="Decks are groups of related cards for organizing your notes. Haven't created a deck yet? No problem. Click 'Create Deck +' to get started."
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withErrors(Decks);
