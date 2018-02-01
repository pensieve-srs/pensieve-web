import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Dropdown, Icon, Segment } from "semantic-ui-react";
import pluralize from "pluralize";

import {
  AddCardModal,
  DeleteDeckModal,
  EditDeckModal,
  ResetDeckModal,
  MODAL_TYPES,
} from "../../../components/modals";

import { ProgressBar } from "../../../components";

import * as api from "../deckActions";
import * as cardApi from "../../cards/cardActions";

import DeckItem from "./DeckItem";

import "./DeckHome.css";

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

class DeckHome extends Component {
  state = {
    deck: {},
    cards: [],
    showModalType: undefined,
  };

  componentWillMount() {
    const { deckId } = this.props.match.params;

    if (deckId) {
      this.fetchDeck(deckId);
      this.fetchCards(deckId);
    }
  }

  onShowModal = (event, data) => this.setState({ showModalType: data.value });

  onCloseModal = () => this.setState({ showModalType: undefined });

  createCard = card => {
    const deckId = this.state.deck._id;
    const { front, back } = card;
    cardApi.createCard({ deck: deckId, front, back }).then(
      response => {
        this.setState(({ cards }) => ({ cards: [...cards, response.data] }));
        this.onCloseModal();
      },
      error => {
        this.props.onError("Oops! Something went wrong.");
      },
    );
  };

  resetCard = cardId => {
    cardApi.resetCard(cardId).then(
      response => {
        const newCard = response.data;
        const cards = this.state.cards.map(card => (card._id === newCard._id ? newCard : card));
        this.setState(() => ({ cards: cards }));
      },
      error => {
        this.props.onError("Oops! Something went wrong.");
      },
    );
  };

  deleteCard = cardId => {
    cardApi.deleteCard(cardId).then(
      response => {
        this.setState(({ cards }) => {
          return { cards: cards.filter(card => card._id !== cardId) };
        });
      },
      error => {
        this.props.onError("Oops! Something went wrong.");
      },
    );
  };

  fetchDeck = deckId => {
    api.fetchDeck(deckId).then(
      response => {
        this.setState({ deck: response.data });
      },
      error => {
        this.props.onError("Oops! Something went wrong.");
      },
    );
  };

  fetchCards = deckId => {
    cardApi.fetchCards(deckId).then(
      response => {
        this.setState({ cards: response.data });
      },
      error => {
        this.props.onError("Oops! Something went wrong.");
      },
    );
  };

  editDeck = deck => {
    api.editDeck(deck).then(
      response => {
        this.setState({ deck: response.data });
        this.onCloseModal();
      },
      error => {
        this.props.onError("Oops! Something went wrong.");
      },
    );
  };

  resetDeck = () => {
    const deckId = this.state.deck._id;
    api.resetDeck(deckId).then(
      response => {
        this.setState({ cards: response.data });
        this.onCloseModal();
      },
      error => {
        this.props.onError("Oops! Something went wrong.");
      },
    );
  };

  studyDeck = () => {
    const deckId = this.state.deck._id;
    api.studyDeck(deckId).then(
      response => {
        this.props.history.push(`/sessions/${response.data._id}`);
      },
      error => {
        this.props.onError("Oops! Something went wrong.");
      },
    );
  };

  deleteDeck = () => {
    const deckId = this.state.deck._id;
    api.deleteDeck(deckId).then(
      response => {
        this.props.history.push(`/decks`);
      },
      error => {
        this.props.onError("Oops! Something went wrong.");
      },
    );
  };

  render() {
    const { deck, cards, showModalType } = this.state;

    // TODO: Add total progress to deck
    const progress = Math.random() * 100;

    return (
      <div className="deck-home">
        <AddCardModal
          open={showModalType === MODAL_TYPES.ADD_ITEM}
          onClose={this.onCloseModal}
          onSubmit={this.createCard}
        />
        <DeleteDeckModal
          open={showModalType === MODAL_TYPES.DELETE_DECK}
          onClose={this.onCloseModal}
          onSubmit={this.deleteDeck}
        />
        <EditDeckModal
          deck={deck}
          open={showModalType === MODAL_TYPES.EDIT_DECK}
          onClose={this.onCloseModal}
          onSubmit={this.editDeck}
        />
        <ResetDeckModal
          open={showModalType === MODAL_TYPES.RESET_DECK}
          onClose={this.onCloseModal}
          onSubmit={this.resetDeck}
        />
        <div className="container">
          <div className="row">
            <div className="position-relative col-lg-10 offset-lg-1">
              <h6 className="text-secondary text-uppercase m-0 mt-3">
                DECK &middot; {pluralize("card", cards.length, true)}
              </h6>
              <div className="deck-header">
                <h1 className="font-weight-bold h3 mb-0 mt-0">{deck.title}</h1>
                {deck.description && <p className="text-dark h5 mb-1">{deck.description}</p>}
              </div>
              <div className="d-flex flex-wrap-reverse justify-content-between align-items-center mt-4">
                <div className="left-side">
                  <Button onClick={this.studyDeck} primary disabled={cards.length === 0}>
                    Study Now
                  </Button>
                  <Button
                    basic
                    color="blue"
                    onClick={this.onShowModal}
                    value={MODAL_TYPES.ADD_ITEM}
                    className="ml-2"
                  >
                    Add Card +
                  </Button>
                </div>
                <div className="right-side mb-3 d-flex align-items-center">
                  <strong style={{ lineHeight: "1em" }} className="text-secondary mr-2">
                    Total Strength
                  </strong>
                  <ProgressBar progress={progress} />
                </div>
              </div>
              <Dropdown
                on="click"
                icon={false}
                pointing="top right"
                trigger={
                  <Icon name="ellipsis vertical" size="large" className="text-secondary m-2" />
                }
                style={{
                  right: "12px",
                  position: "absolute",
                  top: "12px",
                }}
              >
                <Dropdown.Menu>
                  <Dropdown.Item onClick={this.onShowModal} value={MODAL_TYPES.EDIT_DECK}>
                    Edit Deck
                  </Dropdown.Item>
                  <Dropdown.Item onClick={this.onShowModal} value={MODAL_TYPES.RESET_DECK}>
                    Reset Deck
                  </Dropdown.Item>
                  <Dropdown.Item onClick={this.onShowModal} value={MODAL_TYPES.DELETE_DECK}>
                    Delete Deck
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <hr />
            </div>
            <div className="col-lg-10 offset-lg-1">
              {cards.length > 0 ? (
                <div>
                  <Segment.Group>
                    {cards.map((card, key) => (
                      <DeckItem
                        key={key}
                        card={card}
                        deleteCard={this.deleteCard}
                        resetCard={this.resetCard}
                      />
                    ))}
                  </Segment.Group>
                </div>
              ) : (
                <EmptyView
                  title="Add cards to your deck"
                  description="Decks are made of related notes. Start adding cards to your deck by clicking 'Add Item +'"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DeckHome.propTypes = {
  match: PropTypes.object.isRequired,
};

export default DeckHome;
