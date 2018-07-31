import React, { Component } from "react";
import { Container, Grid, Header, Image, Responsive } from "semantic-ui-react";

import BetaListForm from "./BetaListForm";

import "./Landing.css";

class Landing extends Component {
  onGoto = (event: Event, data: any) => this.props.history.push(data.value);

  render() {
    return (
      <div className="landing-page">
        <div className="landing-hero py-5 px-2">
          <Container textAlign="left" className="d-flex flex-column flex-md-row">
            <div className="hero-text my-auto col-md-5 mr-5 py-5">
              <Header inverted className="mb-5">
                <Header.Content style={{ fontSize: "32px", lineHeight: "1em" }}>
                  Spaced Repetition Flashcards
                </Header.Content>
                <Header.Subheader className="my-3" as="h2" style={{ fontSize: "22px" }}>
                  A scheduling tool for smarter flashcards to keep your memories sharp
                </Header.Subheader>
              </Header>
              <BetaListForm inverted />
            </div>
            <Responsive minWidth={768} className="col-md-7" style={{ minWidth: "1000px" }}>
              <Image centered src={require("./web_mobile.png")} />
            </Responsive>
            <Responsive className="text-center" maxWidth={767}>
              <Image
                centered
                style={{ marginBottom: "-270px", maxWidth: "300px" }}
                src={require("./mobile.png")}
              />
            </Responsive>
          </Container>
        </div>
        <div className="landing-howItWorks bg-white">
          <div className="container">
            <div className="row d-flex flex-column flex-md-row align-content-center">
              <div className="info-text col-md-5 py-4">
                <Header as="h2" size="large" className="text-uppercase mb-2 text-blue">
                  Use it or lose it
                </Header>
                <p className="lead text-dark">
                  80% of what you hear, read, and write will be forgotten tomorrow. Repetition will
                  help you remember anything you want to learn.{" "}
                  <span className="font-weight-medium">
                    Pensieve allows you to practice at the perfect time so you spend less effort to
                    learn what you want.
                  </span>
                </p>
              </div>
              <div className="col-md-7 my-auto">
                <Image centered src={require("./graph.png")} />
              </div>
            </div>
          </div>
        </div>
        <div className="landing-box">
          <div className="container">
            <Grid columns={3} padded relaxed stackable>
              <Grid.Row>
                <Grid.Column>
                  <div className="border-box p-3 mx-3">
                    <Header as="h3" className="text-uppercase">
                      Supplement your learning
                    </Header>
                  </div>
                </Grid.Column>
                <Grid.Column>
                  <div className="border-box p-3 mx-3">
                    <Header as="h3" className="text-uppercase">
                      Boost your professional expertise
                    </Header>
                  </div>
                </Grid.Column>
                <Grid.Column>
                  <div className="border-box p-3 mx-3">
                    <Header as="h3" className="text-uppercase">
                      Keep your memories sharp
                    </Header>
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        </div>
        <div className="landing-info">
          <div className="container">
            <div className="row">
              <div className="col-sm-10 offset-sm-1 col-md-8 offset-md-2">
                <Header as="h2" textAlign="center" size="large" className="mb-2">
                  For people who want to learn better
                </Header>
                <p className="lead text-dark mx-2 text-center">
                  Pensieve is for developers, language learners, and book readers that are tired of
                  forgetting information after just learning it. Pensieve gives you control of your
                  memory so you hold on to critical information longer.
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
