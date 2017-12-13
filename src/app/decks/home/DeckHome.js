import React, { Component } from "react";
import { Button, Popup } from "semantic-ui-react";
import pluralize from "pluralize";
import moment from "moment";
import axios from "axios";
import cookie from "js-cookie";

import DeckItem from "./DeckItem";
import "./DeckHome.css";

const MODAL_TYPES = {
  ADD_ITEM: "addItem",
  DELETE_DECK: "deleteDeck",
  EDIT_DECK: "editDeck",
  RESET_DECK: "resetDeck",
};

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

class DeckHome extends Component {
  constructor(props) {
    super(props);

    this.state = { deck: {}, showModal: undefined };
    this.onAddItem = this.onAddItem.bind(this);
    this.onDeleteDeck = this.onDeleteDeck.bind(this);
    this.onResetDeck = this.onResetDeck.bind(this);
    this.onStudyDeck = this.onStudyDeck.bind(this);
    this.onShowModal = this.onShowModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
  }

  componentWillMount() {
    const { deckId } = this.props.match.params;

    if (deckId) {
      const config = { headers: { Authorization: cookie.get("token") } };

      axios.get(`/api/decks/${deckId}`, config).then(
        response => {
          this.setState(() => ({ deck: response.data.deck }));
        },
        error => {
          console.log("error", error);
        },
      );
    }
  }

  onShowModal(modalType) {
    this.setState(() => ({ showModalType: modalType }));
  }

  onCloseModal() {
    this.setState(() => ({ showModalType: undefined }));
  }

  onAddItem(data) {
    const deckId = this.state.deck._id;
    this.props.actions.createItem({
      deck: deckId,
      front: data.front,
      back: data.back,
    });
    this.onCloseModal();
  }

  onEditDeck(data) {
    const deckId = this.state.deck._id;
    this.props.actions.editDeck({ deckId, ...data });
    this.onCloseModal();
  }

  onDeleteDeck() {
    const deckId = this.state.deck._id;
    this.props.actions.deleteDeck(deckId);
    this.onCloseModal();
  }

  onResetDeck() {
    const deckId = this.state.deck._id;
    this.props.actions.resetDeck(deckId);
    this.onCloseModal();
  }

  onStudyDeck() {
    const deckId = this.state.deck._id;
    this.props.history.push(`/sessions/new?deckId=${deckId}`);
  }

  render() {
    const { deck = {} } = this.state;
    const { items = [] } = deck;

    const numNewCards = items.filter(item => !item.nextReviewDate).length;
    const numDueCards = items.filter(item => moment(item.nextReviewDate).isBefore(moment())).length;
    const numInProgress = items.length - numNewCards - numDueCards;

    return (
      <div className="deck-home pt-5 pb-5">
        <div className="container mt-3">
          <div className="row">
            <div className="position-relative col-lg-10 offset-lg-1">
              <h6 className="text-secondary text-uppercase m-0 mt-3">DECK</h6>
              <h1 className="font-weight-bold h3 mb-0 mt-0">{deck.title}</h1>
              {deck.description && <p className="text-dark h5 mb-1">{deck.description}</p>}
              <div className="mt-1 mb-3">
                <small className="text-secondary">
                  {moment(deck.createdAt).format("MMMM D, YYYY")} &middot;{" "}
                  {pluralize("card", items.length, true)}
                </small>
              </div>
              <div className="my-3">
                <Button onClick={this.onStudyDeck} primary disabled={items.length === 0}>
                  Study now
                </Button>
                <Button
                  className="btn-default ml-2"
                  onClick={() => this.onShowModal(MODAL_TYPES.ADD_ITEM)}
                >
                  Add item +
                </Button>
              </div>
              <Popup
                on="click"
                position="bottom right"
                trigger={
                  <Button className="deck-home-overflow position-absolute" basic size="small">
                    <i className="fa fa-ellipsis-v fa-lg" aria-hidden="true" />
                  </Button>
                }
                content={
                  <Button.Group vertical>
                    <Button onClick={() => this.onShowModal(MODAL_TYPES.EDIT_DECK)} basic>
                      Edit Deck
                    </Button>
                    <Button onClick={() => this.onShowModal(MODAL_TYPES.RESET_DECK)} basic>
                      Reset Deck
                    </Button>
                    <Button onClick={() => this.onShowModal(MODAL_TYPES.DELETE_DECK)} basic>
                      Delete Deck
                    </Button>
                  </Button.Group>
                }
              />
              <hr />
            </div>
            <div className="col-lg-10 offset-lg-1">
              {items.length > 0 ? (
                <div>
                  {(numDueCards > 0 || numNewCards > 0 || numInProgress > 0) && (
                    <div className="mb-2 text-right">
                      {numNewCards > 0 && (
                        <span className="badge badge-info" style={{ padding: "6px" }}>
                          {pluralize("new card", numNewCards, true)}
                        </span>
                      )}
                      {numDueCards > 0 && (
                        <span className="badge badge-warning ml-2" style={{ padding: "6px" }}>
                          {pluralize("due card", numDueCards, true)}
                        </span>
                      )}
                      {numInProgress > 0 && (
                        <span className="badge badge-secondary ml-2" style={{ padding: "6px" }}>
                          {pluralize("later cards", numInProgress, true)}
                        </span>
                      )}
                    </div>
                  )}
                  <div className="border rounded">
                    {items.map((item, key) => (
                      <DeckItem key={key} item={item} actions={this.props.actions} />
                    ))}
                  </div>
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

export default DeckHome;
