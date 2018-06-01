import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Dropdown, Header, Icon, Popup, Label, Tab } from "semantic-ui-react";
import pluralize from "pluralize";

import {
  AddCardModal,
  CardModal,
  DeleteDeckModal,
  EditDeckModal,
  ResetDeckModal,
  MODAL_TYPES,
} from "../../../components/modals";
import withErrors from "../../../helpers/withErrors";

import { ProgressBar, Octicon } from "../../../components";

import * as api from "../deckActions";
import * as cardApi from "../../cards/cardActions";

import DeckItem from "./DeckItem";

import "./DeckHome.css";

const EmptyView = ({ title, description, emoji = "✌️" }) => (
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

const DescriptionPane = ({ body }) => (
  <Tab.Pane className="p-5">
    <Label attached="top">Description</Label>
    <div>{body}</div>
  </Tab.Pane>
);

const CardTab = ({ count }) => (
  <div className="d-flex align-items-center">
    <span className="font-weight-medium">Cards</span>
    <Label as="a" circular className="text-secondary ml-1" size="tiny">
      {count}
    </Label>
  </div>
);

class DeckHome extends Component {
  state = {
    deck: {},
    cards: [],
    showModalType: undefined,
    selectedCard: undefined,
    isLoading: true,
  };

  componentWillMount() {
    const { deckId } = this.props.match.params;

    if (deckId) {
      this.fetchDeck(deckId);
      this.fetchCards(deckId);
    }
  }

  onShowModal = (event, data) => this.setState({ showModalType: data.value });

  onShowCardModal = index =>
    this.setState({ showModalType: MODAL_TYPES.CARD_ITEM, selectedCard: index });

  onCloseModal = () => this.setState({ showModalType: undefined, selectedCard: undefined });

  onPrevCard = () =>
    this.setState(({ selectedCard }) => ({ selectedCard: Math.max(selectedCard - 1, 0) }));

  onNextCard = () =>
    this.setState(({ selectedCard, cards }) => ({
      selectedCard: Math.min(selectedCard + 1, cards.length - 1),
    }));

  createCard = card => {
    const deckId = this.state.deck._id;
    const { front, back, notes } = card;
    cardApi.createCard({ deck: deckId, front, back, notes }).then(response => {
      this.setState(({ cards }) => ({ cards: [...cards, response.data] }));
    });
  };

  resetCard = cardId => {
    cardApi.resetCard(cardId).then(response => {
      const newCard = response.data;
      const cards = this.state.cards.map(card => (card._id === newCard._id ? newCard : card));
      this.setState(() => ({ cards: cards }));
    });
  };

  editCard = card => {
    cardApi.editCard(card).then(response => {
      const newCard = response.data;
      const cards = this.state.cards.map(el => (el._id === newCard._id ? newCard : el));
      this.setState(() => ({ cards: cards }));
    });
  };

  deleteCard = cardId => {
    cardApi.deleteCard(cardId).then(response => {
      this.onCloseModal();
      this.setState(({ cards }) => {
        return { cards: cards.filter(card => card._id !== cardId) };
      });
    });
  };

  fetchDeck = deckId => {
    api.fetchDeck(deckId).then(response => {
      this.setState({ deck: response.data, isLoading: false });
    });
  };

  fetchCards = deckId => {
    cardApi.fetchCards(deckId).then(response => {
      this.setState({ cards: response.data, isLoading: false });
    });
  };

  editDeck = deck => {
    api.editDeck(deck).then(response => {
      this.setState({ deck: response.data });
      this.onCloseModal();
    });
  };

  resetDeck = () => {
    const deckId = this.state.deck._id;
    api.resetDeck(deckId).then(response => {
      this.setState({ cards: response.data });
      this.onCloseModal();
    });
  };

  studyDeck = () => {
    const deckId = this.state.deck._id;
    api.studyDeck(deckId).then(response => {
      this.props.history.push(`/sessions/${response.data._id}`);
    });
  };

  deleteDeck = () => {
    const deckId = this.state.deck._id;
    api.deleteDeck(deckId).then(response => {
      this.props.history.push(`/decks`);
    });
  };

  render() {
    const { deck, cards, showModalType, selectedCard, isLoading } = this.state;
    const numExpiredCards = cards.filter(card => card.recallRate <= 0.5).length;

    const CardsPane =
      cards.length > 0
        ? () => (
            <Tab.Pane>
              {cards.map((card, key) => (
                <DeckItem
                  key={key}
                  card={card}
                  onClick={() => this.onShowCardModal(key)}
                  deleteCard={this.deleteCard}
                  resetCard={this.resetCard}
                />
              ))}
            </Tab.Pane>
          )
        : () => (
            <Tab.Pane>
              <EmptyView
                title={
                  isLoading ? (
                    <span className="text-secondary">Loading cards...</span>
                  ) : (
                    "Add cards to your decks"
                  )
                }
                description={
                  isLoading
                    ? "Electrons are beaming to your computer as we speak."
                    : "Decks are made of related notes. Start adding cards to your deck by clicking 'Add Card +'"
                }
              />
            </Tab.Pane>
          );

    return (
      <div className="deck-home mt-4">
        {selectedCard >= 0 && (
          <CardModal
            card={cards[selectedCard]}
            deck={deck}
            open={showModalType === MODAL_TYPES.CARD_ITEM}
            onClose={this.onCloseModal}
            onNext={this.onNextCard}
            onPrev={this.onPrevCard}
            onEdit={this.editCard}
            onReset={this.resetCard}
            onDelete={this.deleteCard}
          />
        )}
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
              <Header as="h6" className="text-secondary text-uppercase m-0">
                DECK
              </Header>
              <div className="deck-header">
                <h1 className="font-weight-bold h3 mb-0 mt-0">
                  {isLoading ? <span className="text-secondary">Loading info...</span> : deck.title}
                </h1>
                {deck.description && <p className="text-dark h5 mb-1">{deck.description}</p>}
                {deck.tags &&
                  deck.tags.map(tag => (
                    <Label key={tag._id} className="mb-2">
                      {tag.value}
                    </Label>
                  ))}
              </div>
              <p
                className="text-secondary text-uppercase m-0 mt-4 mb-2 font-weight-medium"
                style={{ fontSize: "11px" }}
              >
                {pluralize("card", cards.length, true)} &middot; {numExpiredCards} to review
              </p>
              <div className="d-flex flex-wrap-reverse justify-content-between align-items-center">
                <div className="left-side">
                  <Button primary onClick={this.studyDeck} disabled={numExpiredCards === 0}>
                    Study Now{" "}
                    <Label
                      style={{
                        padding: ".43em",
                        margin: "-.53em",
                        marginLeft: "4px",
                        color: "#fff",
                        background: "#0662E4",
                      }}
                    >
                      {numExpiredCards}
                    </Label>
                  </Button>
                  <Button
                    basic
                    color="blue"
                    onClick={this.onShowModal}
                    value={MODAL_TYPES.ADD_ITEM}
                    className="ml-2"
                  >
                    Add Cards +
                  </Button>
                </div>
                {deck.recallRate >= 0 && (
                  <Popup
                    inverted
                    position="bottom right"
                    trigger={
                      <div className="right-side my-3 d-flex align-items-center">
                        <strong
                          className="text-secondary mr-2 font-weight-medium"
                          style={{ lineHeight: "1em" }}
                        >
                          Total Strength
                        </strong>
                        <ProgressBar percent={deck.recallRate} />
                      </div>
                    }
                  >
                    Your recall strength of this deck is approximately{" "}
                    {parseInt(deck.recallRate * 100, 10)}%.
                  </Popup>
                )}
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
            </div>
            <div className="col-lg-10 offset-lg-1 my-3">
              <Tab
                className="w-100"
                panes={[
                  {
                    menuItem: {
                      key: "deck",
                      icon: <Octicon name="book" className="mr-1" />,
                      content: <span className="font-weight-medium">Deck</span>,
                    },
                    render: () => <DescriptionPane body={deck.description} />,
                  },
                  {
                    menuItem: {
                      key: "cards",
                      icon: <Octicon name="note" className="mr-1" />,
                      content: <CardTab count={cards.length} />,
                    },
                    render: () => <CardsPane />,
                  },
                ]}
              />
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

export default withErrors(DeckHome);
