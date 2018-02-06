import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./Landing.css";

class Landing extends Component {
  render() {
    return (
      <div className="landing-page">
        <div className="landing-hero py-5 px-2">
          <div className="container my-5 py-5">
            <div className="d-flex flex-column-reverse flex-md-row justify-content-between align-items-center">
              <div className="landing-copy w-100 text-left mr-3">
                <h1 className="font-weight-bold mb-2">Remember anything with Pensieve</h1>
                <h2 className="h5 m-0">Pensieve is a personal spaced repetition system</h2>
                <Link to="/signup" className="btn btn-light mt-5">
                  Get Started Now
                </Link>
              </div>
              <div className="landing-image mb-5">
                <img
                  className="my-auto w-100"
                  src={require("./landing_hero.png")}
                  alt="Collection of school items"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="landing-box bg-white py-5">
          <div className="container my-5">
            <div className="border w-100 py-5">
              <h4 className="text-center text-dark">
                You can use Pensieve to remember virtually anything that needs remembering
              </h4>
              <div className="d-flex flex-column flex-md-row justify-content-around align-items-center mt-3">
                <div className="flex-item">
                  <span
                    className="emoji"
                    style={{ fontSize: "110px" }}
                    role="img"
                    aria-label="Microscope emoji"
                  >
                    🔬
                  </span>
                </div>
                <div className="flex-item">
                  <p className="lead text-dark">Learn a language</p>
                  <p className="lead text-dark">Study medical terms</p>
                  <p className="lead text-dark">Memorize poetry</p>
                </div>
                <div className="flex-item">
                  <p className="lead text-dark">Prepare for law exams</p>
                  <p className="lead text-dark">Master trivia</p>
                  <p className="lead text-dark">Remember names and faces</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="landing-info pt-5">
          <div className="container py-5 my-5">
            <div className="row">
              <div className="col-sm-8 offset-sm-2 col-md-6 offset-md-3">
                <h4 className="text-center text-dark mb-3">Why Pensieve?</h4>
                <p className="lead text-dark mx-2">
                  Pensieve is for students, language learners, and autodidacts that are tired of
                  forgetting information after just learning it. It is for people that don't have
                  time to review their notes everyday. Pensieve solves this by automatically
                  scheduling reviews of your cards for you so you never have to forget it again.
                  <br />
                  <br />
                  Pensieve schedules these reviews at increasing intervals over time so the time you
                  spend reviewing new information decreases as it moves from short term to long term
                  memory.
                </p>
                <h4 className="text-center text-dark mt-5 pt-3 mb-3">
                  Improve your studying for free
                </h4>
                <div className="text-center">
                  <Link to="/signup" className="btn btn-primary">
                    Create account
                  </Link>
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
