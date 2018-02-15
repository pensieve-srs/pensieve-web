import React, { Component } from "react";
import { Button, Grid, Header, Image, Label } from "semantic-ui-react";

import "./Landing.css";

class Landing extends Component {
  onGoto = (event: Event, data: any) => this.props.history.push(data.value);

  render() {
    return (
      <div className="landing-page">
        <div className="landing-hero py-5 px-2">
          <div className="container my-5 py-5">
            <div className="d-flex flex-column-reverse flex-md-row justify-content-between align-items-center">
              <div className="landing-copy w-100 text-left mr-3">
                <h1 className="font-weight-bold m-0">Pensieve</h1>
                <h2 className="m-0" style={{ fontSize: "38px" }}>
                  Control your memory
                </h2>
                <hr className="my-3 ml-0 w-25" style={{ borderColor: "white", opacity: "0.8" }} />
                <h3 className="font-weight-normal m-0  mb-5">
                  Pensieve uses smarter flashcards with spaced repetition to help you learn
                  information easier and longer.
                </h3>
                <Button onClick={this.onGoto} value="/signup" className="btn-light" size="large">
                  GET STARTED
                </Button>
              </div>
              <div className="landing-image mb-5">
                <Image src={require("./landing_hero.png")} />
              </div>
            </div>
          </div>
        </div>
        <div className="landing-howItWorks bg-white border-bottom py-5">
          <div className="container py-5">
            <div className="row">
              <div className="col-sm-10 offset-sm-1 col-md-8 offset-md-2">
                <Header as="h2" textAlign="center" size="large" className="mb-4">
                  Why it works
                </Header>
                <p className="lead text-dark">
                  Our short term memory is in a battle to retain the most relevant information. As
                  time goes by, it will naturally forget information that it doesn't think is
                  important. The trick to convincing your brain what information is important?
                  Revisiting that material. <br /> <br />Review and repetition are the key to
                  learning anything new. However, by studying at increasing intervals between each
                  review, you also will greatly reduce the amount of studying you do while improving
                  the long term retention of that material. Pensieve solves this problem of knowing
                  when to study by notifying you when your notes are ready to review. Allowing you
                  to remember anything quicker with less effort.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="landing-box py-5">
          <div className="container my-5 py-3">
            <Header as="h2" textAlign="center" size="large" className="mb-4">
              How It Works
            </Header>
            <Grid columns={4} padded relaxed stackable>
              <Grid.Row>
                <Grid.Column>
                  <Header as="h3" className="mb-2">
                    <Label color="grey" size="large" className="ml-0 mr-2">
                      1
                    </Label>Create your cards
                  </Header>
                  <p className="text-secondary">
                    Collect the information you want to learn and input them in our system as
                    flashcards. It can be anything you want to remember: language vocabulary,
                    medical terms, trivia, or even friends' names.
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
                <Grid.Column>
                  <Header as="h3" className="mb-2">
                    <Label color="grey" size="large" className="ml-0 mr-2">
                      4
                    </Label>Repeat
                  </Header>
                  <p className="text-secondary">
                    This step is simple. Keep studying as your cards expire over longer and longer
                    periods of time until you have successful stored them in your long term memory.
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
                  Pensieve is for people that want to learn better
                </Header>
                <p className="lead text-dark mx-2">
                  Pensieve is for students, language learners, and autodidacts that are tired of
                  forgetting information after just learning it. It is for people that don't have
                  time to review their notes everyday. Pensieve solves this by automatically
                  scheduling reviews of your cards for you so you never have to forget it again.
                </p>
                <h4 className="text-center text-dark mt-5 pt-3 mb-3">
                  Improve your studying for free
                </h4>
                <div className="text-center">
                  <Button onClick={this.onGoto} value="/signup" primary size="large">
                    GET STARTED
                  </Button>
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
