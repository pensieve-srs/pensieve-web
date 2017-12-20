import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Dropdown, Icon, Label, Segment } from "semantic-ui-react";
import pluralize from "pluralize";

import {
  AddItemModal,
  DeleteDeckModal,
  EditDeckModal,
  ResetDeckModal,
  MODAL_TYPES,
} from "../../../components/modals";

import * as api from "../deckActions";
import * as itemApi from "../../items/itemActions";

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
    showModalType: undefined,
  };

  componentWillMount() {
    const { deckId } = this.props.match.params;

    if (deckId) {
      this.fetchDeck(deckId);
    }
  }

  onShowModal = modalType => this.setState({ showModalType: modalType });

  onCloseModal = () => this.setState({ showModalType: undefined });

  createItem = item => {
    const deckId = this.state.deck._id;
    const { front, back } = item;
    itemApi.createItem({ deck: deckId, front, back }).then(
      response => {
        this.setState(({ deck }) => {
          const items = [...deck.items, response.data.item];
          return { deck: { ...deck, items: items } };
        });
        this.onCloseModal();
      },
      error => {
        console.log("error", error);
      },
    );
  };

  resetItem = itemId => {
    itemApi.resetItem(itemId).then(
      response => {
        const newItem = response.data.item;
        this.setState(({ deck }) => {
          const items = deck.items.map(item => (item._id === newItem._id ? newItem : item));
          return { deck: { ...deck, items: items } };
        });
      },
      error => {
        console.log("error", error);
      },
    );
  };

  deleteItem = itemId => {
    itemApi.deleteItem(itemId).then(
      response => {
        this.setState(({ deck }) => {
          const items = deck.items.filter(item => item._id !== itemId);
          console.log("items", items);
          return { deck: { ...deck, items: items } };
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
        this.setState({ deck: response.data.deck });
      },
      error => {
        console.log("error", error);
      },
    );
  };

  editDeck = deck => {
    api.editDeck(deck).then(
      response => {
        this.setState({ deck: response.data.deck });
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
        this.setState({ deck: response.data.deck });
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
        this.props.history.push(`/sessions/${response.data.session._id}`);
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
    const { deck = {}, showModalType } = this.state;
    const { items = [] } = deck;

    const numNewCards = items.filter(item => !item.nextReviewDate).length;
    const numDueCards = items.filter(item => new Date(item.nextReviewDate) < new Date()).length;
    const numInProgress = items.length - numNewCards - numDueCards;
    const createdAt = new Date(deck.createdAt);

    return (
      <div className="deck-home">
        <AddItemModal
          open={showModalType === MODAL_TYPES.ADD_ITEM}
          onClose={this.onCloseModal}
          onSubmit={this.createItem}
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
                  &middot; {pluralize("card", items.length, true)}
                </small>
              </div>
              <div className="my-3">
                <Button onClick={this.studyDeck} primary disabled={items.length === 0}>
                  Study now
                </Button>
                <Button
                  className="btn-default ml-2"
                  onClick={() => this.onShowModal(MODAL_TYPES.ADD_ITEM)}
                >
                  Add item +
                </Button>
              </div>
              <Dropdown
                on="click"
                icon={false}
                pointing="top right"
                trigger={
                  <Button basic size="small">
                    <Icon name="ellipsis vertical" className="m-0" />
                  </Button>
                }
                style={{
                  right: "12px",
                  position: "absolute",
                  top: "12px",
                }}
              >
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => this.onShowModal(MODAL_TYPES.EDIT_DECK)}>
                    Edit Deck
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => this.onShowModal(MODAL_TYPES.RESET_DECK)}>
                    Reset Deck
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => this.onShowModal(MODAL_TYPES.DELETE_DECK)}>
                    Delete Deck
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <hr />
            </div>
            <div className="col-lg-10 offset-lg-1">
              {items.length > 0 ? (
                <div>
                  {(numDueCards > 0 || numNewCards > 0 || numInProgress > 0) && (
                    <div className="mb-2 text-right">
                      {numDueCards > 0 && (
                        <Label color="yellow" className="ml-1">
                          {numDueCards} Due
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
                    {items.map((item, key) => (
                      <DeckItem
                        key={key}
                        item={item}
                        deleteItem={this.deleteItem}
                        resetItem={this.resetItem}
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
