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
                  The smartest way to study
                </h2>
                <hr className="my-3 ml-0 w-25" style={{ borderColor: "white", opacity: "0.8" }} />
                <h3 className="font-weight-normal m-0  mb-5">
                  Pensieve is a spaced repetition tool that predicts your memory to optimize your
                  study habits
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
        <div className="landing-box bg-white py-5">
          <div className="container my-5 py-3">
            <Header as="h2" textAlign="center" size="large" className="mb-4">
              Simple Spaced Repetition
            </Header>
            <Grid columns={4} padded relaxed stackable>
              <Grid.Row>
                <Grid.Column>
                  <Header as="h3" className="mb-2">
                    <Label color="grey" size="large" className="ml-0 mr-2">
                      1
                    </Label>Gather notes
                  </Header>
                  <p className="text-secondary">
                    Collect the information you want to remember, organized into flashcards. It can
                    be anything you want to remember: language vocabulary, medical terms, trivia,
                    friend’s names.
                  </p>
                </Grid.Column>
                <Grid.Column>
                  <Header as="h3" className="mb-2">
                    <Label color="grey" size="large" className="ml-0 mr-2">
                      2
                    </Label>Review those notes
                  </Header>
                  <p className="text-secondary m-0">
                    Your recall of your notes will decrease naturally over time as you forget them.
                    Study your flashcards as you are most likely to forget them in order to
                    strengthen your memory of them.
                  </p>
                </Grid.Column>
                <Grid.Column>
                  <Header as="h3" className="mb-2">
                    <Label color="grey" size="large" className="ml-0 mr-2">
                      3
                    </Label>Grade your memory
                  </Header>
                  <p className="text-secondary">
                    Each time you study a card is a chance to grade you on how well you remember it.
                    The harder a card is, the sooner you will see it again to study.
                  </p>
                </Grid.Column>
                <Grid.Column>
                  <Header as="h3" className="mb-2">
                    <Label color="grey" size="large" className="ml-0 mr-2">
                      4
                    </Label>Get notified
                  </Header>
                  <p className="text-secondary">
                    Pensieve will notify you over time when you should review your notes in order to
                    maintain retention of them over time. A lot of work goes into developing smart
                    notifications in order to optimize your study habits.
                  </p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        </div>
        <div className="landing-howItWorks border-bottom py-5">
          <div className="container py-5">
            <div className="row">
              <div className="col-sm-10 offset-sm-1 col-md-8 offset-md-2">
                <Header as="h2" textAlign="center" size="large" className="mb-4">
                  How It Works
                </Header>
                <Image className="my-4" src={require("./graph.png")} size="large" centered />
                <p className="lead text-dark">
                  Pensieve uses the time since you last reviewed a note and your answers to estimate
                  how well you remember it over time. As your memory of those notes improve, the
                  intervals between studying them increases, avoiding wasted studying of that
                  material.
                </p>
              </div>
            </div>
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
