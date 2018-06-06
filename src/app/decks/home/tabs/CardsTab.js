import React, { Component } from "react";
import { Header, Label, Tab, Button } from "semantic-ui-react";

import { Octicon } from "../../../../components";
import CardItem from "../CardItem";
import * as cardApi from "../../../cards/cardActions";

import { CardModal, MODAL_TYPES } from "../../../../components/modals";

const CardTab = ({ count }) => (
  <div className="d-flex align-items-center">
    <span className="font-weight-medium">Cards</span>
    <Label circular className="text-secondary ml-1" size="tiny">
      {count}
    </Label>
  </div>
);

const EmptyView = ({ title, description, emoji = "✌️", onShowModal }) => (
  <Tab.Pane padded="very">
    <div className="blankslate blankslate-spacious">
      <Header size="large">
        {emoji} Add cards to your decks
        <Header.Subheader className="text-secondary" style={{ lineHeight: "1.4em" }}>
          Decks are made of related notes. Start adding cards to your deck by clicking 'Add Card +'
        </Header.Subheader>
      </Header>
      <Button primary onClick={onShowModal} value={MODAL_TYPES.ADD_ITEM}>
        Add Cards +
      </Button>
    </div>
  </Tab.Pane>
);

class CardsTab extends Component {
  state = {
    showModalType: undefined,
    selectedCard: undefined,
  };

  onShowCardModal = index =>
    this.setState({ showModalType: MODAL_TYPES.CARD_ITEM, selectedCard: index });

  onCloseModal = () => this.setState({ showModalType: undefined, selectedCard: undefined });

  onPrevCard = () => this.setState({ selectedCard: Math.max(this.state.selectedCard - 1, 0) });

  onNextCard = () =>
    this.setState({
      selectedCard: Math.min(this.state.selectedCard + 1, this.props.cards.length - 1),
    });

  resetCard = cardId => {
    cardApi.resetCard(cardId).then(response => {
      const newCard = response.data;
      const cards = this.props.cards.map(card => (card._id === newCard._id ? newCard : card));
      this.props.onUpdate(cards);
    });
  };

  deleteCard = cardId => {
    cardApi.deleteCard(cardId).then(response => {
      this.onCloseModal();
      const cards = this.props.cards.filter(card => card._id !== cardId);
      this.props.onUpdate(cards);
    });
  };

  editCard = card => {
    cardApi.editCard(card).then(response => {
      const newCard = response.data;
      const cards = this.props.cards.map(el => (el._id === newCard._id ? newCard : el));
      this.props.onUpdate(cards);
    });
  };

  render() {
    const { cards, deck } = this.props;
    const { showModalType, selectedCard } = this.state;

    if (cards.length === 0) {
      return <EmptyView onShowModal={this.props.onShowModal} />;
    }

    return (
      <Tab.Pane>
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
        {cards.map((card, key) => (
          <CardItem
            key={key}
            card={card}
            onClick={() => this.onShowCardModal(key)}
            deleteCard={this.deleteCard}
            resetCard={this.resetCard}
          />
        ))}
      </Tab.Pane>
    );
  }
}

CardsTab.MenuItem = cards => ({
  key: "cards",
  icon: <Octicon name="note" className="mr-1" />,
  content: <CardTab count={cards.length} />,
});

export default CardsTab;
