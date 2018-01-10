import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Icon, Dropdown, Header, Label, Segment } from "semantic-ui-react";

import * as api from "../itemActions";

import {
  DeleteItemModal,
  EditItemModal,
  ResetItemModal,
  MODAL_TYPES,
} from "../../../components/modals";

import "./ItemHome.css";

const EmptyView = () => (
  <div className="item-home">
    <div className="col-md-8 offset-md-2 text-center">
      <span style={{ fontSize: "80px", fontWeight: "bold" }} role="img" aria-label="jsx-a11y">
        😅
      </span>
      <h3 style={{ marginBottom: "40px" }}>Oops, that card does not seem to exist.</h3>
      <Link to="/" className="btn btn-primary">
        Go Home
      </Link>
    </div>
  </div>
);

const getColor = date => {
  if (!date) {
    // new card
    return "teal";
  } else if (new Date(date) < new Date()) {
    // due card
    return "orange";
  } else {
    // learning card
    return "grey";
  }
};

const getLabel = date => {
  if (!date) {
    return "New Card";
  } else if (new Date(date) < new Date()) {
    return "Weak Card";
  } else {
    return "Learning";
  }
};

const ItemLabel = ({ date }) => {
  const color = getColor(date);
  const label = getLabel(date);

  return (
    <Label className="card-label" color={color}>
      {label}
    </Label>
  );
};

class ItemHome extends Component {
  state = {
    card: {},
    showFront: false,
    showModalType: undefined,
  };

  componentWillMount() {
    const { cardId } = this.props.match.params;

    if (cardId) {
      this.fetchItem(cardId);
    }
  }

  onClick = () => this.setState({ showFront: !this.state.showFront });

  onCloseModal = () => this.setState({ showModalType: undefined });

  onShowModal = (event, data) => this.setState({ showModalType: data.value });

  onGoto = (event, data) => this.props.history.push(data.value);

  fetchItem = cardId => {
    api.fetchItem(cardId).then(
      response => {
        this.setState(() => ({ card: response.data }));
      },
      error => {
        console.log("error", error);
      },
    );
  };

  editItem = card => {
    api.editItem(card).then(
      response => {
        this.setState({ card: response.data });
        this.onCloseModal();
      },
      error => {
        console.log("error", error);
      },
    );
  };

  deleteItem = () => {
    const { card } = this.state;
    api.deleteItem(card._id).then(
      response => {
        this.props.history.go(-1);
      },
      error => {
        console.log("error", error);
      },
    );
  };

  resetItem = () => {
    const { card } = this.state;
    api.resetItem(card._id).then(
      response => {
        this.setState({ card: response.data });
        this.onCloseModal();
      },
      error => {
        console.log("error", error);
      },
    );
  };

  render() {
    const { card, showFront, showModalType } = this.state;
    const { deck } = card;

    if (!card || Object.keys(card).length === 0) {
      return <EmptyView />;
    }

    const cardContent = showFront ? card.front : card.back;

    return (
      <div className="card-home">
        <DeleteItemModal
          open={showModalType === MODAL_TYPES.DELETE_ITEM}
          onClose={this.onCloseModal}
          onSubmit={this.deleteItem}
        />
        <EditItemModal
          item={card}
          open={showModalType === MODAL_TYPES.EDIT_ITEM}
          onClose={this.onCloseModal}
          onSubmit={this.editItem}
        />
        <ResetItemModal
          open={showModalType === MODAL_TYPES.RESET_ITEM}
          onClose={this.onCloseModal}
          onSubmit={this.resetItem}
        />
        <div className="container">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-lg-8 offset-lg-2">
              <div className="card-home-header d-flex">
                <Header as="h3" className="text-uppercase m-0">
                  Item
                </Header>
                <Dropdown
                  on="click"
                  icon={false}
                  pointing="top right"
                  trigger={
                    <Icon name="ellipsis vertical" size="large" className="text-secondary mx-2" />
                  }
                >
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={this.onShowModal} value={MODAL_TYPES.EDIT_ITEM}>
                      Edit Item
                    </Dropdown.Item>
                    {card.nextReviewDate && (
                      <Dropdown.Item onClick={this.onShowModal} value={MODAL_TYPES.RESET_ITEM}>
                        Reset Item
                      </Dropdown.Item>
                    )}
                    <Dropdown.Item onClick={this.onShowModal} value={MODAL_TYPES.DELETE_ITEM}>
                      Delete Item
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <hr className="my-2" />
              <Segment className="card-home-panel mb-2" padded onClick={this.onClick}>
                <Label attached="bottom" onClick={this.onGoto} value={`/decks/${deck._id}`} as="a">
                  {deck.title}
                </Label>
                <Label attached="bottom right">{showFront ? "Front" : "Back"}</Label>
                <ItemLabel date={card.nextReviewDate} />
                <h3 className="text-center my-5">{cardContent}</h3>
              </Segment>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ItemHome.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default ItemHome;
