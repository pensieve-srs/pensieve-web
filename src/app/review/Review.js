import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import axios from "axios";
import cookie from "js-cookie";

import ProgressBar from "./ProgressBar";
import Results from "./Results";

import "./Review.css";

export const REVIEW_TYPE = {
  EASY: "easy",
  GOOD: "good",
  HARD: "hard",
};

export const REVIEW_GRADES = {
  EASY: 0,
  GOOD: 3,
  HARD: 5,
};

const EmptyView = () => (
  <div className="review-container pt-5 pb-5">
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
  constructor(props) {
    super(props);

    this.state = { index: 0, showAnswer: false, showNextOptions: false, session: {} };
    this.onItemClick = this.onItemClick.bind(this);
    this.onNextAction = this.onNextAction.bind(this);
  }

  componentWillMount() {
    const { sessionId } = this.props.match.params;

    if (sessionId) {
      const config = { headers: { Authorization: cookie.get("token") } };

      axios.get(`/api/sessions/${sessionId}`, config).then(
        response => {
          console.log("response", response);
          this.setState(() => ({ session: response.data.session }));
        },
        error => {
          console.log("error", error);
        },
      );
    }
  }

  onNextAction(value) {
    const { index, session } = this.state;
    const { items } = session;

    const item = items[index];

    // Set the response value of the item
    item.value = value;

    const selectedItem = { ...items[index] };
    const updatedItems = value === REVIEW_TYPE.HARD ? [...items, selectedItem] : items;

    // Send the review request
    // this.props.actions.reviewItem({ value, itemId: items[index]._id });

    const itemId = item._id;
    const config = { headers: { Authorization: cookie.get("token") } };

    axios.post(`/api/items/${item._id}/review`, { value, itemId }, config).then(
      response => {
        session.item = response.data.item;
        this.setState(() => ({ session: session }));
      },
      error => {
        console.log("error", error.response);
      },
    );

    // Update state
    this.setState({
      index: index + 1,
      showNextOptions: false,
      showAnswer: false,
      items: updatedItems,
    });
  }

  onItemClick() {
    this.setState({
      showNextOptions: true,
      showAnswer: !this.state.showAnswer,
    });
  }

  render() {
    const { index, session, showAnswer, showNextOptions } = this.state;
    const { items = [] } = session;

    if (items.length === 0) {
      return <EmptyView />;
    }

    if (index > items.length - 1) {
      return <Results items={items} />;
    }

    const selectedItem = items[index];
    const itemContent = showAnswer ? selectedItem.back : selectedItem.front;

    return (
      <div className="review-container pt-5 pb-5">
        <div className="container mt-3">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <div className="review-header d-flex justify-content-between">
                <div>
                  <span className="text-uppercase">{session.type}</span>
                  <span className="m-2">{">"}</span>
                  <Link to={`/decks/${selectedItem.deck._id}`}>{selectedItem.deck.title}</Link>
                </div>
                <p className="review-container-count">
                  <span style={{ fontWeight: "bold" }}>{index + 1}</span> out of {items.length}
                </p>
              </div>
              <ProgressBar progress={index / items.length * 100} />
              <div
                className="review-container-panel bg-white border rounded mt-3 mb-4"
                onClick={this.onItemClick}
              >
                <div className="panel-face font-italic text-secondary">
                  {!showAnswer ? <span>Front</span> : <span>Back</span>}
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
