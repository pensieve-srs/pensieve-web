import React, { Component, Fragment } from "react";
import { Icon, Header, Modal, Button, Grid, Segment } from "semantic-ui-react";
import DeckCard from "../../app/decks/DeckCard";
import cookie from "js-cookie";

const ExampleDeck = {
  _id: "1234",
  title: "Example Deck",
  description: "Example description",
  cardsCount: 20,
  recallRate: 1,
};

class StepOne extends Component {
  render() {
    return (
      <Fragment>
        <Header size="small" textAlign="center">
          Group notes together in decks
        </Header>
        <Grid columns={2} verticalAlign="middle" className="position-relative">
          <div
            style={{
              position: "absolute",
              top: "50%",
              bottom: "50%",
              left: "50%",
              right: "50%",
              marginLeft: "-10px",
            }}
          >
            <Icon size="large" fitted name="chevron right" />
          </div>
          <Grid.Column>
            <Segment.Group>
              <Segment>Top</Segment>
              <Segment>Middle</Segment>
              <Segment>Middle</Segment>
              <Segment>Middle</Segment>
              <Segment>Bottom</Segment>
            </Segment.Group>
          </Grid.Column>
          <Grid.Column>
            <DeckCard className="mx-auto" style={{ maxWidth: "180px" }} deck={ExampleDeck} />
          </Grid.Column>
        </Grid>
      </Fragment>
    );
  }
}

class StepTwo extends Component {
  state = { deck: ExampleDeck };

  componentDidMount() {
    this.start = setTimeout(this.onAnimateStart, 1000);
  }

  componentWillUnmount() {
    clearTimeout(this.start);
    clearTimeout(this.animation);
  }

  onAnimateStart = () => {
    this.setState(({ deck }) => ({ deck: { ...deck, recallRate: 0.5 }, isAnimating: true }));
    this.animation = setTimeout(this.onAnimateStop, 1500);
  };

  onAnimateStop = () => {
    this.setState({ isAnimating: false });
  };

  render() {
    const { deck } = this.state;

    return (
      <Fragment>
        <Header size="small" textAlign="center">
          Your strength bar will decrease over time
        </Header>
        <Grid columns={1} verticalAlign="middle">
          <Grid.Column className="position-relative">
            <DeckCard animated className="mx-auto" style={{ maxWidth: "180px" }} deck={deck} />
            {this.state.isAnimating && (
              <div className="position-absolute" style={{ right: "1rem", top: "0" }}>
                <Icon name="time" size="big" fitted color="grey" loading />
              </div>
            )}
          </Grid.Column>
        </Grid>
      </Fragment>
    );
  }
}

class StepThree extends Component {
  render() {
    return (
      <Fragment>
        <Header size="small" textAlign="center">
          Review the deck to regain its strength
        </Header>
        <Grid columns={1} verticalAlign="middle" className="position-relative">
          <Grid.Column>
            <DeckCard className="mx-auto" style={{ maxWidth: "180px" }} deck={ExampleDeck} />
          </Grid.Column>
        </Grid>
      </Fragment>
    );
  }
}

class OnboardingModal extends Component {
  state = { index: 0, open: cookie.get("newUser") };

  onNext = () => this.setState(({ index }) => ({ index: index + 1 }));

  onDismiss = () => {
    cookie.remove("newUser");
    this.setState({ open: false });
  };

  render() {
    const { index, open } = this.state;
    const steps = [<StepOne />, <StepTwo />, <StepThree />];

    return (
      <Modal
        size="small"
        onClose={this.onDismiss}
        open={open}
        className="position-relative"
        closeIcon
      >
        <Modal.Header>Tutorial: Step 1</Modal.Header>
        <Modal.Content>{steps[index]}</Modal.Content>

        <Modal.Actions>
          <Button onClick={this.onDismiss}>Skip</Button>
          {index < steps.length - 1 ? (
            <Button primary onClick={this.onNext}>
              Next
            </Button>
          ) : (
            <Button primary onClick={this.onDismiss}>
              Finish
            </Button>
          )}
        </Modal.Actions>
      </Modal>
    );
  }
}

export default OnboardingModal;
