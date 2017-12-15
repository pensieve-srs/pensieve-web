import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Input, Segment } from "semantic-ui-react";

import * as api from "./deckActions";

import "./Decks.css";

const EmptyView = ({ title, description, emoji = "✌️" }) => (
  <div className="text-center ml-auto mr-auto my-5">
    <div className="text-center">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h2>
            {emoji} {title}
          </h2>
          <p className="text-secondary">{description}</p>
        </div>
      </div>
    </div>
  </div>
);

const DeckCard = ({ deck, className }) => (
  <div className={className}>
    <Link to={`/decks/${deck._id}`} className="position-relative">
      <Segment stacked className="deck-card mt-4">
        <h4 className="text-dark font-weight-bold h6 m-0">{deck.title}</h4>
      </Segment>
    </Link>
  </div>
);

class Decks extends Component {
  state = { decks: [], filter: "" };

  componentWillMount = () => {
    this.fetchDecks();
  };

  onSearch = e => this.setState({ filter: e.target.value });

  fetchDecks = () => {
    api.fetchDecks().then(
      response => {
        this.setState({ decks: response.data.decks });
      },
      error => {
        console.log("error", error);
      },
    );
  };

  render() {
    const { decks = [], filter } = this.state;

    const filteredDecks =
      filter.length > 0 ? decks.filter(deck => deck.title.indexOf(filter) !== -1) : decks;

    return (
      <div className="decks-page ">
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
                  <Link to="decks/new" className="btn btn-primary">
                    Create Deck +
                  </Link>
                </div>
              </div>
              <hr className="mt-2 mb-2" />
              {filteredDecks.length > 0 ? (
                <div className="row">
                  {filteredDecks.map((deck, key) => (
                    <DeckCard className="col-xs-6 col-sm-4 col-md-3" deck={deck} key={key} />
                  ))}
                </div>
              ) : (
                <EmptyView
                  title="No decks in your collection yet"
                  description="Decks are groups of related items for organizing your notes. Haven't created a deck yet? No problem. Click 'Create Deck +' to get started."
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Decks;
