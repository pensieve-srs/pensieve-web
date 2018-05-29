import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Button,
  Dropdown,
  Divider,
  Icon,
  Header,
  Label,
  Progress,
  Segment,
} from "semantic-ui-react";

import withErrors from "../../helpers/withErrors";

import * as api from "./reviewActions";
import * as cardApi from "../cards/cardActions";

import Results from "./Results";

import "./Review.css";

import { DeleteCardModal, EditCardModal, MODAL_TYPES } from "../../components/modals";

const REVIEW_TYPE = {
  REDO: "redo",
  HARD: "hard",
  EASY: "easy",
};

const EmptyView = () => (
  <div className="review-container mt-5 pt-3">
    <div className="col-md-8 offset-md-2 text-center">
      <span style={{ fontSize: "80px", fontWeight: "bold" }} role="img" aria-label="jsx-a11y">
        😅
      </span>
      <h3 style={{ marginBottom: "40px" }}>Oops, something seems to have gone wrong.</h3>
      <Link to="/" className="btn btn-primary">
        Go Home
      </Link>
    </div>
  </div>
);

const LoadingView = () => (
  <div>
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-10 offset-md-1 col-lg-8 offset-lg-2">
          <Segment className="review-container-panel mt-2 mb-4">
            <Progress attached="top" value={0} total={10} color="blue" />
            <Label attached="bottom" as="a" className="text-secondary">
              <Icon loading name="spinner" />Loading...
            </Label>
            <Header as="h2" className="text-center my-5" color="grey">
              Loading cards...
            </Header>
          </Segment>
        </div>
      </div>
    </div>
  </div>
);

class Review extends Component {
  state = {
    index: 0,
    showFront: true,
    showAnswers: false,
    session: {},
    showModalType: undefined,
    isLoading: true,
  };

  componentWillMount = () => {
    const { sessionId } = this.props.match.params;

    if (sessionId) {
      this.fetchSession(sessionId);
    }
  };

  onCloseModal = () => this.setState({ showModalType: undefined });

  onShowModal = (event, data) => this.setState({ showModalType: data.value });

  onGoto = (event, data) => this.props.history.push(data.value);

  onReview = (event, data) => {
    const { value } = data;
    const { index, session: { cards } } = this.state;
    const card = cards[index];

    this.reviewCard(card._id, value);
  };

  onReveal = () => {
    this.setState(({ showFront }) => ({
      showAnswers: true,
      showFront: !showFront,
    }));
  };

  fetchSession = sessionId => {
    api.fetchSession(sessionId).then(response => {
      this.setState({ session: response.data, isLoading: false });
    });
  };

  reviewCard = (cardId, value) => {
    api.reviewCard({ cardId, value }).then(response => {
      const card = { ...response.data, value };
      this.setState(({ session, index }) => {
        const cards = session.cards.map(el => {
          return el._id === card._id ? card : el;
        });
        if (value === REVIEW_TYPE.REDO) {
          cards.push(card);
        }
        return {
          session: { ...session, cards: cards },
          index: index + 1,
          showAnswers: false,
          showFront: true,
        };
      });
    });
  };

  editCard = card => {
    cardApi.editCard(card).then(response => {
      this.setState(({ session }) => {
        const cards = session.cards.map(el => {
          return el._id === card._id ? card : el;
        });
        return { session: { ...session, cards: cards } };
      });
      this.onCloseModal();
    });
  };

  deleteCard = () => {
    const { index, session: { cards } } = this.state;
    const card = cards[index];

    cardApi.deleteCard(card._id).then(response => {
      const newCards = cards.filter(el => el._id !== card._id);
      this.setState(({ session }) => ({
        session: { ...session, cards: newCards },
        showAnswers: false,
        showFront: true,
      }));
      this.onCloseModal();
    });
  };

  render() {
    const { index, session, showFront, showAnswers, showModalType, isLoading } = this.state;
    const { cards = [] } = session;

    if (isLoading) {
      return <LoadingView />;
    }

    if (!isLoading && cards.length === 0) {
      return <EmptyView />;
    }

    if (!isLoading && index > cards.length - 1) {
      return <Results cards={cards} />;
    }

    const card = cards[index];
    const { deck } = card;
    const cardContent = showFront ? card.front : card.back;

    return (
      <div className="review-container mt-4">
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
        <div className="container mt-3">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-lg-8 offset-lg-2">
              <div className="review-header d-flex justify-content-between align-items-end">
                <Header as="h3" className="text-uppercase m-0">
                  {session.type}
                </Header>
                <p className="text-secondary font-italic">
                  <strong>{index + 1}</strong> out of {cards.length}
                </p>
              </div>
              <Segment
                className="review-container-panel mt-2 mb-2 d-flex flex-column"
                onClick={this.onReveal}
              >
                <Dropdown
                  on="click"
                  icon={false}
                  pointing="top right"
                  trigger={
                    <Icon name="ellipsis vertical" size="large" className="text-secondary m-2" />
                  }
                  style={{ position: "absolute", right: "16px", top: "12px" }}
                >
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={this.onShowModal} value={MODAL_TYPES.EDIT_ITEM}>
                      Edit Card
                    </Dropdown.Item>
                    <Dropdown.Item onClick={this.onShowModal} value={MODAL_TYPES.DELETE_ITEM}>
                      Delete Card
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Progress attached="top" value={index} total={cards.length} color="blue" />
                <Label attached="bottom" onClick={this.onGoto} value={`/decks/${deck._id}`} as="a">
                  {deck.title}
                </Label>
                <Label attached="bottom right">{showFront ? "Front" : "Back"}</Label>
                <div className="my-5 mx-3 d-flex align-items-center" style={{ flex: 1 }}>
                  <Header as="h2" className="text-center">
                    {isLoading ? "Loading cards..." : cardContent}
                  </Header>
                </div>
                {!showFront &&
                  card.notes && (
                    <div className="w-100 mb-5">
                      <Divider />
                      <Header as="h6" className="px-3">
                        {card.notes}
                      </Header>
                    </div>
                  )}
              </Segment>
              <div className="review-actions">
                {showAnswers ? (
                  <div className="d-flex justify-content-between">
                    <Button
                      onClick={this.onReview}
                      value={REVIEW_TYPE.REDO}
                      className="d-flex"
                      size="large"
                      primary
                    >
                      <Icon name="repeat" />
                      Redo
                    </Button>
                    <Button
                      onClick={this.onReview}
                      value={REVIEW_TYPE.HARD}
                      size="large"
                      primary
                      fluid
                    >
                      Hard
                    </Button>
                    <Button
                      onClick={this.onReview}
                      value={REVIEW_TYPE.EASY}
                      size="large"
                      primary
                      fluid
                    >
                      Easy
                    </Button>
                  </div>
                ) : (
                  <Button onClick={this.onReveal} size="large" primary fluid>
                    Show Answer
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Review.propTypes = {
  match: PropTypes.object.isRequired,
};

export default withErrors(Review);
