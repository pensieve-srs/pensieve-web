import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Icon, Dropdown, Header, Label, Segment, Popup } from "semantic-ui-react";

import withErrors from "../../../helpers/withErrors";

import * as api from "../cardActions";

import {
  DeleteCardModal,
  EditCardModal,
  ResetCardModal,
  MODAL_TYPES,
} from "../../../components/modals";

import { ProgressBar } from "../../../components";

import "./CardHome.css";

const EmptyView = () => (
  <div className="card-home mt-5 pt-3">
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

class CardHome extends Component {
  state = {
    card: {},
    showFront: false,
    showModalType: undefined,
  };

  componentWillMount() {
    const { cardId } = this.props.match.params;

    if (cardId) {
      this.fetchCard(cardId);
    }
  }

  onClick = () => this.setState({ showFront: !this.state.showFront });

  onCloseModal = () => this.setState({ showModalType: undefined });

  onShowModal = (event, data) => this.setState({ showModalType: data.value });

  onGoto = (event, data) => this.props.history.push(data.value);

  fetchCard = cardId => {
    api.fetchCard(cardId).then(response => {
      this.setState(() => ({ card: response.data }));
    });
  };

  editCard = card => {
    api.editCard(card).then(response => {
      this.setState({ card: response.data });
      this.onCloseModal();
    });
  };

  deleteCard = () => {
    const { card } = this.state;
    api.deleteCard(card._id).then(response => {
      this.props.history.go(-1);
    });
  };

  resetCard = () => {
    const { card } = this.state;
    api.resetCard(card._id).then(response => {
      this.setState({ card: response.data });
      this.onCloseModal();
    });
  };

  render() {
    const { card, showFront, showModalType } = this.state;
    const { deck } = card;

    if (!card || Object.keys(card).length === 0) {
      return <EmptyView />;
    }

    const cardContent = showFront ? card.front : card.back;

    return (
      <div className="card-home mt-4">
        <DeleteCardModal
          open={showModalType === MODAL_TYPES.DELETE_ITEM}
          onClose={this.onCloseModal}
          onSubmit={this.deleteCard}
        />
        <EditCardModal
          card={card}
          open={showModalType === MODAL_TYPES.EDIT_ITEM}
          onClose={this.onCloseModal}
          onSubmit={this.editCard}
        />
        <ResetCardModal
          open={showModalType === MODAL_TYPES.RESET_ITEM}
          onClose={this.onCloseModal}
          onSubmit={this.resetCard}
        />
        <div className="container">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-lg-8 offset-lg-2">
              <div className="card-home-header d-flex">
                <Header as="h3" className="text-uppercase m-0">
                  Card
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
                      Edit Card
                    </Dropdown.Item>
                    {card.nextReviewDate && (
                      <Dropdown.Item onClick={this.onShowModal} value={MODAL_TYPES.RESET_ITEM}>
                        Reset Card
                      </Dropdown.Item>
                    )}
                    <Dropdown.Item onClick={this.onShowModal} value={MODAL_TYPES.DELETE_ITEM}>
                      Delete Card
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
                <Popup
                  inverted
                  position="bottom right"
                  trigger={
                    <div className="card-strength d-flex align-items-center">
                      <strong style={{ lineHeight: "1em" }} className="text-secondary mr-2">
                        Recall Strength
                      </strong>
                      <ProgressBar percent={card.recallRate} />
                    </div>
                  }
                >
                  You have a {parseInt(card.recallRate, 10)}% chance of remembering this card
                  correctly
                </Popup>
                <h3 className="text-center my-5">{cardContent}</h3>
              </Segment>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CardHome.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withErrors(CardHome);
