import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button, Dropdown, Icon, Header, Label, Progress, Segment } from "semantic-ui-react";

import * as api from "./reviewActions";
import * as cardApi from "../cards/cardActions";

import Results from "./Results";

import "./Review.css";

import { DeleteCardModal, EditCardModal, MODAL_TYPES } from "../../components/modals";

const REVIEW_TYPE = {
  EASY: "easy",
  GOOD: "good",
  HARD: "hard",
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

class Review extends Component {
  state = {
    index: 0,
    showFront: true,
    showAnswers: false,
    session: {},
    showModalType: undefined,
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
    api.fetchSession(sessionId).then(
      response => {
        this.setState({ session: response.data });
      },
      error => {
        this.props.onError("Oops! Something went wrong.");
      },
    );
  };

  reviewCard = (cardId, value) => {
    api.reviewCard({ cardId, value }).then(
      response => {
        const card = response.data;
        this.setState(({ session, index }) => {
          const cards = session.cards.map(el => {
            return el._id === card._id ? card : el;
          });
          return {
            session: { ...session, cards: cards },
            index: index + 1,
            showAnswers: false,
            showFront: true,
          };
        });
      },
      error => {
        this.props.onError("Oops! Something went wrong.");
      },
    );
  };

  editCard = card => {
    cardApi.editCard(card).then(
      response => {
        this.setState(({ session }) => {
          const cards = session.cards.map(el => {
            return el._id === card._id ? card : el;
          });
          return { session: { ...session, cards: cards } };
        });
        this.onCloseModal();
      },
      error => {
        this.props.onError("Oops! Something went wrong.");
      },
    );
  };

  deleteCard = () => {
    const { index, session: { cards } } = this.state;
    const card = cards[index];

    cardApi.deleteCard(card._id).then(
      response => {
        const newCards = cards.filter(el => el._id !== card._id);
        this.setState(({ session }) => ({
          session: { ...session, cards: newCards },
          showAnswers: false,
          showFront: true,
        }));
        this.onCloseModal();
      },
      error => {
        this.props.onError("Oops! Something went wrong.");
      },
    );
  };

  render() {
    const { index, session, showFront, showAnswers, showModalType } = this.state;
    const { cards = [] } = session;

    if (cards.length === 0) {
      return <EmptyView />;
    }

    if (index > cards.length - 1) {
      return <Results cards={cards} />;
    }

    const card = cards[index];
    const { deck } = card;
    const cardContent = showFront ? card.front : card.back;

    return (
      <div className="review-container">
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
              <Segment className="review-container-panel mt-2 mb-4" onClick={this.onReveal}>
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
                <Header as="h2" className="text-center my-5">
                  {cardContent}
                </Header>
              </Segment>
              <div className="review-actions">
                {showAnswers ? (
                  <div className="d-flex justify-content-between">
                    <Button
                      onClick={this.onReview}
                      value={REVIEW_TYPE.HARD}
                      size="large"
                      primary
                      fluid
                    >
                      Again
                    </Button>
                    <Button
                      onClick={this.onReview}
                      value={REVIEW_TYPE.GOOD}
                      size="large"
                      primary
                      fluid
                    >
                      Good
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

export default Review;
