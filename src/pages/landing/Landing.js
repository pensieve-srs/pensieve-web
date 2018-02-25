import React, { Component } from "react";
import { Container, Grid, Header, Image, Label, Responsive } from "semantic-ui-react";

import BetaListForm from "./BetaListForm";

import "./Landing.css";

class Landing extends Component {
  onGoto = (event: Event, data: any) => this.props.history.push(data.value);

  render() {
    return (
      <div className="landing-page">
        <div className="landing-hero py-5 px-2">
          <Container textAlign="center">
            <div className="py-5 my-5">
              <Header as="h1" inverted className="mb-4" style={{ fontSize: "34px" }}>
                Capture and remember everything
                <Header.Subheader
                  className="my-3 mx-auto"
                  as="h2"
                  inverted
                  style={{ maxWidth: "550px", fontSize: "18px" }}
                >
                  Pensieve uses smarter flashcards with spaced repetition to help you conquer your
                  memory
                </Header.Subheader>
              </Header>
              <div className="text-center d-table mr-auto ml-auto">
                <BetaListForm inverted />
              </div>
            </div>
            <Responsive minWidth={768}>
              <Image centered src={require("./web_mobile.png")} />
            </Responsive>
            <Responsive className="text-center" maxWidth={767}>
              <Image style={{ marginBottom: "-200px" }} centered src={require("./mobile.png")} />
            </Responsive>
          </Container>
        </div>
        <div className="landing-howItWorks bg-white border-bottom py-5">
          <div className="container py-5 my-4">
            <div className="row">
              <div className="col-sm-10 offset-sm-1 col-md-8 offset-md-2">
                <Header as="h2" textAlign="center" size="large" className="mb-4">
                  Improve your memory
                </Header>
                <p className="lead text-dark text-center">
                  When you are learning, 80% of what you hear, read, and write will be forgotten
                  tomorrow. Practice and repetition will help you remember anything you want to
                  learn. Practice too soon though and you have wasted your time. Practice too late
                  and you've forgotten the material and have to relearn it. {" "}
                  <strong>
                    With Pensieve, you review at the perfect time so you spend less effort to learn
                    what you want to remember.
                  </strong>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="landing-box py-5">
          <div className="container my-5 py-3">
            <Header as="h2" textAlign="center" size="large" className="mb-4">
              How it works
            </Header>
            <Grid columns={3} padded relaxed stackable>
              <Grid.Row>
                <Grid.Column>
                  <Header as="h3" className="mb-2">
                    <Label color="grey" size="large" className="ml-0 mr-2">
                      1
                    </Label>Create your cards
                  </Header>
                  <p className="text-secondary">
                    Collect the information you want to learn and input them in our system as
                    flashcards. We keep these organized for you and will predict the card strength
                    in your memory over time.
                  </p>
                </Grid.Column>
                <Grid.Column>
                  <Header as="h3" className="mb-2">
                    <Label color="grey" size="large" className="ml-0 mr-2">
                      2
                    </Label>Get notified
                  </Header>
                  <p className="text-secondary">
                    Your recall ability of these cards will decrease constantly as you start to
                    forget them. We will estimate the best time to review them and let you know when
                    you should study them again.
                  </p>
                </Grid.Column>
                <Grid.Column>
                  <Header as="h3" className="mb-2">
                    <Label color="grey" size="large" className="ml-0 mr-2">
                      3
                    </Label>Review your cards
                  </Header>
                  <p className="text-secondary m-0">
                    Once your cards expired, you will need to study them again, telling us how well
                    you remember them. The harder a card is to remember, the sooner you will see it
                    again.
                  </p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        </div>
        <div className="landing-info border py-5">
          <div className="container py-5">
            <div className="row">
              <div className="col-sm-10 offset-sm-1 col-md-8 offset-md-2">
                <Header as="h2" textAlign="center" size="large" className="mb-4">
                  Pensieve is for people who want to learn better
                </Header>
                <p className="lead text-dark mx-2 text-center">
                  Pensieve is for students, language learners, and lifelong learners that are tired
                  of forgetting information after just learning it. It is for people that don't have
                  time to review their notes everyday. It can be used for anything you want to
                  remember: <strong>languages</strong>, <strong>medical terms</strong>,{" "}
                  <strong>books</strong>, or even <strong>friend's names</strong>.
                </p>
                <h4 className="text-center text-dark mt-5 pt-3 mb-3">
                  Improve your memory for free
                </h4>
                <div className="text-center d-table mr-auto ml-auto">
                  <BetaListForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
