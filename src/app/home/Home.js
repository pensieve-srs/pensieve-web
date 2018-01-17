import React, { Component } from "react";
import PropTypes from "prop-types";
import pluralize from "pluralize";
import { Grid, Header, Icon, Label, Popup, Segment } from "semantic-ui-react";

import * as api from "./homeActions";

import ActivityOverview from "./ActivityOverview";
import RecentActivity from "./RecentActivity";

class Home extends Component {
  state = { user: { prefs: {}, counts: {} }, dueCards: [], newCards: [] };

  componentWillMount = () => {
    this.fetchDueCards();
    this.fetchNewCards();
    this.fetchUserCounts();
  };

  fetchUserCounts = () => {
    api.fetchUserCounts().then(
      ({ data }) => {
        this.setState({ user: data });
      },
      error => {
        console.log("error", error);
      },
    );
  };

  fetchDueCards = () => {
    api.fetchDueCards().then(
      ({ data }) => {
        this.setState({ dueCards: data });
      },
      error => {
        console.log("error", error);
      },
    );
  };

  fetchNewCards = () => {
    api.fetchNewCards().then(
      ({ data }) => {
        this.setState({ newCards: data });
      },
      error => {
        console.log("error", error);
      },
    );
  };

  createSession = sessionType => {
    api.createSession(sessionType).then(
      response => {
        this.props.history.push(`/sessions/${response.data._id}`);
      },
      error => {
        console.log("error", error);
      },
    );
  };

  render() {
    const { user, dueCards, newCards } = this.state;
    const { counts, prefs: { sessionSize } } = user;

    return (
      <div className="study-page">
        <div className="container">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-lg-8 offset-lg-2">
              <ActivityOverview counts={counts} />
              <div className="d-flex justify-content-between align-items-end mb-2">
                <Header as="h3" className="m-0">
                  Choose your study type:
                </Header>
                <Header.Subheader className="text-secondary">
                  Session size is {pluralize("card", sessionSize, true)}{" "}
                  <Popup inverted position="top right" trigger={<Icon name="help circle" />}>
                    Session size is limited to keep daily reviews small. You can change this in your
                    settings.
                  </Popup>
                </Header.Subheader>
              </div>
              <Grid columns={2}>
                <Grid.Column>
                  <Segment
                    color="teal"
                    as="button"
                    onClick={() => this.createSession("learn")}
                    style={{ cursor: "pointer", height: "100%" }}
                    className="text-left"
                  >
                    <Header>
                      <Icon name="book" color="teal" />Learn
                    </Header>
                    <p className="text-secondary">
                      This session only contains cards you have not seen yet. It focuses on
                      introducing you to new material and expanding your knowledge base. This is
                      good if you are trying to learn a lot of material in a short time.
                    </p>
                    {newCards && (
                      <Label attached="top right" color="teal">
                        {pluralize("card", newCards.length, true)}
                      </Label>
                    )}
                  </Segment>
                </Grid.Column>
                <Grid.Column>
                  <Segment
                    color="orange"
                    as="button"
                    onClick={() => this.createSession("review")}
                    style={{ cursor: "pointer", height: "100%" }}
                    className="text-left"
                  >
                    <Header>
                      <Icon name="shield" color="orange" />Strengthen
                    </Header>
                    <p className="text-secondary">
                      This session only contains cards you have already seen and need to review
                      again. It focuses on improving your recall of material you have already
                      learned. These cards are due to be reviewed again and will not contain cards
                      you have just learned.
                    </p>
                    {dueCards && (
                      <Label attached="top right" color="orange">
                        {pluralize("card", dueCards.length, true)}
                      </Label>
                    )}
                  </Segment>
                </Grid.Column>
              </Grid>
              <RecentActivity />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Home;
