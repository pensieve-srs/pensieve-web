import React, { Component } from "react";
import PropTypes from "prop-types";
import pluralize from "pluralize";
import { Grid, Header, Icon, Label, Popup, Progress, Segment } from "semantic-ui-react";
import { BarChart, Bar, XAxis, YAxis, Rectangle, ResponsiveContainer } from "recharts";

import * as api from "./homeActions";

class Home extends Component {
  state = {
    study: {},
    learn: {},
    review: {},
  };

  componentWillMount = () => {
    this.fetchStudyTypes();
  };

  fetchStudyTypes = () => {
    api.fetchStudyTypes().then(
      ({ data }) => {
        const { study, learn, review } = data;
        this.setState(() => ({ study, learn, review }));
      },
      error => {
        console.log("error", error);
      },
    );
  };

  createSession = sessionType => {
    api.createSession(sessionType).then(
      response => {
        this.props.history.push(`/sessions/${response.data.session._id}`);
      },
      error => {
        console.log("error", error);
      },
    );
  };

  render() {
    const { learn, review } = this.state;

    // TODO: FAKE DATA. Replace with real values
    const data = [
      { name: "Mon", value: 100 },
      { name: "Tue", value: 124 },
      { name: "Wed", value: 30 },
      { name: "Thu", value: 65 },
      { name: "Fri", value: 40 },
      { name: "Sat", value: 50 },
      { name: "Sun", value: 200 },
    ];

    return (
      <div className="study-page">
        <div className="container">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-lg-8 offset-lg-2">
              <Segment className="mb-3">
                <Grid columns="3" textAlign="center">
                  <Grid.Column>
                    <span className="text-secondary">
                      <Icon name="folder open outline" />
                      <strong className="text-dark">10</strong> decks
                    </span>
                  </Grid.Column>
                  <Grid.Column>
                    <span className="text-secondary">
                      <Icon name="file outline" />
                      <strong className="text-dark">124</strong> cards
                    </span>
                  </Grid.Column>
                  <Grid.Column>
                    <span className="text-secondary">
                      <Icon name="repeat" />
                      <strong className="text-dark">100</strong> reviews
                    </span>
                  </Grid.Column>
                </Grid>
                <Progress attached="bottom" total={120} value={120} color="grey" />
                <Progress attached="bottom" total={120} value={70} color="orange" />
                <Progress attached="bottom" total={120} value={50} color="teal" />
              </Segment>
              <div className="d-flex justify-content-between align-items-end mb-2">
                <Header as="h3" className="m-0">
                  Choose your study type:
                </Header>
                <Header.Subheader className="text-secondary">
                  Session size is 30 cards{" "}
                  <Popup inverted position="top right" trigger={<Icon name="help circle" />}>
                    Session size is limited for study convenience. You can change this in your
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
                    style={{ cursor: "pointer" }}
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
                    <Label attached="top right" color="teal">
                      {pluralize("card", learn.total, true)}
                    </Label>
                  </Segment>
                </Grid.Column>
                <Grid.Column>
                  <Segment
                    color="orange"
                    as="button"
                    onClick={() => this.createSession("review")}
                    style={{ cursor: "pointer" }}
                    className="text-left"
                  >
                    <Header>
                      <Icon name="shield" color="orange" />Strengthen
                    </Header>
                    <p className="text-secondary">
                      This session only contains cards you have already seen and need to review
                      again. It focuses on improving your recall of material you have already
                      learned. These items are due to be reviewed again and will not contain items
                      you have just learned.
                    </p>
                    <Label attached="top right" color="orange">
                      {pluralize("card", review.total, true)}
                    </Label>
                  </Segment>
                </Grid.Column>
              </Grid>
              <Segment className="mt-4">
                <Header>Recent Activity</Header>
                <div className="border bg-light rounded p-2">
                  <ResponsiveContainer height={200} width="100%">
                    <BarChart data={data} padding={{ top: 10, bottom: 0, left: 0, right: 0 }}>
                      <Bar
                        dataKey="value"
                        fill="#00b5ad"
                        barSize={40}
                        shape={<Rectangle radius={3} />}
                      />
                      <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        height={15}
                        fontSize="12px"
                      />
                      <YAxis
                        dataKey="value"
                        axisLine={false}
                        tickLine={false}
                        width={30}
                        fontSize="12px"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Segment>
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
