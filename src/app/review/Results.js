import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Header, Icon } from "semantic-ui-react";
import { withRouter } from "react-router";
import moment from "moment";
import pluralize from "pluralize";

import { ProgressBar } from "../../components";

class Results extends Component {
  onBack = () => this.props.history.goBack();

  render() {
    const { cards } = this.props;

    return (
      <div className="session-results review-page container mt-3">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <Header as="h2" icon textAlign="center">
              <Icon color="yellow" name="trophy" circular />
              Nice Job!
              <Header.Subheader>
                You just reviewed {pluralize("note", cards.length, true)}
              </Header.Subheader>
            </Header>
            <h5 className="mb-3">Results</h5>
            <ul className="list-group">
              {cards.map((card, key) => (
                <li
                  className="list-group-item d-flex justify-content-between align-items-center"
                  key={key}
                >
                  <strong>{card.front}</strong>
                  <div className="d-flex align-items-center">
                    {card.nextReviewDate && (
                      <span className="text-secondary mr-2" style={{ fontWeight: 600 }}>
                        Review {moment(card.nextReviewDate).fromNow()}
                      </span>
                    )}
                    <ProgressBar percent={card.recallRate} />
                  </div>
                </li>
              ))}
            </ul>
            <div className="text-right mt-3">
              <Button onClick={this.onBack} primary>
                Back
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Results.propTypes = {
  cards: PropTypes.array.isRequired,
};

export default withRouter(Results);
