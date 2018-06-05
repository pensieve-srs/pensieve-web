import React, { Component } from "react";
import PropTypes from "prop-types";
import pluralize from "pluralize";
import { Button, Header, Icon, Popup, Label, Tab, Dropdown } from "semantic-ui-react";

import * as api from "../deckActions";
import * as cardApi from "../../cards/cardActions";
import withErrors from "../../../helpers/withErrors";
import { ProgressBar } from "../../../components";
import { SettingsTab, CardsTab, DescriptionTab } from "./tabs";

import {
  AddCardModal,
  DeleteDeckModal,
  ResetDeckModal,
  MODAL_TYPES,
} from "../../../components/modals";

import "./DeckHome.css";

const Tagline = ({ tagline }) =>
  tagline ? (
    <p className="text-secondary h5 font-weight-light mb-2">{tagline}</p>
  ) : (
    <p className="text-secondary h5 font-italic font-weight-light mb-2">No description provided</p>
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

  onUpdateCards = cards => this.setState({ cards });

  createCard = card => {
    const deckId = this.state.deck._id;
    const { front, back, notes } = card;
    cardApi.createCard({ deck: deckId, front, back, notes }).then(response => {
      this.setState(({ cards }) => ({ cards: [...cards, response.data] }));
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
    const { deck, cards, showModalType, isLoading } = this.state;
    const numExpiredCards = cards.filter(card => card.recallRate <= 0.5).length;

    return (
      <div className="deck-home mt-4">
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
                <h1
                  className="font-weight-bold h3 mb-0 mt-0"
                  style={{ fontSize: "22px", lineHeight: "1.2em" }}
                >
                  {isLoading ? <span className="text-secondary">Loading info...</span> : deck.title}
                </h1>
                <Tagline tagline={deck.tagline} />
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
                    menuItem: DescriptionTab.MenuItem(),
                    render: () => <DescriptionTab deck={deck} />,
                  },
                  {
                    menuItem: CardsTab.MenuItem(cards),
                    render: () => (
                      <CardsTab cards={cards} deck={deck} onUpdate={this.onUpdateCards} />
                    ),
                  },
                  {
                    menuItem: SettingsTab.MenuItem(),
                    render: () => (
                      <SettingsTab
                        deck={deck}
                        onSubmit={this.editDeck}
                        onShowModal={this.onShowModal}
                      />
                    ),
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
