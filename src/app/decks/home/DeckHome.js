import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Dropdown, Icon, Label, Segment } from "semantic-ui-react";
import pluralize from "pluralize";

import {
  AddCardModal,
  DeleteDeckModal,
  EditDeckModal,
  ResetDeckModal,
  MODAL_TYPES,
} from "../../../components/modals";

import * as api from "../deckActions";
import * as cardApi from "../../cards/cardActions";

import DeckItem from "./DeckItem";

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
        console.log("error", error);
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
        console.log("error", error);
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
        console.log("error", error);
      },
    );
  };

  fetchDeck = deckId => {
    api.fetchDeck(deckId).then(
      response => {
        this.setState({ deck: response.data });
      },
      error => {
        console.log("error", error);
      },
    );
  };

  fetchCards = deckId => {
    cardApi.fetchCards(deckId).then(
      response => {
        this.setState({ cards: response.data });
      },
      error => {
        console.log("error", error);
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
        console.log("error", error.response);
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
        console.log("error", error);
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
        console.log("error", error);
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
        console.log("error", error);
      },
    );
  };

  render() {
    const { deck, cards, showModalType } = this.state;

    const numNewCards = cards.filter(card => !card.nextReviewDate).length;
    const numDueCards = cards.filter(card => new Date(card.nextReviewDate) < new Date()).length;
    const numInProgress = cards.length - numNewCards - numDueCards;
    const createdAt = new Date(deck.createdAt);

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
              <h6 className="text-secondary text-uppercase m-0 mt-3">DECK</h6>
              <h1 className="font-weight-bold h3 mb-0 mt-0">{deck.title}</h1>
              {deck.description && <p className="text-dark h5 mb-1">{deck.description}</p>}
              <div className="mt-1 mb-3">
                <small className="text-secondary">
                  {createdAt.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  &middot; {pluralize("card", cards.length, true)}
                </small>
              </div>
              <div className="my-3">
                <Button onClick={this.studyDeck} primary disabled={cards.length === 0}>
                  Study now
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
                  {(numDueCards > 0 || numNewCards > 0 || numInProgress > 0) && (
                    <div className="mb-2 text-right">
                      {numDueCards > 0 && (
                        <Label color="orange" className="ml-1">
                          {numDueCards} Weak
                        </Label>
                      )}
                      {numNewCards > 0 && (
                        <Label color="teal" className="ml-1">
                          {numNewCards} New
                        </Label>
                      )}
                      {numInProgress > 0 && (
                        <Label color="grey" className="ml-1">
                          {numInProgress} Learning
                        </Label>
                      )}
                    </div>
                  )}
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
