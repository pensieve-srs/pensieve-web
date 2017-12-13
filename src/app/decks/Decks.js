import React, { Component } from "react";
import axios from "axios";
import cookie from "js-cookie";
import { Link } from "react-router-dom";

import "./Decks.css";

const EmptyView = ({ title, description, emoji = "✌️" }) => (
  <div className="empty view text-center ml-auto mr-auto mt-5 mb-5">
    <div className="text-center">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <span className="empty-view-icon">{emoji}</span>
          <h2 className="empty-view-title">{title}</h2>
          <p className="text-secondary">{description}</p>
        </div>
      </div>
    </div>
  </div>
);

const DeckCard = ({ deck, className }) => (
  <div className={className}>
    <Link to={`/decks/${deck._id}`} className="deck-card bg-white mt-4 position-relative">
      <h4 className="text-dark font-weight-bold h6 m-0">{deck.title}</h4>
    </Link>
  </div>
);

class Decks extends Component {
  constructor(props) {
    super(props);

    this.state = { decks: [] };
  }

  componentWillMount() {
    const config = { headers: { Authorization: cookie.get("token") } };
    axios.get("/api/decks", config).then(
      response => {
        this.setState(() => ({ decks: response.data.decks }));
      },
      error => {
        console.log("error", error);
      },
    );
  }

  render() {
    const { decks = [] } = this.state;

    return (
      <div className="decks-page ">
        <div className="container mt-5 mb-5">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div className="decks-container-header">
                <div>
                  <h1 className="h5 m-0">Decks</h1>
                  <p className="text-secondary m-0">{decks.length} decks in your collection</p>
                </div>
                <div className="decks-container-actions">
                  {decks.length > 0 && (
                    <input
                      onChange={this.onSearchChange}
                      type="text"
                      className="decks-container-search form-control"
                      placeholder="Search for decks..."
                    />
                  )}
                  <Link to="decks/new" className="btn btn-primary">
                    Create Deck +
                  </Link>
                </div>
              </div>
              <hr className="mt-2 mb-2" />
              {decks.length > 0 ? (
                <div className="row">
                  {decks.map((deck, key) => (
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
