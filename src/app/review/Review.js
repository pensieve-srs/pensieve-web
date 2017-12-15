import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Breadcrumb, Progress } from "semantic-ui-react";

import * as api from "./reviewActions";

import Results from "./Results";

import "./Review.css";

const REVIEW_TYPE = {
  EASY: "easy",
  GOOD: "good",
  HARD: "hard",
};

const EmptyView = () => (
  <div className="review-container">
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
    showNextOptions: false,
    session: {},
  };

  componentWillMount() {
    const { sessionId } = this.props.match.params;

    this.fetchSession(sessionId);
  }

  onNextAction = value => {
    const { index, session: { items } } = this.state;
    const item = items[index];

    this.reviewItem(item._id, value);

    // Update state
    this.setState({
      index: index + 1,
      showNextOptions: false,
      showFront: true,
    });
  };

  onItemClick = () => {
    this.setState(({ showFront }) => ({
      showNextOptions: true,
      showFront: !showFront,
    }));
  };

  fetchSession = sessionId => {
    api.fetchSession(sessionId).then(
      response => {
        this.setState({ session: response.data.session });
      },
      error => {
        console.log("error", error.response);
      },
    );
  };

  reviewItem = (itemId, value) => {
    api.reviewItem({ itemId, value }).then(
      response => {
        const { item } = response.data;
        this.setState(({ session }) => {
          const items = session.items.map(el => {
            return el._id === item._id ? item : el;
          });
          return { session: { ...session, items: items } };
        });
      },
      error => {
        console.log("error", error);
      },
    );
  };

  render() {
    const { index, session, showFront, showNextOptions } = this.state;
    const { items = [] } = session;

    if (items.length === 0) {
      return <EmptyView />;
    }

    if (index > items.length - 1) {
      return <Results items={items} />;
    }

    const selectedItem = items[index];
    const itemContent = showFront ? selectedItem.front : selectedItem.back;

    return (
      <div className="review-container">
        <div className="container mt-3">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <div className="review-header d-flex justify-content-between align-items-center mb-2">
                <Breadcrumb>
                  <Breadcrumb.Section className="text-uppercase">{session.type}</Breadcrumb.Section>
                  <Breadcrumb.Divider icon="right angle" />
                  <Breadcrumb.Section active>
                    <Link to={`/decks/${selectedItem.deck._id}`}>{selectedItem.deck.title}</Link>
                  </Breadcrumb.Section>
                </Breadcrumb>
                <p className="review-container-count">
                  <strong>{index + 1}</strong> out of {items.length}
                </p>
              </div>
              <Progress className="mb-2" value={index} total={items.length} color="blue" />
              <div
                className="review-container-panel bg-white border rounded mt-3 mb-4"
                onClick={this.onItemClick}
              >
                <div className="panel-face font-italic text-secondary">
                  {showFront ? <span>Front</span> : <span>Back</span>}
                </div>
                <h3 className="text-center my-5">{itemContent}</h3>
              </div>
              <div className="review-actions">
                {showNextOptions ? (
                  <div className="d-flex justify-content-between">
                    <Button
                      className="w-100"
                      onClick={() => this.onNextAction(REVIEW_TYPE.HARD)}
                      primary
                    >
                      Again
                    </Button>
                    <Button
                      className="w-100 ml-3"
                      onClick={() => this.onNextAction(REVIEW_TYPE.GOOD)}
                      primary
                    >
                      Good
                    </Button>
                    <Button
                      className="w-100 ml-3"
                      onClick={() => this.onNextAction(REVIEW_TYPE.EASY)}
                      primary
                    >
                      Easy
                    </Button>
                  </div>
                ) : (
                  <Button onClick={this.onItemClick} primary fluid>
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

export default Review;
